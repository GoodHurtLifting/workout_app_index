import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "@/lib/firebase-admin";

export const SESSION_COOKIE_NAME="workout_app_index_session";

function configuredAdminEmail(): string | undefined {
  return process.env.CATALOG_ADMIN_EMAIL?.trim().toLowerCase();
}

export function isConfiguredAdmin(user:{uid:string;email?:string;email_verified?:boolean;firebase?:{sign_in_provider?:string}}):boolean {
  const email=configuredAdminEmail();
  return Boolean(email&&user.email?.trim().toLowerCase()===email&&user.email_verified===true&&user.firebase?.sign_in_provider==="google.com");
}

export async function getCatalogAdmin(){
  const session=(await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if(!session) return null;
  try {
    const decoded=await getAdminAuth().verifySessionCookie(session,true);
    if(!isConfiguredAdmin(decoded)) return null;
    return {userId:decoded.uid,email:decoded.email??"",displayName:decoded.name??decoded.email??"Administrator"};
  } catch { return null; }
}

export async function requireCatalogAdmin(returnTo: string) {
  const user = await getCatalogAdmin();
  if (!user) redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
  return user;
}

export async function getCatalogAdminForAction() {
  const user = await getCatalogAdmin();
  if (!user) throw new Error("Not authorized");
  return user;
}
