// ─── Types ────────────────────────────────────────────────────────────────────

export type KundeStatus = "aktiv" | "inaktiv" | "gesperrt";
export type TerminStatus = "angefragt" | "bestätigt" | "in_arbeit" | "fertig" | "storniert";
export type BewerbungStatus = "neu" | "kontaktiert" | "gespräch" | "probearbeit" | "angenommen" | "abgelehnt";
export type RechnungStatus = "offen" | "bezahlt" | "überfällig" | "storniert";
export type ErinnerungTyp = "tuev" | "inspektion" | "geburtstag" | "reifen" | "inaktiv";
export type ErinnerungStatus = "ausstehend" | "gesendet" | "ignoriert";

export interface Kunde {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  geburtsdatum: string;
  status: KundeStatus;
  dsgvo: boolean;
  notizen: string;
  erstellt: string;
  letzterKontakt: string;
  fahrzeuge: string[];
  rechnungen: string[];
  zufriedenheit: number;
}

export interface Fahrzeug {
  id: string;
  kennzeichen: string;
  marke: string;
  modell: string;
  baujahr: number;
  farbe: string;
  vin: string;
  kilometerstand: number;
  tuevFaellig: string;
  naechsteInspektion: string;
  kundeId: string;
  serviceHistory: ServiceEintrag[];
}

export interface ServiceEintrag {
  datum: string;
  art: string;
  beschreibung: string;
  km: number;
  kosten: number;
  mechaniker: string;
}

export interface Termin {
  id: string;
  kundeId: string;
  fahrzeugId: string;
  datum: string;
  uhrzeit: string;
  dauer: number;
  serviceArt: string;
  status: TerminStatus;
  mechaniker: string;
  notizen: string;
}

export interface Bewerbung {
  id: string;
  name: string;
  email: string;
  telefon: string;
  stelle: string;
  anschreiben: string;
  status: BewerbungStatus;
  eingegangen: string;
  cvUrl?: string;
  notizen: string;
}

export interface Rechnung {
  id: string;
  kundeId: string;
  fahrzeugId: string;
  nummer: string;
  datum: string;
  faellig: string;
  betrag: number;
  status: RechnungStatus;
  positionen: RechnungsPosition[];
}

export interface RechnungsPosition {
  beschreibung: string;
  menge: number;
  einzelpreis: number;
}

export interface Erinnerung {
  id: string;
  kundeId: string;
  fahrzeugId?: string;
  typ: ErinnerungTyp;
  faellig: string;
  status: ErinnerungStatus;
  betreff: string;
  nachricht: string;
}

export interface Kampagne {
  id: string;
  name: string;
  typ: "email" | "sms";
  zielgruppe: string;
  status: "entwurf" | "geplant" | "gesendet";
  erstellt: string;
  geplantFuer?: string;
  empfaenger: number;
  geoeffnet?: number;
  geklickt?: number;
}

// ─── Kunden ───────────────────────────────────────────────────────────────────

