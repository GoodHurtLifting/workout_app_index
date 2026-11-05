import assert from "node:assert/strict";
import test from "node:test";
import { factualFixture } from "./fixtures/factual-profile.ts";
import { apps, getOriginalityProfile } from "../lib/catalog.ts";
import { missingReviewProfileDetails } from "../lib/catalog-review-readiness.ts";
import { factValue, prepareFactClaims, currentClaim, supportedFact, factualProfileProblems, publicCatalogRecord, factClaimsSchema, relatedOptions } from "../lib/catalog-facts.ts";
import { fitScore, exclusionReasons } from "../lib/matching.ts";
import { applyCatalogProposal, catalogRecordFingerprint } from "../lib/catalog-proposals.ts";
import { withPrivateLegacyScoreDraft } from "../lib/legacy-score-drafts.ts";
import { buildSitemapEntries } from "../lib/sitemap-entries.ts";

function bind(record,field,status="Officially documented") {
  const next={field,status,statement:"A synthetic current statement supporting this value.",checkedAt:"2026-11-04",url:status==="Independently observed"?"":"https://example.com/",context:"Synthetic fixture; US Android example only.",value:factValue(record,field)??null};
  record.factClaims=[...(record.factClaims??[]).filter(claim=>claim.field!==field),next];
}

test("sourced factual profiles with explicit unknowns need no editorial score",()=>{
  const record=factualFixture();
  assert.equal(record.legit,null);
  assert.deepEqual(missingReviewProfileDetails(record),[]);
  const legacy=apps[0];
  assert.equal(publicCatalogRecord(legacy).legit,null);
  assert.equal(publicCatalogRecord(legacy).id,legacy.id);
  assert.equal(getOriginalityProfile(legacy).score,getOriginalityProfile({...legacy}).score);
});

test("source claims become stale when their supported values change",()=>{
  const record=factualFixture();
  record.platforms=["Web"];
  assert.equal(currentClaim(record,"platforms"),undefined);
  assert.ok(factualProfileProblems(record).some(problem=>problem.includes("platform")));
  bind(record,"platforms");
  assert.equal(supportedFact(record,"platforms"),true);
  record.factClaims=prepareFactClaims(record.factClaims.map(claim=>claim.field==="identity"?{...claim,rechecked:true}:claim),record);
  assert.equal(currentClaim(record,"identity")?.value.name,record.name);
});

test("unknown, conflicting, or developer-reported capabilities cannot satisfy hard finder requirements",()=>{
  for(const status of ["Not established","Conflicting","Developer-reported"]){
    const record=factualFixture();record.deliversCompleteProgram=true;bind(record,"deliversCompleteProgram",status);
    assert.equal(fitScore(record,{job:"Give me a complete program"}),0);
    assert.ok(exclusionReasons(record,{job:"Give me a complete program"})[0].includes("not established"));
    assert.ok(factualProfileProblems(record).some(problem=>problem.includes("unsupported")));
  }
  const record=factualFixture();
  assert.equal(fitScore(record,{budget:"Free only"}),0);
  assert.match(exclusionReasons(record,{budget:"Free only"})[0],/not established/);
  assert.match(exclusionReasons(record,{ai:"Avoid all AI"})[0],/not established/);
  record.deliversCompleteProgram=false;bind(record,"deliversCompleteProgram");
  assert.deepEqual(exclusionReasons(record,{job:"Give me a complete program"}),["Does not provide a complete training program"]);
});

test("documented preferences earn points while unobserved fast logging earns none",()=>{
  const record=factualFixture();record.features=["Fast logging"];bind(record,"features");
  assert.equal(fitScore(record,{priority:"Fast logging"}),fitScore(record,{}));
  assert.equal(fitScore(record,{job:"Log workouts quickly"}),fitScore(record,{}));
  bind(record,"feature:Fast logging","Independently observed");
  assert.equal(fitScore(record,{priority:"Fast logging"}),fitScore(record,{})+12);
  record.goals=["Build muscle"];bind(record,"goals");
  assert.equal(fitScore(record,{goal:"Build muscle"}),fitScore(record,{})+14);
});

