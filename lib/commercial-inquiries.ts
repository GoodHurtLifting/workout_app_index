import { z } from "zod";

export const serviceOffers = {
  focused_test: "Focused Human Test — $95",
  launch_review: "Launch Experience Review — $225",
  competitive_audit: "Competitive Product Audit — starting at $350",
  custom_research: "Custom research scope",
} as const;

export const partnershipTopics = {
  affiliate_referral: "Affiliate, referral, or qualified-lead arrangement",
  sponsorship: "Sponsorship, founder spotlight, or advertising",
  research_report: "Market-research report or custom intelligence brief",
  monitoring: "Competitive-intelligence monitoring",
  licensed_data: "Future licensed data or structured access",
} as const;

const contact = {
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  companyWebsite: z.string().max(500).optional(),
  organization: z.string().trim().min(1).max(160),
  details: z.string().trim().min(20).max(4000),
};

export const serviceInquirySchema = z.object({
  ...contact,
  kind: z.literal("service"),
  topic: z.enum(["focused_test", "launch_review", "competitive_audit", "custom_research"]),
});
export const partnershipInquirySchema = z.object({
  ...contact,
  kind: z.literal("partnership"),
  topic: z.enum(["affiliate_referral", "sponsorship", "research_report", "monitoring", "licensed_data"]),
});

export type CommercialInquiryKind = "service" | "partnership";
