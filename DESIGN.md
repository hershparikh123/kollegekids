---
version: alpha
name: KollegeKlub-design-analysis
description: >
  A poster-sized condensed headline on a flat azure field, and beneath it a
  ledger. The whole page is light; the vibrancy is one saturated colour used as
  a large flat plane, not as tints on cards. There are no cards, no badges, no
  stock photography — the record of admissions is the imagery, set as a real
  table with a single gold pill that means admitted. One variable grotesque
  pushed to its condensed, heavy end for display and its light, wide end for
  reading. The mark is the original Kollege Klub logo.

colors:
  canvas: "#ECF6FB"
  surface: "#FBFEFF"
  surface-2: "#E2EFF5"
  line: "#CCDCE3"
  line-2: "#B1C7CF"
  line-3: "#6E848E"
  ink: "#0E2831"
  ink-2: "#3E5A65"
  ink-3: "#536C76"
  brand-bright: "#2EB4DF"
  brand: "#0076A7"
  brand-lift: "#006492"
  brand-deep: "#005C88"
  brand-wash: "#CAF1FF"
  brand-mist: "#E3F9FF"
  gold: "#EABD23"
  gold-wash: "#FFECB8"
  gold-deep: "#896200"
  on-bright: "#0E2831"
  on-bright-mute: "#1B3D49"
  on-bright-line: "#3E93B6"
  scrim: "#0E2831"
  invalid: "#BA2B28"

typography:
  hero:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 96px
    fontWeight: 680
    lineHeight: 0.92
    letterSpacing: -2.88px
    fontVariationSettings: "wdth 78"
  section:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 30.4px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.61px
    fontVariationSettings: "wdth 90"
  display-md:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 27px
    fontWeight: 550
    lineHeight: 1.18
    letterSpacing: -0.41px
  display-sm:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 20px
    fontWeight: 550
    lineHeight: 1.25
    letterSpacing: -0.2px
  numeral-xl:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 192px
    fontWeight: 680
    lineHeight: 0.82
    letterSpacing: -9.6px
    fontVariationSettings: "wdth 78"
  lede:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 19.8px
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: 0
  body:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 17px
    fontWeight: 350
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 15.7px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0.05px
  button:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.08px
  numeral-md:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 64px
    fontWeight: 680
    lineHeight: 0.82
    letterSpacing: -3.2px
    fontVariationSettings: "wdth 80"
  status:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 15.2px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.05px
  caption:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 14.4px
    fontWeight: 350
    lineHeight: 1.5
    letterSpacing: 0.07px
  glyph:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0
  tick:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, Georgia, serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 1.68px
    textTransform: uppercase

bannedFonts: ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Nunito", "Karla", "system-ui", "DM Sans", "Manrope", "Space Grotesk", "Plus Jakarta Sans", "Satoshi", "General Sans", "Outfit", "Sora", "Arial", "Helvetica", "Cormorant Garamond", "Cormorant", "Newsreader", "IBM Plex Mono", "IBM Plex Sans", "Playfair Display", "Fraunces", "Lora", "Crimson Pro", "Instrument Serif", "Instrument Sans", "Space Mono", "Syne"]

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  x3l: 48px
  x4l: 64px
  x5l: 96px
  x6l: 128px

rounded:
  none: 0
  sm: 2px
  md: 4px
  pill: 999px

shadows:
  none: none

motion:
  spring-ui:
    damping: 1.0
    response: 0.35
  spring-flick:
    damping: 0.82
    response: 0.38
  spring-sheet-open:
    damping: 0.82
    response: 0.32
  spring-sheet-close:
    damping: 1.0
    response: 0.30
  projection-rate: 0.998
  rubberband-constant: 0.55
  hysteresis: 10px
  flick-threshold: 350px/s
  push-back-scale: 0.985

