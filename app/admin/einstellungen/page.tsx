"use client";

import { SectionHeader } from "@/components/admin/admin-ui";
import { Building2, Mail, Phone, MapPin, Clock, Bell, Shield, Palette } from "lucide-react";

function SettingSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[#0074a2]">{icon}</span>
        <h2 className="font-semibold text-white text-base">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <input
        defaultValue={value}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-64 focus:outline-none focus:border-[#0074a2] transition-colors"
      />
    </div>
  );
}

function ToggleRow({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/40 mt-0.5">{description}</p>
      </div>
      <div className={`w-11 h-6 rounded-full cursor-pointer transition-colors ${defaultChecked ? "bg-[#0074a2]" : "bg-white/10"} relative`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${defaultChecked ? "translate-x-6" : "translate-x-1"}`} />
      </div>
    </div>
  );
}

export default function EinstellungenPage() {
  return (
    <div className="space-y-8">
      <SectionHeader title="Einstellungen" subtitle="Werkstatt- und Systemkonfiguration" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingSection title="Werkstatt" icon={<Building2 size={18} />}>
          <SettingRow label="Name" value="Autoklinik Reutlingen" />
          <SettingRow label="Telefon" value="+49 7121 000000" />
          <SettingRow label="E-Mail" value="info@autoklinik-reutlingen.de" />
          <SettingRow label="Adresse" value="Haldenhaustrasse 3, 72770 Reutlingen" />
        </SettingSection>

        <SettingSection title="Offnungszeiten" icon={<Clock size={18} />}>
          <SettingRow label="Montag - Freitag" value="08:00 - 18:00" />
          <SettingRow label="Samstag" value="09:00 - 14:00" />
          <SettingRow label="Sonntag" value="Geschlossen" />
        </SettingSection>

        <SettingSection title="Benachrichtigungen" icon={<Bell size={18} />}>
          <ToggleRow label="Neue Bewerbungen" description="E-Mail bei neuer Bewerbung" defaultChecked />
          <ToggleRow label="Neue Kontaktanfragen" description="E-Mail bei neuer Anfrage" defaultChecked />
          <ToggleRow label="Terminerinnerungen" description="24h vor Termin erinnern" defaultChecked />
          <ToggleRow label="TUV-Ablauf-Warnungen" description="30 Tage vor Ablauf" />
        </SettingSection>

        <SettingSection title="Sicherheit" icon={<Shield size={18} />}>
          <SettingRow label="Admin-Passwort" value="••••••••" />
          <ToggleRow label="Zwei-Faktor-Auth" description="Zusatzlicher Schutz beim Login" />
          <ToggleRow label="Session-Timeout" description="Nach 30 Minuten automatisch ausloggen" defaultChecked />
        </SettingSection>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#0074a2] hover:bg-[#005f87] text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm">
          Anderungen speichern
        </button>
      </div>
    </div>
  );
}
