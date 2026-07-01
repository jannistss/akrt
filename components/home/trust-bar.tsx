const items = [
  { kicker: "Fair kalkuliert", label: "Faire Preise" },
  { kicker: "Ohne lange Wartezeit", label: "Schnelle Termine" },
  { kicker: "Präzise Fehlersuche", label: "Moderne Diagnosetechnik" },
  { kicker: "Vor Ort für dich da", label: "Direkt in Reutlingen" },
];

export function TrustBar() {
  return (
    <section className="font-sans" style={{ backgroundColor: "#e5f1f5" }}>
      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-xs font-medium" style={{ color: "#0074a2" }}>
                {item.kicker}
              </span>
              <strong className="text-sm font-bold" style={{ color: "#000608" }}>
                {item.label}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
