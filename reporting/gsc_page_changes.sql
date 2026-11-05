-- Read-only. Equal-length current and immediately preceding periods, bounded to <=62 total days.
-- DATE parameters start_date/end_date (inclusive). Owner must choose <=31-day current window.
WITH pages AS (
 SELECT url,
 SUM(IF(data_date BETWEEN @start_date AND @end_date,impressions,0)) AS current_impressions,
 SUM(IF(data_date < @start_date,impressions,0)) AS previous_impressions,
 SUM(IF(data_date BETWEEN @start_date AND @end_date,clicks,0)) AS current_clicks,
 SUM(IF(data_date < @start_date,clicks,0)) AS previous_clicks
 FROM `workout-app-index-prod.searchconsole.searchdata_url_impression`
 WHERE data_date BETWEEN DATE_SUB(@start_date, INTERVAL (DATE_DIFF(@end_date,@start_date,DAY)+1) DAY) AND @end_date
  AND site_url='sc-domain:workoutappindex.com' AND LOWER(search_type)='web'
  AND STARTS_WITH(url,'https://workoutappindex.com/') AND NOT REGEXP_CONTAINS(url,r'[?#]')
  AND NOT REGEXP_CONTAINS(url,r'^https://workoutappindex\.com/(admin|api|preview)(/|$)')
 GROUP BY url
)
SELECT *,current_impressions-previous_impressions AS impression_change,
 current_clicks-previous_clicks AS click_change,
 SAFE_DIVIDE(current_impressions-previous_impressions,previous_impressions) AS impression_change_rate
FROM pages ORDER BY impression_change DESC;
-- Reverse sort for losers; null percentage means no prior impressions, not infinity.
