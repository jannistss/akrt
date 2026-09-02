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
  { title: "Quietschen oder Schleifen", desc: "Ein hohes Quietschen kann ein Verschleißwarner sein - ein metallisches Schleifen deutet oft auf stark abgenutzte Bremsbeläge hin." },
  { title: "Vibrieren beim Bremsen", desc: "Ein Rütteln im Pedal oder Lenkrad kann auf verzogene Bremsscheiben hindeuten, zum Beispiel nach starker Hitzeentwicklung." },
  { title: "Längerer Bremsweg", desc: "Wenn das Fahrzeug spürbar später zum Stehen kommt als gewohnt, sollte die Bremsanlage zeitnah geprüft werden." },
  { title: "Fahrzeug zieht zur Seite", desc: "Zieht das Auto beim Bremsen einseitig, kann das an ungleich verschlissenen Belägen oder einem klemmenden Bremssattel liegen." },
  { title: "Warnleuchte im Display", desc: "Eine aufleuchtende Bremswarnleuchte kann verschiedene Ursachen haben - von niedrigem Bremsflüssigkeitsstand bis Belagverschleiß." },
  { title: "Weiches oder tiefes Pedal", desc: "Lässt sich das Bremspedal ungewöhnlich weit durchtreten, sollte die Anlage umgehend kontrolliert werden." },
];

const faqs = [
  { q: "Wann müssen Bremsbeläge gewechselt werden?", a: "Bremsbeläge müssen gewechselt werden, wenn die Belagstärke eine kritische Mindestgrenze unterschreitet. Wie schnell das passiert, hängt von Fahrweise, Fahrzeug und Einsatzbereich ab - deshalb prüfen wir die Restdicke bei jeder Durchsicht." },
  { q: "Wie erkenne ich verschlissene Bremsscheiben?", a: "Anzeichen sind Riefen auf der Oberfläche, sichtbare Kanten am Rand der Scheibe, Vibrationen beim Bremsen oder ein verändertes Bremsgeräusch. Eine genaue Beurteilung ist nur durch Messung möglich." },
  { q: "Warum quietschen meine Bremsen?", a: "Quietschen kann mehrere Ursachen haben - etwa Feuchtigkeit, Verschleißanzeiger, Materialablagerungen oder tatsächlich abgenutzte Beläge. Ein Quietschen bedeutet nicht automatisch, dass die Bremsen verschlissen sind, sollte aber geprüft werden." },
  { q: "Kann ich mit einer Bremswarnleuchte weiterfahren?", a: "Das hängt von der Ursache ab. Bei sicherheitskritischen Symptomen wie einem weichen Pedal, starkem Ziehen oder metallischem Schleifen sollten Sie nicht risikoreich weiterfahren, sondern das Fahrzeug zeitnah prüfen lassen." },
  { q: "Wie viel kostet ein Bremsenwechsel?", a: "Die Kosten hängen vom Fahrzeug, der betroffenen Achse und davon ab, ob nur die Beläge oder zusätzlich die Scheiben ersetzt werden müssen. Wir erstellen Ihnen dazu gerne einen Kostenvoranschlag für Ihr konkretes Fahrzeug." },
  { q: "Muss man Bremsscheiben und Beläge gemeinsam wechseln?", a: "Nicht zwingend - das hängt vom Verschleißzustand beider Komponenten ab. Wir beurteilen bei der Prüfung, ob ein Wechsel nur der Beläge ausreicht oder die Scheiben ebenfalls betroffen sind." },
];

