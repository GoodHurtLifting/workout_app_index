"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";
import { developerProducts, productIds, type DeveloperDetails, type DeveloperProduct } from "@/lib/developer-offers";
import { analyticsConsentGranted, trackEvent, trackEventWhenReady } from "@/lib/analytics";
import { trackDeveloperEvent, type DeveloperEvent } from "@/lib/developer-analytics";

const blank: DeveloperDetails = { kind: "app", name: "", email: "", companyWebsite: "", appName: "", websiteUrl: "", storeUrl: "", privacyUrl: "", availability: "", pricing: "", details: "", helpWanted: "", competitors: "", differentiation: "" };
const storageKey = "wai-developer-form-v1";
const offers: Record<DeveloperProduct, { benefit: string; description: string; includes: string[] }> = {
  listing: {
    benefit: "Help the right people discover your app.",
    description: "Give prospective users a sourced factual profile explaining what your app offers, how it works and what it costs, so they can decide whether it fits their training.",
    includes: ["Eligibility assessment and checks against public product sources", "Factual profile preparation for an eligible app, followed by owner approval", "Assessment within five business days after payment, complete information and access; a full refund if ineligible or WAI cannot deliver"],
  },
  focused_test: {
    benefit: "Find the friction that holds users back.",
    description: "Get an outside view of the journeys that matter to your app: getting started, finding a program, logging a session or using a key feature. We work through an agreed scope, identify where the experience becomes difficult and explain what to address first.",
    includes: ["Hands-on testing of agreed user journeys and features", "Private findings with practical context and steps to reproduce issues where applicable", "Prioritized recommendations and follow-up to discuss the findings and your next steps"],
  },
  launch_review: {
    benefit: "Improve the experience and explain your app’s value to the right audience.",
    description: "Combine a fuller review of your product experience with writing that helps suitable users understand your app. We examine its strengths, friction and limitations, then turn those findings into private recommendations and a clearly disclosed promotional write-up.",
    includes: ["A fuller experience review focused on your intended users and agreed product journeys", "Private recommendations showing what works well and where improvements could matter most", "A commissioned write-up explaining your app, its audience and relevant tradeoffs, with publication and placement agreed in the scope"],
  },
  competitive_audit: {
    benefit: "Understand where your app stands and where to take it next.",
    description: "We use your app as its intended customers would over an agreed period, then compare the experience with relevant industry leaders. Your goals, inspirations and intended improvements shape the questions, so the comparison can inform product priorities and positioning.",
    includes: ["Intended product use over an agreed period, going beyond a checklist walkthrough", "Comparison with an agreed set of leading apps and relevant product experiences", "Private findings and a written comparison identifying meaningful differences, tradeoffs and opportunities to improve"],
  },
};

