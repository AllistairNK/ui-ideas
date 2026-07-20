import { ITEM_TEMPLATES } from '../data/items.js';
import { HIDDEN_TRAITS, grantTrait } from '../data/traits.js';
import { ACTIVITIES } from '../data/activities.js';
import { addXp, applyAttributeTraining, computeDerivedStats } from '../core/character.js';
import { addToInventory, createItemInstance } from '../core/equipment.js';

const ATTRIBUTE_IDS = ['strength', 'agility', 'intellect', 'vitality', 'luck'];

// Debug-only tool: lets requirements (level, attributes, items, traits) be
// satisfied directly instead of grinding them out, so evolution/unlock flows
// like Engineer -> Runesmith can be exercised without waiting on real drops.
export function showDebugModal(character, { onChange }) {
  const root = document.getElementById('debugModal');
  if (!root) return;

  function refresh() {
    character.derived = computeDerivedStats(character);
    onChange();
    render();
  }

  function render() {
    const itemOptions = Object.values(ITEM_TEMPLATES)
      .map((t) => `<option value="${t.id}">${t.name}</option>`).join('');
    const traitOptions = Object.values(HIDDEN_TRAITS)
      .map((t) => `<option value="${t.id}">${t.name}</option>`).join('');
    const currentActivity = character.activity ? ACTIVITIES[character.activity.id] : null;
    const canForceRoll = currentActivity && currentActivity.rewards.lootTableId;

    root.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-box debug-box">
          <div class="modal-title">Debug Menu</div>

          <div class="debug-section">
            <div class="debug-section-title">Level (currently ${character.level})</div>
            <div class="debug-row">
              <button type="button" data-action="add-level" data-amount="1">+1 Level</button>
              <button type="button" data-action="add-level" data-amount="5">+5 Levels</button>
              <button type="button" data-action="add-level" data-amount="10">+10 Levels</button>
            </div>
          </div>

          <div class="debug-section">
            <div class="debug-section-title">Attributes</div>
            ${ATTRIBUTE_IDS.map((attr) => `
              <div class="debug-row">
                <span class="debug-row-label">${attr} (${Math.floor(character.attributes[attr] || 0)})</span>
                <button type="button" data-action="add-attr" data-attr="${attr}" data-amount="1">+1</button>
                <button type="button" data-action="add-attr" data-attr="${attr}" data-amount="5">+5</button>
              </div>`).join('')}
          </div>

          <div class="debug-section">
            <div class="debug-section-title">Give Item</div>
            <div class="debug-row">
              <select data-role="item-select">${itemOptions}</select>
              <button type="button" data-action="give-item">Give</button>
            </div>
          </div>

          <div class="debug-section">
            <div class="debug-section-title">Grant Trait</div>
            <div class="debug-row">
              <select data-role="trait-select">${traitOptions}</select>
              <button type="button" data-action="grant-trait">Grant</button>
            </div>
          </div>

          <div class="debug-section">
            <div class="debug-section-title">Other</div>
            <div class="debug-row">
              <button type="button" data-action="add-gold">+100 Gold</button>
              <button type="button" data-action="force-roll" ${canForceRoll ? '' : 'disabled'}>
                Force Next Loot Roll${canForceRoll ? '' : ' (no loot task running)'}
              </button>
            </div>
          </div>

          <button type="button" data-action="close">Close</button>
        </div>
      </div>
    `;

    root.querySelectorAll('[data-action="add-level"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const amount = Number(btn.dataset.amount);
        for (let i = 0; i < amount; i++) addXp(character, character.xpToNext);
        refresh();
      });
    });

    root.querySelectorAll('[data-action="add-attr"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const attr = btn.dataset.attr;
        const amount = Number(btn.dataset.amount);
        applyAttributeTraining(character, { [attr]: amount });
        refresh();
      });
    });

    root.querySelector('[data-action="give-item"]').addEventListener('click', () => {
      const itemId = root.querySelector('[data-role="item-select"]').value;
      addToInventory(character, createItemInstance(itemId));
      refresh();
    });

    root.querySelector('[data-action="grant-trait"]').addEventListener('click', () => {
      const traitId = root.querySelector('[data-role="trait-select"]').value;
      grantTrait(character, traitId);
      refresh();
    });

    root.querySelector('[data-action="add-gold"]').addEventListener('click', () => {
      character.currency.gold += 100;
      refresh();
    });

    const forceRollBtn = root.querySelector('[data-action="force-roll"]');
    if (forceRollBtn) {
      forceRollBtn.addEventListener('click', () => {
        if (!character.activity) return;
        const activity = ACTIVITIES[character.activity.id];
        if (!activity || !activity.rewards.lootTableId) return;
        character.activity.lootAccumSec = activity.durationSeconds;
        refresh();
      });
    }

    root.querySelector('[data-action="close"]').addEventListener('click', close);
    root.querySelector('.modal-backdrop').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) close();
    });
  }

  function close() {
    root.classList.add('hidden');
    root.innerHTML = '';
  }

  root.classList.remove('hidden');
  render();
}
