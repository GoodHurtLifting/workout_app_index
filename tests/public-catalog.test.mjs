import test from "node:test";
import assert from "node:assert/strict";
import { apps, calculateLegitScore, calculateOriginalityScore } from "../lib/catalog.ts";
import { filterWithdrawnCatalog, getLegacyPublicApps, isLegacyPublicApp, legacyPublicAppIds, mergePublishedCatalog } from "../lib/legacy-public-catalog.ts";
import { legacyScoreDrafts, legacyOriginalityDrafts, withPrivateLegacyScoreDraft } from "../lib/legacy-score-drafts.ts";
import { catalogResearchDrafts, getUnmodifiedPlaceholderResearchDraft } from "../lib/catalog-research-drafts.ts";
import { catalogPreparedEvidence, preparedEvidenceForApp } from "../lib/catalog-prepared-evidence.ts";
import { applyCatalogProposal, catalogProposalChanges, catalogRecordFingerprint } from "../lib/catalog-proposals.ts";

test("the original 36 retain an explicit legacy-public marker", () => {
  assert.equal(legacyPublicAppIds.length, 36);
  assert.equal(new Set(legacyPublicAppIds).size, 36);
  const legacy = getLegacyPublicApps(apps);
  assert.equal(legacy.length, 36);
  assert.deepEqual(new Set(legacy.map((app) => app.id)), new Set(legacyPublicAppIds));
  assert.ok(legacy.some((app) => app.researchStatus !== "Reviewed"));
});

