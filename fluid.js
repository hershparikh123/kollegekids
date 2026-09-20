/* ==========================================================================
   Kollege Klub — fluid interactions
   The grade swipe and the bottom sheet, built on one small physics core.

   What "fluid" means here, in Apple's terms:
   · Response — feedback on pointer-down, and 1:1 with the finger the whole
     way through a drag. Nothing waits for release to move.
   · Interruptibility — every spring can be grabbed mid-flight. A grab reads
     the live on-screen value and the live velocity, and continues from there.
   · Velocity handoff — a release hands the finger's exact velocity to the
     spring, so there is no seam between dragging and animating.
   · Momentum projection — a flick lands where it was going, not where it was
     let go. Apple's own decay projection, not the textbook one.
   · Rubber-banding — edges resist progressively rather than stopping dead.
   · Springs, described the way Apple describes them: a damping ratio and a
     response time, not mass / stiffness / damping.

   No library. The spring is a semi-implicit Euler integrator on rAF, which
   is all a UI spring needs and is exactly what makes it interruptible.
   ========================================================================== */

(() => {
  'use strict';

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ══ physics ═══════════════════════════════════════════════════════════ */

  /* Damping ratio ζ and response T (seconds) → a running spring.
     ζ = 1 settles with no overshoot; ζ ≈ 0.8 overshoots a little, which is
     right only after a gesture that carried momentum. */
  function spring(from, to, velocity, { damping = 1, response = 0.35, onUpdate, onComplete } = {}) {
    const omega = (2 * Math.PI) / response;
    const k = omega * omega;
    const c = 2 * damping * omega;
    let x = from, v = velocity, last = performance.now(), raf = 0, done = false;

    const tick = (now) => {
      const dt = Math.min(0.064, (now - last) / 1000) || 0.016;
      last = now;
      const a = -k * (x - to) - c * v;
      v += a * dt;
      x += v * dt;
      if (Math.abs(v) < 1 && Math.abs(x - to) < 0.1) {   /* sub-pixel: done */
        x = to; v = 0; done = true;
        onUpdate && onUpdate(x, v);
        onComplete && onComplete();
        return;
      }
      onUpdate && onUpdate(x, v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return {
      get x() { return x; },
      get v() { return v; },
      get done() { return done; },
      stop() { cancelAnimationFrame(raf); done = true; }
    };
  }

  /* Where a flick would come to rest. Exponential decay, as UIKit does it. */
  const project = (velocity, rate = 0.998) => (velocity / 1000) * rate / (1 - rate);

  /* The further past the edge, the less the element follows. */
  const rubberband = (overshoot, dimension, constant = 0.55) =>
    (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

  /* Capture can throw if the pointer went away between events. Losing capture
     is recoverable; an uncaught error inside a move handler is not. */
  const capture = (el, e) => { try { el.setPointerCapture(e.pointerId); } catch (_) {} };

  /* Velocity from the last few pointer samples, not the last two. */
  class VelocityTracker {
    constructor() { this.samples = []; }
    reset() { this.samples.length = 0; }
    push(value, t = performance.now()) {
      this.samples.push({ value, t });
      while (this.samples.length > 6) this.samples.shift();
    }
    velocity() {
      const s = this.samples;
      if (s.length < 2) return 0;
      const a = s[0], b = s[s.length - 1];
      const dt = (b.t - a.t) / 1000;
      if (dt < 0.004) return 0;
      // ignore a stale sample: if the finger paused before release, it is a drop, not a flick
      if (performance.now() - b.t > 80) return 0;
      return (b.value - a.value) / dt;
    }
  }

  /* ══ the grade swipe ═══════════════════════════════════════════════════ */

  function gradeSwipe(root) {
    const viewport = $('.swipe__viewport', root);
    const track    = $('.swipe__track', root);
    const panels   = $$('.step', track);
    const nums     = $$('.grade__n', root);
    const bar      = $('.pin__bar i', root);
    const prev     = $('[data-swipe-prev]', root);
    const next     = $('[data-swipe-next]', root);
    const live     = $('[data-swipe-live]', root);
    const count    = panels.length;
    if (!viewport || !track || count < 2) return;

    root.dataset.swipe = 'on';

    let width = viewport.clientWidth;
    let index = 0;          // committed panel
    let x = 0;              // presentation value, px, 0 … -(count-1)*width
    let anim = null;        // running spring, if any
    const tracker = new VelocityTracker();

    const clampIndex = (i) => Math.max(0, Math.min(count - 1, i));
    const minX = () => -(count - 1) * width;

    /* One render path for everything: drag, spring, keyboard, resize. The
       numerals and the bar read the same continuous progress the track does,
       so the intermediate frames point at where the gesture is going. */
    function render() {
      const p = Math.max(-0.5, Math.min(count - 0.5, -x / width));
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      nums.forEach((n, i) => {
        const d = Math.min(1, Math.abs(i - p));
        /* weight and colour carry "inactive", never opacity: both ends of the
           mix clear 3:1 on the band, and the weight morphs with the swipe */
        n.style.fontVariationSettings = `"wdth" 78, "wght" ${Math.round(680 - 300 * d)}`;
        n.style.color = `color-mix(in oklch, var(--brand) ${Math.round((1 - d) * 100)}%, var(--ink-3))`;
        n.style.transform = `translate3d(0, ${d * 6}%, 0)`;
      });
      if (bar) bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p / (count - 1)))})`;
    }

    function settle(target, velocity, { damping }) {
      anim && anim.stop();
      const to = -target * width;
      if (reducedMotion) {
        x = to; anim = null; render(); announce();
        return;
      }
      anim = spring(x, to, velocity, {
        damping, response: 0.38,
        onUpdate: (val) => { x = val; render(); },
        onComplete: () => { anim = null; announce(); }
      });
    }

    function go(target, { velocity = 0, flick = false } = {}) {
      index = clampIndex(target);
      panels.forEach((p, i) => p.setAttribute('aria-hidden', i === index ? 'false' : 'true'));
      nums.forEach((n, i) => n.setAttribute('aria-current', i === index ? 'true' : 'false'));
      prev.disabled = index === 0;
      next.disabled = index === count - 1;
      settle(index, velocity, { damping: flick ? 0.82 : 1 });
    }

    function announce() {
      if (live) live.textContent = `Grade ${panels[index].dataset.grade}, ${index + 1} of ${count}`;
    }

    /* ── the gesture ──────────────────────────────────────────────────── */

    let pointerId = null, startX = 0, startY = 0, grabX = 0, axis = null;

    viewport.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX; startY = e.clientY;
      axis = null;
      /* A grab is an interruption: take the live value and the live velocity,
         and stop the spring where it is rather than where it was going. */
      const v0 = anim ? anim.v : 0;
      anim && anim.stop(); anim = null;
      grabX = x;
      tracker.reset();
      tracker.push(x);
      viewport.classList.add('is-grabbed');
      void v0;
    });

    viewport.addEventListener('pointermove', (e) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;

      /* Hysteresis: nothing commits until the finger has moved ~10px, and
         then the dominant axis wins. Vertical hands the gesture back to the
         page so scrolling through the section still works. */
      if (!axis) {
        if (Math.hypot(dx, dy) < 10) return;
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (axis === 'y') { pointerId = null; viewport.classList.remove('is-grabbed'); return; }
        capture(viewport, e);
      }
      if (axis !== 'x') return;

      let nx = grabX + dx;
      if (nx > 0)        nx = rubberband(nx, width);
      if (nx < minX())   nx = minX() + rubberband(nx - minX(), width);
      x = nx;
      tracker.push(x);
      render();
    });

    const release = (e) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      viewport.classList.remove('is-grabbed');
      if (axis !== 'x') return;

      const v = tracker.velocity();                 // px/s, sign = direction
      const projected = x + project(v);             // where the flick would stop
      let target = Math.round(-projected / width);  // nearest panel to that point
      /* A decisive flick moves at least one panel, even from a short drag. */
      if (Math.abs(v) > 350) target = index + (v < 0 ? 1 : -1);
      go(target, { velocity: v, flick: Math.abs(v) > 350 });
    };
    viewport.addEventListener('pointerup', release);
    viewport.addEventListener('pointercancel', release);

    /* ── other inputs: keys, buttons, numerals ────────────────────────── */

    prev.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));
    nums.forEach((n, i) => n.addEventListener('click', () => go(i)));

    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(index - 1); }
      if (e.key === 'Home')       { e.preventDefault(); go(0); }
      if (e.key === 'End')        { e.preventDefault(); go(count - 1); }
    });

    /* Resize: keep the committed panel, rebuild the geometry. */
    let lastW = viewport.clientWidth;
    new ResizeObserver(() => {
      const w = viewport.clientWidth;
      if (!w || w === lastW) return;
      lastW = width = w;
      anim && anim.stop(); anim = null;
      x = -index * width;
      render();
    }).observe(viewport);

    go(0);
    render();
  }

  /* ══ the sheet ═════════════════════════════════════════════════════════ */

  function sheet() {
    const dialog = $('#sheet');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const panel  = $('.sheet__panel', dialog);
    const grip   = $('.sheet__grip', dialog);
    const body   = $('.sheet__body', dialog);
    const title  = $('.sheet__title', dialog);
    const kicker = $('.sheet__kicker', dialog);
    const close  = $('.sheet__close', dialog);
    const tracker = new VelocityTracker();

    let y = 0;              // presentation value: 0 = open, height = dismissed
    let height = 0;
    let anim = null;
    let opener = null;
    let open = false;

    const render = () => {
      panel.style.transform = `translate3d(0, ${y}px, 0)`;
      const t = Math.max(0, Math.min(1, 1 - y / (height || 1)));
      dialog.style.setProperty('--sheet-t', t.toFixed(4));
    };

    function measure() { height = panel.offsetHeight; }

    function show(content, from) {
      opener = from || document.activeElement;
      fill(content);
      anim && anim.stop(); anim = null;
      dialog.showModal();
      document.documentElement.classList.add('is-sheet-open');
      open = true;
      body.scrollTop = 0;
      measure();
      if (reducedMotion) { y = 0; render(); return; }
      y = height; render();
      /* A sheet arrives with a little overshoot, because it is a physical
         object sliding up, not a panel fading in. */
      anim = spring(y, 0, 0, { damping: 0.82, response: 0.32,
        onUpdate: (val) => { y = val; render(); },
        onComplete: () => { anim = null; } });
    }

    function hide(velocity = 0) {
      if (!open) return;
      open = false;
      document.documentElement.classList.remove('is-sheet-open');
      anim && anim.stop();
      let finished = false;
      const finish = () => { if (finished) return; finished = true; anim = null; dialog.close(); y = 0; render(); };
      if (reducedMotion) { finish(); return; }
      /* if frames stall, the sheet must still go away */
      setTimeout(finish, 900);
      /* Exit along the same path it entered, and inherit the finger's speed. */
      anim = spring(y, height, velocity, { damping: 1, response: 0.3,
        onUpdate: (val) => { y = val; render(); },
        onComplete: finish });
    }

    function fill({ kick, head, html, action }) {
      kicker.textContent = kick || '';
      title.textContent = head || '';
      body.innerHTML = html || '';
      const act = $('.sheet__action', dialog);
      if (action) {
        act.hidden = false;
        act.textContent = action.label;
        act.onclick = () => { hide(); action.run(); };
      } else {
        act.hidden = true; act.onclick = null;
      }
    }

    /* ── drag to dismiss ─────────────────────────────────────────────── */

    let pointerId = null, startY = 0, grabY = 0, dragging = false, fromBody = false;

    const down = (e) => {
      if (e.button !== 0) return;
      fromBody = e.currentTarget === body;
      /* Inside the scrolling body, a drag only becomes a sheet drag when the
         body is already at the top; otherwise it is a scroll. */
      if (fromBody && body.scrollTop > 0) return;
      pointerId = e.pointerId; startY = e.clientY; dragging = false;
      const v0 = anim ? anim.v : 0;
      anim && anim.stop(); anim = null;             // grab mid-flight, keep the live value
      grabY = y;
      tracker.reset(); tracker.push(y);
      void v0;
    };
    const move = (e) => {
      if (e.pointerId !== pointerId) return;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dy) < 10) return;
        if (fromBody && dy < 0) { pointerId = null; return; }   // scrolling up in the body
        dragging = true;
        capture(e.currentTarget, e);
        panel.classList.add('is-grabbed');
      }
      let ny = grabY + dy;
      if (ny < 0) ny = rubberband(ny, height);       // pulling up past open: resist
      y = ny; tracker.push(y); render();
      if (fromBody) e.preventDefault();
    };
    const up = (e) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      panel.classList.remove('is-grabbed');
      if (!dragging) return;
      dragging = false;
      const v = tracker.velocity();
      const projected = y + project(v);
      /* Direction decides, not position: a fast downward flick dismisses
         from anywhere; a slow drag dismisses only past the midpoint. */
      const dismiss = v > 320 || (projected > height * 0.5 && v > -120);
      if (dismiss) hide(Math.max(v, 0));
      else {
        anim = spring(y, 0, v, { damping: Math.abs(v) > 320 ? 0.82 : 1, response: 0.34,
          onUpdate: (val) => { y = val; render(); },
          onComplete: () => { anim = null; } });
      }
    };
    [grip, $('.sheet__head', dialog), body].forEach(el => {
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });

    /* ── the ordinary ways out ──────────────────────────────────────── */

    close.addEventListener('click', () => hide());
    dialog.addEventListener('cancel', (e) => { e.preventDefault(); hide(); });   // Escape
    dialog.addEventListener('click', (e) => { if (e.target === dialog) hide(); }); // scrim
    dialog.addEventListener('close', () => { if (opener && opener.focus) opener.focus(); });

    new ResizeObserver(() => { if (open && !anim) { measure(); render(); } }).observe(panel);

    return { show, hide };
  }

  /* ══ wiring the sheet to the ledgers ═══════════════════════════════════ */

  function escape(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function prefillRegister(subject) {
    const form = $('#contact');
    const subj = $('#f-subject');
    const msg  = $('#f-msg');
    if (!form) return;
    if (subj) subj.value = subject;
    form.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => (msg || subj) && (msg || subj).focus({ preventScroll: true }), reducedMotion ? 0 : 450);
  }

  function wireLedgers(sh) {
    $$('#board tbody tr').forEach(tr => {
      const [yr, uni, prog] = $$('td', tr).map(td => td.textContent.trim());
      const btn = $('button', tr);
      const openIt = () => sh.show({
        kick: `${yr} · Admitted`,
        head: uni,
        html: `<p class="sheet__lede">${escape(prog)}</p>
               <p>A mentor who was admitted here in ${escape(yr)}, for ${escape(prog)}. Sessions with
               them cover the course sequence they took, the two or three commitments that
               mattered, and the application itself, line by line.</p>`,
        action: { label: 'Ask about this path', run: () => prefillRegister(`Path: ${uni}, ${prog}`) }
      }, btn);
      btn && btn.addEventListener('click', openIt);
      tr.addEventListener('click', (e) => { if (!e.target.closest('button, a')) openIt(); });
    });

    $$('#sessions tbody tr').forEach(tr => {
      const cells = $$('td', tr);
      const when = cells[0].textContent.trim();
      const btn  = $('button', tr);
      const head = btn ? btn.textContent.trim() : '';
      const sub  = $('.ledger__sub', tr);
      const seats = cells[2] ? cells[2].textContent.trim() : '';
      const isNext = tr.classList.contains('is-next');
      const openIt = () => sh.show({
        kick: `${when} · ${seats}`,
        head,
        html: sub ? `<p class="sheet__lede">${escape(sub.textContent.trim())}</p>` : '',
        action: isNext
          ? { label: 'Tell me the date', run: () => { const i = $('#notify-email'); i && i.focus(); i && i.scrollIntoView({ block: 'center' }); } }
          : { label: 'Ask for the recording', run: () => prefillRegister(`Recording: ${head}`) }
      }, btn);
      btn && btn.addEventListener('click', openIt);
      tr.addEventListener('click', (e) => { if (!e.target.closest('button, a, form, input')) openIt(); });
    });
  }

  /* ══ boot ═════════════════════════════════════════════════════════════ */

  const start = () => {
    const stage = $('[data-stage]');
    if (stage) gradeSwipe(stage);
    const sh = sheet();
    if (sh) wireLedgers(sh);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
