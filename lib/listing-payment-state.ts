export const listingAmount = 2000;
export const listingCurrency = "usd";
export type ListingPayment = {
  status: "checkout_open" | "pending" | "paid" | "failed" | "expired" | "cancelled" | "partially_refunded" | "refunded";
  grossCents: number; refundedCents: number; netCents: number;
};
export function listingPaymentSnapshot(input: {
  amount: number | null; currency: string | null; paymentStatus: string;
  sessionStatus: string | null; refunded: number; failed?: boolean; cancelled?: boolean;
}): ListingPayment {
  if (input.amount !== listingAmount || input.currency !== listingCurrency) throw new Error("Unexpected listing amount or currency");
  if (!Number.isInteger(input.refunded) || input.refunded < 0 || input.refunded > listingAmount) throw new Error("Invalid refund total");
  if (input.paymentStatus === "paid") {
    const refundedCents = input.refunded;
    return { status: refundedCents === listingAmount ? "refunded" : refundedCents > 0 ? "partially_refunded" : "paid", grossCents: listingAmount, refundedCents, netCents: listingAmount - refundedCents };
  }
  return { status: input.cancelled ? "cancelled" : input.failed ? "failed" : input.sessionStatus === "expired" ? "expired" : input.sessionStatus === "complete" ? "pending" : "checkout_open", grossCents: 0, refundedCents: 0, netCents: 0 };
}
