import { ACTIVITIES, IDLE_ELIGIBLE_ACTIVITY_IDS } from '../data/activities.js';
import { ITEM_TEMPLATES } from '../data/items.js';
import { addXp, computeDerivedStats, applyAttributeTraining, addApprenticeshipXp } from './character.js';
import { addToInventory, rollLoot } from './equipment.js';
import { grantTrait } from '../data/traits.js';

export function isActivityUnlocked(character, activityId) {
  const activity = ACTIVITIES[activityId];
  if (!activity) return false;
  const { minLevel, classWhitelist, itemId, excludesTraitId } = activity.requirements;
  if (character.level < minLevel) return false;
  if (classWhitelist && !classWhitelist.includes(character.class)) return false;
  if (itemId && !character.inventory.some((i) => i.templateId === itemId)) return false;
  if (excludesTraitId && (character.traits || []).some((t) => t.id === excludesTraitId)) return false;
  return true;
}

// Activities are authored as a lump cost/reward over `durationSeconds` (e.g.
// "15 stamina, +8xp per 20s") -- this spreads that same balance across every
// second continuously, which is what lets stat/xp/stamina bars visibly tick
// up in real time instead of jumping once per cycle.
export function getActivityRates(activity) {
  const duration = activity.durationSeconds > 0 ? activity.durationSeconds : 1;
  const rewards = activity.rewards;
  const attributeRatesPerSec = {};
  for (const [attr, amount] of Object.entries(rewards.attributeTraining || {})) {
    attributeRatesPerSec[attr] = amount / duration;
  }
  return {
    staminaCostPerSec: (activity.costs.stamina || 0) / duration,
    goldCostPerSec: (activity.costs.gold || 0) / duration,
    xpPerSec: (rewards.xp || 0) / duration,
    goldPerSec: (rewards.gold || 0) / duration,
    staminaGainPerSec: (rewards.staminaDelta || 0) / duration,
    hpGainPerSec: (rewards.hpDelta || 0) / duration,
    attributeRatesPerSec
  };
}

// Instant activities (durationSeconds <= 0, i.e. combat) still pay their
// cost as a lump sum and need it in full upfront. Everything else now drains
// gradually (see tickActivity), so starting only needs *some* headroom -- a
// fraction of a cycle's worth of stamina/gold is enough to begin, and
// tickActivity clamps/auto-stops once it's actually gone.
export function canStartActivity(character, activityId) {
  const activity = ACTIVITIES[activityId];
  if (!activity) return { ok: false, reason: 'Unknown activity.' };
  if (!isActivityUnlocked(character, activityId)) return { ok: false, reason: 'Not unlocked yet.' };
  if (activity.durationSeconds <= 0) {
    if (character.derived.stamina < activity.costs.stamina) return { ok: false, reason: 'Not enough stamina.' };
    if (character.currency.gold < activity.costs.gold) return { ok: false, reason: 'Not enough gold.' };
    return { ok: true };
  }
  if (activity.costs.stamina > 0 && character.derived.stamina <= 0) return { ok: false, reason: 'Not enough stamina.' };
  if (activity.costs.gold > 0 && character.currency.gold <= 0) return { ok: false, reason: 'Not enough gold.' };
  return { ok: true };
}

export function assignActivity(character, activityId) {
  const check = canStartActivity(character, activityId);
  if (!check.ok) return check;
  character.activity = { id: activityId, startedAt: Date.now() };
  return { ok: true };
}

export function cancelActivity(character) {
  character.activity = null;
}

// Items flagged `unique` (e.g. the Bent Cog) are a one-time-ever find --
// tracked in flags.foundItemIds rather than just checked against current
// inventory, so they don't come back after being consumed by whatever
// activity uses them (see tinker_cog).
function alreadyFoundUnique(character, templateId) {
  const template = ITEM_TEMPLATES[templateId];
  if (!template || !template.unique) return false;
  return (character.flags.foundItemIds || []).includes(templateId);
}

