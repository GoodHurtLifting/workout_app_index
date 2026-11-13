# Workout App Index

WAI helps people choose workout apps through sourced factual profiles, an account-free finder and selected, clearly scoped firsthand coverage. This is the existing Next.js site and Firebase deployment, not a new Android or cloud project.

## Documentation

| Guide | Purpose |
| --- | --- |
| [Business plan](WAI_BUSINESS_PLAN.md) | Current strategy, products, independence and priorities |
| [Site operations](docs/SITE_OPERATIONS.md) | Public routes, questionnaire, saved data, admin and reporting |
| [Catalog workflow](docs/CATALOG_WORKFLOW.md) | Research cohorts, missing fields, local proposals, owner approval and publication |
| [Editorial workflow](docs/EDITORIAL_WORKFLOW.md) | Dictated observations, source packs and developer message templates |
| [Deployment and payments](docs/DEPLOYMENT.md) | Existing Firebase setup, Stripe, notifications, local checks and release boundaries |
| [Commercial scope template](docs/COMMERCIAL_SCOPE_TEMPLATE.md) | Reusable larger-service agreement; completed client versions stay private |
| [Measurement specification](docs/MEASUREMENT_SPEC.md) | Catalog and developer event contracts and privacy boundaries |
| [Reporting runbook](reporting/README.md) | Bounded read-only SQL and dashboard preparation |
| [Research records](docs/research/README.md) | Dated app evidence, distinct from current policy or saved catalog state |
| [Implementation history](docs/archive/IMPLEMENTATION_HISTORY.md) | Earlier migration decisions and superseded guide map |
| [Historical editorial records](docs/archive/LEGACY_EDITORIAL_RECORD.md) | Retired scoring method and historical correspondence guidance |
| [Dated analytics audit](docs/archive/ANALYTICS_AUDIT_2026-11-05.md) | Console observations and access limits at the time of the audit |

Use the current guides for new work. Historical research, scores and audit snapshots do not establish current product behavior, publication or live configuration. `AGENTS.md` is the single assistant instruction file; Next.js automatic `AGENTS.md`/`CLAUDE.md` generation is disabled.

## Local development

Work in `C:\dev\projects\workout_app_index`, the folder opened in Android Studio. Use Node 24 (the production runtime); dependencies and the supported minimum are recorded in `package.json`. Install from `pnpm-lock.yaml` with `pnpm install --frozen-lockfile`. Copy `.env.example` to ignored `.env.local` only when it does not already exist, then supply the existing development Firebase web configuration and authorized owner email. Server access needs appropriate Application Default Credentials or local emulators; see the deployment guide.

```powershell
npm.cmd run dev
```

The default URL is `http://localhost:3000`; the private owner area is `/admin`. Do not replace an existing environment file or mix live and sandbox Stripe credentials.

## Validate and release

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

Commerce integration checks have a separate guarded emulator setup in the deployment guide. Review all intended modified and new files, stage explicit paths and exclude `.idea/`, environment files, logs and temporary work. Commit and push only with owner authorization: pushing `main` is this project's deployment workflow. Do not run an additional deployment or wait for rollout status unless requested. Public release success is separate from a successful push.
