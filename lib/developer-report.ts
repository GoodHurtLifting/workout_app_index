// Operational cohorts use saved records; no browser consent dependency or personal output.
export const conversionWindowDays = 7;
const day = 86400000;
export type CohortRecord = {
 pageOneCompletedAt: number; serviceInquiryAt?: number; checkoutStartedAt?: number;
 listingPurchasedAt?: number; testData?: boolean;
 order?: { grossCents?: number; refundedCents?: number; livemode?: boolean };
 engagement?: { invoiceRefs?: Array<{ amountPaid:number; refunded:number; paidAt?:number|null; livemode:boolean }> };
};
export function developerCohorts(records:CohortRecord[],now=Date.now(),includeTest=false) {
 const groups = new Map<string,{date:string;pageOne:number;purchase:number;inquiry:number;both:number;neitherPending:number;neitherAfterWindow:number;checkoutUnconverted:number;inquiryThenSale:number;listingGrossCents:number;listingRefundCents:number;serviceNetCents:number}>();
 for(const record of records) {
  if(record.testData && !includeTest) continue;
  const start=record.pageOneCompletedAt;
  if(!Number.isFinite(start)||start>now) continue;
  const date=new Date(start).toISOString().slice(0,10);
  const row=groups.get(date) ?? {date,pageOne:0,purchase:0,inquiry:0,both:0,neitherPending:0,neitherAfterWindow:0,checkoutUnconverted:0,inquiryThenSale:0,listingGrossCents:0,listingRefundCents:0,serviceNetCents:0};
  row.pageOne++;
  const deadline=start+conversionWindowDays*day;
  const inWindow=(at?:number)=>typeof at==="number"&&at>=start&&at<=Math.min(now,deadline);
  const paid=inWindow(record.listingPurchasedAt)&&(includeTest||record.order?.livemode!==false), inquiry=inWindow(record.serviceInquiryAt);
  if(paid&&inquiry) row.both++;
  else if(paid) row.purchase++;
  else if(inquiry) row.inquiry++;
  else if(now<deadline) row.neitherPending++;
  else row.neitherAfterWindow++;
  // This overlaps inquiry outcomes intentionally: abandoned checkout is a separate measure.
  if(record.checkoutStartedAt && !paid && now>=deadline) row.checkoutUnconverted++;
  const invoices=(record.engagement?.invoiceRefs ?? []).filter(item=>includeTest||item.livemode);
  if(record.serviceInquiryAt && invoices.some(item=>item.paidAt && item.paidAt>=record.serviceInquiryAt! && item.paidAt<=now && item.amountPaid>0)) row.inquiryThenSale++;
  if(includeTest||record.order?.livemode) {
   row.listingGrossCents+=record.order?.grossCents ?? 0;
   row.listingRefundCents+=record.order?.refundedCents ?? 0;
  }
  row.serviceNetCents+=invoices.reduce((sum,item)=>sum+item.amountPaid-item.refunded,0);
  groups.set(date,row);
 }
 return [...groups.values()].sort((a,b)=>a.date.localeCompare(b.date));
}
