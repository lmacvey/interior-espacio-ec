import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce a [Nombre de Terapeuta], psicóloga especializada en acompañamiento de transiciones de vida y procesos de cambio en línea.",
};

export default function AboutPage() {
  return (
    <article className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero — photo + intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-20">
          {/* Photo placeholder */}
          <div className="rounded-2xl bg-border aspect-[4/3] flex items-center justify-center text-muted-foreground text-xs select-none">
            Foto de [Nombre de Terapeuta]
          </div>

          <div className="pt-2">
            <h1 className="font-display text-3xl md:text-4xl mb-5">
              Hola, soy [Nombre de Terapeuta]
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Soy psicóloga y me especializo en el acompañamiento de personas
              que atraviesan transiciones: esos momentos en que algo cambia y
              todavía no sabes muy bien cómo seguir.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trabajo en línea, lo que me permite acompañar a personas en
              distintos países y contextos. Creo que la distancia geográfica no
              tiene que ser un obstáculo para acceder a un espacio terapéutico.
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
          <h2 className="font-display text-2xl md:text-3xl mb-5">Mi enfoque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Sin juicio",
                body: "Creo en la capacidad de cada persona para comprenderse y tomar sus propias decisiones. Mi rol es acompañar, no evaluar ni corregir.",
              },
              {
                title: "A tu ritmo",
                body: "No hay urgencia ni agenda predefinida. El proceso avanza según lo que tú necesitas y lo que emerge en cada sesión.",
              },
              {
                title: "100% en línea",
                body: "Las sesiones son por videollamada. Puedes conectarte desde donde estés, con la comodidad y privacidad de tu propio espacio.",
              },
              {
                title: "Proceso individual",
                body: "Cada persona es única. No aplico protocolos fijos — adapto el acompañamiento a tu historia, tu contexto y lo que trae cada sesión.",
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
              Licenciatura en Psicología — [Universidad], [País], [Año]
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              [Formación o especialización adicional]
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              [Otra formación relevante]
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-muted border border-border p-8 text-center">
          <p className="font-display text-xl md:text-2xl mb-3">
            ¿Quieres conocernos?
          </p>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm leading-relaxed">
            Agenda una sesión gratuita de exploración de 15 minutos, sin
            compromiso.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Agenda tu consulta gratuita
          </Link>
        </div>
      </div>
    </article>
  );
}
