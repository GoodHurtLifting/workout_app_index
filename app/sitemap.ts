import type { MetadataRoute } from "next";
import { getPublicCatalog } from "@/lib/catalog-repository";

const baseUrl = "https://workoutappindex.com";
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { apps } = await getPublicCatalog();
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["editorial-standards", "corrections", "submit-app"].map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...apps.map((app) => ({
      url: `${baseUrl}/apps/${app.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
