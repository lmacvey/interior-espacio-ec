"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "Encontré en este espacio algo que no esperaba: la posibilidad de hablar sin tener que explicarme demasiado. Me sentí escuchada de verdad.",
    author: "— Persona anónima",
    accentBorder: "border-l-primary",
    quoteMark: "text-primary-light",
  },
  {
    quote:
      "Estaba en un momento de mucha confusión y no sabía por dónde empezar. El proceso me ayudó a encontrar más claridad sobre lo que realmente quería.",
    author: "— Persona anónima",
    accentBorder: "border-l-secondary",
    quoteMark: "text-secondary-light",
  },
  {
    quote:
      "Por primera vez pude hablar de ciertas cosas sin sentir juicio. Eso marcó una diferencia enorme en mi proceso.",
    author: "— Persona anónima",
    accentBorder: "border-l-accent",
    quoteMark: "text-accent-light",
  },
];

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-4 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary mb-3">
            Experiencias
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl"
            style={{ lineHeight: "var(--leading-heading)" }}
          >
            Lo que dicen quienes han pasado por aquí
          </h2>
        </div>

        {/* 1 col mobile → 3 col md */}
        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              variants={fadeIn}
              className={`relative rounded-[--radius-xl] border border-border border-l-4 ${t.accentBorder} bg-surface-1 p-8 flex flex-col gap-4 overflow-hidden`}
            >
              {/* Decorative Playfair italic opening quote */}
              <span
                className={`absolute top-2 left-5 font-display italic text-7xl leading-none ${t.quoteMark} select-none pointer-events-none`}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p
                className="relative text-text-secondary italic text-sm md:text-base pt-6"
                style={{ lineHeight: "var(--leading-relaxed)" }}
              >
                {t.quote}
              </p>
              <footer className="text-xs font-medium text-text-muted">
                {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
