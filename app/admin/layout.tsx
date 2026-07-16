import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { createClient } from "@/lib/supabase/server";
import type { ReactNode } from "react";

export const metadata = {
  title: "Autoklinik CRM",
  description: "Internes CRM-System der Autoklinik Reutlingen",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Auth is enforced by middleware — layout just reads the user for display
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#081523" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopbar user={user ?? undefined} />
        <main className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: "#081523" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
