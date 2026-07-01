"use client";

import { useState } from "react";
import { Bell, Send, CheckCircle, XCircle, Calendar, Car, User, RefreshCw } from "lucide-react";
import { mockErinnerungen, mockKunden, mockFahrzeuge, ErinnerungTyp } from "@/lib/admin/mock-data";
import { AdminCard, StatusBadge, AdminButton, AdminModal, AdminInput, AdminTextarea, useToast, StatCard } from "@/components/admin/admin-ui";

const typLabels: Record<ErinnerungTyp, string> = {
  tuev: "TUV",
  inspektion: "Inspektion",
  geburtstag: "Geburtstag",
  reifen: "Reifenwechsel",
  inaktiv: "Reaktivierung",
};

const typColors: Record<ErinnerungTyp, string> = {
  tuev: "#ef4444",
  inspektion: "#f59e0b",
  geburtstag: "#ec4899",
  reifen: "#8b5cf6",
  inaktiv: "#64748b",
};

export default function ErinnerungenPage() {
  const [filterTyp, setFilterTyp] = useState<"alle" | ErinnerungTyp>("alle");
  const [createOpen, setCreateOpen] = useState(false);
  const { show } = useToast();

  const filtered = mockErinnerungen.filter(e => filterTyp === "alle" || e.typ === filterTyp);

  const ausstehend = mockErinnerungen.filter(e => e.status === "ausstehend").length;
  const tuevFaellig = mockErinnerungen.filter(e => e.typ === "tuev" && e.status === "ausstehend").length;

  const typen: { key: "alle" | ErinnerungTyp; label: string }[] = [
    { key: "alle", label: "Alle" },
    { key: "tuev", label: "TUV" },
    { key: "inspektion", label: "Inspektion" },
    { key: "geburtstag", label: "Geburtstag" },
    { key: "reifen", label: "Reifen" },
    { key: "inaktiv", label: "Reaktivierung" },
  ];

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Erinnerungen</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockErinnerungen.length} Erinnerungen</p>
        </div>
        <AdminButton onClick={() => setCreateOpen(true)}>
          <Bell size={14} /> Erinnerung erstellen
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ausstehend" value={ausstehend} icon={<Bell size={18} />} color="#f59e0b" />
        <StatCard label="TUV fällig" value={tuevFaellig} icon={<Car size={18} />} color="#ef4444" />
        <StatCard label="Geburtstage" value={mockErinnerungen.filter(e => e.typ === "geburtstag").length} icon={<User size={18} />} color="#ec4899" />
        <StatCard label="Reaktivierungen" value={mockErinnerungen.filter(e => e.typ === "inaktiv").length} icon={<RefreshCw size={18} />} color="#64748b" />
      </div>

      {/* Filters */}
      <AdminCard className="py-3">
        <div className="flex flex-wrap gap-2">
          {typen.map(t => (
            <button
              key={t.key}
              onClick={() => setFilterTyp(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterTyp === t.key ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(e => {
          const kunde = mockKunden.find(k => k.id === e.kundeId);
          const fahrzeug = e.fahrzeugId ? mockFahrzeuge.find(f => f.id === e.fahrzeugId) : null;
          const color = typColors[e.typ];
          return (
            <AdminCard key={e.id} className="hover:border-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-lg shrink-0 mt-0.5"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Bell size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-white">{e.betreff}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {typLabels[e.typ]}
                    </span>
                    <StatusBadge status={e.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-white/40 flex-wrap">
                    <span className="flex items-center gap-1"><User size={10} />{kunde?.vorname} {kunde?.nachname}</span>
                    {fahrzeug && <span className="flex items-center gap-1"><Car size={10} />{fahrzeug.kennzeichen}</span>}
                    <span className="flex items-center gap-1"><Calendar size={10} />Fällig: {e.faellig}</span>
                  </div>
                  <p className="text-sm text-white/50 mt-2 line-clamp-2">{e.nachricht}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <AdminButton size="sm" onClick={() => show(`E-Mail gesendet an ${kunde?.vorname} ${kunde?.nachname} (Demo)`)}>
                    <Send size={11} /> E-Mail
                  </AdminButton>
                  <AdminButton size="sm" variant="ghost" onClick={() => show("SMS gesendet (Demo)")}>
                    SMS
                  </AdminButton>
                  <AdminButton size="sm" variant="ghost" onClick={() => show("Als erledigt markiert (Demo)")}>
                    <CheckCircle size={11} />
                  </AdminButton>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>

      {/* Create Modal */}
      <AdminModal open={createOpen} onClose={() => setCreateOpen(false)} title="Neue Erinnerung erstellen">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Typ</label>
            <select className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {Object.entries(typLabels).map(([k, v]) => <option key={k} value={k} style={{ backgroundColor: "#0d1f2d" }}>{v}</option>)}
            </select>
          </div>
          <AdminInput label="Betreff" placeholder="TUV Erinnerung..." />
          <AdminInput label="Fällig am" type="date" />
          <AdminTextarea label="Nachricht" rows={4} placeholder="Ihre Erinnerungsnachricht..." />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="ghost" onClick={() => setCreateOpen(false)}>Abbrechen</AdminButton>
            <AdminButton onClick={() => { setCreateOpen(false); show("Erinnerung erstellt (Demo)"); }}>Erstellen</AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
