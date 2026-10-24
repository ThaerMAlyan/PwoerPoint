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
const ALL_ROWS = CHANNELS.map((_, c) => c);
const EW = 1000;
const ROW = 100;
const EH = ROW * (CHANNELS.length + 0.5); // half-row gap between the left and right chains
const rowY = (c: number) => (c + (c >= 4 ? 0.5 : 0)) * ROW + ROW / 2;
const pct = (v: number, of = EW) => `${(v / of) * 100}%`;

type TraceKind = EegPattern["trace"];

/** Seconds of tracing across the panel (default 5). */
const SECONDS: Partial<Record<TraceKind, number>> = { evolving: 10 };
const secondsOf = (t: TraceKind) => SECONDS[t] ?? 5;

/** Stretch of tracing that carries the abnormality, and the channels it involves.
 *  Without one, every channel is drawn in the pattern's tone. */
const BAND: Partial<Record<TraceKind, { from: number; to: number; rows: number[] }>> = {
  focalSlowing: { from: 290, to: 710, rows: [0, 1, 2, 3] },
  spikeWave: { from: 430, to: 698, rows: ALL_ROWS },
  evolving: { from: 500, to: EW, rows: ALL_ROWS },
  lpd: { from: 0, to: EW, rows: [0, 1, 2, 3] },
};
/** Dashed seizure-onset line, with a time axis under the panel */
const ONSET: Partial<Record<TraceKind, number>> = { evolving: 500 };
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

/** One periodic discharge, u ∈ [0, 1): a sharp transient, then a slow return to baseline. */
const DISCHARGE: [number, number][] = [[0, 0], [0.04, 8], [0.1, -44], [0.18, 24], [0.42, -5], [1, 0]];
function discharge(u: number) {
  for (let k = 1; k < DISCHARGE.length; k++) {
    const [u1, y1] = DISCHARGE[k];
    if (u > u1) continue;
    const [u0, y0] = DISCHARGE[k - 1];
    const t = (u - u0) / (u1 - u0);
    return y0 + (y1 - y0) * (k <= 3 ? t : (1 - Math.cos(Math.PI * t)) / 2); // sharp edges, eased after-going wave
  }
  return 0;
}

function sample(trace: TraceKind, x: number, c: number) {
  switch (trace) {
    case "background":
      return background(x, c);
    case "focalSlowing": {
      // delta replaces the faster rhythms, maximal over F7-T3 / T3-T5
      const { from, to } = BAND.focalSlowing!;
      const weight = c === 1 || c === 2 ? 1 : c === 0 || c === 3 ? 0.5 : 0;
      const w = weight * ramp(from - 50, from + 50, x) * (1 - ramp(to - 50, to + 50, x));
      const bg = background(x, c);
      return bg * (1 - 0.6 * w) + w * (32 * Math.sin((x / 108) * TAU + c * 0.7) + 9 * Math.sin((x / 46) * TAU + c * 1.9));
    }
    case "spikeWave": {
      const { from, to } = BAND.spikeWave!;
      const bg = background(x, c);
      if (x < from || x >= to) return bg;
      const amp = c % 4 === 0 || c % 4 === 3 ? 0.85 : 1;
      return amp * spikeWave(((x - from) % SPIKE_WAVE_PERIOD) / SPIKE_WAVE_PERIOD) + 0.3 * bg;
    }
    case "evolving": {
      // 10 s across the panel: background, then rhythmic activity that slows and grows
      const onset = ONSET.evolving!;
      const bg = 0.8 * background(x * 2, c);
      if (x < onset) return bg;
      const t = x - onset;
      const phase = (TAU / 100) * (5.5 * t - (3 * t * t) / 1000); // 5.5 Hz easing to 2.5 Hz
      const amp = (6 + 26 * ramp(onset, onset + 320, x)) * (c % 4 === 0 ? 0.85 : 1);
      return amp * (Math.sin(phase) + 0.28 * Math.sin(2 * phase + 0.6)) + 0.3 * bg;
    }
    case "gpd": {
      const amp = c % 4 === 0 ? 1.05 : c % 4 === 3 ? 0.85 : 0.95;
      return amp * discharge(((x + 30) % 105) / 105) + 0.35 * background(x, c);
    }
    case "lpd": {
      if (c >= 4) return 0.55 * background(x, c);
      const amp = [0.9, 1.1, 1, 0.75][c];
      return amp * discharge(((x + 20) % 96) / 96) + 0.35 * background(x, c);
    }
  }
}

