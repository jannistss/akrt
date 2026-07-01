"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export default function TerminbuchungPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1200);

  useEffect(() => {
    // Listen for postMessage height updates from wscloud
    function handleMessage(e: MessageEvent) {
      if (typeof e.data === "number" && e.data > 200) {
        setIframeHeight(e.data + 40);
      }
      // Some booking tools send {height: ...} or {type: "resize", height: ...}
      if (e.data && typeof e.data === "object") {
        const h = e.data.height ?? e.data.iframeHeight ?? e.data.frameHeight;
        if (typeof h === "number" && h > 200) {
          setIframeHeight(h + 40);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <AutoklinikNavbar />
      <main className="font-sans">

        {/* Header */}
        <header className="py-20" style={{ backgroundColor: "#0d1b2a" }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4aadce" }}>
              Terminbuchung
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance mb-4">
              Termin online buchen
            </h1>
            <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>
              Schnell und unkompliziert - such dir einfach einen passenden Termin aus.
            </p>
          </div>
        </header>

        {/* Booking embed - full width, height follows iframe content */}
        <section style={{ backgroundColor: "#f4f8fb" }}>
          <iframe
            ref={iframeRef}
            src="https://booking.wscloud.io/WM1592874/Step1aServiceSelection"
            title="Online-Terminbuchung Autoklinik Reutlingen"
            scrolling="no"
            className="w-full block"
            style={{
              height: iframeHeight,
              border: "none",
              display: "block",
              overflow: "hidden",
            }}
            loading="lazy"
            allow="payment"
          />
        </section>

        {/* Fallback contact */}
        <section className="py-16" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "#0d1b2a" }}>
              Lieber direkt Kontakt aufnehmen?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#4a6070" }}>
              Kein Problem - ruf uns einfach an oder schreib uns eine E-Mail. Wir finden gemeinsam einen passenden Termin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+4971211452619"
                className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0074a2" }}
              >
                07121 14526199
              </a>
              <a
                href="mailto:info@autoklinik-reutlingen.de"
                className="rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#f4f8fb]"
                style={{ borderColor: "#b8d0dc", color: "#0d1b2a" }}
              >
                info@autoklinik-reutlingen.de
              </a>
            </div>
            <p className="mt-10 text-xs" style={{ color: "#8aa0ae" }}>
              <Link href="/datenschutz" className="hover:underline">Datenschutz</Link>
              {" · "}
              <Link href="/impressum" className="hover:underline">Impressum</Link>
            </p>
          </div>
        </section>

      </main>
      <AutoklinikFooter />
    </>
  );
}
