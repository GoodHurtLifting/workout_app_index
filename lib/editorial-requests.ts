import "server-only";

import { createHash } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";
import { getAdminFirestore } from "@/lib/firebase-admin";

const text = (max: number) => z.string().trim().min(1).max(max);
const publicUrl = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" || url.protocol === "http:";
}, "Use a website URL.");

const requestSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("app"),
    name: text(100),
    email: z.string().trim().email().max(254),
    companyWebsite: z.string().max(500).optional(),
    appName: text(120),
    websiteUrl: publicUrl,
    storeUrl: publicUrl.or(z.literal("")),
    privacyUrl: publicUrl,
    availability: text(300),
    pricing: text(300),
    details: z.string().trim().min(40).max(4000),
  }),
  z.object({
    kind: z.literal("correction"),
    name: text(100),
    email: z.string().trim().email().max(254),
    companyWebsite: z.string().max(500).optional(),
    pageUrl: publicUrl.refine((value) => {
      const hostname = new URL(value).hostname;
      return hostname === "workoutappindex.com" || hostname === "www.workoutappindex.com";
    }, "Use a Workout App Index page URL."),
    sourceUrl: publicUrl,
    details: z.string().trim().min(20).max(4000),
  }),
]);

export type EditorialRequest = z.infer<typeof requestSchema> & {
  id: string;
  createdAt: number;
  status: "new" | "reviewed";
};

export class EditorialRateLimitError extends Error {}

export async function saveEditorialRequest(input: unknown): Promise<void> {
  const request = requestSchema.parse(input);
  if (request.companyWebsite) return;

  const db = getAdminFirestore();
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const emailHash = createHash("sha256").update(request.email.toLowerCase()).digest("hex");
  const limitRef = db.collection("editorialRequestLimits").doc(`${day}-${emailHash}`);
  const dailyRef = db.collection("editorialRequestLimits").doc(`${day}-site-total`);
  const entryRef = db.collection("editorialRequests").doc();

  await db.runTransaction(async (transaction) => {
    const [limit, daily] = await Promise.all([
      transaction.get(limitRef),
      transaction.get(dailyRef),
    ]);
    const count = Number(limit.data()?.count ?? 0);
    if (count >= 3) throw new EditorialRateLimitError("Please wait until tomorrow before sending another request.");
    const dailyCount = Number(daily.data()?.count ?? 0);
    if (dailyCount >= 100) throw new EditorialRateLimitError("Submissions are temporarily full. Please try again tomorrow.");
    transaction.set(limitRef, {
      count: count + 1,
      expiresAt: Timestamp.fromMillis(now + 2 * 24 * 60 * 60 * 1000),
    });
    transaction.set(dailyRef, {
      count: dailyCount + 1,
      expiresAt: Timestamp.fromMillis(now + 2 * 24 * 60 * 60 * 1000),
    });
    const { companyWebsite: _honeypot, ...content } = request;
    void _honeypot;
    transaction.create(entryRef, { ...content, createdAt: now, status: "new" });
  });
}

export async function listEditorialRequests(): Promise<EditorialRequest[]> {
  const snapshot = await getAdminFirestore()
    .collection("editorialRequests")
    .orderBy("createdAt", "desc")
    .limit(30)
    .get();
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }) as EditorialRequest);
}
