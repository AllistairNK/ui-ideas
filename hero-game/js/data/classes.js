export const CLASSES = {
  peasant: {
    id: 'peasant',
    name: 'Peasant',
    unlockLevel: 1,
    unlockAttributeReqs: null,
    statScaling: { attack: 0.6, defense: 0.5, magicPower: 0.4, critChance: 0.4 },
    allowedWeaponTypes: null, // no restriction
    bonusActivityIds: []
  },
  fighter: {
    id: 'fighter',
    name: 'Fighter',
    unlockLevel: 5,
    unlockAttributeReqs: { strength: 6 },
    statScaling: { attack: 1.1, defense: 0.9, magicPower: 0.2, critChance: 0.5 },
    allowedWeaponTypes: ['sword', 'axe', 'hammer', 'spear'],
    bonusActivityIds: []
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    unlockLevel: 5,
    unlockAttributeReqs: { intellect: 6 },
    statScaling: { attack: 0.3, defense: 0.4, magicPower: 1.2, critChance: 0.5 },
    allowedWeaponTypes: ['staff', 'dagger'],
    bonusActivityIds: ['study']
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
    unlockLevel: 5,
    unlockAttributeReqs: { agility: 6 },
    statScaling: { attack: 0.9, defense: 0.5, magicPower: 0.3, critChance: 1.1 },
    allowedWeaponTypes: ['dagger', 'bow', 'sword'],
    bonusActivityIds: []
  }
};

export const CLASS_CHOICE_LEVEL = 5;
export const CLASS_CHOICES = ['fighter', 'mage', 'rogue'];
