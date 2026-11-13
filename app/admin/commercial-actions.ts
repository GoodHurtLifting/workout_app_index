"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCatalogAdminForAction } from "@/lib/admin-auth";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { emptyEngagement, commercialProductIds, workStates, servicePaymentStatus, type Engagement, type InvoiceReference } from "@/lib/developer-offers";
import { deliverSubmissionAlert } from "@/lib/editorial-requests";
import { reconcileInvoice } from "@/lib/service-invoices";
import { stripeClient, stripeModeIsLive } from "@/lib/stripe-client";
import { getCatalogRecord } from "@/lib/catalog-repository";
import { placementSchema } from "@/lib/partnership-placements";
import { listingOrderRef, reconcileListingSession } from "@/lib/listing-orders";
const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const submissionId = (form: FormData) => z.string().regex(/^[A-Za-z0-9]{20}$/).parse(text(form, "id"));

export async function saveCommercialWork(form: FormData) {
  const user = await getCatalogAdminForAction();
  const id = submissionId(form);
  const catalogAppId = text(form, "catalogAppId");
  if (catalogAppId && (!/^[a-z0-9-]{1,80}$/.test(catalogAppId) || !(await getCatalogRecord(catalogAppId)))) throw new Error("Use an existing catalog entry ID");
  const products = z.array(z.enum(commercialProductIds)).max(8).parse(form.getAll("products"));
  const workStatus = z.enum(workStates).parse(text(form, "workStatus"));
  const totalText = text(form, "total");
  if (totalText && !/^\d{1,6}(\.\d{1,2})?$/.test(totalText)) throw new Error("Enter the agreed total in USD");
  const totalCents = totalText ? Math.round(Number(totalText) * 100) : null;
  const signedScopeReference = z.string().max(1500).parse(text(form, "signedScopeReference"));
  const signedDate = text(form, "signedScopeDate");
  const signedScopeAt = signedDate ? Date.parse(`${signedDate}T00:00:00Z`) : null;
  if (signedDate && (!/^\d{4}-\d{2}-\d{2}$/.test(signedDate) || !Number.isFinite(signedScopeAt) || new Date(signedScopeAt!).toISOString().slice(0,10) !== signedDate || signedScopeAt! > Date.now())) throw new Error("Check the signed scope date");
  const depositId = text(form, "depositInvoice");
  const balanceId = text(form, "balanceInvoice");
  const invoiceIds = [{ id: depositId, stage: "deposit" as const }, { id: balanceId, stage: "balance" as const }].filter(invoice => invoice.id);
  if (invoiceIds.some(invoice => !/^in_[A-Za-z0-9]+$/.test(invoice.id)) || (depositId && depositId === balanceId)) throw new Error("Use distinct Stripe invoice IDs");
  if (invoiceIds.length && (!signedScopeReference || !signedScopeAt || !totalCents || !products.some(product => product !== "listing"))) throw new Error("Save the signed scope, products and agreed total before linking invoices");
  const ref = getAdminFirestore().collection("editorialRequests").doc(id);
  const saved = await ref.get();
  if (!saved.exists || saved.data()?.kind === "correction") throw new Error("Commercial request not found");
  const previous = { ...emptyEngagement, ...saved.data()?.engagement } as Engagement;
  const invoices: InvoiceReference[] = [...previous.invoiceRefs];
  for (const invoice of invoiceIds) {
    if (previous.invoiceRefs.some(row => row.id === invoice.id && row.stage === invoice.stage)) continue;
    const verified = await stripeClient().invoices.retrieve(invoice.id);
    if (verified.livemode !== stripeModeIsLive() || verified.currency !== "usd") throw new Error("Invoice mode or currency differs from the engagement");
    if (verified.customer_email?.toLowerCase() !== saved.data()?.email?.toLowerCase()) throw new Error("Invoice email must match this request");
    const expected = invoice.stage === "deposit" ? Math.ceil(totalCents! / 2) : Math.floor(totalCents! / 2);
    if (verified.total !== expected) throw new Error("The invoice must match the agreed 50% amount");
    invoices.push({ id: invoice.id, stage: invoice.stage, status: verified.status ?? "draft", amountPaid: 0, refunded: 0, currency: "usd", verifiedAt: 0, dueAt: null, livemode: verified.livemode });
  }
  await ref.firestore.runTransaction(async transaction => {
    const current = await transaction.get(ref);
    if (Number(current.data()?.commercialRevision ?? 0) !== Number(text(form, "revision") || 0)) throw new Error("This request changed. Reload before saving.");
    const links = await Promise.all(invoiceIds.map(invoice => transaction.get(ref.firestore.collection("invoiceLinks").doc(invoice.id))));
    if (links.some(link => link.exists && link.data()?.submissionId !== id)) throw new Error("An invoice is already linked to another request");
    const currentEngagement = { ...emptyEngagement, ...current.data()?.engagement } as Engagement;
    // Preserve verified payment state if a webhook arrived while this form was being submitted.
    const mergedInvoices = invoices.map(invoice => currentEngagement.invoiceRefs.find(row => row.id === invoice.id) ?? invoice);
    if (products.some(product => product !== "listing") && ["in_progress", "complete"].includes(workStatus)) {
      const depositPaid = mergedInvoices.filter(invoice => invoice.stage === "deposit").reduce((sum,invoice)=>sum+invoice.amountPaid-invoice.refunded,0);
      if (!signedScopeReference || !signedScopeAt || !totalCents || depositPaid < Math.ceil(totalCents / 2)) throw new Error("A signed scope and verified 50% deposit are required before service work starts");
    }
    transaction.update(ref, {
      commercialCatalogAppId: catalogAppId || null,
      engagement: { ...currentEngagement, agreedProducts: [...new Set(products)], workStatus, totalCents,
        signedScopeReference, signedScopeAt, scopeRevision: currentEngagement.scopeRevision + 1,
        invoiceRefs: mergedInvoices, paymentStatus: servicePaymentStatus(totalCents, mergedInvoices), note: z.string().max(2000).parse(text(form, "note")),
      },
      hasLinkedInvoices: mergedInvoices.length > 0, commercialRevision: Number(current.data()?.commercialRevision ?? 0) + 1,
      commercialUpdatedAt: Date.now(), commercialUpdatedBy: user.userId,
    });
    for (const [index, invoice] of invoiceIds.entries()) {
      if (!links[index].exists) transaction.create(ref.firestore.collection("invoiceLinks").doc(invoice.id), { submissionId: id, stage: invoice.stage, products: products.filter(product => product !== "listing"), totalCents, signedScopeReference });
    }
  });
  for (const invoice of invoices) await reconcileInvoice(invoice.id);
  revalidatePath("/admin");
  redirect(`/admin#submission-${id}`);
}

