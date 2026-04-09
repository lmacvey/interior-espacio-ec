"use client";

import { Globe, Compass, Heart, Users } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const services = [
  {
    icon: Globe,
    title: "Transiciones de vida y contexto",
    items: [
      "Cambios de país, ciudad o entorno",
      "Inicio o cierre de etapas vitales",
      "Maternidad, paternidad o nido vacío",
      "Pérdidas, duelos y separaciones",
    ],
  },
  {
    icon: Compass,
    title: "Transiciones internas",
    items: [
      "Búsqueda de sentido o propósito",
      "Cambios en la identidad",
      "Cuestionamiento de creencias",
      "Sensación de estar estancado/a",
    ],
  },
  {
    icon: Heart,
    title: "Transiciones emocionales",
    items: [
      "Ansiedad, tristeza o cambios de ánimo",
      "Dificultad para regular emociones",
      "Sensación de vacío o desconexión",
      "Estrés o sobrecarga emocional",
    ],
  },
  {
    icon: Users,
    title: "Transiciones relacionales",
    items: [
      "Dificultades en pareja o familia",
      "Cambios en redes de apoyo",
      "Patrones repetitivos en relaciones",
      "Necesidad de establecer límites",
    ],
  },
];

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        {/* Overline */}
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted mb-3">
          Áreas de acompañamiento
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3">
          ¿En qué puedo acompañarte?
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto">
          Cada proceso es único. Estos son algunos de los momentos en que puede
          ser útil contar con un espacio terapéutico.
        </p>
      </div>

      {/* Cards grid: 1 col mobile → 2 col sm → 4 col lg */}
      <motion.div
        variants={staggerContainer}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="rounded-[--radius-xl] border border-border bg-background p-6 flex flex-col gap-4 hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
            >
              <div className="flex items-center gap-3">
                {/* Square icon container — radius-md per spec */}
                <span className="flex-shrink-0 w-10 h-10 rounded-[--radius-md] bg-primary-light flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </span>
                <h3 className="font-semibold text-sm leading-snug text-text-primary">
                  {service.title}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Closing invitation quote */}
      <blockquote className="mt-12 text-center font-display italic text-text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        &ldquo;No necesitas tener todo claro para comenzar. A veces, solo basta
        con sentir que algo quiere ser comprendido.&rdquo;
      </blockquote>

      <div className="mt-8 text-center">
        <Link
          href="/services"
          className="text-sm text-primary font-medium underline underline-offset-4 hover:text-primary-hover transition-colors duration-150"
        >
          Ver todos los servicios →
        </Link>
      </div>
    </section>
  );
}
