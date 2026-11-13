import "server-only";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { stripeClient, stripeModeIsLive } from "@/lib/stripe-client";
import { confirmedRefunds } from "@/lib/stripe-refunds";
import { emptyEngagement, servicePaymentStatus, type Engagement, type InvoiceReference } from "@/lib/developer-offers";

export async function reconcileInvoice(invoiceId?: string, chargeId?: string) {
  const db = getAdminFirestore();
  const stripe = stripeClient();
  if (chargeId) {
    const charge = await stripe.charges.retrieve(chargeId);
    const intent = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
    if (!intent) return;
    const payments = stripe.invoicePayments.list({ payment: { type: "payment_intent", payment_intent: intent }, limit: 100 });
    for await (const payment of payments) {
      const invoice = typeof payment.invoice === "string" ? payment.invoice : payment.invoice.id;
      await reconcileInvoice(invoice);
    }
    return;
  }
  if (!invoiceId || !/^in_[A-Za-z0-9]+$/.test(invoiceId)) return;
  const links = await db.collection("invoiceLinks").doc(invoiceId).get();
  if (!links.exists) return;
  const id = links.data()!.submissionId as string;
  const invoice = await stripe.invoices.retrieve(invoiceId);
  if (invoice.livemode !== stripeModeIsLive()) throw new Error("Invoice mode mismatch");
  const paymentRows = stripe.invoicePayments.list({ invoice: invoiceId, limit: 100 });
  let refunded = 0, refundPending = false, refundFailed = false;
  for await (const row of paymentRows) {
    const intentRef = row.payment.payment_intent;
    const intentId = typeof intentRef === "string" ? intentRef : intentRef?.id;
    if (!intentId) continue;
    const refunds = await confirmedRefunds(intentId);
    refunded += refunds.refundedCents; refundPending ||= refunds.pending; refundFailed ||= refunds.failed;
  }
  const ref = db.collection("editorialRequests").doc(id);
  await db.runTransaction(async transaction => {
    const current = await transaction.get(ref);
    if (!current.exists) return;
    const engagement = { ...emptyEngagement, ...current.data()?.engagement } as Engagement;
    const existing = engagement.invoiceRefs.find(item => item.id === invoiceId);
    if (!existing) return;
    const updated: InvoiceReference = {
      ...existing, refundPending, refundFailed, products: existing.products ?? links.data()?.products ?? [], paidAt: existing.paidAt ?? (invoice.amount_paid > 0 ? (invoice.status_transitions.paid_at ? invoice.status_transitions.paid_at * 1000 : Date.now()) : null), status: existing.status === "paid" ? "paid" : invoice.status ?? "draft", amountPaid: Math.max(existing.amountPaid, invoice.amount_paid),
      refunded: Math.max(existing.refunded, refunded), currency: invoice.currency,
      dueAt: invoice.due_date ? invoice.due_date * 1000 : null, verifiedAt: Date.now(), livemode: invoice.livemode,
    };
    const invoices = engagement.invoiceRefs.map(item => item.id === invoiceId ? updated : item);
    transaction.update(ref, { engagement: { ...engagement, invoiceRefs: invoices,
      purchasedProducts: [...new Set(invoices.filter(item => item.amountPaid > item.refunded).flatMap(item => item.products ?? []))],
      paymentStatus: servicePaymentStatus(engagement.totalCents, invoices),
    } });
  });
}
