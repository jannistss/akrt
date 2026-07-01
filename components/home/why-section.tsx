const points = [
  {
    title: "Transparent",
    text: "Du weißt vorab, was auf dich zukommt – bei Aufwand, Preis und Zeit.",
  },
  {
    title: "Schnell erreichbar",
    text: "Kurze Wege, direkte Ansprechpartner und Termine, die alltagstauglich bleiben.",
  },
  {
    title: "Saubere Qualität",
    text: "Wir arbeiten sorgfältig, modern und so, dass dein Auto sicher wieder auf die Straße kommt.",
  },
  {
    title: "Lokal verankert",
    text: "Autoklinik Reutlingen ist keine anonyme Kette, sondern deine Werkstatt vor Ort.",
  },
];

export function WhySection() {
  return (
    <section className="font-sans" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#0074a2" }}
            >
              Warum Autoklinik?
            </span>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-balance"
              style={{ color: "#000608" }}
            >
              Weil du eine Werkstatt brauchst, die ehrlich arbeitet.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#4c5052" }}>
              Wir erklären dir klar, was gemacht werden muss, was sinnvoll ist und was noch warten
              kann. Ohne Druck, ohne Fachchinesisch, ohne versteckte Überraschungen.
            </p>
          </div>

          {/* Right – points */}
          <div className="flex flex-col gap-5">
            {points.map((point) => (
              <div
                key={point.title}
                className="flex flex-col gap-1 border-l-2 pl-4"
                style={{ borderColor: "#0074a2" }}
              >
                <strong className="text-sm font-bold" style={{ color: "#000608" }}>
                  {point.title}
                </strong>
                <p className="text-sm leading-relaxed" style={{ color: "#4c5052" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
