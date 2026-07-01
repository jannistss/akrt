import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Reifenservice in Reutlingen | Reifenwechsel & Einlagerung | Autoklinik",
  description:
    "Reifenwechsel, Reifeneinlagerung, Reifenreparatur und Reifenberatung in Reutlingen. Schneller Service, faire Preise — für alle Fahrzeugmarken. Online Termin buchen.",
  keywords: [
    "Reifenwechsel Reutlingen",
    "Reifenservice Reutlingen",
    "Reifeneinlagerung Reutlingen",
    "Sommerreifen Reutlingen",
    "Winterreifen Reutlingen",
    "Reifen wechseln Reutlingen",
    "Autoklinik Reutlingen",
  ],
  openGraph: {
    title: "Reifenservice in Reutlingen | Autoklinik Reutlingen",
    description: "Reifenwechsel, Einlagerung und Beratung — schnell und fair in Reutlingen.",
    url: "https://autoklinik-reutlingen.de/reifenservice",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/reifenservice" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Autoklinik Reutlingen",
  url: "https://autoklinik-reutlingen.de",
  telephone: "+4971219880800",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Schillerstraße 22",
    addressLocality: "Reutlingen",
    postalCode: "72764",
    addressRegion: "BW",
    addressCountry: "DE",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Reifenservice",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reifenmontage & Wuchten" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reifeneinlagerung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reifenreparatur" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "RDKS-Sensor-Service" } },
    ],
  },
};

const services = [
  {
    title: "Reifenmontage & Wuchten",
    desc: "Professionelle Montage und präzises Auswuchten Ihrer Reifen auf modernen Maschinen — für ruhigen, sicheren Lauf.",
  },
  {
    title: "Sommer- & Winterreifenwechsel",
    desc: "Saisonaler Reifenwechsel inkl. Sichtprüfung des Reifenzustands und korrekter Einstellung des Luftdrucks.",
  },
  {
    title: "Reifeneinlagerung",
    desc: "Wir lagern Ihre Saisonreifen fachgerecht ein — trocken, nummeriert und auf Profiltiefe kontrolliert.",
  },
  {
    title: "Reifenreparatur",
    desc: "Kleiner Nagel, aber kein Drama: Schäden am Laufstreifen reparieren wir schnell und dauerhaft.",
  },
  {
    title: "RDKS-Sensor-Service",
    desc: "Reifendruckkontrollsystem prüfen, Sensoren ersetzen und korrekt anlernen — bei neuen wie gebrauchten Rädern.",
  },
  {
    title: "Reifenberatung",
    desc: "Welcher Reifen passt zu Ihrem Fahrzeug, Ihrer Fahrweise und Ihrem Budget? Wir beraten ehrlich und herstellerunabhängig.",
  },
];

const faqs = [
  {
    q: "Wann sollte ich auf Winter- oder Sommerreifen wechseln?",
    a: "Als Faustregel gilt: Winterreifen von Oktober bis Ostern (O-bis-O-Regel). Bei Temperaturen dauerhaft unter 7 °C bieten Winterreifen deutlich bessere Haftung — unabhängig von Schnee.",
  },
  {
    q: "Was kostet der Reifenwechsel bei der Autoklinik?",
    a: "Die Kosten hängen von Reifengröße und Felgentyp ab. Rufen Sie uns kurz an oder schreiben Sie uns — wir nennen Ihnen den genauen Preis vorab.",
  },
  {
    q: "Kann ich Räder einlagern lassen?",
    a: "Ja. Wir bieten sichere, fachgerechte Einlagerung Ihrer Saisonräder. Zu Saisonbeginn bringen wir sie einfach wieder hervor und montieren sie direkt.",
  },
  {
    q: "Wie lange dauert ein Reifenwechsel?",
    a: "Ein vollständiger Radsatz-Wechsel inkl. Wuchten dauert in der Regel 45–60 Minuten. Mit Terminvereinbarung oft noch schneller.",
  },
  {
    q: "Welche Profiltiefe muss ein Reifen mindestens haben?",
    a: "Gesetzlich sind 1,6 mm Mindestprofiltiefe vorgeschrieben. Wir empfehlen aber den Wechsel spätestens bei 3 mm (Winter) bzw. 2,5 mm (Sommer) für optimale Sicherheit.",
  },
];

