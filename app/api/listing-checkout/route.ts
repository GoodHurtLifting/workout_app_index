import { NextResponse, type NextRequest } from "next/server";
import { authorizedDeveloper, requireSameOrigin } from "@/lib/developer-session";
import { listingCheckoutAvailable } from "@/lib/stripe-client";
import { createListingCheckout, cancelListingCheckout, listingOrderRef, reconcileListingSession } from "@/lib/listing-orders";

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    if (!listingCheckoutAvailable()) return NextResponse.json({ message: "Listing checkout is being set up. Your app details are saved. Please return when checkout is available." }, { status: 503 });
    const saved = await authorizedDeveloper();
    if (!saved) return NextResponse.json({ message: "Return to your app details to continue." }, { status: 401 });
    const input = await request.json();
    if (input.acceptTerms !== true) return NextResponse.json({ message: "Please accept the listing terms." }, { status: 400 });
    const session = await createListingCheckout(saved.id, saved.data.email);
    await saved.ref.update({ listingTermsVersion: "2026-11-13", listingTermsAcceptedAt: Date.now() });
    return NextResponse.json({ ok: true, clientSecret: session.client_secret }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Checkout could not be opened. Your details are saved. Refresh the payment status before trying again." }, { status: 409 });
  }
}
export async function GET() {
  try {
    const saved = await authorizedDeveloper();
    if (!saved) return NextResponse.json({ message: "Your session expired." }, { status: 401 });
    const order = await listingOrderRef(saved.id).get();
    if (order.data()?.sessionId) await reconcileListingSession(order.data()!.sessionId);
    const current = await listingOrderRef(saved.id).get();
    return NextResponse.json({ ok: true, id: saved.id, paymentStatus: current.data()?.status ?? "unpaid" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "We could not confirm the payment status yet. Please check again." }, { status: 503 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const saved = await authorizedDeveloper();
    if (!saved) return NextResponse.json({ ok: false }, { status: 401 });
    await cancelListingCheckout(saved.id);
    const order = await listingOrderRef(saved.id).get();
    return NextResponse.json({ ok: true, paymentStatus: order.data()?.status ?? "unpaid" });
  } catch { return NextResponse.json({ message: "Please refresh the payment status before starting another checkout." }, { status: 409 }); }
}
