import Link from "next/link";

export type BreadcrumbLink = { name: string; url: string };

/**
 * Small, visible breadcrumb trail rendered under the navbar on Leistungsseiten,
 * Blog-Detail und Karriere-Unterseiten. Purely visual — the machine-readable
 * BreadcrumbList JSON-LD is rendered separately via <BreadcrumbSchema /> in the
 * route's layout.tsx (single source of truth, no duplication).
 *
 * `variant="dark"` is for hero sections with a dark background; `variant="light"`
 * is for light backgrounds.
 */
export function Breadcrumbs({
  items,
  variant = "dark",
  className = "",
}: {
  items: BreadcrumbLink[];
  variant?: "dark" | "light";
  className?: string;
}) {
  const isDark = variant === "dark";
  const linkColor = isDark ? "rgba(255,255,255,0.55)" : "#64849a";
  const currentColor = isDark ? "rgba(255,255,255,0.85)" : "#0d1b2a";
  const sepColor = isDark ? "rgba(255,255,255,0.3)" : "#b8c8d2";

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center gap-1.5 flex-wrap text-xs font-medium">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" style={{ color: sepColor }}>
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" style={{ color: currentColor }}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="transition-opacity hover:opacity-70 hover:underline"
                  style={{ color: linkColor }}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
