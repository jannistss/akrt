"use client";

import { useState } from "react";
import { Search, Plus, User, Phone, Mail, Shield, ShieldOff } from "lucide-react";
import Link from "next/link";
import { mockKunden, getFahrzeugeByKunde } from "@/lib/admin/mock-data";
import {
  AdminCard, StatusBadge, AdminTable, AdminTr, AdminTd,
  AdminButton, AdminModal, AdminInput, useToast,
} from "@/components/admin/admin-ui";

export default function KundenPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [addOpen, setAddOpen] = useState(false);
  const { show } = useToast();

  const filtered = mockKunden.filter(k => {
    const term = search.toLowerCase();
    const matchSearch = `${k.vorname} ${k.nachname} ${k.email} ${k.telefon}`.toLowerCase().includes(term);
    const matchStatus = filterStatus === "alle" || k.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Kunden</h2>
          <p className="text-sm text-white/40 mt-0.5">{mockKunden.length} Kunden insgesamt</p>
        </div>
        <AdminButton onClick={() => setAddOpen(true)}>
          <Plus size={14} /> Neuer Kunde
        </AdminButton>
      </div>

      {/* Filters */}
      <AdminCard className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Name, E-Mail, Telefon..."
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
        <div className="flex gap-2">
          {["alle", "aktiv", "inaktiv", "gesperrt"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-[#0074a2] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {s === "alle" ? "Alle" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard className="p-0 overflow-hidden">
        <AdminTable headers={["Kunde", "Kontakt", "Fahrzeuge", "Letzter Kontakt", "DSGVO", "Status", ""]}>
          {filtered.map(k => {
            const fahrzeuge = getFahrzeugeByKunde(k.id);
            return (
              <AdminTr key={k.id}>
                <AdminTd>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: "#0074a220", color: "#0074a2" }}
                    >
                      {k.vorname[0]}{k.nachname[0]}
                    </div>
                    <div>
                      <p className="font-medium text-white">{k.vorname} {k.nachname}</p>
                      <p className="text-xs text-white/30">{k.plz} {k.ort}</p>
                    </div>
                  </div>
                </AdminTd>
                <AdminTd>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Phone size={11} /> {k.telefon}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Mail size={11} /> {k.email}
                    </div>
                  </div>
                </AdminTd>
                <AdminTd>
                  <div className="flex flex-wrap gap-1">
                    {fahrzeuge.map(f => (
                      <span key={f.id} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                        {f.kennzeichen}
                      </span>
                    ))}
                  </div>
                </AdminTd>
                <AdminTd className="text-xs">{k.letzterKontakt}</AdminTd>
                <AdminTd>
                  {k.dsgvo
                    ? <Shield size={14} className="text-green-400" />
                    : <ShieldOff size={14} className="text-red-400" />
                  }
                </AdminTd>
                <AdminTd><StatusBadge status={k.status} /></AdminTd>
                <AdminTd>
                  <Link href={`/admin/kunden/${k.id}`} className="text-xs text-[#0074a2] hover:underline">
                    Details
                  </Link>
                </AdminTd>
              </AdminTr>
            );
          })}
        </AdminTable>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-white/30 py-12">Keine Kunden gefunden</p>
        )}
      </AdminCard>

      {/* Add Modal */}
      <AdminModal open={addOpen} onClose={() => setAddOpen(false)} title="Neuen Kunden anlegen">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Vorname" placeholder="Max" />
            <AdminInput label="Nachname" placeholder="Mustermann" />
          </div>
          <AdminInput label="E-Mail" type="email" placeholder="max@mustermann.de" />
          <AdminInput label="Telefon" placeholder="0176 ..." />
          <AdminInput label="Straße" placeholder="Hauptstraße 1" />
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="PLZ" placeholder="72764" />
            <AdminInput label="Ort" placeholder="Reutlingen" />
          </div>
          <AdminInput label="Geburtsdatum" type="date" />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="ghost" onClick={() => setAddOpen(false)}>Abbrechen</AdminButton>
            <AdminButton onClick={() => { setAddOpen(false); show("Kunde wurde angelegt (Demo)"); }}>
              Speichern
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
