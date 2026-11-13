import "server-only";

import { createHash } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import type { DocumentReference } from "firebase-admin/firestore";
import { z } from "zod";
import { getAdminFirestore } from "@/lib/firebase-admin";
import type { ReviewOutcome, ServiceStage, SubmissionStatus } from "@/lib/submission-workflow";
import { monthKey } from "@/lib/submission-workflow";

import type { DeveloperProduct, Engagement } from "@/lib/developer-offers";
import { serviceInquirySchema, partnershipInquirySchema } from "@/lib/commercial-inquiries";

const text = (max: number) => z.string().trim().min(1).max(max);
function parseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}
const publicUrl = z.string().url().refine((value) => {
  const url = parseUrl(value);
  return url !== null && (url.protocol === "https:" || url.protocol === "http:");
}, "Use a website URL.");

const requestSchema = z.discriminatedUnion("kind", [
  serviceInquirySchema,
  partnershipInquirySchema,
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
    helpWanted: z.string().trim().max(1500).optional(),
    competitors: z.string().trim().max(1000).optional(),
    differentiation: z.string().trim().max(1500).optional(),
  }),
  z.object({
    kind: z.literal("correction"),
    name: text(100),
    email: z.string().trim().email().max(254),
    companyWebsite: z.string().max(500).optional(),
    pageUrl: publicUrl.refine((value) => {
      const hostname = parseUrl(value)?.hostname;
      return hostname === "workoutappindex.com" || hostname === "www.workoutappindex.com";
    }, "Use a Workout App Index page URL."),
    sourceUrl: publicUrl,
    details: z.string().trim().min(20).max(4000),
  }),
]);

export type EditorialRequest = z.infer<typeof requestSchema> & {
  id: string;
  createdAt: number;
  status: SubmissionStatus;
  candidateAppId?: string;
  commercialCatalogAppId?: string;
  submissionVersion?: "developer-1";
  testData?: boolean;
  commercialRevision?: number;
  pageOneCompletedAt?: number;
  initiallyRequestedProducts?: DeveloperProduct[];
  serviceInquiryAt?: number;
  checkoutStartedAt?: number;
  listingPurchasedAt?: number;
  listingPaymentStatus?: string;
  listingRefundPending?: boolean;
  listingRefundFailed?: boolean;
  engagement?: Engagement;
  notification?: { id: string; state: string };
  seenAt?: number;
  screeningStartedAt?: number;
  screeningCompletedAt?: number;
  screeningMonth?: string;
  screeningNote?: string;
  screeningCriteria?: Record<string, boolean>;
  acceptedAt?: number;
  acceptedMonth?: string;
  activeReviewStartedAt?: number;
  researchReadyAt?: number;
  statusNote?: string;
  reviewRound?: number;
  reviewRounds?: Array<{
    number: number;
    basis: "initial" | "free_reassessment" | "paid_followup";
    startedAt?: number;
    startNote?: string;
    outcome?: ReviewOutcome;
    decidedAt?: number;
    decisionNote?: string;
    testedScope?: string;
  }>;
  serviceStage?: ServiceStage;
  serviceStageAt?: number;
  serviceStageNote?: string;
  serviceHistory?: Array<{ stage: ServiceStage; at: number; note: string }>;
};

export class EditorialRateLimitError extends Error {}

type NotificationJob = {
  to: string;
  message: { subject: string; text: string };
};

export async function deliverSubmissionAlert(ref: DocumentReference, _job: NotificationJob): Promise<void> {
  void _job; // Always retry the immutable saved payload.
  // Delivery errors must never turn a saved inquiry into a failed submission.
  try { await sendSubmissionAlert(ref); } catch { console.error("Internal notification needs reconciliation"); }
}

async function sendSubmissionAlert(ref: DocumentReference): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.SUBMISSION_NOTIFICATION_FROM?.trim();
  const claimed = await ref.firestore.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data();
    const delivery = data?.delivery;
    if (!data || delivery?.state === "SUCCESS" || (delivery?.state === "SENDING" && delivery.attemptedAt > Date.now() - 60000)) return null;
    if (!apiKey || !from) {
      transaction.update(ref, { delivery: { ...delivery, state: "ERROR", error: "Notification provider is not configured", attemptedAt: Date.now() } });
      return null;
    }
    // Resend retains idempotency keys for 24h. An uncertain late retry needs an owner check.
    if (data.firstProviderAttemptAt && data.firstProviderAttemptAt < Date.now() - 23 * 60 * 60 * 1000) {
      transaction.update(ref, { delivery: { ...delivery, state: "CHECK_PROVIDER", error: "Check Resend delivery history before retrying outside its idempotency window" } });
      return null;
    }
    const payload = data.providerPayload ?? { from, to: [data.to], subject: data.message.subject, text: data.message.text };
    transaction.update(ref, { providerPayload: payload, firstProviderAttemptAt: data.firstProviderAttemptAt ?? Date.now(), delivery: { state: "SENDING", attemptedAt: Date.now() } });
    return payload;
  });
  if (!claimed) return;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": ref.id },
      body: JSON.stringify(claimed), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Delivery provider rejected the request");
    const result = await response.json() as { id?: string };
    if (!result.id) throw new Error("Missing provider receipt");
    await ref.update({ delivery: { state: "SUCCESS", provider: "resend", providerMessageId: result.id, attemptedAt: Date.now() } });
  } catch {
    console.error("Submission alert delivery failed");
    await ref.update({ delivery: { state: "ERROR", provider: "resend", error: "Delivery uncertain. Check provider history and retry.", attemptedAt: Date.now() } });
  }
}

