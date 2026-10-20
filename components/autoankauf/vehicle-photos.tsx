"use client";

import { useRef, useState } from "react";
import { Camera, Check, ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { MAX_IMAGE_BYTES, MAX_PHOTOS, type VehiclePhoto } from "@/lib/vehicle-data";

async function preparePhoto(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size > 25 * 1024 * 1024) throw new Error("Bitte wähle ein Bild bis 25 MB. Große Fotos werden automatisch verkleinert.");
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("Dieses Bildformat lässt sich nicht öffnen. Bitte verwende JPG, PNG oder WebP.")); image.src = url; });
    const ratio = Math.min(1, 1920 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * ratio);
    canvas.height = Math.round(image.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Dein Browser konnte das Foto nicht vorbereiten.");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("Das Foto konnte nicht vorbereitet werden.")), "image/jpeg", 0.85));
    if (blob.size > MAX_IMAGE_BYTES) throw new Error("Das Foto ist zu groß. Bitte verwende ein kleineres Bild.");
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, { type: "image/jpeg" });
  } finally { URL.revokeObjectURL(url); }
}

export function VehiclePhotos({ photos, onChange, onBusy }: { photos: VehiclePhoto[]; onChange: (photos: VehiclePhoto[]) => void; onBusy: (busy: boolean) => void }) {
  const gallery = useRef<HTMLInputElement>(null);
  const camera = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const busyRef = useRef(false);
  function markBusy(value: boolean) { busyRef.current = value; setBusy(value); onBusy(value); }
  async function upload(files: File[]) {
    if (busyRef.current || !files.length) return;
    setError("");
    if (files.length + photos.length > MAX_PHOTOS) { setError(`Bitte wähle insgesamt höchstens ${MAX_PHOTOS} Bilder.`); return; }
    markBusy(true);
    try {
      for (let index = 0; index < files.length; index++) {
        setProgress(`Foto ${index + 1} von ${files.length} wird vorbereitet und hochgeladen …`);
        const image = await preparePhoto(files[index]);
        const form = new FormData(); form.set("image", image);
        const response = await fetch("/api/autoankauf/images", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Das Foto konnte nicht hochgeladen werden.");
        onChange(result.images);
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Der Upload ist fehlgeschlagen. Bitte versuche es erneut."); }
    finally { markBusy(false); setProgress(""); }
  }
  async function remove(photo: VehiclePhoto) {
    if (busyRef.current) return;
    markBusy(true); setError("");
    try {
      const response = await fetch(`/api/autoankauf/images?id=${photo.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Das Foto konnte nicht entfernt werden.");
      onChange(result.images);
    } catch (err) { setError(err instanceof Error ? err.message : "Bitte versuche es erneut."); }
    finally { markBusy(false); }
  }
  return <div className="flex flex-col gap-4">
    <input ref={gallery} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple className="sr-only" tabIndex={-1} aria-label="Fahrzeugfotos auswählen" onChange={event => { void upload(Array.from(event.target.files || [])); event.target.value = ""; }} />
    <input ref={camera} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} aria-label="Fahrzeug fotografieren" onChange={event => { void upload(Array.from(event.target.files || [])); event.target.value = ""; }} />
    {photos.length < MAX_PHOTOS && <button type="button" disabled={busy} onClick={() => gallery.current?.click()} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); void upload(Array.from(event.dataTransfer.files)); }} className={`flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition-colors disabled:opacity-60 ${dragging ? "border-ak-blue bg-ak-blue/10" : "border-ak-deep/15 bg-ak-white hover:border-ak-blue"}`}>
      {busy ? <LoaderCircle size={32} className="animate-spin text-ak-blue" aria-hidden="true" /> : <ImagePlus size={32} className="text-ak-blue" aria-hidden="true" />}
      <span className="text-lg font-semibold">{busy ? "Fotos werden hochgeladen" : "Fotos auswählen oder hierher ziehen"}</span>
      <span className="text-sm text-ak-muted">Außen, innen, Cockpit oder Schäden · bis zu 6 Fotos</span>
    </button>}
    <button type="button" disabled={busy || photos.length >= MAX_PHOTOS} onClick={() => camera.current?.click()} className="flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-ak-blue disabled:opacity-50"><Camera size={18} aria-hidden="true" /> Foto mit der Kamera aufnehmen</button>
    {!!photos.length && <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{photos.map(photo => <div key={photo.id} className="relative overflow-hidden rounded-xl border border-ak-deep/10 bg-ak-white">
      {/* Authenticated image responses must not pass through the public Next.js image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />
      <button type="button" aria-label={`${photo.name} entfernen`} disabled={busy} onClick={() => void remove(photo)} className="absolute bottom-0 right-0 flex size-11 items-center justify-center rounded-tl-xl bg-ak-deep text-ak-white hover:bg-ak-blue disabled:opacity-50"><Trash2 size={18} aria-hidden="true" /></button>
    </div>)}</div>}
    <p role="status" className="flex items-center gap-2 text-sm leading-relaxed text-ak-muted">{busy ? progress : photos.length ? <><Check size={16} className="shrink-0 text-ak-blue" aria-hidden="true" />{photos.length} {photos.length === 1 ? "Foto sicher gespeichert" : "Fotos sicher gespeichert"}</> : "Fotos sind freiwillig. Große Bilder werden automatisch verkleinert."}</p>
    {error && <p role="alert" className="rounded-xl border border-ak-blue/25 bg-ak-blue/5 p-4 text-sm text-ak-deep">{error}</p>}
  </div>;
}
