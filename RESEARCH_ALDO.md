# Aldo Coach: current proposal for owner admin review

## Current local handoff | October 30, 2026

The owner authorized preparing the revised local proposal for the site. Legit is now **77/100** (80/65/75/90/75), Originality remains **78/100**, and confidence remains **Moderate**. Reliability changes from 65 to 75 because the definitive false-recap/save-failure rationale is not established after clarification and owner-confirmed editing routes. Historical equipment enforcement and workflow limitations remain. This is a local proposal only; the public profile last verified October 30 still showed 75/78, and the saved admin card, review status and publication have not been changed. Earlier pending-77 language below is superseded for local preparation, not for saved/public approval.

### Reconciled event sequence

October 30 owner clarification, using contemporaneous session notes: on October 21 all three deadlift working sets were performed at 185 pounds, against a 170-pound prescription. The owner cannot determine whether a prompt to update remaining targets was missed or absent. After Finish workout, a recap revealed recorded values 185/170/170. Attempts to change the other two weight fields to 185 reverted to 170 on blur before the owner found how to reopen the finished session. The owner now confirms the Session Complete link says Tap to reopen and edit, and History editing is straightforward. This supports edit discoverability/completed-state friction, not unavailable editing or a confirmed save failure. An earlier 180 reference was corrected as a chat typo. Separately, the contemporaneous notes locate the reported 5 x 5 statement in per-set feedback when AI was re-enabled for accessories after AI-off deadlifts; do not relocate it to the end-of-workout summary. No screenshot or verbatim message is available, and Jack did not find that statement in the two recaps he inspected. Its cause remains unresolved.

Jack reports that disabling per-set feedback stops the immediate Claude call when logging, but a later coach request reads that day's saved sets, including those logged with feedback off. He confirms that the saved 25-pound dumbbell note was ignored by the October 19 rebuild, and reports equipment-profile integration since October 26. That change has not been retested for effective constraint enforcement. He reports 185/170/170 deadlift records and normal completed-session locking with reopening/History edit routes. He says the two recaps he inspected described three working sets, and suggests warm-up counting as a hypothesis. These are attributed developer explanations, not an independent backend or data-flow audit, and the inspected recaps need not be the per-set feedback message described in the notes. His editorial response earns no support-response points.

The contemporaneous notes give the relevant location: per-set feedback when re-enabled for accessories after deadlifts. A later speculative recollection about an end-of-workout summary does not override those notes. Lack of the exact stored message is a separate verification limit, not a reason to make the observed sequence vague. Jack's differing inspected recaps do not resolve whether the same message was inspected; warm-up counting remains a hypothesis.

### Site-facing proposal

During October testing, full-block builds involved substantial waits, and next-workout and completion navigation were unclear. A saved equipment limit was ignored; a later developer-reported profile change has not been retested. Two sets retained prescribed rather than performed weights, without an established save failure. Reopening and History editing are available, but the tester did not discover them during the original attempt. A discrepancy reported in per-set feedback remains unresolved; the developer could not locate it in inspected recaps. A bands-only plan was inspected, not performed; longer-term progression and normal free/Pro limits remain unverified.

Legit 77 reflects useful programming with material workflow friction in October testing. Core execution (80): completed strength workouts, helpful warm-ups and integrated logging, plus successful rebuild recovery. Usability (65): lengthy full-block builds and difficulty locating next actions and completed-session editing. Reliability (75): a saved equipment limit was ignored, but history remained available and workout paths functioned. An owner-reported per-set feedback discrepancy remains unresolved; the weight mismatch does not establish a save failure. Reopening and History editing are now owner-confirmed. A later equipment-profile change is developer-reported and not retested by WAI. Value (90): useful no-card test access; normal free/Pro limits and future prices remain unverified. Support/privacy (75): published disclosures and a contact route, not an audit or credit for editorial correspondence. Five owner-reported workouts and a separate unperformed bands-only plan inform this assessment. Long-term progression, daily generation and other platforms remain unverified.

All other score dimensions, originality, matching/pricing flags and approval/publication state are preserved. Prepared evidence now records owner confirmation and developer explanation as separate private source classes. No email draft is stored in the repository.



## October 30 reconciliation: owner clarification and developer response

This section controls interpretation of conflicting earlier findings. It records evidence and proposed corrections only; it does not change the saved admin card, scores, review stage or public content. On October 30 the public Aldo profile was fetched successfully (HTTP 200) and showed Reviewed, Legit 75 and Originality 78. Its assessment was dated October 22. A public-page read is not inspection of the private Firestore record.

### Owner-confirmed performed and recorded weights

All three October 21 working deadlift sets were performed at 185 pounds. The recommendation was 170. The owner is unsure whether a prompt to apply the new first-set weight to remaining sets was missed or not shown. Jack reports log values 185/170/170, consistent with the values the owner noticed. It is therefore not established that Aldo changed correctly entered weights or failed to save an attempted in-workout update.

After pressing Finish workout, the owner saw the discrepancy in a recap, returned to the lift and tried entering 185 for the other two sets. On moving focus away from the field, 170 reappeared. The owner has explicitly corrected an earlier mention of 180 as a chat typo: performed and attempted correction weights were 185. Do not use 180 as an alternate performed or attempted load. The owner did not discover reopening at that time, but now confirms the Session Complete text link says “Tap to reopen and edit” and that editing through History is easy. The app locks a completed workout, according to Jack. The observed post-finish reversion is consistent with an attempted edit in a locked state; that is an explanation, not an independently traced save diagnosis. Revise the finding toward completion-state communication and edit discoverability, not unavailable correction or a confirmed persistence failure. No further logging-error test or new workout is inferred.

