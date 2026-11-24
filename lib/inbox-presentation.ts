import type { EditorialRequest } from "./editorial-requests.ts";
import { catalogConnection, eligibilityFor, engagementFor } from "./inbox-workflow.ts";
import { commercialProducts, workLabels } from "./developer-offers.ts";
import { normalizeAppSubmissionStatus, statusLabels, serviceStageLabels } from "./submission-workflow.ts";

export type InboxView = "open" | "completed" | "all";
export type InboxFilter = { q?: string; view?: InboxView; completedCatalogIds?: ReadonlySet<string> };

// Queue completion is independent of catalog visibility, review state and billing.
// Unfinished obligations always keep a request in Open, including after publication.
export function inboxCompletionBlocker(r: EditorialRequest, listed = false): string | null {
  const e = engagementFor(r);
  if (r.listingRefundPending || r.listingRefundFailed || e.invoiceRefs.some(i => i.refundPending || i.refundFailed)) return "Refund needs attention";
  if (r.listingPurchasedAt && r.listingPaymentStatus !== "refunded" && !listed) return "Purchased listing needs completion";
  if (e.invoiceRefs.some(i => ["open", "draft", "uncollectible"].includes(i.status))) return "Invoice needs attention";
  if (e.totalCents && e.workStatus !== "cancelled" && e.invoiceRefs.reduce((sum, i) => sum + i.amountPaid - i.refunded, 0) < e.totalCents) return "Service balance needs attention";
  const products = [...e.agreedProducts, ...e.purchasedProducts];
  if (products.some(p => p !== "listing") && !["complete", "cancelled"].includes(e.workStatus)) return "Service work is unfinished";
  if (["reviewing", "awaiting_access", "awaiting_scope", "in_progress", "on_hold"].includes(e.workStatus)) return "Work is still open";
  if (r.serviceStage && r.serviceStage !== "none" && !["complete", "cancelled"].includes(e.workStatus)) return "Earlier service discussion needs a decision";
  if ((r.kind === "service" || r.kind === "partnership" || r.selectedProduct && r.selectedProduct !== "listing") && !["complete", "cancelled"].includes(e.workStatus)) return "Inquiry or requested work needs a decision";
  return null;
}

export function inboxDisposition(r: EditorialRequest, completedCatalogIds: ReadonlySet<string> = new Set()) {
  const blocker = inboxCompletionBlocker(r, completedCatalogIds.has(catalogConnection(r)));
  if (blocker) return { completed: false, label: blocker };
  if (r.inboxState === "open") return { completed: false, label: "Reopened" };
  if (r.inboxState === "completed") return { completed: true, label: "Completed" };
  if (r.kind === "correction") return { completed: ["resolved", "closed"].includes(r.correctionStatus ?? ""), label: r.correctionStatus === "resolved" ? "Correction resolved" : r.correctionStatus === "closed" ? "Correction closed" : "Correction needs review" };
  if (r.kind === "app") {
    if (completedCatalogIds.has(catalogConnection(r))) return { completed: true, label: "Listed · review complete" };
    if (eligibilityFor(r).result === "ineligible" && (!r.listingPurchasedAt || r.listingPaymentStatus === "refunded")) return { completed: true, label: "Ineligible · closed" };
  }
  return { completed: false, label: "Needs attention" };
}

export function matchesInbox(r: EditorialRequest, filter: InboxFilter): boolean {
  const q = (filter.q ?? "").trim().toLocaleLowerCase();
  const title = r.kind === "app" ? r.appName : r.kind === "correction" ? r.pageUrl : r.organization;
  if (q && ![title, r.name, r.email, catalogConnection(r)].join(" ").toLocaleLowerCase().includes(q)) return false;
  const done = inboxDisposition(r, filter.completedCatalogIds).completed;
  return filter.view === "completed" ? done : filter.view === "open" ? !done : true;
}

export function inboxHref({ q = "", view = "open", deleted = false, cursor }: InboxFilter & { deleted?: boolean; cursor?: string } = {}): string {
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (view !== "open") query.set("inbox", view);
  if (deleted) query.set("deleted", "1");
  if (cursor) query.set("cursor", cursor);
  return `/admin${query.size ? `?${query}` : ""}#editorial-inbox`;
}

