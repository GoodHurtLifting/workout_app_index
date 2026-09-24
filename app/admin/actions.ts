"use server";

import { revalidatePath } from "next/cache";
import { apps, catalogEvidenceSeeds, type AiStatus, type AppRecord, type ResearchStatus } from "@/lib/catalog";
import { getCatalogAdminForAction } from "@/lib/admin-auth";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getCatalogRecord, listAllEvidence, listReviewedCatalogRecords, saveCatalogRecord, saveEvidence, savePublication } from "@/lib/catalog-repository";

const splitList=(value:FormDataEntryValue|null)=>String(value??"").split(",").map(item=>item.trim()).filter(Boolean);

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
  await Promise.all(apps.map(app=>saveCatalogRecord(app,user.userId)));
  await Promise.all(catalogEvidenceSeeds.map(source=>saveEvidence({id:source.id,app_id:source.appId,source_type:source.sourceType,url:source.url,claim_supported:source.claimSupported,checked_at:now,public:source.public?1:0,internal_note:"Seeded from the source catalog; recheck before final editorial review."})));
  revalidatePath("/admin");
}

export async function updateCatalogApp(formData:FormData){
  const user=await getCatalogAdminForAction(); const id=String(formData.get("id")??""); const existing=await getCatalogRecord(id); if(!existing) throw new Error("App not found");
  const monthlyRaw=String(formData.get("monthlyPrice")??"").trim();
  const record:AppRecord={...existing,name:String(formData.get("name")??"").trim(),description:String(formData.get("description")??"").trim(),price:String(formData.get("price")??"").trim(),monthlyPrice:monthlyRaw===""?null:Number(monthlyRaw),type:String(formData.get("type")??"").trim(),authorship:String(formData.get("authorship")??"").trim(),ai:String(formData.get("ai")??"AI use unknown") as AiStatus,caveat:String(formData.get("caveat")??"").trim(),platforms:splitList(formData.get("platforms")),goals:splitList(formData.get("goals")),features:splitList(formData.get("features")),researchStatus:String(formData.get("researchStatus")??"Candidate") as ResearchStatus,deliversCompleteProgram:formData.get("deliversCompleteProgram")==="on",programLibrary:formData.get("programLibrary")==="on",adaptiveProgramming:formData.get("adaptiveProgramming")==="on"};
  if(!record.name||!record.description||!record.type) throw new Error("Name, description, and product type are required");
  await saveCatalogRecord(record,user.userId);
  revalidatePath("/admin"); revalidatePath(`/admin/apps/${id}`);
}

export async function addEvidence(formData:FormData){
  await getCatalogAdminForAction(); const appId=String(formData.get("appId")??""); const url=String(formData.get("url")??"").trim(); const claim=String(formData.get("claim")??"").trim(); if(!appId||!url||!claim) throw new Error("App, URL, and supported claim are required");
  new URL(url); await saveEvidence({id:crypto.randomUUID(),app_id:appId,source_type:String(formData.get("sourceType")??"Official website"),url,claim_supported:claim,checked_at:Date.now(),public:formData.get("public")==="on"?1:0,internal_note:String(formData.get("note")??"").trim()||null});
  revalidatePath(`/admin/apps/${appId}`);
}

export async function publishApprovedCatalog(){
  const user=await getCatalogAdminForAction();
  const rows=await listReviewedCatalogRecords();
  if(!rows.length) throw new Error("At least one reviewed app is required");
  const evidence=await listAllEvidence();
  const coverage=new Map<string,Set<string>>();
  for(const source of evidence){
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
  await savePublication({id:crypto.randomUUID(),catalog_version:version,fit_methodology_version:"fit-1",legit_methodology_version:"legit-1",snapshot,published_by:user.userId,published_at:now});
  revalidatePath("/admin");
}
