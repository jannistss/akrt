"use client";

import { mockKampagnen } from "@/lib/admin/mock-data";
import { StatCard, StatusBadge, SectionHeader } from "@/components/admin/admin-ui";
import { Megaphone, Users, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function KampagnenPage() {
  const geplant = mockKampagnen.filter((c) => c.status === "geplant").length;
  const gesendet = mockKampagnen.filter((c) => c.status === "gesendet").length;
  const totalEmpfaenger = mockKampagnen.reduce((s, c) => s + (c.empfaenger ?? 0), 0);

  return (
    <div className="space-y-8">
      <SectionHeader title="Kampagnen" subtitle="E-Mail- und SMS-Marketingkampagnen" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Gesamt" value={mockKampagnen.length} icon={<Megaphone size={20} />} />
        <StatCard label="Geplant" value={geplant} icon={<Clock size={20} />} color="text-blue-400" />
        <StatCard label="Gesendet" value={gesendet} icon={<CheckCircle size={20} />} color="text-green-400" />
        <StatCard label="Empfanger" value={totalEmpfaenger} icon={<Users size={20} />} />
      </div>

      <div className="bg-[#0d1117] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Kampagne</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Typ</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Empfanger</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Geoffnet</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Datum</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockKampagnen.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4 font-medium text-white">{c.name}</td>
                <td className="px-5 py-4 text-white/50 capitalize">{c.typ}</td>
                <td className="px-5 py-4 text-white/70">{c.empfaenger ?? "-"}</td>
                <td className="px-5 py-4 text-white/70">{c.geoeffnet != null ? `${Math.round((c.geoeffnet / (c.empfaenger ?? 1)) * 100)}%` : "-"}</td>
                <td className="px-5 py-4 text-white/50">
                  {format(new Date(c.geplantFuer), "dd. MMM yyyy", { locale: de })}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
