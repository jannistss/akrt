import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Inspektion & Wartung", href: "/inspektion" },
  { label: "TÜV & AU", href: "/tuev-au" },
  { label: "Reifenservice", href: "/reifenservice" },
  { label: "Glasservice", href: "/glasservice" },
  { label: "Klimaservice", href: "/klimaservice" },
  { label: "Unfallservice", href: "/unfall" },
  { label: "Flottenbetreuung", href: "/flottenbetreuung" },
  { label: "Terminbuchung", href: "/terminbuchung" },
];

export function AutoklinikFooter() {
  return (
    <footer style={{ backgroundColor: "#002e40" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              <Image
                src="/assets/images/6937e0b4dab32eb0ce0c7f70_relume-460083.png"
                alt="Autoklinik Reutlingen Logo"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Deine Meisterwerkstatt in Reutlingen.<br />
              Ehrlich. Schnell. Zuverlässig.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              Seiten
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              Kontakt
            </p>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <li>
                <a href="tel:+4907121155261990" className="transition-colors hover:text-white">
                  07121 15526199
                </a>
              </li>
              <li>
                <a href="https://wa.me/4917661973298" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  0176 61973298 (WhatsApp)
                </a>
              </li>
              <li>
                <a href="mailto:info@autoklinik-reutlingen.de" className="transition-colors hover:text-white">
                  info@autoklinik-reutlingen.de
                </a>
              </li>
              <li style={{ color: "rgba(255,255,255,0.35)" }}>
                Haldenhaustraße 3<br />
                72770 Reutlingen
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-7">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 Autoklinik Reutlingen GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/datenschutz" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
              Datenschutz
            </Link>
            <Link href="/impressum" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
