# Existing deployment, payments and verification

Updated November 13, 2026. This consolidates Firebase setup and the commerce handoff. It describes the existing setup and latest verified preparation, not a claim that the public rollout or live payment delivery has succeeded. No new Firebase, cloud, Android project or backend is needed.

## Existing targets and release workflow

Actual repository: `C:\dev\projects\workout_app_index`, opened in Android Studio. Remote: `GoodHurtLifting/workout_app_index`; production branch: `main`. Pushing approved changes is the existing App Hosting rollout trigger. Do not add an extra deployment command, change branch rollout settings or wait for rollout status unless Ryan asks. A code push delivers bundled research proposals; it never replaces owner-saved catalog drafts automatically.

| Target | Existing configuration |
| --- | --- |
| Production | Project/backend `workout-app-index-prod`, `us-east4`, environment name `production`, Node 24 |
| Development | Project/backend `workout-app-index-dev`; base config, no production environment overlay |
| Base configuration | `apphosting.yaml`; existing resources/admin/notification settings |
| Production overlay | `apphosting.production.yaml`; selected by the verified `production` environment name, combined with base settings |
| Backend identity | `firebase-app-hosting-compute@workout-app-index-prod.iam.gserviceaccount.com` |

`.firebaserc` defaults to development. Always name the intended existing project for console/CLI investigations; never substitute a default TLL project. Rules/indexes require their own deliberately reviewed release when changed; pushing site code is not evidence they changed. `firebase.json` retains the existing development backend reference. Browser Firestore access is denied; owner access uses verified Google auth and server sessions/Admin SDK.

## Local setup and credentials

Use Node 24 and install `pnpm install --frozen-lockfile` from the committed lock. Run npm scripts as documented in the root README. If `.env.local` already exists, preserve it. Otherwise copy `.env.example` and supply the existing development web config, `CATALOG_ADMIN_EMAIL` and authorized server credentials. `gcloud auth application-default login` supplies local server credentials when using real development Firebase; Firebase CLI sign-in and gcloud/BigQuery credentials are separate. Prefer isolated emulators for mutation tests.

Never commit service-account keys, secret values, `.env.local`, `.env.wai-live.local`, emulator logs or ignored `work/` helpers. The intentionally public Firebase web config/Stripe publishable key still must match the selected environment. Keep sandbox keys in local test configuration; the ignored live setup file is not automatically loaded by Next and is not a second deployment environment.

## Stripe configuration

Production uses the WAI Stripe account under the existing Turf King organization, separate from The Lift League. The three Secret Manager resources below were created and verified at enabled version **1**, with access granted to the existing production backend. References are pinned in `apphosting.production.yaml`, not secret values.

| Environment field | Secret reference / value | Availability |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | `WAI_STRIPE_SECRET_KEY@1` | Runtime only |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `WAI_STRIPE_PUBLISHABLE_KEY@1` | Build and runtime |
| `STRIPE_WEBHOOK_SECRET` | `WAI_STRIPE_WEBHOOK_SECRET@1` | Runtime only |
| `WAI_SITE_URL` | `https://workoutappindex.com` | Runtime |
| `WAI_CHECKOUT_ENABLED`, `WAI_STRIPE_LIVE_APPROVED`, `WAI_LISTING_TERMS_APPROVED` | `true` in the approved production overlay | Runtime |
| `WAI_TEST_SUBMISSIONS` | `false` in production | Runtime |

The installed SDK is Stripe 23.1.0, API `2026-10-28.endive`, stripe-js 10.2.1. Embedded Checkout uses `embedded_page` and standard processing with `managed_payments.enabled=false`; the sandbox's Managed Payments default rejected this professional-service flow. The server creates the $20 USD line item; no pre-created Price ID is needed. Rebuild when changing the public key. Do not mix live/test key modes or listener/endpoint signing secrets.

Existing live snapshot webhook **`we_1UbQeLHakMcKBByAc33AxUj5`** is enabled at `https://workoutappindex.com/api/stripe/webhook`, on the same API version. Do not create a duplicate endpoint. Its secret is the production reference above. Subscriptions:

```text
checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.async_payment_failed
checkout.session.expired
charge.refunded
refund.created
refund.updated
refund.failed
invoice.finalized
invoice.paid
invoice.payment_failed
invoice.voided
invoice.marked_uncollectible
invoice.updated
```

The handler verifies the raw-body signature, mode, receipt deduplication and canonical provider state. Browser return/status text is never proof of payment. Paid and refunded history is guarded against stale events. A signed paid timestamp can replace a provisional observation date after reconciliation. Keep webhook processing enabled for existing orders/refunds even if new checkout is disabled.

Restricted runtime key permissions must support Checkout session creation/read/expiration, Payment Intent reads, Charges reads, Refund reads/creation, Invoices reads and Invoice Payments reads. Webhook Endpoints administration was used for setup and can be removed from the key afterward; signature checking uses the signing secret, not that API permission. An optional account-details lookup required an unrelated connected-account permission; that permission was not added. Do not broaden access merely to satisfy an unused diagnostic.

For future authorized rotation, use the existing App Hosting secret mechanism and exact existing project/backend. Enter secrets privately, never in command arguments or captured debug output; verify version/access in memory or metadata, update pinned references and rebuild as needed. CLI `apphosting:secrets:grantaccess` supports granting existing named secrets to the existing backend. Do not recreate the account/backend to rotate credentials.

