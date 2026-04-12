import Link from "next/link";
import Logo from "@/components/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SubstackSubscribeWidget } from "@/components/blog/SubstackSubscribeWidget";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1 mt-auto">
      {/* 1 col mobile → 3 col md */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="text-primary">
          <Logo size="md" className="mb-3" />
          <p className="text-text-muted leading-relaxed mt-3">
            Terapia en línea · Acompañamiento psicológico para transiciones y
            procesos de cambio.
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
            <li>
              <Link href="/privacy" className="hover:text-text-primary transition-colors duration-150 py-1 inline-block">
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3 text-text-primary">Contacto</p>
          <address className="not-italic text-text-muted space-y-2">
            <p>contacto@espaciointeriorec.com</p>
          </address>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
          >
            Agenda una sesión
          </Link>
          <SubstackSubscribeWidget variant="footer" />
        </div>
      </div>

      <div className="border-t border-border px-4 md:px-6 py-4 text-center text-xs text-text-muted pb-safe flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} Espacio Interior EC. Todos los derechos reservados.</span>
        <span className="hidden sm:inline">·</span>
        <Link href="/terminos" className="hover:text-text-primary transition-colors duration-150">
          Términos y condiciones
        </Link>
      </div>
    </footer>
  );
}
