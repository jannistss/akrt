import Image from "next/image";

const points = [
  {
    number: "01",
    title: "Transparent von Anfang an",
    text: "Du weißt vorab, was auf dich zukommt – bei Aufwand, Preis und Zeitaufwand. Keine versteckten Kosten, kein Fachchinesisch.",
  },
  {
    number: "02",
    title: "Schnell & direkt erreichbar",
    text: "Kurze Wege, direkte Ansprechpartner und Termine, die in deinen Alltag passen. Per WhatsApp, Telefon oder online.",
  },
  {
    number: "03",
    title: "Meisterqualität garantiert",
    text: "Wir arbeiten sorgfältig, mit moderner Diagnosetechnik und so, dass dein Fahrzeug sicher wieder auf die Straße kommt.",
  },
  {
    number: "04",
    title: "Deine Werkstatt vor Ort",
    text: "Autoklinik Reutlingen ist keine anonyme Kette – wir kennen unsere Kunden und sind für dich persönlich da.",
  },
];

export function WhySection() {
  return (
    <section style={{ backgroundColor: "#f5f9fc" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 460 }}>
            <Image
              src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
              alt="Mechaniker bei der Arbeit in der Autoklinik Reutlingen."
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating badge */}
            <div
              className="absolute bottom-6 left-6 rounded-xl px-5 py-4"
              style={{ backgroundColor: "rgba(0,14,22,0.82)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>Seit über 15 Jahren</p>
              <p className="text-sm font-bold" style={{ color: "#ffffff" }}>Vertrauenspartner in Reutlingen</p>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#0074a2" }}>
              Warum Autoklinik?
            </p>
            <h2
              className="font-bold tracking-tight leading-[1.1] text-balance mb-6"
              style={{ color: "#002e40", fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
            >
              Weil du eine Werkstatt brauchst, die ehrlich arbeitet.
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "#4a6272" }}>
              Wir erklären dir klar, was gemacht werden muss, was sinnvoll ist und was noch warten kann. Ohne Druck, ohne versteckte Überraschungen.
            </p>

            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #d5e8f0" }}>
              {points.map((point) => (
                <div
                  key={point.number}
                  className="flex gap-6 py-6"
                  style={{ borderBottom: "1px solid #d5e8f0" }}
                >
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5 tabular-nums"
                    style={{ color: "#0074a2", minWidth: 28 }}
                  >
                    {point.number}
                  </span>
                  <div>
                    <p className="text-sm font-bold mb-1" style={{ color: "#002e40" }}>
                      {point.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
