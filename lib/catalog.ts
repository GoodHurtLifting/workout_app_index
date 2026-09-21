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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: false,
      programLibrary: true,
    },
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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
    bestFor: "A complete scored system without program hunting",
    description:
      "An Android strength-training system with 12 connected four-week blocks, guided logging, proprietary performance scores, and built-in accountability.",
    price: "30-day free trial / $2.99 monthly",
    monthlyPrice: 2.99,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android"],
    ai: "No AI identified",
    legit: 82,
    goals: ["Build muscle", "Get stronger", "Consistency"],
    features: [
      "Structured training blocks",
      "Guided workout logging",
      "Workout history",
      "Custom block builder",
      "Leaderboards",
      "Built-in motivation",
      "Training circles",
      "Performance scoring",
      "Plate and 1RM calculators",
      "Progress photo comparisons",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "Recently released on Google Play with limited public usage history. Shared ownership with Workout App Index; evaluated under the same published criteria.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Barbell and plates",
    ],
    researchStatus: "Evaluation ready",
    verifiedSections: 7,
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
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: false,
      programLibrary: true,
    },
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
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: false,
      programLibrary: true,
    },
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
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: true,
      programLibrary: false,
    },
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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
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
  {
    id: "ladder",
    name: "Ladder",
    initials: "LD",
    color: "#f15a24",
    type: "Coach-led team training",
    bestFor: "A fresh coach-built workout every day",
    description:
      "Pairs members with a coach-led training team that publishes progressive weekly programming with in-ear coaching, demonstrations, timers, substitutions, and community support.",
    price: "7-day free trial / Pro $29.99 monthly or $179.99 yearly on US iOS",
    monthlyPrice: 29.99,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["iOS"],
    ai: "No AI identified",
    legit: 89,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency"],
    features: [
      "Expert programs",
      "Progression",
      "Exercise demos",
      "Guided workout logging",
      "Community",
      "Substitutions",
      "Wearables",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "The strongest value comes from committing to one coach and team. Current US App Store pricing is premium, and the reviewed public listing supports iPhone and Apple Watch rather than Android.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Bodyweight",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "juggernaut-ai",
    name: "JuggernautAI",
    initials: "JAI",
    color: "#b21f2d",
    type: "Adaptive strength program",
    bestFor: "AI-guided powerlifting and powerbuilding",
    description:
      "Builds an individualized powerlifting or powerbuilding program, then adjusts volume, frequency, exercise selection, periodization, and session demands from readiness and performance feedback.",
    price: "2-week free trial / $34.99 monthly or $349.99 yearly",
    monthlyPrice: 34.99,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android", "iOS"],
    ai: "AI central",
    legit: 86,
    goals: ["Build muscle", "Get stronger", "Powerlifting"],
    features: [
      "Adaptive programming",
      "Automatic progression",
      "Readiness feedback",
      "Exercise demos",
      "Detailed analytics",
      "Community",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "AI-generated",
    caveat:
      "It is expensive and narrowly centered on powerlifting and powerbuilding. The program depends on frequent subjective feedback and conflicts with an avoid-AI requirement.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: ["Commercial gym", "Home gym", "Barbell and plates"],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "trainheroic",
    name: "TrainHeroic",
    initials: "TH",
    color: "#ff6b00",
    type: "Coach and program marketplace",
    bestFor: "Buying expert programs or training with a team",
    description:
      "Combines strength logging and planning with a marketplace of one-time programs, ongoing team subscriptions, and direct coach-delivered training.",
    price: "Free app / Athlete Pro $4.99 monthly; programs and teams priced separately",
    monthlyPrice: null,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android", "iOS", "Web"],
    ai: "No AI identified",
    legit: 85,
    goals: ["Build muscle", "Get stronger", "Powerlifting", "General fitness"],
    features: [
      "Expert programs",
      "Custom workouts",
      "Fast logging",
      "Detailed analytics",
      "Community",
      "Leaderboards",
      "Human coaching",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Mixed",
    caveat:
      "The app itself can be used as a tracker, but meaningful program access is sold separately by individual coaches. Quality, duration, trial terms, and price vary substantially across the marketplace.",
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
    id: "nike-training-club",
    name: "Nike Training Club",
    initials: "NTC",
    color: "#111111",
    type: "Free workout library",
    bestFor: "Free trainer-led general fitness",
    description:
      "Offers a large free library of trainer-led strength, conditioning, yoga, Pilates, mobility, and recovery workouts plus guided multi-week programs for home or gym.",
    price: "Free with a Nike Member account",
    monthlyPrice: 0,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: false,
      programLibrary: true,
    },
    platforms: ["Android", "iOS"],
    ai: "No AI identified",
    legit: 88,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency", "Learn resistance training"],
    features: [
      "Expert programs",
      "Exercise demos",
      "Workout videos",
      "Bodyweight training",
      "Mobility",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "Its breadth is excellent for accessible general fitness but requires browsing among many modalities and individual sessions. It is less focused on detailed strength logging and long-term barbell progression.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: false,
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
    id: "future",
    name: "Future",
    initials: "FU",
    color: "#5b47ff",
    type: "One-to-one remote coaching",
    bestFor: "Personalized training with human accountability",
    description:
      "Pairs members with a dedicated human coach who builds a custom program, monitors progress, communicates directly, and adjusts training around goals, schedule, experience, and lifestyle.",
    price: "$199 monthly",
    monthlyPrice: 199,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["iOS"],
    ai: "No AI identified",
    legit: 86,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency", "Learn resistance training"],
    features: [
      "Human coaching",
      "Adaptive programming",
      "Built-in motivation",
      "Exercise demos",
      "Wearables",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "The dedicated-coach model provides unusually high accountability but costs far more than a typical fitness-app subscription. The reviewed public listing supports iPhone and Apple Watch.",
    deliversCompleteProgram: true,
    programLibrary: false,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: [
      "Commercial gym",
      "Home gym",
      "Dumbbells only",
      "Barbell and plates",
      "Bodyweight",
      "It varies",
    ],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "peloton-app",
    name: "Peloton App",
    initials: "P",
    color: "#df1c2f",
    type: "Instructor-led class library",
    bestFor: "High-energy classes across many modalities",
    description:
      "Provides thousands of live and on-demand instructor-led classes spanning strength, running, cycling, yoga, Pilates, HIIT, meditation, and mobility, with scheduling, stacks, challenges, and community.",
    price: "Limited free access / App One $15.99 monthly; App+ $28.99 monthly on US iOS",
    monthlyPrice: 15.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android", "iOS", "Web"],
    ai: "No AI identified",
    legit: 89,
    goals: ["Build muscle", "General fitness", "Consistency"],
    features: [
      "Workout videos",
      "Community",
      "Leaderboards",
      "Built-in motivation",
      "Wearables",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "Its breadth and production quality are strengths, but users still choose among thousands of classes. Access tiers differ, and the experience is less suited to detailed strength progression than a dedicated lifting system.",
    deliversCompleteProgram: false,
    programLibrary: true,
    adaptiveProgramming: false,
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
    id: "freeletics",
    name: "Freeletics",
    initials: "FL",
    color: "#00c389",
    type: "Adaptive digital coach",
    bestFor: "Flexible AI coaching at home or in the gym",
    description:
      "Creates personalized Training Journeys across bodyweight, calisthenics, weights, machines, and cardio, then changes sessions from the user's feedback, schedule, and available equipment.",
    price: "Free limited workouts / paid Coach pricing varies by term and market",
    monthlyPrice: null,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: true,
    },
    platforms: ["Android", "iOS"],
    ai: "AI central",
    legit: 87,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency"],
    features: [
      "Adaptive programming",
      "Expert programs",
      "Exercise demos",
      "Bodyweight training",
      "Custom workouts",
      "Community",
      "Wearables",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Mixed",
    caveat:
      "Its flexibility comes with a large menu of Training Journeys, workouts, and training modes. Full personalized coaching is paid, current pricing is not consistently published before checkout, and it conflicts with an avoid-AI requirement.",
    deliversCompleteProgram: true,
    programLibrary: true,
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
    id: "apple-fitness-plus",
    name: "Apple Fitness+",
    initials: "AF+",
    color: "#e84d8a",
    type: "Instructor-led class service",
    bestFor: "Polished classes inside the Apple ecosystem",
    description:
      "Provides a large 4K library across twelve workout types and meditation, with trainer-led sessions, personalized recommendations, automatic Custom Plans, and live metrics from compatible Apple and Bluetooth devices.",
    price: "1-month trial / $9.99 monthly or $79.99 yearly in the US",
    monthlyPrice: 9.99,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["iOS"],
    ai: "AI supporting features",
    legit: 91,
    goals: ["Build muscle", "General fitness", "Consistency"],
    features: [
      "Workout videos",
      "Expert programs",
      "Built-in motivation",
      "Wearables",
      "Health integration",
      "Mobility",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "It requires an iPhone and emphasizes classes and activity variety more than detailed strength logging or transparent long-term barbell progression. Custom Plans organize preferred activities rather than replace a specialized strength coach.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: false,
    supportedTrainingEnvironments: ["Home gym", "Dumbbells only", "Bodyweight", "It varies"],
    researchStatus: "Researching",
    verifiedSections: 7,
    totalSections: 8,
  },
  {
    id: "sweat",
    name: "Sweat",
    initials: "SW",
    color: "#f36b9d",
    type: "Women-centered program library",
    bestFor: "Progressive programs designed for women",
    description:
      "Offers more than seventy trainer-authored programs for home and gym, including strength, low-impact, yoga, and pregnancy-related options, supported by workout planning, demonstrations, substitutions, education, and community challenges.",
    price: "Free trial / monthly or yearly subscription; price varies by market",
    monthlyPrice: null,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android", "iOS"],
    ai: "No AI identified",
    legit: 88,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency", "Learn resistance training"],
    features: [
      "Expert programs",
      "Exercise demos",
      "Substitutions",
      "Community",
      "Built-in motivation",
      "Health integration",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "Its depth and life-stage coverage are meaningful strengths, but users must choose among a large catalog and subscription pricing varies by market and purchase channel. It is less focused on open-ended lifting analytics than a dedicated logbook.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: false,
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
    id: "centr",
    name: "Centr",
    initials: "CE",
    color: "#e0b15a",
    type: "Integrated fitness and wellness",
    bestFor: "One subscription for training, meals, and recovery",
    description:
      "Combines personalized daily training, coach-led programs, self-guided workouts, meal plans, recipes, and recovery content across strength, HIIT, HYROX, boxing, yoga, Pilates, and other modalities.",
    price: "7-day free trial / $159.99 yearly for Centr Coach",
    monthlyPrice: 13.33,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android", "iOS"],
    ai: "AI supporting features",
    legit: 87,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency"],
    features: [
      "Expert programs",
      "Workout videos",
      "Built-in motivation",
      "Nutrition guidance",
      "Mobility",
      "Wearables",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Trainer-written",
    caveat:
      "The broad all-in-one experience can reduce planning across exercise and meals, but it also contains many programs and modalities. Its personalization is less transparent than a fixed progression system and the reviewed offer is annual billing.",
    deliversCompleteProgram: true,
    programLibrary: true,
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
    id: "gravl",
    name: "Gravl",
    initials: "GR",
    color: "#6557ff",
    type: "AI strength coach",
    bestFor: "Automatic strength sessions and load progression",
    description:
      "Plans complete strength sessions around goals, schedule, equipment, recovery, and training history, then prescribes reps and weights and adjusts future sessions from logged performance and feedback.",
    price: "Free to start / Premium price shown during signup; $89.99 yearly workout-and-macros bundle",
    monthlyPrice: null,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["Android", "iOS"],
    ai: "AI central",
    legit: 86,
    goals: ["Build muscle", "Get stronger", "General fitness"],
    features: [
      "Adaptive programming",
      "Automatic progression",
      "Fast logging",
      "Exercise demos",
      "Readiness feedback",
      "Human coaching",
      "Wearables",
      "Community",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "AI-generated",
    caveat:
      "It asks the user to trust AI-generated exercise and load decisions, so it is incompatible with an avoid-AI preference. Current standalone Premium pricing is not clearly published without entering the signup flow.",
    deliversCompleteProgram: true,
    programLibrary: false,
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
    id: "shred",
    name: "SHRED",
    initials: "SH",
    color: "#ff3b30",
    type: "Adaptive training and community",
    bestFor: "AI-personalized strength with social motivation",
    description:
      "Starts with expert-built training cycles, then uses AI to personalize workouts, progression, weights, tempo, rest, substitutions, and equipment while adding challenges, groups, leaderboards, and studio-style sessions.",
    price: "Free limited tier / $19.99 monthly or $119.99 yearly; 7-day annual trial",
    monthlyPrice: 19.99,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: true,
    },
    platforms: ["Android", "iOS"],
    ai: "AI central",
    legit: 85,
    goals: ["Build muscle", "Get stronger", "General fitness", "Consistency"],
    features: [
      "Adaptive programming",
      "Expert programs",
      "Automatic progression",
      "Exercise demos",
      "Substitutions",
      "Community",
      "Leaderboards",
      "Wearables",
    ],
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "Mixed",
    caveat:
      "Its blend of guided strength, studio classes, and social features is broad rather than minimalist. Personalized programming and AI progression require Premium and conflict with an avoid-AI requirement.",
    deliversCompleteProgram: true,
    programLibrary: true,
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
  level:
    "Conventional" | "Clear identity" | "Distinctive" | "Category-defining";
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
    secondaryStyles: ["Choose a proven path"],
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
  ladder: {
    planningStyle: "Follow a complete path",
    secondaryStyles: ["Choose a proven path"],
    choiceLoad: "Low",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "After you choose a coach and team, the weekly plan, daily workout, pacing, demonstrations, and progression are supplied for you.",
    decisionsRemaining:
      "You choose the team that best fits your goals, manage team changes, select substitutions, and decide how closely to follow the weekly schedule.",
    tradeoff:
      "It combines the energy of an ongoing coach-led team with low daily decision-making, but its experience depends heavily on choosing the right coach and accepting that coach's style.",
    idealUser:
      "You want a fresh strength workout waiting each day, value coaching personality and community, and prefer following a team over writing a program.",
    notFor:
      "You want Android support, detailed self-programming tools, or a fixed long-term system that does not change with a coach's weekly plan.",
  },
  "juggernaut-ai": {
    planningStyle: "Let the app adapt",
    choiceLoad: "Low",
    continuity: "Session-adaptive",
    customization: "Guided flexibility",
    decisionsRemoved:
      "The system builds periodization, volume, frequency, weak-point exercise selection, and workout adjustments around your profile and readiness feedback.",
    decisionsRemaining:
      "You choose powerlifting or powerbuilding, training frequency, priorities, and exercises where permitted, then provide accurate readiness and performance feedback.",
    tradeoff:
      "It automates specialized strength programming with far more sport specificity than a general generator, but requires trust in an expensive AI-centered system.",
    idealUser:
      "You care primarily about powerlifting or powerbuilding and want an adaptive program without hiring a one-to-one coach.",
    notFor:
      "You avoid AI, want a low-cost subscription, or prefer general fitness and broad workout variety.",
  },
  trainheroic: {
    planningStyle: "Choose a proven path",
    secondaryStyles: ["Build it yourself", "Just log the work"],
    choiceLoad: "High",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "A purchased program, team, or coach can supply the training calendar, demonstrations, community, and progression context.",
    decisionsRemaining:
      "You must decide whether to self-program, buy a static plan, join an ongoing team, or work with a coach—and evaluate the quality and price of individual sellers.",
    tradeoff:
      "The marketplace can connect almost any athlete to expert programming, but the platform cannot eliminate the work of choosing which coach or product to trust.",
    idealUser:
      "You want access to specialist coaches and programs across strength sports and are comfortable shopping among independently priced options.",
    notFor:
      "You want one obvious training path, one predictable subscription price, or a tightly curated catalog.",
  },
  "nike-training-club": {
    planningStyle: "Choose a proven path",
    choiceLoad: "High",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Trainer-led videos, demonstrations, individual workouts, and multi-week programs remove the need to invent each session.",
    decisionsRemaining:
      "You choose among many modalities and sessions, schedule the work, and decide how separate workouts fit into a longer-term goal.",
    tradeoff:
      "It provides unusually broad, polished training content for free, but breadth and flexibility replace the clarity of one opinionated strength system.",
    idealUser:
      "You want free, approachable workouts across strength, conditioning, mobility, and wellness for home or gym.",
    notFor:
      "You want deep barbell logging, a narrow strength specialization, or one continuous system with minimal browsing.",
  },
  future: {
    planningStyle: "Let the app adapt",
    secondaryStyles: ["Follow a complete path"],
    choiceLoad: "Low",
    continuity: "Session-adaptive",
    customization: "Guided flexibility",
    decisionsRemoved:
      "A dedicated human coach handles program design, ongoing adjustments, accountability, and much of the interpretation of your progress and schedule.",
    decisionsRemaining:
      "You communicate honestly with the coach, complete the work, manage the relationship, and decide whether the accountability justifies the premium price.",
    tradeoff:
      "It offers the most personal guidance in this cohort, but at a price closer to a service relationship than a normal app subscription.",
    idealUser:
      "You want a real person to build and adjust your training and consider accountability worth substantially more than software alone.",
    notFor:
      "You want a low-cost app, Android support, self-directed control, or an impersonal tool that stays out of the way.",
  },
  "peloton-app": {
    planningStyle: "Choose a proven path",
    choiceLoad: "High",
    continuity: "User-directed",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Each class supplies instruction, pacing, music, demonstrations, and motivation, while scheduling and stacks organize selected sessions.",
    decisionsRemaining:
      "You choose modality, instructor, class, duration, schedule, and how thousands of sessions combine into a coherent progression plan.",
    tradeoff:
      "It delivers exceptional instructor energy and content variety, but the user still acts as curator and long-term program designer.",
    idealUser:
      "You are motivated by instructors, music, live energy, challenges, and switching among multiple fitness modalities.",
    notFor:
      "You want a focused strength progression system, minimal choice, or detailed set-by-set lifting analysis.",
  },
  freeletics: {
    planningStyle: "Let the app adapt",
    secondaryStyles: ["Choose a proven path"],
    choiceLoad: "Moderate",
    continuity: "Session-adaptive",
    customization: "Guided flexibility",
    decisionsRemoved:
      "The Coach builds each session around goals, level, equipment, schedule, and feedback, including warm-ups, cooldowns, and recovery work.",
    decisionsRemaining:
      "You choose a Training Journey, report session difficulty, manage the broad mix of training modes, and decide how much to trust the AI adjustments.",
    tradeoff:
      "It adapts across unusually varied environments and modalities, but its abundance of journeys and modes is less singular than one fixed training philosophy.",
    idealUser:
      "You need workouts that can change with location, equipment, time, and energy and are comfortable letting AI shape the plan.",
    notFor:
      "You want an AI-free program, transparent fixed progression, or a narrowly focused barbell system.",
  },
  "apple-fitness-plus": {
    planningStyle: "Choose a proven path",
    choiceLoad: "High",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Trainer-led sessions supply instruction and pacing, while recommendations and Custom Plans organize selected activities into a schedule.",
    decisionsRemaining:
      "You choose preferred activities, trainers, duration, and equipment and determine whether the resulting mix provides enough progressive strength structure.",
    tradeoff:
      "It offers exceptional production and ecosystem integration at a modest price, but class variety takes precedence over rigorous strength progression.",
    idealUser:
      "You already use Apple devices and want polished, approachable classes and a balanced routine across several activities.",
    notFor:
      "You use Android, want detailed lifting analytics, or need a specialized barbell program with explicit progression rules.",
  },
  sweat: {
    planningStyle: "Choose a proven path",
    choiceLoad: "High",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Once selected, a trainer-authored program supplies the schedule, exercises, demonstrations, substitutions, and progression path.",
    decisionsRemaining:
      "You compare a large program catalog, select the best trainer and goal path, and decide when to change programs or add optional sessions.",
    tradeoff:
      "Its women-centered depth and life-stage coverage are unusual strengths, but choosing among many programs can recreate the selection burden WAI is meant to clarify.",
    idealUser:
      "You want a women-centered training community and a proven program suited to your equipment, experience, or stage of life.",
    notFor:
      "You want one universal system, adaptive AI, or an open-ended strength log with deep analytics.",
  },
  centr: {
    planningStyle: "Let the app adapt",
    secondaryStyles: ["Choose a proven path"],
    choiceLoad: "Moderate",
    continuity: "Program-based",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Centr can select daily workouts and meals from stated goals and preferences, or provide a structured coach-authored program to follow.",
    decisionsRemaining:
      "You choose between the personalized daily plan and a broad program catalog and decide how much value to place on nutrition and recovery content.",
    tradeoff:
      "It can coordinate more of a wellness routine than a lifting-only app, but that breadth makes its core training philosophy less distinct.",
    idealUser:
      "You want training, food, and recovery guidance together and value variety across strength, conditioning, mobility, and wellness.",
    notFor:
      "You want a minimalist logbook, a narrowly defined strength system, or detailed visibility into how progression decisions are made.",
  },
  gravl: {
    planningStyle: "Let the app adapt",
    choiceLoad: "Low",
    continuity: "Session-adaptive",
    customization: "Guided flexibility",
    decisionsRemoved:
      "The app plans the week, exercises, sets, repetitions, and weights around goals, recovery, history, and each gym's equipment.",
    decisionsRemaining:
      "You rate performance, maintain equipment and recovery inputs, accept or change substitutions, and decide whether to trust its generated progression.",
    tradeoff:
      "It removes substantial day-to-day strength planning and adds human support, but its logic remains an AI-mediated system rather than a transparent fixed method.",
    idealUser:
      "You want to enter the gym and be told exactly what to perform and lift, with automatic progression and fast logging.",
    notFor:
      "You avoid AI, want to study a coach-authored method, or prefer full control over exercise selection and progression.",
  },
  shred: {
    planningStyle: "Let the app adapt",
    secondaryStyles: ["Choose a proven path"],
    choiceLoad: "Moderate",
    continuity: "Session-adaptive",
    customization: "Guided flexibility",
    decisionsRemoved:
      "Expert-built cycles provide the base while AI adjusts exercise selection, weights, tempo, rest, progression, and equipment fit.",
    decisionsRemaining:
      "You select a training style, provide goals and equipment, respond to recommendations, and decide how much community and class content to use.",
    tradeoff:
      "It combines adaptive strength with unusually social and class-oriented motivation, at the cost of a busier and less singular experience.",
    idealUser:
      "You want personalized strength programming but stay more consistent when challenges, friends, groups, and leaderboards are part of the product.",
    notFor:
      "You avoid AI, dislike social fitness features, or want a quiet fixed program with minimal product surface area.",
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
    summary:
      "A strength log that treats the social feed as part of training rather than an unrelated add-on.",
    evidenceNote:
      "Official product materials support the social training model; visual and defensibility judgments remain editorial.",
  },
  boostcamp: {
    score: 78,
    level: "Distinctive",
    originalMechanics: 82,
    productPointOfView: 79,
    visualIdentity: 67,
    meaningfulDifferentiation: 84,
    defensibility: 78,
    summary:
      "Turns credible creator programs and community publishing into a training marketplace with a capable logger attached.",
    evidenceNote:
      "Program breadth and creator model are documented publicly; identity judgments remain editorial.",
  },
  fitbod: {
    score: 81,
    level: "Distinctive",
    originalMechanics: 85,
    productPointOfView: 82,
    visualIdentity: 70,
    meaningfulDifferentiation: 85,
    defensibility: 83,
    summary:
      "Built its identity around generating the next workout from equipment, history, and recovery instead of presenting a fixed plan.",
    evidenceNote:
      "Adaptive generation is documented publicly; comparative originality judgments remain editorial.",
  },
  strong: {
    score: 55,
    level: "Clear identity",
    originalMechanics: 45,
    productPointOfView: 64,
    visualIdentity: 60,
    meaningfulDifferentiation: 52,
    defensibility: 50,
    summary:
      "A polished expression of the digital workout logbook, distinguished more by restraint than by a unique training system.",
    evidenceNote:
      "Feature scope is documented publicly; the originality assessment is editorial.",
  },
  caliber: {
    score: 75,
    level: "Distinctive",
    originalMechanics: 76,
    productPointOfView: 80,
    visualIdentity: 67,
    meaningfulDifferentiation: 78,
    defensibility: 74,
    summary:
      "Connects a substantial free strength product to group and individual human coaching without forcing one service level on everyone.",
    evidenceNote:
      "Free, Plus, and coaching layers are documented publicly; comparative judgments remain editorial.",
  },
  "lift-league": {
    score: 94,
    level: "Category-defining",
    originalMechanics: 97,
    productPointOfView: 96,
    visualIdentity: 96,
    meaningfulDifferentiation: 93,
    defensibility: 88,
    summary:
      "Combines a proprietary workout scoring system, one cohesive training philosophy, competitive accountability, and an unusually committed punk-metal identity.",
    evidenceNote:
      "Supported by the public product site, scoring and training-system documentation, Google Play listing, screenshots, and implementation evidence. No comparable combination was identified in this reviewed cohort; shared ownership is disclosed and hands-on review remains outstanding.",
  },
  jefit: {
    score: 68,
    level: "Clear identity",
    originalMechanics: 72,
    productPointOfView: 61,
    visualIdentity: 58,
    meaningfulDifferentiation: 74,
    defensibility: 75,
    summary:
      "Its unusually broad combination of manual planning, community routines, analytics, and adaptive AI is differentiated by scope more than a singular point of view.",
    evidenceNote:
      "Breadth and adaptive features are documented publicly; identity judgments remain editorial.",
  },
  strengthlog: {
    score: 71,
    level: "Clear identity",
    originalMechanics: 68,
    productPointOfView: 76,
    visualIdentity: 61,
    meaningfulDifferentiation: 75,
    defensibility: 73,
    summary:
      "A serious strength toolkit whose identity comes from combining an unusually capable free log with programs, calculators, and deep statistics.",
    evidenceNote:
      "Product scope is documented publicly; comparative identity judgments remain editorial.",
  },
  stronglifts: {
    score: 84,
    level: "Distinctive",
    originalMechanics: 80,
    productPointOfView: 94,
    visualIdentity: 70,
    meaningfulDifferentiation: 86,
    defensibility: 88,
    summary:
      "Its originality is disciplined constraint: a highly recognizable training doctrine that refuses to become an everything-app.",
    evidenceNote:
      "The focused system and progression rules are documented publicly; identity judgments remain editorial.",
  },
  "alpha-progression": {
    score: 77,
    level: "Distinctive",
    originalMechanics: 82,
    productPointOfView: 79,
    visualIdentity: 68,
    meaningfulDifferentiation: 80,
    defensibility: 76,
    summary:
      "Preserves a stable hypertrophy plan while making set-level progression recommendations, avoiding the randomness of a new generated workout every day.",
    evidenceNote:
      "Plan stability and progression behavior are documented publicly; identity judgments remain editorial.",
  },
  fitnotes: {
    score: 72,
    level: "Clear identity",
    originalMechanics: 52,
    productPointOfView: 86,
    visualIdentity: 65,
    meaningfulDifferentiation: 78,
    defensibility: 66,
    summary:
      "Radical simplicity, no ads, no subscription, and local-first data practices form a coherent alternative to account-heavy fitness platforms.",
    evidenceNote:
      "Free, ad-free, backup, export, and developer-declared data practices are public; identity judgments remain editorial.",
  },
  "rp-hypertrophy": {
    score: 91,
    level: "Category-defining",
    originalMechanics: 95,
    productPointOfView: 94,
    visualIdentity: 75,
    meaningfulDifferentiation: 96,
    defensibility: 93,
    summary:
      "Turns a specific autoregulated hypertrophy methodology into software that adjusts volume, load, reps, fatigue, and deloads from lifter feedback.",
    evidenceNote:
      "The feedback-driven system is documented publicly; comparative identity and defensibility judgments remain editorial.",
  },
  ladder: {
    score: 88,
    level: "Distinctive",
    originalMechanics: 89,
    productPointOfView: 92,
    visualIdentity: 82,
    meaningfulDifferentiation: 91,
    defensibility: 87,
    summary:
      "Turns a coach-led team, progressive weekly plan, community, and in-ear instruction into a daily strength experience that feels closer to joining a training room than browsing videos.",
    evidenceNote:
      "Coach teams, weekly programming, in-ear guidance, substitutions, and community are documented publicly; comparative judgments remain editorial.",
  },
  "juggernaut-ai": {
    score: 90,
    level: "Category-defining",
    originalMechanics: 94,
    productPointOfView: 95,
    visualIdentity: 76,
    meaningfulDifferentiation: 94,
    defensibility: 92,
    summary:
      "Encodes a recognizable powerlifting and powerbuilding methodology into an adaptive system driven by readiness, weak points, volume landmarks, and periodization.",
    evidenceNote:
      "The individualized strength methodology and feedback-driven adjustments are documented publicly; comparative identity judgments remain editorial.",
  },
  trainheroic: {
    score: 82,
    level: "Distinctive",
    originalMechanics: 84,
    productPointOfView: 82,
    visualIdentity: 70,
    meaningfulDifferentiation: 88,
    defensibility: 88,
    summary:
      "Combines athlete logging, coach delivery, ongoing teams, static programs, commerce, and community into infrastructure for an open strength-coaching market.",
    evidenceNote:
      "Marketplace, coaching, team, program, and logging models are documented publicly; comparative judgments remain editorial.",
  },
  "nike-training-club": {
    score: 76,
    level: "Distinctive",
    originalMechanics: 62,
    productPointOfView: 78,
    visualIdentity: 90,
    meaningfulDifferentiation: 74,
    defensibility: 82,
    summary:
      "Its differentiation comes less from a novel training mechanism than from making a large, polished, globally recognized trainer-led library free to Nike members.",
    evidenceNote:
      "Free access, program breadth, trainer-led content, and platform reach are documented publicly; originality judgments remain editorial.",
  },
  future: {
    score: 91,
    level: "Category-defining",
    originalMechanics: 91,
    productPointOfView: 94,
    visualIdentity: 84,
    meaningfulDifferentiation: 95,
    defensibility: 92,
    summary:
      "Uses software as the operating layer for a dedicated human coaching relationship rather than presenting automation as a substitute for the coach.",
    evidenceNote:
      "Dedicated-coach programming, monitoring, communication, accountability, and price are documented publicly; comparative judgments remain editorial.",
  },
  "peloton-app": {
    score: 90,
    level: "Category-defining",
    originalMechanics: 86,
    productPointOfView: 92,
    visualIdentity: 95,
    meaningfulDifferentiation: 91,
    defensibility: 94,
    summary:
      "Makes instructor personality, music, live participation, polished production, challenges, and shared class culture the central fitness product.",
    evidenceNote:
      "Live and on-demand classes, instructor model, modalities, challenges, and community are documented publicly; comparative judgments remain editorial.",
  },
  freeletics: {
    score: 89,
    level: "Distinctive",
    originalMechanics: 92,
    productPointOfView: 90,
    visualIdentity: 82,
    meaningfulDifferentiation: 91,
    defensibility: 90,
    summary:
      "Established a recognizable bodyweight-first digital-coach identity, then expanded its adaptive Training Journey system across gym equipment and cardio without abandoning train-anywhere flexibility.",
    evidenceNote:
      "AI personalization, Training Journeys, feedback adjustment, modality breadth, and community scale are documented publicly; comparative judgments remain editorial.",
  },
  "apple-fitness-plus": {
    score: 91,
    level: "Category-defining",
    originalMechanics: 82,
    productPointOfView: 92,
    visualIdentity: 97,
    meaningfulDifferentiation: 91,
    defensibility: 96,
    summary:
      "Turns Apple's devices, health data, media production, music ecosystem, and family subscription model into a fitness experience competitors cannot reproduce as a standalone app.",
    evidenceNote:
      "Device integration, real-time metrics, content model, recommendations, Custom Plans, and family sharing are documented publicly; comparative judgments remain editorial.",
  },
  sweat: {
    score: 87,
    level: "Distinctive",
    originalMechanics: 77,
    productPointOfView: 93,
    visualIdentity: 89,
    meaningfulDifferentiation: 90,
    defensibility: 87,
    summary:
      "Built a large training platform around women, recognizable trainers, life-stage programming, community, and progressive programs rather than treating women as a filter on a generic catalog.",
    evidenceNote:
      "Women-centered positioning, trainer roster, program breadth, pregnancy-related options, planning, and community are documented publicly; comparative judgments remain editorial.",
  },
  centr: {
    score: 83,
    level: "Distinctive",
    originalMechanics: 78,
    productPointOfView: 85,
    visualIdentity: 88,
    meaningfulDifferentiation: 84,
    defensibility: 82,
    summary:
      "Presents training, meals, recovery, recognizable coaches, and equipment as one polished wellness system rather than a collection of unrelated utilities.",
    evidenceNote:
      "Integrated workouts, personalized plans, nutrition, recovery, coach roster, and equipment positioning are documented publicly; comparative judgments remain editorial.",
  },
  gravl: {
    score: 88,
    level: "Distinctive",
    originalMechanics: 91,
    productPointOfView: 90,
    visualIdentity: 80,
    meaningfulDifferentiation: 90,
    defensibility: 89,
    summary:
      "Combines exact AI-prescribed strength sessions and loads with gym-specific equipment profiles, recovery context, wearable logging, human support, and a proprietary Strength Score.",
    evidenceNote:
      "Workout generation, load prescription, equipment adaptation, recovery tracking, integrations, coach support, and Strength Score are documented publicly; comparative judgments remain editorial.",
  },
  shred: {
    score: 86,
    level: "Distinctive",
    originalMechanics: 87,
    productPointOfView: 86,
    visualIdentity: 84,
    meaningfulDifferentiation: 87,
    defensibility: 85,
    summary:
      "Blends coach-built strength cycles, AI progression, studio classes, equipment adaptation, and a dense social-challenge layer more deliberately than most adaptive workout generators.",
    evidenceNote:
      "Expert cycles, AI adjustments, training styles, equipment adaptation, groups, challenges, and leaderboards are documented publicly; comparative judgments remain editorial.",
  },
};

export function getOriginalityProfile(appId: string): OriginalityProfile {
  return (
    originalityProfiles[appId] ?? {
      score: 50,
      level: "Conventional",
      originalMechanics: 50,
      productPointOfView: 50,
      visualIdentity: 50,
      meaningfulDifferentiation: 50,
      defensibility: 50,
      summary: "Originality has not yet been evaluated.",
      evidenceNote: "Not yet evaluated.",
    }
  );
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
      "Google Play early access is open; the site documents 12 connected four-week blocks, three training phases, scoring, guided logging, calculators, custom blocks, achievements, progress photos, training circles, and leaderboards.",
    public: true,
  },
  {
    id: "lift-league-google-play-20260914",
    appId: "lift-league",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.theliftleague.app",
    claimSupported:
      "Public Android availability, current maintenance, structured training and scoring features, support contact, privacy link, encryption in transit, and account-deletion availability.",
    public: true,
  },
  {
    id: "lift-league-owner-pricing-20260921",
    appId: "lift-league",
    sourceType: "First-party product update",
    url: "https://theliftleague.com/",
    claimSupported:
      "The product owner confirmed a 30-day free trial followed by a $2.99 monthly subscription.",
    public: true,
  },
  {
    id: "lift-league-privacy-20260914",
    appId: "lift-league",
    sourceType: "Privacy policy",
    url: "https://theliftleague.com/privacy/",
    claimSupported:
      "Account, profile, workout, scoring, photo, diagnostic, notification, Firebase service, sharing, retention, privacy-control, security, support, and deletion practices.",
    public: true,
  },
  {
    id: "lift-league-scoring-20260914",
    appId: "lift-league",
    sourceType: "Official documentation",
    url: "https://theliftleague.com/field-notes/exercise-scores-explained.html",
    claimSupported:
      "Exercise and Workout Scores reduce logged training into comparable performance markers while preserving user judgment and exercise-specific context.",
    public: true,
  },
  {
    id: "lift-league-block-guide-20260914",
    appId: "lift-league",
    sourceType: "Official documentation",
    url: "https://theliftleague.com/field-notes/guide-to-the-lift-leagues-12-training-blocks.html",
    claimSupported:
      "Twelve four-week blocks provide 48 weeks of connected powerbuilding, strength, and specialized training with three- to five-day schedules and repeatable paths.",
    public: true,
  },
  {
    id: "lift-league-training-philosophy-20260914",
    appId: "lift-league",
    sourceType: "Official documentation",
    url: "https://theliftleague.com/field-notes/why-training-blocks-work.html",
    claimSupported:
      "The product intentionally balances a structured complete system with the ability to select and repeat individual blocks without assembling unrelated workouts.",
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
  {
    id: "ladder-official-overview-20260921",
    appId: "ladder",
    sourceType: "Official website",
    url: "https://www.joinladder.com/",
    claimSupported:
      "Coach-led teams, progressive strength programming, team matching, home and gym support, and the no-card seven-day trial.",
    public: true,
  },
  {
    id: "ladder-apple-store-20260921",
    appId: "ladder",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/ladder-strength-training-plans/id1502936453",
    claimSupported:
      "iPhone and Apple Watch availability, daily coach-built plans, in-ear guidance, substitutions, progress journal, privacy disclosures, and current US purchases.",
    public: true,
  },
  {
    id: "juggernaut-pricing-20260921",
    appId: "juggernaut-ai",
    sourceType: "Official website",
    url: "https://www.juggernautai.app/pricing",
    claimSupported:
      "Two-week trial, current monthly and annual prices, individualized powerlifting and powerbuilding plans, feedback adjustment, videos, and community.",
    public: true,
  },
  {
    id: "juggernaut-google-play-20260921",
    appId: "juggernaut-ai",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.jtsstrength.juggernautai",
    claimSupported:
      "Android availability and individualized volume, frequency, periodization, weak-point exercise selection, readiness feedback, and current maintenance.",
    public: true,
  },
  {
    id: "trainheroic-marketplace-20260921",
    appId: "trainheroic",
    sourceType: "Official marketplace",
    url: "https://marketplace.trainheroic.com/",
    claimSupported:
      "Independently priced static programs and ongoing subscriptions across strength, powerlifting, weightlifting, conditioning, and other specialties.",
    public: true,
  },
  {
    id: "trainheroic-google-play-20260921",
    appId: "trainheroic",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.TrainHeroic.TrainHeroic",
    claimSupported:
      "Android availability, logging, planning, custom sessions, readiness insights, professional coaching, progress graphs, leaderboards, timers, and data-safety disclosures.",
    public: true,
  },
  {
    id: "nike-training-club-official-20260921",
    appId: "nike-training-club",
    sourceType: "Official website",
    url: "https://www.nike.com/help/a/ntc-info/app",
    claimSupported:
      "Free trainer-led classes, circuit workouts, multi-week programs, and guidance spanning training and wellness.",
    public: true,
  },
  {
    id: "nike-training-club-google-play-20260921",
    appId: "nike-training-club",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.nike.ntc",
    claimSupported:
      "Android availability, free Nike Member access, strength, conditioning, yoga, Pilates, recovery, activity tracking, Google Fit, and data-safety disclosures.",
    public: true,
  },
  {
    id: "future-apple-store-20260921",
    appId: "future",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/future-pro-personal-training/id1288178982",
    claimSupported:
      "iPhone and Apple Watch availability, dedicated human coach matching, custom programming, progress monitoring, accountability, current $199 monthly price, and privacy disclosures.",
    public: true,
  },
  {
    id: "future-official-overview-20260921",
    appId: "future",
    sourceType: "Official website",
    url: "https://www.future.co/",
    claimSupported:
      "Dedicated remote personal coaching, individualized programming, communication, accountability, and wearable-supported activity context.",
    public: true,
  },
  {
    id: "peloton-apple-store-20260921",
    appId: "peloton-app",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/peloton-fitness-workouts/id792750948",
    claimSupported:
      "Live and on-demand instructor-led classes, broad modalities, scheduling, stacks, challenges, Apple-device support, current US membership prices, and privacy disclosures.",
    public: true,
  },
  {
    id: "peloton-google-play-20260921",
    appId: "peloton-app",
    sourceType: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.onepeloton.callisto",
    claimSupported:
      "Android phone, tablet, TV, and Wear OS availability; thousands of classes, activity tracking, community features, and developer data-safety disclosures.",
    public: true,
  },
  {
    id: "freeletics-help-free-access-20260921",
    appId: "freeletics",
    sourceType: "Official documentation",
    url: "https://help.freeletics.com/hc/en-us/articles/360004928220-Is-the-app-free",
    claimSupported:
      "Free access includes selected signature workouts, exercises, runs, and audio sessions, while a Coach subscription supplies the personalized plan.",
    public: true,
  },
  {
    id: "freeletics-apple-store-20260921",
    appId: "freeletics",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
    claimSupported:
      "AI Coach personalization, feedback adjustment, Training Journeys, bodyweight and equipment-based training, free-tier boundaries, Apple-device support, and privacy disclosures.",
    public: true,
  },
  {
    id: "apple-fitness-plus-official-20260921",
    appId: "apple-fitness-plus",
    sourceType: "Official website",
    url: "https://www.apple.com/apple-fitness-plus/",
    claimSupported:
      "Current US price and trial, twelve workout types, weekly content, recommendations, Custom Plans, device metrics, family sharing, and platform requirements.",
    public: true,
  },
  {
    id: "apple-fitness-plus-support-20260921",
    appId: "apple-fitness-plus",
    sourceType: "Official documentation",
    url: "https://support.apple.com/en-us/102233",
    claimSupported:
      "Subscription setup and the requirement for compatible Apple devices and an Apple Account.",
    public: true,
  },
  {
    id: "sweat-official-programs-20260921",
    appId: "sweat",
    sourceType: "Official website",
    url: "https://sweat.com/",
    claimSupported:
      "Women-centered positioning and a catalog of more than seventy progressive training programs.",
    public: true,
  },
  {
    id: "sweat-apple-store-20260921",
    appId: "sweat",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587",
    claimSupported:
      "Trainer-authored home and gym programs, demonstrations, substitutions, planner, community, health integration, subscription model, Apple-device availability, and privacy disclosures.",
    public: true,
  },
  {
    id: "centr-coach-official-20260921",
    appId: "centr",
    sourceType: "Official website",
    url: "https://centr.com/pages/centr-coach",
    claimSupported:
      "Current annual offer and trial, Android and iOS availability, personalized training, programs, meal plans, progress tracking, equipment fit, and modality breadth.",
    public: true,
  },
  {
    id: "centr-apple-store-20260921",
    appId: "centr",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/centr-strength-fitness-app/id1382530817",
    claimSupported:
      "Personalized daily workouts and meals, trainer-authored programs, home and gym use, HYROX training, workout duration range, Apple-device support, and privacy disclosures.",
    public: true,
  },
  {
    id: "gravl-official-overview-20260921",
    appId: "gravl",
    sourceType: "Official website",
    url: "https://gravl.ai/",
    claimSupported:
      "AI-generated strength plans, automatic progressive overload, fast logging, equipment profiles, recovery tracking, wearable integrations, coach support, community, and Strength Score.",
    public: true,
  },
  {
    id: "gravl-apple-store-20260921",
    appId: "gravl",
    sourceType: "Apple App Store",
    url: "https://apps.apple.com/us/app/gravl-ai-personal-trainer/id6450921637",
    claimSupported:
      "Exercise and load prescription, performance feedback, Apple Watch logging, exercise videos, Premium boundaries, health integrations, and privacy disclosures.",
    public: true,
  },
  {
    id: "shred-official-overview-20260921",
    appId: "shred",
    sourceType: "Official website",
    url: "https://www.shred.app/",
    claimSupported:
      "Expert-built cycles, adaptive AI progression, equipment adjustment, strength and studio training, exercise guidance, challenges, groups, leaderboards, and community features.",
    public: true,
  },
  {
    id: "shred-official-pricing-20260921",
    appId: "shred",
    sourceType: "Official website",
    url: "https://www.shred.app/pricing",
    claimSupported:
      "Free-tier boundaries, current monthly and annual prices, annual trial, Premium personalization, AI progression, tracking, demos, equipment customization, and watch integration.",
    public: true,
  },
];

export const catalogVersion = "0.12-adaptive-and-lifestyle-cohort";
