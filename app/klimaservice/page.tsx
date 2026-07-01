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
  telephone: "+4907121155261990",
  address: { "@type": "PostalAddress", streetAddress: "Haldenhaustraße 3", addressLocality: "Reutlingen", postalCode: "72770", addressCountry: "DE" },
};

const services = [
  { title: "Klima-Check & Drucktest", desc: "Kühlleistung, Systemdruck und Gesamtzustand werden gemessen. So wissen Sie sofort, ob und wo gehandelt werden muss." },
  { title: "Kältemittel befüllen", desc: "Wir befüllen Ihre Anlage mit dem richtigen Kältemittel (R134a oder R1234yf) - nach Herstellervorgabe und in der korrekten Menge." },
  { title: "Desinfektion", desc: "Bakterien, Schimmel und Gerüche aus dem Klimasystem entfernen - für frische, saubere Luft im Innenraum." },
  { title: "Innenraumfilter wechseln", desc: "Ein verstopfter Pollenfilter mindert Kühlleistung und Luftqualität. Wir wechseln ihn schnell und günstig." },
  { title: "Dichtheitsprüfung", desc: "Mit Kontrastmittel und UV-Licht spüren wir Undichtigkeiten im Kältemittelkreislauf auf, bevor größere Schäden entstehen." },
  { title: "Kompressor & Bauteile", desc: "Defekter Klimakompressor oder kaputtes Expansionsventil? Wir tauschen Verschleißteile fachgerecht aus." },
];

const whyPoints = [
  { title: "Bessere Kühlleistung", text: "Ein optimal befülltes System kühlt schneller und effizienter - wichtig an heißen Sommertagen." },
  { title: "Gesündere Luft", text: "Ohne Desinfektion sammeln sich Bakterien und Schimmel im System - das riecht nicht nur schlecht, sondern kann die Gesundheit belasten." },
  { title: "Undichtigkeiten früh erkennen", text: "Kleine Lecks werden groß. Wir finden sie bevor der Kompressor zu Schaden kommt - das spart bares Geld." },
  { title: "Werterhalt", text: "Ein gepflegtes Klimasystem ist beim Gebrauchtwagenverkauf ein echter Pluspunkt." },
];

const faqs = [
  { q: "Wie oft sollte die Klimaanlage gewartet werden?", a: "Empfohlen wird eine Überprüfung alle 2 Jahre. Kältemittel entweicht durch Diffusion schleichend - nach 3–5 Jahren ist die Anlage oft schon deutlich unter Druck." },
  { q: "Woran erkenne ich, dass die Klimaanlage gewartet werden muss?", a: "Typische Anzeichen: Die Luft kühlt nicht mehr richtig, unangenehme Gerüche beim Einschalten, beschlagene Scheiben, die sich langsamer klären, oder der Kompressor springt hörbar an und ab." },
  { q: "Was kostet ein Klimaservice?", a: "Ein Basis-Check mit Auffüllung liegt je nach Kältemitteltyp und -menge typisch zwischen 60 und 150 €. Wir nennen Ihnen den genauen Preis vorab - ohne Nachträge." },
  { q: "Wie lange dauert der Klimaservice?", a: "Der Check inkl. Kältemittelbefüllung dauert ca. 45–60 Minuten. Desinfektion kommt noch ca. 20 Minuten obendrauf." },
  { q: "Kann ich die Klimaanlage auch im Winter prüfen lassen?", a: "Ja, das ist sogar sinnvoll - gerade für die Scheibenentfeuchtung, die auch im Winter aktiv ist. Und ein Frühjahrs-Check kurz vor der Hitzesaison ist ideal." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "Glasservice", href: "/glasservice" },
  { name: "Unfallservice", href: "/unfall" },
  { name: "Flottenbetreuung", href: "/flottenbetreuung" },
];

export default function KlimaservicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AutoklinikNavbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "-80px", right: "-80px", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,116,162,0.18) 0%, transparent 70%)" }} />
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Klimaservice<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }} {...fadeUp(0.2)}>
                  Klima-Check, Kältemittelbefüllung, Desinfektion und Filterservice - kalt, sauber und schnell erledigt. Für alle Fahrzeugmarken, ohne versteckte Kosten.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Termin buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href="tel:+4907121155261990" className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>07121 15526199</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Alle Marken", "R134a & R1234yf", "Festpreis-Versprechen", "Termin in 48h"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[420px] rounded-2xl overflow-hidden shrink-0" style={{ height: 420 }} {...slideRight(0.2)}>
                <Image src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png" alt="Mechaniker prüft Klimaanlage eines Fahrzeugs in der Autoklinik Reutlingen" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 420px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,20,32,0.55) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "rgba(0,46,64,0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(77,184,216,0.3)" }} {...scaleUp(0.4)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" stroke="#4db8d8" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#ffffff" }}>Klimaservice</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>ab 60 €</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Leistungen</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Was wir für Ihre Klimaanlage tun</motion.h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {services.map((s) => (
                <motion.div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Why ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Warum jetzt?</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-8" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Eine gepflegte Klimaanlage schützt Sie und Ihr Fahrzeug.</motion.h2>
                <div style={{ borderTop: "1px solid #d5e8f0" }}>
                  {whyPoints.map((p, i) => (
                    <motion.div key={p.title} className="flex gap-5 py-5" style={{ borderBottom: "1px solid #d5e8f0" }} {...fadeUp(0.1 + i * 0.08)}>
                      <div className="h-5 w-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "#0074a2" }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1" style={{ color: "#002e40" }}>{p.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{p.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div className="relative rounded-2xl overflow-hidden" style={{ height: 460 }} {...slideRight(0.15)}>
                <Image src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png" alt="Werkstatt der Autoklinik Reutlingen" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zum Klimaservice</motion.h2>
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Jetzt buchen</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Klimaservice-Termin buchen.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Vor der Hitzesaison sind die Wartezeiten lang. Sichern Sie sich jetzt Ihren Termin.</p>
              </motion.div>
              <motion.div {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
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