components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 14px 24px
    minHeight: 48px
  button-primary-hover:
    backgroundColor: "{colors.on-bright-mute}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  button-primary-press:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    scale: 0.975
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.brand-deep}"
    borderColor: "{colors.line-3}"
    borderWidth: 1px
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 14px 24px
    minHeight: 48px
  button-ghost-hover:
    backgroundColor: "{colors.brand-wash}"
    borderColor: "{colors.brand-deep}"
    textColor: "{colors.brand-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  focus-ring:
    outlineColor: "{colors.brand}"
    outlineWidth: 2px
    outlineOffset: 3px
    rounded: "{rounded.sm}"
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-2}"
    borderColor: "{colors.line}"
    borderWidth: 1px
    typography: "{typography.body-sm}"
    height: 64px
  nav-link-hover:
    textColor: "{colors.ink}"
    underlineColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  brand-lockup:
    asset: logo.png
    height: 32px
    heightFooter: 44px
    heightMobile: 28px
  hero-field:
    backgroundColor: "{colors.brand-bright}"
    textColor: "{colors.on-bright}"
    muteColor: "{colors.on-bright-mute}"
    borderColor: "{colors.on-bright-line}"
    borderWidth: 1px
    typography: "{typography.hero}"
  section-head:
    textColor: "{colors.ink}"
    noteColor: "{colors.ink-2}"
    typography: "{typography.section}"
    noteTypography: "{typography.lede}"
  section-edge:
    borderColor: "{colors.line}"
    borderWidth: 1px
  ledger:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    headColor: "{colors.ink-3}"
    topRuleColor: "{colors.ink}"
    rowRuleColor: "{colors.line}"
    typography: "{typography.body}"
    headTypography: "{typography.caption}"
    rowPadding: 16px 0
  ledger-row-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  ledger-next-row:
    backgroundColor: "{colors.brand-wash}"
    textColor: "{colors.brand-deep}"
    borderColor: "{colors.brand-deep}"
    typography: "{typography.body}"
  admit:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.tick}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  masthead:
    topRuleColor: "{colors.ink}"
    rowRuleColor: "{colors.line}"
    termColor: "{colors.ink}"
    detailColor: "{colors.ink-2}"
    typography: "{typography.body}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.ink-3}"
    borderColor: "{colors.line-3}"
    borderWidth: 1px
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 11px 14px
    minHeight: 48px
  input-focus:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.ink}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
  input-invalid:
    borderColor: "{colors.invalid}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
  field-label:
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    padding: 0 0 8px 0
  form-status:
    textColor: "{colors.brand-deep}"
    typography: "{typography.status}"
  grade-tab:
    textColor: "{colors.ink-3}"
    activeColor: "{colors.brand}"
    typography: "{typography.numeral-md}"
    weightInactive: 380
    weightActive: 680
  grade-track:
    spring: "{motion.spring-ui}"
    flickSpring: "{motion.spring-flick}"
    rubberband: "{motion.rubberband-constant}"
    hysteresis: "{motion.hysteresis}"
  swipe-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line-3}"
    borderWidth: 1px
    typography: "{typography.glyph}"
    rounded: "{rounded.md}"
    width: 44px
    height: 44px
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line-2}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    maxWidth: 44rem
    maxHeight: 86svh
    openSpring: "{motion.spring-sheet-open}"
    closeSpring: "{motion.spring-sheet-close}"
  sheet-scrim:
    backgroundColor: "{colors.scrim}"
    opacity: 0.42
  sheet-grip:
    backgroundColor: "{colors.line-2}"
    rounded: "{rounded.pill}"
    width: 40px
    height: 4px
  sheet-close:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.glyph}"
    rounded: "{rounded.md}"
    width: 40px
    height: 40px

---

# KollegeKlub — Design System

## Overview


Kollege Klub is not the institution. It is a handful of people who got into hard
schools recently enough to remember the details, and who will tell you what they
did. This system dresses like the guide, not the institution — and, just as
deliberately, not like a software product either.

