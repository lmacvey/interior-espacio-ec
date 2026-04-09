import Link from "next/link";
import Logo from "@/components/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1 mt-auto">
      {/* 1 col mobile → 3 col md */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="text-primary">
          <Logo size="md" className="mb-3" />
          <p className="text-text-muted leading-relaxed mt-3">
            Acompañamiento psicológico en línea para transiciones y procesos
            de cambio.
          </p>
          <SocialLinks />
        </div>

        <div>
          <p className="font-semibold mb-3 text-text-primary">Navegar</p>
          <ul className="space-y-2 text-text-muted">
            <li>
              <Link href="/about" className="hover:text-text-primary transition-colors duration-150 py-1 inline-block">
                Sobre mí
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-text-primary transition-colors duration-150 py-1 inline-block">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-text-primary transition-colors duration-150 py-1 inline-block">
                Recursos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-text-primary transition-colors duration-150 py-1 inline-block">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3 text-text-primary">Contacto</p>
          <address className="not-italic text-text-muted space-y-2">
            <p>contacto@interiorespacio.com</p>
          </address>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
          >
            Agenda una sesión
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-4 md:px-6 py-4 text-center text-xs text-text-muted pb-safe">
        © {new Date().getFullYear()} Espacio Interior. Todos los derechos reservados.
      </div>
    </footer>
  );
}
