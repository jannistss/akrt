"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, slideLeft, slideRight, scaleUp, staggerContainer, staggerItem } from "@/lib/animation";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Kfz-Sachverständigenbüro Najami",
    description: "Unabhängiger Kfz-Sachverständiger in Reutlingen — Express-Gutachten, kostenlos bei Fremdverschulden",
    telephone: "+491556314 6679",
    email: "info@sv-najami.de",
    url: "https://www.sv-najami.de",
    address: { "@type": "PostalAddress", streetAddress: "Haldenhaustraße 3", addressLocality: "Reutlingen", postalCode: "72770", addressCountry: "DE" },
    openingHours: "Mo-Fr 08:00-18:00",
    sameAs: ["https://www.instagram.com/sv.najami", "https://www.sv-najami.de"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "300" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karim Najami",
    jobTitle: "Kfz-Sachverständiger",
    worksFor: { "@type": "Organization", name: "Kfz-Sachverständigenbüro Najami" },
    address: { "@type": "PostalAddress", streetAddress: "Haldenhaustraße 3", addressLocality: "Reutlingen", postalCode: "72770", addressCountry: "DE" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Muss ich den Gutachter selbst bezahlen?", acceptedAnswer: { "@type": "Answer", text: "Nein. Bei einem Unfall mit Fremdverschulden zahlt die Haftpflichtversicherung des Unfallverursachers alle Kosten vollständig gemäß §249 BGB. Sie müssen nichts vorstrecken." } },
      { "@type": "Question", name: "Wie schnell bekomme ich einen Termin?", acceptedAnswer: { "@type": "Answer", text: "In der Regel innerhalb von 24 Stunden. Da Kfz-Gutachter Najami direkt in unserer Werkstatt ansässig ist, ist eine schnelle Koordination möglich — auch kurzfristig." } },
      { "@type": "Question", name: "Was kostet ein Gutachten als Selbstzahler?", acceptedAnswer: { "@type": "Answer", text: "Die Honorare richten sich nach der BVSK-Tabelle, ab ca. 220 EUR bei 1.000 EUR Schaden." } },
      { "@type": "Question", name: "Was ist der Vorteil eines unabhängigen Gutachters?", acceptedAnswer: { "@type": "Answer", text: "Ein unabhängiger Sachverständiger arbeitet nur für den Geschädigten, nicht für die Versicherung — das verhindert eine Unter-Bewertung des Schadens und sichert den vollen Anspruch." } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://akrt-iota.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Kfz-Gutachter Reutlingen", item: "https://akrt-iota.vercel.app/kfz-gutachter" },
    ],
  },
];

const services = [
  { icon: "🔍", title: "Unfallschadensgutachten", desc: "Bei Fremdverschulden kostenlos — die Versicherung übernimmt alle Kosten gemäß §249 BGB." },
  { icon: "📉", title: "Wertminderungsgutachten", desc: "Merkantile Wertminderung nach der anerkannten Ruhkopf/Sahm-Methode." },
  { icon: "⚖️", title: "Totalschadensgutachten", desc: "Wiederbeschaffungswert und Restwertermittlung — vollständig und gerichtsfest." },
  { icon: "🚗", title: "Fahrzeugwertgutachten", desc: "Für Kauf, Verkauf, Versicherung oder Erbschaft — unabhängig und belastbar." },
  { icon: "⚡", title: "Express-Gutachten 24h", desc: "Gutachtenübergabe innerhalb von 24 Stunden — direkt vor Ort in der Werkstatt." },
  { icon: "🏆", title: "Oldtimergutachten", desc: "Klassiker und Liebhaberfahrzeuge — fachkundige Bewertung mit Liebe zum Detail." },
];

const advantages = [
  { title: "Unabhängig", desc: "Kein Interessenkonflikt mit der Versicherung — ausschließlich in Ihrem Interesse." },
  { title: "Vollständig", desc: "Sichert Ihren vollen Schadensersatzanspruch ohne Abstriche." },
  { title: "Kostenlos", desc: "Bei Fremdverschulden zahlt die gegnerische Versicherung — Sie zahlen nichts." },
];

