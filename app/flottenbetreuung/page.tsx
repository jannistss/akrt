import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";
import { WorkshopServices } from "@/components/workshop-services";

export const metadata: Metadata = {
  title: "Flottenbetreuung in Reutlingen | Fuhrparkservice vom Meisterbetrieb | Autoklinik",
  description:
    "Professionelle Flottenbetreuung für Unternehmen in Reutlingen. Inspektion, Reifen, TÜV und Reparaturen für Ihren gesamten Fuhrpark — aus einer Hand, mit fairen Preisen.",
  keywords: [
    "Flottenbetreuung Reutlingen",
    "Fuhrparkservice Reutlingen",
    "Firmenwagen Werkstatt Reutlingen",
    "Flottenservice Reutlingen",
    "Fuhrpark Reutlingen",
    "Autoklinik Reutlingen",
  ],
  openGraph: {
    title: "Flottenbetreuung in Reutlingen | Autoklinik Reutlingen",
    description: "Flottenbetreuung vom Meisterbetrieb — weniger Ausfälle, mehr Kilometer, faire Preise.",
    url: "https://autoklinik-reutlingen.de/flottenbetreuung",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/flottenbetreuung" },
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
    name: "Flottenbetreuung",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inspektion & Wartung für Flotten" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "TÜV & AU Koordination" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reifenservice für Fuhrparks" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Unfallreparatur & Gutachten" } },
    ],
  },
};

const highlights = [
  "Meisterbetrieb",
  "Alle Marken",
  "Faire Flottenpreise",
  "Kurze Wartezeiten",
  "Terminkoordination",
  "TÜV in 48 Stunden",
];

const benefits = [
  {
    title: "Minimale Standzeiten",
    text: "Wir koordinieren Servicetermine gezielt, um Ausfälle Ihrer Fahrzeuge auf ein Minimum zu reduzieren. Keine langen Wartezeiten.",
  },
  {
    title: "Ein Ansprechpartner für alles",
    text: "Inspektion, Reifen, TÜV, Reparatur — ein Betrieb, eine Rechnung, ein Ansprechpartner. Das spart Zeit und Nerven.",
  },
  {
    title: "Faire Flottenkonditionen",
    text: "Ab einer gewissen Fahrzeuganzahl profitieren Sie von günstigen Flottenpreisen. Sprechen Sie uns an — wir machen ein individuelles Angebot.",
  },
  {
    title: "Kompetenter Meisterbetrieb",
    text: "Alle Arbeiten werden von qualifizierten Fachkräften unter Meisteraufsicht durchgeführt — für höchste Qualität und Rechtssicherheit.",
  },
  {
    title: "Intervallüberwachung",
    text: "Wir behalten die Wartungsintervalle für Ihre gesamte Flotte im Blick und erinnern Sie rechtzeitig — damit kein Fahrzeug überfällig wird.",
  },
  {
    title: "Flexibel & transparent",
    text: "Klare Kommunikation, verbindliche Festpreise und flexible Termingestaltung — auch für kurzfristige Reparaturen.",
  },
];

const faqs = [
  {
    q: "Ab wie vielen Fahrzeugen lohnt sich Flottenbetreuung?",
    a: "Schon ab 2–3 Fahrzeugen lohnt es sich, einen verlässlichen Partnerbetrieb zu haben. Ab ca. 5 Fahrzeugen sind spezielle Flottenkonditionen möglich. Sprechen Sie uns einfach an.",
  },
  {
    q: "Können Sie Fahrzeuge unterschiedlicher Marken betreuen?",
    a: "Ja — wir betreuen alle gängigen Marken und Modelle. Als freie Fachwerkstatt sind wir nicht auf einen Hersteller beschränkt.",
  },
  {
    q: "Bieten Sie Abhol- und Bringservice an?",
    a: "Je nach Umfang und Vereinbarung — sprechen Sie uns darauf an. Für Flottenpartner finden wir individuelle Lösungen.",
  },
  {
    q: "Wie werden Kosten abgerechnet?",
    a: "Auf Wunsch monatlich gesammelt oder nach jedem Auftrag einzeln. Wir passen die Abrechnung an Ihre Buchhaltung an.",
  },
  {
    q: "Was passiert, wenn ein Fahrzeug kurzfristig ausfällt?",
    a: "Wir versuchen stets, Flottenpartner bevorzugt zu terminieren. Rufen Sie an — wir finden auch für dringende Fälle eine Lösung.",
  },
];

