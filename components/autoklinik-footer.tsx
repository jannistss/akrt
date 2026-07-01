import Link from "next/link";
import Image from "next/image";

export function AutoklinikFooter() {
  return (
    <footer
      style={{ backgroundColor: "#002e40", color: "#ffffff" }}
      className="font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-10">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/assets/images/6937e0b4dab32eb0ce0c7f70_relume-460083.png"
                alt="Logo mit stilisierter Autokontur über dem Wort AUTOKLINIK und REUTLINGEN darunter in Blau."
                width={160}
                height={44}
                className="h-11 w-auto"
              />
            </Link>
          </div>

          {/* Bottom bar */}
          <div
            className="border-t pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              © 2026 Autoklinik Reutlingen. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-5">
              <Link
                href="/datenschutz"
                className="text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Datenschutz
              </Link>
              <Link
                href="/impressum"
                className="text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
