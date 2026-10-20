"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ImagePlus,
  LoaderCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  ACCIDENT_OPTIONS,
  BODY_TYPES,
  CONDITION_OPTIONS,
  DRIVABLE_OPTIONS,
  FUEL_TYPES,
  getModelsForBrand,
  SERVICE_BOOK_OPTIONS,
  TRANSMISSIONS,
  VEHICLE_BRANDS,
} from "@/lib/vehicle-data";

const TOTAL_STEPS = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

type FormState = {
  vehicleBrand: string;
  vehicleModel: string;
  vehicleVariant: string;
  customVehicle: string;
  firstRegistration: string;
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  bodyType: string;
  previousOwners: string;
  condition: string;
  accidentStatus: string;
  damage: string;
  driveable: string;
  tuev: string;
  serviceBook: string;
  defects: string;
  equipment: string;
  price: string;
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  city: string;
  callbackTime: string;
  privacy: boolean;
  website: string;
};

type Photo = { file: File; preview: string };

type SelectOption = { value: string; label: string };

const INITIAL_FORM: FormState = {
  vehicleBrand: "",
  vehicleModel: "",
  vehicleVariant: "",
  customVehicle: "",
  firstRegistration: "",
  mileage: "",
  fuel: "",
  transmission: "",
  engine: "",
  power: "",
  bodyType: "",
  previousOwners: "",
  condition: "",
  accidentStatus: "",
  damage: "",
  driveable: "",
  tuev: "",
  serviceBook: "",
  defects: "",
  equipment: "",
  price: "",
  notes: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postalCode: "",
  city: "",
  callbackTime: "",
  privacy: false,
  website: "",
};

const stepLabels = ["Fahrzeug", "Daten", "Zustand", "Fotos", "Kontakt"];

