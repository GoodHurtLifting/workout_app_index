-- Read-only proposal. Not executed; verify actual schema using export_metadata.sql.
-- DATE parameters start_date/end_date, maximum 31 days initially.
-- Include anonymized queries in site/page totals, exclude them from query tables.
-- Schema/formulas: https://support.google.com/webmasters/answer/12917991?hl=en
-- Repeated source keys require SUM. Site-position uses sum_top_position; URL uses sum_position.

-- Executive daily property totals. Do not sum URL impressions to replace property totals.
SELECT data_date,SUM(clicks) AS clicks,SUM(impressions) AS impressions,
 SAFE_DIVIDE(SUM(clicks),SUM(impressions)) AS ctr,
 SAFE_DIVIDE(SUM(sum_top_position),SUM(impressions))+1 AS average_position
FROM `workout-app-index-prod.searchconsole.searchdata_site_impression`
WHERE data_date BETWEEN @start_date AND @end_date
 AND site_url='sc-domain:workoutappindex.com' AND LOWER(search_type)='web'
GROUP BY data_date ORDER BY data_date;

-- Top queries + branded/nonbranded, including weighted position and opportunity flags.
WITH queries AS (
 SELECT query,SUM(clicks) AS clicks,SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks),SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(sum_top_position),SUM(impressions))+1 AS average_position
 FROM `workout-app-index-prod.searchconsole.searchdata_site_impression`
 WHERE data_date BETWEEN @start_date AND @end_date
  AND site_url='sc-domain:workoutappindex.com' AND LOWER(search_type)='web'
  AND NOT is_anonymized_query AND COALESCE(query,'')!=''
 GROUP BY query
)
SELECT *, IF(REGEXP_CONTAINS(LOWER(query),r'workout[\s.-]*app[\s.-]*index'),'branded','nonbranded') AS brand_class,
 average_position BETWEEN 8 AND 30 AS position_8_to_30,
 impressions>=25 AND ctr<0.02 AS high_impression_low_ctr
FROM queries ORDER BY impressions DESC LIMIT 500;
-- Brand rule includes spaced/concatenated domain/name, excludes ambiguous WAI acronym
-- and product brands like Hevy / The Lift League. Review regex before treating it as policy.
-- 25 impressions and 2% CTR are initial diagnostic thresholds, not quality benchmarks.

-- Top landing pages, with opportunities. No invented Article classification.
SELECT url,CASE WHEN REGEXP_CONTAINS(url,r'^https://workoutappindex\.com/apps/[^/?#]+$') THEN 'profile'
 WHEN url IN ('https://workoutappindex.com/services','https://workoutappindex.com/partnerships') THEN 'commercial'
 ELSE 'other_public' END AS content_type,
 SUM(clicks) AS clicks,SUM(impressions) AS impressions,
 SAFE_DIVIDE(SUM(clicks),SUM(impressions)) AS ctr,
 SAFE_DIVIDE(SUM(sum_position),SUM(impressions))+1 AS average_position,
 SUM(impressions)>=25 AND SAFE_DIVIDE(SUM(clicks),SUM(impressions))<0.02 AS high_impression_low_ctr
FROM `workout-app-index-prod.searchconsole.searchdata_url_impression`
WHERE data_date BETWEEN @start_date AND @end_date
 AND site_url='sc-domain:workoutappindex.com' AND LOWER(search_type)='web'
 AND STARTS_WITH(url,'https://workoutappindex.com/')
 AND NOT REGEXP_CONTAINS(url,r'^https://workoutappindex\.com/(admin|api|preview)(/|$|[?#])')
 AND NOT REGEXP_CONTAINS(url,r'[?#]')
GROUP BY url,content_type ORDER BY impressions DESC LIMIT 500;

-- Query/page combinations. These intentionally cannot reconcile to anonymized totals.
SELECT query,url,SUM(clicks) AS clicks,SUM(impressions) AS impressions,
 SAFE_DIVIDE(SUM(clicks),SUM(impressions)) AS ctr,
 SAFE_DIVIDE(SUM(sum_position),SUM(impressions))+1 AS average_position
FROM `workout-app-index-prod.searchconsole.searchdata_url_impression`
WHERE data_date BETWEEN @start_date AND @end_date
 AND site_url='sc-domain:workoutappindex.com' AND LOWER(search_type)='web'
 AND NOT is_anonymized_query AND COALESCE(query,'')!=''
 AND STARTS_WITH(url,'https://workoutappindex.com/') AND NOT REGEXP_CONTAINS(url,r'[?#]')
 AND NOT REGEXP_CONTAINS(url,r'^https://workoutappindex\.com/(admin|api|preview)(/|$)')
GROUP BY query,url ORDER BY impressions DESC LIMIT 500;
