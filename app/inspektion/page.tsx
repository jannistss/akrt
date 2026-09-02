"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, fadeIn, slideLeft, slideRight, scaleUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Inspektion & Wartung",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kleiner Ölwechsel & Filtercheck" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Große Inspektion nach Herstellervorgabe" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zahnriemen- und Zahnkettenwechsel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bremsflüssigkeitswechsel" } },
    ],
  },
};

const services = [
  { title: "Ölwechsel & Filterwechsel", desc: "Motor-, Luft-, Pollen- und Kraftstofffilter - alles nach Herstellervorgabe ausgetauscht. Nur geprüfte Markenöle." },
  { title: "Große Inspektion", desc: "Komplette Durchsicht nach Herstellerspezifikation: über 50 Prüfpunkte, Sichtprüfung Fahrwerk, Bremsen, Lichter." },
  { title: "Zahnriemen & Zahnkette", desc: "Fristgerechter Wechsel verhindert Totalschäden. Wir prüfen Intervall und Zustand und beraten ehrlich." },
  { title: "Bremsflüssigkeit", desc: "Feuchtigkeitsgehalt messen, bei Bedarf vollständig wechseln - für sichere Bremskraft bei jedem Wetter." },
  { title: "Kühlflüssigkeit & Frostschutz", desc: "Konzentration prüfen, System spülen und neu befüllen. Schutz für den Motor das ganze Jahr." },
  { title: "Service-Intervall-Reset", desc: "Rücksetzung des Servicezählers im Bordcomputer nach jeder Inspektion - alle gängigen Fahrzeuge." },
];

const whyPoints = [
  { title: "Kein Markenzwang", text: "Wir bedienen alle Marken mit Originalteilen oder gleichwertigen Alternativen - keine teure Vertragsbindung." },
  { title: "Transparente Preise", text: "Vor jeder Arbeit nennen wir Ihnen den genauen Preis. Kein Nachschlag, keine Überraschungen auf der Rechnung." },
  { title: "Garantie bleibt erhalten", text: "Durch EU-Recht dürfen freie Werkstätten herstellerkonforme Inspektionen durchführen, ohne die Garantie zu gefährden." },
  { title: "Kurze Wartezeiten", text: "Online-Terminbuchung rund um die Uhr - oft Termin innerhalb von 48 Stunden verfügbar." },
];

const faqs = [
  { q: "Wie oft muss ich mein Auto inspizieren lassen?", a: "Die meisten Hersteller empfehlen eine Inspektion alle 12 Monate oder alle 15.000–30.000 km - je nachdem, was zuerst erreicht wird. Ihr Serviceheft oder Bordcomputer zeigt den genauen Intervall." },
  { q: "Verliere ich meine Garantie, wenn ich nicht zur Vertragswerkstatt gehe?", a: "Nein. Seit dem EU-Gruppenfreistellungsgesetz (GVO) dürfen Sie jeden qualifizierten Fachbetrieb für Garantiearbeiten und Inspektionen nutzen - die Garantie bleibt erhalten, solange Original- oder gleichwertige Teile verbaut werden." },
  { q: "Was kostet eine Inspektion bei der Autoklinik?", a: "Der Preis hängt vom Fahrzeug, Motoröl und Umfang ab. Wir nennen Ihnen vor der Arbeit immer einen verbindlichen Festpreis - keine versteckten Nachträge." },
  { q: "Kann ich während der Inspektion warten?", a: "Ja. Für Wartungsarbeiten können Sie in unserem Wartebereich bleiben. Bei umfangreicheren Arbeiten holen wir Sie gerne mit einem Kostenvoranschlag ab." },
  { q: "Wie lange dauert eine Inspektion?", a: "Eine kleine Inspektion (Ölwechsel + Filtercheck) dauert ca. 1 Stunde. Die große Inspektion je nach Fahrzeug 2–3 Stunden." },
  { q: "Was passiert, wenn ich die Inspektion überziehe?", a: "Eine überzogene Inspektion kann dazu führen, dass Verschleiß später erkannt wird und sich Folgeschäden entwickeln. Bei einigen Herstellern kann ein deutlich überzogenes Intervall zudem Auswirkungen auf Garantieansprüche haben - im Zweifel lohnt sich ein zeitnaher Termin." },
  { q: "Darf eine freie Werkstatt eine Inspektion durchführen?", a: "Ja. Seit dem EU-Gruppenfreistellungsgesetz dürfen freie Werkstätten wie die Autoklinik herstellerkonforme Inspektionen durchführen, ohne dass dadurch die Herstellergarantie erlischt - solange Original- oder gleichwertige Teile verwendet werden." },
  { q: "Was ist der Unterschied zwischen kleiner und großer Inspektion?", a: "Die kleine Inspektion umfasst im Kern Ölwechsel und Filtercheck sowie eine Sichtprüfung wichtiger Verschleißteile. Die große Inspektion geht darüber hinaus und prüft nach Herstellervorgabe zusätzlich Bremsen, Fahrwerk, Zündkerzen, Kühl- und Bremsflüssigkeit sowie weitere Komponenten - der genaue Umfang richtet sich nach Fahrzeug und Serviceplan." },
  { q: "Wird mein Serviceheft bei der Inspektion gepflegt?", a: "Ja, wir tragen die durchgeführte Inspektion in Ihr Serviceheft bzw. digitales Scheckheft ein und setzen den Service-Intervallzähler im Bordcomputer zurück." },
];

