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
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}

export function trackEvent(
  name: string,
  parameters: AnalyticsParameters = {},
) {
  if (typeof window === "undefined" || !isPublicAnalyticsPath(window.location.pathname)) return false;
  try {
    if (window.localStorage.getItem("wai-analytics-consent") !== "granted" || !window.gtag) return false;
    window.gtag("event", name, parameters);
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
