import { developerProducts, commercialProducts, commercialProductIds, emptyEngagement, servicePaymentStatus, workLabels, workStates } from "@/lib/developer-offers";
import {serviceOffers,partnershipTopics} from "@/lib/commercial-inquiries";
import type { EditorialRequest } from "@/lib/editorial-requests";
import { saveCommercialWork, refreshCommercialPayment, retryInternalNotification, rejectListingAndRefund } from "@/app/admin/commercial-actions";

export function CommercialRequestAdmin({ request, notificationState, catalogOptions }: { request: EditorialRequest & { commercialRevision?: number }; notificationState?: string; catalogOptions: Array<{id:string;name:string}> }) {
  const engagement = { ...emptyEngagement, ...request.engagement };
  const netPaid = engagement.invoiceRefs.reduce((sum, invoice) => sum + invoice.amountPaid - invoice.refunded, 0);
  const payment = servicePaymentStatus(engagement.totalCents, engagement.invoiceRefs);
  const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
  const refreshFormId = `refresh-commercial-payment-${request.id}`;
  return <details className="submission-private-work commercial-work">
    <summary>Work and payments &middot; {workLabels[engagement.workStatus]} &middot; {request.listingPaymentStatus ?? payment}</summary>
    {request.testData && <p><strong>INTERNAL TEST SUBMISSION</strong></p>}
    <div className="commercial-context">
      {request.kind === "partnership" && <p><strong>Initially requested:</strong> {partnershipTopics[request.topic]}</p>}
      {request.kind === "service" && <p><strong>Initially requested:</strong> {serviceOffers[request.topic]}</p>}
      {request.kind === "app" && <>
        <p><strong>Initially requested:</strong> {(request.initiallyRequestedProducts ?? []).map(product => developerProducts[product]).join(", ") || "No offer selected yet"}</p>
        <p><strong>Help requested:</strong> {request.helpWanted || "Listing only or not supplied"}</p>
        <p><strong>Competitors and inspirations:</strong> {request.competitors || "Not supplied"}</p>
        <p><strong>Intended improvements:</strong> {request.differentiation || "Not supplied"}</p>
      </>}
      <p><strong>Purchased:</strong> {[...(request.listingPurchasedAt ? ["Get listed"] : []), ...engagement.purchasedProducts.map(product => commercialProducts[product])].join(", ") || "No verified purchase"}</p>
    </div>
    <dl className="commercial-payment-summary">
      <div><dt>Agreed service total</dt><dd>{engagement.totalCents === null ? "Not quoted" : money(engagement.totalCents)}</dd></div>
      <div><dt>Net service payments</dt><dd>{money(netPaid)}</dd></div>
      <div><dt>Service balance outstanding</dt><dd>{engagement.totalCents === null ? "Not quoted" : money(Math.max(0, engagement.totalCents - netPaid))}</dd></div>
    </dl>
    <div className="commercial-payment-status"><p><strong>Listing payment:</strong> {request.listingPaymentStatus ?? "Legacy request, no listing order"}</p><p><strong>Service payment:</strong> {payment}</p></div>
    {request.listingRefundPending && <p role="status">Listing refund is processing at Stripe.</p>}
    {request.listingRefundFailed && <p role="status">A listing refund failed or was cancelled. Check Stripe before retrying.</p>}
    <form action={saveCommercialWork} className="commercial-work-form">
      <input type="hidden" name="id" value={request.id} /><input type="hidden" name="revision" value={request.commercialRevision ?? 0} />
      <fieldset className="commercial-products"><legend>Products ultimately agreed</legend><div className="commercial-product-grid">{commercialProductIds.filter(product => request.kind === "partnership" ? product !== "listing" : !["sponsored_link","affiliate_arrangement"].includes(product)).map(product => <label key={product}><input type="checkbox" name="products" value={product} defaultChecked={engagement.agreedProducts.includes(product)} /><span>{commercialProducts[product]}</span></label>)}</div></fieldset>
      <div className="commercial-work-columns">
        <section className="commercial-work-panel">
          <h3>Work and scope</h3>
          <label>Catalog entry<select name="catalogAppId" defaultValue={request.commercialCatalogAppId ?? request.candidateAppId ?? ""}><option value="">Not connected yet</option>{catalogOptions.map(app=><option key={app.id} value={app.id}>{app.name}</option>)}</select><small>Connect the matching entry to show purchased services beside it.</small></label>
          <div className="commercial-field-pair">
            <label>Work status<select name="workStatus" defaultValue={engagement.workStatus}>{workStates.map(state => <option key={state} value={state}>{workLabels[state]}</option>)}</select></label>
            <label>Agreed service total (USD)<input name="total" inputMode="decimal" defaultValue={engagement.totalCents === null ? "" : (engagement.totalCents / 100).toFixed(2)} /></label>
          </div>
          <label>Signed scope reference<input name="signedScopeReference" maxLength={1500} defaultValue={engagement.signedScopeReference} /></label>
          <label>Date signed<input name="signedScopeDate" type="date" defaultValue={engagement.signedScopeAt ? new Date(engagement.signedScopeAt).toISOString().slice(0, 10) : ""} /></label>
          <label>Private work note<textarea name="note" maxLength={2000} rows={4} defaultValue={engagement.note} /></label>
        </section>
        <section className="commercial-work-panel">
          <h3>Payments</h3>
          <p className="commercial-help">Create invoices in Stripe after the scope is signed. Save their references here, then refresh payments to verify them.</p>
          <div className="commercial-field-pair">
            <label>50% deposit invoice ID<input name="depositInvoice" placeholder="in_..." defaultValue={engagement.invoiceRefs.find(invoice => invoice.stage === "deposit")?.id ?? ""} /></label>
            <label>50% balance invoice ID<input name="balanceInvoice" placeholder="in_..." defaultValue={engagement.invoiceRefs.find(invoice => invoice.stage === "balance")?.id ?? ""} /></label>
          </div>
          <h4>Verified invoices</h4>
          {engagement.invoiceRefs.length ? <div className="commercial-invoices">{engagement.invoiceRefs.map(invoice => <article key={invoice.id}>
            <div className="commercial-invoice-heading"><strong>{invoice.stage === "deposit" ? "Deposit" : "Balance"}</strong><span>{invoice.status}</span></div>
            <code>{invoice.id}</code>
            <p>Paid {money(invoice.amountPaid)} &middot; Refunded {money(invoice.refunded)}</p>
            {invoice.refundPending && <p role="status">Refund processing</p>}
            {invoice.refundFailed && <p role="status">Failed or cancelled refund: check Stripe.</p>}
            <small>{invoice.verifiedAt ? `Checked ${new Date(invoice.verifiedAt).toLocaleDateString("en-US")}` : "Awaiting verification"}</small>
          </article>)}</div> : <p className="commercial-help">No invoice records yet.</p>}
          <button type="submit" form={refreshFormId}>Refresh Stripe payments</button>
        </section>
      </div>
      <div className="commercial-save-bar"><p>Save changes before refreshing payments. Agreed products and verified purchases are recorded separately.</p><button type="submit">Save agreed work</button></div>
    </form>
    <form action={refreshCommercialPayment} id={refreshFormId} className="commercial-refresh-form"><input type="hidden" name="id" value={request.id} /></form>
    {["app", "partnership"].includes(request.kind) && <details className="commercial-utility"><summary>Notifications &middot; {notificationState ?? "No delivery record"}</summary><form action={retryInternalNotification}>
      <input type="hidden" name="id" value={request.id} />
      {notificationState === "CHECK_PROVIDER" && <label className="commercial-checkbox"><input type="checkbox" name="providerChecked" required /><span>I checked Resend and this notification was not delivered.</span></label>}
      <button type="submit" disabled={notificationState === "SUCCESS"}>Retry internal notification</button>
    </form></details>}
    {request.listingPurchasedAt && request.listingPaymentStatus !== "refunded" && <details className="commercial-utility commercial-refund"><summary>Reject listing and refund</summary><form action={rejectListingAndRefund}>
      <input type="hidden" name="id" value={request.id} /><label>Listing rejection or delivery failure reason<input name="reason" required minLength={10} maxLength={1000} /></label><button type="submit">Reject listing and issue full refund</button>
    </form></details>}
  </details>;
}
