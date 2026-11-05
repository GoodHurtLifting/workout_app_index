# WAI reporting setup — prepared, not executed

Audit date: 2026-11-05. See ../MEASUREMENT_SPEC.md for event/parameter/privacy definitions and ../ANALYTICS_SEO_AUDIT.md for verified console findings. These files contain SELECT queries only. No BigQuery objects, settings, dashboard sources or report pages were changed.

## Sources and validation boundary

The existing WAI Looker connection references workout-app-index-prod.analytics_555126329.events_*; that confirms the configured source, not present table availability. Search Console settings show active export to workout-app-index-prod.searchconsole in US. CLI credentials are expired and Cloud Console requires reauthentication, so actual tables, latest export dates, schema and expiration remain unverified. Never substitute the gcloud default project (the-lift-league-dev). Use explicit project selection.

After authentication, inspect both dataset Details pages, table schemas and expiration, then run export_metadata.sql read-only. Verify searchdata_site_impression, searchdata_url_impression and ExportLog. ExportLog records successes only. Missing success rows need investigation, not an invented error diagnosis. Check latest date for each table separately. Absence of table expiration does not prove absence of dataset default or partition expiration. Query metadata in the actual dataset region; US is confirmed only for the Search Console export configuration.

No production view creation is approved. Proposed logical destinations, subject to owner choice, are wai_executive_daily, wai_search_daily, wai_organic_daily and wai_organic_pages in an owner-approved reporting dataset in the source region. No dataset creation is proposed as an automatic action. Before any CREATE VIEW, provide its exact SQL, project.dataset.view, replacement impact, region, date bounds and dry-run bytes for approval.

## SQL files and parameters

| File | Output / bounded scan |
| --- | --- |
| export_metadata.sql | Dataset/table options, current GA table names, Search Console schema, success dates within requested window; no event identifiers |
| ga4_inventory.sql | Event counts, aggregate distinct devices and parameter names; required dates, web platform, exact stream, public paths |
| ga4_executive.sql | Daily event totals and legacy/version separation, including confirmed commercial actions; same bounded source |
| ga4_catalog_funnel.sql | Daily searches, daily searching devices, zero/results/profile/outbound stages and event ratios by mode and filter combination; facts-1 only |
| ga4_filter_usage.sql | Fixed allowlisted category usage and daily stage metrics; overlapping categories must not be summed as totals |
| gsc_organic.sql | Property trends, queries, pages and query/page reports; DATE bounds and exact domain property |
| gsc_page_changes.sql | Equal-length current/prior page changes, at most 62 days when current period is at most 31 days |

GA parameters: DS_START_DATE and DS_END_DATE are inclusive YYYYMMDD strings; wai_stream_id is the actual WAI web numeric stream ID as a STRING. Do not use the G- measurement ID as stream_id. Verify it in GA Admin > Data streams and exported aggregate stream counts. This value is intentionally not guessed. Enable Looker date-range parameters. Add a fixed, owner-controlled wai_stream_id parameter, not a viewer-editable control. GSC parameters start_date/end_date are DATE; for Looker replace them with PARSE_DATE('%Y%m%d',@DS_START_DATE/DS_END_DATE) or use correctly typed date parameters. Split multi-statement files into individual read-only data sources. Validate one to seven days first, inspect dry-run bytes and impose a maximum bytes billed limit. No SQL in this task has been executed or validated against live data.

All GA scans exclude intraday tables and private routes, require WEB and the verified WAI stream, and reject foreign hosts when page_location contains one. Events missing a usable path are excluded (monitor that data loss separately). Legacy fixed relative commercial locations are supported. No raw pseudo/session/screen IDs are selected: distinct-device aggregates use user_pseudo_id only inside COUNT(DISTINCT...). Host/path filters are reporting protections, not a repair of past collection. Export dates and GA property timezone are not currently verified. Search Console uses Pacific dates; align and label windows before comparing with GA.

## Existing Portfolio Performance Dashboard

Report: https://datastudio.google.com/reporting/83bfd659-cdf5-48b8-bfcc-6e6c8004d605

Viewed existing Mobile Apps and Workout App Index pages. Sources are two embedded BigQuery Custom SQL connections: alias ds8 working, four charts; ds0 working, six charts. Inspected ds8, which references the WAI GA dataset above. Fields: event_date (Date), app, event_name, funnel_stage, funnel_order, event_count and approximate_devices. Data freshness 12 hours, owner credentials. Existing SQL is date-bounded and WEB-only, but has no admin, hostname or stream filter. Daily approximate_devices defaults to Sum; sums across dates/events are not unique devices. Existing SQL's raw-identifier intermediate projection was observed but not copied into these proposals.

