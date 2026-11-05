"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { analyticsConsentGranted } from "@/lib/analytics";
import { createCatalogSearchTracker, type SearchState } from "@/lib/catalog-search-analytics";

export function useCatalogSearchAnalytics(state: SearchState, active: boolean) {
  const [tracker] = useState(createCatalogSearchTracker);
  const intentional = useRef(false);
  const key = JSON.stringify(state);
  const settledState = useMemo(() => JSON.parse(key) as SearchState, [key]);
  useEffect(() => {
    if (!active || !intentional.current) return;
    tracker.cancel();
    const timer = window.setTimeout(() => tracker.commit(settledState), 1200);
    return () => { window.clearTimeout(timer); tracker.cancel(); };
  }, [settledState, active, tracker]);
  useEffect(() => {
    const ready = () => tracker.retry();
    const revoke = () => { intentional.current = false; tracker.reset(); };
    window.addEventListener("wai:analytics-ready", ready);
    window.addEventListener("wai:analytics-revoked", revoke);
    return () => { tracker.cancel(); window.removeEventListener("wai:analytics-ready", ready); window.removeEventListener("wai:analytics-revoked", revoke); };
  }, [tracker]);
  const changed = useCallback(() => { intentional.current = analyticsConsentGranted(); tracker.cancel(); }, [tracker]);
  const select = useCallback((appSlug: string, position: number) => tracker.select(settledState, appSlug, position, intentional.current), [tracker, settledState]);
  return { changed, select };
}
