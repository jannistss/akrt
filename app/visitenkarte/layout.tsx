import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Visitenkarte",
  description: `Alle Kontaktwege der ${SITE.name} auf einen Blick: Website, Instagram, WhatsApp, Telefon und Google-Bewertung.`,
  alternates: { canonical: `${SITE_URL}/visitenkarte` },
  robots: { index: true, follow: true },
  openGraph: {
    url: `${SITE_URL}/visitenkarte`,
    title: `${SITE.name} | Visitenkarte`,
    description: "Alle Kontaktwege auf einen Blick.",
  },
};

export default function VisitenkarteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
