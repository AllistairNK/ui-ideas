import { CLASSES, CLASS_CHOICES, SECRET_CLASS_IDS } from '../data/classes.js';
import { HIDDEN_TRAITS } from '../data/traits.js';

function meetsAttributeReqs(character, reqs) {
  if (!reqs) return true;
  return Object.entries(reqs).every(([attr, min]) => (character.attributes[attr] || 0) >= min);
}

function getEligibleSecretClasses(character) {
  return SECRET_CLASS_IDS.filter((classId) => {
    const def = CLASSES[classId];
    const hasTrait = (character.traits || []).some((t) => t.id === def.requiredTrait);
    return hasTrait && meetsAttributeReqs(character, def.unlockAttributeReqs);
  });
}

function revealTraits(character, visibleSecretClassIds) {
  for (const trait of character.traits || []) {
    const def = HIDDEN_TRAITS[trait.id];
    if (!def) continue;
    const secretRevealed = def.secretClass && visibleSecretClassIds.includes(def.secretClass);
    const mainlineRevealed = def.tags && def.tags.length > 0;
    if (secretRevealed || mainlineRevealed) trait.discovered = true;
  }
}

export function showClassChoiceModal(character, onChoose) {
  const root = document.getElementById('classChoiceModal');
  if (!root) return;

  const secretClassIds = getEligibleSecretClasses(character);
  revealTraits(character, secretClassIds);

  const mainlineOptions = CLASS_CHOICES.map((classId) => {
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

  const secretOptions = secretClassIds.map((classId) => {
    const def = CLASSES[classId];
    const traitDef = HIDDEN_TRAITS[def.requiredTrait];
    return `
      <button type="button" class="class-choice-btn secret" data-class="${classId}">
        <span class="class-choice-name">${def.name}</span>
        <span class="class-choice-req">${traitDef ? traitDef.flavor : ''}</span>
      </button>`;
  }).join('');

  const options = mainlineOptions + secretOptions;

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
