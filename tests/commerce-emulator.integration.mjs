// Explicit integration target. Requires ONLY the demo-wai-commerce emulator.
import test from "node:test";
import assert from "node:assert/strict";
if(process.env.FIRESTORE_EMULATOR_HOST!=="127.0.0.1:8089"||process.env.GCLOUD_PROJECT!=="demo-wai-commerce") throw new Error("Start the isolated demo commerce emulator; production tests are forbidden");
await import("./helpers/commerce-server-hooks.mjs");
const {getAdminFirestore}=await import("../lib/firebase-admin.ts");
const {listingOrderRef,reconcileListingSession,createListingCheckout,cancelListingCheckout}=await import("../lib/listing-orders.ts");
const {saveEditorialRequest,deliverSubmissionAlert}=await import("../lib/editorial-requests.ts");
const {reconcileInvoice}=await import("../lib/service-invoices.ts");
const db=getAdminFirestore();
const refunds=(amount)=>({list:()=>({async *[Symbol.asyncIterator](){if(amount) yield {status:"succeeded",amount};}})});
const nonce=Date.now().toString(36);
const app={kind:"app",name:"WAI internal test",email:`commerce-${nonce}@example.invalid`,appName:"WAI INTERNAL COMMERCE TEST",websiteUrl:"https://example.invalid",storeUrl:"",privacyUrl:"https://example.invalid/privacy",availability:"Web",pricing:"Free",details:"Internal emulator verification only. This is not a real developer or product."};
test("saved partnership survives provider failure and notification retries are leased and idempotent",async()=>{
 process.env.SUBMISSION_NOTIFICATION_EMAIL="internal-test@example.invalid";delete process.env.RESEND_API_KEY;delete process.env.SUBMISSION_NOTIFICATION_FROM;
 const id=await saveEditorialRequest({kind:"partnership",name:"WAI internal test",email:`partner-${nonce}@example.invalid`,companyWebsite:"",organization:"Internal test",topic:"sponsorship",details:"Internal emulator-only partnership inquiry with sufficient detail and no real client."});
 assert.ok(id);const ref=db.collection("editorialNotifications").doc(`partnership-${id}`);
 assert.equal((await ref.get()).data().delivery.state,"ERROR");assert.ok((await db.collection("editorialRequests").doc(id).get()).exists);
 let sends=0;const oldFetch=globalThis.fetch;
 globalThis.fetch=async()=>{sends++;return Response.json({id:"email_test_only"});};
 process.env.RESEND_API_KEY="re_local_fake";process.env.SUBMISSION_NOTIFICATION_FROM="WAI internal <test@example.invalid>";
 try {
  const job=(await ref.get()).data();await Promise.all([deliverSubmissionAlert(ref,job),deliverSubmissionAlert(ref,job)]);
  assert.equal(sends,1);assert.equal((await ref.get()).data().delivery.state,"SUCCESS");
  await deliverSubmissionAlert(ref,job);assert.equal(sends,1);
  await ref.update({firstProviderAttemptAt:Date.now()-25*3600000,delivery:{state:"ERROR"}});
  await deliverSubmissionAlert(ref,job);assert.equal(sends,1);assert.equal((await ref.get()).data().delivery.state,"CHECK_PROVIDER");
 } finally {globalThis.fetch=oldFetch;delete process.env.RESEND_API_KEY;delete process.env.SUBMISSION_NOTIFICATION_FROM;}
});
test("canonical payment reconciliation survives duplicates, stale events, pending/failure, cancellation and refunds",async()=>{
 const id=await saveEditorialRequest(app,{accessHash:"0".repeat(64)});const ref=listingOrderRef(id);
 let session={id:`cs_test_${nonce}`,metadata:{submission_id:id,product:"listing",attempt:"1"},amount_total:2000,currency:"usd",payment_status:"unpaid",status:"complete",livemode:false,payment_intent:"pi_test"};let refunded=0;
 globalThis.__waiTestStripe={refunds:{list:()=>refunds(refunded).list()},checkout:{sessions:{retrieve:async()=>({...session}),expire:async()=>{session.status="expired";}}},paymentIntents:{retrieve:async()=>({latest_charge:{amount_refunded:refunded}})}};
 await ref.set({submissionId:id,sessionId:session.id,attempt:1,status:"checkout_open",grossCents:0,refundedCents:0,netCents:0,livemode:false});
 await reconcileListingSession(session.id);assert.equal((await ref.get()).data().status,"pending");
 await reconcileListingSession(session.id,`evt_failed_${nonce}`,true);assert.equal((await ref.get()).data().status,"failed");
 session.status="open";await cancelListingCheckout(id);assert.equal((await ref.get()).data().status,"cancelled");
 session.status="complete";session.payment_status="paid";
 await Promise.all([reconcileListingSession(session.id,`evt_paid_${nonce}`),reconcileListingSession(session.id,`evt_paid_${nonce}`)]);
 assert.equal((await ref.get()).data().grossCents,2000);let paidAt=(await ref.get()).data().paidAt;
 await reconcileListingSession(session.id,`evt_late_${nonce}`,false,paidAt-1000);paidAt-=1000;assert.equal((await ref.get()).data().paidAtSource,"stripe_event");assert.equal((await db.collection("editorialRequests").doc(id).get()).data().listingPurchasedAt,paidAt);
 session.payment_status="unpaid";await reconcileListingSession(session.id);assert.equal((await ref.get()).data().status,"paid");
 session.payment_status="paid";refunded=500;await reconcileListingSession(session.id);assert.equal((await ref.get()).data().netCents,1500);
 refunded=2000;await reconcileListingSession(session.id);assert.equal((await ref.get()).data().status,"refunded");assert.equal((await ref.get()).data().paidAt,paidAt);
 refunded=0;await reconcileListingSession(session.id);assert.equal((await ref.get()).data().refundedCents,2000);
 await assert.rejects(()=>createListingCheckout(id,app.email));
});
test("concurrent checkout creation uses one server-priced session and a stable retry key",async()=>{
 const id=await saveEditorialRequest({...app,email:`retry-${nonce}@example.invalid`},{accessHash:"1".repeat(64)});let keys=[];
 globalThis.__waiTestStripe={checkout:{sessions:{retrieve:async()=>({id:`cs_retry_${nonce}`,client_secret:"test-only",status:"open"}),create:async(params,options)=>{keys.push(options.idempotencyKey);assert.deepEqual(params.managed_payments,{enabled:false});assert.equal(params.line_items[0].price_data.unit_amount,2000);assert.equal(params.metadata.submission_id,id);assert.equal(params.return_url.includes(app.email),false);return {id:`cs_retry_${nonce}`,client_secret:"test-only",metadata:params.metadata};}}}};
 await Promise.all([createListingCheckout(id,app.email),createListingCheckout(id,app.email)]);
 assert.equal(new Set(keys).size,1);assert.equal((await listingOrderRef(id).get()).data().attempt,1);
});
test("invoice verification supplies purchased products, refunds remove them and work status is preserved",async()=>{
 const id=await saveEditorialRequest({...app,email:`invoice-${nonce}@example.invalid`});const invoiceId=`in_${nonce}`;
 await db.collection("editorialRequests").doc(id).update({engagement:{agreedProducts:["focused_test"],purchasedProducts:[],workStatus:"reviewing",totalCents:10000,currency:"usd",signedScopeReference:"Test signed scope",signedScopeAt:1,scopeRevision:1,note:"",invoiceRefs:[{id:invoiceId,stage:"deposit",status:"open",amountPaid:0,refunded:0,currency:"usd",dueAt:null,verifiedAt:0,livemode:false}]}});
 await db.collection("invoiceLinks").doc(invoiceId).set({submissionId:id,products:["focused_test"]});let refunded=0;
 globalThis.__waiTestStripe={refunds:{list:()=>refunds(refunded).list()},invoices:{retrieve:async()=>({livemode:false,currency:"usd",status:"paid",amount_paid:5000,status_transitions:{paid_at:1700000000},due_date:null})},invoicePayments:{list:()=>({async *[Symbol.asyncIterator](){yield {payment:{payment_intent:"pi_invoice_test"}};}})},paymentIntents:{retrieve:async()=>({latest_charge:{amount_refunded:refunded}})}};
 await reconcileInvoice(invoiceId);let work=(await db.collection("editorialRequests").doc(id).get()).data().engagement;
 assert.deepEqual(work.purchasedProducts,["focused_test"]);assert.equal(work.workStatus,"reviewing");assert.equal(work.paymentStatus,"deposit_paid");
 refunded=5000;await reconcileInvoice(invoiceId);work=(await db.collection("editorialRequests").doc(id).get()).data().engagement;assert.deepEqual(work.purchasedProducts,[]);assert.equal(work.paymentStatus,"refunded");
});

