import "server-only";
import { z } from "zod";
import { getAdminFirestore } from "@/lib/firebase-admin";
export const placementSchema = z.object({
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{0,79}$/),
  kind: z.enum(["link", "article"]),
  brand: z.string().trim().min(1).max(120),
  category: z.enum(["app", "equipment", "apparel"]),
  title: z.string().trim().min(1).max(180),
  destination: z.string().url().max(1500).refine(value => /^https:\/\//.test(value)),
  body: z.string().trim().min(40).max(12000),
  published: z.boolean(),
});
export type PartnershipPlacement = z.infer<typeof placementSchema> & { updatedAt: number };
export async function publicPartnershipPlacements(): Promise<PartnershipPlacement[]> {
  try {
    const rows = await getAdminFirestore().collection("partnershipPlacements").where("published", "==", true).get();
    return rows.docs.flatMap(doc => {
      const parsed = placementSchema.safeParse(doc.data());
      const updatedAt = doc.data().updatedAt;
      return parsed.success && Number.isFinite(updatedAt) && updatedAt <= Date.now() ? [{ ...parsed.data, updatedAt }] : [];
    });
  } catch { return []; }
}
