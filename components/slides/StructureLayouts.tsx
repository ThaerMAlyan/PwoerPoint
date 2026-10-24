"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Fragment, useId } from "react";
import type { FlowSlide, FlowStep, TableSlide } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { CountUp, EASE, Reveal, Rich, T } from "@/components/ui/motion";
import { Callout, Card, IconBadge, Label, SlideFrame } from "./parts";

/* ───────────────────────── Table ───────────────────────── */

function AcronymCell({ text }: { text: string }) {
  const [badge, raw] = text.split(/\s[–—]\s/);
  const label = raw.charAt(0).toUpperCase() + raw.slice(1);
  return (
    <div className="flex items-center gap-5">
      <span className="font-display grid h-[52px] min-w-[52px] place-items-center rounded-[14px] bg-wine-soft px-2 text-[27px] text-wine italic ring-1 ring-wine/15">
        {badge}
      </span>
      <span className="font-display text-[25px] leading-tight text-ink">{label}</span>
    </div>
  );
}

function RiskBars({ risk, delay }: { risk: NonNullable<TableSlide["risk"]>; delay: number }) {
  const max = Math.max(...risk.data.map((d) => d.value));
  const tones = ["bg-teal", "bg-teal", "bg-gold", "bg-wine", "bg-wine"];
  return (
    <Card tone="gold" delay={delay} className="flex flex-col p-9">
      <Label>{risk.title}</Label>
      <p className="mt-2 text-[19px] text-subtle">{risk.caption}</p>
      <div className="relative mt-6 flex flex-1 items-end gap-5 border-b border-hair pb-0">
        {[0.25, 0.5, 0.75].map((g) => (
          <span key={g} aria-hidden className="absolute inset-x-0 border-t border-dashed border-hair" style={{ bottom: `${g * 100}%` }} />
        ))}
        {risk.data.map((d, i) => {
          const h = Math.max(2, (d.value / max) * 100);
          return (
            <div key={d.label} className="relative flex h-full flex-1 flex-col items-center justify-end">
              <Reveal delay={delay + 0.5 + i * 0.12} y={8} blur={false} className="mb-2 text-[22px] font-semibold text-ink">
                <CountUp to={d.value} decimals={1} suffix="%" delay={delay + 0.5 + i * 0.12} duration={1.4} />
              </Reveal>
              <motion.div
                className={`w-full rounded-t-[12px] ${tones[i]}`}
                style={{ height: `${h * 0.82}%`, originY: 1 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ type: "spring", stiffness: 70, damping: 15, delay: delay + 0.4 + i * 0.12 }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-5">
        {risk.data.map((d) => (
          <span key={d.label} className="font-display flex-1 text-center text-[26px] text-ink italic">
            {d.label}
          </span>
        ))}
      </div>
      <p className="mt-1 text-center font-mono text-[12px] tracking-[0.22em] text-subtle uppercase">Total CAVE points</p>
    </Card>
  );
}

export function TableLayout({ slide }: { slide: TableSlide }) {
  const widths = slide.widths ?? slide.columns.map(() => 1);
  const grid = { gridTemplateColumns: widths.map((w) => `${w}fr`).join(" ") };
  const cols = slide.columns.length;
  const rows = slide.rows.length;
  // type scales with how much room each row gets
  const cellSize = slide.risk ? 23 : rows <= 3 ? (cols >= 4 ? 24 : 26) : rows === 4 ? (cols <= 2 ? 25 : 23) : 21;
  const cellStyle = { fontSize: cellSize };
  const headStyle = { fontSize: cellSize + (rows <= 3 ? 4 : 2) };
  const rowPad = rows >= 5 ? "py-[14px]" : "py-[20px]";
  const lastRowDelay = T.content + 0.2 + rows * 0.09;

  const table = (
    <Card tone="wine" delay={T.content - 0.08} hover={false} className="flex flex-1 flex-col overflow-hidden">
      <div role="table" aria-label={slide.title} className="flex flex-1 flex-col">
        <div role="row" className="grid gap-8 border-b border-gold/45 px-10 pt-7 pb-4" style={grid}>
          {slide.columns.map((c) => (
            <div key={c} role="columnheader" className="font-mono text-[13.5px] tracking-[0.2em] text-gold-ink uppercase">
              {c}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          {slide.rows.map((r, ri) => {
            const emph = slide.emphasizeLast && ri === rows - 1;
            return (
              <motion.div
                key={ri}
                role="row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: T.content + 0.18 + ri * 0.09, ease: EASE }}
                className={`relative grid flex-1 items-center gap-8 px-10 ${rowPad} transition-colors duration-300 hover:bg-wine-soft ${
                  ri < rows - 1 ? "border-b border-hair" : ""
                } ${emph ? "bg-wine-soft" : ""}`}
                style={grid}
              >
                {r.map((cell, ci) => {
                  if (ci === 0)
                    return slide.acronym ? (
                      <div role="rowheader" key={ci}>
                        <AcronymCell text={cell} />
                      </div>
                    ) : (
                      <div
                        role="rowheader"
                        key={ci}
                        className={`font-display leading-tight ${emph ? "text-wine" : "text-ink"}`}
                        style={headStyle}
                      >
                        {cell}
                      </div>
                    );
                  const points = slide.acronym && ci === cols - 1;
                  return (
                    <div
                      role="cell"
                      key={ci}
                      className={
                        points
                          ? "font-display text-[27px] text-wine tabular"
                          : `leading-[1.42] ${emph ? "font-semibold text-wine" : "text-muted"}`
                      }
                      style={points ? undefined : cellStyle}
                    >
                      <Rich text={cell} />
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
        {slide.total && (
          <motion.div
            role="row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: lastRowDelay, ease: EASE }}
            className="grid items-center gap-8 border-t border-gold/45 bg-gold-soft px-10 py-5"
            style={grid}
          >
            <div role="rowheader" className="font-mono text-[15px] tracking-[0.24em] text-gold-ink uppercase">
              {slide.total[0]}
            </div>
            <div role="cell" className="text-[22px] text-ink">
              {slide.total[1]}
            </div>
            <div role="cell" className="font-display text-[38px] leading-none text-wine italic">
              {slide.total[2]}
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );

  return (
    <SlideFrame slide={slide}>
      {slide.risk ? (
        <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-8">
          {table}
          <RiskBars risk={slide.risk} delay={T.content + 0.3} />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">{table}</div>
      )}
      {slide.callout && <Callout callout={slide.callout} delay={lastRowDelay + 0.2} className="mt-7" />}
    </SlideFrame>
  );
}

/* ───────────────────────── Flow ───────────────────────── */

function StepCard({
  step,
  index,
  delay,
  className = "",
  horizontal,
  big,
}: {
  step: FlowStep;
  index: number;
  delay: number;
  className?: string;
  horizontal?: boolean;
  big?: boolean;
}) {
  const tone = step.tone ?? "wine";
  if (horizontal) {
    return (
      <Card tone={tone} delay={delay} className={`flex items-center gap-7 px-9 py-8 ${className}`}>
        <IconBadge icon={step.icon} size={64} iconSize={30} />
        <div>
          <span className="font-display text-[40px] leading-none text-(--tone-ink) italic">{step.label}</span>
          <p className="mt-3 text-[25px] leading-[1.4] text-muted">
            <Rich text={step.text} />
          </p>
        </div>
      </Card>
    );
  }
  return (
    <Card tone={tone} delay={delay} className={`flex flex-col gap-8 p-9 ${className}`}>
      <div className="flex items-start justify-between">
        <IconBadge icon={step.icon} size={64} iconSize={30} />
        <span
          aria-hidden
          className="font-display -mt-3 text-[112px] leading-[0.85] text-(--tone) italic opacity-[0.18] select-none"
        >
          {index + 1}
        </span>
      </div>
      <div>
        {big ? (
          <span className="font-display block text-[40px] leading-none text-(--tone-ink) italic">{step.label}</span>
        ) : (
          <Label className="text-[16px]!">{step.label}</Label>
        )}
        <p className="mt-4 text-[27px] leading-[1.4] break-words text-muted">
          <Rich text={step.text} strongClassName="font-semibold text-(--tone-ink)" />
        </p>
      </div>
    </Card>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <div aria-hidden className="relative flex w-[60px] shrink-0 items-center justify-center self-center">
      <motion.span
        className="absolute inset-x-0 top-1/2 h-px origin-left bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
      />
      <motion.span
        className="relative grid size-10 place-items-center rounded-full border border-gold/50 bg-surface-solid text-gold-ink shadow-(--shadow-card)"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: delay + 0.2 }}
      >
        <ChevronRight size={20} strokeWidth={2} />
      </motion.span>
    </div>
  );
}

function SequenceFlow({ steps, connectors }: { steps: FlowStep[]; connectors: boolean }) {
  return (
    <div className={`flex flex-1 items-center ${connectors ? "" : "gap-6"}`}>
      {steps.map((s, i) => {
        const delay = T.content + i * (connectors ? 0.22 : 0.12);
        return (
          <Fragment key={s.label}>
            <StepCard step={s} index={i} delay={delay} className="min-h-[430px] flex-1" />
            {connectors && i < steps.length - 1 && <Connector delay={delay + 0.3} />}
          </Fragment>
        );
      })}
    </div>
  );
}

function ParallelFlow({ steps }: { steps: FlowStep[] }) {
  const n = steps.length;
  const centers = steps.map((_, i) => ((i + 0.5) / n) * 100);
  return (
    <div className="flex flex-1 flex-col">
      <div aria-hidden className="relative h-[74px] shrink-0">
        <motion.span
          className="absolute top-[22px] h-px bg-gold"
          style={{ left: `${centers[0]}%`, right: `${100 - centers[n - 1]}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: T.content, ease: EASE }}
        />
        {centers.map((c, i) => (
          <motion.span
            key={i}
            className="absolute top-[22px] h-[52px] w-px origin-top bg-gold"
            style={{ left: `${c}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: T.content + 0.6 + i * 0.06, ease: EASE }}
          />
        ))}
        <Reveal
          delay={T.content + 0.1}
          y={6}
          blur={false}
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full border border-gold/50 bg-surface-solid px-5 py-2 font-mono text-[13px] tracking-[0.26em] text-gold-ink uppercase"
        >
          All at once · in parallel
        </Reveal>
      </div>
      <div className="flex flex-1 gap-6">
        {steps.map((s, i) => (
          <StepCard key={s.label} step={s} index={i} delay={T.content + 0.6 + i * 0.1} className="flex-1" />
        ))}
      </div>
    </div>
  );
}

function BranchFlow({ steps }: { steps: FlowStep[] }) {
  const [a, b, c, d] = steps;
  const clip = `clip${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div className="flex flex-1 items-center">
      <StepCard step={a} index={0} delay={T.content} className="min-h-[380px] w-[360px]" />
      <Connector delay={T.content + 0.3} />
      <StepCard step={b} index={1} delay={T.content + 0.22} className="min-h-[380px] w-[360px]" />
      <div className="relative flex h-full flex-1 items-stretch">
        <svg aria-hidden viewBox="0 0 120 100" preserveAspectRatio="none" className="h-full w-[120px] shrink-0 overflow-visible">
          <defs>
            <clipPath id={clip}>
              <motion.rect
                x={0}
                y={0}
                height={100}
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 0.8, delay: T.content + 0.6, ease: EASE }}
              />
            </clipPath>
          </defs>
          {["M0 50 C60 50 60 24 120 24", "M0 50 C60 50 60 76 120 76"].map((p, i) => (
            <path
              key={i}
              d={p}
              fill="none"
              className="s-gold"
              strokeWidth={1.4}
              vectorEffect="non-scaling-stroke"
              clipPath={`url(#${clip})`}
            />
          ))}
        </svg>
        <motion.span
          aria-hidden
          className="absolute top-1/2 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: T.content + 0.55 }}
        />
        <div className="flex flex-1 flex-col justify-center gap-8 py-2">
          <StepCard step={c} index={2} delay={T.content + 0.85} horizontal className="flex-1" />
          <StepCard step={d} index={3} delay={T.content + 1} horizontal className="flex-1" />
        </div>
      </div>
    </div>
  );
}

function TimeFlow({ steps }: { steps: FlowStep[] }) {
  const n = steps.length;
  return (
    <div className="flex flex-1 flex-col">
      <div aria-hidden className="relative mb-6 h-[64px] shrink-0">
        <motion.div
          className="absolute top-[30px] right-[14px] left-0 h-[6px] origin-left rounded-full bg-gradient-to-r from-teal via-gold to-wine"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: T.content, ease: EASE }}
        />
        <motion.span
          className="absolute top-[23px] right-0 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-wine"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: T.content + 1.5 }}
        />
        {steps.map((s, i) => {
          const left = `calc(${((i + 0.5) / n) * 100}% - 12px)`;
          return (
            <motion.span
              key={s.label}
              className={`tone-${s.tone ?? "wine"} absolute top-[21px] size-6 rounded-full border-[5px] border-surface-solid bg-(--tone) shadow-(--shadow-card)`}
              style={{ left }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: T.content + 0.3 + i * 0.35 }}
            />
          );
        })}
        <span className="absolute top-[18px] -left-[52px] text-gold-ink">
          <Icon name="timer" size={30} />
        </span>
      </div>
      <div className="flex flex-1 gap-6">
        {steps.map((s, i) => (
          <StepCard key={s.label} step={s} index={i} delay={T.content + 0.4 + i * 0.35} big className="flex-1" />
        ))}
      </div>
    </div>
  );
}

export function FlowLayout({ slide }: { slide: FlowSlide }) {
  const extra = slide.mode === "time" ? 1.9 : slide.mode === "branch" ? 1.3 : 1;
  return (
    <SlideFrame slide={slide}>
      {slide.mode === "branch" ? (
        <BranchFlow steps={slide.steps} />
      ) : slide.mode === "parallel" ? (
        <ParallelFlow steps={slide.steps} />
      ) : slide.mode === "time" ? (
        <TimeFlow steps={slide.steps} />
      ) : (
        <SequenceFlow steps={slide.steps} connectors={slide.mode === "sequence"} />
      )}
      {slide.callout && <Callout callout={slide.callout} delay={T.content + extra} className="mt-7" />}
    </SlideFrame>
  );
}
