"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  fadeUp,
  slideLeft,
  slideRight,
  scaleUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animation";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";
import { SITE } from "@/lib/site-config";
import { FaqSchema } from "@/components/structured-data";
import { Breadcrumbs } from "@/components/breadcrumbs";

const WINTER_PRICE = "44,44 € netto";
const OFFER_START = "15.09.2026";
const OFFER_END = "31.12.2026";
const GOOGLE_REVIEW_URL = "https://autoklinik-reutlingen.de/whubrief2026";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.zip,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
};

const offerItems = [
  {
    title: "Räderwechsel",
    desc: "Sommer- gegen Winterreifen, fachgerecht montiert und gewuchtet.",
  },
  {
    title: "Frostschutz prüfen",
    desc: "Kühlflüssigkeit auf ausreichenden Frostschutz kontrolliert.",
  },
  {
    title: "Scheibenwaschwasser prüfen",
    desc: "Füllstand und Frostschutz für klare Sicht auch bei Minusgraden.",
  },
  {
    title: "Fahrzeugzustandscheck",
    desc: "Kurzer allgemeiner Check, um typische Winterprobleme früh zu erkennen.",
  },
];

const steps = [
  {
    step: "01",
    title: "Termin sichern",
    desc: "Online, per Anruf oder WhatsApp - buche deinen Wintercheck-Termin in wenigen Minuten.",
  },
  {
    step: "02",
    title: "Wintercheck vor Ort",
    desc: "Wir wechseln deine Räder, prüfen Frostschutz, Scheibenwaschwasser und den Fahrzeugzustand.",
  },
  {
    step: "03",
    title: "Sicher in den Winter",
    desc: "Du erhältst eine kurze Rückmeldung zu deinem Fahrzeug - und bist bestens vorbereitet.",
  },
];

const trustPoints = [
  "Persönliche Beratung",
  "Schnelle Terminabstimmung",
  "Zuverlässiger Service",
  "HU-/TÜV-Unterstützung",
  "Reifenservice und Wintercheck",
  "Allgemeine Wartung und Reparaturen",
];

const faqs = [
  {
    q: "Was ist im Winterangebot für 44,44 € netto enthalten?",
    a: "Der Räderwechsel von Sommer- auf Winterreifen inklusive Wuchten, die Prüfung des Frostschutzes in Kühlflüssigkeit und Scheibenwaschwasser sowie ein kurzer Fahrzeugzustandscheck, um typische Winterprobleme früh zu erkennen.",
  },
  {
    q: "Wie lange läuft die Winteraktion?",
    a: `Die Aktion gilt vom ${OFFER_START} bis ${OFFER_END}. Wir empfehlen, frühzeitig einen Termin zu sichern, da die Nachfrage zum Reifenwechsel erfahrungsgemäß ansteigt.`,
  },
  {
    q: "Muss ich meine Winterreifen selbst mitbringen?",
    a: "Ja, bitte bring deine eingelagerten Winterreifen mit. Falls du neue Reifen benötigst, beraten wir dich gerne zu passenden Modellen für dein Fahrzeug.",
  },
  {
    q: "Kann ich den Wintercheck mit anderen Arbeiten kombinieren?",
    a: "Auf jeden Fall. Sag uns bei der Terminbuchung Bescheid, wenn du gleichzeitig eine HU/TÜV-Vorbereitung, eine Inspektion oder andere Reparaturen wünschst - wir stimmen alles in einem Termin ab.",
  },
  {
    q: "Wie schnell bekomme ich einen Termin?",
    a: "In der Regel innerhalb wenigen Tage. Buche direkt online, ruf uns an oder schreib uns auf WhatsApp - wir melden uns zeitnah mit einem passenden Termin zurück.",
  },
];

const related = [
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "Klimaservice", href: "/klimaservice" },
  { name: "Ölwechsel", href: "/oelwechsel-reutlingen" },
  { name: "Bremsenservice", href: "/bremsen-reutlingen" },
];

