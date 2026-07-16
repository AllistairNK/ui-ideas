// Items are ordered by tier (1..7), matching the class evolution levels
// (5/15/25/40/60/85) from classes.js's mechanic line. Within the mechanic
// line, each tier is a full dagger/bow/staff/gauntlet/gun set -- purchasable
// in the shop regardless of level; not yet wired into LOOT_TABLES.
export const ITEM_TEMPLATES = {
  // --- Tier 1 ---
  rusty_sword: {
    id: 'rusty_sword', name: 'Rusty Sword', slot: 'weapon', weaponType: 'sword',
    rarity: 'common', element: 'none', tier: 1,
    flavor: 'Nicked and pitted from years of use, but the edge still bites.',
    statBonuses: { attack: 3 }, levelRequirement: 1, value: 5
  },
  hunting_bow: {
    id: 'hunting_bow', name: 'Hunting Bow', slot: 'weapon', weaponType: 'bow',
    rarity: 'common', element: 'none', tier: 1,
    flavor: 'A plain hunter\'s stave, restrung and balanced for a steadier draw.',
    statBonuses: { attack: 4, critChance: 2 }, levelRequirement: 1, value: 6
  },
  apprentice_staff: {
    id: 'apprentice_staff', name: 'Apprentice Staff', slot: 'weapon', weaponType: 'staff',
    rarity: 'common', element: 'none', tier: 1,
    flavor: 'A student\'s first focus, still humming faintly from untrained hands.',
    statBonuses: { magicPower: 4 }, levelRequirement: 1, value: 6
  },
  flaming_dagger: {
    id: 'flaming_dagger', name: 'Flaming Dagger', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'fire', tier: 1,
    flavor: 'The blade never cools -- it just waits for something to touch.',
    statBonuses: { attack: 5, critChance: 4 }, levelRequirement: 3, value: 18
  },
  tinkers_gauntlet: {
    id: 'tinkers_gauntlet', name: "Tinker's Gauntlet", slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'common', element: 'none', tier: 1,
    flavor: 'Riveted plates over a knuckle brace -- built for hammering both nails and faces.',
    statBonuses: { attack: 3, defense: 1 }, levelRequirement: 1, value: 6
  },
  scrap_pistol: {
    id: 'scrap_pistol', name: 'Scrap Pistol', slot: 'weapon', weaponType: 'gun',
    rarity: 'common', element: 'none', tier: 1,
    flavor: 'Cobbled together from spare parts -- it fires true more often than it should.',
    statBonuses: { attack: 4, critChance: 1 }, levelRequirement: 1, value: 7
  },
  leather_cap: {
    id: 'leather_cap', name: 'Leather Cap', slot: 'head', weaponType: null,
    rarity: 'common', element: 'none', tier: 1,
    statBonuses: { defense: 2 }, levelRequirement: 1, value: 4
  },
  padded_tunic: {
    id: 'padded_tunic', name: 'Padded Tunic', slot: 'body', weaponType: null,
    rarity: 'common', element: 'none', tier: 1,
    statBonuses: { defense: 3, maxHp: 5 }, levelRequirement: 1, value: 5
  },
  work_gloves: {
    id: 'work_gloves', name: 'Work Gloves', slot: 'hands', weaponType: null,
    rarity: 'common', element: 'none', tier: 1,
    statBonuses: { attack: 1 }, levelRequirement: 1, value: 3
  },
  traveling_boots: {
    id: 'traveling_boots', name: 'Traveling Boots', slot: 'legs', weaponType: null,
    rarity: 'common', element: 'none', tier: 1,
    statBonuses: { defense: 2, critChance: 1 }, levelRequirement: 1, value: 4
  },
  wooden_shield: {
    id: 'wooden_shield', name: 'Wooden Shield', slot: 'offhand', weaponType: null,
    rarity: 'common', element: 'none', tier: 1,
    statBonuses: { defense: 4 }, levelRequirement: 1, value: 6
  },
  lucky_charm: {
    id: 'lucky_charm', name: 'Lucky Charm', slot: 'accessory', weaponType: null,
    rarity: 'uncommon', element: 'holy', tier: 1,
    statBonuses: { critChance: 5 }, levelRequirement: 2, value: 12
  },

  // --- Quest items: not equippable, not sold in the shop (see
  // SHOP_ITEM_IDS below) -- found and consumed through activities instead.
  bent_cog: {
    id: 'bent_cog', name: 'Bent Cog', slot: 'quest', weaponType: null,
    rarity: 'common', element: 'none', tier: 0,
    flavor: "Still faintly warm, and heavier than it looks. It doesn't seem to belong to anything -- yet.",
    statBonuses: {}, levelRequirement: 1, value: 0, questItem: true, unique: true
  },

  // --- Tier 2 ---
  storm_axe: {
    id: 'storm_axe', name: 'Storm Axe', slot: 'weapon', weaponType: 'axe',
    rarity: 'rare', element: 'lightning', tier: 2,
    flavor: 'Forged in a thunderhead -- the head still crackles when it swings.',
    statBonuses: { attack: 9, critChance: 3 }, levelRequirement: 6, value: 45
  },
  socket_shiv: {
    id: 'socket_shiv', name: 'Socket Shiv', slot: 'weapon', weaponType: 'dagger',
    rarity: 'common', element: 'none', tier: 2,
    flavor: 'A sharpened multitool bit, still smelling of engine grease.',
    statBonuses: { attack: 5, critChance: 2 }, levelRequirement: 5, value: 20
  },
  bolt_slinger: {
    id: 'bolt_slinger', name: 'Bolt Slinger', slot: 'weapon', weaponType: 'bow',
    rarity: 'common', element: 'none', tier: 2,
    flavor: 'A hand-cranked mini crossbow, cobbled from spare bracket steel.',
    statBonuses: { attack: 5, critChance: 3 }, levelRequirement: 5, value: 22
  },
  copper_conduit: {
    id: 'copper_conduit', name: 'Copper Conduit', slot: 'weapon', weaponType: 'staff',
    rarity: 'common', element: 'none', tier: 2,
    flavor: 'A grounding rod that channels stray current instead of arcane theory.',
    statBonuses: { magicPower: 6, critChance: 1 }, levelRequirement: 5, value: 22
  },
  rivet_knuckles: {
    id: 'rivet_knuckles', name: 'Rivet Knuckles', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'common', element: 'none', tier: 2,
    flavor: 'Riveted plating over bare knuckles -- crude, but it holds together.',
    statBonuses: { attack: 4, defense: 2 }, levelRequirement: 5, value: 18
  },
  pipe_pistol: {
    id: 'pipe_pistol', name: 'Pipe Pistol', slot: 'weapon', weaponType: 'gun',
    rarity: 'common', element: 'none', tier: 2,
    flavor: 'A length of pipe, a spring, and a prayer. Mostly reliable.',
    statBonuses: { attack: 4, critChance: 3 }, levelRequirement: 5, value: 20
  },
  blessed_plate: {
    id: 'blessed_plate', name: 'Blessed Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'holy', tier: 2,
    statBonuses: { defense: 8, maxHp: 15 }, levelRequirement: 6, value: 50
  },

  // --- Tier 3 ---
  pneumatic_punch_blade: {
    id: 'pneumatic_punch_blade', name: 'Pneumatic Punch-Blade', slot: 'weapon', weaponType: 'dagger',
    rarity: 'common', element: 'none', tier: 3,
    flavor: 'A hiss of compressed air punches the blade forward on impact.',
    statBonuses: { attack: 8, critChance: 3 }, levelRequirement: 15, value: 34
  },
  spring_loaded_crossbow: {
    id: 'spring_loaded_crossbow', name: 'Spring-Loaded Crossbow', slot: 'weapon', weaponType: 'bow',
    rarity: 'common', element: 'none', tier: 3,
    flavor: 'Coiled tension replaces muscle -- the draw is instant.',
    statBonuses: { attack: 8, critChance: 4 }, levelRequirement: 15, value: 36
  },
  charged_conduit: {
    id: 'charged_conduit', name: 'Charged Conduit', slot: 'weapon', weaponType: 'staff',
    rarity: 'common', element: 'none', tier: 3,
    flavor: 'A capacitor core hums under your grip, always half-charged.',
    statBonuses: { magicPower: 10, critChance: 2 }, levelRequirement: 15, value: 36
  },
  pneumatic_knuckles: {
    id: 'pneumatic_knuckles', name: 'Pneumatic Knuckles', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'common', element: 'none', tier: 3,
    flavor: 'Each punch vents a short burst of compressed air behind it.',
    statBonuses: { attack: 7, defense: 3 }, levelRequirement: 15, value: 32
  },
  pneumatic_revolver: {
    id: 'pneumatic_revolver', name: 'Pneumatic Revolver', slot: 'weapon', weaponType: 'gun',
    rarity: 'common', element: 'none', tier: 3,
    flavor: 'A rotating cylinder driven by air pressure instead of powder.',
    statBonuses: { attack: 7, critChance: 4 }, levelRequirement: 15, value: 34
  },

  // --- Tier 4 ---
  piston_blade: {
    id: 'piston_blade', name: 'Piston Blade', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'lightning', tier: 4,
    flavor: 'A driving piston snaps the edge forward faster than the eye tracks.',
    statBonuses: { attack: 13, critChance: 5 }, levelRequirement: 25, value: 60
  },
  autoloader_bow: {
    id: 'autoloader_bow', name: 'Autoloader Bow', slot: 'weapon', weaponType: 'bow',
    rarity: 'uncommon', element: 'lightning', tier: 4,
    flavor: 'A geared magazine feeds the next bolt before the last one lands.',
    statBonuses: { attack: 13, critChance: 6 }, levelRequirement: 25, value: 64
  },
  resonance_rod: {
    id: 'resonance_rod', name: 'Resonance Rod', slot: 'weapon', weaponType: 'staff',
    rarity: 'uncommon', element: 'lightning', tier: 4,
    flavor: 'Tuned to hum at exactly the frequency that hurts to stand near.',
    statBonuses: { magicPower: 16, critChance: 3 }, levelRequirement: 25, value: 64
  },
  piston_fist: {
    id: 'piston_fist', name: 'Piston Fist', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'uncommon', element: 'lightning', tier: 4,
    flavor: 'The forearm brace drives the piston home on every swing.',
    statBonuses: { attack: 11, defense: 5 }, levelRequirement: 25, value: 58
  },
  autoloader_pistol: {
    id: 'autoloader_pistol', name: 'Autoloader Pistol', slot: 'weapon', weaponType: 'gun',
    rarity: 'uncommon', element: 'lightning', tier: 4,
    flavor: 'A cam-driven action cycles rounds faster than you can pull the trigger.',
    statBonuses: { attack: 11, critChance: 7 }, levelRequirement: 25, value: 62
  },

  // --- Tier 5 ---
  twin_cam_shiv: {
    id: 'twin_cam_shiv', name: 'Twin-Cam Shiv', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'lightning', tier: 5,
    flavor: 'Two counter-rotating cams keep the edge moving even mid-parry.',
    statBonuses: { attack: 19, critChance: 7 }, levelRequirement: 40, value: 110
  },
  repeating_ballista_bow: {
    id: 'repeating_ballista_bow', name: 'Repeating Ballista-Bow', slot: 'weapon', weaponType: 'bow',
    rarity: 'rare', element: 'lightning', tier: 5,
    flavor: 'Scaled down from siege engineering, it still hits like one.',
    statBonuses: { attack: 19, critChance: 8 }, levelRequirement: 40, value: 116
  },
  overclocked_conduit: {
    id: 'overclocked_conduit', name: 'Overclocked Conduit', slot: 'weapon', weaponType: 'staff',
    rarity: 'rare', element: 'lightning', tier: 5,
    flavor: 'Pushed well past its rated limits -- it works better for it.',
    statBonuses: { magicPower: 23, critChance: 4 }, levelRequirement: 40, value: 116
  },
  twin_cam_gauntlet: {
    id: 'twin_cam_gauntlet', name: 'Twin-Cam Gauntlet', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'rare', element: 'lightning', tier: 5,
    flavor: 'Dual cams reset the striking plate before your arm even finishes the swing.',
    statBonuses: { attack: 16, defense: 7 }, levelRequirement: 40, value: 105
  },
  repeating_sidearm: {
    id: 'repeating_sidearm', name: 'Repeating Sidearm', slot: 'weapon', weaponType: 'gun',
    rarity: 'rare', element: 'lightning', tier: 5,
    flavor: 'A belt-fed sidearm -- technically against every safety guideline you\'ve read.',
    statBonuses: { attack: 16, critChance: 10 }, levelRequirement: 40, value: 112
  },

  // --- Tier 6 ---
  nanoblade: {
    id: 'nanoblade', name: 'Nanoblade', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'lightning', tier: 6, effect: 'goldSparkle',
    flavor: 'The edge reshapes itself between strikes at a scale you can\'t see.',
    statBonuses: { attack: 27, critChance: 9 }, levelRequirement: 60, value: 180
  },
  railbow: {
    id: 'railbow', name: 'Railbow', slot: 'weapon', weaponType: 'bow',
    rarity: 'rare', element: 'lightning', tier: 6, effect: 'goldSparkle',
    flavor: 'No string -- a magnetic rail flings the bolt clean past the sound of the shot.',
    statBonuses: { attack: 27, critChance: 10 }, levelRequirement: 60, value: 188
  },
  fusion_rod: {
    id: 'fusion_rod', name: 'Fusion Rod', slot: 'weapon', weaponType: 'staff',
    rarity: 'rare', element: 'lightning', tier: 6, effect: 'goldSparkle',
    flavor: 'Something is happening inside the core. You\'ve stopped asking what.',
    statBonuses: { magicPower: 32, critChance: 6 }, levelRequirement: 60, value: 188
  },
  nanite_gauntlet: {
    id: 'nanite_gauntlet', name: 'Nanite Gauntlet', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'rare', element: 'lightning', tier: 6, effect: 'goldSparkle',
    flavor: 'A living skin of nanites reknits the plating between hits.',
    statBonuses: { attack: 23, defense: 9 }, levelRequirement: 60, value: 172
  },
  railgun_pistol: {
    id: 'railgun_pistol', name: 'Railgun Pistol', slot: 'weapon', weaponType: 'gun',
    rarity: 'rare', element: 'lightning', tier: 6, effect: 'goldSparkle',
    flavor: 'A sidearm-sized railgun. It should not exist at this size. It does.',
    statBonuses: { attack: 23, critChance: 13 }, levelRequirement: 60, value: 182
  },

  // --- Tier 7 ---
  ascendant_blade: {
    id: 'ascendant_blade', name: 'Ascendant Blade', slot: 'weapon', weaponType: 'dagger',
    rarity: 'epic', element: 'lightning', tier: 7, effect: 'voidGlitter',
    flavor: 'It no longer cuts what\'s in front of it. It cuts what should be there.',
    statBonuses: { attack: 38, critChance: 12 }, levelRequirement: 85, value: 300
  },
  ascendant_bow: {
    id: 'ascendant_bow', name: 'Ascendant Bow', slot: 'weapon', weaponType: 'bow',
    rarity: 'epic', element: 'lightning', tier: 7, effect: 'voidGlitter',
    flavor: 'Every shot already landed before you finished the draw.',
    statBonuses: { attack: 38, critChance: 14 }, levelRequirement: 85, value: 312
  },
  ascendant_conduit: {
    id: 'ascendant_conduit', name: 'Ascendant Conduit', slot: 'weapon', weaponType: 'staff',
    rarity: 'epic', element: 'lightning', tier: 7, effect: 'voidGlitter',
    flavor: 'It stopped channeling power a while ago. Now it just is power.',
    statBonuses: { magicPower: 45, critChance: 8 }, levelRequirement: 85, value: 312
  },
  ascendant_gauntlet: {
    id: 'ascendant_gauntlet', name: 'Ascendant Gauntlet', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'epic', element: 'lightning', tier: 7, effect: 'voidGlitter',
    flavor: 'The mechanism and the fist wearing it are no longer two separate things.',
    statBonuses: { attack: 32, defense: 12 }, levelRequirement: 85, value: 290
  },
  ascendant_cannon: {
    id: 'ascendant_cannon', name: 'Ascendant Cannon', slot: 'weapon', weaponType: 'gun',
    rarity: 'epic', element: 'lightning', tier: 7, effect: 'voidGlitter',
    flavor: 'You stopped pulling the trigger. It just knows when to fire.',
    statBonuses: { attack: 32, critChance: 17 }, levelRequirement: 85, value: 305
  }
};

