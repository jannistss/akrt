export const autoaufbereitungPackages = [
  { name: "Innenraum Basic", price: "59 €", description: "Für regelmäßig gepflegte Fahrzeuge mit normaler Verschmutzung.", includes: ["Innenraum vollständig aussaugen", "Sitze und Fußräume absaugen", "Fußmatten und Kofferraum reinigen", "Schwer erreichbare Stellen ausblasen", "Armaturenbrett, Mittelkonsole, Türverkleidungen und Ablagen", "Kunststoffoberflächen, Lenkrad und Bedienelemente", "Einstiegsbereiche, Displays, Scheiben und Spiegel innen", "Abschließende Detailkontrolle"] },
  { name: "Innenraum Intensiv", price: "79 €", description: "Alles aus Basic plus zusätzliche Detailarbeit bei normaler Verschmutzung.", includes: ["Detaillierte Reinigung von Fugen und Kanten", "Lüftungsdüsen, Schalter und Bedienelemente", "Sitzschienen sowie Bereiche unter und zwischen den Sitzen", "Intensivere Fußraum- und Einstiegsreinigung", "Behandlung leichter Flecken", "Schwer erreichbare Bereiche mit geeigneten Methoden", "Kunststoffpflege mit natürlichem, mattem Finish"] },
  { name: "Innenraum Premium", price: "99 €", description: "Beliebtes Paket für einen sauberen, natürlichen OEM-Look bei normaler Verschmutzung.", includes: ["Alles aus Innenraum Intensiv", "Materialgerechte Reinigung von Leder, Stoff oder Alcantara nach Bedarf", "Detailreinigung von Nähten, Sitzkanten, Kopfstützen und Armauflagen", "Pflege empfindlicher Oberflächen ohne speckigen Glanz"] },
  { name: "Außen Basic", price: "25 €", description: "Für leicht bis normal verschmutzte Fahrzeuge.", includes: ["Schonende Lackreinigung", "Außenscheiben und Spiegel", "Scheinwerfer und Rückleuchten", "Leichte Insektenverschmutzungen und Ablagerungen", "Finishkontrolle"] },
  { name: "Außen Premium", price: "39 €", description: "Gründlichere Außenreinigung mit Felgen-, Reifen- und Frontpartie-Fokus.", includes: ["Alles aus Außen Basic", "Gründlichere Felgenreinigung", "Zugängliche Bereiche zwischen Speichen und Felgenbett", "Reifenflanken", "Intensivere Insektenentfernung", "Frontpartie, Spiegelgehäuse und äußere Schweller", "Abschließendes Lackfinish"] },
  { name: "Außen Versiegelung", price: "49 €", description: "Empfohlenes Außenpaket mit transparenter Ceramic-Sprühversiegelung.", includes: ["Alles aus Außen Premium", "Vorbereitung für die Versiegelung", "Ceramic-Sprühversiegelung", "Finish und hydrophober Abperleffekt", "Verbesserter Glanz und erleichterte spätere Fahrzeugpflege"] },
  { name: "Komplettaufbereitung", price: "139 €", description: "Innenraum Premium plus Außen Versiegelung – 148 € einzeln, als Paket 139 €.", includes: ["Innenraum Premium", "Außen Versiegelung inklusive Ceramic-Sprühversiegelung", "9 € Paketvorteil gegenüber den Einzelpreisen"] },
] as const;

export const autoaufbereitungExtras = [
  "Tierhaarentfernung leicht +15 €", "Tierhaarentfernung stark +30 €", "Extreme Tierhaarbelastung ab +50 €", "Starke Innenraumverschmutzung +20 €", "Extreme Innenraumverschmutzung ab +40 €", "Intensive Fleckenbehandlung ab +10 €", "Einzelner Sitz Intensivreinigung 15 €", "Komplette Leder-Sitzanlage Intensivreinigung 49 €", "Komplette Stoff-Sitzanlage Intensivreinigung 49 €", "Alcantara-Intensivreinigung ab 29 €", "Kofferraum Intensivreinigung +20 €", "Kindersitz-Reinigung 15 € / Stück", "Intensive Insektenentfernung +10 €", "Felgen-Intensivreinigung +20 €", "Ceramic-Sprühversiegelung einzeln 29 €",
] as const;

export const autoaufbereitungPricingNote = "Die Paketpreise gelten für Fahrzeuge mit üblicher Verschmutzung. Bei außergewöhnlich starker Verschmutzung, Tierhaaren, starken Flecken oder erheblichem zusätzlichem Arbeitsaufwand können Zuschläge entstehen. Zusätzliche Kosten werden immer vor Beginn der Aufbereitung abgestimmt. Für besonders große Fahrzeuge, 7-Sitzer und Transporter kann wegen des erhöhten Arbeitsaufwands ein Zuschlag anfallen; dieser wird vorher vereinbart.";

export const autoaufbereitungChatKnowledge = `AUTOAUFBEREITUNG / FAHRZEUGAUFBEREITUNG:
${autoaufbereitungPackages.map((p) => `- ${p.name}: ${p.price}. ${p.description} Enthalten: ${p.includes.join("; ")}`).join("\n")}
Zusatzleistungen: ${autoaufbereitungExtras.join("; ")}
Preisbedingungen: ${autoaufbereitungPricingNote}
Wichtig: Die 49 € bei Außen Versiegelung sind eine Ceramic-Sprühversiegelung, keine professionelle mehrjährige Keramikbeschichtung. Außergewöhnliche Tiefenreinigung, massive Flecken und extreme Verschmutzungen sind nicht pauschal in den Paketpreisen enthalten.`;

export const autoaufbereitungFaqs = [
  { q: "Was kostet eine Innenraumreinigung?", a: "Innenraum Basic kostet 59 €, Intensiv 79 € und Premium 99 € bei normaler Verschmutzung. Außergewöhnlicher Zusatzaufwand wird vorher abgestimmt." },
  { q: "Was kostet eine komplette Autoaufbereitung?", a: "Die Komplettaufbereitung aus Innenraum Premium und Außen Versiegelung kostet 139 € statt 148 € bei Einzelbuchung." },
  { q: "Ist die Außen Versiegelung eine mehrjährige Keramikbeschichtung?", a: "Nein. Es handelt sich transparent um eine Ceramic-Sprühversiegelung mit Abperleffekt, nicht um eine professionelle mehrjährige Keramikbeschichtung." },
  { q: "Was kostet Tierhaarentfernung?", a: "Leichte Tierhaarentfernung kostet 15 €, starke 30 € und extreme Tierhaarbelastung ab 50 €. Der konkrete Aufwand wird vor Beginn abgestimmt." },
];

export function getAutoaufbereitungPackageText() {
  return autoaufbereitungPackages.map((p) => `${p.name} — ${p.price}`).join(", ");
}
