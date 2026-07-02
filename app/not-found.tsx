import type { Metadata } from "next";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata: Metadata = {
  title: "Seite nicht gefunden (404)",
  description: "Diese Seite existiert nicht. Zurück zur Startseite der Autoklinik Reutlingen.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <AutoklinikNavbar />
      <main className="min-h-screen flex items-center justify-center font-sans" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-lg mx-auto px-6 py-24 text-center">

          <p
            className="text-8xl font-black mb-6 leading-none"
            style={{ color: "#d5e8f0", letterSpacing: "-0.04em" }}
            aria-hidden="true"
          >
            404
          </p>

          <h1
            className="text-2xl font-extrabold mb-4 text-balance"
            style={{ color: "#001826", letterSpacing: "-0.02em" }}
          >
            Diese Seite haben wir leider nicht in unserem Bestand.
          </h1>

          <p className="text-base leading-relaxed mb-10" style={{ color: "#64748b" }}>
            Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht hilft Ihnen einer der folgenden Links weiter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Zur Startseite
            </Link>
            <a
              href="tel:+4907121988666"
              className="inline-flex items-center gap-2.5 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:border-[#0074a2] hover:text-[#0074a2]"
              style={{ borderColor: "#d5e8f0", color: "#475569" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Uns anrufen
            </a>
          </div>

          <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" aria-label="Wichtige Seiten">
            {[
              { href: "/inspektion", label: "Inspektion" },
              { href: "/tuev-au", label: "TÜV & AU" },
              { href: "/reifenservice", label: "Reifenservice" },
              { href: "/unfall", label: "Unfallreparatur" },
              { href: "/karriere", label: "Karriere" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline"
                style={{ color: "#0074a2" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
      <AutoklinikFooter />
    </>
  );
}