export async function refreshCommercialPayment(form: FormData) {
  await getCatalogAdminForAction();
  const id = submissionId(form);
  const ref = getAdminFirestore().collection("editorialRequests").doc(id);
  const row = await ref.get();
  for (const invoice of (row.data()?.engagement?.invoiceRefs ?? []) as InvoiceReference[]) await reconcileInvoice(invoice.id);
  const order = await listingOrderRef(id).get();
  if (order.data()?.sessionId) await reconcileListingSession(order.data()!.sessionId);
  revalidatePath("/admin");
  redirect(`/admin#submission-${id}`);
}

export async function retryInternalNotification(form: FormData) {
  await getCatalogAdminForAction();
  const id = submissionId(form);
  const db = getAdminFirestore();
  const request = await db.collection("editorialRequests").doc(id).get();
  if (!request.exists || !["app", "partnership"].includes(request.data()?.kind)) throw new Error("Notification request not found");
  const to = process.env.SUBMISSION_NOTIFICATION_EMAIL?.trim() || process.env.CATALOG_ADMIN_EMAIL?.trim();
  if (!to) throw new Error("Configure the internal notification recipient");
  const kind = request.data()!.kind;
  const ref = db.collection("editorialNotifications").doc(`${kind}-${id}`);
  const job = { to, message: { subject: `Workout App Index ${kind === "app" ? "app submission" : "partnership inquiry"}`, text: `A request is waiting in https://workoutappindex.com/admin
Request ID: ${id}` } };
  if (!(await ref.get()).exists) await ref.create({ ...job, delivery: { state: "PENDING" }, createdAt: Date.now() });
  if (form.get("providerChecked") === "on") {
    await db.runTransaction(async transaction => {
      const current = await transaction.get(ref);
      const state = current.data()?.delivery?.state;
      if (state === "CHECK_PROVIDER") transaction.update(ref, { firstProviderAttemptAt: null, providerHistoryCheckedAt: Date.now(), delivery: { state: "PENDING" } });
    });
  }
  await deliverSubmissionAlert(ref, job);
  revalidatePath("/admin");
}

export async function rejectListingAndRefund(form: FormData) {
  await getCatalogAdminForAction();
  const id = submissionId(form);
  const reason = z.string().trim().min(10).max(1000).parse(text(form, "reason"));
  const ref = listingOrderRef(id);
  const order = await ref.get();
  if (!order.data()?.sessionId) throw new Error("Listing payment not found");
  await reconcileListingSession(order.data()!.sessionId);
  const current = await ref.get();
  if (!current.data()?.paymentIntentId || !current.data()?.paidAt) throw new Error("Payment has not been confirmed");
  const refund = await stripeClient().refunds.create({ payment_intent: current.data()!.paymentIntentId, metadata: { submission_id: id, reason: "listing_ineligible_or_undeliverable" } }, { idempotencyKey: `wai-listing-full-refund-${id}` });
  await reconcileListingSession(order.data()!.sessionId);
  await getAdminFirestore().collection("editorialRequests").doc(id).update({ listingOutcome: refund.status === "succeeded" ? "refunded" : refund.status === "failed" || refund.status === "canceled" ? "refund_failed" : "refund_pending", listingOutcomeReason: reason });
  revalidatePath("/admin");
}


export async function savePartnerPlacement(form: FormData) {
  const user = await getCatalogAdminForAction();
  const record = placementSchema.parse({
    slug: text(form, "slug"), kind: text(form, "kind"), brand: text(form, "brand"),
    category: text(form, "category"), title: text(form, "title"),
    destination: text(form, "destination"), body: text(form, "body"),
    published: form.get("publish") === "on",
  });
  await getAdminFirestore().collection("partnershipPlacements").doc(record.slug).set({ ...record, updatedAt: Date.now(), updatedBy: user.userId });
  revalidatePath("/partnerships");
  revalidatePath(`/sponsored/${record.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
}
