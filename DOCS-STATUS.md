# Documentation status

What each plugin's documentation was last checked against, so a review can start from the last
verified commit instead of from the whole history.

**Reviewed through** is the newest source commit the docs are known to describe. Everything after it
in that repository is undocumented until somebody says otherwise.

Sources live in `~/Java/Exylia/<repo>`; override with `EXYLIA_SOURCES`.

```bash
scripts/doc-drift.sh              # every plugin
scripts/doc-drift.sh exyliaevents # just one
```

| Docs | Repository | Version documented | Reviewed through | State |
|---|---|---|---|---|
| `exyliaarmorskin` | `ExyliaArmorSkin` | 1.0.0 | `c608783` 2026-09-03 | Current — wardrobe, per-piece permissions, twenty animated skins, the four body-aware animation types and the trim-metal cycle. |
| `exyliaarmortrims` | `ExyliaArmorTrims` | 1.1.0 | `1d83e8f` 2026-09-03 | Current — the cosmetic gate is a library contract, documented in the library’s Cosmetic rules page rather than per plugin. |
| `exyliaarrows` | `ExyliaArrows` | 1.0.5 | `2a7335b` 2026-09-03 | Current — rewritten for the 120 display-driven effects, the three triggers, tokens, the menu and the `arrows-effects` flag. |
| `exyliacapture` | `ExyliaCapture` | 1.1.0 | `c8c2ec7` 2026-09-02 | Current — typed durations noted. The database indexes and the admin menu layout were not worth a page. |
| `exyliachatcosmetics` | `ExyliaChatCosmetics` | 1.0.0 | `e1bf009` 2026-09-07 | Current — first full documentation: the shipped catalogue (180 tags in seven tabs, 90 nick, 96 chat, 90 shadow and 77 rank colours, 18 fonts, 5 modifiers, 18 animations), tag marks as sprites, particles and head skins with the 1.21.9 ceiling, the four custom kinds and the create/edit token economy, entitlements and expiry, the menus, and the whole built-in chat module across five pages, mentions included: a name is a mention with or without the `@`, and the nudge ships as a sound alone. Written against the source: the repository's own `docs/` predates the current catalogue by twelve commits. |
| `exyliaclans` | `ExyliaClans` | 1.0.1 | `94c78fe` 2026-08-31 | Current. |
| `exyliaclasses` | `ExyliaClasses` | 1.0.0 | `d48bfe0` 2026-08-31 | Current — the only change since was a database index. |
| `exyliaevents` | `ExyliaEvents` | 1.2.0 | `3c6b6aa` 2026-09-02 | 49 types, gauntlets, the 33 Mace Roulette modifiers, PvP during the hunt, the shrinking floor and event chat isolation. The 1.3.0 statistics and leaderboard placeholders are documented ahead of the rest (`fb7782d`). **Gap:** everything else in 1.3.0 — the team King of the Hill event, one dodgeball ball per player, hidden names in Hide & Seek, the TNT Run block break, 15 more trivia questions and the move of player-facing text into `messages.yml`. |
| `exyliaffa` | `ExyliaFFA` | 1.1.1 | `569a4f1` 2026-09-02 | Current — arena chat isolation and duration inputs documented. |
| `exyliahiteffect` | `ExyliaHitEffect` | 1.0.10 | `1fe222a` 2026-09-03 | Current. |
| `exyliakilleffect` | `ExyliaKillEffect` | 1.2.0 | `45c0374` 2026-09-08 | Current — the 159 effects in six categories, `crate.reward` (`UNLOCK`/`ITEM`/`BOTH`) in place of `give-token`, the per-reel win and duplicate effects, and the preview stage taking only the position. |
| `exylialib` | `ExyliaLib` | 1.95.0 | `e4cf0b7` 2026-09-03 | Current — chat rules, cosmetic rules, the display ceiling, region flags, log cleanup and the extra NPC motion. |
| `exyliapractice` | `ExyliaPracticeCore` | 1.0.0 | `a8b3bf6` 2026-09-03 | Arena usages, the short `practice` identifier, `total_bot_players` and typed kit-rule durations documented. **Gap:** the Bot PvP module has no page at all — difficulties, its menus and `bot-name`/`bot-skin` are undocumented. |
| `exyliapracticebot` | `ExyliaPracticeBotV3` | 1.2.2 | `20ca313` 2026-09-06 | Current — first full documentation: the seven combat models and their per-mode config, the five-rung skill ladder, the gear and buffs a player tunes, both menu files and the eleven `practicebot` actions, attack/follow and the three automatic removals, `max-bots` against the slider bounds, and the API. Written against the source, not the config comments: two of those are stale (see below). |
| `exyliashields` | `ExyliaShields` | 1.0.4 | `83a54f9` 2026-09-01 | Current — the only change since was a database index. |
| `exyliastaff` | `ExyliaStaff` | 1.3.0 | `5760cdc` 2026-09-08 | Current — reviewed for 1.3.0. Four module pages added: inventory restore (causes, retention, the five screens, the eleven parts and the offline queue), reveal, AFK and the action bar. The staff armour is no longer really worn: it is stated to the players around the wearer as an overlay, corrected on **Staff mode** and **First steps**. Left out on purpose: global chat, which is one hotbar button and three modes, and the scoreboard, documented inside **Staff mode**. |
| `exyliasurvivalcore` | `ExyliaSurvivalCore` | 1.0.6 | `1e1dc33` 2026-09-02 | Current for the two pages that exist (placeholders, permissions). The plugin is not finished, and the rest of its documentation is deliberately unwritten. |
| `exyliatotemtrainer` | `ExyliaTotemTrainer` | 1.0.0 | `6ec68a0` 2026-09-04 | Current — first full documentation: the six shipped modes as four choices, grading and score, duels with draws and the even-format rule, arenas from the admin menu, per-mode leaderboards, the `totem_` PlaceholderAPI spelling. Blackout and `close-inventory` documented. |

