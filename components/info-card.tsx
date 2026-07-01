import Link from "next/link";

const openingHours = [
  { day: "Mo.", hours: "8 Uhr bis 18 Uhr" },
  { day: "Di.", hours: "8 Uhr bis 18 Uhr" },
  { day: "Mi.", hours: "8 Uhr bis 18 Uhr" },
  { day: "Do.", hours: "8 Uhr bis 18 Uhr" },
  { day: "Fr.", hours: "8 Uhr bis 18 Uhr" },
  { day: "Sa.", hours: "nach Terminvereinbarung" },
];

export function InfoCard() {
  return (
    <section className="font-sans" style={{ backgroundColor: "#e5f1f5" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#002e40" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x"
            style={{ borderColor: "rgba(255,255,255,0.10)" }}
          >
            {/* Opening hours */}
            <div className="p-8">
              <h3
                className="text-sm font-bold mb-4 uppercase tracking-wide"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Öffnungszeiten
              </h3>
              <ul className="flex flex-col gap-1.5">
                {openingHours.map(({ day, hours }) => (
                  <li key={day} className="flex justify-between text-sm gap-4">
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {day}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.72)" }}>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact data */}
            <div className="p-8">
              <h3
                className="text-sm font-bold mb-4 uppercase tracking-wide"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Kontaktdaten
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:info@autoklinik-reutlingen.de"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    info@autoklinik-reutlingen.de
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+497121 14526199"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    07121 14526199
                  </a>
                </li>
                <li className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Haldenhaustraße 3<br />72770 Reutlingen
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="p-8 flex flex-col justify-between gap-6">
              <div>
                <h3
                  className="text-sm font-bold mb-2 uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Jetzt buchen
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Buche deinen Termin direkt online oder frag einen Rückruf an.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/terminbuchung"
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-center text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0074a2" }}
                >
                  Termin online buchen
                </Link>
                <Link
                  href="#kontakt"
                  className="rounded-xl border px-5 py-3 text-sm font-semibold text-center transition-colors hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff" }}
                >
                  Rückruf anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
