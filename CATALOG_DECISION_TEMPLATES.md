# Developer catalog decision messages

Keep app-specific email drafts and correspondence out of the repository and GitHub. Store them in the private chat or a non-repository workspace. This file contains reusable templates and editorial rules only.

Use these as starting points for a personal email or direct message after a bounded WAI review. They communicate an **editorial outcome**, not an automated submission status. `Accept for research`, a completed local draft, `Research ready for owner review`, and an admin `Reviewed` card are not permission to tell a developer their app has been listed. Ryan approves each final message before it is sent. The admin owner decision is the internal source of truth for the outcome; this file controls wording, not status.

Read `CATALOG_REVIEW.md`, `CATALOG_DICTATED_REVIEW_PROTOCOL.md`, the app's private research notes, and the current saved/public card before filling a template. Use the released product and dated evidence actually evaluated. Do not turn a decision message into a full QA report, a list of requested fixes, a score negotiation, or a sales pitch.

## Before sending an outcome

- Confirm the app name, decision, review dates, device/platform, country and access tier. Include a version only if it was actually captured. Say `version not recorded` internally rather than guessing it in the message.
- Identify the principal journey WAI tried and whether a workout was performed, merely logged, or only inspected. Select at most two or three material consumer-facing findings. Mention a genuine strength when it helps explain the tested scope; do not invent praise.
- Attribute current behavior to **WAI's tested path**, not every user, device, tier, or later release. Do not turn an unresolved cause into a diagnosed defect.
- Check the latest known product changes. If a later release was not retested, make the test date explicit and do not imply the finding still occurs. A developer's statement that a fix shipped is not a retest.
- Keep factual corrections distinct from a request for another full evaluation. Evidence-backed corrections may be submitted at any time through `https://workoutappindex.com/corrections`; they do not automatically change scores or trigger retesting.
- Do not include raw private notes, internal confidence labels, unpublished scores, or a proposed public profile. Developer correspondence alone is not independent product evidence. A decision email may state the standard free correction and reassessment routes and the *availability-dependent* paid testing option below. Do not attach a price, sales pitch, contract, checkout link, or promise of access. Payment buys defined work and private findings, never an editorial outcome.

## Outcome A: selected and publicly listed

**Send only after** Ryan has approved the exact saved card, used **Publish approved catalog**, and verified that the public profile is live. Do not use this template for an app merely accepted into research or marked `Reviewed` in admin.

```text
Subject: {{app_name}} is listed on Workout App Index

Hi {{developer_name}},

Thank you for submitting {{app_name}}. We have completed our bounded review and published its Workout App Index profile: {{public_profile_link}}.

We evaluated {{tested_journey}} on {{platform_and_device}} using {{access_tier}} during {{review_dates}}. {{one_sentence_on_a_supported_strength_and_who_it_suits}}

The profile also explains {{one_or_two_material_tradeoffs_or_limits}}. Our assessment is tied to the product and access we tested; it does not certify every feature, platform, or future release.

If a specific fact is inaccurate or later becomes outdated, please send the statement and supporting source through https://workoutappindex.com/corrections. We review factual corrections separately from a new full evaluation.

Thanks again,
Ryan
Workout App Index
```

The link and the claimed public status must be verified after publication. Do not call a listing an endorsement, guarantee, or certification. If there is a material commercial relationship relevant to the profile, follow the current disclosure policy on the profile as well as in communications.

## Outcome B: no scored public entry after this evaluation

This is the default for a completed bounded review that does **not** produce a scored listing. It follows the sent swithAI and WorkoutFlow messages closely. Send only after Ryan has made the owner decision and checked that the app is not public. Use **“WAI is leaving it unlisted and unscored at this stage”** when WAI has made a not-selected decision. Use **“WAI has completed this round of evaluation with a limited, unscored assessment”** when access or unfinished principal paths prevent a defensible score, and say no listing is being published from this round. Do not present a deferred decision as a final rejection. Do not say a developer's silence caused the outcome, and do not imply that fixing the named issues or paying WAI secures publication.

### Required order and content

1. Thank the developer and state the exact disposition in the first paragraph. Do not disclose or invent a proposed score.
2. In two or three sentences, identify the released app, platform and device, version/build **only if captured**, dates, access tier, and main paths attempted. Distinguish a performed workout from a merely explored or logged session.
3. Introduce **“The material findings were:”** and give no more than three grouped bullets. Each bullet should describe an observable consumer impact. Group related symptoms; do not enumerate every incident or infer an unverified technical cause. Include a supported strength in the scope or limits paragraph when one matters, as the WorkoutFlow email did; do not invent praise to balance criticism.
4. State what worked, what was not established, and which meaningful paths, tiers, or longer-term outcomes were not tested. If the installed build is unknown, say so only when it helps interpret later changes. Say later releases may differ; do not claim a reported fix was retested.
5. Use the standard path-forward paragraphs below. Keep factual correction, later free full evaluation, focused paid retest, and broader private audit distinct. End with a brief thanks and Ryan's signature.

