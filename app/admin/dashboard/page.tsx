"use client";

import {
  Users, Car, Calendar, Receipt, Bell, Briefcase,
  TrendingUp, Clock, CheckCircle, AlertTriangle, Phone,
} from "lucide-react";
import Link from "next/link";
import {
  mockKunden, mockTermine, mockRechnungen, mockErinnerungen,
  mockBewerbungen, statusLabels,
} from "@/lib/admin/mock-data";
import {
  AdminCard, StatCard, StatusBadge, SectionHeader,
  AdminTable, AdminTr, AdminTd,
} from "@/components/admin/admin-ui";

const today = new Date().toISOString().split("T")[0];

export default function DashboardPage() {
  const todayTermine = mockTermine.filter(t => t.datum === today || t.datum === "2026-07-02");
  const offeneRechnungen = mockRechnungen.filter(r => r.status === "offen" || r.status === "überfällig");
  const neueBewerb = mockBewerbungen.filter(b => b.status === "neu");
  const faelligeErinnerungen = mockErinnerungen.filter(e => e.status === "ausstehend").slice(0, 4);
  const offeneCallbacks = mockTermine.filter(t => t.status === "angefragt");
  const totalUmsatz = mockRechnungen.filter(r => r.status === "bezahlt").reduce((s, r) => s + r.betrag, 0);
  const avgZufriedenheit = (mockKunden.reduce((s, k) => s + k.zufriedenheit, 0) / mockKunden.length).toFixed(1);

  const recentActivity = [
    { time: "Heute, 14:30", text: "Neue Bewerbung von Kevin Huber eingegangen", type: "bewerbung" },
    { time: "Heute, 12:00", text: "Rechnung RE-2026-004 erstellt für Thomas Wagner (780,00 €)", type: "rechnung" },
    { time: "Heute, 09:00", text: "Termin mit Thomas Wagner gestartet - Kupplung Reparatur", type: "termin" },
    { time: "Gestern, 16:45", text: "Rechnung RE-2026-006 bezahlt von Julia Braun (290,00 €)", type: "zahlung" },
    { time: "Gestern, 11:00", text: "Sabine Müller - TÜV Erinnerung versendet", type: "erinnerung" },
    { time: "28.06.2026", text: "Markus Schneider - Großinspektion abgeschlossen", type: "termin" },
  ];

  const activityColors: Record<string, string> = {
    bewerbung: "#0074a2", rechnung: "#f59e0b", termin: "#10b981", zahlung: "#10b981", erinnerung: "#8b5cf6",
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-white">Guten Tag, Admin</h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          Mittwoch, 2. Juli 2026 - hier ist deine Tagesübersicht.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kunden gesamt" value={mockKunden.length} sub={`${mockKunden.filter(k => k.status === "aktiv").length} aktiv`} icon={<Users size={18} />} />
        <StatCard label="Heute Termine" value={todayTermine.length} sub="bestätigt & offen" icon={<Calendar size={18} />} color="#10b981" />
        <StatCard label="Offene Rechnungen" value={offeneRechnungen.length} sub={`${offeneRechnungen.reduce((s, r) => s + r.betrag, 0).toFixed(0)} € ausstehend`} icon={<Receipt size={18} />} color="#f59e0b" />
        <StatCard label="Kundenzufriedenheit" value={`${avgZufriedenheit}/5`} sub="Durchschnitt" icon={<TrendingUp size={18} />} color="#8b5cf6" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Neue Bewerbungen" value={neueBewerb.length} sub="unbearbeitet" icon={<Briefcase size={18} />} color="#ec4899" />
        <StatCard label="Offene Rückrufe" value={offeneCallbacks.length} sub="angefragte Termine" icon={<Phone size={18} />} color="#f97316" />
        <StatCard label="Fällige Erinnerungen" value={faelligeErinnerungen.length} sub="diese Woche" icon={<Bell size={18} />} color="#eab308" />
        <StatCard label="Umsatz (bezahlt)" value={`${totalUmsatz} €`} sub="Gesamtzeitraum" icon={<TrendingUp size={18} />} color="#10b981" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's appointments */}
        <AdminCard>
          <SectionHeader
            title="Termine heute"
            action={<Link href="/admin/termine" className="text-xs text-[#0074a2] hover:underline">Alle anzeigen</Link>}
          />
          <div className="space-y-3">
            {todayTermine.length === 0 ? (
              <p className="text-sm text-white/30 text-center py-8">Keine Termine heute</p>
            ) : (
              todayTermine.map(t => {
                const kunde = mockKunden.find(k => k.id === t.kundeId);
                return (
                  <div
                    key={t.id}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold text-white"
                      style={{ backgroundColor: "#0074a220" }}
                    >
                      {t.uhrzeit.slice(0, 5)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{t.serviceArt}</p>
                      <p className="text-xs text-white/40">{kunde?.vorname} {kunde?.nachname} - {t.dauer} min</p>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>
                );
              })
            )}
          </div>
        </AdminCard>

        {/* Open invoices */}
        <AdminCard>
          <SectionHeader
            title="Offene Rechnungen"
            action={<Link href="/admin/rechnungen" className="text-xs text-[#0074a2] hover:underline">Alle anzeigen</Link>}
          />
          <div className="space-y-3">
            {offeneRechnungen.map(r => {
              const kunde = mockKunden.find(k => k.id === r.kundeId);
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <Receipt size={16} className="text-white/30 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{r.nummer}</p>
                    <p className="text-xs text-white/40">{kunde?.vorname} {kunde?.nachname} - fällig {r.faellig}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-white">{r.betrag} €</p>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        {/* Reminders */}
        <AdminCard>
          <SectionHeader
            title="Ausstehende Erinnerungen"
            action={<Link href="/admin/erinnerungen" className="text-xs text-[#0074a2] hover:underline">Alle anzeigen</Link>}
          />
          <div className="space-y-3">
            {faelligeErinnerungen.map(e => {
              const kunde = mockKunden.find(k => k.id === e.kundeId);
              const typColors: Record<string, string> = { tuev: "#ef4444", inspektion: "#f59e0b", geburtstag: "#ec4899", reifen: "#8b5cf6", inaktiv: "#64748b" };
              return (
                <div
                  key={e.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: typColors[e.typ] }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{e.betreff}</p>
                    <p className="text-xs text-white/40">{kunde?.vorname} {kunde?.nachname} - fällig {e.faellig}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        {/* Activity feed */}
        <AdminCard>
          <SectionHeader title="Letzte Aktivitaten" />
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: activityColors[a.type] ?? "#64748b" }}
                />
                <div>
                  <p className="text-sm text-white/70">{a.text}</p>
                  <p className="text-xs text-white/30 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
