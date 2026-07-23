"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { fadeUp, slideLeft, slideRight, scaleUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

// ─── Constants ───────────────────────────────────────────────────────────────

const TEL_HREF = "tel:+4907121155261990";
const TEL_DISPLAY = "07121 15526199";
const WA_HREF =
  "https://wa.me/4917661973298?text=Hallo%2C%20ich%20habe%20einen%20Hagelschaden%20an%20meinem%20Fahrzeug%20und%20m%C3%B6chte%20gerne%20einen%20Termin%20bzw.%20eine%20erste%20Einsch%C3%A4tzung%20anfragen.";
const WA_PHOTOS_HREF =
  "https://wa.me/4917661973298?text=Hallo%2C%20ich%20m%C3%B6chte%20Fotos%20meines%20Hagelschadens%20zusenden.%20Hier%20sind%20die%20Aufnahmen%3A";
const ADDRESS = "Haldenhaustraße 3, 72770 Reutlingen";
const MAPS_HREF = "https://maps.google.com/?q=Haldenhaustra%C3%9Fe+3%2C+72770+Reutlingen";

// ─── Structured Data ─────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Hagelschadenzentrum Reutlingen – Autoklinik Reutlingen",
    url: "https://autoklinik-reutlingen.de/hagelschaden",
    telephone: "+4907121155261990",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Haldenhaustraße 3",
      addressLocality: "Reutlingen",
      postalCode: "72770",
      addressCountry: "DE",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hagelschadenservice",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hagelschaden-Gutachten Reutlingen" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hagelschadenreparatur lackschadenfrei" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Windschutzscheibentausch Reutlingen" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Schadenabwicklung Hagelschaden" } },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://autoklinik-reutlingen.de" },
      { "@type": "ListItem", position: 2, name: "Hagelschadenzentrum", item: "https://autoklinik-reutlingen.de/hagelschaden" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Was soll ich nach einem Hagelschaden tun?", acceptedAnswer: { "@type": "Answer", text: "Dokumentieren Sie den Schaden möglichst mit Fotos und nehmen Sie frühzeitig Kontakt zu Ihrer Versicherung sowie zu einem Fachbetrieb auf. Wir unterstützen Sie bei der Begutachtung und den weiteren Schritten." } },
      { "@type": "Question", name: "Kann ein Hagelschaden ohne Lackieren repariert werden?", acceptedAnswer: { "@type": "Answer", text: "Viele Dellen können mit lackschadenfreier Ausbeultechnik entfernt werden. Ob diese Methode möglich ist, hängt von Größe, Position und Art des Schadens ab." } },
      { "@type": "Question", name: "Erstellt ihr auch ein Gutachten?", acceptedAnswer: { "@type": "Answer", text: "Ja, eine professionelle Begutachtung und Dokumentation des Hagelschadens kann organisiert bzw. durchgeführt werden. Den genauen Ablauf klären wir individuell mit Ihnen." } },
      { "@type": "Question", name: "Kann ich Fotos über WhatsApp senden?", acceptedAnswer: { "@type": "Answer", text: "Ja. Senden Sie uns Bilder von Motorhaube, Dach, Kofferraumdeckel, Scheiben und eine Gesamtansicht des Fahrzeugs. Anschließend melden wir uns bei Ihnen." } },
      { "@type": "Question", name: "Aus welchen Orten kann ich zu euch kommen?", acceptedAnswer: { "@type": "Answer", text: "Wir betreuen Kunden aus Reutlingen sowie aus Metzingen, Pliezhausen, Riederich, Dettingen, Pfullingen, Eningen, Wannweil, Kirchentellinsfurt, Tübingen und der gesamten Region." } },
    ],
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Hagelschaden-Gutachten",
    desc: "Wir dokumentieren den Schaden professionell und schaffen eine nachvollziehbare Grundlage für die weitere Abwicklung.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 11h.01M12 15h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="11" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "Hagelschadenreparatur",
    desc: "Je nach Schaden erfolgt die Reparatur lackschadenfrei durch Ausbeultechnik oder über eine klassische Karosserie- und Lackinstandsetzung.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Windschutzscheibentausch",
    desc: "Wurde Ihre Frontscheibe durch Hagel beschädigt, kümmern wir uns um den fachgerechten Austausch und die weitere Abstimmung.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M2 10h20M6 6l-2 4M18 6l2 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Schadenabwicklung",
    desc: "Wir erklären Ihnen den Ablauf, koordinieren die nächsten Schritte und unterstützen Sie bei der Kommunikation rund um den Schaden.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const steps = [
  {
    num: "01",
    title: "Kontakt aufnehmen",
    desc: "Rufen Sie uns an oder senden Sie uns Fotos des Schadens per WhatsApp.",
    hint: "Fotos von Dach, Motorhaube, Kofferraumdeckel und Scheiben helfen bei einer ersten Einschätzung.",
  },
  {
    num: "02",
    title: "Schaden prüfen lassen",
    desc: "Wir vereinbaren kurzfristig einen Termin und begutachten Ihr Fahrzeug.",
  },
  {
    num: "03",
    title: "Reparatur abstimmen",
    desc: "Sie erhalten eine klare Einschätzung und wir koordinieren die passende Reparaturlösung.",
  },
];

