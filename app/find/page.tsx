import { publicOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import WorkoutAppIndex from "@/components/workout-app-index";
import { getPublicCatalog } from "@/lib/catalog-repository";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Find a Workout App for Your Training | Workout App Index",description:"Match workout apps to your device, goals, training approach, equipment, AI preferences, and budget. Free and account-free.",alternates:{canonical:"/find"}};
// Keep social previews aligned with this page canonical.
metadata.openGraph = publicOpenGraph(String(metadata.title), String(metadata.description), "/find");

export default async function Finder({searchParams}:{searchParams:Promise<{finder?:string}>}) {const {apps}=await getPublicCatalog();const {finder}=await searchParams;return <WorkoutAppIndex key={`finder-${finder??"start"}`} initialApps={apps} initialView="finder" restoreFinderOnMount={finder==="results"}/>;}
