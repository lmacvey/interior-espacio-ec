interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * InicioIcon — Home / Landing
 *
 * A soft arch instead of a sharp-gabled roof. A round-top doorway sits within
 * the gentle organic outline. Represents: entering a space, a threshold, beginning.
 */
export function InicioIcon({
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
      {/* Outer arch form — soft quadratic curve, no sharp peak */}
      <path
        d="M 4 13 Q 12 3 20 13 L 20 20 Q 20 21 19 21 L 5 21 Q 4 21 4 20 Z"
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Round-top doorway — arched, welcoming */}
      <path
        d="M 9 21 L 9 16 Q 9 13 12 13 Q 15 13 15 16 L 15 21"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
