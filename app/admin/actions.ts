"use server";

import { revalidatePath, updateTag } from "next/cache";
import { apps, catalogEvidenceSeeds, getOriginalityProfile, getTrainingRelationship, type AiStatus, type AppRecord, type OriginalityProfile, type PersonAssociation, type PlanningStyle, type ResearchStatus, type TrainingRelationship } from "@/lib/catalog";
import { getCatalogAdminForAction } from "@/lib/admin-auth";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getCatalogRecord, isRecheckedEvidence, listAllEvidence, listEvidence, listReviewedCatalogRecords, saveCatalogRecord, saveEvidence, savePublication } from "@/lib/catalog-repository";

const splitList=(value:FormDataEntryValue|null)=>String(value??"").split(",").map(item=>item.trim()).filter(Boolean);
const field=(data:FormData,name:string)=>String(data.get(name)??"").trim();
const checked=(data:FormData,name:string)=>data.get(name)==="on";
function score(data:FormData,name:string):number {
  const raw=field(data,name);
  if(raw==="") throw new Error(`${name} is required`);
  const value=Number(raw);
  if(!Number.isInteger(value)||value<0||value>100) throw new Error(`${name} must be a whole number from 0 to 100`);
  return value;
}
function count(data:FormData,name:string):number {
  const raw=field(data,name);
  if(raw==="") throw new Error(`${name} is required`);
  const value=Number(raw);
  if(!Number.isInteger(value)||value<0) throw new Error(`${name} must be a non-negative whole number`);
  return value;
}
const personRoles = new Set<PersonAssociation["role"]>(["Creator", "Founder", "Trainer", "Program author", "Featured athlete"]);

function parsePeople(value: FormDataEntryValue | null): PersonAssociation[] {
  const parsed: unknown = JSON.parse(String(value ?? "[]"));
  if (!Array.isArray(parsed) || parsed.length > 30) throw new Error("Invalid people list");
  const people = parsed.map((item): PersonAssociation => {
    if (!item || typeof item !== "object") throw new Error("Invalid person");
    const person = item as Record<string, unknown>;
    const name = String(person.name ?? "").trim();
    const role = person.role as PersonAssociation["role"];
    const relationship = String(person.relationship ?? "").trim();
    const sourceUrl = String(person.sourceUrl ?? "").trim();
    const aliases = Array.isArray(person.aliases) ? person.aliases.map((alias) => String(alias).trim()).filter(Boolean) : [];
    if (!name || name.length > 120 || !personRoles.has(role) || !relationship || relationship.length > 300 || aliases.length > 10 || aliases.some((alias) => alias.length > 120)) throw new Error("Complete each person's name, role, and connection");
    const source = new URL(sourceUrl);
    if (source.protocol !== "https:") throw new Error("People sources must use HTTPS");
    const checkedAt = typeof person.checkedAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(person.checkedAt) ? person.checkedAt : new Date().toISOString().slice(0, 10);
    return { name, role, relationship, sourceUrl, aliases, checkedAt };
  });
  if (new Set(people.map((person) => person.name.toLowerCase())).size !== people.length) throw new Error("Each person can only appear once per app");
  return people;
}

export async function markEditorialRequestReviewed(formData: FormData) {
  const user = await getCatalogAdminForAction();
  const id = String(formData.get("id") ?? "").trim();
  if (!/^[A-Za-z0-9]{20}$/.test(id)) throw new Error("Invalid request");
  await getAdminFirestore().collection("editorialRequests").doc(id).update({
    status: "reviewed",
    reviewedAt: Date.now(),
    reviewedBy: user.userId,
  });
  revalidatePath("/admin");
}

export async function importPreliminaryCatalog(){
  const user=await getCatalogAdminForAction(); const now=Date.now();
  const db=getAdminFirestore();
  await Promise.all(apps.map(async app=>{
    const ref=db.collection("catalogApps").doc(app.id);
    const existing=await ref.get();
    if(!existing.exists) await saveCatalogRecord(app,user.userId);
  }));
  await Promise.all(catalogEvidenceSeeds.map(async source=>{
    const ref=db.collection("evidenceSources").doc(source.id);
    const existing=await ref.get();
    if(!existing.exists) await saveEvidence({id:source.id,app_id:source.appId,source_type:source.sourceType,url:source.url,claim_supported:source.claimSupported,checked_at:now,public:source.public?1:0,internal_note:"Seeded from the source catalog; recheck before final editorial review."});
  }));
  revalidatePath("/admin");
}

