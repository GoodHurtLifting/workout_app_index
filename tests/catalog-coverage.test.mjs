import test from "node:test";
import assert from "node:assert/strict";
import { apps } from "../lib/catalog.ts";
import { factValue } from "../lib/catalog-facts.ts";
import { claimCoverageLabel, profileCoverage } from "../lib/catalog-coverage.ts";
import { missingReviewProfileDetails } from "../lib/catalog-review-readiness.ts";

test("legacy scores, review completion and factual mode do not imply hands-on coverage", () => {
  for (const app of apps) {
    assert.deepEqual(profileCoverage({ ...app, researchStatus: "Reviewed" }).labels, ["Researched claims"]);
    assert.deepEqual(profileCoverage({ ...app, coverageMode: "factual" }).labels, ["Researched claims"]);
  }
});

test("owner-confirmed historical use is scoped and never invents an editorial review", () => {
  for (const id of ["aldo-coach", "workoutflow-app", "swithai"]) {
    const coverage = profileCoverage({ ...apps[0], id });
    assert.deepEqual(coverage.labels, ["Researched claims", "Hands-on verified findings"]);
    assert.ok(coverage.handsOn.scope);
    assert.ok(coverage.handsOn.context);
    assert.equal(coverage.editorialReview, undefined);
  }
  assert.match(profileCoverage({ ...apps[0], id: "workoutflow-app" }).handsOn.testedAt, /Not recorded/);
});

test("only current value-bound firsthand claims add verified findings", () => {
  const app = { ...apps[0], id: "new-profile", coverageMode: "factual" };
  const claim = { field: "feature:Fast logging", status: "Independently observed", statement: "Logged one set during testing.", checkedAt: "2026-10-01", context: "One session; test device and version.", url: "", value: true };
  app.features = ["Fast logging"];
  app.factClaims = [claim];
  assert.equal(profileCoverage(app).claims.length, 1);
  assert.equal(claimCoverageLabel(app, claim), "Hands-on verified finding");
  assert.equal(profileCoverage(app).labels.includes("Editorial review"), false);
  const changed = { ...app, features: [] };
  assert.deepEqual(profileCoverage(changed).labels, ["Researched claims"]);
  assert.equal(claimCoverageLabel(changed, claim), "Needs rechecking");
  const future = { ...claim, checkedAt: "2999-01-01" };
  assert.equal(profileCoverage({ ...app, factClaims: [future] }).claims.length, 0);
  for (const status of ["Officially documented", "App-store documented", "Developer-reported", "Conflicting", "Not established"]) {
    const other = { ...claim, status };
    assert.deepEqual(profileCoverage({ ...app, factClaims: [other] }).labels, ["Researched claims"]);
  }
});

test("coverage leaves saved values, missing information and review status untouched", () => {
  const app = { ...structuredClone(apps[0]), id: "aldo-coach", researchStatus: "Candidate", coverageMode: "factual", platforms: [], commercialDisclosure: { status: "not-established", statement: "" } };
  const before = structuredClone(app);
  const missing = missingReviewProfileDetails(app);
  profileCoverage(app);
  assert.deepEqual(app, before);
  assert.deepEqual(missingReviewProfileDetails(app), missing);
  assert.ok(missing.includes("Commercial relationship disclosure"));
  const claim = { field: "pricing", status: "App-store documented", statement: "Advertised price.", checkedAt: "2026-10-01", context: "US store", url: "https://example.com", value: factValue(app, "pricing") };
  assert.equal(claimCoverageLabel({ ...app, factClaims: [claim] }, claim), "Researched claim");
});
