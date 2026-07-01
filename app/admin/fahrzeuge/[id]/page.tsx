"use client";

import { use } from "react";
import { ArrowLeft, User, AlertTriangle, Wrench } from "lucide-react";
import Link from "next/link";
import { getFahrzeugById, getKundeById, getTermineByFahrzeug } from "@/lib/admin/mock-data";
import { AdminCard, StatusBadge, AdminButton, useToast } from "@/components/admin/admin-ui";

export default function FahrzeugDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fahrzeug = getFahrzeugById(id);
  const { show } = useToast();

  if (!fahrzeug) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Fahrzeug nicht gefunden</p>
        <Link href="/admin/fahrzeuge" className="text-[#0074a2] text-sm mt-2 block hover:underline">Zuruck</Link>
      </div>
    );
  }

  const kunde = getKundeById(fahrzeug.kundeId);
  const termine = getTermineByFahrzeug(id);
  const today = new Date().toISOString().split("T")[0];
  const tuevStatus = fahrzeug.tuevFaellig < today ? "abgelaufen" : "ok";

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/fahrzeuge" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1 flex items-center gap-4">
          <div
            className="px-4 py-2 rounded-xl text-lg font-bold tracking-widest"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "white" }}
          >
            {fahrzeug.kennzeichen}
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">{fahrzeug.marke} {fahrzeug.modell}</h1>
            <p className="text-sm text-white/40">{fahrzeug.baujahr} - {fahrzeug.farbe}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <AdminButton size="sm" onClick={() => show("TUV-Erinnerung gesendet (Demo)")}>
              Erinnerung senden
            </AdminButton>
            <AdminButton size="sm" variant="ghost" onClick={() => show("Termin erstellt (Demo)")}>
              Termin anlegen
            </AdminButton>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Details */}
        <AdminCard className="md:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">Fahrzeugdaten</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {[
              ["Marke", fahrzeug.marke],
              ["Modell", fahrzeug.modell],
              ["Baujahr", fahrzeug.baujahr],
              ["Farbe", fahrzeug.farbe],
              ["VIN", fahrzeug.vin],
              ["Kilometerstand", `${fahrzeug.kilometerstand.toLocaleString("de-DE")} km`],
              ["TUV fallig", fahrzeug.tuevFaellig],
              ["Nachste Inspektion", fahrzeug.naechsteInspektion],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-xs text-white/30">{label as string}</p>
                <p className="text-sm text-white mt-0.5">{value as string}</p>
              </div>
            ))}
          </div>

          {tuevStatus === "abgelaufen" && (
            <div
              className="mt-4 flex items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <AlertTriangle size={14} className="text-red-400 shrink-0" />
              <p className="text-xs text-red-400">TUV ist abgelaufen! Bitte sofort Erinnerung senden.</p>
            </div>
          )}
        </AdminCard>

        {/* Kunde */}
        <AdminCard>
          <h3 className="text-sm font-semibold text-white mb-4">Fahrzeughalter</h3>
          {kunde && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "#0074a220", color: "#0074a2" }}
                >
                  {kunde.vorname[0]}{kunde.nachname[0]}
                </div>
                <div>
                  <p className="font-medium text-white">{kunde.vorname} {kunde.nachname}</p>
                  <p className="text-xs text-white/40">{kunde.telefon}</p>
                </div>
              </div>
              <Link href={`/admin/kunden/${kunde.id}`} className="text-xs text-[#0074a2] hover:underline flex items-center gap-1">
                <User size={11} /> Kundenprofil anzeigen
              </Link>
            </div>
          )}
        </AdminCard>
      </div>

      {/* Service History */}
      <AdminCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Servicehistorie</h3>
          <AdminButton size="sm" variant="ghost" onClick={() => show("Serviceeintrag hinzugefugt (Demo)")}>
            <Wrench size={12} /> Eintrag hinzufugen
          </AdminButton>
        </div>
        {fahrzeug.serviceHistory.length === 0 ? (
          <p className="text-sm text-white/30 text-center py-8">Noch keine Serviceeintrager</p>
        ) : (
          <div className="space-y-3">
            {fahrzeug.serviceHistory.map((s, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="text-xs text-white/30 w-24 shrink-0 pt-0.5">{s.datum}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{s.art}</p>
                  <p className="text-sm text-white/50 mt-0.5">{s.beschreibung}</p>
                  <p className="text-xs text-white/30 mt-1">{s.km.toLocaleString("de-DE")} km - {s.mechaniker}</p>
                </div>
                <div className="text-sm font-semibold text-white shrink-0">{s.kosten} €</div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Termine */}
      {termine.length > 0 && (
        <AdminCard>
          <h3 className="text-sm font-semibold text-white mb-4">Termine</h3>
          <div className="space-y-2">
            {termine.map(t => (
              <div key={t.id} className="flex items-center gap-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-xs text-white/30 w-24">{t.datum}</span>
                <span className="text-sm text-white flex-1">{t.serviceArt}</span>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