const regions = [
  "Reutlingen", "Metzingen", "Pliezhausen", "Riederich",
  "Dettingen a.d. Erms", "Eningen u. Achalm", "Pfullingen",
  "Wannweil", "Kirchentellinsfurt", "Tübingen", "Bad Urach",
];

const faqs = [
  {
    q: "Was soll ich nach einem Hagelschaden tun?",
    a: "Dokumentieren Sie den Schaden möglichst mit Fotos und nehmen Sie frühzeitig Kontakt zu Ihrer Versicherung sowie zu einem Fachbetrieb auf. Wir unterstützen Sie bei der Begutachtung und den weiteren Schritten.",
  },
  {
    q: "Kann ein Hagelschaden ohne Lackieren repariert werden?",
    a: "Viele Dellen können mit lackschadenfreier Ausbeultechnik entfernt werden. Ob diese Methode möglich ist, hängt von Größe, Position und Art des Schadens ab.",
  },
  {
    q: "Erstellt ihr auch ein Gutachten?",
    a: "Ja, eine professionelle Begutachtung und Dokumentation des Hagelschadens kann organisiert bzw. durchgeführt werden. Den genauen Ablauf klären wir individuell mit Ihnen.",
  },
  {
    q: "Kann ich Fotos über WhatsApp senden?",
    a: "Ja. Senden Sie uns Bilder von Motorhaube, Dach, Kofferraumdeckel, Scheiben und eine Gesamtansicht des Fahrzeugs. Anschließend melden wir uns bei Ihnen.",
  },
  {
    q: "Aus welchen Orten kann ich zu euch kommen?",
    a: "Wir betreuen Kunden aus Reutlingen sowie aus Metzingen, Pliezhausen, Riederich, Dettingen, Pfullingen, Eningen, Wannweil, Kirchentellinsfurt, Tübingen, Bad Urach und der gesamten Region.",
  },
];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b"
      style={{ borderColor: "#d5e8f0" }}
      {...fadeUp(0.05 * index)}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-base font-semibold" style={{ color: "#002e40" }}>{q}</span>
        <span className="shrink-0" style={{ color: "#0074a2" }}>
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            aria-hidden="true"
            style={{ transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-6 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{a}</p>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HagelschadenzentrumPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <AutoklinikNavbar />

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ backgroundColor: "#001824" }}>
          {/* Background image */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/assets/images/hero-hagelschaden.png"
              alt="Hagelschäden auf Fahrzeugkarosserie – Hagelschadenzentrum Reutlingen"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,18,32,0.88) 0%, rgba(0,18,32,0.72) 50%, rgba(0,30,50,0.85) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,18,32,0.6) 0%, transparent 40%)" }} />
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 lg:py-40">
            <div className="max-w-2xl">

              {/* HZ Logo */}
              <motion.div className="mb-8" {...fadeUp(0)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/hz-logo-white.png"
                  alt="Hagelschadenzentrum Reutlingen"
                  width={320}
                  height={72}
                  className="h-14 w-auto object-contain"
                  style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
                />
              </motion.div>

              {/* Eyebrow */}
              <motion.p
                className="text-xs font-bold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#4db8d8" }}
                {...fadeUp(0.08)}
              >
                Hagelschadenzentrum Reutlingen
              </motion.p>

              {/* H1 */}
              <motion.h1
                className="font-bold leading-[1.06] tracking-tight text-white text-balance mb-6"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}
                {...fadeUp(0.13)}
              >
                Hagelschaden<br />
                am Fahrzeug?
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-lg leading-relaxed mb-4 max-w-xl"
                style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
                {...fadeUp(0.18)}
              >
                Wir kümmern uns um Gutachten, Reparatur und Windschutzscheibentausch – schnell, professionell und unkompliziert.
              </motion.p>

              <motion.p
                className="text-sm mb-10"
                style={{ color: "rgba(255,255,255,0.42)" }}
                {...fadeUp(0.22)}
              >
                Für Reutlingen, Metzingen, Pliezhausen, Riederich, Dettingen und die gesamte Region.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row gap-3 mb-10" {...fadeUp(0.27)}>
                <a
                  href={TEL_HREF}
                  onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_phone_click", location: "hero" }); }}
                  className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: "#0074a2" }}
                  aria-label={`Autoklinik Reutlingen anrufen: ${TEL_DISPLAY}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Jetzt anrufen
                </a>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_whatsapp_click", location: "hero" }); }}
                  className="inline-flex items-center justify-center gap-3 rounded-full border-2 px-8 py-4 text-base font-bold transition-all hover:bg-white/10 active:scale-95"
                  style={{ borderColor: "rgba(37,211,102,0.6)", color: "#25d366" }}
                  aria-label="Hagelschaden per WhatsApp melden"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z"/>
                  </svg>
                  Per WhatsApp anfragen
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div className="flex flex-wrap gap-x-6 gap-y-3" {...fadeUp(0.32)}>
                {["Schnelle Terminabstimmung", "Gutachten & Reparatur", "Persönliche Betreuung"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8l3.5 3.5L13 4" stroke="#4db8d8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>{t}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM SEKTION ───────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
              <div className="flex-1">
                <motion.p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>
                  Hagelschaden
                </motion.p>
                <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }} {...fadeUp(0.08)}>
                  Jetzt schnell handeln.
                </motion.h2>
                <motion.p className="text-base leading-relaxed mb-5" style={{ color: "#4a6272" }} {...fadeUp(0.13)}>
                  Hagel kann Karosserie, Lack, Scheiben und Anbauteile beschädigen. Wir prüfen den Schaden, erklären Ihnen verständlich die nächsten Schritte und koordinieren die passende Reparatur.
                </motion.p>
                <motion.p className="text-base leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.17)}>
                  Wir unterstützen Sie bei der weiteren Abwicklung und besprechen den Ablauf individuell mit Ihnen – ohne versteckte Versprechen, dafür mit echter Expertise.
                </motion.p>
              </div>
              <motion.div
                className="w-full lg:w-[460px] shrink-0 relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "4/3" }}
                {...slideRight(0.1)}
              >
                <Image
                  src="/assets/images/hero-hagelschaden.png"
                  alt="Hageldellen auf Fahrzeugmotorhaube – professionelle Begutachtung im Hagelschadenzentrum Reutlingen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 460px"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,18,32,0.45) 100%)" }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── LEISTUNGEN ────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>
              Leistungen
            </motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }} {...fadeUp(0.08)}>
              Alles rund um Ihren Hagelschaden
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ backgroundColor: "#d5e8f0" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {services.map((s) => (
                <motion.div
                  key={s.title}
                  className="flex flex-col gap-5 p-8"
                  style={{ backgroundColor: "#ffffff" }}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0"
                    style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── ABLAUF ────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#4db8d8" }} {...fadeUp(0)}>
              Ablauf
            </motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-white text-balance" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }} {...fadeUp(0.08)}>
              So einfach geht es
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-px"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {steps.map((s) => (
                <motion.div
                  key={s.num}
                  className="p-10"
                  style={{ backgroundColor: "#002e40" }}
                  variants={staggerItem}
                >
                  <p className="text-5xl font-bold mb-6 leading-none" style={{ color: "rgba(0,116,162,0.35)" }}>{s.num}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                  {s.hint && (
                    <p className="text-xs leading-relaxed px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(77,184,216,0.08)", color: "rgba(77,184,216,0.75)", border: "1px solid rgba(77,184,216,0.15)" }}>
                      {s.hint}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHATSAPP CTA ──────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <motion.div className="flex-1" {...slideLeft(0)}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0" style={{ backgroundColor: "#e8f9ee" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
                      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z"/>
                    </svg>
                  </div>
                  <h2 className="font-bold tracking-tight text-balance" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                    Hagelschaden direkt per WhatsApp melden
                  </h2>
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#4a6272" }}>
                  Senden Sie uns einfach einige Fotos Ihres Fahrzeugs. Wir melden uns schnellstmöglich bei Ihnen und besprechen das weitere Vorgehen.
                </p>
                <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#f5f9fc", border: "1px solid #d5e8f0" }}>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#0074a2" }}>
                    Bitte senden Sie Fotos von:
                  </p>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {["Motorhaube", "Fahrzeugdach", "Kofferraumdeckel", "Windschutzscheibe", "Gesamtansicht"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#4a6272" }}>
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "#0074a2" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={WA_PHOTOS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_whatsapp_click", location: "whatsapp_section" }); }}
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: "#25d366" }}
                  aria-label="Fotos des Hagelschadens per WhatsApp senden"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z"/>
                  </svg>
                  Fotos per WhatsApp senden
                </a>
              </motion.div>

              {/* Phone card */}
              <motion.div
                className="w-full lg:w-80 shrink-0 rounded-2xl p-8 flex flex-col gap-6"
                style={{ backgroundColor: "#002e40" }}
                {...scaleUp(0.15)}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Lieber telefonieren?
                </p>
                <div>
                  <p className="text-2xl font-bold text-white mb-1">{TEL_DISPLAY}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Mo – Fr 08:00 – 18:00 Uhr</p>
                </div>
                <a
                  href={TEL_HREF}
                  onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_phone_click", location: "whatsapp_section" }); }}
                  className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#0074a2" }}
                  aria-label={`Autoklinik Reutlingen anrufen: ${TEL_DISPLAY}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Jetzt anrufen
                </a>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
                <address className="not-italic text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Haldenhaustraße 3<br />72770 Reutlingen
                </address>
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"
                  style={{ color: "#4db8d8" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                  Route planen
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── REGION ────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <motion.h2 className="font-bold tracking-tight mb-5 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }} {...fadeUp(0)}>
              Ihr Hagelschadenzentrum für Reutlingen und die Region
            </motion.h2>
            <motion.p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#4a6272" }} {...fadeUp(0.08)}>
              Unser Hagelschadenzentrum in Reutlingen ist auch für Kunden aus Metzingen, Pliezhausen, Riederich, Dettingen an der Erms, Eningen unter Achalm, Pfullingen, Wannweil, Kirchentellinsfurt, Tübingen, Bad Urach und der gesamten Region schnell erreichbar.
            </motion.p>
            <motion.div className="flex flex-wrap gap-2.5" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {regions.map((r) => (
                <motion.span
                  key={r}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #c5dde8", color: "#002e40" }}
                  variants={staggerItem}
                >
                  {r}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>
              FAQ
            </motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }} {...fadeUp(0.08)}>
              Häufige Fragen zum Hagelschaden
            </motion.h2>
            <div style={{ borderTop: "1px solid #d5e8f0" }}>
              {faqs.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ABSCHLUSS CTA ─────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#001824" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center justify-between">
              <div className="flex-1">
                <motion.p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#4db8d8" }} {...fadeUp(0)}>
                  Hagelschadenzentrum Reutlingen
                </motion.p>
                <motion.h2 className="font-bold tracking-tight mb-4 text-white text-balance" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }} {...fadeUp(0.08)}>
                  Jetzt Hagelschaden prüfen lassen
                </motion.h2>
                <motion.p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: "rgba(255,255,255,0.55)" }} {...fadeUp(0.13)}>
                  Rufen Sie uns direkt an oder senden Sie uns Fotos per WhatsApp. Wir besprechen mit Ihnen schnell und unkompliziert die nächsten Schritte.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.18)}>
                  <a
                    href={TEL_HREF}
                    onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_phone_click", location: "footer_cta" }); }}
                    className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: "#0074a2" }}
                    aria-label={`Autoklinik Reutlingen anrufen: ${TEL_DISPLAY}`}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Jetzt anrufen
                  </a>
                  <a
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_whatsapp_click", location: "footer_cta" }); }}
                    className="inline-flex items-center justify-center gap-3 rounded-full border-2 px-8 py-4 text-base font-bold transition-all hover:bg-white/10 active:scale-95"
                    style={{ borderColor: "rgba(37,211,102,0.5)", color: "#25d366" }}
                    aria-label="Hagelschaden per WhatsApp anfragen"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z"/>
                    </svg>
                    WhatsApp öffnen
                  </a>
                </motion.div>
              </div>

              {/* Info card */}
              <motion.div
                className="w-full lg:w-72 shrink-0 rounded-2xl p-7 flex flex-col gap-4"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                {...scaleUp(0.1)}
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.3)" }}>Autoklinik Reutlingen</p>
                <address className="not-italic text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Haldenhaustraße 3<br />72770 Reutlingen
                </address>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
                <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span>Mo – Fr: 08:00 – 18:00 Uhr</span>
                  <span>Sa: Nur auf Anfrage</span>
                  <span>So: Geschlossen</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
                <a href={TEL_HREF} className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "#4db8d8" }}>{TEL_DISPLAY}</a>
                <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                  In Google Maps öffnen
                </a>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <AutoklinikFooter />

      {/* ── MOBILE STICKY BAR ─────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden"
        style={{ boxShadow: "0 -2px 20px rgba(0,0,0,0.25)" }}
        aria-label="Schnellkontakt"
      >
        <a
          href={TEL_HREF}
          onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_sticky_phone_click" }); }}
          className="flex flex-1 items-center justify-center gap-2.5 py-4 text-sm font-bold text-white transition-all active:brightness-90"
          style={{ backgroundColor: "#0074a2" }}
          aria-label={`Autoklinik anrufen: ${TEL_DISPLAY}`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Anrufen
        </a>
        <div style={{ width: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (typeof window !== "undefined" && (window as any).dataLayer) (window as any).dataLayer.push({ event: "hagel_sticky_whatsapp_click" }); }}
          className="flex flex-1 items-center justify-center gap-2.5 py-4 text-sm font-bold text-white transition-all active:brightness-90"
          style={{ backgroundColor: "#25d366" }}
          aria-label="Hagelschaden per WhatsApp anfragen"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  );
}