**The thesis is the record.** The page opens on the largest thing it owns, a
headline set condensed and heavy across a flat azure field, and the very next
thing beneath it is the board: where every mentor was admitted, set as a real
table with a gold pill on each row. That is the hero image. There is no
photograph, no badge, no pair of buttons, no floating card. What is on the
page is what is true.

**The signature, with the mark removed:** a light page, one saturated azure
plane at the top carrying dark condensed type, and below it ruled ledgers with
square corners where a single gold pill means *admitted*.

**Four rules carry the system.**

1. **Gold means admitted.** It is the only pill on the page, the only rounded
   thing above 4px, and it appears nowhere but the outcome column.
2. **One saturated plane, not many tints.** The vibrancy is the hero field at
   full strength with ink on it. Below it, the accent is rationed to the
   next-session row and link text.
3. **Rules, not cards.** Every list on the page is a table or a definition
   list with a 1px top rule in ink and 1px row rules in `line`. Nothing is
   boxed; nothing floats; nothing has a shadow.
4. **One typeface at two extremes.** Condensed and heavy (`wdth 78`, `wght
   680`) for the hero and the grade numerals; full-width and light for reading.
   The distance between those two settings is the whole typographic voice.

### What this replaced, and why

This is the fourth composition. The first specified Cormorant Garamond,
Newsreader, IBM Plex Mono and a cream canvas: three training-data typefaces and
the single most saturated AI ground. The second went dark with a fade-to-black
hero. The third was light and correct on every measurable axis — and read,
element by element, as the canonical AI landing page: pill badge with a
pulsing dot, headline, subhead, primary-plus-ghost button pair, floating photo
card with a caption chip, logo marquee, big-number stats row, three identical
image cards, circular stock portraits, a form on a coloured panel. Passing the
contrast checker did not touch the composition, which is where the tell lives.

What carried over from all of that is only what is genuinely the brand's: the
two hues sampled out of the logo file, and the logo itself.

## Colors

Both anchors come from the logo PNG (1779×821, opaque pixels only): `#75A5B8` at
67,077 px and `#EABD23` at 16,251 px. In OKLCH those sit at **hue 224.5** and
**hue 90.4**. Every colour in the palette is on one of those two hues. The
stylesheet declares them in `oklch()` so the ramps stay perceptually even; the
hexes above are the sRGB equivalents for reference and diffing.

### Ground

Everything is tinted toward the brand's own hue rather than toward warm grey.
That is what keeps a light page from reading as generic white, and it is why
none of these are neutral.

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#ECF6FB` | The page. L .968 at hue 224.5 — a cool tinted white, never `#fff` |
| `surface` | `#FBFEFF` | Cards, the board plate, inputs — *lighter* than the page, so panels lift |
| `surface-2` | `#E2EFF5` | The alternating section band, row hover, closed badges |
| `line` | `#CCDCE3` | Hairlines and rules |
| `line-2` | `#B1C7CF` | Decorative panel edges |
| `line-3` | `#6E848E` | **Control** borders — inputs, ghost buttons. 3.58:1 on canvas, the floor for a boundary a user has to aim at |

### Brand

One hue at four lightnesses, each with a job it can actually do on a light page:

| Token | Hex | Job |
|---|---|---|
| `brand-bright` | `#2EB4DF` | The vibrant drench. Big panels, carrying `ink` at 6.4:1 |
| `brand` | `#0076A7` | Button fills. Dark enough to carry `surface` text at 4.99:1 |
| `brand-lift` | `#006492` | Hover |
| `brand-deep` | `#005C88` | Link text (6.6:1) and control borders |
| `brand-wash` / `brand-mist` | `#CAF1FF` / `#E3F9FF` | Tinted panels and hover grounds |

**`brand-bright` takes ink, never white.** White on it is 2.4:1 and `ink-2` is
3.1:1; only `ink` (6.4:1) and `on-bright-mute` (4.8:1) are permitted there. That
single rule is what lets the register panel be genuinely saturated instead of a
timid pastel.

### Gold

