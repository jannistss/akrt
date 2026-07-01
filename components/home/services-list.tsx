import Image from "next/image";
import Link from "next/link";

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 4" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const categories = [
  {
    icon: "/assets/images/6937e715063be152c1cb3309_icon-reperatur.png",
    iconAlt: "Schraubenschlüssel und Schraubendreher.",
    title: "Reparatur & Instandsetzung",
    items: [
      "Motordiagnose & Reparatur",
      "Getriebeinstandsetzung",
      "Bremsenservice",
      "Stoßdämpfer & Fahrwerk",
      "Auspuff & Abgasanlage",
      "Kupplungsservice",
      "Ölwechsel & Filterwechsel",
      "Unfallinstandsetzung",
      "Lackierarbeiten",
      "Smart Repair",
    ],
  },
  {
    icon: "/assets/images/6937e715ad67a7e8c6f8f320_icon-hebebuehne.png",
    iconAlt: "Auto auf Hebebühne.",
    title: "Wartung & Inspektion",
    items: [
      "Jahresinspektion",
      "HU-Vorbereitung",
      "TÜV & AU (im Haus)",
      "Fahrzeug-Check",
      "Batterieprüfung & Austausch",
      "Klimaanlagenservice",
      "Getriebespülung",
    ],
  },
  {
    icon: "/assets/images/6937e7168920287b24bafc7c_icon-reifen.png",
    iconAlt: "Reifen mit Schraubenschlüssel.",
    title: "Reifen & Räder",
    items: [
      "Reifenwechsel & Einlagerung",
      "Reifenmontage & Wuchten",
      "Felgenservice",
      "Achsvermessung",
    ],
  },
  {
    icon: "/assets/images/698dccd20f3ec8ce449ef838_Icon-Glas.png",
    iconAlt: "Auto mit Scheiben.",
    title: "Glas & Steinschlag",
    items: [
      "Schneller Scheibenaustausch",
      "Steinschlagreparatur",
    ],
  },
];

export function ServicesList() {
  return (
    <section style={{ backgroundColor: "#001824" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#0074a2" }}>
            Unser Leistungsspektrum
          </p>
          <h2
            className="font-bold tracking-tight text-balance"
            style={{ color: "#ffffff", fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
          >
            Alles, was dein Auto braucht.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="flex flex-col gap-6 p-8"
              style={{ backgroundColor: "#001824" }}
            >
              <Image
                src={cat.icon}
                alt={cat.iconAlt}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(55%) sepia(60%) saturate(500%) hue-rotate(170deg)" }}
              />
              <h3 className="text-sm font-bold leading-snug" style={{ color: "#ffffff" }}>
                {cat.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/terminbuchung"
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "#0074a2" }}
          >
            Termin online buchen
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="#kontakt"
            className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/5"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
          >
            Termin anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
