import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Reifenservice Reutlingen | Reifenwechsel & Einlagerung",
  description:
    "Reifenwechsel, Reifenmontage, Auswuchten und Reifeneinlagerung in Reutlingen. Alle Marken und Reifengrößen. Schneller Service, faire Preise.",
  keywords: ["Reifenwechsel Reutlingen", "Reifenmontage Reutlingen", "Reifeneinlagerung", "Sommerreifen", "Winterreifen Reutlingen"],
  alternates: { canonical: `${SITE_URL}/reifenservice` },
  openGraph: {
    url: `${SITE_URL}/reifenservice`,
    title: "Reifenservice Reutlingen | Reifenwechsel & Einlagerung",
    description: "Schneller Reifenwechsel und Einlagerung für alle Fahrzeugmarken in Reutlingen.",
  },
};

export default function ReifenserviceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Reifenservice", url: "/reifenservice" }]} />
      {children}
    </>
  );
}
