import { ITEM_TEMPLATES, LOOT_TABLES } from '../data/items.js';
import { newInstanceId } from './character.js';

export function sumEquipmentBonuses(character) {
  const totals = {};
  for (const slot of Object.keys(character.equipment)) {
    const instance = character.equipment[slot];
    if (!instance) continue;
    const template = ITEM_TEMPLATES[instance.templateId];
    if (!template) continue;
    for (const [stat, value] of Object.entries(template.statBonuses || {})) {
      totals[stat] = (totals[stat] || 0) + value;
    }
  }
  return totals;
}

export function createItemInstance(templateId) {
  return { templateId, instanceId: newInstanceId() };
}

export function addToInventory(character, itemInstance, maxSize = 30) {
  if (character.inventory.length >= maxSize) return false;
  character.inventory.push(itemInstance);
  return true;
}

// Returns true on success. Import computeDerivedStats lazily to avoid a
// circular import cycle with character.js (which imports sumEquipmentBonuses).
export function equipItem(character, instanceId, computeDerivedStats) {
  const idx = character.inventory.findIndex((i) => i.instanceId === instanceId);
  if (idx === -1) return false;
  const itemInstance = character.inventory[idx];
  const template = ITEM_TEMPLATES[itemInstance.templateId];
  if (!template) return false;

  const previouslyEquipped = character.equipment[template.slot];
  character.equipment[template.slot] = itemInstance;
  character.inventory.splice(idx, 1);
  if (previouslyEquipped) character.inventory.push(previouslyEquipped);

  character.derived = computeDerivedStats(character);
  return true;
}

export function unequipItem(character, slot, computeDerivedStats) {
  const itemInstance = character.equipment[slot];
  if (!itemInstance) return false;
  character.equipment[slot] = null;
  character.inventory.push(itemInstance);
  character.derived = computeDerivedStats(character);
  return true;
}

export function rollLoot(lootTableId) {
  const table = LOOT_TABLES[lootTableId];
  if (!table) return null;
  const totalWeight = table.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const entry of table) {
    if (roll < entry.weight) return entry.itemId ? createItemInstance(entry.itemId) : null;
    roll -= entry.weight;
  }
  return null;
}
