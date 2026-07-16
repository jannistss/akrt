"use client";

import { useState } from "react";
import { Receipt, Download, Send, TrendingUp, AlertCircle } from "lucide-react";
import {
  AdminCard, AdminTable, AdminTr, AdminTd, AdminModal,
  AdminButton, StatusBadge, StatCard, useToast,
} from "@/components/admin/admin-ui";

type Rechnung = {
  id: string;
  rechnungsnummer: string;
  datum: string;
  faellig_am: string | null;
  betrag_netto: number;
  betrag_brutto: number | null;
  mwst_prozent: number;
  status: string;
  positionen: unknown;
  notizen: string | null;
  kunden: { vorname: string; nachname: string } | null;
  fahrzeuge: { kennzeichen: string; marke: string; modell: string } | null;
};

const STATUS_OPTIONS = ["alle", "offen", "bezahlt", "ueberfaellig", "storniert"];
const STATUS_LABELS: Record<string, string> = {
  alle: "Alle", offen: "Offen", bezahlt: "Bezahlt", ueberfaellig: "Überfällig", storniert: "Storniert",
};
const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  offen: { bg: "#f59e0b20", color: "#f59e0b" },
  bezahlt: { bg: "#10b98120", color: "#10b981" },
  ueberfaellig: { bg: "#ef444420", color: "#ef4444" },
  storniert: { bg: "#ffffff10", color: "#ffffff30" },
};

