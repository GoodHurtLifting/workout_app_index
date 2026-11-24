import { registerHooks } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
registerHooks({
  resolve(specifier, context, next) {
    const stubs = {
      "next/link": "import React from 'react';export default function Link({href,children,...props}){return React.createElement('a',{href,...props},children)}",
      "server-only": "export {};",
      "@/app/admin/inbox-actions": "export async function saveInboxAction(){throw new Error('Rendering must not write data')}",
    };
    if (specifier.endsWith("/admin-action-form") || specifier === "./admin-action-form") stubs[specifier] = "import React from 'react';export function AdminActionForm({children}){return React.createElement('form',null,children)}";
    // Resolve stubs as virtual repository files so React resolves from node_modules.
    if (stubs[specifier]) return { url: new URL(`work/test-stub-${specifier === "next/link" ? "link" : specifier.includes("inbox-actions") ? "action" : specifier === "server-only" ? "server" : "form"}.mjs?source=${encodeURIComponent(stubs[specifier])}`, root).href, shortCircuit: true };
    if (specifier.startsWith("@/") || specifier.startsWith("./") && !/\.[cm]?[jt]sx?$/.test(specifier)) {
      const base = specifier.startsWith("@/") ? new URL(specifier.slice(2), root) : new URL(specifier, context.parentURL);
      for (const ext of [".ts", ".tsx"]) if (existsSync(fileURLToPath(base) + ext)) return next(base.href + ext, context);
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    const parsed = new URL(url);
    if (parsed.searchParams.has("source")) return { source: parsed.searchParams.get("source"), format: "module", shortCircuit: true };
    if (url.endsWith(".tsx")) return { source: ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText, format: "module", shortCircuit: true };
    return next(url, context);
  },
});
const { SubmissionInboxCard } = await import("../components/submission-inbox-card.tsx");
const { OriginalDictatedNotes } = await import("../components/submission-research-history.tsx");
const { originalDictationForInbox, researchForInbox } = await import("../lib/inbox-research.ts");
const request = { id: "abcdefghijklmnopqrst", kind: "app", appName: "Example App", name: "Owner", email: "owner@example.com", status: "received", createdAt: 1, details: "Original developer claims", availability: "Android", pricing: "Free", websiteUrl: "https://example.com", privacyUrl: "https://example.com/privacy", storeUrl: "", candidateAppId: "example" };

test("rows and lengthy sections start collapsed while eligibility, catalog and commercial controls remain available", () => {
  const html = renderToStaticMarkup(React.createElement(SubmissionInboxCard, { request, catalogOptions: [{ id: "example", name: "Example App" }], publicIds: new Set(["example"]), completedCatalogIds: new Set(["example"]) }));
  assert.match(html, /<details class="submission-card"><summary/);
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|>)/);
  for (const label of ["Listed · review complete", "Eligibility", "0/6", "Catalog preparation", "Work and payments", "Save scope and price", "Save invoice references", "Reopen request", "Original developer claims"]) assert.ok(html.includes(label), label);
});

test("earlier testing is readable even without new submission notes; raw audit payloads never render", () => {
  const r = { ...request, reviewRounds: [{ number: 1, testedScope: "Explored the workout log", decisionNote: "Earlier retained decision" }], workflowHistory: [{ kind: "eligibility", at: 1, by: "private-user-id", after: { eligibility: { result: "eligible", note: "Public sources checked" }, automationState: "disabled", secret: "raw-payload" } }] };
  const linkedResearch = [{ id: "older-evidence", sourceType: "Hands-on testing", finding: "Earlier catalog observation", note: "Test scope limits", at: 1, origin: "Saved catalog evidence" }];
  const html = renderToStaticMarkup(React.createElement(SubmissionInboxCard, { request: r, catalogOptions: [], linkedResearch }));
  for (const text of ["Earlier catalog observation", "Saved catalog evidence", "Explored the workout log", "Earlier retained decision", "Public sources checked", "Test scope limits"]) assert.ok(html.includes(text));
  for (const text of ["private-user-id", "raw-payload", "automationState", "<pre"]) assert.equal(html.includes(text), false);
});

test("original wording is rendered separately from summaries and safely escaped", () => {
  const html = renderToStaticMarkup(React.createElement(OriginalDictatedNotes, { request, messages: [{ id: "original", appName: "Example", capturedAt: "2026-10-23T12:00:00Z", text: "I tapped it.\n<script>unsafe()</script>", sha256: "test-fingerprint", source: { sessionId: "test-session", line: 1 }, attachments: [] }] }));
  assert.match(html, /Original dictated words/);
  assert.match(html, /I tapped it\./);
  assert.match(html, /&lt;script&gt;unsafe/);
  assert.doesNotMatch(html, /<script>/);
});

test("the original WorkoutFlow request shows both source dictation and recovered summaries while remaining open", () => {
  const r = { ...request, id: "x5u9Gc6KuRnGz7q7v61N", candidateAppId: undefined };
  const html = renderToStaticMarkup(React.createElement(SubmissionInboxCard, { request: r, catalogOptions: [], originalDictation: originalDictationForInbox(r), linkedResearch: researchForInbox(r, [], []) }));
  for (const text of ["Original dictated words", "Research summaries and earlier evidence", "The second set earlier was because long pressing", "earlier second-set interpretation", "Needs attention", "Mark request completed"]) assert.ok(html.includes(text), text);
  assert.equal(r.inboxState, undefined);
});
