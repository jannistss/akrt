import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, MapPin, Phone, ShieldCheck } from "lucide-react";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/components/structured-data";
import { VehicleValuationWizard } from "@/components/autoankauf/vehicle-purchase-form";
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

const trustPoints = ["Kostenlos & unverbindlich", "Persönlich vor Ort"];
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
        <section className="overflow-hidden bg-ak-deep pb-16 pt-32 font-sans text-ak-white lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <Breadcrumbs variant="dark" items={[{ name: "Startseite", url: "/" }, { name: "Autoankauf Reutlingen", url: "/autoankauf-reutlingen" }]} />
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start gap-6">
                <Link href="/#leistungen" className="inline-flex items-center gap-2 text-sm font-semibold text-ak-blue-light transition hover:text-ak-white"><ArrowRight className="rotate-180" size={16} aria-hidden="true" /> Alle Leistungen</Link>
                <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Autoankauf<br /><span className="text-ak-blue-light">in Reutlingen.</span></h1>
                <p className="max-w-lg text-lg leading-relaxed text-ak-white/75">Dein Auto verkaufen. Persönlich, fair und ohne Umwege. Sende uns deine Fahrzeugdaten – unser Team kümmert sich um die Einschätzung.</p>
                <div className="flex flex-wrap gap-3"><a href="#fahrzeugbewertung" className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ak-blue px-7 text-sm font-semibold text-ak-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light">Fahrzeug bewerten lassen <ArrowRight size={17} aria-hidden="true" /></a><a href={SITE.phone.href} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ak-white/25 px-6 text-sm font-semibold text-ak-white transition hover:bg-ak-white/10"><Phone size={16} aria-hidden="true" />{SITE.phone.display}</a></div>
                <ul className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Ihre Vorteile">
                  {trustPoints.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-5 text-ak-white/80"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ak-blue/20 text-ak-blue-light"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{point}</li>)}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-ak-white/5">
                <Image src="/assets/images/hero-autoankauf.png" alt="Fahrzeugübergabe vor einer Kfz-Werkstatt" width={1200} height={900} priority sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
                <div className="flex items-center gap-3 bg-ak-white px-6 py-5 text-ak-deep"><MapPin size={20} className="shrink-0 text-ak-blue" aria-hidden="true" /><div><p className="text-base font-bold">Dein Ansprechpartner vor Ort</p><p className="text-sm text-ak-muted">Haldenhaustraße 3 · Reutlingen</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24" aria-labelledby="bewertung-heading">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-16">
            <div className="flex flex-col items-start gap-5 lg:pt-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-ak-blue">Kostenlose Fahrzeugbewertung</p>
              <h2 id="bewertung-heading" className="text-balance text-3xl font-bold tracking-tight text-ak-deep sm:text-4xl">Ein paar Angaben.<br />Ein persönlicher Kontakt.</h2>
              <p className="max-w-md text-base leading-relaxed text-ak-muted">Wir führen dich Schritt für Schritt durch die Anfrage. Du brauchst nur deine Fahrzeugdaten – Fotos kannst du freiwillig ergänzen.</p>
              <ul className="flex flex-col gap-4 border-t border-ak-deep/10 pt-6">{["Kostenlos & unverbindlich", "Persönlich geprüft statt automatisch geschätzt", "Alle Marken willkommen"].map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6 text-ak-muted"><Check size={18} className="mt-0.5 shrink-0 text-ak-blue" aria-hidden="true" />{point}</li>)}</ul>
            </div>
            <VehicleValuationWizard />
          </div>
        </section>

        <section className="bg-ak-white py-16 sm:py-20" aria-labelledby="ablauf-heading">
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
