export const ACTIVITIES = {
  // --- slum activities: the default task set a hero grinds through at the
  // campfire that opens their story (see STORYLINE.md). Tagged theme:'slums'
  // so the activity panel shows these by default and hides the legacy/generic
  // set below behind the "show all tasks" toggle.
  slum_drills: {
    id: 'slum_drills',
    name: 'Backstreet Drills',
    description: 'Grind through conditioning work in the cramped alley behind the fire.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 0, attributeTraining: { strength: 0.15, vitality: 0.1 }, staminaDelta: 0, lootTableId: null },
    theme: 'slums'
  },
  rooftop_runs: {
    id: 'rooftop_runs',
    name: 'Rooftop Runs',
    description: 'Scramble across sagging rooftops and gutters to sharpen your footing.',
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 8, gold: 0, attributeTraining: { agility: 0.15 }, staminaDelta: 0, lootTableId: null },
    theme: 'slums'
  },
  scavenge: {
    id: 'scavenge',
    name: 'Scavenge the Alleys',
    description: 'Pick through bins and gutters for anything worth a coin.',
    category: 'labor',
    durationSeconds: 15,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 10, gold: 0 },
    rewards: { xp: 3, gold: 5, attributeTraining: { luck: 0.05 }, staminaDelta: 0, lootTableId: 'scavengeFind' },
    theme: 'slums'
  },
  // Hidden -- only appears once a Bent Cog turns up from Scavenge, and
  // disappears again once its trait is granted (excludesTraitId) rather than
  // by consuming the cog -- the cog stays in inventory as a keepsake/future
  // crafting ingredient. See STORYLINE.md and traits.js's clockworkMind.
  tinker_cog: {
    id: 'tinker_cog',
    name: 'Tinker with the Cog',
    description: "Turn it over by firelight. Maybe it's junk. Maybe it's not.",
    category: 'training',
    durationSeconds: 20,
    requirements: { minLevel: 1, classWhitelist: null, itemId: 'bent_cog', excludesTraitId: 'clockworkMind' },
    costs: { stamina: 10, gold: 0 },
    rewards: { xp: 5, gold: 0, attributeTraining: {}, staminaDelta: 0, lootTableId: null, grantsTraitId: 'clockworkMind' },
    theme: 'slums',
    hidden: true,
    oneShot: true
  },
  odd_jobs: {
    id: 'odd_jobs',
    name: 'Odd Jobs',
    description: "Haul crates and run messages for whoever's paying in the district.",
    category: 'labor',
    durationSeconds: 15,
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 8, gold: 0 },
    rewards: { xp: 3, gold: 6, attributeTraining: {}, staminaDelta: 0, lootTableId: null },
    theme: 'slums'
  },
  alley_scrap: {
    id: 'alley_scrap',
    name: 'Alley Scrap',
    description: "Settle it with a rival right there in the alley -- glory, coin, and whatever they were carrying.",
    category: 'combat',
    durationSeconds: 0, // resolved instantly via combat, not ticked
    requirements: { minLevel: 1, classWhitelist: null },
    costs: { stamina: 25, gold: 0 },
    rewards: { xp: 20, gold: 15, attributeTraining: {}, staminaDelta: 0, lootTableId: 'common' },
    theme: 'slums'
  },

  // --- legacy/generic activities: hidden by default, revealed with the
  // panel's "show all tasks" toggle.
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
  // Engineer's own equivalent of Scavenge the Alleys -- salvage runs through
  // the workshop scrap heaps, low odds of turning up a Runic Relic.
  workshop_salvage: {
    id: 'workshop_salvage',
    name: 'Workshop Salvage',
    description: 'Pick through the scrap heap for parts worth keeping.',
    category: 'labor',
    durationSeconds: 15,
    requirements: { minLevel: 1, classWhitelist: ['engineer'] },
    costs: { stamina: 10, gold: 0 },
    rewards: { xp: 5, gold: 6, attributeTraining: { intellect: 0.05 }, staminaDelta: 0, lootTableId: 'workshopFind' }
  },
  // Hidden -- only appears once a Runic Relic turns up from Workshop
  // Salvage, and disappears again once its trait is granted (excludesTraitId)
  // rather than by consuming the relic -- it stays in inventory as a
  // keepsake. Gates the Engineer -> Runesmith evolution in classes.js.
  study_relic: {
    id: 'study_relic',
    name: 'Study the Relic',
    description: "Lay the relic out under the workshop lamps and work through what it's actually saying.",
    category: 'training',
    durationSeconds: 25,
    requirements: { minLevel: 1, classWhitelist: ['engineer'], itemId: 'runic_relic', excludesTraitId: 'runicInsight' },
    costs: { stamina: 15, gold: 0 },
    rewards: { xp: 10, gold: 0, attributeTraining: {}, staminaDelta: 0, lootTableId: null, grantsTraitId: 'runicInsight' },
    hidden: true,
    oneShot: true
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

export const IDLE_ELIGIBLE_ACTIVITY_IDS = [
  'slum_drills', 'rooftop_runs', 'scavenge', 'odd_jobs', 'tinker_cog',
  'train', 'footwork', 'study', 'apprentice_factory', 'work',
  'workshop_salvage', 'study_relic'
];

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
