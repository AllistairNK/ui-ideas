// Combat familiars for the summoning-flavored classes (conjurer,
// insectmancer, golemmancer, archmechanist -> technomancer, lightningmage).
// One familiar
// per qualifying class, auto-granted the moment the character enters that
// class (see ensureFamiliar, called from main.js) -- mirrors how hidden
// traits are auto-granted in traits.js. Once granted a familiar is
// permanent: evolving into a later class that isn't a summoner class keeps
// whatever familiar you already have.
export const FAMILIAR_TEMPLATES = {
  bound_wisp: {
    id: 'bound_wisp',
    name: 'Bound Wisp',
    classId: 'conjurer',
    flavor: 'It doesn\'t glow to light the room. It glows because it\'s paying attention.',
    statBonuses: { magicPower: 3, critChance: 2 },
    procChance: 0.15,
    procDamage: 3
  },
  chitin_swarm: {
    id: 'chitin_swarm',
    name: 'Chitin Swarm',
    classId: 'insectmancer',
    flavor: 'No single one of them is the threat. Counting them is.',
    statBonuses: { attack: 2, critChance: 3 },
    procChance: 0.2,
    procDamage: 2
  },
  clay_golem: {
    id: 'clay_golem',
    name: 'Clay Golem',
    classId: 'golemmancer',
    flavor: 'It doesn\'t hurry to the fight. It was already standing where the fight was going to be.',
    statBonuses: { defense: 5, magicPower: 3 },
    procChance: 0.1,
    procDamage: 6
  },
  scrap_drone: {
    id: 'scrap_drone',
    name: 'Scrap Drone',
    classId: 'archmechanist',
    flavor: 'Held together with the same three rivets it left the workshop with. Hasn\'t needed a fourth yet.',
    statBonuses: { attack: 3, magicPower: 2 },
    procChance: 0.15,
    procDamage: 3
  },
  storm_sprite: {
    id: 'storm_sprite',
    name: 'Storm Sprite',
    classId: 'lightningmage',
    flavor: 'It never strikes twice in the same place. It never has to -- it\'s already at the next one.',
    statBonuses: { magicPower: 3, critChance: 4 },
    procChance: 0.2,
    procDamage: 4
  },
  aether_construct: {
    id: 'aether_construct',
    name: 'Aether Construct',
    classId: 'technomancer',
    flavor: 'What used to be scrap and instinct is starting to look a lot more like the technomancer\'s own reflexes.',
    statBonuses: { attack: 5, magicPower: 4, critChance: 2 },
    procChance: 0.18,
    procDamage: 6
  }
};

export function getFamiliarForClass(classId) {
  return Object.values(FAMILIAR_TEMPLATES).find((f) => f.classId === classId) || null;
}

export function sumFamiliarBonus(character) {
  if (!character.familiar) return {};
  const def = FAMILIAR_TEMPLATES[character.familiar.id];
  return def ? def.statBonuses : {};
}

// Grants (or upgrades) the familiar matching the character's current class.
// Returns the newly (un)granted template for a caller to show a toast with,
// or null if nothing changed. Never removes an existing familiar just
// because the current class doesn't have one of its own -- familiars are
// permanent once earned, same as hidden traits.
export function ensureFamiliar(character) {
  const match = getFamiliarForClass(character.class);
  if (!match) return null;
  if (character.familiar && character.familiar.id === match.id) return null;
  character.familiar = { id: match.id };
  return match;
}