## The API pages

Every plugin's **API** page was rewritten on 2026-09-06 for the new API system, and they are current
for the whole suite regardless of what each row above says. A row's *reviewed through* still refers
to the rest of that plugin's set, not to its API page.

What changed: the per-plugin reflection jars and static facades are gone. There is now one published
artifact, `com.github.DiGround-s.ExyliaLib:exylia-api`, holding every service, record, enum and event
in the suite, reached through `net.exylia.lib.api.ExyliaAPI`. Documented against `exylia-api` at
ExyliaLib `befa514` — release tag `v1.113.0`, the tag JitPack builds and the one the pages name.

| | |
|---|---|
| Hub page | `exylialib` — integration for Gradle, Gradle Kotlin DSL and Maven, the lookup, timing, events, and the classloader reason the artifact must be `compileOnly`. New page. |
| Rewritten | The 14 plugins that already had an API page. |
| New | `exyliasurvivalcore`, which had none and now publishes 31 methods and 6 cancellable events. Registered in `SURVIVALCORE_NAV`. |
| Added later | `exyliachatcosmetics` (`CosmeticsService` and `ChatService`) and `PracticeBotService`, which the artifact already published but the hub table had not listed. |
| Not documented | ExyliaBetCore, ExyliaSandBox, ExyliaSpecialsV3, ExyliaPearls and ExyliaTotems all publish a service, but have no documentation set on this site at all. They are absent from the hub's service table for that reason. |

The source of truth for these pages is
`~/Java/Exylia/ExyliaLib/exylia-api/src/main/java/net/exylia/lib/api/`, not the plugin repositories:
the interfaces carry the javadoc that says why each method behaves as it does.

### Two stale strings in ExyliaPracticeBotV3

Found while writing this set and documented as behaviour rather than as promised. Both claim that
picking a combat mode applies that mode's kit. It does not: `Loadout.of(mode).applyTo(settings)` runs
only from the `BotSettings` constructor — first creation and `/bot reset` — and from
`PracticeBotServiceImpl` on an API spawn. `set_mode` and `cycle mode` call `setMode` and nothing else,
which is the intended behaviour: `Loadout`'s javadoc and the menu item's own lore both say the kit
stays as the player left it.

- `MessagesDefaults` default for `bot.mode-changed`: *"Mode set to %mode% » kit applied."*
- `BotDefaults`' `@Comment` on `bot.mode`: *"Picking a mode applies that mode's kit AND its combat model."*

The pages describe what the code does. If the strings are corrected, nothing here needs rewriting.

### Fields ExyliaChatCosmetics declares and does not use

Found while writing that set. Each is read from the file without complaint and reaches the definition;
nothing then consumes it. The pages say so rather than describing an effect that does not happen.

- `requirement` on any cosmetic entry: parsed by `CosmeticInfo.read` and copied through
  `RankColorType.withoutPermission`, never evaluated. `BrowserRows` filters on `hidden()` alone.
- `safe` on a font: reports whether the glyphs live in the basic plane. No menu value exposes it and
  nothing restricts a font by it.
- `animation` on a custom cosmetic: the column exists and both renderers honour it, but every caller
  of `create` and `edit` passes `null`, so nothing writes one.

Its own `docs/` folder is a version behind the plugin — it was last touched at `e6d264b`, twelve
commits before `4e4428b`, and its tags, fonts, menu-default and command sections all predate what
ships. The site's pages were written from the source; the repository's notes were used only where the
source confirmed them.

## How a review goes

1. `scripts/doc-drift.sh` — see what moved.
2. Read the source for what it names, never the commit message alone.
3. Update both languages of the affected pages, and `src/content/registry.ts` when the version,
   tagline, summary or navigation changes.
4. `pnpm build`, then check the generated `out/` for broken links and anchors.
5. Move the row's **reviewed through** to the repository's `HEAD` and note what is left.

## What is deliberately left out

Not every commit is documentation. Database indexes, refactors, internal fixes and packet-level
performance work change nothing a server owner reads or writes, and a page that lists them is a page
nobody trusts. What earns a change: a new file, key, command, permission or placeholder; a default
that moved; a rule a player can feel; a limit an owner can hit.

## Conventions worth keeping

- Every English page has a Spanish twin with a translated slug, registered in `src/content/registry.ts`.
- Nothing goes in the documentation that was not read in the source. Commit messages describe
  intent; the code describes behaviour.
- Placeholder tables list the whole placeholder, not just its tail: every name is written complete,
  with its `%` signs and its full prefix, and each one gets its own row and its own description. Never
  a bare suffix, never two names sharing a row, never a group standing in for the placeholders under it.
- One identifier per plugin, and it is the long one. Several plugins publish a second, shorter
  PlaceholderAPI identifier through `Placeholders.identifier(...)` — `ecc`, `practice`, `exyliatotem`.
  They keep working; the documentation does not mention them. A plugin whose registered names carry a
  short group prefix (`staff_`, `totem_`, `classes_`) is a different case: the reference page writes the
  PlaceholderAPI form, and the pages that document that plugin's own YAML keep the registered name and
  say once why the two differ.
