import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Phone, MapPin, CarFront, MessageCircle, ClipboardCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { VehicleValuationWizard } from "@/components/autoankauf/vehicle-purchase-form";
import { SITE } from "@/lib/site-config";

const process = [
  { icon: CarFront, title: "Fahrzeug beschreiben", text: "Marke, Modell und Zustand angeben. Fotos kannst du freiwillig ergänzen." },
  { icon: ClipboardCheck, title: "Persönlich bewerten", text: "Unser Werkstatt-Team prüft deine Angaben und ordnet dein Fahrzeug fachlich ein." },
  { icon: MessageCircle, title: "Gemeinsam weiter", text: "Wir melden uns bei dir und besprechen alles Weitere direkt und persönlich." },
];

export function VehiclePurchaseContent({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return <>
    <section className="bg-ak-deep pb-16 pt-32 text-ak-white lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col items-start gap-6">
            <Breadcrumbs variant="dark" items={[{ name: "Startseite", url: "/" }, { name: "Autoankauf", url: "/autoankauf-reutlingen" }]} />
            <Link href="/#leistungen" className="inline-flex items-center gap-2 text-sm font-semibold text-ak-blue-light transition-opacity hover:opacity-75"><ArrowRight size={16} className="rotate-180" aria-hidden="true" /> Alle Leistungen</Link>
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Dein Auto verkaufen.<br /><span className="text-ak-blue-light">Ohne Umwege.</span></h1>
            <p className="max-w-lg text-lg leading-relaxed text-ak-white/75">Autoankauf in Reutlingen – direkt bei deinem Kfz-Fachbetrieb. Wir prüfen dein Fahrzeug persönlich und besprechen mit dir, was möglich ist.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#bewertung" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ak-blue px-7 text-sm font-semibold text-ak-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ak-blue-light">Kostenlos bewerten lassen <ArrowRight size={16} aria-hidden="true" /></a>
              <a href={SITE.phone.href} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ak-white/25 px-6 text-sm font-semibold text-ak-white transition hover:bg-ak-white/10"><Phone size={16} aria-hidden="true" />{SITE.phone.display}</a>
            </div>
            <p className="flex items-center gap-2 text-sm text-ak-white/70"><Check size={16} className="text-ak-blue-light" aria-hidden="true" /> Kostenlos. Unverbindlich. Persönlich.</p>
          </div>
          <div className="relative w-full shrink-0 overflow-hidden rounded-2xl lg:w-96 xl:w-[440px]">
            <Image src="/assets/images/hero-autoankauf.png" alt="Persönliche Fahrzeugübergabe vor einer Kfz-Werkstatt" width={1200} height={900} priority sizes="(max-width: 1024px) 100vw, 440px" className="aspect-square w-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl border border-ak-white/15 bg-ak-deep/95 px-5 py-4 text-ak-white"><MapPin size={22} className="shrink-0 text-ak-blue-light" aria-hidden="true" /><div><p className="text-base font-semibold">Hier vor Ort. Für dich da.</p><p className="text-sm text-ak-white/70">Haldenhaustraße 3 · Reutlingen</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-ak-deep/10 bg-ak-white" aria-label="So läuft der Autoankauf ab">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 md:grid-cols-3 lg:px-16">
        {process.map(({ icon: Icon, title, text }) => <div key={title} className="flex items-start gap-4"><Icon size={24} className="mt-1 shrink-0 text-ak-blue" aria-hidden="true" /><div className="flex flex-col gap-2"><h2 className="text-base font-bold">{title}</h2><p className="text-sm leading-relaxed text-ak-muted">{text}</p></div></div>)}
      </div>
    </section>

    <section id="bewertung" className="scroll-mt-24 bg-background py-16 sm:py-24" aria-labelledby="bewertung-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-4"><p className="text-sm font-semibold uppercase tracking-widest text-ak-blue">Deine Fahrzeugbewertung</p><h2 id="bewertung-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Erzähl uns von deinem Auto.</h2><p className="text-base leading-relaxed text-ak-muted">In fünf einfachen Schritten zur Anfrage. Wir kümmern uns um den Rest.</p></div>
          <span className="flex items-center gap-2 text-sm font-medium text-ak-muted"><Check size={18} className="text-ak-blue" aria-hidden="true" /> Ohne Verkaufsverpflichtung</span>
        </div>
        <VehicleValuationWizard />
      </div>
    </section>

    <section className="bg-ak-white py-16 sm:py-24" aria-labelledby="ankauf-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
        <div className="flex flex-col items-start gap-5"><p className="text-sm font-semibold uppercase tracking-widest text-ak-blue">Fachbetrieb statt Vergleichsportal</p><h2 id="ankauf-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Dein Fahrzeug verdient einen genauen Blick.</h2><p className="text-base leading-relaxed text-ak-muted">Wir kennen Autos nicht nur aus Datenbanken, sondern aus unserem Werkstattalltag. Deshalb schauen wir auf das ganze Fahrzeug – und sprechen offen mit dir über Zustand, Mängel und die nächsten Schritte.</p><a href={SITE.phone.href} className="inline-flex items-center gap-2 text-sm font-semibold text-ak-blue transition hover:underline">Fragen? Sprich direkt mit uns <ArrowRight size={16} aria-hidden="true" /></a></div>
        <div className="flex flex-col gap-6 rounded-2xl bg-background p-7 sm:p-9"><h3 className="text-xl font-bold">Diese Fahrzeuge kannst du anbieten</h3><ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">{["Kleinwagen", "Limousinen & Kombis", "SUVs & Geländewagen", "Transporter & Vans", "Elektro & Hybrid", "Fahrzeuge mit Schäden"].map((type) => <li key={type} className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="shrink-0 text-ak-blue" aria-hidden="true" />{type}</li>)}</ul><p className="border-t border-ak-deep/10 pt-5 text-sm leading-relaxed text-ak-muted">Alle Marken willkommen. Ob ein Ankauf möglich ist, klären wir nach der individuellen Prüfung.</p></div>
      </div>
    </section>

    <section className="bg-background py-16 sm:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:px-16">
        <div className="flex flex-col items-start gap-5"><p className="text-sm font-semibold uppercase tracking-widest text-ak-blue">Gut zu wissen</p><h2 id="faq-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Noch Fragen<br />zum Autoankauf?</h2><p className="text-base leading-relaxed text-ak-muted">Hier findest du die wichtigsten Antworten. Alles Weitere klären wir gerne persönlich.</p><a href={SITE.phone.href} className="inline-flex items-center gap-2 text-base font-semibold text-ak-blue"><Phone size={18} aria-hidden="true" />{SITE.phone.display}</a></div>
        <div className="flex flex-col gap-3">{faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-ak-deep/10 bg-ak-white px-6 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold marker:hidden">{faq.question}<ChevronDown size={20} className="shrink-0 text-ak-blue transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="pt-4 text-sm leading-relaxed text-ak-muted">{faq.answer}</p></details>)}</div>
      </div>
    </section>
  </>;
}
