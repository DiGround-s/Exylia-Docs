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
| `exyliaarmorskin` | `ExyliaArmorSkin` | 1.0.0 | `83c2996` 2026-09-02 | Wardrobe, per-piece permissions, twenty animated skins. **Pending:** `6a50e32` — a skin that travels up the body and turns the metal in its trim. |
| `exyliaarmortrims` | `ExyliaArmorTrims` | 1.1.0 | `5996c38` 2026-09-02 | Current. |
| `exyliaarrows` | `ExyliaArrows` | 1.0.5 | `5d0f7d1` 2026-08-27 | **Stale.** Rebuilt on the new effect system: 120 effects, display entities, the `arrows-effects` region flag. The pages still describe 65 effects in 6 categories. |
| `exyliacapture` | `ExyliaCapture` | 1.1.0 | `911387c` 2026-08-28 | **Stale (small).** Times are written as durations rather than clicked, composite leaderboard indexes, reworked admin menu layout. |
| `exyliaclans` | `ExyliaClans` | 1.0.1 | `94c78fe` 2026-08-31 | Current. |
| `exyliaclasses` | `ExyliaClasses` | 1.0.0 | `d48bfe0` 2026-08-31 | Current — the only change since was a database index. |
| `exyliaevents` | `ExyliaEvents` | 1.2.0 | `445108e` 2026-09-01 | 49 types and gauntlets documented. **Pending:** `3c6b6aa` — 24 more Mace Roulette modifiers, PvP during the hunt, a wider map that shrinks by rounds, and event chat isolation. |
| `exyliaffa` | `ExyliaFFA` | 1.1.1 | `df86d3b` 2026-09-02 | Current — arena chat isolation and duration inputs documented. |
| `exyliahiteffect` | `ExyliaHitEffect` | 1.0.10 | `1106410` 2026-09-02 | Current. |
| `exyliakilleffect` | `ExyliaKillEffect` | 1.0.10 | `934c15e` 2026-09-02 | Current. |
| `exylialib` | `ExyliaLib` | 1.91.0 | `d1d7790` 2026-09-02 | Current — chat rules, display ceiling, region flags, log cleanup and the extra NPC motion documented. |
| `exyliapractice` | `ExyliaPracticeCore` | 1.0.0 | `8b95c7f` 2026-08-28 | **Stale.** 32 commits: arenas choose what they are for (queue, duel, party, bot), bot difficulties written in config, kit rule durations, the short `practice` placeholder identifier, `total_bot_players`. |
| `exyliashields` | `ExyliaShields` | 1.0.4 | `83a54f9` 2026-09-01 | Current — the only change since was a database index. |
| `exyliasurvivalcore` | `ExyliaSurvivalCore` | 1.0.6 | `1e1dc33` 2026-09-02 | Current for the two pages that exist (placeholders, permissions). The plugin is not finished, and the rest of its documentation is deliberately unwritten. |

## How a review goes

1. `scripts/doc-drift.sh` — see what moved.
2. Read the source for what it names, never the commit message alone.
3. Update both languages of the affected pages, and `src/content/registry.ts` when the version,
   tagline, summary or navigation changes.
4. `pnpm build`, then check the generated `out/` for broken links and anchors.
5. Move the row's **reviewed through** to the repository's `HEAD` and note what is left.

## Conventions worth keeping

- Every English page has a Spanish twin with a translated slug, registered in `src/content/registry.ts`.
- Nothing goes in the documentation that was not read in the source. Commit messages describe
  intent; the code describes behaviour.
- Placeholder tables list the whole placeholder, not just its tail.