### Exact recap location and dispute

The contemporaneous dictated notes place the claimed 5 x 5 statement in the conversation after the owner turned per-set AI back on when starting accessories, following AI-off 3 x 5 deadlifts. They locate the report in the per-set feedback conversation on re-enabling AI for accessories; retained verbatim text and a screenshot are unavailable. The later speculative end-of-workout recollection is not used to override that contemporaneous sequence. Jack says the two recaps he inspected both said three working sets, and suggests warm-up-inclusive numbering as a hypothesis. Neither his inspected records nor the owner's recollection establishes a resolved cause. Keep this as a disputed owner-reported recap, not a confirmed false summary or verified model error. Earlier set-4 versus working-set-2 labels remain a distinct reference-convention issue.

### Developer-reported technical clarifications

Jack explains that switching off per-set feedback suppresses the immediate Claude request on logging, while preserving sets in the log. The next coach request includes that day's log, including those sets. This matches the later commentary observed by the owner, but is developer-described processing behavior rather than an independently audited data flow. Do not infer immediate transmission of every set, or no later model access when commentary is off.

Jack confirms the 25-pound-per-dumbbell ceiling was saved in a note and ignored by the October 19 rebuild. He reports that since October 26 equipment lives in the profile and each build reads it. The historical failure is corroborated; effectiveness of the reported change is unverified. Reading a profile does not itself prove correct enforcement. Jack also reports reading shared testing-account logs without changing them; access permissions and backend actions were not audited. Developer cooperation is not scored as ordinary customer-support responsiveness.

### Public wording requiring correction

The live caveat and scoring rationale say that Aldo produced an inaccurate recap and that two recorded sets could not be corrected through the tested route. The recap needs the dispute qualification; the correction route needs the now-confirmed reopening/History path. Avoid presenting the log discrepancy as a demonstrated save failure. Preserve supported historical findings: substantial full-block waits, unclear next actions and completion navigation, the confirmed ignored equipment note, and successful rebuild recovery with visible history. Keep the equipment remediation attributed and untested. The live practical facts appropriately qualify normal free/Pro limits and future prices; no new pricing test or numeric change is supported. Aldo remains public under Ryan's instruction and no developer privacy/removal request has been received.

### Scoring recommendation for owner approval: Legit 77, not applied

Propose Reliability 65 -> 75, leaving Core execution 80, Usability 65, Value 90 and Support/privacy 75. The rounded equal-weight mean is 77. Originality remains 78 and evidence confidence remains Moderate.

Reason: the earlier stronger reliability rationale depended partly on a definitive false recap and apparently uncorrectable stored weights. The recap is disputed and the completed-state editing path is confirmed available. The record mismatch may reflect unupdated targets and locked-state editing rather than failed persistence. These cannot retain the same weight as confirmed logging or recap failures. The corroborated equipment-note failure remains a material historical consistency issue, but the functioning workout paths, retained history, successful rebuild and available corrections support the lower strong band (75), not demonstrated high repeatability. Usability remains in the material-issues band (65): long waits and repeated navigation/rebuild/next-action friction persist as historical evidence, and reopening was not discovered in the original encounter. No bonus is awarded for correspondence or an untested remediation. Do not change any numeric proposal or public value until Ryan has reviewed this recommendation and the exact updated card.

Proposed concise caveat, pending owner approval:

During October testing, full-block generation involved substantial waits, and next-workout and completion navigation were not always clear. A saved dumbbell limit was ignored; the developer reports a later profile change that WAI has not retested. Two sets retained prescribed rather than performed weights; the cause was not established. Editing is available by reopening a completed session or through History, but the tester did not discover it during the original attempt. A reported recap discrepancy remains unresolved. A separate bands-only plan was inspected, not performed; long-term progression and normal free/Pro limits remain unverified.

Proposed Legit rationale for a 77 assessment, pending owner approval:

Legit 77 reflects useful programming with material workflow friction in October testing. Core execution (80): completed strength workouts, helpful warm-ups and integrated logging, plus successful rebuild recovery. Usability (65): lengthy full-block builds and difficulty locating next actions and completed-session editing. Reliability (75): a saved equipment limit was ignored, but history remained available and workout paths functioned. The reported recap discrepancy is disputed, and the weight mismatch does not establish a save failure; reopening and History editing are available. The developer reports a later equipment-profile change, not retested by WAI. Value (90): useful no-card test access; normal free/Pro limits and future prices remain unverified. Support/privacy (75): dated disclosures and a contact route, not an audit or credit for editorial correspondence. Five owner-reported workouts and a separate unperformed bands-only plan inform this assessment; long-term progression, daily generation and other platforms remain unverified.

### Correspondence boundary

Draft the reply in chat or the private non-repository workspace only. No email draft or verbatim correspondence is added to GitHub. Record only this evidence reconciliation in research. The reply should acknowledge the feedback explanation, retain uncertainty about the equipment remediation, provide 185/185/185 and the post-finish edit sequence, confirm available edit routes, and use the contemporaneous per-set-feedback sequence without inventing message text.

## Earlier research record

The earlier current-proposal headers and October 22 scores below are retained as history. The latest facts and unapproved 77 recommendation above supersede conflicting conclusions, not the actual saved/public score of 75.



