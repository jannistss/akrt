import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>
      {/* Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
          <source src="/assets/hero.webm" type="video/webm" />
        </video>

        {/* Light-blue-to-transparent gradient rising from the bottom — exactly like Webflow */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,116,162,0.78) 0%, rgba(0,100,140,0.35) 30%, transparent 58%)",
          }}
        />
        {/* Dark navy tint top → fades out so video shows through mid-section */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,14,22,0.72) 0%, rgba(0,14,22,0.18) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Mechanic image — desktop right side, bottom-anchored */}
      <div
        className="absolute bottom-0 right-0 z-20 hidden lg:block pointer-events-none select-none"
        style={{ width: 440 }}
      >
        <Image
          src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
          alt="Lächelnder Mechaniker in blauer Arbeitskleidung mit Klemmbrett."
          width={440}
          height={520}
          priority
          className="object-contain object-bottom"
        />
      </div>

      {/* Content */}
      <div
        className="relative z-30 flex flex-col justify-center"
        style={{ minHeight: "100svh" }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl" style={{ paddingTop: "14vh", paddingBottom: "18vh" }}>
            {/* Eyebrow */}
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-6"
              style={{ color: "rgba(140,210,235,0.95)" }}
            >
              Meisterbetrieb · Reutlingen
            </p>

            {/* Headline */}
            <h1
              className="font-bold leading-[1.07] tracking-tight text-balance"
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              }}
            >
              Deine Werkstatt.<br />
              Ehrlich. Schnell.<br />
              Zuverlässig.
            </h1>

            {/* Sub */}
            <p
              className="mt-6 text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Inspektion, Reparatur &amp; TÜV — alles aus einer Hand.
              Faire Preise, kurze Wartezeiten, direkt in Reutlingen.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/terminbuchung"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
                style={{ backgroundColor: "#0074a2" }}
              >
                Termin online buchen
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="tel:+4971217969500"
                className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.32)", color: "#ffffff" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Jetzt anrufen
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2.5">
              {["TÜV in 48 Std.", "Faire Preise", "Meisterbetrieb", "Alle Marken"].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#0074a2" }}
                    aria-hidden="true"
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.2 2.2L8 3" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
