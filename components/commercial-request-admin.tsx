import { developerProducts, commercialProducts, commercialProductIds, emptyEngagement, servicePaymentStatus, workLabels, workStates } from "@/lib/developer-offers";
import {serviceOffers,partnershipTopics} from "@/lib/commercial-inquiries";
import type { EditorialRequest } from "@/lib/editorial-requests";
import { saveCommercialWork, refreshCommercialPayment, retryInternalNotification, rejectListingAndRefund } from "@/app/admin/commercial-actions";

export function CommercialRequestAdmin({ request, notificationState, catalogOptions }: { request: EditorialRequest & { commercialRevision?: number }; notificationState?: string; catalogOptions: Array<{id:string;name:string}> }) {
  const engagement = { ...emptyEngagement, ...request.engagement };
  const netPaid = engagement.invoiceRefs.reduce((sum, invoice) => sum + invoice.amountPaid - invoice.refunded, 0);
  const payment = servicePaymentStatus(engagement.totalCents, engagement.invoiceRefs);
  const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
  return <details className="submission-private-work">
    <summary>Work and payments · {workLabels[engagement.workStatus]} · {request.listingPaymentStatus ?? payment}</summary>
    {request.testData && <p><strong>INTERNAL TEST SUBMISSION</strong></p>}
    {request.kind === "partnership" && <p>Initially requested · {partnershipTopics[request.topic]}</p>}
    {request.kind === "service" && <p>Initially requested · {serviceOffers[request.topic]}</p>}
    {request.kind === "app" && <div>
      <p>Initially requested · {(request.initiallyRequestedProducts ?? []).map(product => developerProducts[product]).join(", ") || "No offer selected yet"}</p>
      <p>Help requested · {request.helpWanted || "Listing only or not supplied"}</p>
      <p>Competitors and inspirations · {request.competitors || "Not supplied"}</p>
      <p>Intended improvements · {request.differentiation || "Not supplied"}</p>
    </div>}
    <p>Purchased · {[...(request.listingPurchasedAt ? ["Get listed"] : []), ...engagement.purchasedProducts.map(product => commercialProducts[product])].join(", ") || "No verified purchase"}</p>
    {request.listingRefundPending && <p role="status">Listing refund is processing at Stripe.</p>}
    {request.listingRefundFailed && <p role="status">A listing refund failed or was cancelled. Check Stripe before retrying.</p>}
    <p>Listing payment · {request.listingPaymentStatus ?? "Legacy request, no listing order"} · Service payment · {payment}</p>
    <p>Agreed total · {engagement.totalCents === null ? "Not quoted" : money(engagement.totalCents)} · Net service payments · {money(netPaid)} · Outstanding · {engagement.totalCents === null ? "Not quoted" : money(Math.max(0, engagement.totalCents - netPaid))}</p>
    <form action={saveCommercialWork}>
      <input type="hidden" name="id" value={request.id} /><input type="hidden" name="revision" value={request.commercialRevision ?? 0} />
      <fieldset><legend>Products ultimately agreed</legend>{commercialProductIds.filter(product => request.kind === "partnership" ? product !== "listing" : !["sponsored_link","affiliate_arrangement"].includes(product)).map(product => <label key={product}><input type="checkbox" name="products" value={product} defaultChecked={engagement.agreedProducts.includes(product)} />{commercialProducts[product]}</label>)}</fieldset>
      <label>Catalog entry<select name="catalogAppId" defaultValue={request.commercialCatalogAppId ?? request.candidateAppId ?? ""}><option value="">Not connected yet</option>{catalogOptions.map(app=><option key={app.id} value={app.id}>{app.name}</option>)}</select><small>Connect the matching entry to show purchased services beside it.</small></label>
      <label>Work status<select name="workStatus" defaultValue={engagement.workStatus}>{workStates.map(state => <option key={state} value={state}>{workLabels[state]}</option>)}</select></label>
      <label>Agreed service total in USD<input name="total" inputMode="decimal" defaultValue={engagement.totalCents === null ? "" : (engagement.totalCents / 100).toFixed(2)} /></label>
      <label>Signed scope reference<input name="signedScopeReference" maxLength={1500} defaultValue={engagement.signedScopeReference} /></label>
      <label>Date signed<input name="signedScopeDate" type="date" defaultValue={engagement.signedScopeAt ? new Date(engagement.signedScopeAt).toISOString().slice(0, 10) : ""} /></label>
      <label>50% deposit Stripe invoice ID<input name="depositInvoice" placeholder="in_…" defaultValue={engagement.invoiceRefs.find(invoice => invoice.stage === "deposit")?.id ?? ""} /></label>
      <label>50% balance Stripe invoice ID<input name="balanceInvoice" placeholder="in_…" defaultValue={engagement.invoiceRefs.find(invoice => invoice.stage === "balance")?.id ?? ""} /></label>
      <label>Private work note<textarea name="note" maxLength={2000} rows={3} defaultValue={engagement.note} /></label>
      <p>Save the scope and invoice references first, then reconcile payments before starting service work. Use Stripe dashboard invoicing after a signed scope. A work selection records agreement. Verified invoice payments supply purchase status.</p>
      <button type="submit">Save agreed work</button>
    </form>
    {engagement.invoiceRefs.map(invoice => <p key={invoice.id}>{invoice.stage} · {invoice.id} · {invoice.status} · paid {money(invoice.amountPaid)} · refunded {money(invoice.refunded)}{invoice.refundPending ? " · refund processing" : ""}{invoice.refundFailed ? " · failed/cancelled refund: check Stripe" : ""} · {invoice.verifiedAt ? `checked ${new Date(invoice.verifiedAt).toLocaleDateString("en-US")}` : "awaiting verification"}</p>)}
    <form action={refreshCommercialPayment}><input type="hidden" name="id" value={request.id} /><button type="submit">Reconcile Stripe payments</button></form>
    {["app", "partnership"].includes(request.kind) && <form action={retryInternalNotification}><input type="hidden" name="id" value={request.id} /><p>Internal notification · {notificationState ?? "No delivery record"}</p>{notificationState === "CHECK_PROVIDER" && <label><input type="checkbox" name="providerChecked" required />I checked Resend and this notification was not delivered.</label>}<button type="submit" disabled={notificationState === "SUCCESS"}>Retry internal notification</button></form>}
    {request.listingPurchasedAt && request.listingPaymentStatus !== "refunded" && <form action={rejectListingAndRefund}>
      <input type="hidden" name="id" value={request.id} /><label>Listing rejection or delivery failure reason<input name="reason" required minLength={10} maxLength={1000} /></label><button type="submit">Reject listing and issue full refund</button>
    </form>}
  </details>;
}