Updated October 22, 2026. This current assessment supersedes conflicting scope, score and unresolved-recovery wording in the historical research below. It is a local proposal, not the saved admin card, an owner-approved Reviewed record, or a public listing. The owner will push the files, review proposed changes, save the selected entry fields and separately confirm Reviewed. Publication remains separate.

## Final owner closeout | October 22, 2026

October 22 fresh-account check: the owner reports deleting the prior account and starting over, choosing mobility and cycling goals, naming Muscle Monsters when asked about a preferred trainer as a deliberately mismatched reference, and declaring only bands as available equipment. On inspecting the prescribed movements, the owner considered the generated workouts good within that unusual combination. No workout from this fresh plan is reported performed. Account deletion was experienced through the user flow, not audited for backend erasure. Build time remained substantial without a measured duration. The owner reported previously observed issues remained; this is an overall assessment, not an independent retest of every earlier defect. The owner also saw an option for AI to build each day instead of a full block, but did not test it; no claim that this route is faster or more reliable is supported. The owner would consider Aldo for a few equipment-constrained travel workouts, but not ongoing personal use.

Final fit judgment: broaden the level field to Beginner, Intermediate and Advanced as an editorial assessment of guided generation, warm-up detail and adjustable prescriptions, supported by repeat owner use and the fresh constrained-plan inspection. No novice participant was tested, and terminology, oversight and navigation may still challenge beginners. Equipment flexibility is supported by the tested dumbbell/home setup and bands-only plan inspection, not every possible restriction or reliable retention in all later sessions. Mobility/cycling were requested goals, not independently validated cycling programming or completed mobility training. The named creator was a preference input, not evidence of authorship, endorsement, partnership or copied programming. Travel use is an owner-stated possible fit, not a completed travel/offline test. The observed daily-build option is untested and does not remove the measured-scope full-block wait concern.

Final local scores remain Legit 75 (core 80, usability 65, reliability 65, value 90, support/privacy 75), Originality 78, Moderate confidence. The fresh generated plan reinforces core versatility within the existing strong band, while no completed fresh-plan workout or corrected prior behavior warrants an increase. Prior record-edit and recap concerns remain material. No automatic deduction is applied for another wait, and no bonus for a successful account-deletion flow is treated as a backend privacy audit. This is the final bounded editorial proposal for owner admin acceptance; further testing is not required. No saved admin record, review stage or publication is changed.

**Proposed public summary:** Aldo builds training programs around stated goals and equipment, with coaching inside the workout log. Five owner-reported workouts produced useful plans and warm-ups, while waits, navigation friction, inaccurate feedback and difficult record correction added oversight. A fresh mobility/cycling request with bands-only equipment produced movements the owner considered appropriate on inspection. It may suit beginners through advanced users who are comfortable checking AI decisions, including people seeking a few equipment-constrained workouts. Novice use, fresh-plan execution and the observed day-by-day generation option remain untested.

**Changed in this closeout:** broadened fit beyond lifters; added Beginner to the level proposal with explicit evidence limits; added travel/limited-equipment use as a possible owner fit; documented fresh setup and the untested daily option. Existing environment/goal matching flags and numeric scores remain unchanged: no universal-equipment or independently verified cycling claim is introduced. Older references to an unperformed account reset are superseded by this fresh-account report, while backend-erasure uncertainty remains.

## October 22 added logging and correction limitation

Reported October 22 about the recent deadlift workout: two of three deadlift sets showed the prescribed weight rather than the weight the owner actually used. Attempts to correct those two entries did not change the displayed numbers, and the owner could not find how to edit the program after it had been marked finished. This is a reported record-versus-performance discrepancy and unsuccessful correction attempt. It does not establish whether the original cause was an unchanged prefilled value, an input interaction, a failed save, later overwrite, or a completed-state restriction. Exact affected weights, edit route, and persisted backend values were not supplied or independently inspected. The owner referred to the finished program; whether the lock applied to the session, block, or another object is unresolved. This is separate from the earlier incorrect AI recap, not proof that the AI changed the stored sets or that Claude caused the discrepancy. No sixth workout is inferred.

Scores remain Legit 75 (80/65/65/90/75), Originality 78, Moderate confidence. The record/edit observation strengthens existing reliability and usability limitations and adds a qualification to logging execution; it does not trigger an automatic per-incident deduction. Before accepting the saved admin card, review this added limitation. No saved record, stage, or publication is changed by the local update.

## Current scores and decision record

Local Legit changes from 79 to **75/100**, Moderate confidence. Originality & Identity remains **78/100**, Distinctive. The owner authorized preparing these values for admin comparison after seeing the evidence and recommendation; acceptance of the exact saved card remains pending.

| Criterion | Previous local | Current proposed | Evidence and band |
| --- | ---: | ---: | --- |
| Core execution | 85 | 80 | Useful generation, warm-ups and logging; explicit rebuilds ultimately produced a suitable session. Equipment constraints and repeated correction weaken the integrated coaching promise, but do not establish core task failure. |
| Usability | 70 | 65 | Recurring setup/rebuild waits, navigation and completion friction, control coupling, ambiguous references and overlapping Sources text are material issues. Successful workout use prevents treating the whole workflow as blocked. |
| Reliability | 75 | 65 | A reported 3 x 5 deadlift performance was recapped as 5 x 5, and a known equipment ceiling was not consistently honored. These are accuracy/consistency concerns; successful recovery and visible history qualify earlier lost-program suspicions. October 22 adds two displayed prescribed-versus-performed weight discrepancies and an unsuccessful edit attempt; no backend cause or data loss established. |
| Value | 90 | 90 | Useful no-card access and a reported no-cost Pro upgrade, without an observed charge. Standard limits and future terms remain unknown. No hypothetical paid correction penalty applied. |
| Support/privacy | 75 | 75 | Existing public disclosures and contact route; no ordinary support-response test or backend audit. Sharing language is unclear, not proof of unauthorized sharing. Editorial outreach is excluded. |

