import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { isPublicAnalyticsPath, trackEvent, trackEventWhenReady } from "../lib/analytics.ts";

afterEach(() => {
  delete globalThis.window;
});

function browser(pathname, consent = "granted") {
  const target = new EventTarget();
  const events = [];
  globalThis.window = Object.assign(target, {
    location: { pathname },
    localStorage: { getItem: () => consent },
    gtag: (...args) => events.push(args),
  });
  return events;
}

test("admin and every nested admin route are excluded", () => {
  for (const path of ["/admin", "/admin/", "/admin/login", "/admin/apps/example", "/preview", "/preview/draft", "/api/catalog"]) {
    assert.equal(isPublicAnalyticsPath(path), false);
    const events = browser(path);
    assert.equal(trackEvent("sample"), false);
    assert.deepEqual(events, []);
  }
  assert.equal(isPublicAnalyticsPath("/administer"), true);
  assert.equal(isPublicAnalyticsPath("/apps/example"), true);
});

test("public custom events require consent and a ready tag", () => {
  const denied = browser("/submit-app", "denied");
  assert.equal(trackEvent("submission_started"), false);
  assert.deepEqual(denied, []);

  const accepted = browser("/submit-app");
  assert.equal(trackEvent("submission_started"), true);
  assert.deepEqual(accepted, [["event", "submission_started", {page_location:"/submit-app",page_referrer:"",measurement_version:"facts-1",page_path:"/submit-app"}]]);
});

test("each successful response can queue one completion until the tag is ready", () => {
  const events = browser("/submit-app");
  delete window.gtag;
  trackEventWhenReady("submission_completed");
  trackEventWhenReady("submission_completed");
  assert.deepEqual(events, []);
  window.gtag = (...args) => events.push(args);
  window.dispatchEvent(new Event("wai:analytics-ready"));
  window.dispatchEvent(new Event("wai:analytics-ready"));
  assert.deepEqual(events, [
    ["event", "submission_completed", {page_location:"/submit-app",page_referrer:"",measurement_version:"facts-1",page_path:"/submit-app"}],
    ["event", "submission_completed", {page_location:"/submit-app",page_referrer:"",measurement_version:"facts-1",page_path:"/submit-app"}],
  ]);
});


test("blocked consent storage is nonblocking and unknown paths are never sent as a parameter", () => {
  const events = browser("/apps/example");
  window.localStorage.getItem = () => { throw Error("blocked"); };
  assert.equal(trackEvent("app_profile_viewed"), false);
  assert.deepEqual(events, []);
  const unknown = browser("/some-private-value");
  assert.equal(trackEvent("submission_started"), false);
  assert.deepEqual(unknown, []);
  assert.equal(JSON.stringify(unknown).includes("some-private-value"), false);
});
