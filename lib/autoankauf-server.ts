import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cleanVehicle, type VehicleData } from "@/lib/vehicle-data";

export type StoredPhoto = { id: string; path: string; name: string; type: string; size: number };
export type StoredDraft = { id: string; token_hash: string; payload: VehicleData; step: number; images: StoredPhoto[]; status: "draft" | "sending" | "sent"; resend_id: string | null; created_at: string; expires_at: string };
const COOKIE = "ak-purchase-draft";
export const DAY = 86400000;
export class PurchaseError extends Error { constructor(message: string, public status = 400) { super(message); } }
export function purchaseDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new PurchaseError("Der Anfragedienst ist gerade nicht verfügbar. Bitte versuche es später erneut.", 503);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
export const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export function requireOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host");
  if (!origin || (new URL(origin).host !== host && origin !== request.nextUrl.origin)) throw new PurchaseError("Bitte öffne die Anfrage auf unserer Website erneut.", 403);
}
export async function limitPurchase(request: NextRequest, action: string, limit: number, seconds = 900) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";
  const key = `${action}:${createHmac("sha256", salt).update(ip).digest("hex")}`;
  const { data, error } = await purchaseDb().rpc("autoankauf_allow", { p_key: key, p_limit: limit, p_seconds: seconds });
  if (error) throw new PurchaseError("Der Anfragedienst ist gerade nicht verfügbar.", 503);
  if (!data) throw new PurchaseError("Zu viele Versuche. Bitte warte einige Minuten und versuche es erneut.", 429);
}
export async function getPurchaseDraft(create = false): Promise<StoredDraft> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  const db = purchaseDb();
  if (token && /^[a-f0-9]{64}$/.test(token)) {
    const { data, error } = await db.from("autoankauf_drafts").select("id,token_hash,payload,step,images,status,resend_id,created_at,expires_at").eq("token_hash", hash(token)).gt("expires_at", new Date().toISOString()).maybeSingle();
    if (error) throw new PurchaseError("Dein Entwurf konnte nicht geladen werden.", 503);
    if (data) return { ...data, payload: cleanVehicle(data.payload) } as StoredDraft;
  }
  if (!create) throw new PurchaseError("Deine Sitzung ist abgelaufen. Bitte lade die Seite neu.", 401);
  const nextToken = randomBytes(32).toString("hex");
  const { data, error } = await db.from("autoankauf_drafts").insert({ token_hash: hash(nextToken) }).select("id,token_hash,payload,step,images,status,resend_id,created_at,expires_at").single();
  if (error) throw new PurchaseError("Dein Entwurf konnte nicht angelegt werden.", 503);
  jar.set(COOKIE, nextToken, { httpOnly: true, secure: true, sameSite: "none", path: "/", maxAge: 86400 });
  return { ...data, payload: cleanVehicle(data.payload) } as StoredDraft;
}
export function publicDraft(draft: StoredDraft) {
  return { payload: cleanVehicle(draft.payload), step: draft.step, status: draft.status, images: draft.images.map(image => ({ id: image.id, name: image.name, url: `/api/autoankauf/images?id=${image.id}` })) };
}
export function purchaseJson(body: unknown, status = 200) { return NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } }); }
export function purchaseFailure(error: unknown) {
  if (error instanceof PurchaseError) return purchaseJson({ error: error.message }, error.status);
  console.error("Autoankauf service failure", error instanceof Error ? error.message : "Unknown failure");
  return purchaseJson({ error: "Das hat leider nicht geklappt. Deine Angaben bleiben erhalten. Bitte versuche es erneut." }, 500);
}
export function photoSignature(path: string, expires: number) {
  const secret = process.env.BLOB_READ_WRITE_TOKEN;
  if (!secret) throw new PurchaseError("Der Bildspeicher ist gerade nicht verfügbar.", 503);
  return createHmac("sha256", secret).update(`${path}:${expires}`).digest("hex");
}
export function validPhotoSignature(path: string, expires: number, signature: string) {
  if (!Number.isFinite(expires) || expires < Date.now() || !/^[a-f0-9]{64}$/.test(signature) || !/^autoankauf\/[a-f0-9-]+\/[a-f0-9-]+\.(jpg|png|webp)$/.test(path)) return false;
  return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(photoSignature(path, expires), "hex"));
}
