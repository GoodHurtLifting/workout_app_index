import type { AppRecord } from "./catalog";

// These 36 profiles were public before the owner-review workflow was introduced.
// Legacy-public is a visibility exception, not an editorial approval or Reviewed status.
// Do not add new submissions here. They become public through owner review and publication.
export const legacyPublicAppIds = [
  "hevy",
  "boostcamp",
  "fitbod",
  "strong",
  "caliber",
  "lift-league",
  "jefit",
  "strengthlog",
  "stronglifts",
  "alpha-progression",
  "fitnotes",
  "rp-hypertrophy",
  "ladder",
  "juggernaut-ai",
  "trainheroic",
  "nike-training-club",
  "future",
  "peloton-app",
  "freeletics",
  "apple-fitness-plus",
  "sweat",
  "centr",
  "gravl",
  "shred",
  "bodi",
  "ifit",
  "les-mills-plus",
  "alo-wellness-club",
  "gymshark-training",
  "smartgym",
  "evolve",
  "volt-athletics",
  "sworkit",
  "fitnessai",
  "seven",
  "home-workout-leap",
] as const;

const legacyPublicIdSet: ReadonlySet<string> = new Set(legacyPublicAppIds);

export function isLegacyPublicApp(id: string): boolean {
  return legacyPublicIdSet.has(id);
}

export function getLegacyPublicApps(bundledApps: AppRecord[]): AppRecord[] {
  assertLegacyPublicCatalogIsComplete(bundledApps);
  const legacyApps = bundledApps.filter((app) => isLegacyPublicApp(app.id));
  if (legacyApps.length !== 36) throw new Error("Legacy public catalog contains duplicate IDs");
  return legacyApps;
}

export function mergePublishedCatalog(legacyApps: AppRecord[], published: AppRecord[]): AppRecord[] {
  const publishedById = new Map(published.map((app) => [app.id, app]));
  const legacyIds = new Set(legacyApps.map((app) => app.id));
  return [
    ...legacyApps.map((app) => publishedById.get(app.id) ?? app),
    ...published.filter((app) => !legacyIds.has(app.id)),
  ];
}

function assertLegacyPublicCatalogIsComplete(bundledApps: AppRecord[]): void {
  const bundledIds = new Set(bundledApps.map((app) => app.id));
  const missing = legacyPublicAppIds.filter((id) => !bundledIds.has(id));
  if (legacyPublicIdSet.size !== 36 || missing.length) {
    throw new Error(`Legacy public catalog must contain the original 36 bundled apps. Missing: ${missing.join(", ")}`);
  }
}
