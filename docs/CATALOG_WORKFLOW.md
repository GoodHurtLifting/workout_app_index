# Catalog research, editing and publication

Current November 13, 2026. This replaces the active instructions in the old catalog review, factual migration and legacy rescoring guides. The [business plan](../WAI_BUSINESS_PLAN.md) controls current policy. Public profiles and matching do not use subjective quality or originality ratings; historical private values are retained only for provenance/compatibility.

## Four separate records

| Layer | Location | Meaning |
| --- | --- | --- |
| Research evidence | `docs/research/` and private chat/working notes | Dated claims, observations, uncertainty and reasoning; Markdown is not imported into the catalog |
| Local proposal | `lib/catalog-research-drafts.ts`, related maintenance proposal modules and `lib/catalog-prepared-evidence.ts` | Structured app fields and claim-specific prepared sources shipped with the site |
| Saved private record | Firestore `catalogApps` and `evidenceSources` | Owner-editable current draft and evidence; not overwritten by a code push |
| Public listing | Versioned `catalogPublications`, with `catalogWithdrawals` | Separately approved public snapshot; a private save/proposal acceptance does not publish |

Keep stable app IDs across all layers. Do not edit an unrelated record, write research objects into plain text fields, or put raw chronology/contact details in public copy.

## Research a cohort

Most profiles start locally in cohorts of about five. First inspect the current saved fields, existing local proposal and current guidelines. Preserve populated owner values. Research missing or explicitly disputed fields using current primary sources; do not redesign the site for ordinary maintenance.

Record the exact claim, source URL, check date, platform/store country, tier/version where relevant, value supported and limitations. Evidence classes are **Officially documented**, **App-store documented**, **Developer-reported**, **Independently observed**, **Conflicting** and **Not established**. A submitted URL, old seed or unvisited page is not newly checked evidence. Developer participation is not required for independent factual coverage.

Use nullable facts and explicit unknowns when documentation is insufficient. Value-bound `factClaims` must still match the proposed value; editing a supported field does not automatically verify the replacement. Keep pricing currency, billing period, free-tier limits, trial conversion and region/date clear. Per owner guidance, if current public pricing offers no one-time purchase, record that no publicly offered one-time option was found; do not invent an unadvertised option. Avoid treating every other missing feature mention as proof of absence.

Training approach explains decisions removed and retained: a complete path, a choice of programs, adaptation, self-built plans or logging. Choose supported primary/secondary styles from the existing editor options. Describe continuity, choice load and customization where documented. Initial generation does not establish ongoing adaptive programming. A complete program is more than a single generated workout; expert programs need identifiable human authorship. Fast logging requires owner validation during use, rather than a marketing adjective.

Check nutrition, recovery, mindfulness, cardio, body composition and wearable integration. Preserve documented availability, unknowns/conflicts, paid/platform restrictions and source dates. A separate companion product is not automatically an included feature. Health-platform syncing does not imply a dedicated watch workout app. Existing catalog missing-content indicators deliberately retain unresolved human checks.

Commercial disclosure is structured: `none` for a known absence of a material WAI relationship, `material` plus a clear statement for ownership/paid or other relevant relationships, `not-established` while unresolved. Do not infer a paid relationship from an app's fame or developer submission. The Lift League has shared Turf King ownership with WAI; disclose it. Relevant commissioned work must be disclosed before publication.

Show Ryan a concise card: app/use case; training approach and tradeoff; practical platform/price/features; dated evidence and unknowns; proposed public wording; outstanding decisions. Use plain descriptions and source links rather than requiring the owner to read a data object. Never invent scores, tests or a verdict to fill a field.

## Local handoff and per-field acceptance

1. Prepare structured proposals and only genuinely checked evidence; discuss discrepancies with Ryan. Keep app-specific correspondence and completed client scopes private, outside Git.
2. Validate the relevant changes, review the entire intended diff and include every necessary new source file. An authorized push delivers proposals to admin; Markdown alone does not update a catalog card.
3. Open `/admin/apps/<id>`. A new local-only proposal needs **Save catalog record** to create its private saved card. For a saved record, **Local research update** compares **Saved now** and **Proposed** with readable structured fields. Select the individual changes to accept, then **Apply selected changes to private record**. That action saves immediately; unselected owner values stay intact. Whole-draft acceptance requires reviewing every difference.
4. A stale comparison must be reloaded and reviewed again. Never force an older proposal over newer owner work. Missing prepared source records are attached without replacing edited evidence. Acceptance does not change review status or public visibility.
5. Refresh and check the persisted fields and source log. Direct admin edits remain available. Save further manual changes separately; changing a review/work status is not a substitute for saving research fields.

## Review and public controls

The catalog list shows horizontal labels for public visibility, review progress, missing content, pending proposals and purchased services. These are independent. Review can be complete with honestly unresolved facts, and a reviewed private card is not necessarily public. Internal legacy stages (`Candidate`, `Researching`, `Evaluation ready`, `Reviewed`) coexist with the newer explicit catalog review state; do not reinterpret an old stage as automatic publication.

**Save catalog record** updates the private draft. **Preview** shows the draft's public rendering. **Update public listing** validates the required identity/description, supported platforms, price summary or explicit unknown, factual use case, resolved commercial disclosure and dated public sources. Factual identity/platform claims must have current support. It publishes only that app's approved revision and preserves all unrelated public entries. The exact gates live in `lib/catalog-entry-editing.ts` and the admin actions; optional unresolved content can remain flagged after a legitimate review.

**Hide public listing** withdraws it without deleting saved research, prior outcomes or history. Withdrawal state fails closed if it cannot be read. The original 36 have an explicit legacy-public compatibility marker; it preserves existing visibility until a specific revision/withdrawal, not permission to publish new Candidates. Gymshark Training was hidden at the owner's direction; do not restore it merely because a bundled record exists.

For factual sitemap `lastModified`, the app must be factual **and** `researchStatus === "Reviewed"`. Derive and validate its latest supported factual date once; unreviewed factual records receive no last-modified date. Do not substitute build/request time, research-draft dates or historical subjective assessments.

## Developer submissions and existing reviews

`editorialRequests` tracks developer/partnership intake and commercial work; it is not the public catalog. Multiple requests, incomplete leads, private candidates and published apps explain why inbox counts differ from public listing counts. Link a request to the right catalog ID when appropriate; research it using the same source/owner gates as internet-discovered apps. Purchased services appear on the linked catalog card but never publish it automatically.

The unified funnel and current fee/scope rules are in the [business plan](../WAI_BUSINESS_PLAN.md). Preserve requested/agreed/purchased products, historical review rounds, explicit owner outcomes and private workflow events. A stage change does not send a message or promise a retest. Historical unlisted outcomes do not prohibit later neutral factual research. A developer-reported fix is a claim until rechecked. Use the [editorial workflow](EDITORIAL_WORKFLOW.md) for optional firsthand coverage and draft-only outcome messages.
