"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Car, Calendar, FileText,
  Bell, Megaphone, Receipt, Settings, Briefcase, X, Menu,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/kunden", label: "Kunden", icon: Users },
  { href: "/admin/fahrzeuge", label: "Fahrzeuge", icon: Car },
  { href: "/admin/termine", label: "Termine", icon: Calendar },
  { href: "/admin/bewerbungen", label: "Bewerbungen", icon: Briefcase },
  { href: "/admin/dokumente", label: "Dokumente", icon: FileText },
  { href: "/admin/erinnerungen", label: "Erinnerungen", icon: Bell },
  { href: "/admin/kampagnen", label: "Kampagnen", icon: Megaphone },
  { href: "/admin/rechnungen", label: "Rechnungen", icon: Receipt },
  { href: "/admin/einstellungen", label: "Einstellungen", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <Image
          src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png"
          alt="Autoklinik Reutlingen"
          width={32}
          height={32}
          className="object-contain"
        />
        <div>
          <p className="text-sm font-bold text-white leading-tight">Autoklinik</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Reutlingen</p>
        </div>
        <button
          className="ml-auto lg:hidden text-white/40 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-widest px-3 pb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
          System
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-[#0074a2] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/5">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          CRM v1.0 - Prototype
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{ backgroundColor: "#0d1f2d" }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} className="text-white" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "#0a1929" }}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0"
        style={{ backgroundColor: "#0a1929", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
