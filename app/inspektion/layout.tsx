import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Inspektion & Wartung Reutlingen | Alle Marken",
  description:
    "Fahrzeuginspektion und Wartung in Reutlingen für alle Marken. Ölwechsel, Filterwechsel, Bremsflüssigkeit, Zahnriemen und mehr. Faire Preise, schnelle Termine.",
  keywords: ["Inspektion Reutlingen", "Wartung KFZ Reutlingen", "Ölwechsel Reutlingen", "Fahrzeugwartung"],
  alternates: { canonical: `${SITE_URL}/inspektion` },
  openGraph: {
    url: `${SITE_URL}/inspektion`,
    title: "Inspektion & Wartung Reutlingen | Alle Marken",
    description: "Professionelle Fahrzeuginspektion für alle Marken. Faire Preise, schnelle Termine.",
  },
};

export default function InspektionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Inspektion & Wartung", url: "/inspektion" }]} />
      {children}
    </>
  );
}
