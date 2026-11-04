# Facts-first release record — November 4, 2026

## Governing direction and checkpoint

WAI maintains a broad, sourced factual catalog, selectively produces firsthand editorial content where consumer interest justifies testing, and separately offers paid private testing and product research. WAI_BUSINESS_PLAN.md is the exact supplied plan, retained at the repository root alongside existing operating documents.

- Repository: https://github.com/GoodHurtLifting/workout_app_index
- Checkpoint branch: `main`
- Checkpoint commit: `25faf4dad7911977f63abf0f030fe3314ecae2a9`
- Annotated tag: `wai-pre-facts-first-pivot-2026-11-04`
- Tag object: `1f0f9e3f7b33bcccdb99101b003e557f7b464d21`
- Remote branch and peeled tag were verified with `git ls-remote` before implementation branch creation.
- Implementation branch: `facts-first-pivot-2026-11-04`
- Checkpoint added only the existing sitemap helper and regression test referenced by already committed app/sitemap.ts. Unrelated `.idea/` files were excluded and preserved.

No new Firebase, cloud, Android, hosting, analytics, or payment project is created. This is local work on the existing site. No deployment or catalog publication has occurred.

## Source findings

- `lib/catalog.ts`: AppRecord already includes price, nullable monthlyPrice, platforms, AI status, features, authorship, program/free-tier flags, and optional trainingRelationship. TrainingRelationship describes planningStyle, choiceLoad, continuity, customization, decisionsRemoved, decisionsRemaining, tradeoff, idealUser, and notFor. Both profile renderers already use **How this app expects you to train**. No `programming_model` field is needed.
- `lib/catalog-prepared-evidence.ts` and `lib/catalog-repository.ts`: claim-specific source types, URLs, checked dates, public/private visibility, and internal notes already exist. The saved source type is not a separate evidence-status enum and has no field-level conflict/unknown representation. Structured claim-state changes need design rather than inferred verification.
- `lib/catalog-review-readiness.ts`: approval combines scores and training relationship and rejects zero/unassessed score placeholders. `app/admin/actions.ts` enforces saved-card and owner gates. Publication remains separate, with a selection decision for new submitted apps.
- `components/app-profile-content.tsx` and `components/workout-app-index.tsx`: scores are rendered numerically; standalone related apps sort by Legit. Browse and comparisons also assume numeric scores. Public sources are gated on Reviewed status.
- `lib/matching.ts`: Fit primarily uses product facts and user preferences. At the checkpoint, **Distinctive experience** used Originality score for up to 12 points. The owner subsequently approved removing this preference and bonus in fit-2; current Fit no longer reads editorial scores. Required booleans cannot distinguish an unverified feature from an established absence.
- `lib/editorial-requests.ts`: private Firestore queue, schema validation, honeypot, three requests per email/day and 100 site-wide/day, 30-item pagination, and existing owner alerts for app submissions. Commercial inquiry variants reuse storage and rate limits, are explicitly classified private, and do not send messages or touch catalog records. All browser Firestore access remains denied.
- `lib/analytics.ts`, `components/analytics-consent.tsx`, and ANALYTICS_CUTOVER.md: custom events require consent, reject admin paths, catch analytics failures, and can wait for tag readiness. Historical GA4 Enhanced Measurement settings need owner verification before release; local code is not proof of current console settings.
- No established business-doc subdirectory existed. Existing operating Markdown lives at the repository root.

## Local behavior implemented