export const mockKunden: Kunde[] = [
  {
    id: "k001",
    vorname: "Markus",
    nachname: "Schneider",
    email: "m.schneider@gmail.com",
    telefon: "0176 23456789",
    strasse: "Kaiserstraße 14",
    plz: "72764",
    ort: "Reutlingen",
    geburtsdatum: "1985-03-15",
    status: "aktiv",
    dsgvo: true,
    notizen: "Stammkunde seit Eröffnung. Bevorzugt Freitagvormittage.",
    erstellt: "2026-04-01",
    letzterKontakt: "2026-06-28",
    fahrzeuge: ["f001"],
    rechnungen: ["r001", "r003"],
    zufriedenheit: 5,
  },
  {
    id: "k002",
    vorname: "Sabine",
    nachname: "Müller",
    email: "sabine.mueller@web.de",
    telefon: "0151 98765432",
    strasse: "Ringstraße 7",
    plz: "72770",
    ort: "Reutlingen",
    geburtsdatum: "1979-07-22",
    status: "aktiv",
    dsgvo: true,
    notizen: "Hat zwei Kinder, kommt oft kurzfristig.",
    erstellt: "2026-04-03",
    letzterKontakt: "2026-06-20",
    fahrzeuge: ["f002"],
    rechnungen: ["r002"],
    zufriedenheit: 4,
  },
  {
    id: "k003",
    vorname: "Thomas",
    nachname: "Wagner",
    email: "t.wagner@firma-wagner.de",
    telefon: "07121 445566",
    strasse: "Industriestraße 3",
    plz: "72760",
    ort: "Reutlingen",
    geburtsdatum: "1972-11-05",
    status: "aktiv",
    dsgvo: true,
    notizen: "Flottenvertrag in Verhandlung. 3 Firmenfahrzeuge.",
    erstellt: "2026-04-10",
    letzterKontakt: "2026-07-01",
    fahrzeuge: ["f003", "f004"],
    rechnungen: ["r004"],
    zufriedenheit: 5,
  },
  {
    id: "k004",
    vorname: "Ayse",
    nachname: "Demir",
    email: "ayse.demir@hotmail.com",
    telefon: "0170 11223344",
    strasse: "Neckarstraße 21",
    plz: "72762",
    ort: "Reutlingen",
    geburtsdatum: "1991-02-18",
    status: "aktiv",
    dsgvo: true,
    notizen: "",
    erstellt: "2026-04-15",
    letzterKontakt: "2026-06-10",
    fahrzeuge: ["f005"],
    rechnungen: ["r005"],
    zufriedenheit: 4,
  },
  {
    id: "k005",
    vorname: "Peter",
    nachname: "Kohl",
    email: "peter.kohl@t-online.de",
    telefon: "0179 55443322",
    strasse: "Hauptstraße 88",
    plz: "72766",
    ort: "Reutlingen",
    geburtsdatum: "1965-09-30",
    status: "inaktiv",
    dsgvo: true,
    notizen: "Letzter Besuch vor 3 Monaten. Reaktivierung ausstehend.",
    erstellt: "2026-04-20",
    letzterKontakt: "2026-04-20",
    fahrzeuge: ["f006"],
    rechnungen: [],
    zufriedenheit: 3,
  },
  {
    id: "k006",
    vorname: "Julia",
    nachname: "Braun",
    email: "j.braun@gmx.de",
    telefon: "0152 66778899",
    strasse: "Gartenweg 5",
    plz: "72768",
    ort: "Reutlingen",
    geburtsdatum: "1998-12-01",
    status: "aktiv",
    dsgvo: false,
    notizen: "DSGVO-Einwilligung noch ausstehend.",
    erstellt: "2026-05-02",
    letzterKontakt: "2026-06-30",
    fahrzeuge: ["f007"],
    rechnungen: ["r006"],
    zufriedenheit: 5,
  },
];

// ─── Fahrzeuge ────────────────────────────────────────────────────────────────

