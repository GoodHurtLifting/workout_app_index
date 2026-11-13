import test,{afterEach} from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import {developerDetailsSchema,developerServiceSelectionSchema,servicePaymentStatus} from "../lib/developer-offers.ts";
import {listingPaymentSnapshot} from "../lib/listing-payment-state.ts";
import {developerCohorts} from "../lib/developer-report.ts";
import {trackDeveloperEvent} from "../lib/developer-analytics.ts";
afterEach(()=>{delete globalThis.window;});
const details={kind:"app",name:"Test",email:"test@example.invalid",appName:"Commerce test",websiteUrl:"https://example.invalid",storeUrl:"",privacyUrl:"https://example.invalid/privacy",availability:"Web",pricing:"Free",details:"A clearly identified test app with a sufficiently detailed description."};
test("listing-only details allow optional goals and reject unsafe URLs and oversized answers",()=>{
 assert.equal(developerDetailsSchema.parse(details).helpWanted,"");
 for(const bad of [{...details,privacyUrl:"javascript:alert(1)"},{...details,helpWanted:"x".repeat(1501)},{...details,email:"bad"}]) assert.equal(developerDetailsSchema.safeParse(bad).success,false);
});
test("listing states enforce the server price and distinguish pending, failed, cancelled and refunds",()=>{
 const base={amount:2000,currency:"usd",paymentStatus:"unpaid",sessionStatus:"open",refunded:0};
 assert.equal(listingPaymentSnapshot(base).status,"checkout_open");
 assert.equal(listingPaymentSnapshot({...base,sessionStatus:"complete"}).status,"pending");
 assert.equal(listingPaymentSnapshot({...base,failed:true}).status,"failed");
 assert.equal(listingPaymentSnapshot({...base,cancelled:true}).status,"cancelled");
 assert.equal(listingPaymentSnapshot({...base,sessionStatus:"expired"}).status,"expired");
 assert.deepEqual(listingPaymentSnapshot({...base,paymentStatus:"paid",refunded:500}),{status:"partially_refunded",grossCents:2000,refundedCents:500,netCents:1500});
 assert.equal(listingPaymentSnapshot({...base,paymentStatus:"paid",refunded:2000}).status,"refunded");
 for(const bad of [{...base,amount:20},{...base,currency:"eur"},{...base,refunded:2001}]) assert.throws(()=>listingPaymentSnapshot(bad));
});
test("scope, payment and work states remain independent",()=>{
 const invoice={id:"in_test",stage:"deposit",status:"paid",amountPaid:5000,refunded:0,currency:"usd",dueAt:null,verifiedAt:1,livemode:false};
 assert.equal(servicePaymentStatus(null,[]),"unpaid");
 assert.equal(servicePaymentStatus(10000,[]),"quoted");
 assert.equal(servicePaymentStatus(10000,[invoice]),"deposit_paid");
 assert.equal(servicePaymentStatus(10000,[invoice,{...invoice,id:"in_balance",stage:"balance"}]),"fully_paid");
 assert.equal(servicePaymentStatus(10000,[invoice,{...invoice,id:"in_balance",stage:"balance",status:"open",amountPaid:0,dueAt:1}],2),"overdue");
 assert.equal(servicePaymentStatus(10000,[{...invoice,refunded:5000}]),"refunded");
});
test("operational cohorts separate recent pending, matured outcomes, checkout abandonment and later sales",()=>{
 const start=Date.parse("2026-11-01"),now=start+10*86400000;
 const rows=[{pageOneCompletedAt:start,listingPurchasedAt:start+1,serviceInquiryAt:start+2},
 {pageOneCompletedAt:start,listingPurchasedAt:start+1},
 {pageOneCompletedAt:start,checkoutStartedAt:start+1,serviceInquiryAt:start+2,engagement:{invoiceRefs:[{amountPaid:5000,refunded:0,paidAt:start+3,livemode:true}]}},
 {pageOneCompletedAt:start},{pageOneCompletedAt:now-100},
 {pageOneCompletedAt:start,testData:true}];
 const groups=developerCohorts(rows,now);
 assert.deepEqual([groups[0].pageOne,groups[0].both,groups[0].purchase,groups[0].inquiry,groups[0].neitherAfterWindow,groups[0].checkoutUnconverted,groups[0].inquiryThenSale],[4,1,1,1,1,1,1]);
 assert.equal(groups[1].neitherPending,1);
 assert.equal(developerCohorts([{pageOneCompletedAt:start,listingPurchasedAt:start+1,order:{livemode:false,grossCents:2000}}],now)[0].purchase,0);
 assert.equal(developerCohorts(rows,now,true)[0].pageOne,5);
 // A conversion after seven days does not rewrite the seven-day cohort outcome.
 assert.equal(developerCohorts([{pageOneCompletedAt:start,listingPurchasedAt:now-1}],now)[0].neitherAfterWindow,1);
});
test("developer events expose only opaque request IDs and allowlisted services with consent",()=>{
 const events=[];
 const browser=(consent,path="/submit-app")=>{globalThis.window=Object.assign(new EventTarget(),{location:{pathname:path},localStorage:{getItem:()=>consent},gtag:(...args)=>events.push(args)});};
 browser("granted"); assert.equal(trackDeveloperEvent("service_inquiry_saved","A".repeat(20)),true);
 assert.equal(trackDeveloperEvent("submission_service_selected","A".repeat(20),"private answer"),false);
 assert.equal(trackDeveloperEvent("service_inquiry_saved","person@example.invalid"),false);
 browser("denied"); assert.equal(trackDeveloperEvent("service_inquiry_saved","A".repeat(20)),false);
 browser("granted","/admin"); assert.equal(trackDeveloperEvent("service_inquiry_saved","A".repeat(20)),false);
 assert.equal(events.length,1); assert.equal(events[0][2].submission_id,"A".repeat(20));assert.equal(events[0][2].page_location,"/submit-app");
});
test("Stripe signatures reject forged, changed and stale webhook payloads",()=>{
 const stripe=new Stripe("sk_test_not_a_real_key");const secret="whsec_local_test_only",payload=JSON.stringify({id:"evt_test",object:"event",livemode:false});
 const signature=stripe.webhooks.generateTestHeaderString({payload,secret});
 assert.equal(stripe.webhooks.constructEvent(payload,signature,secret).id,"evt_test");
 assert.throws(()=>stripe.webhooks.constructEvent(payload+" ",signature,secret));
 assert.throws(()=>stripe.webhooks.constructEvent(payload,signature,"whsec_wrong"));
 const stale=stripe.webhooks.generateTestHeaderString({payload,secret,timestamp:1});
 assert.throws(()=>stripe.webhooks.constructEvent(payload,stale,secret));
});

test("developer inquiries accept exactly one supported service per selection",()=>{
 for(const service of ["focused_test","launch_review","competitive_audit"]) assert.equal(developerServiceSelectionSchema.safeParse([service]).success,true);
 for(const value of [[],["focused_test","competitive_audit"],["focused_test","focused_test"],["listing"],["unknown"],"focused_test",null]) assert.equal(developerServiceSelectionSchema.safeParse(value).success,false);
});
