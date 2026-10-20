import { NextRequest } from "next/server";
import { cleanVehicle } from "@/lib/vehicle-data";
import { getPurchaseDraft, limitPurchase, publicDraft, purchaseDb, purchaseFailure, purchaseJson, PurchaseError, requireOrigin } from "@/lib/autoankauf-server";

export async function GET(request: NextRequest) {
  try {
    await limitPurchase(request, "draft-read", 120);
    return purchaseJson(publicDraft(await getPurchaseDraft(true)));
  } catch (error) { return purchaseFailure(error); }
}
export async function PUT(request: NextRequest) {
  try {
    requireOrigin(request);
    await limitPurchase(request, "draft-write", 400);
    if (Number(request.headers.get("content-length")) > 10000) throw new PurchaseError("Die Eingabe ist zu lang.");
    const draft = await getPurchaseDraft();
    if (draft.status !== "draft") throw new PurchaseError("Diese Anfrage wird bereits versendet. Bitte versuche den Versand erneut, um den Status zu prüfen.", 409);
    const body = await request.json();
    const payload = cleanVehicle(body.payload);
    const step = Number.isInteger(body.step) && body.step >= 0 && body.step <= 10 ? body.step : draft.step;
    const { data, error } = await purchaseDb().from("autoankauf_drafts").update({ payload, step }).eq("id", draft.id).eq("status", "draft").select("id").maybeSingle();
    if (error || !data) throw new PurchaseError("Dein Entwurf konnte nicht gespeichert werden. Bitte versuche es erneut.", 503);
    return purchaseJson({ saved: true });
  } catch (error) { return purchaseFailure(error); }
}