const related = [
  { name: "Inspektion & Wartung", href: "/inspektion" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Motordiagnose", href: "/motordiagnose-reutlingen" },
  { name: "Achsvermessung", href: "/achsvermessung-reutlingen" },
  { name: "Unfallservice", href: "/unfall" },
  { name: "Reifenservice", href: "/reifenservice" },
];

export default function BremsenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Bremsenservice Reutlingen"
        description="Prüfung, Wartung und Reparatur der Bremsanlage - Bremsbeläge, Bremsscheiben und Bremsflüssigkeit für alle Fahrzeugmarken in Reutlingen."
        url="/bremsen-reutlingen"
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
                  items={[{ name: "Startseite", url: "/" }, { name: "Bremsenservice", url: "/bremsen-reutlingen" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Bremsenservice<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  Die Autoklinik Reutlingen prüft und wartet Ihre Bremsanlage und führt notwendige Reparaturen an verschlissenen Bremskomponenten durch - für alle Fahrzeugmarken.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Bremsen prüfen lassen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>{SITE.phone.display}</a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Alle Marken", "Meisterbetrieb", "Bremsbeläge & Bremsscheiben", "Kostenvoranschlag vorab"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/blog-bremsen-pruefen.png" alt="Bremsscheibe und Bremssattel einer Fahrzeug-Bremsanlage" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.6) 100%)" }} />
                <motion.div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }} {...scaleUp(0.4)}>
                  <p className="text-sm font-bold text-white">Bremsenservice</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Prüfung, Beläge, Scheiben &amp; Bremsflüssigkeit</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Warnsignale ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Warnsignale</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-6 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Wann sollten Bremsen geprüft werden?</motion.h2>
            <motion.p className="text-base leading-relaxed mb-14 max-w-2xl" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
              <strong>Achten Sie auf Geräusche, ein verändertes Bremsverhalten, Vibrationen, Warnanzeigen und sichtbaren Verschleiß.</strong> Eine zuverlässige Beurteilung ist jedoch nur durch eine Prüfung vor Ort möglich - aus der Ferne lässt sich der Zustand der Bremsanlage nicht sicher einschätzen.
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

        {/* ── Beläge vs Scheiben + Quietschen ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Bremsbeläge &amp; Bremsscheiben</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Was ist der Unterschied?</motion.h2>
                <motion.p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <strong>Bremsbeläge sind die Verschleißteile, die auf die Bremsscheibe drücken und dadurch das Fahrzeug abbremsen.</strong> Sie nutzen sich mit jeder Bremsung ab und müssen regelmäßig ersetzt werden.
                </motion.p>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.2)}>
                  Bremsscheiben nutzen sich langsamer ab, können aber ebenfalls verschleißen, sich verziehen oder Riefen bekommen - insbesondere wenn sie zu lange mit stark abgenutzten Belägen betrieben wurden. Deshalb prüfen wir bei jedem Bremsenservice beide Komponenten gemeinsam.
                </motion.p>
              </div>
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Häufige Frage</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Warum können Bremsen quietschen?</motion.h2>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <strong>Quietschen bedeutet nicht automatisch, dass die Bremsen verschlissen sind.</strong> Mögliche Ursachen sind Feuchtigkeit oder Rost nach längerem Stillstand, feiner Bremsstaub, eingebaute Verschleißanzeiger, die bewusst ein Warngeräusch erzeugen, oder tatsächlich abgenutzte Beläge. Eine Prüfung schafft Klarheit, welche Ursache bei Ihrem Fahrzeug vorliegt.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ablauf ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Ablauf</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Wie läuft ein Bremsenservice ab?</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {[
                { step: "01", title: "Sichtprüfung & Messung", desc: "Wir prüfen Beläge, Scheiben, Bremsschläuche und Bremsflüssigkeit und messen die Restdicke der Verschleißteile." },
                { step: "02", title: "Befund & Kostenvoranschlag", desc: "Sie erhalten eine klare Einschätzung, welche Komponenten betroffen sind - inklusive Kostenvoranschlag vor Beginn der Arbeit." },
                { step: "03", title: "Austausch & Probefahrt", desc: "Nach Ihrer Freigabe tauschen wir die betroffenen Teile fachgerecht aus und prüfen die Bremswirkung bei einer Probefahrt." },
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
                <h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)" }}>Was kostet ein Bremsenwechsel?</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <strong style={{ color: "#ffffff" }}>Die Kosten eines Bremsenwechsels hängen vor allem vom Fahrzeug, der betroffenen Achse und davon ab, ob nur Bremsbeläge oder zusätzlich Bremsscheiben ersetzt werden müssen.</strong> Für einen konkreten Preis benötigen wir Ihr Fahrzeug bzw. die passende Teilekombination - wir erstellen Ihnen dazu gerne einen Kostenvoranschlag.
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
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Bremsenservice direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              Als Meisterbetrieb in der Haldenhaustraße prüfen und reparieren wir Ihre Bremsanlage vor Ort in Reutlingen. Rufen Sie an oder buchen Sie online - wir finden zeitnah einen Termin.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zum Bremsenservice</motion.h2>
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
                Mehr Warnsignale im Detail: <Link href="/blog/bremsen-pruefen-wechseln" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>Bremsen prüfen - Warnsignale im Ratgeber</Link>
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
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Sicherheit geht vor - Bremsen jetzt prüfen lassen.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Rufen Sie an oder buchen Sie direkt online. Wir finden schnell einen Termin.</p>
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 shrink-0" {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Bremsen prüfen lassen
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
