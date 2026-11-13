-- READ ONLY, prepared and not executed. Standard SQL. No individual rows returned.
-- STRING parameters DS_START_DATE/DS_END_DATE: inclusive UTC cohort dates YYYYMMDD.
-- STRING wai_stream_id: owner-verified numeric WAI WEB stream ID.
-- Cohort width <=31 days; reads through eight days after its end (timezone padding), daily tables only.
-- Dry-run and set maximum bytes billed first. GA is consent-limited, NOT accounting.
WITH events AS (
 SELECT event_name, TIMESTAMP_MICROS(event_timestamp) AS at,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key='submission_id') AS request_id
 FROM `workout-app-index-prod.analytics_555126329.events_*`
 WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d',DATE_SUB(PARSE_DATE('%Y%m%d',@DS_START_DATE),INTERVAL 1 DAY)) AND FORMAT_DATE('%Y%m%d',DATE_ADD(PARSE_DATE('%Y%m%d',@DS_END_DATE),INTERVAL 8 DAY))
  AND DATE_DIFF(PARSE_DATE('%Y%m%d',@DS_END_DATE),PARSE_DATE('%Y%m%d',@DS_START_DATE),DAY) BETWEEN 0 AND 30
  AND REGEXP_CONTAINS(_TABLE_SUFFIX,r'^\d{8}$')
  AND platform='WEB' AND stream_id=@wai_stream_id
  AND event_timestamp <= UNIX_MICROS(CURRENT_TIMESTAMP())
  AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='funnel_version')='developer-1'
  AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_path')='/submit-app'
  AND (SELECT value.string_value FROM UNNEST(event_params) WHERE key='page_location')='/submit-app'
  AND event_name IN ('submission_page_one_completed','service_inquiry_saved','listing_checkout_started','listing_purchase_confirmed')
), starts AS (
 SELECT request_id,MIN(at) AS started
 FROM events WHERE event_name='submission_page_one_completed' AND REGEXP_CONTAINS(request_id,r'^[A-Za-z0-9]{20}$')
 GROUP BY request_id
), cohorts AS (
 SELECT starts.request_id,started,
  COUNTIF(event_name='service_inquiry_saved' AND at BETWEEN started AND TIMESTAMP_ADD(started,INTERVAL 7 DAY))>0 AS inquiry,
  COUNTIF(event_name='listing_purchase_confirmed' AND at BETWEEN started AND TIMESTAMP_ADD(started,INTERVAL 7 DAY))>0 AS purchase,
  COUNTIF(event_name='listing_checkout_started' AND at>=started)>0 AS checkout
 FROM starts LEFT JOIN events USING(request_id)
 WHERE DATE(started) BETWEEN PARSE_DATE('%Y%m%d',@DS_START_DATE) AND PARSE_DATE('%Y%m%d',@DS_END_DATE)
 GROUP BY starts.request_id,started
)
SELECT DATE(started) AS cohort_date,COUNT(*) AS consented_page_one_requests,
 COUNTIF(purchase AND NOT inquiry) AS purchase_only,
 COUNTIF(inquiry AND NOT purchase) AS inquiry_only,
 COUNTIF(inquiry AND purchase) AS both,
 COUNTIF(NOT inquiry AND NOT purchase AND CURRENT_TIMESTAMP()<TIMESTAMP_ADD(started,INTERVAL 7 DAY)) AS neither_pending,
 COUNTIF(NOT inquiry AND NOT purchase AND CURRENT_TIMESTAMP()>=TIMESTAMP_ADD(started,INTERVAL 7 DAY)) AS neither_after_window,
 COUNTIF(checkout AND NOT purchase AND CURRENT_TIMESTAMP()>=TIMESTAMP_ADD(started,INTERVAL 7 DAY)) AS checkout_unconverted
FROM cohorts GROUP BY cohort_date ORDER BY cohort_date;
-- The opaque request reference is used only inside bounded aggregation.
-- Subsequent invoice-to-sale and refund revenue are available in the private operational report.
