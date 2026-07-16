import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CalendarDays, Plus } from "lucide-react";

export const metadata = { title: "Meine Termine | Autoklinik Reutlingen" };

export default async function PortalTerminePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: kunde } = await supabase
    .from("kunden").select("id").eq("portal_user_id", user!.id).single();

  type Termin = {
    id: string;
    datum: string;
    leistung: string;
    status: string;
    notizen: string | null;
    fahrzeuge: { marke: string; modell: string; kennzeichen: string }[] | null;
  };

  const { data: termine } = (kunde
    ? await supabase
        .from("termine")
        .select("id, datum, leistung, status, notizen, fahrzeuge(marke, modell, kennzeichen)")
        .eq("kunden_id", kunde.id)
        .order("datum", { ascending: false })
    : { data: [] as Termin[] }) as { data: Termin[] | null };

  const statusColors: Record<string, { bg: string; text: string }> = {
    ausstehend:      { bg: "#fef9c3", text: "#92400e" },
    bestaetigt:      { bg: "#dbeafe", text: "#1e40af" },
    abgeschlossen:   { bg: "#dcfce7", text: "#166534" },
    storniert:       { bg: "#fee2e2", text: "#991b1b" },
    nicht_erschienen:{ bg: "#f1f5f9", text: "#475569" },
  };

  const upcoming = (termine ?? []).filter((t) => new Date(t.datum) >= new Date() && t.status !== "storniert");
  const past = (termine ?? []).filter((t) => new Date(t.datum) < new Date() || t.status === "abgeschlossen");

  const cardStyle = { backgroundColor: "#ffffff", borderRadius: 12, border: "1px solid #dde9f0", overflow: "hidden" };

  function TerminRow({ t }: { t: Termin }) {
    const st = statusColors[t.status] ?? { bg: "#f1f5f9", text: "#475569" };
    const fz = Array.isArray(t.fahrzeuge) ? t.fahrzeuge[0] : t.fahrzeuge;
    return (
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #e8f0f5", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#e8f4fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CalendarDays size={18} style={{ color: "#0074a2" }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1e3a4a", margin: "0 0 2px" }}>{t.leistung}</p>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
              {new Date(t.datum).toLocaleDateString("de-DE", { weekday: "short", year: "numeric", month: "long", day: "numeric" })}
              {" · "}
              {new Date(t.datum).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
              {fz && ` · ${fz.marke} ${fz.modell} (${fz.kennzeichen})`}
            </p>
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: st.text, backgroundColor: st.bg, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap", textTransform: "capitalize" }}>
          {t.status.replace("_", " ")}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#002e40", margin: "0 0 4px" }}>Meine Termine</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Alle Werkstatttermine auf einen Blick.</p>
        </div>
        <Link
          href="/terminbuchung"
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", backgroundColor: "#002e40", color: "#ffffff", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
        >
          <Plus size={14} /> Termin buchen
        </Link>
      </div>

      {!termine?.length ? (
        <div style={{ ...cardStyle, padding: 40, textAlign: "center" }}>
          <CalendarDays size={32} style={{ color: "#dde9f0", margin: "0 auto 12px" }} />
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Noch keine Termine vorhanden.</p>
          <Link href="/terminbuchung" style={{ fontSize: 13, color: "#0074a2", fontWeight: 600 }}>Jetzt Termin buchen</Link>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 10 }}>Bevorstehend</p>
              <div style={cardStyle}>
                {upcoming.map((t) => <TerminRow key={t.id} t={t} />)}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 10 }}>Vergangen</p>
              <div style={cardStyle}>
                {past.map((t) => <TerminRow key={t.id} t={t} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
