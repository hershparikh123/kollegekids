/* ==========================================================================
   Kollege Klub — motion & behaviour
   GSAP 3.13 + ScrollTrigger + SplitText.

   Three decisions this file is built around:

   1. The signature moment is the hero load sequence. One orchestrated
      timeline with real overlap. Everything else stays quiet: small
      once-only arrivals, nothing that re-fires.
   2. Gesture-driven motion lives in fluid.js, on springs, because a tween
      with a fixed duration cannot be grabbed mid-flight. This file only
      owns what the user does not touch.
   3. With motion off, or with no JS at all, the page is the finished frame.
      Every reveal is a gsap.from(), so the stylesheet always holds the
      visible resting state and nothing can be stranded at opacity 0.

   Everything animated lives inside gsap.matchMedia(), which gives the
   conditional logic and, more importantly, tears every tween and trigger
   back down when the conditions change.
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Set this to the URL that should receive form posts. Until it is set, the
   forms validate and then tell the visitor to email instead — they never
   pretend to have sent something. */
const FORM_ENDPOINT = '';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => gsap.utils.toArray(s, r);

/* ══ always-on. None of this depends on motion being allowed. ══════════ */

$('#year').textContent = new Date().getFullYear();

const nav = $('#nav');
const markStuck = () => { nav.dataset.stuck = String(window.scrollY > 8); };
addEventListener('scroll', markStuck, { passive: true });
markStuck();

/* ── forms ────────────────────────────────────────────────────────────── */

function wireForm(form) {
  if (!form) return;
  const msg = $('.form__msg', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstBad = null;

    for (const f of $$('input, select, textarea', form)) {
      const ok = f.checkValidity();
      f.setAttribute('aria-invalid', String(!ok));
      if (!ok && !firstBad) firstBad = f;
    }

    if (firstBad) {
      msg.textContent = 'Check the highlighted field.';
      firstBad.focus();
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(firstBad, { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
      return;
    }

    if (!FORM_ENDPOINT) {
      msg.textContent = 'Sending is not connected yet — email info@kollegeklub.info and it reaches the same people.';
      console.warn('[kollegeklub] FORM_ENDPOINT is empty in main.js; nothing was submitted.');
      return;
    }

    msg.textContent = 'Sending…';
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form) });
      msg.textContent = res.ok
        ? 'Got it. Someone will reply this week.'
        : 'That did not go through. Please email info@kollegeklub.info.';
      if (res.ok) form.reset();
    } catch {
      msg.textContent = 'Network error. Please email info@kollegeklub.info.';
    }
  });

  $$('input, select, textarea', form).forEach(f =>
    f.addEventListener('input', () => f.setAttribute('aria-invalid', 'false'))
  );
}

wireForm($('#contact'));
wireForm($('#notify'));

/* ══ the motion layer ═══════════════════════════════════════════════════ */

const mm = gsap.matchMedia();

/* SplitText measures line breaks, and line breaks depend on the loaded face.
   Split before Bricolage arrives and every heading is measured in the
   fallback, then jumps when the real font lands. So the whole motion layer
   waits for the font — raced against a timeout so a slow CDN cannot hold the
   page hostage. */
function initMotion() {
mm.add({
  motion:    '(prefers-reduced-motion: no-preference)',
  hoverable: '(hover: hover) and (pointer: fine)'
}, (ctx) => {
  const { motion, hoverable } = ctx.conditions;
  const splits = [];

  /* ── reduced motion: collapse to the finished frame and stop ────────── */
  if (!motion) {
    gsap.set('[data-reveal], [data-reveal-each] tbody > tr, [data-reveal-each] > div', {
      clearProps: 'all', autoAlpha: 1, y: 0
    });
    return;
  }

  /* ── 1. the signature: hero load sequence ───────────────────────────── */

  const heroSplit = new SplitText('[data-split="hero"]', {
    type: 'lines', linesClass: 'line', mask: 'lines'
  });
  splits.push(heroSplit);

  gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
    .from(heroSplit.lines, {
      yPercent: 118, duration: 1.05, ease: 'expo.out', stagger: { each: 0.1 }
    })
    .from('.hero__aside > *', { y: 22, autoAlpha: 0, stagger: 0.1 }, '-=0.6');

  /* ── 2. section headings: the same masked reveal, held back ─────────── */

  $$('[data-split]:not([data-split="hero"])').forEach(el => {
    const s = new SplitText(el, { type: 'lines', linesClass: 'line', mask: 'lines' });
    splits.push(s);
    gsap.from(s.lines, {
      yPercent: 112, duration: 0.9, ease: 'expo.out', stagger: { each: 0.08 },
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  /* ── 3. quiet arrivals. Short distance: 30px reads as arriving, 100px
         reads as a slot machine on a page this long. ──────────────────── */

  $$('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 30, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  /* Ledger rows and masthead entries get a trigger each, so the tenth row
     is not animating while it is still three screens below the fold. */
  $$('[data-reveal-each]').forEach(list => {
    const items = list.matches('table') ? $$('tbody > tr', list) : gsap.utils.toArray(list.children);
    items.forEach(el => {
      gsap.from(el, {
        y: 16, autoAlpha: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 94%', once: true }
      });
    });
  });

  /* ── 4. magnetic buttons. Pointer only, and never the sole affordance:
         every one of these is a plain link or button underneath. ──────── */

  if (hoverable) {
    $$('[data-magnet]').forEach(btn => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3' });
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
      };
      const reset = () => { xTo(0); yTo(0); };
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerleave', reset);
      btn.addEventListener('blur', reset);
    });
  }

  /* ── cleanup. matchMedia reverts the tweens and triggers on its own;
         SplitText instances have to be told. ──────────────────────────── */
  return () => splits.forEach(s => s.revert());
});
}

/* ══ the watchdog ═══════════════════════════════════════════════════════
      A gsap.from() renders its start state the moment it is created, so
      every reveal on this page is parked out of view before its trigger
      fires. That is correct while frames are running and a blank section
      when they are not — a background tab, a headless screenshotter, a
      device throttling rAF. Count frames; if none arrive, hand the whole
      motion layer back. mm.revert() restores every inline style GSAP set,
      kills its ScrollTriggers and un-splits the headings, which leaves the
      page in exactly the resting state the stylesheet describes. ════════ */

function armWatchdog() {
  let frames = 0;
  const countFrame = () => { frames++; if (frames < 4) requestAnimationFrame(countFrame); };
  requestAnimationFrame(countFrame);

  setTimeout(() => {
    if (frames >= 3) return;
    console.warn('[kollegeklub] no frames in 1600ms — reverting motion so the page stays readable.');
    mm.revert();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }, 1600);
}

/* ══ boot ═══════════════════════════════════════════════════════════════ */

Promise.race([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 1500))
]).then(() => {
  initMotion();
  armWatchdog();
  ScrollTrigger.refresh();
});

/* Start and end positions are cached, and images can still land after the
   first measurement. */
addEventListener('load', () => ScrollTrigger.refresh());

/* iOS fires resize continuously as the address bar hides, which would
   thrash the trigger positions mid-scroll. Only react to a real width
   change, and debounce it. (GSAP has no utils.debounce — this is ours.) */
const debounce = (fn, wait) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
};

let lastWidth = innerWidth;
addEventListener('resize', debounce(() => {
  if (innerWidth === lastWidth) return;
  lastWidth = innerWidth;
  ScrollTrigger.refresh();
}, 250));
