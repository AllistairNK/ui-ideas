import { ACTIVITIES, ACTIVITY_BRANCHES } from '../data/activities.js';
import { isActivityUnlocked, canStartActivity } from '../core/activityEngine.js';

// Debug aid: shows which attributes each activity trains, right in the button
// tooltip. Flip to false before shipping so players discover this on their own.
const DEBUG_SHOW_ACTIVITY_EFFECTS = true;

// Which branch's sponsor sub-menu is currently open, if any. Module-level
// since the panel is fully re-rendered on every tick.
let expandedBranchId = null;

function describeActivityEffects(activity) {
  const parts = Object.entries(activity.rewards.attributeTraining || {})
    .map(([attr, amount]) => `${attr} +${amount}`);
  if (activity.rewards.hpDelta) parts.push(`hp +${activity.rewards.hpDelta}`);
  if (activity.rewards.staminaDelta) parts.push(`stamina +${activity.rewards.staminaDelta}`);
  return parts.length ? `[DEBUG] Trains: ${parts.join(', ')}` : '';
}

function renderActivityButton(character, activity, current, label) {
  const unlocked = isActivityUnlocked(character, activity.id);
  const check = canStartActivity(character, activity.id);
  const isCurrent = current && current.id === activity.id;
  const disabled = !unlocked || (!check.ok && !isCurrent);
  const baseTitle = !unlocked ? 'Locked' : (!check.ok ? check.reason : activity.description);
  const debugSuffix = DEBUG_SHOW_ACTIVITY_EFFECTS ? ` \n${describeActivityEffects(activity)}` : '';
  return `
    <button type="button" class="activity-btn ${isCurrent ? 'activity-active' : ''}"
      data-action="assign" data-activity="${activity.id}" ${disabled ? 'disabled' : ''}
      title="${baseTitle}${debugSuffix}">
      <span class="activity-name">${label || activity.name}</span>
      <span class="activity-desc">${unlocked ? activity.description : 'Locked'}</span>
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
    const elapsed = Date.now() - current.startedAt;
    const pct = Math.max(0, Math.min(100, (elapsed % (currentActivity.durationSeconds * 1000)) / (currentActivity.durationSeconds * 1000) * 100));
    progressHtml = `
      <div class="current-activity">
        <span>Currently: <b>${currentActivity.name}</b></span>
        <div class="bar"><div class="bar-fill bar-activity" style="width:${pct}%"></div></div>
        <button type="button" data-action="cancel">Stop</button>
      </div>`;
  }

  const branchRows = Object.values(ACTIVITY_BRANCHES)
    .map((branch) => renderBranchButton(character, branch, current))
    .join('');

  const rows = Object.values(ACTIVITIES)
    .filter((activity) => !activity.branchId)
    .map((activity) => renderActivityButton(character, activity, current))
    .join('');

  root.innerHTML = `${progressHtml}<div class="activity-list">${branchRows}${rows}</div>`;

  root.querySelectorAll('[data-action="assign"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      expandedBranchId = null;
      handlers.onAssign(btn.dataset.activity);
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
  const cancelBtn = root.querySelector('[data-action="cancel"]');
  if (cancelBtn) cancelBtn.addEventListener('click', () => handlers.onCancel());
}
