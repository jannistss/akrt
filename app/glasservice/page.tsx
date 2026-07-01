import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Glasservice & Windschutzscheibe in Reutlingen | Autoklinik Reutlingen",
  description:
    "Steinschlagreparatur, Windschutzscheibenwechsel und Autoglasservice in Reutlingen. Schnell, versicherungskonform und direkt mit Ihrer KFZ-Versicherung abgerechnet.",
  keywords: [
    "Glasservice Reutlingen",
    "Windschutzscheibe wechseln Reutlingen",
    "Steinschlag reparieren Reutlingen",
    "Autoglas Reutlingen",
    "Scheibe wechseln Reutlingen",
    "Autoklinik Reutlingen",
  ],
  openGraph: {
    title: "Glasservice & Windschutzscheibe in Reutlingen | Autoklinik Reutlingen",
    description: "Steinschlag reparieren oder Scheibe tauschen — wir rechnen direkt mit Ihrer KFZ-Versicherung ab.",
    url: "https://autoklinik-reutlingen.de/glasservice",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/glasservice" },
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
    name: "Glasservice",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steinschlagreparatur" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Windschutzscheibenwechsel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heckscheibe & Seitenscheiben" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Versicherungsabrechnung" } },
    ],
  },
};

const services = [
  {
    title: "Steinschlagreparatur",
    desc: "Kleiner Steinschlag? Schnell repariert bevor sich Risse bilden. In ca. 30 Minuten — oft ohne Zuzahlung über die Versicherung.",
  },
  {
    title: "Windschutzscheibenwechsel",
    desc: "Riss zu groß für eine Reparatur? Wir tauschen die Scheibe fachgerecht aus — mit Originalscheiben oder gleichwertigen Alternativen.",
  },
  {
    title: "Heck- & Seitenscheiben",
    desc: "Beschädigte Heck- oder Seitenscheibe? Wir ersetzen alle Fahrzeugscheiben schnell und sauber.",
  },
  {
    title: "Versicherungsabrechnung",
    desc: "Wir übernehmen die Direktabrechnung mit Ihrer KFZ-Versicherung — kein Papierkram für Sie, keine Vorleistung.",
  },
  {
    title: "Kalibrierung von Fahrerassistenzsystemen",
    desc: "Nach einem Scheibenwechsel kalibrieren wir Kameras und Sensoren (z. B. Spurhalteassistent, Notbremsassistent) neu.",
  },
  {
    title: "Dichtheitsprüfung",
    desc: "Nach der Montage testen wir auf Dichtigkeit — damit kein Wasser eindringen kann und die Klebung hält.",
  },
];

const faqs = [
  {
    q: "Zahlt die Versicherung einen Steinschlag?",
    a: "Ja — mit Teilkaskoversicherung sind Steinschlag-Reparaturen in der Regel ohne Selbstbeteiligung gedeckt. Wir rechnen direkt mit Ihrer Versicherung ab.",
  },
  {
    q: "Wann lohnt sich Reparatur, wann Scheibenwechsel?",
    a: "Steinschläge bis etwa 3 cm Durchmesser und außerhalb des direkten Sichtfelds können meist repariert werden. Größere Risse oder Schäden im Sichtfeld erfordern einen Scheibenwechsel.",
  },
  {
    q: "Wie lange dauert der Scheibenwechsel?",
    a: "Ein Windschutzscheibenwechsel dauert ca. 1–2 Stunden. Anschließend benötigt der Kleber eine Aushärtezeit von ca. 1 Stunde, bevor das Fahrzeug wieder vollständig genutzt werden kann.",
  },
  {
    q: "Kann ich direkt nach dem Steinschlag kommen?",
    a: "Je schneller, desto besser — denn Temperaturwechsel und Erschütterungen können aus einem kleinen Steinschlag schnell einen langen Riss machen. Rufen Sie uns an, wir finden einen kurzfristigen Termin.",
  },
  {
    q: "Verliere ich meine TÜV-Plakette nach einem Scheibenwechsel?",
    a: "Nein — solange die neue Scheibe den Anforderungen entspricht und sauber eingebaut ist, hat das keinen Einfluss auf die HU-Plakette.",
  },
];

export default function GlasservicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoklinikNavbar />
      <main>
        {/* ── Hero — clear/glass aesthetic: white + very light blue ── */}
        <section style={{ backgroundColor: "#eef6fa" }} className="pt-32 pb-20 relative overflow-hidden">
          {/* Subtle decorative lines */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(135deg, transparent 0%, rgba(0,116,162,0.06) 100%)" }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
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
                  Glasservice &amp;<br />
                  <span style={{ color: "#0074a2" }}>Windschutzscheibe</span><br />
                  in Reutlingen
                </h1>
                <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "#4a6272" }}>
                  Steinschlag reparieren oder Scheibe tauschen — wir erledigen das schnell und rechnen direkt mit Ihrer KFZ-Versicherung ab. Ohne Aufwand für Sie.
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
                  {["Versicherungsabrechnung", "Alle Marken", "Steinschlag ab 30 Min", "Kalibrierung möglich"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0", color: "#0074a2" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Image + glass icon card */}
              <div className="w-full lg:w-[440px] shrink-0 relative" style={{ height: 440 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                    alt="Glasservice Windschutzscheibe wechseln Autoklinik Reutlingen"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.5) 100%)" }} />
                </div>
                {/* Glass icon badge */}
                <div
                  className="absolute bottom-6 left-6 rounded-2xl px-5 py-4 flex items-center gap-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)" }}
                >
                  <Image
                    src="/assets/images/698dccd20f3ec8ce449ef838_Icon-Glas.png"
                    alt="Glasservice Icon"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#002e40" }}>Glasservice</p>
                    <p className="text-xs" style={{ color: "#4a6272" }}>Direkte Versicherungsabrechnung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Leistungen</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Unser Glasservice-Angebot
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {services.map((s) => (
                <div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <Image src="/assets/images/698dccd20f3ec8ce449ef838_Icon-Glas.png" alt="" width={22} height={22} className="object-contain" />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Insurance CTA banner ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Versicherung</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  Wir rechnen direkt mit Ihrer Versicherung ab.
                </h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Kein Formularchaos, keine Vorleistung: Wir übernehmen die Kommunikation mit Ihrer KFZ-Teilkasko. Alles was Sie brauchen: Ihre Versicherungsdaten.
                </p>
              </div>
              <Link
                href="/terminbuchung"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#0074a2" }}
              >
                Termin buchen
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
              Häufige Fragen zum Glasservice
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
