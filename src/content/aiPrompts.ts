/**
 * The prompts a server owner copies into their own AI to have an effect written.
 *
 * They are kept here rather than in MDX because a prompt is one long literal
 * string: a fenced block inside MDX would be re-highlighted, re-indented and
 * re-escaped on the way to the clipboard, and what the AI receives has to be
 * exactly what is written here.
 *
 * Everything below is verified against ExyliaLib's sequence compiler and the
 * three plugins' shipped `effects.yml`. Keep it that way — a prompt that
 * invents a parameter produces a file the console rejects line by line.
 */

/** The part of the language that is the same in every plugin. */
const SEQUENCE_DSL = `## The step language

A step is one YAML string: a token in brackets, then what it is drawn with, then parameters
separated by \`;\`.

    '[CIRCLE] NETHERITE_SWORD;as:item;radius:3;points:12;from:0,10,0;ease:in'

A shape line draws DISPLAY ENTITIES when it carries \`as:\`, and PARTICLES when it does not.

    as:item    an item model
    as:block   a block model
    as:head    a player head: a base64 texture, or {killer} / {victim} for a face
    as:text    a line of text
    (nothing)  the particle named at the head of the line

### Shapes

CIRCLE SPHERE DOME CUBE LINE RIBBON SCATTER BEAM SPIRAL DOUBLE_HELIX TORNADO STAR CAGE DISC
VORTEX WAVE CROSS GALAXY TORUS BURST PYRAMID RING_PULSE WINGS ARCH CLAW, plus DISPLAY for a
single object at the anchor.

Each shape's own parameters:

    CIRCLE, SPHERE, DOME    radius points
    BEAM                    height points
    SPIRAL                  height radius turns points
    DOUBLE_HELIX            height radius turns points strands
    TORNADO                 height radius top_radius turns points
    STAR                    radius spikes inner points
    CAGE                    radius height columns points
    DISC                    radius rings points
    VORTEX                  radius turns points
    WAVE                    length amplitude frequency arms angle points
    CROSS                   radius arms angle points
    GALAXY                  radius turns arms points
    TORUS                   radius tube segments tube_segments
    BURST                   radius beams angle points
    PYRAMID                 base height points
    RING_PULSE              radius rings spacing points
    WINGS                   span arch depth dir points
    ARCH                    radius arc dir points
    CLAW                    radius claws spread curve dir drop points
    CUBE                    width points edges
    LINE                    length dir climb points
    RIBBON                  radius points waves amplitude
    SCATTER                 radius height points seed floor
    DISPLAY                 (none)

Every shape also understands:

    y          lifts the whole shape. SPHERE and TORUS sit a block up by default, the rest at zero
    scale      grows or shrinks the geometry itself
    ticks      1 draws the shape in one frame; higher spreads it over frames, so it looks drawn
    interval   seconds between those frames. Defaults to 0.05
    rotate     turns the whole shape, in degrees
    face       turns it to face whoever caused the moment
    color size count   particle lines only. DUST takes color:255,80,0

### Moving a display (any shape drawn with as:)

    life       seconds it exists
    from:x,y,z where it starts, relative to its point
    to:x,y,z   where it ends. rise: is shorthand for a vertical to
    ease       in, out or in_out. ease:in aims a slam, ease:out settles one
    gravity    debris only. It is ADDED to the movement rather than replacing it
    spin       turns, or x,y,z to tumble. axis: picks one axis
    orbit      turns carried around the anchor
    pull       1 reaches the centre; a negative number throws it outwards
    size       one number, or x,y,z for a plate, a pillar or a blade
    size_to    the size it ends at
    vary       how much individual pieces differ from one another
    roll tilt turn   fixed rotation in degrees
    face_out   faces away from the centre
    glow       an outline colour
    light      0 to 15. Use light:15 for anything that must read at night
    model billboard hold   the display's own model, billboard mode and hold time

### Repeating any step

    repeat     how many times the line plays
    every      seconds between plays. Defaults to 0.15
    turn_each  degrees added each time, so the copies fan out

### The other tokens

    [DELAY] 0.15                          seconds to wait before the next line
    [PARTICLE] FLAME                      count speed y color size offset:x,y,z block
    [SOUND] NAME;volume;pitch             also volume: pitch:
    [LIGHTNING]                           volume: pitch: — flash, sparks and thunder. No strike,
                                          no fire, no damage
    [EXPLOSION]                           count: y:
    [FIREWORK]                            color: fade: type: trail: flicker: power:
    [BLOCK_BREAK] STONE                   count: y: offset:
    [POTION] speed;100;1                  also duration: amplifier:
    [TITLE] title;subtitle;in;stay;out    times in seconds
    [ACTION_BAR] text
    [MESSAGE] text
    [COMMAND] give {player} …             {player} {world} {x} {y} {z}
    [NPC] {victim}                        a body, below

### [NPC] — a body

    '[NPC] {victim};pose:lying;life:2.2;equip:true;face:false'

    (the head)  {victim}, {killer}, or a base64 texture. A player NAME is refused
    pose        lying standing crawling sneaking spinning. lying by default
    pose_to / after   a second pose it collapses into
    move_after  seconds it stands there before anything happens to it
    life        seconds it stays. Defaults to 5
    equip       whether it wears what the victim wore. On by default
    face        whether it turns to face. On by default
    from to over ease gravity turn   how it is thrown or how it falls. over defaults to 0.7
    glow        an outline colour
    hurt        plays the damage flash
    y           lifts it
    spin        degrees a second it keeps turning, for its whole life
    bob bob_every   blocks it rises and falls on a loop, and how long one rise and fall takes
    swing       seconds between arm swings
    scale       how big it is drawn, 1 being player-sized
    hold offhand    a material put in each hand
    pitch       head pitch in degrees, negative being up

It is a display, not an entity: nothing can hit it, loot it or walk into it.

## Three rules that save an afternoon

1. \`ease:in\` aims a slam and \`ease:out\` settles one.
2. \`gravity:\` is ADDED to a movement that already descends, so a fall of eight blocks plus
   gravity goes through the floor. Half of gravity times the life squared is how far it drops.
   Use it on debris only.
3. \`roll:\` aims a blade, not \`tilt:\`. An item model is a flat plate facing south with its tip up
   and to the right, so \`roll:135\` points it down.

## Colour tokens

Colours may be written as hex, or as one of the library's palette tokens, which every server can
recolour at once: {primary} {secondary} {secondary_light} {letters} {letters_black} {error}
{success} {success_light} {info} {info_light} {accent} {neutral} {highlight} {muted} {warning}
{warning_light}. \`name:\` also accepts MiniMessage and gradients.

## When a line is wrong

A step that cannot be read is dropped and reported to the console with the line that caused it —
an unknown token, a particle that does not exist, a shape that produced no points, a parameter the
token does not understand. The rest of the effect still plays. So never invent a parameter or a
shape: only what is listed above exists.`;

