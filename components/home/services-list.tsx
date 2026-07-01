import Image from "next/image";
import Link from "next/link";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4 shrink-0"
    aria-hidden="true"
  >
    <polyline
      points="21 5 12 14 8 10"
      style={{ stroke: "#0074a2", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none" }}
    />
    <path
      d="M21,11v9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H16"
      style={{ stroke: "#002e40", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none" }}
    />
  </svg>
);

const categories = [
  {
    icon: "/assets/images/6937e715063be152c1cb3309_icon-reperatur.png",
    iconAlt: "Blauer Schraubenschlüssel gekreuzt mit schwarzem Schraubendreher.",
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
    icon: "/assets/images/6937e715ad67a7e8c6f8f320_icon-hebebuehne.png",
    iconAlt: "Blaues Auto auf einer Scherenbühne für Wartung oder Reparatur.",
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
    icon: "/assets/images/6937e7168920287b24bafc7c_icon-reifen.png",
    iconAlt: "Blauer Reifen mit Schraubenschlüssel, der Reifenreparatur symbolisiert.",
    title: "Reifen & Räder",
    items: [
      "Reifenwechsel & Einlagerung",
      "Reifenmontage & Wuchten",
      "Felgenservice & -aufbereitung",
      "Achsvermessung",
    ],
  },
  {
    icon: "/assets/images/698dccd20f3ec8ce449ef838_Icon-Glas.png",
    iconAlt: "Symbol einer schwarzen Limousine mit blauen Scheiben.",
    title: "Glas & Steinschlag",
    items: [
      "Schneller Austausch",
      "Steinschlagreparatur",
    ],
  },
];

export function ServicesList() {
  return (
    <section className="font-sans" style={{ backgroundColor: "#e5f1f5" }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#0074a2" }}
          >
            Service
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-balance"
            style={{ color: "#000608" }}
          >
            Umfassende Lösungen für Ihr Fahrzeug
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl p-6 flex flex-col gap-5"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid rgba(0,116,162,0.10)" }}
            >
              <Image
                src={cat.icon}
                alt={cat.iconAlt}
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <h3
                className="text-sm font-bold leading-snug"
                style={{ color: "#000608" }}
                dangerouslySetInnerHTML={{ __html: cat.title.replace(" &", " &amp;").replace("&", "<br/>& ") }}
              />
              <ul className="flex flex-col gap-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-sm leading-snug" style={{ color: "#4c5052" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/terminbuchung"
            className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0074a2" }}
          >
            Termin online buchen
          </Link>
          <Link
            href="#kontakt"
            className="rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#cce3ec]"
            style={{ borderColor: "#0074a2", color: "#0074a2" }}
          >
            Termin anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
