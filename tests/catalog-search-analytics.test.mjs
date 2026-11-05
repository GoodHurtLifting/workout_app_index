import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createCatalogSearchTracker, searchParameters, searchAttribution, markSearchProfileViewed, clearSearchAttribution } from "../lib/catalog-search-analytics.ts";
let consent;
function browser() {
  consent = "granted";
  const events = [], storage = new Map();
  globalThis.window = Object.assign(new EventTarget(), {location:{pathname:"/apps"}, localStorage:{getItem:()=>consent}, sessionStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)},gtag:(...args)=>events.push(args)});
  return events;
}
afterEach(()=>{delete globalThis.window;});
const state={query:"private email@example.com",groups:["platform","feature"],resultCount:0};
test("coarse search data never includes visitor text or selected filter values",()=>{
  assert.equal(searchParameters({query:"x",groups:[],resultCount:1}),null);
  assert.equal(searchParameters({query:" ",groups:[],resultCount:37}),null);
  assert.deepEqual(searchParameters(state),{search_mode:"mixed",filter_count_bucket:"2-3",result_count_bucket:"0",sort_mode:"alphabetical",filter_groups:"platform,feature"});
});
test("no mount event, consecutive settled deduplication, selection flush and matched attribution",()=>{
  const events=browser(), tracker=createCatalogSearchTracker();
  tracker.select(state,"hevy",1,false); assert.equal(events.length,0);
  tracker.select(state,"hevy",1,true);
  tracker.commit({...state}); tracker.retry();
  assert.deepEqual(events.map(event=>event[1]),["catalog_search_completed","catalog_result_selected"]);
  assert.equal(JSON.stringify(events).includes(state.query),false);
  assert.equal(searchAttribution("boostcamp","profile").discovery_source,undefined);
  assert.equal(searchAttribution("hevy","outbound").discovery_source,undefined);
  assert.equal(searchAttribution("hevy","profile").discovery_source,"catalog_search");
  markSearchProfileViewed("hevy");
  assert.equal(searchAttribution("hevy","profile").discovery_source,undefined);
  assert.equal(searchAttribution("hevy","outbound").discovery_source,"catalog_search");
  clearSearchAttribution(); assert.deepEqual(searchAttribution("hevy","outbound"),{});
});
test("pending searches retry once and superseded, denied or private states cannot replay",()=>{
  const events=browser(), tracker=createCatalogSearchTracker();
  delete window.gtag; tracker.commit(state);
  tracker.cancel(); window.gtag=(...args)=>events.push(args); tracker.retry(); assert.equal(events.length,0);
  delete window.gtag; tracker.commit(state); window.gtag=(...args)=>events.push(args); tracker.retry();tracker.retry(); assert.equal(events.length,1);
  consent="denied"; tracker.commit({...state,query:"other"}); consent="granted";tracker.retry();assert.equal(events.length,1);
  window.location.pathname="/admin/apps/hevy";tracker.select({...state,query:"other"},"hevy",2,true);assert.equal(events.length,1);
});
test("storage failures and expired contexts do not interrupt product navigation",()=>{
  browser(); const tracker=createCatalogSearchTracker();
  window.sessionStorage.setItem=()=>{throw Error("blocked");};
  assert.doesNotThrow(()=>tracker.select(state,"hevy",1,true));
  assert.deepEqual(searchAttribution("hevy","profile"),{});
  window.sessionStorage.getItem=()=>JSON.stringify({appSlug:"hevy",expires:Date.now()-1,params:{}});
  assert.deepEqual(searchAttribution("hevy","profile"),{});
});
