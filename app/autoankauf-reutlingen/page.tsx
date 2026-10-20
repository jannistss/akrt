import type { Metadata } from "next";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/components/structured-data";
import { VehiclePurchaseContent } from "@/components/autoankauf/vehicle-purchase-content";
import { SITE, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Autoankauf Reutlingen | Auto verkaufen – Autoklinik" },
  description: "Auto verkaufen in Reutlingen? Jetzt Fahrzeugdaten online übermitteln und eine kostenlose, unverbindliche Bewertung bei der Autoklinik Reutlingen anfragen.",
  keywords: ["Autoankauf Reutlingen", "Auto verkaufen Reutlingen", "Gebrauchtwagenankauf Reutlingen", "Fahrzeugankauf Reutlingen", "Gebrauchtwagen verkaufen Reutlingen", "Auto bewerten lassen Reutlingen"],
  alternates: { canonical: `${SITE_URL}/autoankauf-reutlingen` },
  openGraph: {
    type: "website", locale: "de_DE", url: `${SITE_URL}/autoankauf-reutlingen`, siteName: SITE.name,
    title: "Autoankauf Reutlingen | Auto verkaufen – Autoklinik",
    description: "Fahrzeugdaten online übermitteln und eine kostenlose, unverbindliche Bewertung bei der Autoklinik Reutlingen anfragen.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Autoankauf bei der Autoklinik Reutlingen" }],
  },
  twitter: { card: "summary_large_image", title: "Autoankauf Reutlingen | Autoklinik", description: "Auto verkaufen in Reutlingen – Fahrzeugdaten online übermitteln.", images: [`${SITE_URL}/og-image.jpg`] },
};
const faqs = [
  { question: "Wie funktioniert der Autoankauf in Reutlingen?", answer: "Du übermittelst uns deine Fahrzeugdaten Schritt für Schritt online. Unser Team prüft die Angaben persönlich und meldet sich per Telefon oder E-Mail, um die nächsten Schritte zu besprechen." },
  { question: "Welche Fahrzeugdaten werden benötigt?", answer: "Wir benötigen Marke, Modell, Erstzulassung, Kilometerstand, Kraftstoff, Getriebe und eine ehrliche Einschätzung des Zustands. Fotos, Motorbezeichnung, Hinweise zu Schäden und Preisvorstellung sind freiwillig." },
  { question: "Wie erfolgt die Bewertung meines Autos?", answer: "Unser Werkstatt-Team betrachtet Alter, Laufleistung, Motorisierung und Zustand deines Fahrzeugs. Deine Angaben bilden die Grundlage für eine erste persönliche Einschätzung. Eine verbindliche Bewertung ist erst nach Prüfung und Klärung offener Fragen möglich." },
  { question: "Kann ich ein beschädigtes Fahrzeug anbieten?", answer: "Ja, auch Fahrzeuge mit Vorschäden, Unfallschäden oder technischen Mängeln kannst du anfragen. Wir prüfen solche Fälle individuell. Eine Annahme oder ein bestimmter Preis kann vor der Prüfung nicht zugesagt werden." },
  { question: "Muss ich Fahrzeugfotos hochladen?", answer: "Nein. Fotos sind optional, helfen uns aber bei der Einschätzung. Du kannst bis zu sechs Bilder von außen, innen, dem Cockpit oder vorhandenen Schäden hinzufügen. Die Fotos werden privat gespeichert und nicht öffentlich veröffentlicht." },
  { question: "Ist die Anfrage kostenlos und unverbindlich?", answer: "Ja. Das Übermitteln deiner Fahrzeugdaten ist kostenlos und verpflichtet dich nicht zum Verkauf. Ein Ankauf oder ein bestimmter Preis wird durch die Anfrage nicht zugesagt." },
  { question: "Was passiert nach meiner Anfrage?", answer: "Deine Anfrage wird an unser Team übermittelt. Nach der Prüfung melden wir uns persönlich per E-Mail oder Telefon und besprechen mit dir, welche weiteren Informationen oder eine Besichtigung benötigt werden." },
  { question: "Kann ich auch aus der Umgebung anfragen?", answer: "Ja, wir freuen uns auch über Anfragen aus Tübingen, Metzingen, Pfullingen und Eningen unter Achalm. Unser Standort ist die Haldenhaustraße 3 in 72770 Reutlingen. Ob ein Ankauf möglich ist, klären wir individuell." },
];
export default function AutoankaufReutlingenPage() {
  return <>
    <ServiceSchema name="Fahrzeugankauf in Reutlingen" description="Persönliche und unverbindliche Anfrage zum Verkauf von Gebrauchtwagen und Fahrzeugen in Reutlingen und Umgebung." url="/autoankauf-reutlingen" />
    <FaqSchema items={faqs} />
    <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Autoankauf Reutlingen", url: "/autoankauf-reutlingen" }]} />
    <AutoklinikNavbar />
    <main className="bg-background font-sans text-ak-deep"><VehiclePurchaseContent faqs={faqs} /></main>
    <AutoklinikFooter />
  </>;
}
