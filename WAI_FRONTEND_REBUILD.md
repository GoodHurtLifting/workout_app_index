# Public-site rebuild — November 4, 2026

## Current public boundary — November 4, 2026

The owner clarified that Legit and Originality ratings must not be public, including historical expandable sections. Public pages and the catalog API no longer expose those ratings or offer scored editorial coverage. Historical rating data remains private and unchanged. Personalized preference Fit, sourced product information, and scoped firsthand observations remain. This instruction supersedes earlier transition language below that retained public ratings. No deployment-triggering push or rollout monitoring is part of this cleanup; hand off the verified local commit to the owner.

The business pivot is now reflected in the main consumer experience, not just the services pages or private schema. Existing app records, rating values, Firebase projects, and publications are unchanged.

- `/`: facts-first introduction, working catalog search, account-free finder entry, alphabetically selected example profiles, correctly wired need-based category links, research explanation, and a secondary services link. Removed the score-led carousel, arbitrary technical spectrum, score-count promotion, and invented feature-count headline.
- `/apps`: direct catalog route with search, usable-free-tier and AI filters, platform/experience/authorship/feature filters, alphabetical cards, and comparison controls. Cards lead with price, platforms, training approach, free access, AI use, tradeoffs, and evidence context. Editorial ratings are absent from cards and comparison tables.
- `/find`: direct questionnaire route with eight questions: platform, goal, experience, training approach, equipment, feature priority, AI, budget. The single training-approach answer supplies the existing main-job and planning criteria. Removed the duplicate question, added platform as a hard constraint, explained free access and unknowns, and added supported match reasons. Methodology version is fit-4. No editorial score enters matching. Older saved answers without platform restart rather than receiving an assumed platform.
- `/apps/[id]`: all existing profiles now lead with practical product facts, price/access, training relationship, documented features, evidence limits, source links, and dates where recorded. Earlier rating values are retained in a collapsed Earlier editorial assessment section; factual coverage remains unrated. Existing source references without recorded dates are labeled honestly, not newly verified.
- `/how-we-score`: retained URL, rewritten as matching and research methodology with the earlier rating formula available separately. Navigation and information-page links now connect the actual catalog and finder routes.

The public layout uses the existing WAI visual system, with responsive fact tables, a search-led homepage, explicit preference-fit labeling, and readable profile sections. No articles, current verification dates, audience claims, or firsthand tests were fabricated. No actual app facts were edited during this display change.

`WAI_LOCAL_CATALOG_PREVIEW=true` is an explicit development-only option in the existing catalog loader. It renders the existing bundled public catalog without Firebase reads or writes. Production ignores it because the condition requires NODE_ENV=development; production withdrawal and publication behavior is unchanged. This is a preview of the actual site routes and existing catalog, not a synthetic testing page. It does not change .env.local.

Manual validation remains owner-run: lint; targeted tests including tests/finder-questions.test.mjs, tests/matching.test.mjs, and tests/factual-profile.test.mjs; all tests; production build. Prior 43-test/build results precede this public rebuild. TypeScript and diff whitespace are checked separately by the agent. No deployment or public catalog publication is performed.

To preview the actual site without cloud access in an Android Studio PowerShell terminal:

```powershell
Set-Location 'C:\dev\projects\workout_app_index'
$env:WAI_LOCAL_CATALOG_PREVIEW='true'
npm.cmd run dev -- --webpack
```

The public preview reads the bundled catalog without writes. The flag does not redirect or disable admin and inquiry endpoints; use it for public browsing, not admin saves or inquiry submissions.

Search handoff uses local session storage rather than putting free-text searches into URLs or analytics parameters. Questionnaire answers remain browser-local; platform and training-style explanations are displayed to the visitor, not added to analytics events.

## Preview completed

The actual homepage, finder, catalog, and an existing Boostcamp profile were viewed in the browser with the existing 36-app catalog. The new eight-step finder was completed through an Android, muscle-building, beginner, program-choice, commercial-gym, expert-program, no-AI-preference, free-access path. It produced preference-fit results and product explanations. Desktop and 375px layouts were inspected; narrow page widths stayed within the viewport. A usable-free-tier catalog category showed filtered profiles. No synthetic product page or emulator was used for this public-site review. No inquiry, admin save, deployment, or publication was made.

TypeScript and whitespace checks passed after source edits. Lint, new questionnaire regression checks, the complete test suite, and production build remain owner-run. These checks are not claimed as passing for the public rebuild.
