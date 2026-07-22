# Story Bible

## Premise

Every hero starts the same way: broke, untitled, and warming their hands at a
campfire in the slums. The world doesn't hand out destinies — it hands out a
level 1 peasant and fifteen stamina, and whatever you become past that is
earned in a training yard, not given by birthright.

## The Slums

The hero's story opens here — a cramped alley wedged between tenements, lit
by one guttering streetlamp and a shared fire that never quite goes out. It's
not glamorous, but it's honest: everyone huddled around that fire has a
reason for being there, and the six backgrounds a hero can roll
(`js/data/names.js`) are really six answers to "how did you end up in the
slums":

- **Farmhand** — left the fields when the harvest failed one year too many.
- **Orphan** — never knew anything else; the streets raised them.
- **Disgraced Noble** — a name that used to open doors, in a district where
  it means nothing.
- **Camp Follower** — followed the last war home and never left the city.
- **Village Smith's Apprentice** — the forge back home burned; the calluses
  didn't.
- **Wandering Pilgrim** — stopped walking here, for now.

Different roads, same fire. That's the thesis of the game: class, stats, and
starting gold are just the shape of the dice roll — where you end up is
built through Training, Work, and Spar, one grind session at a time.

## The Long Climb

At level 5, the road out of the slums forks into the first real trade:
**Fighter**, **Mage**, or **Rogue** — steel, study, or speed. Whichever the
hero leans into, the training stops being generic (`train`/`footwork`) and
starts being purposeful, and the game's other locales open up as places to
test it: the **castle** training grounds for formal drilling, and further
out, the **chinese courtyard**, the **autumn** treeline, and the **winter
cliffs** — each one a step further from home and a step deeper into the kind
of trouble worth writing home about (bandits on the road, a wild boar that
won't be reasoned with, a rival squire sizing you up, something in the marsh
that shouldn't still be moving).

## Hidden Potential

Not every hero's talent shows up on the character sheet. Some are born with
something extra — a trait rolled quietly at creation, invisible until the
attributes behind it are trained high enough to surface it
(`js/data/traits.js`). That's the game's version of a secret destiny: train
hard enough in the right direction and you might discover you were never
going to be *just* a Fighter, Mage, or Rogue.

- **Arcane Fortune** turns a Mage into a **Battlemage** — someone whose luck
  and learning collided.
- **Stonewoken** turns a Fighter into a **Warden** — a line that doesn't
  break.
- **Silver Tongue** turns a Rogue into a **Trickster** — always one step
  ahead of the opening.
- **Clockwork Mind** doesn't wait for a base class at all. It pulls a hero
  sideways into the **Novice Mechanic** track — gears and grease instead of
  steel or spellbooks. Unlike the other three, it isn't something a hero
  trains their way into — it's something they *find*. Enough evenings spent
  scavenging the alleys and, once in a great while, something turns up in
  the gutter that isn't quite junk. What a hero does with it next is up to
  them.

## Six Rungs Up

Steel and speed both go the distance now. A **Fighter** who keeps training
past the first fork climbs **Vanguard → Warbringer → Battlelord →
Juggernaut → Colossus** — less a change of trade than the same trade with
nothing left to prove: by the top rung, armies plan around one of them the
way they'd plan around a siege engine. A **Rogue** climbs an equally long
ladder of their own (**Shadowblade → Assassin → Nightstalker → Wraith →
Umbral Sovereign**), trading raw size for the sort of reputation that
precedes you into a room. **Mage** is the one path that still stops at tier
1 — this world hasn't gotten there yet.

## The Machine Age

The Mechanic line is the odd one out in a different way: it's the only tree
that doesn't run on sword-and-spell tradition at all. Starting from
**Factory Apprentice** work taken on in the slums, a hero with the knack for
it can climb an entire second ladder — **Novice Mechanic → Engineer →
Runsmith → Archmechanist → Technomancer → Clockwork Divinity**. It's a
slower burn than the warrior classes, but it's the only path that ends
somewhere genuinely strange: not a stronger person, but something that's
stopped being entirely a person. By the top of that tree the distinction
between "the mechanism I built" and "the mind that built it" has quietly
dissolved.

## Tone

Grounded and a little wry, not epic-fantasy self-serious — the flavor text
throughout (`js/data/classes.js`, `js/data/traits.js`) leans on understated
one-liners over prophecy and chosen-one language. The hero isn't destined
for anything. They're just the one who kept showing up to train.
