"use server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCatalogAdminForAction } from "@/lib/admin-auth";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getCatalogRecord, getPublicCatalog } from "@/lib/catalog-repository";
import type { EditorialRequest } from "@/lib/editorial-requests";
import { inboxCompletionBlocker } from "@/lib/inbox-presentation";
import { apps } from "@/lib/catalog";
import { catalogResearchDrafts } from "@/lib/catalog-research-drafts";
import { candidateFromSubmission, candidateId } from "@/lib/submission-candidate";
import { eligibilityChecks, eligibilityProblem, type Eligibility } from "@/lib/inbox-workflow";
import { saveCommercialWork, refreshCommercialPayment, retryInternalNotification, rejectListingAndRefund } from "@/app/admin/commercial-actions";
const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();
export async function saveInboxAction(form: FormData): Promise<{ error?: string; message?: string }> {
  try {
    const user = await getCatalogAdminForAction();
    const id = z.string().regex(/^[A-Za-z0-9]{20}$/).parse(field(form, "id"));
    const intent = field(form, "intent");
    if (intent === "commercial") { await saveCommercialWork(form); return { message: "Saved." }; }
    if (intent === "refresh") { await refreshCommercialPayment(form); return { message: "Payments refreshed from Stripe." }; }
    if (intent === "notification") { await retryInternalNotification(form); return { message: "Notification retry checked. See delivery status." }; }
    if (intent === "refund") { await rejectListingAndRefund(form); return { message: "Refund requested. Check the provider status below." }; }
    const db = getAdminFirestore(), ref = db.collection("editorialRequests").doc(id);
    const requestedLink = field(form, "catalogAppId");
    const publicIds = intent === "complete" ? new Set((await getPublicCatalog()).apps.map(app => app.id)) : new Set<string>();
    if (intent === "link" && requestedLink && (!/^[a-z0-9-]{1,80}$/.test(requestedLink) || !(await getCatalogRecord(requestedLink)))) throw new Error("Select an existing catalog entry");
    await db.runTransaction(async transaction => {
      const saved = await transaction.get(ref), data = saved.data();
      if (!data || (data.deletedAt && intent !== "restore")) throw new Error("Submission is no longer in the inbox. Reload to continue.");
      if (Number(data.inboxRevision ?? 0) !== Number(field(form, "inboxRevision") || 0)) throw new Error("This submission changed. Reload before saving.");
      const now = Date.now();
      let patch: Record<string, unknown> = {};
      if (intent === "eligibility") {
        if (data.kind !== "app") throw new Error("Eligibility applies to app submissions only");
        const eligibility: Eligibility = { result: z.enum(["pending", "eligible", "ineligible"]).parse(field(form, "result")),
          findings: Object.fromEntries(Object.keys(eligibilityChecks).map(key => [key, z.enum(["unknown", "pass", "fail"]).parse(field(form, key))])), note: z.string().max(2000).parse(field(form, "note")), at: now };
        const problem = eligibilityProblem(eligibility); if (problem) throw new Error(problem);
        patch = { eligibility };
      } else if (intent === "note") {
        const kind = z.enum(["public_source", "developer_statement", "hands_on", "owner_dictation"]).parse(field(form, "kind"));
        const observedOn = field(form, "observedOn");
        if (observedOn && (!/^\d{4}-\d{2}-\d{2}$/.test(observedOn) || !Number.isFinite(Date.parse(observedOn)) || new Date(observedOn).toISOString().slice(0,10) !== observedOn || Date.parse(observedOn) > now)) throw new Error("Use a valid observation date, today or earlier");
        if (["hands_on", "owner_dictation"].includes(kind) && !observedOn) throw new Error("Hands-on observations and original dictation need an observation date");
        const noteId = randomUUID();
        const note = { id: noteId, kind, at: now, by: user.userId, observedOn,
          context: z.string().max(1000).parse(field(form, "context")), used: z.string().max(2000).parse(field(form, "used")), findings: z.string().min(1).max(kind === "owner_dictation" ? 20000 : 8000).refine(value => Boolean(value.trim())).parse(kind === "owner_dictation" ? String(form.get("findings") ?? "") : field(form, "findings")), limitations: z.string().max(2000).parse(field(form, "limitations")), catalogAppId: data.commercialCatalogAppId || data.candidateAppId || null };
        transaction.create(ref.collection("researchNotes").doc(noteId), note);
        patch = { researchNotesUpdatedAt: now };
      } else if (intent === "create" || intent === "link") {
        if (data.kind !== "app") throw new Error("Use Work and payments to connect this inquiry");
        if (Number(data.commercialRevision ?? 0) !== Number(field(form, "revision") || 0)) throw new Error("Catalog connection changed. Reload before saving.");
        let appId = requestedLink;
        if (intent === "create") {
          if (data.candidateAppId || data.commercialCatalogAppId) throw new Error("Open the connected catalog entry or explicitly choose a replacement link");
          appId = candidateId(data.appName);
          const appRef = db.collection("catalogApps").doc(appId);
          const existing = await transaction.get(appRef);
          if (existing.exists || apps.some(app => app.id === appId) || catalogResearchDrafts[appId]) throw new Error(`A matching draft may already exist (${appId}). Link the existing entry instead.`);
          const record = candidateFromSubmission(appId, data.appName);
          transaction.create(appRef, { id: appId, slug: appId, name: data.appName, record, publication_status: "Candidate", source_submission_id: id, created_at: now, updated_at: now, updated_by: user.userId });
        }
        patch = { candidateAppId: appId || null, commercialCatalogAppId: appId || null, commercialRevision: Number(data.commercialRevision ?? 0) + 1 };
      } else if (intent === "complete" || intent === "reopen") {
        const request = { id, ...data } as EditorialRequest;
        const problem = inboxCompletionBlocker(request, publicIds.has(data.commercialCatalogAppId || data.candidateAppId));
        if (intent === "complete" && problem) throw new Error(`${problem}. Resolve it in Work and payments before completing this request.`);
        patch = intent === "complete" ? { inboxState: "completed", inboxCompletedAt: now, inboxCompletedBy: user.userId, inboxCompletionNote: z.string().max(2000).parse(field(form, "note")) } : { inboxState: "open", inboxReopenedAt: now, inboxReopenedBy: user.userId };
      } else if (intent === "restore") {
        patch = { deletedAt: null, restoredAt: now, restoredBy: user.userId };
      } else if (intent === "delete") {
        if (form.get("confirmDelete") !== "on") throw new Error("Confirm removal from the inbox");
        patch = { deletedAt: now, deletedBy: user.userId };
      } else if (intent === "correction") {
        if (data.kind !== "correction") throw new Error("Correction request not found");
        patch = { correctionStatus: z.enum(["pending", "investigating", "resolved", "closed"]).parse(field(form, "correctionStatus")), correctionNote: z.string().max(2000).parse(field(form, "note")) };
      } else throw new Error("Unknown inbox action");
      transaction.create(ref.collection("history").doc(), { kind: intent, at: now, by: user.userId,
        before: intent === "eligibility" ? data.eligibility ?? { screeningCriteria: data.screeningCriteria ?? {}, screeningNote: data.screeningNote ?? "", status: data.status } : intent === "link" ? { candidateAppId: data.candidateAppId ?? null, commercialCatalogAppId: data.commercialCatalogAppId ?? null } : null, after: patch });
      transaction.update(ref, { ...patch, inboxRevision: Number(data.inboxRevision ?? 0) + 1 });
    });
    revalidatePath("/admin");
    return { message: intent === "delete" ? "Removed from inbox. Private history and billing records retained." : "Saved privately. Catalog publication and client delivery are separate actions." };
  } catch (error) {
    return { error: error instanceof z.ZodError ? "Check the form values and required fields." : error instanceof Error ? error.message : "Could not save. Try again." };
  }
}
