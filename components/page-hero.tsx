import Link from "next/link";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/terminbuchung",
  primaryLabel = "Termin buchen",
  secondaryHref = "#kontakt",
  secondaryLabel = "Rückruf anfragen",
}: PageHeroProps) {
  return (
    <header
      className="relative w-full overflow-hidden font-sans"
      style={{ minHeight: 480, backgroundColor: "#002e40" }}
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,46,64,0.96) 0%, rgba(0,116,162,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col gap-6">
        <div className="max-w-2xl">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {eyebrow}
          </span>
          <h1
            className="mt-3 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-balance"
            style={{ color: "#ffffff" }}
          >
            {title}
          </h1>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0074a2" }}
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "#ffffff" }}
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
