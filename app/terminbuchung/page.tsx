import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata = {
  title: "Terminbuchung | Autoklinik Reutlingen",
  description:
    "Buchen Sie jetzt Ihren Termin bei Autoklinik Reutlingen. Schnelle und unkomplizierte Online-Terminvereinbarung.",
};

export default function TerminbuchungPage() {
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
              Schnell und unkompliziert – such dir einfach einen passenden Termin aus.
            </p>
          </div>
        </header>

        {/* Booking embed */}
        <section className="py-16" style={{ backgroundColor: "#f4f8fb" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}>
              <iframe
                src="https://booking.wscloud.io/WM1592874/Step1aServiceSelection"
                title="Online-Terminbuchung Autoklinik Reutlingen"
                className="w-full"
                style={{ minHeight: 800, border: "none" }}
                loading="lazy"
                allow="payment"
              />
            </div>
          </div>
        </section>

        {/* Fallback contact */}
        <section className="py-16" style={{ backgroundColor: "#fff" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "#0d1b2a" }}>
              Lieber direkt Kontakt aufnehmen?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#4a6070" }}>
              Kein Problem – ruf uns einfach an oder schreib uns eine E-Mail. Wir finden gemeinsam einen passenden Termin.
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
