"use client";

import { useState } from "react";
import type { ResearchStatus } from "@/lib/catalog";
import { updateCatalogResearchStatus } from "@/app/admin/actions";

const stages: ResearchStatus[] = ["Candidate", "Researching", "Evaluation ready", "Reviewed"];

export function CatalogReviewStatusForm({
  id,
  currentStatus,
  savedAt,
  canMarkReviewed,
}: {
  id: string;
  currentStatus: ResearchStatus;
  savedAt: number | null;
  canMarkReviewed: boolean;
}) {
  const [targetStatus, setTargetStatus] = useState("");

  return <form action={updateCatalogResearchStatus} className="review-stage-form">
    <input type="hidden" name="id" value={id} />
    <input type="hidden" name="expectedUpdatedAt" value={savedAt ?? ""} />
    <h2>Review stage</h2>
    <p className="editor-help">Current stage: <strong>{currentStatus}</strong>. Changing stage does not change the research fields. Save any edits above separately if you want to keep them.</p>
    {currentStatus === "Reviewed" ? <p className="editor-help">Owner review is complete for the saved card. No further save or stage change is needed unless you want to reopen it for revisions. Publishing remains separate.</p> : null}
    {savedAt === null ? <p className="editor-help">Save this catalog record first. Stage changes use the saved version, not an unsaved research draft.</p> : null}
    {savedAt !== null && !canMarkReviewed && currentStatus !== "Reviewed" ? <p className="editor-help">Reviewed is unavailable until the saved card passes the profile and source checks shown in the sidebar. Apply the local research proposal or save your completed edits first.</p> : null}
    <fieldset disabled={savedAt === null}>
      <label>Move to
        <select name="targetStatus" value={targetStatus} onChange={event => setTargetStatus(event.target.value)} required>
          <option value="">Choose a stage</option>
          {stages.filter(stage => stage !== currentStatus && (stage !== "Reviewed" || canMarkReviewed)).map(stage => <option key={stage} value={stage}>{stage}</option>)}
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
