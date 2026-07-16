"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Phone, Mail, Car } from "lucide-react";
import Link from "next/link";
import { createKunde } from "@/lib/actions/crm";
import {
  AdminCard, AdminTable, AdminTr, AdminTd, AdminModal,
  AdminInput, AdminTextarea, AdminButton, StatusBadge, useToast,
} from "@/components/admin/admin-ui";

type Kunde = {
  id: string;
  vorname: string;
  nachname: string;
  email: string | null;
  telefon: string | null;
  status: string;
  letzter_besuch: string | null;
  erstellt_am: string;
  fahrzeuge?: { id: string; kennzeichen: string; marke: string; modell: string; tuev_datum: string | null }[];
};

export function KundenClient({ initialKunden }: { initialKunden: Kunde[] }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [addOpen, setAddOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { show } = useToast();
  const router = useRouter();

  const filtered = initialKunden.filter(k => {
    const term = search.toLowerCase();
    const matchSearch =
      `${k.vorname} ${k.nachname} ${k.email ?? ""} ${k.telefon ?? ""}`.toLowerCase().includes(term);
    const matchStatus = filterStatus === "alle" || k.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusOptions = ["alle", "aktiv", "inaktiv", "vip"];
  const statusLabels: Record<string, string> = { alle: "Alle", aktiv: "Aktiv", inaktiv: "Inaktiv", vip: "VIP" };

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await createKunde(fd);
        setAddOpen(false);
        show("Kunde wurde angelegt");
        router.refresh();
      } catch {
        show("Fehler beim Anlegen des Kunden");
      }
    });
  }

  const fmtDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" }) : "—";

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Kunden</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {initialKunden.length} {initialKunden.length === 1 ? "Kunde" : "Kunden"} insgesamt
          </p>
        </div>
        <AdminButton onClick={() => setAddOpen(true)}>
          <Plus size={14} /> Neuer Kunde
        </AdminButton>
      </div>

      {/* Filters */}
      <AdminCard className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Name, E-Mail, Telefon..."
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
        <div className="flex gap-1.5">
          {statusOptions.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filterStatus === s
                ? "bg-[#0074a2] text-white"
                : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard className="p-0 overflow-hidden">
        <AdminTable headers={["Kunde", "Kontakt", "Fahrzeuge", "Letzter Besuch", "Status", ""]}>
          {filtered.map(k => (
            <AdminTr key={k.id}>
              <AdminTd>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#0074a220", color: "#0074a2" }}
                  >
                    {k.vorname[0]}{k.nachname[0]}
                  </div>
                  <div>
                    <p className="font-medium text-white">{k.vorname} {k.nachname}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Seit {fmtDate(k.erstellt_am)}
                    </p>
                  </div>
                </div>
              </AdminTd>
              <AdminTd>
                <div className="space-y-0.5">
                  {k.telefon && (
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <Phone size={11} /> {k.telefon}
                    </div>
                  )}
                  {k.email && (
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <Mail size={11} /> {k.email}
                    </div>
                  )}
                </div>
              </AdminTd>
              <AdminTd>
                <div className="flex flex-wrap gap-1">
                  {(k.fahrzeuge ?? []).slice(0, 3).map(f => (
                    <span key={f.id} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      <Car size={10} /> {f.kennzeichen}
                    </span>
                  ))}
                  {(k.fahrzeuge?.length ?? 0) === 0 && (
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                  )}
                </div>
              </AdminTd>
              <AdminTd className="text-xs">
                <span style={{ color: "rgba(255,255,255,0.45)" }}>{fmtDate(k.letzter_besuch)}</span>
              </AdminTd>
              <AdminTd>
                <StatusBadge status={k.status} />
              </AdminTd>
              <AdminTd>
                <Link href={`/admin/kunden/${k.id}`}
                  className="text-xs font-medium hover:text-white transition-colors"
                  style={{ color: "#0074a2" }}>
                  Details →
                </Link>
              </AdminTd>
            </AdminTr>
          ))}
        </AdminTable>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
              {search || filterStatus !== "alle" ? "Keine Kunden gefunden" : "Noch keine Kunden angelegt"}
            </p>
          </div>
        )}
      </AdminCard>

      {/* Add Modal */}
      <AdminModal open={addOpen} onClose={() => setAddOpen(false)} title="Neuen Kunden anlegen">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Vorname *" name="vorname" placeholder="Max" required />
            <AdminInput label="Nachname *" name="nachname" placeholder="Mustermann" required />
          </div>
          <AdminInput label="E-Mail" name="email" type="email" placeholder="max@mustermann.de" />
          <AdminInput label="Telefon" name="telefon" placeholder="0176 ..." />
          <AdminInput label="Straße & Nr." name="adresse" placeholder="Hauptstraße 1" />
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="PLZ" name="plz" placeholder="72764" />
            <AdminInput label="Ort" name="ort" placeholder="Reutlingen" />
          </div>
          <AdminInput label="Geburtsdatum" name="geburtstag" type="date" />
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Status</label>
            <select name="status" defaultValue="aktiv"
              className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <option value="aktiv">Aktiv</option>
              <option value="inaktiv">Inaktiv</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          <AdminTextarea label="Notizen" name="notizen" placeholder="Interne Notizen..." rows={3} />
          <div className="flex justify-end gap-2 pt-2">
            <AdminButton type="button" variant="ghost" onClick={() => setAddOpen(false)}>Abbrechen</AdminButton>
            <AdminButton type="submit" disabled={isPending}>
              {isPending ? "Speichern..." : "Kunde anlegen"}
            </AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
