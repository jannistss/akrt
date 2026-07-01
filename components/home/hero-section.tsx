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

        {/* Full-coverage base tint so all text is always readable */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "rgba(0,10,18,0.42)" }}
        />
        {/* Light-blue-to-transparent gradient rising from the bottom — like Webflow */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,90,130,0.90) 0%, rgba(0,80,115,0.55) 28%, transparent 60%)",
          }}
        />
        {/* Dark navy tint top → keeps eyebrow + headline crisp */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,14,22,0.82) 0%, rgba(0,14,22,0.30) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Mechanic image — desktop right side, bottom-anchored, overflow visible */}
      <div
        className="absolute bottom-0 right-0 z-20 hidden lg:block pointer-events-none select-none"
        style={{ width: 460, height: "100%" }}
      >
        <Image
          src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
          alt="Lächelnder Mechaniker in blauer Arbeitskleidung mit Klemmbrett."
          fill
          priority
          className="object-contain object-bottom"
          sizes="460px"
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
              style={{ color: "rgba(255,255,255,0.92)" }}
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
                href="tel:+4907121155261990"
                className="inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.32)", color: "#ffffff" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Anrufen
              </Link>
              <Link
                href="https://wa.me/4917661973298"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{ borderColor: "rgba(37,211,102,0.5)", color: "#ffffff" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.9 1.02 1.04-3.8-.25-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0122 12c0 5.52-4.48 10-10 10zm5.47-7.38l-1.93-.56a.75.75 0 00-.74.19l-.54.56a.74.74 0 01-.8.17 11.3 11.3 0 01-3.44-2.19 11.3 11.3 0 01-2.19-3.44.74.74 0 01.17-.8l.56-.54a.75.75 0 00.19-.74l-.56-1.93a.75.75 0 00-.72-.54h-1.8a.75.75 0 00-.75.78c.16 2.06 1 4.01 2.39 5.56a13.08 13.08 0 005.57 3.93.75.75 0 00.84-.23l.56-.7a.75.75 0 00-.08-1.02z" fill="#25D366"/>
                </svg>
                WhatsApp
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
                  <span className="text-xs font-semibold" style={{ color: "#ffffff" }}>
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