test("admin work selections are editable and require verified deposit before service work",async()=>{
 const actions=await import("../app/admin/commercial-actions.ts");
 globalThis.__waiTestAdmin=false;
 for(const action of [actions.saveCommercialWork,actions.refreshCommercialPayment,actions.retryInternalNotification,actions.rejectListingAndRefund,actions.savePartnerPlacement]) await assert.rejects(()=>action(new FormData()),/Not authorized/);
 globalThis.__waiTestAdmin=true;
 const id=await saveEditorialRequest({...app,email:`admin-${nonce}@example.invalid`});
 const form=(revision,status="reviewing",invoice="")=>{
  const data=new FormData();for(const [key,value] of Object.entries({id,revision:String(revision),workStatus:status,total:"100.00",signedScopeReference:"Internal test signed scope",signedScopeDate:"2026-11-13",depositInvoice:invoice}))data.set(key,value);
  data.append("products","focused_test");data.append("products","competitive_audit");return data;
 };
 await assert.rejects(()=>actions.saveCommercialWork(form(0)),/TEST_REDIRECT/);
 let row=(await db.collection("editorialRequests").doc(id).get()).data();
 assert.deepEqual(row.engagement.agreedProducts,["focused_test","competitive_audit"]);assert.deepEqual(row.engagement.purchasedProducts,[]);assert.equal(row.engagement.paymentStatus,"quoted");
 await assert.rejects(()=>actions.saveCommercialWork(form(0)),/changed/);
 await assert.rejects(()=>actions.saveCommercialWork(form(1,"in_progress")),/verified 50% deposit/);
 const invoiceId=`in_admin${nonce}`;
 globalThis.__waiTestStripe={invoices:{retrieve:async()=>({livemode:false,currency:"usd",customer_email:`admin-${nonce}@example.invalid`,total:5000,status:"paid",amount_paid:5000,status_transitions:{paid_at:1700000000},due_date:null})},invoicePayments:{list:()=>({async *[Symbol.asyncIterator](){}})}};
 await assert.rejects(()=>actions.saveCommercialWork(form(1,"awaiting_scope",invoiceId)),/TEST_REDIRECT/);
 row=(await db.collection("editorialRequests").doc(id).get()).data();assert.deepEqual(row.engagement.purchasedProducts,["focused_test","competitive_audit"]);assert.equal(row.engagement.workStatus,"awaiting_scope");
 await assert.rejects(()=>actions.saveCommercialWork(form(2,"in_progress",invoiceId)),/TEST_REDIRECT/);
 assert.equal((await db.collection("editorialRequests").doc(id).get()).data().engagement.workStatus,"in_progress");
 globalThis.__waiTestAdmin=false;
});
test("only succeeded refunds reduce receipts",async()=>{
 const {confirmedRefunds}=await import("../lib/stripe-refunds.ts");
 globalThis.__waiTestStripe={refunds:{list:()=>({async *[Symbol.asyncIterator](){yield {status:"pending",amount:100};yield {status:"failed",amount:200};yield {status:"succeeded",amount:300};}})}};
 assert.deepEqual(await confirmedRefunds("pi_refund_test"),{refundedCents:300,pending:true,failed:true});
});

