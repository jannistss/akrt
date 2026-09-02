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

const triggers = [
  { title: "Motorkontrollleuchte leuchtet", desc: "Ein dauerhaft leuchtendes Symbol zeigt einen gespeicherten Fehler an - ein zeitnaher Werkstattbesuch ist sinnvoll." },
  { title: "Motorkontrollleuchte blinkt", desc: "Blinkt die Leuchte oder tritt zusätzlich Leistungsverlust auf, deutet das auf Fehlzündungen hin - sofort langsamer fahren und Werkstatt aufsuchen." },
  { title: "Fahrzeug ruckelt", desc: "Unregelmäßiges Ruckeln beim Fahren oder im Stand kann mehrere Ursachen im Motor- oder Zündsystem haben." },
  { title: "Leistungsverlust", desc: "Spürbar weniger Kraft beim Beschleunigen ist ein häufiger Anlass für eine Fahrzeugdiagnose." },
  { title: "Ungewöhnliches Motorverhalten", desc: "Unrunder Lauf, ungewohnte Geräusche oder ein verändertes Startverhalten sollten diagnostisch abgeklärt werden." },
  { title: "Weitere Warnmeldungen", desc: "Auch andere Warnsymbole im Display können auf ein Motor- oder Abgasproblem hinweisen." },
];

