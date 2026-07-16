"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Calendar, List, Clock, Car, Phone } from "lucide-react";
import { updateTerminStatus } from "@/lib/actions/crm";
import {
  AdminCard, AdminTable, AdminTr, AdminTd, AdminModal,
  AdminButton, StatusBadge, useToast,
} from "@/components/admin/admin-ui";

type Termin = {
  id: string;
  datum: string;
  dauer_minuten: number;
  leistung: string;
  status: string;
  notizen: string | null;
  preis: number | null;
  quelle: string;
  kunden: { vorname: string; nachname: string; telefon: string | null; email: string | null } | null;
  fahrzeuge: { kennzeichen: string; marke: string; modell: string } | null;
};

const STATUS_OPTIONS = ["alle", "ausstehend", "bestaetigt", "abgeschlossen", "storniert"];
const STATUS_LABELS: Record<string, string> = {
  alle: "Alle", ausstehend: "Ausstehend", bestaetigt: "Bestätigt",
  abgeschlossen: "Abgeschlossen", storniert: "Storniert", nicht_erschienen: "Nicht erschienen",
};
const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ausstehend: { bg: "#f59e0b20", color: "#f59e0b" },
  bestaetigt: { bg: "#10b98120", color: "#10b981" },
  abgeschlossen: { bg: "#ffffff10", color: "#ffffff50" },
  storniert: { bg: "#ef444420", color: "#ef4444" },
  nicht_erschienen: { bg: "#ef444420", color: "#ef4444" },
};

