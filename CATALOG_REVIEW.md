# Catalog review with the owner

The public finder is account-free. This review process is editorial, not a visitor sign-in feature. The original 36 entries are explicitly marked `Legacy public` in the admin dashboard and remain available while their owner review is pending. Their current `Researching` and `Evaluation ready` labels must not be interpreted as owner approval. This is a visibility exception for the existing catalog, not a shortcut for new submissions.

## One card per proposed entry

Present each proposed new entry or substantial profile revision to the owner in chat as a short, mobile-readable card with an ID such as `WAI-hevy-20260929-r1`. Do not ask the owner to inspect `lib/catalog.ts` or a database record. Keep the card factual, with direct links to the app's own site, its current store listings, and any other source actually used. Show the date each time-sensitive fact was checked.

Use this order:

1. **App and proposed position:** name, product category, best fit, and the user who probably should not choose it.
2. **What it does:** programming model, decisions the app removes, decisions the user still owns, and the main convenience-versus-control tradeoff.
3. **Practical facts:** supported platforms, current price/trial/free-tier limits, AI role, equipment or training setting, and standout features.
4. **Differentiation and caveats:** what is genuinely distinctive, what is ordinary, and meaningful limitations. Show score recommendations with a short rationale, not just numbers.
5. **Evidence and uncertainty:** source links beside the claims they support, check dates, and explicit unknowns or conflicts. Do not convert an unknown into a confident score or eligibility claim.
6. **Proposed public summary:** the concise wording visitors would see.
7. **Decision:** ask for **Approve**, **Changes needed**, or **Do not list**. A partial reply is feedback, not approval unless the owner clearly approves the entry.

Keep the default card brief enough to review on a phone. Offer additional evidence or detail only when useful. If a source does not support a claim, revise the claim before presenting the card. A developer submission is a lead, not independent evidence.

## Approval gate

- Research and drafting may set an entry to `Candidate`, `Researching`, or `Evaluation ready`. They never set it to `Reviewed` merely because an agent checked sources or filled every field.
- Set `Reviewed` only after the owner has seen the card and explicitly approved that version of the entry. Record the app ID, approval date, card ID, and any requested edits in a review log alongside the change. Apply requested edits before marking Reviewed.
- A substantial later change to pricing, AI role, programming model, fit, scoring, or claims needs a new card and approval. Routine typo fixes do not.
- For newly researched apps, proposed scores belong on the private card before owner approval. Use the same documented criteria for each app, distinguish store/developer claims from hands-on observations, show category scores and rationale, and mark evidence-limited scores as provisional. Developer answers may correct facts but do not set WAI scores. See `RESEARCH_ALDO_STARK.md` for the initial-v1 rubric applied to the first two submitted-app drafts.
- The original 36 have private, evidence-limited Legit and Originality rescoring drafts documented in `LEGACY_RESCORING.md`. Their public scores remain unchanged until each exact revision is approved and published. The admin editor will not overlay a draft onto an owner-edited score or an already Reviewed record.
- Do not automatically publish or deploy a card on approval. Verify the approved facts and the site build, then use the normal release process.
- Do not take down the existing public catalog merely because a newer Firebase publication has not yet been created. The fixed 36-ID legacy-public set is the documented baseline, including after later publications. Adding a new app to the bundled source does not make it legacy public.
- Each publication overlays the latest approved versions onto that legacy baseline and adds approved new entries. Unreviewed new Candidates and research drafts are never included in public listings or the sitemap.

The private Firebase catalog manager can remain an optional internal editing tool. Its `Reviewed` status and publish controls must not be used as a shortcut around the owner's card review.

For an app in active hands-on testing, maintain the internal Google Doc as the detailed observation and potential private-audit record. When a substantive observation is added or corrected in the local research draft, update the corresponding Doc in the same work session and check that the concise admin-card summary still reflects it. Do not copy raw test notes wholesale into the public listing, and do not turn an observation into a confirmed defect without verification.

## Developer submission intake