export const mockFahrzeuge: Fahrzeug[] = [
  {
    id: "f001",
    kennzeichen: "RT-MS 112",
    marke: "BMW",
    modell: "3er (G20)",
    baujahr: 2021,
    farbe: "Alpinweiß",
    vin: "WBA5R11090FH12345",
    kilometerstand: 42800,
    tuevFaellig: "2026-09-15",
    naechsteInspektion: "2026-12-01",
    kundeId: "k001",
    serviceHistory: [
      { datum: "2026-06-28", art: "Inspektion", beschreibung: "Großinspektion inkl. Ölwechsel, Luftfilter, Bremsflüssigkeit", km: 42800, kosten: 389, mechaniker: "Ali R." },
      { datum: "2026-02-10", art: "Reparatur", beschreibung: "Bremsbeläge vorne + hinten gewechselt", km: 39200, kosten: 248, mechaniker: "Jannis S." },
    ],
  },
  {
    id: "f002",
    kennzeichen: "RT-SM 44",
    marke: "Volkswagen",
    modell: "Golf VII",
    baujahr: 2018,
    farbe: "Tiefblaumetallic",
    vin: "WVWZZZ1KZJW123456",
    kilometerstand: 87600,
    tuevFaellig: "2026-08-01",
    naechsteInspektion: "2026-08-01",
    kundeId: "k002",
    serviceHistory: [
      { datum: "2026-06-20", art: "TÜV + AU", beschreibung: "Hauptuntersuchung bestanden, kleine Mängel: Scheinwerfer einstellen", km: 87600, kosten: 129, mechaniker: "Karim N." },
    ],
  },
  {
    id: "f003",
    kennzeichen: "RT-TW 1",
    marke: "Mercedes-Benz",
    modell: "Sprinter 316",
    baujahr: 2020,
    farbe: "Polarweiß",
    vin: "WDB9066351P012345",
    kilometerstand: 112300,
    tuevFaellig: "2027-03-01",
    naechsteInspektion: "2026-09-01",
    kundeId: "k003",
    serviceHistory: [
      { datum: "2026-07-01", art: "Reparatur", beschreibung: "Kupplung gewechselt, Nehmerzylinder erneuert", km: 112300, kosten: 780, mechaniker: "Ali R." },
    ],
  },
  {
    id: "f004",
    kennzeichen: "RT-TW 2",
    marke: "Mercedes-Benz",
    modell: "Vito 119",
    baujahr: 2022,
    farbe: "Selenitgrau",
    vin: "WDF44770312345678",
    kilometerstand: 34500,
    tuevFaellig: "2027-08-01",
    naechsteInspektion: "2026-11-01",
    kundeId: "k003",
    serviceHistory: [],
  },
  {
    id: "f005",
    kennzeichen: "RT-AD 88",
    marke: "Toyota",
    modell: "Yaris (XP210)",
    baujahr: 2023,
    farbe: "Chilirot",
    vin: "VNKKJDE300A012345",
    kilometerstand: 18200,
    tuevFaellig: "2028-02-01",
    naechsteInspektion: "2026-10-01",
    kundeId: "k004",
    serviceHistory: [
      { datum: "2026-06-10", art: "Inspektion", beschreibung: "Kleine Inspektion + Reifenwechsel", km: 18200, kosten: 165, mechaniker: "Jannis S." },
    ],
  },
  {
    id: "f006",
    kennzeichen: "RT-PK 77",
    marke: "Opel",
    modell: "Astra K",
    baujahr: 2016,
    farbe: "Kaschmirgrau",
    vin: "W0L0AHB76G4012345",
    kilometerstand: 143700,
    tuevFaellig: "2026-07-20",
    naechsteInspektion: "2026-07-20",
    kundeId: "k005",
    serviceHistory: [],
  },
  {
    id: "f007",
    kennzeichen: "RT-JB 21",
    marke: "Seat",
    modell: "Ibiza FR",
    baujahr: 2024,
    farbe: "Mystery Blau",
    vin: "VSSZZZ6JZPR012345",
    kilometerstand: 8900,
    tuevFaellig: "2027-12-01",
    naechsteInspektion: "2027-06-01",
    kundeId: "k006",
    serviceHistory: [
      { datum: "2026-06-30", art: "Glasservice", beschreibung: "Frontscheibe ausgetauscht nach Steinschlag", km: 8900, kosten: 290, mechaniker: "Ali R." },
    ],
  },
];

// ─── Termine ──────────────────────────────────────────────────────────────────

export const mockTermine: Termin[] = [
  { id: "t001", kundeId: "k001", fahrzeugId: "f001", datum: "2026-07-02", uhrzeit: "08:00", dauer: 90, serviceArt: "Inspektion", status: "bestätigt", mechaniker: "Ali R.", notizen: "" },
  { id: "t002", kundeId: "k002", fahrzeugId: "f002", datum: "2026-07-02", uhrzeit: "10:00", dauer: 60, serviceArt: "TÜV Vorbereitung", status: "bestätigt", mechaniker: "Jannis S.", notizen: "Scheinwerfer prüfen" },
  { id: "t003", kundeId: "k004", fahrzeugId: "f005", datum: "2026-07-02", uhrzeit: "14:00", dauer: 30, serviceArt: "Ölwechsel", status: "angefragt", mechaniker: "", notizen: "" },
  { id: "t004", kundeId: "k003", fahrzeugId: "f003", datum: "2026-07-03", uhrzeit: "09:00", dauer: 180, serviceArt: "Kupplung Reparatur", status: "in_arbeit", mechaniker: "Ali R.", notizen: "Ersatzteile bereits bestellt" },
  { id: "t005", kundeId: "k006", fahrzeugId: "f007", datum: "2026-07-04", uhrzeit: "11:00", dauer: 45, serviceArt: "Klimaservice", status: "bestätigt", mechaniker: "Jannis S.", notizen: "" },
  { id: "t006", kundeId: "k005", fahrzeugId: "f006", datum: "2026-07-07", uhrzeit: "08:30", dauer: 120, serviceArt: "TÜV + HU", status: "angefragt", mechaniker: "", notizen: "TÜV läuft ab am 20.07" },
  { id: "t007", kundeId: "k001", fahrzeugId: "f001", datum: "2026-06-25", uhrzeit: "09:00", dauer: 60, serviceArt: "Bremsenwechsel", status: "fertig", mechaniker: "Ali R.", notizen: "" },
  { id: "t008", kundeId: "k002", fahrzeugId: "f002", datum: "2026-06-18", uhrzeit: "13:00", dauer: 45, serviceArt: "Reifenwechsel", status: "storniert", mechaniker: "Jannis S.", notizen: "Kunde hat abgesagt" },
];

