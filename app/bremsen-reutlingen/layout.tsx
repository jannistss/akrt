import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Bremsen wechseln Reutlingen | Autoklinik",
  description:
    "Bremsenservice in Reutlingen: Prüfung, Wartung und Reparatur von Bremsbelägen, Bremsscheiben und Bremsflüssigkeit für alle Fahrzeugmarken. Termin online buchen.",
  keywords: ["Bremsen Reutlingen", "Bremsenservice Reutlingen", "Bremsbeläge wechseln Reutlingen", "Bremsscheiben wechseln Reutlingen"],
  alternates: { canonical: `${SITE_URL}/bremsen-reutlingen` },
  openGraph: {
    url: `${SITE_URL}/bremsen-reutlingen`,
    title: "Bremsen wechseln Reutlingen | Autoklinik",
    description: "Bremsenservice in Reutlingen für alle Fahrzeugmarken - Prüfung, Beläge, Scheiben und Bremsflüssigkeit.",
  },
};

export default function BremsenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Bremsenservice", url: "/bremsen-reutlingen" }]} />
      {children}
    </>
  );
}
