interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * BlogIcon — Blog / Reflection
 *
 * An open book with organic curves — slightly curved spine, pages fanning
 * naturally. A single gentle stroke on the right page (a thought beginning
 * to form). Represents: reflection, articulation, the written inner world.
 */
export function BlogIcon({
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
      {/* Left cover — organic curve, pages fanning */}
      <path
        d="M 12 6 C 8 5 4 6 4 7 L 4 18 C 4 19 8 20 12 19"
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right cover — mirrored organic curve */}
      <path
        d="M 12 6 C 16 5 20 6 20 7 L 20 18 C 20 19 16 20 12 19"
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Spine */}
      <line
        x1="12" y1="6" x2="12" y2="19"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* A thought on the right page — short gentle curve */}
      <path
        d="M 14.5 11 Q 17 10.5 17.5 11.5"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        fillOpacity={0}
      />
    </svg>
  );
}
