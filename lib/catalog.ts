export type AiStatus =
  "No AI identified" | "Optional AI" | "AI supporting features" | "AI central";

export type ResearchStatus =
  "Candidate" | "Researching" | "Evaluation ready" | "Reviewed";

export type AppRecord = {
  id: string;
  name: string;
  initials: string;
  color: string;
  type: string;
  bestFor: string;
  description: string;
  price: string;
  monthlyPrice: number | null;
  hasUsableFreeTier: boolean;
  freeTierCapabilities: {
    completeProgram: boolean;
    adaptiveProgramming: boolean;
    programLibrary: boolean;
  };
  platforms: string[];
  ai: AiStatus;
  legit: number;
  goals: string[];
  features: string[];
  level: string[];
  authorship: string;
  caveat: string;
  deliversCompleteProgram: boolean;
  programLibrary: boolean;
  adaptiveProgramming: boolean;
  supportedTrainingEnvironments: string[];
  researchStatus: ResearchStatus;
  verifiedSections: number;
  totalSections: number;
};

export const apps: AppRecord[] = [
  {
    id: "hevy",
    name: "Hevy",
    initials: "HV",
    color: "#ff5a3d",
    type: "Workout logger + trainer",
    bestFor: "Fast, social workout logging",
    description:
      "A strength workout tracker for building routines, logging sessions, reviewing progress, sharing activity, and optionally generating a goal-based program with Hevy Trainer.",
    price: "Free / Hevy Pro from $2.99 monthly",
    monthlyPrice: 2.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android", "iOS"],
    ai: "AI supporting features",
    legit: 89,
    goals: ["Build muscle", "Get stronger", "Track workouts"],
    features: [
      "Fast logging",
      "Progress charts",
      "Community",
      "Wearables",
      "Program library",
      "Algorithmic trainer",
      "AI workout analysis",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "User-created",
    caveat:
      "The free tier limits routines, custom exercises, and data-history views. Hevy Trainer is a Pro-only algorithmic program generator; Hevy states that it does not use AI to create programs.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "boostcamp",
    name: "Boostcamp",
    initials: "BC",
    color: "#ffbd31",
    type: "Program library + logger",
    bestFor: "Trainer-written strength programs",
    description:
      "A workout tracker with a large free library of coach-designed and community programs, custom program tools, detailed logging, and an optional AI coach.",
    price: "Free / Pro $14.99 monthly or $59.99 yearly",
    monthlyPrice: 14.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: true, adaptiveProgramming: false, programLibrary: true },
    platforms: ["Android", "iOS"],
    ai: "Optional AI",
    legit: 91,
    goals: ["Build muscle", "Get stronger", "Powerlifting"],
    features: [
      "Expert programs",
      "Progression",
      "Exercise demos",
      "Fast logging",
      "Offline use",
      "Detailed analytics",
      "Community",
      "Optional AI coach",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "The free tier includes the tracker and most of the program library. The AI coach, advanced analytics, and some exclusive coach programs require Pro.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
      "Bodyweight",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "fitbod",
    name: "Fitbod",
    initials: "FB",
    color: "#6d5efc",
    type: "Adaptive program",
    bestFor: "Automatically generated workouts",
    description:
      "Uses AI to generate and adjust workouts around goals, experience, available equipment, preferences, and prior performance.",
    price: "$15.99 monthly or $95.99 yearly",
    monthlyPrice: 15.99,
    hasUsableFreeTier: false,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android", "iOS"],
    ai: "AI central",
    legit: 84,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency"],
    features: [
      "Adaptive programming",
      "Exercise demos",
      "Progress charts",
      "Substitutions",
      "Recovery tracking",
      "Wearables",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "AI-generated",
    caveat:
      "After the trial, continued access requires a subscription. The core programming experience is AI-generated, so it conflicts with an avoid-AI requirement.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Bodyweight",
      "It varies",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "strong",
    name: "Strong",
    initials: "ST",
    color: "#1ca47c",
    type: "Workout logger",
    bestFor: "Simple, flexible workout tracking",
    description:
      "A focused workout logger for creating routines, recording varied set types, timing rests, and reviewing strength and volume progress.",
    price: "Free / Strong PRO $4.99 monthly or $29.99 yearly on US iOS",
    monthlyPrice: 4.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android", "iOS"],
    ai: "No AI identified",
    legit: 87,
    goals: ["Build muscle", "Get stronger", "Track workouts"],
    features: [
      "Fast logging",
      "Custom workouts",
      "Progress charts",
      "Rest timer",
      "Exercise library",
      "Data export",
      "Wearables",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "User-created",
    caveat:
      "The free tier saves unlimited workouts but limits users to three custom routines. Strong supplies tracking tools rather than a guided or adaptive training program.",
    deliversCompleteProgram: false,
    programLibrary: false,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "caliber",
    name: "Caliber",
    initials: "CA",
    color: "#2675f5",
    type: "Coaching platform",
    bestFor: "Guidance with optional human coaching",
    description:
      "Strength training plans, education, progress tracking, and an optional paid coaching layer.",
    price:
      "Free / Plus up to $12 monthly or $72 yearly; coaching priced separately",
    monthlyPrice: 12,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android", "iOS"],
    ai: "AI supporting features",
    legit: 88,
    goals: ["Build muscle", "Get stronger", "Learn resistance training"],
    features: [
      "120+ expert programs",
      "Human coaching",
      "Exercise demos",
      "Progress charts",
      "Strength Score",
      "Workout groups",
    ],
    level: ["Beginner", "Intermediate"],
    authorship: "Trainer-written",
    caveat:
      "The free logger is substantial, but structured Plus plans and hands-on coaching are separate paid levels; coaching costs materially more.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "lift-league",
    name: "The Lift League",
    initials: "LL",
    color: "#e64040",
    type: "Structured training",
    bestFor: "Scored block training and shared progress",
    description:
      "An Android strength-training app in development, built around structured training blocks, workout logging, performance scoring, and accountability features.",
    price: "Price not publicly announced",
    monthlyPrice: null,
    hasUsableFreeTier: false,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android"],
    ai: "No AI identified",
    legit: 82,
    goals: ["Build muscle", "Get stronger", "Consistency"],
    features: [
      "Structured training blocks",
      "Workout history",
      "Custom block builder",
      "Leaderboards",
      "Built-in motivation",
      "Training circles",
      "Performance scoring",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "Not publicly released. Shared ownership with Workout App Index; evaluated under the same published criteria.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 3,
    totalSections: 8,
  },
  {
    id: "jefit",
    name: "JEFIT",
    initials: "JF",
    color: "#4aa9eb",
    type: "Logger + adaptive plans",
    bestFor: "Maximum planning choice and detailed tracking",
    description:
      "A broad workout toolkit combining manual planning, built-in programs, community routines, and an AI-powered adaptive plan.",
    price: "Free / Elite $12.99 monthly or $69.99 yearly",
    monthlyPrice: 12.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: true, adaptiveProgramming: false, programLibrary: true },
    platforms: ["Android", "iOS"],
    ai: "AI supporting features",
    legit: 83,
    goals: ["Build muscle", "Get stronger", "Track workouts"],
    features: [
      "Exercise library",
      "Custom workouts",
      "Adaptive programming",
      "Program library",
      "Progress charts",
      "Community",
      "Wearables",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Mixed",
    caveat:
      "Its many self-directed, community, library, and AI-guided routes can feel busy if you want one obvious path.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "strengthlog",
    name: "StrengthLog",
    initials: "SL",
    color: "#ef4f4f",
    type: "Logger + programs",
    bestFor: "Detailed strength tracking and proven programs",
    description:
      "Combines unlimited workout logging with a large exercise library, strength programs, statistics, goals, timers, calculators, and wearable support.",
    price: "Free / Premium; US iOS monthly listing $16.90",
    monthlyPrice: 16.9,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: true, adaptiveProgramming: false, programLibrary: true },
    platforms: ["Android", "iOS"],
    ai: "No AI identified",
    legit: 90,
    goals: ["Build muscle", "Get stronger", "Powerlifting"],
    features: [
      "Expert programs",
      "Fast logging",
      "Detailed analytics",
      "Rest timer",
      "Exercise library",
      "Wearables",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "The free tier includes unlimited logging and selected programs, while the full program catalog and advanced statistics require Premium. Store pricing varies by country and platform.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 6,
    totalSections: 8,
  },
  {
    id: "stronglifts",
    name: "StrongLifts",
    initials: "5×5",
    color: "#ff3c32",
    type: "Structured program",
    bestFor: "Simple barbell strength progression",
    description:
      "Guides lifters through a focused progressive barbell routine with automatic workout progression.",
    price: "Free / Pro $11.99 monthly or $59.99 yearly",
    monthlyPrice: 11.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: true, adaptiveProgramming: true, programLibrary: false },
    platforms: ["Android", "iOS"],
    ai: "No AI identified",
    legit: 86,
    goals: ["Get stronger", "Learn resistance training", "Consistency"],
    features: [
      "Automatic progression",
      "Rest timer",
      "Exercise demos",
      "Simple interface",
      "Workout templates",
      "Wearables",
    ],
    level: ["Beginner", "Intermediate"],
    authorship: "Trainer-written",
    caveat:
      "The core training approach is intentionally narrow and barbell dependent.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "alpha-progression",
    name: "Alpha Progression",
    initials: "AP",
    color: "#f2c600",
    type: "Adaptive program",
    bestFor: "Hypertrophy-focused progression",
    description:
      "Builds a stable hypertrophy plan around goals, schedule, and equipment, then adjusts set-level progression from performance.",
    price: "Free / Pro $12.99 monthly or $79.99 yearly",
    monthlyPrice: 12.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android", "iOS"],
    ai: "No AI identified",
    legit: 85,
    goals: ["Build muscle", "Get stronger"],
    features: [
      "Adaptive programming",
      "Progression",
      "Exercise demos",
      "Detailed analytics",
      "Custom workouts",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Rules-based adaptive",
    caveat:
      "Manual plans and logging remain free, but plan generation, progression recommendations, advanced charts, and periodization tools require Pro.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "fitnotes",
    name: "FitNotes",
    initials: "FN",
    color: "#56a66a",
    type: "Workout logger",
    bestFor: "Free, straightforward Android logging",
    description:
      "A lightweight Android gym log for routines, exercise history, records, and basic progress tracking.",
    price: "Free",
    monthlyPrice: 0,
    hasUsableFreeTier: true,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Android"],
    ai: "No AI identified",
    legit: 88,
    goals: ["Build muscle", "Get stronger", "Track workouts"],
    features: [
      "Fast logging",
      "Custom workouts",
      "Progress charts",
      "Offline use",
      "CSV export",
      "Local and cloud backup",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "User-created",
    caveat:
      "Android only. It records and organizes the training you choose but does not prescribe progression or a complete program.",
    deliversCompleteProgram: false,
    programLibrary: false,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
    ],
    researchStatus: "Researching",
    verifiedSections: 6,
    totalSections: 8,
  },
  {
    id: "rp-hypertrophy",
    name: "RP Hypertrophy",
    initials: "RP",
    color: "#cf245e",
    type: "Adaptive program",
    bestFor: "Technical hypertrophy programming",
    description:
      "A specialized hypertrophy system with premade plans or a custom mesocycle builder, then week-to-week adjustments from lifter feedback.",
    price: "$34.99 monthly or $299.99 yearly",
    monthlyPrice: 34.99,
    hasUsableFreeTier: false,
    freeTierCapabilities: { completeProgram: false, adaptiveProgramming: false, programLibrary: false },
    platforms: ["Web", "Android", "iOS"],
    ai: "No AI identified",
    legit: 87,
    goals: ["Build muscle"],
    features: [
      "Adaptive programming",
      "Progression",
      "100+ training plans",
      "Technique videos",
      "Exercise substitutions",
      "Custom mesocycles",
    ],
    level: ["Intermediate", "Advanced"],
    authorship: "Rules-based adaptive",
    caveat:
      "It is expensive, focused specifically on muscle growth, and its mesocycle and autoregulation concepts may overwhelm a brand-new lifter.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
];

export type CatalogEvidenceSeed = {
  id: string;
  appId: string;
  sourceType: string;
  url: string;
  claimSupported: string;
  public: boolean;
};

export type PlanningStyle =
  | "Follow a complete path"
  | "Choose a proven path"
  | "Let the app adapt"
  | "Build it yourself"
  | "Just log the work";

export type TrainingRelationship = {
  planningStyle: PlanningStyle;
  secondaryStyles?: PlanningStyle[];
  choiceLoad: "Low" | "Moderate" | "High";
  continuity:
    | "Single coherent system"
    | "Program-based"
    | "Session-adaptive"
    | "User-directed";
  customization: "Follow as written" | "Guided flexibility" | "Full control";
  decisionsRemoved?: string;
  decisionsRemaining?: string;
  tradeoff?: string;
  idealUser: string;
  notFor: string;
};

export type OriginalityProfile = {
  score: number;
  level: "Conventional" | "Clear identity" | "Distinctive" | "Category-defining";
  originalMechanics: number;
  productPointOfView: number;
  visualIdentity: number;
  meaningfulDifferentiation: number;
  defensibility: number;
  summary: string;
  evidenceNote: string;
};

export const trainingRelationships: Record<string, TrainingRelationship> = {
  hevy: {
    planningStyle: "Build it yourself",
    secondaryStyles: ["Let the app adapt", "Just log the work"],
    choiceLoad: "Moderate",
    continuity: "User-directed",
    customization: "Full control",
    decisionsRemoved:
      "Logging, exercise history, progress tracking, and—if you use Hevy Trainer—initial program generation and progression suggestions.",
    decisionsRemaining:
      "In the normal logger experience, you choose or build the routine and decide how the pieces fit together.",
    tradeoff:
      "You get broad control and useful optional guidance, but not one opinionated training system that governs the whole experience.",
    idealUser:
      "You already have a routine—or enjoy creating one—and want fast logging, progress data, and a social layer without giving up control.",
    notFor:
      "You want one opinionated training system to make nearly every programming decision for you.",
  },
  boostcamp: {
    planningStyle: "Choose a proven path",
    choiceLoad: "High",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Once you select a program, its schedule, exercises, and progression provide the path forward.",
    decisionsRemaining:
      "The largest decision comes upfront: comparing a substantial catalog and choosing which program to trust.",
    tradeoff:
      "Its breadth makes it easier to find a specialized program, but that same breadth can create selection fatigue.",
    idealUser:
      "You want credible programs and a capable logger, and you enjoy comparing options before committing to a training path.",
    notFor:
      "A large catalog feels like homework and you would rather be given one coherent system to follow.",
  },
  fitbod: {
    planningStyle: "Let the app adapt",
    choiceLoad: "Low",
    continuity: "Session-adaptive",
    customization: "Guided flexibility",
    decisionsRemoved:
      "The app chooses each session around your goals, equipment, training history, and recent performance.",
    decisionsRemaining:
      "You provide preferences, substitutions, and feedback, then decide how much to trust the generated session.",
    tradeoff:
      "You make fewer daily programming decisions, but the long-term rationale is less visible than in a fixed coach-authored program.",
    idealUser:
      "You want the app to generate the next workout around your equipment, history, and preferences, and you are comfortable relying on AI.",
    notFor:
      "You want a transparent fixed program, coach-authored progression, or an entirely AI-free experience.",
  },
  strong: {
    planningStyle: "Just log the work",
    choiceLoad: "Low",
    continuity: "User-directed",
    customization: "Full control",
    decisionsRemoved:
      "Workout recording, rest timing, history, and progress calculations are handled cleanly.",
    decisionsRemaining:
      "You remain responsible for exercise selection, weekly structure, progression, and program changes.",
    tradeoff:
      "The app stays out of your way, which is excellent when you already have a plan and unhelpful when you do not.",
    idealUser:
      "You know what you plan to train and want a focused, flexible logbook that stays out of the way.",
    notFor:
      "You need the app to choose a complete program, explain training decisions, or adapt programming for you.",
  },
  caliber: {
    planningStyle: "Choose a proven path",
    secondaryStyles: ["Build it yourself", "Just log the work"],
    choiceLoad: "Moderate",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Structured plans and educational guidance reduce the need to design training from scratch.",
    decisionsRemaining:
      "You still choose how much guidance or coaching to use and manage changes outside the selected plan.",
    tradeoff:
      "It offers a path from self-guided training to human coaching, but that service-oriented experience is more than a minimal logger.",
    idealUser:
      "You want structured strength guidance, education, and the option to add human coaching when self-direction is not enough.",
    notFor:
      "You only want a minimal logger or do not want coaching-oriented prompts and services.",
  },
  "lift-league": {
    planningStyle: "Follow a complete path",
    choiceLoad: "Low",
    continuity: "Single coherent system",
    customization: "Follow as written",
    decisionsRemoved:
      "The system supplies complementary training blocks, exercise sequencing, progression context, and a clear next workout.",
    decisionsRemaining:
      "You choose when to train and apply effort honestly, without having to assemble a program from unrelated options.",
    tradeoff:
      "A cohesive system reduces choice overload, but it intentionally offers less program-hopping and exercise-level freedom.",
    idealUser:
      "You want a complete training path, meaningful variety, and visible progress without browsing endless programs or writing your own workouts.",
    notFor:
      "You frequently change programs, want complete exercise-level control, or enjoy assembling your own training from a large library.",
  },
  jefit: {
    planningStyle: "Build it yourself",
    secondaryStyles: [
      "Let the app adapt",
      "Choose a proven path",
      "Just log the work",
    ],
    choiceLoad: "High",
    continuity: "User-directed",
    customization: "Full control",
    decisionsRemoved:
      "Logging, exercise reference, analytics, and—if you select its Adaptive Plan—weekly exercise, load, and rep recommendations.",
    decisionsRemaining:
      "You decide whether to build, download, browse, instantly generate, or adapt a routine, then navigate a large set of tools and options.",
    tradeoff:
      "JEFIT can accommodate almost any planning style, but that breadth asks you to choose how the app should serve you before it can simplify training.",
    idealUser:
      "You value a broad exercise database, many planning tools, and detailed control more than a tightly constrained experience.",
    notFor:
      "You are easily overwhelmed by options or want one clear training path with minimal setup.",
  },
  strengthlog: {
    planningStyle: "Choose a proven path",
    secondaryStyles: ["Build it yourself", "Just log the work"],
    choiceLoad: "Moderate",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "A selected program can provide structure and progression, while the logger handles detailed records, calculations, and statistics.",
    decisionsRemaining:
      "You choose between following a program and using the app as a self-directed training toolkit.",
    tradeoff:
      "It can support several training styles well, but it does not impose one simple path through its many tools and programs.",
    idealUser:
      "You want a serious strength log plus proven programs, calculators, and detailed training statistics in one place.",
    notFor:
      "You want the app to generate every session automatically or prefer an extremely minimal interface.",
  },
  stronglifts: {
    planningStyle: "Follow a complete path",
    choiceLoad: "Low",
    continuity: "Single coherent system",
    customization: "Follow as written",
    decisionsRemoved:
      "The system chooses the core lifts, workout rotation, starting weights, load increases, repeats, and deload rules.",
    decisionsRemaining:
      "You set your schedule, supply the required barbell equipment, and decide when your goals have outgrown the narrow system.",
    tradeoff:
      "It earns exceptional clarity by limiting exercise variety and keeping the training philosophy deliberately narrow.",
    idealUser:
      "You want a simple barbell-focused progression with a clear next workout and very few programming decisions.",
    notFor:
      "You need broad exercise variety, hypertrophy specialization, or substantial program customization.",
  },
  "alpha-progression": {
    planningStyle: "Let the app adapt",
    secondaryStyles: ["Build it yourself"],
    choiceLoad: "Moderate",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Pro can generate a stable plan from your goals, schedule, equipment, and priorities, then recommend set-level progression from performance.",
    decisionsRemaining:
      "You refine exercises and priorities, report performance, and decide whether to accept recommendations; free users build and progress plans themselves.",
    tradeoff:
      "It preserves a recognizable long-term plan while automating progression, but the meaningful automation requires Pro and still expects user judgment.",
    idealUser:
      "You want hypertrophy-focused programming that adjusts around your schedule, equipment, and recorded performance.",
    notFor:
      "You want a coach-authored program, a broad program catalog, or automatic guidance without paying for Pro.",
  },
  fitnotes: {
    planningStyle: "Just log the work",
    choiceLoad: "Low",
    continuity: "User-directed",
    customization: "Full control",
    decisionsRemoved:
      "It handles workout recording, exercise history, routines, timers, records, export, and backup without ads or a required account.",
    decisionsRemaining:
      "Every programming choice—exercise selection, schedule, progression, fatigue management, and when to change course—remains yours.",
    tradeoff:
      "You get a simple, free, privacy-friendly logbook that stays out of the way, in exchange for receiving essentially no training guidance.",
    idealUser:
      "You are an Android user who already knows what to train and wants a straightforward, offline-friendly log without a subscription.",
    notFor:
      "You want iOS support, guided programming, coaching, or automatic workout generation.",
  },
  "rp-hypertrophy": {
    planningStyle: "Let the app adapt",
    secondaryStyles: ["Choose a proven path", "Build it yourself"],
    choiceLoad: "Moderate",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "A template or custom mesocycle establishes the structure, then the app adjusts reps, loads, volume, fatigue management, and deload timing from feedback.",
    decisionsRemaining:
      "You select or shape the mesocycle, choose exercises, judge pump, soreness, and workload honestly, and apply the specialized terminology correctly.",
    tradeoff:
      "It removes much of the week-to-week hypertrophy math while retaining deep control, but asks for thoughtful feedback, domain knowledge, and a premium price.",
    idealUser:
      "You understand hypertrophy concepts and want a specialized system that adjusts volume and effort across a mesocycle using your feedback.",
    notFor:
      "You are brand new to lifting or want a simple general-purpose workout logger.",
  },
};

export function getTrainingRelationship(appId: string): TrainingRelationship {
  return (
    trainingRelationships[appId] ?? {
      planningStyle: "Build it yourself",
      choiceLoad: "Moderate",
      continuity: "User-directed",
      customization: "Full control",
      idealUser:
        "You want flexible tools and prefer to make your own training decisions.",
      notFor: "You want the app to prescribe a complete training path.",
    }
  );
}

export const originalityProfiles: Record<string, OriginalityProfile> = {
  hevy: {
    score: 76,
    level: "Distinctive",
    originalMechanics: 78,
    productPointOfView: 72,
    visualIdentity: 75,
    meaningfulDifferentiation: 80,
    defensibility: 74,
    summary: "A strength log that treats the social feed as part of training rather than an unrelated add-on.",
    evidenceNote: "Official product materials support the social training model; visual and defensibility judgments remain editorial.",
  },
  boostcamp: {
    score: 78,
    level: "Distinctive",
    originalMechanics: 82,
    productPointOfView: 79,
    visualIdentity: 67,
    meaningfulDifferentiation: 84,
    defensibility: 78,
    summary: "Turns credible creator programs and community publishing into a training marketplace with a capable logger attached.",
    evidenceNote: "Program breadth and creator model are documented publicly; identity judgments remain editorial.",
  },
  fitbod: {
    score: 81,
    level: "Distinctive",
    originalMechanics: 85,
    productPointOfView: 82,
    visualIdentity: 70,
    meaningfulDifferentiation: 85,
    defensibility: 83,
    summary: "Built its identity around generating the next workout from equipment, history, and recovery instead of presenting a fixed plan.",
    evidenceNote: "Adaptive generation is documented publicly; comparative originality judgments remain editorial.",
  },
  strong: {
    score: 55,
    level: "Clear identity",
    originalMechanics: 45,
    productPointOfView: 64,
    visualIdentity: 60,
    meaningfulDifferentiation: 52,
    defensibility: 50,
    summary: "A polished expression of the digital workout logbook, distinguished more by restraint than by a unique training system.",
    evidenceNote: "Feature scope is documented publicly; the originality assessment is editorial.",
  },
  caliber: {
    score: 75,
    level: "Distinctive",
    originalMechanics: 76,
    productPointOfView: 80,
    visualIdentity: 67,
    meaningfulDifferentiation: 78,
    defensibility: 74,
    summary: "Connects a substantial free strength product to group and individual human coaching without forcing one service level on everyone.",
    evidenceNote: "Free, Plus, and coaching layers are documented publicly; comparative judgments remain editorial.",
  },
  "lift-league": {
    score: 94,
    level: "Category-defining",
    originalMechanics: 97,
    productPointOfView: 96,
    visualIdentity: 96,
    meaningfulDifferentiation: 93,
    defensibility: 88,
    summary: "Combines a proprietary workout scoring system, one cohesive training philosophy, competitive accountability, and an unusually committed punk-metal identity.",
    evidenceNote: "Based on first-party product evidence. No comparable combination was identified in this reviewed cohort; shared ownership is disclosed and the assessment remains preliminary until hands-on review is complete.",
  },
  jefit: {
    score: 68,
    level: "Clear identity",
    originalMechanics: 72,
    productPointOfView: 61,
    visualIdentity: 58,
    meaningfulDifferentiation: 74,
    defensibility: 75,
    summary: "Its unusually broad combination of manual planning, community routines, analytics, and adaptive AI is differentiated by scope more than a singular point of view.",
    evidenceNote: "Breadth and adaptive features are documented publicly; identity judgments remain editorial.",
  },
  strengthlog: {
    score: 71,
    level: "Clear identity",
    originalMechanics: 68,
    productPointOfView: 76,
    visualIdentity: 61,
    meaningfulDifferentiation: 75,
    defensibility: 73,
    summary: "A serious strength toolkit whose identity comes from combining an unusually capable free log with programs, calculators, and deep statistics.",
    evidenceNote: "Product scope is documented publicly; comparative identity judgments remain editorial.",
  },
  stronglifts: {
    score: 84,
    level: "Distinctive",
    originalMechanics: 80,
    productPointOfView: 94,
    visualIdentity: 70,
    meaningfulDifferentiation: 86,
    defensibility: 88,
    summary: "Its originality is disciplined constraint: a highly recognizable training doctrine that refuses to become an everything-app.",
    evidenceNote: "The focused system and progression rules are documented publicly; identity judgments remain editorial.",
  },
  "alpha-progression": {
    score: 77,
    level: "Distinctive",
    originalMechanics: 82,
    productPointOfView: 79,
    visualIdentity: 68,
    meaningfulDifferentiation: 80,
    defensibility: 76,
    summary: "Preserves a stable hypertrophy plan while making set-level progression recommendations, avoiding the randomness of a new generated workout every day.",
    evidenceNote: "Plan stability and progression behavior are documented publicly; identity judgments remain editorial.",
  },
  fitnotes: {
    score: 72,
    level: "Clear identity",
    originalMechanics: 52,
    productPointOfView: 86,
    visualIdentity: 65,
    meaningfulDifferentiation: 78,
    defensibility: 66,
    summary: "Radical simplicity, no ads, no subscription, and local-first data practices form a coherent alternative to account-heavy fitness platforms.",
    evidenceNote: "Free, ad-free, backup, export, and developer-declared data practices are public; identity judgments remain editorial.",
  },
  "rp-hypertrophy": {
    score: 91,
    level: "Category-defining",
    originalMechanics: 95,
    productPointOfView: 94,
    visualIdentity: 75,
    meaningfulDifferentiation: 96,
    defensibility: 93,
    summary: "Turns a specific autoregulated hypertrophy methodology into software that adjusts volume, load, reps, fatigue, and deloads from lifter feedback.",
    evidenceNote: "The feedback-driven system is documented publicly; comparative identity and defensibility judgments remain editorial.",
  },
};

export function getOriginalityProfile(appId: string): OriginalityProfile {
  return originalityProfiles[appId] ?? {
    score: 50,
    level: "Conventional",
    originalMechanics: 50,
    productPointOfView: 50,
    visualIdentity: 50,
    meaningfulDifferentiation: 50,
    defensibility: 50,
    summary: "Originality has not yet been evaluated.",
    evidenceNote: "Not yet evaluated.",
  };
}

export const catalogEvidenceSeeds: CatalogEvidenceSeed[] = [
  {
    id: "hevy-official-features-20260912",
    appId: "hevy",
    sourceType: "Official website",
    url: "https://www.hevyapp.com/features/",
    claimSupported:
      "Workout logging, progress tracking, social features, wearables, program library, and HevyGPT are listed by Hevy.",
    public: true,
  },
  {
    id: "hevy-google-play-20260912",
    appId: "hevy",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.hevy",
    claimSupported:
      "Android availability, free access with in-app purchases, workout logging, routines, progress analysis, community, and Wear OS support.",
    public: true,
  },
  {
    id: "hevy-apple-store-20260912",
    appId: "hevy",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350",
    claimSupported:
      "iOS availability and US Hevy Pro monthly, yearly, and lifetime purchase options.",
    public: true,
  },
  {
    id: "boostcamp-official-programs-20260912",
    appId: "boostcamp",
    sourceType: "Official website",
    url: "https://www.boostcamp.app/programs",
    claimSupported:
      "Large program library with coach-designed and community strength programs.",
    public: true,
  },
  {
    id: "boostcamp-official-pro-20260912",
    appId: "boostcamp",
    sourceType: "Official website",
    url: "https://www.boostcamp.app/pro",
    claimSupported:
      "Free program library and tracker, optional AI-personalized programs, Pro features, trial, and current monthly and annual prices.",
    public: true,
  },
  {
    id: "boostcamp-google-play-20260912",
    appId: "boostcamp",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.bpmhealth.boostcamp",
    claimSupported:
      "Android availability, free tier, program library, workout logging, offline use, AI coach, and in-app purchases.",
    public: true,
  },
  {
    id: "hevy-pro-boundaries-20260913",
    appId: "hevy",
    sourceType: "Official documentation",
    url: "https://help.hevyapp.com/hc/en-us/articles/35119778922263-Hevy-Pro-Subscription-How-to-get-Pro-and-What-Does-It-Include",
    claimSupported:
      "Free and Pro limits for routines, custom exercises, data history, measurements, and advanced tracking.",
    public: true,
  },
  {
    id: "hevy-trainer-20260913",
    appId: "hevy",
    sourceType: "Official documentation",
    url: "https://help.hevyapp.com/hc/en-us/articles/38385724273047-Hevy-Trainer-Explained-How-It-Builds-Your-Workout-Program",
    claimSupported:
      "Hevy Trainer is Pro-only, creates a goal-based program, provides performance-based progressive overload, and is described by Hevy as algorithmic rather than AI-generated.",
    public: true,
  },
  {
    id: "boostcamp-pro-20260913",
    appId: "boostcamp",
    sourceType: "Official website",
    url: "https://www.boostcamp.app/pro",
    claimSupported:
      "Pro costs $14.99 monthly or $59.99 yearly; the annual plan has a seven-day trial; the tracker and most of the program library remain free; Pro adds AI and advanced analytics.",
    public: true,
  },
  {
    id: "boostcamp-apple-store-20260913",
    appId: "boostcamp",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/boostcamp-workout-programs/id1529354455",
    claimSupported:
      "iOS and iPad availability, free download with purchases, logging, offline use, program library, AI coach, analytics, and Apple Health integration.",
    public: true,
  },
  {
    id: "strong-google-play-20260913",
    appId: "strong",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=io.strongapp.strong",
    claimSupported:
      "Android availability, workout logging, routine creation, data export, Health Connect, current maintenance, and developer data-safety disclosures.",
    public: true,
  },
  {
    id: "strong-apple-store-20260913",
    appId: "strong",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577",
    claimSupported:
      "iOS and Apple Watch availability, free unlimited workout history with a three-routine limit, features, and US Strong PRO prices.",
    public: true,
  },
  {
    id: "strong-privacy-20260913",
    appId: "strong",
    sourceType: "Privacy policy",
    url: "https://strong.app/privacy",
    claimSupported:
      "Strong's linked developer privacy policy for account, workout, health, device, and service data practices.",
    public: true,
  },
  {
    id: "fitbod-subscriptions-20260913",
    appId: "fitbod",
    sourceType: "Official documentation",
    url: "https://help.fitbod.me/hc/en-us/sections/1500000506081-Subscriptions",
    claimSupported:
      "Current individual pricing is $15.99 monthly or $95.99 yearly, with trials and subscription management described by Fitbod.",
    public: true,
  },
  {
    id: "fitbod-google-play-20260913",
    appId: "fitbod",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.fitbod.fitbod",
    claimSupported:
      "Android availability, AI-personalized workouts, equipment-aware planning, performance adaptation, exercise guidance, Wear OS, and subscription-only access after trial.",
    public: true,
  },
  {
    id: "fitbod-apple-store-20260913",
    appId: "fitbod",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/fitbod-gym-fitness-planner/id1041517543",
    claimSupported:
      "iOS and Apple Watch availability, AI-generated and adaptive workouts, exercise library, integrations, subscription, and developer privacy disclosures.",
    public: true,
  },
  {
    id: "fitbod-privacy-20260913",
    appId: "fitbod",
    sourceType: "Privacy policy",
    url: "https://fitbod.me/privacy-policy",
    claimSupported:
      "Fitbod's linked developer privacy policy for its app and services.",
    public: true,
  },
  {
    id: "strengthlog-official-overview-20260913",
    appId: "strengthlog",
    sourceType: "Official website",
    url: "https://www.strengthlog.com/",
    claimSupported:
      "Free unlimited workout logging, exercise library, programs, statistics, tools, and optional Premium features.",
    public: true,
  },
  {
    id: "strengthlog-google-play-20260913",
    appId: "strengthlog",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.styrkelabbet.Styrkelabbet",
    claimSupported:
      "Android availability, free and Premium feature boundaries, program library, workout logging, Wear OS, Health Connect, and data-safety disclosures.",
    public: true,
  },
  {
    id: "strengthlog-apple-store-20260913",
    appId: "strengthlog",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/strengthlog-workout-tracker/id1434229662",
    claimSupported:
      "iOS, iPad, and Apple Watch availability; free download; US in-app purchase prices; feature and privacy disclosures.",
    public: true,
  },
  {
    id: "strengthlog-privacy-20260913",
    appId: "strengthlog",
    sourceType: "Privacy policy",
    url: "https://www.strengthlog.com/app-terms-privacy/",
    claimSupported:
      "Current August 2026 terms describe Premium billing and the personal-data practices governing the StrengthLog app.",
    public: true,
  },
  {
    id: "lift-league-official-overview-20260913",
    appId: "lift-league",
    sourceType: "Official website",
    url: "https://theliftleague.com/",
    claimSupported:
      "Android release is coming soon; official feature list includes structured blocks, workout history, custom blocks, scoring, achievements, progress photos, training circles, and leaderboards. No public price is stated.",
    public: true,
  },
  {
    id: "caliber-google-play-20260914",
    appId: "caliber",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.caliberfitness.app",
    claimSupported:
      "Android availability, unlimited free logging, 800+ exercises, Workout Circles, Health Connect, optional AI connection, Plus, and coaching tiers.",
    public: true,
  },
  {
    id: "caliber-apple-store-20260914",
    appId: "caliber",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/caliber-strength-training/id1482405410",
    claimSupported:
      "iOS availability, free features, Plus and coaching options, and current US Plus purchase listings.",
    public: true,
  },
  {
    id: "caliber-pro-guide-20260914",
    appId: "caliber",
    sourceType: "Official documentation",
    url: "https://caliberstrong.freshdesk.com/support/solutions/articles/48001257573-caliber-pro-user-guide",
    claimSupported:
      "Caliber's group-coaching service, coaching workflow, and current monthly, quarterly, and annual prices.",
    public: true,
  },
  {
    id: "jefit-official-20260914",
    appId: "jefit",
    sourceType: "Official website",
    url: "https://www.jefit.com/",
    claimSupported:
      "Manual planning and logging, adaptive training, analytics, program library, exercise database, and community features.",
    public: true,
  },
  {
    id: "jefit-apple-store-20260914",
    appId: "jefit",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000",
    claimSupported:
      "iOS and Apple Watch availability, 1,400+ exercises, custom and built-in routines, AI Adaptive Plan, and current Elite prices.",
    public: true,
  },
  {
    id: "stronglifts-official-app-20260914",
    appId: "stronglifts",
    sourceType: "Official website",
    url: "https://stronglifts.com/app/",
    claimSupported:
      "iOS and Android availability, guided programs and templates, workout logging, progression, deloads, exercise guidance, and wearable integrations.",
    public: true,
  },
  {
    id: "stronglifts-pro-20260914",
    appId: "stronglifts",
    sourceType: "Official documentation",
    url: "https://support.stronglifts.com/article/98-buy-pro",
    claimSupported:
      "Free and Pro subscription model, current monthly and yearly prices, and the annual seven-day trial.",
    public: true,
  },
  {
    id: "stronglifts-progression-20260914",
    appId: "stronglifts",
    sourceType: "Official documentation",
    url: "https://support.stronglifts.com/article/71-progression",
    claimSupported:
      "Automatic weight increases, configurable progression increments, and automatic return-from-break deload behavior.",
    public: true,
  },
  {
    id: "alpha-official-overview-20260914",
    appId: "alpha-progression",
    sourceType: "Official website",
    url: "https://alphaprogression.com/en",
    claimSupported:
      "Stable plan generation, equipment and schedule customization, set-level progression recommendations, exercise videos, logging, and free-versus-Pro boundaries.",
    public: true,
  },
  {
    id: "alpha-pricing-20260914",
    appId: "alpha-progression",
    sourceType: "Official website",
    url: "https://alphaprogression.com/en/subscribe",
    claimSupported:
      "Current $12.99 monthly and $79.99 yearly Pro prices and yearly-plan trial.",
    public: true,
  },
  {
    id: "alpha-google-play-20260914",
    appId: "alpha-progression",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.alphaprogression.alphaprogression",
    claimSupported:
      "Android availability, current maintenance, plan and progression features, and developer data-safety disclosures.",
    public: true,
  },
  {
    id: "fitnotes-google-play-20260914",
    appId: "fitnotes",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes",
    claimSupported:
      "Android-only free ad-free logging, routines, history, records, CSV export, local and cloud backups, and no developer-declared data collection or sharing.",
    public: true,
  },
  {
    id: "rp-official-overview-20260914",
    appId: "rp-hypertrophy",
    sourceType: "Official website",
    url: "https://rpstrength.com/pages/hypertrophy-app",
    claimSupported:
      "100+ plans, custom mesocycle builder, exercise selection, technique videos, feedback-driven weekly adjustment, web access, and annual pricing.",
    public: true,
  },
  {
    id: "rp-subscribe-20260914",
    appId: "rp-hypertrophy",
    sourceType: "Official website",
    url: "https://apps.rpstrength.com/subscribe",
    claimSupported:
      "Current $34.99 monthly and $299.99 yearly subscription prices.",
    public: true,
  },
  {
    id: "rp-google-play-20260914",
    appId: "rp-hypertrophy",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.rp.hypertrophy",
    claimSupported:
      "Android availability, personalized progression, feedback-driven weekly adjustment, premade plans, custom mesocycle builder, and privacy disclosures.",
    public: true,
  },
];

export const catalogVersion = "0.9-originality-profiled";
