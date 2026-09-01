import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Ölwechsel Reutlingen | Autoklinik",
  description:
    "Ölwechsel in Reutlingen: Motoröl und Ölfilter nach Herstellervorgabe für alle Fahrzeugmarken. Meist am selben Tag. Termin online anfragen.",
  keywords: ["Ölwechsel Reutlingen", "Motoröl wechseln Reutlingen", "Ölfilter wechseln Reutlingen"],
  alternates: { canonical: `${SITE_URL}/oelwechsel-reutlingen` },
  openGraph: {
    url: `${SITE_URL}/oelwechsel-reutlingen`,
    title: "Ölwechsel Reutlingen | Autoklinik",
    description: "Ölwechsel für alle Fahrzeugmarken in Reutlingen - Motoröl und Ölfilter nach Herstellervorgabe.",
  },
};

export default function OelwechselLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Ölwechsel", url: "/oelwechsel-reutlingen" }]} />
      {children}
    </>
  );
}
