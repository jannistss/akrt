"use client";

import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { SITE } from "@/lib/site-config";

const WINTER_PRICE = "44,44 €";
const OFFER_END = "31.12.2026";
const OFFER_START = "15.09.2026";
const GOOGLE_REVIEW_URL = "https://autoklinik-reutlingen.de/whubrief2026";

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v3M16 3v3M4 9.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#0074a2" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrimaryCta({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/terminbuchung"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition active:brightness-110 ${
        compact ? "px-5 py-3 text-sm" : "px-8 py-4 text-base sm:text-lg"
      }`}
      style={{ backgroundColor: "#0074a2" }}
    >
      <CalendarIcon />
      Jetzt Termin buchen
    </Link>
  );
}

function CallCta({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={SITE.phone.href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold border-2 transition active:bg-white/5 ${
        compact ? "px-5 py-3 text-sm" : "px-8 py-4 text-base sm:text-lg"
      }`}
      style={{ borderColor: "#ffffff", color: "#ffffff" }}
    >
      <PhoneIcon />
      {compact ? `Anrufen · ${SITE.phone.display}` : "Direkt anrufen"}
    </a>
  );
}

function WhatsAppCta({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={SITE.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition active:brightness-110 ${
        compact ? "px-5 py-3 text-sm" : "px-8 py-4 text-base sm:text-lg"
      }`}
      style={{ backgroundColor: "#25d366" }}
    >
      <WhatsAppIcon />
      {compact ? `WhatsApp · ${SITE.whatsapp.display}` : "Termin per WhatsApp buchen"}
    </a>
  );
}

const offerItems = [
  { title: "Räderwechsel", description: "Sommer- gegen Winterreifen, fachgerecht montiert und gewuchtet." },
  { title: "Frostschutz prüfen", description: "Kühlflüssigkeit auf ausreichenden Frostschutz kontrolliert." },
  { title: "Scheibenwaschwasser prüfen", description: "Füllstand und Frostschutz für klare Sicht auch bei Minusgraden." },
  { title: "Fahrzeugzustandscheck", description: "Kurzer allgemeiner Check, um typische Winterprobleme früh zu erkennen." },
];

const trustPoints = [
  "Persönliche Beratung",
  "Schnelle Terminabstimmung",
  "Zuverlässiger Service",
  "HU-/TÜV-Unterstützung",
  "Reifenservice und Wintercheck",
  "Allgemeine Wartung und Reparaturen",
];

export function WinterangebotPage() {
  return (
    <>
      <AutoklinikNavbar />
      <main className="font-sans">
        {/* 1. Hero */}
        <header className="relative overflow-hidden py-16 sm:py-24" style={{ backgroundColor: "#0d1b2a" }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-5 px-4 py-1.5 rounded-full"
              style={{ color: "#0d1b2a", backgroundColor: "#4db8d8" }}
            >
              Winteraktion 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-balance mb-5 leading-tight">
              Dein Auto bereit für den Winter?
            </h1>
            <p className="text-lg sm:text-xl text-balance mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>
              Räderwechsel inklusive Wintercheck für nur{" "}
              <span className="font-bold" style={{ color: "#4db8d8" }}>
                {WINTER_PRICE}
              </span>
            </p>
            <p className="text-sm mb-9" style={{ color: "rgba(255,255,255,0.6)" }}>
              Gültig vom {OFFER_START} bis {OFFER_END}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-4">
              <PrimaryCta />
              <CallCta />
            </div>
            <div className="flex justify-center">
              <WhatsAppCta compact />
            </div>
          </div>
        </header>

        {/* 2. Angebot */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-3" style={{ color: "#002e40" }}>
                Das Winterangebot für {WINTER_PRICE}
              </h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#4a6272" }}>
                Der Check hilft dir, typische Winterprobleme frühzeitig zu erkennen – bevor sie zu teuren
                Überraschungen werden.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offerItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl p-5"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #dbe8ef" }}
                >
                  <CheckIcon />
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "#002e40" }}>
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a6272" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <PrimaryCta />
            </div>
          </div>
        </section>

        {/* 3. HU/TÜV */}
        <section className="py-14 sm:py-16" style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance mb-3">
              HU fällig? Wir behalten den Termin im Blick
            </h2>
            <p className="text-base leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.75)" }}>
              Bei der Autoklinik wirst du auch an die nächste HU beziehungsweise den nächsten TÜV erinnert. Auf
              Wunsch unterstützen wir dich bei der Vorbereitung und der kompletten Terminabwicklung.
            </p>
            <Link
              href="/terminbuchung"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3.5 text-base transition active:brightness-110"
              style={{ backgroundColor: "#4db8d8", color: "#0d1b2a" }}
            >
              HU fällig? Jetzt Termin sichern
            </Link>
          </div>
        </section>

        {/* 4. Terminbuchung */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "#eef6fa" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div
              className="rounded-3xl p-8 sm:p-10 text-center"
              style={{ backgroundColor: "#ffffff", border: "1px solid #dbe8ef" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-balance mb-3" style={{ color: "#002e40" }}>
                Jetzt Termin sichern
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#4a6272" }}>
                Wähle den Weg, der für dich am einfachsten ist.
              </p>
              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white px-6 py-4 text-base transition active:brightness-110"
                  style={{ backgroundColor: "#0074a2" }}
                >
                  <CalendarIcon />
                  Online Termin buchen
                </Link>
                <a
                  href={SITE.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-4 text-base transition active:brightness-110"
                  style={{ backgroundColor: "#002e40", color: "#ffffff" }}
                >
                  <PhoneIcon />
                  {SITE.phone.display} anrufen
                </a>
                <a
                  href={SITE.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white px-6 py-4 text-base transition active:brightness-110"
                  style={{ backgroundColor: "#25d366" }}
                >
                  <WhatsAppIcon />
                  Termin per WhatsApp buchen
                </a>
              </div>
              <div className="mt-7 pt-7 text-sm space-y-1" style={{ borderTop: "1px solid #dbe8ef", color: "#4a6272" }}>
                <p>
                  Telefon:{" "}
                  <a href={SITE.phone.href} className="font-semibold" style={{ color: "#0074a2" }}>
                    {SITE.phone.display}
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a
                    href={SITE.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold"
                    style={{ color: "#0074a2" }}
                  >
                    {SITE.whatsapp.display}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Vertrauen */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "#f5f9fc" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-3" style={{ color: "#002e40" }}>
                {SITE.legalName}
              </h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#4a6272" }}>
                Deine Werkstatt in Reutlingen – persönlich, zuverlässig und immer erreichbar.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #dbe8ef" }}
                >
                  <CheckIcon />
                  <span className="font-medium text-sm" style={{ color: "#002e40" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Google Bewertung */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "#0074a2" }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance mb-3">Warst du mit uns zufrieden?</h2>
            <p className="text-base leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.9)" }}>
              Dann hinterlasse uns bitte eine ehrliche Google-Bewertung. Damit unterstützt du direkt unser Team
              und hilfst anderen bei der Werkstattsuche.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3.5 text-base transition active:brightness-110"
              style={{ backgroundColor: "#ffffff", color: "#0074a2" }}
            >
              Jetzt Google-Bewertung schreiben
            </a>
          </div>
        </section>

        {/* 7. Kontakt */}
        <section className="py-14 sm:py-16" style={{ backgroundColor: "#002e40" }}>
          <div className="max-w-2xl mx-auto px-6 text-center text-white">
            <p className="font-semibold text-lg mb-1">{SITE.legalName}</p>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
              {SITE.address.street}, {SITE.address.zip} {SITE.address.city}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
              <a href={SITE.phone.href} style={{ color: "#4db8d8" }}>
                {SITE.phone.display}
              </a>
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" style={{ color: "#4db8d8" }}>
                WhatsApp: {SITE.whatsapp.display}
              </a>
              <a href={`mailto:${SITE.email}`} style={{ color: "#4db8d8" }}>
                {SITE.email}
              </a>
              <a href={SITE.url} style={{ color: "#4db8d8" }}>
                autoklinik-reutlingen.de
              </a>
            </div>
          </div>
        </section>
      </main>
      <AutoklinikFooter />
    </>
  );
}
