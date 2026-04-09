interface LogoProps {
  /** "sm" hides the subtitle tagline (for use in Header) */
  size?: "sm" | "md";
  className?: string;
}

export default function Logo({ size = "sm", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/*
        Mark concept: "EI" monogram — Espacio Interior.

        E: a vertical spine with three horizontal bars (left side of mark).
           Top and bottom bars equal length; middle bar slightly longer —
           standard E proportion, read immediately as the letter.

        I: a filled circle aligned to the middle bar (right side of mark).
           The lowercase "i" dot, abstracted. Not a stroke — a presence.

        The gap between the E's bar ends and the I dot is the espacio interior:
        the space between the two letters IS the concept.

        Bar opacities: top/bottom 0.55, middle 0.90 — draws the eye to center,
        creates depth within the E without adding elements.

        All strokes and fills use currentColor.
      */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* E — vertical spine */}
        <line
          x1="9" y1="8" x2="9" y2="28"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* E — top bar */}
        <line
          x1="9" y1="8" x2="21" y2="8"
          stroke="currentColor"
          strokeWidth="2.0"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* E — middle bar (longest — classic E proportion) */}
        <line
          x1="9" y1="18" x2="23" y2="18"
          stroke="currentColor"
          strokeWidth="2.0"
          strokeLinecap="round"
        />

        {/* E — bottom bar */}
        <line
          x1="9" y1="28" x2="21" y2="28"
          stroke="currentColor"
          strokeWidth="2.0"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* I — the dot, aligned to middle bar. The interior space between E and I. */}
        <circle cx="30" cy="18" r="2.8" fill="currentColor" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight">
          Espacio Interior
        </span>
        {size === "md" && (
          <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase mt-0.5">
            Terapia en Línea
          </span>
        )}
      </span>
    </span>
  );
}
