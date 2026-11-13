"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { serviceOffers, partnershipTopics, type CommercialInquiryKind } from "@/lib/commercial-inquiries";
import { trackCommercialEvent, trackCommercialSubmission } from "@/lib/commercial-analytics";

export function CommercialInquiryForm({ kind }: { kind: CommercialInquiryKind }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const sending = useRef(false);
  const viewed = useRef(false);
  const page = kind === "service" ? "services" : "partnerships";

  useEffect(() => {
    const recordView = () => {
      if (!viewed.current && trackCommercialEvent(page === "services" ? "services_page_viewed" : "partnerships_page_viewed", page)) viewed.current = true;
    };
    window.addEventListener("wai:analytics-ready", recordView);
    recordView();
    return () => window.removeEventListener("wai:analytics-ready", recordView);
  }, [page]);

  function recordStart(event: FormEvent<HTMLFormElement>) {
    const target = event.target;
    if (started.current || !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) || target.name === "companyWebsite" || !target.value.trim()) return;
    started.current = true;
    trackCommercialEvent(kind === "service" ? "scope_request_started" : "partnership_inquiry_started", page);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/editorial-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), kind }),
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (response.status !== 201 || result.ok !== true) throw new Error(result.message || "We could not save your inquiry. Please try again.");
      trackCommercialSubmission(kind, response.status, result.ok);
      form.reset();
      started.current = false;
      setStatus("sent");
      setMessage("We received your inquiry. We will review the request; no scope, payment, or partnership has been agreed.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not save your inquiry. Please try again.");
    } finally {
      sending.current = false;
    }
  }

  return <section className="editorial-request-section" id="request-scope">
    <h2>{kind === "service" ? "Request a scope" : "Discuss a partnership"}</h2>
    <p>We store your contact details and message privately to consider and respond to this inquiry. Please keep passwords, health information and confidential customer data out of your answers.</p>
    <form className="editorial-request-form" onSubmit={submit} onInputCapture={recordStart} onChangeCapture={recordStart}>
      <div className="editorial-form-pair">
        <label>Your name <input name="name" required maxLength={100} autoComplete="name" /></label>
        <label>Email <input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
      </div>
      <label>Company or product <input name="organization" required maxLength={160} autoComplete="organization" /></label>
      <label className="editorial-honeypot" aria-hidden="true">Company website <input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
      <label>{kind === "service" ? "Service" : "Area of interest"}
        <select name="topic" required defaultValue="">
          <option value="" disabled>Select an option</option>
          {Object.entries(kind === "service" ? serviceOffers : partnershipTopics).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
      </label>
      <label>{kind === "service" ? "What would you like checked? Include the platform, workflow, and intended timing." : "What would you like to promote or learn? Include your audience, goals and preferred timing."}
        <textarea name="details" required minLength={20} maxLength={4000} rows={6} />
      </label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : kind === "service" ? "Request a scope" : "Send inquiry"}</button>
      {message ? <p className={`editorial-form-message ${status}`} role="status">{message}</p> : null}
    </form>
    <p className="editorial-request-fallback">You can also <a href="mailto:ryan@workoutappindex.com" onClick={() => trackCommercialEvent("commercial_outbound_selected", page)}>email WAI</a>.</p>
  </section>;
}
