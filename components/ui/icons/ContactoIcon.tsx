interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * ContactoIcon — Contact / Reaching Out
 *
 * A speech bubble with a soft rounded base and a gently curved tail — no
 * spike. Three dots inside: a thought forming before words arrive. Represents:
 * the act of speaking, reaching toward another person.
 */
export function ContactoIcon({
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
      {/* Bubble form — soft rounded corners, curved tail */}
      <path
        d="M 4 6 Q 4 4 6 4 L 18 4 Q 20 4 20 6 L 20 14 Q 20 16 18 16
           L 10 16 Q 8 19 6.5 17.5 Q 8 16 7 16 Q 4 16 4 14 Z"
        fill="currentColor"
        fillOpacity={0.12}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Three dots — a thought forming (ellipsis) */}
      <circle cx="9"  cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}
