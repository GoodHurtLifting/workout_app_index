import type { Metadata } from "next";
import WorkoutAppIndex from "@/components/workout-app-index";
import { getPublicCatalog } from "@/lib/catalog-repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workout App Index | Find the Right Fitness App",
  description:
    "Independent fitness-app guidance designed to help you find the app that fits how you actually train.",
};

export default async function Home() {
  const { apps } = await getPublicCatalog();
  return <WorkoutAppIndex initialApps={apps} />;
}