`gold #EABD23`, straight from the logo, with a **single** licensed meaning:
*someone was admitted*. It is the pill on a board row. That is the whole
permitted surface area.

The arithmetic forces the discipline. On a light ground gold is **1.7:1** as
text — unusable — but as a fill carrying `ink` it is **8.6:1**. So gold can only
ever be a small solid shape, which is exactly what a status marker should be.
`gold-deep #896200` exists for the rare case where gold must be text (5.0:1 on
canvas); `gold-wash` is its tint.

### Text

| Token | On `canvas` | On `surface` | On `surface-2` | Use |
|---|---|---|---|---|
| `ink` | 14.0:1 | 15.2:1 | 13.1:1 | Headings, board rows, anything primary |
| `ink-2` | 6.7:1 | 7.3:1 | 6.3:1 | Body copy, ledes, nav |
| `ink-3` | 5.1:1 | 5.5:1 | 4.7:1 | Metadata, dates, placeholders, small caps |

`ink-3` clears AA on all three grounds deliberately: it is the placeholder
colour, and a muted placeholder nobody checked is the most common accessibility
failure in a light theme. Measured across the built page there are **zero** AA
failures; the lowest small-text pair is 4.74:1 and the lowest large-text pair is
4.31:1 against a 3:1 requirement.

## Typography

### Font family

**Bricolage Grotesque, alone.** A variable grotesque with `opsz`, `wdth` and
`wght` axes and enough irregularity in its terminals to have a point of view —
it is not the neutral grotesque that makes every startup page look like every
other startup page, and it is not a display serif in a category drowning in
them. Hierarchy comes from working its axes: display sizes run `wdth 80–94` and
weight 500, body runs full width at 300–350. The largest type on the page is
also among the lightest.

One family is a decision, not economy. A second family here would have to be a
serif (a second sans would be the banned similar-but-not-identical pairing), and
a serif is exactly the costume this brand needs to take off.

Numerals use `font-variant-numeric: tabular-nums` throughout, because the board,
the dates, and the counters all need to align in columns.

### Hierarchy

Sizes run 12–192px across 14 roles, all fluid via `clamp()`; the frontmatter
records the desktop maximum of each. The ratio between display steps is ≥1.25.

Tracking is size-specific and never uniform: `-0.035em` on the 84px hero,
`-0.025em` at 52px, `-0.015em` at 27px, `0` on body, `+0.14em` on the 12px
uppercase tick. The `numeral-xl` grade markers go to `-0.05em` because a
192px figure reads loose at anything less.

### Note on font substitutes

Every role declares `ui-sans-serif, Georgia, serif` behind the primary. If the
Google Fonts CDN is blocked, the page degrades to a system face and stays
entirely readable; the width-axis personality is lost, the layout is not.

### Typography contract

> Use Bricolage Grotesque for everything. Build hierarchy from its `wdth`,
> `wght` and `opsz` axes, not from a second family.
> Never use Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, DM Sans,
> Manrope, Space Grotesk, Plus Jakarta Sans, Arial, Helvetica, Cormorant
> Garamond, Newsreader, IBM Plex Mono, Playfair Display, Fraunces, or Instrument
> Serif as a primary family.
> Never exceed font-weight 650. Letter-spacing must differ by size: negative on
> display, zero on body, positive on uppercase ticks. Numerals are tabular.

This contract is mirrored as a comment in `index.html`'s `<head>`, because an
agent editing that file reads it more reliably than a sibling document.

## Layout

One 4px progression, `xs 4` through `x6l 128`, plus a fluid `--gutter` of
`clamp(1.25rem, 5vw, 3rem)`. Container is `74rem`.

- **Measure:** body copy is capped at `68ch` globally and ledes at `60ch`.
  Measured on the built page: hero sub 54ch, ledes 60ch, plan copy 68ch.
- **Section rhythm:** `clamp(4.5rem, 11vw, 9rem)` vertical padding, varied
  deliberately — the marquee strip is deliberately tight (16px) against sections
  that breathe, and that contrast is what gives the scroll a pulse.
