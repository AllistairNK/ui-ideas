export const HIDDEN_TRAITS = {
  brawlersBlood: {
    id: 'brawlersBlood',
    name: "Brawler's Blood",
    flavor: 'Something in your bones was built for a fight -- you swing harder than your frame suggests.',
    tags: ['fighter'],
    requirement: (a) => a.strength >= 7,
    weight: 3,
    statBonuses: { attack: 3 }
  },
  arcaneFortune: {
    id: 'arcaneFortune',
    name: 'Arcane Fortune',
    flavor: 'Luck bends around your spellcraft in ways no tutor could teach.',
    tags: ['mage'],
    secretClass: 'battlemage',
    requirement: (a) => a.intellect >= 6 && a.luck >= 6,
    weight: 2,
    statBonuses: { critChance: 4 }
  },
  stonewoken: {
    id: 'stonewoken',
    name: 'Stonewoken',
    flavor: 'Your body sets like stone under pressure -- blows that should stagger you barely register.',
    tags: ['fighter'],
    secretClass: 'warden',
    requirement: (a) => a.vitality >= 7 && a.strength >= 6,
    weight: 2,
    statBonuses: { defense: 4 }
  },
  silverTongue: {
    id: 'silverTongue',
    name: 'Silver Tongue',
    flavor: 'Openings appear for you that no one else seems to notice.',
    tags: ['rogue'],
    secretClass: 'trickster',
    requirement: (a) => a.agility >= 6 && a.luck >= 6,
    weight: 2,
    statBonuses: { critChance: 3 }
  },
  ironLungs: {
    id: 'ironLungs',
    name: 'Iron Lungs',
    flavor: 'You outlast fights you have no business surviving.',
    tags: ['rogue'],
    requirement: (a) => a.vitality >= 7,
    weight: 3,
    statBonuses: { maxHp: 10 }
  }
};

function rollTraitCount() {
  const r = Math.random();
  if (r < 0.55) return 0;
  if (r < 0.9) return 1;
  return 2;
}

function weightedSample(candidates, count) {
  const pool = [...candidates];
  const picked = [];
  while (pool.length && picked.length < count) {
    const totalWeight = pool.reduce((sum, t) => sum + t.weight, 0);
    let roll = Math.random() * totalWeight;
    let idx = 0;
    for (; idx < pool.length - 1; idx++) {
      if (roll < pool[idx].weight) break;
      roll -= pool[idx].weight;
    }
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

export function rollHiddenTraits(attributes) {
  const eligible = Object.values(HIDDEN_TRAITS).filter((t) => t.requirement(attributes));
  if (!eligible.length) return [];
  const count = Math.min(eligible.length, rollTraitCount());
  return weightedSample(eligible, count).map((t) => ({ id: t.id, discovered: false }));
}

// Grants any trait whose requirement is currently met but not yet owned.
// Called whenever attributes change, so secret-class traits (and their
// classes) become reachable through stat growth, not just the initial roll.
export function grantEligibleTraits(character) {
  character.traits = character.traits || [];
  const owned = new Set(character.traits.map((t) => t.id));
  const gained = [];
  for (const def of Object.values(HIDDEN_TRAITS)) {
    if (owned.has(def.id)) continue;
    if (def.requirement(character.attributes)) {
      character.traits.push({ id: def.id, discovered: true });
      gained.push(def);
    }
  }
  return gained;
}

export function sumTraitBonuses(character) {
  const totals = {};
  for (const trait of character.traits || []) {
    const def = HIDDEN_TRAITS[trait.id];
    if (!def) continue;
    for (const [stat, value] of Object.entries(def.statBonuses || {})) {
      totals[stat] = (totals[stat] || 0) + value;
    }
  }
  return totals;
}
