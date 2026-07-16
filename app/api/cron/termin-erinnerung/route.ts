import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { terminErinnerung } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();

  // Find appointments that are 24 hours from now (within a 1-hour window)
  const from = new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString();
  const to = new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString();

  const { data: termine, error } = await supabase
    .from("termine")
    .select(`
      id, leistung, datum,
      erinnerung_gesendet,
      kunden!inner(vorname, nachname, email)
    `)
    .in("status", ["ausstehend", "bestaetigt"])
    .eq("erinnerung_gesendet", false)
    .gte("datum", from)
    .lte("datum", to);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const results = [];

  for (const termin of termine ?? []) {
    const kunde = Array.isArray(termin.kunden) ? termin.kunden[0] : termin.kunden;
    if (!kunde?.email) continue;

    const terminDate = new Date(termin.datum);
    const datum = terminDate.toLocaleDateString("de-DE");
    const uhrzeit = terminDate.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

    const { subject, html, from: emailFrom } = terminErinnerung({
      vorname: kunde.vorname,
      nachname: kunde.nachname,
      leistung: termin.leistung,
      datum,
      uhrzeit,
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
        .update({ erinnerung_gesendet: true })
        .eq("id", termin.id);
    }

    results.push({ termin_id: termin.id, ok: !sendError });
  }

  return Response.json({ processed: results.length, results });
}