Total: (80 + 65 + 65 + 90 + 75) / 5 = 75. The five Originality dimensions remain 84, 80, 68, 86 and 72 (mean 78); no silent rounding or new comparative originality claim. Recurring implementation issues qualify usefulness and cohesion without automatic originality deductions. No dimension is reduced merely for untested optional features.

## Position and evidence scope

AI-guided program creation and live coaching inside a workout log. Best for lifters comfortable with conversational planning, build waits, checking AI summaries and constraints, and approving proposed changes. Poorer fit for immediate uninterrupted logging or programming with minimal oversight. Planning choice load is Moderate in the proposal to reflect observed clarification and oversight, rather than treating delegated programming as automatically low effort.

Evidence covers five owner-reported workouts, return use, two explicit rebuilds, AI-off/on interactions, and four UI photos. It does not reconstruct every intervening session. iPhone/Apple Watch availability is documented; later iPad use is pictured. Other-platform behavior, remaining-block progression and backend processing are unverified. The owner subsequently reported account deletion and fresh setup; backend erasure and fresh-plan execution were not audited. App-store claims were last read October 21; older site/privacy statements remain dated. This closeout does not imply new source checks beyond those recorded.

## Sources-screen visual evidence

Four owner-supplied UI photos reviewed October 21 show the rebuilt program at Week 2 of 9; a Sources diagram with memory 12 of 12 notes, training log 3 sessions, and 5 shared / 2 not shared; weekly working-set volume and body-part set charts; and menu routes for Profile, Aldo's memory, Coach & AI, Data & Backup, and Advanced. Plan/schedule labels visibly overlap and profile text truncates in the captured Sources view. The owner reports five workouts, so the three-session display needs scope explanation. The sharing label does not distinguish explicit permission from available or selected context.

Visible UI evidence only: no verification of source retrieval, complete log count, chart calculations, edit controls, backend data flow, or unauthorized sharing. Menu routes exist; deeper options and behavior were not fully tested. Photos are private, include account details, and are not public profile images. Attachment filenames 1000012206.jpg through 1000012209.jpg identify the four supplied images.

The defensible synthesis is that Aldo exposes memory and context sources, but does not consistently carry stated equipment constraints and agreed intentions through to the workout experience. We cannot infer an absent memory system or assign failures specifically to Claude. Three source sessions versus five reported workouts is an unexplained count, not established missing records. Analytics charts extend beyond a basic history list, but their calculations and coverage are unverified; no new finder-sensitive feature flag is added solely from these photos.

## Proposed concise profile summary

Aldo combines AI-generated programs with coaching inside the workout log. Across five owner-reported workouts, its plans, warm-up guidance and logging were useful, and explicit rebuilds recovered a suitable continuing session. Lengthy rebuilds, recurring navigation friction and inaccurate or unclear AI feedback added an oversight burden. A known dumbbell limit needed repeating, and one recap described 3 x 5 deadlifts as 5 x 5. The Sources view exposes memory and training context, but overlapping labels and an unexplained session count limit transparency. Best suited to lifters comfortable checking AI decisions; standard free/Pro limits and longer-term progression remain unverified.

## Admin handoff

Updated local proposal fields: Legit total and three criteria, rationale, caveat, fit, training-relationship wording and choice load, plus Originality narrative with its score unchanged. Added dated private photo evidence and current source notes. Existing saved fields and evidence are not overwritten by deployment. Compare Saved now versus Proposed and accept chosen fields; score totals are recalculated when criteria are accepted. Review the complete saved card before separately marking Reviewed. Neither file preparation nor field acceptance publishes the entry.

## Historical research and superseded proposals

The final owner closeout above controls current fit, scope and score interpretation. The dated material below is retained as the evidence trail. Earlier statements about only two/three workouts, an uncompleted resumed session, missing-plan causes, unchanged local scores, and an unapplied 75 recommendation must be read with the current synthesis above. They are not current status.

# Aldo Coach: private initial assessment

Rechecked October 19, 2026. This is a research draft for owner review, not an approved or public WAI listing. Developer claims are not evidence by themselves. The initial notes below cover two workouts; the October 21 consolidated update supersedes that scope and records three workouts, not a long-term reliability test. More owner workouts or a developer reply are not required for a properly qualified catalog listing. Scoring follows [the shared rubric](CATALOG_SCORING_RUBRIC.md).

The separate Google Doc, "Aldo Coach - First-run audit notes and audit opportunity," is the fuller internal testing and potential private-audit record. Keep it aligned when substantive owner observations change this local research draft. The admin card contains a concise editorial assessment, not the complete workout journal. The second-workout set-reference observation is recorded in both places; neither record is a developer-facing audit or an approved public listing.

