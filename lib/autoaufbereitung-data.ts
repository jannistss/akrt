export const autoaufbereitungPackages = [
  { name: "Innenraum Basic", price: "59 €", description: "Für regelmäßig gepflegte Fahrzeuge mit normaler Verschmutzung.", includes: ["Innenraum vollständig aussaugen", "Sitze und Fußräume absaugen", "Fußmatten und Kofferraum reinigen", "Schwer erreichbare Stellen ausblasen", "Armaturenbrett, Mittelkonsole, Türverkleidungen und Ablagen", "Kunststoffoberflächen, Lenkrad und Bedienelemente", "Einstiegsbereiche, Displays, Scheiben und Spiegel innen", "Abschließende Detailkontrolle"] },
  { name: "Innenraum Intensiv", price: "79 €", description: "Alles aus Basic plus zusätzliche Detailarbeit bei normaler Verschmutzung.", includes: ["Detaillierte Reinigung von Fugen und Kanten", "Lüftungsdüsen, Schalter und Bedienelemente", "Sitzschienen sowie Bereiche unter und zwischen den Sitzen", "Intensivere Fußraum- und Einstiegsreinigung", "Behandlung leichter Flecken", "Schwer erreichbare Bereiche mit geeigneten Methoden", "Kunststoffpflege mit natürlichem, mattem Finish"] },
  { name: "Innenraum Premium", price: "99 €", description: "Beliebtes Paket für einen sauberen, natürlichen OEM-Look bei normaler Verschmutzung.", includes: ["Alles aus Innenraum Intensiv", "Materialgerechte Reinigung von Leder, Stoff oder Alcantara nach Bedarf", "Detailreinigung von Nähten, Sitzkanten, Kopfstützen und Armauflagen", "Pflege empfindlicher Oberflächen ohne speckigen Glanz"] },
] as const;

export const autoaufbereitungExtras = [
  "Waschanlagenfahrt außen 15 €", "Tierhaarentfernung leicht +15 €", "Tierhaarentfernung stark +30 €", "Extreme Tierhaarbelastung ab +50 €", "Starke Innenraumverschmutzung +20 €", "Extreme Innenraumverschmutzung ab +40 €", "Intensive Fleckenbehandlung ab +10 €", "Einzelner Sitz Intensivreinigung 15 €", "Komplette Leder-Sitzanlage Intensivreinigung 49 €", "Komplette Stoff-Sitzanlage Intensivreinigung 49 €", "Alcantara-Intensivreinigung ab 29 €", "Kofferraum Intensivreinigung +20 €", "Kindersitz-Reinigung 15 € / Stück",
] as const;

export const autoaufbereitungPricingNote = "Die Paketpreise gelten für Fahrzeuge mit üblicher Verschmutzung. Bei außergewöhnlich starker Verschmutzung, Tierhaaren, starken Flecken oder erheblichem zusätzlichem Arbeitsaufwand können Zuschläge entstehen. Zusätzliche Kosten werden immer vor Beginn der Aufbereitung abgestimmt. Für besonders große Fahrzeuge, 7-Sitzer und Transporter kann wegen des erhöhten Arbeitsaufwands ein Zuschlag anfallen; dieser wird vorher vereinbart.";

export const autoaufbereitungChatKnowledge = `AUTOAUFBEREITUNG / FAHRZEUGAUFBEREITUNG:
${autoaufbereitungPackages.map((p) => `- ${p.name}: ${p.price}. ${p.description} Enthalten: ${p.includes.join("; ")}`).join("\n")}
Zusatzleistungen: ${autoaufbereitungExtras.join("; ")}
Preisbedingungen: ${autoaufbereitungPricingNote}
Wichtig: Eine Außenreinigung ist nicht Bestandteil der Autoaufbereitung. Auf Wunsch wird das Fahrzeug optional für 15 € durch die Waschanlage gefahren. Außergewöhnliche Tiefenreinigung, massive Flecken und extreme Verschmutzungen sind nicht pauschal in den Paketpreisen enthalten.`;

export const autoaufbereitungFaqs = [
  { q: "Was kostet eine Innenraumreinigung?", a: "Innenraum Basic kostet 59 €, Intensiv 79 € und Premium 99 € bei normaler Verschmutzung. Außergewöhnlicher Zusatzaufwand wird vorher abgestimmt." },
  { q: "Gibt es eine Außenreinigung dazu?", a: "Eine Außenreinigung ist nicht Bestandteil der Autoaufbereitung. Auf Wunsch fahren wir das Fahrzeug optional für 15 € durch die Waschanlage." },
  { q: "Was kostet Tierhaarentfernung?", a: "Leichte Tierhaarentfernung kostet 15 €, starke 30 € und extreme Tierhaarbelastung ab 50 €. Der konkrete Aufwand wird vor Beginn abgestimmt." },
];

export function getAutoaufbereitungPackageText() {
  return autoaufbereitungPackages.map((p) => `${p.name} — ${p.price}`).join(", ");
}
