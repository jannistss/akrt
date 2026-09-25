import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Winteraktion 2026 – Räderwechsel & Wintercheck | Autoklinik Reutlingen",
  description:
    "Winteraktion 2026: Räderwechsel inklusive Wintercheck für 44,44 € netto zzgl. 19 % MwSt. bei der Autoklinik Reutlingen. Gültig vom 15.09. bis 31.12.2026. Jetzt Termin sichern.",
  alternates: { canonical: `${SITE_URL}/winterangebot` },
  robots: { index: true, follow: true },
  openGraph: {
    url: `${SITE_URL}/winterangebot`,
    title: "Winteraktion 2026 – Räderwechsel & Wintercheck | Autoklinik Reutlingen",
    description: "Räderwechsel inklusive Wintercheck für 44,44 € netto zzgl. 19 % MwSt. Gültig vom 15.09. bis 31.12.2026.",
  },
};

export default function WinterangebotLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Winteraktion", url: "/winterangebot" }]} />
      {children}
    </>
  );
}
