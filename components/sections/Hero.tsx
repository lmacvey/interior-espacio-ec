"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeIn, transitions } from "@/lib/motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-surface-1 py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Left col — text */}
        <div className="order-1">
          {/* Pill tag */}
          <motion.span
            variants={fadeIn}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="inline-block rounded-full border border-primary-light bg-primary-muted px-4 py-1.5 text-xs font-medium text-primary tracking-wide mb-6"
          >
            Terapia 100% en línea
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            transition={{ ...transitions.gentle, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-5"
            style={{ lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }}
          >
            Un espacio para{" "}
            <span className="text-primary">volver a ti.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            transition={{ ...transitions.gentle, delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary mb-8 max-w-md"
            style={{ lineHeight: "var(--leading-relaxed)" }}
          >
            Acompaño procesos de cambio, transiciones de vida y momentos en
            que algo quiere ser comprendido. Desde donde estés.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            transition={{ ...transitions.gentle, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/contact"
              className="rounded-full bg-primary px-7 py-3.5 text-center text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:scale-[0.98]"
            >
              Agenda una consulta gratuita
            </Link>
            <Link
              href="/services"
              className="rounded-full border-[1.5px] border-border px-7 py-3.5 text-center text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-2 hover:border-border-strong"
            >
              Conoce los servicios →
            </Link>
          </motion.div>
        </div>

        {/* Right col — photo placeholder */}
        <motion.div
          variants={fadeIn}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          transition={{ ...transitions.smooth, delay: 0.2 }}
          className="order-2 relative flex justify-center md:justify-end"
        >
          {/* Organic blob */}
          <svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M320 200 C320 280 270 350 200 350 C130 350 70 295 60 220 C50 145 100 60 175 50 C250 40 320 120 320 200Z"
              fill="var(--primary-muted)"
            />
          </svg>

          {/* Photo placeholder */}
          <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-border flex items-center justify-center overflow-hidden">
            <span className="text-xs text-text-muted select-none">
              Foto de terapeuta
            </span>

            {/* Floating badge */}
            <span className="absolute bottom-4 right-4 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-sm border border-border">
              Sesiones 100% en línea
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
