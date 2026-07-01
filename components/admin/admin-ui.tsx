"use client";

import { statusColors, statusLabels } from "@/lib/admin/mock-data";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

// ─── Status Badge ─────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: string }) {
  const color = statusColors[status] ?? "bg-slate-500/15 text-slate-400 border-slate-500/20";
  const label = statusLabels[status] ?? status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={{ backgroundColor: "#0d1f2d", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {children}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

export function StatCard({
  label, value, sub, icon, color = "#0074a2",
}: { label: string; value: string | number; sub?: string; icon: ReactNode; color?: string }) {
  return (
    <AdminCard className="flex items-start gap-4">
      <div
        className="p-2.5 rounded-lg shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
        {sub && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</p>}
      </div>
    </AdminCard>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {action}
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function AdminTable({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function AdminTr({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <tr
      className={`transition-colors ${onClick ? "cursor-pointer hover:bg-white/3" : ""} ${className}`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function AdminTd({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3 text-white/70 ${className}`}>{children}</td>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function AdminModal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6"
        style={{ backgroundColor: "#0d1f2d", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 opacity-20 text-white">{icon}</div>
      <p className="text-sm font-medium text-white/40">{title}</p>
      {description && <p className="text-xs text-white/20 mt-1 max-w-xs">{description}</p>}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

export function AdminInput({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-white/40 mb-1.5">{label}</label>}
      <input
        className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-colors"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        {...props}
      />
    </div>
  );
}

export function AdminTextarea({ label, ...props }: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-white/40 mb-1.5">{label}</label>}
      <textarea
        className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-colors resize-none"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        {...props}
      />
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

export function AdminButton({
  children, variant = "primary", size = "md", onClick, className = "", disabled, type = "button",
}: {
  children: ReactNode; variant?: "primary" | "ghost" | "danger"; size?: "sm" | "md";
  onClick?: () => void; className?: string; disabled?: boolean; type?: "button" | "submit";
}) {
  const base = "inline-flex items-center gap-2 font-medium rounded-lg transition-all disabled:opacity-40";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
  const variants = {
    primary: "bg-[#0074a2] hover:bg-[#005f87] text-white",
    ghost: "text-white/50 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/15 hover:bg-red-500/25 text-red-400",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

// ─── Toast (simple) ───────────────────────────────────────────────────────────

export function useToast() {
  const show = (message: string) => {
    const el = document.createElement("div");
    el.className = "fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-xl text-sm text-white font-medium shadow-xl";
    el.style.cssText = "background:#0074a2;border:1px solid rgba(255,255,255,0.15);animation:slideUp 0.2s ease";
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  };
  return { show };
}
