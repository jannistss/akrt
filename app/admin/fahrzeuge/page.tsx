"use client";

import { useState } from "react";
import { Search, Car, AlertTriangle, Plus } from "lucide-react";
import Link from "next/link";
import { mockFahrzeuge, mockKunden } from "@/lib/admin/mock-data";
import { AdminCard, AdminButton, AdminModal, AdminInput, useToast } from "@/components/admin/admin-ui";

export default function FahrzeugePage() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const { show } = useToast();

  const today = new Date();
  const in60 = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const filtered = mockFahrzeuge.filter(f => {
    const term = search.toLowerCase();
    return `${f.kennzeichen} ${f.marke} ${f.modell}`.toLowerCase().includes(term);
  });

  const tuevWarning = (tuevDate: string) => {
    if (tuevDate <= today.toISOString().split("T")[0]) return "abgelaufen";
    if (tuevDate <= in60) return "bald";
    return "ok";
  };

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Fahrzeuge</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockFahrzeuge.length} Fahrzeuge insgesamt</p>
        </div>
        <AdminButton onClick={() => setAddOpen(true)}>
          <Plus size={14} /> Fahrzeug anlegen
        </AdminButton>
      </div>

      {/* Search */}
      <AdminCard className="py-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Kennzeichen, Marke, Modell..."
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </AdminCard>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(f => {
          const kunde = mockKunden.find(k => k.id === f.kundeId);
          const tuev = tuevWarning(f.tuevFaellig);
          return (
            <AdminCard key={f.id} className="hover:border-[#0074a2]/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="px-2.5 py-1 rounded-lg text-sm font-bold tracking-wider"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)" }}
                >
                  {f.kennzeichen}
                </div>
                {tuev !== "ok" && (
                  <span className={`flex items-center gap-1 text-xs font-medium ${tuev === "abgelaufen" ? "text-red-400" : "text-yellow-400"}`}>
                    <AlertTriangle size={12} />
                    {tuev === "abgelaufen" ? "TUV abgelaufen" : "TUV bald"}
                  </span>
                )}
              </div>
              <p className="font-semibold text-white">{f.marke} {f.modell}</p>
              <p className="text-xs text-white/40 mt-0.5">{f.baujahr} - {f.farbe}</p>
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-xs text-white/30">KM-Stand</p>
                  <p className="text-sm text-white">{f.kilometerstand.toLocaleString("de-DE")}</p>
                </div>
                <div>
                  <p className="text-xs text-white/30">TUV fallig</p>
                  <p className={`text-sm ${tuev === "abgelaufen" ? "text-red-400" : tuev === "bald" ? "text-yellow-400" : "text-white"}`}>
                    {f.tuevFaellig}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-xs text-white/30">
                  <Car size={11} className="inline mr-1" />
                  {kunde?.vorname} {kunde?.nachname}
                </span>
                <Link href={`/admin/fahrzeuge/${f.id}`} className="text-xs text-[#0074a2] hover:underline">
                  Details
                </Link>
              </div>
            </AdminCard>
          );
        })}
      </div>

      <AdminModal open={addOpen} onClose={() => setAddOpen(false)} title="Fahrzeug anlegen">
        <div className="space-y-4">
          <AdminInput label="Kennzeichen" placeholder="RT-XX 000" />
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Marke" placeholder="BMW" />
            <AdminInput label="Modell" placeholder="3er" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Baujahr" type="number" placeholder="2020" />
            <AdminInput label="Farbe" placeholder="Weiss" />
          </div>
          <AdminInput label="VIN" placeholder="WBA..." />
          <AdminInput label="Kilometerstand" type="number" placeholder="50000" />
          <AdminInput label="TUV fallig" type="date" />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="ghost" onClick={() => setAddOpen(false)}>Abbrechen</AdminButton>
            <AdminButton onClick={() => { setAddOpen(false); show("Fahrzeug angelegt (Demo)"); }}>Speichern</AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