export const LOOT_TABLES = {
  // Rare, quiet find from Scavenge the Alleys -- deliberately low weight so
  // it reads as a discovery, not a guaranteed drip-feed.
  scavengeFind: [
    { itemId: 'bent_cog', weight: 2 },
    { itemId: null, weight: 150 }
  ],
  common: [
    { itemId: 'rusty_sword', weight: 10 },
    { itemId: 'hunting_bow', weight: 10 },
    { itemId: 'apprentice_staff', weight: 10 },
    { itemId: 'leather_cap', weight: 12 },
    { itemId: 'padded_tunic', weight: 12 },
    { itemId: 'work_gloves', weight: 12 },
    { itemId: 'traveling_boots', weight: 12 },
    { itemId: 'wooden_shield', weight: 10 },
    { itemId: 'tinkers_gauntlet', weight: 10 },
    { itemId: 'scrap_pistol', weight: 10 },
    { itemId: 'flaming_dagger', weight: 5 },
    { itemId: 'lucky_charm', weight: 5 },
    { itemId: 'storm_axe', weight: 2 },
    { itemId: 'blessed_plate', weight: 2 },
    { itemId: null, weight: 20 } // no drop
  ]
};

export const SHOP_ITEM_IDS = Object.keys(ITEM_TEMPLATES).filter((id) => !ITEM_TEMPLATES[id].questItem);
