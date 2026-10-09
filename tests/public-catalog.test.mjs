import test from "node:test";
import assert from "node:assert/strict";
import { apps } from "../lib/catalog.ts";
import { getLegacyPublicApps, isLegacyPublicApp, legacyPublicAppIds, mergePublishedCatalog } from "../lib/legacy-public-catalog.ts";
import { catalogResearchDrafts, getUnmodifiedCandidateResearchDraft } from "../lib/catalog-research-drafts.ts";

test("the original 36 retain an explicit legacy-public marker", () => {
  assert.equal(legacyPublicAppIds.length, 36);
  assert.equal(new Set(legacyPublicAppIds).size, 36);
  const legacy = getLegacyPublicApps(apps);
  assert.equal(legacy.length, 36);
  assert.deepEqual(new Set(legacy.map((app) => app.id)), new Set(legacyPublicAppIds));
  assert.ok(legacy.some((app) => app.researchStatus !== "Reviewed"));
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
