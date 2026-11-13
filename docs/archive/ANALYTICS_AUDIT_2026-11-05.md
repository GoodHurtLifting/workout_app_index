# Analytics and indexing audit records — November 5, 2026

Historical console observations and cutover preparation only. They do not establish current deployment, export arrival or credential status. See [current measurement contract](../MEASUREMENT_SPEC.md), [reporting runbook](../../reporting/README.md) and [deployment guide](../DEPLOYMENT.md). Original audit detail is preserved below; superseded file lists and instructions describe that earlier task, not authorization for new console changes.


---

## Original document: ANALYTICS_SEO_AUDIT.md

# WAI analytics, reporting and indexing audit

Audit date: November 5, 2026. Implementation prepared in C:\dev\projects\workout_app_index. No commit, push, deployment, production view creation or console-setting change. No lint, tests or production build executed, as requested. Source review and public HTTP inspection are not runtime validation of the new code.

## 1. Checkpoint and scope

Current implementation branch: main; starting HEAD b436f2e (conversion to fact-based admin and features). Remote annotated tag wai-pre-facts-first-pivot-2026-11-04 exists; tag object 1f0f9e3f7b33bcccdb99101b003e557f7b464d21 resolves to commit 25faf4dad7911977f63abf0f030fe3314ecae2a9. Not recreated, moved or overwritten. Existing unrelated .idea/ remains untouched. New files are registered with Git intent-to-add so the complete diff is visible; file contents are not staged. Stage all intended changes together before an owner-approved commit. No Firebase, Cloud or Android project was created. The gcloud default is the-lift-league-dev; it was not changed.

Read current analytics helper/consent and custom event callers/tests, catalog UI and publication/withdrawal gates, sitemap/helper/tests, metadata/structured data/robots/routes, ANALYTICS_CUTOVER.md, facts-first plan, implementation notes and current review protocols. The retired scoring protocol is historical context, not a source of new public ratings. Read the referenced WAI Main chat; current repository and live observations take priority over older chat claims.

## 2–3. Inventory, dictionary and privacy

MEASUREMENT_SPEC.md contains the complete current event inventory, proposed facts-1 dictionary, parameter-by-parameter privacy review, trigger/deduplication rules, attribution limits and legacy cutover. It was written before adding events.

Retained: app_profile_viewed, add_to_comparison, complete_app_finder, outbound_app_click, submission_started, submission_completed, plus six existing commercial events. New: catalog_search_completed and catalog_result_selected. Added measurement_version=facts-1, fixed relative page context, bounded coarse search categories and search attribution. No raw entered search text, questionnaire answers, form content or custom visitor identifiers are sent. A 1,200 ms settled interval and explicit intent gate prevent render/restoration events; an immediate result selection flushes the current intentional search once. Identical consecutive searches deduplicate. Readiness can retry the current consented state; it cannot replay denied interactions. A local 30-minute selected-product context carries only coarse categories, public product slug and local expiry/consumption flags. It is never an analytics identifier.

Admin/nested admin, API and preview paths are excluded; unknown route shapes fail closed for custom events. Consent storage failure disables collection instead of breaking the screen. Ordinary profile renders retain their existing meaning; browser revisits may be new ordinary renders, but cannot reuse consumed search-profile attribution. Search metrics describe event stages rather than matched sessions. Consent refusal and blockers cause expected undercounting.

Automatic GA collection remains a separate release review: current Enhanced Measurement settings were not verified or changed. Source notes historically enabled history/page loads, outbound clicks and form interactions. Check automatic site search/form/outbound settings and query-bearing page locations before release. Custom events now override inherited full URLs/referrers with fixed relative page context; this does not claim automatic pageviews are sanitized. No manual page_view was added and no duplicate pageview strategy was introduced.

## 4. BigQuery findings

