"use client";

import { useState } from "react";
import { Bell, Send, CheckCircle, Car, Calendar, RefreshCw, Clock, Zap } from "lucide-react";
import { AdminCard, AdminButton, StatusBadge, StatCard, useToast } from "@/components/admin/admin-ui";

type Erinnerung = {
  id: string;
  typ: string;
  status: string;
  geplant_am: string;
  gesendet_am: string | null;
  kanal: string;
  betreff: string | null;
  inhalt: string | null;
  fehler: string | null;
  kunden: { vorname: string; nachname: string; email: string | null } | null;
  fahrzeuge: { kennzeichen: string; marke: string } | null;
};

const TYP_LABELS: Record<string, string> = {
  alle: "Alle",
  tuev: "TÜV",
  geburtstag: "Geburtstag",
  reaktivierung: "Reaktivierung",
  termin_bestaetigung: "Termin-Best.",
  termin_erinnerung: "Termin-Erinnerung",
  bewertungsanfrage: "Bewertung",
  inspektion: "Inspektion",
};

const TYP_COLORS: Record<string, string> = {
  tuev: "#ef4444",
  inspektion: "#f59e0b",
  geburtstag: "#ec4899",
  reaktivierung: "#8b5cf6",
  termin_bestaetigung: "#10b981",
  termin_erinnerung: "#0074a2",
  bewertungsanfrage: "#f97316",
};

const TYP_ICONS: Record<string, React.ReactNode> = {
  tuev: <Car size={15} />,
  inspektion: <Car size={15} />,
  geburtstag: <Bell size={15} />,
  reaktivierung: <RefreshCw size={15} />,
  termin_bestaetigung: <CheckCircle size={15} />,
  termin_erinnerung: <Clock size={15} />,
  bewertungsanfrage: <Zap size={15} />,
};

const STATUS_TYPEN = ["alle", "tuev", "geburtstag", "reaktivierung", "termin_erinnerung", "bewertungsanfrage"];

export function ErinnerungenClient({ initialErinnerungen }: { initialErinnerungen: Erinnerung[] }) {
  const [filterTyp, setFilterTyp] = useState("alle");
  const { show } = useToast();

  const filtered = initialErinnerungen.filter(e => filterTyp === "alle" || e.typ === filterTyp);

  const counts = {
    geplant: initialErinnerungen.filter(e => e.status === "geplant").length,
    gesendet: initialErinnerungen.filter(e => e.status === "gesendet").length,
    tuev: initialErinnerungen.filter(e => e.typ === "tuev").length,
    reaktivierung: initialErinnerungen.filter(e => e.typ === "reaktivierung").length,
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-5 max-w-6xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Erinnerungen & Automationen</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {initialErinnerungen.length} Einträge · Automationen laufen täglich um 09:00 Uhr
          </p>
        </div>
        <AdminButton onClick={() => show("Automationen werden täglich automatisch ausgelöst")}>
          <Zap size={14} /> Manuell auslösen
        </AdminButton>
      </div>

      {/* Automation Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ausstehend" value={counts.geplant} icon={<Bell size={18} />} color="#f59e0b" />
        <StatCard label="Gesendet" value={counts.gesendet} icon={<CheckCircle size={18} />} color="#10b981" />
        <StatCard label="TÜV-Erinnerungen" value={counts.tuev} icon={<Car size={18} />} color="#ef4444" />
        <StatCard label="Reaktivierungen" value={counts.reaktivierung} icon={<RefreshCw size={18} />} color="#8b5cf6" />
      </div>

      {/* Automation overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { typ: "tuev", label: "TÜV-Erinnerungen", desc: "8 Wochen vor TÜV-Ablauf automatisch per E-Mail", color: "#ef4444" },
          { typ: "geburtstag", label: "Geburtstags-Mails", desc: "Am Geburtstag mit persönlicher Nachricht", color: "#ec4899" },
          { typ: "reaktivierung", label: "Reaktivierung", desc: "Nach 90 Tagen ohne Besuch automatisch anschreiben", color: "#8b5cf6" },
          { typ: "termin_erinnerung", label: "Termin-Erinnerung", desc: "24 Stunden vor Termin per E-Mail", color: "#0074a2" },
          { typ: "bewertungsanfrage", label: "Bewertungs-Anfrage", desc: "24 Stunden nach abgeschlossenem Termin", color: "#f97316" },
          { typ: "termin_bestaetigung", label: "Termin-Bestätigung", desc: "Sofort nach Online-Buchung per E-Mail", color: "#10b981" },
        ].map(a => (
          <div
            key={a.typ}
            className="rounded-xl p-4 flex items-start gap-3"
            style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="p-2 rounded-lg shrink-0 mt-0.5" style={{ backgroundColor: `${a.color}18` }}>
              <span style={{ color: a.color }}>{TYP_ICONS[a.typ]}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">{a.label}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{a.desc}</p>
            </div>
            <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#10b981" }} title="Aktiv" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <AdminCard className="py-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_TYPEN.map(t => (
            <button
              key={t}
              onClick={() => setFilterTyp(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterTyp === t ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {TYP_LABELS[t] ?? t}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* List */}
      {filtered.length === 0 ? (
        <AdminCard>
          <div className="text-center py-14">
            <Bell size={32} className="mx-auto mb-3 opacity-10 text-white" />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
              Noch keine Erinnerungen · Die Automationen laufen täglich
            </p>
          </div>
        </AdminCard>
      ) : (
        <div className="space-y-2">
          {filtered.map(e => {
            const color = TYP_COLORS[e.typ] ?? "#64748b";
            const icon = TYP_ICONS[e.typ] ?? <Bell size={15} />;
            return (
              <AdminCard key={e.id} className="hover:border-white/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: `${color}15`, color }}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-white text-sm">{e.betreff ?? TYP_LABELS[e.typ]}</p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: `${color}18`, color }}
                      >
                        {TYP_LABELS[e.typ] ?? e.typ}
                      </span>
                      <StatusBadge status={e.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs flex-wrap" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {e.kunden && (
                        <span>{e.kunden.vorname} {e.kunden.nachname}</span>
                      )}
                      {e.fahrzeuge && (
                        <span className="flex items-center gap-1">
                          <Car size={10} />{e.fahrzeuge.kennzeichen} {e.fahrzeuge.marke}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {e.gesendet_am ? `Gesendet: ${fmtDate(e.gesendet_am)}` : `Geplant: ${fmtDate(e.geplant_am)}`}
                      </span>
                      <span className="capitalize">Kanal: {e.kanal}</span>
                    </div>
                    {e.fehler && (
                      <p className="text-xs mt-1.5 text-red-400">{e.fehler}</p>
                    )}
                  </div>
                  {e.status === "geplant" && (
                    <div className="flex gap-2 shrink-0">
                      <AdminButton size="sm" onClick={() => show(`E-Mail an ${e.kunden?.vorname} gesendet`)}>
                        <Send size={11} /> Jetzt senden
                      </AdminButton>
                    </div>
                  )}
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