```text
Subject: Workout App Index evaluation of {{app_name}}

Hi {{developer_name_or_blank}},

Thank you for sharing {{app_name}}. {{disposition_sentence_from_guidance_above}}

We tested the released {{platform}} app on {{device}}, {{version_and_build_if_recorded}}, during {{review_dates}} using {{access_tier_and_any_relevant_access_change}}. We {{performed_logged_or_explored}} {{major_paths_tried}}.

The material findings were:

- {{observed_finding_one_and_consumer_impact}}
- {{observed_finding_two_and_consumer_impact}}
- {{optional_grouped_third_finding}}

{{Supported_positive_result_if_material}} We did not establish {{important_unknowns_or_causes}} or evaluate {{important_unassessed_paths_tiers_or_long_term_results}}. {{Version_or_later_release_limit_if_relevant}}

Evidence-backed factual corrections are welcome free of charge at any time through WAI's corrections form: https://workoutappindex.com/corrections. You may request another free full evaluation after roughly six months, subject to capacity; this does not reserve a date.

If available, WAI may separately agree to an earlier, focused paid retest of a materially changed released version. A broader private audit is also separate. Payment buys defined testing and private findings, never a score, favorable conclusion, ranking, finder placement, or publication. Addressing the findings above would not itself guarantee a listing.

Thank you again for the opportunity to evaluate the app.

Ryan
Workout App Index
```

Remove the unused third bullet rather than leaving a placeholder. Adapt the opening and limitation sentence to the actual decision; the template's alternatives are drafting instructions, not literal email text. For a limited assessment, explain why WAI cannot support a scored entry and do not claim that every major feature failed. For a not-selected decision, say it is unlisted. If access or evidence was the barrier, describe the limitation rather than calling the feature broken. Keep findings private unless Ryan separately approves publication. Do not send the message automatically from an admin stage change.


## Outcome C: published entry with findings follow-up

Added October 28, 2026. Use for a completed bounded review when the owner confirms an app is already public and wants to send a personal summary or follow up on unanswered factual questions. This is not a rejection, a research-stage progress update, or an invitation to negotiate a score. Preserve Outcomes A and B for their existing purposes.

### Continued publication and developer-requested privacy

- Developer participation or permission is not an editorial prerequisite. Do not present the continued listing as leverage for a reply. Lack of an editorial response does not reduce Support/privacy or trigger removal.
- For Aldo, Ryan's October 28 instruction is that the entry remains published unless the developer explicitly asks to remove its public listing content. No removal or privacy request has been received in this record. Preparing or sending a message does not change the site.
- Distinguish requests to keep correspondence, detailed findings, evaluative profile content, or the whole entry private. If scope is unclear, clarify it rather than silently removing the entire entry or assuming a request permits publishing correspondence. Ryan approves the actual public-content disposition; use the normal saved-card/publication or withdrawal flow and verify the result.
- A neutral public note such as “The developer requested that WAI's findings remain private” may be proposed only after a documented explicit request covering those findings. Until then it is hypothetical language, never a current fact. Do not imply a privacy request is an admission, a reason for a negative score, or a retraction by WAI.
- Detailed working notes remain private by default. A request for privacy does not by itself warrant deleting internal evidence, changing numeric scores, or suppressing essential rationale while continuing to display a misleading scored review. If evaluative content is withdrawn, review the treatment of scores and summary together; do not leave an unexplained rating paired with a privacy marker.
- Describe independent editorial practice without making unsupported legal-rights claims or offering a legal opinion about third-party logos, copy, or other content. The developer's consent is not being requested as approval of WAI's conclusions.
- Verify live status and public score values before quoting them. If the owner reports publication but connector retrieval fails, record that limitation internally and omit numeric score claims in the external draft rather than treating local numbers as verified public values.

### Reusable structure

Use the app name and completed test scope; one supported strength; at most three grouped material findings; the limits of the tested release; one essential outstanding factual clarification if needed; the continuing-publication position; and the free corrections route. Acknowledge shipped changes as claims until retested. Do not include raw logs, screenshots, account details, internal confidence labels, unpublished scores or a paid-service offer. Do not add a public privacy marker without an explicit developer request. Ryan approves the message before sending.

~~~text
Subject: {{app_name}}: Workout App Index findings and follow-up

Hi {{developer_name}},

We've completed this round of testing of {{app_name}}. Our work covered {{dated_scope}}, and {{supported_strength}}.

The main limitations in our tested paths were {{up_to_three_material_findings_with_uncertainty}}. These findings describe the product and access tested; {{later_release_not_retested_if_applicable}}.

{{Optional_essential_factual_question}}

{{app_name}} remains listed on Workout App Index. We publish independent editorial assessments. If you want the public listing content or findings withdrawn, please explicitly identify the content and scope. Any privacy note would reflect an actual request, rather than a revised product judgment.

For a factual correction, send the specific statement and supporting evidence through https://workoutappindex.com/corrections. Corrections are reviewed without charge and separately from another full evaluation. This round is complete; no ongoing retest is promised.

Best,
Ryan
Workout App Index
~~~
