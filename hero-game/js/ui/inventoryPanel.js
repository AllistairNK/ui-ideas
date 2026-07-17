import { ITEM_TEMPLATES, SHOP_ITEM_IDS, shopPrice } from '../data/items.js';
import { renderItemIconDataUrl } from '../core/itemIcon.js';
import { attachRichTooltips } from './richTooltip.js';

const SLOT_ORDER = ['weapon', 'offhand', 'head', 'body', 'hands', 'legs', 'accessory'];
const RARITY_ORDER = { common: 0, uncommon: 1, rare: 2, epic: 3 };

// Which shop tiers are expanded, if any. Module-level (not reset by the
// panel's own re-render) so opening a tier survives buys/equips redrawing
// the whole panel -- same pattern as expandedBranchId in activityPanel.js.
const expandedShopTiers = new Set([1]);

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function itemTooltip(template) {
  const bonuses = Object.entries(template.statBonuses || {}).map(([k, v]) => `${k} +${v}`).join(', ');
  const parts = [
    `<div class="tt-title">${escapeHtml(template.name)}</div>`,
    `<div class="tt-meta"><span class="tt-tier">Tier ${template.tier}</span><span class="tt-rarity tt-rarity-${template.rarity}">${template.rarity}</span></div>`
  ];
  if (template.flavor) parts.push(`<div class="tt-flavor">${escapeHtml(template.flavor)}</div>`);
  if (bonuses) parts.push(`<div class="tt-bonuses">${escapeHtml(bonuses)}</div>`);
  return escapeAttr(parts.join(''));
}

// Combined tooltip attributes for an item element -- includes the item's
// `effect` (a decorative theme key, independent of tier -- see items.js) as
// its own attribute so richTooltip.js can drive tooltip FX layers off it
// directly without parsing the tooltip HTML.
function itemTooltipAttrs(template) {
  return `data-rich-tooltip="${itemTooltip(template)}" data-tooltip-effect="${template.effect || ''}"`;
}

function sortByRarityThenValue(itemIds) {
  return [...itemIds].sort((a, b) => {
    const rarityDiff = RARITY_ORDER[ITEM_TEMPLATES[a].rarity] - RARITY_ORDER[ITEM_TEMPLATES[b].rarity];
    return rarityDiff !== 0 ? rarityDiff : ITEM_TEMPLATES[a].value - ITEM_TEMPLATES[b].value;
  });
}

// Animates a shop tier's item row open/closed by transitioning max-height to
// its *actual* content height (not a fixed cap) -- otherwise a fixed cap
// reaches short content almost instantly and the transition feels snappy.
// The forced reflow (offsetHeight read) between each pair of style writes is
// required so the browser commits an intermediate frame for the transition
// to animate from, rather than batching both writes into one paint.
function setTierItemsOpen(itemsEl, caretEl, open) {
  caretEl.classList.toggle('open', open);
  if (open) {
    itemsEl.classList.remove('collapsed');
    const target = itemsEl.scrollHeight;
    itemsEl.style.maxHeight = '0px';
    itemsEl.offsetHeight; // force reflow
    itemsEl.style.maxHeight = `${target}px`;
  } else {
    itemsEl.style.maxHeight = `${itemsEl.scrollHeight}px`;
    itemsEl.offsetHeight; // force reflow
    itemsEl.classList.add('collapsed');
    itemsEl.style.maxHeight = '0px';
  }
}

