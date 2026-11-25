# How the current WAI site works

Current November 25, 2026. Describes implemented behavior in this release, not proof that a rollout or provider delivery has completed. Strategy is in the [business plan](../WAI_BUSINESS_PLAN.md); owner procedures are in [Catalog workflow](CATALOG_WORKFLOW.md).

## Public experience

| Route | Purpose |
| --- | --- |
| `/` | Introduction, search and curated rotating examples including The Lift League, Boostcamp, Hevy and StrongLifts |
| `/apps`, `/apps/[id]` | Alphabetical factual catalog/search/filtering and individual profiles; comparison supports up to four apps |
| `/reviews`, `/reviews/aegir-iron` | Owner-approved editorial review with linked author, publication date and explicit testing scope; separate from factual profiles |
| `/about` | Ryan Lovelace’s bio and the ownership disclosure |
| `/find` | Nine-question preference finder; restored browser-local answers/results do not create a new completion |
| `/how-we-score`, `/editorial-standards` | Current fit methodology and evidence/independence standards; the historic scoring route name is retained |
| `/submit-app` | Save app details, choose one product, pay for listing or save a scoped-service inquiry |
| `/services` | Explain service outcomes and boundaries, then route into the unified submission flow |
| `/partnerships`, `/sponsored/[slug]` | Partnership inquiry, published disclosed placements and sponsored articles |
| `/corrections`, `/terms`, `/privacy` | Free sourced corrections, current commercial terms and data practices |

Public pages share desktop navigation and a keyboard-accessible mobile menu. The same primary links appear in both; choosing a menu link closes the menu, and Escape dismisses it. Footer About links and editorial bylines lead to `/about`.

Public profiles/cards/API/comparison omit historical Legit/Originality ratings in all coverage modes. Matching uses factual compatibility and preferences, with alphabetical ties; payment and historical subjective values do not influence fit. The nine questions cover platform, goal, experience, guidance preference, equipment, main extra priority, optional adjacent features, AI and budget. Current version is `fit-5`; `lib/finder-questions.ts`, `lib/matching.ts` and `/how-we-score` define exact options, exclusions, weights and caps.

No visitor account is required. Owner Google authentication is separate. Finder/browser storage is not a server-side training profile. Consent controls public analytics; private admin routes are excluded.

Public cards, finder results, comparisons and profiles distinguish **Researched claims**, **Hands-on verified findings** and **Editorial review**. These can coexist; they describe the evidence and published coverage, not quality or ranking. Source-only coverage, including legacy entries, defaults to Researched claims. Hands-on findings are limited to their dated tested scope; historical owner-confirmed scopes for Aldo Coach, WorkoutFlow and swithAI are recorded in `lib/catalog-coverage.ts`. Only an approved write-up supports Editorial review. These labels do not replace or clear admin missing-content, pending-proposal, review-progress or publication indicators.

## Data and administration

The Next.js App Router site uses React, server route handlers/actions and Firebase Admin SDK for Firestore access. Browser clients cannot directly write Firestore; verified authorized Google identity and secure session cookies protect owner actions. The backend uses its existing service identity rather than committed service-account keys.

`catalogApps`/`evidenceSources` hold private draft research. Versioned `catalogPublications` and `catalogWithdrawals` determine public visibility; withdrawal read failure fails closed. Bundled/local records remain compatible with original legacy visibility while new research stays private. Owner acceptance, private saving, review completion and publishing are separate. Direct admin editing and per-field local proposal acceptance remain available.

`/admin` separates catalog and editorial/commercial inbox work. Catalog labels show Public/Not public, review progress, missing content, pending edits and linked purchased services horizontally. Review complete can coexist with unresolved fields. Inbox evaluations are requests/history, not a count of public apps. The inbox separates Submission and claims, Eligibility, Work and payments, and Research notes. Eligibility is Pending / Eligible / Ineligible, with unknown/pass/fail findings available immediately; notes are optional. It requires neither a purchase nor a service agreement. Legacy unchecked boxes remain unknown, and old review labels never establish hands-on testing. Earlier decisions, rounds and private-work stages remain in secondary history; their old button chain and manual seen controls are retired.

