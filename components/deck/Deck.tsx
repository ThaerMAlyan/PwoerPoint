"use client";

import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import { Brain, ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize, Moon, RotateCcw, Sun, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { sections, slides, TOPIC_SECTIONS } from "@/lib/deck";
import type { SectionId, Slide } from "@/lib/types";
import { SlideView } from "@/components/slides/SlideView";
import { EASE } from "@/components/ui/motion";
import { DeckNav } from "./nav";

const W = 1920;
const H = 1080;
const TOTAL = slides.length;

const clamp = (n: number) => Math.max(0, Math.min(TOTAL - 1, n));
const pad = (n: number) => String(n).padStart(2, "0");
const isFullBleed = (s: Slide) => s.kind === "cover" || s.kind === "closing";

/** First and last slide index of every section, in deck order. */
const RANGES = slides.reduce(
  (acc, s, i) => {
    const r = acc[s.section];
    if (r) r.end = i;
    else acc[s.section] = { start: i, end: i };
    return acc;
  },
  {} as Partial<Record<SectionId, { start: number; end: number }>>,
);

/* ───────────── external stores (viewport scale, fullscreen) ───────────── */

function subscribeResize(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}
const getScale = () => Math.min(window.innerWidth / W, window.innerHeight / H);

function subscribeFullscreen(cb: () => void) {
  document.addEventListener("fullscreenchange", cb);
  return () => document.removeEventListener("fullscreenchange", cb);
}
const getFullscreen = () => Boolean(document.fullscreenElement);

function readHash() {
  const m = window.location.hash.match(/(\d+)/);
  return clamp(m ? parseInt(m[1], 10) - 1 : 0);
}

/* ───────────── slide transition ───────────── */

const slideVariants: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 90, scale: d === 0 ? 1.015 : 1 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
  exit: (d: number) => ({
    opacity: 0,
    x: d * -90,
    scale: 0.985,
    transition: { duration: 0.5, ease: [0.4, 0, 0.6, 1] },
  }),
};

/* ───────────── pieces ───────────── */

function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="animate-drift-a absolute -top-[25vmax] -right-[15vmax] size-[75vmax] rounded-full"
        style={{ background: "radial-gradient(circle, var(--c-glow-1), transparent 62%)" }}
      />
      <div
        className="animate-drift-b absolute -bottom-[30vmax] -left-[20vmax] size-[70vmax] rounded-full"
        style={{ background: "radial-gradient(circle, var(--c-glow-2), transparent 62%)" }}
      />
    </div>
  );
}

