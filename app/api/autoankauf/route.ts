import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_FILE_SIZE = 15 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic"]);
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textValue(formData: FormData, key: string, maxLength = 240): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function fieldRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding:11px 0;border-bottom:1px solid #e5eef3;color:#64849a;font-size:13px;width:38%;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:11px 0;border-bottom:1px solid #e5eef3;color:#002e40;font-size:14px;vertical-align:top;">${escapeHtml(value).replaceAll("\n", "<br />")}</td></tr>`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allowRequest(ip)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuche es später erneut." }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    if (textValue(formData, "website", 120)) {
      return NextResponse.json({ success: true });
    }

    const firstName = textValue(formData, "firstName", 80);
    const lastName = textValue(formData, "lastName", 100);
    const email = textValue(formData, "email", 160);
    const phone = textValue(formData, "phone", 60);
    const postalCode = textValue(formData, "postalCode", 10);
    const city = textValue(formData, "city", 80);
    const brand = textValue(formData, "vehicleBrand", 80);
    const model = textValue(formData, "vehicleModel", 100);
    const customVehicle = textValue(formData, "customVehicle", 180);
    const vehicleLabel = [brand, model].filter(Boolean).join(" ") || customVehicle;

    const mileage = Number(textValue(formData, "mileage"));
    const firstRegistration = textValue(formData, "firstRegistration");
    const fuel = textValue(formData, "fuel");
    const transmission = textValue(formData, "transmission");
    const bodyType = textValue(formData, "bodyType");

    if (!firstName || !lastName || !email || !phone || !postalCode || !city || !vehicleLabel || !firstRegistration || !fuel || !transmission || !bodyType) {
      return NextResponse.json({ error: "Bitte fülle alle Pflichtfelder aus." }, { status: 400 });
    }
    if (!Number.isFinite(mileage) || mileage < 0 || mileage > 2000000) {
      return NextResponse.json({ error: "Bitte gib einen plausiblen Kilometerstand ein." }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}$/.test(firstRegistration)) {
      return NextResponse.json({ error: "Bitte gib eine gültige Erstzulassung an." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 });
    }
    if (formData.get("privacy") !== "true") {
      return NextResponse.json({ error: "Bitte bestätige die Datenschutzhinweise." }, { status: 400 });
    }

    const imageEntries = formData.getAll("images").filter((entry): entry is File => typeof entry !== "string" && "arrayBuffer" in entry);
    if (imageEntries.length > MAX_FILES) {
      return NextResponse.json({ error: "Bitte übermittle maximal fünf Bilder." }, { status: 400 });
    }

    let totalFileSize = 0;
    const attachments = [] as Array<{ filename: string; content: Buffer; contentType: string }>;
    for (const file of imageEntries) {
      if (!ALLOWED_IMAGE_TYPES.has(file.type) || file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Bitte nutze JPG-, PNG-, WEBP- oder HEIC-Bilder bis jeweils 5 MB." }, { status: 400 });
      }
      totalFileSize += file.size;
      if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
        return NextResponse.json({ error: "Die Bilder dürfen zusammen maximal 15 MB groß sein." }, { status: 400 });
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) || "fahrzeugfoto";
      attachments.push({ filename: safeName, content: Buffer.from(await file.arrayBuffer()), contentType: file.type });
    }

    const fields = [
      ["Fahrzeug", vehicleLabel],
      ["Variante", textValue(formData, "vehicleVariant")],
      ["Erstzulassung", firstRegistration],
      ["Kilometerstand", `${mileage} km`],
      ["Kraftstoff", fuel],
      ["Getriebe", transmission],
      ["Motorisierung", textValue(formData, "engine")],
      ["Leistung", textValue(formData, "power")],
      ["Karosserie", bodyType],
      ["Vorbesitzer", textValue(formData, "previousOwners")],
      ["Allgemeiner Zustand", textValue(formData, "condition")],
      ["Unfall / Vorschäden", textValue(formData, "accidentStatus")],
      ["Motor / Getriebe", textValue(formData, "damage")],
      ["Fahrbereit", textValue(formData, "driveable")],
      ["TÜV gültig bis", textValue(formData, "tuev")],
      ["Scheckheft", textValue(formData, "serviceBook")],
      ["Weitere Mängel", textValue(formData, "defects")],
      ["Sonderausstattung", textValue(formData, "equipment")],
      ["Preisvorstellung", textValue(formData, "price") ? `${textValue(formData, "price")} €` : ""],
      ["Bemerkungen", textValue(formData, "notes")],
    ] as const;

    const contactFields = [
      ["Name", `${firstName} ${lastName}`],
      ["E-Mail", email],
      ["Telefon", phone],
      ["PLZ / Ort", `${postalCode} ${city}`],
      ["Rückrufzeitraum", textValue(formData, "callbackTime")],
    ] as const;

    const subjectYear = textValue(formData, "firstRegistration").slice(0, 4);
    const subject = `Neue Autoankauf-Anfrage – ${vehicleLabel}${subjectYear ? ` – ${subjectYear}` : ""}`;
    const to = process.env.APPLICATION_EMAIL ?? "info@autoklinik-reutlingen.de";
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Autoklinik Fahrzeugankauf <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject,
      attachments: attachments.length ? attachments : undefined,
      html: `<!doctype html><html lang="de"><body style="margin:0;background:#f0f6fa;font-family:Arial,sans-serif;color:#002e40;padding:24px;"><div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #d5e8f0;border-radius:16px;overflow:hidden;"><header style="background:#002e40;padding:28px 32px;color:#fff;"><p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.65;">Autoklinik Reutlingen</p><h1 style="margin:8px 0 0;font-size:23px;">Neue Autoankauf-Anfrage</h1></header><main style="padding:28px 32px;"><h2 style="margin:0 0 12px;font-size:17px;">Fahrzeugdaten</h2><table style="width:100%;border-collapse:collapse;">${fields.map(([label, value]) => fieldRow(label, value)).join("")}</table><h2 style="margin:28px 0 12px;font-size:17px;">Kontakt</h2><table style="width:100%;border-collapse:collapse;">${contactFields.map(([label, value]) => fieldRow(label, value)).join("")}</table><p style="margin:22px 0 0;padding:14px 16px;background:#eef6fa;border-radius:10px;color:#4a6272;font-size:13px;line-height:1.6;">${attachments.length ? `${attachments.length} Fahrzeugfoto(s) sind dieser E-Mail angehängt.` : "Es wurden keine Fahrzeugfotos übermittelt."}</p></main><footer style="padding:18px 32px;background:#f8fafc;color:#64849a;font-size:12px;">Haldenhaustraße 3 · 72770 Reutlingen · ${escapeHtml(process.env.APPLICATION_EMAIL ?? "info@autoklinik-reutlingen.de")}</footer></div></body></html>`,
    });

    if (result.error) {
      console.error("[v0] /api/autoankauf Resend error:", result.error);
      return NextResponse.json({ error: "Die Anfrage konnte nicht versendet werden." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] /api/autoankauf error:", error);
    return NextResponse.json({ error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut." }, { status: 500 });
  }
}
