import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppProfileContent } from "@/components/app-profile-content";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { getPublicCatalog, isRecheckedEvidence, listEvidence } from "@/lib/catalog-repository";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { apps as bundledApps,type AppRecord,type ResearchStatus } from "@/lib/catalog";
import { catalogResearchDrafts } from "@/lib/catalog-research-drafts";
import { publicCatalogRecord } from "@/lib/catalog-facts";
import "../../../admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Catalog draft preview", robots: { index: false, follow: false } };

export default async function CatalogDraftPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireCatalogAdmin("/admin/apps/" + id + "/preview");
  const stored=await getAdminFirestore().collection("catalogApps").doc(id).get();
  const raw=stored.exists?{...(stored.data()!.record as AppRecord),researchStatus:stored.data()!.publication_status as ResearchStatus}:bundledApps.find(item=>item.id===id)??catalogResearchDrafts[id];
  if(!raw)notFound();
  const app=publicCatalogRecord(raw);
  const publicCatalog = await getPublicCatalog();
  const apps = publicCatalog.apps.some((item) => item.id === id)
    ? publicCatalog.apps.map((item) => item.id === id ? app : item)
    : [...publicCatalog.apps, app];
  const publicEvidence=(await listEvidence(id)).filter(row=>row.public&&row.url&&isRecheckedEvidence(row));

  return <>
    <div className="admin-preview-banner"><strong>Private draft preview</strong><span>This shows saved draft facts, not unsaved form edits. It does not change the public listing.</span><Link href={"/admin/apps/" + id}>Back to editor</Link></div>
    <AppProfileContent includeStructuredData={false} app={app} apps={apps} publicEvidence={publicEvidence} />
  </>;
}
