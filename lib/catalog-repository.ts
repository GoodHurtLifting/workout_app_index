import { FieldValue } from "firebase-admin/firestore";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { apps, type AppRecord, type ResearchStatus } from "@/lib/catalog";
import { catalogResearchDrafts, getUnmodifiedCandidateResearchDraft } from "@/lib/catalog-research-drafts";
import { withPrivateLegacyScoreDraft } from "@/lib/legacy-score-drafts";
import { getLegacyPublicApps, mergePublishedCatalog } from "@/lib/legacy-public-catalog";
import { getAdminFirestore } from "@/lib/firebase-admin";

type CatalogRow = { id:string; record:AppRecord; publication_status:ResearchStatus; updated_at:number; source_submission_id?:string };
export type EvidenceRow = { id:string; source_type:string; url:string|null; claim_supported:string; checked_at:number; public:number; internal_note:string|null };
export function isRecheckedEvidence(source: EvidenceRow): boolean {
  return !source.internal_note?.startsWith("Seeded from the source catalog");
}
export type PublicationRow = { id:string; catalog_version:string; fit_methodology_version:string; legit_methodology_version:string; published_at:number };

export async function listCatalogRecords(): Promise<AppRecord[]> {
  const snapshot = await getAdminFirestore().collection("catalogApps").orderBy("name").get();
  const bundledById = new Map(apps.map(app => [app.id, app]));
  const records = new Map([...apps.map(app => withPrivateLegacyScoreDraft(app, app)), ...Object.values(catalogResearchDrafts)].map(app => [app.id, app]));
  for (const doc of snapshot.docs) {
    const row = doc.data() as CatalogRow;
    const record = {...row.record, researchStatus: row.publication_status};
    const bundled = bundledById.get(doc.id);
    records.set(doc.id, bundled ? withPrivateLegacyScoreDraft(record, bundled) : getUnmodifiedCandidateResearchDraft(record, row.source_submission_id) ?? record);
  }
  return [...records.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCatalogRecord(id:string): Promise<AppRecord|null> {
  const snapshot = await getAdminFirestore().collection("catalogApps").doc(id).get();
  if (snapshot.exists) {
    const row = snapshot.data() as CatalogRow;
    const record = {...row.record, researchStatus:row.publication_status};
    const bundled = apps.find(app=>app.id===id);
    return bundled ? withPrivateLegacyScoreDraft(record, bundled) : getUnmodifiedCandidateResearchDraft(record, row.source_submission_id) ?? record;
  }
  const bundled = apps.find(app=>app.id===id);
  return bundled ? withPrivateLegacyScoreDraft(bundled, bundled) : catalogResearchDrafts[id] ?? null;
}

export async function listEvidence(appId:string): Promise<EvidenceRow[]> {
  const snapshot = await getAdminFirestore().collection("evidenceSources").where("app_id", "==", appId).get();
  return snapshot.docs.map(doc => ({id:doc.id, ...doc.data()} as EvidenceRow)).sort((a,b)=>b.checked_at-a.checked_at);
}

export async function listPublications(): Promise<PublicationRow[]> {
  const snapshot=await getAdminFirestore().collection("catalogPublications").orderBy("published_at", "desc").limit(8).get();
  return snapshot.docs.map(doc => ({id:doc.id, ...doc.data()} as PublicationRow));
}

export const getLatestPublishedCatalog = unstable_cache(async ():Promise<AppRecord[]|null> => {
  const snapshot=await getAdminFirestore().collection("catalogPublications").orderBy("published_at","desc").limit(1).get();
  if(snapshot.empty) return null;
  return (snapshot.docs[0].data().snapshot as AppRecord[]|undefined)??null;
}, ["latest-published-catalog"], { revalidate: 60, tags: ["public-catalog"] });

export const getPublicCatalog = cache(async (): Promise<{ apps: AppRecord[]; source: "published" | "preliminary" }> => {
  const legacyApps = getLegacyPublicApps(apps);
  try {
    const published = await getLatestPublishedCatalog();
    if (published?.length) {
      return { apps: mergePublishedCatalog(legacyApps, published), source: "published" };
    }
  } catch (error) {
    console.error("Could not load the published catalog", error);
  }
  return { apps: legacyApps, source: "preliminary" };
});

export async function saveCatalogRecord(record:AppRecord,userId:string){
  const ref=getAdminFirestore().collection("catalogApps").doc(record.id);
  const existing=await ref.get();
  await ref.set({id:record.id,slug:record.id,name:record.name,publication_status:record.researchStatus,record,updated_by:userId,updated_at:Date.now(),...(existing.exists?{}:{created_at:Date.now()})},{merge:true});
}

export async function saveEvidence(source:Omit<EvidenceRow,"id"> & {id:string;app_id:string}){
  const {id,...data}=source;
  await getAdminFirestore().collection("evidenceSources").doc(id).set(data);
}

export async function savePublication(publication:PublicationRow & {snapshot:AppRecord[];published_by:string}){
  const {id,...data}=publication;
  await getAdminFirestore().collection("catalogPublications").doc(id).set({...data,created_at:FieldValue.serverTimestamp()});
}

export async function listReviewedCatalogRecords(){
  const snapshot=await getAdminFirestore().collection("catalogApps").where("publication_status","==","Reviewed").get();
  return snapshot.docs.map(doc=>doc.data() as CatalogRow).sort((a,b)=>a.record.name.localeCompare(b.record.name));
}

export async function listAllEvidence(){
  const snapshot=await getAdminFirestore().collection("evidenceSources").get();
  return snapshot.docs.map(doc=>({id:doc.id,...doc.data()} as EvidenceRow & {app_id:string}));
}
