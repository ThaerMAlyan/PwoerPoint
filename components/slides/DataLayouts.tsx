"use client";

import { motion } from "motion/react";
import { useId, useMemo } from "react";
import type { EegPattern, EegPatternsSlide, IncidenceSlide, ScoreSlide, SevenDaySlide } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { CountUp, EASE, Reveal, Rich, T } from "@/components/ui/motion";
import { Bullet, Callout, Card, IconBadge, Label, SlideFrame } from "./parts";

/* ───────────────────────── Incidence ───────────────────────── */

const BAR_TONE = { gold: "from-gold to-gold/70", teal: "from-teal to-teal/70", wine: "from-wine to-wine/70" };

export function IncidenceLayout({ slide }: { slide: IncidenceSlide }) {
  const { chart } = slide;
  const ticks = Array.from({ length: chart.max / 2 + 1 }, (_, k) => k * 2);
  return (
    <SlideFrame slide={slide}>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.02fr] gap-8">
        <Card tone="wine" delay={T.content} className="flex flex-col p-10">
          <Label>{slide.panelTitle}</Label>
          <ul className="mt-4 flex flex-1 flex-col justify-evenly">
            {slide.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: T.content + 0.25 + i * 0.12, ease: EASE }}
                className="flex items-center gap-6"
              >
                <IconBadge icon={b.icon} size={58} iconSize={27} />
                <p className="text-[26px] leading-[1.42] text-muted">
                  <Rich text={b.text} />
                </p>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card tone="gold" delay={T.content + 0.15} className="flex flex-col p-10">
          <div className="flex items-start justify-between gap-6">
            <Label>{chart.title}</Label>
            <div className="flex shrink-0 flex-col gap-2">
              {chart.series.map((s) => (
                <span key={s.label} className="flex items-center gap-3 text-[17px] text-muted">
                  <span className={`size-3.5 rounded-[4px] bg-gradient-to-b ${BAR_TONE[s.tone]}`} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mt-6 flex flex-1 pl-12">
            {/* gridlines */}
            <div className="pointer-events-none absolute inset-0 left-12">
              {ticks.map((t) => (
                <div
                  key={t}
                  className="absolute inset-x-0 border-t border-hair"
                  style={{ bottom: `${(t / chart.max) * 100}%` }}
                >
                  <span className="absolute -top-3 -left-14 w-10 text-right font-mono text-[14px] text-subtle">{t}%</span>
                </div>
              ))}
            </div>
            <div className="relative flex flex-1 items-end justify-around px-6">
              {chart.groups.map((g, gi) => (
                <div key={g.label} className="flex h-full flex-col items-center justify-end">
                  <div className="flex h-full items-end gap-5">
                    {g.values.map((v, si) => {
                      const d = T.content + 0.5 + gi * 0.3 + si * 0.12;
                      return (
                        <div key={si} className="flex h-full w-[92px] flex-col items-center justify-end">
                          <Reveal delay={d + 0.3} y={8} blur={false} className="mb-2 text-[26px] font-semibold text-ink">
                            <CountUp to={v} decimals={v % 1 ? 1 : 0} suffix="%" delay={d} duration={1.3} />
                          </Reveal>
                          <motion.div
                            className={`w-full rounded-t-[14px] bg-gradient-to-b ${BAR_TONE[chart.series[si].tone]}`}
                            style={{ height: `${(v / chart.max) * 100}%`, originY: 1 }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ type: "spring", stiffness: 70, damping: 14, delay: d }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-around pl-12">
            {chart.groups.map((g) => (
              <span key={g.label} className="font-display text-[24px] text-ink">
                {g.label}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </SlideFrame>
  );
}

/* ───────────────────────── Early vs late ───────────────────────── */

export function SevenDayLayout({ slide }: { slide: SevenDaySlide }) {
  const { axis } = slide;
  const phases = [
    { ...slide.early, tone: "wine" as const, icon: "zap" as const },
    { ...slide.late, tone: "teal" as const, icon: "calendar" as const },
  ];
  return (
    <SlideFrame slide={slide}>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr_0.8fr] grid-rows-[132px_1fr] gap-x-8 gap-y-6">
        {/* timeline */}
        <div aria-hidden className="relative col-span-2">
          <motion.div
            className="absolute top-[78px] right-0 left-[10px] h-[6px] origin-left rounded-full bg-gradient-to-r from-wine via-wine/70 to-teal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: T.content, ease: EASE }}
          />
          <motion.span
            className="absolute top-[70px] left-0 size-[22px] rounded-full border-[5px] border-surface-solid bg-wine shadow-(--shadow-card)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: T.content }}
          />
          <Reveal delay={T.content + 0.1} y={8} blur={false} className="absolute top-[106px] left-0 font-mono text-[14px] tracking-[0.2em] text-subtle uppercase">
            {axis.start}
          </Reveal>
          {[axis.early, axis.late].map((l, i) => (
            <Reveal
              key={l}
              delay={T.content + 0.4 + i * 0.5}
              y={10}
              className={`tone-${i ? "teal" : "wine"} absolute top-[18px] -translate-x-1/2 rounded-full bg-(--tone-soft) px-5 py-2 text-[20px] font-semibold text-(--tone-ink)`}
              style={{ left: i ? "75%" : "25%" }}
            >
              {l}
            </Reveal>
          ))}
          {/* Day 7 */}
          <motion.div
            className="absolute top-[52px] left-1/2 h-[60px] w-[2px] origin-bottom -translate-x-1/2 bg-gold"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: T.content + 0.8, ease: EASE }}
          />
          <motion.span
            className="absolute top-[68px] left-1/2 size-[26px] -translate-x-1/2 rounded-full border-[5px] border-surface-solid bg-gold shadow-(--shadow-card)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: T.content + 0.9 }}
          />
          <span className="absolute top-[63px] left-1/2 size-[36px] -translate-x-1/2 rounded-full border border-gold animate-ring-out" />
          <Reveal
            delay={T.content + 1}
            y={8}
            className="font-display absolute top-[104px] left-1/2 -translate-x-1/2 text-[26px] text-gold-ink italic"
          >
            {axis.marker}
          </Reveal>
        </div>

        <Card tone="gold" delay={T.content + 1.3} className="row-span-2 flex flex-col justify-center bg-gold-soft! p-10">
          <span className="relative grid size-16 place-items-center rounded-full bg-gold text-bg">
            <span className="absolute inset-0 rounded-full bg-gold animate-ring-out" />
            <Icon name="alert" size={28} strokeWidth={2} className="relative" />
          </span>
          <Label className="mt-8">{slide.caution.label}</Label>
          <p className="font-display mt-5 text-[38px] leading-[1.15] text-ink">{slide.caution.text}</p>
          <p className="mt-6 text-[23px] text-muted">{slide.caution.sub}</p>
        </Card>

        {phases.map((p, i) => (
          <Card key={p.label} tone={p.tone} delay={T.content + 0.6 + i * 0.25} className="flex flex-col p-10">
            <div className="flex items-center gap-5">
              <IconBadge icon={p.icon} />
              <div>
                <h3 className="font-display text-[44px] leading-none text-ink">{p.label}</h3>
                <span className="mt-2 block font-mono text-[14px] tracking-[0.22em] text-(--tone-ink) uppercase">{p.sub}</span>
              </div>
            </div>
            <ul className="mt-6 flex flex-1 flex-col justify-evenly gap-4">
              {p.points.map((pt, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: T.content + 0.9 + i * 0.25 + j * 0.1, ease: EASE }}
                  className="flex gap-5 text-[25px] leading-[1.42] text-muted"
                >
                  <Bullet />
                  <span>
                    <Rich text={pt} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </SlideFrame>
  );
}

/* ───────────────────────── SeLECT worked example ───────────────────────── */

export function ScoreLayout({ slide }: { slide: ScoreSlide }) {
  const r = 132;
  const c = 2 * Math.PI * r;
  const tones = ["teal", "gold", "wine"] as const;
  const ringDelay = T.content + 0.5;
  const segments: { key: string; start: number; len: number }[] = [];
  for (const b of slide.breakdown) {
    const prev = segments.at(-1);
    const start = prev ? prev.start + prev.len / c : 0;
    segments.push({ key: b.key, start, len: (b.value / slide.max) * c });
  }
  return (
    <SlideFrame slide={slide} hideVisual>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_560px] gap-12">
        <div className="flex flex-col justify-between gap-5">
          {slide.items.map((it, i) => (
            <Card key={it.label} tone={tones[i]} delay={T.content + i * 0.14} className="flex flex-1 items-center gap-7 px-9">
              <IconBadge icon={it.icon} />
              <div className="flex-1">
                <Label>{it.label}</Label>
                <p className="mt-2 text-[26px] leading-snug text-muted">
                  <Rich text={it.text} strongClassName="font-semibold text-ink" />
                </p>
              </div>
              <span className="font-display text-[54px] leading-none text-(--tone-ink) italic">+{it.points}</span>
            </Card>
          ))}
        </div>

        <Card tone="wine" delay={T.content + 0.25} hover={false} className="flex flex-col items-center justify-center px-8 py-6">
          <div className="relative">
            <svg viewBox="0 0 300 300" className="w-[290px] overflow-visible" aria-hidden>
              <circle cx={150} cy={150} r={r} fill="none" className="s-hair" strokeWidth={16} />
              {segments.map(({ key, start, len }) => {
                const seg = Math.max(0, len - 6);
                return (
                  <motion.circle
                    key={key}
                    cx={150}
                    cy={150}
                    r={r}
                    fill="none"
                    className={key === "E" ? "s-wine" : key === "Se" || key === "C" ? "s-gold" : "s-teal"}
                    strokeWidth={16}
                    strokeDasharray={`${seg} ${c}`}
                    transform={`rotate(${start * 360 - 90} 150 150)`}
                    initial={{ strokeDashoffset: seg }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.45, delay: ringDelay + start * 1.6, ease: "easeOut" }}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[120px] leading-none text-wine">
                <CountUp to={slide.total} delay={ringDelay} duration={1.8} />
              </span>
              <span className="font-mono text-[15px] tracking-[0.28em] text-subtle uppercase">of {slide.max} points</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2.5">
            {slide.breakdown.map((b, i) => (
              <Reveal
                key={b.key}
                delay={ringDelay + 0.3 + i * 0.25}
                y={10}
                className="flex items-baseline gap-1.5 rounded-full border border-line bg-surface-solid px-3.5 py-1.5"
              >
                <span className="font-display text-[20px] text-wine italic">{b.key}</span>
                <span className="text-[18px] font-semibold text-ink tabular">{b.value}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={ringDelay + 1.8} y={10} className="mt-6 text-center">
            <span className="font-mono text-[14px] tracking-[0.26em] text-wine uppercase">{slide.verdictLabel}</span>
            <p className="mt-2 max-w-[440px] text-[22px] leading-snug text-ink">{slide.verdict}</p>
          </Reveal>
        </Card>
      </div>
      {slide.callout && <Callout callout={slide.callout} delay={ringDelay + 2.1} className="mt-7" />}
    </SlideFrame>
  );
}

/* ───────────────────────── EEG patterns (schematic bipolar montage) ───────────────────────── */

const CHANNELS = ["Fp1-F7", "F7-T3", "T3-T5", "T5-O1", "Fp2-F8", "F8-T4", "T4-T6", "T6-O2"];
const EW = 1000; // five seconds of tracing
const SEC = EW / 5;
const ROW = 100;
const EH = ROW * (CHANNELS.length + 0.5); // half-row gap between the left and right chains
const rowY = (c: number) => (c + (c >= 4 ? 0.5 : 0)) * ROW + ROW / 2;
const pct = (v: number, of = EW) => `${(v / of) * 100}%`;

type TraceKind = EegPattern["trace"];

/** Stretch of tracing that carries the abnormality, and the channels it involves. */
const WINDOW: Record<TraceKind, { from: number; to: number; rows: number[] } | null> = {
  background: null,
  focalSlowing: { from: 290, to: 710, rows: [0, 1, 2, 3] },
  spikeWave: { from: 430, to: 698, rows: [0, 1, 2, 3, 4, 5, 6, 7] },
};
const SPIKE_WAVE_PERIOD = 67; // ≈3 Hz at 200 units per second

const TAU = Math.PI * 2;
const ramp = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Low-voltage mixed alpha/beta background; alpha is a little larger over the posterior chains. */
function background(x: number, c: number) {
  const posterior = c % 4 === 3 ? 1.35 : 1;
  const envelope = 0.75 + 0.25 * Math.sin((x / 310) * TAU + c * 1.3);
  return (
    posterior * envelope * (7 * Math.sin((x / 21) * TAU + c * 0.9) + 2.4 * Math.sin((x / 8.6) * TAU + c * 2.1)) +
    2.8 * Math.sin((x / 63) * TAU + c * 0.5)
  );
}

/** One spike-and-wave complex, u ∈ [0, 1). Negative is up, as on an EEG page. */
function spikeWave(u: number) {
  if (u < 0.05) return -48 * (u / 0.05);
  if (u < 0.12) return -48 + 64 * ((u - 0.05) / 0.07);
  if (u < 0.2) return 16 * (1 - (u - 0.12) / 0.08);
  return -26 * Math.sin((Math.PI * (u - 0.2)) / 0.8);
}

function sample(trace: TraceKind, x: number, c: number) {
  const bg = background(x, c);
  const win = WINDOW[trace];
  if (!win) return bg;
  if (trace === "focalSlowing") {
    // delta replaces the faster rhythms, maximal over F7-T3 / T3-T5
    const weight = c === 1 || c === 2 ? 1 : c === 0 || c === 3 ? 0.5 : 0;
    const w = weight * ramp(win.from - 50, win.from + 50, x) * (1 - ramp(win.to - 50, win.to + 50, x));
    return bg * (1 - 0.6 * w) + w * (32 * Math.sin((x / 108) * TAU + c * 0.7) + 9 * Math.sin((x / 46) * TAU + c * 1.9));
  }
  if (x < win.from || x >= win.to) return bg;
  const amp = c % 4 === 0 || c % 4 === 3 ? 0.85 : 1;
  return amp * spikeWave(((x - win.from) % SPIKE_WAVE_PERIOD) / SPIKE_WAVE_PERIOD) + 0.3 * bg;
}

function eegPath(trace: TraceKind, c: number) {
  const win = WINDOW[trace];
  const y0 = rowY(c);
  let d = "";
  for (let x = 0; x <= EW; ) {
    d += `${d ? "L" : "M"}${x.toFixed(1)} ${(y0 + sample(trace, x, c)).toFixed(1)}`;
    // sample spikes finely so their peaks stay sharp
    x += trace === "spikeWave" && win && x >= win.from - 2 && x < win.to + 2 ? 0.5 : 2;
  }
  return d;
}

function PatternTrace({ pattern, delay, note, className = "" }: { pattern: EegPattern; delay: number; note?: string; className?: string }) {
  const win = WINDOW[pattern.trace];
  const paths = useMemo(() => CHANNELS.map((_, c) => eegPath(pattern.trace, c)), [pattern.trace]);
  const uid = `eeg${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dur = 3.2;
  const band = win && {
    x: win.from,
    y: rowY(win.rows[0]) - ROW / 2,
    w: win.to - win.from,
    h: rowY(win.rows[win.rows.length - 1]) - rowY(win.rows[0]) + ROW,
  };
  const reached = (x: number) => delay + dur * (x / EW);
  return (
    <div className={`grid min-h-0 flex-1 grid-cols-[84px_1fr] grid-rows-[40px_1fr_34px] rounded-[18px] bg-surface-solid/60 pr-6 pl-5 ring-1 ring-hair ${className}`}>
      <span />
      <div className="relative">
        {band && pattern.marker && (
          <Reveal
            delay={reached(band.x)}
            y={6}
            blur={false}
            className="absolute inset-y-0 flex flex-col justify-end pb-1"
            style={{ left: pct(band.x), width: pct(band.w) }}
          >
            <span className="text-center font-mono text-[13px] tracking-[0.16em] whitespace-nowrap text-(--tone-ink) uppercase">
              {pattern.marker}
            </span>
            <span className="mt-1.5 h-2 rounded-t-[3px] border-x-2 border-t-2 border-(--tone)" />
          </Reveal>
        )}
      </div>

      <div className="relative">
        {CHANNELS.map((ch, c) => (
          <span
            key={ch}
            className="absolute left-0 -translate-y-1/2 font-mono text-[13px] whitespace-nowrap text-subtle"
            style={{ top: pct(rowY(c), EH) }}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="relative min-h-0">
        <svg viewBox={`0 0 ${EW} ${EH}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            {/* a sweeping clip writes the page like an EEG pen */}
            <clipPath id={`${uid}-sweep`}>
              <motion.rect
                x={-4}
                y={-ROW}
                height={EH + 2 * ROW}
                initial={{ width: 0 }}
                animate={{ width: EW + 8 }}
                transition={{ duration: dur, delay, ease: "linear" }}
              />
            </clipPath>
            {band && (
              <clipPath id={`${uid}-band`}>
                <rect x={band.x} y={band.y} width={band.w} height={band.h} />
              </clipPath>
            )}
          </defs>
          {Array.from({ length: EW / (SEC / 5) + 1 }).map((_, k) => (
            <line
              key={k}
              x1={k * (SEC / 5)}
              x2={k * (SEC / 5)}
              y1={0}
              y2={EH}
              className="s-hair"
              strokeWidth={1}
              strokeOpacity={k % 5 ? 0.45 : 1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {band && (
            <motion.rect
              x={band.x}
              y={band.y}
              width={band.w}
              height={band.h}
              className={`f-${pattern.tone}-soft`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.6, delay: reached(band.x) }}
            />
          )}
          <g clipPath={`url(#${uid}-sweep)`}>
            {paths.map((d, c) => (
              <path
                key={c}
                d={d}
                fill="none"
                className={band ? undefined : `s-${pattern.tone}`}
                style={band ? { stroke: "var(--c-muted)" } : undefined}
                strokeOpacity={band ? 0.6 : 1}
                strokeWidth={1.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {band && win && (
              <g clipPath={`url(#${uid}-band)`}>
                {win.rows.map((c) => (
                  <path
                    key={c}
                    d={paths[c]}
                    fill="none"
                    className={`s-${pattern.tone}`}
                    strokeWidth={2.1}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            )}
          </g>
        </svg>
        <motion.span
          aria-hidden
          className="absolute -inset-y-2 w-[3px] bg-gradient-to-b from-transparent via-(--tone) to-transparent"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: dur, delay, ease: "linear", opacity: { duration: dur, delay, times: [0, 0.04, 0.92, 1] } }}
        />
      </div>

      <span />
      <Reveal delay={delay + dur} y={6} blur={false} className="flex items-center justify-between gap-6">
        <span className="font-mono text-[12px] tracking-[0.18em] text-subtle uppercase">{note}</span>
        {/* calibration: 1 s across, 100 µV up */}
        <span className="flex items-end gap-2.5 font-mono text-[12px] text-subtle" style={{ width: pct(SEC) }}>
          <span className="relative h-[18px] flex-1 border-b-2 border-l-2 border-subtle/70" />
          <span className="leading-none">1 s · 100 µV</span>
        </span>
      </Reveal>
    </div>
  );
}

function PatternHeader({ pattern }: { pattern: EegPattern }) {
  return (
    <div className="flex items-center gap-5">
      <span className="font-display grid size-[58px] shrink-0 place-items-center rounded-[18px] bg-(--tone-soft) text-[34px] leading-none text-(--tone-ink) italic ring-1 ring-(--tone)/20">
        {pattern.num}
      </span>
      <h3 className="font-display text-[40px] leading-none text-ink">{pattern.label}</h3>
      <span className="font-display ml-auto shrink-0 text-[25px] text-(--tone-ink) italic">({pattern.aside})</span>
    </div>
  );
}

function Findings({ label, items, delay, textClass }: { label: string; items: string[]; delay: number; textClass: string }) {
  return (
    <div className="flex flex-col">
      <Label>{label}</Label>
      <ul className="mt-3.5 flex flex-col gap-3">
        {items.map((t, j) => (
          <motion.li
            key={j}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: delay + j * 0.1, ease: EASE }}
            className={`flex gap-4 leading-[1.38] text-muted ${textClass}`}
          >
            <Bullet />
            <span>
              <Rich text={t} />
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function EegPatternsLayout({ slide }: { slide: EegPatternsSlide }) {
  if (slide.patterns.length === 1) {
    const p = slide.patterns[0];
    return (
      <SlideFrame slide={slide}>
        <Card tone={p.tone} delay={T.content} hover={false} className="flex min-h-0 flex-1 flex-col p-10">
          <PatternHeader pattern={p} />
          <div className="mt-7 grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-9">
            <PatternTrace pattern={p} note={slide.note} delay={T.content + 0.45} />
            <div className="flex flex-col gap-6">
              <div className="flex flex-1 flex-col justify-center rounded-[22px] bg-(--tone-soft) px-8 py-7">
                <Findings label="What it shows" items={p.shows} delay={T.content + 0.6} textClass="text-[25px]" />
              </div>
              <div className="flex flex-1 flex-col justify-center rounded-[22px] border border-line bg-surface-solid/60 px-8 py-7">
                <Findings label="What it suggests" items={p.suggests} delay={T.content + 0.9} textClass="text-[25px]" />
              </div>
            </div>
          </div>
        </Card>
      </SlideFrame>
    );
  }
  return (
    <SlideFrame slide={slide}>
      {/* cards share row tracks (subgrid) so traces and findings line up side by side */}
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[auto_minmax(0,1fr)_auto] gap-x-8 gap-y-6">
        {slide.patterns.map((p, i) => {
          const d = T.content + i * 0.2;
          return (
            <Card key={p.num} tone={p.tone} delay={d} hover={false} className="row-span-3 grid min-h-0 grid-rows-subgrid p-8">
              <PatternHeader pattern={p} />
              <PatternTrace pattern={p} note={i === slide.patterns.length - 1 ? slide.note : undefined} delay={d + 0.45 + i * 0.5} />
              <div className="grid grid-cols-2 gap-7">
                <Findings label="What it shows" items={p.shows} delay={d + 0.6} textClass="text-[21px]" />
                <Findings label="What it suggests" items={p.suggests} delay={d + 0.8} textClass="text-[21px]" />
              </div>
            </Card>
          );
        })}
      </div>
    </SlideFrame>
  );
}
