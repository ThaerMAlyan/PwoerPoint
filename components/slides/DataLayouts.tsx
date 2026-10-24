"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { FigureSlide, IncidenceSlide, ScoreSlide, SevenDaySlide } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { CountUp, EASE, Reveal, Rich, T } from "@/components/ui/motion";
import { Bullet, Callout, Card, IconBadge, Label, SlideFrame, SlideHeader } from "./parts";

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

/* ───────────────────────── Figure: a picture taken unchanged from the source deck ───────────────────────── */

const MATTE = 14;

/** Largest frame (matte included) that fits the box without cropping or distorting the picture. */
function fit(image: FigureSlide["image"], maxW: number, maxH: number) {
  const s = Math.min((maxW - 2 * MATTE) / image.width, (maxH - 2 * MATTE) / image.height);
  return { width: Math.round(image.width * s) + 2 * MATTE, height: Math.round(image.height * s) + 2 * MATTE };
}

function Picture({ image, maxW, maxH }: { image: FigureSlide["image"]; maxW: number; maxH: number }) {
  return (
    <Reveal
      delay={T.content}
      y={30}
      className="shrink-0 rounded-[28px] border border-line bg-white shadow-(--shadow-lift)"
      style={{ ...fit(image, maxW, maxH), padding: MATTE - 1 }}
    >
      <div className="h-full w-full overflow-hidden rounded-[16px]">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, delay: T.content, ease: EASE }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            unoptimized
            loading="eager"
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </Reveal>
  );
}

export function FigureLayout({ slide }: { slide: FigureSlide }) {
  const { image } = slide;
  // tall pictures sit beside the title (as on the PPTX slide), wide ones below it
  if (image.width / image.height < 1.4) {
    return (
      <div className="absolute inset-0 flex gap-12 px-[112px]">
        <div className="w-[500px] shrink-0 pt-[72px]">
          <SlideHeader slide={slide} hideVisual />
        </div>
        <div className="flex flex-1 items-center justify-center pt-[48px] pb-[92px]">
          <Picture image={image} maxW={1920 - 224 - 500 - 48} maxH={1080 - 48 - 92} />
        </div>
      </div>
    );
  }
  return (
    <SlideFrame slide={slide} hideVisual>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <Picture image={image} maxW={1696} maxH={720} />
      </div>
    </SlideFrame>
  );
}
