import test from "node:test";
import assert from "node:assert/strict";
import { aegirReview, articleStructuredData } from "../lib/editorial.ts";
import { profileCoverage } from "../lib/catalog-coverage.ts";
import { buildSitemapEntries } from "../lib/sitemap-entries.ts";

test("approved editorial coverage links to the article without broadening tested claims or changing saved values", () => {
  const app = { id: "gir-iron", researchStatus: "Reviewed", factClaims: [], platforms: ["iOS"] };
  const before = structuredClone(app);
  const coverage = profileCoverage(app);
  assert.deepEqual(coverage.labels, ["Researched claims", "Hands-on verified findings", "Editorial review"]);
  assert.equal(coverage.editorialReview.href, "/reviews/aegir-iron");
  assert.match(coverage.handsOn.scope, /one completed workout/);
  assert.match(coverage.handsOn.context, /were not tested/);
  assert.deepEqual(coverage.claims, []);
  assert.deepEqual(app, before);
  assert.equal(profileCoverage({ id: "unreviewed-app", factClaims: [] }).editorialReview, undefined);
});

test("the public article has an author, scoped evidence and stable search entries without a numeric rating", () => {
  const structured = articleStructuredData(aegirReview);
  assert.equal(structured["@type"], "Article");
  assert.equal(structured.author.url, "https://workoutappindex.com/about");
  assert.equal(structured.datePublished, "2026-11-25");
  assert.equal(structured.reviewRating, undefined);
  assert.equal(structured.aggregateRating, undefined);
  assert.match(aegirReview.sections[1].paragraphs[1], /Angela told me/);
  assert.match(aegirReview.sections[1].paragraphs[1], /I didn’t test either feature/);
  const rows = buildSitemapEntries([]);
  for (const path of ["about", "reviews", "reviews/aegir-iron"]) {
    assert.equal(rows.filter(row => row.url === `https://workoutappindex.com/${path}`).length, 1);
  }
  assert.equal(rows.find(row => row.url.endsWith("/reviews/aegir-iron")).lastModified, aegirReview.publishedAt);
});