- **Grid:** the board is a four-column grid that collapses to a two-column
  template with named areas below 760px. Cards use
  `repeat(auto-fit, minmax(280px, 1fr))` so there is no card breakpoint at all.
- **Asymmetry:** the pinned plan section runs 0.85fr / 1.15fr, not 50/50. The
  mentor portraits are offset — every second one drops by 32px — so the grid
  reads as a hand-placed group rather than a table of faces.

## Elevation & Depth



Almost none, and one exception with a reason.

Structure comes from rules — a 1px ink rule at the top of each ledger, 1px
`line` rules between rows, a 1px `line` edge between sections — and from the
one hard change of ground where the azure hero field meets the page. The nav is
opaque `canvas` with a bottom rule. No shadow token, no blur, no glass.

**The exception is the sheet.** A modal task needs the page behind it to read
as *behind*, and Apple's rule for that is dim to focus and push back: a scrim
of `scrim` at 42% whose opacity tracks the sheet's position frame for frame,
and `main` scaled to 0.985 from its top edge while the sheet is up. The sheet
itself stays opaque `surface` with a hard top edge, true to the rest of the
page. Under `prefers-reduced-transparency` the scrim goes to 70%.

## Shapes


Square. A ledger has square corners, and so does everything else here: `sm 2px`
on focus rings, `md 4px` on buttons and inputs, and that is the whole scale. The
single `pill` is the admitted mark. There is no 8px, no 18px, no card radius,
because there are no cards.

The one photograph-shaped thing on the page is the logo.

## Components


Interactive minimum height is **48px** everywhere. Every focusable element takes
`focus-ring`. One button style (ink on light, ink on azure), one ghost.

### Signature components

**The hero field.** A flat `brand-bright` plane, the headline in `typography.hero`
spanning all twelve columns and balanced to two lines at desktop, then an aside
set off to the right — columns 7 to 12 — holding one short paragraph and one
button. The asymmetry is the point: nothing on this page is centred.

**The ledger.** A real `<table>` with a 1px ink rule on top, `caption`-sized
column heads in `ink-3`, and `line` rules between rows. Year in `ink-3`,
university at weight 500, programme light in `ink-2`, outcome as the `admit`
pill. It is used twice — the board and the session schedule — and both are the
same component. Below 760px the head row hides and each row stacks into a
block, keeping its bottom rule.

**The admit pill.** `gold` fill, `ink` text, 12px uppercase at +0.06em, 999px
radius. It is the only pill on the page and it means one thing.

**The masthead.** Mentors as a two-column definition list — school as the term,
programme and class year as the detail — with the same ink top rule and `line`
row rules as the ledger. When real names exist they go in the term. Until then
the list carries only what is true.

**The grade swipe.** The four-year plan as a track the user drives: four panels,
one per grade, that follow the finger 1:1, resist at the ends, and spring to
the grade a flick was heading for. The numerals above are real tabs — buttons —
whose weight (380→680) and colour (`ink-3`→`brand`) morph continuously with the
track's position, so the in-between frames point at the outcome. Arrow buttons,
arrow keys, Home and End all drive the same `go()`; a live region announces the
grade. Without JS it is an ordinary column. The numbers are permitted here — and
only here — because grades are an ordered sequence.

**The sheet.** Every ledger row is a control: the name is a real `<button>`, the
row is its hit area. It opens a bottom sheet on a native `<dialog>` — top layer,
inert page, Escape, focus return for free — with a grip, a kicker, a title, a
body, and one action. The sheet arrives on a ζ 0.82 spring, drags 1:1 from the
grip, the header or the top of the body, rubber-bands upward, and dismisses by
*direction*: a fast downward flick from anywhere, or a slow drag past the
midpoint. The action closes the sheet and pre-fills the register form with the
row's subject, which is the only thing a sheet on this page needs to do.

