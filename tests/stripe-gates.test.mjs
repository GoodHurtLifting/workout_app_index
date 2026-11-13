import test from "node:test";
import assert from "node:assert/strict";
await import("./helpers/commerce-server-hooks.mjs");
const {listingCheckoutAvailable,stripeClient}=await import("../lib/stripe-client.ts");
test("checkout fails closed until terms, keys, mode, webhook and return origin are configured",()=>{
 const names=["STRIPE_SECRET_KEY","NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY","STRIPE_WEBHOOK_SECRET","WAI_LISTING_TERMS_APPROVED","WAI_CHECKOUT_ENABLED","WAI_SITE_URL","WAI_STRIPE_LIVE_APPROVED"];
 const previous=Object.fromEntries(names.map(name=>[name,process.env[name]]));
 try{
  for(const name of names)delete process.env[name];assert.equal(listingCheckoutAvailable(),false);assert.throws(()=>stripeClient());
  Object.assign(process.env,{STRIPE_SECRET_KEY:"sk_test_local_fixture",NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:"pk_test_local_fixture",STRIPE_WEBHOOK_SECRET:"whsec_local_fixture",WAI_LISTING_TERMS_APPROVED:"true",WAI_CHECKOUT_ENABLED:"true",WAI_SITE_URL:"http://localhost:3017"});
  assert.equal(listingCheckoutAvailable(),true);
  for(const [key,value] of [["WAI_CHECKOUT_ENABLED","false"],["WAI_LISTING_TERMS_APPROVED","false"],["STRIPE_WEBHOOK_SECRET",""],["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY","pk_live_wrong"],["WAI_SITE_URL","https://site.invalid?private=yes"]]){const before=process.env[key];process.env[key]=value;assert.equal(listingCheckoutAvailable(),false);process.env[key]=before;}
  process.env.STRIPE_SECRET_KEY="sk_live_fixture";process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_fixture";assert.equal(listingCheckoutAvailable(),false);assert.throws(()=>stripeClient());
  process.env.WAI_STRIPE_LIVE_APPROVED="true";assert.equal(listingCheckoutAvailable(),false);process.env.WAI_SITE_URL="https://workoutappindex.com";assert.equal(listingCheckoutAvailable(),true);
 } finally {for(const name of names){if(previous[name]===undefined)delete process.env[name];else process.env[name]=previous[name];}}
});
