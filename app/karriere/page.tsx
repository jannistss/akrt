"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";

const perks = [
  {
    num: "01",
    title: "Faires Gehalt",
    body: "Leistungsgerecht, pünktlich, verhandelbar. Kein Tarifdschungel, sondern ein klares Gespräch auf Augenhöhe.",
  },
  {
    num: "02",
    title: "Geregelte Arbeitszeiten",
    body: "Montag bis Freitag. Kein Wochenende, kein Schichtchaos. Du hast ein Leben außerhalb der Werkstatt — das respektieren wir.",
  },
  {
    num: "03",
    title: "Modernes Equipment",
    body: "Aktuelle Diagnosetechnik, saubere Arbeitsplätze, professionelles Werkzeug. Du arbeitest nicht mit Steinzeitwerkzeug.",
  },
  {
    num: "04",
    title: "Kurze Entscheidungswege",
    body: "Kein Konzern, kein Vorgesetzter drei Ebenen über dir. Deine Meinung zählt — direkt, ohne Umwege.",
  },
  {
    num: "05",
    title: "Alle Marken & Modelle",
    body: "Kein Hersteller-Einheitsbrei. Du siehst täglich unterschiedliche Fahrzeuge, Probleme und Technologien.",
  },
  {
    num: "06",
    title: "Weiterbildung",
    body: "Wir investieren in dich. Zertifizierungen, Schulungen, neue Technologien — wir fördern, wer wachsen will.",
  },
];

