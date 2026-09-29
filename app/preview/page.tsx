import WorkoutAppIndex from "@/components/workout-app-index";
import { getPublicCatalog } from "@/lib/catalog-repository";

export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  const { apps } = await getPublicCatalog();
  return <WorkoutAppIndex initialApps={apps} />;
}
