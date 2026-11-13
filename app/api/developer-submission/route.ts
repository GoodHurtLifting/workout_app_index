import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { developerDetailsSchema, developerServiceSelectionSchema } from "@/lib/developer-offers";
import { authorizedDeveloper, developerCookie, newDeveloperAccess, requireSameOrigin } from "@/lib/developer-session";
import { EditorialRateLimitError, saveEditorialRequest } from "@/lib/editorial-requests";
import { listingOrderRef } from "@/lib/listing-orders";
import { listingCheckoutAvailable, stripeModeIsLive } from "@/lib/stripe-client";

export async function GET() {
  const saved = await authorizedDeveloper();
  if (!saved) return NextResponse.json({ ok: false }, { status: 404, headers: { "Cache-Control": "no-store" } });
  const data = developerDetailsSchema.parse(saved.data);
  return NextResponse.json({
    ok: true, id: saved.id, details: data, inquirySaved: Boolean(saved.data.serviceInquiryAt),
    paymentStatus: saved.data.listingPaymentStatus ?? "unpaid", selectedProduct: saved.data.selectedProduct ?? saved.data.initiallyRequestedProducts?.at(-1) ?? "listing",
    checkoutAvailable: listingCheckoutAvailable(), testMode: !stripeModeIsLive(),
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const raw = await request.text();
    if (raw.length > 14000) return NextResponse.json({ message: "Please shorten your answers." }, { status: 413 });
    const input = JSON.parse(raw);
    if (input.action === "inquiry") {
      const saved = await authorizedDeveloper();
      if (!saved) return NextResponse.json({ message: "Your session expired. Return to your app details." }, { status: 401 });
      const choice = developerServiceSelectionSchema.safeParse(input.products);
      if (!choice.success) return NextResponse.json({ message: "Choose exactly one service." }, { status: 400 });
      const selected = choice.data;
      await saved.ref.firestore.runTransaction(async transaction => {
        const current = await transaction.get(saved.ref);
        const previous = current.data()!;
        transaction.update(saved.ref, {
          initiallyRequestedProducts: [...new Set([...(previous.initiallyRequestedProducts ?? []), ...selected])],
          serviceInquiryAt: previous.serviceInquiryAt ?? Date.now(), selectedProduct: selected[0],
        });
      });
      return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
    }
    const details = developerDetailsSchema.parse(input);
    if (details.companyWebsite) return NextResponse.json({ ok: false }, { status: 400 });
    const existing = await authorizedDeveloper();
    let id = existing?.id;
    const access = newDeveloperAccess();
    if (existing) {
      await existing.ref.firestore.runTransaction(async transaction => {
        const [current, order] = await Promise.all([transaction.get(existing.ref), transaction.get(listingOrderRef(existing.id))]);
        if ((current.data()?.checkoutStartedAt || order.exists) && (details.email !== current.data()?.email || details.appName !== current.data()?.appName)) throw new Error("Payment identity locked");
        transaction.update(existing.ref, details);
      });
    } else {
      const saved = await saveEditorialRequest(details, { accessHash: access.hash });
      if (!saved) return NextResponse.json({ ok: false }, { status: 400 });
      id = saved;
    }
    const response = NextResponse.json({ ok: true, id, checkoutAvailable: listingCheckoutAvailable(), testMode: !stripeModeIsLive() }, { status: 201 });
    if (!existing) response.cookies.set(developerCookie, `${id}.${access.secret}`, {
      httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "Payment identity locked") return NextResponse.json({ message: "This order already has an app name and payment contact. Finish it before starting another app." }, { status: 409 });
    if (error instanceof EditorialRateLimitError) return NextResponse.json({ message: error.message }, { status: 429 });
    if (error instanceof ZodError || error instanceof SyntaxError) return NextResponse.json({ message: "Check your contact details, links and app description." }, { status: 400 });
    if (error instanceof Error && error.message === "Invalid request origin") return NextResponse.json({ message: "Invalid request." }, { status: 403 });
    console.error("Developer request could not be saved");
    return NextResponse.json({ message: "We could not save your request. Your entered information is still on this page." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  try { requireSameOrigin(request); } catch { return NextResponse.json({ ok: false }, { status: 403 }); }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(developerCookie, "", { httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: 0 });
  return response;
}
