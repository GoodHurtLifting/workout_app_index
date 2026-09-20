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

export function trackEvent(
  name: string,
  parameters: AnalyticsParameters = {},
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, parameters);
}

export function openAnalyticsPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("wai:open-analytics-preferences"));
}
