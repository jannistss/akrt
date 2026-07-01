"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, ease: "easeOut", delay },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
});

export function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>

      {/* ── Video background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
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

        {/* Base tint */}
        <div className="absolute inset-0 z-10" style={{ background: "rgba(0,10,18,0.48)" }} />
        {/* Bottom blue gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(0,80,120,0.88) 0%, rgba(0,70,105,0.45) 30%, transparent 62%)" }}
        />
        {/* Top-left dark vignette keeps text sharp */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(135deg, rgba(0,12,22,0.72) 0%, transparent 55%)" }}
        />
      </motion.div>

      {/* ── Mechanic image — slides in from right, bottom-anchored ── */}
      <motion.div
        className="absolute bottom-0 right-0 z-20 hidden lg:block pointer-events-none select-none"
        style={{ width: 520, height: "92%" }}
        {...slideRight(0.4)}
      >
        <Image
          src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
          alt="Lächelnder Mechaniker der Autoklinik Reutlingen mit Klemmbrett."
          fill
          priority
          className="object-contain object-bottom"
          sizes="520px"
        />
      </motion.div>



      {/* ── Main content — vertically centered ── */}
      <div className="relative z-30 flex items-center" style={{ minHeight: "100svh" }}>
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-32">
          <div className="max-w-[600px]">

            {/* Eyebrow */}
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-6"
              style={{ color: "rgba(140,210,235,0.95)" }}
              {...fadeUp(0.15)}
            >
              Meisterbetrieb · Reutlingen
            </motion.p>

            {/* Headline — each line staggers in */}
            <div aria-label="Deine Werkstatt. Ehrlich. Schnell. Zuverlässig.">
              {["Deine Werkstatt.", "Ehrlich. Schnell.", "Zuverlässig."].map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.span
                    className="block font-bold leading-[1.06] tracking-tight"
                    style={{ color: "#ffffff", fontSize: "clamp(2.6rem, 5.2vw, 4.8rem)" }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.88)" }}
              {...fadeUp(0.6)}
            >
              Inspektion, Reparatur &amp; TÜV — alles aus einer Hand.
              Faire Preise, kurze Wartezeiten, direkt in Reutlingen.
            </motion.p>

            {/* CTAs */}
            <motion.div className="mt-9 flex flex-wrap gap-3" {...fadeUp(0.72)}>
              {/* Primary */}
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

              {/* Phone */}
              <Link
                href="tel:+4907121155261990"
                className="inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.30)", color: "#ffffff" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Anrufen
              </Link>

              {/* WhatsApp */}
              <Link
                href="https://wa.me/4917661973298"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{ borderColor: "rgba(37,211,102,0.45)", color: "#ffffff" }}
              >
                {/* Official WhatsApp icon */}
                <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.478.668 4.8 1.832 6.8L2 30l7.376-1.808A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.538 11.538 0 01-5.888-1.608l-.42-.252-4.36 1.064 1.092-4.236-.276-.436A11.538 11.538 0 014.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6z" fill="#25D366"/>
                  <path d="M21.94 18.88l-2.516-.72a.98.98 0 00-.964.248l-.704.728a.964.964 0 01-1.044.22 14.72 14.72 0 01-4.488-2.848 14.72 14.72 0 01-2.848-4.488.964.964 0 01.22-1.044l.728-.704a.98.98 0 00.248-.964l-.72-2.516a.98.98 0 00-.944-.7h-2.34a.98.98 0 00-.976 1.016c.208 2.692 1.3 5.232 3.112 7.252a17.04 17.04 0 007.264 5.12.98.98 0 001.096-.3l.728-.912a.98.98 0 00-.104-1.328l-.548.98z" fill="#25D366"/>
                </svg>
                WhatsApp
              </Link>
            </motion.div>

            {/* Trust pills row */}
            <motion.div
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5"
              {...fadeIn(0.88)}
            >
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
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.90)" }}>
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </header>
  );
}
