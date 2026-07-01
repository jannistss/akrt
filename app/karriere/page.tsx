"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";

const perks = [
  {
    num: "01",
    title: "Faires Gehalt — ohne Verhandlungspoker",
    body: "Wir zahlen leistungsgerecht und pünktlich. Kein Tarifdschungel, kein Kleingedrucktes. Was wir sagen, gilt.",
  },
  {
    num: "02",
    title: "Montag bis Freitag. Fertig.",
    body: "Kein Wochenende, kein Schichtchaos, kein Bereitschaftsdienst. Deine Freizeit gehört dir — und das meinen wir ernst.",
  },
  {
    num: "03",
    title: "Werkzeug, das funktioniert",
    body: "Aktuelle Diagnosetechnik, saubere Hebebühnen, professionelles Werkzeug. Du arbeitest konzentriert — nicht gegen dein Equipment.",
  },
  {
    num: "04",
    title: "Kein Chef über dem Chef über dem Chef",
    body: "Wir sind klein. Das heißt: kurze Wege, schnelle Entscheidungen, deine Meinung zählt. Direkt. Sofort.",
  },
  {
    num: "05",
    title: "Jeden Tag ein anderes Auto",
    body: "BMW, Mercedes, VW, Opel — alle Marken, alle Baujahre. Du löst echte Probleme statt immer denselben Ölwechsel zu machen.",
  },
  {
    num: "06",
    title: "Ein Team, das zusammenhält",
    body: "Wir lachen auch mal. Wir helfen uns gegenseitig. Du wirst hier nicht allein gelassen — weder bei kniffligen Fehlern noch im Alltag.",
  },
];

