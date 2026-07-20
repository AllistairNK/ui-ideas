import { ACTIVITIES, ACTIVITY_BRANCHES } from '../data/activities.js';
import { isActivityUnlocked, canStartActivity } from '../core/activityEngine.js';

// Debug aid: shows which attributes each activity trains, right in the button
// tooltip. Flip to false before shipping so players discover this on their own.
const DEBUG_SHOW_ACTIVITY_EFFECTS = true;

// Which branch's sponsor sub-menu is currently open, if any. Module-level
// since the panel is fully re-rendered on every tick.
let expandedBranchId = null;

// The default task list is just the slum-themed activities (see
// STORYLINE.md) -- the older generic Train/Work/Study/etc. set stays hidden
// until the player opts into it here. Module-level for the same reason as
// expandedBranchId above.
let showAllActivities = false;

function describeActivityEffects(activity) {
  const parts = Object.entries(activity.rewards.attributeTraining || {})
    .map(([attr, amount]) => `${attr} +${amount}`);
  if (activity.rewards.hpDelta) parts.push(`hp +${activity.rewards.hpDelta}`);
  if (activity.rewards.staminaDelta) parts.push(`stamina +${activity.rewards.staminaDelta}`);
  return parts.length ? `[DEBUG] Trains: ${parts.join(', ')}` : '';
}

// Loot rolls happen once per full durationSeconds cycle (see tickActivity's
// lootAccumSec), not on every tick -- this surfaces that cadence as a bar on
// the task's own button so "why hasn't it dropped yet" reads as "waiting for
// the next roll" rather than looking broken, without cluttering the shared
// current-activity header when several tasks can drop loot.
function renderLootRollBar(current, activity) {
  if (!activity.rewards.lootTableId) return '';
  const accum = current.lootAccumSec || 0;
  const pct = Math.max(0, Math.min(100, (accum / activity.durationSeconds) * 100));
  const remaining = Math.max(0, activity.durationSeconds - accum).toFixed(1);
  return `
    <span class="loot-roll-row" title="Rolls for a drop once this bar fills, then resets.">
      <span class="loot-roll-label">Next loot roll in ${remaining}s</span>
      <span class="bar"><span class="bar-fill bar-loot" style="width:${pct}%"></span></span>
    </span>`;
}

function renderActivityButton(character, activity, current, label) {
  const unlocked = isActivityUnlocked(character, activity.id);
  const check = canStartActivity(character, activity.id);
  const isCurrent = current && current.id === activity.id;
  const isToggle = activity.category !== 'combat';
  const disabled = !unlocked || (!check.ok && !isCurrent);
  const baseTitle = !unlocked ? 'Locked' : (!check.ok ? check.reason : activity.description);
  const debugSuffix = DEBUG_SHOW_ACTIVITY_EFFECTS ? ` \n${describeActivityEffects(activity)}` : '';
  const lootRollHtml = isCurrent ? renderLootRollBar(current, activity) : '';
  return `
    <button type="button" class="activity-btn ${isCurrent ? 'activity-active' : ''}"
      data-action="assign" data-activity="${activity.id}" data-current="${isCurrent}" ${disabled ? 'disabled' : ''}
      title="${baseTitle}${debugSuffix}">
      <span class="activity-name">${label || activity.name}${isCurrent && isToggle ? ' (on -- click to stop)' : ''}</span>
      <span class="activity-desc">${unlocked ? activity.description : 'Locked'}</span>
      ${lootRollHtml}
    </button>`;
}

function renderBranchButton(character, branch, current) {
  const isExpanded = expandedBranchId === branch.id;
  const currentActivity = current ? ACTIVITIES[current.id] : null;
  const isCurrentBranch = currentActivity && currentActivity.branchId === branch.id;

  if (isExpanded) {
    const variantButtons = branch.variantIds.map((activityId) =>
      renderActivityButton(character, ACTIVITIES[activityId], current, ACTIVITIES[activityId].branchLabel)
    ).join('');
    return `
      <div class="activity-branch expanded">
        <button type="button" class="activity-btn branch-back" data-action="collapse-branch">&larr; ${branch.name}</button>
        ${variantButtons}
      </div>`;
  }

  const label = isCurrentBranch ? `${branch.name}: ${currentActivity.branchLabel}` : branch.name;
  return `
    <button type="button" class="activity-btn ${isCurrentBranch ? 'activity-active' : ''}"
      data-action="expand-branch" data-branch="${branch.id}" title="${branch.description}">
      <span class="activity-name">${label}</span>
      <span class="activity-desc">${branch.description}</span>
    </button>`;
}