export function renderInventoryPanel(character, handlers) {
  const root = document.getElementById('inventoryPanel');
  if (!root) return;

  const equipHtml = SLOT_ORDER.map((slot) => {
    const instance = character.equipment[slot];
    const template = instance ? ITEM_TEMPLATES[instance.templateId] : null;
    const iconUrl = template ? renderItemIconDataUrl(template.id, 48) : '';
    const tooltipAttr = template ? itemTooltipAttrs(template) : `data-tooltip="${slot}"`;
    return `
      <div class="equip-slot" data-slot="${slot}" tabindex="0" ${tooltipAttr}>
        <div class="slot-label">${slot}</div>
        ${template ? `<img src="${iconUrl}" class="item-icon" data-action="unequip" data-slot="${slot}" />` : '<div class="slot-empty">-</div>'}
      </div>`;
  }).join('');

  const invHtml = character.inventory.map((instance) => {
    const template = ITEM_TEMPLATES[instance.templateId];
    if (!template) return '';
    const iconUrl = renderItemIconDataUrl(template.id, 48);
    const equipAction = template.questItem ? '' : 'data-action="equip"';
    return `
      <div class="inv-item${template.questItem ? ' inv-item-quest' : ''}" ${equipAction} data-instance="${instance.instanceId}" tabindex="0" ${itemTooltipAttrs(template)}>
        <img src="${iconUrl}" class="item-icon" />
      </div>`;
  }).join('');

  const ownedTemplateIds = new Set([
    ...character.inventory.map((i) => i.templateId),
    ...Object.values(character.equipment).filter(Boolean).map((i) => i.templateId)
  ]);

  const shopByTier = new Map();
  for (const itemId of SHOP_ITEM_IDS) {
    const tier = ITEM_TEMPLATES[itemId].tier;
    if (!shopByTier.has(tier)) shopByTier.set(tier, []);
    shopByTier.get(tier).push(itemId);
  }
  const sortedTiers = [...shopByTier.keys()].sort((a, b) => a - b);

  const shopHtml = sortedTiers.map((tier) => {
    const isOpen = expandedShopTiers.has(tier);
    const itemsHtml = sortByRarityThenValue(shopByTier.get(tier)).map((itemId) => {
      const template = ITEM_TEMPLATES[itemId];
      const iconUrl = renderItemIconDataUrl(itemId, 40);
      const owned = ownedTemplateIds.has(itemId);
      const price = shopPrice(template);
      const affordable = character.currency.gold >= price;
      const priceClass = owned ? '' : (affordable ? '' : ' shop-price-unaffordable');
      return `
        <div class="shop-item${owned ? ' shop-item-owned' : ''}" data-action="buy" data-item="${itemId}" tabindex="0" ${itemTooltipAttrs(template)}>
          <img src="${iconUrl}" class="item-icon" />
          <span class="shop-price${priceClass}">${owned ? 'Owned' : `${price}g`}</span>
        </div>`;
    }).join('');
    return `
      <div class="shop-tier-group">
        <button type="button" class="shop-tier-toggle" data-action="toggle-tier" data-tier="${tier}">
          <span class="shop-tier-caret ${isOpen ? 'open' : ''}">&#9656;</span> Tier ${tier}
        </button>
        <div class="shop-tier-items${isOpen ? '' : ' collapsed'}">${itemsHtml}</div>
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

  attachRichTooltips(root);

  root.querySelectorAll('[data-action="unequip"]').forEach((el) => {
    el.addEventListener('click', () => handlers.onUnequip(el.dataset.slot));
  });
  root.querySelectorAll('[data-action="equip"]').forEach((el) => {
    el.addEventListener('click', () => handlers.onEquip(el.dataset.instance));
  });
  root.querySelectorAll('[data-action="buy"]').forEach((el) => {
    el.addEventListener('click', () => handlers.onBuy(el.dataset.item));
  });
  root.querySelectorAll('[data-action="toggle-tier"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tier = Number(btn.dataset.tier);
      const open = !expandedShopTiers.has(tier);
      if (open) expandedShopTiers.add(tier);
      else expandedShopTiers.delete(tier);

      const itemsEl = btn.parentElement.querySelector('.shop-tier-items');
      const caretEl = btn.querySelector('.shop-tier-caret');
      setTierItemsOpen(itemsEl, caretEl, open);
    });
  });
}
