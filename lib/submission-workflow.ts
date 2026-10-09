export const MONTHLY_SCREENING_LIMIT = 8;
export const MONTHLY_ACCEPTANCE_LIMIT = 2;

export const appSubmissionStatuses = [
  "received", "screening", "waitlisted_unassessed", "waitlisted_eligible",
  "accepted_for_research", "active_review", "research_ready", "not_scheduled", "declined",
] as const;

export type AppSubmissionStatus = typeof appSubmissionStatuses[number];
export type SubmissionStatus = AppSubmissionStatus | "new" | "seen" | "accepted" | "reviewed";

export function normalizeAppSubmissionStatus(status: SubmissionStatus): AppSubmissionStatus {
  if (status === "new" || status === "seen") return "received";
  if (status === "accepted" || status === "reviewed") return "accepted_for_research";
  return status;
}

export const statusLabels: Record<AppSubmissionStatus, string> = {
  received: "Received",
  screening: "Screening",
  waitlisted_unassessed: "Waitlisted, not screened",
  waitlisted_eligible: "Waitlisted, eligible",
  accepted_for_research: "Accepted for research",
  active_review: "Active deep review",
  research_ready: "Research ready for owner review",
  not_scheduled: "Not currently scheduled",
  declined: "Declined",
};

export function monthKey(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 7);
}

export function canTransition(from: AppSubmissionStatus, to: AppSubmissionStatus): boolean {
  const allowed: Record<AppSubmissionStatus, AppSubmissionStatus[]> = {
    received: ["screening", "waitlisted_unassessed", "declined"],
    screening: ["waitlisted_eligible", "accepted_for_research", "not_scheduled", "declined"],
    waitlisted_unassessed: ["screening", "declined"],
    waitlisted_eligible: ["accepted_for_research", "not_scheduled", "declined"],
    accepted_for_research: ["active_review", "not_scheduled"],
    active_review: ["research_ready", "not_scheduled"],
    research_ready: ["not_scheduled"],
    not_scheduled: ["screening", "waitlisted_eligible", "accepted_for_research", "declined"],
    declined: [],
  };
  return allowed[from].includes(to);
}
