# Summoning classes needing familiars

Candidate classes identified from flavor text ("something else acts on your
behalf"), for the full familiar mechanic (separate combat-relevant companion,
not the existing decorative pet in js/core/petAI.js).

## Confirmed summoners (flavor text explicitly implies a stand-in agent)

- **conjurer** (mage -> conjurer) -- "never lifts the blade themselves --
  something else in the room already has."
- **insectmancer** (mage -> insectmancer) -- "never casts alone -- something's
  always already crawling toward the same spell."
- **golemmancer** (nascentsoul -> golemmancer) -- "stopped needing a body that
  listens -- clay and stone never argue back."
- **archmechanist** / **technomancer** (runesmith -> archmechanist ->
  technomancer) -- "doesn't need to be in the room -- their automatons
  already are."

## Maybe (weaker signal, worth a design call)

- **corpsecultivator** line (corpsecultivator -> ... -> undyingsovereign) --
  necromancer-adjacent flavor, but the actual text leans more on
  ledger/debt metaphor than literally raising corpses. Could go either way.
- **warlock** -- classic "pact" archetype, but current flavor text is about
  bargains/prices, not a summoned entity. Would need a flavor tweak to justify
  a familiar.

## Not summoners (no signal)

Everything else -- fighter/warrior/rogue/warden/trickster/webslinger/archer/
fortuneteller/battlemage/cultivator (qi) lines, etc. -- reads as
solo-combatant flavor and shouldn't get a familiar without a flavor rewrite
first.

## Open questions for the mechanic itself

- Does each summoning class get one fixed familiar, or a choice/unlock chain
  of familiars per tier (mirroring the class's own tier progression)?
- Is the familiar a stat-bonus-only abstraction, or an actual combat entity
  with its own HP/turns in combat.js?
- Does it need a UI element (combatModal.js / characterSheet.js), or does it
  ride along invisibly as a passive buff for now?
