# WAI implementation history and document consolidation

Consolidated November 13, 2026. This is design history, not the live operating guide. Git retains full prior versions of retired files; unique app research and dated audit/legacy editorial records remain in this tree. No saved catalog data or public snapshot was mass-converted by this documentation cleanup.

## Earlier facts-first work

The pre-pivot checkpoint `wai-pre-facts-first-pivot-2026-11-04` resolves to `25faf4dad7911977f63abf0f030fe3314ecae2a9`. Early guides described the foundation, a proposed migration and sequential approvals; those preparation snapshots must not be treated as current blockers or current public behavior.

The additive factual migration introduced `coverageMode: "factual"`, nullable capabilities, dated value-bound claims and structured commercial disclosures. Old records and publication history were preserved. The later public-boundary change removed subjective quality/originality values from **all** public modes, rather than merely hiding them on factual cards. Historical private scoring fields remain for compatibility; an old guide's “scored mode retains display” statement is superseded.

The public rebuild introduced dedicated factual catalog/finder routes, account-free questionnaire use, source-based profiles and matching without editorial ratings. Later changes added adjacent features including wearables, the ninth questionnaire step, `fit-5`, curated rotating homepage examples and separate catalog progress labels. Use source/current guides rather than old question counts or score weights.

The original 36 retain an explicit legacy-public marker; new Candidates do not inherit it. Per-entry updates preserve unrelated public records; explicit hiding preserves saved research. Local proposals remain per-field owner acceptance, not a database overwrite at deployment. Sitemap dates require a Reviewed factual record and valid supported fact date. The owner-review regression must remain.

November 13 developer-commerce work introduced saved-details/product choice, $20 expedited listing assessment, separately scoped services, embedded Stripe Checkout, signed webhooks/reconciliation/refunds, invoice linkage, internal notification retries, supported paid placements, private aggregate reports and additive developer-funnel analytics. The current deployment guide records configuration and remaining external verification limits. A staging manifest was a task artifact, not a permanent second source of product policy.

## Where the old guides went

| Superseded root file(s) | Current destination |
| --- | --- |
| `CATALOG_REVIEW.md` | [Catalog workflow](../CATALOG_WORKFLOW.md) |
| `EDITORIAL_CONTENT_TEMPLATE.md` | [Editorial workflow](../EDITORIAL_WORKFLOW.md) |
| `CATALOG_DICTATED_REVIEW_PROTOCOL.md`, `CATALOG_DECISION_TEMPLATES.md`, `CATALOG_SCORING_RUBRIC.md` | Current editorial/catalog guides; full historical text in [Legacy editorial record](LEGACY_EDITORIAL_RECORD.md) |
| `FACTS_FIRST_IMPLEMENTATION.md`, `FACTUAL_PROFILE_MIGRATION.md`, `LEGACY_RESCORING.md`, `WAI_FRONTEND_REBUILD.md` | This history plus current catalog/site guides; full prior versions in Git |
| `FIREBASE_SETUP.md`, `DEVELOPER_COMMERCE_HANDOFF.md`, `DEVELOPER_COMMERCE_CHANGESET.md` | [Deployment and payments](../DEPLOYMENT.md); current architecture in [Site operations](../SITE_OPERATIONS.md) |
| `COMMERCIAL_SCOPE_TEMPLATE.md`, `MEASUREMENT_SPEC.md` | Moved to `docs/`; measurement release diary consolidated into deployment guide |
| `ANALYTICS_CUTOVER.md`, `ANALYTICS_SEO_AUDIT.md` | [Dated audit record](ANALYTICS_AUDIT_2026-11-05.md) |
| `RESEARCH_*.md` | Moved to [Research records](../research/README.md), evidence retained |
| Generated `CLAUDE.md` | Removed; one maintained root `AGENTS.md`; Next generation disabled with `agentRules: false` |

The root README is the maintained documentation index. The vendor license stays at its original path. Reporting keeps its own SQL runbook because its parameter/privacy instructions have a distinct operational purpose.