const related = [
  { name: "Bremsenservice", href: "/bremsen-reutlingen" },
  { name: "Motordiagnose", href: "/motordiagnose-reutlingen" },
  { name: "Ölwechsel", href: "/oelwechsel-reutlingen" },
  { name: "Getriebespülung", href: "/getriebespuelung-reutlingen" },
  { name: "Achsvermessung", href: "/achsvermessung-reutlingen" },
  { name: "TÜV & AU", href: "/tuev-au" },
  { name: "Reifenservice", href: "/reifenservice" },
  { name: "Glasservice", href: "/glasservice" },
  { name: "Klimaservice", href: "/klimaservice" },
  { name: "Unfallservice", href: "/unfall" },
  { name: "Flottenbetreuung", href: "/flottenbetreuung" },
  { name: "Hagelschaden", href: "/hagelschaden" },
  { name: "Kfz-Gutachter", href: "/kfz-gutachter" },
  { name: "Autoaufbereitung", href: "/autoaufbereitung-reutlingen" },
];

export default function InspektionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceSchema
        name="Inspektion & Wartung Reutlingen"
        description="Fahrzeuginspektion und Wartung nach Herstellervorgabe - Ölwechsel, Filterwechsel, Zahnriemen, Bremsflüssigkeit und mehr für alle Fahrzeugmarken in Reutlingen."
        url="/inspektion"
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
                  items={[{ name: "Startseite", url: "/" }, { name: "Inspektion & Wartung", url: "/inspektion" }]}
                />
                <motion.div {...fadeUp(0)}>
                  <Link href="/#leistungen" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity" style={{ color: "#4db8d8" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Alle Leistungen
                  </Link>
                </motion.div>
                <motion.h1 className="font-bold tracking-tight leading-[1.08] text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }} {...fadeUp(0.1)}>
                  Inspektion &amp; Wartung<br /><span style={{ color: "#4db8d8" }}>in Reutlingen</span>
                </motion.h1>
                <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }} {...fadeUp(0.2)}>
                  <strong style={{ color: "#ffffff" }}>Die Autoklinik Reutlingen führt Inspektionen nach Herstellervorgabe für alle Fahrzeugmarken durch</strong> - der genaue Umfang richtet sich nach Fahrzeug, Alter und Laufleistung. Als freie Werkstatt dürfen wir das ohne Verlust Ihrer Herstellergarantie erledigen: transparent, termingerecht und mit Festpreis vor Arbeitsbeginn.
                </motion.p>
                <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
                  <Link href="/terminbuchung" className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                    Termin online buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a href={SITE.phone.href} className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>
                    {SITE.phone.display}
                  </a>
                </motion.div>
                <motion.div className="flex flex-wrap gap-3 mt-8" {...fadeUp(0.4)}>
                  {["Alle Marken", "Garantie bleibt erhalten", "Festpreis-Versprechen", "Termin in 48h"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 440 }} {...slideRight(0.2)}>
                <Image src="/assets/images/hero-inspektion.png" alt="Kfz-Mechaniker führt Inspektion am Fahrzeug durch in der Autoklinik Reutlingen" fill className="object-cover object-center" priority sizes="(max-width: 1024px) 100vw, 440px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,20,32,0.6) 100%)" }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Was wir machen</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Unser Inspektions-Leistungsumfang</motion.h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {services.map((s) => (
                <motion.div key={s.title} className="p-8" style={{ backgroundColor: "#ffffff" }} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-5" style={{ backgroundColor: "#e8f4fa" }}>
                    <Image src="/assets/images/6937e715063be152c1cb3309_icon-reperatur.png" alt="" width={22} height={22} className="object-contain" />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Kleine vs. große Inspektion ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Kleine Inspektion</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Was gehört zur kleinen Inspektion?</motion.h2>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <strong>Im Kern umfasst die kleine Inspektion den Ölwechsel inklusive Filterwechsel sowie eine Sichtprüfung wichtiger Verschleißteile</strong> - etwa Reifenzustand, Beleuchtung, Flüssigkeitsstände und sichtbare Undichtigkeiten. Sie eignet sich für die Wartung zwischen zwei großen Inspektionsterminen.
                </motion.p>
              </div>
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Große Inspektion</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-5" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }} {...fadeUp(0.1)}>Was gehört zur großen Inspektion?</motion.h2>
                <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.15)}>
                  <strong>Die große Inspektion umfasst zusätzlich alle Punkte, die der Hersteller für das jeweilige Serviceintervall vorschreibt</strong> - etwa Zündkerzen, Bremsflüssigkeit, Kühlflüssigkeit, Fahrwerkskomponenten und weitere Verschleißteile. Welche Punkte konkret anfallen, hängt vom Fahrzeugmodell und Kilometerstand ab und wird bei uns vorab transparent aufgelistet.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Autoklinik ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>Warum zu uns</motion.p>
                <motion.h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-8" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Freie Werkstatt - volle Herstellerkonformität.</motion.h2>
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
              <motion.div className="relative rounded-2xl overflow-hidden" style={{ height: 480 }} {...slideRight(0.15)}>
                <Image src="/assets/images/hero-tuev.png" alt="Werkstatt Autoklinik Reutlingen von innen" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Lokal ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
            <motion.h2 className="font-bold tracking-tight text-balance mb-4" style={{ color: "#002e40", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }} {...fadeUp(0)}>Inspektion direkt in Reutlingen</motion.h2>
            <motion.p className="text-sm leading-relaxed" style={{ color: "#4a6272" }} {...fadeUp(0.1)}>
              In unserer Werkstatt in der Haldenhaustraße führen wir Ihre Inspektion vor Ort in Reutlingen durch. Rufen Sie an oder buchen Sie online - wir finden zeitnah einen passenden Termin.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>FAQ</motion.p>
            <motion.h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }} {...fadeUp(0.1)}>Häufige Fragen zur Inspektion</motion.h2>
            <div style={{ borderTop: "1px solid #d5e8f0" }}>
              {faqs.map((faq, i) => (
                <motion.details key={faq.q} className="group py-6" style={{ borderBottom: "1px solid #d5e8f0" }} {...fadeUp(0.1 + i * 0.07)}>
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#002e40" }}>{faq.q}</span>
                    <span className="shrink-0 text-[#0074a2]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-45"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div {...slideLeft(0)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4db8d8" }}>Termin buchen</p>
                <h2 className="font-bold tracking-tight text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Jetzt Inspektionstermin vereinbaren.</h2>
                <p className="mt-3 text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>Online buchen oder anrufen - wir finden schnell einen passenden Termin für Ihr Fahrzeug.</p>
              </motion.div>
              <motion.div {...scaleUp(0.15)}>
                <Link href="/terminbuchung" className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "#0074a2" }}>
                  Termin online buchen
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
