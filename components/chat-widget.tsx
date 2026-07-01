"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────── */
type Message = { role: "bot" | "user"; text: string };
type Flow =
  | "root"
  | "termin"
  | "preise"
  | "preise_inspektion"
  | "preise_oelwechsel"
  | "preise_bremsen"
  | "preise_tuev"
  | "preise_reifen"
  | "preise_klima"
  | "preise_unfallschaden"
  | "preise_elektrik"
  | "preise_diagnose"
  | "unfall"
  | "reifen"
  | "oel"
  | "klima"
  | "bremsen"
  | "flotte"
  | "karriere"
  | "oeffnungszeiten"
  | "notfall"
  | "rueckruf";

interface Option {
  label: string;
  flow?: Flow;
  action?: "call" | "whatsapp" | "karriere" | "rueckruf";
}

/* ─── Flow definitions ──────────────────────────────────── */
const FLOWS: Record<
  Flow,
  { message: string; options: Option[] }
> = {
  root: {
    message:
      "Hallo! Ich bin der Assistent der Autoklinik Reutlingen. Womit kann ich dir helfen?",
    options: [
      { label: "Termin vereinbaren", flow: "termin" },
      { label: "Preise & Kosten", flow: "preise" },
      { label: "Unfall / Unfallschaden", flow: "unfall" },
      { label: "Reifen", flow: "reifen" },
      { label: "Offnungszeiten", flow: "oeffnungszeiten" },
      { label: "Mehr Optionen...", flow: "flotte" },
    ],
  },
  termin: {
    message:
      "Super! Ruf uns einfach an oder schreib uns auf WhatsApp - wir finden schnell einen passenden Termin fur dich.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "WhatsApp", action: "whatsapp" },
      { label: "Ruckruf anfordern", action: "rueckruf" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise: {
    message:
      "Zu welchem Bereich mochtest du Preisinformationen? Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Olwechsel", flow: "preise_oelwechsel" },
      { label: "Inspektion", flow: "preise_inspektion" },
      { label: "Raderwechsel", flow: "preise_reifen" },
      { label: "TUV / HU", flow: "preise_tuev" },
      { label: "Klimaanlage", flow: "preise_klima" },
      { label: "Weitere", flow: "preise_mehr" },
    ],
  },
  preise_inspektion: {
    message:
      "Inspektion nach Herstellervorgaben ab 150,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_oelwechsel: {
    message:
      "Olwechsel nach Herstellervorgaben, Motorol nach freigegebener Spezifikation ab 90,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_bremsen: {
    message:
      "Fur Bremsarbeiten bitte direkt anfragen - wir kalkulieren je nach Fahrzeug und Umfang. Ruf uns kurz an! Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_tuev: {
    message:
      "HU/TUV Durchsicht (Vorcheck) ab 30,00 €. Haupt-/Abgasuntersuchung inkl. Abgasuntersuchung ab 165,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_reifen: {
    message:
      "Raderwechsel / Umstecken pro Satz ohne Wuchten ab 20,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_klima: {
    message:
      "Klima-Service (Sicherheitsprufung & Befüllen) ab 115,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_mehr: {
    message:
      "Weitere Preise im Uberblick (alle Bruttopreise exkl. MwSt.):\n- Getriebespulung ab 350,00 €\n- Achsvermessung ab 110,00 €\n- Fehlerdiagnose ab 20,00 €\n- Lichttest ab 20,00 €",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Zuruck zu Preisen", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_unfallschaden: {
    message:
      "Unfallschaden werden nach Kalkulation abgerechnet - in der Regel ubernimmt das die Versicherung des Unfallverursachers. Wir kummern uns um alles.",
    options: [
      { label: "Mehr zu Unfallservice", flow: "unfall" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_elektrik: {
    message:
      "Elektrische Diagnose ab 20,00 € (Fehlerdiagnose). Reparaturen je nach Aufwand. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  preise_diagnose: {
    message:
      "Fehlerdiagnose (Auslesen des Fehlercodespeichers) ab 20,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  unfall: {
    message:
      "Bei einem Unfall kummern wir uns um alles - von der Schadensbegutachtung uber den Kfz-Gutachter bis zur Reparatur. Du zahlst nichts, wenn der andere schuld ist.",
    options: [
      { label: "Jetzt anrufen", action: "call" },
      { label: "WhatsApp schreiben", action: "whatsapp" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  reifen: {
    message:
      "Reifenwechsel, Einlagerung, Neue Reifen - alles bei uns. Wechsel ab 39 €, Einlagerung auf Anfrage.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "WhatsApp", action: "whatsapp" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  oel: {
    message:
      "Olwechsel inkl. Olfilter ab 59 €. Wir verwenden nur herstellerfreigegebene Ole fur dein Fahrzeug.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  klima: {
    message:
      "Klimaanlage prufen & auffullen ab 79 €. Dichtigkeitstest und Desinfektion auf Wunsch.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  bremsen: {
    message:
      "Bremsbelage ab 79 € / Achse. Kostenloser Bremscheck jederzeit moglich - einfach vorbeikommen.",
    options: [
      { label: "Termin buchen", action: "call" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  flotte: {
    message:
      "Weitere Themen - womit kann ich dir helfen?",
    options: [
      { label: "Olwechsel", flow: "oel" },
      { label: "Klimaanlage", flow: "klima" },
      { label: "Bremsen", flow: "bremsen" },
      { label: "Flottenbetreuung", flow: "flotte" },
      { label: "Karriere / Jobs", action: "karriere" },
      { label: "Notfall", flow: "notfall" },
    ],
  },
  karriere: {
    message:
      "Wir suchen aktuell einen Kfz-Mechatroniker (m/w/d). Schau dir unsere Karriere-Seite an!",
    options: [
      { label: "Zur Karriere-Seite", action: "karriere" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  oeffnungszeiten: {
    message:
      "Unsere Offnungszeiten:\n\nMontag - Freitag: 08:00 - 18:00 Uhr\nSamstag: 09:00 - 14:00 Uhr\nSonntag: Geschlossen\n\nAdresse: Haldenhaustra&szlig;e 3, 72770 Reutlingen",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Route planen", action: "whatsapp" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  notfall: {
    message:
      "Bei einem Notfall ruf uns sofort an. Wir versuchen dir so schnell wie moglich zu helfen.",
    options: [
      { label: "Jetzt anrufen", action: "call" },
      { label: "WhatsApp", action: "whatsapp" },
      { label: "Zuruck", flow: "root" },
    ],
  },
  rueckruf: {
    message: "Hinterlasse deinen Namen und deine Telefonnummer - wir rufen dich zuruck.",
    options: [],
  },
};

/* ─── Callback form ─────────────────────────────────────── */
function CallbackForm({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    try {
      await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message: "Ruckrufanfrage", flow: "rueckruf" }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="p-4 text-sm text-center space-y-3">
        <div className="text-2xl">&#10003;</div>
        <p className="font-semibold" style={{ color: "#e2e8f0" }}>Danke! Wir rufen dich zuruck.</p>
        <button onClick={onBack} className="text-xs underline" style={{ color: "#0074a2" }}>
          Zuruck zum Menu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
        Ruckruf anfordern
      </p>
      <input
        type="text"
        placeholder="Dein Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg px-3 py-2 text-sm outline-none border"
        style={{
          background: "rgba(255,255,255,0.06)",
          borderColor: "rgba(255,255,255,0.12)",
          color: "#e2e8f0",
        }}
      />
      <input
        type="tel"
        placeholder="Telefonnummer"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-lg px-3 py-2 text-sm outline-none border"
        style={{
          background: "rgba(255,255,255,0.06)",
          borderColor: "rgba(255,255,255,0.12)",
          color: "#e2e8f0",
        }}
      />
      <p className="text-xs" style={{ color: "#64748b" }}>
        Deine Daten werden nur fur den Ruckruf verwendet.{" "}
        <Link href="/datenschutz" className="underline hover:text-[#0074a2]" target="_blank">
          Datenschutz
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg px-3 py-2 text-xs border transition-colors"
          style={{ borderColor: "rgba(255,255,255,0.12)", color: "#94a3b8" }}
        >
          Zuruck
        </button>
        <button
          type="submit"
          disabled={loading || !name || !phone}
          className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-40"
          style={{ background: "#0074a2", color: "#fff" }}
        >
          {loading ? "..." : "Absenden"}
        </button>
      </div>
    </form>
  );
}

/* ─── Main widget ───────────────────────────────────────── */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>("root");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showProactive, setShowProactive] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* proactive bubble after 4s, once */
  useEffect(() => {
    const dismissed = localStorage.getItem("ak_chat_dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setShowProactive(true), 4000);
    return () => clearTimeout(t);
  }, []);

  /* scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* open + first message */
  function openChat() {
    setShowProactive(false);
    setProactiveDismissed(true);
    localStorage.setItem("ak_chat_dismissed", "1");
    if (!open) {
      setOpen(true);
      if (messages.length === 0) {
        addBotMessage(FLOWS.root.message);
      }
    }
  }

  function addBotMessage(text: string) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text }]);
    }, 600);
  }

  function handleOption(opt: Option) {
    setMessages((prev) => [...prev, { role: "user", text: opt.label }]);

    if (opt.action === "call") {
      window.location.href = "tel:+4971219886660";
      return;
    }
    if (opt.action === "whatsapp") {
      window.open("https://wa.me/4971219886660", "_blank");
      return;
    }
    if (opt.action === "karriere") {
      window.location.href = "/karriere";
      return;
    }
    if (opt.action === "rueckruf" || opt.flow === "rueckruf") {
      setFlow("rueckruf");
      addBotMessage(FLOWS.rueckruf.message);
      return;
    }
    if (opt.flow) {
      setFlow(opt.flow);
      addBotMessage(FLOWS[opt.flow].message);
    }
  }

  const currentFlow = FLOWS[flow];

  return (
    <>
      {/* Proactive bubble */}
      <AnimatePresence>
        {showProactive && !open && !proactiveDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 max-w-xs rounded-2xl px-4 py-3 shadow-xl text-sm cursor-pointer"
            style={{
              background: "rgba(0,46,64,0.97)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(0,116,162,0.3)",
              color: "#e2e8f0",
            }}
            onClick={openChat}
          >
            <button
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{ background: "#1e293b", color: "#94a3b8" }}
              onClick={(e) => {
                e.stopPropagation();
                setShowProactive(false);
                setProactiveDismissed(true);
                localStorage.setItem("ak_chat_dismissed", "1");
              }}
              aria-label="Schliessen"
            >
              x
            </button>
            <p className="font-medium" style={{ color: "#fff" }}>Hallo! Kann ich helfen?</p>
            <p className="mt-0.5 text-xs" style={{ color: "#94a3b8" }}>
              Termin, Preise, Fragen - ich bin hier.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              background: "rgba(5,15,25,0.97)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,116,162,0.25)",
              maxHeight: "520px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: "linear-gradient(135deg, #002e40 0%, #0074a2 100%)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">Autoklinik</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Assistent</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                aria-label="Chat schliessen"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line"
                    style={
                      msg.role === "bot"
                        ? {
                            background: "rgba(255,255,255,0.07)",
                            color: "#e2e8f0",
                            borderBottomLeftRadius: "4px",
                          }
                        : {
                            background: "#0074a2",
                            color: "#fff",
                            borderBottomRightRadius: "4px",
                          }
                    }
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-4 py-3 flex gap-1 items-center"
                    style={{ background: "rgba(255,255,255,0.07)", borderBottomLeftRadius: "4px" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#64748b" }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Callback form or quick replies */}
            {flow === "rueckruf" ? (
              <div className="shrink-0 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <CallbackForm onBack={() => { setFlow("root"); addBotMessage(FLOWS.root.message); }} />
              </div>
            ) : (
              !typing && currentFlow.options.length > 0 && (
                <div
                  className="shrink-0 px-4 pb-4 pt-3 flex flex-wrap gap-2 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  {currentFlow.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOption(opt)}
                      className="rounded-full px-3 py-1.5 text-xs font-medium border transition-all hover:scale-105 active:scale-95"
                      style={{
                        borderColor: "rgba(0,116,162,0.4)",
                        color: "#7dd3fc",
                        background: "rgba(0,116,162,0.08)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={openChat}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #002e40 0%, #0074a2 100%)",
        }}
        aria-label="Chat offnen"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
