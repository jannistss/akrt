import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

// Expected CSV columns (Repdoc export format):
// Kundennummer, Vorname, Nachname, Email, Telefon, Geburtstag, Adresse, PLZ, Ort,
// Kennzeichen, Marke, Modell, Baujahr, Kraftstoff, TUeV-Datum, Kilometerstand, Repdoc-ID

function parseRow(headers: string[], values: string[]): Record<string, string> {
  const row: Record<string, string> = {};
  headers.forEach((h, i) => {
    row[h.trim().toLowerCase().replace(/[^a-z0-9]/g, "_")] = (values[i] ?? "").trim();
  });
  return row;
}

function parseDate(val: string): string | null {
  if (!val) return null;
  // Try DD.MM.YYYY
  const de = val.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (de) return `${de[3]}-${de[2].padStart(2, "0")}-${de[1].padStart(2, "0")}`;
  // Try YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
  return null;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Verify admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return Response.json({ error: "Keine Datei übermittelt" }, { status: 400 });

  const text = await file.text();
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return Response.json({ error: "CSV ist leer oder hat nur Header" }, { status: 400 });

  // Detect separator (comma or semicolon)
  const sep = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(sep);

  // Create import log entry
  const { data: logEntry } = await supabase
    .from("repdoc_import_log")
    .insert({
      dateiname: file.name,
      typ: "csv",
      status: "verarbeitung",
    })
    .select()
    .single();

  let kundenImportiert = 0;
  let fahrzeugeImportiert = 0;
  const fehler: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(sep);
    const row = parseRow(headers, values);

    // Skip empty rows
    if (!row.nachname && !row.vorname) continue;

    try {
      // Upsert Kunde by repdoc_id or email
      const kundeData = {
        vorname: row.vorname || row.firstname || "",
        nachname: row.nachname || row.lastname || "",
        email: row.email || row.e_mail || null,
        telefon: row.telefon || row.phone || null,
        geburtstag: parseDate(row.geburtstag || row.birthday || ""),
        adresse: row.adresse || row.strasse || null,
        plz: row.plz || row.postleitzahl || null,
        ort: row.ort || row.stadt || null,
        repdoc_id: row.repdoc_id || row.kundennummer || null,
      };

      let kundeId: string | null = null;

      // Try to find existing by repdoc_id
      if (kundeData.repdoc_id) {
        const { data: existing } = await supabase
          .from("kunden")
          .select("id")
          .eq("repdoc_id", kundeData.repdoc_id)
          .single();

        if (existing) {
          await supabase.from("kunden").update(kundeData).eq("id", existing.id);
          kundeId = existing.id;
        }
      }

      // Try by email if no match yet
      if (!kundeId && kundeData.email) {
        const { data: existing } = await supabase
          .from("kunden")
          .select("id")
          .eq("email", kundeData.email)
          .single();

        if (existing) {
          await supabase.from("kunden").update(kundeData).eq("id", existing.id);
          kundeId = existing.id;
        }
      }

      // Insert new
      if (!kundeId) {
        const { data: newKunde, error: insertErr } = await supabase
          .from("kunden")
          .insert(kundeData)
          .select("id")
          .single();

        if (insertErr) {
          fehler.push(`Zeile ${i + 1}: ${insertErr.message}`);
          continue;
        }
        kundeId = newKunde!.id;
        kundenImportiert++;
      }

      // Import vehicle if kennzeichen present
      const kennzeichen = row.kennzeichen || row.kfz_kennzeichen;
      if (kennzeichen && kundeId) {
        const fahrzeugData = {
          kunden_id: kundeId,
          kennzeichen,
          marke: row.marke || row.hersteller || "Unbekannt",
          modell: row.modell || "Unbekannt",
          baujahr: row.baujahr ? parseInt(row.baujahr) : null,
          kraftstoff: (row.kraftstoff || "").toLowerCase() as "benzin" | "diesel" | "elektro" | "hybrid" | "gas" | "sonstige" | undefined,
          tuev_datum: parseDate(row.t_v_datum || row.tuev_datum || row.hu_datum || ""),
          kilometerstand: row.kilometerstand ? parseInt(row.kilometerstand.replace(/\D/g, "")) : null,
          repdoc_id: row.repdoc_id || null,
        };

        const { data: existingFz } = await supabase
          .from("fahrzeuge")
          .select("id")
          .eq("kennzeichen", kennzeichen)
          .eq("kunden_id", kundeId)
          .single();

        if (existingFz) {
          await supabase.from("fahrzeuge").update(fahrzeugData).eq("id", existingFz.id);
        } else {
          const { error: fzErr } = await supabase.from("fahrzeuge").insert(fahrzeugData);
          if (!fzErr) fahrzeugeImportiert++;
          else fehler.push(`Zeile ${i + 1} Fahrzeug: ${fzErr.message}`);
        }
      }
    } catch (e: unknown) {
      fehler.push(`Zeile ${i + 1}: ${e instanceof Error ? e.message : "Unbekannter Fehler"}`);
    }
  }

  // Update log
  await supabase
    .from("repdoc_import_log")
    .update({
      status: fehler.length > 0 && kundenImportiert === 0 ? "fehlgeschlagen" : "abgeschlossen",
      kunden_importiert: kundenImportiert,
      fahrzeuge_importiert: fahrzeugeImportiert,
      fehler: fehler.length > 0 ? fehler : null,
    })
    .eq("id", logEntry?.id);

  return Response.json({
    success: true,
    kunden_importiert: kundenImportiert,
    fahrzeuge_importiert: fahrzeugeImportiert,
    fehler_anzahl: fehler.length,
    fehler: fehler.slice(0, 20),
  });
}
