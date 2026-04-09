"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { slideInLeft, fadeUp, transitions } from "@/lib/motion";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Photo — top on mobile, left on desktop */}
        <motion.div
          variants={slideInLeft}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-2xl bg-border aspect-[4/3] flex items-center justify-center"
        >
          <span className="text-xs text-text-muted select-none">
            Foto de [Nombre de Terapeuta]
          </span>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...transitions.gentle, delay: 0.15 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-3">
            Sobre mí
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl mb-5"
            style={{ lineHeight: "var(--leading-heading)" }}
          >
            Un acompañamiento <span className="text-primary">desde adentro.</span>
          </h2>
          <p className="text-text-secondary mb-4" style={{ lineHeight: "var(--leading-body)" }}>
            Soy [Nombre de Terapeuta], psicóloga especializada en el
            acompañamiento de transiciones y procesos de cambio. Creo que los
            momentos de quiebre también son oportunidades de reencuentro con
            uno mismo.
          </p>
          <p className="text-text-secondary mb-4" style={{ lineHeight: "var(--leading-body)" }}>
            Trabajo en línea, lo que te permite acceder al proceso terapéutico
            desde cualquier lugar — sin barreras geográficas y con la
            flexibilidad que tu vida requiere.
          </p>
          <p className="text-text-secondary mb-8" style={{ lineHeight: "var(--leading-body)" }}>
            Mi enfoque es no directivo, sin juicio y centrado en ti. No vengo
            a darte respuestas, sino a acompañarte mientras las encuentras.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary-muted"
          >
            Conóceme mejor →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