export async function updateCatalogApp(formData:FormData){
  const user=await getCatalogAdminForAction(); const id=String(formData.get("id")??""); const existing=await getCatalogRecord(id); if(!existing) throw new Error("App not found");
  const monthlyRaw=String(formData.get("monthlyPrice")??"").trim();
  const relationship:TrainingRelationship={
    ...getTrainingRelationship(existing),
    planningStyle:field(formData,"planningStyle") as PlanningStyle,
    secondaryStyles:splitList(formData.get("secondaryStyles")) as PlanningStyle[],
    choiceLoad:field(formData,"choiceLoad") as TrainingRelationship["choiceLoad"],
    continuity:field(formData,"continuity") as TrainingRelationship["continuity"],
    customization:field(formData,"customization") as TrainingRelationship["customization"],
    decisionsRemoved:field(formData,"decisionsRemoved"),
    decisionsRemaining:field(formData,"decisionsRemaining"),
    tradeoff:field(formData,"tradeoff"),
    idealUser:field(formData,"idealUser"),
    notFor:field(formData,"notFor"),
  };
  const originality:OriginalityProfile={
    ...getOriginalityProfile(existing),
    score:score(formData,"originalityScore"),
    level:field(formData,"originalityLevel") as OriginalityProfile["level"],
    originalMechanics:score(formData,"originalMechanics"),
    productPointOfView:score(formData,"productPointOfView"),
    visualIdentity:score(formData,"visualIdentity"),
    meaningfulDifferentiation:score(formData,"meaningfulDifferentiation"),
    defensibility:score(formData,"defensibility"),
    summary:field(formData,"originalitySummary"),
    evidenceNote:field(formData,"originalityEvidenceNote"),
  };
  const verifiedSections=count(formData,"verifiedSections");
  const totalSections=count(formData,"totalSections");
  const researchStatus=field(formData,"researchStatus") as ResearchStatus;
  const record:AppRecord={
    ...existing,
    name:field(formData,"name"), initials:field(formData,"initials"), color:field(formData,"color"),
    type:field(formData,"type"), bestFor:field(formData,"bestFor"), description:field(formData,"description"),
    caveat:field(formData,"caveat"), price:field(formData,"price"),
    monthlyPrice:monthlyRaw===""?null:Number(monthlyRaw),
    supportsOneTimePurchase:checked(formData,"supportsOneTimePurchase"),
    hasUsableFreeTier:checked(formData,"hasUsableFreeTier"),
    freeTierCapabilities:{completeProgram:checked(formData,"freeCompleteProgram"),adaptiveProgramming:checked(formData,"freeAdaptiveProgramming"),programLibrary:checked(formData,"freeProgramLibrary")},
    platforms:splitList(formData.get("platforms")), ai:field(formData,"ai") as AiStatus,
    legit:score(formData,"legit"), goals:splitList(formData.get("goals")), features:splitList(formData.get("features")),
    level:splitList(formData.get("level")), authorship:field(formData,"authorship"),
    deliversCompleteProgram:checked(formData,"deliversCompleteProgram"),programLibrary:checked(formData,"programLibrary"),adaptiveProgramming:checked(formData,"adaptiveProgramming"),
    supportedTrainingEnvironments:splitList(formData.get("supportedTrainingEnvironments")),
    researchStatus,verifiedSections,totalSections,people:parsePeople(formData.get("people")),
    trainingRelationship:relationship,originalityProfile:originality,
  };
  if(!record.name||!record.description||!record.type) throw new Error("Name, description, and product type are required");
  if(!record.bestFor||!record.initials||!record.color||!/^#[0-9a-fA-F]{6}$/.test(record.color)) throw new Error("Best fit, initials, and a valid color are required");
  if(!Number.isFinite(record.monthlyPrice??0)||(record.monthlyPrice??0)<0) throw new Error("Monthly price must be zero or greater");
  if(verifiedSections>totalSections) throw new Error("Verified sections cannot exceed total sections");
  if(!["Candidate","Researching","Evaluation ready","Reviewed"].includes(researchStatus)) throw new Error("Invalid research status");
  const styles=["Follow a complete path","Choose a proven path","Let the app adapt","Build it yourself","Just log the work"];
  if(!styles.includes(relationship.planningStyle)||relationship.secondaryStyles?.some(style=>!styles.includes(style))) throw new Error("Invalid training style");
  if(!["Low","Moderate","High"].includes(relationship.choiceLoad)||!["Single coherent system","Program-based","Session-adaptive","User-directed"].includes(relationship.continuity)||!["Follow as written","Guided flexibility","Full control"].includes(relationship.customization)) throw new Error("Invalid training relationship");
  if(!["Conventional","Clear identity","Distinctive","Category-defining"].includes(originality.level)||!originality.summary||!originality.evidenceNote) throw new Error("Complete the originality assessment");
  if(!relationship.idealUser||!relationship.notFor) throw new Error("Complete the fit assessment");
  if(researchStatus==="Reviewed"&&!checked(formData,"confirmReview")) throw new Error("Confirm that you reviewed this exact profile before marking it Reviewed");
  if(researchStatus==="Reviewed"&&!(await listEvidence(id)).some(isRecheckedEvidence)) throw new Error("Recheck and attach at least one current source before marking this profile Reviewed");
  if (JSON.stringify(record).includes("\u2014")) throw new Error("Replace em dashes in public copy before saving");
  await saveCatalogRecord(record,user.userId);
  revalidatePath("/admin"); revalidatePath(`/admin/apps/${id}`);
}

export async function addEvidence(formData:FormData){
  await getCatalogAdminForAction();
  const appId=field(formData,"appId");
  const sourceType=field(formData,"sourceType");
  const url=field(formData,"url");
  const claim=field(formData,"claim");
  const privateSource=sourceType==="Hands-on testing"||sourceType==="Developer correspondence";
  if(!appId||!claim) throw new Error("App and supported claim are required");
  if(!["Official website","Google Play","Apple App Store","Official documentation","Privacy policy","Hands-on testing","Developer correspondence"].includes(sourceType)) throw new Error("Invalid source type");
  if(!privateSource&&!url) throw new Error("A public source URL is required");
  if(url){ const parsed=new URL(url); if(!["http:","https:"].includes(parsed.protocol)) throw new Error("Use a public website URL"); }
  if(checked(formData,"public")&&(!url||privateSource)) throw new Error("Only public web sources can be marked shareable");
  await saveEvidence({id:crypto.randomUUID(),app_id:appId,source_type:sourceType,url:url||null,claim_supported:claim,checked_at:Date.now(),public:checked(formData,"public")?1:0,internal_note:field(formData,"note")||null});
  revalidatePath(`/admin/apps/${appId}`);
}

export async function publishApprovedCatalog(){
  const user=await getCatalogAdminForAction();
  const rows=await listReviewedCatalogRecords();
  if(!rows.length) throw new Error("At least one reviewed app is required");
  const evidence=await listAllEvidence();
  const coverage=new Map<string,Set<string>>();
  for(const source of evidence){
    if(!isRecheckedEvidence(source)) continue;
    const categories=coverage.get(source.app_id)??new Set<string>();
    const claim=source.claim_supported.toLowerCase();
    if(source.source_type==="Google Play"||source.source_type==="Apple App Store"||/android|ios|platform|availability/.test(claim)) categories.add("platforms");
    if(/price|pricing|purchase|subscription|free|trial/.test(claim)) categories.add("pricing");
    if(/\bai\b|artificial intelligence|hevy-gpt|hevygpt/.test(claim)) categories.add("ai");
    if(/feature|program|logging|tracker|progress|community|offline|wearable/.test(claim)) categories.add("features");
    coverage.set(source.app_id,categories);
  }
  const required=["platforms","pricing","ai","features"];
  const missing=rows.flatMap(row=>required.filter(category=>!coverage.get(row.id)?.has(category)).map(category=>`${row.id}: ${category}`));
  if(missing.length) throw new Error(`Reviewed apps need evidence for platforms, pricing, AI, and features. Missing ${missing.join(", ")}`);
  const now=Date.now(); const version=`catalog-${new Date(now).toISOString().replace(/[-:]/g,"").slice(0,13)}Z`;
  const snapshot=rows.map(row=>row.record);
  if (JSON.stringify(snapshot).includes("\u2014")) throw new Error("Replace em dashes in reviewed app copy before publishing");
  await savePublication({id:crypto.randomUUID(),catalog_version:version,fit_methodology_version:"fit-1",legit_methodology_version:"legit-1",snapshot,published_by:user.userId,published_at:now});
  updateTag("public-catalog");
  revalidatePath("/admin");
}
