"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Calendar, Car, FileText, LayoutDashboard } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/portal/dashboard", label: "Übersicht", icon: LayoutDashboard },
  { href: "/portal/termine", label: "Termine", icon: Calendar },
  { href: "/portal/fahrzeuge", label: "Fahrzeuge", icon: Car },
  { href: "/portal/rechnungen", label: "Rechnungen", icon: FileText },
];

export function PortalNavClient({ user, kundeName }: { user?: User; kundeName?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  const displayName = kundeName ?? user?.email?.split("@")[0] ?? "Kunde";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex items-center gap-1">
      {navLinks.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: active ? "#002e40" : "#94a3b8",
              backgroundColor: active ? "#e8f4fa" : "transparent",
            }}
          >
            <Icon size={14} />
            {label}
          </Link>
        );
      })}
      <div
        className="flex items-center gap-2 ml-3 pl-3"
        style={{ borderLeft: "1px solid #dde9f0" }}
      >
        <div
          style={{
            width: 30, height: 30, borderRadius: "50%",
            backgroundColor: "#002e40",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#ffffff",
          }}
        >
          {initials}
        </div>
        <span className="hidden sm:block text-sm font-medium" style={{ color: "#1e3a4a" }}>
          {displayName}
        </span>
        <button
          onClick={handleLogout}
          title="Abmelden"
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "#94a3b8" }}
        >
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
}