function markFoundUnique(character, templateId) {
  const template = ITEM_TEMPLATES[templateId];
  if (!template || !template.unique) return;
  character.flags.foundItemIds = character.flags.foundItemIds || [];
  character.flags.foundItemIds.push(templateId);
}

// Applies up to `elapsedMs` of continuous progress on the assigned activity,
// clamped to however many seconds are actually affordable (so a long idle
// catch-up doesn't get rejected outright just because the full span would
// have been too expensive -- it applies what it could afford, then stops).
// Returns a summary, or null if nothing was assigned / nothing applied.
export function tickActivity(character, elapsedMs = 1000) {
  if (!character.activity || elapsedMs <= 0) return null;
  const activity = ACTIVITIES[character.activity.id];
  if (!activity || activity.durationSeconds <= 0) return null;

  if (!isActivityUnlocked(character, activity.id)) {
    character.activity = null;
    return null;
  }

  const rates = getActivityRates(activity);
  let seconds = elapsedMs / 1000;
  if (rates.staminaCostPerSec > 0) seconds = Math.min(seconds, character.derived.stamina / rates.staminaCostPerSec);
  if (rates.goldCostPerSec > 0) seconds = Math.min(seconds, character.currency.gold / rates.goldCostPerSec);

  const exhausted = seconds < elapsedMs / 1000 - 1e-9;
  if (seconds <= 0) {
    character.activity = null;
    return null;
  }

  character.derived.stamina = Math.max(0, character.derived.stamina - rates.staminaCostPerSec * seconds);
  character.currency.gold = Math.max(0, character.currency.gold - rates.goldCostPerSec * seconds);

  let gainedTraits = [];
  if (Object.keys(rates.attributeRatesPerSec).length) {
    const deltas = {};
    for (const [attr, rate] of Object.entries(rates.attributeRatesPerSec)) deltas[attr] = rate * seconds;
    gainedTraits = gainedTraits.concat(applyAttributeTraining(character, deltas));
  }
  if (rates.staminaGainPerSec) {
    character.derived.stamina = Math.min(character.derived.maxStamina, character.derived.stamina + rates.staminaGainPerSec * seconds);
  }
  if (rates.hpGainPerSec) {
    character.derived.hp = Math.min(character.derived.maxHp, character.derived.hp + rates.hpGainPerSec * seconds);
  }
  character.currency.gold += rates.goldPerSec * seconds;

  // Loot rolls at the same cadence the old fixed cycles used (once per
  // durationSeconds of engagement) so tuned drop weights stay meaningful --
  // just decoupled from xp/stamina, which now flow continuously.
  const gainedItems = [];
  if (activity.rewards.lootTableId) {
    character.activity.lootAccumSec = (character.activity.lootAccumSec || 0) + seconds;
    while (character.activity.lootAccumSec >= activity.durationSeconds) {
      character.activity.lootAccumSec -= activity.durationSeconds;
      const loot = rollLoot(activity.rewards.lootTableId);
      if (loot && !alreadyFoundUnique(character, loot.templateId)) {
        addToInventory(character, loot);
        gainedItems.push(loot);
        markFoundUnique(character, loot.templateId);
      }
    }
  }

  const xpGain = rates.xpPerSec * seconds;
  let levelUpResult = { leveledUp: false, levelsGained: 0, gainedTraits: [] };
  if (xpGain) levelUpResult = addXp(character, xpGain);
  gainedTraits = gainedTraits.concat(levelUpResult.gainedTraits);

  let apprenticeshipResult = { leveledUp: false, branchId: null, level: 0 };
  if (xpGain && activity.branchId) {
    const result = addApprenticeshipXp(character, activity.branchId, xpGain);
    apprenticeshipResult = { ...result, branchId: activity.branchId };
  }

  // One-shot activities (see tinker_cog) complete once instead of running
  // forever: track cumulative engagement and fire the reward at 100%, then
  // auto-stop rather than looping.
  if (character.activity && activity.oneShot) {
    character.activity.progressSec = (character.activity.progressSec || 0) + seconds;
    if (character.activity.progressSec >= activity.durationSeconds) {
      if (activity.rewards.grantsTraitId) {
        const traitDef = grantTrait(character, activity.rewards.grantsTraitId);
        if (traitDef) gainedTraits = gainedTraits.concat([traitDef]);
      }
      if (activity.rewards.consumesItemId) {
        const idx = character.inventory.findIndex((i) => i.templateId === activity.rewards.consumesItemId);
        if (idx !== -1) character.inventory.splice(idx, 1);
      }
      character.activity = null;
    }
  }

  if (character.activity && exhausted) character.activity = null;

  return {
    activityId: activity.id,
    xp: xpGain,
    gold: rates.goldPerSec * seconds,
    leveledUp: levelUpResult.leveledUp,
    levelsGained: levelUpResult.levelsGained,
    gainedTraits,
    gainedItems,
    apprenticeshipLeveledUp: apprenticeshipResult.leveledUp,
    apprenticeshipBranchId: apprenticeshipResult.branchId,
    apprenticeshipLevel: apprenticeshipResult.level
  };
}

