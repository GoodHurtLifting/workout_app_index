import test from "node:test";
import assert from "node:assert/strict";
import { buildSitemapEntries, validSitemapDate } from "../lib/sitemap-entries.ts";

test("public sitemap dates come from current facts, never historical scores or request time",()=>{
  const factual={id:"factual",coverageMode:"factual",researchStatus:"Reviewed",platforms:["Android"],factClaims:[{field:"platforms",value:["Android"],checkedAt:"2026-10-22"}]};
  const legacy={id:"legacy",researchStatus:"Reviewed",legitAssessment:{checkedAt:"2026-10-23"}};
  const stale={...factual,id:"stale",platforms:["iOS"]};
  const unreviewed={...factual,id:"unreviewed",researchStatus:"Researching"};
  const first=buildSitemapEntries([factual,legacy,stale,unreviewed]);
  assert.deepEqual(buildSitemapEntries([factual,legacy,stale,unreviewed]),first);
  assert.equal(first.find(row=>row.url.endsWith("/factual")).lastModified,"2026-10-22");
  assert.equal(first.find(row=>row.url.endsWith("/legacy")).lastModified,undefined);
  assert.equal(first.find(row=>row.url.endsWith("/stale")).lastModified,undefined);
  assert.equal(first.find(row=>row.url.endsWith("/unreviewed")).lastModified,undefined);
  assert.ok(first.filter(row=>!row.url.includes("/apps/")).every(row=>row.lastModified===undefined));
});
test("sitemap rejects malformed/future dates, unsafe slugs and duplicate URLs",()=>{
  for(const date of ["2026-02-30","2026-1-2","2026-10-22T00:00:00Z","9999-01-01",null]) assert.equal(validSitemapDate(date),undefined);
  const rows=buildSitemapEntries([{id:"hevy"},{id:"hevy"},{id:"../admin"},{id:"hevy?q=x"}]);
  assert.equal(rows.filter(row=>row.url.includes("/apps/")).length,1);
  assert.ok(rows.every(row=>!/[?#]/.test(row.url)));
  assert.ok(rows.every(row=>!row.url.includes("/admin")&&!row.url.includes("/preview")));
});
