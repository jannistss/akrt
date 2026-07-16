import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { geburtstagEmail } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // Match by month/day regardless of year using extract
  const { data: kunden, error } = await supabase
    .from("kunden")
    .select("id, vorname, nachname, email, geburtstag")
    .not("email", "is", null)
    .not("geburtstag", "is", null);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const geburtstagskinder = (kunden ?? []).filter((k) => {
    if (!k.geburtstag) return false;
    const bday = new Date(k.geburtstag);
    return bday.getMonth() + 1 === month && bday.getDate() === day;
  });

  const results = [];

  for (const k of geburtstagskinder) {
    const { subject, html, from } = geburtstagEmail({ vorname: k.vorname, nachname: k.nachname });

    const { error: sendError } = await resend.emails.send({
      from,
      to: [k.email!],
      subject,
      html,
    });

    await supabase.from("erinnerungen").insert({
      kunden_id: k.id,
      typ: "geburtstag",
      status: sendError ? "fehlgeschlagen" : "gesendet",
      geplant_am: new Date().toISOString(),
      gesendet_am: sendError ? null : new Date().toISOString(),
      betreff: subject,
      kanal: "email",
      fehler: sendError?.message ?? null,
    });

    results.push({ name: `${k.vorname} ${k.nachname}`, ok: !sendError });
  }

  return Response.json({ processed: results.length, results });
}
