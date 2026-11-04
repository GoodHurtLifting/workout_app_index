import type { MetadataRoute } from "next";
import type { AppRecord } from "./catalog";
import { isFactual, latestFactDate } from "./catalog-facts.ts";

const baseUrl = "https://workoutappindex.com";
const informationPaths = ["how-we-score", "editorial-standards", "corrections", "submit-app", "services", "partnerships", "apps", "find"];

export function validSitemapDate(value: unknown): string | undefined {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
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
    ...apps.map((app) => ({
      url: `${baseUrl}/apps/${app.id}`,
      ...(app.researchStatus === "Reviewed" && validSitemapDate(isFactual(app) ? latestFactDate(app) : app.legitAssessment?.checkedAt)
        ? { lastModified: validSitemapDate(isFactual(app) ? latestFactDate(app) : app.legitAssessment?.checkedAt) }
        : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
