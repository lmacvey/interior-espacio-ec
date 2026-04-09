interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * MenuIcon — hamburger menu open state
 *
 * Three horizontal strokes with slightly varying x-extent for organic asymmetry
 * (top and bottom are full-width; center is slightly inset).
 */
export function MenuIcon({
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
      <line x1="4"  y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <line x1="5"  y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <line x1="4"  y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}
