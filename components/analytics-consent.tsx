"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isPublicAnalyticsPath } from "@/lib/analytics";

import { clearSearchAttribution } from "@/lib/catalog-search-analytics";

const STORAGE_KEY = "wai-analytics-consent";
type ConsentChoice = "granted" | "denied" | null;

export function AnalyticsConsent() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restoreChoice = window.setTimeout(() => {
      let stored: string | null = null;
      try { stored = window.localStorage.getItem(STORAGE_KEY); } catch { /* Fail closed. */ }
      setChoice(stored === "granted" || stored === "denied" ? stored : null);
      setReady(true);
    }, 0);

    const openPreferences = () => setChoice(null);
    window.addEventListener("wai:open-analytics-preferences", openPreferences);
    return () => {
      window.clearTimeout(restoreChoice);
      window.removeEventListener(
        "wai:open-analytics-preferences",
        openPreferences,
      );
    };
  }, []);

  const choose = (nextChoice: Exclude<ConsentChoice, null>) => {
    let wasGranted = false;
    try {
      wasGranted = window.localStorage.getItem(STORAGE_KEY) === "granted";
      window.localStorage.setItem(STORAGE_KEY, nextChoice);
    } catch {
      if (measurementId) (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
      setChoice("denied");
      clearSearchAttribution();
      window.dispatchEvent(new Event("wai:analytics-revoked"));
      try { window.gtag?.("consent", "update", { analytics_storage: "denied" }); } catch { /* The preference still applies. */ }
      if (wasGranted) window.location.reload();
      return;
    }
    if (measurementId) (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = nextChoice === "denied";
    if (nextChoice === "denied") {
      clearSearchAttribution();
      window.dispatchEvent(new Event("wai:analytics-revoked"));
    }
    try { window.gtag?.("consent", "update", { analytics_storage: nextChoice }); } catch { /* The preference still applies. */ }
    setChoice(nextChoice);
    if (wasGranted && nextChoice === "denied") window.location.reload();
  };

  if (!measurementId || !isPublicAnalyticsPath(pathname)) return null;

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="wai-google-analytics" strategy="afterInteractive">
            {`if (!window.__waiAnalyticsGuardInstalled) {
  window.__waiAnalyticsGuardInstalled = true;
  const disableKey = 'ga-disable-${measurementId}';
  const setRouteGate = (url) => {
    const path = new URL(url || window.location.href, window.location.href).pathname;
    let consentGranted = false;
    try { consentGranted = window.localStorage.getItem('wai-analytics-consent') === 'granted'; } catch {}
    window[disableKey] = !consentGranted || ['/admin', '/api', '/preview'].some(prefix => path === prefix || path.startsWith(prefix + '/'));
  };
  setRouteGate();
  for (const method of ['pushState', 'replaceState']) {
    const original = window.history[method];
    window.history[method] = function(state, title, url) {
      if (url != null) setRouteGate(url);
      return original.apply(this, arguments);
    };
  }
  window.addEventListener('popstate', () => setRouteGate(), true);
}
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });
window.dispatchEvent(new Event('wai:analytics-ready'));`}
          </Script>
        </>
      ) : null}

      {ready && choice === null ? (
        <aside className="analytics-consent" aria-labelledby="analytics-title">
          <div>
            <strong id="analytics-title">Help us improve Workout App Index</strong>
            <p>
              We use Google Analytics to understand which pages and tools are
              useful. Analytics stays off unless you accept.
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button onClick={() => choose("denied")}>Decline</button>
            <button className="accept" onClick={() => choose("granted")}>
              Accept analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
