import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "TÜV & Hauptuntersuchung in Reutlingen | Autoklinik Reutlingen",
  description:
    "TÜV-Vorbereitung, Hauptuntersuchung (HU) und Abgasuntersuchung (AU) in Reutlingen. Wir bereiten Ihr Fahrzeug optimal vor — schnell, zuverlässig, mit anerkanntem TÜV-Partner.",
  keywords: [
    "TÜV Reutlingen",
    "Hauptuntersuchung Reutlingen",
    "HU Reutlingen",
    "AU Reutlingen",
    "TÜV Vorbereitung Reutlingen",
    "Abgasuntersuchung Reutlingen",
    "Autoklinik Reutlingen",
  ],
  openGraph: {
    title: "TÜV & Hauptuntersuchung in Reutlingen | Autoklinik Reutlingen",
    description: "TÜV-Vorbereitung und HU/AU in Reutlingen — wir sorgen dafür, dass Ihr Fahrzeug sicher durch den TÜV kommt.",
    url: "https://autoklinik-reutlingen.de/tuev-au",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/tuev-au" },
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
    name: "TÜV & AU",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "TÜV-Vorbereitungscheck" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hauptuntersuchung (HU)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Abgasuntersuchung (AU)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mängelbeseitigung nach HU" } },
    ],
  },
};

const checks = [
  { title: "Licht & Elektrik", desc: "Alle Scheinwerfer, Blinker, Bremsleuchten und elektrischen Sicherheitskomponenten werden geprüft und eingestellt." },
  { title: "Bremsen", desc: "Bremsbeläge, Bremsscheiben und Bremsflüssigkeit — wir prüfen, ob alles TÜV-konform ist und tauschen bei Bedarf aus." },
  { title: "Fahrwerk & Lenkung", desc: "Spurstangen, Achsgelenke, Stoßdämpfer und Bereifung werden auf Verschleiß und Sicherheit kontrolliert." },
  { title: "Abgasuntersuchung (AU)", desc: "Emissionswerte messen, OBD-Diagnose durchführen und sicherstellen, dass Ihr Fahrzeug die gesetzlichen Grenzwerte einhält." },
  { title: "Karosserie & Rahmen", desc: "Sichtprüfung auf Rost, Risse oder strukturelle Schäden, die die Fahrzeugsicherheit beeinträchtigen könnten." },
  { title: "Mängelbeseitigung", desc: "Werden bei der HU Mängel festgestellt, beheben wir diese direkt — für eine reibungslose Nachprüfung." },
];

const faqs = [
  {
    q: "Wann ist mein Fahrzeug zur HU fällig?",
    a: "Neue Fahrzeuge müssen nach 3 Jahren zur ersten HU, danach alle 2 Jahre. Das genaue Fälligkeitsdatum steht auf der TÜV-Plakette hinten am Fahrzeug.",
  },
  {
    q: "Was kostet der TÜV-Vorbereitungscheck?",
    a: "Den Vorbereitungscheck führen wir kostengünstig durch und rechnen die Kosten bei direkt folgender Reparatur auf Wunsch an. Sprechen Sie uns an — wir nennen Ihnen vorab den genauen Preis.",
  },
  {
    q: "Was passiert, wenn mein Auto beim TÜV durchfällt?",
    a: "Mit erheblichen Mängeln haben Sie 4 Wochen Zeit, diese zu beseitigen und das Fahrzeug erneut vorzustellen. Bei gefährlichen Mängeln muss das Fahrzeug sofort stillgelegt werden. Wir kümmern uns um schnelle Beseitigung.",
  },
  {
    q: "Führt die Autoklinik die HU selbst durch?",
    a: "Wir bereiten Ihr Fahrzeug optimal vor und arbeiten mit anerkannten Prüforganisationen vor Ort zusammen. So kommen Sie mit einem Top-Fahrzeug zum TÜV-Termin.",
  },
  {
    q: "Kann ich direkt nach dem TÜV-Vorbereitungscheck zur Hauptuntersuchung?",
    a: "Ja. Wir koordinieren Termine so, dass Sie möglichst wenig Aufwand haben. Rufen Sie uns an oder buchen Sie online.",
  },
];

export default function TuevAuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoklinikNavbar />
      <main>
        {/* ── Hero — light blue accent ── */}
        <section style={{ backgroundColor: "#0074a2" }} className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <Link
                  href="/#leistungen"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.7)" }}
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
                  TÜV &amp; Hauptuntersuchung<br />
                  in Reutlingen
                </h1>
                <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Wir bereiten Ihr Fahrzeug gründlich vor — Vorbereitungscheck, Mängelbeseitigung und Koordination mit dem TÜV. Ohne Stress, ohne Überraschungen.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-110"
                    style={{ backgroundColor: "#002e40", color: "#ffffff" }}
                  >
                    Termin buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+4971219880800"
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}
                  >
                    07121 9880800
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {["TÜV-Vorbereitungscheck", "Alle Marken", "Schnelle Mängelbeseitigung", "Mit TÜV-Partner"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* TÜV icon + image stack */}
              <div className="relative w-full lg:w-[400px] shrink-0 flex items-center justify-center" style={{ height: 380 }}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                    alt="Fahrzeug bei der Hauptuntersuchung in der Autoklinik Reutlingen"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 rounded-2xl p-5 shadow-xl"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Image
                    src="/assets/images/6937e7159229bbc42b6c8632_icon-tuev.png"
                    alt="TÜV Süd Partner"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What we check ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Unser Vorbereitungscheck</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Was wir für Sie prüfen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {checks.map((c) => (
                <div key={c.title} className="p-8" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>So läuft es ab</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              In 3 Schritten sicher durch den TÜV
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {[
                { step: "01", title: "Vorbereitungscheck", desc: "Wir prüfen Ihr Fahrzeug auf alle relevanten TÜV-Kriterien und identifizieren vorhandene Mängel." },
                { step: "02", title: "Mängelbeseitigung", desc: "Alle festgestellten Mängel werden direkt bei uns behoben — Bremsen, Licht, Fahrwerk und mehr." },
                { step: "03", title: "Zum TÜV-Termin", desc: "Ihr Fahrzeug ist optimal vorbereitet. Wir koordinieren den Termin mit unserem TÜV-Partner." },
              ].map((s) => (
                <div key={s.step} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#f5f9fc" }}>
                  <span className="text-4xl font-bold tabular-nums" style={{ color: "#d5e8f0" }}>{s.step}</span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>FAQ</p>
            <h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Häufige Fragen zur HU & AU
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
                { name: "Reifenservice", href: "/reifenservice" },
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
