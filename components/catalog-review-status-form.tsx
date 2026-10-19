"use client";

import { useState } from "react";
import type { ResearchStatus } from "@/lib/catalog";
import { updateCatalogResearchStatus } from "@/app/admin/actions";

const stages: ResearchStatus[] = ["Candidate", "Researching", "Evaluation ready", "Reviewed"];

export function CatalogReviewStatusForm({
  id,
  currentStatus,
  savedAt,
}: {
  id: string;
  currentStatus: ResearchStatus;
  savedAt: number | null;
}) {
  const [targetStatus, setTargetStatus] = useState("");

  return <form action={updateCatalogResearchStatus} className="review-stage-form">
    <input type="hidden" name="id" value={id} />
    <input type="hidden" name="expectedUpdatedAt" value={savedAt ?? ""} />
    <h2>Review stage</h2>
    <p className="editor-help">Current stage: <strong>{currentStatus}</strong>. Save any card edits above before changing its stage.</p>
    {savedAt === null ? <p className="editor-help">Save this catalog record first. Stage changes use the saved version, not an unsaved research draft.</p> : null}
    <fieldset disabled={savedAt === null}>
      <label>Move to
        <select name="targetStatus" value={targetStatus} onChange={event => setTargetStatus(event.target.value)} required>
          <option value="">Choose a stage</option>
          {stages.filter(stage => stage !== currentStatus).map(stage => <option key={stage} value={stage}>{stage}</option>)}
        </select>
      </label>
      {targetStatus === "Reviewed" ? <label className="review-confirmation">
        <input type="checkbox" name="confirmReview" required />
        I reviewed the saved profile and its sources and approve this exact version.
      </label> : null}
      <button className="admin-primary" type="submit" disabled={!targetStatus}>Update review stage</button>
    </fieldset>
    <p className="editor-help">Changing stage does not save card edits or publish a listing. Publication remains a separate dashboard action.</p>
  </form>;
}
