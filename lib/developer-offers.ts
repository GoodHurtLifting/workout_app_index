import { z } from "zod";

export const developerProducts = {
  listing: "Get listed",
  focused_test: "Human testing and follow-up",
  launch_review: "Experience review and promotional write-up",
  competitive_audit: "Product use and competitive comparison",
} as const;
export const productIds = ["listing", "focused_test", "launch_review", "competitive_audit"] as const;
export type DeveloperProduct = typeof productIds[number];
export const commercialProducts = { ...developerProducts, sponsored_link:"Sponsored link placement", sponsored_article:"Sponsored article", market_research:"Market research / aggregate audience brief", affiliate_arrangement:"Affiliate / referral arrangement" } as const;
export const commercialProductIds = [...productIds,"sponsored_link","sponsored_article","market_research","affiliate_arrangement"] as const;
export type CommercialProduct = typeof commercialProductIds[number];
const publicUrl = z.string().trim().url().max(1500).refine(value => /^https?:\/\//.test(value));
export const developerDetailsSchema = z.object({
  kind: z.literal("app"),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  companyWebsite: z.string().max(500).optional(),
  appName: z.string().trim().min(1).max(120),
  websiteUrl: publicUrl,
  storeUrl: publicUrl.or(z.literal("")),
  privacyUrl: publicUrl,
  availability: z.string().trim().min(1).max(300),
  pricing: z.string().trim().min(1).max(300),
  details: z.string().trim().min(40).max(4000),
  helpWanted: z.string().trim().max(1500).default(""),
  competitors: z.string().trim().max(1000).default(""),
  differentiation: z.string().trim().max(1500).default(""),
});
export type DeveloperDetails = z.infer<typeof developerDetailsSchema>;
export const developerServiceSelectionSchema = z.array(z.enum(["focused_test", "launch_review", "competitive_audit"])).length(1, "Choose exactly one service.");
export const workStates = ["not_started", "reviewing", "awaiting_access", "awaiting_scope", "in_progress", "complete", "cancelled"] as const;
export type WorkState = typeof workStates[number];
export const workLabels: Record<WorkState, string> = {
  not_started: "Not started", reviewing: "Reviewing", awaiting_access: "Awaiting access",
  awaiting_scope: "Awaiting signed scope", in_progress: "In progress", complete: "Complete", cancelled: "Cancelled",
};
export type InvoiceReference = { id: string; stage: "deposit" | "balance"; status: string; amountPaid: number; refunded: number; currency: string; dueAt: number | null; verifiedAt: number; livemode: boolean; products?: CommercialProduct[]; refundPending?: boolean; refundFailed?: boolean; paidAt?: number | null };
export type Engagement = {
  agreedProducts: CommercialProduct[];
  purchasedProducts: CommercialProduct[];
  workStatus: WorkState;
  totalCents: number | null;
  currency: "usd";
  signedScopeReference: string;
  signedScopeAt: number | null;
  scopeRevision: number;
  invoiceRefs: InvoiceReference[];
  paymentStatus: string;
  note: string;
};
export const emptyEngagement: Engagement = {
  agreedProducts: [], purchasedProducts: [], workStatus: "not_started", totalCents: null, currency: "usd",
  signedScopeReference: "", signedScopeAt: null, scopeRevision: 0, invoiceRefs: [], paymentStatus: "unpaid", note: "",
};
export function servicePaymentStatus(total: number | null, invoices: InvoiceReference[], now = Date.now()) {
  const paid = invoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0);
  const refunded = invoices.reduce((sum, invoice) => sum + invoice.refunded, 0);
  if (refunded > 0) return refunded >= paid ? "refunded" : "partially_refunded";
  if (total !== null && total > 0 && paid >= total) return "fully_paid";
  if (invoices.some(invoice => invoice.status === "open" && invoice.dueAt !== null && invoice.dueAt < now)) return "overdue";
  if (paid > 0) return "deposit_paid";
  return total ? "quoted" : "unpaid";
}
