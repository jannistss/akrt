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

const symptoms = [
  { title: "Lenkrad steht schief", desc: "Fährt das Fahrzeug geradeaus, das Lenkrad ist dabei aber nicht mittig, deutet das häufig auf eine verstellte Spur hin." },
  { title: "Einseitiger Reifenverschleiß", desc: "Nutzt sich ein Reifen deutlich schneller oder ungleichmäßiger ab als die anderen, kann die Achsgeometrie nicht mehr stimmen." },
  { title: "Fahrzeug zieht zur Seite", desc: "Zieht das Auto auf gerader, ebener Strecke ohne Lenkeingriff zu einer Seite, ist das ein typisches Anzeichen für eine verstellte Achse." },
  { title: "Nach Bordstein- oder Schlagloch-Kontakt", desc: "Ein harter Kontakt mit Bordstein oder Schlagloch kann Spur und Sturz verstellen, auch wenn äußerlich kein Schaden erkennbar ist." },
  { title: "Verändertes Fahrverhalten", desc: "Ein unruhiges Lenkverhalten oder ein Gefühl von 'Schwimmen' bei höherer Geschwindigkeit kann mit der Fahrwerksgeometrie zusammenhängen." },
  { title: "Nach Fahrwerksarbeiten", desc: "Nach dem Austausch von Stoßdämpfern, Federn, Spurstangen oder anderen Fahrwerksteilen sollte die Achsvermessung grundsätzlich kontrolliert werden." },
];

const faqs = [
  { q: "Was ist der Unterschied zwischen Achsvermessung und Spureinstellung?", a: "Bei der Achsvermessung werden zunächst alle relevanten Fahrwerkswinkel wie Spur und Sturz gemessen und mit den Herstellervorgaben verglichen. Die Spureinstellung ist der anschließende Korrekturschritt, bei dem die Spurwerte auf Basis dieser Messung angepasst werden - sie ist also ein Teil der Achsvermessung, nicht deren Ersatz." },
  { q: "Wann sollte ich eine Achsvermessung machen lassen?", a: "Sinnvoll ist eine Achsvermessung bei schiefem Lenkrad in Geradeausfahrt, einseitigem oder ungleichmäßigem Reifenverschleiß, wenn das Fahrzeug zur Seite zieht, nach einem Kontakt mit Bordstein oder Schlagloch sowie nach dem Austausch von Fahrwerksteilen." },
  { q: "Wodurch verstellt sich die Fahrwerksgeometrie überhaupt?", a: "Häufige Ursachen sind harte Stöße durch Bordsteine, Schlaglöcher oder kleinere Unfälle, verschlissene Fahrwerksbauteile wie Spurstangenköpfe oder Gummilager sowie der Austausch von Fahrwerkskomponenten, nach dem die Geometrie neu eingestellt werden muss." },
  { q: "Kann eine verstellte Achse zu schnellerem Reifenverschleiß führen?", a: "Ja. Stimmen Spur oder Sturz nicht mit den Herstellervorgaben überein, rollt der Reifen nicht mehr optimal ab und verschleißt dadurch häufig einseitig oder deutlich schneller als bei korrekt eingestellter Geometrie." },
  { q: "Wie läuft eine Achsvermessung grundsätzlich ab?", a: "Das Fahrzeug wird auf eine Hebebühne bzw. einen Messplatz gefahren, die Fahrwerkswinkel werden mit einem Messsystem erfasst und mit den Herstellerwerten verglichen. Weicht die Spur ab, wird sie anschließend an den entsprechenden Fahrwerksteilen korrigiert." },
  { q: "Was kostet eine Achsvermessung?", a: "Die Kosten hängen vom Fahrzeug und davon ab, ob nur die Spur korrigiert wird oder zusätzlich verschlissene Fahrwerksteile ersetzt werden müssen. Wir erstellen Ihnen dazu gerne einen Kostenvoranschlag für Ihr konkretes Fahrzeug." },
];

const related = [
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "Bremsenservice", href: "/bremsen-reutlingen" },
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Motordiagnose", href: "/motordiagnose-reutlingen" },
  { name: "Unfallservice", href: "/unfall" },
];