test("inbox factual paths preserve independent eligibility, notes, catalog and deletion history", async()=>{
 const {saveInboxAction}=await import("../app/admin/inbox-actions.ts");
 globalThis.__waiTestAdmin=true;
 const submit=async(id,intent,values={})=>{const row=(await db.collection("editorialRequests").doc(id).get()).data();const form=new FormData();for(const [key,value]of Object.entries({id,intent,inboxRevision:String(row.inboxRevision??0),revision:String(row.commercialRevision??0),...values}))form.set(key,value);return saveInboxAction(form);};
 for(const paid of [true,false]){
  const id=await saveEditorialRequest({...app,email:`inbox-${paid}-${nonce}@example.invalid`,appName:`Isolated Inbox ${paid} ${nonce}`},paid?{accessHash:"2".repeat(64)}:undefined);
  const ref=db.collection("editorialRequests").doc(id);
  if(paid)await ref.update({listingPurchasedAt:Date.now(),listingPaymentStatus:"paid",selectedProduct:"listing"});
  let result=await submit(id,"eligibility",{result:"eligible",liveProduct:"pass",substantiveTraining:"pass",workingListing:"pass",privacyPolicy:"pass",pricingAndPlatforms:"pass",reviewAccess:"pass",note:""});assert.equal(result.error,undefined);
  let row=(await ref.get()).data();assert.equal(row.eligibility.result,"eligible");assert.equal(row.status,"received");assert.equal(row.engagement,undefined);
  result=await submit(id,"note",{kind:"public_source",findings:"Public sources reviewed; hands-on behavior remains untested.",used:"https://example.invalid"});assert.equal(result.error,undefined);
  assert.equal((await ref.collection("researchNotes").get()).size,1);
  result=await submit(id,"create");assert.equal(result.error,undefined);
  row=(await ref.get()).data();assert.equal(row.candidateAppId,row.commercialCatalogAppId);const catalogRef=db.collection("catalogApps").doc(row.candidateAppId);const catalogBefore=(await catalogRef.get()).data();assert.equal(catalogBefore.publication_status,"Candidate");assert.equal(row.reviewRounds,undefined);
  assert.match((await submit(id,"create")).error,/connected/);
  result=await submit(id,"commercial",{saveSection:"work",workStatus:"in_progress",catalogAppId:row.candidateAppId,note:"Factual listing preparation"});assert.equal(result.error,undefined);
  result=await submit(id,"commercial",{saveSection:"work",workStatus:"on_hold",catalogAppId:row.candidateAppId,note:""});assert.equal(result.error,undefined);
  row=(await ref.get()).data();assert.equal(row.eligibility.result,"eligible");assert.equal(row.engagement.workStatus,"on_hold");assert.equal(row.engagement.note,"");assert.equal(row.listingPurchasedAt>0,paid);
  assert.match((await submit(id,"note",{kind:"hands_on",findings:"Missing date"})).error,/observation date/);
  const {getDeveloperReport}=await import("../lib/developer-report-repository.ts");const today=new Date().toISOString().slice(0,10);const reportBefore=(await getDeveloperReport(today,today,true)).cohorts;
  const beforePublications=(await db.collection("catalogPublications").get()).size;
  result=await submit(id,"delete",{confirmDelete:"on"});assert.equal(result.error,undefined);assert.ok((await ref.get()).data().deletedAt);assert.deepEqual((await catalogRef.get()).data(),catalogBefore);assert.equal((await ref.collection("researchNotes").get()).size,1);assert.equal((await db.collection("catalogPublications").get()).size,beforePublications);assert.deepEqual((await getDeveloperReport(today,today,true)).cohorts,reportBefore);
  result=await submit(id,"restore");assert.equal(result.error,undefined);assert.equal((await ref.get()).data().deletedAt,null);
 }
 globalThis.__waiTestAdmin=false;assert.match((await saveInboxAction(new FormData())).error,/Not authorized/);
});

