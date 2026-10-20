export const VEHICLE_BRANDS = [
  { name: "Audi", models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "e-tron"] },
  { name: "BMW", models: ["1er", "2er", "3er", "320d", "320i", "330d", "330i", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X5", "X6", "X7", "i3", "i4", "iX"] },
  { name: "Ford", models: ["Fiesta", "Focus", "Fusion", "Kuga", "Mondeo", "Mustang", "Puma", "Ranger", "S-Max", "Transit"] },
  { name: "Hyundai", models: ["i10", "i20", "i30", "Ioniq", "Ioniq 5", "Kona", "Santa Fe", "Tucson"] },
  { name: "Mercedes-Benz", models: ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "V-Klasse", "Sprinter", "EQA", "EQC"] },
  { name: "Opel", models: ["Adam", "Astra", "Corsa", "Crossland", "Grandland", "Insignia", "Mokka", "Zafira"] },
  { name: "Renault", models: ["Captur", "Clio", "Kadjar", "Kangoo", "Megane", "Scenic", "Twingo", "Zoe"] },
  { name: "Seat", models: ["Arona", "Ateca", "Ibiza", "Leon", "Tarraco"] },
  { name: "Skoda", models: ["Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Scala", "Superb"] },
  { name: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y"] },
  { name: "Toyota", models: ["Aygo", "C-HR", "Corolla", "Hilux", "Prius", "RAV4", "Yaris", "Yaris Cross"] },
  { name: "Volkswagen", models: ["up!", "Polo", "Golf", "Passat", "T-Cross", "T-Roc", "Tiguan", "Touareg", "Touran", "Caddy", "Transporter", "ID.3", "ID.4", "ID. Buzz"] },
  { name: "Volvo", models: ["C40", "S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90"] },
] as const;

export const FUEL_TYPES = ["Benzin", "Diesel", "Hybrid", "Plug-in-Hybrid", "Elektro", "Sonstige"] as const;
export const TRANSMISSIONS = ["Automatik", "Schaltgetriebe"] as const;
export const BODY_TYPES = ["Kleinwagen", "Limousine", "Kombi", "SUV / Geländewagen", "Coupé", "Cabrio", "Van / Bus", "Transporter", "Sonstige"] as const;
export const CONDITION_OPTIONS = ["Sehr gut", "Gut", "Gebrauchsspuren", "Renovierungsbedürftig"] as const;
export const ACCIDENT_OPTIONS = ["Unfallfrei", "Vorschäden vorhanden", "Unfallschaden vorhanden", "Nicht sicher"] as const;
export const DRIVABLE_OPTIONS = ["Ja, fahrbereit", "Eingeschränkt fahrbereit", "Nein, nicht fahrbereit"] as const;
export const SERVICE_BOOK_OPTIONS = ["Ja, vollständig", "Teilweise", "Nein", "Nicht sicher"] as const;

export function getModelsForBrand(brand: string): string[] {
  return VEHICLE_BRANDS.find((item) => item.name === brand)?.models.slice() ?? [];
}
