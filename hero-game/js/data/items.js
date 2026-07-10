export const ITEM_TEMPLATES = {
  rusty_sword: {
    id: 'rusty_sword', name: 'Rusty Sword', slot: 'weapon', weaponType: 'sword',
    rarity: 'common', element: 'none',
    statBonuses: { attack: 3 }, levelRequirement: 1, value: 5
  },
  hunting_bow: {
    id: 'hunting_bow', name: 'Hunting Bow', slot: 'weapon', weaponType: 'bow',
    rarity: 'common', element: 'none',
    statBonuses: { attack: 4, critChance: 2 }, levelRequirement: 1, value: 6
  },
  apprentice_staff: {
    id: 'apprentice_staff', name: 'Apprentice Staff', slot: 'weapon', weaponType: 'staff',
    rarity: 'common', element: 'none',
    statBonuses: { magicPower: 4 }, levelRequirement: 1, value: 6
  },
  flaming_dagger: {
    id: 'flaming_dagger', name: 'Flaming Dagger', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'fire',
    statBonuses: { attack: 5, critChance: 4 }, levelRequirement: 3, value: 18
  },
  storm_axe: {
    id: 'storm_axe', name: 'Storm Axe', slot: 'weapon', weaponType: 'axe',
    rarity: 'rare', element: 'lightning',
    statBonuses: { attack: 9, critChance: 3 }, levelRequirement: 6, value: 45
  },
  leather_cap: {
    id: 'leather_cap', name: 'Leather Cap', slot: 'head', weaponType: null,
    rarity: 'common', element: 'none',
    statBonuses: { defense: 2 }, levelRequirement: 1, value: 4
  },
  padded_tunic: {
    id: 'padded_tunic', name: 'Padded Tunic', slot: 'body', weaponType: null,
    rarity: 'common', element: 'none',
    statBonuses: { defense: 3, maxHp: 5 }, levelRequirement: 1, value: 5
  },
  work_gloves: {
    id: 'work_gloves', name: 'Work Gloves', slot: 'hands', weaponType: null,
    rarity: 'common', element: 'none',
    statBonuses: { attack: 1 }, levelRequirement: 1, value: 3
  },
  traveling_boots: {
    id: 'traveling_boots', name: 'Traveling Boots', slot: 'legs', weaponType: null,
    rarity: 'common', element: 'none',
    statBonuses: { defense: 2, critChance: 1 }, levelRequirement: 1, value: 4
  },
  wooden_shield: {
    id: 'wooden_shield', name: 'Wooden Shield', slot: 'offhand', weaponType: null,
    rarity: 'common', element: 'none',
    statBonuses: { defense: 4 }, levelRequirement: 1, value: 6
  },
  lucky_charm: {
    id: 'lucky_charm', name: 'Lucky Charm', slot: 'accessory', weaponType: null,
    rarity: 'uncommon', element: 'holy',
    statBonuses: { critChance: 5 }, levelRequirement: 2, value: 12
  },
  blessed_plate: {
    id: 'blessed_plate', name: 'Blessed Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'holy',
    statBonuses: { defense: 8, maxHp: 15 }, levelRequirement: 6, value: 50
  }
};

export const LOOT_TABLES = {
  common: [
    { itemId: 'rusty_sword', weight: 10 },
    { itemId: 'hunting_bow', weight: 10 },
    { itemId: 'apprentice_staff', weight: 10 },
    { itemId: 'leather_cap', weight: 12 },
    { itemId: 'padded_tunic', weight: 12 },
    { itemId: 'work_gloves', weight: 12 },
    { itemId: 'traveling_boots', weight: 12 },
    { itemId: 'wooden_shield', weight: 10 },
    { itemId: 'flaming_dagger', weight: 5 },
    { itemId: 'lucky_charm', weight: 5 },
    { itemId: 'storm_axe', weight: 2 },
    { itemId: 'blessed_plate', weight: 2 },
    { itemId: null, weight: 20 } // no drop
  ]
};

export const SHOP_ITEM_IDS = [
  'rusty_sword', 'hunting_bow', 'apprentice_staff', 'leather_cap',
  'padded_tunic', 'work_gloves', 'traveling_boots', 'wooden_shield'
];