Verified configured WAI source through the existing Looker embedded connection: workout-app-index-prod.analytics_555126329.events_*. The source SQL is date-bounded and platform WEB only. It does not constrain stream/hostname or exclude admin. It groups daily approximate devices, whose default Sum aggregation can overstate period totals. Existing observed dashboard counts are not an independent raw-table audit.

Both explicit prod/dev CLI dataset-list attempts failed because Google reauthentication is required. The in-app Cloud Console also requested reauthentication. Therefore these remain **unverified**: actual GA dataset/table existence and location, current events_* names, latest exported event date, raw parameter inventory, numeric web stream ID, Android export contents, admin-row counts, actual table schemas, dataset/table/partition expiration and current export health. Do not infer them from Firebase configuration or working cached dashboard charts. No identifiers or event rows were displayed. No authentication, IAM, billing, defaults or export settings were changed.

To finish after signing in: Cloud Console > project workout-app-index-prod > BigQuery > Explorer > analytics_555126329 > Details/tables; confirm region, schema, latest table/date and expiration. Run reporting/export_metadata.sql read-only after verifying regions. GA Admin > Data streams supplies the numeric web stream ID; validate aggregate platform/stream inventory before enabling the proposed queries. Never use the G- measurement ID as stream_id. Run bounded aggregate inventory only, with no individual event identifiers.

## 5. Search Console export findings

Authenticated in-app browser, exact Domain property sc-domain:workoutappindex.com. Settings > Bulk data export shows Active; project workout-app-index-prod, dataset searchconsole, location US. This confirms configuration, not a successful current export. searchdata_site_impression, searchdata_url_impression, ExportLog, last successful export per table and retention remain unverified because BigQuery needs reauthentication. ExportLog contains successful exports, not failed attempts; inspect it and the bulk-export error panel separately after access is restored.