const faqs = [
  { q: "Muss ich den Gutachter selbst bezahlen?", a: "Nein. Bei einem Unfall mit Fremdverschulden zahlt die Haftpflichtversicherung des Unfallverursachers alle Kosten vollständig gemäß §249 BGB. Sie müssen nichts vorstrecken." },
  { q: "Wie schnell bekomme ich einen Termin?", a: "In der Regel innerhalb von 24 Stunden. Da Kfz-Gutachter Najami direkt in unserer Werkstatt ansässig ist, ist eine schnelle Koordination möglich — auch kurzfristig." },
  { q: "Was kostet ein Gutachten als Selbstzahler?", a: "Die Honorare richten sich nach der BVSK-Tabelle, ab ca. 220 EUR bei 1.000 EUR Schaden." },
  { q: "Was ist der Vorteil eines unabhängigen Gutachters?", a: "Ein unabhängiger Sachverständiger arbeitet nur für den Geschädigten, nicht für die Versicherung — das verhindert eine Unter-Bewertung des Schadens und sichert den vollen Anspruch." },
];

export default function KfzGutachterPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <AutoklinikNavbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/najami/hero-desktop.webp"
              alt="Kfz-Gutachter Reutlingen — professionelle Fahrzeugbegutachtung"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,10,20,0.62)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,10,20,0.70) 45%, transparent 100%)" }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-36 w-full">
            <div className="max-w-2xl">
              <motion.div className="flex items-center gap-2 mb-6" {...fadeUp(0)}>
                <Image
                  src="/assets/images/najami/logo-white.png"
                  alt="Kfz-Sachverständigenbüro Najami Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </motion.div>
              <motion.p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#60c4e0" }} {...fadeUp(0.05)}>
                Direkter Partner der Autoklinik Reutlingen
              </motion.p>
              <motion.h1
                className="font-bold leading-[1.08] tracking-tight text-white text-balance mb-6"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
                {...fadeUp(0.1)}
              >
                Ihr Kfz-Gutachter<br />
                <span style={{ color: "#60c4e0" }}>direkt in unserer Werkstatt</span>
              </motion.h1>
              <motion.p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.78)" }} {...fadeUp(0.2)}>
                Unabhängig. Schnell. Kostenlos bei Fremdverschulden.
              </motion.p>
              <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                <a
                  href="tel:+4915563146679"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#1d4ed8" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  0155 631 46679
                </a>
                <a
                  href="https://wa.me/4915563146679"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.9 1.02 1.04-3.8-.25-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0122 12c0 5.52-4.48 10-10 10zm5.47-7.38l-1.93-.56a.75.75 0 00-.74.19l-.54.56a.74.74 0 01-.8.17 11.3 11.3 0 01-3.44-2.19 11.3 11.3 0 01-2.19-3.44.74.74 0 01.17-.8l.56-.54a.75.75 0 00.19-.74l-.56-1.93a.75.75 0 00-.72-.54h-1.8a.75.75 0 00-.75.78c.16 2.06 1 4.01 2.39 5.56a13.08 13.08 0 005.57 3.93.75.75 0 00.84-.23l.56-.7a.75.75 0 00-.08-1.02z" fill="white"/>
                  </svg>
                  WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <section style={{ backgroundColor: "#1d4ed8" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5">
            <motion.div
              className="flex flex-wrap justify-center gap-x-10 gap-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {["5,0 ★ Google-Bewertung", "300+ Gutachten", "24h Express-Service", "Kostenlos bei Fremdverschulden", "Vor-Ort in der Werkstatt"].map((item) => (
                <motion.span key={item} className="text-sm font-medium text-white/90" variants={staggerItem}>{item}</motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── USP Info Box ── */}
        <section style={{ backgroundColor: "#f0f7ff" }}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16">
            <motion.div
              className="rounded-2xl p-8 sm:p-10 flex gap-6 items-start"
              style={{ backgroundColor: "#dbeafe", border: "2px solid #93c5fd" }}
              {...scaleUp(0)}
            >
              <div className="shrink-0 mt-1 h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1d4ed8" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold mb-2" style={{ color: "#1e3a8a" }}>Bei Fremdverschulden zahlen Sie nichts</p>
                <p className="text-sm leading-relaxed" style={{ color: "#1e40af" }}>
                  Die gegnerische Haftpflichtversicherung übernimmt alle Gutachterkosten vollständig gemäß <strong>§249 BGB</strong>. Sie müssen kein Geld vorstrecken — wir rechnen direkt mit der Versicherung ab.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Leistungen ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#1d4ed8" }} {...fadeUp(0)}>Leistungen</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#0f172a", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Was wir für Sie erstellen</motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {services.map((s) => (
                <motion.div
                  key={s.title}
                  className="p-6 rounded-2xl flex flex-col gap-4 h-full"
                  style={{ backgroundColor: "#f8faff", border: "1px solid #bfdbfe" }}
                  variants={staggerItem}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(29,78,216,0.10)", transition: { duration: 0.25 } }}
                >
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#dbeafe" }}>
                    {s.icon}
                  </div>
                  <h3 className="text-base font-bold" style={{ color: "#0f172a" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: "#475569" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Person Section ── */}
        <section style={{ backgroundColor: "#f8faff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <motion.div className="relative w-full lg:w-[480px] shrink-0 rounded-2xl overflow-hidden" style={{ height: 500 }} {...slideLeft(0)}>
                <Image
                  src="/assets/images/najami/najami-work-1.webp"
                  alt="Karim Najami — zertifizierter Kfz-Sachverständiger bei der Fahrzeugbegutachtung"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.6) 100%)" }} />
                <motion.div
                  className="absolute bottom-6 left-6 rounded-xl px-5 py-4"
                  style={{ backgroundColor: "rgba(15,23,42,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(147,197,253,0.2)" }}
                  {...scaleUp(0.3)}
                >
                  <p className="text-sm font-bold text-white">5,0 ★ Google</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Über 300 Gutachten</p>
                </motion.div>
              </motion.div>

              <div className="flex-1">
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#1d4ed8" }} {...fadeUp(0)}>Ihr Sachverständiger</motion.p>
                <motion.h2 className="font-bold tracking-tight mb-2 text-balance" style={{ color: "#0f172a", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Karim Najami</motion.h2>
                <motion.p className="text-sm font-semibold mb-6" style={{ color: "#1d4ed8" }} {...fadeUp(0.15)}>Zertifizierter Kfz-Sachverständiger</motion.p>
                <motion.p className="text-base leading-relaxed mb-8" style={{ color: "#475569" }} {...fadeUp(0.2)}>
                  Als unabhängiger Sachverständiger arbeite ich ausschließlich in Ihrem Interesse — nicht für Versicherungen. Direkt vor Ort in unserer Partnerwerkstatt in Reutlingen, schnell und zuverlässig. Jedes Gutachten entsteht mit dem Ziel, Ihren vollen Schadensersatzanspruch zu sichern.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <a
                    href="https://www.sv-najami.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#1d4ed8" }}
                  >
                    Website besuchen
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                  <a
                    href="tel:+4915563146679"
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
                    style={{ borderColor: "#bfdbfe", color: "#334155" }}
                  >
                    0155 631 46679
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── vs. Versicherungsgutachter ── */}
        <section style={{ backgroundColor: "#0f172a" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#60a5fa" }} {...fadeUp(0)}>Ihre Vorteile</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance text-white" style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>
              Unabhängig statt Versicherungsgutachter
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {advantages.map((a) => (
                <motion.div
                  key={a.title}
                  className="p-8 rounded-2xl flex flex-col gap-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  variants={staggerItem}
                  whileHover={{ backgroundColor: "rgba(29,78,216,0.15)", transition: { duration: 0.2 } }}
                >
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1d4ed8" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8l4 4 8-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">{a.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{a.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#1d4ed8" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#0f172a", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>
              Häufige Fragen zum Kfz-Gutachten
            </motion.h2>
            <div style={{ borderTop: "1px solid #e2e8f0" }}>
              {faqs.map((faq, i) => (
                <motion.details key={faq.q} className="group py-6" style={{ borderBottom: "1px solid #e2e8f0" }} {...fadeUp(0.1 + i * 0.07)}>
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#0f172a" }}>{faq.q}</span>
                    <span className="shrink-0 text-[#1d4ed8]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-45">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#475569" }}>{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Kontakt & Maps ── */}
        <section style={{ backgroundColor: "#f8faff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#1d4ed8" }} {...fadeUp(0)}>Kontakt & Standort</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12 text-balance" style={{ color: "#0f172a", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>
              Direkt vor Ort — Haldenhaustraße 3, Reutlingen
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div className="flex flex-col gap-6" {...slideLeft(0.1)}>
                {[
                  { icon: "📞", label: "Telefon / WhatsApp", value: "0155 631 46679", href: "tel:+4915563146679" },
                  { icon: "✉️", label: "E-Mail", value: "info@sv-najami.de", href: "mailto:info@sv-najami.de" },
                  { icon: "📍", label: "Adresse", value: "Haldenhaustraße 3, 72770 Reutlingen", href: "https://maps.google.com/?q=Haldenhaustrasse+3+72770+Reutlingen" },
                  { icon: "🕐", label: "Öffnungszeiten", value: "Mo–Fr 08:00–18:00 Uhr", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#94a3b8" }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-medium hover:text-[#1d4ed8] transition-colors" style={{ color: "#0f172a" }}>{item.value}</a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: "#0f172a" }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a href="tel:+4915563146679" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#1d4ed8" }}>
                    Jetzt anrufen
                  </a>
                  <a href="https://wa.me/4915563146679" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#16a34a" }}>
                    WhatsApp
                  </a>
                  <a href="https://www.sv-najami.de" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:border-[#1d4ed8] hover:text-[#1d4ed8]" style={{ borderColor: "#bfdbfe", color: "#334155" }}>
                    sv-najami.de
                  </a>
                </div>
              </motion.div>
              <motion.div className="rounded-2xl overflow-hidden" style={{ height: 380 }} {...slideRight(0.1)}>
                <iframe
                  title="Kfz-Sachverständigenbüro Najami — Haldenhaustraße 3, 72770 Reutlingen"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.3!2d9.2012!3d48.4926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799fc6e3b3b3b3b%3A0x0!2sHaldenhaustra%C3%9Fe+3%2C+72770+Reutlingen!5e0!3m2!1sde!2sde!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#1d4ed8" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>Jetzt handeln</p>
                <h2 className="font-bold tracking-tight text-white text-balance" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  Unfall gehabt? Wir helfen sofort.
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Kostenlos bei Fremdverschulden. Express-Termin in 24h. Direkt vor Ort.
                </p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <a href="tel:+4915563146679" className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1d4ed8] transition-all hover:bg-blue-50">
                  0155 631 46679
                </a>
                <a href="https://wa.me/4915563146679" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                  WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Back to Autoklinik ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
            <motion.div className="flex flex-wrap items-center gap-4" {...fadeUp(0)}>
              <p className="text-sm" style={{ color: "#64748b" }}>Zur Werkstatt unseres Partners:</p>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#0074a2] transition-colors" style={{ color: "#002e40" }}>
                Autoklinik Reutlingen
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/unfall" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#0074a2] transition-colors" style={{ color: "#002e40" }}>
                Unfallservice
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <AutoklinikFooter />
    </>
  );
}
