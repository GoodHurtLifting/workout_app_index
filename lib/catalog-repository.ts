import { env } from "cloudflare:workers";
import { apps, type AppRecord } from "@/lib/catalog";

type CatalogRow = { id:string; record_json:string; publication_status:string; updated_at:number };
export type EvidenceRow = { id:string; source_type:string; url:string; claim_supported:string; checked_at:number; public:number; internal_note:string|null };
export type PublicationRow = { id:string; catalog_version:string; fit_methodology_version:string; legit_methodology_version:string; published_at:number };

function database() {
  if (!env.DB) throw new Error("Catalog database is unavailable");
  return env.DB;
}

export async function listCatalogRecords(): Promise<AppRecord[]> {
  const rows = await database().prepare("SELECT id, record_json, publication_status, updated_at FROM catalog_apps ORDER BY name").all<CatalogRow>();
  if (!rows.results.length) return apps;
  return rows.results.map(row => ({...JSON.parse(row.record_json), researchStatus: row.publication_status})) as AppRecord[];
}

export async function getCatalogRecord(id:string): Promise<AppRecord|null> {
  const row = await database().prepare("SELECT id, record_json, publication_status, updated_at FROM catalog_apps WHERE id = ?").bind(id).first<CatalogRow>();
  if (row) return {...JSON.parse(row.record_json), researchStatus:row.publication_status} as AppRecord;
  return apps.find(app=>app.id===id) ?? null;
}

export async function listEvidence(appId:string): Promise<EvidenceRow[]> {
  const rows = await database().prepare("SELECT id, source_type, url, claim_supported, checked_at, public, internal_note FROM evidence_sources WHERE app_id = ? ORDER BY checked_at DESC").bind(appId).all<EvidenceRow>();
  return rows.results;
}

export async function listPublications(): Promise<PublicationRow[]> {
  const rows=await database().prepare("SELECT id, catalog_version, fit_methodology_version, legit_methodology_version, published_at FROM catalog_publications ORDER BY published_at DESC LIMIT 8").all<PublicationRow>();
  return rows.results;
}

export function getCatalogDatabase(){ return database(); }
