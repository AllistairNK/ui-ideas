export function showCombatModal(opponent, combatResult, rewardsSummary, handlers) {
  const root = document.getElementById('combatModal');
  if (!root) return;

  const outcomeLabel = { win: 'Victory!', loss: 'Defeated...', draw: 'Draw' }[combatResult.outcome];

  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-title">Spar vs ${opponent.name}</div>
        <div class="combat-log">
          ${combatResult.log.map((line) => `<div class="log-line">${line}</div>`).join('')}
        </div>
        <div class="combat-outcome combat-${combatResult.outcome}">${outcomeLabel}</div>
        ${rewardsSummary ? `<div class="combat-rewards">${rewardsSummary}</div>` : ''}
        <button type="button" data-action="close">Continue</button>
      </div>
    </div>
  `;
  root.classList.remove('hidden');

  root.querySelector('[data-action="close"]').addEventListener('click', () => {
    root.classList.add('hidden');
    root.innerHTML = '';
    if (handlers && handlers.onClose) handlers.onClose();
  });
}
