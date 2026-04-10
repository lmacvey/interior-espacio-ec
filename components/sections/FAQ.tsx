"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo son las sesiones en línea?",
    answer:
      "Las sesiones se realizan por videollamada, en una plataforma segura y confidencial. Solo necesitas una conexión estable a internet, un dispositivo con cámara y un espacio donde puedas hablar con privacidad.",
  },
  {
    question: "¿Cuánto duran las sesiones?",
    answer:
      "Cada sesión tiene una duración de 50 minutos. La frecuencia habitual es semanal, aunque puede ajustarse según tu proceso y disponibilidad.",
  },
  {
    question: "¿Necesito tener un diagnóstico para empezar?",
    answer:
      "No. No es necesario tener un diagnóstico previo. Muchas personas llegan simplemente porque sienten que algo está cambiando, que están en un momento difícil, o que quieren entenderse mejor.",
  },
  {
    question: "¿Con qué frecuencia nos vemos?",
    answer:
      "Lo más habitual es una sesión por semana, especialmente al inicio del proceso. Con el tiempo podemos ajustar la frecuencia según tus necesidades.",
  },
  {
    question: "¿Qué pasa si no sé bien qué me pasa?",
    answer:
      "Eso es completamente válido. No tienes que llegar con todo claro ni con palabras exactas. Parte del trabajo terapéutico es justamente explorar juntos lo que estás viviendo.",
  },
  {
    question: "¿Es confidencial?",
    answer:
      "Sí. Todo lo que hablamos en sesión es estrictamente confidencial. La confidencialidad es un principio ético fundamental de la práctica psicológica.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 px-4 md:px-6 bg-surface-1">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary mb-3">
            FAQ
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl mb-3"
            style={{ lineHeight: "var(--leading-heading)" }}
          >
            Preguntas frecuentes
          </h2>
          <p className="text-text-secondary text-base">
            Si tienes otras dudas, no dudes en escribirme.
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border-strong bg-background overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-text-primary hover:bg-primary-muted data-[state=open]:text-primary data-[state=open]:bg-primary-muted transition-colors duration-150 group">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="flex-shrink-0 w-4 h-4 text-text-muted group-data-[state=open]:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180"
                    strokeWidth={1.5}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <p className="px-5 pb-4 pt-1 text-sm text-text-secondary border-t border-border-subtle" style={{ lineHeight: "var(--leading-body)" }}>
                  {faq.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
