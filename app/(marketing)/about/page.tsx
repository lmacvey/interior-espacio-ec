import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Grace P. Pacheco — Psicóloga Clínica | ${SITE_NAME}`,
  description:
    "Conoce a Grace P. Pacheco, Psicóloga Clínica (USFQ), especializada en acompañamiento de transiciones de vida y procesos de cambio. Sesiones online en español e inglés.",
  alternates: { canonical: `${SITE_URL}/about` },
  keywords: [
    "psicóloga clínica",
    "psicóloga online Ecuador",
    "Grace P. Pacheco",
    "terapia en línea",
    "psicología USFQ",
    "acompañamiento emocional",
    "terapia individual",
    "psicóloga bilingüe",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Grace P. Pacheco",
  jobTitle: "Psicóloga Clínica",
  description:
    "Psicóloga clínica con enfoque integrativo especializada en acompañamiento de transiciones de vida y procesos de cambio. Sesiones en línea en español e inglés.",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Universidad San Francisco de Quito (USFQ)",
      address: { "@type": "PostalAddress", addressCountry: "EC" },
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Fielding Graduate University",
      address: { "@type": "PostalAddress", addressCountry: "US" },
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Master of Arts in Media Psychology",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Fielding Graduate University" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Human Resources Essentials",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Cornell University" },
    },
  ],
  knowsLanguage: ["es", "en"],
  url: `${SITE_URL}/about`,
};

export default function AboutPage() {
  return (
    <article className="py-16 md:py-24 px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="max-w-4xl mx-auto">

        {/* Hero — photo + intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-20">
          {/* Photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <Image
              src="/grace-pacheco.jpg"
              alt="Grace P. Pacheco — Psicóloga Clínica"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center 15%" }}
            />
          </div>

          <div className="pt-2">
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              Hola, soy Grace
            </h1>
            <p className="text-sm text-muted-foreground font-medium mb-5">
              Grace P. Pacheco · Psicóloga Clínica (USFQ) · Español &amp; Inglés
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Soy psicóloga clínica graduada de la Universidad San Francisco de
              Quito (USFQ) y me especializo en el acompañamiento de personas
              que atraviesan transiciones: esos momentos en que algo cambia y
              todavía no sabes muy bien cómo seguir.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trabajo en línea, en español e inglés, lo que me permite
              acompañar a personas en distintos países y contextos. Creo que la
              distancia geográfica no tiene que ser un obstáculo para acceder a
              un espacio terapéutico.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Mi enfoque es no directivo, humanista y centrado en ti. No vengo
              a darte respuestas ni a decirte qué hacer — vengo a acompañarte
              mientras tú las vas encontrando.
            </p>
          </div>
        </div>

        {/* Approach */}
        <section className="mb-14">
          <h2 className="font-display text-2xl md:text-3xl mb-3">Mi enfoque</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            Trabajo desde una perspectiva <strong className="text-foreground font-medium">integrativa</strong> —
            lo que significa que no me limito a una sola escuela de pensamiento.
            En lugar de aplicar un protocolo fijo, elijo herramientas y formas de
            acompañarte según lo que tú necesitas, lo que el momento pide, y lo
            que ha demostrado ser genuinamente útil. Esto me permite estar presente
            contigo, no con un manual.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Un marco sólido, no una caja rígida",
                body: "Tengo una base teórica clara — humanista, no directiva — pero estoy abierta a incorporar elementos de otras perspectivas cuando son útiles para ti. No te ajusto a mi enfoque; adapto el enfoque a ti.",
              },
              {
                title: "Lo que funciona, no lo que está de moda",
                body: "Tomo elementos de distintas corrientes según lo que la evidencia y la práctica muestran que ayuda. No me caso con una técnica si hay otra que se ajusta mejor a tu proceso.",
              },
              {
                title: "Sin juicio, a tu ritmo",
                body: "Creo en tu capacidad para comprenderte y tomar tus propias decisiones. No hay urgencia ni agenda predefinida. El proceso avanza según lo que emerge en cada sesión.",
              },
              {
                title: "Lo que nos hace humanos",
                body: "Más allá de las diferencias entre enfoques, hay algo que todos comparten: la importancia del vínculo, la escucha real y el espacio seguro. Eso es lo que cuido en cada sesión.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-muted p-5"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Formation — placeholder */}
        <section className="mb-14">
          <h2 className="font-display text-2xl md:text-3xl mb-4">Formación</h2>
          <ul className="space-y-3 text-muted-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Psicóloga Clínica — Universidad San Francisco de Quito (USFQ), Ecuador
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Master of Arts in Media Psychology — Fielding Graduate University, USA
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Human Resources Essentials (Certification) — Cornell University, USA
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-muted border border-border p-8 text-center">
          <p className="font-display text-xl md:text-2xl mb-3">
            ¿Quieres conocerme?
          </p>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm leading-relaxed">
            Agenda una sesión gratuita de exploración de 15 minutos, sin
            compromiso.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground font-medium transition-colors duration-200 hover:bg-primary-hover active:scale-[0.98]"
          >
            Agenda tu consulta gratuita
          </Link>
        </div>
      </div>
    </article>
  );
}
