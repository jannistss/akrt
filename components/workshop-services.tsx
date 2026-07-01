"use client";

import Link from "next/link";

const categories = [
  {
    title: "Reparatur & Instandsetzung",
    items: [
      "Motordiagnose & Reparatur",
      "Getriebeinstandsetzung",
      "Bremsenservice (Scheiben, Beläge, Flüssigkeit)",
      "Stoßdämpfer & Fahrwerk",
      "Auspuff & Abgasanlage",
      "Kupplungsservice",
      "Ölwechsel & Filterwechsel",
      "Unfallinstandsetzung",
      "Lackierarbeiten",
      "Dellendoktor",
      "Smart Repair",
    ],
  },
  {
    title: "Wartung & Inspektion",
    items: [
      "Jahresinspektion / HU-Vorbereitung",
      "TÜV / AU (inkl. Durchführung im Haus)",
      "Fahrzeug-Check (Urlaubs-, Winter-, Frühjahrs-Check)",
      "Batterieprüfung & Austausch",
      "Klimaanlagenservice (Reinigung, Nachfüllung)",
      "Getriebespülung (nach der Tim-Eckart-Methode)",
    ],
  },
  {
    title: "Reifen & Räder",
    items: [
      "Reifenwechsel & Einlagerung",
      "Reifenmontage & Wuchten",
      "Felgenservice & -aufbereitung",
      "Achsvermessung",
    ],
  },
  {
    title: "Glas & Steinschlag",
    items: ["Schneller Austausch", "Steinschlagreparatur"],
  },
];

export function WorkshopServices() {
  return (
    <section className="font-sans py-20" style={{ backgroundColor: "#f4f8fb" }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: "#0d1b2a" }}
        >
          Umfassende Lösungen für Ihr Fahrzeug
        </h2>
        <p className="text-sm mb-10" style={{ color: "#5a7080" }}>
          Als Meisterbetrieb erledigen wir alles unter einem Dach.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}
            >
              <h3
                className="text-sm font-bold mb-4"
                style={{ color: "#0074a2" }}
              >
                {cat.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#0d1b2a" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke="#0074a2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/terminbuchung"
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0074a2" }}
          >
            Termin online buchen
          </Link>
          <a
            href="tel:+4971211452619"
            className="rounded-xl border px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#e5f1f5]"
            style={{ borderColor: "#b8d0dc", color: "#0d1b2a" }}
          >
            Termin anfragen
          </a>
        </div>
      </div>
    </section>
  );
}
