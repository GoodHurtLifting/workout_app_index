import { currentAdjacentFinding } from "./adjacent-features.ts";
import {
  getTrainingRelationship,
  type AppRecord,
} from "./catalog.ts";

import { matchingFacts, isFactual, supportedFact, factValue } from "./catalog-facts.ts";

import { normalizeFinderAnswers, selectedAdjacentFeatures } from "./finder-questions.ts";

export const fitMethodologyVersion = "fit-5";

export type FinderAnswers = Record<string, string>;

const budgetCeiling: Record<string, number> = {
  "Up to $5 monthly": 5,
  "Up to $10 monthly": 10,
  "Up to $20 monthly": 20,
};

function supportsProvenProgramChoice(app: AppRecord): boolean {
  const relationship = getTrainingRelationship(app);
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
  answers=normalizeFinderAnswers(answers);
  const raw=app;
  app=matchingFacts(app);
  const uncertain=(field:string)=>factValue(raw,field)==null || factValue(raw,field)==="Not assessed" || isFactual(raw) && !supportedFact(raw,field);
  const reasons: string[] = [];
  const platform=answers.platform==="iPhone"?"iOS":answers.platform;
  if(platform && !["No preference","Not sure"].includes(platform) && !app.platforms.includes(platform)) reasons.push(uncertain("platforms") ? `Support for ${answers.platform} is not established` : `Not listed for ${answers.platform}`);
  if (answers.ai === "Avoid all AI" && app.ai !== "No AI identified")
    reasons.push(uncertain("ai") ? "AI use is not established for your avoid-AI requirement" : "Uses AI somewhere in the product");
  if (
    answers.job === "Give me a complete program" &&
    !app.deliversCompleteProgram
  )
    reasons.push(uncertain("deliversCompleteProgram") ? "Complete-program support is not established" : "Does not provide a complete training program");
  if (answers.job === "Adapt training for me" && !app.adaptiveProgramming)
    reasons.push(uncertain("adaptiveProgramming") ? "Adaptive programming is not established" : "Does not adapt programming automatically");
  if (
    answers.job === "Let me choose a proven program" &&
    !supportsProvenProgramChoice(app)
  )
    reasons.push(uncertain("programLibrary") ? "Program choice is not established" : "Does not offer a program library");
  const needsPaidAccess = requestedExperienceNeedsPaidAccess(app, answers);
  const freeField = answers.job === "Give me a complete program" ? "freeTierCapabilities.completeProgram" : answers.job === "Adapt training for me" ? "freeTierCapabilities.adaptiveProgramming" : answers.job === "Let me choose a proven program" ? "freeTierCapabilities.programLibrary" : null;
  if (answers.budget === "Free only" && needsPaidAccess)
    reasons.push((uncertain("hasUsableFreeTier") || app.hasUsableFreeTier===true && Boolean(freeField && uncertain(freeField))) ? "Free access to the requested experience is not established" : "The requested experience is not available in the free tier");
  if (
    answers.budget === "One-time purchase" &&
    needsPaidAccess &&
    app.supportsOneTimePurchase !== true
  )
    reasons.push(uncertain("supportsOneTimePurchase") ? "One-time purchase access is not established" : "The requested experience requires a recurring subscription");
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
      uncertain("supportedTrainingEnvironments") ? `Training-environment support is not established for ${answers.equipment.toLowerCase()}` : `Does not clearly support ${answers.equipment.toLowerCase()} training`,
    );
  return reasons;
}

export function fitScore(
  app: AppRecord,
  answers: FinderAnswers,
  includeExcluded = false,
): number {
  answers=normalizeFinderAnswers(answers);
  if (!includeExcluded && exclusionReason(app, answers)) return 0;
  app=matchingFacts(app);
  // Core preferences total 100; optional adjacent features add at most six points.
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
  const relationship = getTrainingRelationship(app);
  const planningMatches: Record<string, typeof relationship.planningStyle> = {
    "Show me the next workout, with no decisions needed": "Follow a complete path",
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
  if (priorityMatches[answers.priority]?.(app)) {
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
  score += Math.min(6,matchedAdjacentFeatures(app,answers).length * 2);
  return Math.min(score, 98);
}

// Explicit feature labels only: descriptions, health integrations, and body measurements
// do not establish these capabilities. Factual profiles also pass the evidence gate.
const adjacentFeatureLabels:Record<string,string[]> = {
  Nutrition:["Nutrition guidance","Nutrition tracking","Meal plans","Calorie tracking","Macro tracking"],
  Recovery:["Recovery tracking","Recovery workouts","Recovery guidance"],
  Mindfulness:["Mindfulness","Meditation","Guided meditation"],
  Cardio:["Cardio","Cardio workouts","Cardio tracking"],
  "Body composition":["Body composition","Body composition tracking","Body fat tracking"],
  "Wearable integration":["Wearables","Apple Watch","Wear OS","Garmin integration","Wearable integration"],
};
export function matchedAdjacentFeatures(app:AppRecord,answers:FinderAnswers):string[] {
  const facts=matchingFacts(app);
  return selectedAdjacentFeatures(answers.extras).filter(option => {
    const audit=app.adjacentFeatureEvidence;
    if (audit) {
      const finding=audit.features[option];
      const platform=answers.platform==="iPhone"?"iOS":answers.platform;
      return currentAdjacentFinding(audit,option) && finding?.status==="Documented" &&
        finding.sourceUrls.some(url=>/^https?:\/\//.test(url)) &&
        !(answers.budget==="Free only" && finding.requiresPaid) &&
        !(platform && !["Not sure","No preference"].includes(platform) && finding.platforms && !finding.platforms.includes(platform));
    }
    return adjacentFeatureLabels[option].some(label => facts.features.includes(label));
  });
}

export function matchReasons(app:AppRecord, input:FinderAnswers):string[] {
  const answers=normalizeFinderAnswers(input);const facts=matchingFacts(app);const reasons:string[]=[];
  const extras=matchedAdjacentFeatures(app,answers);
  if(extras.length) reasons.push(`Additional preferences: ${extras.join(", ")}`);
  const platform=answers.platform==="iPhone"?"iOS":answers.platform;
  if(platform && facts.platforms.includes(platform)) reasons.push(`Available for ${answers.platform}`);
  const styles:Record<string,string>={"Show me the next workout, with no decisions needed":"Follow a complete path","Give me a few proven programs to choose from":"Choose a proven path","Adjust the workout based on my recent training":"Let the app adapt","Let me build exactly what I want":"Build it yourself","Just stay out of the way while I log":"Just log the work"};
  const style=styles[answers.planning];const relationship=getTrainingRelationship(facts);
  if(style && (relationship.planningStyle===style || relationship.secondaryStyles?.includes(style as typeof relationship.planningStyle))) reasons.push("Fits the way you want to plan training");
  const goal=answers.goal==="Stay consistent"?"Consistency":answers.goal;
  if(goal && facts.goals.includes(goal)) reasons.push(`Supports your goal: ${answers.goal.toLowerCase()}`);
  if(answers.budget==="Free only" && !exclusionReasons(app,answers).length) reasons.push("Your requested experience has free access");
  return reasons.slice(0,3);
}
