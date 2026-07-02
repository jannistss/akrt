"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, slideLeft, slideRight, scaleUp, staggerContainer, staggerItem } from "@/lib/animation";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";
import { WorkshopServices } from "@/components/workshop-services";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Autoklinik Reutlingen",
  telephone: "+4907121155261990",
  address: { "@type": "PostalAddress", streetAddress: "Haldenhaustraße 3", addressLocality: "Reutlingen", postalCode: "72770", addressCountry: "DE" },
};

const highlights = ["Kostenlos bei Fremdverschulden", "Unabhängiger Gutachter im Haus", "Alle Marken", "Meisterbetrieb", "Versicherungsabwicklung", "TÜV in 48 Stunden"];

const whyPoints = [
  { title: "Unabhängiger Sachverständiger im Haus", text: "Kein Umweg, kein zweiter Termin. Das Gutachten entsteht direkt bei uns - vollständig und versicherungskonform." },
  { title: "Reparaturkostenermittlung", text: "Vollständige Dokumentation aller Schäden, Wertminderungsberechnung und Nutzungsausfallentschädigung." },
  { title: "Direktabrechnung mit der Versicherung", text: "Wir kommunizieren direkt mit der Haftpflichtversicherung des Unfallgegners - Sie müssen sich um nichts kümmern." },
  { title: "Karosserie, Lack & Technik", text: "Als Meisterbetrieb reparieren wir alles fachgerecht - Karosserieschäden, Lackarbeiten und mechanische Folgeschäden." },
];

const steps = [
  { step: "01", title: "Termin vereinbaren", desc: "Rufen Sie an, schreiben Sie oder buchen Sie online. Wir finden innerhalb von 24 Stunden einen Termin für Sie." },
  { step: "02", title: "Gutachten & Befund", desc: "Unser Sachverständiger prüft und dokumentiert alle Schäden direkt vor Ort - vollständig und unabhängig." },
  { step: "03", title: "Reparatur & fertig", desc: "Wir reparieren fachgerecht und rechnen mit der Versicherung ab. Sie holen Ihr Fahrzeug wie neu ab." },
];

const faqs = [
  { q: "Was muss ich nach einem Unfall sofort tun?", a: "Unfallstelle absichern, Polizei rufen (wenn nötig), Fotos machen, Personalien tauschen - und dann uns kontaktieren. Wir begleiten Sie durch den Rest." },
  { q: "Kostet das Gutachten mich etwas?", a: "Bei Fremdverschulden trägt die gegnerische Haftpflichtversicherung die Kosten für das Gutachten vollständig. Sie zahlen nichts." },
  { q: "Muss ich zur Vertragswerkstatt meines Fahrzeugherstellers?", a: "Nein. Als Geschädigter haben Sie das Recht, eine freie Fachwerkstatt zu wählen. Die Versicherung muss die Reparaturkosten erstatten - auch bei uns." },
  { q: "Wie lange dauert die Unfallreparatur?", a: "Das hängt vom Schadensumfang ab. Wir schätzen die Zeit bei der Begutachtung ein und halten Sie laufend auf dem Laufenden - ohne böse Überraschungen." },
  { q: "Bekomme ich einen Ersatzwagen?", a: "Bei Fremdverschulden haben Sie in der Regel Anspruch auf Nutzungsausfall oder einen Mietwagen - wir helfen Ihnen, das korrekt gegenüber der Versicherung geltend zu machen." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "Glasservice", href: "/glasservice" },
  { name: "Klimaservice", href: "/klimaservice" },
  { name: "Flottenbetreuung", href: "/flottenbetreuung" },
];

