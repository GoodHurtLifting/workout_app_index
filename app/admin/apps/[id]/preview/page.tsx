import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppProfileContent } from "@/components/app-profile-content";
import { requireCatalogAdmin } from "@/lib/admin-auth";
import { getCatalogRecord, getPublicCatalog, isRecheckedEvidence, listEvidence } from "@/lib/catalog-repository";
import "../../../admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Catalog draft preview", robots: { index: false, follow: false } };

export default async function CatalogDraftPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireCatalogAdmin("/admin/apps/" + id + "/preview");
  const app = await getCatalogRecord(id);
  if (!app) notFound();
  const publicCatalog = await getPublicCatalog();
  const apps = publicCatalog.apps.some((item) => item.id === id)
    ? publicCatalog.apps.map((item) => item.id === id ? app : item)
    : [...publicCatalog.apps, app];
  const publicEvidence = app.researchStatus === "Reviewed"
    ? (await listEvidence(id)).filter(row => row.public && row.url && isRecheckedEvidence(row))
    : [];

  return <>
    <div className="admin-preview-banner"><strong>Private draft preview</strong><span>This is the saved catalog record, not necessarily what visitors see.</span><Link href={"/admin/apps/" + id}>Back to editor</Link></div>
    <AppProfileContent app={app} apps={apps} publicEvidence={publicEvidence} />
  </>;
}
