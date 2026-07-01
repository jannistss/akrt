"use client";

import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission — in production hook up to an API route
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setLoading(false);
  }

  return (
    <section
      id="kontakt"
      className="font-sans"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm" style={{ minHeight: 360 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d661.0533888621147!2d9.136535357279765!3d48.490796816070876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799f1a26eb81357%3A0xd6d777b15911a39!2sAutoklinik%20Reutlingen%20GmbH!5e0!3m2!1sde!2sde!4v1770907350817!5m2!1sde!2sde"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort Autoklinik Reutlingen"
            />
          </div>

          {/* Form */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#0074a2" }}
            >
              Rückruf-Service
            </p>
            <h2
              className="text-3xl font-bold mb-3 tracking-tight"
              style={{ color: "#000608" }}
            >
              Wir rufen dich zurück
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "#4c5052" }}>
              Lass deine Nummer da und wir melden uns schnellstmöglich bei dir.
            </p>

            {status === "success" ? (
              <div
                className="rounded-2xl p-6 text-sm font-medium"
                style={{ backgroundColor: "#e5f1f5", color: "#002e40" }}
              >
                Danke! Wir haben deine Nachricht erhalten und melden uns schnellstmöglich bei dir.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium"
                    style={{ color: "#000608" }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[#0074a2]"
                    style={{ borderColor: "#d8d9d9", color: "#000608" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="text-sm font-medium"
                    style={{ color: "#000608" }}
                  >
                    Telefonnummer *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[#0074a2]"
                    style={{ borderColor: "#d8d9d9", color: "#000608" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                    style={{ color: "#000608" }}
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Beschreibe dein Anliegen kurz"
                    className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[#0074a2] resize-none"
                    style={{ borderColor: "#d8d9d9", color: "#000608" }}
                  />
                </div>

                <div className="flex items-start gap-2 mt-1">
                  <input
                    id="contact-privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded accent-[#0074a2]"
                  />
                  <label htmlFor="contact-privacy" className="text-sm" style={{ color: "#4c5052" }}>
                    Ich akzeptiere die{" "}
                    <a href="/datenschutz" className="underline" style={{ color: "#0074a2" }}>
                      Datenschutzerklärung
                    </a>
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#c0392b" }}>
                    Beim Senden ist ein Fehler aufgetreten. Versuch es bitte erneut oder ruf uns direkt an.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#0074a2" }}
                >
                  {loading ? "Senden…" : "Senden"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
