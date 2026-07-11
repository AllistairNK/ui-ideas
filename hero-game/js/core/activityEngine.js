import { ACTIVITIES, IDLE_ELIGIBLE_ACTIVITY_IDS } from '../data/activities.js';
import { CLASSES } from '../data/classes.js';
import { addXp, computeDerivedStats, applyAttributeTraining } from './character.js';

export function isActivityUnlocked(character, activityId) {
  const activity = ACTIVITIES[activityId];
  if (!activity) return false;
  const { minLevel, classWhitelist } = activity.requirements;
  if (character.level < minLevel) return false;
  if (classWhitelist && !classWhitelist.includes(character.class)) return false;
  return true;
}

export function canStartActivity(character, activityId) {
  const activity = ACTIVITIES[activityId];
  if (!activity) return { ok: false, reason: 'Unknown activity.' };
  if (!isActivityUnlocked(character, activityId)) return { ok: false, reason: 'Not unlocked yet.' };
  if (character.derived.stamina < activity.costs.stamina) return { ok: false, reason: 'Not enough stamina.' };
  if (character.currency.gold < activity.costs.gold) return { ok: false, reason: 'Not enough gold.' };
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

// Applies exactly one cycle's rewards/costs to the character in place.
function applyOneCycle(character, activity) {
  character.derived.stamina = Math.max(0, character.derived.stamina - activity.costs.stamina);
  character.currency.gold = Math.max(0, character.currency.gold - activity.costs.gold);

  let gainedTraits = [];
  const rewards = activity.rewards;
  if (rewards.attributeTraining && Object.keys(rewards.attributeTraining).length) {
    gainedTraits = gainedTraits.concat(applyAttributeTraining(character, rewards.attributeTraining));
  }
  if (rewards.staminaDelta) {
    character.derived.stamina = Math.min(character.derived.maxStamina, character.derived.stamina + rewards.staminaDelta);
  }
  if (rewards.hpDelta) {
    character.derived.hp = Math.min(character.derived.maxHp, character.derived.hp + rewards.hpDelta);
  }
  character.currency.gold += rewards.gold || 0;

  let levelUpResult = { leveledUp: false, levelsGained: 0, gainedTraits: [] };
  if (rewards.xp) levelUpResult = addXp(character, rewards.xp);
  return { ...levelUpResult, gainedTraits: gainedTraits.concat(levelUpResult.gainedTraits) };
}

// Called on a ~1s tick while an activity is assigned. Returns a summary of
// completed cycles this tick (usually 0 or 1), or null if nothing is running.
export function tickActivity(character, now = Date.now()) {
  if (!character.activity) return null;
  const activity = ACTIVITIES[character.activity.id];
  if (!activity || activity.durationSeconds <= 0) return null;

  const elapsedMs = now - character.activity.startedAt;
  const cyclesCompleted = Math.floor(elapsedMs / (activity.durationSeconds * 1000));
  if (cyclesCompleted <= 0) return null;

  const summary = { activityId: activity.id, cycles: 0, xp: 0, gold: 0, leveledUp: false, levelsGained: 0, gainedTraits: [] };
  for (let i = 0; i < cyclesCompleted; i++) {
    const check = canStartActivity(character, activity.id);
    if (!check.ok) break;
    const result = applyOneCycle(character, activity);
    summary.cycles++;
    summary.xp += activity.rewards.xp || 0;
    summary.gold += activity.rewards.gold || 0;
    if (result.leveledUp) {
      summary.leveledUp = true;
      summary.levelsGained += result.levelsGained;
    }
    summary.gainedTraits = summary.gainedTraits.concat(result.gainedTraits);
  }
  character.activity.startedAt += summary.cycles * activity.durationSeconds * 1000;
  if (summary.cycles === 0) character.activity = null; // couldn't afford another cycle
  return summary;
}

// Computes idle/offline catch-up on load. Only Train/Work/Rest-style
// activities are eligible -- combat (Spar) stays a deliberate player action.
export function computeIdleCatchUp(character, lastSavedAt, now = Date.now(), maxCatchUpMs = 12 * 60 * 60 * 1000) {
  if (!character.activity) return null;
  const activity = ACTIVITIES[character.activity.id];
  if (!activity || !IDLE_ELIGIBLE_ACTIVITY_IDS.includes(activity.id)) return null;

  const cappedNow = Math.min(now, lastSavedAt + maxCatchUpMs);
  return tickActivity(character, cappedNow);
}