- Provisional Legit Score **79/100**, Moderate confidence: core execution 85, usability 70, reliability 75, value 90, support/privacy 75. The usability score now also reflects difficulty resuming the planned training after a week away; this reinforces the existing 70 rather than changing the score. Reliability is neutral for the functioning paths observed; untested long-term behavior lowers confidence rather than the score. An edit reset the rest timer in owner testing, which remains an observed usability issue. The current App Store supplies privacy disclosures and a support contact. Direct WAI editorial outreach has not received a reply as of October 19; this is not ordinary customer-support evidence and does not lower Support/privacy. The score remains unchanged pending a check that its rationale relies only on eligible evidence.
- Provisional Originality & Identity **78/100**, Distinctive: original mechanics 84, product point of view 80, visual identity 68, meaningful differentiation 86, defensibility 72. The live set-to-plan coaching integration is distinctive; the underlying models are not proprietary, but reproducing the full interactive workflow is more involved than copying a simple log. WAI has not established that the mechanism is exclusive.
- Fit: lifters comfortable with detailed training conversations who want a program and live set-by-set adjustments inside the log. Poor fit for someone avoiding AI or wanting an immediate, low-friction first workout.
- Evidence: the owner generated a 5x5 rebuild with recomposition accessories and completed two workouts. The plan, warm-ups, logging, and load feedback worked well. Onboarding took about 15 minutes; a proposed 20-pound increase, adjustment flow, rest-timer reset, and navigation after the first workout raised usability questions. The owner confirmed that an AI response can be canceled for a single set and that AI can be turned off more broadly. This corroborates the developer's public description of AI-off controls, but does not establish what data is or is not sent while AI is off. In workout two, AI feedback called for a change to "set 2" when two preceding warm-up sets made that appear to refer to the fourth set shown. The intended target was unclear; we have not established that Aldo changed the wrong load. The owner later found full-screen iPad mode, so the earlier black-border critique is not retained as a defect. The [US App Store listing](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375) currently identifies a free iPhone/Apple Watch app, 18+ age rating, and AI-driven program and set adjustments. Its current release notes describe changes to in-set coaching and navigation, but WAI has not retested them. App Store privacy disclosures are the developer's statements, not an independent audit. The [developer site](https://aldo-coach.app/) and [privacy policy](https://aldo-coach.app/privacy) informed the earlier research but were not retrievable for a fresh October 19 check.
- Return-use observation, October 19: after about a week away, the owner reopened Aldo and encountered the guide again under Program. The existing plan was accessible under Program > Plan, but Progress showed nothing and Workout offered "create a workout" or "reuse a past workout" rather than surfacing the next session from the previously built three-day-per-week plan. There was no clear home or resume path. When the owner asked the AI what happened, it recognized 10 days off and the owner's cutting goal, proposed a lighter first week back, and offered to put the skipped Monday Full Body C session on today with adjusted weights while discussing block length. The owner then asked to pick up where they left off, reviewed the proposed change, approved it, and returned to the program. This confirms an AI-assisted resume path in the observed use, but the owner had to discover and request it through chat; the workout screen did not present it. The owner has not reported completing the resumed workout, so its prescribed loads and longer-term progression remain unverified. The observation does not establish that the old plan was deleted or its schedule changed.
- Before owner approval: review the exact private card and its dated qualifications, ensure the listing uses the App Store's 18+ requirement, and avoid a complete country or current web-platform claim without a current source. The free App Store listing and the owner's no-card use support the current free description, but planned paid tiers have no confirmed launch date. The earlier Yahoo confirmation-email failure, rest-timer reset, set-number ambiguity, post-workout navigation difficulty, and return-use friction are owner observations, not established persistent defects. A developer response or further workouts could refine those findings later but are not publication gates. Save and mark Reviewed only when the owner accepts this qualified assessment; publication remains separate.

Aldo Coach is not marked Reviewed.

## October 21, 2026 consolidated owner-review update

The update below supersedes conflicting earlier scope, completion, and reliability statements. Historical observations above remain dated context.

# Aldo Coach — proposed local research card

**WAI-aldo-coach-20261020-r1 · Private draft for owner review**

Prepared October 20, 2026 from the existing local research and the owner's subsequent dictated observations. This is a separate review artifact, not the saved admin card or an update to the repository proposal. No admin comparison has been performed. No scores, approval status, or public listing have been changed.

Updated October 21, 2026 with setup-detail and persistent-personalization findings, and a fresh read of the US App Store description. Original filename and card ID are retained for continuity.

## App and proposed position

**AI-guided training program and workout coach.** Best for lifters who want conversational program creation and coaching within their workout log, and are comfortable checking the AI's decisions. Less suitable for someone seeking immediate, uninterrupted logging or programming they can follow with minimal oversight.

## What it does

Aldo builds a multi-session program around the user's stated goals, equipment, schedule, and history. Within workouts, it responds to logged performance and reps in reserve with proposed load or rep changes. The user describes constraints, logs accurately, and accepts or declines recommendations.

The central tradeoff is substantial programming assistance in exchange for conversational setup, response waits, and the need to verify that constraints and program continuity have carried through. The owner deliberately left programming decisions largely to the AI; that makes the observed oversight burden particularly relevant to fit.

## Practical facts

- **Platforms:** iPhone and Apple Watch according to the US App Store record checked October 19 in the existing research. Owner use also included iPad; this is not a claim of a separate native iPad product. Current browser availability and a complete country list are unverified.
- **Access:** the existing research records a free US listing and owner access without a card or trial clock. Future paid tiers were developer-reported, with no confirmed launch date or price. These public facts were not independently refreshed October 20.
- **AI role:** central to programming and live coaching. The owner confirmed that a response can be canceled for an individual set and AI can be turned off more broadly. AI-off data handling was not tested.
- **Training:** a generated 5x5 rebuild with recomposition accessories, tested with home equipment. Three workouts are now reported complete. Complete-program generation and proposed adaptation were observed; dependable longer-term continuation has not been established.
- **Useful observed features:** warm-up guidance, set logging, lift feedback, rest timing, program generation, and proposed load/rep adjustments.

## Differentiation and limitations

The distinctive experience is coaching attached directly to the live workout log, with set results feeding proposed changes to training. WAI has not established exclusive mechanics or completed a direct competitor test.

The generated plan, warm-ups, and logging were useful in the earlier workouts. Material limitations now include lengthy initial setup, recurring difficulty locating the next action, repeated AI response waits, failure to honor a previously stated dumbbell limit in one prescription, and a program-ended warning after an eight-week continuation had been agreed in chat.

The equipment correction itself was acceptable: after the owner repeated the 25-pound-per-dumbbell limit, Aldo increased reps rather than changing the exercise. The owner explicitly accepted 20-rep sets given the limited alternatives. Do not portray that adjustment as a defect.

**Persistent-personalization finding, October 21:** In owner testing, Aldo did not consistently carry stated equipment constraints and agreed program changes through to the workout experience. This is an editorial synthesis of E4 and E5, not evidence that Aldo lacks a persistent profile or history system. Storage, retrieval, instruction-following, and program-update failures remain possible explanations; none has been established. Conversation length or context loss has not been demonstrated as the cause.

The initial equipment-selection route encountered by the owner captured dumbbell availability without making a 25-pound-per-dumbbell ceiling apparent to enter. That left a consequential programming constraint to later conversation and correction. A more detailed route may exist; WAI has not established its absence. The separate later failure to honor the supplied ceiling is stronger evidence than the setup-design concern alone.

## Scores retained for review — reassessment pending

| Legit dimension | Existing provisional score | Evidence relevant to review |
| --- | ---: | --- |
| Core execution | 85 | Three completed workouts; useful plan, warm-ups, and logging. The unavailable-equipment prescription and conflicting continuation status qualify the programming promise. |
| Usability | 70 | Lengthy setup, unclear navigation/resume path, timer reset after editing, ambiguous set reference, and repeated response waits perceived as interrupting workout flow. |
| Reliability | 75 | Earlier tested paths functioned. The workout screen subsequently showed the program had ended despite an agreed eight-week continuation. Cause and saved program state remain unresolved. The earlier neutral rationale needs revision. |
| Value | 90 | Useful core access without a card or trial clock in owner testing; public pricing basis remains the October 19 research. |
| Support/privacy | 75 | Existing store disclosures and support route; no backend audit. Editorial outreach is excluded from customer-support scoring. |

**Existing Legit total: 79/100; Moderate confidence.** The arithmetic remains correct. Retaining the number here is not a finding that the new evidence warrants the same scores: core execution, usability, and reliability need an explicit evidence-backed score proposal before any numeric change.

**Existing Originality & Identity: 78/100, Distinctive.** Dimensions remain mechanics 84, point of view 80, visual identity 68, differentiation 86, defensibility 72. No new competitor evidence supports a numeric revision. Existing single-point dimensions are retained rather than silently normalized to the current five-point-increment procedure. Evidence now covers three workouts, but does not establish exclusive mechanics or long-term consistency.

## Evidence and uncertainty

| Evidence | Observation or source claim | Qualification |
| --- | --- | --- |
| E1 — earlier owner testing | Generated a useful 5x5 rebuild; completed two workouts; warm-ups, logging, and load feedback worked. Setup took about 15 minutes. Editing reset the rest timer; post-workout navigation was difficult. | One owner's observed experience; not a general timing benchmark or proof of persistent defects. |
| E2 — second workout | AI referred to “set 2” when preceding warm-up sets made its intended target unclear. | No proof that an incorrect load was applied. |
| E3 — return and third workout, reported in the October 19 conversation | After ten days away, the existing plan was accessible but a clear next session was not. The owner asked to continue, agreed to a recommended eight-week program, and subsequently completed the third workout. | Supersedes the earlier statement that the resumed workout had not been reported complete. Reaching the workout did not establish that the intended continuation persisted correctly. |
| E4 — third-workout equipment handling | Owner recalls approximately 3 × 12 incline dumbbell bench press at 40 pounds per dumbbell despite an already stated 25-pound limit. After a second reminder, Aldo changed to 3 × 15 at the available weight, then 20 reps after about 15 reps in reserve were reported. | Original 3 × 12 is recalled with uncertainty. Owner accepted the higher-rep response. The concern is the initial constraint violation and repeated reminder. |
| E5 — post-workout continuity | AI described memory tidying and the end of calibration week. Afterward, the workout screen displayed a red warning that the program had ended, despite the earlier agreement to eight weeks. | Observed interface status conflicts with the agreed continuation. Whether the extension failed, applied incorrectly, or was inaccurately described is unknown. No confirmed data loss or root cause. |
| E6 — repeated-use experience, reported October 20 | AI waits repeatedly felt like unnecessary lag, and the owner felt workouts were becoming subject to typical LLM mistakes. | Valid qualitative usability and trust evidence; response duration was not measured. Concrete examples are E4 and E5, not a claim that every response was erroneous. |
| E7 — post-completion navigation, reported October 20 | After marking a workout complete, the owner remained on the workout page without a clear transition to a home or overview screen. The owner described repeatedly feeling stuck there until the next scheduled workout appeared, rather than finding an obvious route to develop another program or explore other planning work. | Reinforces the earlier post-workout navigation concern. This is an observed lack of a clear exit or next action, not proof that program creation or other navigation is unavailable. A home screen is the owner's suggested solution, not the only acceptable design. |
| E8 — setup detail, reported October 21 | The owner encountered a broad dumbbell equipment choice rather than an apparent way to specify the available weight ceiling at initial setup, and felt this shifted work into correcting later programming. | Observed setup route and owner assessment. Does not establish that no detailed equipment-entry route exists. Relevant to usability and initial profile capture; distinct from E4's later constraint-handling failure. |
| D3 — [US App Store](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375), read October 21 | The developer describes user-readable/editable memory holding equipment, working loads, and preferences, and exercise history consulted before generating a session. | First-party claims, not verified architecture. Does not establish how facts are persisted, selected, summarized, corrected, or enforced, or that every prescription uses them correctly. The developer site and privacy page were again inaccessible through the research tool on October 21. |
| D1 — [US App Store](https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375) | Existing research records free iPhone/Apple Watch access, an 18+ rating, privacy disclosures, and release notes describing navigation and coaching changes, checked October 19. | First-party claims. Not independently refreshed for this card; release-note improvements were not separately verified. |
| D2 — [developer site](https://aldo-coach.app/) and [privacy policy](https://aldo-coach.app/privacy) | Earlier research documented browser access claims and relevant training-context processing through Anthropic. | Neither page was freshly retrievable October 19. Earlier policy statements are dated disclosures, not current verification or a backend audit. |

## Proposed public summary

Aldo combines AI-generated training programs with coaching inside the workout log. In three owner workouts, its warm-up guidance, logging, and performance-based suggestions were useful, but setup, response waits, and navigation added friction. Marking a workout complete did not provide a clear route back to an overview or other planning tasks. Stated equipment constraints and agreed program changes did not consistently carry through to the workout experience: it prescribed dumbbells above the owner's stated limit, then made an acceptable rep adjustment after a reminder; after an agreed eight-week continuation and a completed session, the workout screen reported that the program had ended. The cause remains unresolved. Best suited to lifters comfortable checking AI recommendations and clarifying inconsistencies.

## Proposed changes and decision

Compared with the repository proposal read October 20, update the evidence scope from two to three completed workouts; replace the uncompleted-resume qualification with the observed continuation mismatch; add the equipment-limit incident with the owner's acceptance of the rep adjustment; add repeated, unmeasured response-wait friction; and qualify the fit and oversight tradeoff accordingly.

This card proposes wording and evidence updates only. Review numeric changes separately, with old/new dimensions and reasons. Compare the actual saved admin record against the local proposal before applying selected fields. Owner approval of the exact saved card, marking Reviewed, and publication remain separate steps. Further workouts or a developer response are not prerequisites for a responsibly qualified review.

## Proposed scoring reassessment, October 21, 2026 - not applied

Existing Legit 79. Proposed Legit 75 = (80 + 65 + 65 + 90 + 75) / 5. Moderate confidence retained. Existing proposal numbers remain unchanged pending owner acceptance.

| Dimension | Existing | Proposed | Reason and band |
| --- | ---: | ---: | --- |
| Core execution | 85 | 80 | Three workouts establish useful generation and logging, supporting the strong band. Equipment above the stated ceiling and the continuation mismatch weaken the integrated programming promise. The primary workout job remained completable, so this is not scored as a core failure. |
| Usability | 70 | 65 | Repeated waits, unclear post-completion/resume routes, and repeated correction impose material friction. This remains in the material-issues band; completed workouts and usable logging do not support a major-limitation band. Wait times are qualitative, not measured. |
| Reliability | 75 | 65 | The program-ended warning after an agreed eight-week continuation is an observed inconsistency, rather than merely missing long-term evidence. Working sessions and no confirmed data loss argue against a major-failure band. Root cause and persistence are unknown. |
| Value | 90 | 90 | No new price/access barrier evidence; useful no-card access remains the basis. This is not a new October 21 pricing verification. |
| Support/privacy | 75 | 75 | No new eligible customer-support or privacy evidence warrants a change. Editorial correspondence remains excluded. |

Evidence mapping: core E3-E5; usability E1-E2, E6-E8; reliability E3/E5; value existing owner access and dated store record; support/privacy existing disclosure record. E identifiers refer to the consolidated card above. The same incident may bear on distinct dimensions, but no per-incident deductions are used. The program mismatch affects both the usefulness of programming and consistency of state; neither is treated as confirmed data loss. Originality remains 78 because these findings concern execution and no new comparative originality evidence supports a change. No score has been changed in the TypeScript proposal or saved admin card.

## October 21 follow-up: no visible scheduled workout or plan

On reopening Aldo October 21 before the planned reset, the owner found no scheduled workout and nothing under Program > Plan, despite the earlier agreement to an eight-week continuation. This extends the earlier program-ended warning to a later visit with no visible plan. Whether the continuation was saved, removed, filtered, or failed to load remains unresolved; backend data loss is not established.

This is the existing setup before reset, not a fresh-setup result or a fourth completed workout. It strengthens the continuity concern and supersedes any implication that the plan remains currently accessible under Program > Plan. Scores remain unchanged; reassess the proposed dimensions at final review rather than applying a separate deduction per observation.


## October 21 final recovery and usage-tier update

October 21 recovery follow-up supersedes the earlier unresolved missing-plan outcome: the owner explicitly selected eight weeks and rebuilt through Program. Monday's chat agreement may not have completed that process. After an app-estimated seven-minute build, approval led to another finalization phase estimated at one minute; elapsed time was not measured. The resulting block showed week 2 of 9 and retained visible prior training dates. The owner liked that continuity, but questioned repeated main-lift prescriptions alongside changed accessories. Repetition alone was not established as a programming error. Visible October 12 and 19 entries suggested seven days between sessions, conflicting with the AI's earlier ten-day account; its calculation is unknown. After another AI conversation and full rebuild, the owner considered the session appropriate: recovery squats, primary overhead press and deadlift, close-grip bench, planks, and EZ-bar French press. The deadlift appeared light to the owner but was acceptable. No completed October 21 workout has been reported. This recovery demonstrates available history and a workable rebuilt session, not a verified remaining eight-week progression.

Two lengthy block builds and intervening clarification delayed readiness to train. The owner judged that this could outlast a planned ten-minute treadmill warm-up; that is an anticipated gym scenario, not a measured delay. The AI's reflexively agreeable apology frustrated the owner and is not independent proof of a programming defect. The owner was unsure how to correct one session without disturbing the remaining block. The observed burden is repeated waiting, interpretation, and correction before the plan feels ready to use.

During this sequence, Aldo said the owner had hit a usage limit and was automatically switched to Pro at no cost. Continued no-cost access was reported; standard allowances, reset periods, Pro entitlements, and future paid terms are unverified. The message alone does not prove each rebuild consumed a quota. Concern that future paid users could bear the cost of correcting app-generated plans is a conditional value concern, not an observed charge or established billing policy.

Scoring qualification: successful recovery and retained visible history must inform the final core/reliability assessment. Repeated rebuilds strengthen usability concerns. The earlier proposed Legit 75 remains an unapplied recommendation, not a finalized score. No automatic additional deduction or hypothetical pricing penalty is applied.


## Fifth-workout observations, recorded October 21, 2026

**Scope:** The owner identifies this as the fifth Aldo workout. Earlier three-workout summaries are historical scope, not the current total. This report includes finish-workout behavior but does not independently document every intervening session or establish that the planned account reset occurred.

**Previous-load reference:** On a lighter recovery day in an alternating program, the previous-weight display used the most recent heavy-day weight rather than the previous light-day weight. This is an observed reference-context limitation; it does not establish an incorrect stored log or prove the label promises a like-for-like light-day comparison.

**Coupled controls:** Turning off per-set AI feedback also removed the prompt to repopulate sets after editing a recommended weight. The owner considered this a minor loss but expected the controls to be independent. Functional assistance versus coaching commentary is a proposed design distinction, not a confirmed existing setting or required implementation.

**Feedback on re-enable:** After returning from Program and re-enabling set feedback, conversation resumed with earlier context. Feedback appeared for already-completed squats that had been performed with AI off, but not for the overhead-press working set just completed before enabling it. Later, re-enabling AI for accessories produced a recap of deadlifts performed with AI off. This demonstrates some retrospective access to workout context, while timing and coverage were unclear; it does not prove when feedback was generated or what background model processing occurred.

**Warm-up numbering:** Per-set feedback described set 4 complete after two warm-up sets and two working sets, while the visible working-set column showed set 2. This reinforces the earlier numbering mismatch. Four total sets is arithmetically consistent; the issue is differing numbering conventions without clear labels, not proof of a wrong applied set.

**Incorrect deadlift recap:** The owner reports completing 3 x 5 deadlifts, but the AI recap said a full 5 x 5 at the working weight. This is a concrete owner-reported false workout summary, stronger evidence than the ambiguous set numbering. It does not establish that the underlying workout log was changed or identify whether the fault lay in model output, supplied context, retrieval, or Aldo integration.

**Progression question:** The AI described 185-pound deadlifts as tying the previous heaviest pull, while the current prescription had been 170. The owner expected only squats to be lighter on this recovery day, with other lifts progressing from prior work. Record the unexplained prescription versus the owner's intended program; the exact chosen program rules and Aldo's rationale have not been checked, so this is not independently verified as incorrect loading or a required increase.

**Fit and diminishing feedback value:** By the fifth workout the owner no longer found per-set commentary necessary and questioned whether program-building benefits outweighed ambiguity and build waits. The suggestion that beginners might retain it longer is a hypothesis, not tested beginner evidence. Keeping accurate logs while commentary is disabled is a user expectation; it does not require continuous AI calls.

**Finish-workout handoff:** Finish workout generated a brief beneath the log on the same screen with a share button, but the owner still lacked a clear next action and felt stuck. The owner did not see a useful purpose for sharing the long AI brief. This reinforces recurring completion-navigation friction; it does not establish human trainers' preferences or that no other navigation route exists.

Scoring: the false deadlift recap is new evidence for core execution and reliability; recurring controls and completion issues reinforce usability concerns. The prior proposed Legit 75 is still unapplied and needs review against this expanded evidence rather than an automatic per-incident deduction. Stored scores and review status remain unchanged.