export default function ReifenservicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoklinikNavbar />
      <main>
        {/* ── Hero — clean white with navy strip ── */}
        <section style={{ backgroundColor: "#f5f9fc" }} className="pt-32 pb-0">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-end">
              <div className="flex-1 pb-8">
                <Link
                  href="/#leistungen"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity"
                  style={{ color: "#0074a2" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Alle Leistungen
                </Link>
                <h1
                  className="font-bold tracking-tight leading-[1.08] text-balance mb-6"
                  style={{ color: "#002e40", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
                >
                  Reifenservice<br />
                  <span style={{ color: "#0074a2" }}>in Reutlingen</span>
                </h1>
                <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "#4a6272" }}>
                  Reifenwechsel, Einlagerung, Reparatur und RDKS — alles aus einer Hand. Schnell, günstig und ohne lange Wartezeiten.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#0074a2" }}
                  >
                    Termin buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+4971219880800"
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all"
                    style={{ borderColor: "#b0d4e4", color: "#002e40" }}
                  >
                    07121 9880800
                  </a>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Alle Marken", "Einlagerung möglich", "RDKS-Service", "Termin in 48h"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Large reifen icon + visual */}
              <div className="w-full lg:w-[400px] shrink-0 flex items-end justify-center gap-6">
                <div className="relative" style={{ width: 200, height: 340 }}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <Image
                      src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
                      alt="Reifenwechsel in der Autoklinik Reutlingen"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="200px"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 pb-6">
                  <div className="rounded-2xl p-6 flex flex-col items-center gap-2" style={{ backgroundColor: "#002e40" }}>
                    <Image
                      src="/assets/images/6937e7168920287b24bafc7c_icon-reifen.png"
                      alt="Reifenservice Icon"
                      width={48}
                      height={48}
                      className="object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <span className="text-xs font-semibold text-center" style={{ color: "rgba(255,255,255,0.7)" }}>Reifenservice</span>
                  </div>
                  <div className="rounded-2xl p-5" style={{ backgroundColor: "#eef6fa", border: "1px solid #d5e8f0" }}>
                    <p className="text-2xl font-bold" style={{ color: "#002e40" }}>48h</p>
                    <p className="text-xs" style={{ color: "#4a6272" }}>Termin verfügbar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom navy accent bar */}
          <div style={{ height: 6, backgroundColor: "#0074a2" }} />
        </section>

        {/* ── Services ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Leistungen</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Alles rund um Ihre Reifen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {services.map((s) => (
                <div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <Image src="/assets/images/6937e7168920287b24bafc7c_icon-reifen.png" alt="" width={22} height={22} className="object-contain" />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Seasonal hint ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Saisonwechsel</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  Sommer- und Winterreifen rechtzeitig buchen.
                </h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Zu Saisonbeginn sind die Wartezeiten lang. Sichern Sie sich Ihren Termin frühzeitig — wir erinnern Sie auf Wunsch automatisch.
                </p>
              </div>
              <Link
                href="/terminbuchung"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#0074a2" }}
              >
                Jetzt Termin sichern
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>FAQ</p>
            <h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Häufige Fragen zum Reifenservice
            </h2>
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #d5e8f0" }}>
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-6" style={{ borderBottom: "1px solid #d5e8f0" }}>
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#002e40" }}>{faq.q}</span>
                    <span className="shrink-0 text-[#0074a2]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-45">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Other services ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <p className="text-sm font-semibold mb-8" style={{ color: "#4a6272" }}>Weitere Leistungen der Autoklinik</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Inspektion & Wartung", href: "/inspektion" },
                { name: "TÜV & AU", href: "/tuev-au" },
                { name: "Glasservice", href: "/glasservice" },
                { name: "Klimaservice", href: "/klimaservice" },
                { name: "Unfallservice", href: "/unfall" },
                { name: "Flottenbetreuung", href: "/flottenbetreuung" },
              ].map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
                  style={{ borderColor: "#c5dde8", color: "#002e40" }}
                >
                  {s.name}
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <AutoklinikFooter />
    </>
  );
}
