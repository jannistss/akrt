"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Fuel, Gauge, Leaf, LoaderCircle, LockKeyhole, Settings2, X, Zap } from "lucide-react";
import { VehicleChoice } from "./vehicle-choice";
import { VehiclePhotos } from "./vehicle-photos";
import { CONDITION_OPTIONS, EMPTY_VEHICLE, FUEL_TYPES, TRANSMISSIONS, VEHICLE_BRANDS, validateVehicleStep, vehicleSummary, type VehicleData, type VehicleDraft, type VehicleField, type VehiclePhoto } from "@/lib/vehicle-data";
import { SITE } from "@/lib/site-config";

const questions = [
  ["Welche Marke hat dein Auto?", "Wähle deine Marke. Nicht dabei? Gib sie einfach selbst ein."],
  ["Welches Modell fährst du?", "Wähle dein Modell oder gib die Bezeichnung selbst ein."],
  ["Wann wurde dein Auto erstmals zugelassen?", "Monat und Jahr findest du im Fahrzeugschein unter Feld B."],
  ["Wie viele Kilometer hat dein Auto?", "Ein Blick auf den Tacho genügt. Eine ungefähre Angabe ist auch okay."],
  ["Welchen Motor hat dein Auto?", "Keine technischen Details nötig – die Kraftstoffart reicht."],
  ["Welches Getriebe hat dein Auto?", "Mit oder ohne selbst schalten?"],
  ["Wie ist der Zustand deines Autos?", "Eine ehrliche Einschätzung hilft uns bei der persönlichen Bewertung."],
  ["Möchtest du Bilder hinzufügen?", "Ein paar Fotos helfen uns, dein Auto besser einzuschätzen. Ganz freiwillig."],
  ["Wie viel möchtest du für dein Auto?", "Noch keine Vorstellung? Dann überspringe diese Frage einfach."],
  ["Wie können wir dich erreichen?", "Unser Team meldet sich persönlich bei dir. Keine automatischen Preisversprechen."],
  ["Alles richtig? Dann kann es losgehen.", "Prüfe deine Angaben. Deine Anfrage ist kostenlos und unverbindlich."],
];
const numberFormat = (value: string) => value ? Number(value).toLocaleString("de-DE") : "";
async function loadDraft(url: string): Promise<VehicleDraft> {
  const response = await fetch(url, { cache: "no-store" });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Dein Entwurf konnte nicht geladen werden.");
  return body;
}

