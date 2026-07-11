import { generateCharacter, computeDerivedStats, addXp } from './core/character.js';
import { saveGame, loadGame, clearSave } from './core/save.js';
import { assignActivity, cancelActivity, tickActivity, computeIdleCatchUp, canStartActivity } from './core/activityEngine.js';
import { equipItem, unequipItem, addToInventory, createItemInstance, rollLoot } from './core/equipment.js';
import { generateOpponent, resolveCombat } from './core/combat.js';
import { ITEM_TEMPLATES } from './data/items.js';
import { ACTIVITIES } from './data/activities.js';
import { CLASSES } from './data/classes.js';

import { renderCharacterSheet } from './ui/characterSheet.js';
import { renderActivityPanel } from './ui/activityPanel.js';
import { renderInventoryPanel } from './ui/inventoryPanel.js';
import { renderPetView } from './ui/petView.js';
import { showCombatModal } from './ui/combatModal.js';
import { renderClassPanel, isClassAdvancementAvailable } from './ui/classPanel.js';
import { showToast } from './ui/toast.js';

let character = null;

function renderAll() {
  document.getElementById('headerName').textContent = character.name;
  document.getElementById('headerClassLevel').textContent = `${CLASSES[character.class].name} · Lv ${character.level}`;
  document.getElementById('headerGold').textContent = `${Math.floor(character.currency.gold)}g`;

  renderPetView(character, { onPet: () => {} });
  renderCharacterSheet(character);
  renderActivityPanel(character, {
    onAssign: handleAssignActivity,
    onCancel: handleCancelActivity
  });
  renderInventoryPanel(character, {
    onEquip: handleEquip,
    onUnequip: handleUnequip,
    onBuy: handleBuy
  });
  renderClassPanel(character, { onChoose: handleChooseClass });
}

function persist() {
  saveGame(character);
}

function handleChooseClass(classId) {
  character.class = classId;
  character.flags.unlockedClasses.push(classId);
  character.derived = computeDerivedStats(character);
  showToast(`You have become a ${CLASSES[classId].name}!`, 'success');
  persist();
  renderAll();
}

function handleAssignActivity(activityId) {
  if (activityId === 'spar') {
    runSpar();
    return;
  }
  const result = assignActivity(character, activityId);
  if (!result.ok) {
    showToast(result.reason, 'error');
    return;
  }
  persist();
  renderAll();
}

function handleCancelActivity() {
  cancelActivity(character);
  persist();
  renderAll();
}

function runSpar() {
  const check = canStartActivity(character, 'spar');
  if (!check.ok) {
    showToast(check.reason, 'error');
    return;
  }
  const activity = ACTIVITIES.spar;
  character.derived.stamina = Math.max(0, character.derived.stamina - activity.costs.stamina);

  const opponent = generateOpponent(character.level);
  const result = resolveCombat(character.derived, opponent, Date.now());

  let rewardsSummary = '';
  if (result.outcome === 'win') {
    character.derived.hp = result.heroHpRemaining;
    character.currency.gold += activity.rewards.gold;
    const loot = rollLoot(activity.rewards.lootTableId);
    let lootLine = '';
    if (loot) {
      addToInventory(character, loot);
      lootLine = ` + ${ITEM_TEMPLATES[loot.templateId].name}`;
    }
    const levelResult = addXp(character, activity.rewards.xp);
    rewardsSummary = `+${activity.rewards.xp}xp, +${activity.rewards.gold}g${lootLine}`;
    if (levelResult.leveledUp) {
      showToast(`Level up! Now level ${character.level}.`, 'success');
      notifyIfClassAdvancementAvailable();
    }
    notifyGainedTraits(levelResult.gainedTraits);
  } else if (result.outcome === 'loss') {
    character.derived.hp = Math.max(1, result.heroHpRemaining);
    const goldLoss = Math.min(character.currency.gold, 5);
    character.currency.gold -= goldLoss;
    rewardsSummary = `Lost ${goldLoss}g licking your wounds.`;
  } else {
    character.derived.hp = Math.max(1, result.heroHpRemaining);
    rewardsSummary = 'No clear winner.';
  }

  showCombatModal(opponent, result, rewardsSummary, {
    onClose: () => {
      persist();
      renderAll();
    }
  });
}

