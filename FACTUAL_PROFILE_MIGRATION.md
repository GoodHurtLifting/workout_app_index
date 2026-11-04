# Factual-profile migration — November 4, 2026

Ryan approved implementation after the commercial foundation and removal of Distinctive experience. This is an additive code migration in the existing repository and Firebase project. No live record, score, review status, publication snapshot, withdrawal, or developer correspondence is changed by this work. There is no bulk data migration script. Deployment and catalog publication remain unauthorized.

## Coverage and compatibility

- `coverageMode: "factual"` means an unrated, sourced factual profile. Omitted mode and explicit `scored` retain the legacy scoring path and existing numeric displays. Existing scores are neither deleted nor recalculated automatically.
- `legit` and finder capability booleans accept null as unknown. Unknown is not false, zero, a neutral score, or an independently confirmed absence. Existing stored booleans/numbers remain valid without backfill.
- New intake Candidates and the new owner-only **Create private factual draft** action start as factual, unrated, and unknown. Creating a proactive draft requires no developer submission or participation and cannot overwrite an existing catalog record. Existing submission links, owner outcomes, legacy visibility, and separate publication controls are preserved.
- The editor can switch an individual draft's coverage explicitly. Factual saves preserve the actual saved historical scores, not an unsaved legacy rescoring overlay. Private legacy research can still be reviewed separately. Returning to scored coverage requires completing the usual supported score fields and approval checks.

## Dated claims and uncertainty

`factClaims` is a per-field reconciled evidence log with these six classes: Officially documented, App-store documented, Developer-reported, Independently observed, Conflicting, and Not established. Each claim contains a public statement, actual check date, source URL where appropriate, platform/country/tier/version and evidence limits, and the value checked.

The public log uses readable field labels. Notes here are public evidence summaries, not private chronology, credentials, or contact details. Detailed private notes stay in the existing private research files and Source log.

Claims are bound to their checked value. Editing a supported field makes the old claim stale; it no longer supports approval, matching, or the factual check date. The owner/researcher must explicitly recheck the current value when saving, or prepare a new value-bound local proposal. Duplicate field entries, invalid dates, future dates, and documented claims without public URLs are rejected. Conflicts are reconciled into one field entry rather than multiple competing verification markers.

Identity, pricing, platforms, AI, features, and the training relationship each need a current dated claim or explicit unknown. Identity and at least one platform must be supported, and at least one current public primary source must exist. Additional populated finder facts need their own current support; unsupported capability values remain null, arrays empty, and classifications unknown. Unverified price summaries say Not established, Not verified, or Conflicting, with no invented numeric price. No score is required for factual approval.

`commercialDisclosure` records none, material, or not-established plus public wording. Factual approval requires the relationship to be resolved; material relationships require a meaningful disclosure statement. Profiles render that statement. Existing Turf King ownership disclosure remains visible. An explicitly unresolved disclosure on an edited scored record also blocks approval; older scored records without this new field retain compatibility.

## Finder and public behavior

- Fit version `fit-3` retains the fit-2 weights, exclusions, 98 cap, and removal of Distinctive experience. Legacy scored inputs keep their previous matching behavior.
- Factual matching uses only current supported facts. Developer reports, conflicts, stale entries, and unknowns do not earn points or satisfy hard requirements. Failure to establish a hard requirement produces an uncertainty explanation rather than claiming the app lacks a feature.
- Fast logging requires its own independently observed feature claim. A marketing category alone cannot earn fast-logging points. Automatic-progression matching for factual profiles needs an explicit supported Automatic progression feature; generic adaptive marketing is insufficient.
- Factual standalone and in-app profiles display **Factual profile · Unrated**, practical facts, training approach, dated attributed sources/unknowns, and commercial disclosures. They show no Legit or Originality score, preliminary rating, numeric placeholder, review title, or aggregate-rating metadata.
- Browse cards, comparison cells, and the featured fallback identify factual profiles as unrated. Comparisons do not turn unsupported facts into established claims. Related options on both profile types use the number of overlapping supported goals, then alphabetical ordering, not editorial scores. This keeps unrated apps out of numeric quality comparisons.
- Public snapshots and the catalog API strip factual Legit/Originality assessment payloads and expose `legit: null`. Private historical scores stay in the saved record. Snapshot comparison and withdrawal restoration compare that public representation, preserving the exact-current-card safeguard.
- Sitemap dates for owner-reviewed factual profiles derive from current dated facts, never request/build time. Researching/Candidate records gain no publication shortcut.
- Source-based approval replaces the old score/source-keyword gate only for explicit factual mode. Scored records retain their former source requirements. Publication revalidates saved profile completeness, preserves new-submission selection decisions, and remains a separate owner action.

## Files changed

Schema, sources, matching and persistence: `lib/catalog.ts`, `lib/catalog-facts.ts`, `lib/catalog-review-readiness.ts`, `lib/catalog-proposals.ts`, `lib/catalog-research-drafts.ts`, `lib/legacy-score-drafts.ts`, `lib/catalog-repository.ts`, `lib/matching.ts`, `lib/sitemap-entries.ts`.