test("withdrawal hides a public listing without deleting its saved record or changing scores", () => {
  const legacy=getLegacyPublicApps(apps);
  const filtered=filterWithdrawnCatalog(legacy,new Set(["lift-league"]));
  assert.equal(filtered.length,35);
  assert.equal(filtered.some(app=>app.id==="lift-league"),false);
  assert.equal(legacy.find(app=>app.id==="lift-league")?.legit,apps.find(app=>app.id==="lift-league")?.legit);
  assert.equal(filterWithdrawnCatalog(legacy,new Set()).length,36);
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

test("developer research drafts stay private and do not overwrite saved edits", () => {
  const legacy = getLegacyPublicApps(apps);
  for (const id of ["aldo-coach", "stark", "gir-iron", "swithai"]) {
    assert.ok(catalogResearchDrafts[id]);
    assert.equal(legacy.some((app) => app.id === id), false);
  }
  const placeholder = {
    ...catalogResearchDrafts["aldo-coach"],
    type: "Unclassified",
    description: "Developer-submitted candidate. Product claims have not been independently verified.",
  };
  assert.equal(getUnmodifiedPlaceholderResearchDraft(placeholder)?.id, "aldo-coach");
  assert.equal(getUnmodifiedPlaceholderResearchDraft({ ...placeholder, researchStatus: "Researching" })?.researchStatus, "Researching");
  assert.equal(getUnmodifiedPlaceholderResearchDraft({ ...placeholder, researchStatus: "Evaluation ready" })?.researchStatus, "Evaluation ready");
  assert.equal(getUnmodifiedPlaceholderResearchDraft({ ...placeholder, researchStatus: "Reviewed" }), null);
  assert.equal(getUnmodifiedPlaceholderResearchDraft({ ...placeholder, type: "Owner-edited type" }), null);
  const aegirPlaceholder = {
    ...catalogResearchDrafts["gir-iron"],
    type: "Unclassified",
    description: "Developer-submitted candidate. Product claims have not been independently verified.",
  };
  assert.equal(getUnmodifiedPlaceholderResearchDraft(aegirPlaceholder, "bZbRXp2hmnLHuuzqWLNF")?.name, "Ægir Iron");
  assert.equal(getUnmodifiedPlaceholderResearchDraft(aegirPlaceholder, "another-submission"), null);
});

test("prepared sources are dated, claim-specific, and separate from submissions", () => {
  const ids = new Set();
  assert.deepEqual(Object.keys(catalogPreparedEvidence).sort(), ["aldo-coach", "gir-iron", "stark", "swithai"]);
  assert.deepEqual(preparedEvidenceForApp("unresearched-app"), []);
  for (const [appId, sources] of Object.entries(catalogPreparedEvidence)) {
    assert.ok(catalogResearchDrafts[appId]);
    assert.ok(sources.length);
    for (const source of sources) {
      assert.ok(!ids.has(source.id), `duplicate prepared source ${source.id}`);
      ids.add(source.id);
      assert.match(source.id, /^research-[a-z0-9-]+-2026-\d\d-\d\d-[a-z0-9-]+$/);
      assert.ok(Number.isFinite(source.checked_at));
      assert.ok(source.checked_at <= Date.now());
      assert.ok(source.claim_supported.length > 30);
      assert.ok(source.internal_note);
      if (source.source_type === "Hands-on testing") {
        assert.equal(source.public, 0);
        assert.equal(source.url, null);
      } else {
        assert.equal(source.public, 1);
        assert.ok(source.url?.startsWith("https://"));
      }
      assert.ok(!/developer submission|submitted claim/i.test(source.claim_supported));
    }
  }
});

test("local research changes require per-field acceptance and preserve saved owner edits", () => {
  const draft = catalogResearchDrafts["gir-iron"];
  const saved = structuredClone(draft);
  saved.researchStatus = "Researching";
  saved.description = "Earlier saved description";
  saved.features.push("Automatic rest timer");
  saved.trainingRelationship.tradeoff = "Owner's saved tradeoff";
  const changes = catalogProposalChanges(saved, draft);
  assert.ok(changes.some(change => change.path === "description"));
  assert.ok(changes.some(change => change.path === "features"));
  assert.ok(changes.some(change => change.path === "trainingRelationship.tradeoff"));
  assert.ok(!changes.some(change => change.path === "researchStatus"));
  const merged = applyCatalogProposal(saved, draft, ["description", "trainingRelationship.tradeoff"]);
  assert.equal(merged.description, draft.description);
  assert.equal(merged.trainingRelationship.tradeoff, draft.trainingRelationship.tradeoff);
  assert.deepEqual(merged.features, saved.features);
  assert.equal(merged.researchStatus, "Researching");
  assert.equal(saved.description, "Earlier saved description");
  assert.equal(merged.legit, saved.legit);
  assert.equal(merged.originalityProfile.score, saved.originalityProfile.score);
  assert.throws(() => applyCatalogProposal(saved, draft, ["researchStatus"]));
  assert.throws(() => applyCatalogProposal(saved, draft, ["description", "description"]));
});

test("accepting a rationale saves it once and invalidates an older edit form", () => {
  const draft = catalogResearchDrafts["gir-iron"];
  const saved = structuredClone(draft);
  saved.researchStatus = "Researching";
  saved.legitAssessment.rationale = "Earlier owner-approved wording";
  const oldFormFingerprint = catalogRecordFingerprint(saved);
  const updated = applyCatalogProposal(saved, draft, ["legitAssessment.rationale"]);
  assert.equal(updated.legitAssessment.rationale, draft.legitAssessment.rationale);
  assert.ok(!catalogProposalChanges(updated, draft).some(change => change.path === "legitAssessment.rationale"));
  assert.notEqual(catalogRecordFingerprint(updated), oldFormFingerprint);
  updated.researchStatus = "Reviewed";
  assert.ok(!catalogProposalChanges(updated, draft).some(change => change.path === "legitAssessment.rationale"));
});

test("accepting one score criterion recalculates the total without replacing other criteria", () => {
  const draft = catalogResearchDrafts["gir-iron"];
  const saved = structuredClone(draft);
  saved.legitAssessment.usability = draft.legitAssessment.usability + 5;
  saved.legit = calculateLegitScore(saved.legitAssessment);
  saved.originalityProfile.visualIdentity = 70;
  saved.originalityProfile.score = calculateOriginalityScore(saved.originalityProfile);
  const merged = applyCatalogProposal(saved, draft, ["legitAssessment.usability", "originalityProfile.visualIdentity"]);
  assert.equal(merged.legitAssessment.usability, draft.legitAssessment.usability);
  assert.equal(merged.legit, calculateLegitScore(merged.legitAssessment));
  assert.equal(merged.originalityProfile.score, calculateOriginalityScore(merged.originalityProfile));
  assert.equal(merged.legitAssessment.reliability, saved.legitAssessment.reliability);
  assert.equal(catalogRecordFingerprint({ ...saved, name: "One", type: "Two" }),
    catalogRecordFingerprint({ ...saved, type: "Two", name: "One" }));
  assert.notEqual(catalogRecordFingerprint(saved), catalogRecordFingerprint(merged));
});

test("creator associations remain owner-controlled when accepting local research", () => {
  const draft = structuredClone(catalogResearchDrafts["gir-iron"]);
  const saved = structuredClone(draft);
  saved.people = [{
    name: "Owner-added trainer", aliases: [], role: "Trainer",
    relationship: "Associated with the app", sourceUrl: "https://example.com",
    checkedAt: "2026-10-19",
  }];
  draft.description = "Updated local research summary";
  const changes = catalogProposalChanges(saved, draft);
  assert.ok(!changes.some(change => change.path === "people"));
  const descriptionOnly = applyCatalogProposal(saved, draft, ["description"]);
  assert.deepEqual(descriptionOnly.people, saved.people);
  draft.people = [];
  assert.ok(catalogProposalChanges(saved, draft).some(change => change.path === "people"));
  const peopleAccepted = applyCatalogProposal(saved, draft, ["people"]);
  assert.deepEqual(peopleAccepted.people, []);
  assert.deepEqual(saved.people, descriptionOnly.people);
});

test("initial candidate scores are calculated from documented dimensions", () => {
  for (const id of ["aldo-coach", "stark", "gir-iron", "swithai"]) {
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

test("swithAI draft remains private and does not replace owner edits or review status", () => {
  const draft = catalogResearchDrafts.swithai;
  assert.equal(draft.researchStatus, "Candidate");
  assert.equal(draft.legit, calculateLegitScore(draft.legitAssessment));
  assert.equal(draft.originalityProfile.score, calculateOriginalityScore(draft.originalityProfile));
  assert.equal(draft.legitAssessment.confidence, "Low");
  assert.ok(!apps.some(app => app.id === draft.id));
  assert.ok(!isLegacyPublicApp(draft.id));
  const saved = {...draft, type: "Unclassified", description: "Developer-submitted candidate. Product claims have not been independently verified."};
  assert.equal(getUnmodifiedPlaceholderResearchDraft(saved, "AOYBDZAvtNwvaD6u9S8c")?.id, "swithai");
  assert.equal(getUnmodifiedPlaceholderResearchDraft(saved, "unrelated-submission"), null);
  assert.equal(getUnmodifiedPlaceholderResearchDraft({...saved, description: "Owner edited description"}, "AOYBDZAvtNwvaD6u9S8c"), null);
  assert.equal(getUnmodifiedPlaceholderResearchDraft({...saved, researchStatus: "Reviewed"}, "AOYBDZAvtNwvaD6u9S8c"), null);
  for (const flag of ["deliversCompleteProgram", "programLibrary", "adaptiveProgramming", "hasUsableFreeTier"]) assert.equal(draft[flag], false);
  assert.ok(preparedEvidenceForApp("swithai").some(source => source.id.endsWith("owner-history")));
});
