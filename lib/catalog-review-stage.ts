import type { ResearchStatus } from "./catalog.ts";

export type ReviewStageProblem = "save-first" | "stale" | "same" | "confirm" | "invalid";

const stages = new Set<ResearchStatus>(["Candidate", "Researching", "Evaluation ready", "Reviewed"]);

export function reviewStageProblem({
  saved,
  expectedUpdatedAt,
  actualUpdatedAt,
  currentStatus,
  targetStatus,
  confirmed,
}: {
  saved: boolean;
  expectedUpdatedAt: string;
  actualUpdatedAt: number | undefined;
  currentStatus: ResearchStatus | undefined;
  targetStatus: string;
  confirmed: boolean;
}): ReviewStageProblem | null {
  if (!saved || !currentStatus) return "save-first";
  if (!actualUpdatedAt || expectedUpdatedAt !== String(actualUpdatedAt)) return "stale";
  if (!stages.has(targetStatus as ResearchStatus)) return "invalid";
  if (targetStatus === currentStatus) return "same";
  if (targetStatus === "Reviewed" && !confirmed) return "confirm";
  return null;
}
