import type { Metadata } from "next";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata: Metadata = {
  // Broader employer-branding title — the specific job posting owns the
  // "Kfz-Mechatroniker Stelle" keyword at /karriere/kfz-mechatroniker to
  // avoid both pages competing for the same search query.
  title: "Karriere bei der Autoklinik Reutlingen | Offene Stellen",
  description:
    "Werde Teil der Autoklinik Reutlingen: faire Bezahlung, geregelte Arbeitszeiten und ein familiäres Team. Hier findest du unsere aktuellen Stellenangebote in der Werkstatt.",
  alternates: { canonical: "https://autoklinik-reutlingen.de/karriere" },
  openGraph: {
    url: "https://autoklinik-reutlingen.de/karriere",
    title: "Karriere bei der Autoklinik Reutlingen | Offene Stellen",
    description:
      "Faire Bezahlung, geregelte Arbeitszeiten Mo–Fr, moderner Maschinenpark. Komm in unser Team.",
  },
};

export default function KarriereLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoklinikNavbar />
      {children}
      <AutoklinikFooter />
    </>
  );
}
