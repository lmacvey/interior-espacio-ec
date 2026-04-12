import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import WhatsAppContactOption from "@/components/ui/WhatsAppContactOption";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda tu sesión de exploración gratuita de 15 minutos con Grace P. Pacheco, Psicóloga Clínica. Sesiones en línea en español e inglés. Sin compromiso.",
  alternates: { canonical: `${SITE_URL}/contact` },
  keywords: [
    "sesión de exploración gratuita",
    "contacto psicóloga online",
    "agendar terapia",
    "consulta psicológica online",
    "empezar terapia",
    "terapia en línea Ecuador",
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto — ${SITE_NAME}`,
  description: "Agenda tu sesión de exploración gratuita de 15 minutos.",
  url: `${SITE_URL}/contact`,
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-2xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <h1 className="font-display text-3xl md:text-4xl mb-3">Hablemos</h1>
      <p className="text-muted-foreground mb-10 text-base leading-relaxed">
        Puedes escribirme con cualquier consulta o para agendar una sesión
        gratuita de exploración. Te respondo en un día hábil.
      </p>
      <WhatsAppContactOption />

      <div className="flex items-center gap-4 my-8" role="separator">
        <span className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground tracking-widest uppercase">o</span>
        <span className="flex-1 border-t border-border" />
      </div>

      <ContactForm />

    </section>
  );
}
