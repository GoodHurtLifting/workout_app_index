import Link from "next/link";
import {requireCatalogAdmin} from "@/lib/admin-auth";
import {getDeveloperReport} from "@/lib/developer-report-repository";
import "../admin.css";
export const dynamic="force-dynamic";
export default async function DeveloperReport({searchParams}:{searchParams:Promise<{start?:string;end?:string;includeTest?:string}>}) {
 await requireCatalogAdmin("/admin/reports");
 const params=await searchParams;
 const today=new Date();
 const end=params.end??today.toISOString().slice(0,10),start=params.start??new Date(today.getTime()-29*86400000).toISOString().slice(0,10);
 let report:Awaited<ReturnType<typeof getDeveloperReport>>|undefined,error="";
 try {report=await getDeveloperReport(start,end,params.includeTest==="true");}catch(problem){error=problem instanceof RangeError?problem.message:"Report unavailable. Please try again.";}
 const money=(cents:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
 return <main className="admin-page standalone-admin"><Link href="/admin">Back to admin</Link><h1>Developer submissions</h1>
 <p>Requests are grouped by the day app details were saved. Purchase and inquiry outcomes use a seven-day window. Newer requests may still be pending. Checkout without a purchase is counted separately and can overlap an inquiry.</p>
 <form action="/admin/reports" method="get" className="submission-decision"><label>From<input type="date" name="start" defaultValue={start} required/></label><label>Through<input type="date" name="end" defaultValue={end} required/></label><label><input type="checkbox" name="includeTest" value="true" defaultChecked={params.includeTest==="true"}/>Include internal test submissions and test payments</label><button type="submit">Show report</button></form>
 {error?<p role="alert">{error}</p>:report&&<><p>Source: saved requests and reconciled payments. Checked {report.asOf}. {report.includeTest?"Includes test data.":"Test data excluded."}</p>
 <div style={{overflowX:"auto"}}><table><caption>Seven-day outcomes by submission date</caption><thead><tr>{["Date","Details saved","Purchase only","Inquiry only","Both","Neither, pending","Neither after 7 days","Checkout, no purchase","Inquiry then service sale"].map(label=><th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{report.cohorts.map(row=><tr key={row.date}><th scope="row">{row.date}</th>{[row.pageOne,row.purchase,row.inquiry,row.both,row.neitherPending,row.neitherAfterWindow,row.checkoutUnconverted,row.inquiryThenSale].map((value,index)=><td key={index}>{value}</td>)}</tr>)}</tbody></table></div>
 {!report.cohorts.length&&<p>No saved developer requests in this date range.</p>}
 <h2>Reconciled payments for these submissions</h2><p>Listing receipts: {money(report.cohorts.reduce((sum,row)=>sum+row.listingGrossCents,0))}. Listing refunds: {money(report.cohorts.reduce((sum,row)=>sum+row.listingRefundCents,0))}. Service payments after refunds: {money(report.cohorts.reduce((sum,row)=>sum+row.serviceNetCents,0))}.</p>
 <p>These are current payment totals for the selected submission cohorts, before provider fees. Later service sales can occur outside the seven-day window. Refunds remain visible without erasing a historical purchase. Reconcile Stripe references in the inbox after a provider interruption.</p></>}
 </main>;
}