export async function saveEditorialRequest(input: unknown, developer?: { accessHash: string }): Promise<string | false> {
  const request = requestSchema.parse(input);
  if (request.companyWebsite) return false;

  const db = getAdminFirestore();
  const notificationEmail = process.env.SUBMISSION_NOTIFICATION_EMAIL?.trim()
    || process.env.CATALOG_ADMIN_EMAIL?.trim();
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const emailHash = createHash("sha256").update(request.email.toLowerCase()).digest("hex");
  const limitRef = db.collection("editorialRequestLimits").doc(`${day}-${emailHash}`);
  const dailyRef = db.collection("editorialRequestLimits").doc(`${day}-site-total`);
  const entryRef = db.collection("editorialRequests").doc();
  const notificationRef = db.collection("editorialNotifications").doc(`${request.kind}-${entryRef.id}`);
  const notificationJob: NotificationJob = {
    to: notificationEmail ?? "",
    message: {
      subject: request.kind === "partnership" ? "New Workout App Index partnership inquiry" : "New Workout App Index app submission",
      text: `A new ${request.kind === "partnership" ? "partnership inquiry" : "app submission"} ${request.kind === "app" ? request.appName : ""} is waiting for review.\n\nOpen the editorial inbox: https://workoutappindex.com/admin\n\nSubmission ID: ${entryRef.id}`,
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
    transaction.create(entryRef, { ...content, ...(developer ? { developerAccessHash: developer.accessHash, developerAccessExpiresAt: now + 30 * 86400000, submissionVersion: "developer-1", pageOneCompletedAt: now, testData: process.env.NODE_ENV !== "production" || process.env.WAI_TEST_SUBMISSIONS === "true", initiallyRequestedProducts: [], listingPaymentStatus: "unpaid" } : {}), createdAt: now, status: "received", classification: request.kind === "service" || request.kind === "partnership" ? "private commercial inquiry" : "unverified research lead" });
    if ((request.kind === "app" || request.kind === "partnership") && notificationEmail) {
      transaction.create(notificationRef, { ...notificationJob, delivery: { state: "PENDING" }, createdAt: now });
    }
  });
  if ((request.kind === "app" || request.kind === "partnership") && notificationEmail) {
    await deliverSubmissionAlert(notificationRef, notificationJob);
  }
  if ((request.kind === "app" || request.kind === "partnership") && !notificationEmail) {
    console.error("App submission saved without notification: no notification email is configured");
  }
  return entryRef.id;
}

export async function listEditorialRequests(cursor?: string): Promise<{ requests: EditorialRequest[]; nextCursor: string | null }> {
  const collection = getAdminFirestore().collection("editorialRequests");
  let query = collection.orderBy("createdAt", "desc").limit(31);
  if (cursor && /^[A-Za-z0-9]{20}$/.test(cursor)) {
    const previous = await collection.doc(cursor).get();
    if (previous.exists) query = query.startAfter(previous);
  }
  const snapshot = await query.get();
  const page = snapshot.docs.slice(0, 30);
  const notificationRefs = page.filter(doc => ["app", "partnership"].includes(doc.data().kind)).map(doc => getAdminFirestore().collection("editorialNotifications").doc(`${doc.data().kind}-${doc.id}`));
  const notifications = notificationRefs.length ? await getAdminFirestore().getAll(...notificationRefs) : [];
  const notificationById = new Map(notifications.filter(doc => doc.exists).map(doc => [doc.id, doc.data()?.delivery?.state as string]));
  return {
    requests: page.map((document) => ({ id: document.id, ...document.data(), notification: { id: `${document.data().kind}-${document.id}`, state: notificationById.get(`${document.data().kind}-${document.id}`) ?? "NOT_QUEUED" } }) as EditorialRequest),
    nextCursor: snapshot.docs.length > 30 ? page[page.length - 1].id : null,
  };
}

export async function getEditorialCapacity() {
  const db = getAdminFirestore();
  const month = monthKey(Date.now());
  const [capacity, active] = await Promise.all([
    db.collection("editorialCapacity").doc(month).get(),
    db.collection("editorialRequests").where("status", "==", "active_review").count().get(),
  ]);
  const monthStart = Date.parse(`${month}-01T00:00:00.000Z`);
  const nextMonth = new Date(monthStart);
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
  const prior = !capacity.data()?.acceptancesInitialized
    ? await db.collection("editorialRequests").where("acceptedAt", ">=", monthStart)
      .where("acceptedAt", "<", nextMonth.getTime()).count().get()
    : null;
  return {
    screenings: Number(capacity.data()?.screenings ?? 0),
    acceptances: prior ? prior.data().count : Number(capacity.data()?.acceptances ?? 0),
    activeReviews: active.data().count,
  };
}