Create a catalog draft or link an existing entry explicitly. Both catalog link fields are synchronized, with replaced links kept in private history. These actions do not start testing, finish work or publish. Paid listings and historical free submissions use the same normal factual catalog preparation/publication gates. Larger inquiries stay distinct from purchases.

The inbox opens as compact, expandable rows with app/contact identity and separate completion, eligibility, catalog and work labels. Search by app/contact/email/catalog ID scans matching requests across older pages; Open, Completed and All requests are distinct from the recoverable deleted view. Filters persist during pagination. Reviewed public listings and ineligible free/refunded requests appear in Completed without changing their stored workflow. Explicit completion/reopening uses its own revision-checked inbox state. Unfinished service work, unresolved older service discussions, balances, invoices, refunds and unfulfilled purchased listings keep requests Open. Completion does not publish, change catalog review, send messages, alter payments or delete records.

Research notes now also display retained review-round scope/notes, saved evidence from both historical catalog links, and missing locally prepared hands-on records (clearly labeled as local preparation, not saved submission notes). Existing evidence takes precedence over a same-ID local record. Records are displayed without copying, merging or overwriting their stored content. Empty results explain that unlinked chat/local notes may still exist. Earlier decisions and activity use dated, readable summaries instead of raw serialized audit records; private audit payloads remain stored. Catalog missing-content, proposal, visibility and review-progress labels and the Work and payments panel remain independent.

Private recovered Ægir and WorkoutFlow research is associated with the exact original request IDs as well as explicit catalog links, so a missing link does not hide known historical notes. Original owner chat messages for Ægir, WorkoutFlow, swithAI and Aldo are displayed separately from summaries, with capture dates, source references and text fingerprints. Attachment wrappers are excluded; referenced filenames are retained, without reproducing private screenshots. This is a display-only historical archive, not an overwrite of saved evidence, request completion, publication or scores. New original dictation can be appended as its own dated note; the server preserves that wording without trimming. A missing original transcript is labeled as unavailable rather than recreated from a summary.

Work and payments retains its desktop columns and separately saves products/work/note/catalog connection, signed scope/price, and invoice references. On hold accepts an empty note and preserves eligibility. Starting larger services requires the signed scope and verified 50% deposit for those products; listing work does not. A note edit does not validate unrelated invoices. Unpaid draft or void invoices can be explicitly replaced; paid/refunded invoices cannot be removed. Retired ownership links and replacement history remain for audit, and stale/cross-request associations are rejected.

Private dated research notes distinguish public-source research, developer statements and hands-on observations (with observation date, platform/version/tier, what was used, findings and limitations). They live under the submission, remain available after catalog connection, and do not verify public claims or create deliverables. Copy research brief contains allowlisted claims, scope, verified purchase/payment context, legacy status and eligibility findings/checklist; contact fields, URL parameters and recognizable credentials are omitted. Review free text before sharing.

Delete submission removes the request from the active inbox while retaining its private record, note/decision/notification audit, catalog links and financial references. Deleted submissions and retained billing history remain owner-accessible and can be restored. Developer draft access is unavailable while a submission is deleted; provider reconciliation continues. Deletion never refunds, withdraws or deletes a catalog record, and reporting continues to include historical conversions. Inline saves preserve entered values on failure and retain pagination, scroll position and open sections. Routine saves do not send messages.

## Developer request and payment flow

Saving app details creates a request in `editorialRequests` before product choice. The offers page uses one radio choice and one appropriate primary action. Service inquiry validation rejects empty, multiple, duplicate or unknown choices. Original request history and owner-agreed multi-product scopes are preserved. Contact details are not collected again for the inquiry.

