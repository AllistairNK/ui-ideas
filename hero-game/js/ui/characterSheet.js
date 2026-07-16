import { CLASSES } from '../data/classes.js';
import { HIDDEN_TRAITS } from '../data/traits.js';
import { ACTIVITIES } from '../data/activities.js';
import { getActivityRates, currentStaminaRatePerSec } from '../core/activityEngine.js';

// Attributes and gold accumulate in fractional amounts every tick now (see
// activityEngine.js's continuous rates) -- showing the decimal makes that
// growth visible bit by bit instead of only jumping once a whole point
// finishes accumulating.
function formatNumber(v) {
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
}

function formatRate(perSec, unit) {
  if (Math.abs(perSec) < 0.001) return '';
  const sign = perSec > 0 ? '+' : '';
  return `${sign}${perSec.toFixed(2)}/${unit}`;
}

function pct(value, max) {
  if (!max) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

// Bundles the numbers that change every tick (bars, attributes, gold, and
// their rate badges) -- computed once and shared by the full render and the
// lightweight live-patch below so they can't drift out of sync.
function computeLiveNumbers(character) {
  const d = character.derived;
  const currentActivity = character.activity ? ACTIVITIES[character.activity.id] : null;
  const activityRates = currentActivity && currentActivity.durationSeconds > 0 ? getActivityRates(currentActivity) : null;
  const staminaRate = currentStaminaRatePerSec(character);
  const goldRate = activityRates ? activityRates.goldPerSec - activityRates.goldCostPerSec : 0;

  const attrRates = {};
  for (const attr of Object.keys(character.attributes)) {
    attrRates[attr] = activityRates && activityRates.attributeRatesPerSec[attr]
      ? activityRates.attributeRatesPerSec[attr] * 60
      : 0;
  }

  return {
    hpPct: pct(d.hp, d.maxHp), hpText: `${Math.round(d.hp)}/${d.maxHp}`,
    staminaPct: pct(d.stamina, d.maxStamina), staminaText: `${Math.round(d.stamina)}/${d.maxStamina}`,
    staminaRate, staminaRateText: formatRate(staminaRate, 's'),
    xpPct: pct(character.xp, character.xpToNext), xpText: `${Math.round(character.xp)}/${character.xpToNext}`,
    attrRates,
    goldText: formatNumber(character.currency.gold),
    goldRate, goldRateText: formatRate(goldRate, 's')
  };
}

export function renderCharacterSheet(character) {
  const root = document.getElementById('characterSheet');
  if (!root) return;
  const d = character.derived;
  const classDef = CLASSES[character.class];
  const n = computeLiveNumbers(character);

  root.innerHTML = `
    <div class="panel-title">${character.name}</div>
    <div class="sheet-sub">${classDef.name} &middot; Level ${character.level}</div>
    <div class="sheet-flavor">${character.backgroundFlavor}</div>

    <div class="bar-row">
      <span class="bar-label">HP</span>
      <div class="bar"><div class="bar-fill bar-hp" id="sheetHpFill" style="width:${n.hpPct}%"></div></div>
      <span class="bar-value" id="sheetHpValue">${n.hpText}</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">Stamina</span>
      <div class="bar"><div class="bar-fill bar-stamina" id="sheetStaminaFill" style="width:${n.staminaPct}%"></div></div>
      <span class="bar-value" id="sheetStaminaValue">${n.staminaText}</span>
      <span class="rate-badge ${n.staminaRate >= 0 ? 'rate-positive' : 'rate-negative'}" id="sheetStaminaRate">${n.staminaRateText}</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">XP</span>
      <div class="bar"><div class="bar-fill bar-xp" id="sheetXpFill" style="width:${n.xpPct}%"></div></div>
      <span class="bar-value" id="sheetXpValue">${n.xpText}</span>
    </div>

    <div class="attr-grid">
      ${Object.entries(character.attributes).map(([k, v]) => `
        <div class="attr-cell" data-attr="${k}">
          <span class="attr-name">${k}</span>
          <span class="attr-value">${formatNumber(v)}</span>
          <span class="rate-badge rate-positive">${formatRate(n.attrRates[k], 'min')}</span>
        </div>`).join('')}
    </div>

    <div class="derived-grid">
      <div>ATK <b>${d.attack}</b></div>
      <div>DEF <b>${d.defense}</b></div>
      <div>MAG <b>${d.magicPower}</b></div>
      <div>CRIT <b>${d.critChance}%</b></div>
    </div>

    <div class="gold-row">Gold: <b id="sheetGoldValue">${n.goldText}</b> <span class="rate-badge rate-positive" id="sheetGoldRate">${n.goldRateText}</span></div>

    ${renderTraitsRow(character)}
  `;
}

// Patches just the numbers that change every second -- called on the ~1s
// tick instead of renderCharacterSheet() so elements that aren't changing
// (trait chips, name, flavor text) are never destroyed/recreated. That
// matters because recreating a hovered [data-tooltip] element restarts its
// CSS enter animation, which read as the tooltip "blinking" every tick.
export function updateCharacterSheetLive(character) {
  const root = document.getElementById('characterSheet');
  if (!root) return;
  const n = computeLiveNumbers(character);

  const setBar = (fillId, valueId, p, text) => {
    const fillEl = root.querySelector(`#${fillId}`);
    const valueEl = root.querySelector(`#${valueId}`);
    if (fillEl) fillEl.style.width = `${p}%`;
    if (valueEl) valueEl.textContent = text;
  };
  setBar('sheetHpFill', 'sheetHpValue', n.hpPct, n.hpText);
  setBar('sheetStaminaFill', 'sheetStaminaValue', n.staminaPct, n.staminaText);
  setBar('sheetXpFill', 'sheetXpValue', n.xpPct, n.xpText);

  const staminaRateEl = root.querySelector('#sheetStaminaRate');
  if (staminaRateEl) {
    staminaRateEl.textContent = n.staminaRateText;
    staminaRateEl.classList.toggle('rate-positive', n.staminaRate >= 0);
    staminaRateEl.classList.toggle('rate-negative', n.staminaRate < 0);
  }

  root.querySelectorAll('.attr-cell').forEach((cell) => {
    const attr = cell.dataset.attr;
    const valueEl = cell.querySelector('.attr-value');
    const rateEl = cell.querySelector('.rate-badge');
    if (valueEl) valueEl.textContent = formatNumber(character.attributes[attr]);
    if (rateEl) rateEl.textContent = formatRate(n.attrRates[attr], 'min');
  });

  const goldValueEl = root.querySelector('#sheetGoldValue');
  if (goldValueEl) goldValueEl.textContent = n.goldText;
  const goldRateEl = root.querySelector('#sheetGoldRate');
  if (goldRateEl) goldRateEl.textContent = n.goldRateText;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function renderTraitsRow(character) {
  const traits = character.traits || [];
  if (!traits.length) return '';

  const discovered = traits.filter((t) => t.discovered);
  const hiddenCount = traits.length - discovered.length;

  const chips = discovered.map((t) => {
    const def = HIDDEN_TRAITS[t.id];
    if (!def) return '';
    return `<span class="trait-chip" tabindex="0" data-tooltip="${escapeAttr(def.flavor)}">${def.name}</span>`;
  }).join('');

  const hiddenChip = hiddenCount > 0
    ? `<span class="trait-chip trait-chip-hidden" tabindex="0" data-tooltip="A trait you possess but haven't discovered yet. Keep playing to reveal it.">? ${hiddenCount} hidden trait${hiddenCount > 1 ? 's' : ''} sensed</span>`
    : '';

  return `
    <div class="traits-row">
      ${chips}${hiddenChip}
    </div>`;
}