- `Mark seen` only acknowledges that the owner has looked at an inbox request. It does not create a catalog entry or approve any claims.
- `Accept for research` links the submission to an existing evaluation with the same app name or creates an unpublished `Candidate` with explicit unverified placeholders. Keep the original submission in the inbox as a lead, not as independent evidence.
- A code-supplied research draft may appear in the admin list before a Firebase record exists. It is private and must be saved in the editor to persist changes. Accepting its matching submission later links the lead to that evaluation; it does not approve or publish the draft.
- Research and edit the Candidate separately. Only the approval gate above can move its catalog record to `Reviewed`, and publication remains a separate action.

### Capacity-controlled queue

- App submissions are internally classified as unverified research leads. The public receipt says only, "We received your submission," and does not promise testing, review, listing, publication, or a timeline.
- The pilot caps are eight initial screens and two acceptances for research per UTC calendar month. Only one submission can be in active deep review at a time. These are owner workload limits, not promises that either quota will be filled. A screen should take no more than 10 to 15 minutes.
- Status path: `received` → `screening` → `waitlisted_eligible` → `accepted_for_research` → `active_review` → `research_ready`. If screening capacity is full, use `waitlisted_unassessed`; screen it in a later month. `not_scheduled` and `declined` are explicit owner dispositions. Only the owner can move stages in the admin dashboard. Existing `new`, `seen`, and `accepted` submissions are mapped to their closest new state without publishing them.
- Check a live public product, substantive fitness training or tracking, a working website or store listing, a public privacy policy, stated platforms/pricing, and practical review access. Record a brief note. Passing checks means eligible for consideration, not independently verified for the catalog.
- `Mark seen` is a timestamp and does not move the app through editorial stages. `Accept for research` still only creates or links an unpublished Candidate. `Research ready` means an owner-review card is ready; it is not catalog `Reviewed` or published.
- The dashboard pages submissions 30 at a time. New submissions are visible at the top; use the older-submissions link for the rest. Later developer messages remain personal. The existing new-submission notification goes only to the owner. No submission fee or payment workflow is implemented.
- The separate $250–$350 private positioning audit is optional commercial work. Payment must never affect editorial selection, WAI scoring, ranking, conclusions, or publication.

### Analytics decision and release check

- GA4 automatic page views are authoritative for real URLs. The Google tag `config` sends the initial page view; GA4 Enhanced Measurement sends history-change page views. The old manual `page_view` on home-screen tab changes was removed because those tabs do not change URLs and could inflate Views. The live WAI Views card showed synthetic titles such as `Workout App Index - finder` and `Workout App Index - browse`, confirming those manual events reached reports. Do not add another manual page-view call without disabling the automatic source first.
- Live GA4 audit on 2026-10-08: in the **Workout App Index** property, the data-flowing stream uses measurement ID `G-VQ7RCBS9H6`. Enhanced Measurement is on; Page loads and browser-history page changes are checked. **Outbound clicks** and **Form interactions** are also on. The older `Workout App Index Web` stream uses `G-TZNQ4MN555` and is distinct; do not change the wrong stream.
- Before release, in GA4 → Admin → Data streams → **Workout App Index** → Enhanced measurement → gear, leave Page views and browser-history page changes on, but disable **Outbound clicks** and **Form interactions** in the data-flowing stream, then Save. Outbound `click` includes full `link_url`; auto `form_submit` records the click before the server confirms a save, so neither matches WAI's custom-event policy. This live GA4 setting was audited but not changed while the code awaits review. The older stream can be cleaned up separately after confirming no tag sends to it.
- `submission_started` fires once per app form mount on the first nonempty user input, with no parameters. `submission_completed` fires only after the server returns HTTP 201 with `ok: true` following the Firestore save. Failed requests and correction forms do not emit these events. The honeypot path does not return success.
- `outbound_app_click` fires from profile action buttons only. Its exact parameters are `destination_type` (`store` or `official_site`), `placement` (`profile`), and the public `app_slug`. It excludes URLs, submission IDs, developer IDs, and form content. The buttons are intentionally not ordinary outbound anchor links so Enhanced Measurement does not automatically attach a full URL if its stream setting has not yet been corrected.
- All custom events require granted analytics consent. In GA4 DebugView or a test property, check one form start per form session, completion only after a successful save, one outbound event per click, and one page view per real page navigation. Compare before and after Views rather than combining periods with the old manual behavior.
