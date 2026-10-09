import test from "node:test";
import assert from "node:assert/strict";
import { apps, calculateLegitScore, calculateOriginalityScore } from "../lib/catalog.ts";
import { getLegacyPublicApps, isLegacyPublicApp, legacyPublicAppIds, mergePublishedCatalog } from "../lib/legacy-public-catalog.ts";
import { legacyScoreDrafts, legacyOriginalityDrafts, withPrivateLegacyScoreDraft } from "../lib/legacy-score-drafts.ts";
import { catalogResearchDrafts, getUnmodifiedCandidateResearchDraft } from "../lib/catalog-research-drafts.ts";

test("the original 36 retain an explicit legacy-public marker", () => {
  assert.equal(legacyPublicAppIds.length, 36);
  assert.equal(new Set(legacyPublicAppIds).size, 36);
  const legacy = getLegacyPublicApps(apps);
  assert.equal(legacy.length, 36);
  assert.deepEqual(new Set(legacy.map((app) => app.id)), new Set(legacyPublicAppIds));
  assert.ok(legacy.some((app) => app.researchStatus !== "Reviewed"));
});

test("all 36 legacy apps have private, criteria-based score drafts", () => {
  assert.deepEqual(new Set(Object.keys(legacyScoreDrafts)), new Set(legacyPublicAppIds));
  assert.deepEqual(new Set(Object.keys(legacyOriginalityDrafts)), new Set(legacyPublicAppIds));
  for (const app of getLegacyPublicApps(apps)) {
    const draft = withPrivateLegacyScoreDraft(app, app);
    assert.equal(draft.legit, calculateLegitScore(legacyScoreDrafts[app.id]));
    assert.equal(draft.originalityProfile.score, calculateOriginalityScore(draft.originalityProfile));
    assert.deepEqual([
      draft.originalityProfile.originalMechanics, draft.originalityProfile.productPointOfView,
      draft.originalityProfile.visualIdentity, draft.originalityProfile.meaningfulDifferentiation,
      draft.originalityProfile.defensibility,
    ], legacyOriginalityDrafts[app.id]);
    assert.notEqual(draft, app);
    assert.ok(draft.legitAssessment.sourceUrls.length);
    assert.equal(app.legitAssessment, undefined);
    assert.equal(withPrivateLegacyScoreDraft({...app, legit: app.legit + 1}, app).legit, app.legit + 1);
  }
});

test("a bundled research Candidate does not become public by default", () => {
  const stark = { ...apps[0], id: "stark", name: "Stark", researchStatus: "Candidate" };
  const legacy = getLegacyPublicApps([...apps, stark]);
  assert.equal(isLegacyPublicApp(stark.id), false);
  assert.equal(legacy.length, 36);
  assert.equal(legacy.some((app) => app.id === stark.id), false);
});

test("Aldo and Stark research drafts stay private and do not overwrite saved edits", () => {
  const legacy = getLegacyPublicApps(apps);
  for (const id of ["aldo-coach", "stark"]) {
    assert.ok(catalogResearchDrafts[id]);
    assert.equal(legacy.some((app) => app.id === id), false);
  }
  const placeholder = {
    ...catalogResearchDrafts["aldo-coach"],
    type: "Unclassified",
    description: "Developer-submitted candidate. Product claims have not been independently verified.",
  };
  assert.equal(getUnmodifiedCandidateResearchDraft(placeholder)?.id, "aldo-coach");
  assert.equal(getUnmodifiedCandidateResearchDraft({ ...placeholder, type: "Owner-edited type" }), null);
});

test("initial candidate scores are calculated from documented dimensions", () => {
  for (const id of ["aldo-coach", "stark"]) {
    const draft = catalogResearchDrafts[id];
    assert.equal(draft.researchStatus, "Candidate");
    assert.ok(draft.legitAssessment);
    assert.equal(draft.legit, calculateLegitScore(draft.legitAssessment));
    assert.equal(draft.legitAssessment.rubricVersion, "initial-v1");
    assert.ok(draft.legitAssessment.rationale.length > 50);
    assert.equal(draft.originalityProfile.score, calculateOriginalityScore(draft.originalityProfile));
  }
});

test("publishing a new Reviewed app preserves all 36 legacy listings", () => {
  const legacy = getLegacyPublicApps(apps);
  const reviewed = { ...apps[0], id: "stark", name: "Stark", researchStatus: "Reviewed" };
  const merged = mergePublishedCatalog(legacy, [reviewed]);
  assert.equal(merged.length, 37);
  assert.ok(legacy.every((app) => merged.some((item) => item.id === app.id)));
  assert.equal(merged.find((app) => app.id === "stark"), reviewed);
});

test("a published revision replaces only its matching legacy profile", () => {
  const legacy = getLegacyPublicApps(apps);
  const revised = { ...legacy[0], description: "Owner-approved revision", researchStatus: "Reviewed" };
  const merged = mergePublishedCatalog(legacy, [revised]);
  assert.equal(merged.length, 36);
  assert.equal(merged.find((app) => app.id === revised.id), revised);
  assert.ok(legacy.slice(1).every((app) => merged.find((item) => item.id === app.id) === app));
});
