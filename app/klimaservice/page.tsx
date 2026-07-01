import Link from "next/link";
import Image from "next/image";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { ContactSection } from "@/components/contact-section";

export const metadata = {
  title: "Klimaservice in Reutlingen | Autoklinik Reutlingen",
  description:
    "Klimaservice in Reutlingen: Klima-Check, Wartung, Desinfektion und Kältemittel-Service für dein Auto.",
};

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10A5 5 0 0012 7z" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: "Klima-Check",
    description:
      "Wir prüfen Kühlleistung, Druck und Gesamtzustand, damit du schnell weißt, was Sache ist.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9.5 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-4.5" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M20 3l-9 9M15 3h5v5" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Desinfektion",
    description:
      "Wir entfernen Gerüche, Bakterien und Ablagerungen, damit die Luft im Auto wieder frisch ist.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3l-7.4 7.4M9 17l-2 .5.5-2 9.2-9.2a2 2 0 012.8 2.8L9 17z" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Wartung und Service",
    description:
      "Vom Kältemittel-Service bis zum Tausch von Filtern und Verschleißteilen erledigen wir alles aus einer Hand.",
  },
];

const benefits = [
  "Bessere Kühlleistung an warmen Tagen",
  "Weniger Gerüche und saubere Luft im Innenraum",
  "Frühes Erkennen von Undichtigkeiten und Defekten",
  "Mehr Werterhalt für dein Fahrzeug",
];

const steps = [
  { title: "Termin anfragen", description: "Du meldest dich kurz bei uns und wir finden schnell einen passenden Termin." },
  { title: "Anlage prüfen lassen", description: "Wir checken das System, erklären dir den Zustand und sagen dir klar, was sinnvoll ist." },
  { title: "Wieder entspannt fahren", description: "Nach dem Service läuft deine Klimaanlage wieder so, wie sie soll." },
];

const faqs = [
  {
    question: "Wie oft sollte die Klimaanlage geprüft werden?",
    answer:
      "Am besten regelmäßig, vor allem vor dem Sommer oder wenn die Kühlleistung nachlässt. So lassen sich kleinere Probleme früh erkennen, bevor größere Schäden entstehen.",
  },
  {
    question: "Woran merke ich, dass ein Klimaservice sinnvoll ist?",
    answer:
      "Wenn die Luft nicht mehr richtig kalt wird, unangenehme Gerüche auftreten oder die Scheiben schlechter entfeuchten, ist ein Check meist sinnvoll.",
  },
  {
    question: "Wie lange dauert ein Klimaservice?",
    answer:
      "Das hängt vom Zustand der Anlage ab. Viele Arbeiten sind schnell erledigt – bei Defekten oder Undichtigkeiten erklären wir dir transparent die nächsten Schritte.",
  },
];

export default function KlimaservicePage() {
  return (
    <>
      <AutoklinikNavbar />
      <main className="font-sans">

        {/* Hero */}
        <header className="relative overflow-hidden" style={{ backgroundColor: "#0d1b2a", minHeight: 480 }}>
          <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4aadce" }}>
                Klimaservice
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-balance mb-5" style={{ color: "#fff" }}>
                Klimaservice in Reutlingen. Kalt, sauber und schnell erledigt.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.76)" }}>
                Ob Klima-Check, Wartung, Desinfektion oder Kältemittel-Service: Wir sorgen dafür, dass deine Klimaanlage zuverlässig läuft und du entspannt unterwegs bist.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/terminbuchung" className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#0074a2" }}>
                  Termin online buchen
                </Link>
                <a href="tel:+4971211452619" className="rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
                  Klimaservice anfragen
                </a>
              </div>
            </div>
            <div className="hidden lg:block flex-none" style={{ maxWidth: 360 }}>
              <Image
                src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                alt="Mechaniker in blauer Arbeitskleidung"
                width={360}
                height={420}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </header>

        {/* Services */}
        <section className="py-20" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ color: "#0d1b2a" }}>
                Klimaservice
              </h2>
              <p className="text-base font-semibold mb-2" style={{ color: "#0d1b2a" }}>
                Saubere Luft, starke Leistung und eine Klimaanlage, die zuverlässig funktioniert.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                Wenn deine Klimaanlage schwächer kühlt, unangenehm riecht oder länger nicht geprüft wurde, kümmern wir uns schnell und transparent darum. Direkt in Reutlingen, ohne Werkstatt-Blabla.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="rounded-2xl p-7" style={{ backgroundColor: "#f4f8fb", border: "1px solid #e4edf3" }}>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "#e5f1f5" }}>
                    {s.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#0d1b2a" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="py-20" style={{ backgroundColor: "#f4f8fb" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ color: "#0d1b2a" }}>
                Warum sich Klimaservice lohnt
              </h2>
              <p className="text-sm font-semibold mb-3" style={{ color: "#0d1b2a" }}>Mehr Komfort, weniger Folgeschäden.</p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#4a6070" }}>
                Eine vernachlässigte Klimaanlage kühlt oft schlechter, riecht unangenehm und kann teure Schäden nach sich ziehen. Mit regelmäßigem Service bleibt dein System effizient und zuverlässig.
              </p>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm" style={{ color: "#0d1b2a" }}>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e5f1f5" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5l2 2 4-4" stroke="#0074a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 rounded-2xl p-8" style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Schnell geprüft. Fair erklärt. Sauber erledigt.</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                Bei uns bekommst du keine unnötigen Extras, sondern eine ehrliche Einschätzung und genau den Service, den deine Klimaanlage wirklich braucht.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center" style={{ color: "#0d1b2a" }}>
              Klimaservice ohne Umwege.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ backgroundColor: "#0074a2" }}>
                    {i + 1}
                  </div>
                  <h3 className="text-base font-bold" style={{ color: "#0d1b2a" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16" style={{ backgroundColor: "#0d1b2a" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-white text-balance">
              Dann lass deine Klimaanlage jetzt prüfen.
            </h2>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href="tel:+4971211452619" className="rounded-xl border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
                Klimaservice anfragen
              </a>
              <Link href="/terminbuchung" className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#0074a2" }}>
                Termin online buchen
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" style={{ backgroundColor: "#f4f8fb" }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ color: "#0d1b2a" }}>
              Wichtige Antworten rund um deinen Klimaservice.
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl p-6 cursor-pointer"
                  style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}
                >
                  <summary className="flex items-center justify-between gap-4 text-sm font-semibold list-none" style={{ color: "#0d1b2a" }}>
                    {faq.question}
                    <svg className="shrink-0 transition-transform group-open:rotate-180" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="#0074a2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4a6070" }}>{faq.answer}</p>
                </details>
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