test("commercial sections and invoice replacement preserve provider history and ownership",async()=>{
 const {saveInboxAction}=await import("../app/admin/inbox-actions.ts");globalThis.__waiTestAdmin=true;
 const id=await saveEditorialRequest({...app,email:`replace-${nonce}@example.invalid`},{accessHash:"3".repeat(64)});const ref=db.collection("editorialRequests").doc(id);
 await ref.update({selectedProduct:"focused_test"});
 const save=async(section,values={})=>{const row=(await ref.get()).data();const f=new FormData();for(const[k,v]of Object.entries({id,intent:"commercial",saveSection:section,revision:String(row.commercialRevision??0),...values}))f.set(k,v);return saveInboxAction(f);};
 assert.match((await save("work",{workStatus:"in_progress"})).error,/Agree/);
 assert.equal((await save("work",{workStatus:"not_started",products:"focused_test",note:"Inquiry only"})).error,undefined);
 assert.equal((await ref.get()).data().engagement.purchasedProducts.length,0);
 assert.equal((await save("scope",{total:"100",signedScopeReference:"Isolated signed scope",signedScopeDate:"2026-11-13"})).error,undefined);
 const oldId=`in_old${nonce}`,newId=`in_new${nonce}`;let oldPaid=0;
 globalThis.__waiTestStripe={invoices:{retrieve:async(invoice)=>({livemode:false,currency:"usd",metadata:{submission_id:id},customer_email:`replace-${nonce}@example.invalid`,total:5000,status:invoice===oldId?"void":"paid",amount_paid:invoice===oldId?oldPaid:5000,status_transitions:{paid_at:1700000000},due_date:null})},invoicePayments:{list:()=>({async *[Symbol.asyncIterator](){}})}};
 assert.equal((await save("invoices",{depositInvoice:oldId})).error,undefined);
 assert.equal((await save("work",{workStatus:"on_hold",products:"focused_test",note:"",depositInvoice:"not-an-invoice",total:"not-a-price"})).error,undefined);
 assert.equal((await save("invoices",{depositInvoice:newId})).error,undefined);
 let row=(await ref.get()).data();assert.deepEqual(row.engagement.invoiceRefs.map(i=>i.id),[newId]);assert.equal(row.invoiceReferenceHistory[0].id,oldId);assert.ok((await db.collection("invoiceLinks").doc(oldId).get()).data().retiredAt);
 assert.equal((await save("work",{workStatus:"in_progress",products:"focused_test"})).error,undefined);
 assert.match((await save("invoices",{})).error,/paid|history/i);
 const conflict=`in_conflict${nonce}`;await db.collection("invoiceLinks").doc(conflict).set({submissionId:"another-request",stage:"balance"});assert.match((await save("invoices",{depositInvoice:newId,balanceInvoice:conflict})).error,/another request/);
 const f=new FormData();for(const[k,v]of Object.entries({id,intent:"commercial",saveSection:"work",revision:"0",workStatus:"on_hold"}))f.set(k,v);assert.match((await saveInboxAction(f)).error,/changed/);
 globalThis.__waiTestAdmin=false;
});

