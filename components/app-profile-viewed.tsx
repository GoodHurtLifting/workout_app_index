"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function AppProfileViewed({ appSlug }: { appSlug: string }) {
  const sentFor = useRef<string | null>(null);

  useEffect(() => {
    const recordView = () => {
      if (sentFor.current === appSlug) return;
      if (trackEvent("app_profile_viewed", { app_slug: appSlug })) {
        sentFor.current = appSlug;
      }
    };
    window.addEventListener("wai:analytics-ready", recordView);
    recordView();
    return () => window.removeEventListener("wai:analytics-ready", recordView);
  }, [appSlug]);

  return null;
}
