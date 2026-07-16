import { getDashboardStats } from "@/lib/actions/crm";
import { Users, Calendar, Receipt, TrendingUp, AlertTriangle, Bell, Briefcase } from "lucide-react";
import Link from "next/link";

function KPICard({ label, value, sub, icon, color, href }: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; color: string; href?: string;
}) {
  const inner = (
    <div
      className="rounded-xl p-5 flex items-start gap-4 h-full transition-all hover:border-white/10"
      style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: `${color}18` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-white tabular-nums leading-tight">{value}</p>
        <p className="text-xs font-semibold text-white/50 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-white/25 mt-1">{sub}</p>}
      </div>
    </div>
  );
  return href ? <Link href={href} className="block h-full">{inner}</Link> : <div className="h-full">{inner}</div>;
}

export default async function DashboardPage() {
  let stats;
  try {
    stats = await getDashboardStats();
  } catch {
    stats = {
      gesamtKunden: 0, termineHeute: [], offeneRechnungen: 0,
      offeneRechnungenBetrag: 0, tuevFaellig: [], inaktiveKunden: [],
      umsatzMonat: 0, neueBewerbungen: 0,
    };
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });

  const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
    ausstehend: { bg: "#f59e0b20", color: "#f59e0b", label: "Ausstehend" },
    bestaetigt: { bg: "#10b98120", color: "#10b981", label: "Bestätigt" },
    abgeschlossen: { bg: "#ffffff10", color: "#ffffff40", label: "Abgeschlossen" },
    storniert: { bg: "#ef444420", color: "#ef4444", label: "Storniert" },
    nicht_erschienen: { bg: "#ef444420", color: "#ef4444", label: "Nicht erschienen" },
  };

  const today = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-7 max-w-7xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{today}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Kunden gesamt" value={stats.gesamtKunden}
          icon={<Users size={18} />} color="#0074a2" href="/admin/kunden" />
        <KPICard label="Termine heute" value={stats.termineHeute.length}
          sub={stats.termineHeute.length > 0
            ? `${fmtTime((stats.termineHeute[0] as { datum: string }).datum)} Uhr erster Termin`
            : "Keine Termine"}
          icon={<Calendar size={18} />} color="#10b981" href="/admin/termine" />
        <KPICard label="Offene Rechnungen" value={stats.offeneRechnungen}
          sub={stats.offeneRechnungen > 0 ? `${fmt(stats.offeneRechnungenBetrag)} offen` : "Alles bezahlt"}
          icon={<Receipt size={18} />} color="#f59e0b" href="/admin/rechnungen" />
        <KPICard label="Umsatz diesen Monat" value={fmt(stats.umsatzMonat)}
          icon={<TrendingUp size={18} />} color="#8b5cf6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Termine heute — spans 2 cols */}
        <div
          className="lg:col-span-2 rounded-xl overflow-hidden"
          style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <Calendar size={15} style={{ color: "#10b981" }} />
              <h2 className="text-sm font-semibold text-white">Termine heute</h2>
            </div>
            <Link href="/admin/termine" className="text-xs font-semibold hover:text-white transition-colors" style={{ color: "#0074a2" }}>
              Alle →
            </Link>
          </div>
          <div className="p-5">
            {stats.termineHeute.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Calendar size={36} className="opacity-10 text-white" />
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>Keine Termine heute</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(stats.termineHeute as Record<string, unknown>[]).map((t) => {
                  const k = t.kunden as Record<string, string> | null;
                  const s = statusStyle[t.status as string] ?? statusStyle.ausstehend;
                  return (
                    <div key={t.id as string}
                      className="grid items-center gap-3 px-4 py-3 rounded-lg"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", gridTemplateColumns: "3rem 1fr auto" }}
                    >
                      <span className="text-xs font-mono tabular-nums text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {fmtTime(t.datum as string)}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {k ? `${k.vorname} ${k.nachname}` : "Unbekannt"}
                        </p>
                        <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{t.leistung as string}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                        style={{ backgroundColor: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* TÜV fällig */}
          <div className="rounded-xl p-5" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={14} style={{ color: "#f59e0b" }} />
              <h2 className="text-sm font-semibold text-white flex-1">TÜV fällig</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#f59e0b20", color: "#f59e0b" }}>
                {stats.tuevFaellig.length}
              </span>
            </div>
            {stats.tuevFaellig.length === 0 ? (
              <p className="text-xs py-3" style={{ color: "rgba(255,255,255,0.2)" }}>Kein TÜV in den nächsten 8 Wochen fällig.</p>
            ) : (
              <div className="space-y-3">
                {(stats.tuevFaellig as Record<string, unknown>[]).slice(0, 4).map((f) => {
                  const k = f.kunden as Record<string, string> | null;
                  return (
                    <div key={f.id as string} className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate">{f.kennzeichen as string}</p>
                        <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {k ? `${k.vorname} ${k.nachname}` : "—"}
                        </p>
                      </div>
                      <span className="text-xs font-mono shrink-0" style={{ color: "#f59e0b" }}>
                        {fmtDate(f.tuev_datum as string)}
                      </span>
                    </div>
                  );
                })}
                {stats.tuevFaellig.length > 4 && (
                  <Link href="/admin/fahrzeuge" className="block text-xs mt-1 hover:text-white/50 transition-colors" style={{ color: "rgba(255,255,255,0.25)" }}>
                    +{stats.tuevFaellig.length - 4} weitere →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Reaktivierung */}
          <div className="rounded-xl p-5" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={14} style={{ color: "#8b5cf6" }} />
              <h2 className="text-sm font-semibold text-white flex-1">Reaktivierung</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#8b5cf620", color: "#8b5cf6" }}>
                {stats.inaktiveKunden.length}
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              Seit &gt;90 Tagen kein Besuch
            </p>
            {stats.inaktiveKunden.length > 0 && (
              <Link href="/admin/erinnerungen"
                className="block w-full text-center text-xs font-semibold py-2 rounded-lg transition-colors hover:bg-violet-500/20"
                style={{ backgroundColor: "#8b5cf615", color: "#8b5cf6" }}>
                Kampagne starten →
              </Link>
            )}
          </div>

          {/* Neue Bewerbungen */}
          {(stats.neueBewerbungen ?? 0) > 0 && (
            <Link href="/admin/bewerbungen"
              className="flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-emerald-500/30"
              style={{ backgroundColor: "#10b98112", border: "1px solid #10b98125" }}>
              <Briefcase size={16} style={{ color: "#10b981" }} />
              <div>
                <p className="text-sm font-semibold text-white">
                  {stats.neueBewerbungen} neue Bewerbung{stats.neueBewerbungen !== 1 ? "en" : ""}
                </p>
                <p className="text-xs" style={{ color: "#10b98199" }}>Jetzt prüfen →</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
