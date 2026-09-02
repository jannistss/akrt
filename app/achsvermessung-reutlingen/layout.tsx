import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Achsvermessung Reutlingen | Spur einstellen | Autoklinik",
  description:
    "Achsvermessung in Reutlingen: Spur einstellen und Fahrwerksgeometrie prüfen bei schiefem Lenkrad, einseitigem Reifenverschleiß oder verändertem Fahrverhalten. Termin online buchen.",
  keywords: [
    "Achsvermessung Reutlingen",
    "Spur einstellen Reutlingen",
    "Spureinstellung Reutlingen",
    "Fahrwerk vermessen Reutlingen",
  ],
  alternates: { canonical: `${SITE_URL}/achsvermessung-reutlingen` },
  openGraph: {
    url: `${SITE_URL}/achsvermessung-reutlingen`,
    title: "Achsvermessung Reutlingen | Spur einstellen | Autoklinik",
    description: "Achsvermessung und Spureinstellung in Reutlingen für alle Fahrzeugmarken - bei Anzeichen einer verstellten Fahrwerksgeometrie.",
  },
};

export default function AchsvermessungLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Achsvermessung", url: "/achsvermessung-reutlingen" }]} />
      {children}
    </>
  );
}
