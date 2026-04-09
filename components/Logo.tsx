interface LogoProps {
  /** "sm" hides the subtitle tagline (for use in Header) */
  size?: "sm" | "md";
  className?: string;
}

export default function Logo({ size = "sm", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/*
        Mark concept: "El Espacio Interior"
        Two organic leaf/petal forms counter-rotated around a shared center.
        Their overlapping interior creates a visible inner space — the core
        of the therapeutic journey. The center point is the self (el yo).
        Uses currentColor so the mark inverts cleanly on dark backgrounds.
      */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer petal — tilted left, represents the outer world / context */}
        <path
          d="M 18 4 C 6 9 6 27 18 32 C 30 27 30 9 18 4 Z"
          fill="currentColor"
          opacity="0.15"
          transform="rotate(-18, 18, 18)"
        />
        {/* Inner petal — tilted right, represents the inner self */}
        <path
          d="M 18 4 C 6 9 6 27 18 32 C 30 27 30 9 18 4 Z"
          fill="currentColor"
          opacity="0.40"
          transform="rotate(18, 18, 18)"
        />
        {/* Centro — el yo / the self */}
        <circle cx="18" cy="17" r="2.6" fill="currentColor" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight">
          Interior Espacio
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
