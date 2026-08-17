# Design Spec — Navarro Reffi Kamal Portfolio

Theme: 16-bit console (SNES/Genesis era). Single Design Component: `Navarro Portfolio.dc.html`.
Language: English. Motion: maximum (scanlines, glitch, parallax) via GSAP + ScrollTrigger.

## Palette

| Token | Hex | Use |
|---|---|---|
| Void | `#0d0720` | page base, alternating section bg |
| Deep panel | `#160c2e` | alternating section bg |
| Panel | `#1a1033` | cards, timeline blocks |
| Panel raised | `#1f1240` | project + stat cards |
| Border muted | `#6a5aa0` | inactive borders, empty pips |
| Magenta | `#ff2e88` | primary accent, hard shadows, rules |
| Cyan | `#22e0ff` | secondary accent, links |
| Yellow | `#ffd447` | CTA fill, headings highlight |
| Green | `#4ef58a` | success / "cleared" state |
| Ink | `#f2f0ff` | primary text, outlines |
| Ink dim | `#c9c2ec` | body copy |
| Ink faint | `#8e83c4` | meta, footer |

Rule: max two background colours per screen (`#0d0720` and `#160c2e`), accents only in small doses.

## Type

- **Press Start 2P** — all headings, labels, buttons, meta. Sizes: 8–9px (meta/tags), 10–11px (labels), 13–14px (card titles), `clamp(16px,3vw,26px)` (section h2), `clamp(26px,6.2vw,66px)` (hero h1). Letter-spacing 1–3px.
- **VT323** — all body copy. 20–23px (never below 20px; VT323 renders small).
- Line-height 1.5–1.7 everywhere pixel type is used.

## Components

- **Card**: 3px solid border + 8px hard offset shadow in an accent colour. Hover translates 3px into the shadow and shrinks it to 5px — no soft shadows, no border-radius anywhere.
- **Button**: Press Start 2P, 3px `#f2f0ff` border, 6px hard shadow `#ff2e88`. Primary = yellow fill; secondary = transparent + cyan border.
- **Tag**: 2px accent border, 8px pixel type, 5×7px padding.
- **Stat bar**: 2px ink border, `#0d0720` track, 2px inset padding, flat accent fill animated from 0% on scroll.
- **Section rule**: `repeating-linear-gradient(90deg, accent 0 10px, transparent 10px 20px)` — a dashed pixel line.
- **Section header**: `NN` number in yellow + h2 with 3px hard text-shadow + rule filling the row.

## Layout

- Max width 1100px (900px for prose-heavy Experience/Contact); 90px vertical section padding; 24px gutters.
- Grids are `repeat(auto-fit, minmax(240–300px, 1fr))` with 20–26px gap. Flex/grid + `gap` only.
- Section boundaries marked by a 4px accent top border, alternating magenta / cyan / yellow.

## Overlays (fixed, pointer-events none)

1. Scanlines — 1px black stripe every 3px, 32% opacity.
2. Phosphor flicker — cyan `overlay` blend, 4.5–8% opacity, 3.2s loop.
3. Vignette — inset shadow 180px/40px black 75%.

## Preloader — cartridge scan

Full-screen `#0d0720`. Cartridge shell (4px ink border, magenta hard shadow, magenta label bar, pin slots at the bottom) with a green scan bar sweeping top→bottom on a 1.6s loop. Below: a segmented progress bar (green/cyan 8px stripes), `READING CARTRIDGE` + percent. At 100%, a blinking `▶ PRESS START` reveals the site and fires the hero timeline. Prop `skipIntro` bypasses it.

## Motion

- Hero: `data-hero` elements fade + rise 40px, 0.12s stagger, `power3.out`, on start.
- Parallax: `data-par` layers (starfield 0.12, glow 0.3, grid/horizon 0.5) scrub on scroll and drift with the cursor; hero h1 gets a small counter-drift.
- Reveals: `data-reveal` fade + rise 46px at `top 88%`.
- Stat bars: `data-bar="NN"` grows 0→NN% at `top 92%`.
- Ambient CSS: `glitchA` on h1 (6s), `blink` on PRESS START / GAME OVER, `bob` on the scroll cue, `starfield` drift (24s).

## Sections

Hero → 01 Player Stats → 02 Skill Tree → 03 Select Quest → 04 Stages Cleared → 05 Dev Log → Contact / Resume → footer. Nav labels use the game vocabulary (STATS, SKILLS, QUESTS, STAGES, DEV LOG, CONTACT).

## Copy voice

Terse, game-console framing (quests, stages, cleared, co-op run) applied to real work — never so heavy it obscures what was actually built. Each project card: one plain sentence of what it does, then the real stack as tags.

## Open items

- Resume PDF not yet linked (`#contact` placeholder).
- Project cards use gradient plates; swap for real screenshots when available.
- Dev Log entries are placeholder titles with no article pages.
