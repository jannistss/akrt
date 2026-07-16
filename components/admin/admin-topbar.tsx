"use client";

import { Search, Bell, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/kunden": "Kunden",
  "/admin/fahrzeuge": "Fahrzeuge",
  "/admin/termine": "Termine",
  "/admin/bewerbungen": "Bewerbungen",
  "/admin/dokumente": "Dokumente",
  "/admin/erinnerungen": "Erinnerungen",
  "/admin/kampagnen": "Kampagnen",
  "/admin/rechnungen": "Rechnungen",
  "/admin/einstellungen": "Einstellungen",
};

export function AdminTopbar({ user }: { user?: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const base = "/" + pathname.split("/").slice(1, 3).join("/");
  const title = pageTitles[base] ?? "Admin";

  const displayName = user?.user_metadata?.name ?? user?.email?.split("@")[0] ?? "Admin";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header
      className="h-14 flex items-center gap-4 px-6 shrink-0"
      style={{
        backgroundColor: "#0d1f2d",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <h1 className="text-sm font-semibold text-white lg:block hidden">{title}</h1>
      <div className="flex-1 max-w-sm ml-auto lg:ml-0">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            placeholder="Suchen..."
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <button
          className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#0074a2" }}
          />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: "#0074a2" }}
          >
            {initials}
          </div>
          <span className="text-sm text-white/60 hidden sm:block max-w-[120px] truncate">{displayName}</span>
        </div>
        <button
          onClick={handleLogout}
          title="Abmelden"
          className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
