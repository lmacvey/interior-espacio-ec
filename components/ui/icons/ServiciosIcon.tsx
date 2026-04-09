interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * ServiciosIcon — Services / Areas of Support
 *
 * Two overlapping petal forms counter-rotated — the logo motif miniaturized.
 * Their overlap creates a visible interior space. Represents: two presences
 * meeting, the therapeutic container.
 *
 * No stroke — the opacity overlap is the edge, per logo spec.
 */
export function ServiciosIcon({
  size = 24,
  className = "",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      {/* Outer petal — recedes, low opacity */}
      <path
        d="M 12 4 C 5 8 5 16 12 20 C 19 16 19 8 12 4 Z"
        fill="currentColor"
        fillOpacity={0.2}
        transform="rotate(-12, 12, 12)"
      />
      {/* Inner petal — comes forward, higher opacity */}
      <path
        d="M 12 4 C 5 8 5 16 12 20 C 19 16 19 8 12 4 Z"
        fill="currentColor"
        fillOpacity={0.5}
        transform="rotate(12, 12, 12)"
      />
    </svg>
  );
}
