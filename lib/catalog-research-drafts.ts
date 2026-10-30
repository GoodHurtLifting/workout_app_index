import type { AppRecord } from "@/lib/catalog";

// Admin-only research drafts. Never add these to the bundled public `apps` list.
export const catalogResearchSubmissionIds: Record<string, string> = {
  "swithai": "AOYBDZAvtNwvaD6u9S8c",

  stark: "0Rbzea15uA9TZdX2rwZh",
  "gir-iron": "bZbRXp2hmnLHuuzqWLNF",
};

export const catalogResearchDrafts: Record<string, AppRecord> = {
  "swithai": {
    "id": "swithai",
    "name": "swithAI",
    "initials": "SW",
    "color": "#2e9d69",
    "type": "Goal-led wellness planner and tracker",
    "bestFor": "People who prefer one daily goal checklist across training, nutrition, activity and recovery, with basic workout logging",
    "description": "swithAI coordinates training, nutrition, activity and recovery in a goal-led daily plan. Android testing found polished themed presentation, useful next-day scheduling and workout completion tracking, but a limited strength-entry flow and repeated problems with branded-food portions and photo entry.",
    "price": "Basic $2.99/month or Plus $4.99/month in USD after an advertised seven-day trial. The owner also saw Plus at $34.99/year and a basic annual option whose price was not captured; retrieved public pages listed monthly offers only. Explore provided a demo preview, not a verified ongoing free tier. Normal billing versus developer test access remains unconfirmed.",
    "monthlyPrice": 2.99,
    "hasUsableFreeTier": false,
    "freeTierCapabilities": {
      "completeProgram": false,
      "adaptiveProgramming": false,
      "programLibrary": false
    },
    "platforms": [
      "Android",
      "iOS"
    ],
    "ai": "AI supporting features",
    "legit": 61,
    "legitAssessment": {
      "rubricVersion": "initial-v1",
      "coreExecution": 60,
      "usability": 60,
      "reliability": 60,
      "value": 70,
      "supportPrivacy": 55,
      "confidence": "Low",
      "rationale": "Provisional Android/basic-trial assessment on Samsung Galaxy A54, October 22–23, 2026; installed version unavailable in-app. Core execution (60): goal setup, workout completion and Goal credit worked, and recovery reached its endpoint, but two branded-food attempts did not visibly scale nutrients and photo entry repeatedly stalled. Usability (60): polished presentation and useful task links coexist with clipped portion controls, nested Activity navigation, unclear dumbbell load convention and abrupt stretch transitions. Reliability (60): return use and History show retained workout detail, balanced against repeated nutrition-path problems; exact load/rep/note fidelity and long-term persistence remain unverified. Value (70): low advertised basic price and a useful preview, constrained by uneven delivered utility and unresolved billing/tier boundaries. Support/privacy (55): published routes, opt-out confirmation and explicit photo-to-OpenAI disclosure are positive, but health/location disclosures conflict with current advertised features and observed measurement inputs. No data-flow audit or ordinary support-response test was performed; editorial developer contact earns no points. One completed workout-log journey does not establish that every set was physically performed. History displays individual sets, although individual-set editing was not found during logging, and repeats the workout-level RPE on each lift. Full evidence, counterevidence and adjacent-band reasons are retained in RESEARCH_SWITHAI.md. Unknown capabilities are not scored as failures.",
      "checkedAt": "2026-10-23",
      "sourceUrls": [
        "https://getswith.com/",
        "https://getswith.com/privacy",
        "https://getswith.com/support.html",
        "https://apps.apple.com/us/app/swithai-workout-meal-log/id6783848103",
        "https://play.google.com/store/apps/details?id=com.wellnesschampion.app"
      ]
    },
    "goals": [
      "Build muscle",
      "Body recomposition",
      "General fitness",
      "Track workouts",
      "Lose weight"
    ],
    "features": [
      "Goal calendar and daily tasks",
      "Workout logging",
      "Workout history",
      "Personal records",
      "Nutrition tracking",
      "Hydration tracking",
      "Timed recovery routines",
      "AI supporting tools"
    ],
    "level": [
      "Intermediate",
      "Advanced"
    ],
    "authorship": "Publisher-developed; expert program authorship unverified",
    "caveat": "On the tested Android/basic path, Upper Body Strength opened checked exercises including goblet squats and Romanian deadlifts; whether these were generated, default or retained selections is unresolved. Individual-set editing and a rest timer were not found while logging; History shows individual sets and repeats one workout-level RPE on each lift. Dumbbell weight convention was unclear. Two branded-food selections had problematic serving controls with no visible nutrient scaling, and repeated photo attempts never reached image input. Final saved food totals were not checked. Recovery guidance and transition timing were uneven. Public health/location privacy disclosures conflict with current features. The 14-week goal schedule does not establish Plus access or a complete exercise-prescribed program. False capability flags mean not established for this draft, not proven absent.",
    "deliversCompleteProgram": false,
    "programLibrary": false,
    "adaptiveProgramming": false,
    "supportedTrainingEnvironments": [
      "Dumbbells only",
      "Bodyweight"
    ],
    "researchStatus": "Candidate",
    "verifiedSections": 0,
    "totalSections": 7,
    "trainingRelationship": {
      "planningStyle": "Build it yourself",
      "secondaryStyles": [
        "Just log the work"
      ],
      "choiceLoad": "High",
      "continuity": "User-directed",
      "customization": "Guided flexibility",
      "decisionsRemoved": "Goal setup supplies a cross-pillar schedule, targets and required/optional daily tasks. Workout completion was credited to the Goal checklist. This is high-level coordination, not verified ongoing exercise prescription or adaptation.",
      "decisionsRemaining": "You check exercise suitability, interpret activity targets, supply workout loads and manage food entries. The current test did not establish a complete multi-session strength prescription or automatic progression.",
      "tradeoff": "One place for daily wellness targets and basic logs reduces switching among areas, but nested choices and uneven training/nutrition execution require more interpretation than the polished presentation suggests.",
      "idealUser": "You value a shared daily checklist and broad wellness coverage, and can interpret basic training and nutrition controls for yourself.",
      "notFor": "You need detailed per-set editing during training, unambiguous load guidance, dependable low-friction food logging, or a verified adaptive strength program."
    },
    "originalityProfile": {
      "score": 63,
      "level": "Clear identity",
      "originalMechanics": 60,
      "productPointOfView": 70,
      "visualIdentity": 75,
      "meaningfulDifferentiation": 60,
      "defensibility": 50,
      "summary": "The goal-to-daily-task workflow and themed presentation give the broad wellness bundle a recognizable identity. Its observed mechanics remain familiar, and weak food entry and limited strength controls reduce the practical distinction.",
      "evidenceNote": "Low-confidence provisional judgment from Android/basic entry, return use, workout/history and recovery flows. Mechanisms 60: concrete task coordination but familiar components; point of view 70: coherent daily goal with overlapping navigation; visuals 75: repeated owner praise for themed imagery, limited by clipped fields and faint markers; differentiation 60: a plausible breadth-first fit rather than demonstrated specialist advantage; defensibility 50: integration effort but no demonstrated hard-to-copy mechanism, live community or data advantage. Hevy documents specialist set/rest utilities and Centr Coach already bundles workouts, nutrition and recovery; those are dated documented behavioral comparators, not copied public scores or matched hands-on tests. See RESEARCH_SWITHAI.md for decisive evidence, counterevidence and adjacent-band reasons. No claim of unique AI, AI code authorship or validated proprietary swith score."
    }
  },

  "aldo-coach": {
    id: "aldo-coach",
    name: "Aldo Coach",
    initials: "AC",
    color: "#496f5d",
    type: "AI-guided training program and workout coach",
    bestFor: "People who want AI-built training around their goals and equipment and are willing to check the coach's recommendations",
    description: "Aldo Coach builds AI-generated training plans around your goals, equipment, schedule and training history, then coaches you inside the workout log. WAI found useful strength programming and a promising bands-only plan on inspection. Recommendations require your approval, but the experience also requires patience and close checking.",
    price: "Free download and no-card access observed during WAI testing; normal free/Pro limits and future pricing are unverified.",
    monthlyPrice: null,
    hasUsableFreeTier: false,
    freeTierCapabilities: {
      completeProgram: false,
      adaptiveProgramming: false,
      programLibrary: false,
    },
    platforms: ["iOS", "Apple Watch"],
    ai: "AI central",
    legit: 77,
    legitAssessment: {
      rubricVersion: "initial-v1",
      coreExecution: 80,
      usability: 65,
      reliability: 75,
      value: 90,
      supportPrivacy: 75,
      confidence: "Moderate",
      rationale: "Legit 77 reflects useful programming with material workflow friction in October testing. Core execution (80): completed strength workouts, helpful warm-ups and integrated logging, plus successful rebuild recovery. Usability (65): lengthy full-block builds and difficulty locating next actions and completed-session editing. Reliability (75): a saved equipment limit was ignored, but history remained available and workout paths functioned. An owner-reported per-set feedback discrepancy remains unresolved; the weight mismatch does not establish a save failure. Reopening and History editing are now owner-confirmed. A later equipment-profile change is developer-reported and not retested by WAI. Value (90): useful no-card test access; normal free/Pro limits and future prices remain unverified. Support/privacy (75): published disclosures and a contact route, not an audit or credit for editorial correspondence. Five owner-reported workouts and a separate unperformed bands-only plan inform this assessment. Long-term progression, daily generation and other platforms remain unverified.",
      checkedAt: "2026-10-30",
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
    level: ["Beginner", "Intermediate", "Advanced"],
    authorship: "AI-generated",
    caveat: "During October testing, full-block builds involved substantial waits, and next-workout and completion navigation were unclear. A saved equipment limit was ignored; a later developer-reported profile change has not been retested. Two sets retained prescribed rather than performed weights, without an established save failure. Reopening and History editing are available, but the tester did not discover them during the original attempt. A discrepancy reported in per-set feedback remains unresolved; the developer could not locate it in inspected recaps. A bands-only plan was inspected, not performed; longer-term progression and normal free/Pro limits remain unverified.",
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
      choiceLoad: "Moderate",
      continuity: "Session-adaptive",
      customization: "Guided flexibility",
      decisionsRemoved: "Aldo proposes a program, workout prescriptions, warm-ups and adjustments based on your goals, schedule and logged performance.",
      decisionsRemaining: "You set the constraints, record what you performed, accept or decline proposed changes, and check the resulting plan and log.",
      tradeoff: "Conversational planning offers flexibility when your goals or equipment change, but it asks for more waiting and oversight than a straightforward workout log.",
      idealUser: "You want an adaptable plan and live coaching, and you are comfortable reviewing AI recommendations before following them.",
      notFor: "You want immediate, low-oversight logging, avoid AI, need a native Android app, or want a coach who can observe your technique.",
    },
    originalityProfile: {
      score: 78,
      level: "Distinctive",
      originalMechanics: 84,
      productPointOfView: 80,
      visualIdentity: 68,
      meaningfulDifferentiation: 86,
      defensibility: 72,
      summary: "Aldo's distinctive idea is to put coaching inside the live workout log, linking set results to proposed program changes. Its program and training-context views support that identity, although the experience is not always cohesive.",
      evidenceNote: "Based on WAI workout testing and inspection of a separate limited-equipment plan. That plan was not performed. Distinctiveness reflects the tested coaching workflow and does not establish that its mechanics are exclusive.",
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
  "gir-iron": {
    id: "gir-iron",
    name: "Ægir Iron",
    initials: "ÆI",
    color: "#425c72",
    type: "Powerlifting, Olympic lifting, strongman and calisthenics programs with coaching tools",
    bestFor: "Self-coached strength athletes, athletes using an Ægir coach, and coaches managing strength-sport rosters",
    description: "Ægir Iron combines strength programming, logging, analytics, and meet planning for solo lifters, coached athletes, and coaches. Its official site describes coaches writing programs and pushing plans and updates to athletes, plus ways to bring in prior training and export logged data. WAI connected a test athlete and observed individual and roster-wide health views, but has not tested program delivery or data migration. Its optional AI assistant is separate from the rule-based core, according to the developer.",
    price: "Individual lifters: free with no time limit, per current store and site listings. Optional Anthropic AI: $4.99 or $9.99 monthly, with a higher usage limit at $9.99; no AI trial was offered in one owner-observed purchase flow. Separate coach-roster plans: $3.99 to $49.99 monthly with a free-trial offer observed in-app; the site describes a 30-day trial, not yet confirmed in-app.",
    monthlyPrice: 0,
    hasUsableFreeTier: true,
    freeTierCapabilities: {
      completeProgram: true,
      adaptiveProgramming: true,
      programLibrary: true,
    },
    platforms: ["iOS", "Android", "Web", "Apple Watch"],
    ai: "Optional AI",
    legit: 69,
    legitAssessment: {
      rubricVersion: "initial-v1",
      coreExecution: 70,
      usability: 55,
      reliability: 65,
      value: 75,
      supportPrivacy: 80,
      confidence: "Low",
      rationale: "One owner-performed workout confirms that the program wizard and solo logging can function, but the core path required substantial discovery. Dense workout screens, unclear set and exercise controls, hard-to-find history, and an unhelpful incomplete-work warning materially limited usability. The owner confirmed a later next-workout shortcut, clearer per-set label, and control help, but did not find that these resolved the broader workflow concern. In the tested coach-invite path, a Google-auth athlete account could not use the invitation sign-in page because Google sign-in was absent; a different account path connected successfully. WAI has not confirmed whether the reported fix shipped. The free individual tier offers substantial features, but access friction limits delivered value in the tested journey. Public privacy disclosures and visible controls support transparency, not verified data handling. Editorial developer contact does not count as customer support. Day 2 was simulated; offline sync, repeated training, coach program delivery, analytics with real data, and scale were not tested. Confidence is Low because the evidence does not demonstrate repeatability or independently confirm the major coach claims.",
      checkedAt: "2026-10-20",
      sourceUrls: [
        "https://apps.apple.com/us/app/%C3%A6gir-iron/id6763792846",
        "https://play.google.com/store/apps/details?id=com.aegirlab.app.twa",
        "https://www.aegirlab.com/",
        "https://www.aegirlab.com/privacy/",
      ],
    },
    goals: ["Get stronger", "Powerlifting", "Track workouts", "Build muscle"],
    features: [
      "Program library", "Custom workouts", "Automatic progression", "Set logging",
      "Offline use", "Detailed analytics", "Wearables", "Meet planning",
      "Optional AI coach", "Coach tools", "Coach-built program delivery", "Roster health view",
      "Training data import and export", "Configurable band resistance",
    ],
    level: ["Intermediate", "Advanced"],
    authorship: "Mixed",
    caveat: "One owner completed a solo workout, but the workout log was dense and the set-entry and completion flow required substantial discovery; the finish warning did not identify missing work. A later next-workout shortcut and clearer control labels improved specific issues, not the broader information-density concern. In the tested coach invitation, Google sign-in was absent for an athlete account created with Google; joining through another account path worked, and a later fix has not been confirmed by WAI. Coach program delivery, analytics with training data, data portability, offline sync, progression over time, and scale remain untested. Public exercise-count claims differ. Published privacy disclosures are not a data-handling audit.",
    deliversCompleteProgram: true,
    programLibrary: true,
    adaptiveProgramming: true,
    supportedTrainingEnvironments: ["Commercial gym", "Home gym", "Barbell and plates", "Bodyweight"],
    researchStatus: "Candidate",
    verifiedSections: 0,
    totalSections: 7,
    trainingRelationship: {
      planningStyle: "Choose a proven path",
      secondaryStyles: ["Build it yourself", "Follow a complete path"],
      choiceLoad: "Moderate",
      continuity: "Program-based",
      customization: "Full control",
      decisionsRemoved: "A chosen template or the guided wizard supplies a multi-week structure and prefilled sessions. For a coached athlete, the coach makes the programming decisions while the app is designed to deliver their plans and updates to the athlete's account, according to the official site. WAI observed a coach invite and individual and roster-wide views with a new test account, but has not tested plan delivery or calculations with training data.",
      decisionsRemaining: "Solo lifters choose a training path and equipment, judge program suitability, and log accurately. Coached athletes still need to execute and log the work; coaches remain responsible for programming, interpreting athlete data, and making decisions. Everyone retains responsibility for technique and recovery.",
      tradeoff: "It joins solo training and coach-to-athlete program delivery in one detailed strength-sport platform and emphasizes retaining training history through changes in coach or discipline. The dense workout screen and specialist controls require more interpretation than a simple logger. WAI tested an invite-led coach connection but did not verify dedicated coach discovery. Program delivery, data portability, and dashboard value with a trained roster have not been hands-on verified.",
      idealUser: "You train seriously on your own or with an Ægir coach, or you coach strength athletes and want to write and deliver their programs, monitor training, and keep their history accessible across coaching changes.",
      notFor: "You want the quickest possible first workout, a minimal logbook, or an app with no AI features available at all.",
    },
    originalityProfile: {
      score: 69,
      level: "Clear identity",
      originalMechanics: 65,
      productPointOfView: 80,
      visualIdentity: 75,
      meaningfulDifferentiation: 70,
      defensibility: 55,
      summary: "The Nordic presentation and focus on lifters who move among strength sports and coaches give Ægir a clear point of view. WAI observed a flexible wizard and coach dashboard, but the dense workout interface weakened the identity in use. The developer describes workload formulas, muscle mapping, coach-built program delivery, and data portability; WAI has not established that these mechanisms are unique or verified their end-to-end results.",
      evidenceNote: "Reassessed October 20 from one physical owner workout, a simulated logging-flow test, verified navigation and label updates, and an initial coach-athlete invite and empty-state dashboard test. The concept is coherent and visually recognizable, but feature quantity, formulas, and development effort do not prove original mechanics or a hard-to-copy advantage. The tested Google-auth invite path failed while a different path worked. Program delivery, portability, analytics with real data, and direct competitor uniqueness remain untested. This is a private, provisional assessment, not a comprehensive audit.",
    },
  },
};

export type ResearchSource = { label: string; url?: string; supports: string; followUp?: string };

export const catalogResearchSources: Record<string, ResearchSource[]> = {
  "swithai": [
    {
      "label": "Official website: site; checked 2026-10-23",
      "supports": "Four-area product and USD monthly offers: basic $2.99 and Plus $4.99 after seven-day trials. Basic logging versus Plus generated plans/recommender and longer planning horizons. Health integration and GPS logging advertised.",
      "followUp": "Retrieved October 23; publisher claims, not performance verification. Annual in-app offers absent from retrieved page. Bodyweight/home and dumbbell equipment examples are documented, not a test of constraint handling.",
      "url": "https://getswith.com/"
    },
    {
      "label": "Privacy policy: privacy; checked 2026-10-23",
      "supports": "Policy discloses OpenAI processing, usage-analytics opt-out, wellness/profile storage and deletion limitations, while denying height/weight/heart-rate, HealthKit and location collection. Those denials conflict with current features and observed setup inputs.",
      "followUp": "Policy dated August 11, 2026; retrieved October 23. No backend collection, security, legal compliance or deletion audit. Supplying fields does not independently prove server transmission.",
      "url": "https://getswith.com/privacy"
    },
    {
      "label": "Official documentation: support; checked 2026-10-23",
      "supports": "Public email contact, stated response window and data/deletion request routes are available.",
      "followUp": "Retrieved October 23. No ordinary customer-support response or effectiveness test; editorial correspondence excluded from scoring.",
      "url": "https://getswith.com/support.html"
    },
    {
      "label": "Apple App Store: apple; checked 2026-10-23",
      "supports": "US listing identifies Jason Abbamonte LLC, iPhone/iPad availability and $2.99/$4.99 in-app purchase entries. Publisher describes history-based adjustments.",
      "followUp": "US region; retrieved October 23. No iOS hands-on testing; download price does not establish a usable free tier and advertised adaptation is not verified.",
      "url": "https://apps.apple.com/us/app/swithai-workout-meal-log/id6783848103"
    },
    {
      "label": "Google Play: play; checked 2026-10-23",
      "supports": "Live Android listing describes Health Connect read-only access and on-device muscle-group suggestions; release text includes demo mode and Data Safety lists location.",
      "followUp": "Retrieved October 23; displayed update October 17, not verified installed version. Unparameterized fallback region not confirmed. Data Safety is publisher disclosure, not audited behavior.",
      "url": "https://play.google.com/store/apps/details?id=com.wellnesschampion.app"
    },
    {
      "label": "Official documentation: terms; checked 2026-10-23",
      "supports": "Terms describe AI/nutrition estimates and formulas using user-supplied body measurements; outputs are estimates, not measured individual outcomes.",
      "followUp": "Retrieved October 23; terms dated October 2. No independent validation of calorie targets or clinical fitness advice.",
      "url": "https://getswith.com/terms.html"
    },
    {
      "label": "Hands-on testing: owner-entry-nutrition; checked 2026-10-22",
      "supports": "October 22: Explore opened demo and basic monthly trial entry opened fuller goal setup. Two selected branded foods showed problematic serving controls with no visible scaling of displayed nutrients; repeated photo consent attempts never reached capture/selection. Hydration entries appeared and manual test cardio was acknowledged.",
      "followUp": "Samsung Galaxy A54; version not found in-app, region and normal-versus-license-test billing unknown. Food save totals, photo root cause, telemetry suppression and backend handling unverified. Screenshot 1000012234.jpg shows explicit photo-to-OpenAI disclosure. Demo is not an ongoing free tier."
    },
    {
      "label": "Hands-on testing: owner-training-recovery; checked 2026-10-23",
      "supports": "October 23: next-day Upper Body Strength opened checked row, squat, RDL and overhead press entries. Workout finish produced PRs/log acknowledgement and correct Goal credit. Recovery reached 11-stretch endpoint; visual guidance and timer transitions uneven. Activity categories remained confusing.",
      "followUp": "Samsung Galaxy A54/basic selected trial. Origin of checked selection unresolved; no claim of failed generated algorithm. No individual-set editing/rest timer found in tested log; no full physical-workout or stored-value audit. Stretch image mismatch minor; no unauthorized-video or unsafe-movement finding."
    },
    {
      "label": "Hands-on testing: owner-history; checked 2026-10-23",
      "supports": "October 23 History follow-up: individual sets are shown, although individual-set editing was not available to the owner during entry. One workout-level RPE is repeated on each lift. Workout details remain accessible after completion.",
      "followUp": "History inspected, not a full value-by-value check: all exact weights/reps/notes and long-term retention remain unconfirmed. No claim of per-set RPE collection, fabricated sets or misuse by an algorithm. Scores remain provisional Legit 61, Originality 63, Low confidence."
    },
    {
      "label": "Official website: hevy-comparator; checked 2026-10-23",
      "supports": "Hevy documents set types, automatic rest timers, routines, history and PRs; provides a concrete specialist logging benchmark.",
      "followUp": "Retrieved October 23. Documentation-only comparator; not matched hands-on testing, a price comparison or a copied public score.",
      "url": "https://www.hevyapp.com/"
    },
    {
      "label": "Official website: centr-comparator; checked 2026-10-23",
      "supports": "Centr Coach bundles workouts, nutrition, recovery and planning, so cross-domain breadth alone does not establish swithAI uniqueness.",
      "followUp": "Retrieved October 23. Documentation-only comparator; no comparative outcome or price judgment.",
      "url": "https://centr.com/pages/centr-coach"
    }
  ],

  "aldo-coach": [
    {"label":"Owner correction and contemporaneous feedback location, October 30, 2026","supports":"October 30 owner clarification, using contemporaneous session notes: on October 21 all three deadlift working sets were performed at 185 pounds, against a 170-pound prescription. The owner cannot determine whether a prompt to update remaining targets was missed or absent. After Finish workout, a recap revealed recorded values 185/170/170. Attempts to change the other two weight fields to 185 reverted to 170 on blur before the owner found how to reopen the finished session. The owner now confirms the Session Complete link says Tap to reopen and edit, and History editing is straightforward. This supports edit discoverability/completed-state friction, not unavailable editing or a confirmed save failure. An earlier 180 reference was corrected as a chat typo. Separately, the contemporaneous notes locate the reported 5 x 5 statement in per-set feedback when AI was re-enabled for accessories after AI-off deadlifts; do not relocate it to the end-of-workout summary. No screenshot or verbatim message is available, and Jack did not find that statement in the two recaps he inspected. Its cause remains unresolved.","followUp":"Supersedes definitive recap/save-failure language in earlier entries. The feedback report and post-finish weight discrepancy are separate events. Reopening/History editing is confirmed; unknown original input propagation and message cause remain unresolved."},
    {"label":"Developer clarification, received October 29 and reconciled October 30, 2026","supports":"Jack reports that disabling per-set feedback stops the immediate Claude call when logging, but a later coach request reads that day's saved sets, including those logged with feedback off. He confirms that the saved 25-pound dumbbell note was ignored by the October 19 rebuild, and reports equipment-profile integration since October 26. That change has not been retested for effective constraint enforcement. He reports 185/170/170 deadlift records and normal completed-session locking with reopening/History edit routes. He says the two recaps he inspected described three working sets, and suggests warm-up counting as a hypothesis. These are attributed developer explanations, not an independent backend or data-flow audit, and the inspected recaps need not be the per-set feedback message described in the notes. His editorial response earns no support-response points.","followUp":"Qualified developer correspondence, not a new product retest or a reproduction of the owner-reported per-set message. Equipment remediation remains unverified. Local score changes require selected-field acceptance and publication gates."},
    {"label":"Final owner fresh-account test and closeout, October 22, 2026","supports":"October 22 fresh-account check: the owner reports deleting the prior account and starting over, choosing mobility and cycling goals, naming Muscle Monsters when asked about a preferred trainer as a deliberately mismatched reference, and declaring only bands as available equipment. On inspecting the prescribed movements, the owner considered the generated workouts good within that unusual combination. No workout from this fresh plan is reported performed. Account deletion was experienced through the user flow, not audited for backend erasure. Build time remained substantial without a measured duration. The owner reported previously observed issues remained; this is an overall assessment, not an independent retest of every earlier defect. The owner also saw an option for AI to build each day instead of a full block, but did not test it; no claim that this route is faster or more reliable is supported. The owner would consider Aldo for a few equipment-constrained travel workouts, but not ongoing personal use.","followUp":"Final fit judgment: broaden the level field to Beginner, Intermediate and Advanced as an editorial assessment of guided generation, warm-up detail and adjustable prescriptions, supported by repeat owner use and the fresh constrained-plan inspection. No novice participant was tested, and terminology, oversight and navigation may still challenge beginners. Equipment flexibility is supported by the tested dumbbell/home setup and bands-only plan inspection, not every possible restriction or reliable retention in all later sessions. Mobility/cycling were requested goals, not independently validated cycling programming or completed mobility training. The named creator was a preference input, not evidence of authorship, endorsement, partnership or copied programming. Travel use is an owner-stated possible fit, not a completed travel/offline test. The observed daily-build option is untested and does not remove the measured-scope full-block wait concern. Final local scores remain Legit 75 (core 80, usability 65, reliability 65, value 90, support/privacy 75), Originality 78, Moderate confidence. The fresh generated plan reinforces core versatility within the existing strong band, while no completed fresh-plan workout or corrected prior behavior warrants an increase. Prior record-edit and recap concerns remain material. No automatic deduction is applied for another wait, and no bonus for a successful account-deletion flow is treated as a backend privacy audit. This is the final bounded editorial proposal for owner admin acceptance; further testing is not required. No saved admin record, review stage or publication is changed."},
    {"label":"Owner logged-weight and correction follow-up, October 22, 2026","supports":"Reported October 22 about the recent deadlift workout: two of three deadlift sets showed the prescribed weight rather than the weight the owner actually used. Attempts to correct those two entries did not change the displayed numbers, and the owner could not find how to edit the program after it had been marked finished. This is a reported record-versus-performance discrepancy and unsuccessful correction attempt. It does not establish whether the original cause was an unchanged prefilled value, an input interaction, a failed save, later overwrite, or a completed-state restriction. Exact affected weights, edit route, and persisted backend values were not supplied or independently inspected. The owner referred to the finished program; whether the lock applied to the session, block, or another object is unresolved. This is separate from the earlier incorrect AI recap, not proof that the AI changed the stored sets or that Claude caused the discrepancy. No sixth workout is inferred.","followUp":"Scores remain Legit 75 (80/65/65/90/75), Originality 78, Moderate confidence. The record/edit observation strengthens existing reliability and usability limitations and adds a qualification to logging execution; it does not trigger an automatic per-incident deduction. Before accepting the saved admin card, review this added limitation. No saved record, stage, or publication is changed by the local update. Earlier statements that the recap alone did not prove changed logs remain valid for that incident; this is new, separate evidence concerning displayed set records. No new public-source check is claimed."},
    {"label":"Final editorial proposal for owner admin review, October 21, 2026","supports":"October 21 editorial proposal based on five owner-reported workouts, return use, two explicit block rebuilds, and four supplied UI photos. Core execution 80: useful program generation, warm-ups and logging, with a suitable rebuilt session, but equipment-limit correction and repeated rebuild work qualify the coaching promise. Usability 65: lengthy setup and rebuild waits, repeated navigation and post-completion friction, unclear AI-control coupling, set-reference conventions, and overlapping Sources labels impose material interpretation and correction. Reliability 65: the owner reported a false 5 x 5 recap of 3 x 5 deadlifts, plus inconsistent use of a stated equipment ceiling; these concern coaching accuracy without confirmed corruption of recorded sets. Explicit rebuilds recovered a plan with visible history, so an earlier chat agreement is not proof a saved block was lost. Value 90: useful no-card access continued after a reported usage limit and no-cost Pro upgrade; standard limits and future pricing are unverified and no corrective-rebuild charge was observed. Support/privacy 75: published disclosures and a support route inform the bounded assessment; the Sources screen shows context categories and sharing labels but does not verify backend processing. Editorial correspondence is excluded. Moderate confidence reflects repeated principal-path use with remaining platform, long-term progression, reset, backend, and causal gaps. Total is the equally weighted mean, 75; saved-admin acceptance and owner review remain separate.","followUp":"Supersedes earlier current-score and pending-reassessment descriptions. Local Legit 75 / Originality 78 / Moderate are prepared for selected-field acceptance only; no saved card, review stage, or publication is changed. Earlier source entries retain their dated scopes and recovery qualifications."},
    {"label":"Owner-supplied UI photos, October 21, 2026","supports":"Four owner-supplied UI photos reviewed October 21 show the rebuilt program at Week 2 of 9; a Sources diagram with memory 12 of 12 notes, training log 3 sessions, and 5 shared / 2 not shared; weekly working-set volume and body-part set charts; and menu routes for Profile, Aldo's memory, Coach & AI, Data & Backup, and Advanced. Plan/schedule labels visibly overlap and profile text truncates in the captured Sources view. The owner reports five workouts, so the three-session display needs scope explanation. The sharing label does not distinguish explicit permission from available or selected context.","followUp":"Visible UI evidence only: no verification of source retrieval, complete log count, chart calculations, edit controls, backend data flow, or unauthorized sharing. Menu routes exist; deeper options and behavior were not fully tested. Photos are private, include account details, and are not public profile images. Attachment filenames 1000012206.jpg through 1000012209.jpg identify the four supplied images."},
    {"label":"Owner fifth-workout observations, recorded October 21, 2026","supports":"Scope: The owner identifies this as the fifth Aldo workout. Earlier three-workout summaries are historical scope, not the current total. This report includes finish-workout behavior but does not independently document every intervening session or establish that the planned account reset occurred. Previous-load reference: On a lighter recovery day in an alternating program, the previous-weight display used the most recent heavy-day weight rather than the previous light-day weight. This is an observed reference-context limitation; it does not establish an incorrect stored log or prove the label promises a like-for-like light-day comparison. Coupled controls: Turning off per-set AI feedback also removed the prompt to repopulate sets after editing a recommended weight. The owner considered this a minor loss but expected the controls to be independent. Functional assistance versus coaching commentary is a proposed design distinction, not a confirmed existing setting or required implementation. Feedback on re-enable: After returning from Program and re-enabling set feedback, conversation resumed with earlier context. Feedback appeared for already-completed squats that had been performed with AI off, but not for the overhead-press working set just completed before enabling it. Later, re-enabling AI for accessories produced a recap of deadlifts performed with AI off. This demonstrates some retrospective access to workout context, while timing and coverage were unclear; it does not prove when feedback was generated or what background model processing occurred. Warm-up numbering: Per-set feedback described set 4 complete after two warm-up sets and two working sets, while the visible working-set column showed set 2. This reinforces the earlier numbering mismatch. Four total sets is arithmetically consistent; the issue is differing numbering conventions without clear labels, not proof of a wrong applied set. Incorrect deadlift recap: The owner reports completing 3 x 5 deadlifts, but the AI recap said a full 5 x 5 at the working weight. This is a concrete owner-reported false workout summary, stronger evidence than the ambiguous set numbering. It does not establish that the underlying workout log was changed or identify whether the fault lay in model output, supplied context, retrieval, or Aldo integration. Progression question: The AI described 185-pound deadlifts as tying the previous heaviest pull, while the current prescription had been 170. The owner expected only squats to be lighter on this recovery day, with other lifts progressing from prior work. Record the unexplained prescription versus the owner's intended program; the exact chosen program rules and Aldo's rationale have not been checked, so this is not independently verified as incorrect loading or a required increase. Fit and diminishing feedback value: By the fifth workout the owner no longer found per-set commentary necessary and questioned whether program-building benefits outweighed ambiguity and build waits. The suggestion that beginners might retain it longer is a hypothesis, not tested beginner evidence. Keeping accurate logs while commentary is disabled is a user expectation; it does not require continuous AI calls. Finish-workout handoff: Finish workout generated a brief beneath the log on the same screen with a share button, but the owner still lacked a clear next action and felt stuck. The owner did not see a useful purpose for sharing the long AI brief. This reinforces recurring completion-navigation friction; it does not establish human trainers' preferences or that no other navigation route exists.","followUp":"Later evidence supersedes earlier three-workout scope and strengthens recap-accuracy and usability concerns. No raw log inspection, confirmed model-specific root cause, account-reset outcome, or numeric score approval. Do not treat hypothetical beginner fit or trainer preferences as tested facts."},
    {"label":"Owner recovery and access follow-up, October 21, 2026","supports":"October 21 recovery follow-up supersedes the earlier unresolved missing-plan outcome: the owner explicitly selected eight weeks and rebuilt through Program. Monday's chat agreement may not have completed that process. After an app-estimated seven-minute build, approval led to another finalization phase estimated at one minute; elapsed time was not measured. The resulting block showed week 2 of 9 and retained visible prior training dates. The owner liked that continuity, but questioned repeated main-lift prescriptions alongside changed accessories. Repetition alone was not established as a programming error. Visible October 12 and 19 entries suggested seven days between sessions, conflicting with the AI's earlier ten-day account; its calculation is unknown. After another AI conversation and full rebuild, the owner considered the session appropriate: recovery squats, primary overhead press and deadlift, close-grip bench, planks, and EZ-bar French press. The deadlift appeared light to the owner but was acceptable. No completed October 21 workout has been reported. This recovery demonstrates available history and a workable rebuilt session, not a verified remaining eight-week progression. Two lengthy block builds and intervening clarification delayed readiness to train. The owner judged that this could outlast a planned ten-minute treadmill warm-up; that is an anticipated gym scenario, not a measured delay. The AI's reflexively agreeable apology frustrated the owner and is not independent proof of a programming defect. The owner was unsure how to correct one session without disturbing the remaining block. The observed burden is repeated waiting, interpretation, and correction before the plan feels ready to use. During this sequence, Aldo said the owner had hit a usage limit and was automatically switched to Pro at no cost. Continued no-cost access was reported; standard allowances, reset periods, Pro entitlements, and future paid terms are unverified. The message alone does not prove each rebuild consumed a quota. Concern that future paid users could bear the cost of correcting app-generated plans is a conditional value concern, not an observed charge or established billing policy.","followUp":"This later outcome supersedes earlier unresolved plan-absence notes. History was available and final session fit was positive. No fourth completed workout, measured elapsed build time, backend data loss, or paid corrective-rebuild charge is established. Scores remain unchanged pending owner review."},
    {"label":"Owner return check before reset, October 21, 2026","supports":"On reopening Aldo October 21 before the planned reset, the owner found no scheduled workout and nothing under Program > Plan, despite the earlier agreement to an eight-week continuation. This extends the earlier program-ended warning to a later visit with no visible plan. Whether the continuation was saved, removed, filtered, or failed to load remains unresolved; backend data loss is not established.","followUp":"No fourth workout or reset is reported complete. Earlier plan access was an observation from the prior visit, not current availability. No root cause or confirmed backend data loss."},
    {
      label: "Consolidated owner follow-up, October 19-21, 2026",
      supports: "Evidence updated October 21 from three completed owner workouts and return use. Program generation, warm-ups, logging, and performance-based suggestions were useful. Setup, repeated AI waits, post-completion navigation, a timer reset after an edit, and one ambiguous set reference added friction. Aldo prescribed 40-pound dumbbells despite a stated 25-pound-per-dumbbell limit; after a reminder, its higher-rep adjustment was acceptable to the owner. The owner agreed in chat to an eight-week continuation, completed the third workout, and then saw a red program-ended warning. Stated equipment constraints and agreed program changes did not consistently carry through to the workout experience. The saved program state and cause are unresolved; this does not establish absent persistent memory, context loss, or data loss. Existing scores are retained pending explicit owner review of a separate reassessment proposal; the earlier neutral reliability rationale is superseded. Free access was useful in owner testing. Store disclosures are first-party claims, not a backend audit, and editorial correspondence is excluded from customer-support evidence.",
      followUp: "Supersedes earlier statements that only two workouts were complete, the resumed workout was uncompleted, or reliability remained neutral. Older source entries below retain their dated observation scope. No further workout or developer reply is required. Scores await owner review; do not infer missing memory architecture or context loss.",
    },
    {
      label: "US App Store memory description, read October 21, 2026",
      url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
      supports: "The developer describes editable memory holding equipment, working loads and preferences, plus exercise history consulted before writing sessions.",
      followUp: "First-party claims, not verified architecture or evidence that every recommendation applies stored constraints. Website and privacy page were inaccessible through the research tool October 21.",
    },
    {
      label: "US App Store listing, rechecked October 19, 2026",
      url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
      supports: "Lists free iPhone and Apple Watch access, AI-written programs, coaching attached to logged sets, suggested changes that require user acceptance, history, and offline access to the non-AI workout log. The listing is rated 18+ and discloses linked health, contact, usage, and other data. Its release notes describe a go-to-workout shortcut and revised in-set coaching, which WAI has not retested.",
      followUp: "Treat feature and release-note text as developer claims. The free download does not by itself verify every future pricing boundary. US, UK, and several European country listings were found; avoid claiming a complete country list.",
    },
    {
      label: "Developer website",
      url: "https://aldo-coach.app/",
      supports: "Describes set-by-set coaching, program-building, and workout history. It links to a browser version and states that current access is free with no card or trial clock.",
      followUp: "The site could not be retrieved for a fresh check on October 19. Preserve these as dated first-party claims rather than current WAI verification. Earlier site language about age conflicted with the App Store and privacy policy; use the App Store's 18+ requirement until clarified.",
    },
    {
      label: "Developer privacy policy",
      url: "https://aldo-coach.app/privacy",
      supports: "October 6 policy names Supabase for account and training data, Anthropic for AI processing, and US storage and processing. It says relevant profile, training, schedule, chat, and optional health-related context can reach Anthropic. Injury and Apple Health use require separate consent, and the policy describes deletion and export choices.",
      followUp: "The policy could not be retrieved for a fresh check on October 19. Do not present its October 6 wording as current or imply a backend audit. The App Store's current developer-provided privacy disclosure is available for a qualified listing; a new hands-on privacy test is not a publication gate.",
    },
    {
      label: "Owner hands-on test, October 2026: onboarding and plan",
      supports: "A 5x5 rebuild with recomposition accessories was generated around the owner's goals and home equipment. The plan, warm-up details, progression explanation, and approval step were useful. Getting to the first workout took about 15 minutes, and the program outline alone took about 48 seconds.",
      followUp: "Retest onboarding duration and navigation on the current version. This is one tester's experience, not a general performance measurement.",
    },
    {
      label: "Owner hands-on test, October 2026: workout and follow-up",
      supports: "Set logging and AI load suggestions worked in a completed workout. The owner liked adjusted warm-ups, lift summaries, and the log interface. Hands-on use confirmed multiple AI controls: a response can be canceled for one set, or AI can be turned off more broadly. Editing a lift reset the rest timer; a proposed 20-pound increase and later program-adjustment flow needed clearer context. The post-workout route back to the broader dashboard was hard to find.",
      followUp: "Recheck the timer, suggestion clarity, and post-workout navigation after product updates. These are observed usability issues, not proof of a persistent defect.",
    },
    {
      label: "Owner hands-on test, October 2026: second workout set references",
      supports: "During a second workout, AI feedback referred to a change for 'set 2' while two preceding warm-up sets made that appear to correspond to the fourth set shown in the workout. This made the intended target of the recommendation unclear.",
      followUp: "Verify whether the AI counts warm-up sets in its set number, whether the recommendation was applied to the correct working set, and whether this repeats. Do not classify this as an incorrect load change without checking the actual applied set.",
    },
    {
      label: "Owner hands-on return check, October 19, 2026",
      supports: "After roughly a week away, the owner reopened the app. Program showed the guide again, while the existing plan was reachable under Program > Plan. Progress showed no data, and Workout offered creating a workout or reusing a past workout, without a clear next session from the previously built three-day-per-week plan. When asked through chat, the AI recognized 10 days off and the owner's cutting goal, proposed starting the first week back about 5-10 pounds under the earlier numbers, and offered to put the skipped Monday Full Body C session on today. It asked about an eight-week block. The owner then asked to pick up where they left off, reviewed and approved the proposal, and returned to the program. The owner could not find this return path from the workout screen.",
      followUp: "The approval and return to the program confirm an AI-assisted resume path, but it was not discoverable from the workout screen. The owner has not reported completing the resumed workout, so its loads and subsequent progression are not verified. This does not establish that the prior plan was deleted or its schedule changed. No additional workout is required for a qualified listing.",
    },
    {
      label: "Developer correspondence, October 2026",
      supports: "The developer reported availability in the US, Canada, UK, EU, Iceland, and Norway; AI-off logging for a lift or whole workout; Claude Opus 5.5 for program work and Sonnet 5.5 for set coaching; and paid tiers planned later.",
      followUp: "The AI-off control is corroborated by owner testing, and the current App Store notes name the two Claude models. Do not treat a country list or future pricing as independently verified. The developer answered early public questions but has not replied to later direct WAI outreach; that is an observed contact outcome, not proof of generally unavailable support. Turning AI off does not by itself establish how data is processed.",
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
  "gir-iron": [
    {
      label: "Owner hands-on coach-and-athlete test, October 18, 2026",
      supports: "On desktop, the owner copied a coach invitation link and used a separate test athlete account to join the roster. Selecting the athlete exposed weekly program progress, bodyweight, readiness trends, recent PRs, a body map, and links to program, analytics, progress, and PRs. A separate roster-wide health view was visible. The supplied screenshot shows empty states because the joined athlete has no program or training history yet.",
      followUp: "Verify coach/athlete permissions, program and meet-plan push, roster calculations with data, and subscription gates. More coach-discovery options are an owner suggestion, not a verified absent feature.",
    },
    {
      label: "Owner hands-on test, October 14, 2026: program setup and first workout",
      supports: "The owner liked the Nordic visual style and prominent privacy explanation. The program wizard explained cycle/block/week/session terms, offered strength and sport-specific paths, and built an eight-week, three-day full-body strength-and-muscle plan with heavy and volume days. Volume and weekly-layout previews were available. The owner reached and completed a workout, observed an auto rest timer, and found exercise demos with target muscles.",
      followUp: "Single-session observation only. The volume and progression charts were not immediately interpretable; the weekly layout showed an overlapping frozen column while scrolling. Logging opened near the bottom of a long exercise list, set-versus-exercise completion and the selected unit were unclear on that screen, and the finish warning did not identify missing prescribed sets. Test these again and ask whether the app supports a simpler per-set logging view.",
    },
    {
      label: "Owner hands-on settings check, October 14, 2026",
      supports: "Settings showed Captain Ægir as a free helper, let the owner enter an estimated resistance for each band color, and showed pounds as the current unit with a kg/lb switch. The optional Anthropic AI coach was offered at $4.99 or $9.99 per month, with a higher monthly limit at the latter tier; no AI trial was offered in that purchase flow. Separate paid coach-roster tools appeared designed for coaches to add their own athletes and manage their workouts, with a free-trial offer. The owner found no lifter-facing coach-search flow. Settings also displayed health-data consent withdrawal and stored-data deletion buttons, plus a Strava connection option.",
      followUp: "Check what Captain Ægir can access and whether saved band values affect prescriptions or logs. Confirm exact AI usage limits, coach-roster trial length, and regional prices. Ask whether any coach-discovery flow exists rather than treating its absence from this navigation pass as conclusive. Test the scope and effect of the health-data controls and Strava connection; visible buttons do not establish that the actions work.",
    },
    {
      label: "US App Store listing, checked October 13, 2026",
      url: "https://apps.apple.com/us/app/%C3%A6gir-iron/id6763792846",
      supports: "Confirms a live US iPhone listing from AEGir Labs, LLC, Apple Watch compatibility, free download with purchases, and listed coach and AI purchase prices. The developer's listing describes the program wizard, logging, and offline sync; Apple has not independently tested those claims.",
      followUp: "The store labels the app Designed for iPhone and lists English, while the site describes iPad use and several language tools. Check actual iPad layout, language coverage, purchase labels, and free access in-app.",
    },
    {
      label: "Google Play listing, checked October 13, 2026",
      url: "https://play.google.com/store/apps/details?id=com.aegirlab.app.twa",
      supports: "Confirms a live Android listing by AEGir Labs, LLC. Its developer-authored description presents free solo access, program building, strength-sport logging, and coach subscriptions. Its Data safety section declares collection of personal, health/fitness, and app-performance data.",
      followUp: "Test the Android app and offline sync. The Play description says more than 540 exercises, whereas the submission says 600+ and the site says nearly 1,000. Do not publish a precise count yet.",
    },
    {
      label: "Official website and pricing, rechecked October 19, 2026",
      url: "https://www.aegirlab.com/",
      supports: "The developer positions the product for self-coached lifters, coached athletes, and coaches. It describes coaches building programs and meet plans and pushing updates to athlete accounts, plus roster-wide recovery and workload views. It also describes importing prior programs, lifts and meet results, exporting logged training data, and retaining history through a change of coach or discipline. The site lists free athlete access, paid coach plans with a 30-day trial, optional AI, and iOS/Android/web access.",
      followUp: "These are first-party claims, not WAI-tested outcomes. The invitation and empty-state coach views were observed; program push and import/export were not. Clarify whether existing coaches can migrate a full roster or must import each athlete separately, what records each role can export, and who controls data when a coaching relationship ends. Recheck current prices, availability, and permissions before approval.",
    },
    {
      label: "Developer privacy policy, updated September 6, 2026; checked October 13",
      url: "https://www.aegirlab.com/privacy/",
      supports: "Discloses Firebase storage and authentication, Vercel usage analytics, Sentry error reporting, optional Anthropic processing for the paid Assistant Coach, optional Apple Health and Strava integrations, and account deletion and export procedures. It also says free AI helpers have narrower inputs than the paid assistant.",
      followUp: "This is a developer disclosure, not a privacy or security audit. Check the precise data sent by Captain Ægir and import conversion, consent controls, deletion/export behavior, and how App Store/Play privacy disclosures align with the policy.",
    },
  ],
};

export function getUnmodifiedPlaceholderResearchDraft(record: AppRecord, sourceSubmissionId?: string): AppRecord | null {
  const draft = catalogResearchDrafts[record.id];
  const expectedSubmissionId = catalogResearchSubmissionIds[record.id];
  if (!draft || (expectedSubmissionId && expectedSubmissionId !== sourceSubmissionId) ||
      draft.name.toLowerCase() !== record.name.toLowerCase() ||
      !["Candidate", "Researching", "Evaluation ready"].includes(record.researchStatus) || record.type !== "Unclassified" ||
      record.description !== "Developer-submitted candidate. Product claims have not been independently verified.") return null;
  return { ...draft, name: record.name, initials: record.initials, researchStatus: record.researchStatus };
}
