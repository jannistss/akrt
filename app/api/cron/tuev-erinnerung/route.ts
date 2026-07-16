import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { tuevErinnerungEmail } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();

  // Fetch setting for how many weeks in advance to remind
  const { data: settingRow } = await supabase
    .from("einstellungen")
    .select("value")
    .eq("key", "tuev_erinnerung_wochen")
    .single();
  const wochen = Number(settingRow?.value ?? 8);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + wochen * 7);
  const targetStr = targetDate.toISOString().split("T")[0];

  // Find vehicles whose TÜV falls exactly on the target date
  const { data: fahrzeuge, error } = await supabase
    .from("fahrzeuge")
    .select(`
      id, kennzeichen, marke, modell, tuev_datum,
      kunden!inner(id, vorname, nachname, email)
    `)
    .eq("tuev_datum", targetStr);

  if (error) {
    console.error("[cron/tuev] query error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  const results = [];

  for (const fz of fahrzeuge ?? []) {
    const kunde = Array.isArray(fz.kunden) ? fz.kunden[0] : fz.kunden;
    if (!kunde?.email) continue;

    const { subject, html, from } = tuevErinnerungEmail({
      vorname: kunde.vorname,
      nachname: kunde.nachname,
      kennzeichen: fz.kennzeichen,
      marke: fz.marke,
      modell: fz.modell,
      tuev_datum: new Date(fz.tuev_datum!).toLocaleDateString("de-DE"),
      wochen,
    });

    const { error: sendError } = await resend.emails.send({
      from,
      to: [kunde.email],
      subject,
      html,
    });

    // Log erinnerung
    await supabase.from("erinnerungen").insert({
      kunden_id: kunde.id,
      fahrzeug_id: fz.id,
      typ: "tuev",
      status: sendError ? "fehlgeschlagen" : "gesendet",
      geplant_am: new Date().toISOString(),
      gesendet_am: sendError ? null : new Date().toISOString(),
      betreff: subject,
      kanal: "email",
      fehler: sendError?.message ?? null,
    });

    results.push({ kennzeichen: fz.kennzeichen, email: kunde.email, ok: !sendError });
  }

  return Response.json({ processed: results.length, results });
}
