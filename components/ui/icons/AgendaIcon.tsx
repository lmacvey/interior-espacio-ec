interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * AgendaIcon — Book a Session (CTA)
 *
 * A rounded rectangle (calendar) with a single curved arc inside instead of
 * a rigid date grid — rhythm and flow, not scheduling pressure. Represents:
 * making space, setting intention.
 */
export function AgendaIcon({
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
      {/* Calendar frame */}
      <rect
        x="4" y="5" width="16" height="16" rx="3"
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      {/* Header divider */}
      <line
        x1="4" y1="10" x2="20" y2="10"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Ring hooks */}
      <line x1="8"  y1="3" x2="8"  y2="7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      {/* Organic arc — rhythm, not a rigid grid */}
      <path
        d="M 7 15 Q 12 13 17 15"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
