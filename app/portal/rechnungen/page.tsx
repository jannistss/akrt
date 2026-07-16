import { createClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";

export const metadata = { title: "Rechnungen | Autoklinik Reutlingen" };

export default async function PortalRechnungenPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: kunde } = await supabase
    .from("kunden").select("id").eq("portal_user_id", user!.id).single();

  const { data: rechnungen } = kunde
    ? await supabase
        .from("rechnungen")
        .select("id, rechnungsnummer, datum, betrag_brutto, status, fahrzeuge(marke, modell, kennzeichen)")
        .eq("kunden_id", kunde.id)
        .order("datum", { ascending: false })
    : { data: [] };

  const statusStyle: Record<string, { bg: string; text: string }> = {
    offen:       { bg: "#fef9c3", text: "#92400e" },
    bezahlt:     { bg: "#dcfce7", text: "#166534" },
    ueberfaellig:{ bg: "#fee2e2", text: "#991b1b" },
    storniert:   { bg: "#f1f5f9", text: "#475569" },
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#002e40", margin: "0 0 4px" }}>Rechnungen</h1>
      <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 28px" }}>Ihre Rechnungshistorie.</p>

      {!rechnungen?.length ? (
        <div style={{ backgroundColor: "#ffffff", borderRadius: 12, border: "1px solid #dde9f0", padding: 40, textAlign: "center" }}>
          <FileText size={32} style={{ color: "#dde9f0", margin: "0 auto 12px" }} />
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Noch keine Rechnungen vorhanden.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: "#ffffff", borderRadius: 12, border: "1px solid #dde9f0", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #e8f0f5", display: "grid", gridTemplateColumns: "1fr 120px 100px 100px", gap: 12 }}>
            {["Rechnung", "Datum", "Betrag", "Status"].map((h) => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
            ))}
          </div>
          {rechnungen.map((r, i) => {
            const st = statusStyle[r.status] ?? { bg: "#f1f5f9", text: "#475569" };
            const fz = Array.isArray(r.fahrzeuge) ? r.fahrzeuge[0] : r.fahrzeuge;
            return (
              <div
                key={r.id}
                style={{
                  padding: "14px 20px",
                  borderBottom: i < rechnungen.length - 1 ? "1px solid #e8f0f5" : "none",
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 100px 100px",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1e3a4a", margin: "0 0 2px" }}>{r.rechnungsnummer}</p>
                  {fz && <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{fz.marke} {fz.modell}</p>}
                </div>
                <p style={{ fontSize: 13, color: "#64849a", margin: 0 }}>
                  {new Date(r.datum).toLocaleDateString("de-DE")}
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#002e40", margin: 0 }}>
                  {Number(r.betrag_brutto).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                </p>
                <span style={{ fontSize: 11, fontWeight: 600, color: st.text, backgroundColor: st.bg, padding: "4px 10px", borderRadius: 20, display: "inline-block", whiteSpace: "nowrap", textTransform: "capitalize" }}>
                  {r.status === "ueberfaellig" ? "überfällig" : r.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
