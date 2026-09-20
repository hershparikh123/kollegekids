# Kollege Klub

A static rebuild of kollegeklub.info. Three files, no build step, no framework.

```
index.html     markup and copy
styles.css     the whole design system as CSS custom properties
main.js        arrivals and the hero (GSAP 3.13 from a CDN)
fluid.js       the grade swipe and the sheet: springs, gestures, no library
logo.png       the original mark, white field keyed out to transparency
favicon.svg
preview.html   the same page without the html/head/body wrappers, for publishing as an artifact
DESIGN.md      the design system, its reasoning, and the rules for extending it
```

There are no photographs. The record of admissions is the imagery, and the
mentor list carries only what is true until real people can be named.

Motion is GSAP 3.13 with ScrollTrigger and SplitText, loaded from cdnjs. Effects
are applied by `data-` attribute — `data-split`, `data-reveal`,
`data-reveal-each`, `data-magnet`, `data-stage` — so adding motion to new markup
means adding an attribute, not editing `main.js`.

## Running it

Any static server. From this folder:

```bash
npx --yes serve -l 4350 .
```

Then open `http://localhost:4350`. There is nothing to compile, so deployment is
a file copy to Netlify, Cloudflare Pages, GitHub Pages, or an S3 bucket.

## Before this goes live

Four things are deliberately unfinished, because finishing them requires
information I did not have. Each is marked with a comment in the source.

1. **Wire the forms.** Set `FORM_ENDPOINT` at the top of `main.js` to whatever
   will receive the posts (a Formspree/Basin URL, a Cloudflare Worker, your own
   handler). Until it is set, both forms validate and then tell the visitor to
   email `info@kollegeklub.info` instead. They never claim to have sent
   something that went nowhere.

2. **Replace the board data.** The ten rows in `#board` describe where the
   *mentors* were admitted, which is the claim the business actually makes. They
   are currently drawn from the universities named on the old site. Swap them
   for verified records, and keep the stats row consistent with the rows
   beneath it. Do not present them as client outcomes.

3. **Name the mentors.** The masthead in `#mentors` lists school and programme
   only, because that is all that is verifiable right now. When real people
   agree to be listed, their name goes in the `<dt>` and the school moves to the
   `<dd>`. Do not add stock portraits in the meantime.

   `logo.png` is the original Kollege Klub mark, trimmed and with its white
   field keyed out to transparency so it sits on any ground. If you ever need to
   regenerate it, start from the source PNG rather than re-keying this one.

4. **Schedule a session.** The first row of the schedule in `#sessions` is an
   honest "date being confirmed" state, because the only dated event on the old
   site was sold out in May 2025. When a session is booked, put a real
   `<time datetime="…">` in that row's first cell and keep the `is-next` class
   on it.

## Editing it

Read `DESIGN.md` first, particularly **Do's and Don'ts** and the **typography
contract**. The short version:

- The theme is **light throughout**. There is no dark section anywhere, and
  emphasis comes from saturation rather than from going dark.
- Every colour is derived in OKLCH from the two hues that exist in the logo:
  224.5 (the blue) and 90.4 (the gold). Do not add a colour off those hues.
- Gold means *admitted*. On a light ground it can only ever be a fill carrying
  ink (8.6:1); as text it is 1.7:1 and unusable.
- `brand-bright` (#2EB4DF) carries `ink`, never white.
- One typeface. Build hierarchy from Bricolage Grotesque's width and weight
  axes, never by adding a second family.
- No cards, no badges, no chips, no stats rows, no marquees, no stock
  photography, no gradients, no shadows. Every list is a ruled table or
  definition list. If something seems to need a box, it needs a rule.
- Square corners. 4px on controls, 999px on the one admit pill, nothing else.
- Never set a reveal's hidden start state in CSS. Use `gsap.from()` so the
  stylesheet holds the finished frame; a script failure then leaves a complete
  page rather than a blank one.
- Everything animated goes inside the `gsap.matchMedia()` block, which is what
  gives both the conditional logic and the teardown.
- Anything the user drags lives in `fluid.js` on a spring. Never a GSAP tween,
  never a CSS transition — those cannot be grabbed mid-flight. The physics
  values (damping, response, projection rate, rubber-band constant) are in
  DESIGN.md under `motion:`.

## Verifying a change

```bash
python <design-md-skill>/scripts/validate_design_md.py DESIGN.md --strict
```

That resolves every token reference, checks the palette, and computes contrast.
It should stay clean.

## Notes on the browser work

- Measured on the built page: zero WCAG AA contrast failures at 375, 768, 880
  and 1440px; the tightest small-text pair is 4.81:1 against a 4.5 requirement.
- No horizontal overflow at any of those widths, and no heading overflows its
  container.
- The four-year plan is a swipe: 1:1 tracking, rubber-banding at the ends,
  momentum projection, velocity handoff into a spring, interruptible mid-flight,
  keyboard and button equivalents, live region. Without JS it is a column.
- Ledger rows open a bottom sheet on a native `<dialog>`: spring open, drag to
  dismiss by velocity, Escape, focus return, scrim tracking the drag.
- A frame watchdog reverts the entire motion layer if the renderer produces no
  frames within 1600ms, so a background tab or a headless screenshotter gets the
  finished page rather than empty sections.
- `prefers-reduced-motion`, `prefers-reduced-transparency` and
  `prefers-contrast: more` all have real branches, not just a disabled
  animation.
