# Workout App Index

Workout App Index helps people find and compare strength-training apps using explicit requirements, transparent App Fit scoring, and evidence-backed catalog research.

## Architecture

- Next.js and React for the public finder and private catalog manager
- Firebase Authentication for owner-only catalog access
- Cloud Firestore for working catalog records, evidence, and versioned publications
- Firebase App Hosting for development and production deployments
- GitHub as the authoritative source repository

The public finder does not require an account and does not store questionnaire answers. Firestore is accessed only by authenticated server code; direct browser reads and writes are denied.

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for project creation, local setup, and deployment instructions.

## Local development

```powershell
corepack enable
pnpm install
Copy-Item .env.example .env.local
pnpm dev
```

Fill `.env.local` with the development Firebase Web app settings before testing administrator sign-in. Never commit `.env.local` or service-account credentials.

## Editorial requests

The public `/submit-app` and `/corrections` forms save requests to a private
Firestore review queue. The owner can read them and mark them reviewed at
`/admin`. Submissions never enter the public catalog automatically. Browser
access to Firestore remains denied by `firestore.rules`.

## AdSense activation

The publisher ID and `public/ads.txt` are configured for publisher
`pub-6124878930933444`. Ad serving is off until all of the following are done:

1. Confirm `workoutappindex.com` appears as **Ready** under AdSense **Sites**.
   An AdMob-linked payments account alone is not enough for website ads.
2. Configure an AdSense or other Google-certified consent message for visitors
   in the EEA, UK, and Switzerland. The site's Analytics choice is separate.
3. Turn **Auto ads** off for this site; this project uses manual placements so
   ads do not appear inside the finder or its result rankings.
4. In AdSense **Ads → By ad unit**, create three responsive display units for
   Home, Browse, and Profile. Set their numeric `data-ad-slot` values as
   `NEXT_PUBLIC_ADSENSE_HOME_SLOT_ID`, `NEXT_PUBLIC_ADSENSE_BROWSE_SLOT_ID`, and
   `NEXT_PUBLIC_ADSENSE_PROFILE_SLOT_ID` in the production App Hosting backend's
   environment settings.
5. Set `NEXT_PUBLIC_ADSENSE_ENABLED=true` for the production backend only, then
   roll out a new build. These `NEXT_PUBLIC_` values must be present at build
   time. Leave the development backend disabled.

The manual placements are below the home starting choices, after six cards in
Browse, and between profile details and related options. Ads are not shown in
questionnaire steps, rankings, or comparison tables.
