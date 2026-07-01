import Image from "next/image";

const brandLogos = [
  { src: "/assets/images/6937e7158532daae3933f12c_icon-bmw.png", alt: "BMW" },
  { src: "/assets/images/6937e7158bad018e0f304332_icon-audi.png", alt: "Audi" },
  { src: "/assets/images/6937e715f0e031aca92d26f6_icon-renault.png", alt: "Renault" },
  { src: "/assets/images/6937e715970dcf9d4e71dc89_icon-mini.png", alt: "Mini" },
  { src: "/assets/images/6937e71540070edab121f3aa_icon-mercedes.png", alt: "Mercedes-Benz" },
];

const trustPoints = [
  { icon: "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png", label: "Meisterbetrieb" },
  { icon: "/assets/images/6937e7151cc0063ec7b71870_Icon-Smiley.png", label: "Faire Preise" },
  { icon: "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png", label: "Kurze Wartezeiten" },
  { icon: "/assets/images/6937e7159229bbc42b6c8632_icon-tuev.png", label: "TÜV in 48 Std." },
  { icon: "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png", label: "Qualitätsarbeit" },
];

export function TrustLogos() {
  return (
    <section style={{ backgroundColor: "#001824" }}>
      <div
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Brand logos row */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Für alle Marken
          </p>
          <div className="flex flex-wrap items-center gap-8">
            {brandLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.35 }}
              />
            ))}
          </div>
        </div>

        {/* Trust points */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          {trustPoints.map((point) => (
            <div
              key={point.label}
              className="flex items-center gap-3 px-6 py-5"
              style={{ backgroundColor: "#001824" }}
            >
              <Image
                src={point.icon}
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 object-contain shrink-0"
                style={{ filter: "brightness(0) saturate(100%) invert(40%) sepia(90%) saturate(400%) hue-rotate(170deg)" }}
              />
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