Owner workflow: `components/catalog-review-form.tsx`, `components/fact-claims-editor.tsx`, `app/admin/actions.ts`, `app/admin/page.tsx`, `app/admin/apps/[id]/page.tsx`, `app/admin/admin.css`.

Public presentation: `components/factual-profile-content.tsx`, `components/app-profile-content.tsx`, `components/workout-app-index.tsx`, `app/apps/[id]/page.tsx`, `app/editorial-standards/page.tsx`, `app/how-we-score/page.tsx`.

Regression fixtures/checks: `tests/fixtures/factual-profile.ts`, `tests/factual-profile.test.mjs`, `tests/matching.test.mjs`.

Operating documents: this file, `CATALOG_REVIEW.md`, `CATALOG_DICTATED_REVIEW_PROTOCOL.md`, `CATALOG_SCORING_RUBRIC.md`, `FACTS_FIRST_IMPLEMENTATION.md`, `README.md`.

## Manual validation before deployment

TypeScript compatibility and diff whitespace are checked by the agent. New tests are authored, not claimed as passing. Earlier 33/33 test and production-build results precede this migration. Do not treat them as migration validation.

```powershell
Set-Location 'C:\dev\projects\workout_app_index'
git branch --show-current
git status --short
git diff --check
npm.cmd run lint
node --experimental-strip-types --test tests/factual-profile.test.mjs tests/matching.test.mjs tests/public-catalog.test.mjs tests/catalog-review-stage.test.mjs tests/sitemap.test.mjs
$waiAllTests = @(Get-ChildItem -LiteralPath .\tests -File -Filter '*.test.mjs' | Sort-Object Name | ForEach-Object { $_.FullName })
node --experimental-strip-types --test @waiAllTests
npm.cmd run build
```

Use the existing emulator/development configuration for owner workflow checks. Do not write test data into production and do not publish merely to test this code.

1. Create a private factual draft from the dashboard. Confirm no developer submission, notification, score, or public listing is created. Try the same app name again; the prior card must remain unchanged.
2. Prepare dated public identity/platform sources and the remaining required claims or explicit unknowns. Leave optional unknown capabilities as Not established. Record the commercial relationship as none or a clearly described material relationship. Save, reload, and inspect persisted claims and nulls.
3. Marking Reviewed must fail for missing/stale claims, unresolved disclosure, invented known values backed only by developer reports, or unsupported identity/platforms. A complete sourced factual card can be approved without numerical scores. No app becomes public merely because it is Reviewed.
4. Change a sourced value without rechecking. Confirm the stale claim blocks approval and earns no matching points. Explicitly recheck against a source, save, and confirm the new value/date/context after reload.
5. Preview factual versus legacy scored profiles, cards, comparison, and metadata at desktop and 375px. Factual views must show no ratings or implied hands-on review; legacy scores must match the checkpoint. Inspect disclosure and dated sources. Unknown feature lists and prices must not imply absence/free access.
6. Test free-only, complete-program, adaptive, AI-avoidance, equipment, and price constraints against unknown factual records. Expect exclusions described as uncertainty. Source a positive capability and confirm only the supported preference changes the result. First-party fast-logging claims alone earn no fast-logging points.
7. In a development-only publication flow, confirm exact owner approval and any linked submission selection remain required. Inspect the public snapshot/API: factual numeric assessments absent, legacy ratings unchanged. Reopen a reviewed factual card, change it, and check that prior public content remains until separately published. Check withdrawal/restore with the exact current public representation.
8. Pilot five to ten actual profiles with research prepared by WAI and measure owner verification minutes. Aim for zero to approximately ten minutes without forcing scores or broad testing. Record source gaps before extending the model. This pilot has not been executed here.

The business plan is unchanged. No new analytics event, external service, project, payment flow, outreach, deployment, live-data backfill, or public publication is introduced by this migration.

## Verification performed

- TypeScript compatibility checked with `node node_modules/typescript/bin/tsc --noEmit --incremental false`; diff whitespace checked separately.
- Synthetic factual profile and owner editor rendered in an isolated local development preview. The profile displayed unrated coverage, explicit unknowns, dated source classifications, and no numeric ratings. The editor showed unknown/yes/no selectors; factual score fields were hidden, disabled through their fieldset, and excluded from browser validation.
- Desktop and 375px profile/editor layouts inspected; document widths remained within the narrow viewport. A synthetic screenshot is retained in the chat workspace, outside the repository.
- No preview form was submitted, no owner workflow was exercised against Firebase, and no real product claim was researched or changed. The temporary preview route and generated agent files are removed before commit.
- Post-migration lint, tests, production build, persisted-data round trips, approval/publication/restore flows, and a real five-to-ten-profile timing pilot remain for manual development-environment validation. The synthetic visual check is not proof of those behaviors.
