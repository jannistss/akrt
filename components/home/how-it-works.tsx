const steps = [
  {
    number: "01",
    title: "Kontakt aufnehmen",
    text: "Schreib uns per WhatsApp, ruf direkt an oder nutz das Formular. Wir melden uns schnell bei dir zurück.",
  },
  {
    number: "02",
    title: "Fahrzeug prüfen lassen",
    text: "Wir schauen uns dein Fahrzeug genau an und sagen dir offen, was gemacht werden sollte – und was nicht.",
  },
  {
    number: "03",
    title: "Wieder sicher losfahren",
    text: "Sobald alles erledigt ist, bekommst du Bescheid und kannst dein Auto mit gutem Gefühl wieder abholen.",
  },
];

export function HowItWorks() {
  return (
    <section className="font-sans" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14 max-w-xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-balance"
            style={{ color: "#000608" }}
          >
            So einfach geht&apos;s
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "#4c5052" }}>
            Von der ersten Anfrage bis zur Abholung: Wir halten den Ablauf klar, schnell und
            angenehm für dich.
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col divide-y" style={{ borderColor: "#f2f2f2" }}>
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 py-8 first:pt-0 last:pb-0">
              <div
                className="text-4xl font-black shrink-0 w-14 leading-none select-none"
                style={{ color: "#cce3ec" }}
              >
                {step.number}
              </div>
              <div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: "#000608" }}
                >
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
    </section>
  );
}
