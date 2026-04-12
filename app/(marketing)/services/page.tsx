import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Compass, Heart, Users } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Terapia en línea individual para transiciones de vida, ansiedad, estrés y relaciones. Grace P. Pacheco, Psicóloga Clínica. Primera sesión de exploración gratuita.",
  alternates: { canonical: `${SITE_URL}/services` },
  keywords: [
    "terapia en línea",
    "terapia emocional",
    "terapia de estrés",
    "terapia de pareja",
    "terapia de acompañamiento emocional",
    "terapia para ansiedad",
    "terapia individual online",
    "transiciones de vida",
    "acompañamiento emocional",
    "psicóloga clínica",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Terapia en línea individual",
  provider: { "@type": "Person", name: "Grace P. Pacheco" },
  description:
    "Terapia psicológica individual en línea para transiciones de vida y contexto, transiciones internas, transiciones emocionales y transiciones relacionales.",
  url: `${SITE_URL}/services`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Áreas de acompañamiento",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transiciones de vida y contexto",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transiciones internas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transiciones emocionales",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transiciones relacionales",
        },
      },
    ],
  },
};

const categories = [
  {
    icon: Globe,
    title: "Transiciones de vida y contexto",
    intro:
      "Los cambios en el entorno externo a veces nos afectan más de lo que esperamos. Mudanzas, cierres de etapa, cambios de roles — todo eso deja huella.",
    items: [
      "Cambios de país, ciudad o entorno",
      "Inicio o cierre de etapas (estudios, trabajo, jubilación)",
      "Cambios en la dinámica familiar",
      "Maternidad, paternidad o 'nido vacío'",
      "Pérdidas, duelos o separaciones",
      "Adaptación a nuevas responsabilidades",
    ],
  },
  {
    icon: Compass,
    title: "Transiciones internas",
    intro:
      "A veces el cambio no viene de afuera, sino de una inquietud interna. Una búsqueda, una pregunta, una sensación de que algo no encaja.",
    items: [
      "Búsqueda de sentido o propósito",
      "Cambios en tu identidad o cómo te ves a ti mismo/a",
      "Cuestionamiento de creencias o decisiones importantes",
      "Deseo de crecimiento personal",
      "Sensación de estar 'estancado/a'",
    ],
  },
  {
    icon: Heart,
    title: "Transiciones emocionales",
    intro:
      "Las emociones no siempre tienen explicación clara. A veces solo se sienten, y eso puede ser confuso o agotador.",
    items: [
      "Ansiedad, tristeza o cambios en tu estado de ánimo",
      "Dificultad para regular emociones",
      "Sensación de vacío o desconexión",
      "Estrés o sobrecarga emocional",
      "Necesidad de comprender lo que sientes",
    ],
  },
  {
    icon: Users,
    title: "Transiciones relacionales",
    intro:
      "Los vínculos cambian — parejas, familias, amistades. A veces necesitamos explorar qué está pasando en nuestras relaciones.",
    items: [
      "Dificultades en pareja o vínculos cercanos",
      "Cambios en amistades o redes de apoyo",
      "Conflictos familiares",
      "Patrones repetitivos en relaciones",
      "Necesidad de establecer límites",
    ],
  },
];

export default function ServicesPage() {
  return (
    <article className="py-16 md:py-24 px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <div className="mb-14">
          <h1 className="font-display text-3xl md:text-4xl mb-4">Servicios</h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
            Ofrezco terapia en línea individual. El trabajo terapéutico se
            adapta a lo que traes en cada etapa de tu proceso — no hay un guión
            predefinido.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <section
                key={cat.title}
                className="rounded-2xl border border-border bg-muted p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </span>
                  <h2 className="font-display text-xl md:text-2xl">{cat.title}</h2>
                </div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
                  {cat.intro}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {/* Other moments */}
        <section className="mb-14 rounded-2xl border border-border p-6 md:p-8">
          <h2 className="font-display text-xl md:text-2xl mb-4">
            Otros momentos en los que puedes buscar acompañamiento
          </h2>
          <ul className="space-y-3">
            {[
              "Cuando sientes que necesitas hablar con alguien que te escuche sin juicio",
              "Cuando quieres entenderte mejor",
              "Cuando estás listo/a para hacer cambios, pero no sabes por dónde empezar",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Closing quote + CTA */}
        <div className="text-center">
          <blockquote className="italic text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            &ldquo;No necesitas tener todo claro para comenzar. A veces, solo
            basta con sentir que algo quiere ser comprendido.&rdquo;
          </blockquote>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-8 py-3.5 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Agenda una consulta gratuita
          </Link>
        </div>
      </div>
    </article>
  );
}