export default function FlottenbetreuungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoklinikNavbar />
      <main>
        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <Link
                  href="/#leistungen"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity"
                  style={{ color: "#4db8d8" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Alle Leistungen
                </Link>
                <h1
                  className="font-bold tracking-tight leading-[1.08] text-balance mb-6"
                  style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
                >
                  Weniger Ausfälle,<br />
                  mehr Kilometer.<br />
                  <span style={{ color: "#4db8d8" }}>Flottenbetreuung</span><br />
                  vom Meisterbetrieb.
                </h1>
                <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Ob 3 oder 30 Fahrzeuge — wir halten Ihren Fuhrpark zuverlässig auf der Straße. Inspektion, TÜV, Reifen und Reparaturen aus einer Hand, mit fairen Preisen und kurzen Wartezeiten.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#0074a2" }}
                  >
                    Flotte anfragen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+4971219880800"
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                  >
                    07121 9880800
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {highlights.map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 460 }}>
                <Image
                  src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                  alt="Flottenbetreuung Werkstatt Autoklinik Reutlingen"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                {/* Stats badges */}
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <div className="rounded-xl px-4 py-3 text-center" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.2)" }}>
                    <p className="text-xl font-bold text-white">48h</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>TÜV-Termin</p>
                  </div>
                  <div className="rounded-xl px-4 py-3 text-center" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.2)" }}>
                    <p className="text-xl font-bold text-white">1</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Ansprechpartner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── For whom ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Für Unternehmen</p>
                <h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-6" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
                  Wer einen Fuhrpark betreibt, kennt das Problem.
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6272" }}>
                  Ein Fahrzeug fällt aus, der Zeitplan gerät ins Wanken, Kunden warten. Wartungsintervalle werden vergessen, Rechnungen kommen aus allen Richtungen — und den Überblick behält niemand mehr.
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "#4a6272" }}>
                  Die Autoklinik Reutlingen übernimmt die Verantwortung für Ihren gesamten Fuhrpark: Wartungsintervalle, TÜV-Koordination, Reparaturen, alles aus einer Hand.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Handwerksbetriebe", "Pflegedienste", "Kurierdienste", "Einzelhändler", "Bauunternehmen", "Soziale Träger"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #d5e8f0" }}>
                {benefits.slice(0, 4).map((b) => (
                  <div key={b.title} className="flex gap-5 py-5" style={{ borderBottom: "1px solid #d5e8f0" }}>
                    <div className="h-5 w-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "#0074a2" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-1" style={{ color: "#002e40" }}>{b.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Full benefits grid ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Was Sie bekommen</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Unser Flottenservice-Versprechen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {benefits.map((b) => (
                <div key={b.title} className="p-8" style={{ backgroundColor: "#ffffff" }}>
                  <div className="h-5 w-5 rounded-full mb-5 flex items-center justify-center" style={{ backgroundColor: "#0074a2" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Workshop services ── */}
        <WorkshopServices />

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Angebot einholen</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  Erzählen Sie uns von Ihrer Flotte.
                </h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Wir erstellen Ihnen ein unverbindliches Angebot — zugeschnitten auf die Größe und Anforderungen Ihres Fuhrparks.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#0074a2" }}
                >
                  Angebot anfragen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href="tel:+4971219880800"
                  className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                >
                  07121 9880800
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>FAQ</p>
            <h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Häufige Fragen zur Flottenbetreuung
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
                { name: "Reifenservice", href: "/reifenservice" },
                { name: "Glasservice", href: "/glasservice" },
                { name: "Klimaservice", href: "/klimaservice" },
                { name: "Unfallservice", href: "/unfall" },
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
