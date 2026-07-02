import type { Metadata } from "next";
import { JobPostingSchema, BreadcrumbSchema } from "@/components/structured-data";
import KfzMechatronikerClient from "./kfz-mechatroniker-client";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Kfz-Mechatroniker (m/w/d) | Stelle in Reutlingen",
  description:
    "Offene Stelle: Kfz-Mechatroniker / Mechaniker (m/w/d) bei der Autoklinik Reutlingen. Vollzeit, Montag bis Freitag, faire Bezahlung. Jetzt bewerben.",
  alternates: { canonical: `${SITE_URL}/karriere/kfz-mechatroniker` },
  openGraph: {
    url: `${SITE_URL}/karriere/kfz-mechatroniker`,
    title: "Kfz-Mechatroniker (m/w/d) | Autoklinik Reutlingen",
    description:
      "Vollzeit, Mo–Fr, faire Bezahlung, moderner Maschinenpark, familiäres Team. Bewirb dich jetzt.",
  },
};

export default function KfzMechatronikerPage() {
  return (
    <>
      <JobPostingSchema
        title="Kfz-Mechatroniker / Mechaniker (m/w/d)"
        description={`
          Autoklinik Reutlingen sucht einen erfahrenen Kfz-Mechatroniker oder Kfz-Mechaniker (m/w/d) in Vollzeit.

          Deine Aufgaben:
          - Diagnose, Wartung und Reparatur von Fahrzeugen aller Marken und Baujahre
          - Durchführung von Inspektionen, Ölwechseln, Bremsarbeiten und Reifenmontage
          - TÜV-Vorbereitungen und Hauptuntersuchungen
          - Klimaservice und Fahrzeugelektrik
          - Unfallreparatur und Instandsetzung

          Was wir bieten:
          - Vollzeit, Montag bis Freitag – keine Wochenendschichten
          - Leistungsgerechte Vergütung nach Erfahrung
          - Moderner Maschinenpark und aktuelle Diagnosetechnik
          - Direkter Draht zur Geschäftsleitung, flache Hierarchien
          - Familiäres Team in einer modernen Werkstatt

          Anforderungen:
          - Abgeschlossene Ausbildung als Kfz-Mechatroniker oder Kfz-Mechaniker
          - Erfahrung mit Fahrzeugen unterschiedlicher Marken
          - Selbstständige, sorgfältige Arbeitsweise
          - Führerschein Klasse B
          - Deutschkenntnisse mindestens B2
        `}
        datePosted="2025-01-01"
        validThrough="2025-12-31"
        employmentType="FULL_TIME"
        baseSalary={{ min: 2800, max: 3800, currency: "EUR" }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Startseite", url: "/" },
          { name: "Karriere", url: "/karriere" },
          { name: "Kfz-Mechatroniker (m/w/d)", url: "/karriere/kfz-mechatroniker" },
        ]}
      />
      <KfzMechatronikerClient />
    </>
  );
}