**The mark.** The original Kollege Klub logo, white field keyed out, 32px in the
nav, 44px in the footer, 28px on a phone. Do not redraw it or set the name in
type beside it.

## Motion



Two systems, kept apart on purpose.

**What the user does not touch** — arrivals and the hero — runs on GSAP 3.13
timelines and ScrollTriggers in `main.js`. Fixed durations are fine there
because nothing can interrupt them.

**What the user touches** — the grade swipe and the sheet — runs on springs in
`fluid.js`, because a tween with a duration cannot be grabbed mid-flight. This
is the Apple model of a fluid interface, and every one of its rules is
implemented, not approximated:

| Principle | Where it lives |
|---|---|
| Response on pointer-down | `:active` scale on every button; the track and the sheet start following on the first committed move |
| 1:1 tracking, grab offset respected | `grabX`/`grabY` captured on pointer-down; the element moves by the finger's delta, never to its position |
| Hysteresis, then dominant axis | 10px before anything commits; vertical intent on the track hands the gesture back to the page (`touch-action: pan-y`) |
| Interruptibility | A grab stops the running spring and continues from its live value and live velocity |
| Velocity handoff | The last six pointer samples give release velocity; it is passed straight into the spring |
| Momentum projection | `x + (v/1000)·0.998/(1−0.998)`, UIKit's decay, decides the target *before* the spring runs |
| Rubber-banding | `(o·d·0.55)/(d+0.55·|o|)` past either end of the track, and above the sheet's open position |
| Springs as damping + response | ζ 1.0 / 0.35s for a settle; ζ 0.82 only after a flick or for a sheet arriving |
| Direction decides dismissal | A sheet flicked down at >320px/s dismisses from anywhere; a slow drag needs the midpoint |
| Same path in and out | The sheet enters from the bottom and leaves to the bottom, inheriting the finger's velocity |
| Hint the outcome | Grade numerals morph weight 380→680 and colour `ink-3`→`brand` continuously with the track's position |
| Reduced motion | The swipe snaps; the sheet crossfades in place; the push-back is dropped |

The spring is a semi-implicit Euler integrator on `requestAnimationFrame`, about
thirty lines, with ω = 2π/response and c = 2ζω. No library was needed, and a
library would have hidden the one property that matters — that the integrator
can be stopped and restarted from any state.

**The GSAP layer, unchanged in spirit:**

| Where | What |
|---|---|
| Hero headline | SplitText lines, masked, `yPercent 118`, `expo.out`, 0.1 stagger |
| Hero aside | `y: 22` rise, 0.1 stagger, starting at `-=0.6` |
| Section headings | Masked line reveal, `once`, `top 86%` |
| Section notes | `y: 30`, `power3.out`, `once` |
| Ledger rows, masthead entries | One trigger each, `y: 16`, `top 94%` |
| Buttons | Magnetic follow at 0.28, pointer only |

Booted after `document.fonts.ready`; a frame watchdog reverts the layer if no
frames arrive in 1600ms; `prefers-reduced-motion` collapses to the finished
frame. The pinned scroll sequence is gone — the grade track replaced it, and a
gesture the user drives is a better fit for content the user is meant to page
through than a pin that holds the scroll hostage.

## Do's and Don'ts


### Do

- Put every list in a ledger or a masthead: 1px ink rule on top, `line` rules
  between rows, no box around it.
- Attach gold to an outcome or leave it out, and only ever as the `admit` pill.
- Put `ink` on `brand-bright`. It is the only fully readable pairing there.
- Use `line-3` for any border a user aims at; `line` and `line-2` are decorative.
- Keep the hero headline at `wdth 78 / wght 680` and everything else at full
  width. The contrast between those two settings is the typographic voice.
- Set the start state of a reveal from JS via `gsap.from()`; the stylesheet
  holds the finished frame.
- Give any new reveal a `data-` hook and let `main.js` pick it up by attribute.
- Give every new time-bound row a real `<time datetime>`.
- Put anything the user can drag on a spring in `fluid.js`, never on a GSAP
  tween or a CSS transition. If it can be grabbed, it must be interruptible.
