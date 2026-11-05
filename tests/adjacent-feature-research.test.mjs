import assert from "node:assert/strict";
import test from "node:test";
import { apps } from "../lib/catalog.ts";
import { getLegacyPublicApps } from "../lib/legacy-public-catalog.ts";
import { publicCatalogRecord } from "../lib/catalog-facts.ts";
import { adjacentFeatureResearch } from "../lib/adjacent-feature-research.ts";
import { adjacentFeatureOptions,adjacentFeatureSummary } from "../lib/adjacent-features.ts";
import { fitScore,matchedAdjacentFeatures,exclusionReasons } from "../lib/matching.ts";
import { finderQuestions,validFinderAnswers } from "../lib/finder-questions.ts";

const selections=adjacentFeatureOptions.join("|");

test("the public-source audit covers all 37 listed identities and six sourced categories",()=>{
 const expected=[...getLegacyPublicApps(apps).map(app=>app.id),"aldo-coach"].sort();
 assert.deepEqual(Object.keys(adjacentFeatureResearch).sort(),expected);
 assert.equal(adjacentFeatureOptions.length,6);
 for(const [id,audit] of Object.entries(adjacentFeatureResearch)){
  assert.equal(audit.checkedAt,"2026-11-05",id);
  assert.equal(Object.keys(audit.features).length,6,id);
  for(const feature of adjacentFeatureOptions){
   const finding=audit.features[feature];assert.ok(finding.summary.length>20,`${id}: ${feature}`);
   assert.ok(finding.sourceUrls.length,`${id}: ${feature}`);
   for(const url of finding.sourceUrls){assert.match(url,/^https:\/\//);assert.ok(audit.sourcesChecked.includes(url));}
   assert.ok(["Officially documented","App-store documented"].includes(finding.evidenceClass));
  }
 }
});

test("audited facts reach public records without changing saved feature arrays or private records",()=>{
 const saved=structuredClone(apps.find(app=>app.id==="strong"));const before=JSON.stringify(saved);
 const result=publicCatalogRecord(saved);
 assert.equal(JSON.stringify(saved),before);assert.equal(saved.adjacentFeatureEvidence,undefined);
 assert.deepEqual(result.features,saved.features);
 assert.equal(result.adjacentFeatureEvidence.features["Wearable integration"].status,"Documented");
 assert.deepEqual(publicCatalogRecord(result),result);
 const later=structuredClone(result);later.adjacentFeatureEvidence={...later.adjacentFeatureEvidence,checkedAt:"2026-11-06"};
 assert.equal(publicCatalogRecord(later).adjacentFeatureEvidence.checkedAt,"2026-11-06");
});

test("audited unknowns, conflicts and separate products override broad legacy feature tags",()=>{
 const app={...apps[0],features:["Nutrition guidance","Recovery tracking","Meditation","Cardio workouts","Body fat tracking","Wearables"],adjacentFeatureEvidence:adjacentFeatureResearch.boostcamp};
 assert.deepEqual(matchedAdjacentFeatures(app,{extras:selections}),["Cardio"]);
 const gravl={...app,adjacentFeatureEvidence:adjacentFeatureResearch.gravl};
 assert.deepEqual(matchedAdjacentFeatures(gravl,{extras:"Nutrition"}),[]);
 const hevy={...app,adjacentFeatureEvidence:adjacentFeatureResearch.hevy};
 assert.deepEqual(matchedAdjacentFeatures(hevy,{extras:"Body composition"}),[]);
 assert.match(adjacentFeatureSummary(gravl.adjacentFeatureEvidence,"Nutrition"),/Separate product/);
});

test("wearable preference respects documented platforms and paid-feature boundaries",()=>{
 const app={...apps[0],adjacentFeatureEvidence:adjacentFeatureResearch.strong};
 assert.deepEqual(matchedAdjacentFeatures(app,{extras:"Wearable integration",platform:"iPhone"}),["Wearable integration"]);
 assert.deepEqual(matchedAdjacentFeatures(app,{extras:"Wearable integration",platform:"Android"}),[]);
 const jefit={...app,adjacentFeatureEvidence:adjacentFeatureResearch.jefit};
 assert.deepEqual(matchedAdjacentFeatures(jefit,{extras:"Wearable integration",platform:"Android"}),["Wearable integration"]);
 const paid={...app,adjacentFeatureEvidence:adjacentFeatureResearch.shred};
 assert.deepEqual(matchedAdjacentFeatures(paid,{extras:"Wearable integration",platform:"iPhone",budget:"Free only"}),[]);
 assert.deepEqual(matchedAdjacentFeatures(paid,{extras:"Wearable integration",platform:"iPhone"}),["Wearable integration"]);
 assert.deepEqual(exclusionReasons(paid,{extras:selections}),[]);
});

test("wearable selections restore and unselected audits do not change core matching",()=>{
 const extras=finderQuestions.find(question=>question.key==="extras");assert.ok(extras.options.includes("Wearable integration"));
 const saved=Object.fromEntries(finderQuestions.filter(question=>!question.multiple).map(question=>[question.key,question.options[0]]));
 assert.equal(validFinderAnswers({...saved,extras:"Nutrition|Wearable integration"}),true);
 for(const app of apps) assert.equal(fitScore(publicCatalogRecord(app),{}),fitScore(app,{}));
 const future={...apps[0],adjacentFeatureEvidence:{...adjacentFeatureResearch.jefit,checkedAt:"2999-01-01"}};
 assert.deepEqual(matchedAdjacentFeatures(future,{extras:selections}),[]);
 const invalid={...future,adjacentFeatureEvidence:{...future.adjacentFeatureEvidence,checkedAt:"2026-02-30"}};
 assert.deepEqual(matchedAdjacentFeatures(invalid,{extras:selections}),[]);
});
