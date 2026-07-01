import Link from "next/link";

const services = [
  {
    title: "Reparatur",
    description:
      "Wir finden Fehler schnell und reparieren so, dass du dich wieder auf dein Auto verlassen kannst.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14.7 6.3L17.7 9.3M7 17l2.6-.5 8.8-8.8a1.414 1.414 0 0 0-2-2l-8.8 8.8L7 17z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Inspektion",
    description:
      "Wartung nach Herstellervorgaben, damit dein Fahrzeug fit bleibt und teure Folgeschäden gar nicht erst entstehen.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 3v4M18 3v4M4 9h16M5 6h14a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "TÜV und AU",
    description:
      "Wir bereiten dein Auto vor und begleiten die Prüfung, damit du Zeit sparst und entspannter durchkommst.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l7 4v5c0 4.5-3 7-7 9-4-2-7-4.5-7-9V7l7-4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12l1.7 1.7L14.8 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Reifenservice",
    description:
      "Reifenwechsel, Prüfung und Beratung für sicheren Grip – passend zu Saison, Fahrstil und Budget.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="7" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5 17H3V13l2-4h9l3 4h2a2 2 0 0 1 2 2v2h-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Unfallservice",
    description:
      "Von der Schadensaufnahme bis zur Instandsetzung bekommst du schnelle Hilfe und klare Kommunikation.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 14l4-4 3 3 5-5 2 2-7 7-3-3-2 2-2-2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Flottenservice",
    description:
      "Planbare Abläufe, kurze Standzeiten und ein verlässlicher Partner für deine Firmenfahrzeuge.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="6" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="15" y="4" width="6" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="9" y="10" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section id="leistungen" className="font-sans" style={{ backgroundColor: "#e5f1f5" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#0074a2" }}
          >
            Leistungen
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-balance max-w-lg"
            style={{ color: "#000608" }}
          >
            Alles, was dein Auto braucht – an einem Ort.
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-xl" style={{ color: "#4c5052" }}>
            Von Reparatur bis Unfallservice: Wir arbeiten schnell, sauber und so, dass du
            jederzeit weißt, was gemacht wird.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid rgba(0,116,162,0.12)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#e5f1f5", color: "#0074a2" }}
              >
                {service.icon}
              </div>
              <div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: "#000608" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4c5052" }}>
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
