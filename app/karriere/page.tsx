"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";

// ── Job listings ────────────────────────────────────────────────────────────
const jobs = [
  {
    id: "kfz-mechatroniker",
    title: "Kfz-Mechatroniker (m/w/d)",
    type: "Vollzeit",
    level: "Geselle / Meister",
    description:
      "Du bist für Diagnose, Reparatur und Wartung aller Fahrzeugmarken verantwortlich. Neue Fahrzeugsysteme (Elektro, Hybrid) sind kein Fremdwort für dich.",
    requirements: [
      "Abgeschlossene Ausbildung als Kfz-Mechatroniker",
      "Selbstständige und sorgfältige Arbeitsweise",
      "Teamfähigkeit und Kundenorientierung",
      "Führerschein Klasse B",
    ],
  },
  {
    id: "serviceberater",
    title: "Serviceberater / Werkstattleitung (m/w/d)",
    type: "Vollzeit",
    level: "Erfahrung erwünscht",
    description:
      "Erste Anlaufstelle für unsere Kunden — du koordinierst Aufträge, berätst bei Reparaturen und sorgst für einen reibungslosen Werkstattablauf.",
    requirements: [
      "Erfahrung im Kfz-Service oder Serviceberatung",
      "Kommunikationsstärke und Kundenfokus",
      "Organisationstalent",
      "Kenntnisse in Werkstattsoftware von Vorteil",
    ],
  },
  {
    id: "initiativbewerbung",
    title: "Initiativbewerbung",
    type: "Offen",
    level: "Alle Level",
    description:
      "Du findest keine passende Stelle, bist aber überzeugt, dass du zu uns passt? Schick uns deine Bewerbung — wir freuen uns immer über motivierte Leute.",
    requirements: [
      "Leidenschaft für Fahrzeuge",
      "Zuverlässigkeit und Teamgeist",
      "Motivation zu wachsen",
    ],
  },
];

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Faire Arbeitszeiten",
    description: "Geregelte Schichten, keine Überstunden ohne Ausgleich.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Attraktive Vergütung",
    description: "Leistungsgerechtes Gehalt + Prämien.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Kleines Team, große Wirkung",
    description: "Direkte Kommunikation, kurze Entscheidungswege.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Weiterbildung",
    description: "Wir unterstützen Fortbildungen und Zertifizierungen.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Zentraler Standort",
    description: "Direkt in Reutlingen, gut erreichbar.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Moderner Maschinenpark",
    description: "Aktuelle Diagnosetechnik und Werkzeuge.",
  },
];

