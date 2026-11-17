import test from "node:test";
import assert from "node:assert/strict";
import {eligibilityFor,eligibilityProblem,serviceStartProblem} from "../lib/inbox-workflow.ts";
import {emptyEngagement} from "../lib/developer-offers.ts";
import {researchBrief,redactBrief} from "../lib/submission-brief.ts";
test("legacy labels do not invent eligibility failures or hands-on evidence",()=>{
 const old={status:"not_selected",screeningCriteria:{liveProduct:true,reviewAccess:false},screeningCompletedAt:1};
 const e=eligibilityFor(old);assert.equal(e.result,"pending");assert.equal(e.findings.reviewAccess,"unknown");assert.equal(e.findings.liveProduct,"pass");
 assert.match(eligibilityProblem({...e,result:"eligible"}),/every/);
 assert.match(eligibilityProblem({...e,result:"ineligible"}),/failed/);
});
test("listing work and holds are independent of signed service/deposit gates",()=>{
 assert.equal(serviceStartProblem({...emptyEngagement,agreedProducts:["listing"],workStatus:"in_progress"}),null);
 assert.equal(serviceStartProblem({...emptyEngagement,agreedProducts:["focused_test"],workStatus:"on_hold",note:""}),null);
 assert.match(serviceStartProblem({...emptyEngagement,agreedProducts:["focused_test"],workStatus:"in_progress"}),/50%/);
 const e={...emptyEngagement,agreedProducts:["focused_test"],workStatus:"in_progress",signedScopeReference:"signed",signedScopeAt:1,totalCents:10000,invoiceRefs:[{stage:"deposit",verifiedAt:1,amountPaid:5000,refunded:0,products:["focused_test"]}]};
 assert.equal(serviceStartProblem(e),null);assert.match(serviceStartProblem({...e,agreedProducts:["launch_review"]}),/50%/);
});
test("research brief includes payment, checklist and legacy context without access/contact credentials",()=>{
 const r={kind:"app",id:"abcdefghijklmnopqrst",createdAt:1,status:"received",appName:"Test",websiteUrl:"https://example.invalid?token=secret",storeUrl:"",privacyUrl:"https://example.invalid/privacy",availability:"Web",pricing:"Free",details:"Contact test@example.invalid\npassword: secret-value",developerAccessHash:"privatehash",email:"contact@example.invalid",selectedProduct:"focused_test",initiallyRequestedProducts:["listing"],listingPurchasedAt:1,listingPaymentStatus:"paid"};
 const text=researchBrief(r);assert.match(text,/Verified purchased products: Listing/);assert.match(text,/Eligibility checklist/);assert.match(text,/Legacy free request: Yes/);assert.match(text,/Human testing/);for(const secret of ["secret-value","token=secret","privatehash","test@example.invalid","contact@example.invalid"])assert.equal(text.includes(secret),false);
});

test("public store package IDs survive brief redaction while capabilities are removed",()=>{assert.equal(redactBrief("https://play.google.com/store/apps/details?id=com.example.app&token=secret"),"https://play.google.com/store/apps/details?id=com.example.app");});
