import assert from "node:assert/strict";
import test from "node:test";
import { serviceInquirySchema, partnershipInquirySchema } from "../lib/commercial-inquiries.ts";

const contact = { name: " Test ", email: "test@example.com", organization: "Example", details: "Please scope one onboarding workflow.", companyWebsite: "" };

test("commercial inquiry validation keeps service and partnership intents distinct", () => {
  assert.equal(serviceInquirySchema.parse({ ...contact, kind: "service", topic: "focused_test" }).name, "Test");
  assert.equal(partnershipInquirySchema.safeParse({ ...contact, kind: "partnership", topic: "research_report" }).success, true);
  for (const topic of ["sponsorship", "unknown", "", "<script>"]) {
    assert.equal(serviceInquirySchema.safeParse({ ...contact, kind: "service", topic }).success, false);
  }
  assert.equal(partnershipInquirySchema.safeParse({ ...contact, kind: "service", topic: "focused_test" }).success, false);
});

test("invalid contact and underspecified or excessive scopes cannot pass validation", () => {
  const valid = { ...contact, kind: "service", topic: "competitive_audit" };
  for (const invalid of [{ email: "no" }, { name: " " }, { organization: " " }, { details: "short" }, { details: "x".repeat(4001) }]) {
    assert.equal(serviceInquirySchema.safeParse({ ...valid, ...invalid }).success, false);
  }
  const parsed = serviceInquirySchema.parse({ ...valid, score: 100, publication_status: "Reviewed", appName: "Injected", payment: true });
  assert.equal("score" in parsed || "publication_status" in parsed || "appName" in parsed || "payment" in parsed, false);
});
