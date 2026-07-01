const items = [
  { number: "2.000+", label: "Zufriedene Kunden" },
  { number: "48 Std.", label: "TÜV-Termin garantiert" },
  { number: "15+", label: "Jahre Erfahrung" },
  { number: "Alle", label: "Marken & Modelle" },
];

export function TrustBar() {
  return (
    <section style={{ backgroundColor: "#001824" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col gap-1.5 py-10 pr-8"
              style={{
                borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                paddingLeft: i === 0 ? 0 : "2rem",
              }}
            >
              <span className="text-3xl font-bold tracking-tight" style={{ color: "#ffffff" }}>
                {item.number}
              </span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
