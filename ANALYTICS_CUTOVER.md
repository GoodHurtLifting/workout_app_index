# Analytics cutover

Production rollout `rollout-2026-10-15-001` succeeded at **2026-10-15 00:50:08 UTC** (2026-10-14 20:50:08 EDT) from commit `14a2321199eb6bd1bd52610707521977875102a2`. Before this cutover, `view_app_profile` meant a profile link was selected, not that a profile page rendered. Do not rename or rewrite its historical rows. After the rollout, `app_profile_viewed` means a public `/apps/[id]` page rendered in a consented browser; its sole custom parameter is the public `app_slug`.

## Public-performance reporting

Exclude `/admin` and every path beginning `/admin/` from all public-performance metrics, including historical periods. This reporting filter does not delete or change BigQuery rows. In Looker Studio, apply an exclude filter to the page-path dimension using `^/admin(?:/|$)` to every public-performance chart and scorecard. Check that the same filter is present on any newly copied chart.

For bounded, public-only aggregate queries use reporting/ga4_executive.sql and reporting/ga4_inventory.sql. They require explicit dates and the verified WAI web stream, exclude private paths, and never select individual identifiers. The former unbounded SELECT * example has been retired. Do not create or replace a production view without reviewing SQL, scan scope and destination and obtaining approval.

The facts-1 additive event schema and new catalog search contract are in MEASUREMENT_SPEC.md. Its release timestamp remains pending. Historical app_profile_viewed rows retain their original meaning; the statement above about its sole custom parameter describes the 2026-10-15 implementation, before facts-1.

## Production checklist requiring owner approval

1. Verify the new `app_profile_viewed` event only on a successfully rendered public profile, and verify no `view_app_profile` events are emitted by link selection after cutover.
2. Confirm `/admin` and nested routes do not request the Google tag on direct load. Also test public-to-admin client navigation and browser Back: the `ga-disable-<measurement ID>` route gate must prevent collection on admin paths. Confirm sign-in, inbox pagination, record save, and preview still work.
3. Review GA4 Data stream > Enhanced Measurement > Form interactions. The automatic `form_start`/`form_submit` events do not represent confirmed saves and can include `form_destination`. If approved, turn off Form interactions for the data-flowing stream. Keep page views on for public reporting.
4. Inspect a small sample of exported `page_location` and `form_destination` parameters for query strings or identifiers before broad reporting use. Do not place contact information or submission IDs in analytics events.

## Commercial foundation — pending manual validation, November 4, 2026

Historical preparation note, not a verified current production status. The November 5 audit did not establish the commercial release timestamp. New coarse funnel events are documented in FACTS_FIRST_IMPLEMENTATION.md. Completion requires HTTP 201 with ok true; email selections are separate from saved inquiries. All custom event parameters use fixed relative page paths and contain no contact data or full URLs. Consent, admin exclusion, and nonblocking behavior use existing helpers. Verify Enhanced Measurement Form interactions and Outbound clicks are disabled before release as already required by CATALOG_REVIEW.md; current console settings were not checked or changed. Automatic pageviews are separate from the new fixed-parameter custom events.
