"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem, EASE } from "@/lib/animation";

const services = [
  { label: "Inspektion & Wartung", href: "/inspektion" },
  { label: "TÜV & AU", href: "/tuev-au" },
  { label: "Reifenservice", href: "/reifenservice" },
  { label: "Glasservice", href: "/glasservice" },
  { label: "Klimaservice", href: "/klimaservice" },
  { label: "Unfallservice", href: "/unfall" },
  { label: "Flottenbetreuung", href: "/flottenbetreuung" },
];

const contacts = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "07121 15526199",
    href: "tel:+4907121155261990",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52z" fill="#25D366"/>
      </svg>
    ),
    label: "0176 61973298 (WhatsApp)",
    href: "https://wa.me/4917661973298",
    external: true,
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "info@autoklinik-reutlingen.de",
    href: "mailto:info@autoklinik-reutlingen.de",
  },
];

export function AutoklinikFooter() {
  return (
    <footer style={{ backgroundColor: "#001824" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #0074a2 0%, #1a6fcf 50%, #0074a2 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* CTA strip */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div>
            <p className="text-lg font-bold text-white mb-1">Bereit für einen Termin?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Schnell, unkompliziert, direkt in Reutlingen.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/terminbuchung"
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              Termin online buchen
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="tel:+4907121155261990"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              07121 15526199
            </a>
          </div>
        </motion.div>

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Brand */}
          <motion.div
            className="md:col-span-1 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0 }}
          >
            <Link href="/">
              <Image
                src="/assets/images/6937e0b4dab32eb0ce0c7f70_relume-460083.png"
                alt="Autoklinik Reutlingen Logo"
                width={140}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Deine Meisterwerkstatt in Reutlingen.<br />
              Ehrlich. Schnell. Zuverlässig.
            </p>
            {/* Address */}
            <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              <span>Haldenhaustraße 3<br />72770 Reutlingen</span>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.25)" }}>
              Leistungen
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-white flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 opacity-0 group-hover:opacity-100" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.25)" }}>
              Kontakt
            </p>
            <ul className="flex flex-col gap-4">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    >
                      {c.icon}
                    </span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Opening hours */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.25)" }}>
              Öffnungszeiten
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { day: "Mo – Fr", time: "08:00 – 18:00" },
                { day: "Samstag", time: "Nur auf Anfrage" },
                { day: "Sonntag", time: "Geschlossen" },
              ].map(({ day, time }) => (
                <li key={day} className="flex items-center justify-between gap-4">
                  <span style={{ color: "rgba(255,255,255,0.38)" }}>{day}</span>
                  <span className="font-medium" style={{ color: (time === "Geschlossen" || time === "Nur auf Anfrage") ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.65)" }}>
                    {time}
                  </span>
                </li>
              ))}
            </ul>
            {/* Google maps link */}
            <a
              href="https://maps.google.com/?q=Haldenhaustraße+3,+72770+Reutlingen"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs transition-colors hover:text-white"
              style={{ color: "#0074a2" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              In Google Maps öffnen
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-7">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2026 Autoklinik Reutlingen. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/datenschutz" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.28)" }}>
              Datenschutz
            </Link>
            <Link href="/impressum" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.28)" }}>
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
