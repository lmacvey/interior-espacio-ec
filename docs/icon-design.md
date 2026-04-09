# Espacio Interior — Custom Navigation Icon Set

## Context

The brand has a custom-designed logo (organic petal forms, soft opacity layers, center dot, `currentColor`) with a distinct visual voice: warm, non-clinical, hand-crafted quality. Generic icon libraries feel mismatched against this mark. This document specifies a set of **bespoke SVG icons** drawn from the same design language as the logo — organic curves, `strokeLinecap="round"`, `strokeLinejoin="round"`, `strokeWidth={1.5}`, `currentColor` — purpose-built for the five nav sections and common UI actions.

---

## Design Language (from logo-design.md)

The logo uses:
- `viewBox="0 0 36 36"` — square viewport
- Organic bezier paths (not geometric primitives)
- `strokeLinecap="round"` / `strokeLinejoin="round"` — soft, rounded line quality
- `currentColor` for all fills and strokes — color always controlled by parent CSS
- Layered opacity (0.20 / 0.45 / 0.52 / 1.0) for depth
- One fully-opaque anchor element per mark (center dot = the self)

The navigation icons use `viewBox="0 0 24 24"` (standard UI grid), the same principles scaled down but simpler — each icon reads clearly at 16–24px.

---

## Global SVG Rules

All custom icons:
- `viewBox="0 0 24 24"` — square grid
- `fill="none"` unless explicitly noted (stroke-based)
- `currentColor` — inherits parent color, never hardcoded hex
- `strokeWidth={1.5}`
- `strokeLinecap="round"`
- `strokeLinejoin="round"`
- Where fill is used: low opacity (`fillOpacity`) to echo the logo's layering

---

## Icon Design Briefs

### 1. `InicioIcon` — Home / Landing

A soft arch instead of a sharp-gabled roof. Organic outline with a round-topped door. Represents: entering a space, a threshold, the beginning of something.

```svg
<!-- Outer arch form -->
<path d="M 4 13 Q 12 3 20 13 L 20 20 Q 20 21 19 21 L 5 21 Q 4 21 4 20 Z"
  fill="currentColor" fillOpacity="0.10"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />

<!-- Round-top doorway -->
<path d="M 9 21 L 9 16 Q 9 13 12 13 Q 15 13 15 16 L 15 21"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />
```

### 2. `SobreMiIcon` — About Me / Self

A single organic leaf form (one petal from the logo) with a small filled circle at its center — directly echoing the logo's *el yo* (the self). Represents: the person held within their context.

```svg
<!-- Leaf petal -->
<path d="M 12 4 C 5 8 5 16 12 20 C 19 16 19 8 12 4 Z"
  fill="currentColor" fillOpacity="0.15"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />

<!-- El yo — the self (fully opaque anchor) -->
<circle cx="12" cy="12" r="2" fill="currentColor" />
```

### 3. `ServiciosIcon` — Services / Areas of Support

Two overlapping petal forms counter-rotated — the logo motif miniaturized. Their overlap creates a visible interior space. Represents: two presences meeting, the therapeutic container.

```svg
<!-- Outer petal — recedes -->
<path d="M 12 4 C 5 8 5 16 12 20 C 19 16 19 8 12 4 Z"
  fill="currentColor" fillOpacity="0.20"
  transform="rotate(-12, 12, 12)" />

<!-- Inner petal — comes forward -->
<path d="M 12 4 C 5 8 5 16 12 20 C 19 16 19 8 12 4 Z"
  fill="currentColor" fillOpacity="0.50"
  transform="rotate(12, 12, 12)" />
```
*No stroke — opacity overlap is the edge, per logo spec.*

### 4. `BlogIcon` — Blog / Reflection

An open book with organic curves — slightly curved spine, pages fanning naturally. A single gentle curved stroke on the right page (a thought beginning to form). Represents: reflection, articulation, the written inner world.

```svg
<!-- Spine -->
<line x1="12" y1="6" x2="12" y2="19"
  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

<!-- Left cover (organic curve) -->
<path d="M 12 6 C 8 5 4 6 4 7 L 4 18 C 4 19 8 20 12 19"
  fill="currentColor" fillOpacity="0.10"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />

<!-- Right cover (organic curve) -->
<path d="M 12 6 C 16 5 20 6 20 7 L 20 18 C 20 19 16 20 12 19"
  fill="currentColor" fillOpacity="0.10"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />

<!-- A thought on the right page -->
<path d="M 14.5 11 Q 17 10.5 17.5 11.5"
  stroke="currentColor" strokeWidth="1.2"
  strokeLinecap="round" fillOpacity="0.6" />
```

### 5. `ContactoIcon` — Contact / Reaching Out

A speech bubble with a soft rounded base and a gently curved tail (no spike). Three small dots inside — an ellipsis — a thought forming before words arrive. Represents: the act of speaking, reaching toward another person.

