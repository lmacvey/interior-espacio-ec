"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainerSlow } from "@/lib/motion";

const steps = [
  {
    number: "01",
    title: "Escríbeme",
    description:
      "Llena el formulario de contacto o envíame un mensaje. Cuéntame un poco de lo que estás viviendo.",
  },
  {
    number: "02",
    title: "Sesión de exploración gratuita",
    description:
      "Nos conectamos 15 minutos para conocernos, resolver dudas y ver si hay sintonía. Sin compromiso.",
  },
  {
    number: "03",
    title: "Comenzamos",
    description:
      "Si decidimos trabajar juntos, agendamos las sesiones regulares en línea a tu propio ritmo.",
  },
];

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-4 md:px-6 bg-surface-1">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted mb-3">
            El proceso
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl mb-3"
            style={{ lineHeight: "var(--leading-heading)" }}
          >
            ¿Cómo funciona?
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-md mx-auto" style={{ lineHeight: "var(--leading-body)" }}>
            Dar el primer paso es lo más difícil. El proceso es sencillo.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={staggerContainerSlow}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={fadeUp} className="relative">
              {/* Connector line between steps on desktop */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-7 left-[calc(100%_-_12px)] w-full h-px bg-border z-0"
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10 flex items-start gap-4 md:flex-col md:gap-4">
                {/* Step circle — using named tokens, no opacity modifiers */}
                <span className="flex-shrink-0 w-14 h-14 rounded-full bg-background border-2 border-primary-light flex items-center justify-center font-display text-lg font-semibold text-primary">
                  {step.number}
                </span>

                <div className="pt-1 md:pt-0">
                  <h3 className="font-semibold text-base mb-1.5 text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm" style={{ lineHeight: "var(--leading-body)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