function Watermark({ section, hidden }: { section: SectionId; hidden: boolean }) {
  const num = sections[section].num;
  return (
    <AnimatePresence>
      {!hidden && num && (
        <motion.div
          key={section}
          aria-hidden
          className="numeral-outline font-display pointer-events-none absolute right-[70px] -bottom-[170px] text-[640px] leading-none italic select-none"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 0.2, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          {num}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Orbits({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute -top-[420px] -right-[300px] size-[1000px] rounded-full border border-gold/25" />
      <div className="animate-spin-slow absolute -top-[330px] -right-[210px] size-[820px] rounded-full border border-dashed border-gold/20" />
      <div className="absolute -bottom-[520px] -left-[380px] size-[900px] rounded-full border border-wine/10" />
    </div>
  );
}

function Rail({ current, index, go, hidden }: { current: SectionId; index: number; go: (i: number) => void; hidden: boolean }) {
  const pos = TOPIC_SECTIONS.indexOf(current);
  const after = current === "R" || current === "end";
  return (
    <nav
      aria-label="Sections"
      className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-[6px] transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : ""
      }`}
    >
      {TOPIC_SECTIONS.map((id, i) => {
        const r = RANGES[id]!;
        const fill = after || i < pos ? 1 : i === pos ? (index - r.start + 1) / (r.end - r.start + 1) : 0;
        return (
          <button
            key={id}
            type="button"
            onClick={() => go(r.start)}
            aria-label={`Section ${sections[id].num}: ${sections[id].name}`}
            className="group relative h-[18px] w-[32px] cursor-pointer"
          >
            <span className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 overflow-hidden rounded-full bg-hair transition-[height] duration-300 group-hover:h-[7px]">
              <motion.span
                className={`absolute inset-y-0 left-0 rounded-full ${i === pos ? "bg-wine" : "bg-gold"}`}
                initial={false}
                animate={{ width: `${fill * 100}%` }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </span>
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[12px] tracking-[0.16em] whitespace-nowrap text-bg uppercase opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {sections[id].num} · {sections[id].name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function Counter({ index }: { index: number }) {
  return (
    <div className="font-display flex items-baseline gap-2">
      <span className="relative inline-block h-[34px] w-[44px] overflow-hidden text-right text-[30px] leading-[34px] text-ink tabular">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={index}
            className="absolute right-0"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {pad(index + 1)}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-[18px] text-subtle tabular">/ {TOTAL}</span>
    </div>
  );
}

function CtrlButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.currentTarget.blur();
        onClick();
      }}
      className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface-solid/80 text-muted transition duration-300 hover:border-wine/40 hover:bg-surface-solid hover:text-wine"
    >
      {children}
    </button>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-1 inline-grid h-7 min-w-7 place-items-center rounded-md border border-line bg-surface-solid px-1.5 font-mono text-[13px] text-ink shadow-[0_1px_0_var(--c-border)]">
      {children}
    </kbd>
  );
}

function Overview({ index, onPick, onClose }: { index: number; onPick: (i: number) => void; onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col bg-bg/95 px-[112px] pt-[60px] pb-[48px] backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-end justify-between">
        <div>
          <span className="font-mono text-[14px] tracking-[0.32em] text-gold-ink uppercase">Navigator</span>
          <h2 className="font-display mt-2 text-[56px] leading-none text-ink">
            All <span className="text-wine italic">slides</span>
          </h2>
        </div>
        <CtrlButton label="Close overview (Esc)" onClick={onClose}>
          <X size={20} />
        </CtrlButton>
      </div>
      <div className="thin-scroll mt-8 grid flex-1 grid-cols-8 content-start gap-4 overflow-y-auto pr-2">
        {slides.map((s, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => onPick(i)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.01, 0.45), duration: 0.4, ease: EASE }}
            className={`flex h-[130px] cursor-pointer flex-col justify-between rounded-[18px] border p-4 text-left transition-colors duration-300 ${
              i === index ? "border-wine/60 bg-wine-soft" : "border-line bg-surface hover:border-gold/50 hover:bg-surface-solid"
            }`}
          >
            <span className="flex items-center justify-between font-mono text-[12px] tracking-[0.16em] text-subtle uppercase">
              <span>{pad(i + 1)}</span>
              <span className="text-gold-ink">{sections[s.section].num || "·"}</span>
            </span>
            <span className="font-display line-clamp-3 text-[17px] leading-snug text-ink">{s.title}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ───────────── deck ───────────── */

export default function Deck() {
  const scale = useSyncExternalStore(subscribeResize, getScale, () => 1);
  const fullscreen = useSyncExternalStore(subscribeFullscreen, getFullscreen, () => false);
  const [[index, dir], setNav] = useState<[number, number]>(() => [readHash(), 0]);
  const [overview, setOverview] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const [idle, setIdle] = useState(false);
  const [hint, setHint] = useState(true);
  const idleTimer = useRef<number | undefined>(undefined);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((target: number) => {
    setNav((prev) => {
      const t = clamp(target);
      return t === prev[0] ? prev : [t, t > prev[0] ? 1 : -1];
    });
  }, []);
  const step = useCallback((delta: 1 | -1) => {
    setNav((prev) => {
      const t = clamp(prev[0] + delta);
      return t === prev[0] ? prev : [t, delta];
    });
  }, []);
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  }, []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  // URL hash ⇄ slide index
  useEffect(() => {
    const h = `#/${index + 1}`;
    if (window.location.hash !== h) window.history.replaceState(null, "", h);
  }, [index]);
  useEffect(() => {
    const onHash = () => go(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [go]);

  // theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("pss-theme", theme);
    } catch {}
  }, [theme]);

  // keyboard & presenter clickers
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (e.target instanceof HTMLButtonElement && (k === "Enter" || k === " ")) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) {
        e.preventDefault();
        if (overview && k === "Enter") setOverview(false);
        else step(1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) {
        e.preventDefault();
        step(-1);
      } else if (k === "Home") go(0);
      else if (k === "End") go(TOTAL - 1);
      else if (k === "f" || k === "F") toggleFullscreen();
      else if (k === "g" || k === "G" || k === "o" || k === "O") setOverview((v) => !v);
      else if (k === "t" || k === "T") toggleTheme();
      else if (k === "Escape") setOverview(false);
      else return;
      setHint(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, step, overview, toggleFullscreen, toggleTheme]);

  // hide chrome & cursor when the presenter stops moving the mouse
  useEffect(() => {
    const wake = () => {
      setIdle(false);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIdle(true), 2800);
    };
    idleTimer.current = window.setTimeout(() => setIdle(true), 2800);
    window.addEventListener("mousemove", wake);
    window.addEventListener("pointerdown", wake);
    return () => {
      window.clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("pointerdown", wake);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 6000);
    return () => window.clearTimeout(t);
  }, []);

  const slide = slides[index];
  const bleed = isFullBleed(slide);

  return (
    <DeckNav.Provider value={go}>
      <MotionConfig reducedMotion="user">
        <main
          className={`fixed inset-0 overflow-hidden bg-bg ${idle && !overview ? "cursor-none" : ""}`}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") touch.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const t = touch.current;
            touch.current = null;
            if (!t) return;
            const dx = e.clientX - t.x;
            const dy = e.clientY - t.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
          }}
        >
          <Ambient />

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Post-stroke seizure management lecture"
            className="absolute top-1/2 left-1/2 overflow-hidden"
            style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}
          >
            <Orbits hidden={bleed} />
            <Watermark section={slide.section} hidden={bleed} />

            <AnimatePresence initial custom={dir}>
              <motion.section
                key={index}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${TOTAL}: ${slide.title}`}
              >
                <SlideView slide={slide} />
              </motion.section>
            </AnimatePresence>

            {/* overall progress */}
            <motion.div
              aria-hidden
              className="absolute top-0 left-0 z-20 h-[3px] bg-gradient-to-r from-wine via-gold to-teal"
              initial={false}
              animate={{ width: `${(index / (TOTAL - 1)) * 100}%` }}
              transition={{ duration: 0.9, ease: EASE }}
            />

            <footer className="absolute inset-x-[112px] bottom-[38px] z-20 flex h-[44px] items-center justify-between">
              <div
                className={`flex items-center gap-4 font-mono text-[12px] tracking-[0.2em] text-subtle uppercase transition-opacity duration-700 ${
                  bleed ? "opacity-0" : ""
                }`}
              >
                <span className="grid size-8 place-items-center rounded-full border border-gold/50 text-gold-ink">
                  <Brain size={15} strokeWidth={1.6} />
                </span>
                <span>Post-Stroke Seizure Management</span>
                {slide.source && (
                  <>
                    <span className="h-3 w-px bg-line" />
                    <span>Source PDF {slide.source}</span>
                  </>
                )}
              </div>

              <Rail current={slide.section} index={index} go={go} hidden={bleed} />

              <div className="flex items-center gap-6">
                <div className={`flex items-center gap-2 transition-opacity duration-500 ${idle ? "opacity-0" : "opacity-100"}`}>
                  <CtrlButton label="Previous slide (←)" onClick={() => step(-1)}>
                    <ChevronLeft size={19} />
                  </CtrlButton>
                  <CtrlButton label="Next slide (→)" onClick={() => step(1)}>
                    <ChevronRight size={19} />
                  </CtrlButton>
                  <span className="mx-1 h-6 w-px bg-line" />
                  <CtrlButton label="All slides (G)" onClick={() => setOverview((v) => !v)}>
                    <LayoutGrid size={17} />
                  </CtrlButton>
                  <CtrlButton label={theme === "dark" ? "Light theme (T)" : "Dark theme (T)"} onClick={toggleTheme}>
                    {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                  </CtrlButton>
                  <CtrlButton label={fullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"} onClick={toggleFullscreen}>
                    {fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
                  </CtrlButton>
                </div>
                <div className={`transition-opacity duration-700 ${bleed ? "opacity-0" : ""}`}>
                  <Counter index={index} />
                </div>
              </div>
            </footer>

            <AnimatePresence>
              {hint && (
                <motion.div
                  className="absolute top-[22px] left-1/2 z-30 -translate-x-1/2 rounded-full border border-line bg-surface-solid/90 px-6 py-3 text-[15px] text-muted shadow-(--shadow-lift)"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 2.4, duration: 0.6, ease: EASE } }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.4 } }}
                >
                  <Kbd>←</Kbd>
                  <Kbd>→</Kbd> navigate <span className="mx-2 text-line">|</span>
                  <Kbd>G</Kbd> all slides <span className="mx-2 text-line">|</span>
                  <Kbd>F</Kbd> fullscreen <span className="mx-2 text-line">|</span>
                  <Kbd>T</Kbd> theme
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {overview && (
                <Overview
                  index={index}
                  onPick={(i) => {
                    go(i);
                    setOverview(false);
                  }}
                  onClose={() => setOverview(false)}
                />
              )}
            </AnimatePresence>
          </div>

          <p className="pointer-events-none fixed inset-x-0 bottom-8 hidden items-center justify-center gap-2 font-mono text-[12px] tracking-[0.2em] text-subtle uppercase portrait:flex">
            <RotateCcw size={14} aria-hidden /> Rotate for the full view
          </p>

          <div aria-hidden className="grain pointer-events-none fixed inset-0 z-50" />
        </main>
      </MotionConfig>
    </DeckNav.Provider>
  );
}
