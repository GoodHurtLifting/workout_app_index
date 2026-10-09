import test from "node:test";
import assert from "node:assert/strict";
import {
  canTransition, monthKey, MONTHLY_ACCEPTANCE_LIMIT, MONTHLY_SCREENING_LIMIT,
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
});

test("capacity settings and UTC month keys are explicit", () => {
  assert.equal(MONTHLY_SCREENING_LIMIT, 8);
  assert.equal(MONTHLY_ACCEPTANCE_LIMIT, 2);
  assert.equal(monthKey(Date.parse("2026-10-31T23:59:59Z")), "2026-10");
  assert.equal(monthKey(Date.parse("2026-11-01T00:00:00Z")), "2026-11");
});
