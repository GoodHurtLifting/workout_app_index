import type { AppRecord, FactClaim } from "./catalog.ts";
import { currentClaim, factLabel, latestFactDate } from "./catalog-facts.ts";

export const coverageDescriptions = {
  "Researched claims": "Product information from publisher and app-store sources. This does not verify that a feature works.",
  "Hands-on verified findings": "WAI tried specific workflows and recorded what happened. Findings apply only to the stated testing scope.",
  "Editorial review": "A written assessment based on hands-on use, explaining strengths, limitations and who the app may suit.",
} as const;
export type CoverageLabel = keyof typeof coverageDescriptions;
type HandsOnScope = { scope: string; testedAt: string; context: string };
type EditorialReview = { title: string; publishedAt: string; scope: string; paragraphs: string[] };
type ApprovedCoverage = { handsOn?: HandsOnScope; editorialReview?: EditorialReview };

// Public summaries only. Owner confirmed these historical coverage assignments
// November 23, 2026. Do not import private research/correspondence into the client.
// An editorial review requires an explicitly approved write-up, not a review status.
const approvedCoverage: Record<string, ApprovedCoverage> = {
  "aldo-coach": { handsOn: {
    scope: "Workout logging and AI-assisted training workflows during owner use.",
    testedAt: "October 2026",
    context: "Historical owner observations. Device, version and access-tier details are not fully recorded in this public profile; later releases have not been verified here.",
  } },
  "workoutflow-app": { handsOn: {
    scope: "The owner confirms hands-on use. Detailed workflow coverage has not been recorded in this public profile.",
    testedAt: "Not recorded in this public profile",
    context: "Device, version and access tier are not recorded here. This does not verify all advertised features or the current release.",
  } },
  swithai: { handsOn: {
    scope: "Selected logging, workout-history and recovery workflows, including explored and incomplete paths; not a complete physical-workout test.",
    testedAt: "October 22–23, 2026",
    context: "Android on Samsung Galaxy A54; selected basic trial. Installed version was not established. Later fixes and releases are not verified by these observations.",
  } },
};

export function handsOnClaims(app: AppRecord): FactClaim[] {
  return (app.factClaims ?? []).filter(claim =>
    claim.status === "Independently observed" && currentClaim(app, claim.field) === claim);
}

export function profileCoverage(app: AppRecord) {
  const claims = handsOnClaims(app);
  const approved = approvedCoverage[app.id];
  const handsOn = approved?.handsOn;
  const editorialReview = approved?.editorialReview;
  const labels: CoverageLabel[] = ["Researched claims"];
  if (handsOn || claims.length) labels.push("Hands-on verified findings");
  if (editorialReview) labels.push("Editorial review");
  return { labels, handsOn, claims, editorialReview, sourceDate: latestFactDate(app) };
}

export function coverageLabel(app: AppRecord): string {
  return profileCoverage(app).labels.join(" · ");
}

export function claimCoverageLabel(app: AppRecord, claim: FactClaim): string {
  if (currentClaim(app, claim.field) !== claim) return "Needs rechecking";
  if (claim.status === "Independently observed") return "Hands-on verified finding";
  if (["Officially documented", "App-store documented", "Developer-reported"].includes(claim.status)) return "Researched claim";
  return claim.status;
}

export { factLabel };
