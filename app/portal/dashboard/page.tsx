import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Calendar, Car, FileText, ChevronRight } from "lucide-react";

export const metadata = { title: "Mein Bereich | Autoklinik Reutlingen" };

export default async function PortalDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: kunde } = await supabase
    .from("kunden")
    .select("id, vorname, nachname, email")
    .eq("portal_user_id", user!.id)
    .single();

  // If no linked customer yet, show a friendly message
  if (!kunde) {
    return (
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#002e40", margin: "0 0 8px" }}>
          Willkommen!
        </h1>
        <div style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: 28, border: "1px solid #dde9f0", marginTop: 24 }}>
          <p style={{ fontSize: 15, color: "#64849a", lineHeight: 1.7, margin: 0 }}>
            Ihr Kundenkonto ist noch nicht mit einem Werkstattprofil verknüpft. Bitte kontaktieren Sie uns kurz unter{" "}
            <a href="mailto:info@autoklinik-reutlingen.de" style={{ color: "#0074a2" }}>info@autoklinik-reutlingen.de</a>{" "}
            mit Ihrer E-Mail-Adresse, damit wir die Verknüpfung vornehmen können.
          </p>
        </div>
      </div>
    );
  }

  const [{ data: termine }, { data: fahrzeuge }, { data: rechnungen }] = await Promise.all([
    supabase.from("termine").select("id, datum, leistung, status").eq("kunden_id", kunde.id).order("datum", { ascending: false }).limit(3),
    supabase.from("fahrzeuge").select("id, marke, modell, kennzeichen, tuev_datum").eq("kunden_id", kunde.id).limit(6),
    supabase.from("rechnungen").select("id, rechnungsnummer, datum, betrag_brutto, status").eq("kunden_id", kunde.id).order("datum", { ascending: false }).limit(3),
  ]);

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    border: "1px solid #dde9f0",
    padding: "20px 24px",
  };

  const statusColors: Record<string, string> = {
    ausstehend: "#fbbf24", bestaetigt: "#60a5fa", abgeschlossen: "#4ade80",
    storniert: "#f87171", nicht_erschienen: "#94a3b8",
    offen: "#fbbf24", bezahlt: "#4ade80", ueberfaellig: "#f87171",
  };

  return (
    <div>
      {/* Greeting */}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#002e40", margin: "0 0 4px" }}>
        Hallo, {kunde.vorname}!
      </h1>
      <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 32px" }}>
        Ihr persönlicher Bereich bei der Autoklinik Reutlingen.
      </p>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
        {[
          { href: "/portal/termine", label: "Meine Termine", icon: Calendar, count: termine?.length ?? 0 },
          { href: "/portal/fahrzeuge", label: "Meine Fahrzeuge", icon: Car, count: fahrzeuge?.length ?? 0 },
          { href: "/portal/rechnungen", label: "Rechnungen", icon: FileText, count: rechnungen?.length ?? 0 },
        ].map(({ href, label, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}
            className="hover:shadow-md transition-shadow"
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "#e8f4fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={20} style={{ color: "#0074a2" }} />
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 2px" }}>{label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#002e40", margin: 0 }}>{count}</p>
            </div>
            <ChevronRight size={16} style={{ color: "#94a3b8", marginLeft: "auto" }} />
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Termine */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 13, fontWeight: 600, color: "#002e40", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Letzte Termine</p>
            <Link href="/portal/termine" style={{ fontSize: 12, color: "#0074a2" }}>Alle</Link>
          </div>
          {!termine?.length ? (
            <p style={{ fontSize: 13, color: "#94a3b8" }}>Noch keine Termine</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {termine.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1e3a4a", margin: 0 }}>{t.leistung}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{new Date(t.datum).toLocaleDateString("de-DE")}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: statusColors[t.status] ?? "#94a3b8", backgroundColor: `${statusColors[t.status] ?? "#94a3b8"}18`, padding: "3px 8px", borderRadius: 20, textTransform: "capitalize" }}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fahrzeuge */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 13, fontWeight: 600, color: "#002e40", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Fahrzeuge</p>
            <Link href="/portal/fahrzeuge" style={{ fontSize: 12, color: "#0074a2" }}>Alle</Link>
          </div>
          {!fahrzeuge?.length ? (
            <p style={{ fontSize: 13, color: "#94a3b8" }}>Noch keine Fahrzeuge</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {fahrzeuge.slice(0, 3).map((f) => {
                const tuevDatum = f.tuev_datum ? new Date(f.tuev_datum) : null;
                const daysLeft = tuevDatum ? Math.ceil((tuevDatum.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                const tuevWarning = daysLeft !== null && daysLeft < 60;
                return (
                  <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1e3a4a", margin: 0 }}>{f.marke} {f.modell}</p>
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{f.kennzeichen}</p>
                    </div>
                    {tuevDatum && (
                      <span style={{ fontSize: 11, color: tuevWarning ? "#f87171" : "#94a3b8" }}>
                        TÜV {tuevDatum.toLocaleDateString("de-DE")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
