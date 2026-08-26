"use client";

import { useEffect } from "react";
import type { Lang } from "@/content/registry";

/**
 * Corrects `<html lang>` for the page being read.
 *
 * The root document of a static export is written once, so the attribute is set
 * here instead. It matters for screen readers, for hyphenation and for the
 * browser's own translation prompt.
 */
export function HtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
