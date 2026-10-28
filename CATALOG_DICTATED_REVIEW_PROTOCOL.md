# Dictated product review protocol

Use this for every new app and substantial reassessment. This is an interviewer guide for WAI, not a form for the owner or another publication gate. The owner may narrate in any order, by voice, during ordinary use. Do not require a new workout, a support request, or a return visit solely to complete this guide. Record `not observed` when appropriate. Refer to [the scoring rubric](CATALOG_SCORING_RUBRIC.md) before proposing numbers.

## 1. Prepare before asking the owner

Research the official product site, current store listing in a named country, current pricing/free-tier terms, privacy policy, help/support material, and any relevant creator or program source. Record URL, access date, region, and exactly which claim each page supports. A developer submission is a lead, not verification. Make a short claim inventory, flag conflicts, and identify only the high-impact gaps that owner use could clarify. Do not ask the owner to rediscover facts that are already documented.

The pre-use brief should take at most a few lines: the product's stated job, its apparent programming model, the access tier, and two or three specific questions worth noticing. These are prompts, not a testing assignment.

### Normal-review testing limit

Budget approximately 60-90 minutes of hands-on use for a routine catalog review, separate from public-source research and drafting. Follow one primary-user journey, allow one reasonable retry after a barrier, and try one obvious alternative route if one exists. Stop when the main journey and material tradeoff are understood, or when the timebox and retry/alternative limit are reached. The owner may continue using an app voluntarily, but extra use is not a publication prerequisite and does not automatically make the review a paid audit.

Do not troubleshoot accounts beyond that ordinary retry, coordinate special tester access, test unreleased builds, or help a developer repair a blocked workflow as part of catalog research. If a consequential feature remains inaccessible, record the attempted path and disclose the limitation; do not claim the feature is absent or working. A subscription or access barrier may be described from current public terms without purchasing access solely to finish a catalog card.

## 2. Listen for the same seven checkpoints

Let the owner dictate naturally. Track these checkpoints silently and ask a short follow-up only when a material field remains unclear. Ask what happened, not for a 0-100 rating or a feature count. Capture device, app version if known, date, country/store, access tier, goal, and whether a workout was actually performed or only explored/simulated.

| Checkpoint | Follow-up only if missing | Primary catalog use |
| --- | --- | --- |
| Entry and access | What could you do before a paywall or trial? Did permissions or setup prevent reaching training? | Price, usable free tier, value, access caveat |
| Program and choice | What plan or session did it produce, and what did you still have to choose or build? | Complete program, library, authorship, planning style, choice load, fit |
| Workout and **logging** | How did you start, enter a set, change it, and finish? Which steps felt clear or cumbersome? | Core execution, usability, fast-logging claim, features |
| Adaptation and continuity | What changed after performance, a missed session, or a return? Was the next action visible or did you have to find it? | Adaptive programming, progression, continuity, tradeoff |
| Feedback and history | What did the app show after the session, and could you find the prior sets or progress you expected? | History/analytics features, usability, value |
| Support and privacy | If you actually sought help or encountered data controls, what happened? Otherwise, leave support response and real data handling untested. | Support/privacy rationale and any concrete caveat |
| Identity and fit | What was genuinely distinctive in use, what was familiar, and who would find the tradeoff worthwhile? | Best for, not for, originality dimensions, central tradeoff |

The owner does not need to cover every checkpoint in one session. Do not interpret silence as a failed feature. A simulated log is not a completed workout. A proposed AI change is not an applied change until observed. A visible button is not proof that the underlying operation succeeds. Stop at the normal-review limit rather than extending testing merely to fill every checkpoint.

## 3. Reconcile claims and observations

For every material statement in the draft card, keep a compact evidence record: claim, source class, date/version/region/tier, what was actually observed or documented, conflict or limitation, and affected catalog field. Use these classes:

- **Owner observed:** action and result in the tested product. Preserve the test context; distinguish a one-off observation from a repeated defect.
- **Officially documented:** current site, store, policy, or help-page statement. This verifies what the publisher says, not necessarily product behavior.
- **Developer reported:** submission or correspondence. Use as a question to verify, never as independent corroboration.
- **Editorial inference:** WAI's fit, tradeoff, comparison, or score judgment. State the underlying observations and comparison set.
- **Unresolved:** missing, stale, contradictory, or untested. Qualify or omit the public claim; do not silently turn it into `false` or into a confirmed feature.

When sources conflict, prefer a directly observed current path for that device/tier, then current store or policy language for platform/pricing/privacy statements. Do not generalize one owner's experience to all platforms, countries, or users. A focused factual clarification may be requested when useful, but developer participation is not required. If an answer does not arrive, qualify or omit the claim rather than delaying a bounded review. A developer answer can correct facts but cannot set a WAI score.

