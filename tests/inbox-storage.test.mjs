import { registerHooks } from "node:module";
import test from "node:test";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
registerHooks({ resolve(specifier, context, next) {
  const stubs = {
    "server-only": "export {};",
    "next/cache": "export function revalidatePath(){};",
    "@/lib/admin-auth": "export async function getCatalogAdminForAction(){if(!globalThis.__inboxAuthorized)throw new Error('Not authorized');return {userId:'test-owner'}};",
    "@/lib/firebase-admin": "export function getAdminFirestore(){return globalThis.__inboxDb};",
    "@/lib/catalog-repository": "export async function getCatalogRecord(){return null};export async function getPublicCatalog(){return {apps:globalThis.__inboxPublicApps??[]}};",
    "@/app/admin/commercial-actions": "export function saveCommercialWork(){throw new Error('Unexpected commerce write')};export const refreshCommercialPayment=saveCommercialWork,retryInternalNotification=saveCommercialWork,rejectListingAndRefund=saveCommercialWork;",
  };
  if (stubs[specifier]) return { url: `data:text/javascript,${encodeURIComponent(stubs[specifier])}`, shortCircuit: true };
  if (specifier.startsWith("@/")) return next(new URL(specifier.slice(2) + ".ts", root).href, context);
  return next(specifier, context);
} });
const { listEditorialRequests } = await import("../lib/editorial-requests.ts");
const { saveInboxAction } = await import("../app/admin/inbox-actions.ts");

function storage(entries) {
  const rows = new Map(entries.map(entry => [entry.id, structuredClone(entry)]));
  const events = [];
  const snap = id => ({ id, exists: rows.has(id), data: () => structuredClone(rows.get(id)), ref: ref(id) });
  const empty = { orderBy() { return this; }, limit() { return this; }, where() { return this; }, async get() { return { docs: [], size: 0 }; } };
  function ref(id) { return { id, collection: name => ({ ...empty, doc: () => ({ parentId: id, name }) }), async get() { return snap(id); } }; }
  const db = {
    collection(name) {
      if (name !== "editorialRequests") return { ...empty, doc: id => ({ id }) };
      const query = (boundary, max = 100) => ({
        limit(n) { return query(boundary, n); },
        startAfter(doc) { return query(doc.id, max); },
        async get() {
          const all = [...rows.values()].sort((a, b) => b.createdAt - a.createdAt);
          const start = boundary ? all.findIndex(row => row.id === boundary) + 1 : 0;
          const docs = all.slice(start, start + max).map(row => snap(row.id));
          return { docs, size: docs.length };
        },
      });
      return { doc: ref, orderBy: () => query() };
    },
    async getAll() { return []; },
    async runTransaction(fn) {
      const pending = [];
      await fn({ get: async reference => snap(reference.id), create: (reference, data) => pending.push(() => events.push({ reference, data })), update: (reference, patch) => pending.push(() => rows.set(reference.id, { ...rows.get(reference.id), ...patch })) });
      pending.forEach(write => write());
    },
  };
  return { db, rows, events };
}
const request = { id: "abcdefghijklmnopqrst", kind: "app", appName: "Example", name: "Owner", email: "owner@example.com", status: "received", createdAt: 1, details: "Original claim", candidateAppId: "example", inboxRevision: 0 };

test("repository searches beyond the first batch and paginates matching completed records", async () => {
  const entries = Array.from({ length: 140 }, (_, index) => ({ ...request, id: String(index).padStart(20, "0"), appName: index >= 100 ? "Target" : "Other", createdAt: 200 - index, inboxState: "completed" }));
  const store = storage(entries);
  globalThis.__inboxDb = store.db;
  const first = await listEditorialRequests(undefined, false, { q: "target", view: "completed" });
  assert.equal(first.requests.length, 30);
  assert.ok(first.requests.every(row => row.appName === "Target"));
  assert.equal(first.nextCursor, entries[129].id);
  const second = await listEditorialRequests(first.nextCursor, false, { q: "target", view: "completed" });
  assert.equal(second.requests.length, 10);
  assert.equal(second.nextCursor, null);
  assert.equal(new Set([...first.requests, ...second.requests].map(row => row.id)).size, 40);
});

test("completion and reopening preserve original notes and billing, enforce authorization and stale forms", async () => {
  const store = storage([{ ...request, statusNote: "Historical decision", researchNotes: [{ id: "old-note", findings: "Earlier testing" }], invoiceReferenceHistory: [{ id: "old-invoice" }] }]);
  globalThis.__inboxDb = store.db;
  globalThis.__inboxPublicApps = [];
  const form = intent => { const f = new FormData(); f.set("id", request.id); f.set("intent", intent); f.set("inboxRevision", "0"); return f; };
  globalThis.__inboxAuthorized = false;
  assert.match((await saveInboxAction(form("complete"))).error, /Not authorized/);
  globalThis.__inboxAuthorized = true;
  assert.equal((await saveInboxAction(form("complete"))).error, undefined);
  const saved = store.rows.get(request.id);
  assert.equal(saved.inboxState, "completed");
  assert.equal(saved.statusNote, "Historical decision");
  assert.equal(saved.details, "Original claim");
  assert.equal(saved.researchNotes[0].findings, "Earlier testing");
  assert.equal(saved.invoiceReferenceHistory[0].id, "old-invoice");
  assert.match((await saveInboxAction(form("reopen"))).error, /changed/);
  const reopen = form("reopen"); reopen.set("inboxRevision", "1");
  assert.equal((await saveInboxAction(reopen)).error, undefined);
  assert.equal(store.rows.get(request.id).inboxState, "open");
  assert.deepEqual(store.events.map(event => event.data.kind), ["complete", "reopen"]);
});

test("server rejects completing unresolved purchased listings, even if controls are bypassed", async () => {
  const store = storage([{ ...request, listingPurchasedAt: 1, listingPaymentStatus: "paid" }]);
  globalThis.__inboxDb = store.db;
  globalThis.__inboxPublicApps = [];
  globalThis.__inboxAuthorized = true;
  const form = new FormData(); form.set("id", request.id); form.set("intent", "complete"); form.set("inboxRevision", "0");
  assert.match((await saveInboxAction(form)).error, /Purchased listing/);
  assert.equal(store.rows.get(request.id).inboxState, undefined);
  assert.equal(store.events.length, 0);
});

test("new original dictation is appended without trimming or rewriting the owner's words", async () => {
  const store = storage([request]); globalThis.__inboxDb = store.db; globalThis.__inboxAuthorized = true;
  const form = new FormData(); form.set("id", request.id); form.set("intent", "note"); form.set("inboxRevision", "0"); form.set("kind", "owner_dictation");
  const original = "  I couldn't find it.\nThen I tried again — that's what I saw.  \n";
  form.set("findings", original);
  assert.match((await saveInboxAction(form)).error, /observation date/);
  form.set("observedOn", "2026-10-23");
  assert.equal((await saveInboxAction(form)).error, undefined);
  const note = store.events.find(event => event.reference.name === "researchNotes");
  assert.equal(note.data.kind, "owner_dictation");
  assert.equal(note.data.findings, original);
});
