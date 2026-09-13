import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

function configuredAdminId(): string | undefined {
  return (env as unknown as Record<string, string | undefined>).ADMIN_USER_ID;
}

function configuredAdminEmail(): string | undefined {
  return (env as unknown as Record<string, string | undefined>).ADMIN_EMAIL?.trim().toLowerCase();
}

function isConfiguredAdmin(user:{userId:string;email:string}):boolean {
  const id=configuredAdminId();
  const email=configuredAdminEmail();
  return Boolean((id&&user.userId===id)||(email&&user.email.trim().toLowerCase()===email));
}

export async function requireCatalogAdmin(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  if (!isConfiguredAdmin(user)) notFound();
  return user;
}

export async function getCatalogAdminForAction() {
  const user = await getChatGPTUser();
  if (!user || !isConfiguredAdmin(user)) throw new Error("Not authorized");
  return user;
}
