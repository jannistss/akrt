"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  type NavItem,
} from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";

const navItems: NavItem[] = [
  { name: "Startseite", link: "/" },
  {
    name: "Leistungen",
    link: "#leistungen",
    children: [
      { name: "Inspektion & Wartung", link: "/inspektion" },
      { name: "TÜV & AU", link: "/tuev-au" },
      { name: "Reifenservice", link: "/reifenservice" },
      { name: "Glasservice", link: "/glasservice" },
      { name: "Klimaservice", link: "/klimaservice" },
      { name: "Unfallservice", link: "/unfall" },
      { name: "Flottenbetreuung", link: "/flottenbetreuung" },
    ],
  },
  { name: "Flotte", link: "/flottenbetreuung" },
  { name: "Kfz-Gutachter", link: "/kfz-gutachter" },
  { name: "Karriere", link: "/karriere" },
  { name: "Kontakt", link: "#kontakt" },
];

export function AutoklinikNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileLeistungenOpen, setMobileLeistungenOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo
          src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png"
          alt="Autoklinik Reutlingen"
          href="/"
        />
        <NavItems items={navItems} />
        <NavbarButton href="/terminbuchung" variant="primary">
          Termin buchen
        </NavbarButton>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo
            src="/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png"
            alt="Autoklinik Reutlingen"
            href="/"
          />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Startseite */}
          <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)} delay={0}>
            Startseite
          </MobileNavLink>

          {/* Leistungen with nested items */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06, duration: 0.18 }}
          >
            <button
              onClick={() => setMobileLeistungenOpen(!mobileLeistungenOpen)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#0d1b2a] transition-colors hover:bg-[#1a6fcf]/6 hover:text-[#1a6fcf]"
            >
              <span>Leistungen</span>
              <motion.svg
                animate={{ rotate: mobileLeistungenOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="h-3.5 w-3.5 text-[#1a6fcf]"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {mobileLeistungenOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden pl-4"
                >
                  {navItems[1].children?.map((child, idx) => (
                    <motion.a
                      key={child.name}
                      href={child.link}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.16 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[#0d1b2a]/80 transition-colors hover:bg-[#1a6fcf]/6 hover:text-[#1a6fcf]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#1a6fcf]/50" />
                      {child.name}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Flotte */}
          <MobileNavLink href="/flottenbetreuung" onClick={() => setIsMobileMenuOpen(false)} delay={0.12}>
            Flotte
          </MobileNavLink>

          {/* Kfz-Gutachter */}
          <MobileNavLink href="/kfz-gutachter" onClick={() => setIsMobileMenuOpen(false)} delay={0.14}>
            Kfz-Gutachter
          </MobileNavLink>

          {/* Karriere */}
          <MobileNavLink href="/karriere" onClick={() => setIsMobileMenuOpen(false)} delay={0.16}>
            Karriere
          </MobileNavLink>

          {/* Kontakt */}
          <MobileNavLink href="#kontakt" onClick={() => setIsMobileMenuOpen(false)} delay={0.20}>
            Kontakt
          </MobileNavLink>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.18 }}
            className="pt-2 border-t border-[rgba(26,111,207,0.12)] mt-1"
          >
            <NavbarButton href="/terminbuchung" variant="primary" className="w-full justify-center">
              Termin buchen
            </NavbarButton>
          </motion.div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

// ─── Small helper for standard mobile links ────────────────────────────────

function MobileNavLink({
  href,
  onClick,
  delay,
  children,
}: {
  href: string;
  onClick: () => void;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.18 }}
      onClick={onClick}
      className={cn(
        "block rounded-xl px-4 py-3 text-sm font-medium text-[#0d1b2a]",
        "transition-colors hover:bg-[#1a6fcf]/6 hover:text-[#1a6fcf]"
      )}
    >
      {children}
    </motion.a>
  );
}
