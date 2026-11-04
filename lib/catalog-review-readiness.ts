import { isFactual, factualProfileProblems } from "./catalog-facts.ts";
import { getOriginalityProfile, getTrainingRelationship, type AppRecord } from "./catalog.ts";

export function missingReviewProfileDetails(record: AppRecord): string[] {
  if (isFactual(record)) {
    const missing = factualProfileProblems(record);
    if (!record.name || !record.type || record.type === "Unclassified" || !record.description || (record.description.startsWith("Developer-submitted candidate.") || record.description.startsWith("Research candidate.")) || !record.bestFor || record.bestFor === "Not yet assessed" || !record.caveat || record.caveat === "Not yet assessed") missing.push("Identity, position, and description");
    return missing;
  }
  const originality = getOriginalityProfile(record);
  const relationship = getTrainingRelationship(record);
  const missing: string[] = [];
  if (record.commercialDisclosure?.status === "not-established") missing.push("Commercial relationship disclosure");
  if (!record.name || !record.type || record.type === "Unclassified" ||
      !record.description || (record.description.startsWith("Developer-submitted candidate.") || record.description.startsWith("Research candidate.")) ||
      !record.bestFor || record.bestFor === "Not yet assessed" ||
      !record.caveat || record.caveat === "Not yet assessed" ||
      !record.authorship || record.authorship === "Not assessed") missing.push("Identity, position, and description");
  if (!record.platforms.length) missing.push("Platforms");
  if (!record.price || record.price === "Not verified") missing.push("Pricing");
  if (!record.ai || record.ai === "Not assessed") missing.push("AI status");
  if (!record.features.length) missing.push("Feature inventory");
  if (!Number.isFinite(record.legit) || record.legit === null || record.legit === 0 || originality.score === 0 ||
      originality.level === "Not assessed" || originality.summary === "Not yet assessed." ||
      originality.evidenceNote === "Developer claims have not been independently verified." ||
      relationship.planningStyle === "Not assessed" || relationship.choiceLoad === "Not assessed" ||
      relationship.continuity === "Not assessed" || relationship.customization === "Not assessed" ||
      relationship.decisionsRemoved === "Not yet assessed" ||
      relationship.decisionsRemaining === "Not yet assessed" ||
      relationship.tradeoff === "Not yet assessed" ||
      relationship.idealUser === "Not yet assessed" ||
      relationship.notFor === "Not yet assessed") missing.push("Scores and training relationship");
  return missing;
}
