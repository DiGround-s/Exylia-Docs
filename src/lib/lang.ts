"use client";

import { DEFAULT_LANG, LANGS, type Lang } from "@/content/registry";

const STORAGE_KEY = "exylia-docs-lang";

/**
 * The language this visitor should get.
 *
 * An explicit choice always wins over the browser: someone who switched to
 * English on a Spanish machine meant it. Everything else falls back to English,
 * including a browser that reports nothing.
 */
export function detectLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGS.includes(stored as Lang)) return stored as Lang;
  } catch {
    // Private mode, or storage disabled. The browser's own list still works.
  }

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);

  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split("-")[0];
    if (LANGS.includes(base as Lang)) return base as Lang;
  }
  return DEFAULT_LANG;
}

/** Stores an explicit choice, so the next visit skips detection. */
export function rememberLang(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Not being able to remember is not a reason to fail the switch.
  }
}
