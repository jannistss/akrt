import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ClipboardCheck,
  Gauge,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Snowflake,
  Star,
  ThermometerSnowflake,
  Wrench,
} from "lucide-react";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { SITE } from "@/lib/site-config";

const winterOffer = [
  "Räderwechsel",
  "Frostschutz prüfen",
  "Scheibenwaschwasser prüfen",
  "Kurzer allgemeiner Fahrzeugzustandscheck",
];

const workshopBenefits = [
  { icon: ShieldCheck, label: "Persönliche Beratung" },
  { icon: CalendarDays, label: "Schnelle Terminabstimmung" },
  { icon: Wrench, label: "Zuverlässiger Service" },
  { icon: ClipboardCheck, label: "HU-/TÜV-Unterstützung" },
  { icon: CarFront, label: "Reifenservice & Wintercheck" },
  { icon: Gauge, label: "Wartung & Reparaturen" },
];

const whatsappHref = `${SITE.whatsapp.href}?text=${encodeURIComponent(
  "Hallo Autoklinik Reutlingen, ich möchte das Winterangebot 2026 für 44,44 € buchen."
)}`;

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-ak-blue transition-colors hover:text-ak-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4"
    >
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

function WhatsAppButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Winterangebot per WhatsApp an ${SITE.whatsapp.display} anfragen`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-[#07351e] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-4 ${compact ? "px-4 py-3 text-sm" : "px-5 py-3.5 text-sm"}`}
      style={{ backgroundColor: "#25d366" }}
    >
      <MessageCircle size={18} strokeWidth={2.2} aria-hidden="true" />
      {compact ? `WhatsApp · ${SITE.whatsapp.display}` : "Termin per WhatsApp buchen"}
    </a>
  );
}

