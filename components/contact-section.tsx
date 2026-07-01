"use client";

import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    try {
      const form = e.currentTarget;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
          phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
          message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
        }),
      });
      if (!res.ok) throw new Error("Fehler");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="kontakt" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left - info + map */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#0074a2" }}>
                Kontakt
              </p>
              <h2
                className="font-bold tracking-tight leading-[1.1] text-balance mb-4"
                style={{ color: "#002e40", fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
              >
                Wir sind für dich da.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#4a6272" }}>
                Ruf an, schreib uns oder nutz das Formular - wir melden uns schnell.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4 text-sm" style={{ color: "#4a6272" }}>
              <a href="tel:+4907121155261990" className="flex items-center gap-3 transition-colors hover:text-[#0074a2]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,116,162,0.1)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                07121 15526199
              </a>
              <a href="https://wa.me/4917661973298" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-[#25D366]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(37,211,102,0.1)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.9 1.02 1.04-3.8-.25-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0122 12c0 5.52-4.48 10-10 10zm5.47-7.38l-1.93-.56a.75.75 0 00-.74.19l-.54.56a.74.74 0 01-.8.17 11.3 11.3 0 01-3.44-2.19 11.3 11.3 0 01-2.19-3.44.74.74 0 01.17-.8l.56-.54a.75.75 0 00.19-.74l-.56-1.93a.75.75 0 00-.72-.54h-1.8a.75.75 0 00-.75.78c.16 2.06 1 4.01 2.39 5.56a13.08 13.08 0 005.57 3.93.75.75 0 00.84-.23l.56-.7a.75.75 0 00-.08-1.02z" fill="#25D366"/>
                  </svg>
                </span>
                0176 61973298 (WhatsApp)
              </a>
              <a href="mailto:info@autoklinik-reutlingen.de" className="flex items-center gap-3 transition-colors hover:text-[#0074a2]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,116,162,0.1)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#0074a2" strokeWidth="1.8" />
                    <path d="M2 7l10 7 10-7" stroke="#0074a2" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                info@autoklinik-reutlingen.de
              </a>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(0,116,162,0.1)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#0074a2" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" stroke="#0074a2" strokeWidth="1.8" />
                  </svg>
                </span>
                <span>Haldenhaustraße 3<br />72770 Reutlingen</span>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden" style={{ minHeight: 260, border: "1px solid #d5e8f0" }}>
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

          {/* Right - form */}
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{ backgroundColor: "#f5f9fc", border: "1px solid #d5e8f0" }}
          >
            <h3 className="text-lg font-bold mb-1" style={{ color: "#002e40" }}>
              Rückruf-Service
            </h3>
            <p className="text-sm mb-8" style={{ color: "#4a6272" }}>
              Lass deine Nummer da - wir melden uns schnellstmöglich.
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
                    <label htmlFor={field.id} className="text-sm font-medium" style={{ color: "#002e40" }}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      required={field.name === "phone"}
                      className="rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #c5dde8",
                        color: "#002e40",
                      }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium" style={{ color: "#002e40" }}>
                    Nachricht
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Beschreibe dein Anliegen kurz…"
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #c5dde8",
                      color: "#002e40",
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
                  <label htmlFor="contact-privacy" className="text-sm" style={{ color: "#4a6272" }}>
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
