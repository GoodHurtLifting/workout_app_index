# WAI measurement specification — facts-1 and developer-1

Current event contract updated November 13, 2026. Implementation and live export verification are separate; see [Deployment](DEPLOYMENT.md) for the verified boundary. Historical audit findings are retained in [the dated audit](archive/ANALYTICS_AUDIT_2026-11-05.md).

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

No raw terms, names, emails, phone numbers, form content, health data, account/session IDs, full URLs, free-form values or custom pseudo-identifiers. Submission IDs are prohibited except for the six expressly approved developer-1 events below. Standard GA automatic parameters/settings require separate live review; this custom-event contract is not a claim about Enhanced Measurement privacy.

## Attribution and deduplication

One consented, tab-local sessionStorage context holds the selected public slug, coarse search parameters, a local expiry timestamp, and whether its profile has rendered. It expires after 30 minutes and is never transmitted as an identifier. A new selection replaces it. Only a matching slug can receive discovery_source=catalog_search. Profile attribution is consumed after successful recording; revisiting it does not generate another search-attributed view. Outbound attribution requires that rendered profile context. Denied consent and unavailable storage fail closed. Analytics readiness retries only the current settled search while consent is already granted; pre-consent interactions are not replayed. Revoke clears pending attribution; helpers catch failures and never block navigation/forms.

The funnel uses stage event ratios, not identity-joined sessions. Multiple selections, repeat outbound clicks, consent loss, storage restrictions and dates crossing midnight can produce rates above 100 percent or missing later stages. Label these as event ratios, never exact visitor conversion. COUNT(DISTINCT user_pseudo_id) is permitted only inside aggregate counts and describes approximate devices, not people. Do not sum daily distinct devices across dates.

## Release boundaries

No live GA settings, views, dashboards, exports, IAM or billing changes are included. Enhanced Measurement site search, outbound click, form interactions, query-string page locations and history-pageview behavior need an owner-reviewed check. Automatic form_submit is never a successful inquiry. See [the dated audit](archive/ANALYTICS_AUDIT_2026-11-05.md), [reporting runbook](../reporting/README.md) and [deployment guide](DEPLOYMENT.md) for evidence, SQL setup, dashboard instructions and release checks.


## Developer funnel extension: developer-1 (November 13, 2026)

This owner-approved extension permits ONE new opaque reference: `submission_id`, the random 20-character Firestore submission document ID. It identifies a request, not a person or GA user. It is explicitly exempt from the earlier blanket prohibition on submission IDs for these six new events only. Never send the capability cookie, its secret/hash, Stripe client secrets, names, emails, answers, URLs from form fields, invoice IDs or signed-scope references. Do not register this high-cardinality value as a GA reporting dimension; use the exported parameter only for bounded aggregate cohorts. Consent and private-route exclusions remain in force. No individual-request or visitor drilldown is a public data product.

| Event | Confirmed trigger | Parameters beyond existing facts-1 context |
| --- | --- | --- |
| submission_started | Existing first nonempty input; unchanged | none |
| submission_completed | Existing HTTP 201 plus ok=true save contract, now when Next saves app details; once per request/tab | none; this does not mean payment or completed listing |
| submission_page_one_completed | App details saved successfully | submission_id, funnel_version=developer-1 |
| submission_offer_viewed | Saved request's offers actually displayed | submission_id, funnel_version |
| submission_service_selected | User selects a service, or selects Continue to payment | submission_id, funnel_version, service allowlisted to listing/focused_test/launch_review/competitive_audit |
| service_inquiry_saved | HTTP 201 and ok=true after chosen services are saved | submission_id, funnel_version |
| listing_checkout_started | Server creates/resumes Checkout and embedded checkout mounts | submission_id, funnel_version |
| listing_purchase_confirmed | Authenticated server reconciliation confirms paid; URL alone never qualifies | submission_id, funnel_version |
| partnership_inquiry_started | First nonempty partnership field, excluding honeypot | existing fixed partnership context |
| partnership_inquiry_submitted | Existing HTTP 201 and ok=true inquiry save; delivery success irrelevant | existing fixed partnership context |

Confirmed new steps can wait for tag readiness only if consent already exists. No replay of pre-consent actions. Per-request/tab ledgers reduce repeats, but blocked storage, cross-tab activity, consent changes and blockers mean browser events are never accounting totals. Selection events may repeat intentionally. Existing services_page_viewed stays on the Services page after removing its form. The previous standalone scope_request_started/submitted events retain their historical meaning; the unified developer funnel uses service_inquiry_saved rather than silently renaming historical rows. No change to historical GA rows or the existing catalog/search measurement version.

Operational report: authenticated `/api/admin/developer-report?start=YYYY-MM-DD&end=YYYY-MM-DD`, maximum 90 inclusive UTC cohort days. Each cohort starts at the saved pageOneCompletedAt. Seven calendar days is the defined analysis window (not the five-business-day delivery promise). Mutually exclusive outcomes: purchase only, inquiry only, both, neither still pending, neither after window. CheckoutUnconverted is separate and may overlap an inquiry; it means checkout started but no purchase within seven days, counted only after maturity. It does not prove intent to abandon. Late conversions do not rewrite the seven-day outcome. Subsequent inquiry-to-service-sale is counted independently through reconciled invoice references; it can occur after the seven-day window. Amounts are current reconciled gross/refund/net values for the selected cohorts, not cashflow by transaction date. A refunded purchase remains a historical conversion. Test requests and test-mode money are excluded by default; includeTest=true is private owner testing only.

The operational endpoint reads saved editorialRequests/listingOrders, including nonconsenting developers. It emits aggregate dates/counts/amounts only. It does not export individual rows or contact data. Refresh linked invoices/orders in admin after provider outages; report asOf describes query time, not a promise every Stripe record was freshly polled. BigQuery remains consented browser analysis. No Firestore-to-BigQuery export is installed or assumed. Use reporting/ga4_developer_cohorts.sql for browser cohorts; exact service sales remain operational, not inferred from an inquiry event. Production arrival and rollout date are unverified.
