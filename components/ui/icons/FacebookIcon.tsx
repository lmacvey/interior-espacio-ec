interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * FacebookIcon — stroked "f" letterform inside a rounded square frame.
 * Vertical stem + curved top + crossbar, following the organic stroke style.
 */
export function FacebookIcon({
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
      {/* "f" vertical stem */}
      <line
        x1="10" y1="8.5" x2="10" y2="18"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* "f" top curve — hooks right */}
      <path
        d="M 10 8.5 Q 10 6 12.5 6 L 13.5 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* "f" crossbar */}
      <line
        x1="8.5" y1="12" x2="13" y2="12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
