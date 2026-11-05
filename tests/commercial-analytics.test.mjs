import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { trackCommercialEvent, trackCommercialSubmission } from "../lib/commercial-analytics.ts";

afterEach(() => { delete globalThis.window; });
function browser(consent = "granted", pathname = "/services") {
  const events = [];
  globalThis.window = Object.assign(new EventTarget(), {
    location: { pathname, href: "https://example.test/services?email=private@example.test" },
    localStorage: { getItem: () => consent },
    gtag: (...args) => events.push(args),
  });
  return events;
}

test("only confirmed saved inquiries count as commercial submissions", () => {
  const events = browser();
  for (const [status, ok] of [[200, false], [200, true], [400, false], [429, false], [500, false], [201, false]]) {
    assert.equal(trackCommercialSubmission("service", status, ok), false);
  }
  assert.deepEqual(events, []);
  trackCommercialSubmission("service", 201, true);
  trackCommercialSubmission("partnership", 201, true);
  assert.deepEqual(events, [
    ["event", "scope_request_submitted", { page_location: "/services", page_referrer: "", measurement_version: "facts-1", page_path: "/services" }],
    ["event", "partnership_inquiry_submitted", { page_location: "/partnerships", page_referrer: "", measurement_version: "facts-1", page_path: "/services" }],
  ]);
  assert.equal(JSON.stringify(events).includes("private@example.test"), false);
});

test("commercial events honor denied consent, admin exclusion, and unavailable analytics", () => {
  for (const [consent, path] of [["denied", "/services"], ["granted", "/admin"], ["granted", "/admin/apps/example"]]) {
    const events = browser(consent, path);
    trackCommercialEvent("services_page_viewed", "services");
    trackCommercialSubmission("service", 201, true);
    assert.deepEqual(events, []);
  }
  browser();
  window.gtag = () => { throw new Error("blocked analytics"); };
  assert.doesNotThrow(() => trackCommercialEvent("commercial_outbound_selected", "services"));
  assert.doesNotThrow(() => trackCommercialSubmission("service", 201, true));
});

test("confirmed completion can wait for tag readiness without duplicating on repeated readiness", () => {
  const events = browser();
  delete window.gtag;
  trackCommercialSubmission("service", 201, true);
  window.gtag = (...args) => events.push(args);
  window.dispatchEvent(new Event("wai:analytics-ready"));
  window.dispatchEvent(new Event("wai:analytics-ready"));
  assert.deepEqual(events, [["event", "scope_request_submitted", { page_location: "/services", page_referrer: "", measurement_version: "facts-1", page_path: "/services" }]]);
});
