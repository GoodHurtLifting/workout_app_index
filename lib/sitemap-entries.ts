import type { MetadataRoute } from "next";
import type { AppRecord } from "./catalog";
import { isFactual, latestFactDate } from "./catalog-facts.ts";

const baseUrl = "https://workoutappindex.com";
const informationPaths = ["how-we-score", "editorial-standards", "corrections", "submit-app", "services", "partnerships", "apps", "find", "terms", "privacy"];

export function validSitemapDate(value: unknown): string | undefined {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value && value <= new Date().toISOString().slice(0, 10)
    ? value
    : undefined;
}

export function buildSitemapEntries(apps: AppRecord[]): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    ...informationPaths.map((path) => ({
      url: `${baseUrl}/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...apps.filter((app, index) => /^[a-z0-9][a-z0-9-]{0,79}$/.test(app.id) && apps.findIndex(candidate => candidate.id === app.id) === index).map((app) => {
      const lastModified = isFactual(app) && app.researchStatus === "Reviewed"
        ? validSitemapDate(latestFactDate(app))
        : undefined;
      return {
        url: `${baseUrl}/apps/${app.id}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }),
  ];
}
