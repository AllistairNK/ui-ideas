import { generateCharacter, computeDerivedStats, addXp } from './core/character.js';
import { saveGame, loadGame, clearSave } from './core/save.js';
import { assignActivity, cancelActivity, tickActivity, computeIdleCatchUp, canStartActivity, toggleResting, applyPassiveRegen, MAX_IDLE_CATCHUP_MS } from './core/activityEngine.js';
import { equipItem, unequipItem, addToInventory, createItemInstance, rollLoot } from './core/equipment.js';
import { generateOpponent, resolveCombat } from './core/combat.js';
import { ITEM_TEMPLATES } from './data/items.js';
import { ACTIVITIES } from './data/activities.js';
import { CLASSES } from './data/classes.js';

import { renderCharacterSheet, updateCharacterSheetLive } from './ui/characterSheet.js';
import { renderActivityPanel } from './ui/activityPanel.js';
import { renderInventoryPanel } from './ui/inventoryPanel.js';
import { renderPetView } from './ui/petView.js';
import { showCombatModal } from './ui/combatModal.js';
import { renderClassPanel, isClassAdvancementAvailable } from './ui/classPanel.js';
import { showToast } from './ui/toast.js';

let character = null;

function renderAll() {
  if (!CLASSES[character.class]) {
    character.class = 'peasant';
  }
  document.getElementById('headerName').textContent = character.name;
  document.getElementById('headerClassLevel').textContent = `${CLASSES[character.class].name} · Lv ${character.level}`;
  document.getElementById('headerGold').textContent = `${Math.floor(character.currency.gold)}g`;

  renderPetView(character, { onPet: () => {} });
  renderCharacterSheet(character);
  renderActivityPanel(character, {
    onAssign: handleAssignActivity,
    onCancel: handleCancelActivity,
    onToggleRest: handleToggleRest
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
  if (ACTIVITIES[activityId] && ACTIVITIES[activityId].category === 'combat') {
    runSpar(activityId);
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

function handleToggleRest() {
  toggleResting(character);
  persist();
  renderAll();
}

function runSpar(activityId) {
  const check = canStartActivity(character, activityId);
  if (!check.ok) {
    showToast(check.reason, 'error');
    return;
  }
  const activity = ACTIVITIES[activityId];
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

function notifyGainedItems(gainedItems) {
  for (const item of gainedItems || []) {
    const template = ITEM_TEMPLATES[item.templateId];
    if (template) showToast(`Found: ${template.name}`, 'success');
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
  const alreadyOwned = character.inventory.some((i) => i.templateId === itemId)
    || Object.values(character.equipment).some((i) => i && i.templateId === itemId);
  if (alreadyOwned) {
    showToast('You already own this item.', 'error');
    return;
  }
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
  if (!character) return;
  applyPassiveRegen(character, 1000);

  // Stats/stamina/xp now flow continuously every second (see
  // activityEngine.js), so most ticks aren't "notable" enough to justify a
  // full renderAll() (which rebuilds the pet stage, inventory, etc.) --
  // reserve that for level-ups, new traits, or new items, and otherwise just
  // refresh the two panels that show live per-second progress.
  const summary = character.activity ? tickActivity(character) : null;
  const notable = summary && (summary.leveledUp || summary.gainedTraits.length || summary.gainedItems.length);
  if (notable) {
    persist();
    renderAll();
    if (summary.leveledUp) {
      showToast(`Level up! Now level ${character.level}.`, 'success');
      notifyIfClassAdvancementAvailable();
    }
    notifyGainedTraits(summary.gainedTraits);
    notifyGainedItems(summary.gainedItems);
  } else {
    updateCharacterSheetLive(character);
    renderActivityPanel(character, { onAssign: handleAssignActivity, onCancel: handleCancelActivity, onToggleRest: handleToggleRest });
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
    applyPassiveRegen(character, Math.min(Date.now() - saved.lastSavedAt, MAX_IDLE_CATCHUP_MS));
    const idleSummary = computeIdleCatchUp(character, saved.lastSavedAt);
    document.getElementById('app').classList.remove('hidden');
    persist();
    renderAll();
    if (idleSummary) {
      showToast(`While you were away: +${Math.round(idleSummary.xp)}xp, +${Math.round(idleSummary.gold)}g`, 'success');
      notifyGainedTraits(idleSummary.gainedTraits);
      notifyGainedItems(idleSummary.gainedItems);
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
  setInterval(() => { if (character && (character.activity || character.resting)) persist(); }, 30000);
  window.addEventListener('visibilitychange', () => { if (document.hidden && character) persist(); });
  window.addEventListener('beforeunload', () => { if (character) persist(); });
}

boot();