test("inbox pagination skips deleted records and retains separate audit/note history",async()=>{
 const {listEditorialRequests}=await import("../lib/editorial-requests.ts");
 const batch=db.batch(),ids=[];const top=Date.now()+100000;
 for(let i=0;i<64;i++){const ref=db.collection("editorialRequests").doc();ids.push(ref.id);batch.create(ref,{...app,status:"received",createdAt:top+i,testData:true,...(i%2?{deletedAt:top}:{}),researchNotes:[{id:"legacy-note",findings:"Preserved embedded note"}]});}
 await batch.commit();
 const ref=db.collection("editorialRequests").doc(ids[63]);await ref.collection("researchNotes").doc("new-note").set({id:"new-note",at:top,findings:"Preserved dated note"});await db.collection("editorialWorkflowEvents").doc().set({requestId:ref.id,type:"legacy-test",at:top});
 for(const deleted of [false,true]){
  const first=await listEditorialRequests(undefined,deleted);assert.equal(first.requests.length,30);assert.ok(first.nextCursor);assert.ok(first.requests.every(r=>ids.includes(r.id)&&!!r.deletedAt===deleted));
  const second=await listEditorialRequests(first.nextCursor,deleted);assert.ok(second.requests.slice(0,2).every(r=>ids.includes(r.id)));assert.equal(second.requests.some(r=>first.requests.some(previous=>previous.id===r.id)),false);
 }
 const archived=await listEditorialRequests(undefined,true);const retained=archived.requests.find(r=>r.id===ref.id);assert.equal(retained.researchNotes.length,2);assert.equal(retained.workflowHistory[0].type,"legacy-test");
});

test("deleted submissions cannot resume developer access but retain provider reconciliation records",async()=>{
 const {newDeveloperAccess,authorizedDeveloper}=await import("../lib/developer-session.ts");
 const {saveInboxAction}=await import("../app/admin/inbox-actions.ts");
 const access=newDeveloperAccess();const id=await saveEditorialRequest({...app,email:`deleted-access-${nonce}@example.invalid`},{accessHash:access.hash});
 globalThis.__waiTestDeveloperCookie=`${id}.${access.secret}`;globalThis.__waiTestAdmin=true;
 assert.equal((await authorizedDeveloper()).id,id);const form=new FormData();form.set("id",id);form.set("intent","delete");form.set("confirmDelete","on");assert.equal((await saveInboxAction(form)).error,undefined);assert.equal(await authorizedDeveloper(),null);assert.ok((await db.collection("editorialRequests").doc(id).get()).exists);
 delete globalThis.__waiTestDeveloperCookie;globalThis.__waiTestAdmin=false;
});
