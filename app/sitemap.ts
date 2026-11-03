import type { MetadataRoute } from "next";
import { getPublicCatalog } from "@/lib/catalog-repository";
import { buildSitemapEntries } from "@/lib/sitemap-entries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { apps } = await getPublicCatalog();
  return buildSitemapEntries(apps);
}
