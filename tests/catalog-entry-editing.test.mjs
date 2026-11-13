import test from "node:test";
import assert from "node:assert/strict";
import { apps,getTrainingRelationship } from "../lib/catalog.ts";
import { factualFixture } from "./fixtures/factual-profile.ts";
import { publicCatalogRecord } from "../lib/catalog-facts.ts";
import { adjacentFeatureResearch } from "../lib/adjacent-feature-research.ts";
import { adjacentFeatureOptions } from "../lib/adjacent-features.ts";
import { matchedAdjacentFeatures } from "../lib/matching.ts";
import { catalogRecordFingerprint,catalogEntryProposalChanges } from "../lib/catalog-proposals.ts";
import { buildCatalogEntryUpdate,catalogListingProblems,catalogMissingItems,catalogEditIsCurrent,replacePublicCatalogEntry,hasCatalogPublicSource } from "../lib/catalog-entry-editing.ts";

function editForm(app){
 const form=new FormData();
 for(const key of ["name","initials","color","type","description","bestFor","caveat","price","authorship","ai"])form.set(key,app[key]??"");
 form.set("monthlyPrice",app.monthlyPrice??"");
 for(const key of ["platforms","level","goals","features","supportedTrainingEnvironments"])form.set(key,app[key].join(", "));
 const relationship=getTrainingRelationship(app);
 for(const key of ["planningStyle","choiceLoad","continuity","customization","decisionsRemoved","decisionsRemaining","tradeoff","idealUser","notFor"])form.set(key,relationship[key]??"");
 form.set("secondaryStyles",relationship.secondaryStyles?.join(", ")??"");
 for(const key of ["deliversCompleteProgram","programLibrary","adaptiveProgramming","supportsOneTimePurchase","hasUsableFreeTier"])form.set(key,app[key]==null?"unknown":String(app[key]));
 for(const [key,path] of [["freeCompleteProgram","completeProgram"],["freeAdaptiveProgramming","adaptiveProgramming"],["freeProgramLibrary","programLibrary"]])form.set(key,app.freeTierCapabilities[path]==null?"unknown":String(app.freeTierCapabilities[path]));
 form.set("disclosureStatus",app.commercialDisclosure?.status??"not-established");form.set("disclosureStatement",app.commercialDisclosure?.statement??"");
 form.set("factClaims",JSON.stringify(app.factClaims??[]));
 const audit=publicCatalogRecord(app).adjacentFeatureEvidence;if(audit)form.set("adjacentFeatureEvidence",JSON.stringify(audit));
 return form;
}

test("factual edits preserve private historical ratings and stages without requiring score inputs",()=>{
 const app={...structuredClone(apps[0]),researchStatus:"Reviewed",legit:44,legitAssessment:{rationale:"Historical private note",rubricVersion:"initial-v1"},originalityProfile:{score:17,summary:"Private history"}};
 const before=structuredClone(app);const form=editForm(app);form.set("description","An updated factual product description.");form.set("legit","100");form.set("originalityScore","100");form.set("coverageMode","factual");
 const updated=buildCatalogEntryUpdate(app,form);
 assert.equal(updated.description,"An updated factual product description.");assert.equal(updated.legit,44);assert.deepEqual(updated.legitAssessment,before.legitAssessment);assert.deepEqual(updated.originalityProfile,before.originalityProfile);assert.equal(updated.researchStatus,"Reviewed");assert.equal(updated.coverageMode,app.coverageMode);assert.deepEqual(app,before);
});

test("a listing needs factual identity, platform evidence and disclosure, not subjective ratings or optional features",()=>{
 const app=factualFixture();app.legit=null;delete app.originalityProfile;delete app.legitAssessment;
 assert.deepEqual(catalogListingProblems(app,hasCatalogPublicSource(app,[])),[]);
 assert.ok(catalogListingProblems(app,false).includes("At least one dated public source"));
 const missing={...app,platforms:[],commercialDisclosure:{status:"not-established",statement:""}};
 assert.ok(catalogListingProblems(missing,true).includes("Supported platforms"));assert.ok(catalogListingProblems(missing,true).includes("Ownership and commercial disclosure"));
 assert.ok(catalogListingProblems({...app,description:"Research candidate. Not yet researched."},true).includes("Product identity and description"));
});

test("single-entry publication preserves unrelated public profiles and does not mutate the private stage",()=>{
 const snapshot=structuredClone(apps.slice(0,3));const before=structuredClone(snapshot);const record={...snapshot[1],description:"New factual description",researchStatus:"Researching"};
 const next=replacePublicCatalogEntry(snapshot,record);assert.equal(next.length,3);
 for(const other of [snapshot[0],snapshot[2]])assert.deepEqual(next.find(app=>app.id===other.id),other);
 const entry=next.find(app=>app.id===record.id);assert.equal(entry.description,record.description);assert.equal(entry.legit,null);assert.equal(entry.legitAssessment,undefined);assert.equal(entry.originalityProfile,undefined);assert.equal(entry.researchStatus,"Reviewed");assert.equal(record.researchStatus,"Researching");assert.deepEqual(snapshot,before);
 assert.equal(replacePublicCatalogEntry(snapshot,{...record,id:"new-entry"}).length,4);
});

