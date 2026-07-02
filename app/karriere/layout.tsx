import type { Metadata } from "next";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata: Metadata = {
  title: "Karriere | Kfz-Mechatroniker gesucht",
  description:
    "Wir suchen einen Kfz-Mechatroniker (m/w/d) für unsere Werkstatt in Reutlingen. Faire Bezahlung, geregelte Arbeitszeiten, familiäres Team. Jetzt bewerben.",
  alternates: { canonical: "https://autoklinik-reutlingen.de/karriere" },
  openGraph: {
    url: "https://autoklinik-reutlingen.de/karriere",
    title: "Karriere bei der Autoklinik Reutlingen | Kfz-Mechatroniker gesucht",
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
