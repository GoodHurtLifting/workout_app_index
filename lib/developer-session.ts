import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getAdminFirestore } from "@/lib/firebase-admin";
export const developerCookie = "wai-developer-draft";
export function newDeveloperAccess() {
  const secret = randomBytes(32).toString("hex");
  return { secret, hash: createHash("sha256").update(secret).digest("hex") };
}
export async function authorizedDeveloper() {
  const value = (await cookies()).get(developerCookie)?.value ?? "";
  const [id, secret] = value.split(".");
  if (!/^[A-Za-z0-9]{20}$/.test(id ?? "") || !/^[a-f0-9]{64}$/.test(secret ?? "")) return null;
  const ref = getAdminFirestore().collection("editorialRequests").doc(id);
  const saved = await ref.get();
  const hash = saved.data()?.developerAccessHash;
  const actual = createHash("sha256").update(secret).digest();
  if (typeof hash !== "string" || !/^[a-f0-9]{64}$/.test(hash) || !timingSafeEqual(Buffer.from(hash, "hex"), actual)) return null;
  if (saved.data()?.submissionVersion !== "developer-1" || !(saved.data()?.developerAccessExpiresAt > Date.now())) return null;
  return { id, ref, data: saved.data()! };
}
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) throw new Error("Invalid request origin");
}
