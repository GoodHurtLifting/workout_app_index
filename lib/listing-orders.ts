import "server-only";
import type Stripe from "stripe";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { stripeClient, stripeModeIsLive } from "@/lib/stripe-client";
import { confirmedRefunds } from "@/lib/stripe-refunds";
import { listingAmount, listingCurrency, listingPaymentSnapshot } from "@/lib/listing-payment-state";

export function listingOrderRef(submissionId: string) {
  return getAdminFirestore().collection("listingOrders").doc(`${submissionId}-listing`);
}

export async function reconcileListingSession(sessionId: string, eventId?: string, failed = false, providerPaidAt?: number) {
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const submissionId = session.metadata?.submission_id;
  if (!submissionId || !/^[A-Za-z0-9]{20}$/.test(submissionId) || session.metadata?.product !== "listing") return;
  if (session.livemode !== stripeModeIsLive()) throw new Error("Stripe mode mismatch");
  const intentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  const refunds = intentId ? await confirmedRefunds(intentId) : { refundedCents:0,pending:false,failed:false };
  const payment = listingPaymentSnapshot({
    amount: session.amount_total, currency: session.currency, paymentStatus: session.payment_status,
    sessionStatus: session.status, refunded: refunds.refundedCents, failed,
  });
  const db = getAdminFirestore();
  const orderRef = listingOrderRef(submissionId);
  const requestRef = db.collection("editorialRequests").doc(submissionId);
  const receipt = eventId ? db.collection("stripeEvents").doc(eventId) : null;
  await db.runTransaction(async transaction => {
    const [order, request, prior] = await Promise.all([transaction.get(orderRef), transaction.get(requestRef), receipt ? transaction.get(receipt) : Promise.resolve(null)]);
    if (prior?.exists) return;
    if (!order.exists || !request.exists) throw new Error("Stripe order is not yet linked");
    if (Number(session.metadata?.attempt) !== Number(order.data()?.attempt)) {
      if (receipt) transaction.create(receipt, { eventId, submissionId, processedAt: Date.now(), ignored: "superseded_attempt" });
      return;
    }
    if (order.data()?.sessionId !== session.id && order.data()?.status !== "creating") {
      if (!order.data()?.sessionId || order.data()?.status === "creating") throw new Error("Stripe order is not yet linked");
      if (receipt) transaction.create(receipt, { eventId, submissionId, processedAt: Date.now(), ignored: "superseded_session" });
      return;
    }
    const previous = order.data()!;
    // Refund totals cannot decrease when a slow reconciliation races a refund webhook.
    const refundedCents = Math.max(previous.refundedCents ?? 0, payment.refundedCents);
    const wasPaid = Boolean(previous.paidAt);
    const isPaid = payment.grossCents === listingAmount || wasPaid;
    const status = isPaid ? refundedCents === listingAmount ? "refunded" : refundedCents > 0 ? "partially_refunded" : "paid" : previous.status === "failed" && payment.status === "pending" ? "failed" : previous.status === "cancelled" && payment.status === "expired" ? "cancelled" : payment.status;
    const now = Date.now();
    const providerDate = providerPaidAt && Number.isFinite(providerPaidAt) && providerPaidAt > 0 ? Math.min(providerPaidAt, now) : null;
    const paidAt = !isPaid ? null : providerDate ? previous.paidAtSource === "stripe_event" ? Math.min(previous.paidAt,providerDate) : providerDate : previous.paidAt ?? now;
    transaction.update(orderRef, {
      ...payment, sessionId: session.id, refundPending: refunds.pending, refundFailed: refunds.failed, status, refundedCents, grossCents: isPaid ? listingAmount : 0,
      netCents: isPaid ? listingAmount - refundedCents : 0,
      paymentIntentId: intentId ?? null, updatedAt: now,
      paidAt, paidAtSource: providerDate || previous.paidAtSource === "stripe_event" ? "stripe_event" : "observed_reconciliation",
    });
    transaction.update(requestRef, {
      checkoutStartedAt: request.data()?.checkoutStartedAt ?? now, initiallyRequestedProducts: [...new Set([...(request.data()?.initiallyRequestedProducts ?? []), "listing"])],
      listingPaymentStatus: status, listingRefundPending: refunds.pending, listingRefundFailed: refunds.failed,
      ...(isPaid ? { listingPurchasedAt: paidAt } : {}),
    });
    if (receipt) transaction.create(receipt, { eventId, kind: "listing", submissionId, processedAt: now, livemode: session.livemode });
  });
  return payment;
}

