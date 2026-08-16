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

  // --- Rogue-flavored gear: not class-locked (any class can equip these),
  // just statted and written for the attack/critChance-heavy rogue line
  // (rogue -> shadowblade -> assassin -> nightstalker -> wraith ->
  // umbralsovereign in classes.js).
  guttersnipes_blade: {
    id: 'guttersnipes_blade', name: "Guttersnipe's Blade", slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Small enough to hide in a sleeve, sharp enough that it never needed to be bigger.',
    statBonuses: { attack: 6, critChance: 6 }, levelRequirement: 3, value: 20
  },
  lookouts_hood: {
    id: 'lookouts_hood', name: "Lookout's Hood", slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Keeps a watch on the street corner without ever seeming to.',
    statBonuses: { defense: 3, critChance: 3 }, levelRequirement: 3, value: 12
  },
  backalley_wraps: {
    id: 'backalley_wraps', name: 'Back-Alley Wraps', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Stitched from whatever the alley had. It's kept more than one back from getting worse.",
    statBonuses: { defense: 5, maxHp: 10 }, levelRequirement: 3, value: 15
  },
  picklock_gloves: {
    id: 'picklock_gloves', name: 'Picklock Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'The tips are worn smooth from a hundred locks that gave up first.',
    statBonuses: { attack: 3, critChance: 3 }, levelRequirement: 3, value: 12
  },
  cobblestone_treads: {
    id: 'cobblestone_treads', name: 'Cobblestone Treads', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Scuffed enough to match every street it's ever crossed.",
    statBonuses: { defense: 3, critChance: 2 }, levelRequirement: 3, value: 12
  },

  // --- Fighter-flavored gear: not class-locked, just statted and written for
  // the attack/defense-heavy fighter line (fighter -> vanguard -> warbringer
  // -> battlelord -> juggernaut -> colossus in classes.js).
  brawlers_hatchet: {
    id: 'brawlers_hatchet', name: "Brawler's Hatchet", slot: 'weapon', weaponType: 'axe',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Not built for throwing. Built for the guy who forgot that and came in swinging anyway.',
    statBonuses: { attack: 6, defense: 3 }, levelRequirement: 3, value: 20
  },
  dented_sallet: {
    id: 'dented_sallet', name: 'Dented Sallet', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Dented more times than it's been polished, and still hasn't let one through.",
    statBonuses: { defense: 4, attack: 2 }, levelRequirement: 3, value: 12
  },
  scarred_breastplate: {
    id: 'scarred_breastplate', name: 'Scarred Breastplate', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Every scratch marks a blow that didn't finish the job.",
    statBonuses: { defense: 6, maxHp: 10 }, levelRequirement: 3, value: 15
  },
  knuckleguard_vambraces: {
    id: 'knuckleguard_vambraces', name: 'Knuckleguard Vambraces', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Reinforced across the forearm -- for the swing and whatever tries to stop it.",
    statBonuses: { attack: 4, defense: 2 }, levelRequirement: 3, value: 12
  },
  trench_greaves: {
    id: 'trench_greaves', name: 'Trench Greaves', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Caked in mud from every field that's tried to hold him back.",
    statBonuses: { defense: 4, maxHp: 6 }, levelRequirement: 3, value: 12
  },

  // --- Mage-flavored gear: not class-locked, just statted and written for
  // the magicPower/critChance-heavy mage line (mage -> conjurer -> warlock ->
  // archmage -> archwizard -> astralsovereign in classes.js). Weapon types
  // stick to staff/dagger, matching that line's allowedWeaponTypes.
  kindled_wand: {
    id: 'kindled_wand', name: 'Kindled Wand', slot: 'weapon', weaponType: 'staff',
    rarity: 'uncommon', element: 'fire', tier: 1,
    flavor: 'Barely more than a stick with an opinion, but the opinion is usually fire.',
    statBonuses: { magicPower: 7, critChance: 3 }, levelRequirement: 3, value: 19
  },
  apprentices_circlet: {
    id: 'apprentices_circlet', name: "Apprentice's Circlet", slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'A thin band of copper, humming faintly whenever a lesson goes right.',
    statBonuses: { magicPower: 4, critChance: 3 }, levelRequirement: 3, value: 12
  },
  threadbare_robe: {
    id: 'threadbare_robe', name: "Threadbare Scholar's Robe", slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Patched more with theory than thread, and somehow it still holds.',
    statBonuses: { defense: 3, maxHp: 8 }, levelRequirement: 3, value: 14
  },
  chalkdust_gloves: {
    id: 'chalkdust_gloves', name: 'Chalk-Dust Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "White at the knuckles from equations that wouldn't balance the first dozen tries.",
    statBonuses: { magicPower: 3, critChance: 3 }, levelRequirement: 3, value: 12
  },
  scriptorium_leggings: {
    id: 'scriptorium_leggings', name: 'Scriptorium Leggings', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Stained with ink from nights spent copying spells instead of sleeping.',
    statBonuses: { magicPower: 3, critChance: 2 }, levelRequirement: 3, value: 12
  },
  ritual_athame: {
    id: 'ritual_athame', name: 'Ritual Athame', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Not meant for throats. The blood matters more once it's spilled somewhere specific.",
    statBonuses: { magicPower: 9, critChance: 8 }, levelRequirement: 6, value: 46
  },
  focus_lens_hood: {
    id: 'focus_lens_hood', name: 'Focus Lens Hood', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Sharpens the mind's eye the way a lens sharpens the sun.",
    statBonuses: { magicPower: 7, critChance: 5 }, levelRequirement: 6, value: 30
  },
  runeseamed_robe: {
    id: 'runeseamed_robe', name: 'Runeseamed Robe', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Every seam traces a ward -- most of them finished properly.",
    statBonuses: { defense: 5, maxHp: 13 }, levelRequirement: 6, value: 34
  },
  inkstained_gloves: {
    id: 'inkstained_gloves', name: 'Ink-Stained Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "The stains aren't dirt. They're proof of work.",
    statBonuses: { magicPower: 6, critChance: 5 }, levelRequirement: 6, value: 30
  },
  sigilstitched_leggings: {
    id: 'sigilstitched_leggings', name: 'Sigil-Stitched Leggings', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Each step traces a sigil nobody's bothered to read since it was sewn.",
    statBonuses: { magicPower: 6, critChance: 4 }, levelRequirement: 6, value: 30
  },
  warlocks_conduit: {
    id: 'warlocks_conduit', name: "Warlock's Conduit", slot: 'weapon', weaponType: 'staff',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'It remembers every bargain that ran through it, and keeps its own count besides.',
    statBonuses: { magicPower: 15, critChance: 8 }, levelRequirement: 15, value: 58
  },
  warded_coronet: {
    id: 'warded_coronet', name: 'Warded Coronet', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Turns aside more than blows -- most bad ideas don't survive wearing it.",
    statBonuses: { magicPower: 10, critChance: 7 }, levelRequirement: 15, value: 42
  },
  conjurers_vestment: {
    id: 'conjurers_vestment', name: "Conjurer's Vestment", slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Something in the weave answers before the wearer finishes the thought.",
    statBonuses: { defense: 7, maxHp: 18 }, levelRequirement: 15, value: 46
  },
  spellthread_gloves: {
    id: 'spellthread_gloves', name: 'Spellthread Gloves', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The thread between finger and spell has never once slipped.',
    statBonuses: { magicPower: 9, critChance: 7 }, levelRequirement: 15, value: 42
  },
  levitation_slippers: {
    id: 'levitation_slippers', name: 'Levitation Slippers', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Half a step lighter than they should be, and nobody's asked why.",
    statBonuses: { magicPower: 9, critChance: 6 }, levelRequirement: 15, value: 42
  },
  archmages_quill: {
    id: 'archmages_quill', name: "Archmage's Quill", slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "It signs nothing. By the time the ink would dry, the matter's already settled.",
    statBonuses: { magicPower: 18, critChance: 12 }, levelRequirement: 25, value: 78
  },
  warlocks_diadem: {
    id: 'warlocks_diadem', name: "Warlock's Diadem", slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Every bargain it's seen still owes something. It hasn't forgotten one.",
    statBonuses: { magicPower: 13, critChance: 9 }, levelRequirement: 25, value: 58
  },
  covenant_robe: {
    id: 'covenant_robe', name: 'Covenant Robe', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Signed in a way that doesn't show, and binding in a way that doesn't need to.",
    statBonuses: { defense: 9, maxHp: 23 }, levelRequirement: 25, value: 62
  },
  hexbound_gloves: {
    id: 'hexbound_gloves', name: 'Hexbound Gloves', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "What they touch doesn't stay the way it was.",
    statBonuses: { magicPower: 12, critChance: 10 }, levelRequirement: 25, value: 58
  },
  stormstep_leggings: {
    id: 'stormstep_leggings', name: 'Stormstep Leggings', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'The static never quite settles, not even standing still.',
    statBonuses: { magicPower: 12, critChance: 8 }, levelRequirement: 25, value: 58
  },
  archwizards_judgment: {
    id: 'archwizards_judgment', name: "Archwizard's Judgment", slot: 'weapon', weaponType: 'staff',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Kingdoms don't ask what it's for anymore. They ask when it'll be pointed elsewhere.",
    statBonuses: { magicPower: 28, critChance: 14 }, levelRequirement: 40, value: 130
  },
  archmages_coronet: {
    id: 'archmages_coronet', name: "Archmage's Coronet", slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "The tower speaks through it, when the archmage doesn't feel like speaking at all.",
    statBonuses: { magicPower: 18, critChance: 12 }, levelRequirement: 40, value: 95
  },
  towerspun_robe: {
    id: 'towerspun_robe', name: 'Towerspun Robe', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Woven from the same thread the tower's wards are, and just as hard to unravel.",
    statBonuses: { defense: 12, maxHp: 30 }, levelRequirement: 40, value: 102
  },
  runeforged_gloves: {
    id: 'runeforged_gloves', name: 'Runeforged Gloves', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Every rune on it has been rewritten at least once -- correctly, this time.',
    statBonuses: { magicPower: 16, critChance: 13 }, levelRequirement: 40, value: 95
  },
  skywalk_greaves: {
    id: 'skywalk_greaves', name: 'Skywalk Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "The ground's a suggestion these have mostly stopped taking.",
    statBonuses: { magicPower: 16, critChance: 11 }, levelRequirement: 40, value: 95
  },
  astral_reliquary: {
    id: 'astral_reliquary', name: 'Astral Reliquary', slot: 'weapon', weaponType: 'dagger', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "It doesn't draw blood so much as draw a line under the conversation.",
    statBonuses: { magicPower: 34, critChance: 20 }, levelRequirement: 60, value: 210
  },
  astral_diadem: {
    id: 'astral_diadem', name: 'Astral Diadem', slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "The stars in it don't reflect light. They remember it.",
    statBonuses: { magicPower: 24, critChance: 16 }, levelRequirement: 60, value: 165
  },
  voidwoven_vestment: {
    id: 'voidwoven_vestment', name: 'Voidwoven Vestment', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Stitched from something that was never quite fabric to begin with.',
    statBonuses: { defense: 16, maxHp: 40 }, levelRequirement: 60, value: 178
  },
  starlight_gloves: {
    id: 'starlight_gloves', name: 'Starlight Gloves', slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "What they hold stops being entirely of this world.",
    statBonuses: { magicPower: 22, critChance: 17 }, levelRequirement: 60, value: 165
  },
  astral_striders: {
    id: 'astral_striders', name: 'Astral Striders', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "Every step lands somewhere that hasn't decided if it's real yet.",
    statBonuses: { magicPower: 22, critChance: 14 }, levelRequirement: 60, value: 165
  },

  // --- Battlemage-flavored gear: not class-locked, just statted and written
  // for the hybrid attack/magicPower/critChance battlemage line (battlemage
  // -> spellblade -> warmage -> battlemagus -> fateblade -> fatedsovereign in
  // classes.js). Weapon types cycle through staff/sword/dagger, matching
  // that line's allowedWeaponTypes.
  gambits_edge: {
    id: 'gambits_edge', name: "Gambit's Edge", slot: 'weapon', weaponType: 'sword',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "The odds were never good. It swings anyway, and somehow that's enough.",
    statBonuses: { attack: 4, magicPower: 4, critChance: 3 }, levelRequirement: 3, value: 19
  },
  lucky_draw_circlet: {
    id: 'lucky_draw_circlet', name: 'Lucky Draw Circlet', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Every duel starts the same way -- a draw that somehow always favors him.',
    statBonuses: { magicPower: 3, critChance: 3 }, levelRequirement: 3, value: 12
  },
  wagered_coat: {
    id: 'wagered_coat', name: 'Wagered Coat', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Bet against the man wearing it once. Nobody's done it twice.",
    statBonuses: { defense: 4, maxHp: 9 }, levelRequirement: 3, value: 14
  },
  doubledown_gloves: {
    id: 'doubledown_gloves', name: 'Double-Down Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'The second cast lands harder than the first ever needed to.',
    statBonuses: { attack: 3, magicPower: 2 }, levelRequirement: 3, value: 12
  },
  even_odds_boots: {
    id: 'even_odds_boots', name: 'Even Odds Boots', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "The footing's never quite fair, and never quite in the other guy's favor.",
    statBonuses: { attack: 2, critChance: 2 }, levelRequirement: 3, value: 12
  },
  spellblades_ward: {
    id: 'spellblades_ward', name: "Spellblade's Ward", slot: 'weapon', weaponType: 'staff',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "It doesn't block the hit so much as convince it to land somewhere less important.",
    statBonuses: { attack: 6, magicPower: 7, critChance: 5 }, levelRequirement: 6, value: 46
  },
  parryward_circlet: {
    id: 'parryward_circlet', name: 'Parry-Ward Circlet', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Turns the first strike before the spell even finishes forming.',
    statBonuses: { magicPower: 5, critChance: 5 }, levelRequirement: 6, value: 30
  },
  spellwoven_coat: {
    id: 'spellwoven_coat', name: 'Spellwoven Coat', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Thread and incantation, stitched so close nobody can say where one starts.",
    statBonuses: { defense: 6, maxHp: 14 }, levelRequirement: 6, value: 34
  },
  riposte_gloves: {
    id: 'riposte_gloves', name: 'Riposte Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "The counter's already cast by the time the opening's noticed.",
    statBonuses: { attack: 5, magicPower: 4 }, levelRequirement: 6, value: 30
  },
  feintstep_boots: {
    id: 'feintstep_boots', name: 'Feint-Step Boots', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Every step looks like a mistake until the follow-through lands.',
    statBonuses: { attack: 4, critChance: 4 }, levelRequirement: 6, value: 30
  },
  warmages_reprisal: {
    id: 'warmages_reprisal', name: "Warmage's Reprisal", slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "The spell and the strike arrive in the same breath, so nobody's sure which one to duck.",
    statBonuses: { attack: 8, magicPower: 9, critChance: 6 }, levelRequirement: 15, value: 58
  },
  battlecast_hood: {
    id: 'battlecast_hood', name: 'Battlecast Hood', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The spell and the swing share a breath. The hood just keeps up.',
    statBonuses: { magicPower: 7, critChance: 6 }, levelRequirement: 15, value: 42
  },
  warcasters_coat: {
    id: 'warcasters_coat', name: "Warcaster's Coat", slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Scorched at the cuffs from casting too close to the blade.',
    statBonuses: { defense: 8, maxHp: 19 }, levelRequirement: 15, value: 46
  },
  arcstrike_gauntlets: {
    id: 'arcstrike_gauntlets', name: 'Arcstrike Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Every hit carries a charge that wasn't there a swing ago.",
    statBonuses: { attack: 7, magicPower: 6 }, levelRequirement: 15, value: 42
  },
  surging_greaves: {
    id: 'surging_greaves', name: 'Surging Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "The current doesn't wait for the next cast. Neither do these.",
    statBonuses: { attack: 6, critChance: 5 }, levelRequirement: 15, value: 42
  },
  battlemagus_wager: {
    id: 'battlemagus_wager', name: "Battlemagus's Wager", slot: 'weapon', weaponType: 'sword',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "The wager's already settled before the coin lands -- it just likes the theater of the toss.",
    statBonuses: { attack: 10, magicPower: 11, critChance: 9 }, levelRequirement: 25, value: 78
  },
  wagermasters_circlet: {
    id: 'wagermasters_circlet', name: "Wagermaster's Circlet", slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "He's stopped calling them bets. The odds just agree with him now.",
    statBonuses: { magicPower: 9, critChance: 8 }, levelRequirement: 25, value: 58
  },
  duelists_warplate: {
    id: 'duelists_warplate', name: "Duelist's Warplate", slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Built for the fight that was supposed to be a duel and stopped being fair.',
    statBonuses: { defense: 10, maxHp: 24 }, levelRequirement: 25, value: 62
  },
  calculated_gauntlets: {
    id: 'calculated_gauntlets', name: 'Calculated Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Every strike's already accounted for three moves out.",
    statBonuses: { attack: 9, magicPower: 8 }, levelRequirement: 25, value: 58
  },
  stackedodds_greaves: {
    id: 'stackedodds_greaves', name: 'Stacked-Odds Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "The ground's tilted in his favor before anyone else notices it moved.",
    statBonuses: { attack: 8, critChance: 7 }, levelRequirement: 25, value: 58
  },
  fateblades_verdict: {
    id: 'fateblades_verdict', name: "Fateblade's Verdict", slot: 'weapon', weaponType: 'staff',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "It doesn't decide who wins. It just arrives right when the decision would've mattered.",
    statBonuses: { attack: 15, magicPower: 16, critChance: 12 }, levelRequirement: 40, value: 130
  },
  foreseen_circlet: {
    id: 'foreseen_circlet', name: 'Foreseen Circlet', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Sees the opening before the opponent's decided to leave one.",
    statBonuses: { magicPower: 13, critChance: 11 }, levelRequirement: 40, value: 95
  },
  destinyforged_plate: {
    id: 'destinyforged_plate', name: 'Destiny-Forged Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Not armor so much as a conclusion, worn early.',
    statBonuses: { defense: 13, maxHp: 32 }, levelRequirement: 40, value: 102
  },
  fourthstrike_gauntlets: {
    id: 'fourthstrike_gauntlets', name: 'Fourth-Strike Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The first three misses were never the point.',
    statBonuses: { attack: 13, magicPower: 11 }, levelRequirement: 40, value: 95
  },
  predestined_greaves: {
    id: 'predestined_greaves', name: 'Predestined Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Every step was already accounted for, several fights ago.',
    statBonuses: { attack: 11, critChance: 10 }, levelRequirement: 40, value: 95
  },
  fatedsovereigns_toll: {
    id: 'fatedsovereigns_toll', name: "Fated Sovereign's Toll", slot: 'weapon', weaponType: 'dagger', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Every ledger balances eventually. This is just the one that collects early.',
    statBonuses: { attack: 18, magicPower: 19, critChance: 16 }, levelRequirement: 60, value: 210
  },
  sovereigns_reckoning: {
    id: 'sovereigns_reckoning', name: "Sovereign's Reckoning", slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Every ledger closes eventually. This one just decides when.',
    statBonuses: { magicPower: 17, critChance: 15 }, levelRequirement: 60, value: 165
  },
  ledgerbound_plate: {
    id: 'ledgerbound_plate', name: 'Ledger-Bound Plate', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "What's owed gets collected. What's collected never balances back.",
    statBonuses: { defense: 17, maxHp: 42 }, levelRequirement: 60, value: 178
  },
  tolltakers_gauntlets: {
    id: 'tolltakers_gauntlets', name: "Toll-Taker's Gauntlets", slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Nothing passes without paying something first.',
    statBonuses: { attack: 17, magicPower: 15 }, levelRequirement: 60, value: 165
  },
  final_tally_greaves: {
    id: 'final_tally_greaves', name: 'Final Tally Greaves', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "The count's already finished by the time the fight catches up to it.",
    statBonuses: { attack: 15, critChance: 13 }, levelRequirement: 60, value: 165
  },

  // --- Warden-flavored gear: not class-locked, just statted and written for
  // the attack/defense-heavy warden line (warden -> bulwark -> rampart ->
  // aegis -> bastion -> immovable in classes.js). Weapon types cycle through
  // sword/hammer/spear, matching that line's allowedWeaponTypes.
  gatekeepers_edge: {
    id: 'gatekeepers_edge', name: "Gatekeeper's Edge", slot: 'weapon', weaponType: 'sword',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'It doesn\'t need to be fast. Nothing gets past it twice.',
    statBonuses: { attack: 6, defense: 4 }, levelRequirement: 3, value: 20
  },
  sentinels_barred_helm: {
    id: 'sentinels_barred_helm', name: "Sentinel's Barred Helm", slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "The bars aren't decoration. Something's tried to get past them before.",
    statBonuses: { defense: 5, attack: 1 }, levelRequirement: 3, value: 12
  },
  ironbound_hauberk: {
    id: 'ironbound_hauberk', name: 'Ironbound Hauberk', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Every rivet holds the line where the last one gave out.',
    statBonuses: { defense: 7, maxHp: 12 }, levelRequirement: 3, value: 15
  },
  riveted_warfists: {
    id: 'riveted_warfists', name: 'Riveted Warfists', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Built to take the hit meant for someone standing behind him.',
    statBonuses: { attack: 3, defense: 3 }, levelRequirement: 3, value: 12
  },
  anchor_greaves: {
    id: 'anchor_greaves', name: 'Anchor Greaves', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Plant these and the ground argues on your behalf.',
    statBonuses: { defense: 5, maxHp: 6 }, levelRequirement: 3, value: 12
  },
  bulwarks_maul: {
    id: 'bulwarks_maul', name: "Bulwark's Maul", slot: 'weapon', weaponType: 'hammer',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'It doesn\'t swing to hurt -- it swings to make sure nothing else gets through.',
    statBonuses: { attack: 8, defense: 7 }, levelRequirement: 6, value: 46
  },
  wallguard_helm: {
    id: 'wallguard_helm', name: 'Wallguard Helm', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Nothing gets a second look through the slit in this.',
    statBonuses: { defense: 8, attack: 2 }, levelRequirement: 6, value: 30
  },
  stonebound_hide: {
    id: 'stonebound_hide', name: 'Stonebound Hide', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Heavier than it looks, and twice as stubborn.',
    statBonuses: { defense: 11, maxHp: 18 }, levelRequirement: 6, value: 36
  },
  gripstone_vambraces: {
    id: 'gripstone_vambraces', name: 'Gripstone Vambraces', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "The grip doesn't loosen. Neither does whatever it's holding the line against.",
    statBonuses: { attack: 5, defense: 5 }, levelRequirement: 6, value: 30
  },
  foundation_greaves: {
    id: 'foundation_greaves', name: 'Foundation Greaves', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Everything built on top of him stays standing because these don\'t move.',
    statBonuses: { defense: 8, maxHp: 10 }, levelRequirement: 6, value: 30
  },
  ramparts_pike: {
    id: 'ramparts_pike', name: "Rampart's Pike", slot: 'weapon', weaponType: 'spear',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The reach isn\'t for reaching. It\'s for making sure nothing else can.',
    statBonuses: { attack: 11, defense: 9 }, levelRequirement: 15, value: 58
  },
  keepers_helm: {
    id: 'keepers_helm', name: "Keeper's Helm", slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Sieges end. The keeper doesn't have to.",
    statBonuses: { defense: 11, attack: 3 }, levelRequirement: 15, value: 42
  },
  siegehide_plate: {
    id: 'siegehide_plate', name: 'Siegehide Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Outlasted three walls already. Still hasn't dented.",
    statBonuses: { defense: 15, maxHp: 24 }, levelRequirement: 15, value: 48
  },
  stonelock_gauntlets: {
    id: 'stonelock_gauntlets', name: 'Stonelock Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Once closed, they don't open until the fight decides to.",
    statBonuses: { attack: 7, defense: 7 }, levelRequirement: 15, value: 42
  },
  holdfast_greaves: {
    id: 'holdfast_greaves', name: 'Holdfast Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The line holds here, mostly because leaving was never considered.',
    statBonuses: { defense: 11, maxHp: 14 }, levelRequirement: 15, value: 42
  },
  aegis_blade: {
    id: 'aegis_blade', name: 'Aegis Blade', slot: 'weapon', weaponType: 'sword',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'It parries first and cuts second, and most fights end somewhere in between.',
    statBonuses: { attack: 14, defense: 12 }, levelRequirement: 25, value: 78
  },
  unbroken_faceguard: {
    id: 'unbroken_faceguard', name: 'Unbroken Faceguard', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Nothing's gotten through it yet. Nothing's tried twice.",
    statBonuses: { defense: 14, attack: 4 }, levelRequirement: 25, value: 58
  },
  deflecting_plate: {
    id: 'deflecting_plate', name: 'Deflecting Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "It doesn't block the hit so much as decide it landed somewhere else.",
    statBonuses: { defense: 19, maxHp: 30 }, levelRequirement: 25, value: 65
  },
  wardbound_gauntlets: {
    id: 'wardbound_gauntlets', name: 'Wardbound Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Every strike it stops gets added to a tally nobody's kept count of but him.",
    statBonuses: { attack: 9, defense: 9 }, levelRequirement: 25, value: 58
  },
  steadfast_greaves: {
    id: 'steadfast_greaves', name: 'Steadfast Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "The ground shifts. These don't consider it their problem.",
    statBonuses: { defense: 14, maxHp: 18 }, levelRequirement: 25, value: 58
  },
  bastions_warhammer: {
    id: 'bastions_warhammer', name: "Bastion's Warhammer", slot: 'weapon', weaponType: 'hammer',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Every swing resets the line -- there\'s nowhere else worth standing after.',
    statBonuses: { attack: 18, defense: 16 }, levelRequirement: 40, value: 130
  },
  citadel_helm: {
    id: 'citadel_helm', name: 'Citadel Helm', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Armies besiege citadels for years. This one's never once needed the walls.",
    statBonuses: { defense: 19, attack: 6 }, levelRequirement: 40, value: 95
  },
  fortress_plate: {
    id: 'fortress_plate', name: 'Fortress Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Somewhere between armor and architecture, and closer to the latter.',
    statBonuses: { defense: 25, maxHp: 40 }, levelRequirement: 40, value: 108
  },
  grasp_of_stone: {
    id: 'grasp_of_stone', name: 'Grasp of Stone', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'What it holds onto stays held, regardless of opinion.',
    statBonuses: { attack: 12, defense: 13 }, levelRequirement: 40, value: 95
  },
  unyielding_greaves: {
    id: 'unyielding_greaves', name: 'Unyielding Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The retreat order reaches these last, if it reaches them at all.',
    statBonuses: { defense: 19, maxHp: 24 }, levelRequirement: 40, value: 95
  },
  immovable_line: {
    id: 'immovable_line', name: 'Immovable Line', slot: 'weapon', weaponType: 'spear', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'It doesn\'t hold ground. Ground just stops moving near it.',
    statBonuses: { attack: 22, defense: 20 }, levelRequirement: 60, value: 210
  },
  last_lines_helm: {
    id: 'last_lines_helm', name: "Last Line's Helm", slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "Past this, there's nothing else standing between the enemy and everyone behind him.",
    statBonuses: { defense: 24, attack: 8 }, levelRequirement: 60, value: 165
  },
  unmoving_plate: {
    id: 'unmoving_plate', name: 'Unmoving Plate', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Battles have ended around it without it ever needing to move.',
    statBonuses: { defense: 32, maxHp: 52 }, levelRequirement: 60, value: 185
  },
  world_anchor_gauntlets: {
    id: 'world_anchor_gauntlets', name: 'World-Anchor Gauntlets', slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Whatever they grip stops being negotiable.',
    statBonuses: { attack: 15, defense: 17 }, levelRequirement: 60, value: 165
  },
  rootbound_greaves: {
    id: 'rootbound_greaves', name: 'Rootbound Greaves', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Uprooting these would mean uprooting the ground they\'re standing on.',
    statBonuses: { defense: 24, maxHp: 30 }, levelRequirement: 60, value: 165
  },

  // --- Trickster-flavored gear: not class-locked, just statted and written
  // for the attack/critChance-heavy trickster line (trickster -> conartist
  // -> deceiver -> grifter -> miragedancer -> grandillusionist in
  // classes.js). Weapon types alternate dagger/bow, matching
  // allowedWeaponTypes.
  feinting_blade: {
    id: 'feinting_blade', name: 'Feinting Blade', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'The first cut is a lie. Nobody notices the second one coming.',
    statBonuses: { attack: 5, critChance: 8 }, levelRequirement: 3, value: 20
  },
  bluffers_mask: {
    id: 'bluffers_mask', name: "Bluffer's Mask", slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Every expression underneath it is exactly as true as it needs to be.',
    statBonuses: { defense: 3, critChance: 3 }, levelRequirement: 3, value: 12
  },
  charade_vest: {
    id: 'charade_vest', name: 'Charade Vest', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Plays the part of sturdy well enough that nobody\'s checked.',
    statBonuses: { defense: 5, maxHp: 10 }, levelRequirement: 3, value: 15
  },
  sham_gloves: {
    id: 'sham_gloves', name: 'Sham Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'One hand shows the trick. The other one does it.',
    statBonuses: { attack: 3, critChance: 3 }, levelRequirement: 3, value: 12
  },
  decoy_slippers: {
    id: 'decoy_slippers', name: 'Decoy Slippers', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'The footsteps you hear are never the ones that matter.',
    statBonuses: { defense: 3, critChance: 2 }, levelRequirement: 3, value: 12
  },
  ruse_recurve: {
    id: 'ruse_recurve', name: 'Ruse Recurve', slot: 'weapon', weaponType: 'bow',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'It aims where you\'re looking. The arrow goes where you weren\'t.',
    statBonuses: { attack: 7, critChance: 11 }, levelRequirement: 6, value: 46
  },
  ploy_hood: {
    id: 'ploy_hood', name: 'Ploy Hood', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Pulled low, it turns a plan already in motion into one nobody\'s noticed yet.',
    statBonuses: { defense: 5, critChance: 5 }, levelRequirement: 6, value: 30
  },
  hoax_coat: {
    id: 'hoax_coat', name: 'Hoax Coat', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Looks like it was thrown together. It was, and that\'s the point.',
    statBonuses: { defense: 8, maxHp: 16 }, levelRequirement: 6, value: 36
  },
  con_artists_gloves: {
    id: 'con_artists_gloves', name: "Con Artist's Gloves", slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'The handshake is real. Everything agreed to during it isn\'t.',
    statBonuses: { attack: 5, critChance: 5 }, levelRequirement: 6, value: 30
  },
  subterfuge_boots: {
    id: 'subterfuge_boots', name: 'Subterfuge Boots', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Wherever they\'re pointed is the one direction nothing\'s about to happen.',
    statBonuses: { defense: 5, critChance: 4 }, levelRequirement: 6, value: 30
  },
  sleighthand_stiletto: {
    id: 'sleighthand_stiletto', name: 'Sleight-Hand Stiletto', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'One second it\'s a coin trick. The next, it isn\'t.',
    statBonuses: { attack: 9, critChance: 14 }, levelRequirement: 15, value: 58
  },
  double_cross_cowl: {
    id: 'double_cross_cowl', name: 'Double-Cross Cowl', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Whoever agreed to the first deal never gets told about the second one.',
    statBonuses: { defense: 7, critChance: 7 }, levelRequirement: 15, value: 42
  },
  deceivers_wrap: {
    id: 'deceivers_wrap', name: "Deceiver's Wrap", slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Every layer underneath tells a different story than the one on top.',
    statBonuses: { defense: 11, maxHp: 22 }, levelRequirement: 15, value: 48
  },
  fools_grasp: {
    id: 'fools_grasp', name: "Fool's Grasp", slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'It only ever closes on what it was reaching for.',
    statBonuses: { attack: 7, critChance: 7 }, levelRequirement: 15, value: 42
  },
  diversion_treads: {
    id: 'diversion_treads', name: 'Diversion Treads', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'By the time anyone looks where they pointed, the real move\'s already made.',
    statBonuses: { defense: 7, critChance: 6 }, levelRequirement: 15, value: 42
  },
  misdirection_bow: {
    id: 'misdirection_bow', name: 'Misdirection Bow', slot: 'weapon', weaponType: 'bow',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'By the time anyone hears the string, the story\'s already been told wrong.',
    statBonuses: { attack: 12, critChance: 17 }, levelRequirement: 25, value: 78
  },
  hall_of_mirrors_cowl: {
    id: 'hall_of_mirrors_cowl', name: 'Hall-of-Mirrors Cowl', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Count the reflections all you like. Only one of them was ever real.',
    statBonuses: { defense: 9, critChance: 9 }, levelRequirement: 25, value: 58
  },
  false_face_coat: {
    id: 'false_face_coat', name: 'False Face Coat', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'The face it shows changes. The one underneath never does.',
    statBonuses: { defense: 14, maxHp: 28 }, levelRequirement: 25, value: 65
  },
  grifters_grip: {
    id: 'grifters_grip', name: "Grifter's Grip", slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Shakes on the deal. Palms the deal\'s worth on the way out.',
    statBonuses: { attack: 9, critChance: 10 }, levelRequirement: 25, value: 58
  },
  phantom_step_boots: {
    id: 'phantom_step_boots', name: 'Phantom Step Boots', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'The footprints stop mattering once nobody can say where they led.',
    statBonuses: { defense: 9, critChance: 8 }, levelRequirement: 25, value: 58
  },
  masquerade_fang: {
    id: 'masquerade_fang', name: 'Masquerade Fang', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Everyone at the table remembers a different face holding it.',
    statBonuses: { attack: 15, critChance: 21 }, levelRequirement: 40, value: 130
  },
  mirage_hood: {
    id: 'mirage_hood', name: 'Mirage Hood', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The shape underneath it is a rumor that keeps changing its mind.',
    statBonuses: { defense: 12, critChance: 12 }, levelRequirement: 40, value: 95
  },
  smoke_and_mirrors_cloak: {
    id: 'smoke_and_mirrors_cloak', name: 'Smoke-and-Mirrors Cloak', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'There\'s nothing behind the trick except more trick.',
    statBonuses: { defense: 18, maxHp: 36 }, levelRequirement: 40, value: 108
  },
  ghost_step_grips: {
    id: 'ghost_step_grips', name: 'Ghost-Step Grips', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Whatever they take hold of, the owner swears they still have it.',
    statBonuses: { attack: 12, critChance: 13 }, levelRequirement: 40, value: 95
  },
  vanishing_greaves: {
    id: 'vanishing_greaves', name: 'Vanishing Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The trick was never leaving. It was making the exit look like nothing happened.',
    statBonuses: { defense: 12, critChance: 11 }, levelRequirement: 40, value: 95
  },
  tricksters_last_word: {
    id: 'tricksters_last_word', name: "Trickster's Last Word", slot: 'weapon', weaponType: 'bow', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Nobody agrees on what was said before it fired. Everyone agrees it landed.',
    statBonuses: { attack: 19, critChance: 27 }, levelRequirement: 60, value: 210
  },
  grand_illusion_mask: {
    id: 'grand_illusion_mask', name: 'Grand Illusion Mask', slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'The reveal never comes. That\'s the whole trick.',
    statBonuses: { defense: 15, critChance: 16 }, levelRequirement: 60, value: 165
  },
  tricksters_guise: {
    id: 'tricksters_guise', name: "Trickster's Guise", slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Nobody who\'s seen it can agree it was ever there at all.',
    statBonuses: { defense: 23, maxHp: 46 }, levelRequirement: 60, value: 185
  },
  final_gambit_gauntlets: {
    id: 'final_gambit_gauntlets', name: 'Final Gambit Gauntlets', slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'There\'s no move after this one. It was never going to need one.',
    statBonuses: { attack: 15, critChance: 17 }, levelRequirement: 60, value: 165
  },
  last_laugh_greaves: {
    id: 'last_laugh_greaves', name: 'Last Laugh Greaves', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Whoever\'s still standing when the joke lands wasn\'t the punchline.',
    statBonuses: { defense: 15, critChance: 14 }, levelRequirement: 60, value: 165
  },

  // --- Webslinger-flavored gear: not class-locked, just statted and
  // written for the attack/defense/critChance-heavy webslinger line
  // (webslinger -> streetlineprowler -> rooftopsentinel -> highrisevigilante
  // -> skylinephantom -> metropolisguardian in classes.js).
  // Weapon types alternate dagger/gauntlet, matching allowedWeaponTypes.
  webline_shiv: {
    id: 'webline_shiv', name: 'Webline Shiv', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'A short blade strung to a spool of tensile cord -- climbs and cuts in the same motion.',
    statBonuses: { attack: 6, critChance: 7 }, levelRequirement: 3, value: 20
  },
  backstreet_goggles: {
    id: 'backstreet_goggles', name: 'Backstreet Goggles', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Cheap lenses, but they catch a shape moving before the shape decides it's been seen.",
    statBonuses: { defense: 4, critChance: 2 }, levelRequirement: 3, value: 12
  },
  patchwork_undersuit: {
    id: 'patchwork_undersuit', name: 'Patchwork Undersuit', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Every panel came off a different roll of fabric. None of them have torn yet.",
    statBonuses: { defense: 6, maxHp: 10 }, levelRequirement: 3, value: 15
  },
  grapplers_webgrips: {
    id: 'grapplers_webgrips', name: "Grappler's Webgrips", slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "The tack wears thin by the third building, and somehow that's still enough.",
    statBonuses: { attack: 4, critChance: 2 }, levelRequirement: 3, value: 12
  },
  wallrunner_treads: {
    id: 'wallrunner_treads', name: 'Wallrunner Treads', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: "Gravity's a suggestion these have mostly stopped listening to.",
    statBonuses: { defense: 4, critChance: 1 }, levelRequirement: 3, value: 12
  },
  streetline_knuckles: {
    id: 'streetline_knuckles', name: 'Streetline Knuckles', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'A pair of coiled launchers built into the knuckles, humming with tension a half-second before they fire.',
    statBonuses: { attack: 8, critChance: 9 }, levelRequirement: 6, value: 46
  },
  streetlight_visor: {
    id: 'streetlight_visor', name: 'Streetlight Visor', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Filters out the glare from every sign on the block, and most of what's hiding behind it.",
    statBonuses: { defense: 6, critChance: 4 }, levelRequirement: 6, value: 30
  },
  reinforced_underweave: {
    id: 'reinforced_underweave', name: 'Reinforced Underweave', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Stitched to take a fall from three stories, tested from considerably more.',
    statBonuses: { defense: 9, maxHp: 16 }, levelRequirement: 6, value: 36
  },
  tensioncoil_gloves: {
    id: 'tensioncoil_gloves', name: 'Tension-Coil Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "The grip doesn't fail. The wall underneath occasionally does.",
    statBonuses: { attack: 6, critChance: 4 }, levelRequirement: 6, value: 30
  },
  ledgerunner_boots: {
    id: 'ledgerunner_boots', name: 'Ledge-Runner Boots', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "The edge of the roof stopped being the end of the route a while ago.",
    statBonuses: { defense: 6, critChance: 3 }, levelRequirement: 6, value: 30
  },
  rooftop_stinger: {
    id: 'rooftop_stinger', name: 'Rooftop Stinger', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Never drawn until the fall's already started -- by the time it's out, the landing's already decided.",
    statBonuses: { attack: 11, critChance: 12 }, levelRequirement: 15, value: 58
  },
  nightwatch_cowl: {
    id: 'nightwatch_cowl', name: 'Nightwatch Cowl', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Nobody's caught a good look at the face under it. That's rather the idea.",
    statBonuses: { defense: 8, critChance: 6 }, levelRequirement: 15, value: 42
  },
  kevlarweave_suit: {
    id: 'kevlarweave_suit', name: 'Kevlar-Weave Suit', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Stops a blade, stops a fall, stops most conversations before they start.',
    statBonuses: { defense: 13, maxHp: 22 }, levelRequirement: 15, value: 48
  },
  adhesive_grip_gauntlets: {
    id: 'adhesive_grip_gauntlets', name: 'Adhesive Grip Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'What they land on, they stay on -- brick, glass, or someone\'s collar.',
    statBonuses: { attack: 8, critChance: 6 }, levelRequirement: 15, value: 42
  },
  rooftop_treads: {
    id: 'rooftop_treads', name: 'Rooftop Treads', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Three jumps ahead of wherever the chase thinks it's going.",
    statBonuses: { defense: 8, critChance: 5 }, levelRequirement: 15, value: 42
  },
  highrise_gauntlet: {
    id: 'highrise_gauntlet', name: 'Highrise Gauntlet', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Every punch trails a line back to the last rooftop, just in case the ground has other ideas.',
    statBonuses: { attack: 14, critChance: 15 }, levelRequirement: 25, value: 78
  },
  highrise_cowl: {
    id: 'highrise_cowl', name: 'Highrise Cowl', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Filters the wind noise at forty stories down to something almost like quiet.',
    statBonuses: { defense: 10, critChance: 8 }, levelRequirement: 25, value: 58
  },
  impact_weave_suit: {
    id: 'impact_weave_suit', name: 'Impact-Weave Suit', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Every seam's built to absorb a landing nobody else would walk away from.",
    statBonuses: { defense: 16, maxHp: 28 }, levelRequirement: 25, value: 65
  },
  shockabsorb_gloves: {
    id: 'shockabsorb_gloves', name: 'Shock-Absorb Gloves', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "The impact goes somewhere. It's just never anywhere that matters.",
    statBonuses: { attack: 10, critChance: 9 }, levelRequirement: 25, value: 58
  },
  skyscraper_boots: {
    id: 'skyscraper_boots', name: 'Skyscraper Boots', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Height stopped being a variable in the plan a few tiers back.',
    statBonuses: { defense: 10, critChance: 7 }, levelRequirement: 25, value: 58
  },
  skyline_fang: {
    id: 'skyline_fang', name: 'Skyline Fang', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Drops from twelve stories up and somehow still finds the exact same angle every time.',
    statBonuses: { attack: 18, critChance: 18 }, levelRequirement: 40, value: 130
  },
  cityscape_mask: {
    id: 'cityscape_mask', name: 'Cityscape Mask', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Reads the whole block at a glance -- rooftops, alleys, and the one window that matters.",
    statBonuses: { defense: 13, critChance: 11 }, levelRequirement: 40, value: 95
  },
  aerial_weave_suit: {
    id: 'aerial_weave_suit', name: 'Aerial-Weave Suit', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Cut for a body that spends more time airborne than not.',
    statBonuses: { defense: 20, maxHp: 36 }, levelRequirement: 40, value: 108
  },
  momentum_gloves: {
    id: 'momentum_gloves', name: 'Momentum Gloves', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Every swing banks speed for the next one, and the next one's already started.",
    statBonuses: { attack: 13, critChance: 12 }, levelRequirement: 40, value: 95
  },
  freefall_boots: {
    id: 'freefall_boots', name: 'Freefall Boots', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The ground arrives eventually. These just make sure it arrives on schedule.',
    statBonuses: { defense: 13, critChance: 10 }, levelRequirement: 40, value: 95
  },
  citywide_reflex_gauntlets: {
    id: 'citywide_reflex_gauntlets', name: 'Citywide Reflex Gauntlets', slot: 'weapon', weaponType: 'gauntlet', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "By the time the danger registers, the swing's already three blocks away.",
    statBonuses: { attack: 23, critChance: 23 }, levelRequirement: 60, value: 210
  },
  metropolis_mask: {
    id: 'metropolis_mask', name: 'Metropolis Mask', slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'The whole skyline reads like a map only this mask bothers to check twice.',
    statBonuses: { defense: 16, critChance: 15 }, levelRequirement: 60, value: 165
  },
  urban_guardian_suit: {
    id: 'urban_guardian_suit', name: 'Urban Guardian Suit', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "Every panel's been torn once and mended twice, and it still hasn't slowed him down.",
    statBonuses: { defense: 25, maxHp: 46 }, levelRequirement: 60, value: 185
  },
  kinetic_impact_gauntlets: {
    id: 'kinetic_impact_gauntlets', name: 'Kinetic Impact Gauntlets', slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'By the time the punch lands, three more are already committed.',
    statBonuses: { attack: 16, critChance: 16 }, levelRequirement: 60, value: 165
  },
  groundless_boots: {
    id: 'groundless_boots', name: 'Groundless Boots', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "The ground's optional. These decided that a long time ago.",
    statBonuses: { defense: 16, critChance: 13 }, levelRequirement: 60, value: 165
  },

  // --- Mechanic-flavored gear: not class-locked, just statted and written
  // for the hybrid attack/defense/magicPower/critChance mechanic line
  // (novicemechanic -> engineer -> runesmith -> archmechanist ->
  // technomancer -> clockworkgod in classes.js). Weapon types cycle through
  // dagger/gun/staff/bow/gauntlet, matching that line's allowedWeaponTypes,
  // looping back to dagger for the tier-6 capstone.
  tuning_fork_blade: {
    id: 'tuning_fork_blade', name: 'Tuning-Fork Blade', slot: 'weapon', weaponType: 'dagger',
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Struck once before every cut, just to make sure the angle still rings true.',
    statBonuses: { attack: 5, magicPower: 3, critChance: 3 }, levelRequirement: 3, value: 20
  },
  brass_optic_loupe: {
    id: 'brass_optic_loupe', name: 'Brass Optic Loupe', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Flips down over one eye and turns guesswork into a measurement.',
    statBonuses: { defense: 3, magicPower: 3 }, levelRequirement: 3, value: 12
  },
  riveted_work_vest: {
    id: 'riveted_work_vest', name: 'Riveted Work Vest', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Every pocket carries a tool for a problem that hasn\'t happened yet.',
    statBonuses: { defense: 4, maxHp: 9 }, levelRequirement: 3, value: 14
  },
  finetuned_gloves: {
    id: 'finetuned_gloves', name: 'Fine-Tuned Gloves', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Calibrated so often the calluses have started to match the dials.',
    statBonuses: { attack: 3, magicPower: 3 }, levelRequirement: 3, value: 12
  },
  springcoil_boots: {
    id: 'springcoil_boots', name: 'Spring-Coil Boots', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 1,
    flavor: 'Overbuilt for walking, which is exactly why they\'ve never once failed at it.',
    statBonuses: { defense: 2, critChance: 3 }, levelRequirement: 3, value: 12
  },
  calibrated_repeater: {
    id: 'calibrated_repeater', name: 'Calibrated Repeater', slot: 'weapon', weaponType: 'gun',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Every shot gets logged, measured, and quietly improved on for the next one.',
    statBonuses: { attack: 7, magicPower: 5, critChance: 5 }, levelRequirement: 6, value: 46
  },
  geared_optics: {
    id: 'geared_optics', name: 'Geared Optics', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'A dozen tiny lenses, all arguing about the right amount of magnification.',
    statBonuses: { defense: 5, magicPower: 5 }, levelRequirement: 6, value: 30
  },
  plated_coveralls: {
    id: 'plated_coveralls', name: 'Plated Coveralls', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Scorch marks in a dozen places, none of them from the same accident.',
    statBonuses: { defense: 7, maxHp: 14 }, levelRequirement: 6, value: 34
  },
  precision_gauntlet_grips: {
    id: 'precision_gauntlet_grips', name: 'Precision Gauntlet Grips', slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Steady enough to solder a wire mid-swing and not miss either shot.',
    statBonuses: { attack: 5, magicPower: 4 }, levelRequirement: 6, value: 30
  },
  torsionspring_treads: {
    id: 'torsionspring_treads', name: 'Torsion-Spring Treads', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Store a step\'s worth of momentum and spend it on the next one instead.',
    statBonuses: { defense: 4, critChance: 4 }, levelRequirement: 6, value: 30
  },
  resonance_conduit: {
    id: 'resonance_conduit', name: 'Resonance Conduit', slot: 'weapon', weaponType: 'staff',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Theory made hardware -- it hums the formula before the caster remembers it.',
    statBonuses: { attack: 9, magicPower: 9, critChance: 6 }, levelRequirement: 15, value: 58
  },
  analytic_engine_visor: {
    id: 'analytic_engine_visor', name: 'Analytic Engine Visor', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Runs the numbers on a fight before the fight\'s finished starting.',
    statBonuses: { defense: 7, magicPower: 7 }, levelRequirement: 15, value: 42
  },
  ironclad_overalls: {
    id: 'ironclad_overalls', name: 'Ironclad Overalls', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Reinforced in every spot the last set failed, and tested the same way.',
    statBonuses: { defense: 10, maxHp: 20 }, levelRequirement: 15, value: 46
  },
  servoassisted_grips: {
    id: 'servoassisted_grips', name: 'Servo-Assisted Grips', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The hand does the aiming. The motor does the rest of the argument.',
    statBonuses: { attack: 7, magicPower: 6 }, levelRequirement: 15, value: 42
  },
  gyroscopic_greaves: {
    id: 'gyroscopic_greaves', name: 'Gyroscopic Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Whatever the ground does next, these already decided not to care.',
    statBonuses: { defense: 6, critChance: 6 }, levelRequirement: 15, value: 42
  },
  autoloading_crossbow_array: {
    id: 'autoloading_crossbow_array', name: 'Autoloading Crossbow Array', slot: 'weapon', weaponType: 'bow',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Three bolts queued before the first one lands, and a fourth already spinning up.',
    statBonuses: { attack: 12, magicPower: 10, critChance: 9 }, levelRequirement: 25, value: 78
  },
  farsight_rangefinder: {
    id: 'farsight_rangefinder', name: 'Farsight Rangefinder', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Reads windage, distance, and intent, mostly in that order.',
    statBonuses: { defense: 9, magicPower: 9 }, levelRequirement: 25, value: 58
  },
  reinforced_exovest: {
    id: 'reinforced_exovest', name: 'Reinforced Exo-Vest', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'The frame takes the hit first and files a report on it after.',
    statBonuses: { defense: 13, maxHp: 26 }, levelRequirement: 25, value: 62
  },
  autotune_grips: {
    id: 'autotune_grips', name: 'Autotune Grips', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Corrects the swing mid-motion, whether or not it was asked to.',
    statBonuses: { attack: 9, magicPower: 8 }, levelRequirement: 25, value: 58
  },
  stabilizer_greaves: {
    id: 'stabilizer_greaves', name: 'Stabilizer Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'They correct a stumble faster than anyone watching can register one happened.',
    statBonuses: { defense: 8, critChance: 8 }, levelRequirement: 25, value: 58
  },
  overdrive_knuckles: {
    id: 'overdrive_knuckles', name: 'Overdrive Knuckles', slot: 'weapon', weaponType: 'gauntlet',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Redlines on every punch and somehow never once seizes up.',
    statBonuses: { attack: 18, magicPower: 15, critChance: 13 }, levelRequirement: 40, value: 130
  },
  omniscope_array: {
    id: 'omniscope_array', name: 'Omniscope Array', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Sees the weak point, the wind-up, and the exit, all before the first move.',
    statBonuses: { defense: 13, magicPower: 13 }, levelRequirement: 40, value: 95
  },
  fusioncore_vest: {
    id: 'fusioncore_vest', name: 'Fusion-Core Vest', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Warm to the touch, always, regardless of the weather or the fight.',
    statBonuses: { defense: 17, maxHp: 34 }, levelRequirement: 40, value: 102
  },
  kinetic_amplifier_gloves: {
    id: 'kinetic_amplifier_gloves', name: 'Kinetic Amplifier Gloves', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Every impact gets stored, refined, and handed right back with interest.',
    statBonuses: { attack: 13, magicPower: 12 }, levelRequirement: 40, value: 95
  },
  momentum_stabilizers: {
    id: 'momentum_stabilizers', name: 'Momentum Stabilizers', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Nothing about the footing is left to chance anymore, least of all the chance.',
    statBonuses: { defense: 12, critChance: 11 }, levelRequirement: 40, value: 95
  },
  perpetual_motion_blade: {
    id: 'perpetual_motion_blade', name: 'Perpetual Motion Blade', slot: 'weapon', weaponType: 'dagger', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'The theory said it was impossible. The blade never got the memo.',
    statBonuses: { attack: 26, magicPower: 22, critChance: 18 }, levelRequirement: 60, value: 210
  },
  clockwork_divinity_optics: {
    id: 'clockwork_divinity_optics', name: 'Clockwork Divinity Optics', slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Every gear behind the lens turns toward the same conclusion, always correctly.',
    statBonuses: { defense: 18, magicPower: 18 }, levelRequirement: 60, value: 165
  },
  grand_automaton_chassis: {
    id: 'grand_automaton_chassis', name: 'Grand Automaton Chassis', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Somewhere past the hundredth revision, it stopped being armor and started being the answer.',
    statBonuses: { defense: 24, maxHp: 48 }, levelRequirement: 60, value: 178
  },
  singularity_gauntlets: {
    id: 'singularity_gauntlets', name: 'Singularity Gauntlets', slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Whatever they\'re pointed at stops being a separate problem from them.',
    statBonuses: { attack: 18, magicPower: 17 }, levelRequirement: 60, value: 165
  },
  infinite_gear_treads: {
    id: 'infinite_gear_treads', name: 'Infinite Gear Treads', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'The mechanism inside has never once needed winding, and nobody\'s brave enough to ask why.',
    statBonuses: { defense: 17, critChance: 15 }, levelRequirement: 60, value: 165
  },

  // --- Quest items: not equippable, not sold in the shop (see
  // SHOP_ITEM_IDS below) -- found and consumed through activities instead.
  bent_cog: {
    id: 'bent_cog', name: 'Bent Cog', slot: 'quest', weaponType: null,
    rarity: 'common', element: 'none', tier: 0,
    flavor: "Still faintly warm, and heavier than it looks. It doesn't seem to belong to anything -- yet.",
    statBonuses: {}, levelRequirement: 1, value: 0, questItem: true, unique: true
  },
  runic_relic: {
    id: 'runic_relic', name: 'Runic Relic', slot: 'quest', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 0,
    flavor: "Etched with a script that predates the factory floor by a long way. It hums when the workshop goes quiet.",
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
  cutpurses_recurve: {
    id: 'cutpurses_recurve', name: "Cutpurse's Recurve", slot: 'weapon', weaponType: 'bow',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Short enough to draw from under a cloak, quiet enough that the mark never turns around.',
    statBonuses: { attack: 9, critChance: 8 }, levelRequirement: 6, value: 46
  },
  smokeveil_mask: {
    id: 'smokeveil_mask', name: 'Smokeveil Mask', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Thin enough to breathe through, thick enough that no one recognizes the breather.',
    statBonuses: { defense: 5, critChance: 5 }, levelRequirement: 6, value: 30
  },
  secondstory_coat: {
    id: 'secondstory_coat', name: "Second-Story Coat", slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Cut for climbing, not for looking respectable at the door.',
    statBonuses: { defense: 8, maxHp: 16 }, levelRequirement: 6, value: 36
  },
  filchers_grip: {
    id: 'filchers_grip', name: "Filcher's Grip", slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: "Whatever brushes past these fingers rarely notices it's gone.",
    statBonuses: { attack: 5, critChance: 5 }, levelRequirement: 6, value: 30
  },
  quickstep_boots: {
    id: 'quickstep_boots', name: 'Quickstep Boots', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'The soles never quite touch the ground the way anyone expects.',
    statBonuses: { defense: 5, critChance: 4 }, levelRequirement: 6, value: 30
  },
  vanguards_maul: {
    id: 'vanguards_maul', name: "Vanguard's Maul", slot: 'weapon', weaponType: 'hammer',
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'The line holds where this lands, and it lands wherever the line is thinnest.',
    statBonuses: { attack: 9, defense: 5 }, levelRequirement: 6, value: 46
  },
  ironbrow_helm: {
    id: 'ironbrow_helm', name: 'Ironbrow Helm', slot: 'head', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'The dent above the eye is the reason there\'s still an eye there.',
    statBonuses: { defense: 7, attack: 3 }, levelRequirement: 6, value: 30
  },
  shieldwall_cuirass: {
    id: 'shieldwall_cuirass', name: 'Shieldwall Cuirass', slot: 'body', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Built to hold a line, not to look good doing it.',
    statBonuses: { defense: 10, maxHp: 16 }, levelRequirement: 6, value: 36
  },
  grapplers_vambraces: {
    id: 'grapplers_vambraces', name: "Grappler's Vambraces", slot: 'hands', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Grip a shield, grip a throat, doesn\'t much care which.',
    statBonuses: { attack: 7, defense: 3 }, levelRequirement: 6, value: 30
  },
  sure_footed_greaves: {
    id: 'sure_footed_greaves', name: 'Sure-Footed Greaves', slot: 'legs', weaponType: null,
    rarity: 'uncommon', element: 'none', tier: 2,
    flavor: 'Nothing on the field has managed to put him on his back yet.',
    statBonuses: { defense: 7, maxHp: 10 }, levelRequirement: 6, value: 30
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
  silent_edge: {
    id: 'silent_edge', name: 'Silent Edge', slot: 'weapon', weaponType: 'sword',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The draw and the cut are the same motion -- there\'s no second sound to hear.',
    statBonuses: { attack: 12, critChance: 9 }, levelRequirement: 15, value: 58
  },
  hushed_cowl: {
    id: 'hushed_cowl', name: 'Hushed Cowl', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Even a shout comes out of this a whisper.',
    statBonuses: { defense: 7, critChance: 7 }, levelRequirement: 15, value: 42
  },
  nightseam_vest: {
    id: 'nightseam_vest', name: 'Nightseam Vest', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The stitching runs the color out of any light that finds it.',
    statBonuses: { defense: 11, maxHp: 22 }, levelRequirement: 15, value: 48
  },
  dead_mans_latch: {
    id: 'dead_mans_latch', name: "Dead Man's Latch", slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Named for the last grip it undid. Nobody asks whose.',
    statBonuses: { attack: 7, critChance: 7 }, levelRequirement: 15, value: 42
  },
  silent_soles: {
    id: 'silent_soles', name: 'Silent Soles', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Every floorboard in the city knows to stay quiet for these.',
    statBonuses: { defense: 7, critChance: 6 }, levelRequirement: 15, value: 42
  },
  warbringers_pike: {
    id: 'warbringers_pike', name: "Warbringer's Pike", slot: 'weapon', weaponType: 'spear',
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'Negotiations end at the reach of this thing, well before anyone else wanted them to.',
    statBonuses: { attack: 12, defense: 6 }, levelRequirement: 15, value: 58
  },
  warcrest_helm: {
    id: 'warcrest_helm', name: 'Warcrest Helm', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Every dent's a story. Every story ends the same way.",
    statBonuses: { defense: 9, attack: 5 }, levelRequirement: 15, value: 42
  },
  ironclad_plate: {
    id: 'ironclad_plate', name: 'Ironclad Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Doesn't flex, doesn't bend, doesn't ask twice.",
    statBonuses: { defense: 13, maxHp: 22 }, levelRequirement: 15, value: 48
  },
  clenched_gauntlets: {
    id: 'clenched_gauntlets', name: 'Clenched Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: 'The fist closes before the plan does.',
    statBonuses: { attack: 9, defense: 5 }, levelRequirement: 15, value: 42
  },
  siegebreaker_greaves: {
    id: 'siegebreaker_greaves', name: 'Siegebreaker Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 3,
    flavor: "Walls fall eventually. These don't wait around for it.",
    statBonuses: { defense: 9, maxHp: 14 }, levelRequirement: 15, value: 42
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
  nightfall_fang: {
    id: 'nightfall_fang', name: 'Nightfall Fang', slot: 'weapon', weaponType: 'dagger',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'By the time the streetlamps catch the glint, it\'s already back in its sheath.',
    statBonuses: { attack: 16, critChance: 11 }, levelRequirement: 25, value: 78
  },
  watchbreaker_mask: {
    id: 'watchbreaker_mask', name: 'Watchbreaker Mask', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Every watch captain's sworn they've seen it. None have described it the same way twice.",
    statBonuses: { defense: 9, critChance: 9 }, levelRequirement: 25, value: 58
  },
  rooftop_runners_coat: {
    id: 'rooftop_runners_coat', name: "Rooftop Runner's Coat", slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Torn at the hem from landings nobody was meant to see.",
    statBonuses: { defense: 14, maxHp: 28 }, levelRequirement: 25, value: 65
  },
  garrote_wraps: {
    id: 'garrote_wraps', name: 'Garrote Wraps', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Thin cord under thick leather -- one end's for climbing, the other isn't.",
    statBonuses: { attack: 9, critChance: 10 }, levelRequirement: 25, value: 58
  },
  ledgewalker_boots: {
    id: 'ledgewalker_boots', name: 'Ledgewalker Boots', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "The grip holds on rooftops most people won't stand near the edge of.",
    statBonuses: { defense: 9, critChance: 8 }, levelRequirement: 25, value: 58
  },
  battlelords_greataxe: {
    id: 'battlelords_greataxe', name: "Battlelord's Greataxe", slot: 'weapon', weaponType: 'axe',
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Too heavy to parry, too slow to dodge twice. Most only make that mistake once.',
    statBonuses: { attack: 16, defense: 8 }, levelRequirement: 25, value: 78
  },
  frontline_helm: {
    id: 'frontline_helm', name: 'Frontline Helm', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'First one through the gate, every time, whether or not that\'s the plan.',
    statBonuses: { defense: 12, attack: 6 }, levelRequirement: 25, value: 58
  },
  warforged_plate: {
    id: 'warforged_plate', name: 'Warforged Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Tempered in a fire that was supposed to be a battlefield, not a forge.',
    statBonuses: { defense: 17, maxHp: 28 }, levelRequirement: 25, value: 65
  },
  crushing_gauntlets: {
    id: 'crushing_gauntlets', name: 'Crushing Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: "Doesn't grip. Doesn't need to.",
    statBonuses: { attack: 12, defense: 6 }, levelRequirement: 25, value: 58
  },
  onslaught_greaves: {
    id: 'onslaught_greaves', name: 'Onslaught Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 4,
    flavor: 'Retreat was never an option this pair was built for.',
    statBonuses: { defense: 12, maxHp: 18 }, levelRequirement: 25, value: 58
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
  wraithstring_longbow: {
    id: 'wraithstring_longbow', name: 'Wraithstring Longbow', slot: 'weapon', weaponType: 'bow',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The string is nearly invisible in daylight and makes no sound at all after dark.',
    statBonuses: { attack: 22, critChance: 14 }, levelRequirement: 40, value: 130
  },
  moonless_hood: {
    id: 'moonless_hood', name: 'Moonless Hood', slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Pulled up, the wearer stops being a shape worth following.',
    statBonuses: { defense: 12, critChance: 12 }, levelRequirement: 40, value: 95
  },
  gravedust_cloak: {
    id: 'gravedust_cloak', name: 'Gravedust Cloak', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Smells faintly of somewhere that was supposed to stay undisturbed.",
    statBonuses: { defense: 18, maxHp: 36 }, levelRequirement: 40, value: 108
  },
  deadfall_grips: {
    id: 'deadfall_grips', name: 'Deadfall Grips', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The last thing several marks felt closing around their wrist.',
    statBonuses: { attack: 12, critChance: 13 }, levelRequirement: 40, value: 95
  },
  fleetfoot_greaves: {
    id: 'fleetfoot_greaves', name: 'Fleetfoot Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "By the time the alarm's raised, these are three streets gone.",
    statBonuses: { defense: 12, critChance: 11 }, levelRequirement: 40, value: 95
  },
  juggernauts_warhammer: {
    id: 'juggernauts_warhammer', name: "Juggernaut's Warhammer", slot: 'weapon', weaponType: 'hammer',
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Armies plan around the swing radius, not the wielder. The numbers stopped mattering a while ago.',
    statBonuses: { attack: 22, defense: 11 }, levelRequirement: 40, value: 130
  },
  titans_helm: {
    id: 'titans_helm', name: "Titan's Helm", slot: 'head', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Wearing it doesn't make the wearer bigger. It just stops mattering that they aren't.",
    statBonuses: { defense: 16, attack: 9 }, levelRequirement: 40, value: 95
  },
  ironwall_plate: {
    id: 'ironwall_plate', name: 'Ironwall Plate', slot: 'body', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'Armies have learned to route around it rather than through.',
    statBonuses: { defense: 22, maxHp: 36 }, levelRequirement: 40, value: 108
  },
  crackedstone_gauntlets: {
    id: 'crackedstone_gauntlets', name: 'Crackedstone Gauntlets', slot: 'hands', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: 'The stone cracked first. The fist kept going.',
    statBonuses: { attack: 16, defense: 9 }, levelRequirement: 40, value: 95
  },
  warpath_greaves: {
    id: 'warpath_greaves', name: 'Warpath Greaves', slot: 'legs', weaponType: null,
    rarity: 'rare', element: 'none', tier: 5,
    flavor: "Every step leaves a mark nobody's in a hurry to fill in.",
    statBonuses: { defense: 16, maxHp: 24 }, levelRequirement: 40, value: 95
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
  umbral_reaper: {
    id: 'umbral_reaper', name: 'Umbral Reaper', slot: 'weapon', weaponType: 'sword', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Nobody claims to have seen the swing. Only the ones left standing get asked about it.',
    statBonuses: { attack: 30, critChance: 18 }, levelRequirement: 60, value: 210
  },
  the_unseen_face: {
    id: 'the_unseen_face', name: 'The Unseen Face', slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'No two witnesses describe the same face beneath it. Neither does the same witness twice.',
    statBonuses: { defense: 15, critChance: 16 }, levelRequirement: 60, value: 165
  },
  doubtcast_shroud: {
    id: 'doubtcast_shroud', name: 'Doubtcast Shroud', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Stand still in it and people start doubting they saw you enter the room at all.',
    statBonuses: { defense: 23, maxHp: 46 }, levelRequirement: 60, value: 185
  },
  last_words_grasp: {
    id: 'last_words_grasp', name: "Last Word's Grasp", slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "Whatever it takes hold of doesn't get mentioned in the report.",
    statBonuses: { attack: 15, critChance: 17 }, levelRequirement: 60, value: 165
  },
  vanishing_point_boots: {
    id: 'vanishing_point_boots', name: 'Vanishing Point Boots', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "There's a step, and then there's nothing where the step should be.",
    statBonuses: { defense: 15, critChance: 14 }, levelRequirement: 60, value: 165
  },
  colossal_greatsword: {
    id: 'colossal_greatsword', name: 'Colossal Greatsword', slot: 'weapon', weaponType: 'sword', effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'No one reinforces the line it\'s standing on. Reinforcements are for people still worried about losing.',
    statBonuses: { attack: 28, defense: 15 }, levelRequirement: 60, value: 210
  },
  colossal_faceguard: {
    id: 'colossal_faceguard', name: 'Colossal Faceguard', slot: 'head', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'Nobody remembers the face beneath it -- just the shape it stopped.',
    statBonuses: { defense: 20, attack: 12 }, levelRequirement: 60, value: 165
  },
  immutable_plate: {
    id: 'immutable_plate', name: 'Immutable Plate', slot: 'body', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "Armies plan around what's wearing this. The plate's never once needed adjusting.",
    statBonuses: { defense: 28, maxHp: 46 }, levelRequirement: 60, value: 185
  },
  worldbreaker_gauntlets: {
    id: 'worldbreaker_gauntlets', name: 'Worldbreaker Gauntlets', slot: 'hands', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: "It isn't a punch anymore. It's an argument nothing survives.",
    statBonuses: { attack: 20, defense: 12 }, levelRequirement: 60, value: 165
  },
  groundshaker_greaves: {
    id: 'groundshaker_greaves', name: 'Groundshaker Greaves', slot: 'legs', weaponType: null, effect: 'goldSparkle',
    rarity: 'epic', element: 'none', tier: 6,
    flavor: 'The ground moves before the feet do.',
    statBonuses: { defense: 20, maxHp: 30 }, levelRequirement: 60, value: 165
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
  // Same low-weight "discovery, not a drip-feed" logic as scavengeFind, but
  // gated to Engineer's own salvage work rather than the slums (see
  // workshop_salvage in activities.js).
  workshopFind: [
    { itemId: 'runic_relic', weight: 2 },
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

// Item `value` fields were originally tuned back when gold was only earned
// in lump sums every 15-25s. Now that activities pay out continuously (see
// activityEngine.js), that same gold flows in much faster, so a flat
// multiplier on top keeps gear feeling earned instead of near-free. Tune
// this one number rather than every item's value.
export const SHOP_PRICE_MULTIPLIER = 6;

export function shopPrice(template) {
  return Math.round(template.value * SHOP_PRICE_MULTIPLIER);
}
