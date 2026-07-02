"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, slideLeft, slideRight, scaleUp, staggerContainer, staggerItem } from "@/lib/animation";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Autoklinik Reutlingen",
  url: "https://autoklinik-reutlingen.de",
  telephone: "+4907121155261990",
  address: { "@type": "PostalAddress", streetAddress: "Haldenhaustraße 3", addressLocality: "Reutlingen", postalCode: "72770", addressRegion: "BW", addressCountry: "DE" },
};

const checks = [
  { title: "Licht & Elektrik", desc: "Alle Scheinwerfer, Blinker, Bremsleuchten und elektrischen Sicherheitskomponenten werden geprüft und eingestellt." },
  { title: "Bremsen", desc: "Bremsbeläge, Bremsscheiben und Bremsflüssigkeit - wir prüfen, ob alles TÜV-konform ist und tauschen bei Bedarf aus." },
  { title: "Fahrwerk & Lenkung", desc: "Spurstangen, Achsgelenke, Stoßdämpfer und Bereifung werden auf Verschleiß und Sicherheit kontrolliert." },
  { title: "Abgasuntersuchung (AU)", desc: "Emissionswerte messen, OBD-Diagnose durchführen und sicherstellen, dass Ihr Fahrzeug die gesetzlichen Grenzwerte einhält." },
  { title: "Karosserie & Rahmen", desc: "Sichtprüfung auf Rost, Risse oder strukturelle Schäden, die die Fahrzeugsicherheit beeinträchtigen könnten." },
  { title: "Mängelbeseitigung", desc: "Werden bei der HU Mängel festgestellt, beheben wir diese direkt - für eine reibungslose Nachprüfung." },
];

const steps = [
  { step: "01", title: "Vorbereitungscheck", desc: "Wir prüfen Ihr Fahrzeug auf alle relevanten TÜV-Kriterien und identifizieren vorhandene Mängel." },
  { step: "02", title: "Mängelbeseitigung", desc: "Alle festgestellten Mängel werden direkt bei uns behoben - Bremsen, Licht, Fahrwerk und mehr." },
  { step: "03", title: "Zum TÜV-Termin", desc: "Ihr Fahrzeug ist optimal vorbereitet. Wir koordinieren den Termin mit unserem TÜV-Partner." },
];

const faqs = [
  { q: "Wann ist mein Fahrzeug zur HU fällig?", a: "Neue Fahrzeuge müssen nach 3 Jahren zur ersten HU, danach alle 2 Jahre. Das genaue Fälligkeitsdatum steht auf der TÜV-Plakette hinten am Fahrzeug." },
  { q: "Was kostet der TÜV-Vorbereitungscheck?", a: "Den Vorbereitungscheck führen wir kostengünstig durch und rechnen die Kosten bei direkt folgender Reparatur auf Wunsch an. Sprechen Sie uns an - wir nennen Ihnen vorab den genauen Preis." },
  { q: "Was passiert, wenn mein Auto beim TÜV durchfällt?", a: "Mit erheblichen Mängeln haben Sie 4 Wochen Zeit, diese zu beseitigen und das Fahrzeug erneut vorzustellen. Bei gefährlichen Mängeln muss das Fahrzeug sofort stillgelegt werden. Wir kümmern uns um schnelle Beseitigung." },
  { q: "Führt die Autoklinik die HU selbst durch?", a: "Wir bereiten Ihr Fahrzeug optimal vor und arbeiten mit anerkannten Prüforganisationen vor Ort zusammen. So kommen Sie mit einem Top-Fahrzeug zum TÜV-Termin." },
  { q: "Kann ich direkt nach dem TÜV-Vorbereitungscheck zur Hauptuntersuchung?", a: "Ja. Wir koordinieren Termine so, dass Sie möglichst wenig Aufwand haben. Rufen Sie uns an oder buchen Sie online." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "Glasservice", href: "/glasservice" },
  { name: "Klimaservice", href: "/klimaservice" },
  { name: "Unfallservice", href: "/unfall" },
  { name: "Flottenbetreuung", href: "/flottenbetreuung" },
];

export default function TuevAuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AutoklinikNavbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#0074a2" }} className="pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  TÜV &amp; Hauptuntersuchung<br />in Reutlingen
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Wir bereiten Ihr Fahrzeug gründlich vor - Vorbereitungscheck, Mängelbeseitigung und Koordination mit dem TÜV. Ohne Stress, ohne Überraschungen.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-110" style={{ backgroundColor: "#002e40", color: "#ffffff" }}>
                    Termin buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href="tel:+4907121155261990" className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}>
                    07121 15526199
                  </a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["TÜV-Vorbereitungscheck", "Alle Marken", "Schnelle Mängelbeseitigung", "Mit TÜV-Partner"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[400px] shrink-0" style={{ height: 380 }} {...slideRight(0.2)}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image src="/assets/images/hero-tuev.png" alt="Fahrzeug bei der Hauptuntersuchung in der Autoklinik Reutlingen" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 400px" />
                </div>
                <motion.div className="absolute -bottom-4 -right-4 rounded-2xl p-5 shadow-xl" style={{ backgroundColor: "#ffffff" }} {...scaleUp(0.4)}>
                  <Image src="/assets/images/6937e7159229bbc42b6c8632_icon-tuev.png" alt="TÜV Süd Partner" width={80} height={80} className="object-contain" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── What we check ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Unser Vorbereitungscheck</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Was wir für Sie prüfen</motion.h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {checks.map((c) => (
                <motion.div key={c.title} className="p-8" style={{ backgroundColor: "#ffffff" }} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 3-step Process ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>So läuft es ab</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>In 3 Schritten sicher durch den TÜV</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {steps.map((s) => (
                <motion.div key={s.step} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#f5f9fc" }} variants={staggerItem}>
                  <motion.span
                    className="text-4xl font-bold tabular-nums"
                    style={{ color: "#d5e8f0" }}
                    whileInView={{ color: "#0074a2", opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >{s.step}</motion.span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zur HU &amp; AU</motion.h2>
            <div style={{ borderTop: "1px solid #d5e8f0" }}>
              {faqs.map((faq, i) => (
                <motion.details key={faq.q} className="group py-6" style={{ borderBottom: "1px solid #d5e8f0" }} {...fadeUp(0.1 + i * 0.07)}>
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#002e40" }}>{faq.q}</span>
                    <span className="shrink-0 text-[#0074a2]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-45"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#0074a2" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>TÜV-Termin</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Jetzt TÜV-Vorbereitungstermin buchen.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>Wir prüfen, beheben Mängel und koordinieren den TÜV-Termin - alles aus einer Hand.</p>
              </motion.div>
              <motion.div {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-110" style={{ backgroundColor: "#002e40", color: "#ffffff" }}>
                  Termin buchen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Other services ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <motion.p className="text-sm font-semibold mb-8" style={{ color: "#4a6272" }} {...fadeUp(0)}>Weitere Leistungen der Autoklinik</motion.p>
            <motion.div className="flex flex-wrap gap-3" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {related.map((s) => (
                <motion.div key={s.name} variants={staggerItem}>
                  <Link href={s.href} className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:border-[#0074a2] hover:text-[#0074a2]" style={{ borderColor: "#c5dde8", color: "#002e40" }}>
                    {s.name}
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
