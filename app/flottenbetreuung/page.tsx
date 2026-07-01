import Link from "next/link";
import Image from "next/image";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";
import { WorkshopServices } from "@/components/workshop-services";

export const metadata = {
  title: "Flottenbetreuung | Autoklinik Reutlingen",
  description:
    "Professionelle Flottenbetreuung für Handwerk, Pflegedienste & Kurierdienste. Meisterbetrieb mit fairen Preisen.",
};

const highlights = [
  "Meisterbetrieb",
  "Faire Preise",
  "Kurze Wartezeiten",
  "Für alle Marken",
  "Qualitätsarbeit",
  "TÜV in 48 Stunden",
];

const steps = [
  {
    title: "Termin vereinbaren",
    description:
      "Schreib uns bei WhatsApp, ruf direkt durch oder nutze das Formular auf der Website. Wir melden uns innerhalb von 24 Stunden zurück.",
  },
  {
    title: "Fahrzeuge bringen",
    description:
      "Wir koordinieren Servicetermine so, dass dein Betrieb möglichst wenig Stillstandzeit hat.",
  },
  {
    title: "Flotte läuft weiter",
    description:
      "Wir erledigen alles transparent und schnell – damit deine Fahrzeuge wieder auf der Straße sind.",
  },
];

export default function FottenbetreuungPage() {
  return (
    <>
      <AutoklinikNavbar />
      <main className="font-sans">

        {/* Hero */}
        <header className="relative overflow-hidden" style={{ backgroundColor: "#0d1b2a", minHeight: 480 }}>
          <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4aadce" }}>
                Flottenbetreuung
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-balance mb-5" style={{ color: "#fff" }}>
                Weniger Ausfälle, mehr Kilometer. Flottenbetreuung vom Meisterbetrieb.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.76)" }}>
                Ob 5 oder 50 Fahrzeuge – wir halten Ihre Flotte zuverlässig auf der Straße. Schnell, fair und persönlich. Direkt aus Reutlingen.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/terminbuchung" className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#0074a2" }}>
                  Termin online buchen
                </Link>
                <a href="tel:+4971211452619" className="rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
                  Flottenbetreuung anfragen
                </a>
              </div>
            </div>
            <div className="hidden lg:block flex-none" style={{ maxWidth: 360 }}>
              <Image
                src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                alt="Mechaniker in blauer Arbeitskleidung"
                width={360}
                height={420}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </header>

        {/* Info card */}
        <section className="py-12" style={{ backgroundColor: "#f4f8fb" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}>
              <div className="flex-1 p-8 border-b md:border-b-0 md:border-r" style={{ borderColor: "#e4edf3" }}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#0074a2" }}>
                  Öffnungszeiten
                </h2>
                <ul className="flex flex-col gap-2 text-sm" style={{ color: "#0d1b2a" }}>
                  {["Mo.", "Di.", "Mi.", "Do.", "Fr."].map((d) => (
                    <li key={d} className="flex justify-between gap-4">
                      <span className="font-medium">{d}</span>
                      <span style={{ color: "#4a6070" }}>8 Uhr bis 18 Uhr</span>
                    </li>
                  ))}
                  <li className="flex justify-between gap-4">
                    <span className="font-medium">Sa.</span>
                    <span style={{ color: "#4a6070" }}>nach Terminvereinbarung</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 p-8 border-b md:border-b-0 md:border-r" style={{ borderColor: "#e4edf3" }}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#0074a2" }}>
                  Kontakt
                </h2>
                <ul className="flex flex-col gap-2 text-sm" style={{ color: "#0d1b2a" }}>
                  <li><a href="mailto:info@autoklinik-reutlingen.de" className="hover:underline" style={{ color: "#0074a2" }}>info@autoklinik-reutlingen.de</a></li>
                  <li><a href="tel:+4971211452619" className="hover:underline" style={{ color: "#0074a2" }}>07121 14526199</a></li>
                  <li className="pt-1" style={{ color: "#4a6070" }}>Haldenhaustraße 3<br />72770 Reutlingen</li>
                </ul>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-center gap-3">
                <h2 className="text-base font-bold" style={{ color: "#0d1b2a" }}>Jetzt Termin vereinbaren</h2>
                <Link href="/terminbuchung" className="rounded-xl px-5 py-3 text-sm font-semibold text-white text-center transition-opacity hover:opacity-90" style={{ backgroundColor: "#0074a2" }}>
                  Termin online buchen
                </Link>
                <a href="tel:+4971211452619" className="rounded-xl border px-5 py-3 text-sm font-semibold text-center transition-colors hover:bg-[#f4f8fb]" style={{ borderColor: "#b8d0dc", color: "#0d1b2a" }}>
                  Termin anfragen
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {highlights.map((h) => (
                <div key={h} className="rounded-xl flex items-center gap-2 px-4 py-3 text-xs font-medium" style={{ backgroundColor: "#fff", border: "1px solid #e4edf3", color: "#0d1b2a" }}>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e5f1f5" }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2 2 4-4" stroke="#0074a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {h}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "#0d1b2a" }}>
                Wer eine Flotte betreibt, kennt das:
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6070" }}>
                Ein Fahrzeug fällt aus, der Zeitplan gerät ins Wanken, Kunden warten. Werkstatttermine sind schwer zu koordinieren, Rechnungen kommen aus allen Richtungen – und den Überblick über Wartungsintervalle behält auch niemand so richtig.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                Genau hier kommen wir ins Spiel. Die Autoklinik Reutlingen ist nicht nur Ihre Werkstatt um die Ecke – wir sind Ihr Partner für alles, was Ihre Fahrzeugflotte am Laufen hält. Als Meisterbetrieb mit fairen Preisen und kurzen Wartezeiten betreuen wir Fuhrparks jeder Größe – schnell, transparent und zuverlässig.
              </p>
            </div>
            <div className="flex-1 rounded-2xl p-8" style={{ backgroundColor: "#f4f8fb", border: "1px solid #e4edf3" }}>
              <h3 className="text-base font-bold mb-3" style={{ color: "#0d1b2a" }}>Für wen unsere Flottenbetreuung ideal ist</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                Sie haben ein Unternehmen mit einem Fuhrpark? Dann melden Sie sich bei uns. Ob Handwerk, Pflegedienste, Kurierdienste oder andere Betriebe – wir passen unsere Leistungen an Ihre Anforderungen an.
              </p>
            </div>
          </div>
        </section>

        {/* Workshop services */}
        <WorkshopServices />

        {/* How it works */}
        <section className="py-20" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center" style={{ color: "#0d1b2a" }}>
              So einfach geht&apos;s
            </h2>
            <p className="text-sm text-center mb-12" style={{ color: "#4a6070" }}>
              Wir verbinden handwerkliche Expertise mit modernster Technologie. Unser Ziel ist es, höchste Qualitätsstandards zu garantieren.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ backgroundColor: "#0074a2" }}>
                    {i + 1}
                  </div>
                  <h3 className="text-base font-bold" style={{ color: "#0d1b2a" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16" style={{ backgroundColor: "#0d1b2a" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-white text-balance">
              Jetzt Termin vereinbaren
            </h2>
            <p className="text-sm hidden sm:block" style={{ color: "rgba(255,255,255,0.6)" }}>Schnell. Einfach. Direkt online oder telefonisch.</p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href="tel:+4971211452619" className="rounded-xl border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
                Termin anfragen
              </a>
              <Link href="/terminbuchung" className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#0074a2" }}>
                Termin online buchen
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <AutoklinikFooter />
    </>
  );
}
