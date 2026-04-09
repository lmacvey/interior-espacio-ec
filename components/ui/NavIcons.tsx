"use client";

/**
 * NavIcons — Custom Icon Registry
 *
 * Central registry for Interior Espacio's bespoke SVG icon set. All icons
 * are custom-drawn to match the logo's design language: organic bezier curves,
 * layered opacity, currentColor, strokeWidth 1.5, rounded linecaps.
 *
 * Usage (bare — text label present):
 *   <NavIcon icon="inicio" size="sm" aria-hidden />
 *
 * Usage (with square container — card feature context):
 *   <NavIcon icon="servicios" size="md" withContainer aria-hidden />
 */

import {
  InicioIcon,
  SobreMiIcon,
  ServiciosIcon,
  BlogIcon,
  ContactoIcon,
  AgendaIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  ExternalLinkIcon,
} from "@/components/ui/icons";

// ─── Icon Registry ────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}>;

export const navIcons = {
  // Primary navigation
  inicio:     InicioIcon,
  sobreMi:    SobreMiIcon,
  servicios:  ServiciosIcon,
  blog:       BlogIcon,
  contacto:   ContactoIcon,
  // UI / action
  agenda:        AgendaIcon,
  arrowRight:    ArrowRightIcon,
  chevronDown:   ChevronDownIcon,
  menuOpen:      MenuIcon,
  menuClose:     CloseIcon,
  externalLink:  ExternalLinkIcon,
} as const satisfies Record<string, IconComponent>;

export type NavIconKey = keyof typeof navIcons;

// ─── Size Map ─────────────────────────────────────────────────────────────────

/** px values — matches branding-spec.md § Icon System */
const sizes = {
  sm: 16,   // inline / nav links / buttons
  md: 20,   // card feature icons
  lg: 24,   // decorative / section level
} as const;

/** Tailwind container classes for square withContainer wrapper */
const containerClasses = {
  sm: "w-7 h-7",
  md: "w-10 h-10",
  lg: "w-12 h-12",
} as const;

type IconSize = keyof typeof sizes;

// ─── NavIcon Component ────────────────────────────────────────────────────────

interface NavIconProps {
  icon: NavIconKey;
  size?: IconSize;
  /**
   * Wraps the icon in the spec-compliant square container:
   * bg --primary-light, --radius-md (12px). For card feature contexts.
   */
  withContainer?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

export function NavIcon({
  icon,
  size = "sm",
  withContainer = false,
  className = "",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: NavIconProps) {
  const Icon = navIcons[icon];
  const px = sizes[size];

  if (!withContainer) {
    return (
      <Icon
        size={px}
        className={className}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
      />
    );
  }

  return (
    <span
      className={`flex-shrink-0 ${containerClasses[size]} rounded-[--radius-md] bg-primary-light flex items-center justify-center`}
      aria-hidden={ariaHidden}
    >
      <Icon
        size={px}
        className={`text-primary ${className}`}
        aria-label={ariaLabel}
      />
    </span>
  );
}

// ─── NavIconSet — visual preview (design-system / dev use) ────────────────────

/**
 * Renders all icons in the registry at multiple sizes and container states.
 * Embed in a /design-system route to visually audit the full set.
 */
export function NavIconSet() {
  const iconKeys = Object.keys(navIcons) as NavIconKey[];

  return (
    <div className="p-8 bg-background flex flex-col gap-10">
      {/* Bare icons — sm / md / lg */}
      {(["sm", "md", "lg"] as IconSize[]).map((s) => (
        <div key={s}>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted mb-4">
            Bare — size: {s} ({sizes[s]}px)
          </p>
          <div className="flex flex-wrap gap-6 items-end">
            {iconKeys.map((key) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <NavIcon icon={key} size={s} aria-hidden />
                <span className="text-[10px] text-text-muted font-mono">{key}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* With square container */}
      <div>
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted mb-4">
          With square container — size: md
        </p>
        <div className="flex flex-wrap gap-6 items-end">
          {iconKeys.map((key) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <NavIcon icon={key} size="md" withContainer aria-hidden />
              <span className="text-[10px] text-text-muted font-mono">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
