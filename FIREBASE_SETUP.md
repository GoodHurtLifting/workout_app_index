# Firebase setup

Workout App Index uses two dedicated Firebase projects: one for development and one for production. Do not reuse a The Lift League project.

## One-time Firebase Console setup

Repeat these steps for the development and production projects:

1. Create a Firebase project. Recommended project IDs are `workout-app-index-dev` and `workout-app-index-prod` if available.
2. Upgrade to Blaze only when enabling App Hosting. Set a small billing budget alert first.
3. Create a Firestore database in a United States region. Use the same region for both projects.
4. In Authentication, enable the Google provider.
5. Register a Web app named `Workout App Index` and copy its configuration values.
6. In App Hosting, connect `GoodHurtLifting/workout_app_index`. Use `main` for production. Create a separate development backend or use preview deployments for development.
7. Set `CATALOG_ADMIN_EMAIL` to the Google account allowed to manage the catalog. Set `SUBMISSION_NOTIFICATION_EMAIL` separately to the inbox for new app alerts.

Do not paste service-account private keys into this repository. Firebase App Hosting supplies server credentials automatically.

## Local configuration

Copy `.env.example` to `.env.local` and fill in the Web app configuration from the development Firebase project. Set `CATALOG_ADMIN_EMAIL` to the authorized Google account. Set `SUBMISSION_NOTIFICATION_EMAIL` if alerts should go to a different address.

For local server access, authenticate Application Default Credentials:

```powershell
gcloud auth application-default login
```

Then install dependencies and run the site:

```powershell
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The private catalog manager is at `http://localhost:3000/admin`.

## Deploy database protections

After selecting the correct Firebase project, deploy only the reviewed Firestore configuration:

```powershell
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes
```

The committed rules deny all browser access. Catalog reads and writes go through the authenticated Next.js server.

## Publishing model

- Working catalog records live in `catalogApps`.
- Evidence lives in `evidenceSources`.
- Only reviewed, sufficiently sourced apps enter `catalogPublications`.
- The public finder reads the newest publication and falls back to the bundled preliminary catalog if Firebase is unavailable or no publication exists.
- Visitor questionnaire answers are not stored in Firebase.

## App submission email alerts and research handoff

The server saves each app submission in private `editorialRequests` and creates
its `editorialNotifications/app-{submissionId}` alert job in the same Firestore
transaction. The job goes to `SUBMISSION_NOTIFICATION_EMAIL` (falling back to
`CATALOG_ADMIN_EMAIL`) and contains only the app name, submission ID, and an
admin link. Corrections do not create alerts. The submission remains saved even
if email delivery fails or is not configured. Browser Firestore access stays
denied by `firestore.rules`; the admin inbox uses authenticated server code.

The server sends app alerts through Resend when both `RESEND_API_KEY` and
`SUBMISSION_NOTIFICATION_FROM` are configured. It records `PENDING`, `SUCCESS`,
or `ERROR` in the private alert job. `PENDING` with no credentials means no
email was attempted. `ERROR` means the submission was saved but the email send
could not be confirmed.
There is no background retry worker: inspect failed/pending jobs in Firestore
and the admin inbox if an expected alert does not arrive. A Resend idempotency
key based on the alert ID protects against duplicate attempts within Resend's
24-hour window. Do not also install the Firebase Trigger Email extension on
`editorialNotifications`, or it could send a second alert.

Owner setup in the production project:

1. In Resend, verify a sending domain for `workoutappindex.com` and create a
   sending-only API key restricted to that domain. Follow the DNS records Resend
   displays; do not replace Google Workspace's existing root MX records.
2. Store the key as a Firebase App Hosting secret named `RESEND_API_KEY`, grant
   the production backend access, and expose it to the runtime. Do not paste the
   key into chat, Git, a public environment variable, or a `NEXT_PUBLIC_` value.
   Firebase documents `firebase apphosting:secrets:set RESEND_API_KEY --project
   workout-app-index-prod --location us-east4`. Put the secret reference in a
   production-specific `apphosting.<environment-name>.yaml`, matching the
   production backend's Environment name under Settings > Environment. Use
   `variable: RESEND_API_KEY`, `secret: RESEND_API_KEY`, and runtime-only
   availability. Do not put it in shared `apphosting.yaml`: the development
   backend has no access to the production project's secret.
3. Set `SUBMISSION_NOTIFICATION_FROM` to the verified sender, for example
   `Workout App Index <notifications@workoutappindex.com>`. The receiving address
   remains `ryan@workoutappindex.com`. These are different roles; the Workspace
   alias does not need to be changed.
4. After the code and runtime configuration roll out, submit one clearly marked
   test app. Check the private `editorialRequests` record, matching alert job
   with `delivery.state = SUCCESS`, and received email. The alert does not prove
   publication or catalog review.

In `/admin`, each app submission has **Copy research brief**. This copies the
submitted claims and public links but excludes the separate submitter name/email
fields. Review the free-text description for personal details before sharing.
Treat the brief as unverified input; research and owner approval are still required before
marking a catalog entry `Reviewed` or publishing it. Older jobs created before
this sender exists are not sent retroactively.

## Cutover checklist

1. Verify the public finder against the development project.
2. Verify unauthorized visitors cannot open `/admin` or write Firestore data.
3. Import the preliminary catalog and publish a test snapshot.
4. Back up/export the test catalog.
5. Repeat configuration in production.
6. Connect `workoutappindex.com` to the production App Hosting backend.
7. Verify HTTPS, the root domain, and `www` before removing the temporary Sites deployment.
