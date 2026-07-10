import { CLASSES } from '../data/classes.js';

export function renderCharacterSheet(character) {
  const root = document.getElementById('characterSheet');
  if (!root) return;
  const d = character.derived;
  const classDef = CLASSES[character.class];

  root.innerHTML = `
    <div class="panel-title">${character.name}</div>
    <div class="sheet-sub">${classDef.name} &middot; Level ${character.level}</div>
    <div class="sheet-flavor">${character.backgroundFlavor}</div>

    <div class="bar-row">
      <span class="bar-label">HP</span>
      <div class="bar"><div class="bar-fill bar-hp" style="width:${pct(d.hp, d.maxHp)}%"></div></div>
      <span class="bar-value">${Math.round(d.hp)}/${d.maxHp}</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">Stamina</span>
      <div class="bar"><div class="bar-fill bar-stamina" style="width:${pct(d.stamina, d.maxStamina)}%"></div></div>
      <span class="bar-value">${Math.round(d.stamina)}/${d.maxStamina}</span>
    </div>
    <div class="bar-row">
      <span class="bar-label">XP</span>
      <div class="bar"><div class="bar-fill bar-xp" style="width:${pct(character.xp, character.xpToNext)}%"></div></div>
      <span class="bar-value">${Math.round(character.xp)}/${character.xpToNext}</span>
    </div>

    <div class="attr-grid">
      ${Object.entries(character.attributes).map(([k, v]) => `
        <div class="attr-cell">
          <span class="attr-name">${k}</span>
          <span class="attr-value">${Math.floor(v)}</span>
        </div>`).join('')}
    </div>

    <div class="derived-grid">
      <div>ATK <b>${d.attack}</b></div>
      <div>DEF <b>${d.defense}</b></div>
      <div>MAG <b>${d.magicPower}</b></div>
      <div>CRIT <b>${d.critChance}%</b></div>
    </div>

    <div class="gold-row">Gold: <b>${Math.floor(character.currency.gold)}</b></div>
  `;
}

function pct(value, max) {
  if (!max) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}
