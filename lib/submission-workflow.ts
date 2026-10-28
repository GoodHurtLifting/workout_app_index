export const appSubmissionStatuses = [
  "received", "screening", "waitlisted_unassessed", "waitlisted_eligible",
  "accepted_for_research", "active_review", "research_ready", "not_scheduled", "declined",
  "selected_for_listing", "not_selected", "review_deferred",
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
  selected_for_listing: "Selected for listing, not yet published",
  not_selected: "Not selected after evaluation",
  review_deferred: "Evaluation deferred",
};

export const reviewOutcomes = ["selected_for_listing", "not_selected", "review_deferred"] as const;
export type ReviewOutcome = typeof reviewOutcomes[number];
export const serviceStages = ["none", "followup_discussion", "audit_discussion", "followup_agreed", "audit_agreed"] as const;
export type ServiceStage = typeof serviceStages[number];
export const serviceStageLabels: Record<ServiceStage, string> = {
  none: "No paid work discussed",
  followup_discussion: "Focused follow-up discussed",
  audit_discussion: "Private audit discussed",
  followup_agreed: "Focused follow-up agreed",
  audit_agreed: "Private audit agreed",
};

export function canStartAnotherReview(status: AppSubmissionStatus): boolean {
  return status === "selected_for_listing" || status === "not_selected" || status === "review_deferred";
}

export function publicationDecision(status: AppSubmissionStatus, alreadyPublic: boolean): "include" | "hold" | "conflict" {
  if (alreadyPublic) return status === "not_selected" || status === "review_deferred" ? "conflict" : "include";
  return status === "selected_for_listing" ? "include" : "hold";
}

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
    research_ready: ["selected_for_listing", "not_selected", "review_deferred"],
    not_scheduled: ["screening", "waitlisted_eligible", "accepted_for_research", "declined"],
    declined: [],
    selected_for_listing: ["active_review"],
    not_selected: ["active_review"],
    review_deferred: ["active_review"],
  };
  return allowed[from].includes(to);
}
