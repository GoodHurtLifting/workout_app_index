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
