import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Getriebespülung Reutlingen | Autoklinik",
  description:
    "Getriebespülung in Reutlingen: freigabekonforme Getriebeflüssigkeit für Automatik- und Doppelkupplungsgetriebe, alle Fahrzeugmarken. Termin online anfragen.",
  keywords: ["Getriebespülung Reutlingen", "Getriebeölwechsel Reutlingen", "Automatikgetriebe Wartung Reutlingen"],
  alternates: { canonical: `${SITE_URL}/getriebespuelung-reutlingen` },
  openGraph: {
    url: `${SITE_URL}/getriebespuelung-reutlingen`,
    title: "Getriebespülung Reutlingen | Autoklinik",
    description: "Getriebespülung für Automatik- und Doppelkupplungsgetriebe in Reutlingen - freigabekonforme Getriebeflüssigkeit.",
  },
};

export default function GetriebespuelungLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Getriebespülung", url: "/getriebespuelung-reutlingen" }]} />
      {children}
    </>
  );
}
