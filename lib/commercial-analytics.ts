import { trackEvent, trackEventWhenReady } from "./analytics.ts";

type CommercialPage = "services" | "partnerships";
type CommercialEvent = "services_page_viewed" | "scope_request_started" |
  "scope_request_submitted" | "partnerships_page_viewed" |
  "partnership_inquiry_submitted" | "partnership_inquiry_started" | "commercial_outbound_selected";

// Fixed, coarse values only. No input-derived parameters or URL/query strings.
function parameters(page: CommercialPage) {
  return { page_location: page === "services" ? "/services" : "/partnerships", page_referrer: "" };
}

export function trackCommercialEvent(event: CommercialEvent, page: CommercialPage) {
  return trackEvent(event, parameters(page));
}

export function trackCommercialSubmission(kind: "service" | "partnership", status: number, ok: boolean) {
  if (status !== 201 || ok !== true) return false;
  const page = kind === "service" ? "services" : "partnerships";
  trackEventWhenReady(kind === "service" ? "scope_request_submitted" : "partnership_inquiry_submitted", parameters(page));
  return true;
}