export function RechnungenClient({ initialRechnungen }: { initialRechnungen: Rechnung[] }) {
  const [filterStatus, setFilterStatus] = useState("alle");
  const [detail, setDetail] = useState<Rechnung | null>(null);
  const { show } = useToast();

  const filtered = initialRechnungen.filter(r =>
    filterStatus === "alle" || r.status === filterStatus,
  );

  const fmt = (n: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);

  const fmtDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";

  const sum = (status: string) =>
    initialRechnungen.filter(r => r.status === status).reduce((s, r) => s + (r.betrag_brutto ?? r.betrag_netto * 1.19), 0);

  return (
    <div className="space-y-5 max-w-7xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Rechnungen</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {initialRechnungen.length} {initialRechnungen.length === 1 ? "Rechnung" : "Rechnungen"}
          </p>
        </div>
        <AdminButton onClick={() => show("Rechnungsstellung erfolgt über Repdoc")}>
          <Receipt size={14} /> Neue Rechnung
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Gesamt" value={fmt(initialRechnungen.reduce((s, r) => s + (r.betrag_brutto ?? r.betrag_netto * 1.19), 0))}
          icon={<TrendingUp size={18} />} color="#0074a2" />
        <StatCard label="Bezahlt" value={fmt(sum("bezahlt"))}
          icon={<Receipt size={18} />} color="#10b981" />
        <StatCard label="Offen" value={fmt(sum("offen"))}
          icon={<Receipt size={18} />} color="#f59e0b" />
        <StatCard label="Überfällig" value={fmt(sum("ueberfaellig"))}
          icon={<AlertCircle size={18} />} color="#ef4444" />
      </div>

      {/* Filters */}
      <AdminCard className="py-3">
        <div className="flex gap-1.5 flex-wrap">
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

      {/* Table */}
      <AdminCard className="p-0 overflow-hidden">
        <AdminTable headers={["Nummer", "Kunde", "Fahrzeug", "Ausgestellt", "Fällig", "Betrag", "Status", ""]}>
          {filtered.map(r => {
            const s = STATUS_STYLE[r.status] ?? STATUS_STYLE.offen;
            return (
              <AdminTr key={r.id} onClick={() => setDetail(r)}>
                <AdminTd>
                  <p className="font-mono text-sm text-white">{r.rechnungsnummer}</p>
                </AdminTd>
                <AdminTd>
                  {r.kunden ? (
                    <p className="text-sm text-white">{r.kunden.vorname} {r.kunden.nachname}</p>
                  ) : (
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>—</span>
                  )}
                </AdminTd>
                <AdminTd>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {r.fahrzeuge ? `${r.fahrzeuge.kennzeichen}` : "—"}
                  </span>
                </AdminTd>
                <AdminTd>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{fmtDate(r.datum)}</span>
                </AdminTd>
                <AdminTd>
                  <span className={`text-xs ${r.status === "ueberfaellig" ? "text-red-400 font-semibold" : ""}`}
                    style={{ color: r.status !== "ueberfaellig" ? "rgba(255,255,255,0.45)" : undefined }}>
                    {fmtDate(r.faellig_am)}
                  </span>
                </AdminTd>
                <AdminTd>
                  <span className="text-white font-semibold text-sm">
                    {fmt(r.betrag_brutto ?? r.betrag_netto * 1.19)}
                  </span>
                </AdminTd>
                <AdminTd>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: s.bg, color: s.color }}>
                    {STATUS_LABELS[r.status] ?? r.status}
                  </span>
                </AdminTd>
                <AdminTd>
                  <div className="flex gap-3" onClick={e => e.stopPropagation()}>
                    <button onClick={() => show("PDF heruntergeladen")} className="transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.3)" }}>
                      <Download size={13} />
                    </button>
                    <button onClick={() => show("Rechnung per E-Mail gesendet")} className="transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.3)" }}>
                      <Send size={13} />
                    </button>
                  </div>
                </AdminTd>
              </AdminTr>
            );
          })}
        </AdminTable>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Receipt size={32} className="mx-auto mb-3 opacity-10 text-white" />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
              {filterStatus !== "alle" ? `Keine ${STATUS_LABELS[filterStatus]} Rechnungen` : "Noch keine Rechnungen"}
            </p>
          </div>
        )}
      </AdminCard>

      {/* Detail Modal */}
      {detail && (
        <AdminModal open={!!detail} onClose={() => setDetail(null)} title={detail.rechnungsnummer}>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Kunde</p>
                <p className="text-sm text-white">
                  {detail.kunden ? `${detail.kunden.vorname} ${detail.kunden.nachname}` : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Ausgestellt</p>
                <p className="text-sm text-white">{fmtDate(detail.datum)}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Fällig</p>
                <p className="text-sm text-white">{fmtDate(detail.faellig_am)}</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="px-4 py-2.5 flex justify-between text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span>Position</span>
                <span>Betrag</span>
              </div>
              <div className="px-4 py-3 flex justify-between text-sm">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Netto</span>
                <span className="text-white">{fmt(detail.betrag_netto)}</span>
              </div>
              <div className="px-4 py-2 flex justify-between text-sm" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>MwSt. ({detail.mwst_prozent}%)</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  {fmt((detail.betrag_brutto ?? detail.betrag_netto * 1.19) - detail.betrag_netto)}
                </span>
              </div>
              <div className="px-4 py-3 flex justify-between font-bold text-base"
                style={{ backgroundColor: "rgba(0,116,162,0.12)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-white">Gesamt</span>
                <span className="text-white">{fmt(detail.betrag_brutto ?? detail.betrag_netto * 1.19)}</span>
              </div>
            </div>

            {detail.notizen && (
              <p className="text-xs p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>
                {detail.notizen}
              </p>
            )}

            <div className="flex gap-2">
              {detail.status !== "bezahlt" && (
                <AdminButton className="flex-1" onClick={() => { show("Als bezahlt markiert"); setDetail(null); }}>
                  Als bezahlt markieren
                </AdminButton>
              )}
              <AdminButton variant="ghost" onClick={() => show("PDF heruntergeladen")}>
                <Download size={14} /> PDF
              </AdminButton>
              <AdminButton variant="ghost" onClick={() => show("Rechnung gesendet")}>
                <Send size={14} /> Senden
              </AdminButton>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
