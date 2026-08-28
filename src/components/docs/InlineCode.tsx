"use client";

import { createContext, useContext, useState, type KeyboardEvent, type ReactNode } from "react";
import { dict } from "@/content/dictionary";
import type { Lang } from "@/content/registry";

/** Set by `CodeBlock`, so the `<code>` inside a fenced block stays untouched. */
const InsidePre = createContext(false);

export const PreBoundary = InsidePre.Provider;

/**
 * A full `%placeholder%` or an Exylia permission node such as `exyliaffa.commands.join`.
 * Anything else — `true`, `config.yml`, a prose word — stays a plain `<code>`.
 */
const COPYABLE = /^(%[^%\s]+%|exylia[a-z0-9]*(?:\.[a-z0-9_*<>-]+)+)$/;

/** Inline code is highlighted at build time, so the text can be nested in spans. */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function InlineCode({
  children,
  className,
  lang = "en",
  ...props
}: {
  children?: ReactNode;
  className?: string;
  lang?: Lang;
}) {
  const insidePre = useContext(InsidePre);
  const [copied, setCopied] = useState(false);
  const value = textOf(children).trim();
  const copyable = !insidePre && COPYABLE.test(value);

  if (!copyable)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    copy();
  }

  return (
    <code
      {...props}
      className={className ? `${className} copyable` : "copyable"}
      data-copied={copied ? "" : undefined}
      role="button"
      tabIndex={0}
      title={copied ? dict.docs.copied[lang] : dict.docs.copyValue[lang]}
      aria-label={`${dict.docs.copyValue[lang]}: ${value}`}
      onClick={copy}
      onKeyDown={onKeyDown}
    >
      {children}
    </code>
  );
}
