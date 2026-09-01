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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  telephone: SITE.phone.e164,
  address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, postalCode: SITE.address.zip, addressCountry: SITE.address.country },
};

const included = [
  { title: "Freigabekonformes Motoröl", desc: "Wir ermitteln die passende Herstellerfreigabe (z. B. VW 504/507, MB 229.5) für Ihr Fahrzeug und füllen ausschließlich passendes Öl ein." },
  { title: "Ölfilterwechsel", desc: "Der Ölfilter wird bei jedem Wechsel mit erneuert, da er Verschmutzungen aus dem Altöl zurückhält." },
  { title: "Sichtprüfung", desc: "Zusätzlich prüfen wir Füllstände, sichtbare Undichtigkeiten und den allgemeinen Zustand des Motorraums." },
];

const faqs = [
  { q: "Wie oft sollte ich das Motoröl wechseln lassen?", a: "Das hängt vom Fahrzeug und der Ölspezifikation ab: klassische Intervalle liegen bei 10.000-15.000 km oder einmal jährlich, Longlife-Öle bei modernen Fahrzeugen können bis zu 30.000 km halten. Wir prüfen bei jedem Termin den vom Hersteller vorgegebenen Wert für Ihr Fahrzeug." },
  { q: "Welches Öl braucht mein Auto?", a: "Das richtige Öl richtet sich nach Herstellerfreigabe (z. B. VW 504/507, MB 229.5), nicht nur nach der Viskositätsklasse. Wir ermitteln die passende Spezifikation anhand von Fahrzeugschein oder Fahrgestellnummer und füllen ausschließlich freigabekonformes Öl ein." },
  { q: "Was kostet ein Ölwechsel bei der Autoklinik?", a: "Die Kosten hängen von Fahrzeugtyp und benötigter Ölmenge bzw. -spezifikation ab. Den genauen Preis nennen wir Ihnen bei der Terminvereinbarung bzw. nach kurzer Prüfung Ihres Fahrzeugscheins." },
  { q: "Was passiert, wenn ich den Ölwechsel zu lange aufschiebe?", a: "Altöl verliert seine Schmierfähigkeit und reinigende Wirkung. Das erhöht den Verschleiß an Kolben, Lagern und der Nockenwelle und kann im schlimmsten Fall zum Motorschaden führen. Ein regelmäßiger Wechsel ist eine der günstigsten Maßnahmen, um Ihren Motor zu schützen." },
  { q: "Wie lange dauert ein Ölwechsel?", a: "In der Regel rund 30-45 Minuten. Sie können in unserem Wartebereich bleiben oder das Fahrzeug für den Tag bei uns lassen." },
  { q: "Wird die Herstellergarantie beeinträchtigt, wenn ich den Ölwechsel bei Ihnen machen lasse?", a: "Nein. Nach dem EU-Gruppenfreistellungsgesetz dürfen freie Werkstätten wie unsere herstellerkonforme Wartungsarbeiten durchführen, ohne dass die Garantie erlischt - vorausgesetzt, es werden Öl und Teile nach Herstellervorgabe verwendet, was bei uns Standard ist." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "Bremsenservice", href: "/bremsen-reutlingen" },
  { name: "Motordiagnose", href: "/motordiagnose-reutlingen" },
  { name: "Getriebespülung", href: "/getriebespuelung-reutlingen" },
  { name: "TÜV & AU", href: "/tuev-au" },
];

export default function OelwechselPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Ölwechsel Reutlingen"
        description="Motorölwechsel inkl. Ölfilter nach Herstellervorgabe für alle Fahrzeugmarken in Reutlingen."
        url="/oelwechsel-reutlingen"
      />
      <FaqSchema items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <AutoklinikNavbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <Breadcrumbs
                  variant="dark"
                  items={[{ name: "Startseite", url: "/" }, { name: "Ölwechsel", url: "/oelwechsel-reutlingen" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Ölwechsel<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Die Autoklinik Reutlingen wechselt Motoröl und Ölfilter nach Herstellervorgabe - für alle Fahrzeugmarken, meist ohne langen Terminvorlauf.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Ölwechsel-Termin anfragen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Alle Marken", "Meisterbetrieb", "Freigabekonformes Motoröl", "Meist am selben Tag"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/blog-oelwechsel.png" alt="Mechaniker führt Ölwechsel am Fahrzeug durch" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">Ölwechsel</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Motoröl &amp; Ölfilter nach Herstellervorgabe</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Warum & Intervalle ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Warum rechtzeitig wechseln</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Der Ölwechsel-Termin sollte nicht warten</motion.h2>
            <motion.div className="grid md:grid-cols-2 gap-10 max-w-4xl" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} variants={staggerItem}>
                <strong>Motoröl schmiert, kühlt und reinigt den Motor - mit der Zeit verliert es diese Eigenschaften durch Alterung, Ruß und Metallabrieb.</strong> Wird der Wechsel zu lange aufgeschoben, steigt der Verschleiß an Kolben, Lagern und Nockenwelle deutlich an.
              </motion.p>
              <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} variants={staggerItem}>
                Klassische Intervalle liegen bei 10.000-15.000 km oder einmal jährlich, moderne Longlife-Öle können je nach Fahrzeug bis zu 30.000 km halten. Wir prüfen bei jedem Termin, welches Intervall für Ihr konkretes Fahrzeug gilt.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Leistungsumfang ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Leistungsumfang</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Das ist im Ölwechsel enthalten</motion.h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {included.map((s) => (
                <motion.div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Kosten ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div className="max-w-2xl" {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Kostenfaktoren</p>
                <h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)" }}>Was kostet ein Ölwechsel?</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <strong style={{ color: "#ffffff" }}>Die Kosten richten sich nach Fahrzeugtyp sowie benötigter Ölmenge und -spezifikation.</strong> Nennen Sie uns Ihr Fahrzeug oder die Fahrgestellnummer - wir sagen Ihnen den genauen Preis vor dem Termin.
                </p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Preis für Ihr Fahrzeug anfragen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Lokal ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Ölwechsel direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              Als Meisterbetrieb in der Haldenhaustraße erledigen wir Ihren Ölwechsel meist am selben Tag - ohne langen Terminvorlauf. Rufen Sie an oder buchen Sie online.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zum Ölwechsel</motion.h2>
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
            <motion.div className="mt-10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "#f5f9fc", border: "1px solid #d5e8f0" }} {...fadeUp(0.2)}>
              <p className="text-sm" style={{ color: "#4a6272" }}>
                Mehr zum Thema im Ratgeber: <Link href="/blog/oelwechsel-wie-oft-welches-oel" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>Ölwechsel - wie oft, welches Öl?</Link>
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
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Motoröl geschützt - Ölwechsel jetzt vereinbaren.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden meist noch am selben Tag einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Ölwechsel-Termin anfragen
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
