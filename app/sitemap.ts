import type { MetadataRoute } from "next";
import { apps } from "@/lib/catalog";

const baseUrl = "https://workoutappindex.com";

export default function sitemap(): MetadataRoute.Sitemap {
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