- `/services`: $95 Focused Human Test, $225 Launch Experience Review, and Competitive Product Audit from $350; Request a scope form, agreed boundaries before payment, no checkout, and commercial-independence disclosures.
- `/partnerships`: affiliate/referral/qualified-lead, sponsorship/advertising/founder-spotlight, market research, possible intelligence monitoring, and future licensed-data explanations. Subscription, professional finder, and API infrastructure remain demand-gated.
- Both forms POST to the existing editorial-request endpoint, validate fixed topic options, and confirm only a server HTTP 201 with `ok: true`. Saved inquiries appear as distinctly labeled private requests in the existing authenticated paginated owner inbox, with Mark seen but no app-research, score, publication, payment, or agreement controls.
- Editorial/scoring policy, submission wording, footer and information links, sitemap paths, privacy text, and internal research wording reflect the new operating direction. Submission remains free and separate from commercial inquiries.
- No app records, saved statuses, existing public score values, or public snapshots are changed. The subsequently approved fit-2 finder change removes only the Distinctive experience option and Originality-based bonus; all other preference weights and exclusions remain unchanged. Facts-first preparation is enabled in documentation; **unscored factual-profile publication remains blocked by the current schema and approval gate**.

## Score and profile migration recommendation — approval required

Do not weaken the existing approval gate or fill unknowns with zero/false to make a factual profile publish. Approve a separate additive migration before changing public score behavior:

1. Add an explicit coverage mode for factual profiles versus scored hands-on coverage. Preserve existing record values and publication snapshots; legacy records retain their existing scored rendering by default. Avoid inferring mode from a missing assessment alone, since legacy preliminary scores also lack assessments.
2. Add claim-level evidence status, dated source references, context, unknowns/conflicts, and material-commercial-relationship disclosure. Retain the current Source log; do not convert seeded catalog entries into rechecked evidence. Verification dates are factual checks, not score dates or deployment dates.
3. Let factual-profile approval validate supported identity, sources, pricing/platform context, training relationship where established, unknowns, and disclosures without requiring editorial scores. Retain exact saved-record owner approval and a separate publication step.
4. Render factual profiles without numeric score badges, zero placeholders, aggregate-rating metadata, or a review claim. Update both profile renderers, browse/sort controls, related options, comparison cells, metadata, admin editors, proposal acceptance, and publication validation together. Existing scored profiles remain unchanged until individually reviewed.
5. Introduce unknown-aware finder facts. Hard constraints exclude unsupported matches with an uncertainty explanation, not a false absence claim. The owner approved removing **Distinctive experience** from the finder and removing its Originality-based bonus in fit-2. Recognize successful differences through selected editorial coverage; no automated identity descriptor or invented neutral Originality score is required. Existing Originality values and publication snapshots remain intact.
6. Pilot five to ten profiles with measured owner minutes, source coverage, and conflict counts in the existing Firebase project. Verify round trips, legacy preservation, source dates, publication boundaries, unknown handling, comparisons, and Fit behavior before a broader rollout.

This release deliberately stops at this schema boundary. It is the commercial and editorial foundation, not a completed unscored-catalog migration. Structured disclosure is also required before paid private findings materially inform a public profile.

## Analytics added

All new events use a fixed relative `page_location` (`/services` or `/partnerships`) and an empty `page_referrer`, overriding inherited full URLs for these custom events. No names, emails, phone numbers, messages, organizations, app/submission IDs, health data, topic free text, or full URLs are passed.

| Event | Trigger |
| --- | --- |
| services_page_viewed | Services form/page component rendered while consent and tag are available; once per mount |
| scope_request_started | First nonempty service-form interaction per form session; excludes honeypot |
| scope_request_submitted | Confirmed HTTP 201 and `ok: true` after save |
| partnerships_page_viewed | Partnership form/page component rendered while consent and tag are available; once per mount |
| partnership_inquiry_submitted | Confirmed HTTP 201 and `ok: true` after save |
| commercial_outbound_selected | Email fallback selected; no destination address or URL, never counted as submission |

Page interest is a custom funnel event, not an extra manual `page_view`. Start/view events are not retroactively invented for a visitor who had declined analytics. Commercial inquiry completion events can wait for tag readiness only when consent was already granted. Existing GA4 automatic pageviews remain separate from this fixed-parameter contract.

## Decisions and release gates for Ryan

