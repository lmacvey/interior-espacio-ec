# Interior Espacio — Logo Design

## Concept

**Name:** "El Espacio Interior"

The mark translates the brand name into pure geometry: two organic leaf/petal forms counter-rotated around a shared center. Their overlapping region creates a visible **interior space** — the conceptual core of the therapeutic journey. The center dot represents the self (*el yo*) held within that space.

The name carries two philosophical layers:
- *Interior* — the inner world; what is private, unspoken, beneath the surface
- *Espacio* — the room that inner world deserves; safety, openness, breath

The mark holds both: the petals are the space, the void between them is the interior.

---

## SVG Anatomy

```
viewBox="0 0 36 36"   width="36"   height="36"
```

### Element 1 — Outer petal (left tilt)
```xml
<path
  d="M 18 4 C 6 9 6 27 18 32 C 30 27 30 9 18 4 Z"
  fill="currentColor"
  opacity="0.15"
  transform="rotate(-18, 18, 18)"
/>
```
- Represents the **outer context** — the world around the self
- Rotated **−18°** (leaning left)
- Opacity 0.15: clearly recedes; separates from the inner petal without competing
- Identical bezier path to Element 2 — symmetry is intentional

### Element 2 — Inner petal (right tilt)
```xml
<path
  d="M 18 4 C 6 9 6 27 18 32 C 30 27 30 9 18 4 Z"
  fill="currentColor"
  opacity="0.40"
  transform="rotate(18, 18, 18)"
/>
```
- Represents **the inner self** — the therapeutic interior
- Rotated **+18°** (leaning right)
- Opacity 0.40: primary read, clearly dominant over the outer petal
- Overlap with Element 1 reads at ~55% effective fill — clean, deliberate gradient rather than a flat blotch

### Element 3 — Center dot
```xml
<circle cx="18" cy="17" r="2.6" fill="currentColor" />
```
- *El yo* — the self
- Positioned slightly above geometric center (cy="17" not "18") — optically centered
- The one fully opaque element: the self is clear, present, legible at all sizes
- Anchors the composition and provides the favicon read

---

## Color Behavior

All fills and strokes use `currentColor`. The mark inherits color from its CSS context.

| Context | Color applied | Hex |
|---|---|---|
| Default (light bg, header, footer logo) | `text-primary` via parent | `#5f7260` |
| ContactCTA section (dark sage bg) | `text-primary-foreground` via parent | `#ffffff` |
| Custom (if needed) | Any color class on the `<span>` wrapper | — |

**To invert the mark** (e.g., on dark background): wrap the `<Logo>` in a `text-white` or `text-primary-foreground` parent. The SVG inherits automatically.

---

## Usage Rules

### Lockup variants

| Prop | Mark size | Shows tagline | Use case |
|---|---|---|---|
| `size="sm"` (default) | 36×36 | No | Header nav, mobile menu |
| `size="md"` | 36×36 | Yes ("Terapia en Línea") | Footer, hero context, standalone brand moments |

### Mark-only sizes (icon contexts)

| Size | Use |
|---|---|
| 64px | Above-the-fold brand moments |
| 48px | Section headings, about page |
| 36px | Standard lockup |
| 24px | Header (lockup) |
| 16px | Favicon — center dot only legible; petals form abstract shape |

### Minimum size
Do not use the full lockup (mark + wordmark) below **20px mark height**. Use the mark alone below 24px.

---

## What Not to Do

- **Do not recolor** individual SVG elements. Change the parent's `color`/`text-*` class, not the SVG internals.
- **Do not add a stroke/outline** to the petal paths — the soft opacity boundary *is* the edge.
- **Do not distort the aspect ratio** — the viewBox is square; always scale proportionally.
- **Do not place on busy or patterned backgrounds** — the mark requires a flat surface (white, sage, or dark).
- **Do not remove the center dot** — it is the only fully-opaque element and the favicon anchor.
- **Do not increase petal opacity** above 0.40 inner / 0.15 outer — the overlap zone becomes muddy and the interior space collapses into a flat blotch.
- **Do not use as a loading spinner or animated element** — per motion spec, the mark is always static.

---

## Spec Compliance

| Requirement | Source | Status |
|---|---|---|
| All SVG fills/strokes use `currentColor` | `branding-spec.md` L363 | ✅ |
| Mark inverts cleanly on dark sage ContactCTA background | `branding-spec.md` L363 | ✅ via `currentColor` |
| Embodies "inner world + the room it deserves" | `branding-spec.md` L7 | ✅ |
| Never startles or distracts | `branding-spec.md` L284 | ✅ static, `aria-hidden` |
| Conveys warmth, not institutional coldness | `branding-spec.md` L13 | ✅ organic curves, soft opacity |

### Known design trade-offs

- Opacity overlap at the petal intersection reads as ~55% effective fill on `#faf9f7` — deliberate, creates a visible interior zone without muddying. Sensitive to background lightness; keep backgrounds within the spec palette.