export default function KarrierePage() {
  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "#f8fafc" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "100svh", backgroundColor: "#001826" }}
      >
        {/* Hero video background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.28 }}
          >
            <source src="/assets/hero.mp4" type="video/mp4" />
            <source src="/assets/hero.webm" type="video/webm" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, #001826 45%, rgba(0,24,38,0.65) 100%)",
            }}
          />
        </div>

        {/* Blue accent line top */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, #0074a2 0%, #002e40 100%)" }}
        />

        <div
          className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center"
          style={{ minHeight: "100svh", paddingTop: "120px", paddingBottom: "80px" }}
        >
          {/* Logo + label */}
          <motion.div className="flex items-center gap-4 mb-10" {...fadeUp(0)}>
            <Image
              src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png"
              alt="Autoklinik Reutlingen"
              width={130}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <div className="h-5 w-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#60c8f0" }}
            >
              Karriere
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-extrabold text-white text-balance"
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              maxWidth: 860,
            }}
            {...fadeUp(0.1)}
          >
            Wir suchen jemanden,
            <br />
            <span style={{ color: "#60c8f0" }}>der wirklich schrauben kann.</span>
          </motion.h1>

          <motion.p
            className="mt-7 text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.6)" }}
            {...fadeUp(0.2)}
          >
            Autoklinik Reutlingen ist kein Konzern. Wir sind eine frische, ehrliche Werkstatt — und wir brauchen eine Person, die das genauso sieht wie wir.
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
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)" }}
            >
              Direkt bewerben
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex flex-wrap gap-x-10 gap-y-5 mt-16 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            {...fadeUp(0.4)}
          >
            {[
              { val: "5,0★", label: "Google Bewertung" },
              { val: "37+", label: "Kundenbewertungen" },
              { val: "Alle Marken", label: "& Modelle" },
              { val: "Mo – Fr", label: "Geregelte Arbeitszeiten" },
            ].map((s) => (
              <div key={s.val}>
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>


      </section>

      {/* ── WER WIR SIND ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <motion.p
                className="text-xs font-bold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#0074a2" }}
                {...fadeUp(0)}
              >
                Wer wir sind
              </motion.p>
              <motion.h2
                className="font-extrabold text-balance mb-7"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  lineHeight: 1.1,
                  color: "#001826",
                  letterSpacing: "-0.02em",
                }}
                {...fadeUp(0.1)}
              >
                Keine eingerosteten Strukturen. Kein Konzernblödsinn.
              </motion.h2>
              <motion.div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: "#475569" }}
                {...fadeUp(0.2)}
              >
                <p>
                  Autoklinik Reutlingen ist jung — und genau das macht uns anders. Kein verstaubter Betrieb mit eingerosteten Abläufen. Wir bauen gerade was auf, und du kannst von Anfang an mitgestalten.
                </p>
                <p>
                  Unser Team ist klein, motiviert und direkt. Hier duzt man sich, hilft sich gegenseitig und lacht auch mal — ohne dass man deswegen schief angeguckt wird. Kein Ellbogenklima, kein Konkurrenzdenken.
                </p>
                <p>
                  Das Arbeitsklima ist entspannt, aber professionell. Wir nehmen unsere Arbeit ernst — nicht uns selbst. Und wenn du eine Idee hast, wird sie gehört. Nicht in drei Monaten nach vier Meetings, sondern direkt.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ height: 440 }}
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            >
              <img
                src="/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png"
                alt="Werkstatt der Autoklinik Reutlingen"
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-7 py-6 flex items-end gap-4"
                style={{
                  background: "linear-gradient(0deg, rgba(0,18,30,0.9) 0%, transparent 100%)",
                  minHeight: 120,
                }}
              >
                <div>
                  <p className="font-bold text-white text-sm">Autoklinik Reutlingen</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Haldenhaustraße 3 · 72770 Reutlingen
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VORTEILE DARK ── */}
      <section style={{ backgroundColor: "#001826" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] mb-5"
            style={{ color: "#60c8f0" }}
            {...fadeUp(0)}
          >
            Was dich erwartet
          </motion.p>
          <motion.h2
            className="font-extrabold text-white text-balance mb-16"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 640,
            }}
            {...fadeUp(0.1)}
          >
            6 Dinge, die andere Werkstätten nicht bieten.
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden" }}
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
                style={{ backgroundColor: "#001826" }}
              >
                <span
                  className="text-5xl font-black mb-5 block"
                  style={{ color: "rgba(0,116,162,0.35)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {p.num}
                </span>
                <p className="font-bold text-white mb-3 leading-snug">{p.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STELLE ── */}
      <section id="stelle" style={{ backgroundColor: "#f0f7ff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] mb-5"
            style={{ color: "#0074a2" }}
            {...fadeUp(0)}
          >
            Offene Stelle
          </motion.p>
          <motion.h2
            className="font-extrabold text-balance mb-12"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              lineHeight: 1.1,
              color: "#001826",
              letterSpacing: "-0.02em",
            }}
            {...fadeUp(0.1)}
          >
            Genau eine Stelle. Genau die Richtige für dich.
          </motion.h2>

          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #d5e8f0",
              boxShadow: "0 12px 48px rgba(0,46,64,0.10)",
            }}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <div className="h-1.5" style={{ background: "linear-gradient(90deg, #0074a2, #002e40)" }} />
            <div className="p-8 sm:p-12">
              <div className="flex flex-wrap gap-2.5 mb-6">
                {["Vollzeit", "Sofort verfügbar", "Reutlingen", "Alle Marken"].map((tag, i) => (
                  <span
                    key={tag}
                    className="text-xs font-bold uppercase tracking-wide rounded-full px-3.5 py-1.5"
                    style={{
                      backgroundColor: i === 0 ? "#dbeafe" : i === 1 ? "#dcfce7" : "#f1f5f9",
                      color: i === 0 ? "#1d4ed8" : i === 1 ? "#16a34a" : "#475569",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                className="font-extrabold mb-5 text-balance"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  color: "#001826",
                  letterSpacing: "-0.02em",
                }}
              >
                Kfz-Mechatroniker / Mechaniker (m/w/d)
              </h3>

              <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: "#475569" }}>
                Du weißt, was du tust. Du willst in einem kleinen, ehrlichen Team arbeiten — ohne Konzernstress, ohne Umsatzdruck, ohne Bullshit. Dann meld dich.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/karriere/kfz-mechatroniker"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.97]"
                  style={{ backgroundColor: "#002e40" }}
                >
                  Alles zur Stelle ansehen
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/karriere/kfz-mechatroniker#bewerben"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border px-9 py-4 text-sm font-semibold transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
                  style={{ borderColor: "#c7dce8", color: "#475569" }}
                >
                  Direkt bewerben
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ backgroundColor: "#001826" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-24 text-center">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] mb-5"
            style={{ color: "#60c8f0" }}
            {...fadeUp(0)}
          >
            Noch Fragen?
          </motion.p>
          <motion.h2
            className="font-extrabold text-white text-balance mb-5"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              letterSpacing: "-0.02em",
            }}
            {...fadeUp(0.1)}
          >
            Ruf uns einfach an. Kein Stress, kein Bewerbungsgespräch mit Anzug.
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.48)" }}
            {...fadeUp(0.2)}
          >
            Komm vorbei oder schreib uns. Wir sind entspannt — und freuen uns auf dich.
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
              style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
            >
              WhatsApp schreiben
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
