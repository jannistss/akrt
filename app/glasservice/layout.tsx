import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Glasservice Reutlingen | Windschutzscheibe & Autoglas",
  description:
    "Autoglasservice in Reutlingen – Windschutzscheibentausch, Steinschlagreparatur und Seitenscheiben für alle Fahrzeugmarken. Direkte Versicherungsabwicklung.",
  keywords: ["Autoglas Reutlingen", "Windschutzscheibe Reutlingen", "Steinschlag Reparatur", "Scheibenwechsel Reutlingen"],
  alternates: { canonical: `${SITE_URL}/glasservice` },
  openGraph: {
    url: `${SITE_URL}/glasservice`,
    title: "Glasservice Reutlingen | Windschutzscheibe & Autoglas",
    description: "Windschutzscheibentausch und Steinschlagreparatur für alle Fahrzeugmarken in Reutlingen.",
  },
};

export default function GlasserviceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Glasservice", url: "/glasservice" }]} />
      {children}
    </>
  );
}
