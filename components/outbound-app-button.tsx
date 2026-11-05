"use client";

import { trackEvent } from "@/lib/analytics";

import { searchAttribution } from "@/lib/catalog-search-analytics";

export function OutboundAppButton({ destinationType, appSlug, url }: {
  destinationType: "store" | "official_site";
  appSlug: string;
  url: string;
}) {
  return <button className="profile-outbound-button" type="button" onClick={() => {
    trackEvent("outbound_app_click", {
      destination_type: destinationType,
      placement: "profile",
      app_slug: appSlug,
      ...searchAttribution(appSlug, "outbound"),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }}>{destinationType === "store" ? "Open app store" : "Visit official site"}</button>;
}