export default function KarrierePage() {
  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "#f8fafc" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "100svh",
          background: "#001826",
        }}
      >
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,116,162,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,116,162,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            right: "-5%",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,116,162,0.18) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center" style={{ minHeight: "100svh", paddingTop: "10vh", paddingBottom: "8vh" }}>

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            {...fadeUp(0)}
          >
            <Image
              src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png"
              alt="Autoklinik Reutlingen"
              width={120}
              height={36}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#60c8f0" }}>
              Karriere
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-extrabold text-white text-balance"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 900 }}
            {...fadeUp(0.1)}
          >
            Wir suchen jemanden, der mit Leidenschaft schraubt.
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(255,255,255,0.55)" }}
            {...fadeUp(0.2)}
          >
            Autoklinik Reutlingen ist kein Konzern. Wir sind eine kleine, frische Werkstatt mit echten Werten — und suchen einen Kfz-Mechatroniker, der das genauso sieht wie wir.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mt-10" {...fadeUp(0.3)}>
            <a
              href="#stelle"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.97]"
              style={{ backgroundColor: "#0074a2" }}
            >
              Zur offenen Stelle
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href="/karriere/kfz-mechatroniker#bewerben"
              className="inline-flex items-center gap-2.5 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              Direkt bewerben
            </Link>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            className="flex flex-wrap gap-x-10 gap-y-4 mt-16 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            {...fadeUp(0.4)}
          >
            {[
              { val: "5 Sterne", label: "auf Google" },
              { val: "Alle Marken", label: "& Modelle" },
              { val: "37+", label: "Kundenbewertungen" },
              { val: "Mo–Fr", label: "Geregelte Zeiten" },
            ].map((s) => (
              <div key={s.val}>
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ÜBER UNS — persönliche Ansprache ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>
                Wer wir sind
              </motion.p>
              <motion.h2
                className="font-extrabold text-balance mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15, color: "#001826", letterSpacing: "-0.02em" }}
                {...fadeUp(0.1)}
              >
                Wir sind neu — und genau das ist unsere Stärke.
              </motion.h2>
              <motion.p className="text-base leading-relaxed mb-4" style={{ color: "#475569" }} {...fadeUp(0.2)}>
                Autoklinik Reutlingen gibt es erst seit wenigen Monaten. Das bedeutet: keine eingerosteten Strukturen, keine veralteten Gewohnheiten. Wir bauen gerade etwas auf — und du kannst von Anfang an dabei sein.
              </motion.p>
              <motion.p className="text-base leading-relaxed" style={{ color: "#475569" }} {...fadeUp(0.25)}>
                Wir sind ein Meisterbetrieb mit klarer Ausrichtung: Qualität, Transparenz, Fairness — gegenüber unseren Kunden und gegenüber unserem Team. Du wirst hier nicht eine Nummer sein.
              </motion.p>
            </div>
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ height: 400, background: "#f0f7ff", border: "1px solid #d5e8f0" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            >
              <img
                src="/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png"
                alt="Kfz-Mechatroniker bei der Arbeit in der Autoklinik Reutlingen"
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(0deg, rgba(0,24,38,0.85) 0%, transparent 100%)" }}
              >
                <p className="text-white font-bold text-lg">Autoklinik Reutlingen</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>Haldenhaustraße 3 · 72770 Reutlingen</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VORTEILE ── */}
      <section style={{ backgroundColor: "#001826" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#60c8f0" }} {...fadeUp(0)}>
            Was dich erwartet
          </motion.p>
          <motion.h2
            className="font-extrabold text-white text-balance mb-16"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 600 }}
            {...fadeUp(0.1)}
          >
            6 Gründe, warum Autoklinik der richtige Schritt ist.
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {perks.map((p, i) => (
              <motion.div
                key={p.num}
                variants={staggerItem}
                className="flex flex-col p-8"
                style={{
                  backgroundColor: i % 2 === 0 ? "#001e30" : "#001826",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-4xl font-black mb-6" style={{ color: "rgba(0,116,162,0.4)", letterSpacing: "-0.03em" }}>
                  {p.num}
                </span>
                <p className="font-bold text-white mb-3">{p.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOB CARD ── */}
      <section id="stelle" style={{ backgroundColor: "#f0f7ff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }} {...fadeUp(0)}>
            Offene Stelle
          </motion.p>
          <motion.h2
            className="font-extrabold text-balance mb-12"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15, color: "#001826", letterSpacing: "-0.02em" }}
            {...fadeUp(0.1)}
          >
            Genau eine Stelle. Genau die Richtige.
          </motion.h2>

          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0", boxShadow: "0 8px 48px rgba(0,46,64,0.10)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {/* Top accent */}
            <div className="h-1" style={{ background: "linear-gradient(90deg, #0074a2 0%, #002e40 100%)" }} />

            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1.5" style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}>
                  Vollzeit
                </span>
                <span className="text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1.5" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                  Sofort verfugbar
                </span>
                <span className="text-xs font-medium rounded-full px-3 py-1.5" style={{ backgroundColor: "#fef9c3", color: "#92400e" }}>
                  Reutlingen
                </span>
              </div>

              <h3
                className="font-extrabold mb-4 text-balance"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#001826", letterSpacing: "-0.02em" }}
              >
                Kfz-Mechatroniker / Mechaniker (m/w/d)
              </h3>

              <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: "#475569" }}>
                Du bist Kfz-Mechatroniker oder Mechaniker, weißt was du tust — und willst in einer Werkstatt arbeiten, die dich auch als Menschen sieht. Dann bist du bei Autoklinik genau richtig.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 rounded-2xl" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2eef4" }}>
                {[
                  { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", label: "Reutlingen" },
                  { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", label: "Alle Marken" },
                  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Meisterbetrieb" },
                  { icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", label: "Kleines Team" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                    <span className="text-xs font-semibold" style={{ color: "#334155" }}>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/karriere/kfz-mechatroniker"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.97]"
                  style={{ backgroundColor: "#002e40" }}
                >
                  Alles zur Stelle & Bewerben
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/karriere/kfz-mechatroniker#bewerben"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
                  style={{ borderColor: "#d5e8f0", color: "#475569" }}
                >
                  Direkt bewerben
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINALE CTA ── */}
      <section style={{ backgroundColor: "#001826" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-24 text-center">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#60c8f0" }} {...fadeUp(0)}>
            Fragen?
          </motion.p>
          <motion.h2
            className="font-extrabold text-white text-balance mb-5"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}
            {...fadeUp(0.1)}
          >
            Ruf uns einfach an — wir reden.
          </motion.h2>
          <motion.p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.5)" }} {...fadeUp(0.2)}>
            Kein Vorstellungsgespräch in einem sterilen Konferenzraum. Komm vorbei oder ruf kurz an.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" {...fadeUp(0.3)}>
            <a
              href="tel:+4907121155261990"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              07121 155 261 99
            </a>
            <a
              href="https://wa.me/4917661973298"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              WhatsApp schreiben
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
