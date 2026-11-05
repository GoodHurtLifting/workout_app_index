-- Read-only proposal, not executed or deployed. Standard SQL.
-- Required STRING parameters: DS_START_DATE, DS_END_DATE (YYYYMMDD), wai_stream_id.
-- Dataset is verified in the existing Looker connection, not independently inventoried.
-- Choose <=31 days for first validation; dry-run + maximum bytes billed before execution.
-- Daily GA tables only; no intraday UNION (avoids double counting).

-- Aggregate event/stream inventory, still public-only. New facts-1 names may be absent before release.
SELECT event_name,platform,stream_id,MAX(event_date) AS latest_exported_event_date,
 COUNT(*) AS event_count,COUNT(DISTINCT user_pseudo_id) AS approximate_devices
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
GROUP BY event_name,platform,stream_id ORDER BY event_count DESC;

-- Parameter NAMES only; no values/identifiers. Occurrences are not distinct event counts.
SELECT event_name,ep.key AS parameter_name,COUNT(*) AS parameter_occurrences
FROM `workout-app-index-prod.analytics_555126329.events_*`,UNNEST(event_params) ep
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
GROUP BY event_name,parameter_name ORDER BY event_name,parameter_name;
