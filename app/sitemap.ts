import type { MetadataRoute } from "next";
import { getPublicCatalog } from "@/lib/catalog-repository";
import { publicPartnershipPlacements } from "@/lib/partnership-placements";
import { buildSitemapEntries } from "@/lib/sitemap-entries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { apps } = await getPublicCatalog();
  const placements = await publicPartnershipPlacements();
  return [...buildSitemapEntries(apps), ...placements.filter(item => item.kind === "article").map(item => ({ url: `https://workoutappindex.com/sponsored/${item.slug}`, lastModified: new Date(item.updatedAt) }))];
}
