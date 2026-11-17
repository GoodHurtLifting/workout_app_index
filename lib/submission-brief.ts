import type { EditorialRequest } from "./editorial-requests";
import { commercialProducts, developerProducts, servicePaymentStatus } from "./developer-offers.ts";
import { eligibilityFor, eligibilityChecks, engagementFor, catalogConnection } from "./inbox-workflow.ts";
// The client receives only this allowlisted text, never the full saved request/access hash.
export function redactBrief(value: string): string {
  return value.replace(/https?:\/\/[^\s]+/g, raw => { try { const url = new URL(raw); url.username = ""; url.password = ""; const packageId = url.hostname === "play.google.com" ? url.searchParams.get("id") : null; url.search = ""; if (packageId && /^[a-zA-Z0-9_.]+$/.test(packageId)) url.searchParams.set("id", packageId); url.hash = ""; return url.toString(); } catch { return "[URL omitted]"; } })
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[contact omitted]")
    .replace(/((?:password|passwd|secret|token|api[_ -]?key|authorization|login|username)\s*[:=]\s*)[^\n]+/gi, "$1[credential omitted]")
    .replace(/\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]+\b/g, "[credential omitted]");
}
export function researchBrief(r: Extract<EditorialRequest, {kind:"app"}>): string {
  const e = engagementFor(r), eligibility = eligibilityFor(r);
  return redactBrief([
    "Workout App Index submission research brief",
    "Original developer claims; not independent findings or publication approval.",
    `Submission ID: ${r.id}`, `Submitted: ${new Date(r.createdAt).toISOString().slice(0,10)}`, `App: ${r.appName}`,
    `Website: ${r.websiteUrl}`, `Store: ${r.storeUrl || "Not supplied"}`, `Privacy: ${r.privacyUrl}`,
    `Claimed platforms: ${r.availability}`, `Claimed pricing: ${r.pricing}`,
    `Current selected product: ${r.selectedProduct ? developerProducts[r.selectedProduct] : "Not selected"}`,
    `Initial interests (not purchases): ${(r.initiallyRequestedProducts ?? []).map(p=>developerProducts[p]).join(", ") || "None"}`,
    `Agreed products: ${e.agreedProducts.map(p=>commercialProducts[p]).join(", ") || "None"}`,
    `Agreed scope / work details: ${e.note || "Not recorded"}`,
    `Signed scope: ${e.signedScopeAt ? new Date(e.signedScopeAt).toISOString().slice(0,10) : "Not recorded"}; service price USD: ${e.totalCents === null ? "Not quoted" : (e.totalCents/100).toFixed(2)}`,
    `Verified purchased products: ${[...(r.listingPurchasedAt ? ["Listing"] : []), ...e.purchasedProducts.map(p=>commercialProducts[p])].join(", ") || "None"}`,
    `Listing payment: ${r.listingPaymentStatus ?? "No listing order"}; service payment: ${servicePaymentStatus(e.totalCents,e.invoiceRefs)}`,
    `Service provider-verified paid/refunded USD: ${(e.invoiceRefs.reduce((s,i)=>s+i.amountPaid,0)/100).toFixed(2)} / ${(e.invoiceRefs.reduce((s,i)=>s+i.refunded,0)/100).toFixed(2)}`,
    `Legacy free request: ${r.submissionVersion ? "No" : "Yes; no payment prerequisite"}`,
    `Eligibility: ${eligibility.result}; notes: ${eligibility.note || "None"}`,
    "Eligibility checklist to investigate:", ...Object.entries(eligibilityChecks).map(([key,label])=>`- ${label}: ${eligibility.findings[key] ?? "unknown"}`),
    `Linked catalog ID: ${catalogConnection(r) || "None"}`,
    `Developer goals: ${r.helpWanted || "Not supplied"}`, `Competitors: ${r.competitors || "Not supplied"}`, `Intended improvements: ${r.differentiation || "Not supplied"}`,
    "Original developer description:", r.details,
    "Keep public sources, developer statements and hands-on observations distinct. Record dated findings and unknowns. Ordinary factual listings do not require hands-on testing. Catalog source checks, owner approval and explicit publication remain separate from client delivery.",
  ].join("\n"));
}