test("historical scores remain private and are stripped from factual publication payloads",()=>{
  const record={...factualFixture(),legit:87,legitAssessment:withPrivateLegacyScoreDraft(apps[0],apps[0]).legitAssessment,originalityProfile:getOriginalityProfile(apps[0])};
  const before=catalogRecordFingerprint(record);
  const published=publicCatalogRecord(record);
  assert.equal(published.legit,null);
  assert.equal("legitAssessment" in published,false);
  assert.equal("originalityProfile" in published,false);
  assert.equal(catalogRecordFingerprint(record),before);
  assert.equal(withPrivateLegacyScoreDraft({...record,id:apps[0].id},apps[0]).legit,87);
});

test("factual approval requires resolved disclosure and real, bound dates and sources",()=>{
  const record=factualFixture();record.commercialDisclosure={status:"not-established",statement:""};
  assert.ok(factualProfileProblems(record).includes("Commercial relationship disclosure"));
  record.commercialDisclosure={status:"material",statement:""};
  assert.ok(factualProfileProblems(record).includes("Commercial relationship disclosure"));
  record.commercialDisclosure={status:"material",statement:"The developer funded a separately scoped private product test."};
  assert.deepEqual(factualProfileProblems(record),[]);
  for(const checkedAt of ["2026-02-30","2099-01-01","not a date"]){assert.equal(factClaimsSchema.safeParse([{...record.factClaims[0],checkedAt}]).success,false);}
  record.factClaims=record.factClaims.filter(claim=>claim.field!=="pricing");
  assert.ok(missingReviewProfileDetails(record).some(problem=>problem.includes("pricing")));
});

test("coverage proposals remain selected-field changes and never alter review status or scores",()=>{
  const saved={...apps[0],researchStatus:"Researching"};
  const draft={...saved,coverageMode:"factual",factClaims:[],commercialDisclosure:{status:"none",statement:""}};
  const next=applyCatalogProposal(saved,draft,["coverageMode","factClaims","commercialDisclosure"]);
  assert.equal(next.legit,saved.legit);assert.equal(next.researchStatus,"Researching");assert.equal(next.coverageMode,"factual");assert.equal(saved.coverageMode,undefined);
});

test("factual sitemap uses checked facts only after owner review",()=>{
  const record=factualFixture();
  assert.equal(buildSitemapEntries([record]).find(entry=>entry.url.includes(record.id)).lastModified,undefined);
  record.researchStatus="Reviewed";
  assert.equal(buildSitemapEntries([record]).find(entry=>entry.url.includes(record.id)).lastModified,"2026-11-04");
});

test("related options use supported goals instead of missing or historical ratings",()=>{
  const record=factualFixture();record.goals=["Build muscle"];bind(record,"goals");
  const first={...structuredClone(record),id:"a",name:"Alpha",legit:null};
  const second={...structuredClone(record),id:"z",name:"Zulu",legit:100};
  assert.deepEqual(relatedOptions(record,[second,first]).map(app=>app.id),["a","z"]);
  first.goals=["Get stronger"];
  assert.deepEqual(relatedOptions(record,[first]),[]);
});

test("explicit null facts on a scored record are uncertainty rather than negative findings",()=>{
  const record={...apps[0],coverageMode:"scored",deliversCompleteProgram:null,hasUsableFreeTier:null};
  assert.match(exclusionReasons(record,{job:"Give me a complete program"})[0],/not established/);
  assert.match(exclusionReasons(record,{budget:"Free only"})[0],/not established/);
});

test("public catalog removes historical ratings from every coverage mode without changing private records or matching",()=>{
 for(const coverageMode of [undefined,"scored","factual"]){
  const record={...structuredClone(apps[0]),...(coverageMode?{coverageMode}:{}),legit:93,legitAssessment:withPrivateLegacyScoreDraft(apps[0],apps[0]).legitAssessment,originalityProfile:getOriginalityProfile(apps[0])};
  const before=catalogRecordFingerprint(record);const published=publicCatalogRecord(record);
  assert.equal(published.legit,null);assert.equal("legitAssessment" in published,false);assert.equal("originalityProfile" in published,false);
  assert.equal(catalogRecordFingerprint(record),before);assert.equal(record.legit,93);
  assert.equal(fitScore(published,{platform:"Android",priority:"Fast logging"}),fitScore(record,{platform:"Android",priority:"Fast logging"}));
  assert.equal(catalogRecordFingerprint(publicCatalogRecord(published)),catalogRecordFingerprint(published));
 }
});
