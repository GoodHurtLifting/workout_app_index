import "server-only";
import type { EditorialRequest } from "./editorial-requests.ts";
import { catalogConnection } from "./inbox-workflow.ts";
import { preparedEvidenceForApp } from "./catalog-prepared-evidence.ts";
import { historicalInboxResearch } from "./inbox-historical-research.ts";
import { originalInboxDictation } from "./inbox-original-dictation.ts";

// Original request identifiers from the contemporaneous research records. These
// connect private historical notes even when the catalog connection is missing.
const historicalRequestApps: Record<string, string> = {
  bZbRXp2hmnLHuuzqWLNF: "gir-iron",
  x5u9Gc6KuRnGz7q7v61N: "workoutflow-app",
  AOYBDZAvtNwvaD6u9S8c: "swithai",
};
export type InboxResearch = { id: string; title?: string; sourceType: string; finding: string; note?: string | null; at: number; url?: string | null; origin: string; historical?: boolean };
type SavedResearch = { id: string; app_id: string; source_type: string; claim_supported: string; internal_note: string | null; checked_at: number; url: string | null };
export type OriginalDictation = { id: string; appName: string; capturedAt: string; text: string; sha256: string; attachments: string[]; source: { sessionId: string; line: number } };

function researchAppIds(request: EditorialRequest) {
  return [...new Set([historicalRequestApps[request.id], catalogConnection(request), request.candidateAppId, request.commercialCatalogAppId].filter((id): id is string => Boolean(id)))];
}

export function originalDictationForInbox(request: EditorialRequest): OriginalDictation[] {
  const names: Record<string, string> = { "gir-iron": "Ægir Iron", "swithai": "swithAI", "workoutflow-app": "WorkoutFlow", "aldo-coach": "Aldo Coach" };
  return researchAppIds(request).flatMap(id => (originalInboxDictation[id as keyof typeof originalInboxDictation] ?? []).map(message => ({ ...message, appName: names[id] ?? id })));
}

export function researchForInbox(request: EditorialRequest, savedEvidence: SavedResearch[], catalog: { id: string; name: string }[]): InboxResearch[] {
  const ids = researchAppIds(request);
  const rows: InboxResearch[] = [];
  for (const id of ids) {
    const saved = savedEvidence.filter(source => source.app_id === id);
    const name = catalog.find(app => app.id === id)?.name ?? (id === "gir-iron" ? "Ægir Iron" : id === "workoutflow-app" ? "WorkoutFlow" : id);
    rows.push(...saved.map(source => ({ id: source.id, sourceType: source.source_type, finding: source.claim_supported, note: source.internal_note, at: source.checked_at, url: source.url, origin: `Saved catalog evidence · ${name}` })));
    const seen = new Set(rows.map(row => row.id));
    rows.push(...preparedEvidenceForApp(id).filter(source => source.source_type === "Hands-on testing" && !seen.has(source.id)).map(source => ({ id: source.id, sourceType: source.source_type, finding: source.claim_supported, note: source.internal_note, at: source.checked_at, url: source.url, origin: `Local prepared research · ${name} · not saved on this submission` })));
    const historical = historicalInboxResearch[id as keyof typeof historicalInboxResearch] ?? [];
    rows.push(...historical.filter(source => !seen.has(source.id)).map(source => ({ ...source, at: Date.parse(source.at), historical: true, url: null, origin: `Recovered dictated research · ${name} · historical display, not a new test or saved submission note` })));
  }
  return rows;
}
