import Image from "next/image";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="font-sans">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ backgroundColor: "#002e40" }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 z-10"
              style={{ backgroundColor: "rgba(0,46,64,0.72)" }}
            />
            <Image
              src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
              alt="Mechaniker in rotem Hemd und grauen Overalls prüft Automotor in einer Werkstatt."
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 text-center px-6 py-16 flex flex-col items-center gap-6">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-balance"
              style={{ color: "#ffffff" }}
            >
              Jetzt Termin vereinbaren
            </h2>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
              Schnell. Einfach. Direkt online oder telefonisch.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
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
                Termin anfragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
