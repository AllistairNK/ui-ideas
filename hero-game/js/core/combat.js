import { MONSTER_TEMPLATES } from '../data/monsters.js';

// Deterministic small PRNG so resolveCombat can be a pure function of its
// inputs (state in, result out) -- no hidden Date.now()/Math.random() reliance
// baked into the core loop, so a future server could re-run the same battle.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateOpponent(heroLevel, seed = Date.now()) {
  const rng = mulberry32(seed);
  const template = MONSTER_TEMPLATES[Math.floor(rng() * MONSTER_TEMPLATES.length)];
  const scale = 1 + (heroLevel - 1) * 0.18;
  const variance = 0.9 + rng() * 0.2;
  return {
    id: template.id,
    name: template.name,
    maxHp: Math.round(template.baseHp * scale * variance),
    hp: Math.round(template.baseHp * scale * variance),
    attack: Math.round(template.baseAttack * scale * variance),
    defense: Math.round(template.baseDefense * scale * variance),
    accuracy: template.baseAccuracy,
    evasion: template.baseEvasion,
    critChance: template.baseCritChance,
    speed: 5 + Math.round(scale * 2)
  };
}

function toCombatant(name, derived) {
  return {
    name,
    hp: derived.hp,
    maxHp: derived.maxHp,
    attack: Math.max(derived.attack, derived.magicPower),
    defense: derived.defense,
    accuracy: derived.accuracy,
    evasion: derived.evasion,
    critChance: derived.critChance,
    speed: derived.speed
  };
}

function resolveAttack(attacker, defender, rng, log, damageMultiplier = 1) {
  const hitRoll = rng() * 100;
  const hitChance = Math.max(10, Math.min(95, attacker.accuracy - defender.evasion));
  if (hitRoll > hitChance) {
    log.push(`${attacker.name} attacks ${defender.name} and misses.`);
    return;
  }
  const critRoll = rng() * 100;
  const isCrit = critRoll < attacker.critChance;
  const variance = 0.85 + rng() * 0.3;
  const baseDamage = Math.max(1, attacker.attack - defender.defense * 0.5);
  const damage = Math.max(1, Math.round(baseDamage * variance * (isCrit ? 1.5 : 1) * damageMultiplier));
  defender.hp = Math.max(0, defender.hp - damage);
  log.push(`${attacker.name} hits ${defender.name} for ${damage}${isCrit ? ' (critical!)' : ''}.`);
}

// A god's blessing (see gods.js) rolls after each of the hero's attacks,
// same as a familiar proc: 'heal' tops the hero back up, 'smite' hits the foe.
function resolveBlessing(deityDef, hero, foe, rng, log) {
  const { blessing } = deityDef;
  if (!blessing || foe.hp <= 0 || rng() >= blessing.procChance) return;
  if (blessing.type === 'heal') {
    const healed = Math.min(blessing.amount, hero.maxHp - hero.hp);
    if (healed <= 0) return;
    hero.hp += healed;
    log.push(`${blessing.verb} (+${healed} HP).`);
  } else if (blessing.type === 'smite') {
    foe.hp = Math.max(0, foe.hp - blessing.amount);
    log.push(`${blessing.verb} for ${blessing.amount} damage.`);
  }
}

// A class's `rage` (see classes.js, e.g. berserker) multiplies the hero's
// damage while their HP is at or below hpThreshold of max. Logs once, the
// first time it kicks in.
function rageMultiplier(rage, hero, state, log) {
  if (!rage || hero.hp > hero.maxHp * rage.hpThreshold) return 1;
  if (!state.raging) {
    state.raging = true;
    log.push('Pain sharpens into fury -- your blows land harder.');
  }
  return rage.damageMultiplier;
}

// A class's `jump` (see classes.js, e.g. dragoon) turns every Nth round's
// attack into a leap that multiplies the hero's damage.
function jumpMultiplier(jump, round, log) {
  if (!jump || round % jump.everyNRounds !== 0) return 1;
  log.push('You leap high into the air and come crashing down, spear first!');
  return jump.damageMultiplier;
}

// Pure function: two stat snapshots + a seed (+ optional familiar, deity and
// class defs) in, a result out.
export function resolveCombat(heroDerived, opponent, seed = Date.now(), familiarDef = null, deityDef = null, classDef = null) {
  const rng = mulberry32(seed);
  const hero = toCombatant('You', heroDerived);
  const foe = { ...opponent };
  const log = [];
  const rageState = { raging: false };

  let rounds = 0;
  const maxRounds = 30;
  while (hero.hp > 0 && foe.hp > 0 && rounds < maxRounds) {
    rounds++;
    const heroFirst = hero.speed >= foe.speed;
    const order = heroFirst ? [hero, foe] : [foe, hero];
    for (const attacker of order) {
      const defender = attacker === hero ? foe : hero;
      if (hero.hp <= 0 || foe.hp <= 0) break;
      const multiplier = attacker === hero && classDef
        ? rageMultiplier(classDef.rage, hero, rageState, log) * jumpMultiplier(classDef.jump, rounds, log)
        : 1;
      resolveAttack(attacker, defender, rng, log, multiplier);
      if (attacker === hero && familiarDef && foe.hp > 0 && rng() < familiarDef.procChance) {
        foe.hp = Math.max(0, foe.hp - familiarDef.procDamage);
        log.push(`${familiarDef.name} lunges in for ${familiarDef.procDamage} extra damage.`);
      }
      if (attacker === hero && deityDef) resolveBlessing(deityDef, hero, foe, rng, log);
    }
  }

  let outcome;
  if (hero.hp <= 0 && foe.hp <= 0) outcome = 'draw';
  else if (foe.hp <= 0) outcome = 'win';
  else if (hero.hp <= 0) outcome = 'loss';
  else outcome = 'draw'; // hit round cap

  return { outcome, log, heroHpRemaining: hero.hp, rounds };
}
