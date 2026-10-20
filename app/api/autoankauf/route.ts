import { NextRequest } from "next/server";
import { Resend } from "resend";
import { cleanVehicle, validateVehicleStep, vehicleSummary } from "@/lib/vehicle-data";
import { SITE_URL } from "@/lib/site-config";
import { DAY, getPurchaseDraft, limitPurchase, photoSignature, purchaseDb, purchaseFailure, purchaseJson, PurchaseError, requireOrigin } from "@/lib/autoankauf-server";

export const runtime = "nodejs";
export const maxDuration = 30;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
export async function POST(request: NextRequest) {
  try {
    requireOrigin(request);
    await limitPurchase(request, "submit", 5);
    if (Number(request.headers.get("content-length")) > 10000) throw new PurchaseError("Die Eingabe ist zu lang.");
    const body = await request.json();
    if (body.website) throw new PurchaseError("Die Anfrage konnte nicht verarbeitet werden.", 400);
    let draft = await getPurchaseDraft();
    if (draft.status === "sent" && draft.resend_id) return purchaseJson({ success: true });
    if (Date.now() - Date.parse(draft.created_at) < 4000) throw new PurchaseError("Bitte prüfe deine Angaben und versuche es erneut.");
    if (draft.status === "draft") {
      const payload = cleanVehicle(body.payload);
      for (let step = 0; step <= 10; step++) {
        const error = validateVehicleStep(step, payload);
        if (error) return purchaseJson({ error, step }, 400);
      }
      const expires_at = new Date(Date.now() + 30 * DAY).toISOString();
      const { data, error } = await purchaseDb().from("autoankauf_drafts").update({ payload, status: "sending", expires_at, step: 10 }).eq("id", draft.id).eq("status", "draft").select("id").maybeSingle();
      if (error || !data) throw new PurchaseError("Der Versand läuft bereits. Bitte prüfe den Status mit einem erneuten Versandversuch.", 409);
      draft = { ...draft, payload, status: "sending", expires_at };
    }
    // Keep retries identical while the provider outcome is uncertain; its deduplication window is 24 hours.
    if (Date.now() > Date.parse(draft.expires_at) - 30 * DAY + 23 * 3600000) throw new PurchaseError("Bitte kontaktiere uns telefonisch, damit wir den Versandstatus deiner Anfrage prüfen können.", 409);
    const data = draft.payload;
    const expires = Date.parse(draft.expires_at);
    const links = draft.images.map(photo => ({ name: photo.name, url: `${SITE_URL}/api/autoankauf/images?${new URLSearchParams({ path: photo.path, expires: String(expires), signature: photoSignature(photo.path, expires) })}` }));
    const rows = vehicleSummary(data).map(([label, value]) => `<tr><th style="text-align:left;padding:12px;border-bottom:1px solid #eef6fa;vertical-align:top">${escapeHtml(label)}</th><td style="padding:12px;border-bottom:1px solid #eef6fa;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Autoklinik Fahrzeugankauf <onboarding@resend.dev>",
      to: process.env.APPLICATION_EMAIL ?? "info@autoklinik-reutlingen.de",
      replyTo: data.email.trim(),
      subject: `Neue Autoankauf-Anfrage – ${data.brand} ${data.model} – ${data.year}`.replace(/[\r\n]/g, " "),
      text: `${vehicleSummary(data).map(([label, value]) => `${label}: ${value}`).join("\n")}\nFotos: ${links.length}\n${links.map(link => `${link.name}: ${link.url}`).join("\n")}\nDatenschutzhinweise bestätigt. Bildlinks sind 30 Tage gültig.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#002e40"><h1>Neue Autoankauf-Anfrage</h1><p>Autoklinik Reutlingen GmbH · Haldenhaustraße 3 · 72770 Reutlingen</p><table style="border-collapse:collapse;width:100%">${rows}</table><h2>Fahrzeugbilder (${links.length})</h2>${links.length ? `<ul>${links.map(link => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.name)}</a></li>`).join("")}</ul><p>Private Bildlinks: 30 Tage gültig. Bitte nicht öffentlich weitergeben.</p>` : "<p>Keine Bilder hinzugefügt.</p>"}<p>Datenschutzhinweise bestätigt. Anfrage kostenlos und unverbindlich.</p></div>`,
    }, { idempotencyKey: `autoankauf/${draft.id}` });
    if (result.error || !result.data?.id) {
      console.error("Autoankauf email rejected:", result.error?.name);
      throw new PurchaseError("Die Anfrage konnte nicht versendet werden. Deine Daten bleiben gespeichert. Bitte versuche es erneut oder rufe uns an.", 502);
    }
    const saved = await purchaseDb().from("autoankauf_drafts").update({ status: "sent", resend_id: result.data.id }).eq("id", draft.id);
    if (saved.error) throw new PurchaseError("Der Versandstatus wird noch geprüft. Bitte versuche es erneut; die Anfrage wird nicht doppelt gesendet.", 503);
    return purchaseJson({ success: true });
  } catch (error) { return purchaseFailure(error); }
}
