import "server-only";
import {stripeClient} from "@/lib/stripe-client";
// Pending or failed refunds never reduce recognized receipts.
export async function confirmedRefunds(paymentIntentId:string) {
 let refundedCents=0,pending=false,failed=false;
 for await (const refund of stripeClient().refunds.list({payment_intent:paymentIntentId,limit:100})) {
  if(refund.status==="succeeded") refundedCents+=refund.amount;
  if(refund.status==="pending"||refund.status==="requires_action") pending=true;
  if(refund.status==="failed"||refund.status==="canceled") failed=true;
 }
 return {refundedCents,pending,failed};
}