export function TermineClient({ initialTermine }: { initialTermine: Termin[] }) {
  const [view, setView] = useState<"liste" | "kalender">("liste");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [detail, setDetail] = useState<Termin | null>(null);
  const [isPending, startTransition] = useTransition();
  const { show } = useToast();
  const router = useRouter();

  const filtered = initialTermine.filter(t =>
    filterStatus === "alle" || t.status === filterStatus,
  );

  const grouped = filtered.reduce<Record<string, Termin[]>>((acc, t) => {
    const day = t.datum.split("T")[0];
    acc[day] = acc[day] ? [...acc[day], t] : [t];
    return acc;
  }, {});

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });

  const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  const fmtDayHeading = (d: string) =>
    new Date(d).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

  function handleStatusChange(id: string, status: string) {
    startTransition(async () => {
      try {
        await updateTerminStatus(id, status);
        show(`Status auf „${STATUS_LABELS[status]}" gesetzt`);
        setDetail(null);
        router.refresh();
      } catch {
        show("Fehler beim Aktualisieren");
      }
    });
  }

  return (
    <div className="space-y-5 max-w-7xl">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Termine</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {initialTermine.length} {initialTermine.length === 1 ? "Termin" : "Termine"} in den nächsten 60 Tagen
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => setView("liste")}
              className={`px-3 py-2 flex items-center gap-1.5 text-xs transition-colors ${view === "liste" ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white"}`}
            >
              <List size={12} /> Liste
            </button>
            <button
              onClick={() => setView("kalender")}
              className={`px-3 py-2 flex items-center gap-1.5 text-xs transition-colors ${view === "kalender" ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white"}`}
            >
              <Calendar size={12} /> Nach Datum
            </button>
          </div>
          <AdminButton onClick={() => show("Termin-Buchung läuft über die Website")}>
            <Plus size={14} /> Termin anlegen
          </AdminButton>
        </div>
      </div>

      {/* Filter */}
      <AdminCard className="py-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === s ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* Liste */}
      {view === "liste" && (
        <AdminCard className="p-0 overflow-hidden">
          <AdminTable headers={["Datum & Zeit", "Kunde", "Fahrzeug", "Leistung", "Preis", "Status", ""]}>
            {filtered.map(t => {
              const s = STATUS_STYLE[t.status] ?? STATUS_STYLE.ausstehend;
              return (
                <AdminTr key={t.id} onClick={() => setDetail(t)}>
                  <AdminTd>
                    <p className="text-white font-medium text-sm">{fmtDate(t.datum)}</p>
                    <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <Clock size={10} /> {fmtTime(t.datum)} Uhr &middot; {t.dauer_minuten} min
                    </p>
                  </AdminTd>
                  <AdminTd>
                    {t.kunden ? (
                      <div>
                        <p className="text-white text-sm font-medium">{t.kunden.vorname} {t.kunden.nachname}</p>
                        {t.kunden.telefon && (
                          <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                            <Phone size={10} />{t.kunden.telefon}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Kein Kunde</span>
                    )}
                  </AdminTd>
                  <AdminTd>
                    {t.fahrzeuge ? (
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <Car size={11} />
                        <span>{t.fahrzeuge.kennzeichen} &middot; {t.fahrzeuge.marke} {t.fahrzeuge.modell}</span>
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                    )}
                  </AdminTd>
                  <AdminTd className="text-sm text-white">{t.leistung}</AdminTd>
                  <AdminTd>
                    {t.preis != null ? (
                      <span className="text-sm font-semibold text-white">
                        {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(t.preis)}
                      </span>
                    ) : (
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                    )}
                  </AdminTd>
                  <AdminTd>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.color }}>
                      {STATUS_LABELS[t.status] ?? t.status}
                    </span>
                  </AdminTd>
                  <AdminTd>
                    <button
                      onClick={e => { e.stopPropagation(); setDetail(t); }}
                      className="text-xs font-medium hover:text-white transition-colors"
                      style={{ color: "#0074a2" }}
                    >
                      Details →
                    </button>
                  </AdminTd>
                </AdminTr>
              );
            })}
          </AdminTable>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={32} className="mx-auto mb-3 opacity-10 text-white" />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>Keine Termine gefunden</p>
            </div>
          )}
        </AdminCard>
      )}

      {/* Kalender-Gruppierung */}
      {view === "kalender" && (
        <div className="space-y-4">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([day, tagesTermine]) => (
              <AdminCard key={day}>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={14} style={{ color: "#0074a2" }} />
                  <p className="font-semibold text-white">{fmtDayHeading(day)}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#0074a220", color: "#0074a2" }}>
                    {tagesTermine.length} Termin{tagesTermine.length !== 1 ? "e" : ""}
                  </span>
                </div>
                <div className="space-y-2">
                  {[...tagesTermine].sort((a, b) => a.datum.localeCompare(b.datum)).map(t => {
                    const s = STATUS_STYLE[t.status] ?? STATUS_STYLE.ausstehend;
                    return (
                      <div
                        key={t.id}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-white/4"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        onClick={() => setDetail(t)}
                      >
                        <div
                          className="text-xs font-mono font-bold text-white w-14 text-center py-1 rounded shrink-0"
                          style={{ backgroundColor: "rgba(0,116,162,0.2)" }}
                        >
                          {fmtTime(t.datum)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{t.leistung}</p>
                          <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {t.kunden ? `${t.kunden.vorname} ${t.kunden.nachname}` : "Kein Kunde"}
                            {t.fahrzeuge ? ` · ${t.fahrzeuge.kennzeichen}` : ""}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                          style={{ backgroundColor: s.bg, color: s.color }}>
                          {STATUS_LABELS[t.status] ?? t.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </AdminCard>
            ))}
          {Object.keys(grouped).length === 0 && (
            <AdminCard>
              <div className="text-center py-12">
                <Calendar size={32} className="mx-auto mb-3 opacity-10 text-white" />
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>Keine Termine gefunden</p>
              </div>
            </AdminCard>
          )}
        </div>
      )}

      {/* Termin-Detail Modal */}
      {detail && (
        <AdminModal open={!!detail} onClose={() => setDetail(null)} title="Termindetails">
          <div className="space-y-5">
            <div className="space-y-3">
              {[
                ["Datum", fmtDate(detail.datum)],
                ["Uhrzeit", `${fmtTime(detail.datum)} Uhr (${detail.dauer_minuten} min)`],
                ["Leistung", detail.leistung],
                ["Quelle", detail.quelle],
                ["Notizen", detail.notizen || "—"],
                ["Preis", detail.preis != null
                  ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(detail.preis)
                  : "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-xs w-24 shrink-0 pt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</span>
                  <span className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.8)" }}>{value}</span>
                </div>
              ))}
              {detail.kunden && (
                <div className="flex gap-4">
                  <span className="text-xs w-24 shrink-0 pt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Kunde</span>
                  <div>
                    <p className="text-sm text-white/80">{detail.kunden.vorname} {detail.kunden.nachname}</p>
                    {detail.kunden.telefon && <p className="text-xs text-white/35">{detail.kunden.telefon}</p>}
                    {detail.kunden.email && <p className="text-xs text-white/35">{detail.kunden.email}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Status ändern */}
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Status ändern</p>
              <div className="grid grid-cols-2 gap-2">
                {(["ausstehend", "bestaetigt", "abgeschlossen", "storniert", "nicht_erschienen"] as const).map(s => {
                  const style = STATUS_STYLE[s];
                  const isActive = detail.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(detail.id, s)}
                      disabled={isActive || isPending}
                      className="py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-40"
                      style={{
                        backgroundColor: isActive ? style.bg : "rgba(255,255,255,0.04)",
                        color: isActive ? style.color : "rgba(255,255,255,0.45)",
                        border: `1px solid ${isActive ? style.color + "40" : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
