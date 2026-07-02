import type { Metadata } from "next";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesGrid } from "@/components/home/services-grid";
import { WhySection } from "@/components/home/why-section";
import { TrustLogos } from "@/components/home/trust-logos";
import { ServicesList } from "@/components/home/services-list";
import { CtaBanner } from "@/components/home/cta-banner";
import { HowItWorks } from "@/components/home/how-it-works";
import { ContactSection } from "@/components/contact-section";
import GoogleReviews from "@/components/google-reviews";
import {
  LocalBusinessSchema,
  OrganizationSchema,
  WebSiteSchema,
  FaqSchema,
  ReviewSchema,
} from "@/components/structured-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export const metadata: Metadata = {
  title: "Autoklinik Reutlingen | Meisterwerkstatt für Reparatur, Inspektion & TÜV",
  description:
    "Autoklinik Reutlingen – Reparatur, Inspektion, TÜV, Unfallinstandsetzung und Wartung aller Marken. Faire Preise, moderne Diagnosetechnik und schnelle Termine in Reutlingen.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: "Autoklinik Reutlingen | Meisterwerkstatt für Reparatur, Inspektion & TÜV",
    description:
      "Faire Preise, moderne Diagnosetechnik und schnelle Termine. Ihre Meisterwerkstatt in Reutlingen.",
  },
};

const faqItems = [
  {
    question: "Welche Fahrzeugmarken werden bei der Autoklinik Reutlingen repariert?",
    answer:
      "Wir reparieren und warten alle gängigen Fahrzeugmarken – von VW, BMW, Mercedes, Audi, Toyota, Opel bis hin zu exotischeren Herstellern. Als markenunabhängige Meisterwerkstatt sind wir auf keine Marke beschränkt.",
  },
  {
    question: "Wie kann ich einen Termin vereinbaren?",
    answer:
      "Sie können uns telefonisch unter 07121 988 6660 oder per E-Mail unter info@autoklinik-reutlingen.de kontaktieren. Alternativ nutzen Sie unseren Online-Chat auf der Website, um rund um die Uhr einen Termin anzufragen.",
  },
  {
    question: "Bietet die Autoklinik Reutlingen TÜV-Hauptuntersuchungen an?",
    answer:
      "Ja, wir bieten TÜV-Hauptuntersuchungen sowie AU (Abgasuntersuchungen) an. Wir bereiten Ihr Fahrzeug gerne auf die Hauptuntersuchung vor, damit sie sicher besteht.",
  },
  {
    question: "Was kostet eine Inspektion bei der Autoklinik Reutlingen?",
    answer:
      "Die Kosten einer Inspektion hängen von Fahrzeugtyp, Baujahr und Umfang ab. Wir erstellen Ihnen gerne einen kostenlosen Kostenvoranschlag. Rufen Sie uns an oder nutzen Sie unseren Chat.",
  },
  {
    question: "Wie lange dauert eine Inspektion?",
    answer:
      "Eine Standardinspektion dauert in der Regel 1 bis 3 Stunden, je nach Fahrzeug und Umfang der durchzuführenden Arbeiten. Wir informieren Sie vorab über die voraussichtliche Dauer.",
  },
];

const reviews = [
  {
    author: "Michael S.",
    datePublished: "2024-11-15",
    reviewBody:
      "Super Werkstatt, schnell und fair. Mein Auto war innerhalb von einem Tag fertig. Klare Empfehlung!",
    ratingValue: 5,
  },
  {
    author: "Sarah K.",
    datePublished: "2024-12-03",
    reviewBody:
      "Sehr freundliches Team, transparente Preise und schnelle Terminvergabe. Endlich eine Werkstatt der ich vertraue.",
    ratingValue: 5,
  },
  {
    author: "Thomas B.",
    datePublished: "2025-01-20",
    reviewBody:
      "TÜV bestanden! Top Beratung und faire Kosten. Werde hier immer wiederkommen.",
    ratingValue: 5,
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema reviewCount={37} ratingValue={5.0} />
      <OrganizationSchema />
      <WebSiteSchema />
      <FaqSchema items={faqItems} />
      <ReviewSchema reviews={reviews} />
      <AutoklinikNavbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesGrid />
        <WhySection />
        <TrustLogos />
        <ServicesList />
        <CtaBanner />
        <HowItWorks />
        <GoogleReviews />
        <ContactSection />
      </main>
      <AutoklinikFooter />
    </>
  );
}
