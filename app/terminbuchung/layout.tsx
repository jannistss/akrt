import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Termin buchen | Autoklinik Reutlingen",
  description:
    "Termin bei der Autoklinik Reutlingen buchen – für Inspektion, Reparatur, TÜV, Reifenwechsel und mehr. Schnell und einfach online anfragen.",
  alternates: { canonical: `${SITE_URL}/terminbuchung` },
  robots: { index: true, follow: true },
  openGraph: {
    url: `${SITE_URL}/terminbuchung`,
    title: "Termin buchen | Autoklinik Reutlingen",
    description: "Einfach online Termin anfragen – für alle Werkstattleistungen.",
  },
};

export default function TerminbuchungLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Termin buchen", url: "/terminbuchung" }]} />
      {children}
    </>
  );
}
