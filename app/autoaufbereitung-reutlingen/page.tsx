"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, slideLeft, slideRight, scaleUp, staggerContainer, staggerItem } from "@/lib/animation";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";
import { SITE } from "@/lib/site-config";
import { FaqSchema, ServiceSchema } from "@/components/structured-data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { autoaufbereitungExtras, autoaufbereitungFaqs, autoaufbereitungPackages, autoaufbereitungPricingNote } from "@/lib/autoaufbereitung-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  telephone: SITE.phone.e164,
  address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, postalCode: SITE.address.zip, addressCountry: SITE.address.country },
};

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "Glasservice", href: "/glasservice" },
  { name: "Unfallservice", href: "/unfall" },
  { name: "Hagelschadenzentrum", href: "/hagelschaden" },
];

export default function AutoaufbereitungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Autoaufbereitung Reutlingen"
        description="Professionelle Fahrzeugaufbereitung innen und außen in Reutlingen – transparente Pakete für Innenraumreinigung, Autopflege und Außenreinigung."
        url="/autoaufbereitung-reutlingen"
      />
      <FaqSchema items={autoaufbereitungFaqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <AutoklinikNavbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <Breadcrumbs
                  variant="dark"
                  items={[{ name: "Startseite", url: "/" }, { name: "Autoaufbereitung", url: "/autoaufbereitung-reutlingen" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Autoaufbereitung<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Wir reinigen und pflegen Ihr Fahrzeug materialgerecht – vom gepflegten Innenraum bis zum sauberen Außenfinish. Transparente Paketpreise, faire Zuschläge und zusätzliche Kosten immer nach Absprache.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Aufbereitung anfragen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Innen & Außen", "Materialgerechte Pflege", "Transparente Paketpreise", "Kombipaket mit Preisvorteil"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/hero-autoaufbereitung.png" alt="Fahrzeugaufbereitung: Innenraumreinigung in der Werkstatt" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">Autoaufbereitung</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Innenraum & Außenpflege, materialgerecht</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Pakete ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Pakete</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Die passende Fahrzeugaufbereitung auf einen Blick</motion.h2>
            <motion.p className="text-base leading-relaxed mb-14 max-w-2xl" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
              Innenraumreinigung und Außenreinigung lassen sich einzeln buchen. Für die komplette Autoaufbereitung ist das Kombipaket der stärkste Preisvorteil.
            </motion.p>
            <motion.div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {autoaufbereitungPackages.map((pack) => (
                <motion.article
                  key={pack.name}
                  className={`p-7 relative ${pack.name === "Komplettaufbereitung" ? "lg:col-span-3" : ""}`}
                  style={{ backgroundColor: pack.name === "Komplettaufbereitung" ? "#eaf6fa" : "#ffffff" }}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {pack.name === "Innenraum Premium" && (
                    <span className="absolute top-5 right-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider" style={{ backgroundColor: "#0074a2", color: "#fff" }}>Beliebt</span>
                  )}
                  {pack.name === "Komplettaufbereitung" && (
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#0074a2" }}>Empfohlenes Gesamtpaket</span>
                  )}
                  <div className="flex items-end justify-between gap-4 mb-3 mt-1">
                    <h3 className="text-xl font-bold" style={{ color: "#002e40" }}>{pack.name}</h3>
                    <strong className="text-3xl font-bold whitespace-nowrap" style={{ color: "#0074a2" }}>{pack.price}</strong>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#4a6272" }}>{pack.description}</p>
                  <ul className={`grid gap-2 ${pack.name === "Komplettaufbereitung" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                    {pack.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#16394a" }}>
                        <span style={{ color: "#0074a2" }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
            <motion.p className="mt-6 text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              Alle Preise verstehen sich für Fahrzeuge mit üblicher Verschmutzung. Details zu Zuschlägen finden Sie unten bei den Zusatzleistungen.
            </motion.p>
          </div>
        </section>

        {/* ── Zusatzleistungen ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <div className="max-w-3xl">
              <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Zusatzleistungen</motion.p>
              <motion.h2 className="font-bold tracking-tight mb-5 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Für besonderen Aufwand transparent ergänzt</motion.h2>
              <motion.p className="leading-relaxed mb-10" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                Zusatzkosten gelten nur für außergewöhnlichen zusätzlichen Aufwand oder eine gesonderte Intensiv-/Tiefenbehandlung – nicht automatisch zusätzlich zu jeder Premium-Leistung.
              </motion.p>
            </div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {autoaufbereitungExtras.map((extra) => (
                <motion.p key={extra} className="text-sm flex gap-2" style={{ color: "#16394a" }} variants={staggerItem}>
                  <span style={{ color: "#0074a2" }}>+</span>{extra.replace(/^\+\s*/, "")}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Was gehört dazu + Preise ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Leistungsumfang</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Was gehört zu einer professionellen Autoaufbereitung?</motion.h2>
                <motion.div className="space-y-4 text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <p>Eine Fahrzeugaufbereitung geht über eine normale schnelle Reinigung hinaus. Innenraum und Außenflächen werden systematisch betrachtet, materialgerecht behandelt und am Ende kontrolliert.</p>
                  <p>Bei Leder, Stoff und Alcantara gelten unterschiedliche Anforderungen. Ziel ist ein sauberer, natürlicher OEM-Look – keine speckig glänzenden Oberflächen und keine pauschalen Versprechen bei starken Flecken oder extremem Schmutz.</p>
                  <p>Eine professionelle Aufbereitung lohnt sich vor längeren Fahrten, nach Tierhaar- oder Fleckenbelastung, vor einer Leasingrückgabe oder wenn das Fahrzeug wieder gepflegt wirken soll. Eine Wertsteigerung wird dabei nicht versprochen.</p>
                </motion.div>
              </div>
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Kostenfaktoren</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Faire und transparente Preise</motion.h2>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  {autoaufbereitungPricingNote}
                </motion.p>
                <motion.div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#eaf6fa" }} {...fadeUp(0.2)}>
                  <p className="font-semibold mb-2" style={{ color: "#002e40" }}>Mehr erfahren</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6272" }}>Unser Ratgeber erklärt den Unterschied zwischen Fahrzeugwäsche und Aufbereitung sowie die wichtigsten Materialien.</p>
                  <Link href="/ratgeber/autoaufbereitung-was-wird-gemacht" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: "#0074a2" }}>
                    Zum Ratgeber
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Lokal ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Autoaufbereitung direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              Als Meisterbetrieb in der Haldenhaustraße reinigen und pflegen wir Ihr Fahrzeug vor Ort in Reutlingen – innen wie außen. Rufen Sie an oder buchen Sie online, wir finden zeitnah einen Termin.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zur Autoaufbereitung</motion.h2>
            <div style={{ borderTop: "1px solid #d5e8f0" }}>
              {autoaufbereitungFaqs.map((faq, i) => (
                <motion.details key={faq.q} className="group py-6" style={{ borderBottom: "1px solid #d5e8f0" }} {...fadeUp(0.1 + i * 0.07)}>
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#002e40" }}>{faq.q}</span>
                    <span className="shrink-0 text-[#0074a2]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-45"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{faq.a}</p>
                </motion.details>
              ))}
            </div>
            <motion.div className="mt-10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "#f5f9fc", border: "1px solid #d5e8f0" }} {...fadeUp(0.2)}>
              <p className="text-sm" style={{ color: "#4a6272" }}>
                Mehr zu Materialien und Reinigungsschritten im Ratgeber: <Link href="/ratgeber/autoaufbereitung-was-wird-gemacht" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>Autoaufbereitung – was wird gemacht?</Link>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Jetzt handeln</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Fahrzeug jetzt aufbereiten lassen.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden schnell einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Aufbereitung anfragen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
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