// ── Application Form ─────────────────────────────────────────────────────────
function ApplicationForm({ preselected }: { preselected?: string }) {
  const [position, setPosition] = useState(preselected ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !position) return;
    setStatus("sending");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("position", position);
    fd.append("message", message);
    if (cvFile) fd.append("cv", cvFile);

    const res = await fetch("/api/apply", { method: "POST", body: fd });
    const json = await res.json();

    if (res.ok) {
      setStatus("success");
    } else {
      setErrorMsg(json.error ?? "Fehler beim Senden.");
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0074a2]/30 focus:border-[#0074a2]";
  const inputStyle = { borderColor: "#d5e8f0", backgroundColor: "#ffffff", color: "#0f172a" };

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center gap-5 py-16 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#d1fae5" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold" style={{ color: "#0f172a" }}>Bewerbung eingegangen!</h3>
        <p className="text-sm max-w-sm" style={{ color: "#64748b" }}>
          Vielen Dank, wir haben deine Unterlagen erhalten und melden uns so schnell wie möglich bei dir.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Position */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Stelle *
        </label>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className={inputCls}
          style={inputStyle}
        >
          <option value="">Bitte auswählen…</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.title}>{j.title}</option>
          ))}
        </select>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Dein vollständiger Name"
            className={inputCls}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
            E-Mail *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="deine@email.de"
            className={inputCls}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Telefon
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+49 ..."
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Kurze Vorstellung / Anschreiben
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Erzähl uns etwas über dich, deine Erfahrung und warum du zu uns passt…"
          className={inputCls}
          style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
        />
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Lebenslauf (PDF, max. 10 MB)
        </label>
        <div
          className="relative flex items-center gap-3 rounded-xl border border-dashed px-4 py-4 cursor-pointer transition-all hover:border-[#0074a2]"
          style={{ borderColor: "#d5e8f0" }}
          onClick={() => fileRef.current?.click()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
          <span className="text-sm" style={{ color: cvFile ? "#0f172a" : "#94a3b8" }}>
            {cvFile ? cvFile.name : "Datei auswählen oder hierher ziehen"}
          </span>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm rounded-xl px-4 py-3" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[.98] disabled:opacity-60"
        style={{ backgroundColor: "#0074a2" }}
      >
        {status === "sending" ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Wird gesendet…
          </>
        ) : (
          <>
            Bewerbung absenden
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function KarrierePage() {
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<string | undefined>(undefined);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 520, background: "linear-gradient(135deg, #002e40 0%, #004a66 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #0074a2 0%, transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center" style={{ minHeight: 520 }}>
          <div className="max-w-2xl py-24">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#60b4d4" }}
              {...fadeUp(0)}
            >
              Karriere bei Autoklinik Reutlingen
            </motion.p>
            <motion.h1
              className="font-extrabold tracking-tight text-white text-balance mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15 }}
              {...fadeUp(0.1)}
            >
              Werde Teil unseres Teams
            </motion.h1>
            <motion.p
              className="text-base leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.72)" }}
              {...fadeUp(0.2)}
            >
              Wir sind ein wachsender Meisterbetrieb in Reutlingen und suchen Leute, die mit Leidenschaft an Fahrzeugen arbeiten. Direkte Kommunikation, faire Bedingungen, moderner Maschinenpark.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
              <a
                href="#stellen"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#0074a2" }}
              >
                Offene Stellen ansehen
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#bewerbung"
                className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              >
                Direkt bewerben
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#0074a2" }}
            {...fadeUp(0)}
          >
            Warum Autoklinik?
          </motion.p>
          <motion.h2
            className="text-2xl font-bold mb-12 text-balance"
            style={{ color: "#0f172a" }}
            {...fadeUp(0.1)}
          >
            Was dich bei uns erwartet
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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

      {/* ── Job Listings ── */}
      <section id="stellen" style={{ backgroundColor: "#f0f7ff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#0074a2" }}
            {...fadeUp(0)}
          >
            Offene Stellen
          </motion.p>
          <motion.h2
            className="text-2xl font-bold mb-12 text-balance"
            style={{ color: "#0f172a" }}
            {...fadeUp(0.1)}
          >
            Aktuell suchen wir
          </motion.h2>
          <motion.div
            className="flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={staggerItem}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }}
              >
                {/* Header row */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left transition-colors hover:bg-[#f0f7ff]"
                  onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                  aria-expanded={activeJob === job.id}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-base" style={{ color: "#0f172a" }}>{job.title}</span>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-semibold rounded-full px-3 py-1" style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}>{job.type}</span>
                      <span className="text-xs" style={{ color: "#64748b" }}>{job.level}</span>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: activeJob === job.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                    style={{ color: "#0074a2" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </motion.span>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {activeJob === job.id && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 pt-2 border-t" style={{ borderColor: "#e2eef4" }}>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: "#475569" }}>{job.description}</p>
                        <ul className="flex flex-col gap-2 mb-7">
                          {job.requirements.map((r) => (
                            <li key={r} className="flex items-start gap-2.5 text-sm" style={{ color: "#334155" }}>
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5" style={{ backgroundColor: "#dbeafe" }}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                  <path d="M2 5l2.2 2.2L8 3" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                              {r}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => {
                            setApplyJob(job.title);
                            document.getElementById("bewerbung")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                          style={{ backgroundColor: "#0074a2" }}
                        >
                          Jetzt bewerben
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="bewerbung" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — info */}
            <div className="lg:w-80 shrink-0">
              <motion.p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "#0074a2" }}
                {...fadeUp(0)}
              >
                Jetzt bewerben
              </motion.p>
              <motion.h2
                className="text-2xl font-bold mb-5 text-balance"
                style={{ color: "#0f172a" }}
                {...fadeUp(0.1)}
              >
                Deine Bewerbung bei uns
              </motion.h2>
              <motion.p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#64748b" }}
                {...fadeUp(0.2)}
              >
                Füll das Formular aus und lade deinen Lebenslauf hoch. Wir antworten innerhalb von 48 Stunden.
              </motion.p>
              <motion.div className="flex flex-col gap-4" {...fadeUp(0.3)}>
                <a href="mailto:info@autoklinik-reutlingen.de" className="flex items-center gap-3 text-sm" style={{ color: "#334155" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@autoklinik-reutlingen.de
                </a>
                <a href="tel:+4907121155261990" className="flex items-center gap-3 text-sm" style={{ color: "#334155" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>
                  </svg>
                  07121 15526199
                </a>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div
              className="flex-1 rounded-2xl p-8 sm:p-10"
              style={{ backgroundColor: "#f8fafc", border: "1px solid #e2eef4" }}
              {...fadeUp(0.15)}
            >
              <ApplicationForm preselected={applyJob} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ backgroundColor: "#002e40" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          <motion.div {...fadeUp(0)}>
            <p className="font-bold text-lg text-white mb-1">Fragen zu offenen Stellen?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Ruf uns einfach an oder schreib uns eine Nachricht.</p>
          </motion.div>
          <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.1)}>
            <a
              href="tel:+4907121155261990"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              Anrufen
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "#ffffff" }}
            >
              Zurück zur Startseite
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
