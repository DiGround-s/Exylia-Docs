"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { plugins, type Lang, type Plugin } from "@/content/registry";
import { dict } from "@/content/dictionary";
import { Reveal, TextReveal, Tilt } from "@/components/motion/Primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATUS_TONE = {
  stable: "text-accent border-[rgb(var(--accent))]/30",
  beta: "text-white/60 border-white/20",
  soon: "text-white/25 border-white/10",
} as const;

const STATUS_LABEL = {
  stable: dict.landing.statusStable,
  beta: dict.landing.statusBeta,
  soon: dict.landing.statusSoon,
} as const;

export function Catalog({ lang }: { lang: Lang }) {
  const l = dict.landing;
  return (
    <section id="plugins" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            <span className="eyebrow">{l.catalogKicker[lang]}</span>
          </div>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-[1.05] tracking-tight2 text-white">
            <TextReveal delay={0.05}>{l.catalogTitle[lang]}</TextReveal>
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-white/45">
              {l.catalogLead[lang]}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px border-l border-t hair sm:grid-cols-2 lg:grid-cols-3">
          {plugins.map((plugin, i) => (
            <PluginCard key={plugin.id} plugin={plugin} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PluginCard({ plugin, index, lang }: { plugin: Plugin; index: number; lang: Lang }) {
  const ready = plugin.nav.length > 0;
  const tone = STATUS_TONE[plugin.status];
  const label = STATUS_LABEL[plugin.status][lang];

  const inner = (
    <>
      <span className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-r-2 border-t-2 border-[rgb(var(--accent))]/0 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-[rgb(var(--accent))]/50" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border font-display text-[12px] font-semibold transition-colors duration-300 ${
              ready
                ? "border-[rgb(var(--accent))]/25 bg-[rgb(var(--accent))]/10 text-accent"
                : "border-white/8 bg-white/[0.02] text-white/25"
            }`}
          >
            {plugin.name.replace("Exylia", "").slice(0, 2).toUpperCase()}
          </span>
          <div>
            <span className="block font-display text-[15.5px] font-medium tracking-tightish text-white">
              {plugin.name}
            </span>
            <span className="mt-0.5 block font-mono text-[10.5px] tracking-wide text-white/30">
              {plugin.category[lang]} · {plugin.minecraft}
            </span>
          </div>
        </div>

        <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] ${tone}`}>
          {label}
        </span>
      </div>

      <p className="mt-5 min-h-[3.6em] text-[13.5px] leading-relaxed text-white/42">
        {plugin.summary[lang]}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {plugin.tags.map((tag) => (
          <span
            key={tag.en}
            className="rounded-full border border-white/[0.07] bg-white/[0.015] px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-white/35"
          >
            {tag[lang]}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t hair pt-4">
        <span className="font-mono text-[10.5px] tracking-wide text-white/25">
          {ready
            ? `${plugin.nav.reduce((n, g) => n + g.pages.length, 0)} ${dict.docs.facts.pages[lang].toLowerCase()}`
            : dict.landing.unpublished[lang]}
        </span>
        {ready && (
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45 transition-colors group-hover:text-white">
            {dict.landing.openPlugin[lang]}
            <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </>
  );

  const shell = `group relative flex h-full flex-col border-b border-r hair px-6 py-6 transition-colors duration-300 ${
    ready ? "hover:bg-white/[0.02]" : "opacity-60"
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.07 + Math.floor(index / 3) * 0.05, ease: EASE }}
    >
      <Tilt max={4} className="h-full">
        {ready ? (
          <Link href={`/${lang}/docs/${plugin.id}`} className={shell}>
            {inner}
          </Link>
        ) : (
          <div className={`${shell} cursor-default`}>{inner}</div>
        )}
      </Tilt>
    </motion.div>
  );
}
