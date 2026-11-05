import { z } from "zod";
import type { AppRecord, FactClaim } from "./catalog.ts";

export const factFields = ["identity", "pricing", "platforms", "ai", "features", "authorship", "goals", "level", "supportedTrainingEnvironments", "trainingRelationship", "deliversCompleteProgram", "programLibrary", "adaptiveProgramming", "supportsOneTimePurchase", "hasUsableFreeTier", "freeTierCapabilities.completeProgram", "freeTierCapabilities.adaptiveProgramming", "freeTierCapabilities.programLibrary"] as const;
export const evidenceClasses = ["Officially documented", "App-store documented", "Developer-reported", "Independently observed", "Conflicting", "Not established"] as const;
export function isFactual(app: AppRecord) { return app.coverageMode === "factual"; }
export function validFactDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value && value <= new Date().toISOString().slice(0,10);
}
const claimSchema = z.object({
  field: z.string().max(120).refine(value => (factFields as readonly string[]).includes(value) || /^feature:.{1,100}$/.test(value)),
  status: z.enum(evidenceClasses), statement: z.string().trim().min(1).max(1200),
  checkedAt: z.string().refine(validFactDate, "Use an actual check date, not a future or invalid date"),
  url: z.string().max(1500).refine(value => !value || /^https?:\/\//.test(value) && (() => { try { new URL(value); return true; } catch { return false; } })()),
  context: z.string().trim().min(1).max(500),
  value: z.unknown(), rechecked: z.boolean().optional(),
}).refine(claim => claim.value !== undefined || claim.rechecked === true, "A claim must identify the value checked")
  .refine(claim => !["Officially documented", "App-store documented"].includes(claim.status) || Boolean(claim.url), "Documentation needs a public source URL");
export const factClaimsSchema = z.array(claimSchema).max(100).refine(claims => new Set(claims.map(claim=>claim.field)).size === claims.length, "Use one reconciled claim per field");
export const disclosureSchema = z.object({ status: z.enum(["none", "material", "not-established"]), statement: z.string().trim().max(1200) }).refine(value => value.status !== "material" || value.statement.length >= 20, "Describe the material commercial relationship");
export function factValue(app: AppRecord, field: string): unknown {
  if (field === "identity") return { name: app.name, type: app.type, description: app.description, bestFor: app.bestFor, caveat: app.caveat };
  if (field === "pricing") return { price: app.price, monthlyPrice: app.monthlyPrice };
  if (field.startsWith("feature:")) return app.features.includes(field.slice(8));
  return field.split(".").reduce<unknown>((value,key) => value && typeof value === "object" ? (value as Record<string,unknown>)[key] : undefined, app);
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return JSON.stringify(value.map(canonical));
  if (value && typeof value === "object") return JSON.stringify(Object.entries(value).filter(([,v])=>v!==undefined).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>[k,canonical(v)]));
  return JSON.stringify(value) ?? "undefined";
}
export function currentClaim(app: AppRecord, field: string): FactClaim | undefined {
  return app.factClaims?.find(claim => claim.field === field && validFactDate(claim.checkedAt) && canonical(claim.value) === canonical(factValue(app,field) ?? null));
}
export function supportedFact(app: AppRecord, field: string, observedOnly = false): boolean {
  if (!isFactual(app)) return true;
  const claim = currentClaim(app,field);
  return Boolean(claim && (observedOnly ? claim.status === "Independently observed" : ["Officially documented", "App-store documented", "Independently observed"].includes(claim.status)));
}
export function latestFactDate(app: AppRecord): string | undefined {
  return app.factClaims?.filter(claim => currentClaim(app,claim.field)).map(claim=>claim.checkedAt).sort().at(-1);
}
export function factualProfileProblems(app: AppRecord): string[] {
  const missing: string[]=[];
  const parsed = factClaimsSchema.safeParse(app.factClaims ?? []);
  if (!parsed.success) return ["Valid dated fact claims"];
  const fields = ["identity", "pricing", "platforms", "ai", "features", "trainingRelationship"];
  for (const field of fields) if (!currentClaim(app,field)) missing.push(`Dated claim or explicit unknown: ${field}`);
  if (!supportedFact(app,"identity") || !supportedFact(app,"platforms") || !app.platforms.length) missing.push("Supported identity and platform sources");
  for (const field of factFields) {
    if (fields.includes(field)) continue;
    const value=factValue(app,field);
    const hasValue=Array.isArray(value)?value.length>0:value!==null && value!==undefined && value!=="" && value!=="Not assessed" && value!=="Not established";
    if (hasValue && !currentClaim(app,field)) missing.push(`Dated claim: ${field}`);
  }
  for (const field of ["pricing","ai","features","trainingRelationship",...factFields.filter(field=>!fields.includes(field))]) {
    const claim=currentClaim(app,field);
    if (!claim || supportedFact(app,field)) continue;
    const value=factValue(app,field);
    const empty = value == null || value === "Not assessed" || value === "Not established" || Array.isArray(value) && !value.length;
    const unknownPricing=field==="pricing" && app.monthlyPrice===null;
    const unknownTraining=field==="trainingRelationship" && (!app.trainingRelationship || app.trainingRelationship.planningStyle==="Not assessed");
    if (!empty && !unknownPricing && !unknownTraining) missing.push(`Keep unsupported ${field} unknown`);
  }
  if (!app.factClaims?.some(claim=>["Officially documented","App-store documented"].includes(claim.status) && claim.url && currentClaim(app,claim.field))) missing.push("Current public primary source");
  if (!supportedFact(app,"pricing") && !["Not established","Not verified","Conflicting"].includes(app.price)) missing.push("Unverified price summary must say Not established or Conflicting");
  if (!app.commercialDisclosure || !disclosureSchema.safeParse(app.commercialDisclosure).success || app.commercialDisclosure.status === "not-established") missing.push("Commercial relationship disclosure");
  return missing;
}
export function prepareFactClaims(input: unknown, app: AppRecord): FactClaim[] {
  return factClaimsSchema.parse(input).map(({ rechecked, ...claim }) => ({...claim, value: rechecked ? factValue(app,claim.field) ?? null : claim.value}));
}

