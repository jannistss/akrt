"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, scaleUp, EASE } from "@/lib/animation";

export function CtaBanner() {
  return (
    <section style={{ backgroundColor: "#001824" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          style={{ minHeight: 340 }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Background image */}
          <Image
            src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
            alt="Mechaniker prüft Automotor in der Autoklinik Reutlingen."
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(0,14,22,0.92) 40%, rgba(0,14,22,0.55) 100%)" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-10 sm:px-16 py-16 max-w-2xl">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "rgba(140,210,235,0.85)" }}
              {...fadeUp(0.2)}
            >
              Bereit?
            </motion.p>
            <motion.h2
              className="font-bold tracking-tight leading-[1.1] text-balance mb-6"
              style={{ color: "#ffffff", fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
              {...fadeUp(0.3)}
            >
              Jetzt Termin vereinbaren — schnell &amp; einfach.
            </motion.h2>
            <motion.p
              className="text-base mb-10"
              style={{ color: "rgba(255,255,255,0.6)" }}
              {...fadeUp(0.38)}
            >
              Online buchen oder direkt anrufen. Wir sind für dich da.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.45)}>
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
                href="#kontakt"
                className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.28)", color: "#ffffff" }}
              >
                Termin anfragen
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
