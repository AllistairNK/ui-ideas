export const ACTIVITIES = {
  train: {
    id: 'train',
    name: 'Train',
    description: 'Drill strength and endurance in the yard.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 0, attributeTraining: { strength: 0.15, vitality: 0.1 }, staminaDelta: 0, lootTableId: null }
  },
  study: {
    id: 'study',
    name: 'Study',
    description: 'Pore over old texts and arcane theory.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: ['mage'] },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 0, attributeTraining: { intellect: 0.2 }, staminaDelta: 0, lootTableId: null }
  },
  work: {
    id: 'work',
    name: 'Work',
    description: 'Take odd jobs around town for coin.',
    category: 'labor',
    durationSeconds: 15,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 8, gold: 0 },
    rewards: { xp: 3, gold: 6, attributeTraining: {}, staminaDelta: 0, lootTableId: null }
  },
  rest: {
    id: 'rest',
    name: 'Rest',
    description: 'Recover stamina and mend wounds.',
    category: 'rest',
    durationSeconds: 12,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 0, gold: 0 },
    rewards: { xp: 0, gold: 0, attributeTraining: {}, staminaDelta: 30, hpDelta: 20, lootTableId: null }
  },
  spar: {
    id: 'spar',
    name: 'Spar',
    description: 'Fight a rival for glory, coin, and loot.',
    category: 'combat',
    durationSeconds: 0, // resolved instantly via combat, not ticked
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 25, gold: 0 },
    rewards: { xp: 20, gold: 15, attributeTraining: {}, staminaDelta: 0, lootTableId: 'common' }
  }
};

export const IDLE_ELIGIBLE_ACTIVITY_IDS = ['train', 'study', 'work', 'rest'];
