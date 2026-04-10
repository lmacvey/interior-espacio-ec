"use client";

import { SUBSTACK_URL } from "@/lib/constants";

type Props = {
  variant: "footer" | "blog-page";
};

export function SubstackSubscribeWidget({ variant }: Props) {
  const isFooter = variant === "footer";

  if (!SUBSTACK_URL) {
    return (
      <div className={isFooter ? "mt-5" : "text-center"}>
        <p className={`font-semibold text-text-primary ${isFooter ? "text-sm mb-1" : "text-lg mb-2"}`}>
          Recibe artículos en tu correo
        </p>
        <p className="text-text-muted text-xs leading-relaxed mb-3">
          Sin spam. Solo reflexiones y recursos sobre bienestar emocional.
        </p>
        <span className="inline-block rounded-full border border-border px-5 py-2.5 text-xs text-text-muted cursor-not-allowed">
          Próximamente
        </span>
      </div>
    );
  }

  return (
    <div className={isFooter ? "mt-5" : "text-center"}>
      <p className={`font-semibold text-text-primary ${isFooter ? "text-sm mb-1" : "text-lg mb-2"}`}>
        Recibe artículos en tu correo
      </p>
      <p className="text-text-muted text-xs leading-relaxed mb-3">
        Sin spam. Solo reflexiones y recursos sobre bienestar emocional.
      </p>
      <a
        href={SUBSTACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
      >
        Suscribirme en Substack
      </a>
    </div>
  );
}
