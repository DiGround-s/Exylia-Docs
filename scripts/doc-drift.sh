#!/usr/bin/env bash
# Prints, per documented plugin, what its repository has done since the docs
# were last checked against it. The reviewed commits live in DOCS-STATUS.md;
# this script reads them from there, so the manifest stays the single source.
#
# Usage: scripts/doc-drift.sh [plugin-id]
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCES="${EXYLIA_SOURCES:-$HOME/Java/Exylia}"
MANIFEST="$ROOT/DOCS-STATUS.md"
FILTER="${1:-}"

# doc id | repository | reviewed commit — parsed out of the manifest table.
grep -E '^\| `exylia' "$MANIFEST" | while IFS='|' read -r _ id repo _ reviewed rest; do
  id=$(echo "$id" | tr -d ' `')
  repo=$(echo "$repo" | tr -d ' `')
  reviewed=$(echo "$reviewed" | awk '{print $1}' | tr -d ' `')
  [ -n "$FILTER" ] && [ "$FILTER" != "$id" ] && continue
  dir="$SOURCES/$repo"
  if [ ! -d "$dir/.git" ]; then
    printf '%-22s no repository at %s\n' "$id" "$dir"
    continue
  fi
  if ! git -C "$dir" cat-file -e "$reviewed^{commit}" 2>/dev/null; then
    printf '%-22s reviewed commit %s is not in the repository\n' "$id" "$reviewed"
    continue
  fi
  count=$(git -C "$dir" rev-list --count "$reviewed..HEAD")
  if [ "$count" -eq 0 ]; then
    printf '%-22s up to date\n' "$id"
  else
    printf '%-22s %s commits since %s\n' "$id" "$count" "$reviewed"
    git -C "$dir" log --format='    %ad %h %s' --date=short "$reviewed..HEAD" | head -20
  fi
done
