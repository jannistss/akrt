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
  const [terminData, setTerminData] = useState<null | { leistung: string; fahrzeug: string; kennzeichen: string; datum: string; extras: string; name: string; telefon: string; email: string }>(null);
  const [terminSent, setTerminSent] = useState(false);
  const [terminSending, setTerminSending] = useState(false);
  const [chatStep, setChatStep] = useState<"idle"|"datum"|"kennzeichen"|"upsell"|"name"|"telefon"|"email">("idle");
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [conversationStarted, setConversationStarted] = useState(false);
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

  async function sendMessage(text: string, isRetry = false) {
    if (!text.trim() || aiLoading) return;
    if (!isRetry) setInput("");
    const userMsg: Message = { role: "user", text };

    setMessages((prev) => {
      const base = isRetry ? prev.slice(0, -1) : prev;
      return [...base, userMsg];
    });
    setAiLoading(true);
    setLastFailedMessage(null);
    setConversationStarted(true);

    // Build conversation history for the AI (last 10 messages)
    const history = [...messages, userMsg].slice(-10).map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));

    console.log("[v0] sendMessage start:", text, "history length:", history.length);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.log("[v0] sendMessage TIMEOUT after 55s for:", text);
      controller.abort();
    }, 55000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      console.log("[v0] fetch response status:", res.status);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

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

      console.log("[v0] stream complete, botText length:", botText.length, "preview:", botText.slice(0, 80));

      // If model returned nothing useful — likely a rate-limit from the server
      if (!botText.trim()) throw new Error("RATE_LIMIT");

      // Detect chat step from bot text to show contextual chips/inputs
      const lower = botText.toLowerCase();
      if (lower.includes("was ist dein kennzeichen") || lower.includes("dein kennzeichen")) {
        setChatStep("kennzeichen");
      } else if ((lower.includes("marke") && lower.includes("modell")) || lower.includes("fahrzeugmarke")) {
        setChatStep("idle");
      } else if (lower.includes("für wann") || lower.includes("wann wünschst") || lower.includes("zeitraum")) {
        setChatStep("datum");
      } else if (lower.includes("wäsche dazubuchen") || lower.includes("fahrzeugwäsche") || lower.includes("autowäsche")) {
        setChatStep("upsell");
      } else if (lower.includes("auf welchen namen") || lower.includes("welchen namen")) {
        setChatStep("name");
      } else if (lower.includes("telefonnummer") || lower.includes("rufnummer") || lower.includes("erreichen")) {
        setChatStep("telefon");
      } else if (lower.includes("e-mail") || lower.includes("email") || lower.includes("terminbestätigung schicken")) {
        setChatStep("email");
      } else {
        setChatStep("idle");
      }

      // Detect TERMIN_BEREIT signal from AI (delimited format)
      const terminMatch = botText.match(/###TERMIN_BEREIT###\s*([\s\S]*?)\s*###ENDE###/);
      if (terminMatch) {
        try {
          const data = JSON.parse(terminMatch[1]);

          // Helper: catch ANY placeholder the AI might write
          const isEmpty = (v: string) => {
            if (!v) return true;
            const low = v.toLowerCase().trim();
            // Catch: "", "...", "[...]", anything containing "nicht genannt", "nicht angegeben", "kein", "keine", "unbekannt", "n/a"
            return (
              low === "" || low === "..." || low === "n/a" || low === "tbd" ||
              v.startsWith("[") ||
              low.includes("nicht genannt") || low.includes("nicht angegeben") ||
              low.includes("kein kennzeichen") || low.includes("keine angabe") ||
              low.includes("unbekannt") || low.includes("noch nicht")
            );
          };

          // Always scan the full chat history and override bad JSON values
          const userMsgs = messages.filter((m) => m.role === "user").map((m) => m.text.trim());

          // Extract Leistung from chat
          if (isEmpty(data.leistung)) {
            const LEISTUNGEN = ["tüv", "hu+au", "hauptuntersuchung", "ölwechsel", "oelwechsel", "inspektion", "räderwechsel", "reifenwechsel", "bremsen", "klima", "diagnose", "unfall", "glasservice", "achsvermessung"];
            for (const msg of userMsgs) {
              const found = LEISTUNGEN.find((l) => msg.toLowerCase().includes(l));
              if (found) { data.leistung = msg.trim(); break; }
            }
          }

          // Extract Fahrzeug from chat
          if (isEmpty(data.fahrzeug)) {
            const MARKEN = ["vw", "volkswagen", "bmw", "mercedes", "benz", "audi", "opel", "ford", "toyota", "hyundai", "kia", "seat", "skoda", "renault", "peugeot", "citroen", "fiat", "honda", "mazda", "nissan", "volvo", "porsche", "mini", "smart", "tesla", "golf", "polo", "passat", "a3", "a4", "3er", "5er", "c-klasse", "e-klasse"];
            for (const msg of userMsgs) {
              const lower = msg.toLowerCase();
              if (MARKEN.some((m) => lower.includes(m))) { data.fahrzeug = msg.trim(); break; }
            }
          }

          // Extract Kennzeichen from chat (always rescan — AI often gets this wrong)
          const plateRegex = /\b[A-ZÄÖÜ]{1,3}[\s-][A-ZÄÖÜ]{1,2}[\s-]?\d{1,4}[EH]?\b/i;
          for (const msg of userMsgs) {
            const match = msg.match(plateRegex);
            if (match) { data.kennzeichen = match[0].toUpperCase().replace(/\s+/g, " "); break; }
          }

          console.log("[v0] TERMIN_BEREIT detected:", data);
          setTerminData(data);
          setChatStep("idle");
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "bot",
              text: botText.replace(/###TERMIN_BEREIT###[\s\S]*?###ENDE###/, "").trim(),
            };
            return updated;
          });
        } catch (parseErr) {
          console.log("[v0] TERMIN_BEREIT JSON parse failed:", parseErr, "raw:", terminMatch[1]);
        }
      }
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      const errMsg = err instanceof Error ? err.message : String(err);
      const isRateLimit = errMsg === "RATE_LIMIT" || errMsg.includes("500") || errMsg.includes("rate");
      setLastFailedMessage(text);
      let errorText = "Kurzer Fehler — bitte nochmal versuchen.";
      if (isAbort) errorText = "Die Antwort hat zu lange gedauert. Bitte nochmal versuchen.";
      else if (isRateLimit) errorText = "Zu viele Anfragen — bitte 30 Sekunden warten und es nochmal versuchen.";
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: errorText },
      ]);
      setChatStep("idle");
    } finally {
      clearTimeout(timeout);
      setAiLoading(false);
    }
  }

  async function sendTermin() {
    if (!terminData || terminSending) return;
    setTerminSending(true);
    const chatSummary = messages
      .filter((m) => m.text && !m.text.includes("###TERMIN_BEREIT###"))
      .map((m, i) => `[${i + 1}] ${m.role === "user" ? "Kunde" : "Assistent"}: ${m.text.replace(/<[^>]*>/g, "")}`)
      .join("\n");
    try {
      const res = await fetch("/api/chat-termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...terminData, chatSummary }),
      });
      if (!res.ok) throw new Error("Fehler");
      setTerminSent(true);
      setTerminData(null);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Super ${terminData.name}! Deine Terminanfrage wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich unter ${terminData.telefon}. Bis bald!`,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Leider gab es einen Fehler beim Senden. Ruf uns kurz an: 07121 988 6660" },
      ]);
    } finally {
      setTerminSending(false);
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
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} ${msg.role === "bot" && msg.text === "" ? "hidden" : ""}`}
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

              {/* Typing indicator — shown for both bot flows and AI loading */}
              {(typing || aiLoading) && (
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
                {/* Quick reply buttons — only shown before conversation starts */}
                {!typing && !aiLoading && currentFlow.options.length > 0 && chatStep === "idle" && !conversationStarted && (
                  <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
                  {currentFlow.options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleOption(opt); }}
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
                {/* Booking confirmation card */}
                {terminData && !terminSent && (
                  <div className="px-3 pb-3 pt-1">
                    {/* Summary card */}
                    <div className="rounded-xl p-3 mb-2 text-xs space-y-1.5" style={{ background: "rgba(0,116,162,0.10)", border: "1px solid rgba(0,116,162,0.25)" }}>
                      <p className="font-semibold text-[11px] uppercase tracking-wide mb-2" style={{ color: "#7dd3fc" }}>Zusammenfassung</p>
                      {(() => {
                        // Clean up any placeholder the AI might write
                        const clean = (v: string) => {
                          if (!v) return "–";
                          const low = v.toLowerCase().trim();
                          if (v.startsWith("[") || low === "..." || low === "n/a" || low.includes("nicht genannt") || low.includes("nicht angegeben") || low.includes("kein") || low.includes("unbekannt") || low.includes("noch nicht")) return "–";
                          return v;
                        };
                        const fahrzeug = [clean(terminData.fahrzeug), terminData.kennzeichen ? `· ${terminData.kennzeichen}` : ""].filter(Boolean).join(" ");
                        const hasExtras = terminData.extras && terminData.extras !== "Nein danke" && terminData.extras !== "Keine" && terminData.extras !== "–";
                        // Estimate price from leistung string
                        const priceMap: Record<string, string> = {
                          "tüv": "ab 165,00 €", "hu": "ab 165,00 €", "hauptuntersuchung": "ab 165,00 €",
                          "inspektion": "ab 150,00 €", "ölwechsel": "ab 90,00 €", "oelwechsel": "ab 90,00 €",
                          "räderwechsel": "ab 20,00 €", "reifenwechsel": "ab 20,00 €",
                          "klima": "ab 115,00 €", "bremsen": "auf Anfrage", "diagnose": "ab 20,00 €",
                        };
                        const leistungLower = (terminData.leistung || "").toLowerCase();
                        const basePrice = Object.entries(priceMap).find(([k]) => leistungLower.includes(k))?.[1] ?? "auf Anfrage";
                        const extraPrice = hasExtras && terminData.extras?.includes("49,99") ? 49.99 : hasExtras && terminData.extras?.includes("13,99") ? 13.99 : 0;
                        const priceStr = extraPrice > 0 ? `${basePrice} + ${extraPrice.toFixed(2).replace(".", ",")} € Wäsche (zzgl. 19% MwSt.)` : `${basePrice} zzgl. 19% MwSt.`;
                        const rows = [
                          { label: "Fahrzeug", value: fahrzeug },
                          { label: "Leistung", value: clean(terminData.leistung) },
                          { label: "Wunschtermin", value: clean(terminData.datum) },
                          ...(hasExtras ? [{ label: "Extras", value: terminData.extras }] : []),
                          { label: "Preis", value: priceStr },
                          { label: "Name", value: clean(terminData.name) },
                          { label: "Telefon", value: clean(terminData.telefon) },
                          ...(terminData.email && terminData.email !== "–" ? [{ label: "E-Mail", value: terminData.email }] : []),
                        ];
                        return rows.map(({ label, value }) => (
                          <div key={label} className="flex gap-2">
                            <span className="shrink-0 w-20" style={{ color: "#94a3b8" }}>{label}</span>
                            <span className="font-medium" style={{ color: "#e2e8f0" }}>{value as string}</span>
                          </div>
                        ));
                      })()}
                    </div>
                    <button
                      onClick={sendTermin}
                      disabled={terminSending}
                      className="w-full rounded-xl py-2.5 text-sm font-semibold transition-opacity disabled:opacity-60"
                      style={{ background: "#0074a2", color: "#fff" }}
                    >
                      {terminSending ? "Wird gesendet..." : "Terminanfrage jetzt absenden"}
                    </button>
                    <p className="text-center text-xs mt-1.5" style={{ color: "#64748b" }}>
                      Wir melden uns telefonisch & per E-Mail zur Bestätigung
                    </p>
                  </div>
                )}

                {/* Retry button */}
                {lastFailedMessage && !aiLoading && (
                  <div className="px-3 pt-2">
                    <button
                      onClick={() => sendMessage(lastFailedMessage, true)}
                      className="w-full rounded-xl py-2 text-xs font-medium border transition-all"
                      style={{ borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5", background: "rgba(239,68,68,0.08)" }}
                    >
                      Nochmal versuchen
                    </button>
                  </div>
                )}

                {/* Contextual quick chips */}
                {!aiLoading && chatStep !== "idle" && chatStep !== "kennzeichen" && (
                  <div className="px-3 pt-2 flex flex-wrap gap-1.5">
                    {chatStep === "datum" && ["Nächste Woche", "Ich bin flexibel", "Montag", "Dienstag", "Mittwoch", "Donnerstag"].map((chip) => (
                      <button key={chip} type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setInput(""); sendMessage(chip); }}
                        className="rounded-full px-3 py-1 text-xs font-medium border transition-all hover:scale-105"
                        style={{ borderColor: "rgba(0,116,162,0.4)", color: "#7dd3fc", background: "rgba(0,116,162,0.08)" }}>
                        {chip}
                      </button>
                    ))}
                    {chatStep === "upsell" && ["Nein danke", "Außenwäsche +13,99 €", "Innen & Außen +49,99 €"].map((chip) => (
                      <button key={chip} type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setInput(""); sendMessage(chip); }}
                        className="rounded-full px-3 py-1 text-xs font-medium border transition-all hover:scale-105"
                        style={{ borderColor: "rgba(0,116,162,0.4)", color: "#7dd3fc", background: "rgba(0,116,162,0.08)" }}>
                        {chip}
                      </button>
                    ))}
                    {chatStep === "name" && ["Anonym / nicht angeben"].map((chip) => (
                      <button key={chip} type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setInput(""); sendMessage(chip); }}
                        className="rounded-full px-3 py-1 text-xs font-medium border transition-all hover:scale-105"
                        style={{ borderColor: "rgba(0,116,162,0.4)", color: "#7dd3fc", background: "rgba(0,116,162,0.08)" }}>
                        {chip}
                      </button>
                    ))}
                  </div>
                )}

                {/* Kennzeichen input — isolated form to prevent double-submit */}
                {chatStep === "kennzeichen" && !aiLoading && (
                  <div className="px-3 pt-2 pb-3">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const val = input.trim();
                        if (!val) return;
                        setInput("");
                        sendMessage(val);
                      }}
                    >
                      <div className="flex items-stretch rounded-lg overflow-hidden border-2 border-[#003399] bg-white"
                        style={{ maxWidth: 240 }}>
                        {/* EU stripe */}
                        <div className="flex flex-col items-center justify-center px-2 py-1"
                          style={{ background: "#003399", minWidth: 32 }}>
                          <span className="text-yellow-300 text-xs font-bold leading-none">EU</span>
                          <span className="text-yellow-300 text-[8px] leading-none mt-0.5">★</span>
                        </div>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value.toUpperCase())}
                          placeholder="RT - AB 1234"
                          maxLength={10}
                          className="flex-1 px-2 py-2 text-sm font-bold tracking-widest outline-none bg-white text-gray-900 uppercase"
                          style={{ letterSpacing: "0.15em" }}
                        />
                        <button
                          type="submit"
                          disabled={!input.trim()}
                          className="px-3 flex items-center justify-center disabled:opacity-40"
                          style={{ background: "#0074a2" }}
                          aria-label="Kennzeichen bestätigen">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </div>
                    </form>
                    <button type="button" onClick={() => { setInput(""); sendMessage("Kein Kennzeichen vorhanden"); }}
                      className="mt-1.5 text-xs" style={{ color: "#64748b" }}>
                      Kein Kennzeichen? Hier klicken
                    </button>
                  </div>
                )}

                {/* Free text input — hidden during kennzeichen step */}
                {chatStep !== "kennzeichen" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    sendMessage(input);
                  }}
                  className="flex items-center gap-2 px-3 pb-3 pt-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={chatStep === "telefon" ? "z.B. 0171 1234567" : chatStep === "name" ? "Dein Name..." : chatStep === "email" ? "deine@email.de" : "Nachricht eingeben..."}
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
                )}
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
