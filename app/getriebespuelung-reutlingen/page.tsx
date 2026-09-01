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

const signs = [
  { title: "Ruckartiges Schalten", desc: "Wenn das Automatikgetriebe beim Gangwechsel spürbar ruckt oder stockt, kann verschlissenes oder überaltertes Getriebeöl die Ursache sein." },
  { title: "Verzögerte Gangwechsel", desc: "Eine merkliche Pause zwischen Gangwahl und Kraftübertragung deutet häufig auf nachlassende Schmier- und Kühlwirkung der Flüssigkeit hin." },
  { title: "Ungewöhnliche Geräusche", desc: "Brummen, Heulen oder Schleifgeräusche aus dem Getriebebereich sollten zeitnah abgeklärt werden." },
  { title: "Warnleuchte im Display", desc: "Leuchtet die Getriebe- oder Motorkontrollleuchte auf, kann das auch mit dem Zustand der Getriebeflüssigkeit zusammenhängen." },
  { title: "Höherer Kilometerstand", desc: "Auch ohne spürbare Symptome verliert Getriebeöl mit der Zeit und Laufleistung seine Eigenschaften - ein präventiver Wechsel schützt das Getriebe." },
  { title: "Fahrzeug ohne Wechselhistorie", desc: "Wurde die Getriebeflüssigkeit noch nie gewechselt oder ist die Wechselhistorie unbekannt, empfiehlt sich eine Prüfung." },
];

const faqs = [
  { q: "Was ist eine Getriebespülung?", a: "Bei einer Getriebespülung wird die alte, verschlissene Getriebeflüssigkeit vollständig aus dem Getriebe entfernt und durch neue, freigabekonforme Flüssigkeit ersetzt. Das unterstützt die Schmierung und Kühlung der Getriebekomponenten." },
  { q: "Wie oft sollte eine Getriebespülung durchgeführt werden?", a: "Das hängt vom Fahrzeug, Getriebetyp und Herstellervorgabe ab. Wir prüfen anhand von Fahrzeugschein oder Fahrgestellnummer, welches Intervall für Ihr Fahrzeug gilt." },
  { q: "Für welche Getriebearten ist eine Spülung möglich?", a: "Eine Getriebespülung ist grundsätzlich für Automatikgetriebe sowie bestimmte Doppelkupplungsgetriebe relevant. Ob eine Spülung für Ihr konkretes Fahrzeug sinnvoll ist, klären wir bei der Diagnose." },
  { q: "Was kostet eine Getriebespülung?", a: "Die Kosten richten sich nach Fahrzeug, Getriebetyp und benötigter Flüssigkeitsmenge. Wir nennen Ihnen den genauen Preis nach kurzer Prüfung Ihres Fahrzeugs." },
  { q: "Was passiert, wenn die Getriebeflüssigkeit nicht gewechselt wird?", a: "Altes Getriebeöl verliert seine Schmier- und Kühlwirkung, was zu erhöhtem Verschleiß an Kupplungspaketen und Zahnrädern führen kann - im schlimmsten Fall drohen kostspielige Getriebeschäden." },
  { q: "Wie lange dauert eine Getriebespülung?", a: "Je nach Fahrzeug und Getriebetyp dauert eine Getriebespülung in der Regel zwischen 45 und 90 Minuten." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "Motordiagnose", href: "/motordiagnose-reutlingen" },
  { name: "Ölwechsel", href: "/oelwechsel-reutlingen" },
  { name: "Bremsenservice", href: "/bremsen-reutlingen" },
  { name: "TÜV & AU", href: "/tuev-au" },
];

export default function GetriebespuelungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Getriebespülung Reutlingen"
        description="Getriebespülung mit freigabekonformer Getriebeflüssigkeit für Automatik- und Doppelkupplungsgetriebe in Reutlingen."
        url="/getriebespuelung-reutlingen"
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
                  items={[{ name: "Startseite", url: "/" }, { name: "Getriebespülung", url: "/getriebespuelung-reutlingen" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Getriebespülung<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Die Autoklinik Reutlingen erneuert die Getriebeflüssigkeit Ihres Automatik- oder Doppelkupplungsgetriebes nach Herstellervorgabe - für einen ruhigen, geschützten Gangwechsel.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Getriebe prüfen lassen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Alle Marken", "Meisterbetrieb", "Freigabekonforme Flüssigkeit", "Automatik & DSG"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/service-getriebespuelung.png" alt="Mechaniker führt Getriebespülung mit Getriebeölwechsel-Gerät durch" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">Getriebespülung</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Freigabekonforme Getriebeflüssigkeit</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Warnsignale ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Warnsignale</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Wann sollte das Getriebe geprüft werden?</motion.h2>
            <motion.p className="text-sm leading-relaxed mb-14 max-w-2xl" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
              <strong>Achten Sie auf ruckartiges oder verzögertes Schalten, ungewöhnliche Geräusche und Warnleuchten.</strong> Eine zuverlässige Beurteilung ist jedoch nur durch eine Prüfung vor Ort möglich - aus der Ferne lässt sich der Zustand des Getriebes nicht sicher einschätzen.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {signs.map((s) => (
                <motion.div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Ablauf ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Ablauf</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Wie läuft eine Getriebespülung ab?</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {[
                { step: "01", title: "Diagnose & Ölprüfung", desc: "Wir prüfen Getriebetyp, Zustand und Farbe der aktuellen Getriebeflüssigkeit und ermitteln die passende Herstellerfreigabe." },
                { step: "02", title: "Vollständige Spülung", desc: "Die alte Flüssigkeit wird vollständig aus dem Getriebe und dem Kühlkreislauf entfernt - nicht nur teilweise abgelassen." },
                { step: "03", title: "Neubefüllung & Funktionsprüfung", desc: "Nach der Neubefüllung mit freigabekonformer Flüssigkeit prüfen wir das Schaltverhalten bei einer Probefahrt." },
              ].map((s) => (
                <motion.div key={s.step} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#ffffff" }} variants={staggerItem}>
                  <motion.span className="text-5xl font-bold tabular-nums" style={{ color: "#e8f4fa" }} whileInView={{ color: "#0074a2" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>{s.step}</motion.span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>{s.title}</h3>
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
                <h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)" }}>Was kostet eine Getriebespülung?</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <strong style={{ color: "#ffffff" }}>Die Kosten hängen von Fahrzeug, Getriebetyp und benötigter Flüssigkeitsmenge ab.</strong> Nennen Sie uns Ihr Fahrzeug oder die Fahrgestellnummer - wir sagen Ihnen den genauen Preis vor dem Termin.
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
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Getriebespülung direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              Als Meisterbetrieb in der Haldenhaustraße spülen und befüllen wir Ihr Getriebe fachgerecht vor Ort. Rufen Sie an oder buchen Sie online - wir finden zeitnah einen Termin.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zur Getriebespülung</motion.h2>
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
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Jetzt handeln</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Getriebe schützen - Spülung jetzt vereinbaren.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden schnell einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Getriebe prüfen lassen
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
