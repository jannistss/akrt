"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem, EASE } from "@/lib/animation";

const benefits = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: "Faire Arbeitszeiten",
    description: "Geregelte Schichten, kein Chaos.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Attraktives Gehalt",
    description: "Leistungsgerechte Vergütung + Prämien.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Familiäres Team",
    description: "Kurze Entscheidungswege, direkte Kommunikation.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: "Weiterbildung",
    description: "Wir fördern Fortbildungen und Zertifizierungen.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: "Moderner Maschinenpark",
    description: "Aktuelle Diagnosetechnik und Werkzeuge.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: "Zentraler Standort",
    description: "Direkt in Reutlingen, gut erreichbar.",
  },
];

export default function KarrierePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 560, background: "linear-gradient(135deg, #001e2d 0%, #003652 60%, #004a70 100%)" }}
      >
        {/* decorative grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,116,162,0.35) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center" style={{ minHeight: 560 }}>
          <div className="max-w-2xl py-28">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ backgroundColor: "rgba(0,116,162,0.25)", color: "#60c8f0", border: "1px solid rgba(96,200,240,0.2)" }}
              {...fadeUp(0)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#60c8f0] animate-pulse" />
              1 offene Stelle
            </motion.span>
            <motion.h1
              className="font-extrabold tracking-tight text-white text-balance mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.1 }}
              {...fadeUp(0.1)}
            >
              Werde Teil unseres Teams
            </motion.h1>
            <motion.p
              className="text-base leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.65)" }}
              {...fadeUp(0.2)}
            >
              Wir sind ein wachsender Meisterbetrieb in Reutlingen — familiär, ehrlich, mit echter Leidenschaft für Fahrzeuge. Kein Konzern, kein Bullshit. Dafür Wertschätzung, faire Bedingungen und ein Team, das zusammenhält.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
              <a
                href="#stelle"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[.98]"
                style={{ backgroundColor: "#0074a2" }}
              >
                Jetzt bewerben
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#0074a2" }} {...fadeUp(0)}>
            Warum Autoklinik?
          </motion.p>
          <motion.h2 className="text-2xl font-bold mb-12 text-balance" style={{ color: "#0f172a" }} {...fadeUp(0.1)}>
            Was dich bei uns erwartet
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={staggerItem}
                className="flex gap-4 rounded-2xl p-6"
                style={{ backgroundColor: "#f8fafc", border: "1px solid #e2eef4" }}
              >
                <span className="shrink-0 mt-0.5" style={{ color: "#0074a2" }}>{b.icon}</span>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#0f172a" }}>{b.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{b.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Single Job Card ── */}
      <section id="stelle" style={{ backgroundColor: "#f0f7ff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#0074a2" }} {...fadeUp(0)}>
            Offene Stelle
          </motion.p>
          <motion.h2 className="text-2xl font-bold mb-10 text-balance" style={{ color: "#0f172a" }} {...fadeUp(0.1)}>
            Aktuell suchen wir
          </motion.h2>

          <motion.div
            {...scaleUp(0.15)}
            className="relative rounded-3xl overflow-hidden"
            style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0", boxShadow: "0 4px 32px rgba(0,46,64,0.08)" }}
          >
            {/* Accent bar */}
            <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #0074a2, #002e40)" }} />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 px-8 py-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1.5" style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}>
                    Vollzeit
                  </span>
                  <span className="text-xs font-semibold rounded-full px-3 py-1.5" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                    Sofort verfugbar
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold mb-3" style={{ color: "#0f172a" }}>
                  Kfz-Mechatroniker / Mechaniker (m/w/d)
                </h3>
                <p className="text-sm leading-relaxed max-w-xl mb-6" style={{ color: "#475569" }}>
                  Du wartest, reparierst und diagnostizierst Fahrzeuge aller Marken in unserem modernen Meisterbetrieb in Reutlingen. Neue Technologien — Elektro, Hybrid, modernste Diagnosesysteme — sind hier keine Seltenheit.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {["Abgeschlossene Ausbildung", "Alle Marken & Modelle", "Teamplayer", "Führerschein Klasse B"].map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#475569" }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="#0074a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
                <Link
                  href="/karriere/kfz-mechatroniker"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.98]"
                  style={{ backgroundColor: "#002e40" }}
                >
                  Details & Bewerben
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a
                  href="/karriere/kfz-mechatroniker#bewerben"
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
                  style={{ borderColor: "#d5e8f0", color: "#475569" }}
                >
                  Direkt bewerben
                </a>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-wrap gap-6 rounded-2xl px-6 py-5" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2eef4" }}>
                <div className="flex items-center gap-2.5 text-xs font-medium" style={{ color: "#475569" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Reutlingen, BW
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium" style={{ color: "#475569" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  Meisterbetrieb seit 2015
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium" style={{ color: "#475569" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Vollzeit · Mo–Fr
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ backgroundColor: "#002e40" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-20 text-center">
          <motion.h2 className="text-2xl font-extrabold text-white mb-4 text-balance" {...fadeUp(0)}>
            Fragen zur Stelle?
          </motion.h2>
          <motion.p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }} {...fadeUp(0.1)}>
            Ruf uns einfach an oder schreib eine WhatsApp — wir antworten schnell.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-3" {...fadeUp(0.2)}>
            <a
              href="tel:+4907121155261990"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Anrufen
            </a>
            <a
              href="https://wa.me/4917661973298"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}
            >
              WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

function scaleUp(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.96, y: 24 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}
