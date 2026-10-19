import test from "node:test";
import assert from "node:assert/strict";
import { reviewStageProblem } from "../lib/catalog-review-stage.ts";

const saved = {
  saved: true,
  expectedUpdatedAt: "1792440000000",
  actualUpdatedAt: 1792440000000,
  currentStatus: "Researching",
  targetStatus: "Evaluation ready",
  confirmed: false,
};

test("review stage requires a saved, current card", () => {
  assert.equal(reviewStageProblem({ ...saved, saved: false }), "save-first");
  assert.equal(reviewStageProblem({ ...saved, expectedUpdatedAt: "1792439999999" }), "stale");
  assert.equal(reviewStageProblem(saved), null);
});

test("review stage validates the target and explicit owner approval", () => {
  assert.equal(reviewStageProblem({ ...saved, targetStatus: "Unknown" }), "invalid");
  assert.equal(reviewStageProblem({ ...saved, targetStatus: "Researching" }), "same");
  assert.equal(reviewStageProblem({ ...saved, targetStatus: "Reviewed" }), "confirm");
  assert.equal(reviewStageProblem({ ...saved, targetStatus: "Reviewed", confirmed: true }), null);
  assert.equal(reviewStageProblem({ ...saved, currentStatus: "Reviewed", targetStatus: "Researching" }), null);
});
