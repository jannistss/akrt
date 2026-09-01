import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Motordiagnose Reutlingen | Fehlerdiagnose & OBD-Auslesung",
  description:
    "Motordiagnose und Fehlerdiagnose in Reutlingen: OBD-Fehlerauslesung ab 20 € bei Motorkontrollleuchte, Leistungsverlust oder Ruckeln. Termin online buchen.",
  keywords: ["Motordiagnose Reutlingen", "Fehlerdiagnose Reutlingen", "Fehlerspeicher auslesen Reutlingen", "Motorkontrollleuchte Reutlingen"],
  alternates: { canonical: `${SITE_URL}/motordiagnose-reutlingen` },
  openGraph: {
    url: `${SITE_URL}/motordiagnose-reutlingen`,
    title: "Motordiagnose Reutlingen | Fehlerdiagnose & OBD-Auslesung",
    description: "Fahrzeugdiagnose in Reutlingen - OBD-Fehlerauslesung und fachliche Ursachenanalyse für alle Marken.",
  },
};

export default function MotordiagnoseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Motordiagnose", url: "/motordiagnose-reutlingen" }]} />
      {children}
    </>
  );
}
