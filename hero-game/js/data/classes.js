export const CLASSES = {
  peasant: {
    id: 'peasant',
    name: 'Peasant',
    flavor: 'No trade, no title -- just grit and whatever the day demands.',
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
    flavor: 'Steel, muscle, and the will to close the distance -- you fight so others don\'t have to.',
    tier: 1,
    unlockLevel: 5,
    unlockAttributeReqs: { strength: 6 },
    statScaling: { attack: 1.1, defense: 0.9, magicPower: 0.2, critChance: 0.5 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: []
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    flavor: 'Theory made real -- you bend the world through study most would find unreadable.',
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
    flavor: 'Quick hands, quicker feet -- you win fights before anyone notices they started.',
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
    flavor: 'Steel drawn in silence, gone before the scream finishes -- you\'ve traded speed for precision, and it shows.',
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
    flavor: 'A name whispered in back rooms, never said twice -- you don\'t fight fair, because fair fights are for people who lose.',
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
    flavor: 'The dark doesn\'t hide you anymore -- it works for you, bending every shadow into cover and every cover into a killing ground.',
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
    flavor: 'Half a rumor, half a blade -- you\'ve stopped being someone people can prepare for.',
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
    flavor: 'You don\'t enter a room anymore -- the room simply realizes, too late, that you were already inside it.',
    tier: 6,
    evolvesFrom: 'wraith',
    statScaling: { attack: 2.1, defense: 1.1, magicPower: 0.5, critChance: 2.3 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: []
  },
  battlemage: {
    id: 'battlemage',
    name: 'Battlemage',
    flavor: 'Blade in one hand, spell in the other -- your luck and your learning found each other.',
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
    flavor: 'Where others break, you set like stone -- an immovable line nothing gets past.',
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
    flavor: 'Every fight has an opening -- you just happen to see all of them.',
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
    flavor: 'Gears and grease over spellbooks -- you\'re still learning the trade, but the mechanism makes sense to you.',
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
    flavor: 'The apprenticeship is behind you -- now you build the machines, instead of just fixing them.',
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
    flavor: 'You\'ve stopped fixing what\'s broken and started forging what didn\'t exist yet.',
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
    flavor: 'Your workshop outgrew you -- automatons carry your designs into fights you\'re not even in.',
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
    flavor: 'The line between the mechanism and the mind wearing it has all but disappeared.',
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
    flavor: 'You no longer build the mechanism. You are the mechanism -- and creation runs on your gearwork now.',
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
