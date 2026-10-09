// Gods a worshipping class can pledge itself to. A class opts in with
// `worshipsGods: true` in classes.js; on entering such a class the Class
// panel offers every god it's allowed to follow (see getAvailableGods). A
// god can narrow that with `allowedClassIds` -- omit it to let any
// worshipping class follow them.
//
// The pledge is permanent and, like a familiar, survives evolving into a
// later class: you don't stop being a god's follower just because you got
// promoted. Each god gives passive statBonuses (folded into
// computeDerivedStats alongside traits/familiars) and an in-combat blessing
// proc that rolls after each of your attacks (see resolveCombat):
//   type 'heal'  -- restores `amount` HP, capped at max HP
//   type 'smite' -- deals `amount` extra damage to the foe
export const GODS = {
  solenne: {
    id: 'solenne',
    name: 'Solenne',
    title: 'the Dawnmother',
    domain: 'Light & Mercy',
    flavor: 'Solenne asks only that you get back up. She has never once asked how many times.',
    statBonuses: { defense: 3, maxHp: 10 },
    blessing: { type: 'heal', procChance: 0.2, amount: 8, verb: 'Dawnlight mends your wounds' }
  },
  varkhal: {
    id: 'varkhal',
    name: 'Varkhal',
    title: 'the Iron Judge',
    domain: 'War & Judgment',
    flavor: 'Varkhal doesn\'t forgive. Varkhal weighs -- and the scale has never once tipped toward mercy by accident.',
    statBonuses: { attack: 4, defense: 1 },
    blessing: { type: 'smite', procChance: 0.15, amount: 6, verb: 'Varkhal\'s verdict strikes' }
  },
  myrrow: {
    id: 'myrrow',
    name: 'Myrrow',
    title: 'the Turning Tide',
    domain: 'Fate & Fortune',
    flavor: 'Myrrow\'s followers never call it luck. Luck is what happens to people Myrrow isn\'t watching.',
    statBonuses: { critChance: 5, magicPower: 1 },
    blessing: { type: 'smite', procChance: 0.25, amount: 3, verb: 'The tide turns against your foe' }
  },
  veyl: {
    id: 'veyl',
    name: 'Veyl',
    title: 'the Quiet Shroud',
    domain: 'Death & Endings',
    flavor: 'Veyl is not cruel. Every story ends -- Veyl simply makes sure the right one does.',
    statBonuses: { magicPower: 4 },
    blessing: { type: 'smite', procChance: 0.12, amount: 8, verb: 'Veyl\'s shroud settles over your foe' }
  }
};

export function classWorshipsGods(classDef) {
  return !!(classDef && classDef.worshipsGods);
}

export function getAvailableGods(classDef) {
  if (!classWorshipsGods(classDef)) return [];
  return Object.values(GODS).filter((g) => !g.allowedClassIds || g.allowedClassIds.includes(classDef.id));
}

export function getDeity(character) {
  return (character.deity && GODS[character.deity.id]) || null;
}

// True while the character sits in a worshipping class but hasn't pledged
// to anyone yet -- the Class panel uses this to show the choice.
export function needsDeityChoice(character, classDef) {
  return classWorshipsGods(classDef) && !getDeity(character);
}

// Pledges the character to a god. Returns the god def on success, or null if
// they already follow someone or the god isn't open to their class.
export function pledgeToGod(character, classDef, godId) {
  if (getDeity(character)) return null;
  const god = getAvailableGods(classDef).find((g) => g.id === godId);
  if (!god) return null;
  character.deity = { id: god.id };
  return god;
}

export function sumDeityBonus(character) {
  const god = getDeity(character);
  return god ? god.statBonuses : {};
}
