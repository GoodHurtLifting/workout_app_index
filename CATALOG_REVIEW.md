# Catalog review with the owner

The public finder is account-free. This review process is editorial, not a visitor sign-in feature. The existing live catalog remains available while its entries are reviewed; its current `Researching` and `Evaluation ready` labels must not be interpreted as owner approval.

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
- Do not automatically publish or deploy a card on approval. Verify the approved facts and the site build, then use the normal release process.
- Do not take down the existing public catalog merely because a newer Firebase publication has not yet been created. The bundled catalog is the documented fallback until an intentional, tested cutover.

The private Firebase catalog manager can remain an optional internal editing tool. Its `Reviewed` status and publish controls must not be used as a shortcut around the owner's card review.

## Developer submission intake

- `Mark seen` only acknowledges that the owner has looked at an inbox request. It does not create a catalog entry or approve any claims.
- `Accept for research` links the submission to an existing evaluation with the same app name or creates an unpublished `Candidate` with explicit unverified placeholders. Keep the original submission in the inbox as a lead, not as independent evidence.
- Research and edit the Candidate separately. Only the approval gate above can move its catalog record to `Reviewed`, and publication remains a separate action.
