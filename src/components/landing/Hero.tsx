"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Aurora } from "@/components/motion/Backdrops";
import { AnimatedWords, Magnetic } from "@/components/motion/Primitives";
import { PluginBanner } from "@/components/PluginBanner";
import { dict } from "@/content/dictionary";
import { documentedPlugins, pageCount, plugins, SITE, type Lang } from "@/content/registry";

const TOTAL_PAGES = documentedPlugins.reduce((n, plugin) => n + pageCount(plugin), 0);

export function Hero({ lang }: { lang: Lang }) {
  const l = dict.landing;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mockY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const stats = [
    { value: String(plugins.length), label: l.statPlugins[lang] },
    { value: String(TOTAL_PAGES), label: l.statPages[lang] },
    { value: "2", label: l.statLangs[lang] },
  ];

  return (
    <section ref={ref} id="top" className="relative min-h-[92svh] overflow-hidden pt-36 sm:pt-40">
      <Aurora />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade" />
      <div className="noise" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid max-w-content grid-cols-1 gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10"
      >
        <div className="max-w-2xl lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-white/25" />
            <span className="eyebrow">{l.kicker[lang]}</span>
          </motion.div>

          <h1 className="mt-8 font-display text-[clamp(2.6rem,6.4vw,4.9rem)] font-medium leading-[0.98] tracking-tight2 text-white">
            <span className="block">
              <AnimatedWords text={l.line1[lang]} />
            </span>
            <span className="block text-white/35">
              <AnimatedWords text={l.line2[lang]} />
            </span>
            <span className="block">
              <AnimatedWords text={l.line3[lang]} gradientLast />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 max-w-lg text-[16px] leading-relaxed text-white/50"
          >
            {l.lead[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#plugins"
                className="group relative inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-[14.5px] font-medium text-ink-950 transition-colors hover:bg-[#f1efff]"
              >
                {l.ctaPrimary[lang]}
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <a
              href={SITE.store}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-white/12 px-5 text-[14.5px] font-medium text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              {l.ctaSecondary[lang]}
              <span className="ml-2 text-white/25">↗</span>
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-[26px] font-medium tracking-tight2 text-white">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/30">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div style={{ y: mockY }} className="relative hidden lg:block">
          <BannerDeck lang={lang} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 sm:flex"
      >
        <span className="eyebrow">{l.scroll[lang]}</span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

/**
 * The catalogue, one plugin at a time.
 *
 * The hero used to advertise a single plugin, which only ever meant "the one
 * documented first". Cycling the key art says the true thing instead: there
 * are many, and any of them is one click away.
 */
function BannerDeck({ lang }: { lang: Lang }) {
  const deck = documentedPlugins;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % deck.length), 4200);
    return () => clearInterval(id);
  }, [paused, deck.length]);

  const plugin = deck[i];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/70 backdrop-blur-xl">
        <div className="relative aspect-[2/1] w-full">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <PluginBanner
                plugin={plugin}
                priority={i === 0}
                rounded="rounded-none"
                className="h-full w-full border-0"
              />
            </motion.div>
          </AnimatePresence>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
        </div>

        <div className="relative px-5 pb-5 pt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-accent">
                {plugin.category[lang]}
              </p>
              <p className="mt-1.5 font-display text-[18px] font-medium tracking-tight2 text-white">
                {plugin.name}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-white/45">
                {plugin.tagline[lang]}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex flex-1 flex-wrap gap-1">
              {deck.map((entry, n) => (
                <button
                  key={entry.id}
                  onClick={() => setI(n)}
                  aria-label={entry.name}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                    n === i ? "bg-[rgb(var(--accent))]" : "bg-white/12 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
            <Link
              href={`/${lang}/docs/${plugin.id}`}
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
            >
              {dict.landing.openPlugin[lang]} →
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-[radial-gradient(circle_at_60%_40%,rgba(124,92,255,0.14),transparent_70%)] blur-2xl" />
    </motion.div>
  );
}
