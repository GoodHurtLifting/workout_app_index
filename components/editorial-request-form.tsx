"use client";

import { useState, type FormEvent } from "react";

export function EditorialRequestForm({ kind }: { kind: "app" | "correction" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/editorial-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your request.");
      form.reset();
      setStatus("sent");
      setMessage("Thank you. Your request is in our editorial review queue.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your request.");
    }
  }

  return (
    <section className="editorial-request-section">
      <h2>{kind === "app" ? "Send your app for review" : "Send the correction"}</h2>
      <p>
        We use your name and email only to evaluate this request and contact you
        if we need clarification. Please do not include passwords or private
        health information.
      </p>
      <form className="editorial-request-form" onSubmit={submit}>
        <div className="editorial-form-pair">
          <label>
            Your name <input name="name" required maxLength={100} autoComplete="name" />
          </label>
          <label>
            Email <input name="email" type="email" required maxLength={254} autoComplete="email" />
          </label>
        </div>
        <label className="editorial-honeypot" aria-hidden="true">
          Company website <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
        {kind === "app" ? (
          <>
            <label>App name <input name="appName" required maxLength={120} /></label>
            <label>Official website or app store listing <input name="websiteUrl" type="url" required placeholder="https://" /></label>
            <label>App store listing (if separate) <input name="storeUrl" type="url" placeholder="https://" /></label>
            <label>Privacy policy <input name="privacyUrl" type="url" required placeholder="https://" /></label>
            <div className="editorial-form-pair">
              <label>Platforms and countries <input name="availability" required maxLength={300} placeholder="Android and iOS; US and Canada" /></label>
              <label>Price, trial, and free tier <input name="pricing" required maxLength={300} /></label>
            </div>
            <label>
              How the app works, including programs, logging, progression, and AI use
              <textarea name="details" required minLength={40} maxLength={4000} rows={7} />
            </label>
          </>
        ) : (
          <>
            <label>Page with the issue <input name="pageUrl" type="url" required placeholder="https://workoutappindex.com/apps/..." /></label>
            <label>Source supporting the correction <input name="sourceUrl" type="url" required placeholder="https://" /></label>
            <label>
              What currently appears, and what should it say instead?
              <textarea name="details" required minLength={20} maxLength={4000} rows={7} />
            </label>
          </>
        )}
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : kind === "app" ? "Submit app" : "Request correction"}
        </button>
        {message ? <p className={`editorial-form-message ${status}`} role="status">{message}</p> : null}
      </form>
      <p className="editorial-request-fallback">
        If the form does not work for you, email <a href="mailto:ryan@theliftleague.com">ryan@theliftleague.com</a>.
      </p>
    </section>
  );
}
