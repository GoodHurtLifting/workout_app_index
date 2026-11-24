import type { EditorialRequest } from "./editorial-requests";
import { emptyEngagement, type Engagement } from "./developer-offers.ts";
export const eligibilityChecks = {
  liveProduct: "Live public product",
  substantiveTraining: "Substantive training or tracking",
  workingListing: "Working official website or store listing",
  privacyPolicy: "Public privacy policy",
  pricingAndPlatforms: "Stated pricing and supported platforms",
  reviewAccess: "Practical access for the work considered (public sources suffice for a factual listing)",
} as const;
export type Finding = "unknown" | "pass" | "fail";
export type Eligibility = { result: "pending" | "eligible" | "ineligible"; findings: Record<string, Finding>; note: string; at?: number };
export type ResearchNote = { id: string; kind: "public_source" | "developer_statement" | "hands_on" | "owner_dictation"; at: number; by: string; observedOn: string; context: string; used: string; findings: string; limitations: string; catalogAppId: string | null };
export function eligibilityFor(request: Pick<EditorialRequest, "eligibility" | "screeningCriteria" | "screeningCompletedAt" | "screeningNote" | "status">): Eligibility {
  if (request.eligibility) return request.eligibility;
  // Old unchecked boxes did not distinguish unknowns from failures. Preserve that uncertainty.
  const findings = Object.fromEntries(Object.keys(eligibilityChecks).map(key => [key, request.screeningCriteria?.[key] === true ? "pass" : "unknown"])) as Record<string, Finding>;
  const passed = !!request.screeningCompletedAt && Object.values(findings).every(value => value === "pass");
  return { result: passed ? "eligible" : "pending", findings, note: request.screeningNote ?? "", ...(request.screeningCompletedAt ? { at: request.screeningCompletedAt } : {}) };
}
export function eligibilityProblem(value: Eligibility) {
  if (value.result === "eligible" && Object.keys(eligibilityChecks).some(key => value.findings[key] !== "pass")) return "Confirm every eligibility check before marking Eligible.";
  if (value.result === "ineligible" && !Object.values(value.findings).includes("fail")) return "Record a confirmed failed check before marking Ineligible.";
  return null;
}
export function serviceStartProblem(engagement: Engagement) {
  if (!["in_progress", "complete"].includes(engagement.workStatus)) return null;
  const services = [...new Set([...engagement.agreedProducts, ...engagement.purchasedProducts])].filter(product => product !== "listing");
  if (!services.length) return null;
  const deposit = engagement.invoiceRefs.filter(invoice => invoice.stage === "deposit" && invoice.verifiedAt > 0 && services.every(product => invoice.products?.includes(product))).reduce((sum, invoice) => sum + invoice.amountPaid - invoice.refunded, 0);
  if (!engagement.signedScopeReference || !engagement.signedScopeAt || !engagement.totalCents || deposit < Math.ceil(engagement.totalCents / 2)) return "A signed scope and verified 50% deposit are required before service work starts";
  return null;
}
export function engagementFor(request: Partial<Pick<EditorialRequest, "engagement" | "status">>): Engagement { return { ...emptyEngagement, ...(!request.engagement?.workStatus && request.status === "not_scheduled" ? {workStatus: "on_hold" as const} : {}), ...request.engagement }; }
export function catalogConnection(request: Pick<EditorialRequest, "candidateAppId" | "commercialCatalogAppId">) { return request.commercialCatalogAppId || request.candidateAppId || ""; }
