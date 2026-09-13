"use server";

import { revalidatePath } from "next/cache";
import { apps, catalogEvidenceSeeds, type AiStatus, type AppRecord, type ResearchStatus } from "@/lib/catalog";
import { getCatalogAdminForAction } from "@/lib/admin-auth";
import { getCatalogDatabase, getCatalogRecord } from "@/lib/catalog-repository";

const splitList=(value:FormDataEntryValue|null)=>String(value??"").split(",").map(item=>item.trim()).filter(Boolean);

export async function importPreliminaryCatalog(){
  const user=await getCatalogAdminForAction(); const db=getCatalogDatabase(); const now=Date.now();
  const statements=apps.map(app=>db.prepare("INSERT INTO catalog_apps (id, slug, name, short_description, product_type, publication_status, ai_status, affiliation_disclosure, record_json, updated_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING").bind(app.id,app.id,app.name,app.description,app.type,app.researchStatus,app.ai,app.id==="lift-league"?app.caveat:null,JSON.stringify(app),user.userId,now,now));
  statements.push(...catalogEvidenceSeeds.map(source=>db.prepare("INSERT INTO evidence_sources (id, app_id, source_type, url, claim_supported, checked_at, public, internal_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING").bind(source.id,source.appId,source.sourceType,source.url,source.claimSupported,now,source.public?1:0,"Seeded from the source catalog; recheck before final editorial review.")));
  await db.batch(statements); revalidatePath("/admin");
}

export async function updateCatalogApp(formData:FormData){
  const user=await getCatalogAdminForAction(); const id=String(formData.get("id")??""); const existing=await getCatalogRecord(id); if(!existing) throw new Error("App not found");
  const monthlyRaw=String(formData.get("monthlyPrice")??"").trim();
  const record:AppRecord={...existing,name:String(formData.get("name")??"").trim(),description:String(formData.get("description")??"").trim(),price:String(formData.get("price")??"").trim(),monthlyPrice:monthlyRaw===""?null:Number(monthlyRaw),type:String(formData.get("type")??"").trim(),authorship:String(formData.get("authorship")??"").trim(),ai:String(formData.get("ai")??"AI use unknown") as AiStatus,caveat:String(formData.get("caveat")??"").trim(),platforms:splitList(formData.get("platforms")),goals:splitList(formData.get("goals")),features:splitList(formData.get("features")),researchStatus:String(formData.get("researchStatus")??"Candidate") as ResearchStatus,deliversCompleteProgram:formData.get("deliversCompleteProgram")==="on",programLibrary:formData.get("programLibrary")==="on",adaptiveProgramming:formData.get("adaptiveProgramming")==="on"};
  if(!record.name||!record.description||!record.type) throw new Error("Name, description, and product type are required");
  const now=Date.now(); const db=getCatalogDatabase();
  await db.prepare("INSERT INTO catalog_apps (id, slug, name, short_description, product_type, publication_status, ai_status, affiliation_disclosure, record_json, updated_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, short_description=excluded.short_description, product_type=excluded.product_type, publication_status=excluded.publication_status, ai_status=excluded.ai_status, affiliation_disclosure=excluded.affiliation_disclosure, record_json=excluded.record_json, updated_by=excluded.updated_by, updated_at=excluded.updated_at").bind(id,id,record.name,record.description,record.type,record.researchStatus,record.ai,id==="lift-league"?record.caveat:null,JSON.stringify(record),user.userId,now,now).run();
  revalidatePath("/admin"); revalidatePath(`/admin/apps/${id}`);
}

export async function addEvidence(formData:FormData){
  await getCatalogAdminForAction(); const appId=String(formData.get("appId")??""); const url=String(formData.get("url")??"").trim(); const claim=String(formData.get("claim")??"").trim(); if(!appId||!url||!claim) throw new Error("App, URL, and supported claim are required");
  new URL(url); await getCatalogDatabase().prepare("INSERT INTO evidence_sources (id, app_id, source_type, url, claim_supported, checked_at, public, internal_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(),appId,String(formData.get("sourceType")??"Official website"),url,claim,Date.now(),formData.get("public")==="on"?1:0,String(formData.get("note")??"").trim()||null).run();
  revalidatePath(`/admin/apps/${appId}`);
}

export async function publishApprovedCatalog(){
  const user=await getCatalogAdminForAction(); const db=getCatalogDatabase();
  const rows=await db.prepare("SELECT id, record_json FROM catalog_apps WHERE publication_status = 'Reviewed' ORDER BY name").all<{id:string;record_json:string}>();
  if(!rows.results.length) throw new Error("At least one reviewed app is required");
  const evidence=await db.prepare("SELECT app_id, source_type, claim_supported FROM evidence_sources").all<{app_id:string;source_type:string;claim_supported:string}>();
  const coverage=new Map<string,Set<string>>();
  for(const source of evidence.results){
    const categories=coverage.get(source.app_id)??new Set<string>();
    const claim=source.claim_supported.toLowerCase();
    if(source.source_type==="Google Play"||source.source_type==="Apple App Store"||/android|ios|platform|availability/.test(claim)) categories.add("platforms");
    if(/price|pricing|purchase|subscription|free|trial/.test(claim)) categories.add("pricing");
    if(/\bai\b|artificial intelligence|hevy-gpt|hevygpt/.test(claim)) categories.add("ai");
    if(/feature|program|logging|tracker|progress|community|offline|wearable/.test(claim)) categories.add("features");
    coverage.set(source.app_id,categories);
  }
  const required=["platforms","pricing","ai","features"];
  const missing=rows.results.flatMap(row=>required.filter(category=>!coverage.get(row.id)?.has(category)).map(category=>`${row.id}: ${category}`));
  if(missing.length) throw new Error(`Reviewed apps need evidence for platforms, pricing, AI, and features. Missing ${missing.join(", ")}`);
  const now=Date.now(); const version=`catalog-${new Date(now).toISOString().replace(/[-:]/g,"").slice(0,13)}Z`;
  const snapshot=rows.results.map(row=>JSON.parse(row.record_json));
  await db.prepare("INSERT INTO catalog_publications (id, catalog_version, fit_methodology_version, legit_methodology_version, snapshot_json, published_by, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(),version,"fit-1","legit-1",JSON.stringify(snapshot),user.userId,now).run();
  revalidatePath("/admin");
}