// ─── Bewerbungen ──────────────────────────────────────────────────────────────

export const mockBewerbungen: Bewerbung[] = [
  {
    id: "b001",
    name: "Kevin Huber",
    email: "kevin.huber@gmail.com",
    telefon: "0176 11122233",
    stelle: "Kfz-Mechatroniker (m/w/d)",
    anschreiben: "Ich bin seit 6 Jahren als Kfz-Mechatroniker tätig und suche einen Betrieb, in dem ich wirklich mitgestalten kann. Autoklinik klingt nach genau dem richtigen Umfeld.",
    status: "neu",
    eingegangen: "2026-07-01",
    notizen: "",
  },
  {
    id: "b002",
    name: "Lena Bauer",
    email: "lena.bauer@web.de",
    telefon: "0151 44556677",
    stelle: "Kfz-Mechatroniker (m/w/d)",
    anschreiben: "Ich habe meine Ausbildung 2023 abgeschlossen und arbeite seitdem in einer Fachwerkstatt. Ich möchte gerne in einem jungen Team arbeiten.",
    status: "kontaktiert",
    eingegangen: "2026-06-28",
    notizen: "Am 29.06 angerufen, Gespräch vereinbart für 05.07",
  },
  {
    id: "b003",
    name: "Mehmet Yilmaz",
    email: "m.yilmaz@hotmail.de",
    telefon: "0170 33445566",
    stelle: "Kfz-Mechatroniker (m/w/d)",
    anschreiben: "Gelernter KFZ-Meister mit 10 Jahren Erfahrung. Suche neue Herausforderung in einem modernen Betrieb.",
    status: "gespräch",
    eingegangen: "2026-06-20",
    notizen: "Gespräch am 30.06 - sehr guter Eindruck. Probearbeitstag angeboten.",
  },
  {
    id: "b004",
    name: "Simon Roth",
    email: "s.roth@gmail.com",
    telefon: "0179 77889900",
    stelle: "Kfz-Mechatroniker (m/w/d)",
    anschreiben: "Ich bin noch in der Ausbildung und suche nach dem Abschluss im August eine Festanstellung.",
    status: "abgelehnt",
    eingegangen: "2026-06-15",
    notizen: "Noch nicht weit genug in der Ausbildung. Vielleicht in einem Jahr erneut bewerben.",
  },
];

// ─── Rechnungen ───────────────────────────────────────────────────────────────

