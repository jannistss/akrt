const items = [
  { number: "5 ★", label: "Google Bewertung" },
  { number: "48 Std.", label: "TÜV-Termin garantiert" },
  { number: "Fairer", label: "Festpreis, kein Surprise" },
  { number: "Alle", label: "Marken & Modelle" },
];

export function TrustBar() {
  return (
    <section style={{ backgroundColor: "#eef6fa", borderBottom: "1px solid #d5e8f0" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col gap-1.5 py-8 pr-8"
              style={{
                borderRight: i < items.length - 1 ? "1px solid #d5e8f0" : undefined,
                paddingLeft: i === 0 ? 0 : "2rem",
              }}
            >
              <span className="text-2xl font-bold tracking-tight" style={{ color: "#002e40" }}>
                {item.number}
              </span>
              <span className="text-sm" style={{ color: "#4a6272" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