Visible WAI page window 8 Aug–5 Nov 2026: 27 tracked actions, 13 profile views / 6 devices, 4 outbound clicks / 2 devices, 3 submission starts / 3 devices, 3 finder completions / 3 devices, 2 submission completions / 2 devices. These are dashboard observations, not independently reconciled BigQuery totals. No comparison row appeared. No search, organic or commercial sections were present. Mobile Apps reporting remains useful and untouched. No charts, sources, credentials or connections were saved/changed; returned to view mode after read-only inspection.

## Exact dashboard preparation instructions

Before editing live charts: report More actions > Make a copy, name it Portfolio Performance Dashboard - before WAI facts-1 - YYYY-MM-DD; preserve the original share settings and confirm copy/data source behavior. A copy of the report does not necessarily duplicate reusable sources. Both observed sources are embedded; still verify the copy before editing. Keep Mobile Apps and its source unchanged. Make WAI changes in the copy, validate, then obtain approval before replacing live reporting.

Add new BigQuery Custom Query sources from the SELECT files; do not replace ds0 or silently replace ds8. Enable date range parameters, set event_date/data_date as date dimensions. Each source must retain explicit public-path/WEB/stream/host filters from SQL. Do not use editable filter controls as a substitute for those restrictions. No user/email/session/device-ID dimensions. Do not blend GA and GSC row-level data: at most use a daily date-based aggregate blend, with separate metric units and timezone labels.

| Page | Charts, dimensions and metrics |
| --- | --- |
| WAI Executive Overview | Date control + previous equal period; GSC property clicks/impressions; SUM(event_count) filtered separately to catalog_search_completed, app_profile_viewed, complete_app_finder, add_to_comparison, outbound_app_click, submission_completed; commercial inquiries are scope_request_submitted plus partnership_inquiry_submitted. Keep starts separate. Bar chart event_name by event_count; daily trends event_date. Label comparison additions rather than completed comparisons. |
| Facts Search Funnel | Scorecards SUM(searches), SUM(result_selections), SUM(profiles_from_search), SUM(outbound_from_search). Ratios recomputed as SUM(numerator)/SUM(denominator), with null for zero denominators. Zero rate SUM(zero_results)/SUM(searches); selection/search, profile/search, profile/selection, outbound/profile, outbound/search. Daily trend event_date; mode bar search_mode; filter usage fixed_filter_group from ga4_filter_usage.sql. Multigroup rows overlap and cannot be summed as a total. |
| Organic Discovery | Property clicks/impressions/CTR/weighted position; query table query + clicks, impressions, CTR, position, brand_class; page table url/content_type + metrics; opportunity table impressions>=25 AND CTR<2%, position filter 8–30; gains/losses sort impression_change both directions. Query/page table query,url. Profiles versus other pages supported now; Article classification remains unavailable until genuine published articles exist. |
| Commercial Performance | services_page_viewed and partnerships_page_viewed are consented page renders, not evidence of engaged sessions. scope_request_started, confirmed scope_request_submitted, confirmed partnership_inquiry_submitted, commercial_outbound_selected as separate metrics; daily events trend. Email selection is not a saved inquiry. External attributable revenue is unavailable: show unavailable, not zero. Add only an owner-approved aggregate revenue source with currency/date/referral definitions and no visitor identifiers. |

Do not sum daily_approximate_devices or daily_searching_devices over periods or funnel stages. For period-wide devices, rerun a bounded aggregate without the daily dimension; keep mode/group overlap explicit. Until then show a daily devices trend only. Event ratios can exceed 100% and are not identity-matched visitor conversion; title charts accordingly. Preserve legacy_unversioned and facts-1 as separate report filters. Do not backfill or rename historical events. A release date is pending and must be recorded before post-pivot comparisons.

Branded rule: case-insensitive workout + optional space/dot/hyphen + app + optional space/dot/hyphen + index. Excludes ambiguous acronym WAI and product brands. Anonymous query impressions stay in property/page totals, not branded/query tables; label visible-query coverage. Average position is SUM(position numerator)/SUM(impressions)+1, never mean of averages. Property totals and URL totals can differ by aggregation; do not silently reconcile them by summing pages.

Official references: [Search Console export schema](https://support.google.com/webmasters/answer/12917991?hl=en), [query guidelines](https://support.google.com/webmasters/answer/12917174?hl=en). These document schema expectations, not proof of the live tables.
