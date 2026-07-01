"use client";

import { use, useState } from "react";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Car, Receipt, Shield, ShieldOff, Plus, Edit2 } from "lucide-react";
import Link from "next/link";
import {
  getKundeById, getFahrzeugeByKunde, getRechnungenByKunde,
  getTermineByKunde,
} from "@/lib/admin/mock-data";
import {
  AdminCard, StatusBadge, AdminButton, AdminModal,
  AdminTextarea, useToast,
} from "@/components/admin/admin-ui";

export default function KundeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const kunde = getKundeById(id);
  const [activeTab, setActiveTab] = useState("uebersicht");
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const { show } = useToast();

  if (!kunde) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Kunde nicht gefunden</p>
        <Link href="/admin/kunden" className="text-[#0074a2] text-sm mt-2 block hover:underline">Zurück zur Liste</Link>
      </div>
    );
  }

  const fahrzeuge = getFahrzeugeByKunde(id);
  const rechnungen = getRechnungenByKunde(id);
  const termine = getTermineByKunde(id);

  const tabs = [
    { key: "uebersicht", label: "Ubersicht" },
    { key: "fahrzeuge", label: `Fahrzeuge (${fahrzeuge.length})` },
    { key: "termine", label: `Termine (${termine.length})` },
    { key: "rechnungen", label: `Rechnungen (${rechnungen.length})` },
    { key: "notizen", label: "Notizen" },
  ];

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/kunden" className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex items-center gap-4 flex-1">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
            style={{ backgroundColor: "#0074a225", color: "#0074a2" }}
          >
            {kunde.vorname[0]}{kunde.nachname[0]}
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">{kunde.vorname} {kunde.nachname}</h1>
            <div className="flex items-center gap-3 mt-0.5">
              <StatusBadge status={kunde.status} />
              {kunde.dsgvo
                ? <span className="flex items-center gap-1 text-xs text-green-400"><Shield size={11} /> DSGVO ok</span>
                : <span className="flex items-center gap-1 text-xs text-red-400"><ShieldOff size={11} /> DSGVO fehlt</span>
              }
              <span className="text-xs text-white/30">Zufriedenheit: {"★".repeat(kunde.zufriedenheit)}{"☆".repeat(5 - kunde.zufriedenheit)}</span>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <AdminButton size="sm" variant="ghost" onClick={() => show("Bearbeiten (Demo)")}>
              <Edit2 size={12} /> Bearbeiten
            </AdminButton>
            <AdminButton size="sm" onClick={() => show("Termin erstellt (Demo)")}>
              <Plus size={12} /> Termin
            </AdminButton>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === t.key
                ? "text-white border-[#0074a2]"
                : "text-white/40 border-transparent hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Ubersicht */}
      {activeTab === "uebersicht" && (
        <div className="grid md:grid-cols-2 gap-5">
          <AdminCard>
            <h3 className="text-sm font-semibold text-white mb-4">Kontaktdaten</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-xs text-white/30">Telefon</p>
                  <a href={`tel:${kunde.telefon}`} className="text-sm text-white hover:text-[#0074a2] transition-colors">{kunde.telefon}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-xs text-white/30">E-Mail</p>
                  <a href={`mailto:${kunde.email}`} className="text-sm text-white hover:text-[#0074a2] transition-colors">{kunde.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-xs text-white/30">Adresse</p>
                  <p className="text-sm text-white">{kunde.strasse}, {kunde.plz} {kunde.ort}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-xs text-white/30">Geburtstag</p>
                  <p className="text-sm text-white">{new Date(kunde.geburtsdatum).toLocaleDateString("de-DE")}</p>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <h3 className="text-sm font-semibold text-white mb-4">Statistiken</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-2xl font-bold text-white">{fahrzeuge.length}</p>
                <p className="text-xs text-white/40 mt-0.5">Fahrzeuge</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-2xl font-bold text-white">{termine.length}</p>
                <p className="text-xs text-white/40 mt-0.5">Termine</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-2xl font-bold text-white">{rechnungen.reduce((s, r) => s + r.betrag, 0)} €</p>
                <p className="text-xs text-white/40 mt-0.5">Umsatz gesamt</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="text-2xl font-bold text-white">{kunde.letzterKontakt}</p>
                <p className="text-xs text-white/40 mt-0.5">Letzter Kontakt</p>
              </div>
            </div>
          </AdminCard>

          {/* Communication Timeline */}
          <AdminCard className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Kommunikationsverlauf</h3>
            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
              {[
                { datum: "01.07.2026", text: `Bewerbung-Link-Klick - Karriereseite besucht`, typ: "web" },
                { datum: "28.06.2026", text: "Inspektion abgeschlossen, Rechnung RE-2026-001 erstellt", typ: "termin" },
                { datum: "28.06.2026", text: "Termin-Bestätigung per SMS versendet", typ: "sms" },
                { datum: "10.02.2026", text: "Bremsenwechsel abgeschlossen", typ: "termin" },
              ].map((e, i) => (
                <div key={i} className="flex gap-4 pl-6 relative">
                  <div className="absolute left-0 w-3.5 h-3.5 rounded-full mt-0.5" style={{ backgroundColor: "#0074a2" }} />
                  <div>
                    <p className="text-sm text-white/70">{e.text}</p>
                    <p className="text-xs text-white/30 mt-0.5">{e.datum}</p>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      )}

      {/* Fahrzeuge Tab */}
      {activeTab === "fahrzeuge" && (
        <div className="grid md:grid-cols-2 gap-4">
          {fahrzeuge.map(f => (
            <AdminCard key={f.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Car size={16} className="text-white/40" />
                  <p className="font-semibold text-white">{f.kennzeichen}</p>
                </div>
                <Link href={`/admin/fahrzeuge/${f.id}`} className="text-xs text-[#0074a2] hover:underline">Details</Link>
              </div>
              <p className="text-sm text-white/60">{f.marke} {f.modell} ({f.baujahr})</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-xs text-white/30">TÜV fällig</p>
                  <p className="text-sm text-white">{f.tuevFaellig}</p>
                </div>
                <div>
                  <p className="text-xs text-white/30">Kilometerstand</p>
                  <p className="text-sm text-white">{f.kilometerstand.toLocaleString("de-DE")} km</p>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Termine Tab */}
      {activeTab === "termine" && (
        <AdminCard className="p-0 overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white">Terminhistorie</h3>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {termine.map(t => (
              <div key={t.id} className="px-4 py-3 flex items-center gap-4">
                <div className="text-xs text-white/30 w-20 shrink-0">{t.datum}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{t.serviceArt}</p>
                  <p className="text-xs text-white/40">{t.uhrzeit} Uhr - {t.dauer} min{t.mechaniker ? ` - ${t.mechaniker}` : ""}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {/* Rechnungen Tab */}
      {activeTab === "rechnungen" && (
        <div className="space-y-3">
          {rechnungen.map(r => (
            <AdminCard key={r.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{r.nummer}</p>
                  <p className="text-xs text-white/40 mt-0.5">Erstellt: {r.datum} - Fällig: {r.faellig}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{r.betrag} €</p>
                  <StatusBadge status={r.status} />
                </div>
              </div>
              <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {r.positionen.map((p, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-white/50">{p.menge}x {p.beschreibung}</span>
                    <span className="text-white/70">{(p.menge * p.einzelpreis).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Notizen Tab */}
      {activeTab === "notizen" && (
        <div className="space-y-4">
          <AdminCard>
            <p className="text-sm text-white/60">{kunde.notizen || "Keine Notizen vorhanden."}</p>
          </AdminCard>
          <AdminButton onClick={() => setNoteOpen(true)}>
            <Plus size={14} /> Notiz hinzufugen
          </AdminButton>
        </div>
      )}

      <AdminModal open={noteOpen} onClose={() => setNoteOpen(false)} title="Notiz hinzufugen">
        <div className="space-y-4">
          <AdminTextarea label="Notiz" rows={4} value={note} onChange={e => setNote(e.target.value)} placeholder="Ihre Notiz..." />
          <div className="flex justify-end gap-2">
            <AdminButton variant="ghost" onClick={() => setNoteOpen(false)}>Abbrechen</AdminButton>
            <AdminButton onClick={() => { setNoteOpen(false); show("Notiz gespeichert (Demo)"); }}>Speichern</AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
