import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Terapia en Línea`,
  description:
    "Terapia en línea individual en español e inglés. Grace P. Pacheco, Psicóloga Clínica (USFQ), acompaña transiciones de vida, ansiedad, duelos y procesos de cambio. Sesión de exploración gratuita.",
  alternates: { canonical: SITE_URL },
  keywords: [
    "terapia en línea",
    "psicóloga clínica",
    "psicología online Ecuador",
    "transiciones de vida",
    "salud mental",
    "acompañamiento emocional",
    "terapia en español",
    "Grace P. Pacheco",
    "psicóloga online Ecuador",
    "psicólogo online Quito",
    "terapia para ansiedad",
    "terapia individual online",
    "terapia para expatriados",
    "consulta psicológica online",
    "ayuda psicológica online",
    "quiero terapia",
    "necesito terapia",
    "empezar terapia",
    "terapia de acompañamiento emocional",
    "terapia emocional",
    "terapia de estrés",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Grace P. Pacheco",
  jobTitle: "Psicóloga Clínica",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad San Francisco de Quito (USFQ)",
  },
  knowsLanguage: ["es", "en"],
  url: SITE_URL,
  sameAs: [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "ProfessionalService"],
  name: SITE_NAME,
  medicalSpecialty: "Psychiatry",
  description:
    "Acompañamiento psicológico en línea para transiciones de vida, momentos de cambio y procesos internos. Un espacio seguro para volver a ti.",
  provider: { "@type": "Person", name: "Grace P. Pacheco" },
  areaServed: [
    { "@type": "Country", name: "Ecuador" },
    { "@type": "Place", name: "Latinoamérica y comunidad hispanohablante internacional" },
  ],
  availableLanguage: ["Spanish", "English"],
  url: SITE_URL,
  priceSpecification: {
    "@type": "PriceSpecification",
    description: "Sesión de exploración gratuita de 15 minutos",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo son las sesiones en línea?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Las sesiones se realizan por videollamada, en una plataforma segura y confidencial. Solo necesitas una conexión estable a internet, un dispositivo con cámara y un espacio donde puedas hablar con privacidad.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto duran las sesiones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cada sesión tiene una duración de 50 minutos. La frecuencia habitual es semanal, aunque puede ajustarse según tu proceso y disponibilidad.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito tener un diagnóstico para empezar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. No es necesario tener un diagnóstico previo. Muchas personas llegan simplemente porque sienten que algo está cambiando, que están en un momento difícil, o que quieren entenderse mejor.",
      },
    },
    {
      "@type": "Question",
      name: "¿Con qué frecuencia nos vemos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lo más habitual es una sesión por semana, especialmente al inicio del proceso. Con el tiempo podemos ajustar la frecuencia según tus necesidades.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si no sé bien qué me pasa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eso es completamente válido. No tienes que llegar con todo claro ni con palabras exactas. Parte del trabajo terapéutico es justamente explorar juntos lo que estás viviendo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es confidencial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Todo lo que hablamos en sesión es estrictamente confidencial. La confidencialidad es un principio ético fundamental de la práctica psicológica.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ofreces terapia de pareja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En este momento me especializo en terapia individual. Si estás viviendo dificultades en una relación, podemos trabajar desde tu propia experiencia y perspectiva en el proceso individual.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo sé si estoy lista para empezar terapia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No necesitas estar en crisis para comenzar. Si sientes que algo quiere ser comprendido, o que estás atravesando una transición difícil, eso es suficiente. La sesión de exploración gratuita es justamente para que puedas evaluar si este espacio es para ti.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Services />
      <Process />
      <About />
      <FAQ />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
