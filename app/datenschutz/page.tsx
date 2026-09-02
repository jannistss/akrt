import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";

export const metadata = {
  title: "Datenschutzerklärung | Autoklinik Reutlingen",
  description: "Datenschutzerklärung der Autoklinik Reutlingen GmbH gemäß DSGVO.",
  alternates: { canonical: "https://autoklinik-reutlingen.de/datenschutz" },
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid #e4edf3", paddingTop: "2rem" }}>
      <h2 className="text-base font-bold mb-3" style={{ color: "#0d1b2a" }}>{title}</h2>
      <div className="text-sm leading-relaxed flex flex-col gap-3" style={{ color: "#4a6070" }}>{children}</div>
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4aadce" }}>Rechtliches</span>
            <h1 className="text-4xl font-bold text-white text-balance mb-3">Datenschutzerklärung</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.64)" }}>Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.</p>
          </div>
        </header>

        <section className="py-16" style={{ backgroundColor: "#f4f8fb" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="rounded-2xl p-8 flex flex-col gap-8" style={{ backgroundColor: "#fff", border: "1px solid #e4edf3" }}>
              <div>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>Datenschutz auf einen Blick</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Bearbeitung von Anfragen, die Terminvermittlung oder die Erfüllung unserer Werkstattleistungen erforderlich ist. Ihre Rechte ergeben sich insbesondere aus der Datenschutz-Grundverordnung (DSGVO).</p>
              </div>

              <Section title="1. Verantwortliche Stelle">
                <p>Verantwortlich im Sinne der DSGVO ist:<br /><strong style={{ color: "#0d1b2a" }}>Autoklinik Reutlingen GmbH</strong><br />Haldenhaustraße 3<br />72770 Reutlingen<br />E-Mail: <a className="underline" style={{ color: "#0074a2" }} href="mailto:info@autoklinik-reutlingen.de">info@autoklinik-reutlingen.de</a><br />Telefon: <a className="underline" style={{ color: "#0074a2" }} href="tel:+4917661973298">0176 / 61973298</a></p>
                <p>Die Website wird technisch durch Ioannis Tsannis, 741SVE Digitalagentur, Im Wengle 1, 72770 Reutlingen, verwaltet und entwickelt. Die Agentur ist damit technischer Dienstleister und nicht automatisch Verantwortlicher für die Zwecke der Datenverarbeitung durch die Autoklinik.</p>
              </Section>

              <Section title="2. Hosting und Server-Log-Dateien">
                <p>Diese Website wird über Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, ausgeliefert. Beim Abruf werden technisch erforderliche Verbindungsdaten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit, angeforderte Seite, Referrer, Browsertyp und Betriebssystem. Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
                <p>Weitere Informationen finden Sie in der <a className="underline" style={{ color: "#0074a2" }} target="_blank" rel="noopener noreferrer" href="https://vercel.com/legal/privacy-policy">Datenschutzerklärung von Vercel</a>.</p>
              </Section>

              <Section title="3. Kontaktaufnahme und Anfragen">
                <p>Wenn Sie uns per E-Mail, Telefon oder über ein Kontaktformular kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihres Anliegens und zur Kontaktaufnahme. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen gerichtet ist, ansonsten Art. 6 Abs. 1 lit. f DSGVO.</p>
                <p>Anfragen können zur Bearbeitung, Terminabstimmung und Kundenverwaltung in einem internen CRM-System gespeichert werden. Eine Weitergabe erfolgt nur, wenn sie zur Bearbeitung erforderlich ist, eine gesetzliche Pflicht besteht oder Sie eingewilligt haben. Die Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
              </Section>

              <Section title="4. Online-Terminbuchung">
                <p>Für die Online-Terminbuchung wird ein externer Buchungsdienst der wscloud (booking.wscloud.io) eingebunden. Beim Aufruf und bei der Nutzung des Buchungsformulars werden Daten an diesen Anbieter übermittelt. Dazu können technische Zugriffsdaten sowie die von Ihnen im Buchungsprozess eingegebenen Termin- und Kontaktdaten gehören. Die Verarbeitung erfolgt zur Durchführung der Terminvereinbarung auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.</p>
                <p>Bitte beachten Sie die Datenschutzhinweise des Buchungsdienstes, die im eingebundenen Buchungsformular angezeigt werden. Wenn Sie keine Übermittlung an den Buchungsdienst wünschen, können Sie telefonisch oder per E-Mail Kontakt aufnehmen.</p>
              </Section>

              <Section title="5. KI-Chatbot">
                <p>Auf der Website ist ein Chatbot zur Beantwortung allgemeiner Fragen, zur Orientierung bei Leistungen und zur Unterstützung bei der Terminbuchung eingebunden. Freie Texteingaben und der für die Antwort erforderliche Gesprächskontext werden an unsere serverseitige Chat-Schnittstelle und über das Vercel AI Gateway an einen KI-Modellanbieter übermittelt. Rechtsgrundlage ist Ihre Einwilligung durch die Nutzung des Chatbots gemäß Art. 6 Abs. 1 lit. a DSGVO beziehungsweise Art. 6 Abs. 1 lit. f DSGVO, soweit die Verarbeitung für die technische Bearbeitung einer von Ihnen gestarteten Anfrage erforderlich ist.</p>
                <p>Bitte geben Sie im Chat keine besonderen Kategorien personenbezogener Daten, Zahlungsdaten, Passwörter oder Informationen ein, die für Ihre Anfrage nicht erforderlich sind. Der Chatbot ersetzt keine verbindliche Werkstattdiagnose oder individuelle Rechtsberatung. Chat-Anfragen können zur Bearbeitung und Qualitätssicherung gespeichert werden, sofern dies technisch oder organisatorisch vorgesehen ist.</p>
              </Section>

              <Section title="6. Supabase und E-Mail-Versand">
                <p>Für serverseitige Datenverarbeitung und gegebenenfalls die Speicherung von Kontakt-, Termin- oder CRM-Daten wird Supabase eingesetzt. Je nach Funktion können dabei die von Ihnen übermittelten Kontaktdaten, Nachrichten, Terminangaben und technische Metadaten verarbeitet werden. Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage beziehungsweise zur Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO oder aufgrund unseres berechtigten Interesses an einer strukturierten Anfrageverwaltung nach Art. 6 Abs. 1 lit. f DSGVO.</p>
                <p>Transaktionsbezogene E-Mails können über Resend versendet werden. Dabei werden Empfängeradresse und die für den Versand erforderlichen Nachrichteninhalte verarbeitet. Die Anbieter sollten in der jeweils aktuellen Datenschutzerklärung geprüft werden: <a className="underline" style={{ color: "#0074a2" }} target="_blank" rel="noopener noreferrer" href="https://supabase.com/privacy">Supabase Privacy</a> und <a className="underline" style={{ color: "#0074a2" }} target="_blank" rel="noopener noreferrer" href="https://resend.com/legal/privacy-policy">Resend Privacy</a>.</p>
              </Section>

              <Section title="7. Web-Vitals und Reichweitenmessung">
                <p>Sofern die erforderliche Umgebungsvariable aktiviert ist, werden technische Leistungskennzahlen der Website (zum Beispiel Lade- und Interaktionszeiten) an Vercel Analytics übermittelt. Dabei können Seitenpfad, URL, technische Verbindungsdaten und Messwerte verarbeitet werden. Die Messung dient der Stabilität und Verbesserung der Website und erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO beziehungsweise einer erforderlichen Einwilligung.</p>
                <p>Es werden nach aktuellem Projektstand keine Marketing-Pixel oder Google-Analytics-Skripte eingesetzt. Die Google-Maps-Verknüpfung im Footer ist ein normaler externer Link; eine Karte wird nicht automatisch eingebettet.</p>
              </Section>

              <Section title="8. Cookies und lokale Speicherungen">
                <p>Die Website verwendet technisch erforderliche Cookies beziehungsweise Browser-Speicherungen, soweit dies für Funktionen wie Chat-Zustand, Sitzungssteuerung oder das Merken einer ausgeblendeten Chat-Hinweisblase erforderlich ist. Nicht notwendige Tracking- oder Marketing-Cookies werden nach aktuellem Projektstand nicht gesetzt.</p>
              </Section>

              <Section title="9. Ihre Rechte">
                <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen Verarbeitungen. Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen.</p>
                <p>Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für Fragen oder zur Ausübung Ihrer Rechte wenden Sie sich an <a className="underline" style={{ color: "#0074a2" }} href="mailto:info@autoklinik-reutlingen.de">info@autoklinik-reutlingen.de</a>.</p>
              </Section>

              <Section title="10. Aktualität dieser Erklärung">
                <p>Diese Datenschutzerklärung kann angepasst werden, wenn sich Funktionen, eingesetzte Dienste oder rechtliche Anforderungen ändern. Maßgeblich ist die jeweils auf dieser Website veröffentlichte Fassung.</p>
              </Section>
            </div>
            <p className="mt-8 text-center text-xs" style={{ color: "#8aa0ae" }}><Link href="/datenschutz" className="hover:underline">Datenschutz</Link>{" · "}<Link href="/agb" className="hover:underline">AGB</Link>{" · "}<Link href="/impressum" className="hover:underline">Impressum</Link></p>
          </div>
        </section>
      </main>
      <AutoklinikFooter />
    </>
  );
}
