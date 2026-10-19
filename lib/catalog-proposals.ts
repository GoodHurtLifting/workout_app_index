import { createHash } from "node:crypto";
import { calculateLegitScore, calculateOriginalityScore, type AppRecord } from "./catalog.ts";

type ProposalField = { path: string; label: string; group: string };

const fields: ProposalField[] = [
  ...[
    ["name", "Name"], ["initials", "Logo initials"], ["color", "Logo color"],
    ["type", "Product type"], ["bestFor", "Best for"], ["description", "Description"],
    ["caveat", "Primary caveat"],
  ].map(([path, label]) => ({ path, label, group: "Identity and verdict" })),
  ...[
    ["price", "Price summary"], ["monthlyPrice", "Monthly price"],
    ["supportsOneTimePurchase", "One-time purchase"], ["hasUsableFreeTier", "Usable free tier"],
    ["platforms", "Platforms"], ["ai", "AI status"], ["goals", "Training goals"],
    ["features", "Notable features"], ["level", "Experience levels"],
    ["authorship", "Programming authorship"], ["people", "Creators and trainers"],
    ["deliversCompleteProgram", "Complete program"], ["programLibrary", "Program library"],
    ["adaptiveProgramming", "Adaptive programming"],
    ["supportedTrainingEnvironments", "Training environments"],
  ].map(([path, label]) => ({ path, label, group: "Access and finder facts" })),
  ...[
    ["freeTierCapabilities.completeProgram", "Free complete program"],
    ["freeTierCapabilities.adaptiveProgramming", "Free adaptive programming"],
    ["freeTierCapabilities.programLibrary", "Free program library"],
  ].map(([path, label]) => ({ path, label, group: "Free tier" })),
  ...[
    ["trainingRelationship.planningStyle", "Primary planning style"],
    ["trainingRelationship.secondaryStyles", "Secondary styles"],
    ["trainingRelationship.choiceLoad", "Choice load"],
    ["trainingRelationship.continuity", "Continuity"],
    ["trainingRelationship.customization", "Customization"],
    ["trainingRelationship.decisionsRemoved", "Decisions made easier"],
    ["trainingRelationship.decisionsRemaining", "Decisions the user owns"],
    ["trainingRelationship.tradeoff", "Central tradeoff"],
    ["trainingRelationship.idealUser", "This may sound like you"],
    ["trainingRelationship.notFor", "Probably not your fit"],
  ].map(([path, label]) => ({ path, label, group: "Training relationship" })),
  ...[
    ["legitAssessment.coreExecution", "Core execution"],
    ["legitAssessment.usability", "Usability"],
    ["legitAssessment.reliability", "Reliability"],
    ["legitAssessment.value", "Value"],
    ["legitAssessment.supportPrivacy", "Support and privacy"],
    ["legitAssessment.confidence", "Legit confidence"],
    ["legitAssessment.rationale", "Legit rationale"],
    ["legitAssessment.checkedAt", "Legit check date"],
    ["legitAssessment.sourceUrls", "Legit sources"],
  ].map(([path, label]) => ({ path, label, group: "Legit assessment" })),
  ...[
    ["originalityProfile.level", "Originality level"],
    ["originalityProfile.originalMechanics", "Original mechanics"],
    ["originalityProfile.productPointOfView", "Product point of view"],
    ["originalityProfile.visualIdentity", "Visual identity"],
    ["originalityProfile.meaningfulDifferentiation", "Meaningful differentiation"],
    ["originalityProfile.defensibility", "Defensibility"],
    ["originalityProfile.summary", "Originality summary"],
    ["originalityProfile.evidenceNote", "Originality evidence note"],
  ].map(([path, label]) => ({ path, label, group: "Originality assessment" })),
];

function valueAt(record: AppRecord, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) =>
    value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined, record);
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined).sort(([a], [b]) => a.localeCompare(b));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

export function catalogRecordFingerprint(record: AppRecord): string {
  return createHash("sha256").update(canonical(record)).digest("hex");
}

export type CatalogProposalChange = ProposalField & { before: unknown; after: unknown };

export function catalogProposalChanges(saved: AppRecord, draft: AppRecord): CatalogProposalChange[] {
  if (saved.id !== draft.id) throw new Error("Proposal does not match catalog record");
  const missingSections: ProposalField[] = [
    { path: "trainingRelationship", label: "Training relationship", group: "Training relationship" },
    { path: "legitAssessment", label: "Legit assessment", group: "Legit assessment" },
    { path: "originalityProfile", label: "Originality assessment", group: "Originality assessment" },
  ].filter(field => !valueAt(saved, field.path) && Boolean(valueAt(draft, field.path)));
  const available = fields.filter(field => {
    const parent = field.path.split(".")[0];
    return !field.path.includes(".") || (Boolean((saved as unknown as Record<string, unknown>)[parent]) &&
      Boolean((draft as unknown as Record<string, unknown>)[parent]));
  });
  return [...missingSections, ...available].flatMap(field => {
    const before = valueAt(saved, field.path);
    const after = valueAt(draft, field.path);
    // An omitted optional field in a local draft is not a request to erase an owner edit.
    // Use an explicit empty list or null in the draft when removal is intended.
    return after === undefined || canonical(before) === canonical(after) ? [] : [{ ...field, before, after }];
  });
}

export function applyCatalogProposal(saved: AppRecord, draft: AppRecord, selectedPaths: string[]): AppRecord {
  const changes = catalogProposalChanges(saved, draft);
  const allowed = new Set(changes.map(change => change.path));
  if (!selectedPaths.length || selectedPaths.some(path => !allowed.has(path)) ||
      new Set(selectedPaths).size !== selectedPaths.length) throw new Error("Select valid proposed fields");
  const next = structuredClone(saved) as AppRecord;
  for (const path of selectedPaths) {
    const keys = path.split(".");
    let target: Record<string, unknown> = next as unknown as Record<string, unknown>;
    for (const key of keys.slice(0, -1)) target = target[key] as Record<string, unknown>;
    const value = valueAt(draft, path);
    if (value === undefined) delete target[keys.at(-1)!];
    else target[keys.at(-1)!] = structuredClone(value);
  }
  if (next.legitAssessment && selectedPaths.some(path => [
    "legitAssessment",
    "legitAssessment.coreExecution", "legitAssessment.usability", "legitAssessment.reliability",
    "legitAssessment.value", "legitAssessment.supportPrivacy",
  ].includes(path))) next.legit = calculateLegitScore(next.legitAssessment);
  if (next.originalityProfile && selectedPaths.some(path => [
    "originalityProfile",
    "originalityProfile.originalMechanics", "originalityProfile.productPointOfView",
    "originalityProfile.visualIdentity", "originalityProfile.meaningfulDifferentiation",
    "originalityProfile.defensibility",
  ].includes(path))) next.originalityProfile.score = calculateOriginalityScore(next.originalityProfile);
  return next;
}