export function VehicleValuationWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modelOptions = useMemo(() => getModelsForBrand(form.vehicleBrand), [form.vehicleBrand]);
  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const validateStep = (currentStep: number): string => {
    if (currentStep === 1) {
      if (!form.vehicleBrand && !form.customVehicle.trim()) return "Wähle eine Marke oder beschreibe dein Fahrzeug kurz.";
      if (form.vehicleBrand && !form.vehicleModel) return "Wähle bitte noch das Modell aus.";
    }
    if (currentStep === 2) {
      if (!form.firstRegistration) return "Gib bitte die Erstzulassung an.";
      const mileage = Number(form.mileage);
      if (!form.mileage || !Number.isFinite(mileage) || mileage < 0 || mileage > 2000000) return "Trage einen plausiblen Kilometerstand ein.";
      if (!form.fuel || !form.transmission || !form.bodyType) return "Wähle Kraftstoff, Getriebe und Karosserieform aus.";
    }
    if (currentStep === 3) {
      if (!form.condition || !form.accidentStatus || !form.driveable) return "Bitte beantworte die wichtigsten Fragen zum Zustand.";
    }
    if (currentStep === 5) {
      if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.postalCode.trim() || !form.city.trim()) return "Fülle bitte alle Pflichtfelder aus.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Bitte gib eine gültige E-Mail-Adresse ein.";
      if (!form.privacy) return "Bitte bestätige die Datenschutzhinweise.";
    }
    return "";
  };

  const goNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  };

  const goBack = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const addPhotos = (files: FileList | File[]) => {
    setPhotoError("");
    const nextPhotos: Photo[] = [];
    for (const file of Array.from(files)) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setPhotoError("Bitte nutze JPG-, PNG-, WEBP- oder HEIC-Bilder.");
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        setPhotoError("Jedes Bild darf maximal 5 MB groß sein.");
        continue;
      }
      if (photos.length + nextPhotos.length >= 5) {
        setPhotoError("Bitte übermittle maximal fünf Bilder.");
        break;
      }
      nextPhotos.push({ file, preview: URL.createObjectURL(file) });
    }
    if (nextPhotos.length) setPhotos((current) => [...current, ...nextPhotos]);
  };

  const removePhoto = (preview: string) => {
    URL.revokeObjectURL(preview);
    setPhotos((current) => current.filter((photo) => photo.preview !== preview));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateStep(5);
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSubmitting(true);
    setError("");
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, String(value)));
    photos.forEach((photo) => payload.append("images", photo.file));

    try {
      const response = await fetch("/api/autoankauf", { method: "POST", body: payload });
      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !result.success) throw new Error(result.error ?? "Senden fehlgeschlagen");
      setSubmitted(true);
      photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Beim Senden ist ein Fehler aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="rounded-3xl bg-ak-white p-6 shadow-2xl shadow-ak-navy/20 sm:p-8" aria-live="polite">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ak-blue/10 text-ak-blue">
          <Check size={28} strokeWidth={2.4} aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-ak-blue">Anfrage übermittelt</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Danke für deine Fahrzeugdaten.</h2>
        <p className="mt-4 text-sm leading-6 text-ak-muted">Deine Anfrage ist bei unserem Team eingegangen. Wir prüfen die Angaben persönlich und melden uns über die von dir angegebenen Kontaktdaten.</p>
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-ak-surface-light p-4 text-sm leading-6 text-ak-muted">
          <ShieldCheck className="mt-0.5 shrink-0 text-ak-blue" size={18} aria-hidden="true" />
          <span>Die Anfrage ist kostenlos und unverbindlich. Eine Bewertung erfolgt erst nach Prüfung der Fahrzeugdaten.</span>
        </div>
      </section>
    );
  }

  return (
    <form id="fahrzeugbewertung" onSubmit={handleSubmit} className="overflow-hidden rounded-3xl bg-ak-white shadow-2xl shadow-ak-navy/20" noValidate>
      <div className="border-b border-ak-surface-light px-5 pb-5 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue">Fahrzeug bewerten lassen</p>
            <p className="mt-1 text-sm text-ak-muted">Schritt {step} von {TOTAL_STEPS}</p>
          </div>
          <span className="rounded-full bg-ak-surface-light px-3 py-1.5 text-xs font-semibold text-ak-muted">ca. 3 Minuten</span>
        </div>
        <div className="mt-5 flex gap-1.5" aria-label={`Fortschritt: Schritt ${step} von ${TOTAL_STEPS}`}>
          {stepLabels.map((label, index) => {
            const itemStep = index + 1;
            return (
              <div key={label} className="flex min-w-0 flex-1 flex-col gap-2">
                <div className={`h-1.5 rounded-full transition-colors ${itemStep <= step ? "bg-ak-blue" : "bg-ak-surface-light"}`} />
                <span className={`truncate text-[10px] font-semibold uppercase tracking-wide ${itemStep <= step ? "text-ak-blue" : "text-ak-muted/70"}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.2 }}>
            {step === 1 && <StepVehicle form={form} update={update} modelOptions={modelOptions} />}
            {step === 2 && <StepTechnical form={form} update={update} />}
            {step === 3 && <StepCondition form={form} update={update} />}
            {step === 4 && <StepPhotos form={form} update={update} photos={photos} photoError={photoError} isDragging={isDragging} setIsDragging={setIsDragging} addPhotos={addPhotos} removePhoto={removePhoto} fileInputRef={fileInputRef} />}
            {step === 5 && <StepContact form={form} update={update} />}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-5 text-red-800" role="alert">
            <CircleAlert className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ak-surface-light pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button type="button" onClick={goBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-ak-muted transition-colors hover:bg-ak-surface-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue focus-visible:ring-offset-2">
              <ChevronLeft size={17} aria-hidden="true" /> Zurück
            </button>
          ) : <span aria-hidden="true" />}
          {step < TOTAL_STEPS ? (
            <button type="button" onClick={goNext} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ak-blue px-6 text-sm font-bold text-ak-white transition hover:bg-ak-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue focus-visible:ring-offset-2">
              Weiter <ChevronRight size={17} aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ak-blue px-6 text-sm font-bold text-ak-white transition hover:bg-ak-deep disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue focus-visible:ring-offset-2">
              {isSubmitting ? <><LoaderCircle size={17} className="animate-spin" aria-hidden="true" /> Wird gesendet …</> : <>Kostenlose Anfrage senden <ArrowRight size={17} aria-hidden="true" /></>}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function StepVehicle({ form, update, modelOptions }: { form: FormState; update: (key: keyof FormState, value: string | boolean) => void; modelOptions: string[] }) {
  return (
    <div>
      <StepIntro eyebrow="Schritt 1" title="Welches Fahrzeug möchtest du verkaufen?" description="Wähle Marke und Modell. Falls dein Fahrzeug nicht dabei ist, kannst du es frei beschreiben." />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SearchableCombobox id="vehicle-brand" label="Marke" value={form.vehicleBrand} options={VEHICLE_BRANDS.map((brand) => brand.name)} placeholder="Marke suchen …" onChange={(value) => { update("vehicleBrand", value); update("vehicleModel", ""); }} />
        {form.vehicleBrand ? <SearchableCombobox id="vehicle-model" label="Modell" value={form.vehicleModel} options={modelOptions} placeholder="Modell suchen …" onChange={(value) => update("vehicleModel", value)} /> : <TextField id="customVehicle" label="Fahrzeug frei beschreiben" value={form.customVehicle} onChange={(value) => update("customVehicle", value)} placeholder="z. B. Mazda 6 Kombi" />}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField id="vehicleVariant" label="Variante (optional)" value={form.vehicleVariant} onChange={(value) => update("vehicleVariant", value)} placeholder="z. B. 320d xDrive Touring" />
        {form.vehicleBrand && <TextField id="customVehicle" label="Nicht in der Liste? Freie Eingabe" value={form.customVehicle} onChange={(value) => update("customVehicle", value)} placeholder="z. B. Sondermodell oder genaue Bezeichnung" />}
      </div>
    </div>
  );
}

function StepTechnical({ form, update }: { form: FormState; update: (key: keyof FormState, value: string | boolean) => void }) {
  return (
    <div>
      <StepIntro eyebrow="Schritt 2" title="Die wichtigsten Fahrzeugdaten" description="Mit diesen Angaben kann unser Team deine Anfrage besser einordnen." />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField id="firstRegistration" label="Erstzulassung" type="month" value={form.firstRegistration} onChange={(value) => update("firstRegistration", value)} />
        <TextField id="mileage" label="Kilometerstand" type="number" min="0" max="2000000" suffix="km" value={form.mileage} onChange={(value) => update("mileage", value)} placeholder="z. B. 86500" />
        <ChoiceSelect id="fuel" label="Kraftstoffart" value={form.fuel} options={FUEL_TYPES.map((value) => ({ value, label: value }))} onChange={(value) => update("fuel", value)} placeholder="Bitte auswählen" />
        <ChoiceSelect id="transmission" label="Getriebe" value={form.transmission} options={TRANSMISSIONS.map((value) => ({ value, label: value }))} onChange={(value) => update("transmission", value)} placeholder="Bitte auswählen" />
        <TextField id="engine" label="Motorisierung / Modellbezeichnung" value={form.engine} onChange={(value) => update("engine", value)} placeholder="z. B. 2.0 TDI" />
        <TextField id="power" label="Leistung (optional)" value={form.power} onChange={(value) => update("power", value)} placeholder="z. B. 150 PS oder 110 kW" />
        <ChoiceSelect id="bodyType" label="Karosserieform" value={form.bodyType} options={BODY_TYPES.map((value) => ({ value, label: value }))} onChange={(value) => update("bodyType", value)} placeholder="Bitte auswählen" />
        <TextField id="previousOwners" label="Vorbesitzer (optional)" type="number" min="0" max="30" value={form.previousOwners} onChange={(value) => update("previousOwners", value)} placeholder="z. B. 2" />
      </div>
    </div>
  );
}

function StepCondition({ form, update }: { form: FormState; update: (key: keyof FormState, value: string | boolean) => void }) {
  return (
    <div>
      <StepIntro eyebrow="Schritt 3" title="Wie ist der Zustand deines Fahrzeugs?" description="Offene Angaben helfen uns mehr als perfekte Angaben. Beschreibe bekannte Mängel bitte ehrlich." />
      <div className="mt-6 space-y-6">
        <ChoiceCards label="Allgemeiner Zustand" value={form.condition} options={CONDITION_OPTIONS.map((value) => ({ value, label: value }))} onChange={(value) => update("condition", value)} />
        <ChoiceCards label="Unfallfreiheit und Vorschäden" value={form.accidentStatus} options={ACCIDENT_OPTIONS.map((value) => ({ value, label: value }))} onChange={(value) => update("accidentStatus", value)} />
        <ChoiceCards label="Fahrzeug fahrbereit?" value={form.driveable} options={DRIVABLE_OPTIONS.map((value) => ({ value, label: value }))} onChange={(value) => update("driveable", value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="tuev" label="TÜV gültig bis (optional)" type="month" value={form.tuev} onChange={(value) => update("tuev", value)} />
          <ChoiceSelect id="serviceBook" label="Scheckheft (optional)" value={form.serviceBook} options={SERVICE_BOOK_OPTIONS.map((value) => ({ value, label: value }))} onChange={(value) => update("serviceBook", value)} placeholder="Bitte auswählen" />
        </div>
        <TextAreaField id="damage" label="Motor- oder Getriebeschäden (optional)" value={form.damage} onChange={(value) => update("damage", value)} placeholder="Gibt es Geräusche, Warnleuchten oder bekannte Schäden?" />
        <TextAreaField id="defects" label="Weitere bekannte Mängel (optional)" value={form.defects} onChange={(value) => update("defects", value)} placeholder="z. B. Dellen, Rost, Kratzer, fehlende Teile …" />
        <TextAreaField id="equipment" label="Sonderausstattung (optional)" value={form.equipment} onChange={(value) => update("equipment", value)} placeholder="z. B. Navi, AHK, Sitzheizung, Panoramadach …" />
      </div>
    </div>
  );
}

function StepPhotos({ form, update, photos, photoError, isDragging, setIsDragging, addPhotos, removePhoto, fileInputRef }: { form: FormState; update: (key: keyof FormState, value: string | boolean) => void; photos: Photo[]; photoError: string; isDragging: boolean; setIsDragging: (value: boolean) => void; addPhotos: (files: FileList | File[]) => void; removePhoto: (preview: string) => void; fileInputRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div>
      <StepIntro eyebrow="Schritt 4" title="Zeig uns dein Fahrzeug" description="Fotos von außen, innen, Schäden und dem Cockpit helfen bei der ersten Einschätzung. Dieser Schritt ist optional." />
      <div className="mt-6">
        <input ref={fileInputRef} className="sr-only" type="file" accept={ACCEPTED_IMAGE_TYPES.join(",")} multiple onChange={(event) => { if (event.target.files) addPhotos(event.target.files); event.target.value = ""; }} />
        <button type="button" className={`flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-blue focus-visible:ring-offset-2 ${isDragging ? "border-ak-blue bg-ak-blue/10" : "border-ak-blue/30 bg-ak-surface-light hover:border-ak-blue hover:bg-ak-blue/5"}`} onClick={() => fileInputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); addPhotos(event.dataTransfer.files); }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ak-white text-ak-blue shadow-sm"><ImagePlus size={23} aria-hidden="true" /></span>
          <span className="text-sm font-bold text-foreground">Bilder auswählen oder hierher ziehen</span>
          <span className="text-xs leading-5 text-ak-muted">JPG, PNG, WEBP oder HEIC · maximal 5 Bilder à 5 MB</span>
        </button>
        {photoError && <p className="mt-3 text-sm text-red-700" role="alert">{photoError}</p>}
        {photos.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo, index) => <div key={photo.preview} className="group relative aspect-square overflow-hidden rounded-xl bg-ak-surface-light"><img src={photo.preview} alt={`Fahrzeugfoto ${index + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => removePhoto(photo.preview)} aria-label={`Fahrzeugfoto ${index + 1} entfernen`} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ak-deep/90 text-ak-white opacity-100 transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ak-white"><X size={16} aria-hidden="true" /></button></div>)}
        </div>}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField id="price" label="Preisvorstellung (optional)" type="number" min="0" step="100" suffix="€" value={form.price} onChange={(value) => update("price", value)} placeholder="z. B. 12500" />
        <div className="flex items-end"><p className="flex items-start gap-2 text-xs leading-5 text-ak-muted"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-ak-blue" aria-hidden="true" /> Bilder werden nur zur Bearbeitung deiner Anfrage an unser Team übermittelt.</p></div>
      </div>
      <div className="mt-5"><TextAreaField id="notes" label="Weitere Hinweise (optional)" value={form.notes} onChange={(value) => update("notes", value)} placeholder="Was sollten wir über dein Fahrzeug noch wissen?" /></div>
    </div>
  );
}

function StepContact({ form, update }: { form: FormState; update: (key: keyof FormState, value: string | boolean) => void }) {
  const vehicleName = [form.vehicleBrand, form.vehicleModel].filter(Boolean).join(" ") || form.customVehicle || "Fahrzeug noch nicht angegeben";
  return (
    <div>
      <StepIntro eyebrow="Schritt 5" title="Wie erreichen wir dich?" description="Wir melden uns persönlich zu deiner Anfrage. Eine Bewertung ist kostenlos und unverbindlich." />
      <div className="mt-6 rounded-2xl bg-ak-surface-light p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-ak-blue">Deine Auswahl</p><p className="mt-1 font-semibold text-foreground">{vehicleName}</p><p className="mt-1 text-xs text-ak-muted">{form.mileage ? `${form.mileage} km` : "Kilometerstand offen"}{form.firstRegistration ? ` · ${form.firstRegistration.slice(0, 4)}` : ""}</p></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField id="firstName" label="Vorname" value={form.firstName} onChange={(value) => update("firstName", value)} placeholder="Vorname" autoComplete="given-name" />
        <TextField id="lastName" label="Nachname" value={form.lastName} onChange={(value) => update("lastName", value)} placeholder="Nachname" autoComplete="family-name" />
        <TextField id="email" label="E-Mail-Adresse" type="email" value={form.email} onChange={(value) => update("email", value)} placeholder="name@beispiel.de" autoComplete="email" />
        <TextField id="phone" label="Telefonnummer" type="tel" value={form.phone} onChange={(value) => update("phone", value)} placeholder="07121 …" autoComplete="tel" />
        <TextField id="postalCode" label="Postleitzahl" value={form.postalCode} onChange={(value) => update("postalCode", value)} placeholder="72770" autoComplete="postal-code" />
        <TextField id="city" label="Ort" value={form.city} onChange={(value) => update("city", value)} placeholder="Reutlingen" autoComplete="address-level2" />
        <ChoiceSelect id="callbackTime" label="Rückrufzeitraum (optional)" value={form.callbackTime} options={["Vormittags", "Mittags", "Nachmittags", "Abends"].map((value) => ({ value, label: value }))} onChange={(value) => update("callbackTime", value)} placeholder="Keine Präferenz" />
      </div>
      <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} /></div>
      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-ak-surface-light p-4 text-sm leading-6 text-ak-muted transition-colors hover:border-ak-blue/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ak-blue"><input type="checkbox" checked={form.privacy} onChange={(event) => update("privacy", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-ak-blue" /> <span>Ich habe die <a href="/datenschutz" target="_blank" rel="noreferrer" className="font-semibold text-ak-blue underline underline-offset-2">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Fahrzeugankauf-Anfrage zu.</span></label>
    </div>
  );
}

function StepIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-ak-blue">{eyebrow}</p><h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-ak-muted">{description}</p></div>;
}

function TextField({ id, label, value, onChange, placeholder, type = "text", min, max, step, suffix, autoComplete }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; min?: string; max?: string; step?: string; suffix?: string; autoComplete?: string }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">{label}</label><div className="relative"><input id={id} type={type} min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} autoComplete={autoComplete} className={`min-h-12 w-full rounded-xl border border-ak-surface-light bg-ak-white px-4 text-sm text-foreground outline-none transition placeholder:text-ak-muted/60 focus:border-ak-blue focus:ring-2 focus:ring-ak-blue/15 ${suffix ? "pr-12" : ""}`} />{suffix && <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-ak-muted">{suffix}</span>}</div></div>;
}

