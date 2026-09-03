import { CLASSES, CLASS_CHOICES, CLASS_CHOICE_LEVEL, SECRET_CLASS_IDS } from '../data/classes.js';
import { HIDDEN_TRAITS } from '../data/traits.js';

export function meetsAttributeReqs(character, reqs) {
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

export function getApprenticeshipLevel(character, branchId) {
  return (character.apprenticeship && character.apprenticeship[branchId] && character.apprenticeship[branchId].level) || 0;
}

function hasRequiredTrait(character, requiredTraitId) {
  if (!requiredTraitId) return true;
  return (character.traits || []).some((t) => t.id === requiredTraitId);
}

// A class may have one evolution (`evolution`) or branch into several
// (`evolutions`) -- this always returns the list, so callers don't care which.
export function getEvolutionOptions(def) {
  if (!def) return [];
  if (def.evolutions) return def.evolutions;
  return def.evolution ? [def.evolution] : [];
}

function isEvolutionReady(character, evo) {
  const { unlockApprenticeshipLevel, branchId, unlockLevel, requiredTraitId } = evo;
  if (!hasRequiredTrait(character, requiredTraitId)) return false;
  if (unlockApprenticeshipLevel != null) {
    return getApprenticeshipLevel(character, branchId) >= unlockApprenticeshipLevel;
  }
  return character.level >= unlockLevel;
}

function getAvailableEvolutions(character) {
  const def = CLASSES[character.class];
  return getEvolutionOptions(def).filter((evo) => isEvolutionReady(character, evo));
}

function describeEvolutionProgress(character, evo) {
  const { unlockApprenticeshipLevel, branchId, unlockLevel, requiredTraitId } = evo;
  if (!hasRequiredTrait(character, requiredTraitId)) {
    return 'Requires studying something you haven\'t found yet.';
  }
  if (unlockApprenticeshipLevel != null) {
    const current = getApprenticeshipLevel(character, branchId);
    return `Unlocks at Apprenticeship level ${unlockApprenticeshipLevel} (currently level ${current}).`;
  }
  return `Unlocks at level ${unlockLevel} (currently level ${character.level}).`;
}

export function isClassAdvancementAvailable(character) {
  if (character.class === 'peasant') return character.level >= CLASS_CHOICE_LEVEL;
  return getAvailableEvolutions(character).length > 0;
}

export function renderClassPanel(character, { onChoose }) {
  const root = document.getElementById('classPanel');
  if (!root) return;

  if (character.class !== 'peasant') {
    const def = CLASSES[character.class];
    const evolutions = getAvailableEvolutions(character);
    if (evolutions.length) {
      const options = evolutions.map((evo) => {
        const nextDef = CLASSES[evo.classId];
        return `
          <button type="button" class="class-choice-btn" data-class="${nextDef.id}">
            <span class="class-choice-name">${nextDef.name}</span>
            <span class="class-choice-req">${nextDef.tier === 6 ? 'Godhood' : `Tier ${nextDef.tier} advancement`}</span>
          </button>`;
      }).join('');
      root.innerHTML = `
        <div class="panel-title">Class Advancement</div>
        <div class="sheet-sub">${def.name}</div>
        <div class="sheet-flavor">You've grown beyond your training.</div>
        <div class="class-choice-list">${options}</div>
      `;
      root.querySelectorAll('[data-class]').forEach((btn) => {
        btn.addEventListener('click', () => onChoose(btn.dataset.class));
      });
      return;
    }
    const evoOptions = getEvolutionOptions(def);
    const progressText = evoOptions.length
      ? evoOptions.map((evo) => describeEvolutionProgress(character, evo)).join(' ')
      : '';
    root.innerHTML = `
      <div class="panel-title">Class</div>
      <div class="sheet-sub">${def.name}</div>
      <div class="sheet-flavor">${def.flavor || 'Your path is chosen.'}</div>
      ${progressText ? `<div class="sheet-flavor">${progressText}</div>` : ''}
    `;
    return;
  }

  if (character.level < CLASS_CHOICE_LEVEL) {
    root.innerHTML = `
      <div class="panel-title">Class Advancement</div>
      <div class="sheet-flavor">Unlocks at level ${CLASS_CHOICE_LEVEL} (currently level ${character.level}).</div>
    `;
    return;
  }

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

  root.innerHTML = `
    <div class="panel-title">Class Advancement</div>
    <div class="sheet-flavor">Advance whenever you're ready. No rush.</div>
    <div class="class-choice-list">${mainlineOptions}${secretOptions}</div>
  `;

  root.querySelectorAll('[data-class]').forEach((btn) => {
    btn.addEventListener('click', () => onChoose(btn.dataset.class));
  });
}