export const mockRechnungen: Rechnung[] = [
  {
    id: "r001",
    kundeId: "k001",
    fahrzeugId: "f001",
    nummer: "RE-2026-001",
    datum: "2026-06-28",
    faellig: "2026-07-12",
    betrag: 389,
    status: "offen",
    positionen: [
      { beschreibung: "Großinspektion", menge: 1, einzelpreis: 220 },
      { beschreibung: "Motoröl 5W-40 5L", menge: 1, einzelpreis: 65 },
      { beschreibung: "Luftfilter", menge: 1, einzelpreis: 45 },
      { beschreibung: "Bremsflüssigkeit", menge: 1, einzelpreis: 59 },
    ],
  },
  {
    id: "r002",
    kundeId: "k002",
    fahrzeugId: "f002",
    nummer: "RE-2026-002",
    datum: "2026-06-20",
    faellig: "2026-07-04",
    betrag: 129,
    status: "bezahlt",
    positionen: [
      { beschreibung: "Hauptuntersuchung TÜV", menge: 1, einzelpreis: 89 },
      { beschreibung: "Scheinwerfer einstellen", menge: 1, einzelpreis: 40 },
    ],
  },
  {
    id: "r003",
    kundeId: "k001",
    fahrzeugId: "f001",
    nummer: "RE-2026-003",
    datum: "2026-02-10",
    faellig: "2026-02-24",
    betrag: 248,
    status: "bezahlt",
    positionen: [
      { beschreibung: "Bremsbeläge vorne", menge: 1, einzelpreis: 98 },
      { beschreibung: "Bremsbeläge hinten", menge: 1, einzelpreis: 85 },
      { beschreibung: "Arbeitszeit 2h", menge: 2, einzelpreis: 32.5 },
    ],
  },
  {
    id: "r004",
    kundeId: "k003",
    fahrzeugId: "f003",
    nummer: "RE-2026-004",
    datum: "2026-07-01",
    faellig: "2026-07-15",
    betrag: 780,
    status: "offen",
    positionen: [
      { beschreibung: "Kupplung komplett", menge: 1, einzelpreis: 520 },
      { beschreibung: "Nehmerzylinder", menge: 1, einzelpreis: 130 },
      { beschreibung: "Arbeitszeit 4h", menge: 4, einzelpreis: 32.5 },
    ],
  },
  {
    id: "r005",
    kundeId: "k004",
    fahrzeugId: "f005",
    nummer: "RE-2026-005",
    datum: "2026-06-10",
    faellig: "2026-06-24",
    betrag: 165,
    status: "überfällig",
    positionen: [
      { beschreibung: "Kleine Inspektion", menge: 1, einzelpreis: 120 },
      { beschreibung: "Reifenmontage 4 Reifen", menge: 4, einzelpreis: 11.25 },
    ],
  },
  {
    id: "r006",
    kundeId: "k006",
    fahrzeugId: "f007",
    nummer: "RE-2026-006",
    datum: "2026-06-30",
    faellig: "2026-07-14",
    betrag: 290,
    status: "bezahlt",
    positionen: [
      { beschreibung: "Frontscheibe inkl. Einbau", menge: 1, einzelpreis: 260 },
      { beschreibung: "Scheibendichtung", menge: 1, einzelpreis: 30 },
    ],
  },
];

// ─── Erinnerungen ─────────────────────────────────────────────────────────────

export const mockErinnerungen: Erinnerung[] = [
  { id: "e001", kundeId: "k002", fahrzeugId: "f002", typ: "tuev", faellig: "2026-08-01", status: "ausstehend", betreff: "TÜV läuft ab!", nachricht: "Ihr TÜV für den VW Golf (RT-SM 44) läuft am 01.08.2026 ab. Jetzt Termin buchen!" },
  { id: "e002", kundeId: "k005", fahrzeugId: "f006", typ: "tuev", faellig: "2026-07-20", status: "ausstehend", betreff: "TÜV läuft ab - dringend!", nachricht: "TÜV für Opel Astra (RT-PK 77) läuft in 20 Tagen ab. Bitte jetzt Termin vereinbaren." },
  { id: "e003", kundeId: "k001", fahrzeugId: "f001", typ: "inspektion", faellig: "2026-12-01", status: "ausstehend", betreff: "Inspektion fällig", nachricht: "Bei Ihrem BMW 3er (RT-MS 112) steht im Dezember die nächste Inspektion an." },
  { id: "e004", kundeId: "k003", fahrzeugId: "f003", typ: "inspektion", faellig: "2026-09-01", status: "ausstehend", betreff: "Inspektion Sprinter", nachricht: "Für Ihren Mercedes Sprinter steht die Inspektion im September an." },
  { id: "e005", kundeId: "k002", fahrzeugId: undefined, typ: "geburtstag", faellig: "2026-07-22", status: "ausstehend", betreff: "Geburtstag Sabine Müller", nachricht: "Herzlichen Glückwunsch zum Geburtstag! Als Dankeschön erhalten Sie 10% Rabatt auf Ihre nächste Inspektion." },
  { id: "e006", kundeId: "k005", fahrzeugId: undefined, typ: "inaktiv", faellig: "2026-07-05", status: "ausstehend", betreff: "Reaktivierung - Peter Kohl", nachricht: "Wir vermissen Sie! Seit Ihrer letzten Werkstattbesuche sind 3 Monate vergangen. Wie können wir helfen?" },
  { id: "e007", kundeId: "k004", fahrzeugId: "f005", typ: "reifen", faellig: "2026-10-15", status: "ausstehend", betreff: "Reifenwechsel Herbst", nachricht: "Der Herbst kommt! Zeit für Winterreifen. Jetzt Termin für Reifenwechsel buchen." },
];

