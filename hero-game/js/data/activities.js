export const ACTIVITIES = {
  train: {
    id: 'train',
    name: 'Train',
    description: 'Build strength and endurance with heavy conditioning work.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 0, attributeTraining: { strength: 0.15, vitality: 0.1 }, staminaDelta: 0, lootTableId: null }
  },
  footwork: {
    id: 'footwork',
    name: 'Footwork',
    description: 'Run footwork and reflex drills around the yard.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 0, attributeTraining: { agility: 0.15 }, staminaDelta: 0, lootTableId: null }
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
  apprentice_factory: {
    id: 'apprentice_factory',
    name: 'Factory Apprentice',
    branchId: 'apprentice',
    branchLabel: 'Factory',
    description: 'Take on apprentice work at the factory, picking up practical technical knowledge.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 2, attributeTraining: { intellect: 0.15, agility: 0.1 }, staminaDelta: 0, lootTableId: null }
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

export const IDLE_ELIGIBLE_ACTIVITY_IDS = ['train', 'footwork', 'study', 'apprentice_factory', 'work', 'rest'];

// A branch groups several concrete activities (variantIds, each a real entry
// in ACTIVITIES) behind one sponsor-choice menu in the UI. Add more
// variantIds here as new apprenticeship sponsors (store, job, person) are built.
export const ACTIVITY_BRANCHES = {
  apprentice: {
    id: 'apprentice',
    name: 'Apprentice',
    description: 'Take on apprentice work under a sponsor.',
    variantIds: ['apprentice_factory']
  }
};
