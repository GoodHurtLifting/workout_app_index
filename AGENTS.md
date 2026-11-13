# WAI assistant instructions

- Work on this existing site and its existing Firebase projects. Do not create new Firebase, cloud or Android projects.
- Read `README.md` for the documentation map and `WAI_BUSINESS_PLAN.md` for current product policy. Use current guides in `docs/`; dated research and `docs/archive/` are evidence/history, not instructions overriding current policy.
- Check branch, remote, status and diffs before changes. Preserve unrelated work. Stage explicit intended paths, including new files; leave `.idea/`, secrets, logs and temporary work excluded.
- Run appropriate tests, lint and the production build before release. Commit/push requires owner authorization and triggers WAI deployment. Do not separately deploy or monitor rollout unless asked.
- Catalog maintenance fills evidence-backed gaps using existing fields. Preserve saved owner values and per-field proposal acceptance; private saves, review completion and publication are distinct. See `docs/CATALOG_WORKFLOW.md`.
- Do not invent firsthand observations or treat unknown facts as false. Do not send developer messages without explicit authorization. Keep client-specific correspondence, credentials and completed agreements out of Git.
- Before Next.js code changes, read the relevant installed guide in `node_modules/next/dist/docs/`; this version can differ from remembered APIs. `agentRules: false` in `next.config.ts` prevents duplicate generated assistant files. Maintain this one file deliberately.