```svg
<!-- Bubble form -->
<path d="M 4 6 Q 4 4 6 4 L 18 4 Q 20 4 20 6 L 20 14 Q 20 16 18 16
         L 10 16 Q 8 19 6.5 17.5 Q 8 16 7 16 Q 4 16 4 14 Z"
  fill="currentColor" fillOpacity="0.12"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />

<!-- Three dots (a thought forming) -->
<circle cx="9"  cy="10" r="1" fill="currentColor" />
<circle cx="12" cy="10" r="1" fill="currentColor" />
<circle cx="15" cy="10" r="1" fill="currentColor" />
```

### 6. `AgendaIcon` — Book a Session (CTA)

A rounded rectangle (calendar) with a single curved arc inside instead of a rigid date grid — rhythm and flow, not scheduling pressure. Represents: making space, setting intention.

```svg
<!-- Calendar frame -->
<rect x="4" y="5" width="16" height="16" rx="3"
  fill="currentColor" fillOpacity="0.10"
  stroke="currentColor" strokeWidth="1.5" />

<!-- Header divider -->
<line x1="4" y1="10" x2="20" y2="10"
  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

<!-- Ring hooks -->
<line x1="8"  y1="3" x2="8"  y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
<line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

<!-- Organic arc — rhythm, not a grid -->
<path d="M 7 15 Q 12 13 17 15"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" fillOpacity="0" />
```

---

## UI Utility Icons

Stroke-only, minimal. Same round linecap/join for visual cohesion:

### `ArrowRightIcon`

A slightly curved path — organic directional energy, not mechanical.

```svg
<path d="M 5 12 Q 12 12 19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
<path d="M 14 8 L 19 12 L 14 16"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />
```

### `ChevronDownIcon`

```svg
<path d="M 6 9 L 12 15 L 18 9"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />
```

### `CloseIcon`

```svg
<path d="M 6 6 L 18 18 M 18 6 L 6 18"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" />
```

### `MenuIcon`

Three strokes — center slightly shorter for organic asymmetry:

```svg
<line x1="4"  y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
<line x1="5"  y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
<line x1="4"  y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
```

### `ExternalLinkIcon`

```svg
<path d="M 13 4 L 20 4 L 20 11"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />
<path d="M 20 4 L 12 12"
  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
<path d="M 10 6 L 5 6 Q 4 6 4 7 L 4 19 Q 4 20 5 20 L 17 20 Q 18 20 18 19 L 18 14"
  stroke="currentColor" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round" />
```

---

## File Structure

```
components/ui/icons/
  InicioIcon.tsx
  SobreMiIcon.tsx
  ServiciosIcon.tsx
  BlogIcon.tsx
  ContactoIcon.tsx
  AgendaIcon.tsx
  ArrowRightIcon.tsx
  ChevronDownIcon.tsx
  ExternalLinkIcon.tsx
  CloseIcon.tsx
  MenuIcon.tsx
  index.ts          ← barrel re-export
components/ui/NavIcons.tsx   ← registry + NavIcon component + NavIconSet preview
```

---

## NavIcon Component API

```tsx
interface NavIconProps {
  icon: NavIconKey;       // keyof navIcons registry
  size?: "sm" | "md" | "lg";   // 16 / 20 / 24 px
  withContainer?: boolean;      // square --radius-md bg-primary-light wrapper
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}
```

### Size → container mapping

| `size` | Icon px | Container class |
|---|---|---|
| `sm` | 16 | `w-7 h-7` |
| `md` | 20 | `w-10 h-10` |
| `lg` | 24 | `w-12 h-12` |

---

## Integration Points

| Location | Icon(s) | Size | Container |
|---|---|---|---|
| Mobile nav links | Per link icon | `sm` | No (text label present) |
| Service cards | `ServiciosIcon` or per-specialty | `md` | Yes |
| Footer CTA | `AgendaIcon` | `md` | No |
| Contact form submit | `AgendaIcon` | `sm` | No |
| "Read more" inline links | `ArrowRightIcon` | `sm` | No |
| Mobile menu open/close | `MenuIcon` / `CloseIcon` | `sm` | No |

---

## Verification Checklist

- [ ] `npm run dev` — no TypeScript errors
- [ ] Mobile nav: each link shows its icon at 16px, inheriting hover color
- [ ] Desktop nav: text-only, no icons (unchanged)
- [ ] DevTools: `stroke-width="1.5"`, `currentColor` present in SVG output
- [ ] Icons readable at `sm` (16px) — no detail loss
- [ ] `NavIconSet` preview renders all icons in a grid
- [ ] All bare icons carry `aria-hidden="true"` when text label is present

---

## Out of Scope (this pass)

- Blog / About / Contact page-level icon usage
- Icon animation
- Favicon update
