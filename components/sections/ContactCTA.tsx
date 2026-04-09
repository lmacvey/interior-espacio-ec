"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { scaleIn } from "@/lib/motion";
import Logo from "@/components/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WHATSAPP_NUMBER, WHATSAPP_PREFILLED_MESSAGE } from "@/lib/constants";

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MESSAGE}`;

export default function ContactCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-4 md:px-6 bg-primary text-primary-foreground text-center">
      <motion.div
        variants={scaleIn}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-xl mx-auto"
      >
        <div className="flex justify-center mb-6 text-primary-foreground">
          <Logo size="sm" />
        </div>
        <h2
          className="font-display text-2xl sm:text-3xl md:text-4xl mb-4"
          style={{ lineHeight: "var(--leading-heading)" }}
        >
          ¿Lista/o para comenzar?
        </h2>
        <p
          className="text-primary-foreground/80 text-base md:text-lg mb-10"
          style={{ lineHeight: "var(--leading-relaxed)" }}
        >
          Una sesión gratuita de exploración, sin compromiso. Un espacio para
          conocernos y ver si hay sintonía.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-block w-full sm:w-auto rounded-full bg-white text-primary px-8 py-3.5 text-sm font-medium transition-colors duration-200 hover:bg-primary-light active:scale-[0.98]"
          >
            Agenda tu consulta
          </Link>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbeme por WhatsApp"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-white/50 text-primary-foreground px-8 py-3.5 text-sm font-medium transition-colors duration-200 hover:bg-white/10 active:scale-[0.98]"
          >
            <WhatsAppIcon size={16} className="text-[#25D366]" aria-hidden />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
