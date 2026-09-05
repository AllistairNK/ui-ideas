// ---------------------------------------------------------------------------
// Progression paths -- dev reference only, not read by code. Keep in sync
// whenever a chain is added to or extended (the in-game class tree at
// js/ui/classTreeModal.js draws the real thing live from the data below).
//
// Mainline (CLASS_CHOICES, picked at CLASS_CHOICE_LEVEL):
//   Peasant -> Fighter -> Vanguard -> Warbringer -> Battlelord -> Juggernaut -> Colossus
//   Peasant -> Mage -> Conjurer -> Warlock -> Archmage -> Archwizard -> Astral Sovereign
//                    -> Gravity Mage (tier 2 only so far)
//   Peasant -> Rogue -> Shadowblade -> Assassin -> Nightstalker -> Wraith -> Umbral Sovereign
//
// Secret (SECRET_CLASS_IDS, gated by attribute reqs +/- a hidden trait):
//   Peasant -> Battlemage -> Spellblade -> Warmage -> Battlemagus -> Fateblade -> Fated Sovereign
//   Peasant -> Warden -> Bulwark -> Rampart -> Aegis -> Bastion -> Immovable
//   Peasant -> Trickster -> Con Artist -> Deceiver -> Grifter -> Mirage Dancer -> Grand Illusionist
//   Peasant -> Webslinger -> Streetline Prowler -> Rooftop Sentinel -> Highrise Vigilante -> Skyline Phantom -> Metropolis Guardian
//   Peasant -> Corpse Cultivator -> Charnel Adept -> Graveweaver -> Charnel Lord -> Undying Cultivator -> Undying Sovereign
//   Peasant -> Novice Mechanic -> Engineer -> Runesmith -> Archmechanist -> Technomancer -> Clockwork Divinity
//                                           -> Sniper (tier 3 only so far)
//     (Novice Mechanic -> Engineer branches via apprenticeship, not the usual unlockLevel gate)
//   Peasant -> Cultivator -> Qi Adept -> Meridian Breaker -> Core Former -> Nascent Soul -> Ascendant
//   Peasant -> Archer -> ??? (tier 1 only so far)
//   Peasant -> Fortune Teller -> ??? (tier 1 only so far)
// ---------------------------------------------------------------------------
export const CLASSES = {
  peasant: {
    id: 'peasant',
    name: 'Peasant',
    flavor: 'Nobody remembers a peasant\'s name -- there are too many, and today\'s work looks like yesterday\'s.',
    tier: 0,
    unlockLevel: 1,
    unlockAttributeReqs: null,
    statScaling: { attack: 0.6, defense: 0.5, magicPower: 0.4, critChance: 0.4 },
    allowedWeaponTypes: null, // no restriction
    bonusActivityIds: []
  },
  fighter: {
    id: 'fighter',
    name: 'Fighter',
    flavor: 'Nobody asks a fighter for a plan -- just where to point them.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { strength: 6 },
    statScaling: { attack: 1.1, defense: 0.9, magicPower: 0.2, critChance: 0.5 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: [],
    evolution: { classId: 'vanguard', unlockLevel: 15 }
  },
  vanguard: {
    id: 'vanguard',
    name: 'Vanguard',
    flavor: 'A vanguard doesn\'t wait for orders -- by the time they\'d arrive, the line\'s already moved.',
    tier: 2,
    evolvesFrom: 'fighter',
    statScaling: { attack: 1.3, defense: 1.1, magicPower: 0.2, critChance: 0.6 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: [],
    evolution: { classId: 'warbringer', unlockLevel: 30 }
  },
  warbringer: {
    id: 'warbringer',
    name: 'Warbringer',
    flavor: 'Nobody negotiates once a warbringer\'s in the field -- the terms already changed.',
    tier: 3,
    evolvesFrom: 'vanguard',
    statScaling: { attack: 1.5, defense: 1.3, magicPower: 0.3, critChance: 0.7 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: [],
    evolution: { classId: 'battlelord', unlockLevel: 45 }
  },
  battlelord: {
    id: 'battlelord',
    name: 'Battlelord',
    flavor: 'A battlelord doesn\'t win the argument -- they just outlast everyone still making one.',
    tier: 4,
    evolvesFrom: 'warbringer',
    statScaling: { attack: 1.8, defense: 1.4, magicPower: 0.3, critChance: 0.8 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: [],
    evolution: { classId: 'juggernaut', unlockLevel: 65 }
  },
  juggernaut: {
    id: 'juggernaut',
    name: 'Juggernaut',
    flavor: 'Armies plan around a juggernaut, not against one -- the numbers stop mattering past a certain size.',
    tier: 5,
    evolvesFrom: 'battlelord',
    statScaling: { attack: 2.0, defense: 1.5, magicPower: 0.4, critChance: 0.9 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: [],
    evolution: { classId: 'colossus', unlockLevel: 90 }
  },
  colossus: {
    id: 'colossus',
    name: 'Colossus',
    flavor: 'A colossus doesn\'t need reinforcements -- reinforcements are for people still worried about losing.',
    tier: 6,
    evolvesFrom: 'juggernaut',
    statScaling: { attack: 2.3, defense: 1.7, magicPower: 0.4, critChance: 1.0 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: []
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    flavor: 'People keep their questions short around mages -- nobody wants an answer that reshapes the room.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { intellect: 6 },
    statScaling: { attack: 0.3, defense: 0.4, magicPower: 1.2, critChance: 0.5 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study'],
    evolutions: [
      { classId: 'conjurer', unlockLevel: 15 },
      { classId: 'gravitymage', unlockLevel: 15 }
    ]
  },
  conjurer: {
    id: 'conjurer',
    name: 'Conjurer',
    flavor: 'A conjurer never lifts the blade themselves -- something else in the room already has.',
    tier: 2,
    evolvesFrom: 'mage',
    statScaling: { attack: 0.4, defense: 0.5, magicPower: 1.5, critChance: 0.6 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'warlock', unlockLevel: 30 }
  },
  gravitymage: {
    id: 'gravitymage',
    name: 'Gravity Mage',
    flavor: 'A gravity mage doesn\'t argue with weight -- they just decide, briefly, whose turn it is to have any.',
    tier: 2,
    evolvesFrom: 'mage',
    statScaling: { attack: 0.45, defense: 0.55, magicPower: 1.45, critChance: 0.65 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study']
  },
  warlock: {
    id: 'warlock',
    name: 'Warlock',
    flavor: 'Nobody bargains with a warlock twice -- the second price is always worse than they remember agreeing to.',
    tier: 3,
    evolvesFrom: 'conjurer',
    statScaling: { attack: 0.5, defense: 0.6, magicPower: 1.8, critChance: 0.7 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'archmage', unlockLevel: 45 }
  },
  archmage: {
    id: 'archmage',
    name: 'Archmage',
    flavor: 'An archmage doesn\'t raise their voice -- the tower does that for them.',
    tier: 4,
    evolvesFrom: 'warlock',
    statScaling: { attack: 0.6, defense: 0.7, magicPower: 2.1, critChance: 0.8 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'archwizard', unlockLevel: 65 }
  },
  archwizard: {
    id: 'archwizard',
    name: 'Archwizard',
    flavor: 'Kingdoms consult archwizards before wars, not during them -- by the time it starts, the argument\'s already decided.',
    tier: 5,
    evolvesFrom: 'archmage',
    statScaling: { attack: 0.7, defense: 0.8, magicPower: 2.4, critChance: 0.9 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'astralsovereign', unlockLevel: 90 }
  },
  astralsovereign: {
    id: 'astralsovereign',
    name: 'Astral Sovereign',
    flavor: 'An Astral Sovereign doesn\'t step into the room -- the room already agreed to their terms before they entered.',
    tier: 6,
    evolvesFrom: 'archwizard',
    statScaling: { attack: 0.8, defense: 1.0, magicPower: 2.8, critChance: 1.0 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study']
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
    flavor: 'Nobody remembers hiring a rogue for the job -- just noticing, too late, that they had.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { agility: 6 },
    statScaling: { attack: 0.9, defense: 0.5, magicPower: 0.3, critChance: 1.1 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'shadowblade', unlockLevel: 15 }
  },
  shadowblade: {
    id: 'shadowblade',
    name: 'Shadowblade',
    flavor: 'A shadowblade is credited with one wound, never two -- the second cut is only for show.',
    tier: 2,
    evolvesFrom: 'rogue',
    statScaling: { attack: 1.1, defense: 0.6, magicPower: 0.3, critChance: 1.3 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'assassin', unlockLevel: 30 }
  },
  assassin: {
    id: 'assassin',
    name: 'Assassin',
    flavor: 'Nobody hires an assassin to make a scene -- the good ones are paid for silence as much as the kill.',
    tier: 3,
    evolvesFrom: 'shadowblade',
    statScaling: { attack: 1.3, defense: 0.7, magicPower: 0.3, critChance: 1.5 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'nightstalker', unlockLevel: 45 }
  },
  nightstalker: {
    id: 'nightstalker',
    name: 'Nightstalker',
    flavor: 'Watch captains double the patrol when a nightstalker\'s in the district, and it rarely changes anything.',
    tier: 4,
    evolvesFrom: 'assassin',
    statScaling: { attack: 1.5, defense: 0.8, magicPower: 0.4, critChance: 1.7 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'wraith', unlockLevel: 65 }
  },
  wraith: {
    id: 'wraith',
    name: 'Wraith',
    flavor: 'Most who claim to have seen a wraith are wrong -- the ones who actually did don\'t talk about it.',
    tier: 5,
    evolvesFrom: 'nightstalker',
    statScaling: { attack: 1.7, defense: 0.9, magicPower: 0.4, critChance: 1.9 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'umbralsovereign', unlockLevel: 90 }
  },
  umbralsovereign: {
    id: 'umbralsovereign',
    name: 'Umbral Sovereign',
    flavor: 'An Umbral Sovereign isn\'t a person to most who speak the title -- just a story someone else swears is true.',
    tier: 6,
    evolvesFrom: 'wraith',
    statScaling: { attack: 2.1, defense: 1.1, magicPower: 0.5, critChance: 2.3 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: []
  },
  battlemage: {
    id: 'battlemage',
    name: 'Battlemage',
    flavor: 'Nobody trusts a battlemage\'s luck to hold twice -- and yet it always seems to.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { strength: 6, intellect: 6 },
    requiredTrait: 'arcaneFortune',
    statScaling: { attack: 0.7, defense: 0.6, magicPower: 0.7, critChance: 0.5 },
    allowedWeaponTypes: ['staff', 'sword', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'spellblade', unlockLevel: 15 }
  },
  spellblade: {
    id: 'spellblade',
    name: 'Spellblade',
    flavor: 'A spellblade never swings without a plan behind it -- luck just decides which plan wins.',
    tier: 2,
    evolvesFrom: 'battlemage',
    statScaling: { attack: 0.9, defense: 0.7, magicPower: 0.9, critChance: 0.7 },
    allowedWeaponTypes: ['staff', 'sword', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'warmage', unlockLevel: 30 }
  },
  warmage: {
    id: 'warmage',
    name: 'Warmage',
    flavor: 'Warmages don\'t retreat to cast -- the spell and the swing arrive in the same breath.',
    tier: 3,
    evolvesFrom: 'spellblade',
    statScaling: { attack: 1.1, defense: 0.8, magicPower: 1.1, critChance: 0.9 },
    allowedWeaponTypes: ['staff', 'sword', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'battlemagus', unlockLevel: 45 }
  },
  battlemagus: {
    id: 'battlemagus',
    name: 'Battlemagus',
    flavor: 'Nobody bets against a battlemagus twice -- the first loss was supposed to be a lesson.',
    tier: 4,
    evolvesFrom: 'warmage',
    statScaling: { attack: 1.3, defense: 0.9, magicPower: 1.3, critChance: 1.1 },
    allowedWeaponTypes: ['staff', 'sword', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'fateblade', unlockLevel: 65 }
  },
  fateblade: {
    id: 'fateblade',
    name: 'Fateblade',
    flavor: 'A fateblade\'s strikes look accidental until the fourth one lands exactly where the first three failed.',
    tier: 5,
    evolvesFrom: 'battlemagus',
    statScaling: { attack: 1.5, defense: 1.0, magicPower: 1.5, critChance: 1.3 },
    allowedWeaponTypes: ['staff', 'sword', 'dagger'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'fatedsovereign', unlockLevel: 90 }
  },
  fatedsovereign: {
    id: 'fatedsovereign',
    name: 'Fated Sovereign',
    flavor: 'A Fated Sovereign doesn\'t ask which way the odds break -- they\'ve already spent theirs deciding.',
    tier: 6,
    evolvesFrom: 'fateblade',
    statScaling: { attack: 1.8, defense: 1.2, magicPower: 1.8, critChance: 1.6 },
    allowedWeaponTypes: ['staff', 'sword', 'dagger'],
    bonusActivityIds: ['study']
  },
  warden: {
    id: 'warden',
    name: 'Warden',
    flavor: 'Enemies target wardens last, not first -- there\'s no glory in breaking against a wall.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { strength: 6, vitality: 7 },
    requiredTrait: 'stonewoken',
    statScaling: { attack: 0.8, defense: 1.3, magicPower: 0.1, critChance: 0.3 },
    allowedWeaponTypes: ['hammer', 'spear', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'bulwark', unlockLevel: 15 }
  },
  bulwark: {
    id: 'bulwark',
    name: 'Bulwark',
    flavor: 'A bulwark doesn\'t hold the line -- the line holds around them.',
    tier: 2,
    evolvesFrom: 'warden',
    statScaling: { attack: 0.9, defense: 1.6, magicPower: 0.1, critChance: 0.35 },
    allowedWeaponTypes: ['hammer', 'spear', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'rampart', unlockLevel: 30 }
  },
  rampart: {
    id: 'rampart',
    name: 'Rampart',
    flavor: 'Nobody outlasts a rampart by waiting -- the siege ends first.',
    tier: 3,
    evolvesFrom: 'bulwark',
    statScaling: { attack: 1.0, defense: 1.9, magicPower: 0.15, critChance: 0.4 },
    allowedWeaponTypes: ['hammer', 'spear', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'aegis', unlockLevel: 45 }
  },
  aegis: {
    id: 'aegis',
    name: 'Aegis',
    flavor: 'An aegis doesn\'t block the blow -- it decides beforehand which blows land.',
    tier: 4,
    evolvesFrom: 'rampart',
    statScaling: { attack: 1.1, defense: 2.2, magicPower: 0.15, critChance: 0.45 },
    allowedWeaponTypes: ['hammer', 'spear', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'bastion', unlockLevel: 65 }
  },
  bastion: {
    id: 'bastion',
    name: 'Bastion',
    flavor: 'Armies retreat around a bastion, not through one -- there\'s no path they haven\'t already sealed.',
    tier: 5,
    evolvesFrom: 'aegis',
    statScaling: { attack: 1.2, defense: 2.5, magicPower: 0.2, critChance: 0.5 },
    allowedWeaponTypes: ['hammer', 'spear', 'sword'],
    bonusActivityIds: [],
    evolution: { classId: 'immovable', unlockLevel: 90 }
  },
  immovable: {
    id: 'immovable',
    name: 'Immovable',
    flavor: 'The immovable don\'t win fights -- fights just stop happening near them.',
    tier: 6,
    evolvesFrom: 'bastion',
    statScaling: { attack: 1.3, defense: 2.9, magicPower: 0.2, critChance: 0.55 },
    allowedWeaponTypes: ['hammer', 'spear', 'sword'],
    bonusActivityIds: []
  },
  trickster: {
    id: 'trickster',
    name: 'Trickster',
    flavor: 'Tricksters aren\'t remembered for the fight -- they\'re remembered for how it ended before anyone saw it start.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { agility: 6, luck: 6 },
    requiredTrait: 'silverTongue',
    statScaling: { attack: 0.7, defense: 0.4, magicPower: 0.2, critChance: 1.4 },
    allowedWeaponTypes: ['dagger', 'bow'],
    bonusActivityIds: [],
    evolution: { classId: 'conartist', unlockLevel: 15 }
  },
  conartist: {
    id: 'conartist',
    name: 'Con Artist',
    flavor: 'Nobody signs a con artist\'s deal twice -- the first time was already the whole trick.',
    tier: 2,
    evolvesFrom: 'trickster',
    statScaling: { attack: 0.85, defense: 0.5, magicPower: 0.2, critChance: 1.7 },
    allowedWeaponTypes: ['dagger', 'bow'],
    bonusActivityIds: [],
    evolution: { classId: 'deceiver', unlockLevel: 30 }
  },
  deceiver: {
    id: 'deceiver',
    name: 'Deceiver',
    flavor: 'A deceiver never lies outright -- they just let you finish the sentence wrong.',
    tier: 3,
    evolvesFrom: 'conartist',
    statScaling: { attack: 1.0, defense: 0.6, magicPower: 0.25, critChance: 2.0 },
    allowedWeaponTypes: ['dagger', 'bow'],
    bonusActivityIds: [],
    evolution: { classId: 'grifter', unlockLevel: 45 }
  },
  grifter: {
    id: 'grifter',
    name: 'Grifter',
    flavor: 'Nobody catches a grifter mid-move -- only after, counting what isn\'t there anymore.',
    tier: 4,
    evolvesFrom: 'deceiver',
    statScaling: { attack: 1.15, defense: 0.7, magicPower: 0.25, critChance: 2.35 },
    allowedWeaponTypes: ['dagger', 'bow'],
    bonusActivityIds: [],
    evolution: { classId: 'miragedancer', unlockLevel: 65 }
  },
  miragedancer: {
    id: 'miragedancer',
    name: 'Mirage Dancer',
    flavor: 'Chase a mirage dancer long enough and the chase becomes the trick.',
    tier: 5,
    evolvesFrom: 'grifter',
    statScaling: { attack: 1.3, defense: 0.8, magicPower: 0.3, critChance: 2.7 },
    allowedWeaponTypes: ['dagger', 'bow'],
    bonusActivityIds: [],
    evolution: { classId: 'grandillusionist', unlockLevel: 90 }
  },
  grandillusionist: {
    id: 'grandillusionist',
    name: 'Grand Illusionist',
    flavor: 'Nobody agrees what a grand illusionist actually did -- only that everyone left convinced of something different.',
    tier: 6,
    evolvesFrom: 'miragedancer',
    statScaling: { attack: 1.5, defense: 0.95, magicPower: 0.3, critChance: 3.2 },
    allowedWeaponTypes: ['dagger', 'bow'],
    bonusActivityIds: []
  },
  archer: {
    id: 'archer',
    name: 'Archer',
    flavor: 'Nobody hears an archer coming -- just the one sound after, and then the quiet that follows it.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { agility: 6, strength: 6 },
    requiredTrait: 'keenEye',
    statScaling: { attack: 1.0, defense: 0.4, magicPower: 0.1, critChance: 0.9 },
    allowedWeaponTypes: ['bow'],
    bonusActivityIds: []
  },
  fortuneteller: {
    id: 'fortuneteller',
    name: 'Fortune Teller',
    flavor: 'Cards, tea leaves, the crack in a bone -- it was never really about the method. The outcome was already decided before you sat down.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { luck: 7, intellect: 6 },
    requiredTrait: 'fortunesEye',
    statScaling: { attack: 0.4, defense: 0.4, magicPower: 0.6, critChance: 1.3 },
    allowedWeaponTypes: ['dagger', 'staff'],
    bonusActivityIds: []
  },
  webslinger: {
    id: 'webslinger',
    name: 'Webslinger',
    flavor: 'The city doesn\'t call for a hero so much as look up and find one already swinging past.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { agility: 6, luck: 6, vitality: 7 },
    requiredTrait: 'dangerInstinct',
    statScaling: { attack: 0.8, defense: 0.6, magicPower: 0.1, critChance: 1.2 },
    allowedWeaponTypes: ['dagger', 'gauntlet'],
    bonusActivityIds: [],
    evolution: { classId: 'streetlineprowler', unlockLevel: 15 }
  },
  streetlineprowler: {
    id: 'streetlineprowler',
    name: 'Streetline Prowler',
    flavor: 'By the time the alarm goes up, the trail\'s already three blocks cold.',
    tier: 2,
    evolvesFrom: 'webslinger',
    statScaling: { attack: 0.95, defense: 0.75, magicPower: 0.15, critChance: 1.4 },
    allowedWeaponTypes: ['dagger', 'gauntlet'],
    bonusActivityIds: [],
    evolution: { classId: 'rooftopsentinel', unlockLevel: 30 }
  },
  rooftopsentinel: {
    id: 'rooftopsentinel',
    name: 'Rooftop Sentinel',
    flavor: 'Nobody spots a rooftop sentinel until the ledge is already empty.',
    tier: 3,
    evolvesFrom: 'streetlineprowler',
    statScaling: { attack: 1.1, defense: 0.9, magicPower: 0.15, critChance: 1.6 },
    allowedWeaponTypes: ['dagger', 'gauntlet'],
    bonusActivityIds: [],
    evolution: { classId: 'highrisevigilante', unlockLevel: 45 }
  },
  highrisevigilante: {
    id: 'highrisevigilante',
    name: 'Highrise Vigilante',
    flavor: 'Forty stories up, the vigilante isn\'t hiding -- there\'s just nothing worth looking for.',
    tier: 4,
    evolvesFrom: 'rooftopsentinel',
    statScaling: { attack: 1.3, defense: 1.05, magicPower: 0.2, critChance: 1.85 },
    allowedWeaponTypes: ['dagger', 'gauntlet'],
    bonusActivityIds: [],
    evolution: { classId: 'skylinephantom', unlockLevel: 65 }
  },
  skylinephantom: {
    id: 'skylinephantom',
    name: 'Skyline Phantom',
    flavor: 'The skyline doesn\'t hide a phantom -- it just stops mentioning where they went.',
    tier: 5,
    evolvesFrom: 'highrisevigilante',
    statScaling: { attack: 1.5, defense: 1.2, magicPower: 0.2, critChance: 2.1 },
    allowedWeaponTypes: ['dagger', 'gauntlet'],
    bonusActivityIds: [],
    evolution: { classId: 'metropolisguardian', unlockLevel: 90 }
  },
  metropolisguardian: {
    id: 'metropolisguardian',
    name: 'Metropolis Guardian',
    flavor: 'A city doesn\'t thank its guardian -- it just stops noticing how quiet the nights got.',
    tier: 6,
    evolvesFrom: 'skylinephantom',
    statScaling: { attack: 1.8, defense: 1.4, magicPower: 0.25, critChance: 2.5 },
    allowedWeaponTypes: ['dagger', 'gauntlet'],
    bonusActivityIds: []
  },
  corpsecultivator: {
    id: 'corpsecultivator',
    name: 'Corpse Cultivator',
    flavor: 'Every corpse left on a field is a lesson somebody paid for in full -- you\'re just the one still around to read it.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { vitality: 7, intellect: 6 },
    requiredTrait: 'corpseQi',
    statScaling: { attack: 0.7, defense: 0.9, magicPower: 0.5, critChance: 0.4 },
    allowedWeaponTypes: ['dagger', 'gauntlet', 'staff'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'charneladept', unlockLevel: 15 }
  },
  charneladept: {
    id: 'charneladept',
    name: 'Charnel Adept',
    flavor: 'A charnel adept stops flinching at the smell long before anyone else stops noticing they have.',
    tier: 2,
    evolvesFrom: 'corpsecultivator',
    statScaling: { attack: 0.85, defense: 1.1, magicPower: 0.65, critChance: 0.5 },
    allowedWeaponTypes: ['dagger', 'gauntlet', 'staff'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'graveweaver', unlockLevel: 30 }
  },
  graveweaver: {
    id: 'graveweaver',
    name: 'Graveweaver',
    flavor: 'Graveweavers don\'t dig up secrets -- the ground hands them over once it\'s tired of keeping them.',
    tier: 3,
    evolvesFrom: 'charneladept',
    statScaling: { attack: 1.0, defense: 1.3, magicPower: 0.85, critChance: 0.6 },
    allowedWeaponTypes: ['dagger', 'gauntlet', 'staff'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'charnellord', unlockLevel: 45 }
  },
  charnellord: {
    id: 'charnellord',
    name: 'Charnel Lord',
    flavor: 'Nobody argues with a charnel lord\'s ledger -- every name on it already agreed to be there.',
    tier: 4,
    evolvesFrom: 'graveweaver',
    statScaling: { attack: 1.15, defense: 1.55, magicPower: 1.05, critChance: 0.7 },
    allowedWeaponTypes: ['dagger', 'gauntlet', 'staff'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'undyingcultivator', unlockLevel: 65 }
  },
  undyingcultivator: {
    id: 'undyingcultivator',
    name: 'Undying Cultivator',
    flavor: 'An undying cultivator stopped counting years around the same time years stopped counting them.',
    tier: 5,
    evolvesFrom: 'charnellord',
    statScaling: { attack: 1.3, defense: 1.8, magicPower: 1.3, critChance: 0.8 },
    allowedWeaponTypes: ['dagger', 'gauntlet', 'staff'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'undyingsovereign', unlockLevel: 90 }
  },
  undyingsovereign: {
    id: 'undyingsovereign',
    name: 'Undying Sovereign',
    flavor: 'An Undying Sovereign doesn\'t outlive their enemies -- they just outlast the idea that death was ever the end of the conversation.',
    tier: 6,
    evolvesFrom: 'undyingcultivator',
    statScaling: { attack: 1.5, defense: 2.1, magicPower: 1.6, critChance: 0.95 },
    allowedWeaponTypes: ['dagger', 'gauntlet', 'staff'],
    bonusActivityIds: ['study']
  },
  novicemechanic: {
    id: 'novicemechanic',
    name: 'Novice Mechanic',
    flavor: 'Novice mechanics get workshop scraps and side jobs -- nobody trusts the big commissions to unproven hands.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { intellect: 6, agility: 6 },
    requiredTrait: 'clockworkMind',
    statScaling: { attack: 0.6, defense: 0.5, magicPower: 0.6, critChance: 0.7 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff', 'gauntlet', 'gun'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'engineer', branchId: 'apprentice', unlockApprenticeshipLevel: 10 }
  },
  engineer: {
    id: 'engineer',
    name: 'Engineer',
    flavor: 'An engineer\'s name goes on the plans, not the credit -- the machine gets the applause.',
    tier: 2,
    evolvesFrom: 'novicemechanic',
    statScaling: { attack: 0.8, defense: 0.6, magicPower: 0.8, critChance: 0.9 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff', 'gauntlet', 'gun'],
    bonusActivityIds: ['study'],
    evolutions: [
      { classId: 'runesmith', unlockLevel: 25, requiredTraitId: 'runicInsight' },
      { classId: 'sniper', unlockLevel: 25 }
    ]
  },
  sniper: {
    id: 'sniper',
    name: 'Sniper',
    flavor: 'A sniper only takes the shot once -- everything before it was just waiting for the wind to agree.',
    tier: 3,
    evolvesFrom: 'engineer',
    statScaling: { attack: 1.3, defense: 0.5, magicPower: 0.3, critChance: 1.4 },
    allowedWeaponTypes: ['gun'],
    bonusActivityIds: ['study']
  },
  runesmith: {
    id: 'runesmith',
    name: 'Runesmith',
    flavor: 'Runesmiths are the ones other smiths quietly ask for favors -- and quietly never mention by name.',
    tier: 3,
    evolvesFrom: 'engineer',
    statScaling: { attack: 1.0, defense: 0.7, magicPower: 1.0, critChance: 1.0 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff', 'gauntlet', 'gun'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'archmechanist', unlockLevel: 40 }
  },
  archmechanist: {
    id: 'archmechanist',
    name: 'Archmechanist',
    flavor: 'An archmechanist doesn\'t need to be in the room -- their automatons already are.',
    tier: 4,
    evolvesFrom: 'runesmith',
    statScaling: { attack: 1.2, defense: 0.8, magicPower: 1.2, critChance: 1.1 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff', 'gauntlet', 'gun'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'technomancer', unlockLevel: 60 }
  },
  technomancer: {
    id: 'technomancer',
    name: 'Technomancer',
    flavor: 'Nobody agrees where the technomancer ends and the machine begins -- least of all the technomancer.',
    tier: 5,
    evolvesFrom: 'archmechanist',
    statScaling: { attack: 1.4, defense: 0.9, magicPower: 1.4, critChance: 1.2 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff', 'gauntlet', 'gun'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'clockworkgod', unlockLevel: 85 }
  },
  cultivator: {
    id: 'cultivator',
    name: 'Cultivator',
    flavor: 'The manual promised enlightenment in a hundred years. You\'re not waiting that long.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { intellect: 6, luck: 6 },
    requiredTrait: 'daoInsight',
    statScaling: { attack: 0.5, defense: 0.6, magicPower: 0.8, critChance: 0.6 },
    allowedWeaponTypes: ['dagger', 'staff', 'sword'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'qiadept', unlockLevel: 15 }
  },
  qiadept: {
    id: 'qiadept',
    name: 'Qi Adept',
    flavor: 'An adept\'s qi answers before the thought finishes forming -- the meridians already know where it\'s needed.',
    tier: 2,
    evolvesFrom: 'cultivator',
    statScaling: { attack: 0.6, defense: 0.75, magicPower: 1.0, critChance: 0.75 },
    allowedWeaponTypes: ['dagger', 'staff', 'sword'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'meridianbreaker', unlockLevel: 30 }
  },
  meridianbreaker: {
    id: 'meridianbreaker',
    name: 'Meridian Breaker',
    flavor: 'Every wall in the body was put there for a reason. A meridian breaker stopped caring what it was.',
    tier: 3,
    evolvesFrom: 'qiadept',
    statScaling: { attack: 0.75, defense: 0.95, magicPower: 1.25, critChance: 0.9 },
    allowedWeaponTypes: ['dagger', 'staff', 'sword'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'coreformer', unlockLevel: 45 }
  },
  coreformer: {
    id: 'coreformer',
    name: 'Core Former',
    flavor: 'Nobody argues with a core former\'s pace -- the dao doesn\'t rush, and neither do they, not anymore.',
    tier: 4,
    evolvesFrom: 'meridianbreaker',
    statScaling: { attack: 0.9, defense: 1.15, magicPower: 1.5, critChance: 1.05 },
    allowedWeaponTypes: ['dagger', 'staff', 'sword'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'nascentsoul', unlockLevel: 65 }
  },
  nascentsoul: {
    id: 'nascentsoul',
    name: 'Nascent Soul',
    flavor: 'A nascent soul doesn\'t fear the body failing -- there\'s already somewhere else to go.',
    tier: 5,
    evolvesFrom: 'coreformer',
    statScaling: { attack: 1.05, defense: 1.4, magicPower: 1.8, critChance: 1.2 },
    allowedWeaponTypes: ['dagger', 'staff', 'sword'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'ascendant', unlockLevel: 90 }
  },
  ascendant: {
    id: 'ascendant',
    name: 'Ascendant',
    flavor: 'The heavens don\'t notice an ascendant crossing the tribulation -- by the time they would, it\'s already over.',
    tier: 6,
    evolvesFrom: 'nascentsoul',
    statScaling: { attack: 1.2, defense: 1.65, magicPower: 2.1, critChance: 1.4 },
    allowedWeaponTypes: ['dagger', 'staff', 'sword'],
    bonusActivityIds: ['study']
  },
  clockworkgod: {
    id: 'clockworkgod',
    name: 'Clockwork Divinity',
    flavor: 'Scholars argue whether Clockwork Divinity is a title or a species -- the gearwork stopped caring either way.',
    tier: 6,
    evolvesFrom: 'technomancer',
    statScaling: { attack: 1.8, defense: 1.2, magicPower: 1.8, critChance: 1.5 },
    allowedWeaponTypes: null,
    bonusActivityIds: ['study']
  }
};

export const CLASS_CHOICE_LEVEL = 5;
export const CLASS_CHOICES = ['fighter', 'mage', 'rogue'];
export const SECRET_CLASS_IDS = ['battlemage', 'warden', 'trickster', 'novicemechanic', 'webslinger', 'corpsecultivator', 'cultivator', 'archer', 'fortuneteller'];
