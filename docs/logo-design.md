# Espacio Interior — Logo Design

## Concept

**Mark concept:** "El Espacio Interior"

The name is the mark's brief. "Espacio" (space, room) is the noun — the primary thing. "Interior" is the adjective — what kind of space it is. The mark must lead with **space**, not with form.

Two bezier arcs form a lens / almond (vesica) shape. The enclosed **negative space** is the brand — the room. A center dot sits inside it. The arcs exist to define the space; the space is the point.

The two arcs carry distinct meanings:
- **Left arc** — heavier, more present: the holding boundary. The walls that make safety possible. Structure, the therapist's presence.
- **Right arc** — lighter, more permeable: the open threshold. Breath, possibility, the side the client enters from.

Their asymmetry expresses the central tension of therapy: *held and open simultaneously.*

---

## SVG Anatomy

```
viewBox="0 0 36 36"   width="36"   height="36"
```

### Path math

| | Value |
|---|---|
| Top apex | `(18, 3.5)` |
| Bottom apex | `(18, 32.5)` |
| Total height | 29px |
| Left arc control points | `(8.5, 3.5)` and `(8.5, 32.5)` |
| Right arc control points | `(27.5, 3.5)` and `(27.5, 32.5)` |
| Lens half-width at equator | ≈ 7px |
| Center dot | `cx=18, cy=17, r=2.4` — cy=17 for optical centering |

### Element 1 — Ghost fill (suppressed at `size="sm"`)

```xml
<path
  d="M 18 3.5 C 8.5 3.5, 8.5 32.5, 18 32.5 C 27.5 32.5, 27.5 3.5, 18 3.5 Z"
  fill="currentColor"
  opacity="0.08"
/>
```

The room's volume, barely visible. Confirms the space exists without shouting about it. Suppressed at `size="sm"` (header) where the mark renders small enough that 0.08 opacity fill adds noise rather than meaning.

### Element 2 — Left arc (holding boundary)

```xml
<path
  d="M 18 3.5 C 8.5 3.5, 8.5 32.5, 18 32.5"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.6"
  strokeLinecap="round"
  opacity="0.85"
/>
```

The therapist's presence. More substantial because containment requires intention. The thicker stroke reads as ground, support, structure.

### Element 3 — Right arc (open threshold)

```xml
<path
  d="M 18 3.5 C 27.5 3.5, 27.5 32.5, 18 32.5"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.1"
  strokeLinecap="round"
  opacity="0.45"
/>
```

The permeable side. A space is not a sealed box — it has a threshold. The lighter weight allows the eye to pass through and return. Half the opacity of the left arc, two-thirds the stroke weight.

### Element 4 — Center dot

```xml
<circle cx="18" cy="17" r="2.4" fill="currentColor" />
```

*El yo* — the self, held inside the espacio. Positioned slightly above geometric center (`cy=17` not `18`) for optical balance — visual center of a lens reads above the true centroid. The only fully opaque, fully filled element. The one unambiguous thing in the mark: a person, here, present.

---

## Color Behavior

All fills and strokes use `currentColor`. The mark adapts to its CSS context automatically.

| Context | Color applied | Usage |
|---|---|---|
| Default (header, footer) | `text-primary` → `#5f7260` sage green | Wrap `<Logo>` in a sage-colored parent |
| ContactCTA / dark background | `text-primary-foreground` → `#ffffff` | Wrap in `text-white` or `text-primary-foreground` |

The ghost fill (opacity 0.08) and arc opacity differences are relative to `currentColor`, so they maintain their relationships on any background.

---

## Usage Rules

### Lockup variants

| Prop | Ghost fill | Shows tagline | Use case |
|---|---|---|---|
| `size="sm"` (default) | Hidden | No | Header nav |
| `size="md"` | Visible | Yes ("Terapia en Línea") | Footer, hero, standalone |

### Mark-only sizes

| Size | Read |
|---|---|
| 64px | Full fidelity — bezier character, pointed poles, fill tactile |
| 36px | Full fidelity — asymmetric arcs clearly intentional |
| 24px | Header lockup size — arc hierarchy legible, dot clear |
| 16px | Favicon — arcs collapse to antialised lines, dot ≈ 3px; legible |

### Minimum size

Do not use the full lockup (mark + wordmark) below 20px mark height. Mark-only below 24px.

---

## What Not to Do

- **Do not recolor SVG elements directly.** Set `color` on a parent element; the mark inherits via `currentColor`.
- **Do not equalize arc strokeWidths.** 1.6 vs 1.1 is the intentional asymmetry — equal weights read as a generic geometric shape.
- **Do not equalize arc opacities.** 0.85 vs 0.45 creates the held/open tension. Equalizing flattens the concept.
- **Do not remove the center dot.** It is the semantic payload — a person inside the space. Without it the mark is just two arcs.
- **Do not place on patterned or photographic backgrounds.** The ghost fill and low-opacity arcs require a flat surface.
- **Do not distort the aspect ratio.** The viewBox is square; scale proportionally only.
- **Do not add a stroke or outline to the lens fill.** The fill is a ghost; outlining it makes it a shape.

---

## Spec Compliance

| Requirement | Source | Status |
|---|---|---|
| All SVG fills/strokes use `currentColor` | `branding-spec.md` | ✅ |
| Inverts cleanly on dark ContactCTA background | `branding-spec.md` | ✅ via `currentColor` |
| Never startles or distracts | `branding-spec.md` | ✅ static, `aria-hidden` |
| Embodies "the space the inner world deserves" | `branding-spec.md` L7 | ✅ negative space is primary read |
| Conveys warmth, not institutional coldness | `branding-spec.md` | ✅ organic bezier curves, no hard corners |
