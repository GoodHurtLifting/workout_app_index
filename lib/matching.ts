import {
  getOriginalityProfile,
  getTrainingRelationship,
  type AppRecord,
} from "@/lib/catalog";

export type FinderAnswers = Record<string, string>;

const budgetCeiling: Record<string, number> = {
  "Up to $5 monthly": 5,
  "Up to $10 monthly": 10,
  "Up to $20 monthly": 20,
};

function supportsProvenProgramChoice(app: AppRecord): boolean {
  const relationship = getTrainingRelationship(app.id);
  return (
    app.programLibrary ||
    relationship.planningStyle === "Choose a proven path" ||
    relationship.secondaryStyles?.includes("Choose a proven path") === true
  );
}

function requestedExperienceNeedsPaidAccess(
  app: AppRecord,
  answers: FinderAnswers,
): boolean {
  if (!app.hasUsableFreeTier) return true;
  const free = app.freeTierCapabilities;
  if (answers.job === "Give me a complete program")
    return !free?.completeProgram;
  if (answers.job === "Adapt training for me")
    return !free?.adaptiveProgramming;
  if (answers.job === "Let me choose a proven program")
    return !free?.programLibrary;
  return false;
}

export function exclusionReason(
  app: AppRecord,
  answers: FinderAnswers,
): string | null {
  return exclusionReasons(app, answers)[0] ?? null;
}

export function exclusionReasons(
  app: AppRecord,
  answers: FinderAnswers,
): string[] {
  const reasons: string[] = [];
  if (answers.ai === "Avoid all AI" && app.ai !== "No AI identified")
    reasons.push("Uses AI somewhere in the product");
  if (
    answers.job === "Give me a complete program" &&
    !app.deliversCompleteProgram
  )
    reasons.push("Does not provide a complete training program");
  if (answers.job === "Adapt training for me" && !app.adaptiveProgramming)
    reasons.push("Does not adapt programming automatically");
  if (
    answers.job === "Let me choose a proven program" &&
    !supportsProvenProgramChoice(app)
  )
    reasons.push("Does not offer a program library");
  const needsPaidAccess = requestedExperienceNeedsPaidAccess(app, answers);
  if (answers.budget === "Free only" && needsPaidAccess)
    reasons.push("The requested experience is not available in the free tier");
  if (
    answers.budget === "One-time purchase" &&
    needsPaidAccess &&
    app.supportsOneTimePurchase !== true
  )
    reasons.push("The requested experience requires a recurring subscription");
  const ceiling = budgetCeiling[answers.budget];
  if (
    ceiling &&
    needsPaidAccess &&
    app.monthlyPrice !== null &&
    app.monthlyPrice > ceiling
  )
    reasons.push(`Paid access costs more than $${ceiling} per month`);
  if (ceiling && app.monthlyPrice === null && needsPaidAccess)
    reasons.push("Price could not be verified within your budget");
  if (
    answers.equipment &&
    !["It varies", "Not sure"].includes(answers.equipment) &&
    !app.supportedTrainingEnvironments.includes(answers.equipment)
  )
    reasons.push(
      `Does not clearly support ${answers.equipment.toLowerCase()} training`,
    );
  return reasons;
}

export function fitScore(
  app: AppRecord,
  answers: FinderAnswers,
  includeExcluded = false,
): number {
  if (!includeExcluded && exclusionReason(app, answers)) return 0;
  // The weighted preferences total 100. Hard requirements are handled above.
  let score = 22;
  const job = answers.job;
  if (job === "Give me a complete program" && app.deliversCompleteProgram)
    score += 20;
  if (job === "Adapt training for me" && app.adaptiveProgramming) score += 20;
  if (job === "Let me choose a proven program") {
    if (app.programLibrary) score += 20;
    else if (supportsProvenProgramChoice(app)) score += 12;
  }
  if (
    job === "Help me build my own workouts" &&
    (app.authorship === "User-created" ||
      app.features.includes("Custom workouts"))
  )
    score += 20;
  if (
    job === "Log workouts quickly" &&
    (app.type === "Workout logger" || app.features.includes("Fast logging"))
  )
    score += 20;
  const relationship = getTrainingRelationship(app.id);
  const planningMatches: Record<string, typeof relationship.planningStyle> = {
    "Show me the next workout—no decisions needed": "Follow a complete path",
    "Give me a few proven programs to choose from": "Choose a proven path",
    "Adjust the workout based on my recent training": "Let the app adapt",
    "Let me build exactly what I want": "Build it yourself",
    "Just stay out of the way while I log": "Just log the work",
  };
  const preferredPlanningStyle = planningMatches[answers.planning];
  if (preferredPlanningStyle === relationship.planningStyle) {
    score += 16;
  } else if (relationship.secondaryStyles?.includes(preferredPlanningStyle)) {
    score += 9;
  }
  const goal =
    answers.goal === "Stay consistent" ? "Consistency" : answers.goal;
  if (goal && app.goals.includes(goal)) score += 14;
  const priorityMatches: Record<string, (candidate: AppRecord) => boolean> = {
    "Fast logging": (candidate) => candidate.features.includes("Fast logging"),
    "Expert programs": (candidate) =>
      candidate.authorship === "Trainer-written" ||
      candidate.features.includes("Expert programs"),
    "Automatic progression": (candidate) =>
      candidate.features.some(
        (feature) =>
          feature.includes("Progression") || feature.includes("Adaptive"),
      ),
    "Detailed analytics": (candidate) =>
      candidate.features.some((feature) => /analytics|charts/i.test(feature)),
    "Built-in motivation": (candidate) =>
      candidate.features.includes("Built-in motivation") ||
      candidate.features.includes("Leaderboards"),
    Community: (candidate) =>
      candidate.features.includes("Community") ||
      candidate.features.includes("Training circles"),
    "Human coaching": (candidate) =>
      candidate.features.includes("Human coaching"),
    "Offline use": (candidate) => candidate.features.includes("Offline use"),
  };
  if (answers.priority === "Distinctive experience") {
    score += Math.max(
      0,
      Math.min(12, Math.round((getOriginalityProfile(app.id).score - 50) / 4)),
    );
  } else if (priorityMatches[answers.priority]?.(app)) {
    score += 12;
  }
  const level =
    answers.level === "Completely new"
      ? "Beginner"
      : answers.level === "Not sure"
        ? ""
        : answers.level;
  if (level && app.level.includes(level)) score += 6;
  if (answers.ai === "I want AI-generated training" && app.ai === "AI central")
    score += 10;
  if (
    answers.ai === "Okay if it is optional" &&
    ["No AI identified", "Optional AI"].includes(app.ai)
  )
    score += 4;
  if (answers.ai === "No preference" || !answers.ai) score += 2;
  return Math.min(score, 98);
}
