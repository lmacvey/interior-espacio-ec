"use client";

import { WhatsAppIcon } from "@/components/ui/icons";
import { WHATSAPP_NUMBER, WHATSAPP_PREFILLED_MESSAGE } from "@/lib/constants";

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MESSAGE}`;

export default function WhatsAppContactOption() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp — abre en una nueva pestaña"
      className="flex items-center gap-4 w-full rounded-[var(--radius-lg)] border-[1.5px] border-border bg-surface-1 px-6 py-5 transition-colors duration-200 hover:bg-surface-2 hover:border-border-strong focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--primary-light)] group"
    >
      <span className="flex-shrink-0 w-11 h-11 rounded-full bg-[var(--secondary-light,#e8d9c4)] flex items-center justify-center">
        <WhatsAppIcon size={22} className="text-[#25D366]" aria-hidden />
      </span>

      <span className="flex flex-col">
        <span className="text-sm font-medium text-[var(--text-primary,inherit)]">
          Escribir por WhatsApp
        </span>
        <span className="text-xs text-[var(--text-muted,#6b6560)] mt-0.5">
          Respondo lo antes posible, normalmente el mismo día.
        </span>
      </span>

      <svg
        className="ml-auto w-4 h-4 text-[var(--text-muted,#9e9189)] group-hover:text-[var(--text-secondary,#6b6560)] transition-colors duration-150 flex-shrink-0"
        fill="none"
        viewBox="0 0 16 16"
        aria-hidden
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
