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

export const metadata = {
  title: "Autoklinik Reutlingen",
  description:
    "Werkstatt in Reutlingen: Inspektion, Reparatur & TÜV. Faire Preise, kurze Wartezeiten. Jetzt Termin vereinbaren – schnell & zuverlässig.",
};

export default function HomePage() {
  return (
    <>
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
        <ContactSection />
      </main>
      <AutoklinikFooter />
    </>
  );
}
