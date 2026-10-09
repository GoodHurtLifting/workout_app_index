import type { AppRecord } from "@/lib/catalog";

// Admin-only research drafts. Never add these to the bundled public `apps` list.
export const catalogResearchSubmissionIds: Record<string, string> = {
  stark: "0Rbzea15uA9TZdX2rwZh",
};

export const catalogResearchDrafts: Record<string, AppRecord> = {
  "aldo-coach": {
    id: "aldo-coach",
    name: "Aldo Coach",
    initials: "AC",
    color: "#496f5d",
    type: "AI-guided training program and workout coach",
    bestFor: "Lifters who want an adaptive program and set-by-set coaching in the same logbook",
    description: "Aldo builds a training program around goals, equipment, schedule, and training history, then coaches within the workout log. After a set, it can explain performance and propose changes to upcoming loads or sessions, which the user can accept or decline.",
    price: "Free now, with no card or trial clock; the developer says paid tiers are planned, with no confirmed price or launch date.",
    monthlyPrice: 0,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: true,
      programLibrary: false,
    },
    platforms: ["iOS", "Apple Watch", "Web"],
    ai: "AI central",
    legit: 78,
    legitAssessment: {
      rubricVersion: "initial-v1",
      coreExecution: 85,
      usability: 70,
      reliability: 70,
      value: 90,
      supportPrivacy: 75,
      confidence: "Moderate",
      rationale: "Provisional. Owner testing confirms a useful generated plan, warm-ups, set logging, and responsive load suggestions. Long onboarding, unclear adjustment/navigation moments, and a rest-timer reset limit usability. Free access is strong current value, but sustained reliability and privacy controls need longer testing and rechecking.",
      checkedAt: "2026-10-09",
      sourceUrls: ["https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375"],
    },
    goals: ["Build muscle", "Get stronger", "Track workouts", "General fitness"],
    features: [
      "AI-generated programs",
      "Adaptive programming",
      "Automatic progression",
      "Set-by-set coaching",
      "Fast logging",
      "Workout history",
      "Wearables",
      "Rest timer",
    ],
    level: ["Intermediate", "Advanced"],
    authorship: "AI-generated",
    caveat: "The initial interview and program build took significant time in one hands-on test, and the app uses training terms that may challenge beginners. Post-workout navigation and proposed changes were sometimes unclear. Coaching sends relevant personal training context to Anthropic; it is not a substitute for a coach who can observe technique.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: ["Commercial gym", "Home gym", "Bodyweight"],
    researchStatus: "Candidate",
    verifiedSections: 0,
    totalSections: 7,
    trainingRelationship: {
      planningStyle: "Let the app adapt",
      secondaryStyles: ["Follow a complete path", "Just log the work"],
      choiceLoad: "Low",
      continuity: "Session-adaptive",
      customization: "Guided flexibility",
      decisionsRemoved: "The coach proposes the program, writes sessions and warm-ups, suggests next loads, and adjusts future work in response to logged performance or schedule changes.",
      decisionsRemaining: "You describe goals and constraints, judge whether its suggestions feel appropriate, accept or decline changes, and remain responsible for technique and safety.",
      tradeoff: "It can take on more programming decisions than a conventional logger, but setup is lengthy and the AI's recommendations still require the user's judgment.",
      idealUser: "You are comfortable discussing training in detail and want an AI coach to write the plan, react to each set, and keep your workout log in the same place.",
      notFor: "You want to start lifting immediately, avoid AI, need a native Android app, or rely on an in-person coach to observe your form.",
    },
    originalityProfile: {
      score: 78,
      level: "Distinctive",
      originalMechanics: 84,
      productPointOfView: 80,
      visualIdentity: 68,
      meaningfulDifferentiation: 86,
      defensibility: 72,
      summary: "Its distinctive idea is to make coaching part of the live workout log: set results can produce a proposed change to the session or later plan. The split onboarding and workout presentation is less cohesive than the coaching concept.",
      evidenceNote: "Provisional editorial assessment based on one owner-tested workout, the current App Store description, and comparison with the catalog. Sustained coaching quality and the breadth of comparable products still need testing.",
    },
  },
  stark: {
    id: "stark",
    name: "Stark",
    initials: "ST",
    color: "#536b83",
    type: "Workout logger and program planner",
    bestFor: "Lifters who want a fast logbook with ready-made or self-built programs",
    description: "Stark combines strength-workout logging, training history, ready-made programs, and a workout builder on iPhone and Apple Watch. The developer also describes rule-based workout generation and progression suggestions, which still need hands-on verification.",
    price: "Free to start; Premium pricing and trial terms are not independently confirmed.",
    monthlyPrice: null,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: true,
    },
    platforms: ["iOS", "Apple Watch"],
    ai: "No AI identified",
    legit: 68,
    legitAssessment: {
      rubricVersion: "initial-v1",
      coreExecution: 70,
      usability: 70,
      reliability: 60,
      value: 75,
      supportPrivacy: 65,
      confidence: "Low",
      rationale: "Provisional and evidence-limited. The live App Store confirms a substantial logger and planning feature set, and the free starting tier is promising. Logging speed, program depth, progression behavior, sync, Premium boundaries, and support have not yet been tested by WAI; these unknowns constrain the assessment.",
      checkedAt: "2026-10-09",
      sourceUrls: ["https://apps.apple.com/us/app/stark-workout/id6806627360", "https://starkworkout.app/"],
    },
    goals: ["Build muscle", "Get stronger", "Track workouts"],
    features: [
      "Fast logging",
      "Program library",
      "Routine builder",
      "Progress charts",
      "Rest timer",
      "Wearables",
      "Community",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Not assessed",
    caveat: "The website still describes a prelaunch product while its US App Store listing is live. Premium gates additional programs and advanced analytics, but current price and trial terms need confirmation. Workout generation, progression suggestions, free-tier boundaries, and data sync need in-app testing. Starting without registration does not establish local-only storage.",
    deliversCompleteProgram: false,
    programLibrary: true,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: ["Commercial gym", "Home gym", "Bodyweight"],
    researchStatus: "Candidate",
    verifiedSections: 0,
    totalSections: 7,
    trainingRelationship: {
      planningStyle: "Choose a proven path",
      secondaryStyles: ["Build it yourself", "Just log the work"],
      choiceLoad: "Moderate",
      continuity: "Program-based",
      customization: "Full control",
      decisionsRemoved: "A selected template supplies a starting schedule and exercises; the logbook remembers prior performance and handles rest timing.",
      decisionsRemaining: "You choose or build the program, decide whether to follow its progression, and make changes as training develops.",
      tradeoff: "Stark offers a flexible logbook and multiple starting paths, but it has not yet been shown to provide the depth of a hands-on coach.",
      idealUser: "You want an iPhone logbook that can start you with a program, yet lets you reshape workouts and track your own progress.",
      notFor: "You need Android access or expect a coach to make and explain every training decision for you.",
    },
    originalityProfile: {
      score: 63,
      level: "Clear identity",
      originalMechanics: 62,
      productPointOfView: 68,
      visualIdentity: 70,
      meaningfulDifferentiation: 60,
      defensibility: 55,
      summary: "Stark presents a focused workout-logbook identity with program choices and Apple Watch support. Its publicly described features are useful, but the distinctive training mechanism and depth of its progression guidance are not yet clear.",
      evidenceNote: "Low-confidence editorial assessment from the current App Store and website. WAI has not completed hands-on training sessions in Stark or a full direct-competitor comparison.",
    },
  },
};

