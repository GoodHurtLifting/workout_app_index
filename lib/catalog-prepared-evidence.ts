// Dated sources prepared during local research. These are not developer submissions.
// Keep first-party claims attributed to their publisher and leave untested behavior qualified.
export type PreparedEvidence = {
  id: string;
  source_type: "Official website" | "Google Play" | "Apple App Store" | "Official documentation" | "Privacy policy" | "Hands-on testing";
  url: string | null;
  claim_supported: string;
  checked_at: number;
  public: 0 | 1;
  internal_note: string | null;
};

const checked = (date: string) => Date.parse(`${date}T12:00:00Z`);

export const catalogPreparedEvidence: Record<string, PreparedEvidence[]> = {
  "aldo-coach": [
    {
      id: "research-aldo-coach-2026-10-21-ui-photos",
      source_type: "Hands-on testing",
      url: null,
      claim_supported: "Four owner-supplied UI photos reviewed October 21 show the rebuilt program at Week 2 of 9; a Sources diagram with memory 12 of 12 notes, training log 3 sessions, and 5 shared / 2 not shared; weekly working-set volume and body-part set charts; and menu routes for Profile, Aldo's memory, Coach & AI, Data & Backup, and Advanced. Plan/schedule labels visibly overlap and profile text truncates in the captured Sources view. The owner reports five workouts, so the three-session display needs scope explanation. The sharing label does not distinguish explicit permission from available or selected context.",
      checked_at: checked("2026-10-21"),
      public: 0,
      internal_note: "Visible UI evidence only: no verification of source retrieval, complete log count, chart calculations, edit controls, backend data flow, or unauthorized sharing. Menu routes exist; deeper options and behavior were not fully tested. Photos are private, include account details, and are not public profile images. Attachment filenames 1000012206.jpg through 1000012209.jpg identify the four supplied images.",
    },
    {
      id: "research-aldo-coach-2026-10-21-fifth-session",
      source_type: "Hands-on testing",
      url: null,
      claim_supported: "Scope: The owner identifies this as the fifth Aldo workout. Earlier three-workout summaries are historical scope, not the current total. This report includes finish-workout behavior but does not independently document every intervening session or establish that the planned account reset occurred. Previous-load reference: On a lighter recovery day in an alternating program, the previous-weight display used the most recent heavy-day weight rather than the previous light-day weight. This is an observed reference-context limitation; it does not establish an incorrect stored log or prove the label promises a like-for-like light-day comparison. Coupled controls: Turning off per-set AI feedback also removed the prompt to repopulate sets after editing a recommended weight. The owner considered this a minor loss but expected the controls to be independent. Functional assistance versus coaching commentary is a proposed design distinction, not a confirmed existing setting or required implementation. Feedback on re-enable: After returning from Program and re-enabling set feedback, conversation resumed with earlier context. Feedback appeared for already-completed squats that had been performed with AI off, but not for the overhead-press working set just completed before enabling it. Later, re-enabling AI for accessories produced a recap of deadlifts performed with AI off. This demonstrates some retrospective access to workout context, while timing and coverage were unclear; it does not prove when feedback was generated or what background model processing occurred. Warm-up numbering: Per-set feedback described set 4 complete after two warm-up sets and two working sets, while the visible working-set column showed set 2. This reinforces the earlier numbering mismatch. Four total sets is arithmetically consistent; the issue is differing numbering conventions without clear labels, not proof of a wrong applied set. Incorrect deadlift recap: The owner reports completing 3 x 5 deadlifts, but the AI recap said a full 5 x 5 at the working weight. This is a concrete owner-reported false workout summary, stronger evidence than the ambiguous set numbering. It does not establish that the underlying workout log was changed or identify whether the fault lay in model output, supplied context, retrieval, or Aldo integration. Progression question: The AI described 185-pound deadlifts as tying the previous heaviest pull, while the current prescription had been 170. The owner expected only squats to be lighter on this recovery day, with other lifts progressing from prior work. Record the unexplained prescription versus the owner's intended program; the exact chosen program rules and Aldo's rationale have not been checked, so this is not independently verified as incorrect loading or a required increase. Fit and diminishing feedback value: By the fifth workout the owner no longer found per-set commentary necessary and questioned whether program-building benefits outweighed ambiguity and build waits. The suggestion that beginners might retain it longer is a hypothesis, not tested beginner evidence. Keeping accurate logs while commentary is disabled is a user expectation; it does not require continuous AI calls. Finish-workout handoff: Finish workout generated a brief beneath the log on the same screen with a share button, but the owner still lacked a clear next action and felt stuck. The owner did not see a useful purpose for sharing the long AI brief. This reinforces recurring completion-navigation friction; it does not establish human trainers' preferences or that no other navigation route exists.",
      checked_at: checked("2026-10-21"),
      public: 0,
      internal_note: "Later evidence supersedes earlier three-workout scope and strengthens recap-accuracy and usability concerns. No raw log inspection, confirmed model-specific root cause, account-reset outcome, or numeric score approval. Do not treat hypothetical beginner fit or trainer preferences as tested facts.",
    },
    {
      id: "research-aldo-coach-2026-10-21-rebuild-recovery",
      source_type: "Hands-on testing",
      url: null,
      claim_supported: "October 21 recovery follow-up supersedes the earlier unresolved missing-plan outcome: the owner explicitly selected eight weeks and rebuilt through Program. Monday's chat agreement may not have completed that process. After an app-estimated seven-minute build, approval led to another finalization phase estimated at one minute; elapsed time was not measured. The resulting block showed week 2 of 9 and retained visible prior training dates. The owner liked that continuity, but questioned repeated main-lift prescriptions alongside changed accessories. Repetition alone was not established as a programming error. Visible October 12 and 19 entries suggested seven days between sessions, conflicting with the AI's earlier ten-day account; its calculation is unknown. After another AI conversation and full rebuild, the owner considered the session appropriate: recovery squats, primary overhead press and deadlift, close-grip bench, planks, and EZ-bar French press. The deadlift appeared light to the owner but was acceptable. No completed October 21 workout has been reported. This recovery demonstrates available history and a workable rebuilt session, not a verified remaining eight-week progression. Two lengthy block builds and intervening clarification delayed readiness to train. The owner judged that this could outlast a planned ten-minute treadmill warm-up; that is an anticipated gym scenario, not a measured delay. The AI's reflexively agreeable apology frustrated the owner and is not independent proof of a programming defect. The owner was unsure how to correct one session without disturbing the remaining block. The observed burden is repeated waiting, interpretation, and correction before the plan feels ready to use. During this sequence, Aldo said the owner had hit a usage limit and was automatically switched to Pro at no cost. Continued no-cost access was reported; standard allowances, reset periods, Pro entitlements, and future paid terms are unverified. The message alone does not prove each rebuild consumed a quota. Concern that future paid users could bear the cost of correcting app-generated plans is a conditional value concern, not an observed charge or established billing policy.",
      checked_at: checked("2026-10-21"),
      public: 0,
      internal_note: "Later recovery outcome qualifies earlier absence and program-loss concerns. Future correction costs are hypothetical; no current charge observed. Do not count this as a fourth completed workout.",
    },
    {
      id: "research-aldo-coach-2026-10-21-no-visible-plan",
      source_type: "Hands-on testing",
      url: null,
      claim_supported: "On reopening Aldo October 21 before the planned reset, the owner found no scheduled workout and nothing under Program > Plan, despite the earlier agreement to an eight-week continuation. This extends the earlier program-ended warning to a later visit with no visible plan. Whether the continuation was saved, removed, filtered, or failed to load remains unresolved; backend data loss is not established.",
      checked_at: checked("2026-10-21"),
      public: 0,
      internal_note: "Owner-reported pre-reset return check; no backend inspection or confirmed data loss. Existing scores retained.",
    },
    {
      id: "research-aldo-coach-2026-10-21-owner-followup",
      source_type: "Hands-on testing",
      url: null,
      claim_supported: "Evidence updated October 21 from three completed owner workouts and return use. Program generation, warm-ups, logging, and performance-based suggestions were useful. Setup, repeated AI waits, post-completion navigation, a timer reset after an edit, and one ambiguous set reference added friction. Aldo prescribed 40-pound dumbbells despite a stated 25-pound-per-dumbbell limit; after a reminder, its higher-rep adjustment was acceptable to the owner. The owner agreed in chat to an eight-week continuation, completed the third workout, and then saw a red program-ended warning. Stated equipment constraints and agreed program changes did not consistently carry through to the workout experience. The saved program state and cause are unresolved; this does not establish absent persistent memory, context loss, or data loss. Existing scores are retained pending explicit owner review of a separate reassessment proposal; the earlier neutral reliability rationale is superseded. Free access was useful in owner testing. Store disclosures are first-party claims, not a backend audit, and editorial correspondence is excluded from customer-support evidence.",
      checked_at: checked("2026-10-21"),
      public: 0,
      internal_note: "Owner-dictated observations from three completed workouts and follow-up. No measured latency, confirmed data loss, diagnosed root cause, or score approval.",
    },
    {
      id: "research-aldo-coach-2026-10-21-memory-claims",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
      claim_supported: "The developer describes editable memory holding equipment, working loads and preferences, plus exercise history consulted before writing sessions.",
      checked_at: checked("2026-10-21"),
      public: 1,
      internal_note: "First-party claims, not verified architecture or evidence that every recommendation applies stored constraints. Website and privacy page were inaccessible through the research tool October 21.",
    },
    {
      id: "research-aldo-coach-2026-10-19-apple-store",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
      claim_supported: "The US App Store listing identifies iPhone and Apple Watch access, a free download, and developer-described AI program building, set coaching, workout logging, and history.",
      checked_at: checked("2026-10-19"),
      public: 1,
      internal_note: "Store features and release notes are developer-authored claims, not independent testing. Free download does not establish future pricing or every feature gate.",
    },
  ],
  stark: [
    {
      id: "research-stark-2026-10-09-apple-store",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/stark-workout/id6806627360",
      claim_supported: "The US App Store listing identifies iPhone and Apple Watch availability and describes workout logging, programs, and Premium access to more programs and analytics.",
      checked_at: checked("2026-10-09"),
      public: 1,
      internal_note: "The checked listing did not establish submitted subscription prices or verify the developer's feature claims in use.",
    },
  ],
  "gir-iron": [
    {
      id: "research-gir-iron-2026-10-13-apple-store",
      source_type: "Apple App Store",
      url: "https://apps.apple.com/us/app/%C3%A6gir-iron/id6763792846",
      claim_supported: "The US App Store listing identifies a live iPhone app with Apple Watch compatibility, free download with in-app purchases, and developer-described program-building and strength-logging features.",
      checked_at: checked("2026-10-13"),
      public: 1,
      internal_note: "The store description is developer-authored. It does not independently test logging, offline sync, iPad layout, or language coverage.",
    },
    {
      id: "research-gir-iron-2026-10-13-google-play",
      source_type: "Google Play",
      url: "https://play.google.com/store/apps/details?id=com.aegirlab.app.twa",
      claim_supported: "Google Play identifies a live Android listing and describes free solo training, program building, strength-sport logging, and paid coach subscriptions.",
      checked_at: checked("2026-10-13"),
      public: 1,
      internal_note: "The product description is developer-authored. Exercise counts conflict across sources; do not use a precise count.",
    },
    {
      id: "research-gir-iron-2026-10-19-official-site",
      source_type: "Official website",
      url: "https://www.aegirlab.com/",
      claim_supported: "The official site describes free athlete access, optional paid AI, coach pricing, iOS, Android and web access, coach-to-athlete program delivery, and training-data import and export.",
      checked_at: checked("2026-10-19"),
      public: 1,
      internal_note: "First-party claims. Coach views were observed with an empty test roster, but program delivery and import/export outcomes were not tested.",
    },
    {
      id: "research-gir-iron-2026-10-13-privacy",
      source_type: "Privacy policy",
      url: "https://www.aegirlab.com/privacy/",
      claim_supported: "The developer privacy policy discloses Firebase storage and authentication, optional Anthropic AI processing, optional health and Strava integrations, and stated deletion and export procedures.",
      checked_at: checked("2026-10-13"),
      public: 1,
      internal_note: "Disclosure review only. WAI has not audited the implementation of data handling, deletion, or export.",
    },
  ],
};

export function preparedEvidenceForApp(appId: string): PreparedEvidence[] {
  return catalogPreparedEvidence[appId] ?? [];
}
