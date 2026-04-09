interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * SobreMiIcon — About Me / Self
 *
 * A single organic leaf form (one petal from the logo) with a small filled
 * circle at its center — directly echoing the logo's *el yo* (the self).
 * Represents: the person held within their context.
 */
export function SobreMiIcon({
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
      {/* Leaf petal — organic, same bezier as logo petals */}
      <path
        d="M 12 4 C 5 8 5 16 12 20 C 19 16 19 8 12 4 Z"
        fill="currentColor"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* El yo — the self; fully opaque anchor, same concept as logo center dot */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
