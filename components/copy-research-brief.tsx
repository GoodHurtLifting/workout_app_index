"use client";

import { useState } from "react";

type SubmissionBrief = {
  id: string;
  createdAt: number;
  appName: string;
  websiteUrl: string;
  storeUrl: string;
  privacyUrl: string;
  availability: string;
  pricing: string;
  details: string;
};

export function CopyResearchBrief({ submission }: { submission: SubmissionBrief }) {
  const [message, setMessage] = useState("");

  async function copy() {
    const brief = [
      "Workout App Index submission research brief",
      "Developer-submitted claims; not independently verified or approved for publication.",
      `Submission ID: ${submission.id}`,
      `Submitted: ${new Date(submission.createdAt).toISOString().slice(0, 10)}`,
      `App: ${submission.appName}`,
      `Website: ${submission.websiteUrl}`,
      `Store listing: ${submission.storeUrl || "Not supplied"}`,
      `Privacy policy: ${submission.privacyUrl}`,
      `Claimed availability: ${submission.availability}`,
      `Claimed pricing: ${submission.pricing}`,
      "Developer description and claims:",
      submission.details,
      "Research needed: check current primary sources for availability, pricing, features, privacy terms, fit, and tradeoffs. Keep official/app-store claims, developer reports, observations, conflicts, and unknowns distinct. Ordinary owner verification is zero to approximately ten minutes; do not invent scores to satisfy the current approval gate.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(brief);
      setMessage("Copied without the contact fields. Check free text before sharing.");
    } catch {
      setMessage("Could not copy. Check browser clipboard permission.");
    }
  }

  return <div className="research-brief-action">
    <button type="button" onClick={copy}>Copy research brief</button>
    {message ? <span role="status">{message}</span> : null}
  </div>;
}
