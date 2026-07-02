import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata = {
  title: "Datenschutz | Autoklinik Reutlingen",
  description: "Datenschutzerklärung der Autoklinik Reutlingen GmbH gemäß DSGVO.",
  alternates: { canonical: "https://autoklinik-reutlingen.de/datenschutz" },
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid #e4edf3", paddingTop: "2rem" }}>
      <h2 className="text-base font-bold mb-3" style={{ color: "#0d1b2a" }}>{title}</h2>
      <div className="text-sm leading-relaxed flex flex-col gap-3" style={{ color: "#4a6070" }}>
        {children}
      </div>
    </div>
  );
}

export default function DatenschutzPage() {
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
              Datenschutz
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
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Datenschutzerklärung</h2>
              </div>

              <Section title="1. Datenschutz auf einen Blick">
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Allgemeine Hinweise</strong></p>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Datenerfassung auf dieser Website</strong></p>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                </p>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
                </p>
              </Section>

              <Section title="2. Hosting">
                <p>
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" className="underline" style={{ color: "#0074a2" }} target="_blank" rel="noopener noreferrer">
                    https://vercel.com/legal/privacy-policy
                  </a>.
                </p>
              </Section>

              <Section title="3. Allgemeine Hinweise und Pflichtinformationen">
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Datenschutz</strong></p>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Hinweis zur Verantwortlichen Stelle</strong></p>
                <p>
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
                  Autoklinik Reutlingen GmbH<br />
                  Haldenhaustraße 3, 72770 Reutlingen<br />
                  E-Mail:{" "}
                  <a href="mailto:info@autoklinik-reutlingen.de" className="underline" style={{ color: "#0074a2" }}>
                    info@autoklinik-reutlingen.de
                  </a>
                </p>
                <p>
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                </p>
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Speicherdauer</strong></p>
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
                </p>
              </Section>

              <Section title="4. Datenerfassung auf dieser Website">
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Server-Log-Dateien</strong></p>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
                </p>
                <p>
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>
                <p><strong className="font-semibold" style={{ color: "#0d1b2a" }}>Anfrage per E-Mail, Telefon oder Telefax</strong></p>
                <p>
                  Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </Section>

              <Section title="5. Ihre Rechte">
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
                <p>
                  Außerdem steht Ihnen das Recht zu, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p>
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden:
                  {" "}<a href="mailto:info@autoklinik-reutlingen.de" className="underline" style={{ color: "#0074a2" }}>info@autoklinik-reutlingen.de</a>
                </p>
              </Section>

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
