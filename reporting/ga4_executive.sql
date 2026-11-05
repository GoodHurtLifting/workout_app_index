-- Read-only proposal, not executed or deployed. Standard SQL.
-- Required STRING parameters: DS_START_DATE, DS_END_DATE (YYYYMMDD), wai_stream_id.
-- Dataset is verified in the existing Looker connection, not independently inventoried.
-- Choose <=31 days for first validation; dry-run + maximum bytes billed before execution.
-- Daily GA tables only; no intraday UNION (avoids double counting).

SELECT PARSE_DATE('%Y%m%d',event_date) AS event_date,
  COALESCE((SELECT value.string_value FROM UNNEST(event_params) WHERE key='measurement_version'),'legacy_unversioned') AS measurement_version,
  event_name,
  CASE event_name
    WHEN 'view_app_profile' THEN 'Legacy link selection'
    WHEN 'app_profile_viewed' THEN 'Profile view'
    WHEN 'catalog_search_completed' THEN 'Catalog search'
    WHEN 'catalog_result_selected' THEN 'Result selection'
    WHEN 'outbound_app_click' THEN 'Product outbound'
    WHEN 'add_to_comparison' THEN 'Comparison addition'
    WHEN 'complete_app_finder' THEN 'Finder completion'
    WHEN 'submission_completed' THEN 'Confirmed app submission'
    WHEN 'scope_request_submitted' THEN 'Confirmed scope request'
    WHEN 'partnership_inquiry_submitted' THEN 'Confirmed partnership inquiry'
    ELSE 'Other commercial or submission action' END AS action,
  COUNT(*) AS event_count,
  COUNT(DISTINCT user_pseudo_id) AS daily_approximate_devices
FROM `workout-app-index-prod.analytics_555126329.events_*`
WHERE _TABLE_SUFFIX BETWEEN @DS_START_DATE AND @DS_END_DATE
  AND REGEXP_CONTAINS(_TABLE_SUFFIX,r'^\d{8}$')
  AND platform='WEB' AND stream_id=@wai_stream_id
  AND COALESCE(
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_path'),
    REGEXP_EXTRACT((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location'),r'^https?://[^/]+(/[^?#]*)'),
    IF(STARTS_WITH((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location'),'/'),
      REGEXP_EXTRACT((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location'),r'^([^?#]+)'),NULL)) IS NOT NULL
  AND NOT REGEXP_CONTAINS(COALESCE(
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_path'),
    REGEXP_EXTRACT((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location'),r'^https?://[^/]+(/[^?#]*)'),
    IF(STARTS_WITH((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location'),'/'),
      REGEXP_EXTRACT((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location'),r'^([^?#]+)'),NULL)),r'^/(admin|api|preview)(/|$)')
  AND COALESCE(NET.HOST((SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location')),'workoutappindex.com')='workoutappindex.com'
  AND event_name IN ('view_app_profile','app_profile_viewed','add_to_comparison','complete_app_finder',
    'outbound_app_click','submission_started','submission_completed','catalog_search_completed',
    'catalog_result_selected','services_page_viewed','scope_request_started','scope_request_submitted',
    'partnerships_page_viewed','partnership_inquiry_submitted','commercial_outbound_selected')
GROUP BY event_date,measurement_version,event_name,action
ORDER BY event_date,event_name;
-- Retain legacy view_app_profile as selection; never merge with rendered views.
-- Commercial selections are intent, not revenue. No revenue source is verified.
-- For period-wide distinct devices, remove event_date from SELECT/GROUP BY and rerun
-- the same bounded aggregate. Do not sum daily or event-name distinct device counts.
