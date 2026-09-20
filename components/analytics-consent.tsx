"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "wai-analytics-consent";
type ConsentChoice = "granted" | "denied" | null;

export function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restoreChoice = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
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
    window.localStorage.setItem(STORAGE_KEY, nextChoice);
    window.gtag?.("consent", "update", {
      analytics_storage: nextChoice,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setChoice(nextChoice);
  };

  if (!measurementId) return null;

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="wai-google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`}
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