// ─── Kampagnen ────────────────────────────────────────────────────────────────

export const mockKampagnen: Kampagne[] = [
  { id: "kam001", name: "Sommeraktion - TÜV Special", typ: "email", zielgruppe: "TÜV fällig in 60 Tagen", status: "gesendet", erstellt: "2026-06-01", geplantFuer: "2026-06-15", empfaenger: 12, geoeffnet: 9, geklickt: 4 },
  { id: "kam002", name: "Reifenwechsel Herbst 2026", typ: "sms", zielgruppe: "Alle aktiven Kunden", status: "geplant", erstellt: "2026-07-01", geplantFuer: "2026-09-15", empfaenger: 6 },
  { id: "kam003", name: "Geburtstagsmail Juli", typ: "email", zielgruppe: "Geburtstag im Juli", status: "gesendet", erstellt: "2026-06-28", geplantFuer: "2026-07-01", empfaenger: 2, geoeffnet: 2, geklickt: 1 },
  { id: "kam004", name: "Wintercheck Angebot", typ: "email", zielgruppe: "Alle Kunden", status: "entwurf", erstellt: "2026-07-01", empfaenger: 0 },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getKundeById(id: string) { return mockKunden.find(k => k.id === id); }
export function getFahrzeugById(id: string) { return mockFahrzeuge.find(f => f.id === id); }
export function getFahrzeugeByKunde(kundeId: string) { return mockFahrzeuge.filter(f => f.kundeId === kundeId); }
export function getRechnungenByKunde(kundeId: string) { return mockRechnungen.filter(r => r.kundeId === kundeId); }
export function getTermineByKunde(kundeId: string) { return mockTermine.filter(t => t.kundeId === kundeId); }
export function getTermineByFahrzeug(fahrzeugId: string) { return mockTermine.filter(t => t.fahrzeugId === fahrzeugId); }
export function getErinnerungenByKunde(kundeId: string) { return mockErinnerungen.filter(e => e.kundeId === kundeId); }

export const statusColors: Record<string, string> = {
  // Termin
  angefragt: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  bestätigt: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  in_arbeit: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  fertig: "bg-green-500/15 text-green-400 border-green-500/20",
  storniert: "bg-red-500/15 text-red-400 border-red-500/20",
  // Bewerbung
  neu: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  kontaktiert: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  gespräch: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  probearbeit: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  angenommen: "bg-green-500/15 text-green-400 border-green-500/20",
  abgelehnt: "bg-red-500/15 text-red-400 border-red-500/20",
  // Rechnung
  offen: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  bezahlt: "bg-green-500/15 text-green-400 border-green-500/20",
  überfällig: "bg-red-500/15 text-red-400 border-red-500/20",
  // Kunde
  aktiv: "bg-green-500/15 text-green-400 border-green-500/20",
  inaktiv: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  gesperrt: "bg-red-500/15 text-red-400 border-red-500/20",
  // Kampagne
  entwurf: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  geplant: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  gesendet: "bg-green-500/15 text-green-400 border-green-500/20",
  // Erinnerung
  ausstehend: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  gesendet_e: "bg-green-500/15 text-green-400 border-green-500/20",
  ignoriert: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

export const statusLabels: Record<string, string> = {
  angefragt: "Angefragt", bestätigt: "Bestätigt", in_arbeit: "In Arbeit",
  fertig: "Fertig", storniert: "Storniert", neu: "Neu", kontaktiert: "Kontaktiert",
  gespräch: "Im Gespräch", probearbeit: "Probearbeit", angenommen: "Angenommen",
  abgelehnt: "Abgelehnt", offen: "Offen", bezahlt: "Bezahlt", überfällig: "Überfällig",
  aktiv: "Aktiv", inaktiv: "Inaktiv", gesperrt: "Gesperrt", entwurf: "Entwurf",
  geplant: "Geplant", gesendet: "Gesendet", ausstehend: "Ausstehend", ignoriert: "Ignoriert",
};