function notifyIfClassAdvancementAvailable() {
  if (isClassAdvancementAvailable(character)) {
    showToast('Class advancement available — check the Class panel.', 'success');
  }
}

function notifyGainedTraits(gainedTraits) {
  for (const def of gainedTraits || []) {
    showToast(`New trait discovered: ${def.name}!`, 'success');
  }
}

function handleEquip(instanceId) {
  const ok = equipItem(character, instanceId, computeDerivedStats);
  if (ok) { persist(); renderAll(); }
}

function handleUnequip(slot) {
  const ok = unequipItem(character, slot, computeDerivedStats);
  if (ok) { persist(); renderAll(); }
}

function handleBuy(itemId) {
  const template = ITEM_TEMPLATES[itemId];
  if (!template) return;
  if (character.currency.gold < template.value) {
    showToast('Not enough gold.', 'error');
    return;
  }
  character.currency.gold -= template.value;
  addToInventory(character, createItemInstance(itemId));
  persist();
  renderAll();
}

function tickLoop() {
  if (!character || !character.activity) return;
  const summary = tickActivity(character);
  if (summary && summary.cycles > 0) {
    persist();
    renderAll();
    if (summary.leveledUp) {
      showToast(`Level up! Now level ${character.level}.`, 'success');
      notifyIfClassAdvancementAvailable();
    }
    notifyGainedTraits(summary.gainedTraits);
  } else {
    renderActivityPanel(character, { onAssign: handleAssignActivity, onCancel: handleCancelActivity });
  }
}

function handleStartOver() {
  if (!confirm('This will permanently delete your current hero. Continue?')) return;
  character = null;
  clearSave();
  location.reload();
}

function renderFirstRunDetails(newCharacter) {
  const details = document.getElementById('firstRunDetails');
  const classDef = CLASSES[newCharacter.class];
  details.innerHTML = `
    <h2>${newCharacter.name}</h2>
    <p><i>${newCharacter.backgroundFlavor}</i></p>
    <p>${classDef.name} &middot; Level ${newCharacter.level}</p>
    <div class="attr-grid">
      ${Object.entries(newCharacter.attributes).map(([k, v]) => `
        <div class="attr-cell"><span class="attr-name">${k}</span><span class="attr-value">${v}</span></div>`).join('')}
    </div>
  `;
}

function showFirstRunScreen(newCharacter) {
  const screen = document.getElementById('firstRunScreen');
  renderFirstRunDetails(newCharacter);
  screen.classList.remove('hidden');

  document.getElementById('randomizeBtn').addEventListener('click', () => {
    character = generateCharacter();
    renderFirstRunDetails(character);
  });

  document.getElementById('beginJourneyBtn').addEventListener('click', () => {
    screen.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    persist();
    renderAll();
  }, { once: true });
}

function boot() {
  const saved = loadGame();
  if (saved && saved.character) {
    character = saved.character;
    character.derived = computeDerivedStats(character);
    const idleSummary = computeIdleCatchUp(character, saved.lastSavedAt);
    document.getElementById('app').classList.remove('hidden');
    persist();
    renderAll();
    if (idleSummary && idleSummary.cycles > 0) {
      showToast(`While you were away: +${Math.round(idleSummary.xp)}xp, +${Math.round(idleSummary.gold)}g`, 'success');
    }
  } else {
    character = generateCharacter();
    showFirstRunScreen(character);
  }

  document.getElementById('startOverBtn').addEventListener('click', handleStartOver);
  document.getElementById('levelUpBtn').addEventListener('click', () => {
    const levelResult = addXp(character, character.xpToNext);
    character.derived = computeDerivedStats(character);
    persist();
    renderAll();
    notifyIfClassAdvancementAvailable();
    notifyGainedTraits(levelResult.gainedTraits);
  });

  setInterval(tickLoop, 1000);
  setInterval(() => { if (character && character.activity) persist(); }, 30000);
  window.addEventListener('visibilitychange', () => { if (document.hidden && character) persist(); });
  window.addEventListener('beforeunload', () => { if (character) persist(); });
}

boot();
