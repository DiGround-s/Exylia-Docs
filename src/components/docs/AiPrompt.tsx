"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { promptText, type PromptId } from "@/content/aiPrompts";
import { dict } from "@/content/dictionary";
import type { Lang } from "@/content/registry";

function Sparkle({ className, d }: { className: string; d: string }) {
  return (
    <path
      className={className}
      d={d}
      fill="currentColor"
    />
  );
}

/**
 * The block that hands a server owner the whole prompt for one plugin.
 *
 * The text is never rendered as MDX: it is one literal from `aiPrompts.ts`, so
 * what reaches the clipboard is byte for byte what the compiler documents.
 */
export function AiPrompt({ id, lang = "en" }: { id: PromptId; lang?: Lang }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const text = promptText(id);
  const lines = text.split("\n").length;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-[rgb(var(--accent))]/22 bg-[linear-gradient(160deg,rgba(124,92,255,0.10),rgba(124,92,255,0.02)_55%,transparent)]">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <Sparkle
                className="animate-pulse [animation-duration:3.2s]"
                d="M9.4 1.6l.85 2.3 2.3.85-2.3.85-.85 2.3-.85-2.3-2.3-.85 2.3-.85.85-2.3z"
              />
              <Sparkle
                className="opacity-70 animate-pulse [animation-duration:2.4s] [animation-delay:.5s]"
                d="M4.3 8.2l.55 1.5 1.5.55-1.5.55-.55 1.5-.55-1.5-1.5-.55 1.5-.55.55-1.5z"
              />
              <Sparkle
                className="opacity-45 animate-pulse [animation-duration:2.8s] [animation-delay:1.1s]"
                d="M11.6 10.4l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1z"
              />
            </svg>
            {dict.ai.kicker[lang]}
          </span>
          <h3 className="mt-2 font-display text-[19px] font-medium tracking-tightish text-white">
            {dict.ai.title[lang]}
          </h3>
          <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-white/45">
            {dict.ai.lead[lang]}
          </p>
        </div>

        <button
          onClick={copy}
          className="group relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-[rgb(var(--accent))]/40 bg-[rgb(var(--accent))]/12 px-5 py-3 font-display text-[14.5px] font-medium text-white transition-colors duration-300 hover:border-[rgb(var(--accent))]/70 hover:bg-[rgb(var(--accent))]/20"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5"
              >
                <svg className="h-4 w-4 text-[rgb(var(--accent))]" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {dict.ai.copied[lang]}
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5"
              >
                <svg className="h-4 w-4 text-white/60" viewBox="0 0 16 16" fill="none">
                  <rect x="5.5" y="5.5" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10.5 3.6A1.6 1.6 0 009 2.5H4.6A2.1 2.1 0 002.5 4.6V9c0 .7.45 1.3 1.1 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                {dict.ai.copy[lang]}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-[rgb(var(--accent))]/15 px-6 py-3">
        <span className="font-mono text-[11px] text-white/28">
          {lines.toLocaleString(lang === "es" ? "es-ES" : "en-GB")} {dict.ai.lines[lang]}
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 transition-colors duration-300 hover:text-white"
        >
          {open ? dict.ai.hide[lang] : dict.ai.show[lang]}
          <svg
            className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M4 6.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[rgb(var(--accent))]/15"
          >
            <pre className="max-h-[26rem] overflow-auto bg-ink-950/60 px-6 py-5 font-mono text-[12px] leading-relaxed text-white/45">
              {text}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
