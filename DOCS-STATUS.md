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
| `exyliaclans` | `ExyliaClans` | 1.0.1 | `94c78fe` 2026-08-31 | Current. |
| `exyliaclasses` | `ExyliaClasses` | 1.0.0 | `d48bfe0` 2026-08-31 | Current — the only change since was a database index. |
| `exyliaevents` | `ExyliaEvents` | 1.2.0 | `3c6b6aa` 2026-09-02 | 49 types, gauntlets, the 33 Mace Roulette modifiers, PvP during the hunt, the shrinking floor and event chat isolation. The 1.3.0 statistics and leaderboard placeholders are documented ahead of the rest (`fb7782d`). **Gap:** everything else in 1.3.0 — the team King of the Hill event, one dodgeball ball per player, hidden names in Hide & Seek, the TNT Run block break, 15 more trivia questions and the move of player-facing text into `messages.yml`. |
| `exyliaffa` | `ExyliaFFA` | 1.1.1 | `569a4f1` 2026-09-02 | Current — arena chat isolation and duration inputs documented. |
| `exyliahiteffect` | `ExyliaHitEffect` | 1.0.10 | `1fe222a` 2026-09-03 | Current. |
| `exyliakilleffect` | `ExyliaKillEffect` | 1.0.10 | `31b0a76` 2026-09-03 | Current. |
| `exylialib` | `ExyliaLib` | 1.95.0 | `e4cf0b7` 2026-09-03 | Current — chat rules, cosmetic rules, the display ceiling, region flags, log cleanup and the extra NPC motion. |
| `exyliapractice` | `ExyliaPracticeCore` | 1.0.0 | `a8b3bf6` 2026-09-03 | Arena usages, the short `practice` identifier, `total_bot_players` and typed kit-rule durations documented. **Gap:** the Bot PvP module has no page at all — difficulties, its menus and `bot-name`/`bot-skin` are undocumented. |
| `exyliashields` | `ExyliaShields` | 1.0.4 | `83a54f9` 2026-09-01 | Current — the only change since was a database index. |
| `exyliastaff` | `ExyliaStaff` | 1.1.0 | `0556cce` 2026-09-03 | Current — first full documentation: the sixteen modules, the hotbar, vanish levels, freeze across servers, report priority, the punishment ladder and its command templates, the nine mining factors, the staff log and the admin panel. Left out on purpose: the reports history screen (not registered by the module in 1.1.0), `%staff_reports_mine%` (always 0) and `exyliastaff.inspect.ip` (declared, unused). |
| `exyliasurvivalcore` | `ExyliaSurvivalCore` | 1.0.6 | `1e1dc33` 2026-09-02 | Current for the two pages that exist (placeholders, permissions). The plugin is not finished, and the rest of its documentation is deliberately unwritten. |
| `exyliatotemtrainer` | `ExyliaTotemTrainer` | 1.0.0 | `6ec68a0` 2026-09-04 | Current — first full documentation: the six shipped modes as four choices, grading and score, duels with draws and the even-format rule, arenas from the admin menu, per-mode leaderboards, the `totem_` PlaceholderAPI spelling. Blackout and `close-inventory` documented. |

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
- Placeholder tables list the whole placeholder, not just its tail.
