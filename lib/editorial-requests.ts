import "server-only";

import { createHash } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import type { DocumentReference } from "firebase-admin/firestore";
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

type NotificationJob = {
  to: string;
  message: { subject: string; text: string };
};

async function deliverSubmissionAlert(ref: DocumentReference, job: NotificationJob): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.SUBMISSION_NOTIFICATION_FROM?.trim();
  if (!apiKey || !from) return;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": ref.id,
      },
      body: JSON.stringify({ from, to: [job.to], subject: job.message.subject, text: job.message.text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Resend returned HTTP ${response.status}`);
    const result = await response.json() as { id?: string };
    await ref.update({ delivery: {
      state: "SUCCESS",
      provider: "resend",
      providerMessageId: result.id ?? null,
      attemptedAt: Date.now(),
    } });
  } catch (error) {
    console.error("Submission alert delivery failed", error);
    try {
      await ref.update({ delivery: {
        state: "ERROR",
        provider: "resend",
        error: error instanceof Error ? error.message : "Unknown delivery error",
        attemptedAt: Date.now(),
      } });
    } catch (updateError) {
      console.error("Could not record submission alert delivery failure", updateError);
    }
  }
}

export async function saveEditorialRequest(input: unknown): Promise<void> {
  const request = requestSchema.parse(input);
  if (request.companyWebsite) return;

  const db = getAdminFirestore();
  const notificationEmail = process.env.SUBMISSION_NOTIFICATION_EMAIL?.trim()
    || process.env.CATALOG_ADMIN_EMAIL?.trim();
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const emailHash = createHash("sha256").update(request.email.toLowerCase()).digest("hex");
  const limitRef = db.collection("editorialRequestLimits").doc(`${day}-${emailHash}`);
  const dailyRef = db.collection("editorialRequestLimits").doc(`${day}-site-total`);
  const entryRef = db.collection("editorialRequests").doc();
  const notificationRef = db.collection("editorialNotifications").doc(`app-${entryRef.id}`);
  const notificationJob: NotificationJob = {
    to: notificationEmail ?? "",
    message: {
      subject: "New Workout App Index app submission",
      text: `A new app submission for ${request.kind === "app" ? request.appName : ""} is waiting for review.\n\nOpen the editorial inbox: https://workoutappindex.com/admin\n\nSubmission ID: ${entryRef.id}`,
    },
  };

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
    if (request.kind === "app" && notificationEmail) {
      transaction.create(notificationRef, { ...notificationJob, delivery: { state: "PENDING" }, createdAt: now });
    }
  });
  if (request.kind === "app" && notificationEmail) {
    await deliverSubmissionAlert(notificationRef, notificationJob);
  }
  if (request.kind === "app" && !notificationEmail) {
    console.error("App submission saved without notification: no notification email is configured");
  }
}

export async function listEditorialRequests(): Promise<EditorialRequest[]> {
  const snapshot = await getAdminFirestore()
    .collection("editorialRequests")
    .orderBy("createdAt", "desc")
    .limit(30)
    .get();
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }) as EditorialRequest);
}
