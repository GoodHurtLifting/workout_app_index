import test from "node:test";
import assert from "node:assert/strict";
import { inboxDisposition, inboxCompletionBlocker, matchesInbox, inboxHref, readableHistory } from "../lib/inbox-presentation.ts";
import { emptyEngagement } from "../lib/developer-offers.ts";

const request = { id: "abcdefghijklmnopqrst", kind: "app", appName: "Example App", name: "Owner", email: "owner@example.com", createdAt: 1, status: "received", candidateAppId: "example", details: "Retained original submission" };
const reviewed = new Set(["example"]);

test("reviewed public listings leave Open without changing the submission or catalog", () => {
  const before = structuredClone(request);
  assert.equal(inboxDisposition(request).completed, false);
  assert.equal(inboxDisposition(request, reviewed).completed, true);
  assert.equal(matchesInbox(request, { view: "open", completedCatalogIds: reviewed }), false);
  assert.equal(matchesInbox(request, { view: "completed", completedCatalogIds: reviewed }), true);
  assert.deepEqual(request, before);
  assert.equal(inboxDisposition({ ...request, inboxState: "open" }, reviewed).completed, false);
  assert.equal(inboxDisposition({ ...request, inboxState: "completed" }).completed, true);
  assert.equal(inboxDisposition({ ...request, status: "not_selected" }).completed, false);
});

test("unfinished services, inquiries, billing and refunds remain open after listing or manual completion", () => {
  const changes = [
    { engagement: { ...emptyEngagement, agreedProducts: ["focused_test"] } },
    { selectedProduct: "focused_test" },
    { serviceStage: "audit_agreed" },
    { listingRefundPending: true },
    { listingRefundFailed: true },
    { engagement: { ...emptyEngagement, workStatus: "complete", invoiceRefs: [{ status: "open", amountPaid: 0, refunded: 0 }] } },
    { engagement: { ...emptyEngagement, workStatus: "complete", totalCents: 10000, invoiceRefs: [{ status: "paid", amountPaid: 5000, refunded: 0 }] } },
    { engagement: { ...emptyEngagement, workStatus: "in_progress" } },
  ];
  for (const change of changes) {
    const r = { ...request, inboxState: "completed", ...change };
    assert.ok(inboxCompletionBlocker(r, true));
    assert.equal(inboxDisposition(r, reviewed).completed, false);
  }
  assert.ok(inboxCompletionBlocker({ ...request, listingPurchasedAt: 1, listingPaymentStatus: "paid" }));
  assert.equal(inboxCompletionBlocker({ ...request, listingPurchasedAt: 1, listingPaymentStatus: "paid" }, true), null);
});

test("ineligibility and correction resolution close only their relevant inbox work", () => {
  const rejected = { ...request, eligibility: { result: "ineligible", findings: {}, note: "Outside scope" } };
  assert.equal(inboxDisposition(rejected).completed, true);
  assert.equal(inboxDisposition({ ...rejected, listingPurchasedAt: 1, listingPaymentStatus: "paid" }).completed, false);
  assert.equal(inboxDisposition({ ...rejected, listingPurchasedAt: 1, listingPaymentStatus: "refunded" }).completed, true);
  assert.equal(inboxDisposition({ ...request, kind: "correction", correctionStatus: "resolved" }).completed, true);
  assert.equal(inboxDisposition({ ...request, kind: "correction", correctionStatus: "investigating" }).completed, false);
});

test("search is case-insensitive, uses identity rather than private notes and preserves filters across pagination", () => {
  for (const q of ["EXAMPLE APP", "owner@example", "owner", "example"]) assert.equal(matchesInbox(request, { q, view: "all" }), true);
  assert.equal(matchesInbox({ ...request, details: "a secret phrase" }, { q: "secret phrase" }), false);
  const href = inboxHref({ q: "A & B", view: "completed", deleted: true, cursor: request.id });
  const parsed = new URL(href, "https://example.invalid");
  assert.equal(parsed.searchParams.get("q"), "A & B");
  assert.equal(parsed.searchParams.get("inbox"), "completed");
  assert.equal(parsed.searchParams.get("cursor"), request.id);
  assert.equal(parsed.searchParams.get("deleted"), "1");
  assert.equal(parsed.hash, "#editorial-inbox");
});

test("readable history preserves decisions and notes without dumping audit payloads or IDs", () => {
  const r = { ...request, screeningNote: "Screening explanation", reviewRounds: [{ number: 1, outcome: "not_selected", testedScope: "Explored logging", decisionNote: "A bounded decision", decidedAt: 4 }], workflowHistory: [{ kind: "eligibility", at: 5, by: "private-user-id", after: { eligibility: { result: "eligible", note: "Enough public information" }, secret: "private-secret" } }, { type: "review_outcome_recorded", from: "research_ready", to: "not_selected", at: 6 }, { kind: "unknown_future_action", at: 7, after: { raw: "do-not-display" } }] };
  const before = structuredClone(r);
  const entries = readableHistory(r);
  const output = JSON.stringify(entries);
  for (const expected of ["Screening explanation", "Explored logging", "A bounded decision", "Enough public information", "Not selected after evaluation", "Saved workflow change"]) assert.ok(output.includes(expected));
  for (const privateValue of ["private-user-id", "private-secret", "do-not-display", "unknown_future_action"]) assert.equal(output.includes(privateValue), false);
  assert.deepEqual(r, before);
});
