# How the current WAI site works

Current November 13, 2026. Describes implemented behavior in this release, not proof that a rollout or provider delivery has completed. Strategy is in the [business plan](../WAI_BUSINESS_PLAN.md); owner procedures are in [Catalog workflow](CATALOG_WORKFLOW.md).

## Public experience

| Route | Purpose |
| --- | --- |
| `/` | Introduction, search and curated rotating examples including The Lift League, Boostcamp, Hevy and StrongLifts |
| `/apps`, `/apps/[id]` | Alphabetical factual catalog/search/filtering and individual profiles; comparison supports up to four apps |
| `/find` | Nine-question preference finder; restored browser-local answers/results do not create a new completion |
| `/how-we-score`, `/editorial-standards` | Current fit methodology and evidence/independence standards; the historic scoring route name is retained |
| `/submit-app` | Save app details, choose one product, pay for listing or save a scoped-service inquiry |
| `/services` | Explain service outcomes and boundaries, then route into the unified submission flow |
| `/partnerships`, `/sponsored/[slug]` | Partnership inquiry, published disclosed placements and sponsored articles |
| `/corrections`, `/terms`, `/privacy` | Free sourced corrections, current commercial terms and data practices |

Public profiles/cards/API/comparison omit historical Legit/Originality ratings in all coverage modes. Matching uses factual compatibility and preferences, with alphabetical ties; payment and historical subjective values do not influence fit. The nine questions cover platform, goal, experience, guidance preference, equipment, main extra priority, optional adjacent features, AI and budget. Current version is `fit-5`; `lib/finder-questions.ts`, `lib/matching.ts` and `/how-we-score` define exact options, exclusions, weights and caps.

No visitor account is required. Owner Google authentication is separate. Finder/browser storage is not a server-side training profile. Consent controls public analytics; private admin routes are excluded.

## Data and administration

The Next.js App Router site uses React, server route handlers/actions and Firebase Admin SDK for Firestore access. Browser clients cannot directly write Firestore; verified authorized Google identity and secure session cookies protect owner actions. The backend uses its existing service identity rather than committed service-account keys.

`catalogApps`/`evidenceSources` hold private draft research. Versioned `catalogPublications` and `catalogWithdrawals` determine public visibility; withdrawal read failure fails closed. Bundled/local records remain compatible with original legacy visibility while new research stays private. Owner acceptance, private saving, review completion and publishing are separate. Direct admin editing and per-field local proposal acceptance remain available.

`/admin` separates catalog and editorial/commercial inbox work. Catalog labels show Public/Not public, review progress, missing content, pending edits and linked purchased services horizontally. Review complete can coexist with unresolved fields. Inbox evaluations are requests/history, not a count of public apps. Preserve explicit owner decisions, review rounds, private evidence and workflow events; routine status changes do not send messages.

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

Public metadata/canonicals use the real site routes. Static sitemap entries do not receive invented current dates. Factual app dates require the owner-reviewed factual record and a valid supported date; unreviewed records receive no `lastModified`. Published sponsored articles use valid update dates. Private/admin/preview content stays outside public indexing. Do not weaken the owner-review sitemap regression test.
