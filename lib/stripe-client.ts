import "server-only";
import Stripe from "stripe";

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || !/^(sk|rk)_(test|live)_/.test(key)) throw new Error("Stripe is not configured");
  if (key.includes("_live_") && process.env.WAI_STRIPE_LIVE_APPROVED !== "true") throw new Error("Live Stripe payments are not enabled");
  return new Stripe(key, { maxNetworkRetries: 2, timeout: 15000 });
}
export function listingCheckoutAvailable() {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  const mode = /^(sk|rk)_test_/.test(key) ? "test" : /^(sk|rk)_live_/.test(key) ? "live" : "";
  let validOrigin = false;
  try { const url = new URL(process.env.WAI_SITE_URL ?? ""); validOrigin = url.username === "" && url.password === "" && url.pathname === "/" && !url.search && !url.hash && (mode === "live" ? url.protocol === "https:" : ["https:","http:"].includes(url.protocol)); } catch { /* Checkout remains unavailable. */ }
  return process.env.WAI_LISTING_TERMS_APPROVED === "true"
    && process.env.WAI_CHECKOUT_ENABLED === "true"
    && Boolean(process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_")) && validOrigin
    && Boolean(mode) && publicKey.startsWith(`pk_${mode}_`)
    && (mode === "test" || process.env.WAI_STRIPE_LIVE_APPROVED === "true");
}
export function stripeModeIsLive() { return (process.env.STRIPE_SECRET_KEY ?? "").includes("_live_"); }
