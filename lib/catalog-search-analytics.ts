import { analyticsConsentGranted, trackEvent, type AnalyticsParameters } from "./analytics.ts";

export const catalogFilterGroups = ["access", "ai", "type", "platform", "authorship", "level", "feature"] as const;
export type CatalogFilterGroup = typeof catalogFilterGroups[number];
export type SearchState = { query: string; groups: CatalogFilterGroup[]; resultCount: number };
const contextKey = "wai-search-attribution-facts-1";
const ttl = 30 * 60 * 1000;
export function searchParameters(state: SearchState) {
  const text = state.query.trim().length >= 2;
  const groups = catalogFilterGroups.filter(group => state.groups.includes(group));
  if (!text && !groups.length) return null;
  const count = groups.length;
  const results = state.resultCount;
  return { search_mode: text ? (count ? "mixed" : "text") : "filters",
    filter_count_bucket: count === 0 ? "0" : count === 1 ? "1" : count < 4 ? "2-3" : "4+",
    result_count_bucket: results === 0 ? "0" : results === 1 ? "1" : results <= 5 ? "2-5" : results <= 20 ? "6-20" : "21+",
    sort_mode: "alphabetical", filter_groups: groups.join(",") };
}
export function resultPositionBucket(position: number) {
  return position === 1 ? "1" : position <= 3 ? "2-3" : position <= 6 ? "4-6" : "7+";
}

// Raw text is used only for in-memory equality and never passed to trackEvent/storage.
export function createCatalogSearchTracker() {
  let lastSignature: string | null = null;
  let pending: SearchState | null = null;
  let authorizedState: string | null = null;
  const signature = (state: SearchState) => JSON.stringify([state.query.trim().toLowerCase(), catalogFilterGroups.filter(group => state.groups.includes(group))]);
  function commit(state: SearchState) {
    if (!analyticsConsentGranted()) { pending = null; authorizedState = null; return false; }
    const params = searchParameters(state);
    if (!params) { pending = null; authorizedState = null; lastSignature = null; return false; }
    const key = signature(state);
    authorizedState = key;
    if (lastSignature === key) return true;
    if (!trackEvent("catalog_search_completed", params)) { pending = state; return false; }
    lastSignature = key;
    pending = null;
    return true;
  }
  return { commit,
    retry() { if (pending) commit(pending); },
    cancel() { pending = null; authorizedState = null; },
    reset() { pending = null; authorizedState = null; lastSignature = null; },
    select(state: SearchState, appSlug: string, position: number, intentional: boolean) {
      if (!intentional && authorizedState !== signature(state)) return;
      if (!commit(state) || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(appSlug)) return;
      const params = searchParameters(state)!;
      if (!trackEvent("catalog_result_selected", { ...params, app_slug: appSlug, result_position_bucket: resultPositionBucket(position), placement: "catalog_results" })) return;
      try { window.sessionStorage.setItem(contextKey, JSON.stringify({ appSlug, params, expires: Date.now() + ttl, profileRecorded: false })); } catch { /* Navigation still works without attribution. */ }
    },
  };
}
function context(appSlug: string) {
  if (!analyticsConsentGranted()) return null;
  try {
    const raw = window.sessionStorage.getItem(contextKey);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (saved.appSlug !== appSlug || !Number.isFinite(saved.expires) || saved.expires <= Date.now() || saved.expires > Date.now() + ttl || typeof saved.profileRecorded !== "boolean") return null;
    // Reconstruct the fixed vocabulary; never forward values from storage directly.
    const groups = typeof saved.params?.filter_groups === "string" ? saved.params.filter_groups.split(",") : [];
    if (!["text", "mixed", "filters"].includes(saved.params?.search_mode)) return null;
    const params = searchParameters({query: saved.params.search_mode === "filters" ? "" : "xx", groups: catalogFilterGroups.filter(group => groups.includes(group)), resultCount: ({"0":0,"1":1,"2-5":2,"6-20":6,"21+":21} as Record<string,number>)[saved.params.result_count_bucket] ?? 21});
    if (!params) return null;
    return { ...saved, params };
  } catch { return null; }
}
export function searchAttribution(appSlug: string, stage: "profile" | "outbound"): AnalyticsParameters {
  const saved = context(appSlug);
  if (!saved || (stage === "profile" ? saved.profileRecorded : !saved.profileRecorded)) return {};
  return { ...saved.params, discovery_source: "catalog_search" };
}
export function markSearchProfileViewed(appSlug: string) {
  const saved = context(appSlug);
  if (!saved) return;
  try { window.sessionStorage.setItem(contextKey, JSON.stringify({ ...saved, profileRecorded: true })); } catch { /* Optional attribution only. */ }
}
export function clearSearchAttribution() {
  try { window.sessionStorage.removeItem(contextKey); } catch { /* Storage may be blocked. */ }
}
