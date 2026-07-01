import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata = {
  title: "Impressum | Autoklinik Reutlingen",
  description: "Impressum der Autoklinik Reutlingen GmbH.",
};

export default function ImpressumPage() {
  return (
    <>
      <AutoklinikNavbar />
      <main className="font-sans">

        <header className="py-16" style={{ backgroundColor: "#0d1b2a" }}>
          <div className="max-w-3xl mx-auto px-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4aadce" }}>
              Rechtliches
            </span>
            <h1 className="text-4xl font-bold text-white text-balance mb-3">
              Impressum und Kontakt
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.64)" }}>
              Alle rechtlichen Informationen und Angaben zur Autoklinik Reutlingen finden Sie hier.
            </p>
          </div>
        </header>

        <section className="py-16" style={{ backgroundColor: "#f4f8fb" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="rounded-2xl p-8 flex flex-col gap-8" style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Impressum</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#0d1b2a" }}>
                  Autoklinik Reutlingen GmbH<br />
                  Haldenhaustraße 3<br />
                  72770 Reutlingen
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  Handelsregister: HRB 802754
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  Vertreten durch die Geschäftsführer:<br />
                  Marco Elia, Christian Fodi
                </p>
              </div>

              <div style={{ borderTop: "1px solid #e4edf3", paddingTop: "2rem" }}>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Kontakt</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  Telefon:{" "}
                  <a href="tel:+491761973298" className="hover:underline" style={{ color: "#0074a2" }}>
                    0176 / 61973298
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a href="mailto:info@autoklinik-reutlingen.de" className="hover:underline" style={{ color: "#0074a2" }}>
                    info@autoklinik-reutlingen.de
                  </a>
                </p>
              </div>

              <div style={{ borderTop: "1px solid #e4edf3", paddingTop: "2rem" }}>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Streitschlichtung</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div style={{ borderTop: "1px solid #e4edf3", paddingTop: "2rem" }}>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Haftung für Inhalte</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div style={{ borderTop: "1px solid #e4edf3", paddingTop: "2rem" }}>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Haftung für Links</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir daher keine Gewähr. Für die Inhalte verlinkter Seiten ist ausschließlich der jeweilige Anbieter oder Betreiber verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

            </div>

            <p className="mt-8 text-center text-xs" style={{ color: "#8aa0ae" }}>
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
