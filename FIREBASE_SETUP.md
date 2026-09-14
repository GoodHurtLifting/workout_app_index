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
7. Add `CATALOG_ADMIN_EMAIL` as a protected App Hosting environment value, set to the Google account allowed to manage the catalog.

Do not paste service-account private keys into this repository. Firebase App Hosting supplies server credentials automatically.

## Local configuration

Copy `.env.example` to `.env.local` and fill in the Web app configuration from the development Firebase project. Set `CATALOG_ADMIN_EMAIL` to the authorized Google account.

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

## Cutover checklist

1. Verify the public finder against the development project.
2. Verify unauthorized visitors cannot open `/admin` or write Firestore data.
3. Import the preliminary catalog and publish a test snapshot.
4. Back up/export the test catalog.
5. Repeat configuration in production.
6. Connect `workoutappindex.com` to the production App Hosting backend.
7. Verify HTTPS, the root domain, and `www` before removing the temporary Sites deployment.