- Approve the score/unknown-state migration before unscored publication is implemented.
- Approve the service wording, validation prices, prospective retirement of paid editorial-priority offers, and actual treatment of any previously agreed scopes. Historical review-round data and paid-followup controls are retained for existing work; they are not a new public offer.
- Review all manual validation output and the local page/form experience before authorizing any deployment or publication.
- Verify the data-flowing GA4 stream; disable automatic **Form interactions** and **Outbound clicks** as already required by CATALOG_REVIEW.md and ANALYTICS_CUTOVER.md, preserving automatic page views. Console settings were not changed or verified here. Automatic form/click tracking can otherwise collect misleading transitions or URLs despite safe custom events.
- No affiliate agreement, referral sharing, sponsorship reach claim, payment-provider change, developer outreach, subscription infrastructure, or new project is authorized by these local files.

## Manual verification

Use the existing local development configuration, not production writes. From Android Studio's PowerShell terminal, start the site with `npm.cmd run dev`. Use local emulators or the existing development environment with owner-approved test data for form-save checks. No live form submissions were made in this chat.

1. Open http://localhost:3000/services and /partnerships at desktop width and 375px. Check headings, readable prices, all select options, visible labels, keyboard focus, form status, and no horizontal overflow. Verify footer/info links on home, standalone profiles, and information pages, and both URLs in /sitemap.xml.
2. Decline analytics and inspect Network: all new events stay absent while pages, controls, and forms remain usable. Accept analytics and verify one appropriate page-interest event per mount; React development effects do not duplicate it. Inspect payloads for fixed relative paths and absence of query strings or contact fields.
3. With consent granted, enter the first nonempty service field: one scope_request_started. Further typing/select changes do not repeat it. A reset after a successful new inquiry allows another session start. Partnership form does not emit scope starts.
4. Submit each form once against the development backend. Expect HTTP 201 with ok true, a reset and receipt, one confirmed completion event, and a correctly labeled private inquiry in /admin with organization and topic. Mark seen; verify after reload. Inspect older pages to confirm pagination still includes the inquiries. No app Candidate or notification should be created.
5. Force validation errors, unknown kind/topic, rate-limit response, backend/network failure, and honeypot HTTP 200/ok false. Confirm no successful receipt or completion event. Try rapid double submission; one pending form request should be allowed. Saved names/messages stay private and never appear in analytics.
6. Select email fallback: commercial_outbound_selected only, never a confirmed submission. Block analytics/tag loading and confirm actions and error handling still work. Verify /admin routes remain analytics-free.
7. Recheck existing free app submission and correction forms. Only app submissions retain the existing owner-notification behavior. Confirm commercial requests have no app decision controls and cannot be accepted for research through server actions.
8. Compare representative existing profile scores, browse order, comparisons, Fit results for all remaining preferences, saved owner edits, and legacy-public visibility with the checkpoint. No score/catalog migration is part of this release. Do not publish to perform this check.

## Manual validation commands

Run from the existing Android Studio PowerShell terminal. Send the complete output back before deployment. npm.cmd uses the existing package scripts; do not install or replace dependencies as part of these commands.

```powershell
Set-Location 'C:\dev\projects\workout_app_index'
git branch --show-current
git status --short
git diff --check
npm.cmd run lint
node --experimental-strip-types --test tests/commercial-inquiries.test.mjs tests/commercial-analytics.test.mjs tests/analytics.test.mjs tests/submission-workflow.test.mjs tests/catalog-review-stage.test.mjs tests/sitemap.test.mjs
$waiAllTests = @(Get-ChildItem -LiteralPath .\tests -File -Filter '*.test.mjs' | Sort-Object Name | ForEach-Object { $_.FullName })
node --experimental-strip-types --test @waiAllTests
npm.cmd run build
```

The explicit file list is the targeted suite. The enumerated list runs every current *.test.mjs in tests, including public-catalog checks and both new commercial suites. The existing package test:catalog script alone is not the complete suite. Commands above are separate; inspect failures before proceeding. No full lint, further test run, or production build was run after the implementation request. Earlier, before that instruction arrived and before edits, 26 existing checks passed; that result does not validate this implementation.

## Changed-file manifest

