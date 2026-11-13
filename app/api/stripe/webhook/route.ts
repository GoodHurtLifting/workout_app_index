import { NextResponse, type NextRequest } from "next/server";
import { stripeClient, stripeModeIsLive } from "@/lib/stripe-client";
import { listingSessionFromEvent, reconcileListingSession } from "@/lib/listing-orders";
import { reconcileInvoice } from "@/lib/service-invoices";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });
  const raw = await request.text();
  if (raw.length > 1000000) return NextResponse.json({ ok: false }, { status: 413 });
  let event;
  try {
    event = stripeClient().webhooks.constructEvent(raw, request.headers.get("stripe-signature") ?? "", secret);
  } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (event.livemode !== stripeModeIsLive()) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    if (event.type.startsWith("invoice.")) {
      const invoice = event.data.object as { id?: string };
      if (invoice.id) await reconcileInvoice(invoice.id);
    } else {
      const id = await listingSessionFromEvent(event);
      const session = event.data.object as unknown as { payment_status?: string };
      const paidEvent = event.type === "checkout.session.async_payment_succeeded" || event.type === "checkout.session.completed" && session.payment_status === "paid";
      if (id) await reconcileListingSession(id, event.id, event.type === "checkout.session.async_payment_failed", paidEvent ? event.created * 1000 : undefined);
      if (event.type === "charge.refunded") await reconcileInvoice(undefined, event.data.object.id);
      if (event.type.startsWith("refund.")) {
        const refund = event.data.object as { charge?: string | { id: string } | null };
        const charge = typeof refund.charge === "string" ? refund.charge : refund.charge?.id;
        if (charge) await reconcileInvoice(undefined, charge);
      }
    }
    return NextResponse.json({ received: true });
  } catch {
    console.error("Stripe reconciliation requires retry");
    return NextResponse.json({ received: false }, { status: 503 });
  }
}
