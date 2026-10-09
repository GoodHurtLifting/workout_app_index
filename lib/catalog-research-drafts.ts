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
    legit: 0,
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
      score: 0,
      level: "Not assessed",
      originalMechanics: 0,
      productPointOfView: 0,
      visualIdentity: 0,
      meaningfulDifferentiation: 0,
      defensibility: 0,
      summary: "Not yet assessed.",
      evidenceNote: "The integrated set-by-set coaching appears distinctive, but a comparative originality assessment is still pending.",
    },
  },
  stark: {
    id: "stark",
    name: "Stark",
    initials: "ST",
    color: "#536b83",
    type: "Workout logger and program planner",
    bestFor: "Lifters who want a fast logbook with ready-made or self-built programs",
    description: "Stark combines strength-workout logging, training history, ready-made programs, and a workout builder on iPhone and Apple Watch. Its App Store listing also describes a workout generator, but the decision rules and coaching depth still need hands-on review.",
    price: "Free to start; US App Store lists Premium at $4.99/month or $39.99/year. Trial terms and regional prices need checking.",
    monthlyPrice: 4.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: true,
    },
    platforms: ["iOS", "Apple Watch"],
    ai: "Not assessed",
    legit: 0,
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
    caveat: "The public listing and website differ on program counts, and Premium gates additional programs and advanced analytics. Workout generation, progression suggestions, trial terms, and free-tier boundaries need in-app testing. Starting without registration does not mean training data stays only on-device.",
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
      score: 0,
      level: "Not assessed",
      originalMechanics: 0,
      productPointOfView: 0,
      visualIdentity: 0,
      meaningfulDifferentiation: 0,
      defensibility: 0,
      summary: "Not yet assessed.",
      evidenceNote: "Public product claims are recorded, but originality needs comparative and hands-on review.",
    },
  },
};

export type ResearchSource = { label: string; url?: string; supports: string; followUp?: string };

export const catalogResearchSources: Record<string, ResearchSource[]> = {
  "aldo-coach": [
    {
      label: "US App Store listing, checked October 8, 2026",
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
      label: "US App Store listing",
      url: "https://apps.apple.com/us/app/stark-workout/id6806627360",
      supports: "iPhone and Apple Watch availability, listed logging and program features, and US Premium prices of $4.99 monthly and $39.99 yearly.",
      followUp: "The listing has changed its program-count wording. Confirm current free and Premium counts in the app.",
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
