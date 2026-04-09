interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * LinkedInIcon — "in" letterform inside a rounded square frame.
 * Small filled dot (the i), vertical l stroke, and arched n stroke.
 */
export function LinkedInIcon({
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
      {/* Rounded square frame */}
      <rect
        x="3" y="3" width="18" height="18" rx="4"
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      {/* "i" — small filled dot */}
      <circle cx="8" cy="8.5" r="1" fill="currentColor" />
      {/* "l" — vertical stroke */}
      <line
        x1="8" y1="11" x2="8" y2="17"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* "n" — left vertical */}
      <line
        x1="12.5" y1="11" x2="12.5" y2="17"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* "n" — arch curving right then down */}
      <path
        d="M 12.5 12 Q 12.5 11 14 11 Q 16.5 11 16.5 13.5 L 16.5 17"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