Console paths: [property](https://search.google.com/search-console?resource_id=sc-domain%3Aworkoutappindex.com), [bulk export](https://search.google.com/search-console/settings/bulk-data-export?resource_id=sc-domain%3Aworkoutappindex.com), [BigQuery](https://console.cloud.google.com/bigquery?project=workout-app-index-prod). No export was activated/deactivated or reconfigured.

## 6. SQL prepared

reporting/ga4_inventory.sql, ga4_executive.sql, ga4_catalog_funnel.sql, ga4_filter_usage.sql, export_metadata.sql, gsc_organic.sql and gsc_page_changes.sql. All are read-only proposals and were not executed. reporting/README.md specifies parameters, exact source assumptions, scan bounds, approval destinations, device-count limits and dashboard setup. GA queries use bounded table suffixes, WEB + required stream, public paths, legacy/version separation and only aggregate distinct pseudo-ID use. Search Console queries use bounded data_date, exact domain property, repeated-row aggregation, proper weighted position, anonymized query treatment, documented brand rules and equal-length comparison periods.

No CREATE/REPLACE statements or production views were executed. Owner approval is required after presenting an exact destination, SQL and dry-run scan scope. There is no assumed new reporting dataset.

## 7. Looker findings and proposed sections

[Portfolio Performance Dashboard](https://datastudio.google.com/reporting/83bfd659-cdf5-48b8-bfcc-6e6c8004d605) is accessible. Existing Mobile Apps and Workout App Index pages render data. Two embedded BigQuery Custom SQL sources show Working: ds8 uses four charts; ds0 six. Inspected ds8 WAI SQL, fields and 12-hour freshness. No settings or content were changed; exited to view mode. A report-copy action is available, but no copy was needed for read-only inspection.

WAI displayed 27 actions over Aug 8–Nov 5, with 13 profile views, four outbound clicks, three submission starts, three finder completions and two completed submissions. Counts reflect that dashboard/date range/cache, not verified fresh export totals. Device counts should not be summed across dates/events. Search, organic and commercial sections are missing. reporting/README.md gives exact source, field, filter and chart instructions for Executive Overview, Facts Search Funnel, Organic Discovery and Commercial Performance. Preserve the Mobile Apps page/source. Before material changes, make and verify a report copy, then validate new sources in that copy; no live dashboard replacement is authorized here.

## 8. Sitemap, robots, canonical and metadata findings

Public HTTP checks during this audit (existing deployed site, not new local edits):

| Resource | Observed |
| --- | --- |
| /sitemap.xml | HTTP 200, 46 URLs |
| /robots.txt | HTTP 200, allow /; disallow /admin/, /api/, /preview; correct production sitemap and host |
| /apps | HTTP 200, canonical https://workoutappindex.com/apps, unique catalog title, 37 ordinary profile anchors in returned HTML |
| /apps/hevy | HTTP 200, self canonical and unique profile title; ordinary related profile links |
| /services | HTTP 200, self canonical and unique services title |

Source sitemap uses getPublicCatalog: published/legacy-public snapshots with withdrawn entries filtered, not draft admin records. Withdrawal lookup fails closed. No published editorial article or stable editorial comparison routes currently exist; article metadata/author/date and representative article inspection are N/A. The interactive comparison is client state, not a published article URL. Future published articles/comparisons need an explicit public route registry, real dates/authors, ordinary links and sitemap integration; no thin pages were invented.

Source repairs: sitemap no longer uses retired subjective-assessment dates. It uses valid, current factual claim dates, omits untrusted dates, rejects future/invalid dates and unsafe/duplicate slugs. Static URLs have no invented modification dates. Current-date comparison is only validation, not a new request-time content timestamp. API/publication entry gates are unchanged.

robots now includes the exact /admin path. Admin layout and /preview emit noindex/nofollow; blocking crawl alone is not a reliable removal mechanism for previously indexed URLs. If a private URL is already indexed, review a separate crawl/removal policy rather than assume robots.txt will remove it. Private profile previews omit structured data.

Catalog filters are client state; existing fixed URL filters canonicalize to /apps. Text is not written to the URL; homepage search transfers local state. Finder result marker canonicalizes to /find (or homepage for legacy restoration), not thousands of indexable results. No generated category/best pages. Catalog HTML already links profiles without using JavaScript search.

Existing public page titles/descriptions/canonicals were present; added matching page-specific Open Graph data for homepage, catalog, finder, service/partnership and methodology/submission/correction pages. Profiles retain existing unique metadata/OG. Replaced incomplete SoftwareApplication markup with WebPage + BreadcrumbList. Added Organization/WebSite on the public homepage; private preview emits none. No ratings, reviews or undocumented price were invented. Google software-app rich results require an offer price plus qualifying rating/review, which these factual pages do not provide: [official software-app requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app). No Article markup is emitted without an actual editorial article.

## 9. Search Console indexing and performance

All results below are read-only console observations, not inferred from HTTP status:

- Property: Domain, workoutappindex.com; verified ownership shown.
- Sitemap: https://workoutappindex.com/sitemap.xml, Success; submitted Sep 22, last read Oct 31, 2026; 42 discovered pages, zero videos. This is an older read than the public 46-URL sitemap observed today.
- Page indexing report last updated Oct 22: 25 indexed, 20 not indexed. Reasons shown: Page with redirect (3), Discovered currently not indexed (17), Duplicate without user-selected canonical (0). Totals are dated report data, not today's source inventory.
- Core Web Vitals last updated Nov 2: insufficient last-90-day usage data for both mobile and desktop. This is not a performance pass. No separate Mobile Usability report was exposed.
- Performance: selected three months, Web; chart available Sep 21–Nov 3, 2026: 24 clicks, 403 impressions, 6% CTR, average position 28.6. UI last update 4.5 hours before inspection.
- Queries observed: boostcamp review (1 click/1 impression), alo wellness club (0/49), is boostcamp pro worth the subscription cost? (0/6), shred (0/6). These are aggregate Search Console search queries, not logged on-site visitor terms.
- Pages observed: homepage 21 clicks/42 impressions; submit-app 2/23; boostcamp 1/19; gymshark-training 1/14; alo-wellness-club 0/79; centr 0/55; ifit 0/40. URL aggregation can differ from property totals; do not sum these as unique site impressions/clicks.

| Inspected canonical URL | Stored-index result | Crawl / canonical details |
| --- | --- | --- |
| / | Indexed / on Google | Smartphone, Nov 3 17:04:43, successful/allowed; user canonical production root, Google canonical inspected URL. Discovery showed temporary sitemap processing error despite successful sitemap summary; no diagnosis inferred. |
| /apps | Unknown to Google | No recorded crawl/sitemap/canonical in URL Inspection |
| /apps/hevy | Indexed / on Google | Smartphone, Nov 3 11:50:21; successful/allowed; sitemap detected; self canonical chosen |
| /apps/boostcamp | Indexed / on Google | Smartphone, Nov 3 21:35:45; successful/allowed; sitemap detected; self canonical chosen |
| /apps/lift-league | Indexed / on Google | Smartphone, Oct 14 13:33:55; successful/allowed; sitemap detected; self canonical chosen |
| /services | Unknown to Google | No recorded crawl/sitemap/canonical |
| /partnerships | Unknown to Google | No recorded crawl/sitemap/canonical |
| Editorial article | N/A | No published article route exists in current source |

Crawl timestamps above are the displayed console times; timezone was not established. An initial lookup of /apps/the-lift-league was unknown; source confirmed the real slug is /apps/lift-league and that canonical was then inspected. Do not count the nonexistent alias as a catalog indexing defect. No indexing requests, live URL tests, sitemap resubmissions or settings changes were made.

## 10. Files changed

- Documents: MEASUREMENT_SPEC.md, ANALYTICS_SEO_AUDIT.md, ANALYTICS_CUTOVER.md; reporting/README.md and the seven SQL files above.
- Analytics: lib/analytics.ts, new lib/catalog-search-analytics.ts, new components/use-catalog-search-analytics.ts; components/analytics-consent.tsx, app-profile-viewed.tsx, outbound-app-button.tsx, workout-app-index.tsx.
- SEO: lib/sitemap-entries.ts, new lib/seo.ts; components/app-profile-content.tsx; app/robots.ts; new app/admin/layout.tsx; app/preview/page.tsx; app/admin/apps/[id]/preview/page.tsx; app/page.tsx, apps/page.tsx, find/page.tsx, services/page.tsx, partnerships/page.tsx, how-we-score/page.tsx, editorial-standards/page.tsx, corrections/page.tsx, submit-app/page.tsx.
- Tests prepared: tests/analytics.test.mjs, commercial-analytics.test.mjs, sitemap.test.mjs; new catalog-search-analytics.test.mjs and metadata.test.mjs. No test result is claimed.

## 11. Remaining decisions / access

1. Ryan runs the manual validation below, reviews the full diff including new files, then decides whether to commit/deploy. No commit has been made in this task.
2. Complete Google reauthentication to finish the table/schema/expiry/latest-export audit. This is an access limitation, not evidence of an export failure.
3. Review actual GA Enhanced Measurement settings and automatic URL/query behavior. Any setting changes need separate authorization. Keep automatic pageviews authoritative unless a coordinated replacement explicitly disables both default and enhanced-history collection.
4. Choose/approve reporting destinations and bounded scan scope before production views. Validate all SQL against real schemas/stream and dry-run bytes first.
5. Duplicate/checkpoint the dashboard before edits, then approve deployment of reporting changes. External revenue remains unavailable unless a trustworthy aggregate source is supplied.
6. Observe discovery of catalog/services/partnerships after normal crawling; this audit does not authorize sitemap resubmission or indexing requests.

## 12. After Ryan deploys: verification checklist

- Record exact commit and release timestamp in ANALYTICS_CUTOVER.md; keep the checkpoint intact. No need for the agent to watch a rollout.
- New browser session: denied consent produces no tag/custom events; accept then search with two or more characters, pause 1.2 seconds, verify one completed event. Verify zero results, fixed filters and mixed mode; no raw query/answers in event params. Clear state, one character alone and default browse must not complete searches.
- Select before debounce: one search + one selection, then one rendered profile attributed to search. Outbound carries the same coarse context. Test browser back, rerender and readiness notifications for no extra completed searches or reused profile attribution. Open a new direct profile and verify no false search context; verify expiry/revoke/storage-blocked paths. New-tab selections may lack attribution because browser storage/navigation behavior differs; report as partial attribution, not missing page renders.
- Verify comparison additions/removals/cap, final finder completion versus restored results, submission validation/network failures versus confirmed 201 saves, and corresponding commercial saved inquiries. Email click is not a confirmed inquiry.
- Direct admin, nested admin/login, private preview and public-to-admin/back navigation: no collection; public browsing still works. No private data or URL parameters in custom events. Review automatic events separately for form destinations/search/query leakage and pageview duplication.
- Verify fresh sitemap output, exact public URL count, withdrawal exclusion and self canonicals; no preview/admin/filter URLs. Repeat fetch without content edits: no timestamp churn.
- Rich Results Test: homepage, /apps, Hevy, Boostcamp, Lift League, services, partnerships. Check rendered HTML canonical/title/description/OG; homepage Organization/WebSite; public profile BreadcrumbList/WebPage; no unsupported software rating/offer/review; no private markup. A page with no eligible rich result is not a failed factual profile. Add article checks only once a real article exists.
- Compare sitemap URLs to ordinary catalog anchors, ensure all public profiles are reachable, verify transient filters keep /apps canonical. Check admin/preview robots metadata.
- After export refresh, run bounded aggregate inventory/funnel queries, verify facts-1 parameters and public WEB stream, reconcile counts within consent/cache/timezone limits; verify separate Search Console success dates and retention. Do not inspect identifiers.
- In the copied dashboard verify date controls, comparison periods, filters, weighted ratios/position and null/zero handling; preserve portfolio page; obtain approval before live replacement. Recheck Search Console stored indexing/performance later without assuming immediate discovery.

## 13. Exact manual PowerShell validation commands

Run in Android Studio's terminal. Stop at the first failure and share its output. These commands were prepared, not run by the agent.

```powershell
Set-Location 'C:\dev\projects\workout_app_index'

# Lint
npm.cmd run lint
if ($LASTEXITCODE -ne 0) { throw 'Lint failed' }

# Targeted analytics
node --experimental-strip-types --test .\tests\analytics.test.mjs .\tests\catalog-search-analytics.test.mjs .\tests\commercial-analytics.test.mjs
if ($LASTEXITCODE -ne 0) { throw 'Analytics tests failed' }

# Sitemap and metadata
node --experimental-strip-types --test .\tests\sitemap.test.mjs .\tests\metadata.test.mjs
if ($LASTEXITCODE -ne 0) { throw 'Sitemap or metadata tests failed' }

# Complete suite
$waiAllTests = @(Get-ChildItem -LiteralPath .\tests -File -Filter '*.test.mjs' | Sort-Object Name | ForEach-Object { $_.FullName })
node --experimental-strip-types --test @waiAllTests
if ($LASTEXITCODE -ne 0) { throw 'Complete tests failed' }

# Production build
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Production build failed' }

# Review all intended modifications and new files before committing
# .idea/ is unrelated and must stay out of this change.
git status --short
git diff --stat
git diff --check
```

Source-only regression coverage was prepared for coarse params/deduplication/readiness/consent/attribution/storage, sitemap facts-date safety and private/public structured data boundaries. Full UI debounce/history behavior and live analytics require the manual browser checklist. Passing lint/tests/build remains required before considering this ready to deploy.

---

## Original document: ANALYTICS_CUTOVER.md

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
