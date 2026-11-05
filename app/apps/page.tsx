import { publicOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import WorkoutAppIndex from "@/components/workout-app-index";
import { getPublicCatalog } from "@/lib/catalog-repository";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Browse Workout Apps: Pricing, Features & Training Styles | Workout App Index",description:"Explore workout apps by price, free access, platform, AI use, training approach, and practical tradeoffs.",alternates:{canonical:"/apps"}};
// Keep social previews aligned with this page canonical.
metadata.openGraph = publicOpenGraph(String(metadata.title), String(metadata.description), "/apps");

export default async function AppCatalog({searchParams}:{searchParams:Promise<{q?:string;ai?:string;author?:string;access?:string;level?:string}>}) {
  const {apps}=await getPublicCatalog();const filters=await searchParams;
  const initialFilters={ai:filters.ai==="no-ai"?"no-ai":undefined,author:filters.author==="Trainer-written"?"Trainer-written":undefined,access:filters.access==="free"?"free":undefined,level:filters.level==="Beginner"?"Beginner":undefined};
  return <WorkoutAppIndex key={JSON.stringify(initialFilters)} initialApps={apps} initialView="browse" initialFilters={initialFilters}/>;
}
