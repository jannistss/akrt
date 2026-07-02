import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Unfallinstandsetzung Reutlingen | Karosserie & Lackierung",
  description:
    "Professionelle Unfallreparatur und Karosserieinstandsetzung in Reutlingen. Alle Fahrzeugmarken, Versicherungsabwicklung, Mietwagen möglich. Faire Preise.",
  keywords: ["Unfallreparatur Reutlingen", "Karosserie Reutlingen", "Unfallschaden Reutlingen", "Unfall Werkstatt Reutlingen"],
  alternates: { canonical: `${SITE_URL}/unfall` },
  openGraph: {
    url: `${SITE_URL}/unfall`,
    title: "Unfallinstandsetzung Reutlingen | Karosserie & Lackierung",
    description: "Professionelle Unfallreparatur und Karosserieinstandsetzung für alle Marken in Reutlingen.",
  },
};

export default function UnfallLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Unfallinstandsetzung", url: "/unfall" }]} />
      {children}
    </>
  );
}
