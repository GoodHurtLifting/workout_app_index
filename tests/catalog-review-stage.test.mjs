import test from "node:test";
import assert from "node:assert/strict";
import { reviewStageProblem } from "../lib/catalog-review-stage.ts";
import { missingReviewProfileDetails } from "../lib/catalog-review-readiness.ts";
import { catalogResearchDrafts } from "../lib/catalog-research-drafts.ts";
import { applyCatalogProposal, catalogProposalChanges } from "../lib/catalog-proposals.ts";

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

test("Aldo's local draft is complete while an older saved Candidate is not", () => {
  const draft = catalogResearchDrafts["aldo-coach"];
  assert.deepEqual(missingReviewProfileDetails(draft), []);
  const savedCandidate = {
    ...draft,
    type: "Unclassified",
    bestFor: "Not yet assessed",
    description: "Developer-submitted candidate. Product claims have not been independently verified.",
    price: "Not verified",
    platforms: [],
    ai: "Not assessed",
    features: [],
    legit: 0,
    legitAssessment: undefined,
    originalityProfile: {
      score: 0, level: "Not assessed", originalMechanics: 0, productPointOfView: 0,
      visualIdentity: 0, meaningfulDifferentiation: 0, defensibility: 0,
      summary: "Not yet assessed.", evidenceNote: "Developer claims have not been independently verified.",
    },
  };
  assert.deepEqual(missingReviewProfileDetails(savedCandidate), [
    "Identity, position, and description", "Platforms", "Pricing", "AI status", "Feature inventory", "Scores and training relationship",
  ]);
  const changes = catalogProposalChanges(savedCandidate, draft);
  const applied = applyCatalogProposal(savedCandidate, draft, changes.map(change => change.path));
  assert.deepEqual(missingReviewProfileDetails(applied), []);
  assert.equal(applied.researchStatus, savedCandidate.researchStatus);
  assert.equal(savedCandidate.type, "Unclassified");
});
