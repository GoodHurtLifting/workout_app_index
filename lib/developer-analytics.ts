import { analyticsConsentGranted, trackEvent } from "./analytics.ts";
export const developerEvents = ["submission_page_one_completed", "submission_offer_viewed", "submission_service_selected", "service_inquiry_saved", "listing_checkout_started", "listing_purchase_confirmed"] as const;
export type DeveloperEvent = typeof developerEvents[number];

export function trackDeveloperEvent(event: DeveloperEvent, id: string, service?: string) {
  if (!/^[A-Za-z0-9]{20}$/.test(id) || !analyticsConsentGranted()) return false;
  if (service && !["listing", "focused_test", "launch_review", "competitive_audit"].includes(service)) return false;
  return trackEvent(event, { submission_id: id, funnel_version: "developer-1", ...(service ? { service } : {}) });
}
