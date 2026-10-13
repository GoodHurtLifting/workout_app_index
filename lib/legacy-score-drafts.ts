import type { AppRecord, LegitAssessment } from "./catalog.ts";
import { calculateLegitScore, calculateOriginalityScore, getOriginalityProfile } from "./catalog.ts";
import { legacyPublicAppIds } from "./legacy-public-catalog.ts";

type LegacyId = (typeof legacyPublicAppIds)[number];
const checkedAt = "2026-10-09";

function assessed(
  coreExecution: number, usability: number, reliability: number, value: number,
  supportPrivacy: number, confidence: LegitAssessment["confidence"],
  rationale: string, sourceUrl: string,
): LegitAssessment {
  return {
    rubricVersion: "initial-v1", coreExecution, usability, reliability, value,
    supportPrivacy, confidence, rationale, checkedAt, sourceUrls: [sourceUrl],
  };
}

// Private editorial drafts. They do not alter bundled or published public scores.
// Store pages and official materials establish public claims, not hands-on reliability.
export const legacyScoreDrafts: Record<LegacyId, LegitAssessment> = {
  hevy: assessed(85, 80, 75, 80, 70, "Moderate", "A mature, focused logger with documented social and progression tools. The free routine/history limits lower value; direct reliability and privacy-control testing is still needed.", "https://help.hevyapp.com/hc/en-us/articles/35119778922263-Hevy-Pro-Subscription-How-to-get-Pro-and-What-Does-It-Include"),
  boostcamp: assessed(85, 75, 75, 95, 70, "Moderate", "The free program library and full tracker provide unusually strong value. Program choice and differing author quality add friction; coaching outcomes, reliability, and privacy controls remain untested.", "https://www.boostcamp.app/pro"),
  fitbod: assessed(80, 75, 75, 70, 70, "Low", "Adaptive session generation is the core offer, but training quality across repeated weeks has not been tested. Subscription-only continuation and opaque decisions temper value and confidence.", "https://apps.apple.com/us/app/fitbod-gym-fitness-planner/id1041517543"),
  strong: assessed(80, 85, 75, 80, 70, "Moderate", "The focused logbook and unlimited free workout history serve self-directed lifters well. Routine limits and lack of a guided program are clear scope boundaries, not defects; long-run sync still needs testing.", "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577"),
  caliber: assessed(80, 75, 75, 90, 70, "Low", "A substantial free strength tracker and optional human coaching provide a useful range of support. Plus and coaching boundaries, delivered coaching quality, and data practices need direct review.", "https://apps.apple.com/us/app/caliber-strength-training/id1482405410"),
  "lift-league": assessed(80, 70, 60, 90, 65, "Low", "The coherent block system, proprietary scores, and low current price are promising. A recent release and limited independent usage history constrain reliability and support judgments; WAI's shared ownership requires extra scrutiny.", "https://theliftleague.com/"),
  jefit: assessed(80, 65, 75, 80, 65, "Low", "Extensive logging, plans, and analytics support many training styles, but the crowded decision flow may hinder usability. Current tier boundaries, support, and privacy controls need deeper checks.", "https://www.jefit.com/"),
  strengthlog: assessed(85, 80, 75, 90, 70, "Moderate", "Unlimited free logging plus programs and strength utilities make a strong toolkit. Premium boundaries and cross-device reliability still need hands-on confirmation.", "https://www.strengthlog.com/"),
  stronglifts: assessed(85, 80, 75, 85, 70, "Moderate", "A narrow, clearly explained barbell progression removes many planning decisions. Its equipment and goal limits are fit constraints; sustained logging and privacy controls remain untested.", "https://stronglifts.com/app/"),
  "alpha-progression": assessed(80, 75, 70, 75, 70, "Low", "A stable hypertrophy plan with set-level progression is a coherent model, but the adaptive features are Pro-gated. Training recommendations and reliability require repeated-session testing.", "https://alphaprogression.com/en"),
  fitnotes: assessed(80, 80, 70, 100, 70, "Low", "A free, no-frills Android logbook provides strong value for self-directed training. It does not supply programming, and local data/backup reliability still needs device testing.", "https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes"),
  "rp-hypertrophy": assessed(85, 70, 70, 70, 70, "Low", "A defined hypertrophy methodology and feedback-based adjustments offer depth for its intended lifter. Cost and technical setup require commitment; progression and deload quality need multiweek testing.", "https://rpstrength.com/pages/hypertrophy-app"),
  ladder: assessed(85, 80, 75, 75, 70, "Low", "Coach-led progressive weekly programming and in-ear cues provide clear direction. Subscription value depends on team and coach fit; continuity and support need direct use.", "https://www.joinladder.com/"),
  "juggernaut-ai": assessed(85, 70, 75, 70, 70, "Low", "A specialized powerlifting and powerbuilding method is publicly documented, with feedback-driven adaptation. The high-commitment setup and pricing fit a narrower audience; recommendation quality needs a full block test.", "https://www.juggernautai.app/pricing"),
  trainheroic: assessed(80, 70, 75, 75, 65, "Low", "The platform supports coach-led programs, teams, and athlete logging, but offer quality and price vary by seller. Marketplace discovery and support responsibility need testing.", "https://marketplace.trainheroic.com/"),
  "nike-training-club": assessed(80, 80, 75, 95, 70, "Low", "A broad free trainer-led library is valuable for general fitness. Choosing among sessions and limited strength progression are meaningful tradeoffs; current app flow and data controls need testing.", "https://www.nike.com/help/a/ntc-info/app"),
  future: assessed(90, 80, 75, 75, 75, "Low", "Dedicated human programming and accountability can justify a premium price for the right client. Actual coach responsiveness, continuity, and data practices cannot be scored confidently from sales material alone.", "https://future.co/"),
  "peloton-app": assessed(85, 80, 80, 75, 75, "Moderate", "The large, polished instructor-led library and community are well established. Tier complexity and limited detailed lifting progression are tradeoffs; current app and privacy behavior need direct checks.", "https://apps.apple.com/us/app/peloton-fitness-workouts/id792750948"),
  freeletics: assessed(80, 75, 75, 70, 70, "Low", "Adaptive journeys across settings provide flexibility, but personalized coaching is paid and the breadth can create choice burden. Longer-term programming and current checkout terms need review.", "https://help.freeletics.com/hc/en-us/articles/360004928220-Is-the-app-free"),
  "apple-fitness-plus": assessed(85, 85, 85, 80, 80, "Moderate", "A polished class experience and Apple-device integration are well documented. Its value is strongest inside that ecosystem; it does not provide a detailed strength log or barbell progression.", "https://www.apple.com/apple-fitness-plus/"),
  sweat: assessed(80, 80, 75, 70, 70, "Low", "Trainer-authored programs and life-stage coverage provide clear value for the target audience. Catalog choice, regional pricing, program continuity, and privacy controls need direct assessment.", "https://sweat.com/"),
  centr: assessed(80, 75, 75, 70, 75, "Low", "Training, meal guidance, and recovery form a broad bundle. The personalized plan's depth and current subscription value need testing, particularly for users seeking precise strength progression.", "https://centr.com/pages/centr-coach"),
  gravl: assessed(80, 75, 70, 70, 65, "Low", "Equipment-aware AI strength sessions and load recommendations offer a complete path. Price transparency, recommendation quality, and training-data practices need direct review.", "https://gravl.ai/"),
  shred: assessed(80, 70, 70, 70, 65, "Low", "Coach-built cycles with adaptive and social layers cover many use cases, but the breadth may obscure the main path. Premium gates and progression behavior need in-app checks.", "https://www.shred.app/pricing"),
  bodi: assessed(80, 70, 75, 70, 70, "Low", "Named multiweek home programs offer structure after selection, but the large catalog and layered offers complicate entry. Current plan limits and workout experience need direct checks.", "https://www.bodi.com/products/bodi-subscription"),
  ifit: assessed(85, 75, 75, 70, 70, "Low", "Connected-equipment control and scenic coaching are a substantial product advantage. Hardware dependence, tier complexity, and device reliability require direct testing.", "https://apps.apple.com/us/app/ifit-workouts/id1274601042"),
  "les-mills-plus": assessed(85, 80, 75, 70, 75, "Low", "Recognizable instructor-led formats provide a consistent class experience. Base/Premium access and regional prices vary; it is not individualized lifting progression.", "https://www.lesmills.com/ondemand/faq"),
  "alo-wellness-club": assessed(80, 80, 70, 95, 70, "Low", "A large no-cost mind-body library is attractive for its audience. It leaves program selection to the user, and current access and data practices need rechecking in the app.", "https://www.alomoves.com/"),
  "gymshark-training": assessed(80, 75, 70, 95, 70, "Low", "Free creator-led plans and logging provide strong entry value. Catalog breadth, program consistency, and apparel-ecosystem data practices need direct evaluation.", "https://support.gymshark.com/en/articles/11185911-the-gymshark-training-app"),
  smartgym: assessed(85, 85, 80, 75, 75, "Moderate", "Apple Watch-first logging and adaptive planning are well documented, with custom non-AI routes. The free-tier limits and actual adaptation still need hands-on comparison.", "https://smartgymapp.com/"),
  evolve: assessed(85, 75, 70, 70, 70, "Low", "Integrated strength, nutrition, and meet preparation target serious lifters. Adaptive quality, analytical accuracy, and subscription value need a sustained training test.", "https://www.evolvetrainingapp.com/"),
  "volt-athletics": assessed(80, 75, 75, 70, 70, "Low", "Sport-specific and tactical programming are a clear niche. Individual versus team value, progression, and support require direct assessment.", "https://voltathletics.com/individuals"),
  sworkit: assessed(80, 75, 75, 75, 70, "Low", "Flexible session length and inclusive training collections are useful for general fitness. The many paths and channel-dependent pricing need in-app review.", "https://sworkit.com/get-started/sworkit-user-guide"),
  fitnessai: assessed(75, 70, 70, 65, 65, "Low", "Automated lifting prescription is the core offer, but the logic is relatively opaque and purchase variants complicate value. Repeated-session quality and privacy controls need testing.", "https://apps.apple.com/us/app/fitness-ai-gym-workout-planner/id1446224156"),
  seven: assessed(80, 80, 75, 70, 70, "Low", "Very short guided sessions make habit-building approachable. The model is not a substitute for specialized strength progression; current subscription tiers need checking.", "https://seven.app/"),
  "home-workout-leap": assessed(75, 70, 70, 90, 55, "Low", "Free bodyweight plans with guidance are accessible, but ads and broad marketing claims temper the experience. Data-safety declarations and real ad/tracking behavior need closer review.", "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment"),
};

