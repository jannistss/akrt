import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";
import { WorkshopServices } from "@/components/workshop-services";

export const metadata: Metadata = {
  title: "Unfallservice & Kfz-Gutachten in Reutlingen | Autoklinik Reutlingen",
  description:
    "Unfall in Reutlingen? Gutachten und Reparatur aus einer Hand — unabhängiger Sachverständiger im Haus, kostenlos bei Fremdverschulden. Jetzt Termin online buchen.",
  keywords: [
    "Unfallservice Reutlingen",
    "Kfz Gutachten Reutlingen",
    "Unfallreparatur Reutlingen",
    "Unfallschaden Reutlingen",
    "Kfz Sachverständiger Reutlingen",
    "Autoklinik Reutlingen",
  ],
  openGraph: {
    title: "Unfallservice & Kfz-Gutachten in Reutlingen | Autoklinik Reutlingen",
    description: "Gutachten und Reparatur an einem Ort — kostenlos bei Fremdverschulden. Unabhängiger Sachverständiger im Haus.",
    url: "https://autoklinik-reutlingen.de/unfall",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/unfall" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Autoklinik Reutlingen",
  url: "https://autoklinik-reutlingen.de",
  telephone: "+4971219880800",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Schillerstraße 22",
    addressLocality: "Reutlingen",
    postalCode: "72764",
    addressRegion: "BW",
    addressCountry: "DE",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Unfallservice",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kfz-Gutachten (unabhängig)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Unfallreparatur & Karosserie" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lackierung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Versicherungsabwicklung" } },
    ],
  },
};

const highlights = [
  "Kostenlos bei Fremdverschulden",
  "Unabhängiger Gutachter im Haus",
  "Alle Marken",
  "Meisterbetrieb",
  "Versicherungsabwicklung",
  "TÜV in 48 Stunden",
];

const faqs = [
  {
    q: "Was muss ich nach einem Unfall sofort tun?",
    a: "Unfallstelle absichern, Polizei rufen (wenn nötig), Fotos machen, Personalien tauschen — und dann uns kontaktieren. Wir begleiten Sie durch den Rest.",
  },
  {
    q: "Kostet das Gutachten mich etwas?",
    a: "Bei Fremdverschulden trägt die gegnerische Haftpflichtversicherung die Kosten für das Gutachten vollständig. Sie zahlen nichts.",
  },
  {
    q: "Muss ich zur Vertragswerkstatt meines Fahrzeugherstellers?",
    a: "Nein. Als Geschädigter haben Sie das Recht, eine freie Fachwerkstatt zu wählen. Die Versicherung muss die Reparaturkosten erstatten — auch bei uns.",
  },
  {
    q: "Wie lange dauert die Unfallreparatur?",
    a: "Das hängt vom Schadensumfang ab. Wir schätzen die Zeit bei der Begutachtung ein und halten Sie laufend auf dem Laufenden — ohne böse Überraschungen.",
  },
  {
    q: "Bekomme ich einen Ersatzwagen?",
    a: "Bei Fremdverschulden haben Sie in der Regel Anspruch auf Nutzungsausfall oder einen Mietwagen — wir helfen Ihnen, das korrekt gegenüber der Versicherung geltend zu machen.",
  },
];

