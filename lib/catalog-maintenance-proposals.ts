import { trainingRelationships, type AppRecord, type FactClaim } from "./catalog.ts";
import { isLegacyPublicApp } from "./legacy-public-catalog.ts";
import type { AdjacentFeatureAudit, AdjacentFeatureFinding } from "./adjacent-features.ts";

const checkedAt = "2026-11-10";
const alphaGuide = "https://alphaprogression.com/en/blog/alpha-progression-guide";
const alphaGlossary = "https://alphaprogression.com/en/glossary/alpha-progression";
const alphaStore = "https://apps.apple.com/us/app/alpha-progression-gym-tracker/id1462277793";
const alphaTraining: NonNullable<AppRecord["trainingRelationship"]> = {
  ...trainingRelationships["alpha-progression"],
  planningStyle: "Build it yourself",
  secondaryStyles: ["Let the app adapt"],
  choiceLoad: "Moderate",
  continuity: "Program-based",
  customization: "Full control",
  decisionsRemoved: "Pro can generate a plan and suggest weights and repetitions from your training history.",
  decisionsRemaining: "You choose your schedule, equipment and exercises, and decide whether to follow the suggestions.",
  tradeoff: "Manual plans and logging are free. Plan generation and progression recommendations require Pro.",
  idealUser: "You want to log lifting or build a customizable strength plan with optional progression guidance.",
  notFor: "You want endurance coaching, meal tracking or a dedicated watch workout app.",
};

type PricingProposal = {
  price: string;
  monthlyPrice: number | null;
  oneTime: boolean;
  url: string;
  context: string;
  oneTimeSource?: string;
};

const pricing: Partial<Record<string, PricingProposal>> = {
  trainheroic: {
    price: "Free app / Athlete Pro $4.99 monthly on U.S. iOS. Marketplace programs and teams are priced separately.",
    monthlyPrice: 4.99, oneTime: true,
    url: "https://apps.apple.com/us/app/trainheroic-strength-training/id955074569",
    context: "U.S. iOS Athlete Pro monthly listing; excludes separately priced programs and teams.",
    oneTimeSource: "https://support.trainheroic.com/hc/en-us/articles/18156885545997-For-Coaches-Selling-Marketplace-Teams-vs-Programs",
  },
  freeletics: {
    price: "Free limited workouts / Coach subscriptions for 3, 6 or 12 months. U.S. iOS lists Training Coach purchases at $34.99–$79.99 without mapping prices to terms.",
    monthlyPrice: null, oneTime: false,
    url: "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
    context: "U.S. iOS public subscription terms and Training Coach prices; no monthly plan listed.",
  },
  sweat: {
    price: "Trial available / Sweat subscription $24.99 monthly or $134.99 yearly on U.S. iOS.",
    monthlyPrice: 24.99, oneTime: false,
    url: "https://apps.apple.com/us/app/sweat-fitness-app-for-women/id1049234587",
    context: "U.S. iOS named Sweat monthly and yearly subscription products.",
  },
  gravl: {
    price: "Free to start / U.S. iOS lists Gravl membership at $14.99 monthly. Annual offers vary.",
    monthlyPrice: 14.99, oneTime: false,
    url: "https://apps.apple.com/us/app/gravl-ai-personal-trainer/id6450921637?platform=watch",
    context: "U.S. iOS Monthly Membership; annual listings vary and this price does not describe the separate macros app.",
  },
  seven: {
    price: "Free limited access / U.S. iOS lists 7 Club at $9.99 monthly or $79.99 yearly. Separate workout purchases are also listed.",
    monthlyPrice: 9.99, oneTime: false,
    url: "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551",
    context: "U.S. iOS named 7 Club membership. Separate workout purchases do not establish non-recurring access to 7 Club.",
  },
  "aldo-coach": {
    price: "Free download on U.S. iOS. No public paid tier or subscription price listed. Normal usage limits are not established.",
    monthlyPrice: null, oneTime: false,
    url: "https://apps.apple.com/us/app/aldo-coach-ai-workout-plan/id6802822375",
    context: "U.S. iOS public listing. Free download does not establish unlimited ongoing access.",
  },
  "alpha-progression": {
    price: "Free manual plans and logging / Pro $12.99 monthly or $79.99 yearly on U.S. iOS.",
    monthlyPrice: 12.99, oneTime: false, url: alphaStore,
    context: "U.S. iOS current plan labels, excluding listings explicitly labeled legacy.",
  },
};

function alphaFinding(status: AdjacentFeatureFinding["status"], summary: string): AdjacentFeatureFinding {
  return { status, summary, checkedAt, sourceUrls: [alphaGuide], evidenceClass: "Officially documented" };
}