export default function AchsvermessungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Achsvermessung Reutlingen"
        description="Achsvermessung und Spureinstellung zur Prüfung und Korrektur der Fahrwerksgeometrie - für alle Fahrzeugmarken in Reutlingen."
        url="/achsvermessung-reutlingen"
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
                  items={[{ name: "Startseite", url: "/" }, { name: "Achsvermessung", url: "/achsvermessung-reutlingen" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Achsvermessung<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Die Autoklinik Reutlingen prüft die Fahrwerksgeometrie Ihres Fahrzeugs und stellt die Spur bei Bedarf nach Herstellervorgabe neu ein - für alle Fahrzeugmarken.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Achsvermessung anfragen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Alle Marken", "Meisterbetrieb", "Spur & Fahrwerksgeometrie", "Kostenvoranschlag vorab"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/hero-achsvermessung.png" alt="Achsvermessung an einem Fahrzeug in der Werkstatt" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">Achsvermessung</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Messung &amp; Spureinstellung nach Herstellervorgabe</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Anzeichen ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Anzeichen</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Wann ist eine Achsvermessung sinnvoll?</motion.h2>
            <motion.p className="text-base leading-relaxed mb-14 max-w-2xl" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
              <strong>Ein schief stehendes Lenkrad, einseitiger Reifenverschleiß oder ein verändertes Fahrverhalten sind typische Hinweise auf eine verstellte Fahrwerksgeometrie.</strong> Ob und wie stark die Achse tatsächlich abweicht, lässt sich jedoch nur durch eine Messung mit entsprechendem Equipment zuverlässig feststellen.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {symptoms.map((s) => (
                <motion.div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Achsvermessung vs Spureinstellung + Ursachen ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Begriffsklärung</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Achsvermessung oder Spureinstellung?</motion.h2>
                <motion.p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <strong>Bei der Achsvermessung werden zunächst die Fahrwerkswinkel wie Spur und Sturz gemessen und mit den Herstellervorgaben verglichen.</strong> Erst danach zeigt sich, ob und an welcher Achse eine Abweichung vorliegt.
                </motion.p>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.2)}>
                  Die Spureinstellung ist der darauf folgende Korrekturschritt: Anhand der Messwerte werden die Spurstangen entsprechend nachjustiert, bis die Werte wieder im vorgegebenen Toleranzbereich liegen. Eine Spureinstellung ohne vorherige Messung ist daher wenig sinnvoll.
                </motion.p>
              </div>
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Mögliche Ursachen</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Wodurch verstellt sich die Geometrie?</motion.h2>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <strong>Häufige Ursachen sind harte Stöße durch Bordsteine oder Schlaglöcher, kleinere Unfälle sowie verschlissene Fahrwerksbauteile</strong> wie Spurstangenköpfe oder Gummilager. Auch nach dem Austausch von Stoßdämpfern, Federn oder anderen Fahrwerksteilen sollte die Geometrie kontrolliert werden, da sich die Werte durch den Eingriff verändern können.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ablauf ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Ablauf</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Wie läuft eine Achsvermessung ab?</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {[
                { step: "01", title: "Messung der Fahrwerkswinkel", desc: "Das Fahrzeug wird auf den Messplatz gefahren und die relevanten Fahrwerkswinkel wie Spur und Sturz werden erfasst und mit den Herstellervorgaben verglichen." },
                { step: "02", title: "Befund & Kostenvoranschlag", desc: "Sie erhalten eine klare Einschätzung, ob und an welcher Achse eine Abweichung vorliegt - inklusive Kostenvoranschlag, falls Fahrwerksteile betroffen sind." },
                { step: "03", title: "Spureinstellung & Kontrolle", desc: "Bei Bedarf stellen wir die Spur entsprechend nach und prüfen abschließend, ob alle Werte wieder im vorgegebenen Toleranzbereich liegen." },
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
                <h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)" }}>Was kostet eine Achsvermessung?</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <strong style={{ color: "#ffffff" }}>Die Kosten hängen vor allem davon ab, ob nur die Spur korrigiert wird oder zusätzlich verschlissene Fahrwerksteile wie Spurstangenköpfe ersetzt werden müssen.</strong> Auch das Fahrzeugmodell spielt eine Rolle. Für einen konkreten Preis benötigen wir Ihr Fahrzeug - wir erstellen Ihnen dazu gerne einen Kostenvoranschlag.
                </p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Preis für dein Fahrzeug anfragen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Lokal ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Achsvermessung direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              Als Meisterbetrieb in der Haldenhaustraße messen und korrigieren wir die Fahrwerksgeometrie Ihres Fahrzeugs vor Ort in Reutlingen. Rufen Sie an oder buchen Sie online - wir finden zeitnah einen Termin.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zur Achsvermessung</motion.h2>
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
                Mehr zu Symptomen und Ursachen im Ratgeber: <Link href="/blog/achsvermessung-spur-einstellen" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>Achsvermessung - wann muss die Spur eingestellt werden?</Link>
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
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Fahrwerksgeometrie jetzt prüfen lassen.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden schnell einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Achsvermessung anfragen
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
