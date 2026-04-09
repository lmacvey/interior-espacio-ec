interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * InstagramIcon — camera lens in a rounded square frame.
 * Follows the same organic design language as the nav icon set:
 * rounded square with fillOpacity bg, inner lens circle, corner dot.
 */
export function InstagramIcon({
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
      {/* Camera lens — inner circle */}
      <circle
        cx="12" cy="12" r="4.5"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      {/* Viewfinder dot — top-right corner */}
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}