const alphaAudit: AdjacentFeatureAudit = {
  name: "Alpha Progression",
  ownerEdited: true,
  checkedAt,
  reviewScope: "Public product documentation. Health-platform syncing and a dedicated watch app are tracked separately.",
  sourcesChecked: [alphaGuide, alphaGlossary],
  features: {
    Nutrition: { ...alphaFinding("Not available", "The publisher describes nutrition tracking as outside the app’s scope."), sourceUrls: [alphaGlossary] },
    Recovery: alphaFinding("Not established", "The guide describes progression and training adjustments. Dedicated recovery tracking or coaching is not established."),
    Mindfulness: alphaFinding("Not established", "No mindfulness feature was identified in the product guide."),
    Cardio: alphaFinding("Documented", "Cardio exercises are included in the exercise library. Endurance coaching is outside the stated product scope."),
    "Body composition": { ...alphaFinding("Documented", "The free version logs weight, body-fat percentage and circumference measurements. It records values rather than measuring them."), requiresPaid: false },
    "Wearable integration": { ...alphaFinding("Documented", "Indirect integration through Apple Health on iOS and Health Connect on Android. The publisher lists no dedicated Apple Watch or Wear OS workout app."), platforms: ["iOS", "Android"] },
  },
};

export function getCatalogEntryProposal(saved: AppRecord, researchDraft?: AppRecord): AppRecord | undefined {
  const price = Object.hasOwn(pricing, saved.id) ? pricing[saved.id] : undefined;
  if (saved.id === "gymshark-training") return researchDraft;
  const alpha = saved.id === "alpha-progression";
  // Carry forward explicit per-app guidance, never the generic rendering fallback.
  const bundledTraining = !saved.trainingRelationship && isLegacyPublicApp(saved.id)
    ? trainingRelationships[saved.id]
    : undefined;
  const missingDisclosure = !saved.commercialDisclosure || saved.commercialDisclosure.status === "not-established";
  const addDisclosure = missingDisclosure && saved.id !== "lift-league" && (isLegacyPublicApp(saved.id) || saved.id === "aldo-coach");
  if (!researchDraft && !price && !addDisclosure && !bundledTraining) return undefined;

  const proposed = { ...(researchDraft ?? saved) };
  const claims: FactClaim[] = [];
  const savedClaims = saved.factClaims ?? [];
  const hasClaim = (field: string) => savedClaims.some(claim => claim.field === field);
  if (addDisclosure) proposed.commercialDisclosure = { status: "none", statement: "" };
  else if (saved.commercialDisclosure) proposed.commercialDisclosure = saved.commercialDisclosure;

  if (price) {
    const savedSummary = saved.price?.trim();
    proposed.price = savedSummary && !["Not established", "Not verified"].includes(savedSummary)
      ? saved.price
      : price.price;
    proposed.monthlyPrice = saved.monthlyPrice ?? price.monthlyPrice;
    proposed.supportsOneTimePurchase = saved.supportsOneTimePurchase ?? price.oneTime;
    if (!hasClaim("pricing") && proposed.monthlyPrice === price.monthlyPrice) {
      claims.push({
        field: "pricing", status: "App-store documented",
        value: { price: proposed.price, monthlyPrice: proposed.monthlyPrice },
        statement: price.price, url: price.url, checkedAt, context: price.context,
      });
    }
    if (!hasClaim("supportsOneTimePurchase") && proposed.supportsOneTimePurchase === price.oneTime) {
      claims.push({
        field: "supportsOneTimePurchase", status: price.oneTimeSource ? "Officially documented" : "App-store documented",
        value: price.oneTime,
        statement: price.oneTime ? "Marketplace programs can be purchased once. Athlete Pro is a separate subscription." : "No qualifying one-time unlock was identified in the checked listing.",
        url: price.oneTimeSource ?? price.url, checkedAt, context: price.context,
      });
    }
  }

  if (bundledTraining && !researchDraft?.trainingRelationship) proposed.trainingRelationship = bundledTraining;
  if (alpha && !saved.trainingRelationship) {
    proposed.trainingRelationship = alphaTraining;
    if (!hasClaim("trainingRelationship")) {
      claims.push({ field: "trainingRelationship", status: "Officially documented", value: alphaTraining, statement: "Manual planning and logging are free. Pro adds plan generation and progression guidance.", url: alphaGuide, checkedAt, context: "Publisher product guide, iOS and Android." });
    }
  }

  if (alpha) {
    const savedAudit = saved.adjacentFeatureEvidence;
    if (!savedAudit) {
      proposed.adjacentFeatureEvidence = alphaAudit;
    } else {
      const features = { ...savedAudit.features };
      let added = false;
      for (const feature of Object.keys(alphaAudit.features) as Array<keyof typeof features>) {
        const finding = alphaAudit.features[feature];
        if (!features[feature] || (features[feature].status === "Not established" && finding.status !== "Not established")) {
          features[feature] = finding;
          added = true;
        }
      }
      if (added) proposed.adjacentFeatureEvidence = {
        ...savedAudit,
        ownerEdited: true,
        features,
        sourcesChecked: [...new Set([...savedAudit.sourcesChecked, ...Object.values(features).flatMap(finding => finding.sourceUrls)])],
      };
    }
  }
  if (claims.length) {
    const existing = new Map((proposed.factClaims ?? []).map(claim => [claim.field, claim]));
    for (const claim of [...savedClaims, ...claims]) existing.set(claim.field, claim);
    proposed.factClaims = [...existing.values()];
  }
  return proposed;
}
