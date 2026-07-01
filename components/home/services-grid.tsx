import Link from "next/link";

const services = [
  {
    title: "Reparatur",
    description: "Wir finden Fehler schnell und reparieren so, dass du dich wieder auf dein Auto verlassen kannst.",
    href: "/unfall",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3L17.7 9.3M7 17l2.6-.5 8.8-8.8a1.414 1.414 0 0 0-2-2l-8.8 8.8L7 17z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Inspektion & Wartung",
    description: "Wartung nach Herstellervorgaben, damit dein Fahrzeug fit bleibt und teure Folgeschäden gar nicht erst entstehen.",
    href: "/klimaservice",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 3v4M18 3v4M4 9h16M5 6h14a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "TÜV & AU",
    description: "Wir bereiten dein Auto vor und begleiten die Prüfung – damit du entspannt durchkommst.",
    href: "/terminbuchung",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 4v5c0 4.5-3 7-7 9-4-2-7-4.5-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.5 12l1.7 1.7L14.8 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Reifenservice",
    description: "Reifenwechsel, Prüfung und Beratung für sicheren Grip – passend zu Saison, Fahrstil und Budget.",
    href: "/terminbuchung",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="7" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5 17H3V13l2-4h9l3 4h2a2 2 0 0 1 2 2v2h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Unfallservice",
    description: "Von der Schadensaufnahme bis zur Instandsetzung – schnelle Hilfe und klare Kommunikation.",
    href: "/unfall",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Flottenservice",
    description: "Planbare Abläufe, kurze Standzeiten und ein verlässlicher Partner für deine Firmenfahrzeuge.",
    href: "/flottenbetreuung",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="6" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="15" y="4" width="6" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="9" y="10" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section id="leistungen" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>
              Leistungen
            </p>
            <h2
              className="font-bold tracking-tight text-balance"
              style={{ color: "#002e40", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Alles aus einer Hand —<br />
              sauber, schnell, ehrlich.
            </h2>
          </div>
          <Link
            href="/terminbuchung"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "#0074a2" }}
          >
            Termin buchen
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#e5eef3" }}>
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col gap-5 p-8 transition-colors hover:bg-blue-50"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}
              >
                {service.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2" style={{ color: "#002e40" }}>
                  {service.title}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
