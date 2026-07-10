export const NAME_POOL = [
  "Aldric", "Branna", "Cedric", "Dorin", "Elga", "Fennick", "Gwen", "Hobb",
  "Isolde", "Jorund", "Kessa", "Lorne", "Mirela", "Nils", "Odessa", "Percival",
  "Quinlan", "Rosalind", "Soren", "Tilda", "Ulric", "Vesna", "Wystan", "Yarrow"
];

export const BACKGROUNDS = [
  {
    id: "farmhand",
    name: "Farmhand",
    flavor: "Grew up hauling grain sacks and mucking stalls before dawn.",
    attributeModifiers: { strength: 1, vitality: 1 }
  },
  {
    id: "orphan",
    name: "Orphan",
    flavor: "Raised on the streets, learned to be quick or go hungry.",
    attributeModifiers: { agility: 1, luck: 1 }
  },
  {
    id: "disgraced_noble",
    name: "Disgraced Noble",
    flavor: "Once wore silk; now wears whatever doesn't have holes.",
    attributeModifiers: { intellect: 1, luck: -1 }
  },
  {
    id: "camp_follower",
    name: "Camp Follower",
    flavor: "Trailed armies for years, patching wounds and picking pockets.",
    attributeModifiers: { agility: 1, intellect: 1 }
  },
  {
    id: "village_smith",
    name: "Village Smith's Apprentice",
    flavor: "Callused hands from years at the forge.",
    attributeModifiers: { strength: 1, intellect: -1 }
  },
  {
    id: "wandering_pilgrim",
    name: "Wandering Pilgrim",
    flavor: "Walked more roads than most see in a lifetime.",
    attributeModifiers: { vitality: 1, luck: 1 }
  }
];
