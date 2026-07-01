"use client";

import { useState } from "react";
import { Phone, Mail, FileText, ChevronRight } from "lucide-react";
import { mockBewerbungen, statusLabels, BewerbungStatus } from "@/lib/admin/mock-data";
import { AdminCard, StatusBadge, AdminButton, AdminModal, AdminTextarea, useToast } from "@/components/admin/admin-ui";

const pipeline: { key: BewerbungStatus; label: string }[] = [
  { key: "neu", label: "Neu" },
  { key: "kontaktiert", label: "Kontaktiert" },
  { key: "gespräch", label: "Gespräch" },
  { key: "probearbeit", label: "Probearbeit" },
  { key: "angenommen", label: "Angenommen" },
  { key: "abgelehnt", label: "Abgelehnt" },
];

export default function BewerbungenPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"pipeline" | "liste">("pipeline");
  const [note, setNote] = useState("");
  const { show } = useToast();

  const bewerbung = selected ? mockBewerbungen.find(b => b.id === selected) : null;

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Bewerbungen</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockBewerbungen.length} Bewerbungen insgesamt</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            {(["pipeline", "liste"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-2 text-xs capitalize transition-colors ${view === v ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white"}`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      {view === "pipeline" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipeline.map(stage => {
            const inStage = mockBewerbungen.filter(b => b.status === stage.key);
            return (
              <div key={stage.key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{stage.label}</span>
                  <span className="text-xs font-bold text-white/30">{inStage.length}</span>
                </div>
                <div className="space-y-2">
                  {inStage.map(b => (
                    <div
                      key={b.id}
                      className="p-3 rounded-xl cursor-pointer transition-all hover:border-[#0074a2]/30"
                      style={{ backgroundColor: "#0d1f2d", border: "1px solid rgba(255,255,255,0.07)" }}
                      onClick={() => setSelected(b.id)}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2"
                        style={{ backgroundColor: "#0074a220", color: "#0074a2" }}
                      >
                        {b.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-xs font-medium text-white leading-tight">{b.name}</p>
                      <p className="text-xs text-white/30 mt-0.5 truncate">{b.stelle}</p>
                      <p className="text-xs text-white/20 mt-1">{b.eingegangen}</p>
                    </div>
                  ))}
                  {inStage.length === 0 && (
                    <div
                      className="h-16 rounded-xl flex items-center justify-center"
                      style={{ border: "1px dashed rgba(255,255,255,0.07)" }}
                    >
                      <span className="text-xs text-white/15">Leer</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Liste View */}
      {view === "liste" && (
        <div className="space-y-3">
          {mockBewerbungen.map(b => (
            <AdminCard
              key={b.id}
              className="cursor-pointer hover:border-[#0074a2]/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: "#0074a220", color: "#0074a2" }}
                >
                  {b.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold text-white">{b.name}</p>
                    <StatusBadge status={b.status} />
                    <p className="text-xs text-white/30">{b.eingegangen}</p>
                  </div>
                  <p className="text-sm text-white/50 mt-0.5">{b.stelle}</p>
                  <p className="text-sm text-white/40 mt-1 line-clamp-2">{b.anschreiben}</p>
                  <div className="flex gap-4 mt-2">
                    <a href={`mailto:${b.email}`} className="flex items-center gap-1 text-xs text-white/30 hover:text-[#0074a2] transition-colors">
                      <Mail size={11} />{b.email}
                    </a>
                    <a href={`tel:${b.telefon}`} className="flex items-center gap-1 text-xs text-white/30 hover:text-[#0074a2] transition-colors">
                      <Phone size={11} />{b.telefon}
                    </a>
                  </div>
                </div>
                <button onClick={() => setSelected(b.id)} className="text-white/30 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {bewerbung && (
        <AdminModal open={!!selected} onClose={() => setSelected(null)} title={bewerbung.name}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StatusBadge status={bewerbung.status} />
              <span className="text-xs text-white/30">{bewerbung.stelle}</span>
              <span className="text-xs text-white/30">Eingegangen: {bewerbung.eingegangen}</span>
            </div>

            <div className="space-y-2">
              <a href={`tel:${bewerbung.telefon}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={13} />{bewerbung.telefon}
              </a>
              <a href={`mailto:${bewerbung.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={13} />{bewerbung.email}
              </a>
            </div>

            <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs text-white/30 mb-1">Anschreiben</p>
              <p className="text-sm text-white/70 leading-relaxed">{bewerbung.anschreiben}</p>
            </div>

            {bewerbung.notizen && (
              <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-xs text-white/30 mb-1">Interne Notizen</p>
                <p className="text-sm text-white/60">{bewerbung.notizen}</p>
              </div>
            )}

            <div>
              <p className="text-xs text-white/30 mb-2">Status andern</p>
              <div className="flex flex-wrap gap-2">
                {pipeline.map(s => (
                  <button
                    key={s.key}
                    onClick={() => show(`Status auf "${s.label}" gesetzt (Demo)`)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      bewerbung.status === s.key
                        ? "bg-[#0074a2] text-white border-transparent"
                        : "text-white/40 hover:text-white border-white/10 hover:bg-white/5"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <AdminTextarea label="Notiz hinzufugen" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Gesprach verlaufen..." />
            </div>

            <div className="flex gap-2 justify-end">
              <AdminButton size="sm" variant="ghost" onClick={() => show("CV-Link kopiert (Demo)")}>
                <FileText size={12} /> CV
              </AdminButton>
              <AdminButton size="sm" onClick={() => { show("Notiz gespeichert (Demo)"); }}>
                Speichern
              </AdminButton>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
