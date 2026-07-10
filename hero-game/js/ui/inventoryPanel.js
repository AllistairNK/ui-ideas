import { ITEM_TEMPLATES, SHOP_ITEM_IDS } from '../data/items.js';
import { renderItemIconDataUrl } from '../core/itemIcon.js';

const SLOT_ORDER = ['weapon', 'offhand', 'head', 'body', 'hands', 'legs', 'accessory'];

function itemTooltip(template) {
  const bonuses = Object.entries(template.statBonuses || {}).map(([k, v]) => `${k} +${v}`).join(', ');
  return `${template.name} (${template.rarity})\n${bonuses}`;
}

export function renderInventoryPanel(character, handlers) {
  const root = document.getElementById('inventoryPanel');
  if (!root) return;

  const equipHtml = SLOT_ORDER.map((slot) => {
    const instance = character.equipment[slot];
    const template = instance ? ITEM_TEMPLATES[instance.templateId] : null;
    const iconUrl = template ? renderItemIconDataUrl(template.id, 48) : '';
    return `
      <div class="equip-slot" data-slot="${slot}" title="${template ? itemTooltip(template) : slot}">
        <div class="slot-label">${slot}</div>
        ${template ? `<img src="${iconUrl}" class="item-icon" data-action="unequip" data-slot="${slot}" />` : '<div class="slot-empty">-</div>'}
      </div>`;
  }).join('');

  const invHtml = character.inventory.map((instance) => {
    const template = ITEM_TEMPLATES[instance.templateId];
    if (!template) return '';
    const iconUrl = renderItemIconDataUrl(template.id, 48);
    return `
      <div class="inv-item" data-action="equip" data-instance="${instance.instanceId}" title="${itemTooltip(template)}">
        <img src="${iconUrl}" class="item-icon" />
      </div>`;
  }).join('');

  const shopHtml = SHOP_ITEM_IDS.map((itemId) => {
    const template = ITEM_TEMPLATES[itemId];
    const iconUrl = renderItemIconDataUrl(itemId, 40);
    return `
      <div class="shop-item" data-action="buy" data-item="${itemId}" title="${itemTooltip(template)}">
        <img src="${iconUrl}" class="item-icon" />
        <span class="shop-price">${template.value}g</span>
      </div>`;
  }).join('');

  root.innerHTML = `
    <div class="panel-title">Equipment</div>
    <div class="equip-grid">${equipHtml}</div>
    <div class="panel-title">Inventory</div>
    <div class="inv-grid">${invHtml || '<div class="inv-empty">Empty</div>'}</div>
    <div class="panel-title">Shop</div>
    <div class="shop-grid">${shopHtml}</div>
  `;

  root.querySelectorAll('[data-action="unequip"]').forEach((el) => {
    el.addEventListener('click', () => handlers.onUnequip(el.dataset.slot));
  });
  root.querySelectorAll('[data-action="equip"]').forEach((el) => {
    el.addEventListener('click', () => handlers.onEquip(el.dataset.instance));
  });
  root.querySelectorAll('[data-action="buy"]').forEach((el) => {
    el.addEventListener('click', () => handlers.onBuy(el.dataset.item));
  });
}