export const MAX_IDLE_CATCHUP_MS = 12 * 60 * 60 * 1000;

// Computes idle/offline catch-up on load. Only Train/Work/Rest-style
// activities are eligible -- combat (Spar) stays a deliberate player action.
export function computeIdleCatchUp(character, lastSavedAt, now = Date.now(), maxCatchUpMs = MAX_IDLE_CATCHUP_MS) {
  if (!character.activity) return null;
  const activity = ACTIVITIES[character.activity.id];
  if (!activity || !IDLE_ELIGIBLE_ACTIVITY_IDS.includes(activity.id)) return null;

  const elapsedMs = Math.min(now - lastSavedAt, maxCatchUpMs);
  return tickActivity(character, elapsedMs);
}

// Stamina (and HP) trickle back on their own -- Resting (a toggle,
// independent of the single-slot activity system above) just multiplies
// the rate while it's on. Replaces the old Rest/Warm by the Fire activities.
export const BASE_STAMINA_REGEN_PER_SEC = 0.3;
export const RESTING_STAMINA_REGEN_PER_SEC = 1.5;
export const BASE_HP_REGEN_PER_SEC = 0.1;
export const RESTING_HP_REGEN_PER_SEC = 0.6;

export function toggleResting(character) {
  character.resting = !character.resting;
  return character.resting;
}

export function applyPassiveRegen(character, elapsedMs) {
  if (!character.derived || elapsedMs <= 0) return;
  const seconds = elapsedMs / 1000;
  const staminaRate = character.resting ? RESTING_STAMINA_REGEN_PER_SEC : BASE_STAMINA_REGEN_PER_SEC;
  const hpRate = character.resting ? RESTING_HP_REGEN_PER_SEC : BASE_HP_REGEN_PER_SEC;
  character.derived.stamina = Math.min(character.derived.maxStamina, character.derived.stamina + staminaRate * seconds);
  character.derived.hp = Math.min(character.derived.maxHp, character.derived.hp + hpRate * seconds);
}

// Net stamina/sec while an activity (if any) is running, accounting for
// passive regen (boosted by Resting) minus whatever that activity drains.
// Used by the UI to show a live rate next to the stamina bar.
export function currentStaminaRatePerSec(character) {
  const regen = character.resting ? RESTING_STAMINA_REGEN_PER_SEC : BASE_STAMINA_REGEN_PER_SEC;
  const activity = character.activity ? ACTIVITIES[character.activity.id] : null;
  const drain = activity && activity.durationSeconds > 0 ? getActivityRates(activity).staminaCostPerSec : 0;
  return regen - drain;
}
