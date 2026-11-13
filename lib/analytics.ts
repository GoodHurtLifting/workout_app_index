export type AnalyticsParameters = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isPublicAnalyticsPath(pathname: string) {
  return !["/admin", "/api", "/preview"].some(path => pathname === path || pathname.startsWith(`${path}/`));
}

// Public route vocabulary only; unknown paths must not leak arbitrary identifiers.
export function publicAnalyticsPagePath(pathname: string) {
  if (/^\/apps\/[a-z0-9][a-z0-9-]{0,79}$/.test(pathname)) return pathname;
  return ["/", "/apps", "/find", "/services", "/partnerships", "/submit-app", "/corrections", "/editorial-standards", "/how-we-score", "/terms", "/privacy"].includes(pathname) ? pathname : undefined;
}

export function analyticsConsentGranted() {
  if (typeof window === "undefined" || !isPublicAnalyticsPath(window.location.pathname)) return false;
  try { return window.localStorage.getItem("wai-analytics-consent") === "granted"; } catch { return false; }
}

export function trackEvent(
  name: string,
  parameters: AnalyticsParameters = {},
) {
  if (typeof window === "undefined" || !isPublicAnalyticsPath(window.location.pathname)) return false;
  try {
    if (window.localStorage.getItem("wai-analytics-consent") !== "granted" || !window.gtag) return false;
    const pagePath = publicAnalyticsPagePath(window.location.pathname);
    if (!pagePath) return false;
    window.gtag("event", name, { ...parameters,
      // Override automatic full-URL context for custom events. Commercial fixed paths remain compatible.
      page_location: parameters.page_location ?? pagePath, page_referrer: "",
      measurement_version: "facts-1", page_path: pagePath });
    return true;
  } catch {
    // Analytics must never interrupt a form submission or outbound navigation.
    return false;
  }
}

export function trackEventWhenReady(name: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || !isPublicAnalyticsPath(window.location.pathname)) return;
  try {
    if (window.localStorage.getItem("wai-analytics-consent") !== "granted") return;
  } catch {
    return;
  }
  if (trackEvent(name, parameters)) return;
  window.addEventListener("wai:analytics-ready", () => {
    trackEvent(name, parameters);
  }, { once: true });
}

export function openAnalyticsPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("wai:open-analytics-preferences"));
}
