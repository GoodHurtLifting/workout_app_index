import test from "node:test";
import assert from "node:assert/strict";
if(process.env.FIRESTORE_EMULATOR_HOST!=="127.0.0.1:8089"||process.env.GCLOUD_PROJECT!=="demo-wai-commerce") throw new Error("Use the isolated demo commerce emulator only");
await import("./helpers/commerce-server-hooks.mjs");
const {getAdminFirestore}=await import("../lib/firebase-admin.ts");const db=getAdminFirestore();
const checkoutEnabled=process.env.WAI_HTTP_TEST_CHECKOUT_AVAILABLE==="true";
const base="http://localhost:3017";let cookie="",id="";
const details={kind:"app",name:"WAI HTTP INTERNAL TEST",email:`http-${Date.now()}@example.invalid`,appName:"WAI HTTP INTERNAL TEST",websiteUrl:"https://example.invalid",storeUrl:"",privacyUrl:"https://example.invalid/privacy",availability:"Web",pricing:"Free",details:"An internal emulator-only app with enough description to exercise the real endpoint.",helpWanted:"",competitors:"Internal test inspiration",differentiation:"Internal test differences"};
async function post(path,body,extra={}){return fetch(base+path,{method:"POST",headers:{Origin:base,"Content-Type":"application/json",Cookie:cookie,...extra},body:JSON.stringify(body)});}
test("HTTP request validation, safe resume and service save preserve a single editorial record",async()=>{
 assert.equal((await post("/api/developer-submission",details,{Origin:"https://foreign.invalid"})).status,403);
 assert.equal((await post("/api/developer-submission",{...details,email:"invalid"})).status,400);
 const saved=await post("/api/developer-submission",details);assert.equal(saved.status,201);
 const result=await saved.json();id=result.id;assert.match(id,/^[A-Za-z0-9]{20}$/);assert.equal(result.checkoutAvailable,checkoutEnabled);
 const header=saved.headers.get("set-cookie");assert.match(header,/HttpOnly/i);assert.match(header,/SameSite=Lax/i);cookie=header.split(";")[0];
 let record=(await db.collection("editorialRequests").doc(id).get()).data();assert.equal(record.listingPaymentStatus,"unpaid");assert.equal(record.testData,true);
 assert.ok(!JSON.stringify(result).includes(details.email));assert.ok(!JSON.stringify(result).includes("developerAccessHash"));
 assert.equal((await fetch(base+"/api/developer-submission")).status,404);
 assert.equal((await fetch(base+"/api/developer-submission",{headers:{Cookie:cookie+"0"}})).status,404);
 const restore=await fetch(base+"/api/developer-submission",{headers:{Cookie:cookie}});assert.match(restore.headers.get("cache-control"),/no-store/);assert.equal((await restore.json()).details.competitors,details.competitors);
 assert.equal((await post("/api/developer-submission",{...details,helpWanted:"Check the onboarding"})).status,201);
 for(const products of [[],["focused_test","competitive_audit"],["listing"],["focused_test","focused_test"],["unknown"]]) assert.equal((await post("/api/developer-submission",{action:"inquiry",products})).status,400);
 assert.equal((await db.collection("editorialRequests").doc(id).get()).data().serviceInquiryAt,undefined);
 const first=await post("/api/developer-submission",{action:"inquiry",products:["focused_test"]});assert.equal(first.status,201);
 const inquiryAt=(await db.collection("editorialRequests").doc(id).get()).data().serviceInquiryAt;
 // Existing multi-product history remains intact after the public single-choice change.
 await db.collection("editorialRequests").doc(id).update({initiallyRequestedProducts:["focused_test","competitive_audit"]});
 await post("/api/developer-submission",{action:"inquiry",products:["focused_test"]});
 record=(await db.collection("editorialRequests").doc(id).get()).data();assert.equal(record.serviceInquiryAt,inquiryAt);assert.deepEqual(record.initiallyRequestedProducts,["focused_test","competitive_audit"]);assert.equal(record.helpWanted,"Check the onboarding");assert.equal(record.engagement,undefined);assert.equal(record.selectedProduct,"focused_test");
 const restoredChoice=await fetch(base+"/api/developer-submission",{headers:{Cookie:cookie}});assert.equal((await restoredChoice.json()).selectedProduct,"focused_test");
 if(checkoutEnabled) assert.equal((await post("/api/listing-checkout",{acceptTerms:false})).status,400);
 else assert.equal((await post("/api/listing-checkout",{acceptTerms:true,amount:1})).status,503);
 const payment=await fetch(base+"/api/listing-checkout",{headers:{Cookie:cookie}});assert.equal((await payment.json()).paymentStatus,"unpaid");
 assert.equal((await fetch(base+"/api/admin/developer-report?start=2026-11-01&end=2026-11-13")).status,401);
 await db.collection("listingOrders").doc(`${id}-listing`).set({status:"creating",attempt:1});
 assert.equal((await post("/api/developer-submission",{...details,email:"someone-else@example.invalid"})).status,409);
 const reset=await fetch(base+"/api/developer-submission",{method:"DELETE",headers:{Cookie:cookie,Origin:base}});assert.equal(reset.status,200);assert.match(reset.headers.get("set-cookie"),/Max-Age=0/);assert.ok((await db.collection("editorialRequests").doc(id).get()).exists);
});
test("partnership HTTP save succeeds while notification is unavailable",async()=>{
 const response=await post("/api/editorial-requests",{kind:"partnership",name:"WAI HTTP INTERNAL TEST",email:`http-partner-${Date.now()}@example.invalid`,organization:"WAI INTERNAL",topic:"sponsorship",details:"Internal emulator-only partnership test. No real commercial inquiry."});assert.equal(response.status,201);assert.equal((await response.json()).ok,true);
 const rows=await db.collection("editorialRequests").where("organization","==","WAI INTERNAL").get();assert.ok(rows.size>0);
 const notification=await db.collection("editorialNotifications").doc(`partnership-${rows.docs.at(-1).id}`).get();assert.equal(notification.data().delivery.state,"ERROR");
});
