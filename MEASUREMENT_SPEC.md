# WAI measurement specification — facts-1

Prepared 2026-11-05 before event implementation. Source baseline: main b436f2e. This version is not a deployment record; record the actual release timestamp after Ryan deploys. Remote checkpoint wai-pre-facts-first-pivot-2026-11-04 resolves to 25faf4dad7911977f63abf0f030fe3314ecae2a9.

## Existing inventory and retained meanings

| Event | Actual trigger | Existing custom parameters |
| --- | --- | --- |
| app_profile_viewed | Successfully rendered public profile, once per mounted slug; retries when tag becomes ready | app_slug |
| add_to_comparison | Add an app below the four-app cap; removal is not an add | app_id (retain historical spelling) |
| complete_app_finder | Explicit final questionnaire answer; restored results do not complete again | none |
| outbound_app_click | Profile destination button selected, before navigation | app_slug, destination_type (store/official_site), placement (profile) |
| submission_started | First nonempty app-submission input per mounted form | none |
| submission_completed | Server confirms HTTP 201 and ok=true | none |
| services_page_viewed / partnerships_page_viewed | Corresponding page mounts with consent and ready tag | page_location (fixed relative /services or /partnerships), page_referrer (empty) |
| scope_request_started | First nonempty scope-request input | same fixed commercial parameters |
| scope_request_submitted / partnership_inquiry_submitted | Confirmed HTTP 201 and ok=true | same fixed commercial parameters |
| commercial_outbound_selected | Commercial contact link selection | same fixed commercial parameters; not an inquiry or revenue |

Sources: lib/analytics.ts, lib/commercial-analytics.ts, components/workout-app-index.tsx, app-profile-viewed.tsx, outbound-app-button.tsx, editorial-request-form.tsx, commercial-inquiry-form.tsx. Automatic GA events are separate and are not confirmed saves. Historic view_app_profile means selection, not rendered profile: retain its name and the documented 2026-10-15 00:50:08 UTC cutover. No post-pivot production cutover is verified.

## New measurement contract

catalog_search_completed: after 1,200 ms without an intentional catalog input/filter change, or immediately before selecting a result from that state. Meaningful means trimmed text of at least two characters or one active filter. Empty/default states and one-character-only text are not measured. No event on hydration, default browse, filter URL initialization, finder restoration, or rerender. A homepage search submitted into the catalog carries explicit intent once. Identical consecutive states do not complete again. Raw text exists only in local UI state and in the in-memory deduplication signature; never in analytics parameters.

catalog_result_selected: a View facts link in measured catalog results is selected. A click before the debounce first completes that search once. Home examples and finder results are not catalog search selections. Keep ordinary anchors and navigation intact, even when analytics/storage fail.

All retained and new custom events receive measurement_version=facts-1 and a query-free relative page_path. Custom events also override inherited page_location with a fixed relative public path and page_referrer with an empty string; legacy commercial fixed page locations remain compatible. Events on unknown route shapes fail closed. This is an additive schema change; historical rows have no version. No manual page_view is introduced: existing automatic pageviews remain authoritative pending a separate stream-settings audit.

| Parameter | Allowed values and privacy review |
| --- | --- |
| measurement_version | Fixed facts-1; separates implementations, not people |
| page_path | Only known public route shapes, including a bounded public app slug; no query, fragment, email or arbitrary route |
| search_mode | text / filters / mixed; never text content |
| filter_count_bucket | 0 / 1 / 2-3 / 4+; no answers |
| result_count_bucket | 0 / 1 / 2-5 / 6-20 / 21+; no precise small-user counts |
| sort_mode | alphabetical only |
| filter_groups | Sorted comma-separated subset of access, ai, type, platform, authorship, level, feature; category names only, never selected values or health/training goals |
| app_slug / existing app_id | Bounded slug of the public catalog product; not a visitor/account identifier |
| result_position_bucket | 1 / 2-3 / 4-6 / 7+ |
| placement | catalog_results for new selections; existing profile retained |
| discovery_source | catalog_search on a matching selected profile/outbound; otherwise absent |
| destination_type | Existing store / official_site only; never destination URL |
| page_location/page_referrer | Fixed relative public path and empty referrer for custom events; legacy commercial service/partnership paths retained for compatibility. No full URL or query |

No raw terms, names, emails, phone numbers, form content, health data, account/submission/session IDs, full URLs, free-form values, or custom pseudo-identifiers. Standard GA automatic parameters/settings require separate live review; this custom-event contract is not a claim about Enhanced Measurement privacy.

## Attribution and deduplication

One consented, tab-local sessionStorage context holds the selected public slug, coarse search parameters, a local expiry timestamp, and whether its profile has rendered. It expires after 30 minutes and is never transmitted as an identifier. A new selection replaces it. Only a matching slug can receive discovery_source=catalog_search. Profile attribution is consumed after successful recording; revisiting it does not generate another search-attributed view. Outbound attribution requires that rendered profile context. Denied consent and unavailable storage fail closed. Analytics readiness retries only the current settled search while consent is already granted; pre-consent interactions are not replayed. Revoke clears pending attribution; helpers catch failures and never block navigation/forms.

The funnel uses stage event ratios, not identity-joined sessions. Multiple selections, repeat outbound clicks, consent loss, storage restrictions and dates crossing midnight can produce rates above 100 percent or missing later stages. Label these as event ratios, never exact visitor conversion. COUNT(DISTINCT user_pseudo_id) is permitted only inside aggregate counts and describes approximate devices, not people. Do not sum daily distinct devices across dates.

## Release boundaries

No live GA settings, views, dashboards, exports, IAM or billing changes are included. Enhanced Measurement site search, outbound click, form interactions, query-string page locations and history-pageview behavior need an owner-reviewed check. Automatic form_submit is never a successful inquiry. Keep full test/build validation manual in this task. See ANALYTICS_SEO_AUDIT.md and reporting/README.md for evidence, SQL setup, dashboard instructions and release checks.