function TextAreaField({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">{label}</label><textarea id={id} rows={3} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full resize-y rounded-xl border border-ak-surface-light bg-ak-white px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-ak-muted/60 focus:border-ak-blue focus:ring-2 focus:ring-ak-blue/15" /></div>;
}

function ChoiceSelect({ id, label, value, options, onChange, placeholder }: { id: string; label: string; value: string; options: SelectOption[]; onChange: (value: string) => void; placeholder: string }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">{label}</label><div className="relative"><select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 w-full appearance-none rounded-xl border border-ak-surface-light bg-ak-white px-4 pr-10 text-sm text-foreground outline-none transition focus:border-ak-blue focus:ring-2 focus:ring-ak-blue/15"><option value="">{placeholder}</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ak-muted" size={17} aria-hidden="true" /></div></div>;
}

function ChoiceCards({ label, value, options, onChange }: { label: string; value: string; options: SelectOption[]; onChange: (value: string) => void }) {
  return <fieldset><legend className="mb-3 text-sm font-semibold text-foreground">{label}</legend><div className="grid gap-2 sm:grid-cols-2">{options.map((option) => <label key={option.value} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm transition-colors ${value === option.value ? "border-ak-blue bg-ak-blue/10 font-semibold text-foreground" : "border-ak-surface-light bg-ak-white text-ak-muted hover:border-ak-blue/40"}`}><input type="radio" name={label} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="h-4 w-4 accent-ak-blue" />{option.label}</label>)}</div></fieldset>;
}

function SearchableCombobox({ id, label, value, options, placeholder, onChange }: { id: string; label: string; value: string; options: string[]; placeholder: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const filteredOptions = options.filter((option) => option.toLocaleLowerCase().includes(query.toLocaleLowerCase())).slice(0, 12);

  useEffect(() => {
    const close = (event: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return <div ref={rootRef} className="relative"><label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">{label}</label><div className="relative"><input id={id} role="combobox" aria-expanded={open} aria-controls={`${id}-listbox`} aria-autocomplete="list" value={open ? query : value} onFocus={() => { setOpen(true); setQuery(value); }} onChange={(event) => { setQuery(event.target.value); onChange(""); setActiveIndex(0); setOpen(true); }} onKeyDown={(event) => { if (!open && (event.key === "ArrowDown" || event.key === "Enter")) { event.preventDefault(); setOpen(true); return; } if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((current) => Math.min(current + 1, Math.max(filteredOptions.length - 1, 0))); } if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((current) => Math.max(current - 1, 0)); } if (event.key === "Enter" && filteredOptions[activeIndex]) { event.preventDefault(); onChange(filteredOptions[activeIndex]); setQuery(filteredOptions[activeIndex]); setOpen(false); } if (event.key === "Escape") setOpen(false); }} placeholder={placeholder} className="min-h-12 w-full rounded-xl border border-ak-surface-light bg-ak-white px-4 pr-10 text-sm text-foreground outline-none transition placeholder:text-ak-muted/60 focus:border-ak-blue focus:ring-2 focus:ring-ak-blue/15" /><ChevronDown className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ak-muted transition-transform ${open ? "rotate-180" : ""}`} size={17} aria-hidden="true" /></div>{open && <div id={`${id}-listbox`} role="listbox" className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-ak-surface-light bg-ak-white p-1 shadow-xl">{filteredOptions.length ? filteredOptions.map((option, index) => <button type="button" role="option" aria-selected={value === option} key={option} onMouseDown={(event) => event.preventDefault()} onClick={() => { onChange(option); setQuery(option); setOpen(false); }} className={`flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm transition-colors ${index === activeIndex ? "bg-ak-surface-light text-foreground" : "text-ak-muted hover:bg-ak-surface-light hover:text-foreground"}`}>{option}</button>) : <p className="px-3 py-3 text-sm text-ak-muted">Keine passende Auswahl. Nutze die freie Eingabe.</p>}</div>}</div>;
}
