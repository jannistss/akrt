import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Inspektion & Wartung in Reutlingen | Autoklinik Reutlingen",
  description:
    "Professionelle Inspektion und Wartung für alle Fahrzeugmarken in Reutlingen. Herstellerkonformer Service, transparente Preise, kurze Wartezeiten. Jetzt Termin online buchen.",
  keywords: [
    "Inspektion Reutlingen",
    "Autowartung Reutlingen",
    "Ölwechsel Reutlingen",
    "Inspektion Werkstatt Reutlingen",
    "Herstellerservice Reutlingen",
    "Autoklinik Reutlingen",
  ],
  openGraph: {
    title: "Inspektion & Wartung in Reutlingen | Autoklinik Reutlingen",
    description:
      "Herstellerkonformer Inspektionsservice für alle Marken. Transparent, schnell, fair.",
    url: "https://autoklinik-reutlingen.de/inspektion",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/inspektion" },
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
    name: "Inspektion & Wartung",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kleiner Ölwechsel & Filtercheck" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Große Inspektion nach Herstellervorgabe" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zahnriemen- und Zahnkettenwechsel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bremsflüssigkeitswechsel" } },
    ],
  },
};

const services = [
  {
    title: "Ölwechsel & Filterwechsel",
    desc: "Motor-, Luft-, Pollen- und Kraftstofffilter — alles nach Herstellervorgabe ausgetauscht. Nur geprüfte Markenöle.",
  },
  {
    title: "Große Inspektion",
    desc: "Komplette Durchsicht nach Herstellerspezifikation: über 50 Prüfpunkte, Sichtprüfung Fahrwerk, Bremsen, Lichter.",
  },
  {
    title: "Zahnriemen & Zahnkette",
    desc: "Fristgerechter Wechsel verhindert Totalschäden. Wir prüfen Intervall und Zustand und beraten ehrlich.",
  },
  {
    title: "Bremsflüssigkeit",
    desc: "Feuchtigkeitsgehalt messen, bei Bedarf vollständig wechseln — für sichere Bremskraft bei jedem Wetter.",
  },
  {
    title: "Kühlflüssigkeit & Frostschutz",
    desc: "Konzentration prüfen, System spülen und neu befüllen. Schutz für den Motor das ganze Jahr.",
  },
  {
    title: "Service-Intervall-Reset",
    desc: "Rücksetzung des Servicezählers im Bordcomputer nach jeder Inspektion — alle gängigen Fahrzeuge.",
  },
];

const faqs = [
  {
    q: "Wie oft muss ich mein Auto inspizieren lassen?",
    a: "Die meisten Hersteller empfehlen eine Inspektion alle 12 Monate oder alle 15.000–30.000 km — je nachdem, was zuerst erreicht wird. Ihr Serviceheft oder Bordcomputer zeigt den genauen Intervall.",
  },
  {
    q: "Verliere ich meine Garantie, wenn ich nicht zur Vertragswerkstatt gehe?",
    a: "Nein. Seit dem EU-Gruppenfreistellungsgesetz (GVO) dürfen Sie jeden qualifizierten Fachbetrieb für Garantiearbeiten und Inspektionen nutzen — die Garantie bleibt erhalten, solange Original- oder gleichwertige Teile verbaut werden.",
  },
  {
    q: "Was kostet eine Inspektion bei der Autoklinik?",
    a: "Der Preis hängt vom Fahrzeug, Motoröl und Umfang ab. Wir nennen Ihnen vor der Arbeit immer einen verbindlichen Festpreis — keine versteckten Nachträge.",
  },
  {
    q: "Kann ich während der Inspektion warten?",
    a: "Ja. Für Wartungsarbeiten können Sie in unserem Wartebereich bleiben. Bei umfangreicheren Arbeiten holen wir Sie gerne mit einem Kostenvoranschlag ab.",
  },
  {
    q: "Wie lange dauert eine Inspektion?",
    a: "Eine kleine Inspektion (Ölwechsel + Filtercheck) dauert ca. 1 Stunde. Die große Inspektion je nach Fahrzeug 2–3 Stunden.",
  },
];

export default function InspektionPage() {
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
                  Inspektion &amp; Wartung<br />
                  <span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </h1>
                <p
                  className="text-lg leading-relaxed mb-10 max-w-xl"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Herstellerkonformer Inspektionsservice für alle Marken — transparent, termingerecht und ohne versteckte Kosten. Ihre Herstellergarantie bleibt erhalten.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#0074a2" }}
                  >
                    Termin online buchen
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
                {/* Trust pills */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {["Alle Marken", "Garantie bleibt erhalten", "Festpreis-Versprechen", "Termin in 48h"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-4 py-1.5 text-xs font-medium"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }}>
                <Image
                  src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
                  alt="Kfz-Mechaniker führt Inspektion am Fahrzeug durch in der Autoklinik Reutlingen"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,20,32,0.6) 100%)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Was wir machen</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Unser Inspektions-Leistungsumfang
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {services.map((s) => (
                <div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <Image src="/assets/images/6937e715063be152c1cb3309_icon-reperatur.png" alt="" width={22} height={22} className="object-contain" />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Autoklinik ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Warum zu uns</p>
                <h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-8" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
                  Freie Werkstatt — volle Herstellerkonformität.
                </h2>
                <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #d5e8f0" }}>
                  {[
                    { title: "Kein Markenzwang", text: "Wir bedienen alle Marken mit Originalteilen oder gleichwertigen Alternativen — keine teure Vertragsbindung." },
                    { title: "Transparente Preise", text: "Vor jeder Arbeit nennen wir Ihnen den genauen Preis. Kein Nachschlag, keine Überraschungen auf der Rechnung." },
                    { title: "Garantie bleibt erhalten", text: "Durch EU-Recht dürfen freie Werkstätten herstellerkonforme Inspektionen durchführen, ohne die Garantie zu gefährden." },
                    { title: "Kurze Wartezeiten", text: "Online-Terminbuchung rund um die Uhr — oft Termin innerhalb von 48 Stunden verfügbar." },
                  ].map((p) => (
                    <div key={p.title} className="flex gap-5 py-5" style={{ borderBottom: "1px solid #d5e8f0" }}>
                      <div className="h-5 w-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "#0074a2" }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1" style={{ color: "#002e40" }}>{p.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{p.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 480 }}>
                <Image
                  src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                  alt="Werkstatt Autoklinik Reutlingen von innen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>FAQ</p>
            <h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Häufige Fragen zur Inspektion
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
                { name: "TÜV & AU", href: "/tuev-au" },
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
