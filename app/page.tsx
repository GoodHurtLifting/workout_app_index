import { publicOpenGraph, siteStructuredData } from "@/lib/seo";
import type { Metadata } from "next";
import WorkoutAppIndex from "@/components/workout-app-index";
import { getPublicCatalog } from "@/lib/catalog-repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workout App Index | Find the Right Fitness App",
  description:
    "Independent fitness-app guidance designed to help you find the app that fits how you actually train.",
};

// Keep social previews aligned with this page canonical.
metadata.openGraph = publicOpenGraph(String(metadata.title), String(metadata.description), "/");

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ finder?: string }>;
}) {
  const { apps } = await getPublicCatalog();
  const { finder } = await searchParams;
  return (
    <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(siteStructuredData).replace(/</g,"\\u003c")}}/><WorkoutAppIndex key="home"
      initialApps={apps}
      restoreFinderOnMount={finder === "results"}
    /></>
  );
}