export function VehicleValuationWizard() {
  const [data, setData] = useState<VehicleData>({ ...EMPTY_VEHICLE });
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<VehiclePhoto[]>([]);
  const [direction, setDirection] = useState(1);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("Deine Angaben werden sicher zwischengespeichert");
  const [savingError, setSavingError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [locked, setLocked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [extraMotor, setExtraMotor] = useState(false);
  const [extraDamage, setExtraDamage] = useState(false);
  const [website, setWebsite] = useState("");
  const dataRef = useRef(data), stepRef = useRef(0), initialized = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const title = useRef<HTMLHeadingElement>(null);
  const scroll = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { error: loadError, mutate } = useSWR<VehicleDraft>("/api/autoankauf/draft", loadDraft, {
    revalidateOnFocus: false, revalidateOnReconnect: false, shouldRetryOnError: false,
    onSuccess(draft) {
      if (initialized.current) return;
      initialized.current = true;
      dataRef.current = draft.payload; stepRef.current = draft.status === "sending" ? 10 : draft.step;
      setData(draft.payload); setStep(stepRef.current); setPhotos(draft.images);
      setSuccess(draft.status === "sent"); setLocked(draft.status === "sending");
      setExtraMotor(Boolean(draft.payload.engine)); setExtraDamage(Boolean(draft.payload.damage));
      setReady(true);
    },
  });
  useEffect(() => {
    function flush() {
      if (!timer.current) return;
      clearTimeout(timer.current); timer.current = null;
      void fetch("/api/autoankauf/draft", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payload: dataRef.current, step: stepRef.current }), keepalive: true });
    }
    window.addEventListener("pagehide", flush);
    return () => { window.removeEventListener("pagehide", flush); if (timer.current) clearTimeout(timer.current); };
  }, []);
  function save(next: VehicleData, nextStep: number) {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    setSaveStatus("Wird gespeichert …");
    queue.current = queue.current.then(async () => {
      const response = await fetch("/api/autoankauf/draft", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payload: next, step: nextStep }), keepalive: true });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSavingError(false); setSaveStatus("Fortschritt sicher gespeichert");
    }).catch(() => { setSavingError(true); setSaveStatus("Noch nicht gespeichert – bitte Verbindung prüfen"); });
    return queue.current;
  }
  function update(field: keyof VehicleData, value: string | boolean) {
    const next = { ...dataRef.current, [field]: value };
    if (field === "brand" && value !== dataRef.current.brand) next.model = "";
    dataRef.current = next; setData(next); setError("");
    if (timer.current) clearTimeout(timer.current);
    setSaveStatus("Wird gespeichert …");
    timer.current = setTimeout(() => { void save(next, stepRef.current); }, 650);
    return next;
  }
  function go(nextStep: number, next = dataRef.current) {
    setDirection(nextStep > stepRef.current ? 1 : -1);
    stepRef.current = nextStep; setStep(nextStep); setError("");
    scroll.current?.scrollTo({ top: 0 });
    void save(next, nextStep);
  }
  function choose(field: VehicleField, value: string, advance = true) {
    const next = update(field, value);
    if (advance) go(stepRef.current + 1, next);
  }
  function forward() {
    const message = validateVehicleStep(step, dataRef.current);
    if (message) { setError(message); return; }
    go(Math.min(10, step + 1));
  }
  async function submit() {
    if (submitting) return;
    for (let index = 0; index <= 10; index++) {
      const message = validateVehicleStep(index, dataRef.current);
      if (message) { if (index !== step) go(index); setError(message); return; }
    }
    setSubmitting(true); setError("");
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    await queue.current;
    try {
      const response = await fetch("/api/autoankauf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payload: dataRef.current, website }) });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        if (typeof result.step === "number") go(result.step);
        if (response.status >= 500 || response.status === 409) setLocked(true);
        throw new Error(result.error || "Die Anfrage konnte nicht versendet werden.");
      }
      setSuccess(true); setSaveStatus("Anfrage erfolgreich versendet");
    } catch (err) { setError(err instanceof Error ? err.message : "Keine Verbindung. Bitte versuche es erneut. Deine Angaben bleiben erhalten."); }
    finally { setSubmitting(false); }
  }
  const field = (name: VehicleField, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor={`purchase-${name}`}>{label}<input id={`purchase-${name}`} name={name} value={data[name]} onChange={event => update(name, event.target.value)} className="purchase-input" maxLength={150} {...props} /></label>;
  const cards = (options: string[], name: VehicleField, advance = true) => <div className={`grid gap-3 ${options.length === 2 ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>{options.map((option, index) => {
    const Icon = name === "fuel" ? [Fuel, Fuel, Leaf, Zap, Zap, Settings2][index] : name === "transmission" ? Settings2 : CheckCircle2;
    return <button type="button" key={option} aria-pressed={data[name] === option} onClick={() => choose(name, option, advance)} className={`purchase-choice min-h-24 flex-col items-start justify-center gap-3 sm:min-h-28 ${data[name] === option ? "purchase-choice-selected" : ""}`}><Icon size={24} className="text-ak-blue" aria-hidden="true" /><span>{option}</span></button>;
  })}</div>;
  const progress = Math.round(((step + 1) / questions.length) * 100);
  return <div className="purchase-shell font-sans text-ak-deep" data-ready={ready}>
    <header className="flex flex-col border-b border-ak-deep/10 bg-ak-white">
      <div className="flex min-h-18 items-center justify-between gap-4 px-5 sm:px-10">
        <Link href="/" aria-label="Autoklinik Reutlingen – Startseite"><Image src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png" alt="Autoklinik Reutlingen" width={174} height={52} priority className="h-auto w-36 sm:w-44" /></Link>
        <span className="hidden text-sm font-medium text-ak-muted sm:block">Deine persönliche Fahrzeugbewertung</span>
        <Link href="/autoankauf-reutlingen" className="flex min-h-11 items-center gap-2 text-sm text-ak-muted hover:text-ak-blue" aria-label="Anfrage verlassen und zur Autoankauf-Seite zurückkehren"><span className="hidden sm:inline">Verlassen</span><X size={20} aria-hidden="true" /></Link>
      </div>
      <div role="progressbar" aria-label="Fortschritt deiner Fahrzeuganfrage" aria-valuemin={0} aria-valuemax={11} aria-valuenow={success ? 11 : step + 1} aria-valuetext={success ? "Anfrage versendet" : `Schritt ${step + 1} von 11`} className="h-1 bg-ak-blue/10"><motion.div className="h-full bg-ak-blue" initial={false} animate={{ width: `${success ? 100 : progress}%` }} transition={{ duration: reduced ? 0 : 0.3 }} /></div>
    </header>
    <main ref={scroll} className="flex min-h-0 flex-col items-center overflow-y-auto overflow-x-hidden px-5 py-6 sm:px-10 sm:py-8">
      <div className="my-auto w-full max-w-3xl shrink-0">
        {!ready ? <div className="flex flex-col items-center gap-5 py-16 text-center" role="status">{loadError ? <><p>{loadError.message}</p><button className="purchase-next" onClick={() => void mutate()}>Erneut versuchen</button><a href={SITE.phone.href} className="text-ak-blue">Oder ruf uns an: {SITE.phone.display}</a></> : <><LoaderCircle className="animate-spin text-ak-blue" size={28} aria-hidden="true" /><p>Deine Fahrzeuganfrage wird vorbereitet …</p></>}</div> : success ? <div className="flex flex-col items-start gap-6 py-8"><CheckCircle2 size={52} className="text-ak-blue" aria-hidden="true" /><p className="text-sm font-semibold uppercase tracking-widest text-ak-blue">Anfrage versendet</p><h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Danke. Jetzt sind wir dran.</h1><p className="max-w-lg text-lg leading-relaxed text-ak-muted">Deine Angaben{photos.length ? " und Fahrzeugfotos" : ""} wurden an unser Team übermittelt. Wir prüfen deine Anfrage und melden uns persönlich bei dir.</p><p className="text-base leading-relaxed text-ak-muted">Die Anfrage ist unverbindlich. Ein Ankauf oder ein bestimmter Preis ist damit noch nicht zugesagt.</p><Link href="/autoankauf-reutlingen" className="purchase-next">Zurück zum Autoankauf <ArrowRight size={18} aria-hidden="true" /></Link></div> : <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div key={step} custom={direction} variants={{ enter: (dir: number) => ({ opacity: 0, x: reduced ? 0 : dir * 35 }), center: { opacity: 1, x: 0 }, exit: (dir: number) => ({ opacity: 0, x: reduced ? 0 : dir * -35 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }} onAnimationComplete={() => title.current?.focus({ preventScroll: true })} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3"><p className="flex items-center gap-2 text-sm font-semibold text-ak-blue">Schritt {step + 1} von 11{data.brand && step > 0 && <><ChevronRight size={14} aria-hidden="true" /><span className="truncate text-ak-muted">{data.brand} {data.model}</span></>}</p><h1 ref={title} tabIndex={-1} className="text-balance text-3xl font-bold leading-tight tracking-tight outline-none sm:text-4xl lg:text-5xl">{questions[step][0]}</h1><p id="purchase-hint" className="max-w-2xl text-base leading-relaxed text-ak-muted">{questions[step][1]}</p></div>
            {locked ? <div className="rounded-xl border border-ak-blue/20 bg-ak-blue/5 p-5 text-base leading-relaxed">Deine Anfrage wurde zum Versand übergeben. Die Angaben sind deshalb gesperrt. Über „Versandstatus prüfen“ kannst du den Vorgang sicher fortsetzen, ohne doppelt zu senden.</div> : <div aria-describedby="purchase-hint" className="flex flex-col gap-4">
              {step === 0 && <VehicleChoice kind="Marke" options={VEHICLE_BRANDS.map(brand => brand.name)} value={data.brand} onSelect={value => choose("brand", value)} />}
              {step === 1 && <VehicleChoice kind="Modell" options={VEHICLE_BRANDS.find(brand => brand.name === data.brand)?.models || []} value={data.model} onSelect={value => choose("model", value)} />}
              {step === 2 && <div className="grid grid-cols-2 gap-4"><label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="purchase-month">Monat<select id="purchase-month" value={data.month} onChange={event => update("month", event.target.value)} className="purchase-input"><option value="">Monat wählen</option>{["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"].map((month, index) => <option key={month} value={index + 1}>{month}</option>)}</select></label><label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="purchase-year">Jahr<select id="purchase-year" value={data.year} onChange={event => update("year", event.target.value)} className="purchase-input"><option value="">Jahr wählen</option>{Array.from({ length: new Date().getFullYear() - 1949 }, (_, index) => new Date().getFullYear() - index).map(year => <option key={year} value={year}>{year}</option>)}</select></label></div>}
              {step === 3 && <div className="relative"><label htmlFor="purchase-mileage" className="sr-only">Kilometerstand</label><input id="purchase-mileage" inputMode="numeric" autoComplete="off" value={numberFormat(data.mileage)} onChange={event => update("mileage", event.target.value.replace(/\D/g, "").slice(0, 7))} className="purchase-input purchase-number pr-20" placeholder="z. B. 85.000" /><span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-xl text-ak-muted">km</span></div>}
              {step === 4 && <>{cards(FUEL_TYPES, "fuel", false)}{!extraMotor ? <button type="button" onClick={() => setExtraMotor(true)} className="min-h-11 text-left text-sm font-medium text-ak-blue hover:underline">+ Motorbezeichnung ergänzen (optional)</button> : field("engine", "Motorbezeichnung (optional)", { placeholder: "z. B. 320d oder 1.4 TSI" })}</>}
              {step === 5 && cards(TRANSMISSIONS, "transmission")}
              {step === 6 && <>{cards(CONDITION_OPTIONS, "condition", false)}{data.condition === "Beschädigt" || extraDamage ? <label htmlFor="purchase-damage" className="flex flex-col gap-2 text-sm font-semibold">Schäden oder Hinweise (optional)<textarea id="purchase-damage" className="purchase-input resize-none" rows={2} value={data.damage} maxLength={1500} onChange={event => update("damage", event.target.value)} placeholder="z. B. Kratzer an der Tür, Unfallschaden oder Motorprobleme" /></label> : <button type="button" onClick={() => setExtraDamage(true)} className="min-h-11 text-left text-sm font-medium text-ak-blue hover:underline">+ Schäden oder weitere Hinweise ergänzen (optional)</button>}</>}
              {step === 7 && <VehiclePhotos photos={photos} onChange={setPhotos} onBusy={setUploading} />}
              {step === 8 && <div className="relative"><label htmlFor="purchase-price" className="sr-only">Preisvorstellung in Euro (optional)</label><input id="purchase-price" inputMode="numeric" value={numberFormat(data.price)} onChange={event => update("price", event.target.value.replace(/\D/g, "").slice(0, 8))} className="purchase-input purchase-number pr-16" placeholder="Deine Preisvorstellung" /><span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-ak-muted">€</span></div>}
              {step === 9 && <div className="flex flex-col gap-4">{field("name", "Vor- und Nachname", { autoComplete: "name", placeholder: "Dein vollständiger Name" })}<div className="grid gap-4 sm:grid-cols-2">{field("phone", "Telefonnummer", { type: "tel", autoComplete: "tel", placeholder: "Für unsere persönliche Rückmeldung" })}{field("email", "E-Mail-Adresse", { type: "email", autoComplete: "email", placeholder: "du@beispiel.de" })}</div><p className="flex items-start gap-2 text-sm leading-relaxed text-ak-muted"><LockKeyhole size={16} className="mt-1 shrink-0" aria-hidden="true" />Wir verwenden deine Angaben ausschließlich zur Bearbeitung deiner Anfrage.</p></div>}
              {step === 10 && <><dl className="grid gap-x-8 sm:grid-cols-2">{vehicleSummary(data).map(([label, value, target]) => <div key={label} className="flex items-start justify-between gap-3 border-b border-ak-deep/10 py-3"><div className="min-w-0"><dt className="text-sm text-ak-muted">{label}</dt><dd className="break-words text-base font-medium">{value}</dd></div><button type="button" onClick={() => go(target)} className="flex min-h-11 shrink-0 items-center text-sm text-ak-blue hover:underline" aria-label={`${label} ändern`}>Ändern</button></div>)}<div className="flex items-center justify-between gap-3 border-b border-ak-deep/10 py-3"><div><dt className="text-sm text-ak-muted">Fotos</dt><dd className="text-base font-medium">{photos.length} sicher hochgeladen</dd></div><button type="button" onClick={() => go(7)} className="min-h-11 text-sm text-ak-blue hover:underline">Ändern</button></div></dl><label className="flex cursor-pointer items-start gap-3 rounded-xl bg-ak-blue/5 p-4 text-sm leading-relaxed"><input type="checkbox" checked={data.privacy} onChange={event => update("privacy", event.target.checked)} className="mt-1 size-5 shrink-0 accent-ak-blue" /><span>Ich habe die <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-semibold text-ak-blue underline">Datenschutzhinweise</Link> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Ankaufanfrage einverstanden. Entwürfe werden nach 24 Stunden, übermittelte Bilder und online gespeicherte Anfragedaten nach 30 Tagen gelöscht. Die E-Mail wird zur Bearbeitung aufbewahrt.</span></label></>}
            </div>}
            <div className="hidden" aria-hidden="true"><label htmlFor="purchase-website">Website</label><input id="purchase-website" value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
            {error && <p id="purchase-error" role="alert" className="rounded-xl border border-ak-blue/30 bg-ak-blue/5 p-4 text-base leading-relaxed">{error}</p>}
          </motion.div>
        </AnimatePresence>}
      </div>
    </main>
    {!success && <footer className="border-t border-ak-deep/10 bg-ak-white px-5 pt-4 sm:px-10" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        <div className="flex items-center justify-between gap-3"><button type="button" disabled={!ready || uploading || submitting || locked} onClick={() => step === 0 ? window.location.assign("/autoankauf-reutlingen") : go(step - 1)} className="flex min-h-12 items-center gap-2 text-base font-medium text-ak-muted transition hover:text-ak-blue disabled:opacity-40"><ArrowLeft size={18} aria-hidden="true" /> Zurück</button><div className="flex items-center gap-3">{(step === 7 || step === 8) && !locked && <button type="button" disabled={uploading} className="min-h-12 text-sm text-ak-muted hover:text-ak-blue disabled:opacity-40" onClick={() => { if (step === 8) { const next = update("price", ""); go(9, next); } else go(8); }}>Überspringen</button>}<button type="button" disabled={!ready || uploading || submitting} onClick={() => step === 10 || locked ? void submit() : forward()} className="purchase-next" aria-describedby={error ? "purchase-error" : undefined}>{submitting ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Wird gesendet …</> : locked ? "Versandstatus prüfen" : step === 10 ? "Kostenlose Ankaufanfrage senden" : <>Weiter <ArrowRight size={18} aria-hidden="true" /></>}</button></div></div>
        <p className="flex items-center justify-center gap-2 text-center text-sm text-ak-muted" role="status">{savingError ? <Gauge size={14} aria-hidden="true" /> : <LockKeyhole size={14} aria-hidden="true" />}<span>{saveStatus}</span>{savingError && <button type="button" onClick={() => void save(dataRef.current, stepRef.current)} className="shrink-0 text-ak-blue underline">Erneut speichern</button>}</p>
      </div>
    </footer>}
    {success && <div className="flex items-center justify-center gap-2 border-t border-ak-deep/10 bg-ak-white p-5 text-sm text-ak-muted"><Check size={16} aria-hidden="true" /> Persönlich. Kostenlos. Unverbindlich.</div>}
  </div>;
}
