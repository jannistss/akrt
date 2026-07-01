import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Kontakt aufnehmen",
    text: "Schreib uns per WhatsApp, ruf direkt an oder nutz das Online-Formular. Wir melden uns schnell bei dir zurück.",
  },
  {
    number: "02",
    title: "Fahrzeug prüfen lassen",
    text: "Wir schauen uns dein Fahrzeug genau an und sagen dir offen, was gemacht werden sollte – und was warten kann.",
  },
  {
    number: "03",
    title: "Wieder sicher losfahren",
    text: "Sobald alles erledigt ist, bekommst du Bescheid. Du holst dein Auto ab – mit gutem Gefühl und klarer Rechnung.",
  },
];

export function HowItWorks() {
  return (
    <section style={{ backgroundColor: "#001824" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div className="lg:sticky" style={{ top: "8rem" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#0074a2" }}>
              So funktioniert&apos;s
            </p>
            <h2
              className="font-bold tracking-tight leading-[1.1] text-balance mb-6"
              style={{ color: "#ffffff", fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
            >
              In drei Schritten zu deiner reparierten Kiste.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#4c5052" }}>
              Von der ersten Anfrage bis zur Abholung: Wir halten den Ablauf klar, schnell und angenehm für dich.
            </p>
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
          </div>

          {/* Right — steps */}
          <div           className="flex flex-col gap-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex gap-8 py-10"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums"
                  style={{
                    backgroundColor: i === 0 ? "#0074a2" : "transparent",
                    border: i === 0 ? "none" : "1.5px solid rgba(0,116,162,0.25)",
                    color: i === 0 ? "#ffffff" : "#0074a2",
                  }}
                >
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="text-base font-bold mb-2" style={{ color: "#ffffff" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4c5052" }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
