import test from "node:test";
import assert from "node:assert/strict";
import {
  canStartAnotherReview, canTransition, monthKey, publicationDecision,
  normalizeAppSubmissionStatus,
} from "../lib/submission-workflow.ts";

test("legacy submission states remain research leads, not approved catalog entries", () => {
  assert.equal(normalizeAppSubmissionStatus("new"), "received");
  assert.equal(normalizeAppSubmissionStatus("seen"), "received");
  assert.equal(normalizeAppSubmissionStatus("accepted"), "accepted_for_research");
  assert.equal(normalizeAppSubmissionStatus("reviewed"), "accepted_for_research");
});

test("screening and research stages cannot skip the editorial gates", () => {
  assert.equal(canTransition("received", "accepted_for_research"), false);
  assert.equal(canTransition("screening", "waitlisted_eligible"), true);
  assert.equal(canTransition("waitlisted_eligible", "accepted_for_research"), true);
  assert.equal(canTransition("accepted_for_research", "active_review"), true);
  assert.equal(canTransition("active_review", "research_ready"), true);
  assert.equal(canTransition("research_ready", "accepted_for_research"), false);
  assert.equal(canTransition("research_ready", "not_selected"), true);
  assert.equal(canTransition("research_ready", "selected_for_listing"), true);
  assert.equal(canTransition("not_selected", "active_review"), true);
  assert.equal(canTransition("screening", "selected_for_listing"), false);
});

test("a later review preserves the prior outcome and new submissions need selection before publication", () => {
  assert.equal(canStartAnotherReview("not_selected"), true);
  assert.equal(canStartAnotherReview("research_ready"), false);
  assert.equal(publicationDecision("research_ready", false), "hold");
  assert.equal(publicationDecision("not_selected", false), "hold");
  assert.equal(publicationDecision("selected_for_listing", false), "include");
  assert.equal(publicationDecision("active_review", true), "include");
  assert.equal(publicationDecision("not_selected", true), "conflict");
});

test("UTC month keys remain available for editorial activity counts", () => {
  assert.equal(monthKey(Date.parse("2026-10-31T23:59:59Z")), "2026-10");
  assert.equal(monthKey(Date.parse("2026-11-01T00:00:00Z")), "2026-11");
});