export default function UnfallPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoklinikNavbar />
      <main>
        {/* ── Hero — urgent, confident ── */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <Link
                  href="/#leistungen"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity"
                  style={{ color: "#4db8d8" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Alle Leistungen
                </Link>
                <h1
                  className="font-bold tracking-tight leading-[1.08] text-balance mb-6"
                  style={{ color: "#ffffff", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
                >
                  Unfall gehabt?<br />
                  <span style={{ color: "#4db8d8" }}>Gutachten & Reparatur</span><br />
                  aus einer Hand.
                </h1>
                <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Unabhängiger Kfz-Sachverständiger direkt im Haus — kein Umweg, kein Doppeltermin. Wir erledigen Gutachten, Reparatur und Versicherungsabwicklung komplett für Sie.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#0074a2" }}
                  >
                    Jetzt Termin buchen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+4971219880800"
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                  >
                    07121 9880800
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {highlights.map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative w-full lg:w-[440px] rounded-2xl overflow-hidden shrink-0" style={{ height: 460 }}>
                <Image
                  src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
                  alt="Kfz-Sachverständiger begutachtet Unfallschaden in der Autoklinik Reutlingen"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,20,32,0.65) 100%)" }} />
                <div
                  className="absolute bottom-6 left-6 rounded-xl px-5 py-4"
                  style={{ backgroundColor: "rgba(0,46,64,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(77,184,216,0.25)" }}
                >
                  <p className="text-sm font-bold text-white">Kostenlos bei Fremdverschulden</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Gutachten & Reparatur — Sie zahlen nichts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Autoklinik for accidents ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Der Unterschied</p>
                <h2 className="font-bold tracking-tight leading-[1.1] text-balance mb-6" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
                  Normalerweise fangen nach dem Unfall die Probleme erst an.
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a6272" }}>
                  Polizei, Versicherung, Gutachter suchen, Termin beim Gutachter, Fahrzeug hinfahren, Gutachten warten, dann Werkstatt suchen — das kostet Nerven, Zeit und manchmal auch Geld, wenn man die falschen Entscheidungen trifft.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                  In der Autoklinik Reutlingen ist das anders: Unser zertifizierter Kfz-Sachverständiger sitzt direkt im Haus. Sie kommen einmal zu uns — und gehen mit einem fertigen Gutachten und einem Reparaturauftrag. Wir übernehmen die komplette Versicherungsabwicklung.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { title: "Unabhängiger Sachverständiger im Haus", text: "Kein Umweg, kein zweiter Termin. Das Gutachten entsteht direkt bei uns — vollständig und versicherungskonform." },
                  { title: "Reparaturkostenermittlung", text: "Vollständige Dokumentation aller Schäden, Wertminderungsberechnung und Nutzungsausfallentschädigung." },
                  { title: "Direktabrechnung mit der Versicherung", text: "Wir kommunizieren direkt mit der Haftpflichtversicherung des Unfallgegners — Sie müssen sich um nichts kümmern." },
                  { title: "Karosserie, Lack & Technik", text: "Als Meisterbetrieb reparieren wir alles fachgerecht — Karosserieschäden, Lackarbeiten und mechanische Folgeschäden." },
                ].map((p) => (
                  <div key={p.title} className="flex gap-5 p-5 rounded-xl" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }}>
                    <div className="h-6 w-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "#0074a2" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-1" style={{ color: "#002e40" }}>{p.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>Ablauf</p>
            <h2 className="font-bold tracking-tight mb-14 text-balance" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              So einfach geht es
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#d5e8f0" }}>
              {[
                { step: "01", title: "Termin vereinbaren", desc: "Rufen Sie an, schreiben Sie oder buchen Sie online. Wir finden innerhalb von 24 Stunden einen Termin für Sie." },
                { step: "02", title: "Gutachten & Befund", desc: "Unser Sachverständiger prüft und dokumentiert alle Schäden direkt vor Ort — vollständig und unabhängig." },
                { step: "03", title: "Reparatur & fertig", desc: "Wir reparieren fachgerecht und rechnen mit der Versicherung ab. Sie holen Ihr Fahrzeug wie neu ab." },
              ].map((s) => (
                <div key={s.step} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-5xl font-bold tabular-nums" style={{ color: "#e8f4fa" }}>{s.step}</span>
                  <h3 className="text-base font-bold" style={{ color: "#002e40" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Workshop services component ── */}
        <WorkshopServices />

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>FAQ</p>
            <h2 className="font-bold tracking-tight mb-12" style={{ color: "#002e40", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}>
              Häufige Fragen nach einem Unfall
            </h2>
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #d5e8f0" }}>
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-6" style={{ borderBottom: "1px solid #d5e8f0" }}>
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="text-base font-semibold" style={{ color: "#002e40" }}>{faq.q}</span>
                    <span className="shrink-0 text-[#0074a2]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-45">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Other services ── */}
        <section style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <p className="text-sm font-semibold mb-8" style={{ color: "#4a6272" }}>Weitere Leistungen der Autoklinik</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Inspektion & Wartung", href: "/inspektion" },
                { name: "TÜV & AU", href: "/tuev-au" },
                { name: "Reifenservice", href: "/reifenservice" },
                { name: "Glasservice", href: "/glasservice" },
                { name: "Klimaservice", href: "/klimaservice" },
                { name: "Flottenbetreuung", href: "/flottenbetreuung" },
              ].map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
                  style={{ borderColor: "#c5dde8", color: "#002e40" }}
                >
                  {s.name}
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <AutoklinikFooter />
    </>
  );
}