export async function createListingCheckout(submissionId: string, email: string) {
  const stripe = stripeClient();
  const ref = listingOrderRef(submissionId);
  const previous = await ref.get();
  if (previous.data()?.sessionId) {
    await reconcileListingSession(previous.data()!.sessionId);
    const updated = await ref.get();
    if (["paid", "partially_refunded", "refunded"].includes(updated.data()?.status)) throw new Error("This listing order has already been paid");
    const currentSession = await stripe.checkout.sessions.retrieve(previous.data()!.sessionId);
    if (currentSession.status === "open") return currentSession;
    if (currentSession.status === "complete") throw new Error("Your payment is processing. Check again shortly.");
  }
  const now = Date.now();
  const reserved = await ref.firestore.runTransaction(async transaction => {
    const current = await transaction.get(ref);
    const row = current.data();
    if (row?.paidAt) throw new Error("This listing order has already been paid");
    if (row?.status === "checkout_open" && row.sessionId && row.sessionId !== previous.data()?.sessionId) return { attempt: Number(row.attempt), existingSessionId: String(row.sessionId) };
    if (row?.status === "creating" && row.creatingStartedAt < Date.now() - 23 * 3600000) throw new Error("Checkout needs owner reconciliation before another attempt");
    // Keep the same attempt after a network failure so Stripe returns the same session.
    const next = row?.status === "creating" ? Number(row.attempt) : Number(row?.attempt ?? 0) + 1;
    transaction.set(ref, {
      submissionId, product: "listing", amountCents: listingAmount, currency: listingCurrency,
      attempt: next, status: "creating", creatingStartedAt: row?.status === "creating" ? row.creatingStartedAt ?? now : now, livemode: stripeModeIsLive(), updatedAt: now,
      ...(!current.exists ? { createdAt: now, grossCents: 0, netCents: 0, refundedCents: 0 } : {}),
    }, { merge: true });
    return { attempt: next, existingSessionId: undefined };
  });
  if (reserved.existingSessionId) return stripe.checkout.sessions.retrieve(reserved.existingSessionId);
  const attempt = reserved.attempt;
  const origin = process.env.WAI_SITE_URL ?? "http://localhost:3000";
  if (!/^https:\/\//.test(origin) && stripeModeIsLive()) throw new Error("A secure production site URL is required");
  const session = await stripe.checkout.sessions.create({
    mode: "payment", ui_mode: "embedded_page",
    // WAI sells human-delivered services, which are ineligible for Managed Payments.
    managed_payments: { enabled: false },
    customer_email: email, client_reference_id: submissionId,
    metadata: { submission_id: submissionId, product: "listing", attempt: String(attempt) },
    payment_intent_data: { metadata: { submission_id: submissionId, product: "listing" } },
    line_items: [{ quantity: 1, price_data: { currency: listingCurrency, unit_amount: listingAmount, product_data: { name: "Workout App Index factual listing" } } }],
    return_url: `${origin}/submit-app?checkout=return`,
    redirect_on_completion: "if_required",
  }, { idempotencyKey: `wai-listing-${submissionId}-${attempt}` });
  await ref.firestore.runTransaction(async transaction => {
    const requestRef = ref.firestore.collection("editorialRequests").doc(submissionId);
    const [current, request] = await Promise.all([transaction.get(ref), transaction.get(requestRef)]);
    if (current.data()?.attempt !== attempt) throw new Error("Checkout changed. Please try again.");
    if (current.data()?.paidAt) return;
    transaction.update(ref, { sessionId: session.id, status: current.data()?.status === "creating" ? "checkout_open" : current.data()?.status ?? "checkout_open", updatedAt: Date.now() });
    transaction.update(requestRef, { selectedProduct: "listing", checkoutStartedAt: request.data()?.checkoutStartedAt ?? now, initiallyRequestedProducts: [...new Set([...(request.data()?.initiallyRequestedProducts ?? []), "listing"])] });
  });
  return session;
}

export async function cancelListingCheckout(submissionId: string) {
  const ref = listingOrderRef(submissionId);
  const order = await ref.get();
  if (!order.data()?.sessionId) return;
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(order.data()!.sessionId);
  if (session.status === "open") {
    try { await stripe.checkout.sessions.expire(session.id); } catch { /* A simultaneous payment is reconciled below. */ }
  }
  await reconcileListingSession(session.id);
  const latest = await ref.get();
  if (latest.data()?.status === "expired") {
    await ref.firestore.runTransaction(async transaction => {
      const current = await transaction.get(ref);
      if (current.data()?.status !== "expired") return;
      transaction.update(ref, { status: "cancelled" });
      transaction.update(ref.firestore.collection("editorialRequests").doc(submissionId), { listingPaymentStatus: "cancelled" });
    });
  }
}

export async function listingSessionFromEvent(event: Stripe.Event) {
  const object = event.data.object as unknown as { id: string; object: string; metadata?: Record<string, string>; payment_intent?: string | { id: string } | null };
  if (object.object === "checkout.session") return object.id;
  if (["charge", "refund"].includes(object.object) && object.payment_intent) {
    const intent = typeof object.payment_intent === "string" ? object.payment_intent : object.payment_intent.id;
    const rows = await getAdminFirestore().collection("listingOrders").where("paymentIntentId", "==", intent).limit(1).get();
    if (rows.docs[0]) return rows.docs[0].data().sessionId as string;
    const payment = await stripeClient().paymentIntents.retrieve(intent);
    const id = payment.metadata?.submission_id;
    if (id && /^[A-Za-z0-9]{20}$/.test(id) && payment.metadata?.product === "listing") return (await listingOrderRef(id).get()).data()?.sessionId as string | undefined;
  }
}
