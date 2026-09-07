"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Globe, Phone, Star, Check, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site-config";

/* ─── Brand glyphs (lucide ships no platform/brand icons; keep them in
   the same monochrome brand-blue used everywhere else so they don't
   introduce extra colors) ────────────────────────────────────────── */
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

const AK_BLUE = "#0074a2";
const AK_DEEP = "#002e40";

type LinkItem = {
  href: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  external: boolean;
  featured?: boolean;
};

const links: LinkItem[] = [
  {
    href: "/terminbuchung",
    label: "Termin online buchen",
    sub: "Passenden Werkstatttermin auswählen",
    icon: <CalendarDays size={21} strokeWidth={2} />,
    external: false,
    featured: true,
  },
  {
    href: "/",
    label: "Zur Website",
    sub: SITE.url.replace("https://", ""),
    icon: <Globe size={20} strokeWidth={2} color={AK_BLUE} />,
    external: false,
  },
  {
    href: SITE.instagram.url,
    label: "Instagram",
    sub: SITE.instagram.handle,
    icon: <span style={{ color: AK_BLUE }}><InstagramIcon size={20} /></span>,
    external: true,
  },
  {
    href: SITE.whatsapp.href,
    label: "WhatsApp",
    sub: SITE.whatsapp.display,
    icon: <span style={{ color: AK_BLUE }}><WhatsAppIcon size={20} /></span>,
    external: true,
  },
  {
    href: SITE.phone.href,
    label: "Anrufen",
    sub: SITE.phone.display,
    icon: <Phone size={20} strokeWidth={2} color={AK_BLUE} />,
    external: false,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function VisitenkarteCard() {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const redirected = useRef(false);

  function handleRate(stars: number) {
    if (rating !== null) return; // one rating per visit, keep it simple
    setRating(stars);
    if (stars >= 4 && !redirected.current) {
      redirected.current = true;
      window.setTimeout(() => {
        window.open(SITE.googleReviewUrl, "_blank", "noopener,noreferrer");
      }, 550);
    }
  }

  const displayRating = hovered ?? rating ?? 0;
  const isPositive = rating !== null && rating >= 4;
  const isNegative = rating !== null && rating <= 3;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:py-16"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${AK_BLUE}33, transparent 60%), linear-gradient(180deg, #001824 0%, #002e40 100%)`,
      }}
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Card */}
        <div
          className="rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 shadow-2xl"
          style={{ backgroundColor: "#f5f9fc" }}
        >
          {/* Logo */}
          <motion.div variants={item} className="flex justify-center">
            <div className="rounded-2xl bg-white px-5 py-4 shadow-md">
              <Image
                src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png"
                alt="Autoklinik Reutlingen Logo"
                width={168}
                height={70}
                className="h-auto w-36"
                priority
              />
            </div>
          </motion.div>

          {/* Identity */}
          <motion.div variants={item} className="mt-5 text-center">
            <h1 className="text-lg font-bold text-balance" style={{ color: AK_DEEP }}>
              {SITE.name}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "#4a6272" }}>
              Meisterwerkstatt · {SITE.address.city}
            </p>
          </motion.div>

          {/* Links */}
          <div className="mt-7 flex flex-col gap-3">
            {links.map((l) => (
              <motion.a
                key={l.label}
                variants={item}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3.5 rounded-2xl px-4 py-3.5 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={
                  l.featured
                    ? { backgroundColor: AK_BLUE, color: "#ffffff", boxShadow: "0 10px 24px rgba(0,116,162,0.24)", outline: "1px solid rgba(255,255,255,0.16)" }
                    : { backgroundColor: "#ffffff", boxShadow: undefined }
                }
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: l.featured ? "rgba(255,255,255,0.16)" : "#eef6fa", color: l.featured ? "#ffffff" : AK_BLUE }}
                >
                  {l.icon}
                </span>
                <span className="flex-1 text-left">
                  <span className="block text-sm font-semibold" style={{ color: l.featured ? "#ffffff" : AK_DEEP }}>
                    {l.label}
                  </span>
                  <span className="block text-xs" style={{ color: l.featured ? "rgba(255,255,255,0.78)" : "#4a6272" }}>
                    {l.sub}
                  </span>
                </span>
                {l.external && <ExternalLink size={15} strokeWidth={2} style={{ color: l.featured ? "#ffffff" : "#4a6272" }} />}
              </motion.a>
            ))}
          </div>

          {/* Rating spotlight */}
          <motion.section
            variants={item}
            aria-labelledby="review-heading"
            className="mt-8 overflow-hidden rounded-[1.5rem] border p-5 sm:p-6"
            style={{
              borderColor: "rgba(0,116,162,0.24)",
              background: "linear-gradient(145deg, #eef8fc 0%, #ffffff 100%)",
              boxShadow: "0 12px 28px rgba(0,46,64,0.08)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: AK_BLUE }}>
                  Google Bewertung
                </p>
                <h2 id="review-heading" className="mt-1 text-base font-bold text-balance" style={{ color: AK_DEEP }}>
                  Hilf uns mit deiner Bewertung
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-sm" aria-hidden="true">
                <Star size={15} color="#f4b400" fill="#f4b400" strokeWidth={1.5} />
                <span className="text-xs font-bold" style={{ color: AK_DEEP }}>Google</span>
              </div>
            </div>
            <p className="mt-2 max-w-[32ch] text-xs leading-relaxed" style={{ color: "#4a6272" }}>
              Deine Rückmeldung hilft anderen bei der Werkstattwahl und uns bei unserer Arbeit.
            </p>

            <AnimatePresence mode="wait">
              {rating === null ? (
                <motion.div
                  key="stars"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-5"
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex justify-center gap-1 sm:gap-2" role="group" aria-label="Bewertung auswählen">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-label={`${n} von 5 Sternen`}
                        onMouseEnter={() => setHovered(n)}
                        onFocus={() => setHovered(n)}
                        onBlur={() => setHovered(null)}
                        onClick={() => handleRate(n)}
                        className="rounded-xl p-1.5 transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0074a2] focus-visible:ring-offset-2 active:scale-95"
                      >
                        <Star
                          size={38}
                          strokeWidth={1.5}
                          fill={displayRating >= n ? "#f4b400" : "transparent"}
                          color={displayRating >= n ? "#f4b400" : "#b5c9d2"}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-[11px]" style={{ color: "#607987" }}>
                    Tippe auf die Sterne und teile deine Erfahrung.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 flex flex-col items-center gap-2 text-center"
                  role="status"
                >
                  <div className="mb-1 flex gap-1" aria-label={`${rating} von 5 Sternen ausgewählt`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={22}
                        strokeWidth={1.5}
                        fill={rating >= n ? "#f4b400" : "transparent"}
                        color={rating >= n ? "#f4b400" : "#b5c9d2"}
                      />
                    ))}
                  </div>

                  {isNegative && (
                    <>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "#dff1f7" }}>
                        <Check size={19} color={AK_BLUE} strokeWidth={2.5} />
                      </span>
                      <p className="text-sm font-semibold" style={{ color: AK_DEEP }}>
                        Danke für dein Feedback!
                      </p>
                      <p className="text-xs" style={{ color: "#4a6272" }}>
                        Wir nehmen uns deine Rückmeldung zu Herzen und werden besser.
                      </p>
                    </>
                  )}

                  {isPositive && (
                    <>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "#fff4d6" }}>
                        <Star size={19} color="#f4b400" fill="#f4b400" strokeWidth={1.5} />
                      </span>
                      <p className="text-sm font-semibold" style={{ color: AK_DEEP }}>
                        Danke für deine tolle Bewertung!
                      </p>
                      <p className="text-xs" style={{ color: "#4a6272" }}>
                        Teile sie jetzt direkt mit anderen auf Google.
                      </p>
                      <a
                        href={SITE.googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0074a2] focus-visible:ring-offset-2 active:scale-[0.98]"
                        style={{ backgroundColor: AK_BLUE }}
                      >
                        Jetzt bei Google bewerten
                        <ExternalLink size={15} strokeWidth={2.5} />
                      </a>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>

        {/* Footer */}
        <motion.p variants={item} className="mt-6 text-center text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          © {new Date().getFullYear()} {SITE.name} ·{" "}
          <Link href="/" className="underline hover:text-white">
            Zur vollständigen Website
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
