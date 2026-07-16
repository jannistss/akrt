import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { reaktivierungEmail } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();

  const { data: settingRow } = await supabase
    .from("einstellungen")
    .select("value")
    .eq("key", "reaktivierung_tage")
    .single();
  const tage = Number(settingRow?.value ?? 90);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - tage);

  const { data: kunden, error } = await supabase
    .from("kunden")
    .select("id, vorname, nachname, email, letzter_besuch, status")
    .eq("status", "aktiv")
    .not("email", "is", null)
    .lt("letzter_besuch", cutoff.toISOString());

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const results = [];

  for (const k of kunden ?? []) {
    // Check we haven't sent a reaktivierung in the last 90 days already
    const { data: recent } = await supabase
      .from("erinnerungen")
      .select("id")
      .eq("kunden_id", k.id)
      .eq("typ", "reaktivierung")
      .eq("status", "gesendet")
      .gte("gesendet_am", cutoff.toISOString())
      .limit(1);

    if (recent && recent.length > 0) continue;

    const tageInaktiv = Math.floor(
      (Date.now() - new Date(k.letzter_besuch ?? "").getTime()) / (1000 * 60 * 60 * 24)
    );

    const { subject, html, from } = reaktivierungEmail({
      vorname: k.vorname,
      nachname: k.nachname,
      tage_inaktiv: tageInaktiv,
    });

    const { error: sendError } = await resend.emails.send({
      from,
      to: [k.email!],
      subject,
      html,
    });

    await supabase.from("erinnerungen").insert({
      kunden_id: k.id,
      typ: "reaktivierung",
      status: sendError ? "fehlgeschlagen" : "gesendet",
      geplant_am: new Date().toISOString(),
      gesendet_am: sendError ? null : new Date().toISOString(),
      betreff: subject,
      kanal: "email",
      fehler: sendError?.message ?? null,
    });

    results.push({ name: `${k.vorname} ${k.nachname}`, tageInaktiv, ok: !sendError });
  }

  return Response.json({ processed: results.length, results });
}
