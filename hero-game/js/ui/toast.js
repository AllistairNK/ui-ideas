let container = null;

function ensureContainer() {
  if (container) return container;
  container = document.getElementById('toastContainer');
  return container;
}

export function showToast(message, kind = 'info', durationMs = 3500) {
  const root = ensureContainer();
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast toast-${kind}`;
  el.textContent = message;
  root.appendChild(el);
  requestAnimationFrame(() => el.classList.add('toast-visible'));
  setTimeout(() => {
    el.classList.remove('toast-visible');
    setTimeout(() => el.remove(), 300);
  }, durationMs);
}