Business and editorial documents:
`WAI_BUSINESS_PLAN.md`, `FACTS_FIRST_IMPLEMENTATION.md`, `EDITORIAL_CONTENT_TEMPLATE.md`, `README.md`, `CATALOG_REVIEW.md`, `CATALOG_DICTATED_REVIEW_PROTOCOL.md`, `CATALOG_SCORING_RUBRIC.md`, `CATALOG_DECISION_TEMPLATES.md`.

Public pages and presentation:
`app/services/page.tsx`, `app/partnerships/page.tsx`, `app/editorial-standards/page.tsx`, `app/how-we-score/page.tsx`, `app/submit-app/page.tsx`, `app/globals.css`, `components/public-information-layout.tsx`, `components/workout-app-index.tsx`, `components/app-profile-content.tsx`, `components/editorial-request-form.tsx`, `lib/sitemap-entries.ts`.

Private inquiry intake and research wording:
`components/commercial-inquiry-form.tsx`, `lib/commercial-inquiries.ts`, `lib/editorial-requests.ts`, `app/admin/page.tsx`, `app/admin/actions.ts`, `lib/submission-workflow.ts`, `components/copy-research-brief.tsx`.

Analytics and unrun checks:
`lib/commercial-analytics.ts`, `ANALYTICS_CUTOVER.md`, `tests/commercial-inquiries.test.mjs`, `tests/commercial-analytics.test.mjs`.

All paths are relative to C:\dev\projects\workout_app_index. The unrelated .idea directory is excluded. Development-preview generated files are not part of the release.

## Verification performed in this chat

- Pre-implementation checkpoint commit and annotated tag verified remotely.
- Business plan copied without alteration from the supplied attachment.
- TypeScript check: `node node_modules/typescript/bin/tsc --noEmit --incremental false` passed. Full lint/test/build results remain separate and pending.
- `git diff --check` passed at source review.
- Both commercial routes returned HTTP 200 in the local development preview. Browser inspection confirmed content, form labels/options, and navigation. Desktop styling and 375px layouts were inspected; both narrow-screen document widths stayed within the viewport. The first Turbopack preview omitted styles; restarting the development server with `npm.cmd run dev -- --webpack --hostname 127.0.0.1 --port 3000` restored them without a configuration change. Verify the production CSS in the owner-run build before release. No form was submitted and no Firebase data was written.
- Full lint, all post-change tests, production build, backend persistence/owner inbox runtime checks, and analytics delivery remain for manual validation. Added tests are authored, not reported as passing.

## Approved finder adjustment — November 4, 2026

The owner approved removing Distinctive experience as a finder preference. `lib/matching.ts` no longer imports or reads Originality and exports `fitMethodologyVersion = "fit-2"`; future publication metadata uses that constant. Existing publication documents are not rewritten. All remaining weights, hard exclusions, and the 98-point cap are preserved. Existing saved finder results that contain the removed answer fail the current option validation and reset on restoration, rather than silently converting the visitor's preference. Other saved answers remain valid.

Existing Legit and Originality scores and profile rendering are untouched. The editorial template now explains how to credit meaningful differences, beneficiary, comparison set, tradeoff, and successful tested execution without automated originality judgments. The unscored-profile migration remains a separate approval decision.

Files for this follow-up: `lib/matching.ts`, `components/workout-app-index.tsx`, `app/admin/actions.ts`, `app/how-we-score/page.tsx`, `EDITORIAL_CONTENT_TEMPLATE.md`, `FACTS_FIRST_IMPLEMENTATION.md`, and `tests/matching.test.mjs`.

The owner's supplied output confirmed 17 targeted tests and 31 complete tests passed, lint reported no errors, and the production build completed for the prior foundation commits. Those results precede this finder adjustment. No post-adjustment lint, tests, or production build was run by the agent. Run `node --experimental-strip-types --test tests/matching.test.mjs` for the new targeted regression checks, then the complete manual validation commands above. Recheck that What matters most? no longer offers Distinctive experience and the existing Originality displays are unchanged. Nothing was deployed or published.