const faqs = [
  { q: "Was ist der Unterschied zwischen Fehlerspeicher auslesen und Fehlerdiagnose?", a: "Das Auslesen des Fehlerspeichers zeigt gespeicherte Fehlercodes an - es identifiziert aber nicht automatisch die tatsächlich defekte Komponente. Eine echte Fehlerdiagnose ordnet die Codes ein, prüft Zusammenhänge und grenzt die Ursache gezielt ein." },
  { q: "Darf ich noch fahren, wenn die Motorkontrollleuchte leuchtet?", a: "Bei dauerhaftem Leuchten ist in der Regel eine zeitnahe Werkstattfahrt ausreichend. Blinkt die Leuchte oder tritt zusätzlich Leistungsverlust auf, sollten Sie sofort langsamer fahren und die nächste Werkstatt aufsuchen." },
  { q: "Kann ich den Fehlercode selbst löschen?", a: "Technisch ist das mit einem OBD-Lesegerät möglich. Wird die eigentliche Ursache nicht behoben, kehrt der Fehler jedoch zurück - das Löschen allein ersetzt keine Reparatur." },
  { q: "Was kostet eine Fahrzeugdiagnose?", a: "Die OBD-Fehlerauslesung kostet bei uns ab 20,00 € zzgl. 19% MwSt. Bei einer anschließenden Reparatur wird dieser Betrag auf die Kosten angerechnet. Der weitere Reparaturaufwand hängt von der jeweiligen Ursache ab." },
  { q: "Warum reicht das Auslesen des Fehlercodes manchmal nicht aus?", a: "Ein Fehlercode zeigt oft nur das Symptom, nicht immer die eigentliche Ursache. Zum Beispiel kann ein Code für die Lambdasonde auch durch ein vorgeschaltetes Problem ausgelöst werden - deshalb ordnen wir jeden Code fachlich ein, statt nur Teile auf Verdacht zu tauschen." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "Bremsenservice", href: "/bremsen-reutlingen" },
  { name: "Getriebespülung", href: "/getriebespuelung-reutlingen" },
  { name: "Ölwechsel", href: "/oelwechsel-reutlingen" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Achsvermessung", href: "/achsvermessung-reutlingen" },
];

export default function MotordiagnosePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Motordiagnose & Fehlerdiagnose Reutlingen"
        description="Fahrzeugdiagnose bei Motorkontrollleuchte, Leistungsverlust oder ungewöhnlichem Motorverhalten - OBD-Fehlerauslesung und fachliche Ursachenanalyse in Reutlingen."
        url="/motordiagnose-reutlingen"
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
                  items={[{ name: "Startseite", url: "/" }, { name: "Motordiagnose", url: "/motordiagnose-reutlingen" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Motordiagnose &amp;<br /><span style={{ color: "#4db8d8" }}>Fehlerdiagnose</span><br />in Reutlingen
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Motorkontrollleuchte an, Fahrzeug ruckelt oder Leistungsverlust? Wir lesen den Fehlerspeicher aus und grenzen die tatsächliche Ursache fachlich ein - statt Teile auf Verdacht zu tauschen.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Diagnosetermin vereinbaren
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["OBD-Diagnosegerät", "Alle Marken", "Fehlerauslesung ab 20 €", "Anrechnung bei Reparatur"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/blog-fehlerdiagnose.png" alt="Kfz-Mechaniker schließt OBD-Diagnosegerät an ein Fahrzeug an" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">OBD-Fehlerauslesung</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>ab 20,00 € zzgl. 19% MwSt.</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Fehlerspeicher vs Diagnose ── */}
        <section style={{ backgroundColor: "#f0f7ff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#1d4ed8" }} {...fadeUp(0)}>Wichtig zu wissen</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#0f172a", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Fehlerspeicher auslesen ist nicht dasselbe wie eine echte Fehlerdiagnose.</motion.h2>
            <motion.p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "#475569" }} {...fadeUp(0.15)}>
              <strong>Ein gespeicherter Fehlercode identifiziert nicht automatisch die tatsächlich defekte Komponente.</strong> Codes zeigen oft nur, welches System betroffen ist - nicht immer, welches Bauteil ursächlich ist.
            </motion.p>
            <motion.p className="text-base leading-relaxed max-w-2xl" style={{ color: "#475569" }} {...fadeUp(0.2)}>
              Bei der Autoklinik Reutlingen lesen wir den Fehlerspeicher mit modernen Diagnosegeräten aus und ordnen die Codes fachlich ein, statt Teile auf Verdacht zu tauschen. So vermeiden Sie unnötige Reparaturkosten.
            </motion.p>
          </div>
        </section>

        {/* ── Trigger grid ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Wann ist eine Diagnose sinnvoll?</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Diese Anzeichen sprechen für eine Fahrzeugdiagnose</motion.h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {triggers.map((s) => (
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
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>So läuft eine Diagnose bei uns ab</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {[
                { step: "01", title: "Fehlerspeicher auslesen", desc: "Mit einem OBD-Diagnosegerät lesen wir alle gespeicherten Fehlercodes Ihres Fahrzeugs aus." },
                { step: "02", title: "Ursache eingrenzen", desc: "Wir ordnen die Codes fachlich ein und grenzen die wahrscheinliche Ursache ein - statt auf Verdacht Teile zu tauschen." },
                { step: "03", title: "Kostenvoranschlag", desc: "Sie erhalten eine klare Einschätzung zur nötigen Reparatur, bevor wir mit der Arbeit beginnen." },
              ].map((s) => (
                <motion.div key={s.step} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#f5f9fc" }} variants={staggerItem}>
                  <motion.span className="text-5xl font-bold tabular-nums" style={{ color: "#dceaf2" }} whileInView={{ color: "#0074a2" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>{s.step}</motion.span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Lokal ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Motordiagnose direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              In unserer Werkstatt in der Haldenhaustraße lesen wir Ihren Fehlerspeicher direkt vor Ort aus. Rufen Sie an oder buchen Sie online - wir finden zeitnah einen Termin.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zur Motordiagnose</motion.h2>
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
            <motion.div className="mt-10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }} {...fadeUp(0.2)}>
              <p className="text-sm" style={{ color: "#4a6272" }}>
                Alles zur Motorkontrollleuchte im Detail: <Link href="/blog/fehlerdiagnose-motorlampe" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>Motorlampe leuchtet - was tun?</Link>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Jetzt klären lassen</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Motorkontrollleuchte an? Wir finden die Ursache.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden schnell einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Diagnosetermin vereinbaren
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