export default function UnfallPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AutoklinikNavbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Unfall gehabt?<br /><span style={{ color: "#4db8d8" }}>Gutachten &amp; Reparatur</span><br />aus einer Hand.
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }} {...fadeUp(0.2)}>
                  Unabhängiger Kfz-Sachverständiger direkt im Haus - kein Umweg, kein Doppeltermin. Wir erledigen Gutachten, Reparatur und Versicherungsabwicklung komplett für Sie.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Jetzt Termin buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href="tel:+4907121155261990" className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>07121 15526199</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {highlights.map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 460 }} {...slideRight(0.2)}>
                <Image src="/assets/images/hero-unfall.png" alt="Kfz-Sachverständiger begutachtet Unfallschaden in der Autoklinik Reutlingen" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.65) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">Kostenlos bei Fremdverschulden</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Gutachten &amp; Reparatur - Sie zahlen nichts</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Der Unterschied</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-6" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Normalerweise fangen nach dem Unfall die Probleme erst an.</motion.h2>
                <motion.p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6272" }} {...fadeUp(0.2)}>
                  Polizei, Versicherung, Gutachter suchen, Termin beim Gutachter, Fahrzeug hinfahren, Gutachten warten, dann Werkstatt suchen - das kostet Nerven, Zeit und manchmal auch Geld.
                </motion.p>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.25)}>
                  In der Autoklinik Reutlingen ist das anders: Unser zertifizierter Kfz-Sachverständiger sitzt direkt im Haus. Sie kommen einmal zu uns - und gehen mit einem fertigen Gutachten und einem Reparaturauftrag.
                </motion.p>
              </div>
              <motion.div className="flex flex-col gap-4" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                {whyPoints.map((p) => (
                  <motion.div key={p.title} className="flex gap-5 p-5 rounded-xl" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }} variants={staggerItem} whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                    <div className="h-6 w-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "#0074a2" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-1" style={{ color: "#002e40" }}>{p.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{p.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3-step process ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Ablauf</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>So einfach geht es</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {steps.map((s) => (
                <motion.div key={s.step} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#ffffff" }} variants={staggerItem}>
                  <motion.span className="text-5xl font-bold tabular-nums" style={{ color: "#e8f4fa" }} whileInView={{ color: "#0074a2" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>{s.step}</motion.span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <WorkshopServices />

        {/* ── Najami Partner Section ── */}
        <section style={{ backgroundColor: "#f0f7ff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#1d4ed8" }} {...fadeUp(0)}>
                  Direkter Partner im Haus
                </motion.p>
                <motion.h2 className="font-bold tracking-tight mb-4 text-balance" style={{ color: "#0f172a", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>
                  Unabhängiges Kfz-Gutachten direkt bei uns im Haus
                </motion.h2>
                <motion.p className="text-base leading-relaxed mb-4" style={{ color: "#475569" }} {...fadeUp(0.2)}>
                  Kfz-Sachverständigenbüro Najami sitzt direkt in unserer Werkstatt - kein zweiter Termin, kein Umweg. Karim Najami erstellt Ihr Gutachten vor Ort, vollständig und unabhängig von der Versicherung.
                </motion.p>
                <motion.div className="flex items-start gap-3 p-4 rounded-xl mb-8" style={{ backgroundColor: "#dbeafe", border: "1px solid #93c5fd" }} {...fadeUp(0.25)}>
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#1d4ed8" />
                  </svg>
                  <p className="text-sm font-medium" style={{ color: "#1e40af" }}>
                    Bei Fremdverschulden kostenlos - Express-Gutachten innerhalb von 24 Stunden möglich.
                  </p>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link
                    href="/kfz-gutachter"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#1d4ed8" }}
                  >
                    Mehr erfahren
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+4915563146679"
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
                    style={{ borderColor: "#bfdbfe", color: "#334155" }}
                  >
                    0155 631 46679
                  </a>
                </motion.div>
              </div>
              <motion.div
                className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0"
                style={{ height: 420 }}
                {...slideRight(0.15)}
              >
                <img
                  src="/assets/images/najami/najami-work-1.webp"
                  alt="Karim Najami - Kfz-Sachverständiger bei der Fahrzeugbegutachtung in Reutlingen"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.65) 100%)" }} />
                <motion.div
                  className="absolute bottom-6 left-6 rounded-xl px-5 py-3"
                  style={{ backgroundColor: "rgba(15,23,42,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(147,197,253,0.25)" }}
                  {...scaleUp(0.3)}
                >
                  <p className="text-xs font-bold text-white">Karim Najami</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Zertifizierter Kfz-Sachverständiger</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen nach einem Unfall</motion.h2>
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
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Wir sind für Sie da - noch heute.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden schnell einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Termin buchen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <a href="tel:+4907121155261990" className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>07121 15526199</a>
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
