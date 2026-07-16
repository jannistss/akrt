import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { PortalNavClient } from "./portal-nav-client";

export const metadata = {
  title: "Mein Bereich | Autoklinik Reutlingen",
  description: "Ihr persönliches Kundenportal bei der Autoklinik Reutlingen.",
};

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // Get linked customer
  const { data: kunde } = await supabase
    .from("kunden")
    .select("vorname, nachname, email")
    .eq("portal_user_id", user.id)
    .single();

  return (
    <div style={{ backgroundColor: "#f5f9fc", minHeight: "100vh" }}>
      {/* Top nav */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #dde9f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }} className="flex items-center justify-between h-16">
          <Link href="/portal/dashboard" className="flex items-center gap-2">
            <div style={{ backgroundColor: "#002e40", borderRadius: 6, padding: "4px 10px" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#ffffff", letterSpacing: "0.05em" }}>AUTOKLINIK</span>
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Mein Bereich</span>
          </Link>
          <PortalNavClient user={user} kundeName={kunde ? `${kunde.vorname} ${kunde.nachname}` : undefined} />
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  );
}