export function renderActivityPanel(character, handlers) {
  const root = document.getElementById('activityPanel');
  if (!root) return;

  const current = character.activity;
  const currentActivity = current ? ACTIVITIES[current.id] : null;

  let progressHtml = '';
  if (currentActivity && currentActivity.durationSeconds > 0) {
    if (currentActivity.oneShot) {
      const pct = Math.max(0, Math.min(100, ((current.progressSec || 0) / currentActivity.durationSeconds) * 100));
      progressHtml = `
        <div class="current-activity">
          <span>Currently: <b>${currentActivity.name}</b></span>
          <div class="bar"><div class="bar-fill bar-activity" style="width:${pct}%"></div></div>
        </div>`;
    } else {
      progressHtml = `
        <div class="current-activity">
          <span>Currently: <b>${currentActivity.name}</b> -- click it again to stop.</span>
        </div>`;
    }
  }

  const branchRows = Object.values(ACTIVITY_BRANCHES)
    .filter((branch) => showAllActivities || branch.theme === 'slums')
    .map((branch) => renderBranchButton(character, branch, current))
    .join('');

  const rows = Object.values(ACTIVITIES)
    .filter((activity) => !activity.branchId)
    .filter((activity) => showAllActivities || activity.theme === 'slums')
    .filter((activity) => !activity.hidden || isActivityUnlocked(character, activity.id))
    .map((activity) => renderActivityButton(character, activity, current))
    .join('');

  const toggleHtml = `
    <label class="activity-toggle-row">
      <input type="checkbox" id="activityShowAllToggle" ${showAllActivities ? 'checked' : ''}>
      Show all tasks
    </label>`;

  // Resting is a standalone toggle, not a slotted activity -- it just boosts
  // the passive stamina/HP regen (see activityEngine.js) while it's on, and
  // doesn't block whatever else is currently assigned.
  const restToggleHtml = `
    <button type="button" class="activity-btn rest-toggle-btn${character.resting ? ' activity-active' : ''}" data-action="toggle-rest">
      <span class="activity-name">${character.resting ? 'Resting by the fire' : 'Rest by the fire'}</span>
      <span class="activity-desc">${character.resting ? 'Stamina and wounds are recovering faster.' : "Sit and let stamina/HP recover faster -- doesn't stop whatever else you're doing."}</span>
    </button>`;

  root.innerHTML = `${progressHtml}${restToggleHtml}${toggleHtml}<div class="activity-list">${branchRows}${rows}</div>`;

  root.querySelectorAll('[data-action="assign"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      expandedBranchId = null;
      if (btn.dataset.current === 'true') handlers.onCancel();
      else handlers.onAssign(btn.dataset.activity);
    });
  });
  root.querySelectorAll('[data-action="expand-branch"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      expandedBranchId = btn.dataset.branch;
      renderActivityPanel(character, handlers);
    });
  });
  const collapseBtn = root.querySelector('[data-action="collapse-branch"]');
  if (collapseBtn) collapseBtn.addEventListener('click', () => {
    expandedBranchId = null;
    renderActivityPanel(character, handlers);
  });
  const toggleEl = root.querySelector('#activityShowAllToggle');
  if (toggleEl) toggleEl.addEventListener('change', () => {
    showAllActivities = toggleEl.checked;
    renderActivityPanel(character, handlers);
  });

  const restToggleBtn = root.querySelector('[data-action="toggle-rest"]');
  if (restToggleBtn) restToggleBtn.addEventListener('click', () => handlers.onToggleRest());
}
