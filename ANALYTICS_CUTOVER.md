# Analytics cutover

Production rollout `rollout-2026-10-15-001` succeeded at **2026-10-15 00:50:08 UTC** (2026-10-14 20:50:08 EDT) from commit `14a2321199eb6bd1bd52610707521977875102a2`. Before this cutover, `view_app_profile` meant a profile link was selected, not that a profile page rendered. Do not rename or rewrite its historical rows. After the rollout, `app_profile_viewed` means a public `/apps/[id]` page rendered in a consented browser; its sole custom parameter is the public `app_slug`.

## Public-performance reporting

Exclude `/admin` and every path beginning `/admin/` from all public-performance metrics, including historical periods. This reporting filter does not delete or change BigQuery rows. In Looker Studio, apply an exclude filter to the page-path dimension using `^/admin(?:/|$)` to every public-performance chart and scorecard. Check that the same filter is present on any newly copied chart.

For BigQuery, derive `page_path` from the GA4 `page_location` event parameter, then use the following predicate in the public-performance view. The `IS NOT NULL` condition conservatively excludes events that cannot be assigned to a public path.

```sql
WITH classified AS (
  SELECT
    event_date,
    event_name,
    event_params,
    REGEXP_EXTRACT(
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location'),
      r'^https?://[^/]+([^?#]*)'
    ) AS page_path
  FROM `PROJECT.DATASET.events_*`
)
SELECT *
FROM classified
WHERE page_path IS NOT NULL
  AND NOT REGEXP_CONTAINS(page_path, r'^/admin(?:/|$)');
```

Replace `PROJECT.DATASET` with the actual GA4 export dataset; do not run this as a table rewrite. Review whether all desired custom events carry `page_location` before making this the authoritative reporting view.

## Production checklist requiring owner approval

1. Verify the new `app_profile_viewed` event only on a successfully rendered public profile, and verify no `view_app_profile` events are emitted by link selection after cutover.
2. Confirm `/admin` and nested routes do not request the Google tag on direct load. Also test public-to-admin client navigation and browser Back: the `ga-disable-<measurement ID>` route gate must prevent collection on admin paths. Confirm sign-in, inbox pagination, record save, and preview still work.
3. Review GA4 Data stream > Enhanced Measurement > Form interactions. The automatic `form_start`/`form_submit` events do not represent confirmed saves and can include `form_destination`. If approved, turn off Form interactions for the data-flowing stream. Keep page views on for public reporting.
4. Inspect a small sample of exported `page_location` and `form_destination` parameters for query strings or identifiers before broad reporting use. Do not place contact information or submission IDs in analytics events.
