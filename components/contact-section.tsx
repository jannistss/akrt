"use client";

import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setLoading(false);
  }

  return (
    <section id="kontakt" style={{ backgroundColor: "#001824" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — info + map */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#0074a2" }}>
                Kontakt
              </p>
              <h2
                className="font-bold tracking-tight leading-[1.1] text-balance mb-4"
                style={{ color: "#ffffff", fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
              >
                Wir sind für dich da.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Ruf an, schreib uns oder nutz das Formular — wir melden uns schnell.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              <a href="tel:+4971217969500" className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,116,162,0.18)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                +49 7121 796 9500
              </a>
              <a href="mailto:info@autoklinik-reutlingen.de" className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,116,162,0.18)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#0074a2" strokeWidth="1.8" />
                    <path d="M2 7l10 7 10-7" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                info@autoklinik-reutlingen.de
              </a>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,116,162,0.18)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#0074a2" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" stroke="#0074a2" strokeWidth="1.8" />
                  </svg>
                </span>
                <span>Alteburgstraße 150<br />72762 Reutlingen</span>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden" style={{ minHeight: 260, border: "1px solid rgba(255,255,255,0.07)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d661.0533888621147!2d9.136535357279765!3d48.490796816070876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799f1a26eb81357%3A0xd6d777b15911a39!2sAutoklinik%20Reutlingen%20GmbH!5e0!3m2!1sde!2sde!4v1770907350817!5m2!1sde!2sde"
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Autoklinik Reutlingen"
              />
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="text-lg font-bold mb-1" style={{ color: "#ffffff" }}>
              Rückruf-Service
            </h3>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              Lass deine Nummer da — wir melden uns schnellstmöglich.
            </p>

            {status === "success" ? (
              <div
                className="rounded-xl p-5 text-sm font-medium"
                style={{ backgroundColor: "rgba(0,116,162,0.15)", color: "#4db8d8", border: "1px solid rgba(0,116,162,0.25)" }}
              >
                Danke! Wir haben deine Nachricht erhalten und melden uns schnellstmöglich bei dir.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { id: "contact-name", label: "Name", type: "text", name: "name" },
                  { id: "contact-phone", label: "Telefonnummer *", type: "tel", name: "phone" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-1.5">
                    <label htmlFor={field.id} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      required={field.name === "phone"}
                      className="rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Nachricht
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Beschreibe dein Anliegen kurz…"
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                    }}
                  />
                </div>

                <div className="flex items-start gap-2.5 mt-1">
                  <input
                    id="contact-privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded accent-[#0074a2]"
                  />
                  <label htmlFor="contact-privacy" className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Ich akzeptiere die{" "}
                    <a href="/datenschutz" className="underline" style={{ color: "#0074a2" }}>
                      Datenschutzerklärung
                    </a>
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#f87171" }}>
                    Beim Senden ist ein Fehler aufgetreten. Bitte ruf uns direkt an.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
                  style={{ backgroundColor: "#0074a2" }}
                >
                  {loading ? "Senden…" : "Nachricht senden"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
