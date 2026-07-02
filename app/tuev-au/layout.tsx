import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "TÜV & AU Reutlingen | Hauptuntersuchung & Abgasuntersuchung",
  description:
    "TÜV-Hauptuntersuchung und Abgasuntersuchung (AU) in Reutlingen. Vorbereitung auf den TÜV, alle Fahrzeugmarken. Faire Preise, schnelle Termine.",
  keywords: ["TÜV Reutlingen", "AU Reutlingen", "Hauptuntersuchung Reutlingen", "HU Reutlingen", "TÜV Vorbereitung"],
  alternates: { canonical: `${SITE_URL}/tuev-au` },
  openGraph: {
    url: `${SITE_URL}/tuev-au`,
    title: "TÜV & AU Reutlingen | Hauptuntersuchung",
    description: "Professionelle TÜV-Vorbereitung und Hauptuntersuchung in Reutlingen. Alle Marken.",
  },
};

export default function TuevAuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "TÜV & AU", url: "/tuev-au" }]} />
      {children}
    </>
  );
}
