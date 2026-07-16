import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { bewertungsanfrageEmail } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();

  const { data: settingRow } = await supabase
    .from("einstellungen")
    .select("value")
    .eq("key", "bewertung_stunden_nach_termin")
    .single();
  const stunden = Number(settingRow?.value ?? 24);

  // Find completed appointments where review request not yet sent, in the right time window
  const from = new Date(Date.now() - (stunden + 1) * 60 * 60 * 1000).toISOString();
  const to = new Date(Date.now() - stunden * 60 * 60 * 1000).toISOString();

  const { data: termine, error } = await supabase
    .from("termine")
    .select(`
      id, leistung, datum,
      bewertungsanfrage_gesendet,
      kunden!inner(id, vorname, nachname, email)
    `)
    .eq("status", "abgeschlossen")
    .eq("bewertungsanfrage_gesendet", false)
    .gte("datum", from)
    .lte("datum", to);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const results = [];

  for (const termin of termine ?? []) {
    const kunde = Array.isArray(termin.kunden) ? termin.kunden[0] : termin.kunden;
    if (!kunde?.email) continue;

    const { subject, html, from: emailFrom } = bewertungsanfrageEmail({
      vorname: kunde.vorname,
      nachname: kunde.nachname,
      leistung: termin.leistung,
    });

    const { error: sendError } = await resend.emails.send({
      from: emailFrom,
      to: [kunde.email],
      subject,
      html,
    });

    if (!sendError) {
      await supabase
        .from("termine")
        .update({ bewertungsanfrage_gesendet: true })
        .eq("id", termin.id);

      await supabase.from("erinnerungen").insert({
        kunden_id: kunde?.id ?? null,
        typ: "bewertungsanfrage",
        status: "gesendet",
        geplant_am: new Date().toISOString(),
        gesendet_am: new Date().toISOString(),
        betreff: subject,
        kanal: "email",
      });
    }

    results.push({ termin_id: termin.id, ok: !sendError });
  }

  return Response.json({ processed: results.length, results });
}