export function DeveloperSubmissionFunnel() {
  const [details, setDetails] = useState<DeveloperDetails>(blank);
  const [id, setId] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [inquirySaved, setInquirySaved] = useState(false);
  const [checkoutAvailable, setCheckoutAvailable] = useState(false);
  const [testMode, setTestMode] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [selected, setSelected] = useState<DeveloperProduct>("listing");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const started = useRef(false);
  const sent = useRef(new Set<string>());
  const checkout = useRef<StripeEmbeddedCheckout | null>(null);
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) Promise.resolve().then(() => { if (active) setDetails({ ...blank, ...JSON.parse(saved) }); });
    } catch { /* The form remains usable when browser storage is blocked. */ }
    const restore = async () => {
      try {
        const response = await fetch("/api/developer-submission", { cache: "no-store" });
        if (!response.ok || !active) return;
        const data = await response.json();
        if (!active) return;
        // A fresh local draft wins until Next saves it to the server.
        if (!sessionStorage.getItem(storageKey)) setDetails(data.details);
        setId(data.id);
        setInquirySaved(data.inquirySaved);
        setPaymentStatus(data.paymentStatus);
        setCheckoutAvailable(data.checkoutAvailable);
        setTestMode(data.testMode);
        let choice = data.selectedProduct;
        try { choice = sessionStorage.getItem(`${storageKey}-offer-${data.id}`) ?? choice; } catch { /* Saved server choice is still available. */ }
        if (productIds.includes(choice)) setSelected(choice);
        if (new URL(location.href).searchParams.get("checkout") === "return" || history.state?.waiDeveloperStep === 2) setStep(2);
      } catch { /* Preserve locally entered information. */ }
    };
    void restore();
    const pop = () => setStep(history.state?.waiDeveloperStep === 2 ? 2 : 1);
    window.addEventListener("popstate", pop);
    return () => { active = false; checkout.current?.destroy(); window.removeEventListener("popstate", pop); };
  }, []);

  useEffect(() => {
    const record = () => {
      if (step !== 2 || !id || sent.current.has(`offers-${id}`)) return;
      if (trackDeveloperEvent("submission_offer_viewed", id)) sent.current.add(`offers-${id}`);
    };
    record();
    window.addEventListener("wai:analytics-ready", record);
    return () => window.removeEventListener("wai:analytics-ready", record);
  }, [step, id]);

  useEffect(() => {
    if (id && new URL(location.href).searchParams.get("checkout") === "return") void refreshPayment().catch(() => setMessage("Please check your payment status."));
    // Only the restored request triggers reconciliation; changing status must not poll.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function update(key: keyof DeveloperDetails, value: string) {
    const next = { ...details, [key]: value };
    setDetails(next);
    try { sessionStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Server save remains available on Next. */ }
    if (!started.current && key !== "companyWebsite" && value.trim()) {
      started.current = true;
      trackEvent("submission_started");
    }
  }

  function completeOnce(submissionId: string) {
    const key = `wai-completed-${submissionId}`;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "1"); } catch { if (sent.current.has(key)) return; }
    sent.current.add(key);
    trackEventWhenReady("submission_completed");
  }

  function recordOnce(event: DeveloperEvent, submissionId = id) {
    const key = `${event}-${submissionId}`;
    try { if (sessionStorage.getItem(key)) return; } catch { /* In-memory dedup remains. */ }
    if (!analyticsConsentGranted() || sent.current.has(key)) return;
    sent.current.add(key);
    const send = () => {
      if (trackDeveloperEvent(event, submissionId)) { try { sessionStorage.setItem(key, "1"); } catch { /* Optional storage. */ } }
    };
    if (window.gtag) send(); else window.addEventListener("wai:analytics-ready", send, { once: true });
  }

  async function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/developer-submission", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Please check your app details.");
      setId(result.id);
      completeOnce(result.id);
      setCheckoutAvailable(result.checkoutAvailable);
      setTestMode(result.testMode);
      recordOnce("submission_page_one_completed", result.id);
      history.pushState({ ...history.state, waiDeveloperStep: 2 }, "", "/submit-app?step=offers");
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) { setMessage(error instanceof Error ? error.message : "Please try again."); }
    finally { setBusy(false); }
  }

  async function inquiry() {
    if (busy || checkoutOpen || selected === "listing") return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/developer-submission", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "inquiry", products: [selected] }) });
      const result = await response.json();
      if (response.status !== 201 || !result.ok) throw new Error(result.message || "We could not save your request.");
      if (!inquirySaved) {
        recordOnce("service_inquiry_saved");

      }
      setInquirySaved(true);
      setMessage("Your request is saved. We will review your goals and contact you to agree the work, timing and price.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Please try again."); }
    finally { setBusy(false); }
  }

  async function refreshPayment() {
    const response = await fetch("/api/listing-checkout", { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Payment status is not available yet.");
    setPaymentStatus(result.paymentStatus);
    if (result.paymentStatus === "paid") {
      recordOnce("listing_purchase_confirmed");

      setMessage("");
      setCheckoutOpen(false);
      checkout.current?.destroy();
      checkout.current = null;
    } else setMessage(["refunded", "partially_refunded"].includes(result.paymentStatus) ? "Your payment record includes a refund. Please contact WAI if you have questions." : "Payment is not confirmed yet. You can check again or continue with your service request.");
  }

  async function pay() {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/listing-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ acceptTerms }) });
      const result = await response.json();
      if (!response.ok || !result.clientSecret) throw new Error(result.message || "Checkout is unavailable.");
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error("Secure checkout could not load. Your details are saved.");
      const embedded = await stripe.createEmbeddedCheckoutPage({
        clientSecret: result.clientSecret,
        onComplete: () => { void refreshPayment().catch(error => setMessage(error.message)); },
      });
      checkout.current?.destroy();
      checkout.current = embedded;
      setCheckoutOpen(true);
      if (mount.current) embedded.mount(mount.current);
      setPaymentStatus("checkout_open");
      recordOnce("listing_checkout_started");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Checkout could not open."); }
    finally { setBusy(false); }
  }

  async function cancelPayment() {
    setBusy(true);
    try {
      const response = await fetch("/api/listing-checkout", { method: "DELETE" });
      if (!response.ok) throw new Error("Please check payment status before retrying.");
      checkout.current?.destroy();
      checkout.current = null;
      setCheckoutOpen(false);
      setMessage("Checkout closed. Your app details and service choices are saved.");
      const status = await response.json();
      setPaymentStatus(status.paymentStatus);
      if (status.paymentStatus === "paid") await refreshPayment();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Please refresh payment status."); }
    finally { setBusy(false); }
  }

  async function anotherApp() {
    const response = await fetch("/api/developer-submission", { method: "DELETE" });
    if (!response.ok) { setMessage("Please try again."); return; }
    try { sessionStorage.removeItem(storageKey); sessionStorage.removeItem(`${storageKey}-offer-${id}`); } catch { /* Optional storage. */ }
    checkout.current?.destroy();
    checkout.current = null; setCheckoutOpen(false); setDetails(blank); setId(""); setInquirySaved(false); setPaymentStatus("unpaid"); setSelected("listing"); setAcceptTerms(false); setMessage(""); started.current = false;
    history.replaceState({}, "", "/submit-app"); setStep(1);
  }

  function choose(product: DeveloperProduct) {
    if (busy || checkoutOpen) return;
    setSelected(product);
    try { sessionStorage.setItem(`${storageKey}-offer-${id}`, product); } catch { /* Optional browser storage. */ }
    trackDeveloperEvent("submission_service_selected", id, product);
  }

  function back() {
    checkout.current?.destroy();
    checkout.current = null;
    setCheckoutOpen(false);
    history.pushState({ ...history.state, waiDeveloperStep: 1 }, "", "/submit-app");
    setStep(1);
  }

  return <section className="editorial-request-section developer-funnel">
    <p className="eyebrow">STEP {step} OF 2</p>
    {step === 1 ? <form className="editorial-request-form" onSubmit={next}>
      <h2>Tell us about your app</h2>
      <p>A factual listing costs $20. You can also request testing, a promotional write-up or a competitive comparison on the next page.</p>
      <div className="editorial-form-pair">
        <label>Your name<input name="name" required maxLength={100} autoComplete="name" value={details.name} onChange={e => update("name", e.target.value)} /></label>
        <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" value={details.email} onChange={e => update("email", e.target.value)} /></label>
      </div>
      <label className="editorial-honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" value={details.companyWebsite} onChange={e => update("companyWebsite", e.target.value)} /></label>
      <label>App name<input required maxLength={120} value={details.appName} onChange={e => update("appName", e.target.value)} /></label>
      <label>Official website or app store listing<input type="url" required maxLength={1500} placeholder="https://" value={details.websiteUrl} onChange={e => update("websiteUrl", e.target.value)} /></label>
      <label>App store listing, if separate<input type="url" maxLength={1500} placeholder="https://" value={details.storeUrl} onChange={e => update("storeUrl", e.target.value)} /></label>
      <label>Privacy policy<input type="url" required maxLength={1500} placeholder="https://" value={details.privacyUrl} onChange={e => update("privacyUrl", e.target.value)} /></label>
      <div className="editorial-form-pair">
        <label>Platforms and countries<input required maxLength={300} value={details.availability} onChange={e => update("availability", e.target.value)} /></label>
        <label>Price, trial and free tier<input required maxLength={300} value={details.pricing} onChange={e => update("pricing", e.target.value)} /></label>
      </div>
      <label>How does your app work? Include programs, logging, progression and AI use.<textarea required minLength={40} maxLength={4000} rows={6} value={details.details} onChange={e => update("details", e.target.value)} /></label>
      <label>Where would you like help with your product? Optional for listing-only requests.<textarea maxLength={1500} rows={3} value={details.helpWanted} onChange={e => update("helpWanted", e.target.value)} /></label>
      <label>Which apps inspired yours, or compete with it?<textarea maxLength={1000} rows={2} value={details.competitors} onChange={e => update("competitors", e.target.value)} /></label>
      <label>What did you want to improve or do differently?<textarea maxLength={1500} rows={3} value={details.differentiation} onChange={e => update("differentiation", e.target.value)} /></label>
      <p>We keep your request private and use it to assess your app and respond. Please keep passwords and private health information out of your answers. <Link href="/privacy">Privacy</Link></p>
      <button type="submit" disabled={busy}>{busy ? "Saving..." : "Next"}</button>
    </form> : <div>
      <h2>Choose how we can help {details.appName}</h2>
      {paymentStatus === "paid" && <div className="developer-success" role="status"><strong>Payment received — $20</strong><p>Your listing payment is confirmed. We will assess your app within five business days once complete information and required access are available.</p></div>}
      <fieldset className="developer-offers" disabled={busy || checkoutOpen}>
        <legend>Choose one product</legend>
        <p>Select the support you want to start with. We will agree the scope and price of any larger engagement with you.</p>
        <div className="developer-offer-grid">
          {productIds.map(product => <article key={product} className="developer-offer" data-selected={selected === product}>
            <div className="developer-offer-heading">
              <input type="radio" name="developer-product" id={`offer-${product}`} checked={selected === product} onChange={() => choose(product)} aria-describedby={`offer-description-${product}`} />
              <h3><label htmlFor={`offer-${product}`}>{developerProducts[product]}</label></h3>
              {product === "listing" && <span className="developer-offer-price">$20</span>}
            </div>
            <p className="developer-offer-benefit">{offers[product].benefit}</p>
            <p id={`offer-description-${product}`}>{offers[product].description}</p>
            <ul>{offers[product].includes.map(item => <li key={item}>{item}</li>)}</ul>
          </article>)}
        </div>
      </fieldset>
      <div className="developer-offer-actions">
        {!checkoutOpen && <>
          <p className="developer-choice-summary">Selected: <strong>{developerProducts[selected]}</strong>{selected === "listing" ? " — $20" : " — scope and price agreed before work starts"}</p>
          {selected === "listing" ? ["paid", "refunded", "partially_refunded"].includes(paymentStatus) ? <p className="developer-payment-note">{paymentStatus === "paid" ? "Your listing payment is complete. No further payment is needed for this submission." : "This listing order has a refund recorded. Contact WAI with any billing questions."}</p> : <>
            {testMode && checkoutAvailable && <p role="status">Test checkout. Use Stripe test payment details.</p>}
            {!checkoutAvailable && <p role="status">Listing checkout is being set up. Your details are saved. You can still choose a service inquiry.</p>}
            <label className="developer-terms"><input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} /> <span>I accept the <Link href="/terms">listing terms and refund policy</Link>.</span></label>
            <button className="developer-button-primary" type="button" onClick={() => { trackDeveloperEvent("submission_service_selected", id, "listing"); void pay(); }} disabled={busy || !checkoutAvailable || !acceptTerms}>Continue to payment — $20</button>
          </> : <button className="developer-button-primary" type="button" disabled={busy} onClick={() => void inquiry()}>{busy ? "Saving..." : "Submit request"}</button>}
        </>}
        <div ref={mount} hidden={!checkoutOpen} />
        {checkoutOpen && <><p>Close checkout before choosing a different product. Your app details will be kept.</p><button className="developer-button-secondary" type="button" onClick={() => void cancelPayment()} disabled={busy}>Cancel checkout and keep my details</button></>}
        <div className="developer-navigation">
          <button className="developer-button-link" type="button" disabled={busy} onClick={back}>Back to app details</button>
          {(inquirySaved || ["paid", "refunded", "partially_refunded"].includes(paymentStatus)) && <button className="developer-button-secondary" type="button" disabled={busy} onClick={() => void anotherApp()}>Start a different submission</button>}
          {id && paymentStatus !== "unpaid" && <button className="developer-button-link" type="button" disabled={busy} onClick={() => { void refreshPayment().catch(error => setMessage(error.message)); }}>Check payment status</button>}
        </div>
        <p className="developer-scope-note">Service scope, product-use duration, competitors, deliverables and price are agreed before work begins. Larger engagements start with a signed scope and a non-refundable 50% deposit; the final 50% is invoiced on completion. Findings reflect the evidence. Payment does not buy a favorable recommendation or finder position.</p>
      </div>
    </div>}
    {message && <p className="editorial-form-message" role="status">{message}</p>}
  </section>;
}
