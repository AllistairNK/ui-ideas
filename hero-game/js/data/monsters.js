// Base stats at "level 1"; generateOpponent() in combat.js scales these by
// the hero's current level so Spar stays roughly relevant as the hero grows.
export const MONSTER_TEMPLATES = [
  { id: 'bandit', name: 'Bandit', baseHp: 20, baseAttack: 4, baseDefense: 2, baseAccuracy: 80, baseEvasion: 8, baseCritChance: 5 },
  { id: 'wild_boar', name: 'Wild Boar', baseHp: 26, baseAttack: 5, baseDefense: 1, baseAccuracy: 75, baseEvasion: 4, baseCritChance: 3 },
  { id: 'rival_squire', name: 'Rival Squire', baseHp: 22, baseAttack: 4, baseDefense: 3, baseAccuracy: 82, baseEvasion: 10, baseCritChance: 8 },
  { id: 'marsh_ghoul', name: 'Marsh Ghoul', baseHp: 30, baseAttack: 6, baseDefense: 2, baseAccuracy: 70, baseEvasion: 3, baseCritChance: 2 }
];
