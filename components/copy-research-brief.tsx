"use client";

import type { Engagement, DeveloperProduct } from "@/lib/developer-offers";
import { developerProducts, commercialProducts } from "@/lib/developer-offers";
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
  helpWanted?: string;
  competitors?: string;
  differentiation?: string;
  initiallyRequestedProducts?: DeveloperProduct[];
  engagement?: Engagement;
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
      `Requested services: ${(submission.initiallyRequestedProducts ?? []).map(product => developerProducts[product]).join(", ") || "Not supplied"}`,
      `Agreed work: ${(submission.engagement?.agreedProducts ?? []).map(product => commercialProducts[product]).join(", ") || "Not agreed"}`,
      `Developer goals: ${submission.helpWanted || "Not supplied"}`,
      `Competitors and inspirations: ${submission.competitors || "Not supplied"}`,
      `Intended improvements: ${submission.differentiation || "Not supplied"}`,
      "Developer description and claims:",
      submission.details,
      "Research needed: check current primary sources for availability, pricing, features, privacy terms, fit, and tradeoffs. Keep official/app-store claims, developer reports, observations, conflicts, and unknowns distinct. Follow the agreed scope for testing duration, competitors, private findings and promotional deliverables. Do not invent scores or claim unperformed tests.",
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
