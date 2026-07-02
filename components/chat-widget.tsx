"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  | "rueckruf"
  | "preise_mehr"
  | "termin_help";

interface Option {
  label: string;
  flow?: Flow;
  action?: "call" | "whatsapp" | "karriere" | "rueckruf" | "online";
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
      { label: "Öffnungszeiten", flow: "oeffnungszeiten" },
      { label: "Mehr Optionen...", flow: "flotte" },
    ],
  },
  termin: {
    message:
      "Wie möchtest du deinen Termin vereinbaren?",
    options: [
      { label: "Online buchen", action: "online" },
      { label: "WhatsApp", action: "whatsapp" },
      { label: "Anrufen", action: "call" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise: {
    message:
      "Zu welchem Bereich möchtest du Preisinformationen? Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Ölwechsel", flow: "preise_oelwechsel" },
      { label: "Inspektion", flow: "preise_inspektion" },
      { label: "Räderwechsel", flow: "preise_reifen" },
      { label: "TÜV / HU", flow: "preise_tuev" },
      { label: "Klimaanlage", flow: "preise_klima" },
      { label: "Weitere", flow: "preise_mehr" },
    ],
  },
  preise_inspektion: {
    message:
      "Inspektion nach Herstellervorgaben ab 150,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_oelwechsel: {
    message:
      "Ölwechsel nach Herstellervorgaben, Motoröl nach freigegebener Spezifikation ab 90,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_bremsen: {
    message:
      "Für Bremsarbeiten bitte direkt anfragen - wir kalkulieren je nach Fahrzeug und Umfang. Ruf uns kurz an! Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_tuev: {
    message:
      "HU/TÜV Durchsicht (Vorcheck) ab 30,00 €. Haupt-/Abgasuntersuchung inkl. Abgasuntersuchung ab 165,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_reifen: {
    message:
      "Räderwechsel / Umstecken pro Satz ohne Wuchten ab 20,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_klima: {
    message:
      "Klima-Service (Sicherheitsprüfung & Befüllen) ab 115,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_mehr: {
    message:
      "Weitere Preise im Überblick (alle Bruttopreise exkl. MwSt.):\n- Getriebespülung ab 350,00 €\n- Achsvermessung ab 110,00 €\n- Fehlerdiagnose ab 20,00 €\n- Lichttest ab 20,00 €",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Zurück zu Preisen", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_unfallschaden: {
    message:
      "Unfallschäden werden nach Kalkulation abgerechnet - in der Regel übernimmt das die Versicherung des Unfallverursachers. Wir kümmern uns um alles.",
    options: [
      { label: "Mehr zu Unfallservice", flow: "unfall" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_elektrik: {
    message:
      "Elektrische Diagnose ab 20,00 € (Fehlerdiagnose). Reparaturen je nach Aufwand. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  preise_diagnose: {
    message:
      "Fehlerdiagnose (Auslesen des Fehlercodes­speichers) ab 20,00 €. Alle Preise sind Bruttopreise exkl. MwSt.",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Weitere Preise", flow: "preise" },
      { label: "Zurück", flow: "root" },
    ],
  },
  unfall: {
    message:
      "Bei einem Unfall kümmern wir uns um alles - von der Schadensbegutachtung über den Kfz-Gutachter bis zur Reparatur. Du zahlst nichts, wenn der andere schuld ist.",
    options: [
      { label: "Jetzt anrufen", action: "call" },
      { label: "WhatsApp schreiben", action: "whatsapp" },
      { label: "Zurück", flow: "root" },
    ],
  },
  reifen: {
    message:
      "Räderwechsel / Umstecken pro Satz ohne Wuchten ab 20,00 €. Einlagerung auf Anfrage. Alle Preise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "WhatsApp", action: "whatsapp" },
      { label: "Zurück", flow: "root" },
    ],
  },
  oel: {
    message:
      "Ölwechsel nach Herstellervorgaben, Motoröl nach freigegebener Spezifikation ab 90,00 €. Alle Preise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Zurück", flow: "root" },
    ],
  },
  klima: {
    message:
      "Klima-Service (Sicherheitsprüfung & Befüllen) ab 115,00 €. Alle Preise exkl. MwSt.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Zurück", flow: "root" },
    ],
  },
  bremsen: {
    message:
      "Für Bremsarbeiten bitte direkt anfragen - wir kalkulieren je nach Fahrzeug und Umfang. Kostenloser Bremscheck jederzeit möglich.",
    options: [
      { label: "Termin buchen", flow: "termin" },
      { label: "Zurück", flow: "root" },
    ],
  },
  flotte: {
    message:
      "Weitere Themen - womit kann ich dir helfen?",
    options: [
      { label: "Ölwechsel", flow: "oel" },
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
      { label: "Zurück", flow: "root" },
    ],
  },
  oeffnungszeiten: {
    message:
      "Unsere Öffnungszeiten:\n\nMontag - Freitag: 08:00 - 18:00 Uhr\nSamstag: 09:00 - 14:00 Uhr\nSonntag: Geschlossen\n\nAdresse: Haldenhausstraße 3, 72770 Reutlingen",
    options: [
      { label: "Anrufen", action: "call" },
      { label: "Route planen", action: "whatsapp" },
      { label: "Zurück", flow: "root" },
    ],
  },
  notfall: {
    message:
      "Bei einem Notfall ruf uns sofort an. Wir versuchen dir so schnell wie möglich zu helfen.",
    options: [
      { label: "Jetzt anrufen", action: "call" },
      { label: "WhatsApp", action: "whatsapp" },
      { label: "Zurück", flow: "root" },
    ],
  },
  rueckruf: {
    message: "Hinterlasse deinen Namen und deine Telefonnummer - wir rufen dich zurück.",
    options: [],
  },
  termin_help: {
    message: "Was kann ich für dich tun?",
    options: [
      { label: "Welche Leistung soll ich wählen?", flow: "preise" },
      { label: "Lieber anrufen", action: "call" },
      { label: "WhatsApp schreiben", action: "whatsapp" },
      { label: "Alles klar, danke!", flow: "root" },
    ],
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>("root");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showProactive, setShowProactive] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* proactive bubble after 4s, once */
  useEffect(() => {
    const dismissed = localStorage.getItem("ak_chat_dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setShowProactive(true), 4000);
    return () => clearTimeout(t);
  }, []);

  /* on /terminbuchung: open chat after 3s with booking-specific message */
  useEffect(() => {
    if (pathname !== "/terminbuchung") return;
    const alreadyShown = sessionStorage.getItem("ak_termin_chat");
    if (alreadyShown) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("ak_termin_chat", "1");
      setShowProactive(false);
      setOpen(true);
      setMessages([]);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            role: "bot",
            text: "Brauchst du Hilfe bei der Terminbuchung? Ich bin gleich da - einfach fragen! 👋",
          },
        ]);
        // follow-up after 2s
        setTimeout(() => {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [
              ...prev,
              {
                role: "bot",
                text: "Falls du unsicher bist welche Leistung du buchen sollst, oder lieber direkt anrufen möchtest - ich helfe dir weiter.",
              },
            ]);
            setFlow("termin_help");
          }, 800);
        }, 2000);
      }, 700);
    }, 3000);
    return () => clearTimeout(t);
  }, [pathname]);

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
    if (opt.action === "online") {
      window.location.href = "/terminbuchung";
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

  async function sendMessage(text: string) {
    if (!text.trim() || aiLoading) return;
    setInput("");
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setAiLoading(true);

    // Build conversation history for the AI (last 10 messages)
    const history = [...messages, userMsg].slice(-10).map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error("Fehler");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let botText = "";
      setMessages((prev) => [...prev, { role: "bot", text: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          botText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "bot", text: botText };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, da ist etwas schiefgelaufen. Ruf uns kurz an: 07121 988 6660" },
      ]);
    } finally {
      setAiLoading(false);
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

            {/* Callback form or quick replies + text input */}
            {flow === "rueckruf" ? (
              <div className="shrink-0 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <CallbackForm onBack={() => { setFlow("root"); addBotMessage(FLOWS.root.message); }} />
              </div>
            ) : (
              <div className="shrink-0 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                {/* Quick reply buttons */}
                {!typing && !aiLoading && currentFlow.options.length > 0 && (
                  <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
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
                )}
                {/* Free text input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex items-center gap-2 px-3 pb-3 pt-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Eigene Frage stellen..."
                    disabled={aiLoading}
                    className="flex-1 rounded-xl px-3 py-2 text-sm outline-none disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "#e2e8f0",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !input.trim()}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-opacity disabled:opacity-40"
                    style={{ background: "#0074a2" }}
                    aria-label="Senden"
                  >
                    {aiLoading ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="animate-spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    )}
                  </button>
                </form>
              </div>
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