Emergency new-checkout disable is `WAI_CHECKOUT_ENABLED=false` through the existing environment/release process. It is not authorization to change production settings without the owner. Do not delete orders, invoice links or historical payments.

## Invoice and fulfillment procedure

For listing work, verify canonical payment in admin, then assess within five business days of payment, complete information and access. Record access pauses. Ineligibility or inability by WAI to deliver requires a full refund; use the admin refund/reconcile controls and confirm provider success separately from pending/failed status. Payment never publishes a profile.

Larger work needs the completed [scope template](COMMERCIAL_SCOPE_TEMPLATE.md), agreed products/total and signed reference/date. The non-refundable 50% deposit is invoiced after signing; final 50% is invoiced on completion. If cents split unevenly, deposit rounds up one cent and balance down. Create invoices in the Stripe Dashboard and link their `in_...` IDs in admin. The app verifies matching customer/request email, USD amount, environment, invoice stage and canonical payment/refund state. Invoice product snapshots preserve the purchase association even if a later agreement changes. Work state is independent of money; a quote/open invoice is not a purchase. Do not send real client invoices just to test the feature.

## Internal notifications

Both app and partnership saves enqueue `editorialNotifications` atomically with the request. Recipient is `SUBMISSION_NOTIFICATION_EMAIL=ryan@workoutappindex.com`, falling back to `CATALOG_ADMIN_EMAIL=ryan@theliftleague.com`. Existing production sender is `Workout App Index <notifications@workoutappindex.com>`. `RESEND_API_KEY` uses the existing secret **`wai_resend_api_key`** at runtime; preserve that reference and sender.

A notification error does not fail the saved request. Pending/sending/success/error state uses a 60-second sending lease and provider idempotency. The provider's 24-hour idempotency window has a 23-hour safety cutoff for uncertain retries. `CHECK_PROVIDER` means inspect Resend history and confirm no delivery before the explicit manual retry. Provider acceptance is distinct from delivery/read evidence. No scheduler, automatic developer confirmation or unsolicited client message is installed. Coordinate any real internal delivery test with Ryan; do not contact outsiders during verification.

## Automated and isolated local checks

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

Commerce integration tests use a guarded local demo ID, not a provisioned cloud project. In separate terminals:

```powershell
firebase.cmd emulators:start --only firestore --project demo-wai-commerce --config firebase.commerce-test.json
```

```powershell
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8089'
$env:GCLOUD_PROJECT='demo-wai-commerce'
$env:SUBMISSION_NOTIFICATION_EMAIL='internal-test@example.invalid'
$env:RESEND_API_KEY=''
$env:SUBMISSION_NOTIFICATION_FROM=''
$env:WAI_CHECKOUT_ENABLED='false'
npm.cmd run dev -- --port 3017
```

```powershell
$env:FIRESTORE_EMULATOR_HOST='127.0.0.1:8089'
$env:GCLOUD_PROJECT='demo-wai-commerce'
npm.cmd run test:commerce
```

Guards reject any other emulator host/project. The isolated payment/auth module hooks are test-only and never belong in the app. No automated test calls real Stripe/Resend. When deliberately checking against an already-enabled **sandbox** local server, `WAI_HTTP_TEST_CHECKOUT_AVAILABLE=true` in the test runner selects the terms-rejection assertion before Stripe creation; the usual disabled setup retains the 503 check. Stop only your own test processes and clear test overrides afterward. Stop the local dev server before a production build if they share output state.

For an owner-authorized sandbox provider check, use test keys, matching publishable key, the CLI listener's signing secret, local site URL and checkout/terms approval flags; leave live approval false. Forward the 14 events above to the local handler. Check successful/declined/cancel/retry/duplicate/async and refund states, reload/resume and exact request/order linkage. Never use a real payment method to prove the setup. Test deposit/balance invoice lifecycle separately in the sandbox when requested.

## Latest verified boundary — November 13, 2026

The implementation passed 80 ordinary tests, eight emulator/HTTP checks, lint, production build and browser review before this documentation consolidation. A $20 sandbox payment was confirmed in Stripe and the local saved order; it is not external real revenue. Checkout creation/cancellation and webhook receipt were also verified. Larger-service provider invoice lifecycle testing was deferred by the owner; mocked/integration coverage is not proof of live invoicing. Actual provider refund completion remains separate from the implemented refund path.

Production environment name, overlay selection, enabled secret versions, backend access, absence of Stripe console override conflicts, live endpoint settings and local sandbox separation were verified. One live Checkout session was created and immediately expired **unpaid**, without customer details or a payment method, to confirm restricted-key creation/expiration. No live charge, client invoice or payout was created for testing. Public webhook delivery and completed public checkout remain unverified until the release is available; no rollout monitoring is implied.

Production email delivery, new GA event arrival and current BigQuery export tables have not been verified by this work. Firebase CLI reauthentication succeeded; it does not authenticate gcloud/BigQuery. The last read-only BigQuery access attempt stopped for reauthentication. No reporting views, exports, IAM reporting changes or dashboard sources were created. Follow [Reporting](../reporting/README.md) for bounded validation when authorized; keep portfolio app reporting unchanged.

Before any release, review every intended changed/new file, secret exclusions and the exact staged diff. Keep `.idea/` and unrelated logs untouched/untracked. Include runtime handlers and all dependencies alongside the production overlay; shipping configuration alone is incomplete. Push only with owner authorization and report the commit/push result separately from deployment verification.
