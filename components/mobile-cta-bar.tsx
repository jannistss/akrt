import Link from "next/link";
import { SITE } from "@/lib/site-config";

/**
 * Fixed, mobile-only action bar (Anrufen / WhatsApp / Termin buchen).
 * Hidden on sm+ where the navbar and hero CTAs already cover this need.
 * The root layout reserves matching bottom padding so this never causes
 * layout shift or covers page content.
 */
export function MobileCtaBar() {
  return (
    <nav
      aria-label="Schnellkontakt"
      className="sm:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-3"
      style={{
        backgroundColor: "#002e40",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <a
        href={SITE.phone.href}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold active:bg-white/5"
        style={{ color: "rgba(255,255,255,0.85)" }}
        aria-label={`Autoklinik Reutlingen anrufen: ${SITE.phone.display}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Anrufen
      </a>
      <a
        href={SITE.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold active:bg-white/5"
        style={{ color: "#25d366", borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
        aria-label="Per WhatsApp schreiben"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 18.43a9.93 9.93 0 01-5.06-1.38l-.36-.21-3.74.98.99-3.64-.24-.38A9.96 9.96 0 012.07 12C2.07 6.48 6.48 2.07 12 2.07c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.41 9.91-9.93 9.91zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" />
        </svg>
        WhatsApp
      </a>
      <Link
        href="/terminbuchung"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold active:brightness-110"
        style={{ backgroundColor: "#0074a2", color: "#ffffff" }}
        aria-label="Termin online buchen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 3v3M16 3v3M4 9.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Termin
      </Link>
    </nav>
  );
}
