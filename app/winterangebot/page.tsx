import type { Metadata } from "next";
import { WinterangebotPage } from "@/components/winterangebot/winterangebot-page";

export const metadata: Metadata = {
  title: "Winterangebot 2026 | Räderwechsel inklusive Wintercheck",
  description:
    "Dein Winterangebot bei der Autoklinik Reutlingen: Räderwechsel inklusive Wintercheck für nur 44,44 €. Jetzt Termin buchen.",
  alternates: { canonical: "https://autoklinik-reutlingen.de/winterangebot" },
  openGraph: {
    url: "https://autoklinik-reutlingen.de/winterangebot",
    title: "Winterangebot 2026 | Autoklinik Reutlingen",
    description: "Räderwechsel inklusive Wintercheck für nur 44,44 €. Gültig vom 15.09.2026 bis 31.12.2026.",
  },
};

export default function WinterangebotRoute() {
  return <WinterangebotPage />;
}