// Independent editorial normalization of the five originality dimensions.
// This is a private comparative hypothesis, not proof that a feature is unique.
type OriginalityDimensions = [number, number, number, number, number];
export const legacyOriginalityDrafts: Record<LegacyId, OriginalityDimensions> = {
  hevy: [65, 70, 70, 75, 65],
  boostcamp: [75, 80, 65, 80, 70],
  fitbod: [80, 80, 70, 80, 75],
  strong: [45, 65, 60, 50, 50],
  caliber: [65, 75, 65, 70, 65],
  "lift-league": [85, 85, 90, 80, 65],
  jefit: [60, 60, 60, 65, 70],
  strengthlog: [60, 70, 60, 70, 65],
  stronglifts: [70, 90, 70, 80, 80],
  "alpha-progression": [75, 75, 65, 75, 65],
  fitnotes: [45, 75, 60, 65, 55],
  "rp-hypertrophy": [85, 90, 70, 85, 80],
  ladder: [80, 85, 75, 85, 75],
  "juggernaut-ai": [85, 90, 70, 85, 80],
  trainheroic: [75, 75, 65, 80, 75],
  "nike-training-club": [55, 75, 85, 70, 75],
  future: [80, 85, 75, 80, 75],
  "peloton-app": [80, 85, 90, 85, 85],
  freeletics: [85, 80, 75, 80, 70],
  "apple-fitness-plus": [75, 85, 90, 85, 85],
  sweat: [70, 85, 80, 80, 75],
  centr: [70, 75, 80, 75, 70],
  gravl: [80, 80, 75, 80, 65],
  shred: [75, 80, 75, 75, 70],
  bodi: [80, 85, 80, 80, 80],
  ifit: [90, 85, 85, 85, 85],
  "les-mills-plus": [80, 85, 85, 80, 80],
  "alo-wellness-club": [70, 80, 85, 75, 70],
  "gymshark-training": [65, 75, 85, 75, 70],
  smartgym: [80, 80, 85, 80, 75],
  evolve: [80, 80, 75, 80, 65],
  "volt-athletics": [80, 85, 70, 80, 75],
  sworkit: [70, 80, 70, 75, 65],
  fitnessai: [75, 75, 70, 70, 65],
  seven: [80, 85, 80, 80, 70],
  "home-workout-leap": [55, 70, 60, 60, 60],
};

export function withPrivateLegacyScoreDraft(app: AppRecord, bundled: AppRecord): AppRecord {
  const assessment = legacyScoreDrafts[app.id as LegacyId];
  if (!assessment || app.researchStatus === "Reviewed" || app.legitAssessment || app.legit !== bundled.legit) return app;
  const originality = getOriginalityProfile(app);
  const [originalMechanics, productPointOfView, visualIdentity, meaningfulDifferentiation, defensibility] = legacyOriginalityDrafts[app.id as LegacyId];
  const originalityDraft = {
    ...originality, originalMechanics, productPointOfView, visualIdentity,
    meaningfulDifferentiation, defensibility,
    evidenceNote: `${originality.evidenceNote} Provisional comparative assessment from public materials; distinctiveness and defensibility need competitor and owner review.`,
  };
  originalityDraft.score = calculateOriginalityScore(originalityDraft);
  originalityDraft.level = originalityDraft.score >= 85 ? "Distinctive" : originalityDraft.score >= 70 ? "Clear identity" : "Conventional";
  return {
    ...app,
    legit: calculateLegitScore(assessment),
    legitAssessment: assessment,
    originalityProfile: originalityDraft,
  };
}
