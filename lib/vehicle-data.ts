export const VEHICLE_BRANDS: { name: string; models: string[] }[] = [
  { name: "Volkswagen", models: ["up!", "Polo", "Golf", "Passat", "T-Cross", "T-Roc", "Tiguan", "Touareg", "Touran", "Caddy", "Transporter", "ID.3", "ID.4", "ID. Buzz"] },
  { name: "Mercedes-Benz", models: ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "V-Klasse", "Sprinter", "EQA", "EQB", "EQC", "EQE", "EQS"] },
  { name: "BMW", models: ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "i3", "i4", "i5", "iX"] },
  { name: "Audi", models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "TT", "e-tron"] },
  { name: "Opel", models: ["Adam", "Astra", "Corsa", "Crossland", "Grandland", "Insignia", "Mokka", "Zafira"] },
  { name: "Ford", models: ["Fiesta", "Focus", "Fusion", "Kuga", "Mondeo", "Mustang", "Puma", "Ranger", "S-Max", "Transit"] },
  { name: "Skoda", models: ["Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Scala", "Superb", "Enyaq", "Elroq"] },
  { name: "Seat", models: ["Arona", "Ateca", "Ibiza", "Leon", "Tarraco"] },
  { name: "Hyundai", models: ["i10", "i20", "i30", "Ioniq", "Ioniq 5", "Ioniq 6", "Kona", "Santa Fe", "Tucson"] },
  { name: "Toyota", models: ["Aygo", "C-HR", "Corolla", "Hilux", "Prius", "RAV4", "Yaris", "Yaris Cross"] },
  { name: "Renault", models: ["Captur", "Clio", "Kadjar", "Kangoo", "Megane", "Scenic", "Twingo", "Zoe"] },
  { name: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y"] },
  { name: "Volvo", models: ["C40", "S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90", "EX30"] },
  { name: "Kia", models: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Niro", "EV3", "EV6", "EV9"] },
  { name: "Peugeot", models: ["108", "208", "308", "508", "2008", "3008", "5008", "Rifter"] },
  { name: "Fiat", models: ["500", "500X", "Panda", "Tipo", "Punto", "Ducato"] },
  { name: "Mazda", models: ["2", "3", "6", "CX-3", "CX-5", "CX-30", "CX-60", "MX-5"] },
  { name: "Nissan", models: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya"] },
  { name: "Dacia", models: ["Sandero", "Duster", "Jogger", "Spring", "Logan"] },
  { name: "Mini", models: ["Cooper", "Clubman", "Countryman", "Aceman"] },
  { name: "Cupra", models: ["Born", "Formentor", "Leon", "Ateca", "Tavascan", "Terramar"] },
  { name: "Citroën", models: ["C1", "C3", "C4", "C5", "Berlingo", "C3 Aircross", "C5 Aircross"] },
  { name: "Suzuki", models: ["Swift", "Ignis", "Vitara", "S-Cross", "Jimny"] },
  { name: "Honda", models: ["Jazz", "Civic", "HR-V", "CR-V", "e"] },
  { name: "Porsche", models: ["911", "718", "Cayenne", "Macan", "Panamera", "Taycan"] },
];
export const FUEL_TYPES = ["Benzin", "Diesel", "Hybrid", "Plug-in-Hybrid", "Elektro", "Sonstige"];
export const TRANSMISSIONS = ["Automatik", "Schaltgetriebe"];
export const CONDITION_OPTIONS = ["Sehr gut", "Gut", "Gebrauchsspuren", "Beschädigt"];
export const MAX_PHOTOS = 6;
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const EMPTY_VEHICLE = { brand: "", model: "", month: "", year: "", mileage: "", fuel: "", engine: "", transmission: "", condition: "", damage: "", price: "", name: "", phone: "", email: "", privacy: false };
export type VehicleData = typeof EMPTY_VEHICLE;
export type VehicleField = Exclude<keyof VehicleData, "privacy">;
export type VehiclePhoto = { id: string; name: string; url: string };
export type VehicleDraft = { payload: VehicleData; step: number; images: VehiclePhoto[]; status: "draft" | "sending" | "sent" };

export function cleanVehicle(input: unknown): VehicleData {
  const source = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const result = { ...EMPTY_VEHICLE };
  for (const key of Object.keys(EMPTY_VEHICLE) as (keyof VehicleData)[]) {
    if (key === "privacy") result.privacy = source.privacy === true;
    else result[key] = typeof source[key] === "string" ? source[key].replace(/[\u0000-\u0008\u000b-\u001f]/g, "").slice(0, key === "damage" ? 1500 : 150) : "";
  }
  return result;
}

export function validateVehicleStep(step: number, data: VehicleData): string {
  if (step === 0 && !data.brand.trim()) return "Bitte wähle eine Marke oder gib sie selbst ein.";
  if (step === 1 && !data.model.trim()) return "Bitte wähle ein Modell oder gib es selbst ein.";
  if (step === 2) {
    const year = Number(data.year), month = Number(data.month), now = new Date();
    if (!/^\d{4}$/.test(data.year) || year < 1950 || year > now.getFullYear() || month < 1 || month > 12 || !data.month) return "Bitte wähle einen gültigen Monat und ein Jahr ab 1950.";
    if (year === now.getFullYear() && month > now.getMonth() + 1) return "Die Erstzulassung darf nicht in der Zukunft liegen.";
  }
  if (step === 3 && (!/^\d+$/.test(data.mileage) || Number(data.mileage) > 2000000)) return "Bitte gib einen Kilometerstand zwischen 0 und 2.000.000 km ein.";
  if (step === 4 && !FUEL_TYPES.includes(data.fuel)) return "Bitte wähle die Kraftstoffart.";
  if (step === 5 && !TRANSMISSIONS.includes(data.transmission)) return "Bitte wähle das Getriebe.";
  if (step === 6 && !CONDITION_OPTIONS.includes(data.condition)) return "Bitte schätze den Zustand deines Autos ein.";
  if (step === 8 && data.price && (!/^\d+$/.test(data.price) || Number(data.price) > 10000000)) return "Bitte gib einen Betrag zwischen 0 und 10.000.000 Euro ein oder überspringe die Frage.";
  if (step === 9) {
    if (data.name.trim().length < 3) return "Bitte gib deinen Vor- und Nachnamen ein.";
    if (!/^[+\d\s()/.-]{6,40}$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 6) return "Bitte gib eine gültige Telefonnummer ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Bitte prüfe deine E-Mail-Adresse.";
  }
  if (step === 10 && !data.privacy) return "Bitte bestätige die Datenschutzhinweise.";
  return "";
}

export function vehicleSummary(data: VehicleData): [string, string, number][] {
  return [
    ["Fahrzeug", `${data.brand} ${data.model}`, 0],
    ["Erstzulassung", `${data.month.padStart(2, "0")}/${data.year}`, 2],
    ["Kilometerstand", `${Number(data.mileage).toLocaleString("de-DE")} km`, 3],
    ["Motor", [data.fuel, data.engine].filter(Boolean).join(" · "), 4],
    ["Getriebe", data.transmission, 5],
    ["Zustand", data.condition, 6],
    ...(data.damage ? [["Schäden / Hinweise", data.damage, 6] as [string, string, number]] : []),
    ["Preisvorstellung", data.price ? `${Number(data.price).toLocaleString("de-DE")} €` : "Keine Angabe", 8],
    ["Name", data.name, 9], ["Telefon", data.phone, 9], ["E-Mail", data.email, 9],
  ];
}