export function WinterangebotPage() {
  return (
    <>
      <AutoklinikNavbar />
      <main className="overflow-hidden bg-background">
        <section className="relative bg-ak-navy text-background">
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-16 lg:pb-28 lg:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ak-blue-light/30 bg-ak-blue/20 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ak-blue-light">
                  <Snowflake size={14} aria-hidden="true" />
                  Winteraktion 2026
                </div>
                <h1 className="max-w-3xl text-pretty text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                  Dein Auto bereit für den Winter?
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-xl font-semibold leading-relaxed text-background/90 sm:text-2xl">
                  Räderwechsel inklusive Wintercheck für nur 44,44 €
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-background/65">
                  <CalendarDays size={16} className="text-ak-blue-light" aria-hidden="true" />
                  Gültig vom 15.09.2026 bis 31.12.2026
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/terminbuchung"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-ak-blue px-6 py-4 text-sm font-bold text-background transition-transform hover:-translate-y-0.5 hover:bg-ak-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4 focus-visible:ring-offset-ak-navy"
                  >
                    <CalendarDays size={18} aria-hidden="true" />
                    Jetzt Termin buchen
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <a
                    href={SITE.phone.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-background/25 px-6 py-4 text-sm font-bold text-background transition-colors hover:border-background/60 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4 focus-visible:ring-offset-ak-navy"
                  >
                    <Phone size={17} aria-hidden="true" />
                    Direkt anrufen
                  </a>
                  <WhatsAppButton compact />
                </div>
                <p className="mt-5 text-xs text-background/55">
                  Telefon: {SITE.phone.display} · WhatsApp: {SITE.whatsapp.display}
                </p>
              </div>

              <div className="relative lg:justify-self-end">
                <div className="rounded-3xl border border-background/10 bg-background p-6 text-foreground shadow-2xl shadow-black/20 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue">Dein Winterangebot</p>
                      <h2 className="mt-3 text-2xl font-bold text-ak-deep sm:text-3xl">Sicher durch die kalte Jahreszeit</h2>
                    </div>
                    <ThermometerSnowflake className="shrink-0 text-ak-blue-light" size={34} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <div className="my-7 flex items-end gap-3 border-y border-ak-blue/15 py-6">
                    <span className="text-6xl font-bold tracking-tight text-ak-deep">44,44 €</span>
                    <span className="pb-2 text-sm font-medium text-ak-muted">inklusive<br />Wintercheck</span>
                  </div>
                  <ul className="grid gap-3" aria-label="Leistungen des Winterangebots">
                    {winterOffer.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ak-deep">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ak-blue/10 text-ak-blue">
                          <Check size={13} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-relaxed text-ak-muted">
                    So erkennen wir typische Winterprobleme frühzeitig – bevor sie unterwegs für Ärger sorgen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-2 bg-ak-blue" aria-hidden="true" />
        </section>

        <section id="angebot" className="bg-background px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue">Mehr Sicherheit im Winter</p>
              <h2 className="mt-3 text-pretty text-3xl font-bold tracking-tight text-ak-deep sm:text-4xl">Kurz prüfen lassen. Entspannter losfahren.</h2>
              <p className="mt-5 text-base leading-relaxed text-ak-muted sm:text-lg">
                Der Wintercheck hilft dir dabei, typische Probleme wie fehlenden Frostschutz oder leere Flüssigkeitsstände früh zu erkennen. Damit dein Auto bereit ist, wenn die Temperaturen fallen.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {winterOffer.map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-ak-blue/15 bg-ak-surface-light p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ak-blue text-background" aria-hidden="true">
                    {index === 0 ? <CarFront size={21} /> : index === 1 ? <ThermometerSnowflake size={21} /> : index === 2 ? <Snowflake size={21} /> : <ClipboardCheck size={21} />}
                  </span>
                  <span className="text-sm font-semibold leading-relaxed text-ak-deep">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ak-surface-light px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-background px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ak-blue">
                <ClipboardCheck size={14} aria-hidden="true" />
                Schon an die HU gedacht?
              </div>
              <h2 className="text-pretty text-3xl font-bold tracking-tight text-ak-deep sm:text-4xl">HU-/TÜV-Erinnerung inklusive Unterstützung</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ak-muted sm:text-lg">
                Wir erinnern dich auf Wunsch an deine nächste Hauptuntersuchung beziehungsweise deinen nächsten TÜV. Wenn der Termin näher rückt, unterstützen wir dich bei der Vorbereitung und der Terminabwicklung.
              </p>
            </div>
            <Link
              href="/terminbuchung"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ak-deep px-6 py-4 text-sm font-bold text-background transition-transform hover:-translate-y-0.5 hover:bg-ak-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4"
            >
              HU fällig? Jetzt Termin sichern
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section id="termin" className="bg-ak-deep px-6 py-16 text-background sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue-light">Dein Termin</p>
              <h2 className="mt-3 text-pretty text-3xl font-bold tracking-tight sm:text-5xl">Winterangebot einfach buchen</h2>
              <p className="mt-5 text-base leading-relaxed text-background/70 sm:text-lg">
                Wähle deinen Wunschtermin online oder melde dich direkt bei uns. Wir stimmen den Termin schnell und unkompliziert mit dir ab.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Link
                href="/terminbuchung"
                className="flex min-h-36 flex-col justify-between rounded-2xl bg-ak-blue p-5 text-background transition-transform hover:-translate-y-1 hover:bg-ak-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4 focus-visible:ring-offset-ak-deep"
              >
                <CalendarDays size={25} aria-hidden="true" />
                <span>
                  <span className="block text-lg font-bold">Online Termin buchen</span>
                  <span className="mt-1 block text-sm text-background/75">Direkt passenden Termin auswählen</span>
                </span>
              </Link>
              <a
                href={SITE.phone.href}
                className="flex min-h-36 flex-col justify-between rounded-2xl border border-background/20 p-5 text-background transition-transform hover:-translate-y-1 hover:border-background/50 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4 focus-visible:ring-offset-ak-deep"
              >
                <Phone size={25} aria-hidden="true" />
                <span>
                  <span className="block text-lg font-bold">{SITE.phone.display} anrufen</span>
                  <span className="mt-1 block text-sm text-background/65">Direkt mit dem Team sprechen</span>
                </span>
              </a>
              <WhatsAppButton />
            </div>
            <div className="mt-8 flex flex-col gap-2 text-sm text-background/65 sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2"><Phone size={15} className="text-ak-blue-light" aria-hidden="true" />{SITE.phone.display}</span>
              <span className="inline-flex items-center gap-2"><MessageCircle size={15} className="text-[#25d366]" aria-hidden="true" />{SITE.whatsapp.display}</span>
            </div>
          </div>
        </section>

        <section className="bg-background px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue">Autoklinik Reutlingen GmbH</p>
              <h2 className="mt-3 text-pretty text-3xl font-bold tracking-tight text-ak-deep sm:text-4xl">Deine Werkstatt für den Winter und darüber hinaus</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workshopBenefits.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-ak-blue/15 bg-ak-surface-light p-5">
                  <Icon size={21} className="shrink-0 text-ak-blue" aria-hidden="true" />
                  <span className="text-sm font-semibold text-ak-deep">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ak-surface-light px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl bg-background p-7 shadow-sm sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-16 lg:p-12">
            <div>
              <div className="mb-5 flex gap-1 text-ak-blue" aria-label="Google-Bewertung">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={22} fill="currentColor" aria-hidden="true" />)}
              </div>
              <h2 className="text-pretty text-3xl font-bold tracking-tight text-ak-deep sm:text-4xl">Warst du mit uns zufrieden?</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ak-muted">
                Dann hinterlasse uns bitte eine ehrliche Google-Bewertung. Damit unterstützt du direkt unser Team und hilfst anderen bei der Werkstattsuche.
              </p>
            </div>
            <a
              href="https://autoklinik-reutlingen.de/whubrief2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ak-blue px-6 py-4 text-sm font-bold text-background transition-transform hover:-translate-y-0.5 hover:bg-ak-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4"
            >
              Jetzt Google-Bewertung schreiben
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="kontakt" className="bg-ak-navy px-6 py-16 text-background sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue-light">Wir sind für dich da</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Autoklinik Reutlingen GmbH</h2>
              <div className="mt-7 grid gap-4 text-sm text-background/75 sm:grid-cols-2">
                <a href={SITE.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-background">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-ak-blue-light" aria-hidden="true" />
                  <span>{SITE.address.street}<br />{SITE.address.zip} {SITE.address.city}</span>
                </a>
                <div className="grid gap-4">
                  <a href={SITE.phone.href} className="flex items-center gap-3 transition-colors hover:text-background"><Phone size={17} className="text-ak-blue-light" aria-hidden="true" />{SITE.phone.display}</a>
                  <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-background"><MessageCircle size={17} className="text-[#25d366]" aria-hidden="true" />{SITE.whatsapp.display}</a>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition-colors hover:text-background"><Mail size={17} className="text-ak-blue-light" aria-hidden="true" />{SITE.email}</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <p className="text-sm text-background/55">autoklinik-reutlingen.de</p>
              <Link
                href="/terminbuchung"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ak-blue px-6 py-4 text-sm font-bold text-background transition-transform hover:-translate-y-0.5 hover:bg-ak-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue-light focus-visible:ring-offset-4 focus-visible:ring-offset-ak-navy"
              >
                Jetzt Wintertermin sichern
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <AutoklinikFooter />
    </>
  );
}


