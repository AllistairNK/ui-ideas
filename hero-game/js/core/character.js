import { NAME_POOL, BACKGROUNDS } from '../data/names.js';
import { CLASSES } from '../data/classes.js';
import { sumEquipmentBonuses } from './equipment.js';
import { rollHiddenTraits, sumTraitBonuses, grantEligibleTraits } from '../data/traits.js';

let nextInstanceId = 1;
export function newInstanceId() {
  return `i${Date.now()}_${nextInstanceId++}`;
}

function rollInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function xpToNextLevel(level) {
  return 40 + level * 20;
}

export function generateCharacter() {
  const name = NAME_POOL[rollInt(0, NAME_POOL.length - 1)];
  const background = BACKGROUNDS[rollInt(0, BACKGROUNDS.length - 1)];
  const portraitSeed = rollInt(1, 999999);

  const attributes = {
    strength: rollInt(3, 7),
    agility: rollInt(3, 7),
    intellect: rollInt(3, 7),
    vitality: rollInt(3, 7),
    luck: rollInt(3, 7)
  };
  for (const [attr, delta] of Object.entries(background.attributeModifiers || {})) {
    attributes[attr] = Math.max(1, (attributes[attr] || 0) + delta);
  }

  const character = {
    id: `hero_${Date.now()}`,
    name,
    portraitSeed,
    background: background.id,
    backgroundFlavor: background.flavor,
    class: 'peasant',
    level: 1,
    xp: 0,
    xpToNext: xpToNextLevel(1),
    attributes,
    traits: rollHiddenTraits(attributes),
    derived: null,
    equipment: { weapon: null, offhand: null, head: null, body: null, hands: null, legs: null, accessory: null },
    inventory: [],
    currency: { gold: 10 },
    activity: null,
    resting: false,
    combatLog: [],
    flags: { unlockedClasses: ['peasant'], tutorialSeen: false, foundItemIds: [] }
  };

  character.derived = computeDerivedStats(character);
  character.derived.hp = character.derived.maxHp;
  character.derived.stamina = character.derived.maxStamina;
  return character;
}

export function computeDerivedStats(character) {
  const classDef = CLASSES[character.class] || CLASSES.peasant;
  const attr = character.attributes;
  const bonus = sumEquipmentBonuses(character);
  const traitBonus = sumTraitBonuses(character);

  const maxHp = Math.round(50 + attr.vitality * 8 + (bonus.maxHp || 0) + (traitBonus.maxHp || 0));
  const maxStamina = Math.round(50 + attr.vitality * 4);
  const attack = Math.round(attr.strength * 2 * classDef.statScaling.attack + (bonus.attack || 0) + (traitBonus.attack || 0));
  const defense = Math.round(attr.vitality * 1.5 * classDef.statScaling.defense + (bonus.defense || 0) + (traitBonus.defense || 0));
  const magicPower = Math.round(attr.intellect * 2 * classDef.statScaling.magicPower + (bonus.magicPower || 0) + (traitBonus.magicPower || 0));
  const critChance = Math.round(5 + attr.luck * classDef.statScaling.critChance + (bonus.critChance || 0) + (traitBonus.critChance || 0));
  const accuracy = Math.round(70 + attr.agility * 1.5);
  const evasion = Math.round(5 + attr.agility * 1.2);
  const speed = attr.agility;

  const prevHp = character.derived ? character.derived.hp : maxHp;
  const prevStamina = character.derived ? character.derived.stamina : maxStamina;

  return {
    maxHp, hp: Math.min(prevHp, maxHp),
    maxStamina, stamina: Math.min(prevStamina, maxStamina),
    attack, defense, magicPower, critChance, accuracy, evasion, speed
  };
}

// Returns { leveledUp: boolean, levelsGained: number, gainedTraits: array }
export function addXp(character, amount) {
  character.xp += amount;
  let levelsGained = 0;
  let gainedTraits = [];
  while (character.xp >= character.xpToNext) {
    character.xp -= character.xpToNext;
    character.level += 1;
    character.xpToNext = xpToNextLevel(character.level);
    levelsGained += 1;
    for (const attr of Object.keys(character.attributes)) {
      character.attributes[attr] += 1;
    }
    gainedTraits = gainedTraits.concat(grantEligibleTraits(character));
    character.derived = computeDerivedStats(character);
    character.derived.hp = character.derived.maxHp;
    character.derived.stamina = character.derived.maxStamina;
  }
  return { leveledUp: levelsGained > 0, levelsGained, gainedTraits };
}

export function applyAttributeTraining(character, attributeTraining) {
  for (const [attr, amount] of Object.entries(attributeTraining || {})) {
    character.attributes[attr] = (character.attributes[attr] || 0) + amount;
  }
  const gainedTraits = grantEligibleTraits(character);
  character.derived = computeDerivedStats(character);
  return gainedTraits;
}
