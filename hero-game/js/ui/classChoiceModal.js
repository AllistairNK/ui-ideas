import { CLASSES, CLASS_CHOICES } from '../data/classes.js';

export function showClassChoiceModal(character, onChoose) {
  const root = document.getElementById('classChoiceModal');
  if (!root) return;

  const options = CLASS_CHOICES.map((classId) => {
    const def = CLASSES[classId];
    const req = def.unlockAttributeReqs
      ? Object.entries(def.unlockAttributeReqs).map(([k, v]) => `${k} ${v}+`).join(', ')
      : 'None';
    return `
      <button type="button" class="class-choice-btn" data-class="${classId}">
        <span class="class-choice-name">${def.name}</span>
        <span class="class-choice-req">Suggested: ${req}</span>
      </button>`;
  }).join('');

  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-title">Choose Your Path</div>
        <div class="class-choice-list">${options}</div>
      </div>
    </div>
  `;
  root.classList.remove('hidden');

  root.querySelectorAll('[data-class]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.classList.add('hidden');
      root.innerHTML = '';
      onChoose(btn.dataset.class);
    });
  });
}
