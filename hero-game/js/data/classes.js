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
    bonusActivityIds: []
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
    evolution: { classId: 'runesmith', unlockLevel: 25, requiredTraitId: 'runicInsight' }
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
export const SECRET_CLASS_IDS = ['battlemage', 'warden', 'trickster', 'novicemechanic'];
