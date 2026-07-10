import { ACTIVITIES } from '../data/activities.js';
import { isActivityUnlocked, canStartActivity } from '../core/activityEngine.js';

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

  const rows = Object.values(ACTIVITIES).map((activity) => {
    const unlocked = isActivityUnlocked(character, activity.id);
    const check = canStartActivity(character, activity.id);
    const isCurrent = current && current.id === activity.id;
    const disabled = !unlocked || (!check.ok && !isCurrent);
    return `
      <button type="button" class="activity-btn ${isCurrent ? 'activity-active' : ''}"
        data-action="assign" data-activity="${activity.id}" ${disabled ? 'disabled' : ''}
        title="${!unlocked ? 'Locked' : (!check.ok ? check.reason : activity.description)}">
        <span class="activity-name">${activity.name}</span>
        <span class="activity-desc">${unlocked ? activity.description : 'Locked'}</span>
      </button>`;
  }).join('');

  root.innerHTML = `${progressHtml}<div class="activity-list">${rows}</div>`;

  root.querySelectorAll('[data-action="assign"]').forEach((btn) => {
    btn.addEventListener('click', () => handlers.onAssign(btn.dataset.activity));
  });
  const cancelBtn = root.querySelector('[data-action="cancel"]');
  if (cancelBtn) cancelBtn.addEventListener('click', () => handlers.onCancel());
}
