import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { profileStructuredData, siteStructuredData, publicOpenGraph } from "../lib/seo.ts";
const source=path=>readFileSync(new URL(`../${path}`,import.meta.url),"utf8");
test("factual structured data describes public pages and breadcrumbs without invented software ratings or prices",()=>{
  const graph=profileStructuredData({id:"hevy",name:"Hevy",description:"Workout logging"});
  assert.deepEqual(graph["@graph"].map(row=>row["@type"]),["WebPage","BreadcrumbList"]);
  assert.equal(graph["@graph"][1].itemListElement.at(-1).item,"https://workoutappindex.com/apps/hevy");
  assert.ok(!/aggregateRating|SoftwareApplication|offers|reviewRating/.test(JSON.stringify(graph)));
  assert.deepEqual(siteStructuredData["@graph"].map(row=>row["@type"]),["Organization","WebSite"]);
  assert.equal(publicOpenGraph("Services","Research","/services").url,"https://workoutappindex.com/services");
});
test("private routes opt out of indexing and draft preview omits public structured data",()=>{
  for(const path of ["app/admin/layout.tsx","app/preview/page.tsx"]) assert.match(source(path),/index: false, follow: false/);
  assert.match(source("app/admin/apps/[id]/preview/page.tsx"),/includeStructuredData=\{false\}/);
  assert.match(source("app/robots.ts"),/"\/admin", "\/admin\/"/);
  assert.match(source("app/apps/page.tsx"),/canonical:"\/apps"/);
});
