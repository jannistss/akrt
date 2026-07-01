"use client";

import { useState } from "react";
import { Plus, Calendar, List, Clock, User } from "lucide-react";
import { mockTermine, mockKunden, mockFahrzeuge, statusLabels } from "@/lib/admin/mock-data";
import { AdminCard, StatusBadge, AdminButton, AdminModal, AdminInput, AdminTable, AdminTr, AdminTd, useToast } from "@/components/admin/admin-ui";

type View = "liste" | "kalender";

const serviceArten = ["Inspektion", "TUV + HU", "Reparatur", "Olwechsel", "Reifenwechsel", "Bremsen", "Glasservice", "Klimaservice", "Sonstiges"];
const mechaniker = ["Ali R.", "Jannis S.", "Karim N."];

export default function TerminePage() {
  const [view, setView] = useState<View>("liste");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [addOpen, setAddOpen] = useState(false);
  const [detailTermin, setDetailTermin] = useState<string | null>(null);
  const { show } = useToast();

  const filtered = mockTermine.filter(t => filterStatus === "alle" || t.status === filterStatus);
  const sorted = [...filtered].sort((a, b) => b.datum.localeCompare(a.datum));

  const termine = detailTermin ? mockTermine.find(t => t.id === detailTermin) : null;

  // Group by date for calendar-style list
  const grouped = sorted.reduce<Record<string, typeof sorted>>((acc, t) => {
    acc[t.datum] = acc[t.datum] ? [...acc[t.datum], t] : [t];
    return acc;
  }, {});

  const statusOptions = ["alle", "angefragt", "bestätigt", "in_arbeit", "fertig", "storniert"];

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Termine</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockTermine.length} Termine insgesamt</p>
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
              <Calendar size={12} /> Kalender
            </button>
          </div>
          <AdminButton onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Termin anlegen
          </AdminButton>
        </div>
      </div>

      {/* Filters */}
      <AdminCard className="py-3">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === s ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {s === "alle" ? "Alle" : statusLabels[s]}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* Liste View */}
      {view === "liste" && (
        <AdminCard className="p-0 overflow-hidden">
          <AdminTable headers={["Datum/Uhrzeit", "Kunde", "Fahrzeug", "Service", "Mechaniker", "Status", ""]}>
            {sorted.map(t => {
              const kunde = mockKunden.find(k => k.id === t.kundeId);
              const fahrzeug = mockFahrzeuge.find(f => f.id === t.fahrzeugId);
              return (
                <AdminTr key={t.id} onClick={() => setDetailTermin(t.id)}>
                  <AdminTd>
                    <p className="text-white font-medium">{t.datum}</p>
                    <p className="text-xs text-white/30 flex items-center gap-1"><Clock size={10} />{t.uhrzeit} Uhr ({t.dauer} min)</p>
                  </AdminTd>
                  <AdminTd>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#0074a220", color: "#0074a2" }}>
                        {kunde?.vorname[0]}{kunde?.nachname[0]}
                      </div>
                      <span className="text-white text-sm">{kunde?.vorname} {kunde?.nachname}</span>
                    </div>
                  </AdminTd>
                  <AdminTd className="text-xs">{fahrzeug?.kennzeichen}</AdminTd>
                  <AdminTd className="text-white">{t.serviceArt}</AdminTd>
                  <AdminTd className="text-xs">{t.mechaniker || "-"}</AdminTd>
                  <AdminTd><StatusBadge status={t.status} /></AdminTd>
                  <AdminTd>
                    <button onClick={e => { e.stopPropagation(); show(`Status geandert (Demo)`); }} className="text-xs text-[#0074a2] hover:underline">
                      Aktion
                    </button>
                  </AdminTd>
                </AdminTr>
              );
            })}
          </AdminTable>
        </AdminCard>
      )}

      {/* Kalender View */}
      {view === "kalender" && (
        <div className="space-y-4">
          {Object.entries(grouped)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([datum, tagesTermine]) => (
              <AdminCard key={datum}>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={14} className="text-[#0074a2]" />
                  <p className="font-semibold text-white">{datum}</p>
                  <span className="text-xs text-white/30">{tagesTermine.length} Termin(e)</span>
                </div>
                <div className="space-y-2">
                  {tagesTermine.sort((a, b) => a.uhrzeit.localeCompare(b.uhrzeit)).map(t => {
                    const kunde = mockKunden.find(k => k.id === t.kundeId);
                    const fahrzeug = mockFahrzeuge.find(f => f.id === t.fahrzeugId);
                    return (
                      <div
                        key={t.id}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/3 transition-colors"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        onClick={() => setDetailTermin(t.id)}
                      >
                        <div
                          className="text-xs font-mono font-bold text-white w-16 text-center py-1 rounded"
                          style={{ backgroundColor: "rgba(0,116,162,0.2)" }}
                        >
                          {t.uhrzeit}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{t.serviceArt}</p>
                          <p className="text-xs text-white/40">{kunde?.vorname} {kunde?.nachname} - {fahrzeug?.kennzeichen}</p>
                        </div>
                        {t.mechaniker && (
                          <span className="text-xs text-white/30 flex items-center gap-1">
                            <User size={10} />{t.mechaniker}
                          </span>
                        )}
                        <StatusBadge status={t.status} />
                      </div>
                    );
                  })}
                </div>
              </AdminCard>
            ))}
        </div>
      )}

      {/* Detail Modal */}
      {termine && (
        <AdminModal open={!!detailTermin} onClose={() => setDetailTermin(null)} title="Termindetails">
          <div className="space-y-4">
            {[
              ["Datum", termine.datum],
              ["Uhrzeit", `${termine.uhrzeit} Uhr (${termine.dauer} min)`],
              ["Service", termine.serviceArt],
              ["Mechaniker", termine.mechaniker || "-"],
              ["Status", termine.status],
              ["Notizen", termine.notizen || "-"],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <span className="text-xs text-white/30 w-24 shrink-0 pt-0.5">{label}</span>
                <span className="text-sm text-white/80 flex-1">
                  {label === "Status" ? <StatusBadge status={value} /> : value}
                </span>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              {["bestätigt", "in_arbeit", "fertig", "storniert"].map(s => (
                <button
                  key={s}
                  onClick={() => { show(`Status: ${statusLabels[s]} (Demo)`); }}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition-colors text-white/50 hover:text-white hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          </div>
        </AdminModal>
      )}

      {/* Add Modal */}
      <AdminModal open={addOpen} onClose={() => setAddOpen(false)} title="Neuen Termin anlegen">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Datum" type="date" />
            <AdminInput label="Uhrzeit" type="time" defaultValue="08:00" />
          </div>
          <AdminInput label="Dauer (min)" type="number" defaultValue="60" />
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Service</label>
            <select className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {serviceArten.map(s => <option key={s} value={s} style={{ backgroundColor: "#0d1f2d" }}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Mechaniker</label>
            <select className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <option value="" style={{ backgroundColor: "#0d1f2d" }}>- Auswahlen -</option>
              {mechaniker.map(m => <option key={m} value={m} style={{ backgroundColor: "#0d1f2d" }}>{m}</option>)}
            </select>
          </div>
          <AdminInput label="Notizen" placeholder="Optionale Notizen..." />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="ghost" onClick={() => setAddOpen(false)}>Abbrechen</AdminButton>
            <AdminButton onClick={() => { setAddOpen(false); show("Termin erstellt (Demo)"); }}>Speichern</AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
