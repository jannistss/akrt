import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "Autoklinik CRM",
  description: "Internes CRM-System der Autoklinik Reutlingen",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#081523" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: "#081523" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