export type HistoryItem = { title: string; at?: number; detail?: string; note?: string };
const object = (v: unknown): Record<string, unknown> => v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {};
const text = (v: unknown) => typeof v === "string" ? v : "";
const date = (v: unknown) => typeof v === "number" && Number.isFinite(v) && v > 0 && Number.isFinite(new Date(v).getTime()) ? v : undefined;
function decision(value: unknown) {
  const s = text(value);
  if (!s) return "";
  const labels: Record<string, string> = { eligible: "Eligible", ineligible: "Ineligible", pending: "Pending", complete: "Complete", completed: "Completed", open: "Open" };
  return statusLabels[normalizeAppSubmissionStatus(s as EditorialRequest["status"])] ?? serviceStageLabels[s as keyof typeof serviceStageLabels] ?? labels[s] ?? "Earlier recorded state";
}

export function readableHistory(r: EditorialRequest): HistoryItem[] {
  const items: HistoryItem[] = [];
  if (r.status) items.push({ title: "Earlier workflow status", detail: decision(r.status), note: "Retained for context; this is not the current inbox-completion or catalog-publication status." });
  if (r.screeningCompletedAt || r.screeningNote) items.push({ title: "Earlier eligibility screening", at: date(r.screeningCompletedAt), note: r.screeningNote });
  if (r.statusNote) items.push({ title: decision(r.status), note: r.statusNote });
  for (const round of r.reviewRounds ?? []) items.push({ title: `Review round ${round.number}${round.outcome ? ` · ${decision(round.outcome)}` : ""}`, at: date(round.decidedAt ?? round.startedAt), detail: round.testedScope, note: [round.startNote, round.decisionNote].filter(Boolean).join("\n") });
  for (const stage of r.serviceHistory ?? []) items.push({ title: serviceStageLabels[stage.stage] ?? "Earlier service decision", at: date(stage.at), note: stage.note });
  if (r.serviceStageNote) items.push({ title: "Earlier service note", at: date(r.serviceStageAt), note: r.serviceStageNote });
  for (const raw of r.workflowHistory ?? []) {
    const event = object(raw), after = object(event.after), before = object(event.before);
    const kind = text(event.kind || event.type);
    const labels: Record<string, string> = { eligibility: "Eligibility updated", note: "Research note added", create: "Catalog draft created", link: "Catalog connection changed", catalog_connection: "Catalog connection changed", delete: "Removed from inbox", restore: "Restored to inbox", correction: "Correction updated", complete: "Inbox request completed", reopen: "Inbox request reopened", review_outcome_recorded: "Review decision recorded", review_round_started: "Review round started", service_stage_recorded: "Service stage updated" };
    const from = decision(event.from), to = decision(event.to);
    const eligibility = object(after.eligibility);
    const detail = kind === "eligibility" ? decision(eligibility.result) : from || to ? [from, to].filter(Boolean).join(" → ") : undefined;
    items.push({ title: labels[kind] ?? "Saved workflow change", at: date(event.at), detail, note: text(eligibility.note) || text(after.correctionNote) || text(after.inboxCompletionNote) || (kind === "link" || kind === "catalog_connection" ? `Catalog connection: ${text(after.commercialCatalogAppId) || text(after.candidateAppId) || text(event.after) || "Not connected"}. Earlier connection: ${text(before.commercialCatalogAppId) || text(before.candidateAppId) || "Not recorded"}.` : undefined) });
  }
  for (const raw of r.invoiceReferenceHistory ?? []) {
    const invoice = object(raw);
    items.push({ title: "Earlier invoice reference retained", at: date(invoice.replacedAt), detail: "Replacement retained for billing reconciliation. See Work and payments for current verified invoices." });
  }
  if (!items.length) items.push({ title: "No decisions recorded yet" });
  return items.sort((a, b) => (b.at ?? 0) - (a.at ?? 0));
}

export function requestedWorkLabel(r: EditorialRequest): string {
  const e = engagementFor(r);
  return [...new Set([...e.agreedProducts, ...e.purchasedProducts])].map(p => commercialProducts[p]).join(", ") || workLabels[e.workStatus];
}
