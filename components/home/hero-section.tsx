import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden font-sans" style={{ minHeight: 580 }}>
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" style={{ backgroundColor: "rgba(0,46,64,0.58)" }} />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/assets/hero-poster.jpg"
        >
          <source
            src="/assets/hero.mp4"
            type="video/mp4"
          />
          <source
            src="/assets/hero.webm"
            type="video/webm"
          />
        </video>
      </div>

      {/* Hero image (desktop overlay, right side) */}
      <div className="absolute bottom-0 right-0 z-20 hidden lg:block" style={{ maxWidth: 480 }}>
        <Image
          src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
          alt="Lächelnder Mann in blauer Arbeitskleidung hält Klemmbrett mit drei Häkchen und deutschen Textlabels."
          width={480}
          height={520}
          priority
          className="object-contain object-bottom"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 py-24 flex flex-col gap-6">
        <div className="max-w-2xl">
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-balance"
            style={{ color: "#ffffff" }}
          >
            Deine Werkstatt in Reutlingen.
          </h1>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Inspektion, Reparatur &amp; TÜV. Faire Preise, kurze Wartezeiten.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/terminbuchung"
              className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0074a2" }}
            >
              Termin online buchen
            </Link>
            <Link
              href="#kontakt"
              className="rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "#ffffff" }}
            >
              Rückruf anfragen
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