function eegPath(trace: TraceKind, c: number) {
  const band = BAND[trace];
  const fine = trace === "evolving" || trace === "gpd" || trace === "lpd";
  const y0 = rowY(c);
  let d = "";
  for (let x = 0; x <= EW; ) {
    d += `${d ? "L" : "M"}${x.toFixed(1)} ${(y0 + sample(trace, x, c)).toFixed(1)}`;
    // sample sharp transients finely so their peaks stay sharp
    x += fine ? 1 : trace === "spikeWave" && band && x >= band.from - 2 && x < band.to + 2 ? 0.5 : 2;
  }
  return d;
}

function PatternTrace({ pattern, delay, markerRow }: { pattern: EegPattern; delay: number; markerRow: boolean }) {
  const band = BAND[pattern.trace];
  const onset = ONSET[pattern.trace];
  const seconds = secondsOf(pattern.trace);
  const sec = EW / seconds;
  const paths = useMemo(() => CHANNELS.map((_, c) => eegPath(pattern.trace, c)), [pattern.trace]);
  const uid = `eeg${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dur = 3.2;
  const rect = band && {
    x: band.from,
    y: rowY(band.rows[0]) - ROW / 2,
    w: band.to - band.from,
    h: rowY(band.rows[band.rows.length - 1]) - rowY(band.rows[0]) + ROW,
  };
  const reached = (x: number) => delay + dur * (x / EW);
  return (
    <div
      className={`grid min-h-0 grid-cols-[62px_1fr] rounded-[18px] bg-surface-solid/60 pr-5 pl-4 ring-1 ring-hair ${
        markerRow ? "grid-rows-[36px_1fr_32px]" : "grid-rows-[14px_1fr_32px]"
      }`}
    >
      <span />
      <div className="relative">
        {rect && pattern.marker && (
          <Reveal
            delay={reached(rect.x)}
            y={6}
            blur={false}
            className="absolute inset-y-0 flex flex-col items-center justify-end pb-1"
            style={{ left: pct(rect.x), width: pct(rect.w) }}
          >
            <span className="font-mono text-[12px] tracking-[0.14em] whitespace-nowrap text-(--tone-ink) uppercase">{pattern.marker}</span>
            <span className="mt-1.5 h-2 w-full rounded-t-[3px] border-x-2 border-t-2 border-(--tone)" />
          </Reveal>
        )}
      </div>

      <div className="relative">
        {CHANNELS.map((ch, c) => (
          <span
            key={ch}
            className="absolute left-0 -translate-y-1/2 font-mono text-[12px] whitespace-nowrap text-subtle"
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
            {rect && (
              <clipPath id={`${uid}-band`}>
                <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} />
              </clipPath>
            )}
          </defs>
          {Array.from({ length: seconds * 5 + 1 }).map((_, k) => (
            <line
              key={k}
              x1={k * (sec / 5)}
              x2={k * (sec / 5)}
              y1={0}
              y2={EH}
              className="s-hair"
              strokeWidth={1}
              strokeOpacity={k % 5 ? 0.4 : 1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {rect && (
            <motion.rect
              x={rect.x}
              y={rect.y}
              width={rect.w}
              height={rect.h}
              className={`f-${pattern.tone}-soft`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.6, delay: reached(rect.x) }}
            />
          )}
          <g clipPath={`url(#${uid}-sweep)`}>
            {onset !== undefined && (
              <line
                x1={onset}
                x2={onset}
                y1={0}
                y2={EH}
                style={{ stroke: "var(--c-muted)" }}
                strokeOpacity={0.7}
                strokeWidth={1.5}
                strokeDasharray="6 6"
                vectorEffect="non-scaling-stroke"
              />
            )}
            {paths.map((d, c) => (
              <path
                key={c}
                d={d}
                fill="none"
                className={rect ? undefined : `s-${pattern.tone}`}
                style={rect ? { stroke: "var(--c-muted)" } : undefined}
                strokeOpacity={rect ? 0.6 : 1}
                strokeWidth={1.4}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {rect && band && (
              <g clipPath={`url(#${uid}-band)`}>
                {band.rows.map((c) => (
                  <path
                    key={c}
                    d={paths[c]}
                    fill="none"
                    className={`s-${pattern.tone}`}
                    strokeWidth={1.9}
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
      <Reveal delay={delay + dur} y={6} blur={false} className="relative flex items-center justify-end">
        {onset !== undefined ? (
          // time axis in seconds, as on the source figure
          Array.from({ length: seconds / 2 + 1 }).map((_, k) => (
            <span
              key={k}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[12px] whitespace-nowrap text-subtle"
              style={{ left: pct(k * 2 * sec) }}
            >
              {k * 2}
              {k * 2 === seconds ? " s" : ""}
            </span>
          ))
        ) : (
          // calibration: 1 s across, 100 µV up
          <span className="flex w-full items-end justify-end gap-2.5 font-mono text-[12px] text-subtle">
            <span className="leading-none whitespace-nowrap">1 s · 100 µV</span>
            <span className="h-[16px] shrink-0 border-r-2 border-b-2 border-subtle/70" style={{ width: pct(sec) }} />
          </span>
        )}
      </Reveal>
    </div>
  );
}

function PatternHeader({ pattern }: { pattern: EegPattern }) {
  return (
    <div className="flex items-start gap-4">
      <span className="font-display grid size-[52px] shrink-0 place-items-center rounded-[16px] bg-(--tone-soft) text-[30px] leading-none text-(--tone-ink) italic ring-1 ring-(--tone)/20">
        {pattern.num}
      </span>
      <div className="min-w-0 pt-1">
        <h3 className="font-display text-[31px] leading-[1.12] text-ink">{pattern.label}</h3>
        {pattern.aside && <p className="font-display mt-1.5 text-[21px] leading-snug text-(--tone-ink) italic">({pattern.aside})</p>}
      </div>
    </div>
  );
}

function Findings({ label, items, delay }: { label: string; items: string[]; delay: number }) {
  return (
    <div className="flex flex-col">
      <Label>{label}</Label>
      <ul className="mt-2.5 flex flex-col gap-2">
        {items.map((t, j) => (
          <motion.li
            key={j}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: delay + j * 0.1, ease: EASE }}
            className="flex gap-3.5 text-[19px] leading-[1.38] text-muted"
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

const RTL = /[؀-ۿ]/;

export function EegPatternsLayout({ slide }: { slide: EegPatternsSlide }) {
  const markerRow = slide.patterns.some((p) => p.marker);
  return (
    <SlideFrame slide={slide}>
      {/* cards share row tracks (subgrid) so headers, traces and findings line up */}
      <div
        className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-x-7 gap-y-5"
        style={{ gridTemplateColumns: `repeat(${slide.patterns.length}, minmax(0, 1fr))` }}
      >
        {slide.patterns.map((p, i) => {
          const d = T.content + i * 0.18;
          return (
            <Card key={p.num} tone={p.tone} delay={d} hover={false} className="row-span-3 grid min-h-0 grid-rows-subgrid p-7">
              <PatternHeader pattern={p} />
              <PatternTrace pattern={p} delay={d + 0.4 + i * 0.35} markerRow={markerRow} />
              {p.caption ? (
                <Reveal
                  delay={d + 0.7}
                  y={12}
                  dir={RTL.test(p.caption) ? "rtl" : undefined}
                  lang={RTL.test(p.caption) ? "ar" : undefined}
                  className="font-arabic grid place-items-center rounded-[18px] bg-(--tone-soft) px-6 py-4 text-center text-[22px] leading-[1.6] text-ink"
                >
                  {p.caption}
                </Reveal>
              ) : (
                <div className="flex flex-col gap-4">
                  {p.shows && <Findings label="What it shows" items={p.shows} delay={d + 0.6} />}
                  {p.suggests && (
                    <div className="rounded-[18px] bg-(--tone-soft) px-5 py-4">
                      <Findings label="What it suggests" items={p.suggests} delay={d + 0.8} />
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {slide.callout && <Callout callout={slide.callout} delay={T.content + 1.4} className="mt-6" />}
    </SlideFrame>
  );
}