An httpOnly SameSite capability cookie allows access to the saved request without an account; only its hash is persisted and server access expires after 30 days. Browser drafts retain navigation/choice state. “Start a different submission” clears browser access/draft rather than deleting the prior saved request. Keep secrets and access tokens out of URLs, analytics and client-visible admin data.

Listing price is server-defined at $20 USD, quantity one. Embedded Stripe Checkout creates/resumes an idempotent attempt. Return URLs and UI success alone never mean paid: server reconciliation and signed webhooks retrieve canonical Stripe state. Pending/failed/expired/cancelled, retry, late/duplicate events and refunds remain separate states. Only succeeded refunds count as refunded money; pending/failed refunds remain flagged. Admin can reconcile or issue the listing refund with provider idempotency.

`listingOrders`, `stripeEvents` and `invoiceLinks` support payment/order history. Larger services use signed scopes and manually created Stripe Dashboard deposit/balance invoices, verified in admin for request/customer, USD amount and mode. Payment status, requested/agreed/purchased products and work status are distinct. Starting/completing work requires signed scope and verified deposit. Linking a paid engagement to a catalog record does not publish it.

## Notifications and partnerships

App and partnership request saves atomically enqueue an internal `editorialNotifications` job. Notification failure does not undo a successful request save. Jobs use pending/sending/success/error state, a 60-second lease and provider idempotency. A retry with uncertain delivery beyond the safety window requires owner provider-history review rather than risking a duplicate. Admin has manual retry controls; no scheduler or automatic developer confirmation is installed. See the deployment guide for sender configuration and delivery limits.

Admin manages paid link placements and sponsored articles with explicit draft/public/withdrawn state. Paid labels are visible; commercial links use sponsored relationship attributes. Article text and metadata are escaped, and only published articles enter the sitemap. These placements live in the supported partnership/article routes; no promise of a general advertising network or publication reach is implied.

## Measurement, reporting and SEO

The [measurement specification](MEASUREMENT_SPEC.md) defines `facts-1` catalog/search events and the additive `developer-1` funnel. Existing submission completion means a confirmed saved request, not a sale. Browser analytics need consent and a ready tag; readiness retries do not replay pre-consent actions. No raw search text, contact details, questionnaire answers or private tokens are sent. The approved opaque submission reference is limited to the six documented developer events.

`/admin/reports` and `/api/admin/developer-report` give private aggregate saved-request/payment cohorts, up to 90 UTC cohort days. Seven calendar days defines purchase-only, inquiry-only, both, pending-neither and matured-neither outcomes. Matured checkout-without-purchase can overlap an inquiry. Later service sales are separate; refunds do not erase conversions. Test data is excluded by default. Amounts are reconciled cohort receipts/refunds before fees, not profit or transaction-date cashflow. Reconcile after provider outages; report query time is not proof every provider object was just refreshed.

BigQuery SQL under `reporting/` is bounded read-only preparation. GA represents consented browser activity, while operational saved-request totals can include nonconsenting developers. No Firestore-to-BigQuery export, new views or dashboard changes are implied. The reporting runbook records historical observations and verification gaps.

Public metadata/canonicals use the real site routes. Static sitemap entries do not receive invented current dates. Factual app dates require the owner-reviewed factual record and a valid supported date; unreviewed records receive no `lastModified`. Approved editorial articles use their fixed publication dates; published sponsored articles use valid update dates. Private/admin/preview content stays outside public indexing. Do not weaken the owner-review sitemap regression test.

## Editorial pages

`lib/editorial.ts` contains only approved public article copy and metadata. The Reviews & Comparisons landing page links to the first Ægir Iron review; additional articles need their own public route and owner-approved copy. The article and About page supply metadata, canonicals and author structured data. Editorial coverage in `lib/catalog-coverage.ts` links the review to the app profile without modifying saved app fields, research progress or publication records. No original dictation, private scores, inbox notes or developer correspondence is imported into public article content.
