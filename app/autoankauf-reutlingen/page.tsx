import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, MapPin, Phone, ShieldCheck } from "lucide-react";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/components/structured-data";
import { VehicleValuationWizard } from "@/components/autoankauf/vehicle-valuation-wizard";
import { SITE, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Autoankauf Reutlingen | Auto verkaufen – Autoklinik",
  description: "Auto verkaufen in Reutlingen? Jetzt Fahrzeugdaten online übermitteln und eine kostenlose, unverbindliche Bewertung bei der Autoklinik Reutlingen anfragen.",
  keywords: ["Autoankauf Reutlingen", "Auto verkaufen Reutlingen", "Gebrauchtwagenankauf Reutlingen", "Fahrzeugankauf Reutlingen", "Gebrauchtwagen verkaufen Reutlingen", "Auto bewerten lassen Reutlingen"],
  alternates: { canonical: `${SITE_URL}/autoankauf-reutlingen` },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${SITE_URL}/autoankauf-reutlingen`,
    siteName: SITE.name,
    title: "Autoankauf Reutlingen | Auto verkaufen – Autoklinik",
    description: "Fahrzeugdaten online übermitteln und eine kostenlose, unverbindliche Bewertung bei der Autoklinik Reutlingen anfragen.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Autoankauf bei der Autoklinik Reutlingen" }],
  },
  twitter: { card: "summary_large_image", title: "Autoankauf Reutlingen | Autoklinik", description: "Auto verkaufen in Reutlingen – Fahrzeugdaten online übermitteln.", images: [`${SITE_URL}/og-image.jpg`] },
};

const faqs = [
  { question: "Wie funktioniert der Autoankauf in Reutlingen?", answer: "Du übermittelst uns deine Fahrzeugdaten in wenigen Schritten online. Unser Team prüft die Angaben persönlich und meldet sich über deine Kontaktdaten, um die nächsten Schritte zu besprechen." },
  { question: "Welche Fahrzeugdaten werden für die Anfrage benötigt?", answer: "Wichtig sind Marke, Modell, Erstzulassung, Kilometerstand, Kraftstoff, Getriebe und eine ehrliche Einschätzung des Zustands. Fotos, Preisvorstellung und weitere Hinweise kannst du freiwillig ergänzen." },
  { question: "Wie erfolgt die Bewertung meines Gebrauchtwagens?", answer: "Die Angaben aus deiner Anfrage bilden die Grundlage für eine erste persönliche Einschätzung. Eine verbindliche Bewertung ist erst möglich, wenn die Fahrzeugdaten vollständig geprüft wurden und offene Fragen geklärt sind." },
  { question: "Kann ich auch ein beschädigtes Fahrzeug anbieten?", answer: "Ja, du kannst auch Fahrzeuge mit Vorschäden, Unfallschäden oder technischen Mängeln anfragen. Wir prüfen solche Fälle individuell; eine Annahme oder ein bestimmter Preis kann vor der Prüfung nicht zugesagt werden." },
  { question: "Muss ich Fahrzeugfotos hochladen?", answer: "Nein. Fotos sind optional, können unserem Team aber helfen, den Zustand und sichtbare Schäden besser einzuordnen. Du kannst bis zu fünf Bilder direkt mit deiner Anfrage übermitteln." },
  { question: "Was passiert nach meiner Autoankauf-Anfrage?", answer: "Deine Anfrage wird an das Team der Autoklinik Reutlingen übermittelt. Nach der Prüfung melden wir uns persönlich per E-Mail oder Telefon, um Angaben zu klären und das weitere Vorgehen zu besprechen." },
  { question: "In welchen Orten kann ich ein Fahrzeug anbieten?", answer: "Die Anfrage richtet sich an Fahrzeughalter aus Reutlingen und der Umgebung, zum Beispiel aus Tübingen, Metzingen, Pfullingen und Eningen unter Achalm. Entscheidend ist die individuelle Prüfung deines Fahrzeugs." },
];

const trustPoints = ["Persönlicher Ansprechpartner vor Ort", "Kostenlose und unverbindliche Anfrage", "Fachgerechte Fahrzeugbewertung", "Direkter Kontakt zur Autoklinik Reutlingen"];
const steps = [
  { title: "Daten übermitteln", text: "Fahrzeug auswählen, Zustand beschreiben und optional Fotos ergänzen." },
  { title: "Persönlich prüfen lassen", text: "Unser Team ordnet deine Angaben fachlich und transparent ein." },
  { title: "Nächste Schritte besprechen", text: "Wir melden uns mit Rückfragen oder einer persönlichen Einschätzung." },
];
const vehicleTypes = ["Kleinwagen und Stadtautos", "Limousinen und Kombis", "SUVs und Geländewagen", "Transporter und Vans", "Elektro- und Hybridfahrzeuge", "Fahrzeuge mit prüfbaren Schäden"];

export default function AutoankaufReutlingenPage() {
  return (
    <>
      <ServiceSchema name="Fahrzeugankauf in Reutlingen" description="Persönliche und unverbindliche Anfrage zum Verkauf von Gebrauchtwagen und Fahrzeugen in Reutlingen und Umgebung." url="/autoankauf-reutlingen" />
      <FaqSchema items={faqs} />
      <BreadcrumbSchema items={[{ name: "Startseite", url: "/" }, { name: "Autoankauf Reutlingen", url: "/autoankauf-reutlingen" }]} />
      <AutoklinikNavbar />
      <main>
        <section className="overflow-hidden bg-ak-deep pt-28 text-ak-white sm:pt-36">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <Breadcrumbs variant="dark" items={[{ name: "Startseite", url: "/" }, { name: "Autoankauf Reutlingen", url: "/autoankauf-reutlingen" }]} />
            <div className="grid items-start gap-12 pb-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.05fr)] lg:gap-20 lg:pb-24">
              <div className="pt-2 lg:pt-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-ak-blue-light">Fahrzeugankauf in Reutlingen</p>
                <h1 className="mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.75rem]">Auto verkaufen in Reutlingen – einfach &amp; unkompliziert.</h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-ak-white/75 sm:text-lg">Du möchtest dein Auto verkaufen? Übermittle uns in wenigen Schritten die Fahrzeugdaten und erhalte eine persönliche, unverbindliche Bewertung durch unser Team.</p>
                <a href="#fahrzeugbewertung" className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ak-blue px-6 text-sm font-bold text-ak-white transition hover:bg-ak-blue-light hover:text-ak-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-2 focus-visible:ring-offset-ak-deep">Jetzt Fahrzeug bewerten lassen <ArrowRight size={17} aria-hidden="true" /></a>
                <ul className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Ihre Vorteile">
                  {trustPoints.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-5 text-ak-white/80"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ak-blue/20 text-ak-blue-light"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{point}</li>)}
                </ul>
                <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ak-white/10 pt-5 text-sm text-ak-white/65"><a href={SITE.phone.href} className="inline-flex items-center gap-2 transition-colors hover:text-ak-white"><Phone size={15} aria-hidden="true" />{SITE.phone.display}</a><span className="hidden h-4 w-px bg-ak-white/20 sm:block" /><span className="inline-flex items-center gap-2"><MapPin size={15} aria-hidden="true" />Haldenhaustraße 3 · Reutlingen</span></div>
              </div>
              <VehicleValuationWizard />
            </div>
          </div>
        </section>

        <section className="bg-background py-20 sm:py-24" aria-labelledby="ablauf-heading">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-ak-blue">So funktioniert es</p><h2 id="ablauf-heading" className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">So einfach verkaufst du dein Auto</h2><p className="mt-4 text-base leading-7 text-ak-muted">Von der ersten Fahrzeugbeschreibung bis zum persönlichen Gespräch bleibt der Ablauf klar und nachvollziehbar.</p></div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ak-surface-light bg-ak-surface-light md:grid-cols-3">{steps.map((item, index) => <article key={item.title} className="bg-ak-white p-7 sm:p-9"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-ak-blue text-sm font-bold text-ak-white">{index + 1}</div><h3 className="mt-7 text-lg font-bold text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-6 text-ak-muted">{item.text}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-ak-white py-20 sm:py-24" aria-labelledby="warum-heading">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-16">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-ak-blue">Autoklinik Reutlingen</p><h2 id="warum-heading" className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Warum die Anfrage bei uns persönlich bleibt</h2><p className="mt-5 text-base leading-7 text-ak-muted">Wir sind als Kfz-Fachbetrieb direkt in Reutlingen erreichbar. Deine Fahrzeugdaten landen nicht in einem anonymen Vergleichsformular, sondern bei einem Team, das Fahrzeuge und ihren technischen Zustand aus dem Werkstattalltag kennt.</p><Link href="/#kontakt" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-ak-blue hover:text-ak-deep">Direkten Kontakt aufnehmen <ArrowRight size={16} aria-hidden="true" /></Link></div>
            <div className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl bg-ak-surface-light p-6"><ShieldCheck className="text-ak-blue" size={22} aria-hidden="true" /><h3 className="mt-5 font-bold text-foreground">Transparente Angaben</h3><p className="mt-2 text-sm leading-6 text-ak-muted">Bekannte Mängel und Vorschäden dürfen offen genannt werden. Das schafft eine bessere Grundlage für die persönliche Prüfung.</p></article><article className="rounded-2xl bg-ak-surface-light p-6"><MapPin className="text-ak-blue" size={22} aria-hidden="true" /><h3 className="mt-5 font-bold text-foreground">Direkt in Reutlingen</h3><p className="mt-2 text-sm leading-6 text-ak-muted">Die Autoklinik sitzt in der Haldenhaustraße 3 in Reutlingen und ist auch für die Umgebung gut erreichbar.</p></article><article className="rounded-2xl bg-ak-surface-light p-6 sm:col-span-2"><Check className="text-ak-blue" size={22} aria-hidden="true" /><h3 className="mt-5 font-bold text-foreground">Alle Marken, viele Fahrzeugtypen</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-ak-muted">Ob Gebrauchtwagen, Familienfahrzeug, Transporter oder Elektroauto: Sende uns die Daten, damit wir die Anfrage passend einordnen können.</p></article></div>
          </div>
        </section>

        <section className="bg-background py-20 sm:py-24" aria-labelledby="fahrzeuge-heading">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-ak-blue">Fahrzeugankauf</p><h2 id="fahrzeuge-heading" className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Welche Fahrzeuge können angeboten werden?</h2><p className="mt-4 text-base leading-7 text-ak-muted">Du kannst Gebrauchtwagen verschiedener Marken und Fahrzeugtypen anfragen. Auch Fahrzeuge mit sichtbaren Schäden sind als prüfbare Anfrage willkommen – eine Annahme ist immer von der individuellen Prüfung abhängig.</p></div><div className="mt-10 flex flex-wrap gap-3">{vehicleTypes.map((type) => <span key={type} className="rounded-full border border-ak-blue/20 bg-ak-white px-4 py-2.5 text-sm font-semibold text-foreground">{type}</span>)}</div></div>
        </section>

        <section className="bg-ak-white py-20 sm:py-24" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-6 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-ak-blue">Fragen zum Auto verkaufen</p><h2 id="faq-heading" className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Häufige Fragen zum Autoankauf in Reutlingen</h2><div className="mt-10 divide-y divide-ak-surface-light rounded-3xl border border-ak-surface-light px-6 sm:px-8">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-foreground marker:hidden"><span>{faq.question}</span><ChevronDown className="shrink-0 text-ak-blue transition-transform group-open:rotate-180" size={19} aria-hidden="true" /></summary><p className="max-w-3xl pt-3 text-sm leading-6 text-ak-muted">{faq.answer}</p></details>)}</div></div>
        </section>

        <section className="bg-ak-blue py-16 text-center text-ak-white sm:py-20" aria-labelledby="final-cta-heading"><div className="mx-auto max-w-3xl px-6 sm:px-10"><h2 id="final-cta-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Bereit für eine persönliche Einschätzung?</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ak-white/80">Übermittle uns deine Fahrzeugdaten online. Die Anfrage ist kostenlos und unverbindlich.</p><a href="#fahrzeugbewertung" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ak-deep px-6 text-sm font-bold text-ak-white transition hover:bg-ak-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-white focus-visible:ring-offset-2 focus-visible:ring-offset-ak-blue">Fahrzeugdaten übermitteln <ArrowRight size={17} aria-hidden="true" /></a></div></section>
      </main>
      <AutoklinikFooter />
    </>
  );
}
