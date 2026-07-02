import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Klimaservice Reutlingen | Klimaanlage befüllen & warten",
  description:
    "Klimaanlage befüllen, warten und desinfizieren in Reutlingen. Klimaanlagenservice für alle Fahrzeugmarken. R1234yf und R134a. Schnelle Termine.",
  keywords: ["Klimaservice Reutlingen", "Klimaanlage befüllen Reutlingen", "Klimaanlage warten", "Klima Auto Reutlingen"],
  alternates: { canonical: `${SITE_URL}/klimaservice` },
  openGraph: {
    url: `${SITE_URL}/klimaservice`,
    title: "Klimaservice Reutlingen | Klimaanlage befüllen & warten",
    description: "Klimaanlage befüllen und warten für alle Fahrzeugmarken in Reutlingen. Schnelle Termine.",
  },
};

export default function KlimaserviceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Klimaservice", url: "/klimaservice" }]} />
      {children}
    </>
  );
}
