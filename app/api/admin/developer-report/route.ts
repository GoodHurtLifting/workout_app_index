import {NextResponse,type NextRequest} from "next/server";
import {getCatalogAdmin} from "@/lib/admin-auth";
import {getDeveloperReport} from "@/lib/developer-report-repository";
export async function GET(request:NextRequest) {
 if(!(await getCatalogAdmin())) return NextResponse.json({ok:false},{status:401});
 try {
  const report=await getDeveloperReport(request.nextUrl.searchParams.get("start")??"",request.nextUrl.searchParams.get("end")??"",request.nextUrl.searchParams.get("includeTest")==="true");
  return NextResponse.json(report,{headers:{"Cache-Control":"no-store"}});
 } catch(error) {
  return NextResponse.json({message:error instanceof RangeError ? error.message : "Report unavailable. Please try again."},{status:error instanceof RangeError?400:503,headers:{"Cache-Control":"no-store"}});
 }
}
