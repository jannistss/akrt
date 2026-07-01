"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";

// ── Wizard Step Types ────────────────────────────────────────────────────────

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
  cvFile: File | null;
};

const TOTAL_STEPS = 4;

const stepTitles = [
  "Wer bist du?",
  "Wie erreichen wir dich?",
  "Warum Autoklinik?",
  "Deine Unterlagen",
];

const stepDescriptions = [
  "Stell dich kurz vor.",
  "So können wir uns melden.",
  "Erzähl uns von dir.",
  "Fast geschafft — lad deinen Lebenslauf hoch.",
];

// ── Step Progress Bar ────────────────────────────────────────────────────────

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
            animate={{
              backgroundColor: i < step ? "#0074a2" : i === step ? "#002e40" : "#e2eef4",
              color: i <= step ? "#ffffff" : "#94a3b8",
            }}
            transition={{ duration: 0.3 }}
          >
            {i < step ? (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              i + 1
            )}
          </motion.div>
          {i < TOTAL_STEPS - 1 && (
            <motion.div
              className="h-0.5 w-8 sm:w-14 rounded-full"
              animate={{ backgroundColor: i < step ? "#0074a2" : "#e2eef4" }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Individual Steps ─────────────────────────────────────────────────────────

function StepOne({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const inputCls = "w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0074a2]/30 focus:border-[#0074a2]";
  const inputStyle = { borderColor: "#d5e8f0", backgroundColor: "#f8fafc", color: "#0f172a" };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Vor- und Nachname *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="z.B. Max Mustermann"
          className={inputCls}
          style={inputStyle}
          required
          autoFocus
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Telefonnummer *
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+49 ..."
          className={inputCls}
          style={inputStyle}
          required
        />
      </div>
    </div>
  );
}

function StepTwo({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const inputCls = "w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0074a2]/30 focus:border-[#0074a2]";
  const inputStyle = { borderColor: "#d5e8f0", backgroundColor: "#f8fafc", color: "#0f172a" };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          E-Mail-Adresse *
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="deine@email.de"
          className={inputCls}
          style={inputStyle}
          required
          autoFocus
        />
        <p className="mt-2 text-xs" style={{ color: "#94a3b8" }}>
          Wir nutzen deine E-Mail nur für diese Bewerbung.
        </p>
      </div>
    </div>
  );
}

function StepThree({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  const inputCls = "w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0074a2]/30 focus:border-[#0074a2]";
  const inputStyle = { borderColor: "#d5e8f0", backgroundColor: "#f8fafc", color: "#0f172a" };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
          Warum Autoklinik? Erzähl uns von dir. *
        </label>
        <textarea
          value={data.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Was motiviert dich? Welche Erfahrungen bringst du mit? Warum passt du zu uns?&#10;&#10;Keine Angst — ein paar ehrliche Sätze reichen."
          className={inputCls}
          style={{ ...inputStyle, resize: "vertical", minHeight: 160 }}
          required
          autoFocus
        />
        <p className="mt-2 text-xs" style={{ color: "#94a3b8" }}>
          {data.message.length} Zeichen — je ehrlicher desto besser.
        </p>
      </div>
    </div>
  );
}

function StepFour({ data, onFileChange }: { data: FormData; onFileChange: (file: File | null) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>
          Lebenslauf (PDF, max. 10 MB) — optional
        </label>
        <div
          className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200"
          style={{
            borderColor: dragging ? "#0074a2" : data.cvFile ? "#0074a2" : "#d5e8f0",
            backgroundColor: dragging ? "rgba(0,116,162,0.04)" : data.cvFile ? "rgba(0,116,162,0.03)" : "#f8fafc",
          }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFileChange(f);
          }}
        >
          {data.cvFile ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "#dbeafe" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-center" style={{ color: "#0074a2" }}>{data.cvFile.name}</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>
                {(data.cvFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
                className="text-xs font-semibold underline"
                style={{ color: "#dc2626" }}
              >
                Entfernen
              </button>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "#f0f7ff" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#475569" }}>Datei hierher ziehen oder klicken</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>PDF, DOC oder DOCX — max. 10 MB</p>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>
      <div className="rounded-2xl px-5 py-4 text-sm" style={{ backgroundColor: "#f0f7ff", border: "1px solid #dbeafe" }}>
        <p className="font-semibold mb-1" style={{ color: "#1d4ed8" }}>Kein Lebenslauf? Kein Problem.</p>
        <p style={{ color: "#475569" }}>Du kannst deine Bewerbung auch ohne Lebenslauf abschicken — wir melden uns trotzdem bei dir.</p>
      </div>
    </div>
  );
}

// ── Success ───────────────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 py-10 text-center"
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundColor: "#dcfce7" }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </motion.div>
      <div>
        <h3 className="text-2xl font-extrabold mb-2" style={{ color: "#0f172a" }}>
          Danke, {name.split(" ")[0]}!
        </h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#64748b" }}>
          Wir haben deine Bewerbung erhalten und melden uns in der Regel innerhalb von <strong>2 Werktagen</strong> bei dir.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: "#0074a2" }}
        >
          Zurück zur Startseite
        </Link>
        <a
          href="tel:+4907121155261990"
          className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
          style={{ borderColor: "#d5e8f0", color: "#475569" }}
        >
          Uns anrufen
        </a>
      </div>
    </motion.div>
  );
}

// ── Wizard ────────────────────────────────────────────────────────────────────

function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>({ name: "", phone: "", email: "", message: "", cvFile: null });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(key: keyof FormData, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function canAdvance(): boolean {
    if (step === 0) return data.name.trim().length > 1 && data.phone.trim().length > 5;
    if (step === 1) return data.email.includes("@");
    if (step === 2) return data.message.trim().length > 10;
    return true;
  }

  function advance() {
    if (!canAdvance()) return;
    setDirection(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function submit() {
    setStatus("sending");
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("position", "Kfz-Mechatroniker / Mechaniker (m/w/d)");
    fd.append("message", data.message);
    if (data.cvFile) fd.append("cv", data.cvFile);

    const res = await fetch("/api/apply", { method: "POST", body: fd });
    const json = await res.json();
    if (res.ok) {
      setStatus("success");
    } else {
      setErrorMsg(json.error ?? "Fehler beim Senden. Bitte versuche es erneut.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <SuccessScreen name={data.name} />;
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Step bar */}
      <div className="flex flex-col gap-3">
        <StepBar step={step} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#0074a2" }}>
            Schritt {step + 1} von {TOTAL_STEPS}
          </p>
          <h3 className="text-xl font-extrabold" style={{ color: "#0f172a" }}>{stepTitles[step]}</h3>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>{stepDescriptions[step]}</p>
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: EASE }}
          >
            {step === 0 && <StepOne data={data} onChange={handleChange} />}
            {step === 1 && <StepTwo data={data} onChange={handleChange} />}
            {step === 2 && <StepThree data={data} onChange={handleChange} />}
            {step === 3 && <StepFour data={data} onFileChange={(f) => setData((d) => ({ ...d, cvFile: f }))} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <motion.p
          className="rounded-2xl px-5 py-4 text-sm"
          style={{ backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorMsg}
        </motion.p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:border-[#0074a2] hover:text-[#0074a2] disabled:opacity-0 disabled:pointer-events-none"
          style={{ borderColor: "#d5e8f0", color: "#475569" }}
          disabled={step === 0}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zurück
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <motion.button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#002e40" }}
            whileTap={{ scale: 0.97 }}
          >
            Weiter
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.98] disabled:opacity-60"
            style={{ backgroundColor: "#0074a2" }}
            whileTap={{ scale: 0.97 }}
          >
            {status === "sending" ? (
              <>
                <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
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
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const requirements = [
  "Abgeschlossene Ausbildung als Kfz-Mechatroniker oder Kfz-Mechaniker",
  "Erfahrung mit Fahrzeugen unterschiedlicher Marken und Baujahre",
  "Selbstständige, sorgfältige Arbeitsweise",
  "Teamfähigkeit und Kundenorientierung",
  "Führerschein Klasse B",
  "Deutschkenntnisse mindestens B2",
];

const whatWeOffer = [
  "Vollzeit, Montag bis Freitag — keine Wochenendschichten",
  "Leistungsgerechte Vergütung nach Erfahrung",
  "Direkter Draht zur Geschäftsleitung, flache Hierarchien",
  "Moderner Maschinenpark und aktuelle Diagnosetechnik",
  "Weiterbildungen und Schulungen werden unterstützt",
  "Familiäres Team, das zusammenhält",
];

export default function KfzMechatronikerPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001e2d 0%, #003652 60%, #004a70 100%)", minHeight: 480 }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,116,162,0.25) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 flex flex-col gap-6">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/karriere"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Alle Stellen
            </Link>
          </motion.div>

          <div className="flex flex-wrap gap-3 mb-2">
            <motion.span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "rgba(0,116,162,0.25)", color: "#60c8f0", border: "1px solid rgba(96,200,240,0.2)" }} {...fadeUp(0.05)}>
              Vollzeit
            </motion.span>
            <motion.span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "rgba(22,163,74,0.2)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }} {...fadeUp(0.1)}>
              Sofort verfugbar
            </motion.span>
          </div>

          <motion.h1
            className="font-extrabold tracking-tight text-white text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
            {...fadeUp(0.15)}
          >
            Kfz-Mechatroniker /<br />Mechaniker (m/w/d)
          </motion.h1>

          <motion.div className="flex flex-wrap gap-6" {...fadeUp(0.25)}>
            {[
              { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0", label: "Reutlingen" },
              { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", label: "Meisterbetrieb" },

            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60c8f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={item.icon}/>
                </svg>
                {item.label}
              </div>
            ))}
          </motion.div>

          <motion.div className="flex flex-wrap gap-3 mt-4" {...fadeUp(0.3)}>
            <a
              href="#bewerben"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[.98]"
              style={{ backgroundColor: "#0074a2" }}
            >
              Jetzt bewerben
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Job Details ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Requirements */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#0074a2" }} variants={staggerItem}>
                Dein Profil
              </motion.p>
              <motion.h2 className="text-xl font-extrabold mb-8" style={{ color: "#0f172a" }} variants={staggerItem}>
                Was wir uns wünschen
              </motion.h2>
              <ul className="flex flex-col gap-4">
                {requirements.map((r) => (
                  <motion.li key={r} variants={staggerItem} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#dbeafe" }}>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#334155" }}>{r}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* What we offer */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#0074a2" }} variants={staggerItem}>
                Deine Benefits
              </motion.p>
              <motion.h2 className="text-xl font-extrabold mb-8" style={{ color: "#0f172a" }} variants={staggerItem}>
                Was wir dir bieten
              </motion.h2>
              <ul className="flex flex-col gap-4">
                {whatWeOffer.map((item) => (
                  <motion.li key={item} variants={staggerItem} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#dcfce7" }}>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#334155" }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Application Wizard ── */}
      <section id="bewerben" style={{ backgroundColor: "#f0f7ff" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#0074a2" }} {...fadeUp(0)}>
            Bewerbung
          </motion.p>
          <motion.h2 className="text-2xl font-extrabold mb-3 text-balance" style={{ color: "#0f172a" }} {...fadeUp(0.1)}>
            In 4 Schritten bewerben
          </motion.h2>
          <motion.p className="text-sm leading-relaxed mb-12" style={{ color: "#64748b" }} {...fadeUp(0.15)}>
            Kein langes Formular. Nur das Wichtigste — dauert unter 2 Minuten.
          </motion.p>

          <motion.div
            className="rounded-3xl p-8 sm:p-10"
            style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0", boxShadow: "0 8px 40px rgba(0,46,64,0.08)" }}
            {...fadeUp(0.2)}
          >
            <ApplicationWizard />
          </motion.div>

          <motion.div className="mt-10 text-center" {...fadeUp(0.3)}>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Lieber persönlich?{" "}
              <a href="tel:+4907121155261990" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>
                07121 15526199
              </a>
              {" "}oder{" "}
              <a href="https://wa.me/4917661973298" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: "#0074a2" }}>
                WhatsApp
              </a>
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