### Developer interaction boundary

Developer participation is not required before publication. WAI does not provide routine progress updates, advance score negotiation, or prepublication approval. Developers may submit documented factual corrections and material product updates through the site's correction channel. Editorial calls or email exchanges are not customer-support tests and do not earn Support/privacy points. If a developer changes the live product, score the verified product behavior in the relevant dimension; record the version/date and do not award a separate responsiveness bonus. When a bounded evaluation ends without a scored public entry, record the owner outcome in admin and draft the personal developer message using Outcome B in `CATALOG_DECISION_TEMPLATES.md`. Keep the message tied to the tested release and at most three grouped material findings; do not send it automatically or treat developer contact as a retest.

## 4. Translate to catalog fields consistently

Populate `type`, `description`, `bestFor`, `caveat`, `goals`, `level`, `platforms`, and the training relationship from the reconciled record, not from the developer's marketing category alone. State the decisions the app removes and those the user still owns. Choose one primary planning style and only documented or observed secondary styles. Do not label initial workout generation as ongoing adaptive programming.

Finder-sensitive labels require consistent meanings:

| Label or flag | Use only when evidence supports |
| --- | --- |
| Complete program | A coherent multi-session training path, not just one generated workout. |
| Program library / Expert programs | Multiple selectable reusable programs; `Expert programs` additionally needs identifiable human authorship. |
| Adaptive programming | The plan or upcoming sessions respond to performance or changing constraints, not merely to initial questionnaire answers. |
| Automatic progression | The product proposes or applies future loads, reps, or difficulty from prior performance; document whether approval is required. |
| Fast logging | A tested set-entry flow that remains quick and intelligible during a workout; do not infer it from a store adjective. |
| Detailed analytics | Interpretable trends or analyses beyond a basic workout-history list. |
| Offline use | Explicit current documentation or a direct offline test; do not infer from local caching. |
| Human coaching / Community | Actual human coach interaction / user-to-user activity, not an AI assistant or a founder's public forum alone. |
| Usable free tier | The core advertised job remains usable without a time-limited trial or mandatory payment. Record which program features are free separately. |

Use the exact finder-sensitive labels in `lib/matching.ts` when supported; keep other notable features descriptive rather than forcing them into a matching label. Price, platform, equipment, AI role, complete-program, library, adaptive, and free-tier flags can exclude an app from finder results, so do not guess them.

## 5. Score and hand off

For each of the five Legit and five Originality dimensions, record the band chosen, the specific supporting and limiting evidence, comparison apps where relevant, and confidence. Apply the same rubric each time. Do not ask the owner to supply numbers. An unknown lowers confidence or narrows the claim; it is not an automatic numeric penalty, but it cannot justify a band that requires demonstrated or repeated performance. Equally, a marketing claim alone does not demonstrate excellent execution. Use the Low/Moderate/High anchors in the scoring rubric. Keep scoring independent of developer cooperation, paid audits, and publication decisions.

Keep an internal decision row for each dimension: `dimension | proposed score | decisive evidence IDs | counterevidence | why this band rather than the adjacent band | confidence`. If a later observation changes a number, append the new reason and date instead of silently rewriting the old judgment. Use relevant apps as behavioral comparators, but do not copy their unrevised public totals.

The seven checkpoints are coverage prompts, **not** seven automatically verified sections. The old manual `verifiedSections`/`totalSections` values are retired from the editor and public screens; they remain in stored records only for compatibility. Do not use those values to claim completeness or raise a score. A concise, qualified card can be ready without every optional feature being tested; a material unresolved finder fact must be sourced, qualified, or omitted.

Prepare dated, claim-specific source records locally alongside the research draft. Saving a private card or accepting a local proposal attaches only those vetted records that are not already present. Do not convert a submission, an unvisited link, or an older preliminary-catalog seed into rechecked evidence. Existing source records are not overwritten. The owner reviews the card and source log; source entry is not another routine owner task. Missing support is resolved in research or the public claim is narrowed, not by asking the owner to fill in evidence fields.

Before presenting a proposed card, check that every finder-sensitive flag and public claim has an evidence path; the score totals match their dimensions; observed defects are not overstated; and important unknowns are visible. Show the owner one concise card and the material unresolved questions. Existing saved admin edits are accepted field by field, not overwritten. Owner review and public publication remain separate. Internal confidence labels are not developer-facing sales language.

This protocol does not rescore or republish existing apps automatically. Apply it to new research and to older entries when they are next substantively reviewed.
