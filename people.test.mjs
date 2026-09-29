import assert from "node:assert/strict";
import test from "node:test";
import { apps } from "./lib/catalog.ts";
import { matchingPeople, normalizePersonSearch } from "./lib/people.ts";

test("normalizes names without punctuation or accents", () => {
  assert.equal(normalizePersonSearch("Dr. Míke  Israetel"), "dr mike israetel");
});

test("finds documented people and aliases without matching unrelated apps", () => {
  const byId = new Map(apps.map((app) => [app.id, app]));
  assert.deepEqual(matchingPeople(byId.get("rp-hypertrophy"), "Dr Mike").map((person) => person.name), ["Mike Israetel"]);
  assert.deepEqual(matchingPeople(byId.get("sweat"), "Kayla Itsines").map((person) => person.name), ["Kayla Itsines"]);
  assert.deepEqual(matchingPeople(byId.get("centr"), "Chris Hemsworth").map((person) => person.name), ["Chris Hemsworth"]);
  assert.deepEqual(matchingPeople(byId.get("boostcamp"), "Kayla Itsines"), []);
});