function CheckIconSm() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        stroke="#0074a2"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v20M12 2l-2.5 2.5M12 2l2.5 2.5M12 22l-2.5-2.5M12 22l2.5-2.5M3.34 7l17.32 10M3.34 7l3.4-.5M3.34 7l1 3.3M20.66 17l-3.4.5M20.66 17l-1-3.3M20.66 7L3.34 17M20.66 7l-3.4.5M20.66 7l-1 3.3M3.34 17l3.4.5M3.34 17l1-3.3"
        stroke="#0074a2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="#0074a2"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.8 1.8L14.5 10"
        stroke="#0074a2"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

export function WinterangebotPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqSchema items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <AutoklinikNavbar />
      <main>
        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#0074a2" }} className="pt-28 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
              <div className="flex-1 w-full">
                <Breadcrumbs
                  variant="dark"
                  items={[{ name: "Startseite", url: "/" }, { name: "Winteraktion", url: "/winterangebot" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6 sm:mb-8"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                  >
                    <SnowflakeIcon />
                    Winteraktion {OFFER_START.slice(-4)}
                  </span>
                </motion.div>
                <motion.h1
                  className="font-bold tracking-tight leading-[1.08] text-balance mb-5 sm:mb-6"
                  style={{ color: "#ffffff", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
                  {...fadeUp(0.1)}
                >
                  Dein Auto bereit<br />für den Winter
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg leading-relaxed mb-2 max-w-xl"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  {...fadeUp(0.2)}
                >
                  Räderwechsel inklusive Wintercheck für nur{" "}
                  <span className="font-bold" style={{ color: "#ffffff" }}>
                    {WINTER_PRICE}
                  </span>
                  . Gültig vom {OFFER_START} bis {OFFER_END}.
                </motion.p>
                <motion.div {...fadeUp(0.25)}>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mt-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#0074a2" }}
                  >
                    Nur begrenzt verfügbar - jetzt Termin sichern
                  </span>
                </motion.div>
                <motion.div {...fadeUp(0.28)}>
                  <Link
                    href="/tuev-au"
                    className="group inline-flex items-center gap-3 rounded-2xl px-4 sm:px-5 py-3 mt-5 w-full sm:w-auto transition-all hover:brightness-110"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                    >
                      <ShieldIcon />
                    </span>
                    <span className="text-sm leading-snug" style={{ color: "#ffffff" }}>
                      <span className="font-semibold">HU fällig?</span> Wir behalten den Termin für dich im Blick.
                    </span>
                    <span className="ml-auto shrink-0 hidden sm:inline-flex" style={{ color: "rgba(255,255,255,0.85)" }}>
                      <ArrowIcon />
                    </span>
                  </Link>
                </motion.div>
                <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8 w-full" {...fadeUp(0.3)}>
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 sm:py-3.5 text-base sm:text-sm font-semibold transition-all hover:brightness-110 w-full sm:w-auto"
                    style={{ backgroundColor: "#002e40", color: "#ffffff" }}
                  >
                    Termin buchen
                    <ArrowIcon />
                  </Link>
                  <a
                    href={SITE.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 sm:py-3.5 text-base sm:text-sm font-semibold transition-all hover:brightness-110 w-full sm:w-auto"
                    style={{ backgroundColor: "#25d366", color: "#ffffff" }}
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                  <a
                    href={SITE.phone.href}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border px-7 py-4 sm:py-3.5 text-base sm:text-sm font-semibold transition-all hover:bg-white/10 w-full sm:w-auto"
                    style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}
                  >
                    {SITE.phone.display}
                  </a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-2.5 mt-7" {...fadeUp(0.4)}>
                  {["Räderwechsel & Wuchten", "Frostschutz-Check", "Fahrzeugzustandscheck", "Feste Aktionspreise"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full px-3.5 py-1.5 text-xs font-medium"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                      >
                        {t}
                      </span>
                    ),
                  )}
                </motion.div>
              </div>
              <motion.div
                className="relative w-full lg:w-[400px] shrink-0 mt-2"
                style={{ height: 300 }}
                {...slideRight(0.2)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/images/hero-reifenservice.png"
                    alt="Räderwechsel und Wintercheck in der Autoklinik Reutlingen"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-5 right-4 sm:-right-4 rounded-2xl px-5 sm:px-6 py-4 sm:py-5 shadow-xl text-center"
                  style={{ backgroundColor: "#ffffff" }}
                  {...scaleUp(0.4)}
                >
                  <p className="text-xl sm:text-2xl font-bold leading-none" style={{ color: "#0074a2" }}>
                    {WINTER_PRICE}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{ color: "#4a6272" }}>
                    Räderwechsel & Wintercheck
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Price transparency ── */}
        <section style={{ backgroundColor: "#e8f4fa" }} aria-label="Wichtiger Preishinweis">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: "#002e40" }}>
                  Wichtig: Alle Preise exkl. MwSt.
                </p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                  Das Winterangebot kostet <strong style={{ color: "#002e40" }}>44,44 € netto</strong> zzgl. 19 % MwSt.
                  Das entspricht <strong style={{ color: "#002e40" }}>52,88 € brutto</strong>.
                </p>
              </div>
              <span
                className="inline-flex w-fit shrink-0 rounded-full px-4 py-2 text-xs font-bold"
                style={{ backgroundColor: "#ffffff", color: "#0074a2" }}
              >
                44,44 € netto + 19 % MwSt.
              </span>
            </div>
          </div>
        </section>

        {/* ── HU/TÜV callout ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Immer im Blick
                </p>
                <h2
                  className="font-bold tracking-tight text-balance"
                  style={{ color: "#ffffff", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  HU fällig? Wir behalten den Termin für dich im Blick.
                </h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Auf Wunsch unterstützen wir dich bei der Vorbereitung und der kompletten Terminabwicklung zur
                  nächsten Hauptuntersuchung.
                </p>
              </motion.div>
              <motion.div className="w-full sm:w-auto" {...scaleUp(0.15)}>
                <Link
                  href="/tuev-au"
                  className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-110"
                  style={{ backgroundColor: "#0074a2", color: "#ffffff" }}
                >
                  Mehr zur HU & AU
                  <ArrowIcon />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Offer items ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#0074a2" }}
              {...fadeUp(0)}
            >
              Unser Winterangebot
            </motion.p>
            <motion.h2
              className="font-bold tracking-tight mb-4 text-balance"
              style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}
              {...fadeUp(0.1)}
            >
              Das ist für {WINTER_PRICE} enthalten
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed max-w-2xl mb-14"
              style={{ color: "#4a6272" }}
              {...fadeUp(0.15)}
            >
              Der Check hilft dir, typische Winterprobleme frühzeitig zu erkennen - bevor sie zu teuren
              Überraschungen werden.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ backgroundColor: "#d5e8f0" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {offerItems.map((c) => (
                <motion.div
                  key={c.title}
                  className="p-8"
                  style={{ backgroundColor: "#ffffff" }}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-5"
                    style={{ backgroundColor: "#e8f4fa" }}
                  >
                    <CheckIconSm />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="mt-12" {...fadeUp(0.1)}>
              <Link
                href="/terminbuchung"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#0074a2" }}
              >
                Winter-Termin buchen
                <ArrowIcon />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 3-step Process ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#0074a2" }}
              {...fadeUp(0)}
            >
              So läuft es ab
            </motion.p>
            <motion.h2
              className="font-bold tracking-tight mb-14 text-balance"
              style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}
              {...fadeUp(0.1)}
            >
              In 3 Schritten sicher durch den Winter
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-px"
              style={{ backgroundColor: "#d5e8f0" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {steps.map((s) => (
                <motion.div
                  key={s.step}
                  className="p-8 flex flex-col gap-4"
                  style={{ backgroundColor: "#f5f9fc" }}
                  variants={staggerItem}
                >
                  <motion.span
                    className="text-4xl font-bold tabular-nums"
                    style={{ color: "#d5e8f0" }}
                    whileInView={{ color: "#0074a2", opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {s.step}
                  </motion.span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#0074a2" }}
              {...fadeUp(0)}
            >
              {SITE.legalName}
            </motion.p>
            <motion.h2
              className="font-bold tracking-tight mb-14 text-balance"
              style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}
              {...fadeUp(0.1)}
            >
              Deine Werkstatt in Reutlingen
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ backgroundColor: "#d5e8f0" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {trustPoints.map((point) => (
                <motion.div
                  key={point}
                  className="flex items-center gap-3 p-6"
                  style={{ backgroundColor: "#ffffff" }}
                  variants={staggerItem}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#e8f4fa" }}
                  >
                    <CheckIconSm />
                  </div>
                  <span className="font-medium text-sm" style={{ color: "#002e40" }}>
                    {point}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#0074a2" }}
              {...fadeUp(0)}
            >
              FAQ
            </motion.p>
            <motion.h2
              className="font-bold tracking-tight mb-12"
              style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}
              {...fadeUp(0.1)}
            >
              Häufige Fragen zur Winteraktion
            </motion.h2>
            <div style={{ borderTop: "1px solid #d5e8f0" }}>
              {faqs.map((faq, i) => (
                <motion.details
                  key={faq.q}
                  className="group py-6"
                  style={{ borderBottom: "1px solid #d5e8f0" }}
                  {...fadeUp(0.1 + i * 0.07)}
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#002e40" }}>
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-[#0074a2]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform group-open:rotate-45"
                      >
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                    {faq.a}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Google review ── */}
        <section style={{ backgroundColor: "#0074a2" }}>
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 text-center">
            <motion.h2
              className="font-bold tracking-tight text-balance mb-4"
              style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
              {...fadeUp(0)}
            >
              Warst du mit uns zufrieden?
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.85)" }}
              {...fadeUp(0.1)}
            >
              Dann hinterlasse uns bitte eine ehrliche Google-Bewertung. Damit unterstützt du unser Team und
              hilfst anderen bei der Werkstattsuche.
            </motion.p>
            <motion.div {...scaleUp(0.2)}>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-95"
                style={{ backgroundColor: "#ffffff", color: "#0074a2" }}
              >
                Jetzt Google-Bewertung schreiben
                <ArrowIcon />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── CTA: Terminbuchung ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.div
              className="rounded-3xl p-10 sm:p-14 text-center"
              style={{ backgroundColor: "#f5f9fc", border: "1px solid #dbe8ef" }}
              {...fadeUp(0)}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>
                Jetzt Termin sichern
              </p>
              <h2
                className="font-bold tracking-tight text-balance mb-4"
                style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}
              >
                Bereit für den Winter?
              </h2>
              <p className="text-base leading-relaxed mb-9 max-w-xl mx-auto" style={{ color: "#4a6272" }}>
                Wähle den Weg, der für dich am einfachsten ist - wir melden uns mit einem passenden Termin.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 w-full sm:w-auto"
                  style={{ backgroundColor: "#0074a2" }}
                >
                  Online Termin buchen
                  <ArrowIcon />
                </Link>
                <a
                  href={SITE.phone.href}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-110 w-full sm:w-auto"
                  style={{ backgroundColor: "#002e40", color: "#ffffff" }}
                >
                  {SITE.phone.display} anrufen
                </a>
                <a
                  href={SITE.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 w-full sm:w-auto"
                  style={{ backgroundColor: "#25d366" }}
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Other services ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <motion.p className="text-sm font-semibold mb-8" style={{ color: "#4a6272" }} {...fadeUp(0)}>
              Weitere Leistungen der Autoklinik
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {related.map((s) => (
                <motion.div key={s.name} variants={staggerItem}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
                    style={{ borderColor: "#c5dde8", color: "#002e40" }}
                  >
                    {s.name}
                    <ArrowIcon />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <ContactSection />
      </main>
      <AutoklinikFooter />
    </>
  );
}
