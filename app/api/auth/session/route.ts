import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { isConfiguredAdmin, SESSION_COOKIE_NAME } from "@/lib/admin-auth";

const FIVE_DAYS=60*60*24*5*1000;

export async function POST(request:Request){
  const {idToken}=await request.json() as {idToken?:string};
  if(!idToken) return NextResponse.json({error:"Missing sign-in token"},{status:400});
  const decoded=await getAdminAuth().verifyIdToken(idToken);
  if(!isConfiguredAdmin(decoded)) return NextResponse.json({error:"This account is not authorized."},{status:403});
  const session=await getAdminAuth().createSessionCookie(idToken,{expiresIn:FIVE_DAYS});
  const response=NextResponse.json({ok:true});
  response.cookies.set(SESSION_COOKIE_NAME,session,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:FIVE_DAYS/1000});
  return response;
}
