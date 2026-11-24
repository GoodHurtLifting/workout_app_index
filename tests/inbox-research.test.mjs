import { registerHooks } from "node:module";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

registerHooks({ resolve(specifier, context, next) {
  if (specifier === "server-only") return { url: "data:text/javascript,export {};", shortCircuit: true };
  return next(specifier, context);
} });
const { researchForInbox, originalDictationForInbox } = await import("../lib/inbox-research.ts");
const request = { id: "unknown", kind: "app", appName: "Example", name: "Owner", email: "owner@example.com", createdAt: 1, status: "received" };

test("original Ægir and WorkoutFlow requests recover dictation without needing a catalog link", () => {
  const aegir = researchForInbox({ ...request, id: "bZbRXp2hmnLHuuzqWLNF" }, [], []);
  assert.equal(aegir.filter(source => source.historical).length, 4);
  const aeText = aegir.map(source => `${source.finding} ${source.note}`).join("\n");
  assert.match(aeText, /Day 2|simulated/);
  assert.match(aeText, /Edit each set/);
  assert.match(aeText, /does not change lift completion/);
  assert.match(aeText, /Google|sign-in/);
  const flow = researchForInbox({ ...request, id: "x5u9Gc6KuRnGz7q7v61N" }, [], []);
  assert.equal(flow.filter(source => source.historical).length, 21);
  const text = flow.map(source => source.finding).join("\n");
  for (let i = 1; i <= 49; i++) assert.ok(text.includes(`WF-O${String(i).padStart(2, "0")}`));
  assert.doesNotMatch(text, /^\|/m);
  for (const source of flow) {
    assert.match(source.note, /Samsung Galaxy A54/);
    assert.match(source.note, /1\.1\.5 build 670/);
    assert.match(source.note, /No physical workout/);
    assert.match(source.note, /WF-O48 corrects/);
    assert.equal(source.url, null);
  }
});

test("recovered notes are available through explicit catalog links and never inferred from a similar app name", () => {
  assert.equal(researchForInbox({ ...request, appName: "WorkoutFlow" }, [], []).length, 0);
  assert.equal(researchForInbox({ ...request, candidateAppId: "workoutflow-app" }, [], []).length, 21);
  assert.equal(researchForInbox({ ...request, commercialCatalogAppId: "gir-iron" }, [], []).filter(source => source.historical).length, 4);
});

test("saved owner evidence wins over a same-ID recovered record, with no mutations or status changes", () => {
  const r = { ...request, id: "bZbRXp2hmnLHuuzqWLNF", status: "not_selected", inboxState: "open" };
  const source = { id: "historical-gir-iron-2026-10-14-first-session", app_id: "gir-iron", source_type: "Hands-on testing", claim_supported: "Owner corrected this saved evidence.", internal_note: "Preserve the saved scope.", checked_at: 1, url: null };
  const before = structuredClone({ r, source });
  const result = researchForInbox(r, [source], []);
  const matches = result.filter(row => row.id === source.id);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].finding, source.claim_supported);
  assert.equal(matches[0].historical, undefined);
  assert.deepEqual({ r, source }, before);
});

test("original first-person messages retain their own wording, timestamps and independent provenance", () => {
  const expected = [["bZbRXp2hmnLHuuzqWLNF", 19], ["x5u9Gc6KuRnGz7q7v61N", 24], ["AOYBDZAvtNwvaD6u9S8c", 48]];
  for (const [id, count] of expected) {
    const messages = originalDictationForInbox({ ...request, id });
    assert.equal(messages.length, count);
    for (const message of messages) {
      assert.equal(createHash("sha256").update(message.text, "utf8").digest("hex"), message.sha256);
      assert.ok(Number.isFinite(Date.parse(message.capturedAt)));
      assert.match(message.source.sessionId, /^[a-f0-9-]{36}$/);
      assert.ok(message.source.line > 0);
      assert.doesNotMatch(message.text, /<external_|<environment_context>|# Files mentioned by the user:/);
    }
  }
  const flow = originalDictationForInbox({ ...request, id: "x5u9Gc6KuRnGz7q7v61N" });
  assert.ok(flow.some(message => message.text === "The second set earlier was because long pressing the button skipped while just tapping the button reset the same lift.\n"));
  assert.equal(originalDictationForInbox({ ...request, appName: "swithAI" }).length, 0);
  assert.equal(originalDictationForInbox({ ...request, candidateAppId: "aldo-coach" }).length, 26);
});
