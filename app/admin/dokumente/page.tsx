"use client";

import { useState } from "react";
import { FileText, Upload, Search, Download, Eye, Car, Receipt, Wrench, Shield, Image } from "lucide-react";
import { mockKunden, mockFahrzeuge, mockRechnungen } from "@/lib/admin/mock-data";
import { AdminCard, AdminButton, useToast, EmptyState } from "@/components/admin/admin-ui";

type DokTyp = "alle" | "rechnung" | "tüv" | "reparatur" | "bild" | "sonstiges";

interface MockDokument {
  id: string;
  name: string;
  typ: Exclude<DokTyp, "alle">;
  kundeId?: string;
  fahrzeugId?: string;
  datum: string;
  groesse: string;
}

const mockDokumente: MockDokument[] = [
  { id: "d001", name: "RE-2026-001 Markus Schneider.pdf", typ: "rechnung", kundeId: "k001", fahrzeugId: "f001", datum: "2026-06-28", groesse: "234 KB" },
  { id: "d002", name: "RE-2026-002 Sabine Muller.pdf", typ: "rechnung", kundeId: "k002", fahrzeugId: "f002", datum: "2026-06-20", groesse: "198 KB" },
  { id: "d003", name: "TUV-Bericht VW Golf RT-SM44.pdf", typ: "tüv", kundeId: "k002", fahrzeugId: "f002", datum: "2026-06-20", groesse: "312 KB" },
  { id: "d004", name: "Reparaturbericht Kupplung Sprinter.pdf", typ: "reparatur", kundeId: "k003", fahrzeugId: "f003", datum: "2026-07-01", groesse: "456 KB" },
  { id: "d005", name: "Schadensfotos Seat Ibiza Frontscheibe.jpg", typ: "bild", kundeId: "k006", fahrzeugId: "f007", datum: "2026-06-30", groesse: "1.2 MB" },
  { id: "d006", name: "RE-2026-004 Thomas Wagner.pdf", typ: "rechnung", kundeId: "k003", fahrzeugId: "f003", datum: "2026-07-01", groesse: "267 KB" },
  { id: "d007", name: "TUV-Erinnerungsschreiben Opel Astra.pdf", typ: "tüv", kundeId: "k005", fahrzeugId: "f006", datum: "2026-07-01", groesse: "89 KB" },
  { id: "d008", name: "DSGVO-Einwilligung Markus Schneider.pdf", typ: "sonstiges", kundeId: "k001", datum: "2026-04-01", groesse: "45 KB" },
];

const typIcons: Record<Exclude<DokTyp, "alle">, React.ReactNode> = {
  rechnung: <Receipt size={16} />,
  tüv: <Shield size={16} />,
  reparatur: <Wrench size={16} />,
  bild: <Image size={16} />,
  sonstiges: <FileText size={16} />,
};

const typColors: Record<Exclude<DokTyp, "alle">, string> = {
  rechnung: "#f59e0b",
  tüv: "#0074a2",
  reparatur: "#10b981",
  bild: "#8b5cf6",
  sonstiges: "#64748b",
};

export default function DokumentePage() {
  const [search, setSearch] = useState("");
  const [filterTyp, setFilterTyp] = useState<DokTyp>("alle");
  const { show } = useToast();

  const filtered = mockDokumente.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchTyp = filterTyp === "alle" || d.typ === filterTyp;
    return matchSearch && matchTyp;
  });

  const typen: { key: DokTyp; label: string }[] = [
    { key: "alle", label: "Alle" },
    { key: "rechnung", label: "Rechnungen" },
    { key: "tüv", label: "TUV" },
    { key: "reparatur", label: "Reparaturberichte" },
    { key: "bild", label: "Fotos" },
    { key: "sonstiges", label: "Sonstiges" },
  ];

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Dokumente</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockDokumente.length} Dokumente</p>
        </div>
        <AdminButton onClick={() => show("Upload-Fenster geoffnet (Demo)")}>
          <Upload size={14} /> Dokument hochladen
        </AdminButton>
      </div>

      {/* Filters */}
      <AdminCard className="py-3 space-y-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Dokument suchen..."
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
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

      {/* Upload Drop Zone */}
      <div
        className="rounded-xl p-8 text-center cursor-pointer transition-colors hover:border-[#0074a2]/40"
        style={{ border: "2px dashed rgba(255,255,255,0.1)" }}
        onClick={() => show("Drag & Drop Upload (Demo)")}
      >
        <Upload size={24} className="mx-auto text-white/20 mb-2" />
        <p className="text-sm text-white/30">Dateien hierher ziehen oder</p>
        <button className="text-sm text-[#0074a2] hover:underline mt-1">Datei auswahlen</button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={<FileText size={32} />} title="Keine Dokumente gefunden" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(d => {
            const kunde = d.kundeId ? mockKunden.find(k => k.id === d.kundeId) : null;
            const fahrzeug = d.fahrzeugId ? mockFahrzeuge.find(f => f.id === d.fahrzeugId) : null;
            return (
              <AdminCard key={d.id} className="group">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ backgroundColor: `${typColors[d.typ]}20`, color: typColors[d.typ] }}
                  >
                    {typIcons[d.typ]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white leading-tight line-clamp-2">{d.name}</p>
                    <p className="text-xs text-white/30 mt-1">{d.groesse} - {d.datum}</p>
                  </div>
                </div>
                {(kunde || fahrzeug) && (
                  <div className="space-y-1 mb-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {kunde && (
                      <p className="text-xs text-white/40 flex items-center gap-1">
                        <FileText size={10} /> {kunde.vorname} {kunde.nachname}
                      </p>
                    )}
                    {fahrzeug && (
                      <p className="text-xs text-white/40 flex items-center gap-1">
                        <Car size={10} /> {fahrzeug.kennzeichen}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex gap-2">
                  <AdminButton size="sm" variant="ghost" className="flex-1" onClick={() => show(`Vorschau: ${d.name} (Demo)`)}>
                    <Eye size={11} /> Anzeigen
                  </AdminButton>
                  <AdminButton size="sm" variant="ghost" className="flex-1" onClick={() => show(`Download: ${d.name} (Demo)`)}>
                    <Download size={11} /> Download
                  </AdminButton>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
