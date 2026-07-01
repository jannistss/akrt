"use client";

import { useState } from "react";
import { Plus, Receipt, Download, Send } from "lucide-react";
import { mockRechnungen, mockKunden, mockFahrzeuge } from "@/lib/admin/mock-data";
import {
  AdminCard, StatusBadge, AdminButton, AdminModal,
  AdminInput, AdminTable, AdminTr, AdminTd, useToast, StatCard,
} from "@/components/admin/admin-ui";

export default function RechnungenPage() {
  const [filterStatus, setFilterStatus] = useState("alle");
  const [selected, setSelected] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const { show } = useToast();

  const filtered = mockRechnungen.filter(r => filterStatus === "alle" || r.status === filterStatus);
  const sorted = [...filtered].sort((a, b) => b.datum.localeCompare(a.datum));

  const rechnung = selected ? mockRechnungen.find(r => r.id === selected) : null;

  const offen = mockRechnungen.filter(r => r.status === "offen").reduce((s, r) => s + r.betrag, 0);
  const bezahlt = mockRechnungen.filter(r => r.status === "bezahlt").reduce((s, r) => s + r.betrag, 0);
  const ueberfaellig = mockRechnungen.filter(r => r.status === "überfällig").reduce((s, r) => s + r.betrag, 0);
  const gesamt = mockRechnungen.reduce((s, r) => s + r.betrag, 0);

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Rechnungen</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockRechnungen.length} Rechnungen</p>
        </div>
        <AdminButton onClick={() => setAddOpen(true)}>
          <Plus size={14} /> Neue Rechnung
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Gesamt" value={`${gesamt} €`} icon={<Receipt size={18} />} />
        <StatCard label="Bezahlt" value={`${bezahlt} €`} icon={<Receipt size={18} />} color="#10b981" />
        <StatCard label="Offen" value={`${offen} €`} icon={<Receipt size={18} />} color="#f59e0b" />
        <StatCard label="Uberfällig" value={`${ueberfaellig} €`} icon={<Receipt size={18} />} color="#ef4444" />
      </div>

      {/* Filters */}
      <AdminCard className="py-3">
        <div className="flex gap-2 flex-wrap">
          {["alle", "offen", "bezahlt", "überfällig", "storniert"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {s === "alle" ? "Alle" : s}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard className="p-0 overflow-hidden">
        <AdminTable headers={["Nummer", "Kunde", "Fahrzeug", "Datum", "Fällig", "Betrag", "Status", ""]}>
          {sorted.map(r => {
            const kunde = mockKunden.find(k => k.id === r.kundeId);
            const fahrzeug = mockFahrzeuge.find(f => f.id === r.fahrzeugId);
            return (
              <AdminTr key={r.id} onClick={() => setSelected(r.id)}>
                <AdminTd>
                  <p className="font-mono text-sm text-white">{r.nummer}</p>
                </AdminTd>
                <AdminTd>{kunde?.vorname} {kunde?.nachname}</AdminTd>
                <AdminTd className="text-xs">{fahrzeug?.kennzeichen}</AdminTd>
                <AdminTd className="text-xs">{r.datum}</AdminTd>
                <AdminTd className={`text-xs ${r.status === "überfällig" ? "text-red-400 font-medium" : ""}`}>{r.faellig}</AdminTd>
                <AdminTd>
                  <span className="text-white font-semibold">{r.betrag.toFixed(2)} €</span>
                </AdminTd>
                <AdminTd><StatusBadge status={r.status} /></AdminTd>
                <AdminTd>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <button onClick={() => show(`PDF heruntergeladen (Demo)`)} className="text-white/30 hover:text-white transition-colors">
                      <Download size={13} />
                    </button>
                    <button onClick={() => show(`Rechnung per E-Mail gesendet (Demo)`)} className="text-white/30 hover:text-white transition-colors">
                      <Send size={13} />
                    </button>
                  </div>
                </AdminTd>
              </AdminTr>
            );
          })}
        </AdminTable>
      </AdminCard>

      {/* Detail Modal */}
      {rechnung && (
        <AdminModal open={!!selected} onClose={() => setSelected(null)} title={rechnung.nummer}>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-white/30">Erstellt am</p>
                <p className="text-sm text-white">{rechnung.datum}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/30">Fällig am</p>
                <p className="text-sm text-white">{rechnung.faellig}</p>
              </div>
              <StatusBadge status={rechnung.status} />
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/30" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                Positionen
              </div>
              {rechnung.positionen.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-white/60 flex-1">{p.menge}x {p.beschreibung}</span>
                  <span className="text-white font-medium">{(p.menge * p.einzelpreis).toFixed(2)} €</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 font-semibold" style={{ backgroundColor: "rgba(0,116,162,0.1)" }}>
                <span className="text-white">Gesamt</span>
                <span className="text-white text-base">{rechnung.betrag.toFixed(2)} €</span>
              </div>
            </div>

            <div className="flex gap-2">
              <AdminButton className="flex-1" onClick={() => show("Als bezahlt markiert (Demo)")}>Als bezahlt</AdminButton>
              <AdminButton variant="ghost" onClick={() => show("PDF heruntergeladen (Demo)")}>
                <Download size={14} /> PDF
              </AdminButton>
              <AdminButton variant="ghost" onClick={() => show("Rechnung gesendet (Demo)")}>
                <Send size={14} /> Senden
              </AdminButton>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Add Modal */}
      <AdminModal open={addOpen} onClose={() => setAddOpen(false)} title="Neue Rechnung erstellen">
        <div className="space-y-4">
          <AdminInput label="Rechnungsnummer" defaultValue={`RE-2026-00${mockRechnungen.length + 1}`} />
          <AdminInput label="Datum" type="date" />
          <AdminInput label="Fälligkeitsdatum" type="date" />
          <AdminInput label="Betrag (€)" type="number" placeholder="0.00" />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="ghost" onClick={() => setAddOpen(false)}>Abbrechen</AdminButton>
            <AdminButton onClick={() => { setAddOpen(false); show("Rechnung erstellt (Demo)"); }}>Erstellen</AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
