import { z } from "zod";
import { getTrainingRelationship,type AppRecord,type PersonAssociation } from "./catalog.ts";
import { prepareFactClaims,disclosureSchema,publicCatalogRecord,supportedFact,isFactual,currentClaim } from "./catalog-facts.ts";
import { adjacentFeatureOptions,currentAdjacentFinding,type AdjacentFeatureAudit } from "./adjacent-features.ts";
import { catalogRecordFingerprint } from "./catalog-proposals.ts";

const text=(data:FormData,key:string)=>String(data.get(key)??"").trim();
const list=(data:FormData,key:string)=>text(data,key).split(",").map(value=>value.trim()).filter(Boolean);
const date=z.string().refine(value=>{const parsed=new Date(`${value}T00:00:00Z`);return /^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===value&&value<=new Date().toISOString().slice(0,10);},"Use an actual check date, not an invalid or future date");
const source=z.string().url().refine(value=>/^https?:\/\//.test(value),"Use an http or https source");
const finding=z.object({status:z.enum(["Documented","Not established","Separate product","Conflicting","Not available"]),summary:z.string().trim().min(1).max(1200),sourceUrls:z.array(source).max(12),evidenceClass:z.enum(["Officially documented","App-store documented"]),platforms:z.array(z.enum(["iOS","Android","Web"])).optional(),requiresPaid:z.boolean().optional(),checkedAt:z.union([date,z.literal("")]).optional()}).refine(value=>value.status==="Not established"||value.sourceUrls.length>0,"Support established or conflicting findings with a source");
const auditSchema=z.object({name:z.string().max(150),checkedAt:z.union([date,z.literal("")]),reviewScope:z.string().max(1500),sourcesChecked:z.array(source).max(100),ownerEdited:z.boolean().optional(),features:z.object(Object.fromEntries(adjacentFeatureOptions.map(key=>[key,finding])) as Record<typeof adjacentFeatureOptions[number],typeof finding>)});

export function catalogEditIsCurrent(existing:AppRecord|null,expected:string):boolean {
  return expected===(existing?catalogRecordFingerprint(existing):"unsaved");
}
function factBoolean(data:FormData,key:string):boolean|null {
 const value=text(data,key);if(value==="true")return true;if(value==="false")return false;if(value==="unknown")return null;throw new Error("Choose Yes, No, or Not established for capabilities");
}
function auditFields(audit:AdjacentFeatureAudit){return adjacentFeatureOptions.map(key=>{const item=audit.features[key];return {feature:key,status:item.status,summary:item.summary,sourceUrls:item.sourceUrls,evidenceClass:item.evidenceClass,platforms:item.platforms,requiresPaid:item.requiresPaid,checkedAt:item.checkedAt??audit.checkedAt};});}
export function buildCatalogEntryUpdate(existing:AppRecord,data:FormData,people:PersonAssociation[]=existing.people??[]):AppRecord {
 const record:AppRecord={...existing,
 name:text(data,"name"),initials:text(data,"initials"),color:text(data,"color"),type:text(data,"type"),description:text(data,"description"),bestFor:text(data,"bestFor"),caveat:text(data,"caveat"),
 price:text(data,"price"),monthlyPrice:text(data,"monthlyPrice")===""?null:Number(text(data,"monthlyPrice")),
 authorship:text(data,"authorship"),ai:text(data,"ai") as AppRecord["ai"],platforms:list(data,"platforms"),level:list(data,"level"),goals:list(data,"goals"),features:list(data,"features"),supportedTrainingEnvironments:list(data,"supportedTrainingEnvironments"),
 deliversCompleteProgram:factBoolean(data,"deliversCompleteProgram"),programLibrary:factBoolean(data,"programLibrary"),adaptiveProgramming:factBoolean(data,"adaptiveProgramming"),supportsOneTimePurchase:factBoolean(data,"supportsOneTimePurchase"),hasUsableFreeTier:factBoolean(data,"hasUsableFreeTier"),
 freeTierCapabilities:{completeProgram:factBoolean(data,"freeCompleteProgram"),adaptiveProgramming:factBoolean(data,"freeAdaptiveProgramming"),programLibrary:factBoolean(data,"freeProgramLibrary")},
 trainingRelationship:{...getTrainingRelationship(existing),planningStyle:text(data,"planningStyle") as NonNullable<AppRecord["trainingRelationship"]>["planningStyle"],secondaryStyles:list(data,"secondaryStyles") as NonNullable<AppRecord["trainingRelationship"]>["secondaryStyles"],choiceLoad:text(data,"choiceLoad") as NonNullable<AppRecord["trainingRelationship"]>["choiceLoad"],continuity:text(data,"continuity") as NonNullable<AppRecord["trainingRelationship"]>["continuity"],customization:text(data,"customization") as NonNullable<AppRecord["trainingRelationship"]>["customization"],decisionsRemoved:text(data,"decisionsRemoved"),decisionsRemaining:text(data,"decisionsRemaining"),tradeoff:text(data,"tradeoff"),idealUser:text(data,"idealUser"),notFor:text(data,"notFor")},
 commercialDisclosure:disclosureSchema.parse({status:text(data,"disclosureStatus"),statement:text(data,"disclosureStatement")}),people,
 };
 if(!record.name||!record.description||!record.type||!record.initials||!/^#[0-9a-fA-F]{6}$/.test(record.color))throw new Error("Add a name, description, product type, initials and valid logo color");
 if(!Number.isFinite(record.monthlyPrice??0)||(record.monthlyPrice??0)<0)throw new Error("Monthly price must be zero or greater");
 if(!["Not assessed","No AI identified","Optional AI","AI supporting features","AI central"].includes(record.ai))throw new Error("Choose a valid AI status");
 const relationship=record.trainingRelationship!;
 const styles=["Not assessed","Follow a complete path","Choose a proven path","Let the app adapt","Build it yourself","Just log the work"];
 if(!styles.includes(relationship.planningStyle)||relationship.secondaryStyles?.some(style=>!styles.includes(style)))throw new Error("Choose valid training styles");
 if(!["Not assessed","Low","Moderate","High"].includes(relationship.choiceLoad)||!["Not assessed","Single coherent system","Program-based","Session-adaptive","User-directed"].includes(relationship.continuity)||!["Not assessed","Follow as written","Guided flexibility","Full control"].includes(relationship.customization))throw new Error("Choose valid training details");
 record.factClaims=prepareFactClaims(JSON.parse(text(data,"factClaims")||"[]"),record);
 const previous=publicCatalogRecord(existing).adjacentFeatureEvidence;
 const raw=text(data,"adjacentFeatureEvidence");
 if(raw){
  const audit=auditSchema.parse(JSON.parse(raw)) as AdjacentFeatureAudit;
  for(const feature of adjacentFeatureOptions){if(audit.features[feature].status!=="Not established"&&!date.safeParse(audit.features[feature].checkedAt??audit.checkedAt).success)throw new Error("Add the actual check date for established feature findings");}
  if(!previous||JSON.stringify(auditFields(audit))!==JSON.stringify(auditFields(previous))) {
   record.adjacentFeatureEvidence={...audit,name:record.name,ownerEdited:true,sourcesChecked:[...new Set(Object.values(audit.features).flatMap(item=>item.sourceUrls))]};
  }
 }
 return record;
}
export function catalogListingProblems(record:AppRecord,hasDatedSource:boolean):string[] {
 const problems:string[]=[];
 if(!record.name||!record.type||record.type==="Unclassified"||!record.description||/^(Developer-submitted candidate\.|Research candidate\.)/.test(record.description))problems.push("Product identity and description");
 if(!record.platforms.length)problems.push("Supported platforms");
 if(!record.price||record.price==="Not verified")problems.push("Price summary or explicit Not established");
 if(!record.bestFor||record.bestFor==="Not yet assessed")problems.push("Factual use case");
 if(!record.commercialDisclosure||record.commercialDisclosure.status==="not-established")problems.push("Ownership and commercial disclosure");
 if(isFactual(record)&&(!supportedFact(record,"identity")||!supportedFact(record,"platforms")))problems.push("Current sources for identity and platforms");
 if(!hasDatedSource)problems.push("At least one dated public source");
 return problems;
}
export function catalogMissingItems(record:AppRecord,hasSource:boolean):string[] {
 const items=catalogListingProblems(record,hasSource);
 const audit=publicCatalogRecord(record).adjacentFeatureEvidence;
 if(!audit) items.push("Adjacent feature evidence");
 else for(const feature of adjacentFeatureOptions) if(audit.features[feature].status==="Not established" || !currentAdjacentFinding(audit,feature)) items.push(`${feature}: not established or needs rechecking`);
 if(!record.trainingRelationship || record.trainingRelationship.planningStyle==="Not assessed") items.push("Training approach");
 for(const key of ["deliversCompleteProgram","programLibrary","adaptiveProgramming","supportsOneTimePurchase","hasUsableFreeTier"] as const) if(record[key]===null||record[key]===undefined) items.push({deliversCompleteProgram:"Complete program availability",programLibrary:"Program library",adaptiveProgramming:"Adaptive programming",supportsOneTimePurchase:"One-time purchase availability",hasUsableFreeTier:"Usable free tier"}[key]);
 return items;
}
// Snapshots retain every unrelated entry, including listings absent from the private editor.
export function replacePublicCatalogEntry(snapshot:AppRecord[],record:AppRecord):AppRecord[] {
 const entry=publicCatalogRecord({...record,researchStatus:"Reviewed"});
 return [...snapshot.filter(app=>app.id!==record.id),entry];
}

export function hasCatalogPublicSource(record:AppRecord,evidence:Array<{public:number;url:string|null;checked_at:number;internal_note:string|null}>,now=Date.now()):boolean {
 const audit=publicCatalogRecord(record).adjacentFeatureEvidence;
 const auditedSource=Boolean(audit&&adjacentFeatureOptions.some(feature=>audit.features[feature].status!=="Not established"&&currentAdjacentFinding(audit,feature)&&audit.features[feature].sourceUrls.some(url=>/^https?:\/\//.test(url))));
 return auditedSource||evidence.some(item=>item.public===1&&item.url&&/^https?:\/\//.test(item.url)&&!item.internal_note?.startsWith("Seeded from the source catalog")&&Number.isFinite(item.checked_at)&&item.checked_at>0&&item.checked_at<=now)||Boolean(record.factClaims?.some(claim=>claim.url&&["Officially documented","App-store documented","Independently observed"].includes(claim.status)&&currentClaim(record,claim.field)));
}