test("stale saved forms and already-created entries cannot overwrite newer records",()=>{
 const app=apps[0];const fingerprint=catalogRecordFingerprint(app);
 assert.equal(catalogEditIsCurrent(app,fingerprint),true);assert.equal(catalogEditIsCurrent({...app,price:"Updated"},fingerprint),false);assert.equal(catalogEditIsCurrent(null,"unsaved"),true);assert.equal(catalogEditIsCurrent(app,"unsaved"),false);
});

test("feature edits retain per-feature dates and supersede bundled research without changing other findings",()=>{
 const app={...structuredClone(apps.find(app=>app.id==="strong")),commercialDisclosure:{status:"none",statement:""}};const form=editForm(app);const audit=JSON.parse(form.get("adjacentFeatureEvidence"));
 audit.features["Wearable integration"]={...audit.features["Wearable integration"],status:"Not established",summary:"Device support needs rechecking.",checkedAt:"2026-11-04"};form.set("adjacentFeatureEvidence",JSON.stringify(audit));
 const updated=buildCatalogEntryUpdate(app,form);const published=publicCatalogRecord(updated);
 assert.equal(published.adjacentFeatureEvidence.ownerEdited,true);assert.equal(published.adjacentFeatureEvidence.features["Wearable integration"].checkedAt,"2026-11-04");assert.deepEqual(published.adjacentFeatureEvidence.features.Nutrition,adjacentFeatureResearch.strong.features.Nutrition);assert.deepEqual(matchedAdjacentFeatures(published,{extras:"Wearable integration",platform:"iPhone"}),[]);
 assert.equal(buildCatalogEntryUpdate(app,editForm(app)).adjacentFeatureEvidence,undefined);
});

test("feature editor rejects unsupported positive claims and future check dates but accepts optional unknowns",()=>{
 const app=apps.find(app=>app.id==="strong");const form=editForm(app);const audit=JSON.parse(form.get("adjacentFeatureEvidence"));
 audit.features.Nutrition.sourceUrls=[];form.set("adjacentFeatureEvidence",JSON.stringify(audit));assert.throws(()=>buildCatalogEntryUpdate(app,form));
 audit.features.Nutrition.sourceUrls=["https://example.com/features"];audit.features.Nutrition.checkedAt="2999-01-01";form.set("adjacentFeatureEvidence",JSON.stringify(audit));assert.throws(()=>buildCatalogEntryUpdate(app,form));
 const unknown={name:app.name,checkedAt:"",reviewScope:"Not researched",sourcesChecked:[],features:Object.fromEntries(adjacentFeatureOptions.map(feature=>[feature,{status:"Not established",summary:"Not established",sourceUrls:[],evidenceClass:"Officially documented"}]))};form.set("adjacentFeatureEvidence",JSON.stringify(unknown));assert.doesNotThrow(()=>buildCatalogEntryUpdate(app,form));
});

test("factual proposals do not offer archived scores or coverage conversion",()=>{
 const app=apps[0];const draft={...app,description:"Updated facts",coverageMode:"factual",legit:100,legitAssessment:{rationale:"New score"},originalityProfile:{score:100,summary:"New score"}};
 const changes=catalogEntryProposalChanges(app,draft);assert.ok(changes.some(change=>change.path==="description"));assert.equal(changes.some(change=>/legit|originality|coverageMode/.test(change.path)),false);
});

test("undated imports, private notes and future dates do not pass the publication source check",()=>{
 const app={...apps[0],id:"source-test",factClaims:[]};const source={public:1,url:"https://example.com/features",checked_at:1000,internal_note:null};
 assert.equal(hasCatalogPublicSource(app,[source],2000),true);assert.equal(hasCatalogPublicSource(app,[{...source,internal_note:"Seeded from the source catalog; needs rechecking"}],2000),false);assert.equal(hasCatalogPublicSource(app,[{...source,public:0}],2000),false);assert.equal(hasCatalogPublicSource(app,[{...source,checked_at:3000}],2000),false);
});

test("dated feature research counts as a public source without duplicate manual entry",()=>{
 assert.equal(hasCatalogPublicSource(apps.find(app=>app.id==="strong"),[]),true);
 assert.equal(hasCatalogPublicSource(apps.find(app=>app.id==="gymshark-training"),[]),false);
});

test("missing content stays visible independently of completed review or public status",()=>{
 const app={...factualFixture(),researchStatus:"Reviewed",trainingRelationship:undefined,hasUsableFreeTier:null};
 const before=JSON.stringify(app);const missing=catalogMissingItems(app,true);
 assert.ok(missing.includes("Training approach"));assert.ok(missing.includes("Usable free tier"));assert.equal(JSON.stringify(app),before);assert.equal(app.researchStatus,"Reviewed");
});
