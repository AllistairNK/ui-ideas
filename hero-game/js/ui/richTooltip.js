// A hover tooltip that renders HTML (colored spans, etc.), unlike the
// CSS-only `[data-tooltip]::after` pattern elsewhere which is limited to
// plain text via attr(). One shared floating element, positioned per-target
// on hover/focus.
//
// Items can opt into a decorative FX theme via their `effect` field in
// items.js (independent of tier/rarity -- an item's tier is about power, its
// effect is purely visual, so e.g. a future fire-enchanted item could use a
// "fire" effect regardless of what tier it is). The FX layers themselves
// (sparkle dust, starfield, rings) are built once as part of the tooltip
// shell, not regenerated per-hover, and just shown/hidden via an `fx-<name>`
// class on the outer element -- driven entirely by CSS animations so there's
// no per-frame JS cost. Add a new effect by adding its name here and its
// `.fx-<name>` rules in style.css.
const KNOWN_EFFECTS = ['goldSparkle', 'voidGlitter'];

let tooltipEl = null;
let contentEl = null;

const SPARKLE_COUNT = 6;
const STAR_COUNT = 6;

function ensureTooltipEl() {
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'rich-tooltip hidden';

  const sparkles = Array.from({ length: SPARKLE_COUNT }, () => '<span class="rt-sparkle"></span>').join('');
  const stars = Array.from({ length: STAR_COUNT }, () => '<span class="rt-star"></span>').join('');

  tooltipEl.innerHTML = `
    <div class="rt-fx rt-fx-sparkles">${sparkles}</div>
    <div class="rt-fx rt-fx-stars">${stars}</div>
    <div class="rt-fx rt-fx-rings"><span class="rt-ring"></span><span class="rt-ring rt-ring-b"></span></div>
    <div class="rt-content"></div>
  `;
  contentEl = tooltipEl.querySelector('.rt-content');
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

function showTooltip(target) {
  const el = ensureTooltipEl();
  contentEl.innerHTML = target.dataset.richTooltip || '';
  el.classList.remove('hidden', ...KNOWN_EFFECTS.map((name) => `fx-${name}`));
  const effect = target.dataset.tooltipEffect;
  if (effect && KNOWN_EFFECTS.includes(effect)) el.classList.add(`fx-${effect}`);

  const rect = target.getBoundingClientRect();
  const tipRect = el.getBoundingClientRect();
  const left = Math.min(
    Math.max(8, rect.left + rect.width / 2 - tipRect.width / 2),
    window.innerWidth - tipRect.width - 8
  );
  const top = rect.top - tipRect.height - 9;
  el.style.left = `${left + window.scrollX}px`;
  el.style.top = `${(top < 0 ? rect.bottom + 9 : top) + window.scrollY}px`;
}

function hideTooltip() {
  if (tooltipEl) tooltipEl.classList.add('hidden');
}

// Delegates hover/focus on any `[data-rich-tooltip]` descendant of `root`.
// Safe to call on every re-render even though `root` itself persists across
// them (only its children get replaced) -- guarded so listeners attach once.
export function attachRichTooltips(root) {
  if (root._richTooltipsAttached) return;
  root._richTooltipsAttached = true;

  root.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-rich-tooltip]');
    if (target) showTooltip(target);
  });
  root.addEventListener('mouseout', (e) => {
    if (e.target.closest('[data-rich-tooltip]')) hideTooltip();
  });
  root.addEventListener('focusin', (e) => {
    const target = e.target.closest('[data-rich-tooltip]');
    if (target) showTooltip(target);
  });
  root.addEventListener('focusout', (e) => {
    if (e.target.closest('[data-rich-tooltip]')) hideTooltip();
  });
}
