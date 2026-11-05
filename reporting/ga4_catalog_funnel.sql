-- Read-only proposal, not executed or deployed. Standard SQL.
-- Required STRING parameters: DS_START_DATE, DS_END_DATE (YYYYMMDD), wai_stream_id.
-- Dataset is verified in the existing Looker connection, not independently inventoried.
-- Choose <=31 days for first validation; dry-run + maximum bytes billed before execution.
-- Daily GA tables only; no intraday UNION (avoids double counting).

WITH daily AS (
SELECT PARSE_DATE('%Y%m%d',event_date) AS event_date,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key='search_mode') AS search_mode,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key='filter_groups') AS filter_groups,
  COUNTIF(event_name='catalog_search_completed') AS searches,
  COUNT(DISTINCT IF(event_name='catalog_search_completed',user_pseudo_id,NULL)) AS daily_searching_devices,
  COUNTIF(event_name='catalog_search_completed' AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='result_count_bucket')='0') AS zero_results,
  COUNTIF(event_name='catalog_result_selected') AS result_selections,
  COUNTIF(event_name='app_profile_viewed' AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='discovery_source')='catalog_search') AS profiles_from_search,
  COUNTIF(event_name='outbound_app_click' AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='discovery_source')='catalog_search') AS outbound_from_search
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
  AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='measurement_version')='facts-1'
  AND (event_name IN ('catalog_search_completed','catalog_result_selected')
    OR (event_name IN ('app_profile_viewed','outbound_app_click') AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='discovery_source')='catalog_search'))
GROUP BY event_date,search_mode,filter_groups
)
SELECT *, SAFE_DIVIDE(zero_results,searches) AS zero_result_rate,
  SAFE_DIVIDE(result_selections,searches) AS result_selection_event_ratio,
  SAFE_DIVIDE(profiles_from_search,searches) AS search_to_profile_event_ratio,
  SAFE_DIVIDE(profiles_from_search,result_selections) AS selection_to_profile_event_ratio,
  SAFE_DIVIDE(outbound_from_search,profiles_from_search) AS profile_to_outbound_event_ratio,
  SAFE_DIVIDE(outbound_from_search,searches) AS search_to_outbound_event_ratio
FROM daily ORDER BY event_date,search_mode,filter_groups;
-- Rates describe events, not identity-matched visitors. Never sum daily distinct devices.
-- Filter charts: split filter_groups using SPLIT(filter_groups,','); omit empty groups.
-- Multi-filter events appear in multiple group rows: never sum these back into totals.
