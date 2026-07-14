export const CLASSES = {
  peasant: {
    id: 'peasant',
    name: 'Peasant',
    flavor: 'No trade, no title -- just grit and whatever the day demands.',
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
    unlockLevel: 5,
    unlockAttributeReqs: { agility: 6 },
    statScaling: { attack: 0.9, defense: 0.5, magicPower: 0.3, critChance: 1.1 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: []
  },
  battlemage: {
    id: 'battlemage',
    name: 'Battlemage',
    flavor: 'Blade in one hand, spell in the other -- your luck and your learning found each other.',
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
    unlockLevel: 5,
    unlockAttributeReqs: { intellect: 6, agility: 6 },
    requiredTrait: 'clockworkMind',
    statScaling: { attack: 0.6, defense: 0.5, magicPower: 0.6, critChance: 0.7 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff'],
    bonusActivityIds: ['study'],
    evolution: { classId: 'engineer', unlockLevel: 15 }
  },
  engineer: {
    id: 'engineer',
    name: 'Engineer',
    flavor: 'The apprenticeship is behind you -- now you build the machines, instead of just fixing them.',
    tier: 2,
    evolvesFrom: 'novicemechanic',
    statScaling: { attack: 0.8, defense: 0.6, magicPower: 0.8, critChance: 0.9 },
    allowedWeaponTypes: ['dagger', 'bow', 'staff'],
    bonusActivityIds: ['study']
  }
};

export const CLASS_CHOICE_LEVEL = 5;
export const CLASS_CHOICES = ['fighter', 'mage', 'rogue'];
export const SECRET_CLASS_IDS = ['battlemage', 'warden', 'trickster', 'novicemechanic'];
