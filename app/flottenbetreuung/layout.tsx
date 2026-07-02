import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Flottenbetreuung Reutlingen | Firmenwagen & Fuhrpark",
  description:
    "Professionelle Flottenbetreuung und Fuhrparkverwaltung in Reutlingen. Wartung, Inspektion und Reparatur für Firmenwagen aller Marken. Faire Konditionen für Unternehmen.",
  keywords: ["Flottenbetreuung Reutlingen", "Fuhrpark Werkstatt", "Firmenwagen Reutlingen", "Fuhrparkmanagement Reutlingen"],
  alternates: { canonical: `${SITE_URL}/flottenbetreuung` },
  openGraph: {
    url: `${SITE_URL}/flottenbetreuung`,
    title: "Flottenbetreuung Reutlingen | Firmenwagen & Fuhrpark",
    description: "Wartung und Reparatur für Firmenwagen und Fuhrparks in Reutlingen. Faire Konditionen.",
  },
};

export default function FlottenbetreuungLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Flottenbetreuung", url: "/flottenbetreuung" }]} />
      {children}
    </>
  );
}