- Decide a dismiss by velocity sign first and position second.
- Express an inactive control through weight and colour, never opacity below
  what clears 3:1.

### Don't

- Don't add a card. If something seems to need a box, it needs a rule.
- Don't add a badge, chip, eyebrow label, or a second pill. The admit pill is
  the only one.
- Don't add a stats row, a logo marquee, or a pair of buttons side by side.
- Don't add stock photography. The record is the imagery; real mentors get real
  portraits, and until then the masthead carries what is true.
- Don't add a shadow, a blur, a translucent bar, or a gradient.
- Don't add a radius above 4px to anything but the admit pill.
- Don't use `#75A5B8` for text or as a button fill. It measures 2.7:1 on canvas.
- Don't put white or `ink-2` on `brand-bright` (2.4:1 and 3.1:1).
- Don't reach for a dark section to create emphasis. This theme is light
  throughout; emphasis is one saturated plane.
- Don't centre anything. The aside sits in columns 7–12 for a reason.
- Don't animate `width`, `height`, `top` or `left`.
- Don't add a CSS transition to anything a per-frame setter writes; it is
  latency on the input path.
- Don't open a sheet for content that fits in the row. A sheet earns its place
  by carrying an action.
- Don't add a second sheet component or a modal that is not a sheet. Spatial
  consistency: everything modal on this page comes up from the bottom.

## Responsive Behavior


Breakpoints: `≥1001` twelve-column hero with the aside in columns 7–12;
`901–1000` aside widens to columns 5–12; `≤900` everything single-column;
`≤760` nav becomes two rows, tables stack, and the sheet goes full-width at
92svh.

- **The hero** holds two balanced lines at 96px on desktop, three at 48px on a
  phone. The field and the rule beneath it never change.
- **The ledger** is a real table down to 761px. Below that the head row hides
  and each row becomes a stacked block — year as a small label on top,
  outcome pill last — keeping its bottom rule. The next-session row keeps its
  tint via a 16px box-shadow, so its text stays aligned with every other row.
- **The grade swipe** is the same gesture at every width; the viewport takes
  the full column below 900px and the arrow buttons remain, so mouse users on
  a narrow window are not stranded.
- **The sheet** is 44rem wide on desktop, full width on a phone, and its
  footer clears the home indicator with `env(safe-area-inset-bottom)`.
- **The masthead** is two columns down to 901px, then one.
- **Nav:** below 760px the bar becomes two compact rows — mark, then a
  horizontally scrollable strip of five links that bleeds to the screen edges.
  Nothing hides behind a toggle.
- **Targets:** 48px minimum on every button and input; nav strip links are 37px,
  above the 24px floor.
- **Measured** at 375, 768, 880 and 1440: zero AA contrast failures, zero
  horizontal overflow, zero heading overflow, ledger rows uniform at 63px on
  desktop, no table wider than its container.

## Iteration Guide

**Adding a colour.** Only for a genuinely new semantic state, and only on hue
224.5 or 90.4. Hold the hue, vary lightness, ease chroma down as it darkens.
A colour off those two hues does not belong in this file.

**Adding a component.** Compose from existing tokens; if a literal is needed the
system is missing a token, so add the token first. Name states as separate
entries.

**Adding motion.** Ask what it reveals. A uniform entrance applied to every
section is the tell, not motion itself. And whatever you add, register its
hidden start state through the `hide()` helper in `main.js` so the watchdog can
undo it.

**Wiring the forms.** Set `FORM_ENDPOINT` at the top of `main.js`. Until it is
set, both forms validate and then tell the visitor to email — they never claim
to have sent something.

**Verifying a build.** Grep the compiled CSS for colour literals and compare
against `colors:`; anything unlisted is drift. Confirm `font-family` appears
once, as a variable.

Update this file in the same commit as the visual change.
