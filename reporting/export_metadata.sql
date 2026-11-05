-- Read-only metadata audit. Not executed; authenticate and verify regions first.
-- These dataset names are configured in Looker / Search Console, not table existence proof.
-- No identifiers, event rows, DDL or settings changes.
SELECT schema_name,option_name,option_value
FROM `workout-app-index-prod.region-us.INFORMATION_SCHEMA.SCHEMATA_OPTIONS`
WHERE schema_name IN ('analytics_555126329','searchconsole')
  AND option_name IN ('default_table_expiration_days','default_partition_expiration_days');
-- If GA dataset is in a different location, run its metadata query in that verified region.
SELECT table_name,table_type,creation_time
FROM `workout-app-index-prod.analytics_555126329.INFORMATION_SCHEMA.TABLES`
WHERE REGEXP_CONTAINS(table_name,r'^events_(intraday_)?[0-9]{8}$')
ORDER BY table_name DESC LIMIT 35;
SELECT table_name,option_name,option_value
FROM `workout-app-index-prod.analytics_555126329.INFORMATION_SCHEMA.TABLE_OPTIONS`
WHERE REGEXP_CONTAINS(table_name,r'^events_(intraday_)?[0-9]{8}$')
 AND option_name IN ('expiration_timestamp','partition_expiration_days')
ORDER BY table_name DESC LIMIT 70;
SELECT table_name,column_name,data_type
FROM `workout-app-index-prod.searchconsole.INFORMATION_SCHEMA.COLUMNS`
WHERE table_name IN ('searchdata_site_impression','searchdata_url_impression','ExportLog')
ORDER BY table_name,ordinal_position;
SELECT table_name,option_name,option_value
FROM `workout-app-index-prod.searchconsole.INFORMATION_SCHEMA.TABLE_OPTIONS`
WHERE table_name IN ('searchdata_site_impression','searchdata_url_impression','ExportLog')
 AND option_name IN ('expiration_timestamp','partition_expiration_days');
-- Run only after confirming ExportLog schema. data_date parameters are DATE, <=31 days.
-- ExportLog records successes only: gaps are not proof of a specific error.
SELECT namespace,MAX(data_date) AS latest_successful_data_date,MAX(publish_time) AS latest_successful_publish_time
FROM `workout-app-index-prod.searchconsole.ExportLog`
WHERE data_date BETWEEN @start_date AND @end_date GROUP BY namespace;
