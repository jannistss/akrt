import Image from "next/image";

const badges = [
  {
    src: "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png",
    alt: "Blaues Häkchen-Symbol in einem blauen Kreis.",
    label: "Meisterbetrieb",
  },
  {
    src: "/assets/images/6937e7151cc0063ec7b71870_Icon-Smiley.png",
    alt: "Hellblaues Smiley-Symbol auf abgerundetem Quadrat-Hintergrund.",
    label: "Faire Preise",
  },
  {
    src: "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png",
    alt: "Blaues Häkchen-Symbol.",
    label: "Kurze Wartezeiten",
  },
  {
    src: "/assets/images/6937e7159229bbc42b6c8632_icon-tuev.png",
    alt: "Blaues achteckiges TÜV SÜD Zertifizierungszeichen.",
    label: "TÜV in 48 Stunden",
  },
  {
    src: "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png",
    alt: "Blaues Häkchen-Symbol.",
    label: "Qualitätsarbeit",
  },
];

const brandLogos = [
  {
    src: "/assets/images/6937e7158532daae3933f12c_icon-bmw.png",
    alt: "BMW blaues rundes Emblem.",
  },
  {
    src: "/assets/images/6937e7158bad018e0f304332_icon-audi.png",
    alt: "Audi Markenlogo mit vier verschlungenen Ringen.",
  },
  {
    src: "/assets/images/6937e715f0e031aca92d26f6_icon-renault.png",
    alt: "Blaues stilisiertes geometrisches Logo mit überlappenden Diamantformen.",
  },
  {
    src: "/assets/images/6937e715970dcf9d4e71dc89_icon-mini.png",
    alt: "Blaues Kreis-Logo mit Buchstabe N.",
  },
  {
    src: "/assets/images/6937e71540070edab121f3aa_icon-mercedes.png",
    alt: "Mercedes-Benz dreiarmiges Stern-Emblem in blauem Kreis.",
  },
];

export function TrustLogos() {
  return (
    <section className="font-sans" style={{ backgroundColor: "#e5f1f5" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Quality badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-3">
              <Image
                src={badge.src}
                alt={badge.alt}
                width={60}
                height={60}
                className="h-14 w-14 object-contain"
              />
              <span
                className="text-sm font-semibold text-center"
                style={{ color: "#000608" }}
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Brand logos */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {brandLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={52}
              height={52}
              className="h-12 w-12 object-contain opacity-80"
            />
          ))}
          <span
            className="text-sm font-semibold"
            style={{ color: "#000608" }}
          >
            Für alle Marken
          </span>
        </div>
      </div>
    </section>
  );
}