const OUTPUT_RULES = `## What to answer with

1. One YAML block, ready to paste, indented exactly like the examples — two spaces for the effect
   key, four for its keys, six for the \`- '…'\` steps.
2. Every step in single quotes, on its own line.
3. Only materials, particles and sounds that exist in Minecraft 1.21+ (Bukkit enum spelling).
4. Only the tokens, shapes and parameters listed above. Do not invent any.
5. Under the YAML, a short list of what each step does and what to change to tune it.
6. Answer in the language the user wrote their idea in.`;

/** The prompt for each of the three effect plugins. */
export const AI_PROMPTS = {
  killeffect: `You are writing a kill effect for the Minecraft plugin ExyliaKillEffect (Paper/Folia 1.21+),
which draws effects with display entities — real items and blocks that fall, turn and slam —
animated by each viewer's own client rather than by the server tick. Particles are used the way a
film uses smoke: atmosphere around something solid, never the thing itself.

Read everything below, then write the effect the user asks for at the end.

## Where it goes

\`plugins/ExyliaKillEffect/effects.yml\`, under \`kill_effects:\`. An entry looks like this:

    kill_effects:
      BLADE_STORM:
        category: siege
        tier: common
        name: "<gradient:#DCE6F2:#8FA6C4><bold>BLADE STORM</bold></gradient>"
        material: NETHERITE_SWORD
        description:
          - 'Twelve blades come down point first, stand'
          - 'for a beat, then {highlight}close all at once{neutral}.'
        priority: 1
        effects:
          - '[SOUND] ENTITY_BREEZE_INHALE;1.5;1.7'

    category      which tab it appears under; must be a key declared under categories:
                  the shipped ones are siege, cataclysm, abyss, aurora, verdant, bonk
    tier          how rare it is; must be a key declared under tiers: in config.yml
                  the shipped ones are common, rare, epic, legendary. Omit it and it falls back
                  to the first rarity
    name          what menus and placeholders call it. MiniMessage and gradients work
    material      the item the menu row is drawn with. Defaults to BARRIER
    description   one line, or a list of lines. <nl> also breaks a single line
    priority      where it sits in its tab; lower comes first. Defaults to 999
    effects       the steps, drawn where the victim fell
    weapons       optional, only read while behaviour.mode reads weapons. Accepts item names and
                  the families ANY SWORD AXE TRIDENT MACE BOW CROSSBOW MELEE RANGED

The effect key is the permission: BLADE_STORM is \`exyliakilleffect.effect.blade_storm\`.

## The anchor and the budget

\`(0,0,0)\` is where the victim fell. Positive Y is up.

A kill effect is a scene, and it is allowed to be one: about ten to fifteen steps, a second and a
half to three seconds end to end. That is the ceiling, not a target — every line is a packet per
viewer. Almost every shipped effect opens with an \`[NPC] {victim}\` line, because the body going
down is what the effect is about.

${SEQUENCE_DSL}

## Two effects that ship, in full

    BLADE_STORM:
      category: siege
      name: "<gradient:#DCE6F2:#8FA6C4><bold>BLADE STORM</bold></gradient>"
      material: NETHERITE_SWORD
      description:
        - 'Twelve blades come down point first, stand'
        - 'for a beat, then {highlight}close all at once{neutral}.'
      priority: 1
      effects:
        - '[NPC] {victim};pose:standing;hold:NETHERITE_SWORD;swing:0.28;turn:-70;over:0.55;pose_to:lying;after:1.13;life:3.58;hurt:true;move_after:0.58'
        - '[SOUND] ENTITY_BREEZE_INHALE;1.5;1.7'
        - '[CIRCLE] NETHERITE_SWORD;as:item;radius:3.4;points:12;from:0,10,0;to:0,1.0,0;ease:in;life:0.55;roll:135;face_out:true;size:1.4;light:15;ticks:5;interval:0.025'
        - '[DELAY] 0.58'
        - '[SOUND] BLOCK_STONE_BREAK;1.8;0.6'
        - '[CIRCLE] DEEPSLATE;as:block;radius:3.4;points:12;size:0.05,0.05,0.05;size_to:0.9,0.12,0.9;ease:out;life:0.4;y:-0.05;light:12'
        - '[DELAY] 0.4'
        - '[SOUND] ENTITY_PLAYER_ATTACK_SWEEP;2.0;0.7'
        - '[CIRCLE] NETHERITE_SWORD;as:item;radius:3.4;points:12;pull:1;ease:in;life:0.28;roll:135;face_out:true;size:1.4;size_to:1.0;y:1.0;light:15'
        - '[DELAY] 0.28'
        - '[SOUND] ENTITY_PLAYER_ATTACK_CRIT;2.0;0.5'
        - '[PARTICLE] SWEEP_ATTACK;count:6;offset:0.5,0.4,0.5;speed:0.0'

Read it as a script: the body is placed and holds a sword, twelve blades fall point first from ten
blocks up over half a second, the ground plates crack under them, the blades close on the centre,
and a sweep particle lands the last frame. Every \`[DELAY]\` is the length of the movement before it.

    CRATER:
      category: cataclysm
      name: "<gradient:#FFD9A0:#8A3B00><bold>CRATER</bold></gradient>"
      material: MAGMA_BLOCK
      description: "The floor {highlight}gives out{neutral} under them."
      priority: 14
      effects:
        - '[NPC] {victim};pose:standing;pitch:-70;pose_to:lying;after:0.7;hurt:true;life:3.2'
        - '[SOUND] ENTITY_GENERIC_EXPLODE;1.6;0.6'
        - '[DISC] MAGMA_BLOCK;as:block;radius:3.0;rings:3;points:14;size:0.9,0.1,0.9;size_to:1.0,0.06,1.0;ease:out;life:0.7;y:-0.1;light:14'
        - '[SCATTER] BLACKSTONE;as:block;radius:2.4;points:14;seed:5;height:1.2;size:0.35;size_to:0.05;vary:0.9;pull:-3;to:0,2.4,0;gravity:9;ease:out;life:1.0;spin:1,1,1;light:12'
        - '[PARTICLE] LARGE_SMOKE;count:22;offset:1.6,0.6,1.6;speed:0.06'
`,

  hiteffect: `You are writing a hit effect for the Minecraft plugin ExyliaHitEffect (Paper/Folia 1.21+),
which draws effects with display entities — real items and blocks that fall, turn and slam —
animated by each viewer's own client rather than by the server tick. Particles are used the way a
film uses smoke: atmosphere around something solid, never the thing itself.

Read everything below, then write the effect the user asks for at the end.

## Where it goes

\`plugins/ExyliaHitEffect/effects.yml\`, under \`hit_effects:\`. An entry looks like this:

    hit_effects:
      CRIT_SPARK:
        category: impact
        tier: common
        name: "<gradient:#FFE9A8:#D1A53F><bold>CRIT SPARK</bold></gradient>"
        material: GOLDEN_SWORD
        description: "Eight splinters of gold, {highlight}gone in a third<nl>of a second{neutral}."
        priority: 1
        effects:
          - '[SOUND] ENTITY_PLAYER_ATTACK_CRIT;0.7;1.4'

    category      which tab it appears under; must be a key declared under categories:
                  the shipped ones are impact, crimson, ember, sculk, prism, goofy
    tier          how rare it is; must be a key declared under tiers: in config.yml
                  the shipped ones are common, rare, epic, legendary. Omit it and it is common
    name          what menus and placeholders call it. MiniMessage and gradients work
    material      the item the menu row is drawn with. Defaults to BARRIER
    description   one line, or a list of lines. <nl> also breaks a single line
    priority      where it sits in its tab; lower comes first. Defaults to 999
    effects       the steps, drawn on whoever was hit
    weapons       optional, only read while behaviour.mode reads weapons. Accepts item names and
                  the families ANY SWORD AXE TRIDENT MACE BOW CROSSBOW MELEE RANGED

The effect key is the permission: CRIT_SPARK is \`exyliahiteffect.effect.crit_spark\`.

## The anchor and the budget — read this twice

\`(0,0,0)\` is a block above the victim, so an effect lands on the body rather than at their feet.
Positive Y is up.

A hit effect plays on EVERY BLOW OF EVERY FIGHT, not once per kill. Every line is a packet per
viewer, multiplied by every swing on the server. The shipped effects are TWO TO FIVE STEPS and
UNDER SIX TENTHS OF A SECOND end to end. That is the budget, not a coincidence: keep radii under
about 0.5, sizes small, \`life\` at 0.2–0.5, and use at most one sound. Anything longer reads as lag,
not as an effect.

None of the shipped hit effects uses \`[NPC]\` — a body left behind on every blow is a kill effect,
not a hit effect — but the step exists if you want one.

${SEQUENCE_DSL}

## Three effects that ship, in full

    CRIT_SPARK:
      category: impact
      name: "<gradient:#FFE9A8:#D1A53F><bold>CRIT SPARK</bold></gradient>"
      material: GOLDEN_SWORD
      description: "Eight splinters of gold, {highlight}gone in a third<nl>of a second{neutral}."
      priority: 1
      effects:
        - '[SOUND] ENTITY_PLAYER_ATTACK_CRIT;0.7;1.4'
        - '[SPHERE] GOLD_BLOCK;as:block;radius:0.25;points:8;size:0.14;size_to:0.02;pull:-4;ease:out;life:0.32;spin:1,1,1;vary:0.6;light:15;glow:{highlight}'
        - '[PARTICLE] CRIT;count:12;offset:0.3,0.3,0.3;speed:0.15'

    SHATTER:
      category: impact
      name: "<gradient:#E0E0E0:#8A8A8A><bold>SHATTER</bold></gradient>"
      material: STONE
      description: "Stone comes off them and {highlight}falls{neutral}."
      priority: 2
      effects:
        - '[SOUND] BLOCK_STONE_BREAK;0.8;1.5'
        - '[SCATTER] COBBLESTONE;as:block;radius:0.35;points:9;seed:3;height:0.5;size:0.13;size_to:0.02;vary:0.9;pull:-3.5;to:0,0.5,0;gravity:6;ease:out;spin:1,1,1;life:0.45;light:12'

    CLEAVE:
      category: impact
      name: "<gradient:#F0F4F8:#7C93B0><bold>CLEAVE</bold></gradient>"
      material: IRON_SWORD
      description: "One blade passes through, {highlight}edge on{neutral}."
      priority: 4
      effects:
        - '[SOUND] ENTITY_PLAYER_ATTACK_SWEEP;0.8;1.2'
        - '[DISPLAY] IRON_SWORD;from:-2.2,0.4,0;to:2.2,-0.4,0;ease:in_out;life:0.3;size:2.0;roll:225;light:15'
        - '[LINE] DUST;length:4.0;dir:270;points:16;y:0.0;color:{letters};size:1.2;ticks:4;interval:0.02'

Read them as one gesture each: a sound, one solid thing that moves and shrinks, and a particle line
for the light around it. That is the whole shape of a good hit effect.
`,

  arrows: `You are writing an arrow effect for the Minecraft plugin ExyliaArrows (Paper/Folia 1.21+),
which draws effects with display entities — real items and blocks that turn, fall and grow —
animated by each viewer's own client rather than by the server tick. Particles give an effect light
and smoke; displays give it weight and silhouette. Every moment of every shipped effect puts at
least one display on screen: a trail made of particles alone is a smoke line, the same trail with
two spinning chips of ice in it is an arrow made of ice.

Read everything below, then write the effect the user asks for at the end.

## Where it goes

\`plugins/ExyliaArrows/effects.yml\`, under \`arrow_effects:\`. An entry's \`effects\` block is a MAP OF
TRIGGERS, not a list:

    arrow_effects:
      EMBER_TRAIL:
        category: ember
        name: "<gradient:#FFD08A:#C43A10><bold>EMBER TRAIL</bold></gradient>"
        material: BLAZE_ROD
        description: "Coals come off the shaft, {highlight}tumble, and burn out{neutral} behind it."
        priority: 1
        trail-interval: 1
        effects:
          trail:
            - '[PARTICLE] FLAME;count:2;offset:0.04,0.04,0.04;speed:0.01'
          hit:
            - '[SOUND] BLOCK_FIRE_EXTINGUISH;0.7;1.3'

    category        which tab it appears under; must be a key declared under categories:
                      the shipped ones are ember, frost, storm, void, prism, goofy
    name            what menus and placeholders call it. MiniMessage and gradients work
    material        the item the menu row is drawn with
    description     one line, or a list of lines. <nl> also breaks a single line
    priority        where it sits in its tab; lower comes first
    trail-interval  ticks between trail steps. 1 is every tick, 2 every other
    effects         the triggers, below
    bows            optional, only read while behaviour.mode reads bows. Accepts item names and
                    the families ANY BOW CROSSBOW TRIDENT RANGED
    projectiles     optional. Which projectiles it plays on; without it config.yml decides

The effect key is the permission: EMBER_TRAIL is \`exyliarrows.effect.ember_trail\`.

## The five triggers

    launch       the shot leaving the bow. Optional, short, quiet
    trail        along the flight, every trail-interval ticks
    hit          wherever it lands, whatever it hit
    hit-entity   only on something alive — falls back to hit
    hit-block    only on a block — falls back to hit

\`hit-entity\` and \`hit-block\` are the same moment told apart: declare them only when landing on a
player and landing on the ground deserve different pictures. Either spelling is read, \`hit-entity\`
or \`hit_entity\`; write the hyphen, because that is what every other Exylia file writes.

## The anchor and the budget — read this twice

\`(0,0,0)\` is the moment's own anchor: the bow for a launch, the projectile for a trail step, the
point of impact for a hit. Positive Y is up.

The TRAIL is the one with a budget. An arrow lives about forty ticks, and four archers are four
arrows in the air, so whatever \`trail\` writes is drawn on every one of those ticks, per shot: ONE OR
TWO SMALL DISPLAYS plus a particle line for the glow, sizes around 0.07–0.2, \`life\` around 0.4, and
NO SOUND.

The HIT is the payoff and is allowed to be one: under a second, a dozen displays at the very most,
one or two sounds between volume 0.5 and 0.9.

${SEQUENCE_DSL}

## Two effects that ship, in full

    EMBER_TRAIL:
      category: ember
      name: "<gradient:#FFD08A:#C43A10><bold>EMBER TRAIL</bold></gradient>"
      material: BLAZE_ROD
      description: "Coals come off the shaft, {highlight}tumble, and burn out{neutral} behind it."
      priority: 1
      trail-interval: 1
      effects:
        trail:
          - '[DISPLAY] MAGMA_BLOCK;as:block;size:0.09;size_to:0.01;life:0.45;spin:1,1,1;gravity:2;light:15;glow:{warning}'
          - '[PARTICLE] FLAME;count:2;offset:0.04,0.04,0.04;speed:0.01'
        hit:
          - '[SOUND] BLOCK_FIRE_EXTINGUISH;0.7;1.3'
          - '[CIRCLE] MAGMA_BLOCK;as:block;radius:0.2;points:10;size:0.1,0.05,0.1;size_to:0.5,0.04,0.5;pull:-2;ease:out;life:0.45;y:0.05;light:15;glow:{warning}'
          - '[SCATTER] NETHERRACK;as:block;radius:0.35;points:6;seed:11;height:0.4;size:0.09;size_to:0.02;vary:0.8;pull:-3;to:0,0.5,0;gravity:6;ease:out;life:0.5;spin:1,1,1;light:14'
          - '[PARTICLE] FLAME;count:14;offset:0.4,0.2,0.4;speed:0.05'

    CINDERFALL:
      category: ember
      name: "<gradient:#FFC97A:#A03A08><bold>CINDERFALL</bold></gradient>"
      material: CAMPFIRE
      description: "Embers drop out of the flight path and {highlight}keep falling{neutral} after it passes."
      priority: 3
      trail-interval: 1
      effects:
        trail:
          - '[DISPLAY] MAGMA_BLOCK;as:block;size:0.07;size_to:0.01;to:0,-0.9,0;gravity:4;ease:in;life:0.55;spin:1,1,1;light:15'
          - '[PARTICLE] SMALL_FLAME;count:1;offset:0.05,0.05,0.05'
        hit:
          - '[SOUND] BLOCK_CAMPFIRE_CRACKLE;0.8;1.4'
          - '[SCATTER] MAGMA_BLOCK;as:block;radius:0.4;points:9;seed:11;height:0.6;size:0.1;size_to:0.02;vary:0.9;pull:-3;to:0,0.7,0;gravity:6;ease:out;life:0.6;spin:1,1,1;light:15'
          - '[CIRCLE] BLACKSTONE;as:block;radius:0.1;points:8;size:0.06,0.03,0.06;size_to:0.4,0.03,0.4;pull:-2;ease:out;life:0.45;y:0.04;light:10'
          - '[PARTICLE] SMALL_FLAME;count:12;offset:0.4,0.3,0.4;speed:0.03'
`,
} as const;

export type PromptId = keyof typeof AI_PROMPTS;

/**
 * Every prompt ends with the rules, then the idea the owner typed on the page.
 *
 * With no idea written it keeps the marker, so the text stays usable for
 * anyone who copies it and fills the idea in inside their own AI.
 */
export function promptText(id: PromptId, idea = ""): string {
  return `${AI_PROMPTS[id]}${OUTPUT_RULES}

Write the effect for this idea, and ask me before guessing if anything about it is unclear:

${idea.trim() || "<<< WRITE YOUR IDEA HERE >>>"}
`;
}
