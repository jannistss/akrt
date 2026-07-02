import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Kfz-Gutachter Reutlingen | Schadengutachten & Wertermittlung",
  description:
    "KFZ-Gutachten und Schadensbewertung in Reutlingen. Unfall-Gutachten, Fahrzeugbewertung und Wertermittlung für alle Fahrzeugmarken. Kompetent und unabhängig.",
  keywords: ["KFZ Gutachter Reutlingen", "Fahrzeugbewertung Reutlingen", "Schadengutachten Reutlingen", "Auto Wertermittlung"],
  alternates: { canonical: `${SITE_URL}/kfz-gutachter` },
  openGraph: {
    url: `${SITE_URL}/kfz-gutachter`,
    title: "Kfz-Gutachter Reutlingen | Schadengutachten & Wertermittlung",
    description: "Unabhängige KFZ-Gutachten und Fahrzeugbewertungen für alle Marken in Reutlingen.",
  },
};

export default function KfzGutachterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Kfz-Gutachter", url: "/kfz-gutachter" }]} />
      {children}
    </>
  );
}
