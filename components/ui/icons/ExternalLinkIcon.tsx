interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/** ExternalLinkIcon — indicates a link that opens in a new tab */
export function ExternalLinkIcon({
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
      {/* Arrow tip */}
      <path
        d="M 13 4 L 20 4 L 20 11"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Diagonal line */}
      <path
        d="M 20 4 L 12 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Box */}
      <path
        d="M 10 6 L 5 6 Q 4 6 4 7 L 4 19 Q 4 20 5 20 L 17 20 Q 18 20 18 19 L 18 14"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
