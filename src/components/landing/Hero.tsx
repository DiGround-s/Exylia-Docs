"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Aurora } from "@/components/motion/Backdrops";
import { AnimatedWords, Magnetic } from "@/components/motion/Primitives";
import { dict } from "@/content/dictionary";
import type { Lang } from "@/content/registry";

export function Hero({ lang }: { lang: Lang }) {
  const l = dict.landing;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mockY = useTransform(scrollYProgress, [0, 1], [0, -60]);

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
              <Link
                href={`/${lang}/docs/exyliaffa`}
                className="group relative inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-[14.5px] font-medium text-ink-950 transition-colors hover:bg-[#f1efff]"
              >
                {l.ctaPrimary[lang]}
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
            <a
              href="#plugins"
              className="inline-flex h-12 items-center rounded-full px-5 text-[14.5px] font-medium text-white/60 transition-colors hover:text-white"
            >
              {l.ctaSecondary[lang]}
              <span className="ml-2 text-white/25">↓</span>
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y: mockY }} className="relative hidden lg:block">
          <DocsMock />
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

/* A miniature of the docs reader itself. */
function DocsMock() {
  const lines = [
    { w: "78%", tone: "bg-white/[0.16]" },
    { w: "92%", tone: "bg-white/[0.07]" },
    { w: "64%", tone: "bg-white/[0.07]" },
    { w: "84%", tone: "bg-white/[0.07]" },
  ];
  const nav = ["Introduction", "Installation", "Arenas", "Rules", "Kits", "Placeholders"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/70 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="ml-3 font-mono text-[10.5px] tracking-wide text-white/25">
            docs.exylia.net/docs/exyliaffa
          </span>
        </div>

        <div className="grid grid-cols-[128px_1fr]">
          <div className="border-r border-white/[0.06] p-4">
            {nav.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.07 }}
                className={`relative py-[5px] text-[10.5px] ${i === 2 ? "text-white" : "text-white/30"}`}
              >
                {i === 2 && (
                  <span className="absolute -left-4 top-1/2 h-3 w-px -translate-y-1/2 bg-[rgb(var(--accent))]" />
                )}
                {item}
              </motion.div>
            ))}
          </div>

          <div className="p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-accent"
            >
              Configuring
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-2 font-display text-[17px] font-medium tracking-tight2 text-white"
            >
              Arenas
            </motion.div>

            <div className="mt-4 flex flex-col gap-2.5">
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: line.w, transformOrigin: "left" }}
                  className={`block h-[6px] rounded-full ${line.tone}`}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              className="mt-5 overflow-hidden rounded-lg border border-white/[0.07] bg-ink-950/70 p-3"
            >
              <div className="flex flex-col gap-1.5 font-mono text-[9.5px]">
                <span className="text-white/25">arenas:</span>
                <span className="text-white/45">
                  &nbsp;&nbsp;max-players: <span className="text-accent">50</span>
                </span>
                <span className="text-white/45">
                  &nbsp;&nbsp;kit-mode: <span className="text-accent">SELECTABLE</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent))]/60 to-transparent"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-[radial-gradient(circle_at_60%_40%,rgba(124,92,255,0.14),transparent_70%)] blur-2xl" />
    </motion.div>
  );
}