// An ephemeral matching view, never saved or published. Unknowns cannot earn points.
export function matchingFacts(app:AppRecord):AppRecord {
  if (!isFactual(app)) return app;
  const boolean = (field:string,value:boolean|null|undefined) => supportedFact(app,field) ? value ?? null : null;
  const list = (field:string,value:string[]) => supportedFact(app,field) ? value : [];
  return {...app,coverageMode:"scored",monthlyPrice:supportedFact(app,"pricing")?app.monthlyPrice:null,
    hasUsableFreeTier:boolean("hasUsableFreeTier",app.hasUsableFreeTier),
    supportsOneTimePurchase:boolean("supportsOneTimePurchase",app.supportsOneTimePurchase),
    deliversCompleteProgram:boolean("deliversCompleteProgram",app.deliversCompleteProgram),
    adaptiveProgramming:boolean("adaptiveProgramming",app.adaptiveProgramming),programLibrary:boolean("programLibrary",app.programLibrary),
    freeTierCapabilities:{completeProgram:boolean("freeTierCapabilities.completeProgram",app.freeTierCapabilities.completeProgram),adaptiveProgramming:boolean("freeTierCapabilities.adaptiveProgramming",app.freeTierCapabilities.adaptiveProgramming),programLibrary:boolean("freeTierCapabilities.programLibrary",app.freeTierCapabilities.programLibrary)},
    platforms:list("platforms",app.platforms),ai:supportedFact(app,"ai")?app.ai:"Not assessed",goals:list("goals",app.goals),level:list("level",app.level),supportedTrainingEnvironments:list("supportedTrainingEnvironments",app.supportedTrainingEnvironments),
    features:list("features",app.features).filter(feature=>
      (feature!=="Fast logging" || supportedFact(app,"feature:Fast logging",true)) &&
      (!/Progression|Adaptive/.test(feature) || app.features.includes("Automatic progression") && supportedFact(app,"feature:Automatic progression"))),
    authorship:supportedFact(app,"authorship")?app.authorship:"Not assessed",
    type:"Factual profile", // A marketing category must not imply tested fast logging.
    trainingRelationship:supportedFact(app,"trainingRelationship") && app.trainingRelationship?app.trainingRelationship:{planningStyle:"Not assessed",secondaryStyles:[],choiceLoad:"Not assessed",continuity:"Not assessed",customization:"Not assessed",idealUser:"Not established",notFor:"Not established"},
  };
}

export function publicCatalogRecord(app:AppRecord):AppRecord {
  // Ratings are private historical data for every coverage mode.
  const result={...app,legit:null};
  delete result.legitAssessment;
  delete result.originalityProfile;
  return result;
}

const factLabels:Record<string,string>={identity:"Profile description and fit",pricing:"Price and billing",platforms:"Platforms",ai:"AI use",features:"Features",authorship:"Program authorship",goals:"Training goals",level:"Experience level",supportedTrainingEnvironments:"Training environments",trainingRelationship:"How this app expects you to train",deliversCompleteProgram:"Complete training programs",programLibrary:"Program library",adaptiveProgramming:"Adaptive programming",supportsOneTimePurchase:"One-time purchase",hasUsableFreeTier:"Usable free tier","freeTierCapabilities.completeProgram":"Free-tier complete programs","freeTierCapabilities.adaptiveProgramming":"Free-tier adaptive programming","freeTierCapabilities.programLibrary":"Free-tier program library"};
export function factLabel(field:string):string {return field.startsWith("feature:")?field.slice(8):factLabels[field]??"Product information";}

export function relatedOptions(app:AppRecord, apps:AppRecord[]):AppRecord[] {
  if(!supportedFact(app,"goals")) return [];
  const overlap=(candidate:AppRecord)=>candidate.goals.filter(goal=>app.goals.includes(goal)).length;
  return apps.filter(candidate=>candidate.id!==app.id&&supportedFact(candidate,"goals")&&overlap(candidate)>0).sort((a,b)=>overlap(b)-overlap(a)||a.name.localeCompare(b.name)||a.id.localeCompare(b.id)).slice(0,3);
}
