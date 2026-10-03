import WorkoutAppIndex from "@/components/workout-app-index";
import { getPublicCatalog } from "@/lib/catalog-repository";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ finder?: string }>;
}) {
  const { apps } = await getPublicCatalog();
  const { finder } = await searchParams;
  return (
    <WorkoutAppIndex
      initialApps={apps}
      restoreFinderOnMount={finder === "results"}
    />
  );
}
