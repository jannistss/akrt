"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ─── KUNDEN ───────────────────────────────────────────────────────────────────

export async function getKunden(search?: string, status?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("kunden")
    .select("*, fahrzeuge(id, kennzeichen, marke, modell, tuev_datum), termine(id, datum, status)")
    .order("nachname");

  if (search) {
    query = query.or(`vorname.ilike.%${search}%,nachname.ilike.%${search}%,email.ilike.%${search}%,telefon.ilike.%${search}%`);
  }
  if (status && status !== "alle") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getKunde(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("kunden")
    .select("*, fahrzeuge(*), termine(*, fahrzeuge(kennzeichen, marke, modell)), rechnungen(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createKunde(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("kunden").insert({
    vorname: formData.get("vorname") as string,
    nachname: formData.get("nachname") as string,
    email: formData.get("email") as string || null,
    telefon: formData.get("telefon") as string || null,
    geburtstag: formData.get("geburtstag") as string || null,
    adresse: formData.get("adresse") as string || null,
    plz: formData.get("plz") as string || null,
    ort: formData.get("ort") as string || null,
    notizen: formData.get("notizen") as string || null,
    status: (formData.get("status") as string) || "aktiv",
  });
  if (error) throw error;
  revalidatePath("/admin/kunden");
}

export async function updateKunde(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("kunden").update({
    vorname: formData.get("vorname") as string,
    nachname: formData.get("nachname") as string,
    email: formData.get("email") as string || null,
    telefon: formData.get("telefon") as string || null,
    geburtstag: formData.get("geburtstag") as string || null,
    adresse: formData.get("adresse") as string || null,
    plz: formData.get("plz") as string || null,
    ort: formData.get("ort") as string || null,
    notizen: formData.get("notizen") as string || null,
    status: formData.get("status") as string,
  }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/kunden");
  revalidatePath(`/admin/kunden/${id}`);
}

export async function deleteKunde(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("kunden").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/kunden");
}

// ─── FAHRZEUGE ────────────────────────────────────────────────────────────────

export async function getFahrzeuge(kundenId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("fahrzeuge")
    .select("*, kunden(vorname, nachname, telefon)")
    .order("erstellt_am", { ascending: false });

  if (kundenId) query = query.eq("kunden_id", kundenId);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createFahrzeug(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("fahrzeuge").insert({
    kunden_id: formData.get("kunden_id") as string,
    kennzeichen: (formData.get("kennzeichen") as string).toUpperCase(),
    marke: formData.get("marke") as string,
    modell: formData.get("modell") as string,
    baujahr: formData.get("baujahr") ? Number(formData.get("baujahr")) : null,
    farbe: formData.get("farbe") as string || null,
    kraftstoff: formData.get("kraftstoff") as string || null,
    tuev_datum: formData.get("tuev_datum") as string || null,
    kilometerstand: formData.get("kilometerstand") ? Number(formData.get("kilometerstand")) : null,
    notizen: formData.get("notizen") as string || null,
  });
  if (error) throw error;
  revalidatePath("/admin/fahrzeuge");
  revalidatePath("/admin/kunden");
}

// ─── TERMINE ──────────────────────────────────────────────────────────────────

export async function getTermine(filter?: { status?: string; from?: string; to?: string }) {
  const supabase = await createClient();
  let query = supabase
    .from("termine")
    .select("*, kunden(vorname, nachname, telefon, email), fahrzeuge(kennzeichen, marke, modell)")
    .order("datum", { ascending: true });

  if (filter?.status && filter.status !== "alle") query = query.eq("status", filter.status);
  if (filter?.from) query = query.gte("datum", filter.from);
  if (filter?.to) query = query.lte("datum", filter.to);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function updateTerminStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("termine").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/termine");
  revalidatePath("/admin/dashboard");
}

// ─── RECHNUNGEN ───────────────────────────────────────────────────────────────

export async function getRechnungen(status?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("rechnungen")
    .select("*, kunden(vorname, nachname), fahrzeuge(kennzeichen, marke, modell)")
    .order("datum", { ascending: false });

  if (status && status !== "alle") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const supabase = await createClient();

  const [kundenRes, termineHeuteRes, offeneRechnungenRes, tuevFaelligRes, inaktiveRes, bewerbungenRes] = await Promise.all([
    supabase.from("kunden").select("id, status, letzter_besuch", { count: "exact" }),
    supabase.from("termine").select("id, status, leistung, datum, kunden(vorname, nachname)", { count: "exact" })
      .gte("datum", new Date().toISOString().split("T")[0])
      .lt("datum", new Date(Date.now() + 86400000).toISOString().split("T")[0]),
    supabase.from("rechnungen").select("id, betrag_netto, betrag_brutto", { count: "exact" })
      .eq("status", "offen"),
    supabase.from("fahrzeuge").select("id, kennzeichen, marke, modell, tuev_datum, kunden(vorname, nachname, telefon)")
      .lte("tuev_datum", new Date(Date.now() + 8 * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
      .gte("tuev_datum", new Date().toISOString().split("T")[0])
      .order("tuev_datum"),
    supabase.from("kunden").select("id, vorname, nachname, letzter_besuch")
      .lt("letzter_besuch", new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("bewerbungen").select("id, status", { count: "exact" }).eq("status", "neu"),
  ]);

  const umsatzRes = await supabase.from("rechnungen")
    .select("betrag_netto, betrag_brutto")
    .eq("status", "bezahlt")
    .gte("datum", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]);

  const umsatzMonat = (umsatzRes.data ?? []).reduce((sum, r) => sum + (r.betrag_brutto ?? r.betrag_netto * 1.19), 0);

  return {
    gesamtKunden: kundenRes.count ?? 0,
    termineHeute: termineHeuteRes.data ?? [],
    offeneRechnungen: offeneRechnungenRes.count ?? 0,
    offeneRechnungenBetrag: (offeneRechnungenRes.data ?? []).reduce((s, r) => s + (r.betrag_brutto ?? 0), 0),
    tuevFaellig: tuevFaelligRes.data ?? [],
    inaktiveKunden: inaktiveRes.data ?? [],
    umsatzMonat,
    neueBewerbungen: bewerbungenRes.count ?? 0,
  };
}

// ─── ERINNERUNGEN ─────────────────────────────────────────────────────────────

export async function getErinnerungen(status?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("erinnerungen")
    .select("*, kunden(vorname, nachname, email), fahrzeuge(kennzeichen, marke)")
    .order("geplant_am", { ascending: false });

  if (status && status !== "alle") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
