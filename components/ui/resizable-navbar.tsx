"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Scroll-aware wrapper ──────────────────────────────────────────────────

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Navbar({ children, className }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.nav
      data-scrolled={scrolled}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-[padding] duration-300",
        scrolled && "pt-2",
        className
      )}
    >
      {children}
    </motion.nav>
  );
}

// ─── Desktop body ──────────────────────────────────────────────────────────

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function NavBody({ children, className }: NavBodyProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.div
      className={cn(
        "hidden md:flex items-center justify-between gap-2 w-full max-w-[1280px] rounded-2xl px-6 py-3 transition-all duration-300",
        "border border-[rgba(26,111,207,0.18)] bg-white",
        scrolled
          ? "shadow-[0_8px_32px_rgba(13,27,42,0.14)]"
          : "shadow-[0_4px_20px_rgba(13,27,42,0.08)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav items ─────────────────────────────────────────────────────────────

export interface NavItem {
  name: string;
  link: string;
  children?: { name: string; link: string }[];
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
}

export function NavItems({ items, className }: NavItemsProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn("flex items-center gap-1", className)}
    >
      {items.map((item) => {
        const isActive = openDropdown === item.name;

        if (item.children) {
          return (
            <div key={item.name} className="relative">
              <button
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setOpenDropdown(isActive ? null : item.name)}
                className={cn(
                  "relative flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  "text-[#0d1b2a] hover:text-[#1a6fcf] focus:outline-none"
                )}
              >
                {hovered === item.name && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-[#1a6fcf]/8"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
                <motion.svg
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="relative z-10 h-3.5 w-3.5 text-[#1a6fcf]"
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
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={cn(
                      "absolute left-0 top-full mt-2 w-52 rounded-2xl border border-[rgba(26,111,207,0.14)]",
                      "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(13,27,42,0.12)] overflow-hidden"
                    )}
                  >
                    {item.children.map((child, idx) => (
                      <motion.a
                        key={child.name}
                        href={child.link}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.16 }}
                        onClick={() => setOpenDropdown(null)}
                        className={cn(
                          "group flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#0d1b2a]",
                          "transition-colors hover:text-[#1a6fcf]",
                          "relative overflow-hidden"
                        )}
                      >
                        <motion.span
                          className="absolute inset-0 rounded-none bg-[#1a6fcf]/6"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        />
                        <span className="relative z-10 transition-transform duration-150 group-hover:translate-x-0.5">
                          {child.name}
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <a
            key={item.name}
            href={item.link}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative rounded-xl px-3 py-2 text-sm font-medium text-[#0d1b2a] transition-colors hover:text-[#1a6fcf]"
          >
            {hovered === item.name && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl bg-[#1a6fcf]/8"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </a>
        );
      })}
    </div>
  );
}

// ─── CTA button ────────────────────────────────────────────────────────────

interface NavbarButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function NavbarButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: NavbarButtonProps) {
  const base =
    "relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none";

  const variants = {
    primary: cn(
      base,
      "bg-[#0d1b2a] text-white border border-[#1a6fcf]/50",
      "hover:bg-[#1a2e45] hover:shadow-[0_0_16px_rgba(26,111,207,0.35)] hover:-translate-y-px hover:scale-[1.02]"
    ),
    secondary: cn(
      base,
      "bg-transparent text-[#0d1b2a] border border-[rgba(13,27,42,0.18)]",
      "hover:bg-[#0d1b2a]/6 hover:-translate-y-px"
    ),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(variants[variant], className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(variants[variant], className)}
    >
      {children}
    </motion.button>
  );
}

// ─── Logo ──────────────────────────────────────────────────────────────────

interface NavbarLogoProps {
  src: string;
  alt?: string;
  href?: string;
  className?: string;
}

export function NavbarLogo({ src, alt = "Logo", href = "/", className }: NavbarLogoProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn("flex items-center shrink-0", className)}
    >
      <img src={src} alt={alt} className="h-14 w-auto object-contain" />
    </motion.a>
  );
}

// ─── Mobile nav wrapper ────────────────────────────────────────────────────

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNav({ children, className }: MobileNavProps) {
  return (
    <div className={cn("flex md:hidden w-full flex-col", className)}>
      {children}
    </div>
  );
}

// ─── Mobile header row ─────────────────────────────────────────────────────

interface MobileNavHeaderProps {
  children: React.ReactNode;
}

export function MobileNavHeader({ children }: MobileNavHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full rounded-2xl border border-[rgba(26,111,207,0.18)] bg-white px-4 py-3 shadow-[0_4px_20px_rgba(13,27,42,0.08)]">
      {children}
    </div>
  );
}

// ─── Mobile hamburger/close toggle ────────────────────────────────────────

interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileNavToggle({ isOpen, onClick }: MobileNavToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(26,111,207,0.18)] bg-white/60 text-[#0d1b2a] transition-colors hover:bg-[#1a6fcf]/8"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.svg
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 4h12M2 8h12M2 12h12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── Mobile menu panel ─────────────────────────────────────────────────────

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileNavMenu({ isOpen, onClose, children }: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "mt-2 w-full rounded-2xl border border-[rgba(26,111,207,0.18)]",
            "bg-white/88 backdrop-blur-xl shadow-[0_12px_40px_rgba(13,27,42,0.14)]",
            "flex flex-col gap-1 p-3"
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