export type ResearchSource = { label: string; url?: string; supports: string; followUp?: string };

export const catalogResearchSources: Record<string, ResearchSource[]> = {
  "aldo-coach": [
    {
      label: "US App Store listing, checked October 9, 2026",
      url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
      supports: "Lists free iPhone and Apple Watch access, AI-written programs, coaching attached to logged sets, suggested changes that require user acceptance, history, and offline access to the non-AI workout log. The current listing is rated 18+.",
      followUp: "Confirm current country availability, device requirements, exact free boundaries, and whether any paid offer has launched.",
    },
    {
      label: "Developer website",
      url: "https://aldo-coach.app/",
      supports: "Describes set-by-set coaching, program-building, and workout history. It links to a browser version and states that current access is free with no card or trial clock.",
      followUp: "Treat product claims as claims until tested. The site says training is for 'any age' while the privacy policy and App Store say 18+; use the more restrictive requirement until clarified.",
    },
    {
      label: "Developer privacy policy",
      url: "https://aldo-coach.app/privacy",
      supports: "October 6 policy names Supabase for account and training data, Anthropic for AI processing, and US storage and processing. It says relevant profile, training, schedule, chat, and optional health-related context can reach Anthropic. Injury and Apple Health use require separate consent, and the policy describes deletion and export choices.",
      followUp: "This is the developer's policy, not an independent privacy audit. Recheck the current version before approval and confirm the controls in the app.",
    },
    {
      label: "Owner hands-on test, October 2026: onboarding and plan",
      supports: "A 5x5 rebuild with recomposition accessories was generated around the owner's goals and home equipment. The plan, warm-up details, progression explanation, and approval step were useful. Getting to the first workout took about 15 minutes, and the program outline alone took about 48 seconds.",
      followUp: "Retest onboarding duration and navigation on the current version. This is one tester's experience, not a general performance measurement.",
    },
    {
      label: "Owner hands-on test, October 2026: workout and follow-up",
      supports: "Set logging and AI load suggestions worked in a completed workout. The owner liked adjusted warm-ups, lift summaries, the log interface, and the option to turn AI off. Editing a lift reset the rest timer; a proposed 20-pound increase and later program-adjustment flow needed clearer context. The post-workout route back to the broader dashboard was hard to find.",
      followUp: "Recheck the timer, suggestion clarity, and post-workout navigation after product updates. These are observed usability issues, not proof of a persistent defect.",
    },
    {
      label: "Developer correspondence, October 2026",
      supports: "The developer reported availability in the US, Canada, UK, EU, Iceland, and Norway; AI-off logging for a lift or whole workout; Claude Opus 5.5 for program work and Sonnet 5.5 for set coaching; and paid tiers planned later.",
      followUp: "These are developer claims. Reconfirm countries, model versions, and future pricing before publication.",
    },
  ],
  stark: [
    {
      label: "US App Store listing, checked October 9, 2026",
      url: "https://apps.apple.com/us/app/stark-workout/id6806627360",
      supports: "iPhone and Apple Watch availability, logging and program features, and Premium access to more programs and advanced analytics. The checked page does not establish the submitted subscription prices.",
      followUp: "Confirm current prices, trial and free/Premium boundaries in the app. The official website still says coming soon despite the live US store listing.",
    },
    {
      label: "Official feature overview",
      url: "https://starkworkout.app/features",
      supports: "Workout logging, history, rest timing, program tools, Apple Watch support, and optional social features as described by the developer.",
      followUp: "Test the actual flow and feature gates rather than treating product copy as independent verification.",
    },
    {
      label: "Official program overview",
      url: "https://starkworkout.app/programmes",
      supports: "Examples of ready-made strength programs, including full body, upper/lower, PHUL, PHAT, and StrongLifts 5x5.",
      followUp: "Check program authorship, depth, progression, and which programs are free.",
    },
    {
      label: "Privacy policy",
      url: "https://starkworkout.app/privacy-policy",
      supports: "The policy describes an anonymous guest account with training data stored through Supabase, optional Apple Health and social features, and a JSON export limited to some data types.",
      followUp: "Confirm that the privacy policy matches the current app. In particular, do not paraphrase 'no registration required' as local-only storage.",
    },
  ],
};

export function getUnmodifiedCandidateResearchDraft(record: AppRecord, sourceSubmissionId?: string): AppRecord | null {
  const draft = catalogResearchDrafts[record.id];
  const expectedSubmissionId = catalogResearchSubmissionIds[record.id];
  if (!draft || (expectedSubmissionId && expectedSubmissionId !== sourceSubmissionId) ||
      draft.name.toLowerCase() !== record.name.toLowerCase() ||
      record.researchStatus !== "Candidate" || record.type !== "Unclassified" ||
      record.description !== "Developer-submitted candidate. Product claims have not been independently verified.") return null;
  return { ...draft, name: record.name, initials: record.initials };
}
