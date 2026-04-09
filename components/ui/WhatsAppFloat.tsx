"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WHATSAPP_NUMBER, WHATSAPP_PREFILLED_MESSAGE } from "@/lib/constants";

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MESSAGE}`;

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  // Delayed mount — avoids competing with LCP paint and prevents hydration mismatch
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa-float"
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbeme por WhatsApp"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-4 md:bottom-8 md:right-6 z-40 flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#25D366] text-white shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)]"
        >
          <WhatsAppIcon size={28} aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
