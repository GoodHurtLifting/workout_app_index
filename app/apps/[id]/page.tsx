import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicCatalog, isRecheckedEvidence, listEvidence } from "@/lib/catalog-repository";
import { AppProfileContent } from "@/components/app-profile-content";
import { catalogEvidenceSeeds } from "@/lib/catalog";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { apps } = await getPublicCatalog();
  const app = apps.find((candidate) => candidate.id === id);
  if (!app) return {};
  const title = `${app.name} Review, Pricing & Best Fit | Workout App Index`;
  const description = `${app.description} See pricing, platforms, AI use, training style, tradeoffs, and who ${app.name} fits best.`;
  return { title, description, alternates: { canonical: `/apps/${app.id}` }, openGraph: { title, description, type: "article", url: `/apps/${app.id}`, siteName: "Workout App Index" } };
}

export default async function AppProfilePage({ params }: Props) {
  const { id } = await params;
  const { apps } = await getPublicCatalog();
  const app = apps.find((candidate) => candidate.id === id);
  if (!app) notFound();
  const publicEvidence = app.researchStatus === "Reviewed"
    ? await listEvidence(app.id).then(rows => rows.filter(row => row.public && row.url && isRecheckedEvidence(row))).catch(() => [])
    : [];
  const sources = [
    ...publicEvidence.map(source => ({ type: source.source_type, url: source.url })),
    ...catalogEvidenceSeeds.filter(source => source.appId === app.id && source.public).map(source => ({ type: source.sourceType, url: source.url })),
  ];
  const link = (types: string[]) => sources.find(source => types.includes(source.type) && source.url?.startsWith("https://"))?.url ?? null;
  const destinations = { official_site: link(["Official website"]), store: link(["Apple App Store", "Google Play"]) };
  return <AppProfileContent app={app} apps={apps} publicEvidence={publicEvidence} destinations={destinations} />;
}
