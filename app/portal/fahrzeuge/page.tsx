import { createClient } from "@/lib/supabase/server";
import { Car, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata = { title: "Meine Fahrzeuge | Autoklinik Reutlingen" };

export default async function PortalFahrzeugePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: kunde } = await supabase
    .from("kunden").select("id").eq("portal_user_id", user!.id).single();

  const { data: fahrzeuge } = kunde
    ? await supabase
        .from("fahrzeuge")
        .select("*")
        .eq("kunden_id", kunde.id)
        .order("erstellt_am", { ascending: false })
    : { data: [] };

  const cardStyle = { backgroundColor: "#ffffff", borderRadius: 12, border: "1px solid #dde9f0", padding: "24px" };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#002e40", margin: "0 0 4px" }}>Meine Fahrzeuge</h1>
      <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 28px" }}>Alle Fahrzeuge in Ihrer Werkstattakte.</p>

      {!fahrzeuge?.length ? (
        <div style={{ ...cardStyle, textAlign: "center", padding: 40 }}>
          <Car size={32} style={{ color: "#dde9f0", margin: "0 auto 12px" }} />
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Noch keine Fahrzeuge hinterlegt.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {fahrzeuge.map((f) => {
            const tuevDatum = f.tuev_datum ? new Date(f.tuev_datum) : null;
            const daysLeft = tuevDatum ? Math.ceil((tuevDatum.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
            const tuevCritical = daysLeft !== null && daysLeft <= 30;
            const tuevWarning = daysLeft !== null && daysLeft <= 60 && !tuevCritical;

            return (
              <div key={f.id} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#e8f4fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Car size={22} style={{ color: "#0074a2" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#002e40", margin: "0 0 2px" }}>
                      {f.marke} {f.modell}
                    </p>
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>{f.kennzeichen}</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                  {[
                    { label: "Baujahr", value: f.baujahr ?? "—" },
                    { label: "Kraftstoff", value: f.kraftstoff ? f.kraftstoff.charAt(0).toUpperCase() + f.kraftstoff.slice(1) : "—" },
                    { label: "Leistung", value: f.leistung_kw ? `${f.leistung_kw} kW` : "—" },
                    { label: "Kilometerstand", value: f.kilometerstand ? `${f.kilometerstand.toLocaleString("de-DE")} km` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px", fontWeight: 600 }}>{label}</p>
                      <p style={{ fontSize: 13, color: "#1e3a4a", margin: 0, fontWeight: 500 }}>{value}</p>
                    </div>
                  ))}
                </div>

                {tuevDatum && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: "10px 14px",
                      borderRadius: 8,
                      backgroundColor: tuevCritical ? "#fef2f2" : tuevWarning ? "#fffbeb" : "#f0fdf4",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {tuevCritical || tuevWarning
                      ? <AlertTriangle size={14} style={{ color: tuevCritical ? "#ef4444" : "#f59e0b", flexShrink: 0 }} />
                      : <CheckCircle size={14} style={{ color: "#22c55e", flexShrink: 0 }} />
                    }
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: tuevCritical ? "#ef4444" : tuevWarning ? "#92400e" : "#166534", margin: 0 }}>
                        TÜV: {tuevDatum.toLocaleDateString("de-DE")}
                        {daysLeft !== null && daysLeft >= 0 && ` (noch ${daysLeft} Tage)`}
                        {daysLeft !== null && daysLeft < 0 && " — abgelaufen!"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
