import "server-only";
import type {DocumentSnapshot} from "firebase-admin/firestore";
import {getAdminFirestore} from "@/lib/firebase-admin";
import {developerCohorts,conversionWindowDays,type CohortRecord} from "@/lib/developer-report";
export async function getDeveloperReport(start:string,end:string,includeTest=false) {
 const valid=(value:string)=>/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;
 if(!valid(start)||!valid(end)) throw new RangeError("Use start and end dates as YYYY-MM-DD.");
 const from=Date.parse(start),to=Date.parse(end)+86400000;
 if(to<=from || to-from>90*86400000) throw new RangeError("Choose one to 90 days.");
 const db=getAdminFirestore();
 const rows=await db.collection("editorialRequests").where("pageOneCompletedAt",">=",from).where("pageOneCompletedAt","<",to)
  .limit(10001).select("pageOneCompletedAt","serviceInquiryAt","checkoutStartedAt","listingPurchasedAt","engagement","testData").get();
 if(rows.size>10000) throw new RangeError("Too many requests. Choose a smaller date range.");
 const refs=rows.docs.map(row=>db.collection("listingOrders").doc(`${row.id}-listing`));
 const orders:DocumentSnapshot[]=[];
 for(let offset=0;offset<refs.length;offset+=250) orders.push(...await db.getAll(...refs.slice(offset,offset+250)));
 const records=rows.docs.map((row,index)=>({...row.data(),order:orders[index]?.data()}) as CohortRecord);
 return {source:"saved requests and reconciled payments",conversionWindowDays,includeTest,start,end,asOf:new Date().toISOString(),cohorts:developerCohorts(records,Date.now(),includeTest)};
}
