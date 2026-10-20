import { del, get, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { MAX_IMAGE_BYTES, MAX_PHOTOS } from "@/lib/vehicle-data";
import { getPurchaseDraft, limitPurchase, publicDraft, purchaseDb, purchaseFailure, purchaseJson, PurchaseError, requireOrigin, validPhotoSignature } from "@/lib/autoankauf-server";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    requireOrigin(request);
    await limitPurchase(request, "photo-upload", 40);
    if (Number(request.headers.get("content-length")) > MAX_IMAGE_BYTES + 20000) throw new PurchaseError("Bitte verwende Bilder bis 4 MB.", 413);
    const draft = await getPurchaseDraft();
    if (draft.status !== "draft") throw new PurchaseError("Diese Anfrage wird bereits bearbeitet.", 409);
    if (draft.images.length >= MAX_PHOTOS) throw new PurchaseError(`Du kannst bis zu ${MAX_PHOTOS} Fotos hinzufügen.`);
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File) || !file.size || file.size > MAX_IMAGE_BYTES) throw new PurchaseError("Bitte wähle ein Bild bis 4 MB.");
    const bytes = Buffer.from(await file.arrayBuffer());
    const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const webp = bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
    const type = png ? "image/png" : jpg ? "image/jpeg" : webp ? "image/webp" : "";
    if (!type || type !== file.type) throw new PurchaseError("Bitte verwende ein gültiges JPG-, PNG- oder WebP-Bild.");
    const id = randomUUID(), ext = png ? "png" : jpg ? "jpg" : "webp";
    const blob = await put(`autoankauf/${draft.id}/${id}.${ext}`, bytes, { access: "private", contentType: type, addRandomSuffix: false });
    const photo = { id, path: blob.pathname, name: file.name.replace(/[^\p{L}\p{N} ._-]/gu, "_").slice(0, 100), type, size: file.size };
    const images = [...draft.images, photo];
    const { data, error } = await purchaseDb().from("autoankauf_drafts").update({ images }).eq("id", draft.id).eq("status", "draft").eq("images", JSON.stringify(draft.images)).select("id").maybeSingle();
    if (error || !data) {
      await del(blob.pathname);
      throw new PurchaseError("Das Bild konnte nicht gespeichert werden. Bitte versuche es erneut.", 409);
    }
    return purchaseJson({ images: publicDraft({ ...draft, images }).images });
  } catch (error) { return purchaseFailure(error); }
}
export async function DELETE(request: NextRequest) {
  try {
    requireOrigin(request);
    await limitPurchase(request, "photo-delete", 60);
    const draft = await getPurchaseDraft();
    if (draft.status !== "draft") throw new PurchaseError("Diese Anfrage wird bereits bearbeitet.", 409);
    const id = request.nextUrl.searchParams.get("id");
    const photo = draft.images.find(item => item.id === id);
    if (!photo) throw new PurchaseError("Bild nicht gefunden.", 404);
    const images = draft.images.filter(item => item.id !== id);
    const { data, error } = await purchaseDb().from("autoankauf_drafts").update({ images }).eq("id", draft.id).eq("status", "draft").eq("images", JSON.stringify(draft.images)).select("id").maybeSingle();
    if (error || !data) throw new PurchaseError("Das Bild konnte nicht entfernt werden.", 409);
    await del(photo.path);
    return purchaseJson({ images: publicDraft({ ...draft, images }).images });
  } catch (error) { return purchaseFailure(error); }
}
export async function GET(request: NextRequest) {
  try {
    let path = request.nextUrl.searchParams.get("path") || "";
    const expires = Number(request.nextUrl.searchParams.get("expires"));
    const signature = request.nextUrl.searchParams.get("signature") || "";
    if (!validPhotoSignature(path, expires, signature)) {
      const draft = await getPurchaseDraft();
      path = draft.images.find(image => image.id === request.nextUrl.searchParams.get("id"))?.path || "";
      if (!path) throw new PurchaseError("Kein Zugriff auf dieses Bild.", 403);
    }
    const result = await get(path, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) throw new PurchaseError("Bild nicht gefunden.", 404);
    return new NextResponse(result.stream, { headers: { "Content-Type": result.blob.contentType, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", "Content-Disposition": "inline" } });
  } catch (error) { return purchaseFailure(error); }
}
