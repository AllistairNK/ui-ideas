const SAVE_KEY = 'hero-game-save-v1';
const SCHEMA_VERSION = 1;

export function saveGame(character) {
  const payload = {
    schemaVersion: SCHEMA_VERSION,
    character,
    lastSavedAt: Date.now()
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
}

// Maps old class ids to their renamed equivalents so existing saves keep working.
const CLASS_ID_RENAMES = {
  tinkerer: 'novicemechanic'
};

// Placeholder for future schema changes -- keeps the retrofit painless later.
function migrateSave(saved) {
  const character = saved.character;
  if (character && CLASS_ID_RENAMES[character.class]) {
    character.class = CLASS_ID_RENAMES[character.class];
  }
  if (character && Array.isArray(character.flags?.unlockedClasses)) {
    character.flags.unlockedClasses = character.flags.unlockedClasses.map(
      id => CLASS_ID_RENAMES[id] || id
    );
  }

  if (saved.schemaVersion === SCHEMA_VERSION) return saved;
  saved.schemaVersion = SCHEMA_VERSION;
  return saved;
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return migrateSave(parsed);
  } catch (e) {
    console.error('Failed to parse save data', e);
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}
