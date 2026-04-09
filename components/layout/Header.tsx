"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { mobileMenu } from "@/lib/motion";
import { NavIcon, type NavIconKey } from "@/components/ui/NavIcons";

const navLinks: { label: string; href: string; icon: NavIconKey }[] = [
  { label: "Inicio",     href: "/",        icon: "inicio"    },
  { label: "Sobre mí",  href: "/about",    icon: "sobreMi"   },
  { label: "Servicios", href: "/services", icon: "servicios" },
  { label: "Blog",      href: "/blog",     icon: "blog"      },
  { label: "Contacto",  href: "/contact",  icon: "contacto"  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  // Extract the MotionValue at component level — hooks must not be called inside JSX
  const borderColor = useTransform(
    scrollY,
    [0, 60],
    ["rgba(226,217,207,0)", "rgba(226,217,207,1)"]
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md">
      <motion.div style={{ borderBottomColor: borderColor }} className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">

          <Link href="/" aria-label="Espacio Interior — Inicio" className="text-primary">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative py-2 transition-colors duration-150",
                    isActive
                      ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-text-secondary hover:text-foreground",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:scale-[0.98]"
            >
              Agenda una sesión
            </Link>
          </nav>

          {/* Mobile menu toggle — 44px tap target */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>

        </div>
      </motion.div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            key="mobile-menu"
            variants={mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden border-t border-border bg-background shadow-lg"
            aria-label="Navegación móvil"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "flex items-center gap-3 py-3 text-base border-b border-border-subtle last:border-0 transition-colors duration-150",
                      isActive ? "text-foreground font-medium" : "text-text-secondary hover:text-foreground",
                    ].join(" ")}
                  >
                    <NavIcon icon={link.icon} size="sm" aria-hidden />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:scale-[0.98]"
              >
                Agenda una sesión
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
