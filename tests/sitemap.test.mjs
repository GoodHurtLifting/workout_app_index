import test from "node:test";
import assert from "node:assert/strict";
import { buildSitemapEntries, validSitemapDate } from "../lib/sitemap-entries.ts";

test("sitemap dates are stable and use only valid reviewed assessment dates", () => {
  const reviewed = { id: "reviewed", researchStatus: "Reviewed", legitAssessment: { checkedAt: "2026-10-22" } };
  const preliminary = { id: "preliminary", researchStatus: "Researching", legitAssessment: { checkedAt: "2026-10-23" } };
  const invalid = { id: "invalid", researchStatus: "Reviewed", legitAssessment: { checkedAt: "2026-02-30" } };
  const first = buildSitemapEntries([reviewed, preliminary, invalid]);
  const second = buildSitemapEntries([reviewed, preliminary, invalid]);
  assert.deepEqual(second, first);
  assert.equal(first.find(entry => entry.url.endsWith("/reviewed"))?.lastModified, "2026-10-22");
  assert.equal(first.find(entry => entry.url.endsWith("/preliminary"))?.lastModified, undefined);
  assert.equal(first.find(entry => entry.url.endsWith("/invalid"))?.lastModified, undefined);
  assert.ok(first.filter(entry => !entry.url.includes("/apps/")).every(entry => entry.lastModified === undefined));
});

test("invalid or imprecise assessment dates are omitted", () => {
  for (const value of ["2026-02-30", "2026-1-2", "2026-10-22T00:00:00Z", "not a date", null]) {
    assert.equal(validSitemapDate(value), undefined);
  }
});
