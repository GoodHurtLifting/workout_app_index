import assert from "node:assert/strict";
import test from "node:test";
import { apps } from "../lib/catalog.ts";
import { fitScore, exclusionReasons, fitMethodologyVersion } from "../lib/matching.ts";

test("fit-5 ignores editorial scores, including a retired saved priority", () => {
  assert.equal(fitMethodologyVersion, "fit-5");
  const app = { ...apps[0] };
  Object.defineProperty(app, "originalityProfile", { get() { throw new Error("Finder must not read Originality"); } });
  Object.defineProperty(app, "legit", { get() { throw new Error("Finder must not read Legit"); } });
  assert.equal(fitScore(app, { priority: "Distinctive experience" }), fitScore(app, {}));
  assert.equal(fitScore(app, { priority: "Fast logging" }), 36);
});

test("remaining feature weights, exclusions, and cap are preserved", () => {
  const app = { ...apps[0], features: ["Fast logging"], ai: "No AI identified", hasUsableFreeTier: true };
  assert.equal(fitScore(app, {}), 24);
  assert.equal(fitScore(app, { priority: "Offline use" }), 24);
  assert.equal(fitScore(app, { priority: "Fast logging" }), 36);
  const paid = { ...app, hasUsableFreeTier: false };
  assert.equal(fitScore(paid, { budget: "Free only" }), 0);
  assert.deepEqual(exclusionReasons(paid, { budget: "Free only" }), ["The requested experience is not available in the free tier"]);
  const adaptive = { ...app, adaptiveProgramming: true, ai: "AI central", goals: ["Build muscle"], level: ["Beginner"], trainingRelationship: { ...app.trainingRelationship, planningStyle: "Let the app adapt" } };
  assert.equal(fitScore(adaptive, { job: "Adapt training for me", planning: "Adjust the workout based on my recent training", goal: "Build muscle", priority: "Fast logging", level: "Completely new", ai: "I want AI-generated training" }), 98);
});
