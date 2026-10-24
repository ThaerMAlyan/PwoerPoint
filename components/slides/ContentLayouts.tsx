"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { sections, sectionStart, TOPIC_SECTIONS } from "@/lib/deck";
import type {
  CardsSlide,
  CaseSlide,
  ColumnsSlide,
  DrugsSlide,
  ReferencesSlide,
  RoadmapSlide,
  StepsSlide,
  Tone,
} from "@/lib/types";
import { useDeckNav } from "@/components/deck/nav";
import { Icon } from "@/components/ui/Icon";
import { EASE, Reveal, Rich, T } from "@/components/ui/motion";
import { Bullet, Callout, Card, IconBadge, Label, SlideFrame } from "./parts";

/* ───────────────────────── Roadmap ───────────────────────── */

export function RoadmapLayout({ slide }: { slide: RoadmapSlide }) {
  const go = useDeckNav();
  const topics = TOPIC_SECTIONS.filter((id) => id !== "A");
  return (
    <SlideFrame slide={slide}>
      <div className="grid flex-1 grid-cols-4 grid-rows-3 gap-5">
        {topics.map((id, i) => (
          <motion.button
            key={id}
            type="button"
            onClick={() => go(sectionStart[id] ?? 0)}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: T.content + (i % 4) * 0.07 + Math.floor(i / 4) * 0.16, ease: EASE }}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-surface p-7 text-left shadow-(--shadow-card) transition-[translate,box-shadow,background-color] duration-500 hover:-translate-y-1.5 hover:bg-surface-solid hover:shadow-(--shadow-lift)"
          >
            <span className="font-display text-[46px] leading-none text-gold-ink italic">{sections[id].num}</span>
            <span className="pr-8 text-[25px] leading-snug font-semibold text-ink">{sections[id].name}</span>
            <ArrowUpRight
              aria-hidden
              size={26}
              className="absolute top-7 right-7 text-wine opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
            <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-wine to-gold transition-all duration-700 group-hover:w-full" />
          </motion.button>
        ))}
      </div>
      <Reveal delay={T.content + 0.7} y={10} className="mt-6 flex items-center gap-4 text-[20px] text-subtle">
        <Icon name="clipboard" size={22} className="text-gold-ink" />
        {slide.note}
      </Reveal>
    </SlideFrame>
  );
}

/* ───────────────────────── Cards (2×2) ───────────────────────── */

export function CardsLayout({ slide }: { slide: CardsSlide }) {
  const n = slide.cards.length;
  return (
    <SlideFrame slide={slide}>
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-7">
        {slide.cards.map((c, i) => (
          <Card key={c.label} tone={c.tone} delay={T.content + i * T.step} className="flex items-center gap-8 px-10 py-9">
            <IconBadge icon={c.icon} size={76} iconSize={34} />
            <div className="min-w-0 flex-1 pr-6">
              <Label className="text-[16px]!">{c.label}</Label>
              <p className="mt-4 text-[30px] leading-[1.38] text-muted">
                <Rich text={c.text} />
              </p>
            </div>
            <span className="font-display absolute top-6 right-8 text-[22px] text-subtle/70 italic">0{i + 1}</span>
          </Card>
        ))}
      </div>
      {slide.callout && <Callout callout={slide.callout} delay={T.content + n * T.step + 0.2} className="mt-7" />}
    </SlideFrame>
  );
}

/* ───────────────────────── Two columns ───────────────────────── */

export function ColumnsLayout({ slide }: { slide: ColumnsSlide }) {
  const dense = slide.columns.some((c) => c.items.length > 4) || Boolean(slide.subtitle);
  return (
    <SlideFrame slide={slide}>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-8">
        {slide.columns.map((col, ci) => {
          const base = T.content + ci * 0.16;
          const numeric = col.tag && /\d/.test(col.tag);
          return (
            <Card key={col.label} tone={col.tone} delay={base} className="flex flex-col px-10 pt-9 pb-6">
              <div className="flex items-center gap-5 border-b border-hair pb-6">
                <IconBadge icon={col.icon} />
                <h3 className="font-display text-[36px] leading-tight text-ink">{col.label}</h3>
                {col.tag &&
                  (numeric ? (
                    <span className="font-display ml-auto text-[40px] leading-none text-(--tone-ink) italic">{col.tag}</span>
                  ) : (
                    <span className="ml-auto rounded-full bg-(--tone-soft) px-4 py-1.5 font-mono text-[14px] tracking-[0.2em] text-(--tone-ink) uppercase">
                      {col.tag}
                    </span>
                  ))}
              </div>
              <ul className="flex flex-1 flex-col justify-evenly">
                {col.items.map((it, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: base + 0.3 + i * 0.09, ease: EASE }}
                    className={`flex gap-5 ${dense ? "py-2 text-[24px]" : "py-3 text-[26px]"} leading-[1.42] text-muted`}
                  >
                    <Bullet />
                    <span>
                      <Rich text={it} />
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
      {slide.callout && <Callout callout={slide.callout} delay={T.content + 1} className="mt-7" />}
    </SlideFrame>
  );
}

/* ───────────────────────── Drugs ───────────────────────── */

const DRUG_TONES: Tone[] = ["teal", "gold", "wine", "teal"];

export function DrugsLayout({ slide }: { slide: DrugsSlide }) {
  return (
    <SlideFrame slide={slide}>
      <div className="grid min-h-0 flex-1 grid-cols-4 gap-6">
        {slide.drugs.map((d, i) => {
          const delay = T.content + i * 0.12;
          return (
            <Card key={d.name} tone={DRUG_TONES[i]} delay={delay} className="flex flex-col p-8">
              <div className="flex items-center justify-between">
                <IconBadge icon="pill" />
                <span className="font-display text-[24px] text-subtle/70 italic">0{i + 1}</span>
              </div>
              <h3 className="font-display mt-7 text-[38px] leading-none text-ink">{d.name}</h3>
              <div className="mt-8 grid flex-1 grid-rows-2 gap-4">
                <Reveal delay={delay + 0.35} y={14} className="flex flex-col justify-center rounded-[20px] border border-teal/20 bg-teal-soft p-6">
                  <span className="flex items-center gap-2 font-mono text-[13px] tracking-[0.22em] text-teal uppercase">
                    <Icon name="check" size={17} strokeWidth={2} /> Advantage
                  </span>
                  <p className="mt-2 text-[23px] leading-snug text-ink">{d.plus}</p>
                </Reveal>
                <Reveal delay={delay + 0.5} y={14} className="flex flex-col justify-center rounded-[20px] border border-wine/20 bg-wine-soft p-6">
                  <span className="flex items-center gap-2 font-mono text-[13px] tracking-[0.22em] text-wine uppercase">
                    <Icon name="alert" size={17} strokeWidth={2} /> Caution
                  </span>
                  <p className="mt-2 text-[23px] leading-snug text-ink">{d.minus}</p>
                </Reveal>
              </div>
            </Card>
          );
        })}
      </div>
      {slide.callout && <Callout callout={slide.callout} delay={T.content + 0.9} className="mt-7" />}
    </SlideFrame>
  );
}

/* ───────────────────────── Clinical case ───────────────────────── */

export function CaseLayout({ slide }: { slide: CaseSlide }) {
  return (
    <SlideFrame slide={slide}>
      <div className="grid min-h-0 flex-1 grid-cols-[1.28fr_1fr] gap-8">
        <Card tone="teal" delay={T.content} className="flex flex-col p-10">
          <div className="flex items-center gap-4">
            <IconBadge icon="user" size={52} iconSize={24} />
            <Label>Case presentation</Label>
          </div>
          <div className="mt-7 grid grid-cols-4 gap-4">
            {slide.facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={T.content + 0.25 + i * 0.08}
                y={14}
                className="rounded-[18px] border border-line bg-surface-solid px-5 py-4"
              >
                <div className="font-display text-[38px] leading-none text-wine">{f.value}</div>
                <div className="mt-2 font-mono text-[12px] tracking-[0.18em] text-subtle uppercase">{f.label}</div>
              </Reveal>
            ))}
          </div>
          <ul className="mt-5 flex flex-1 flex-col justify-evenly">
            {slide.presentation.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: T.content + 0.6 + i * 0.1, ease: EASE }}
                className="flex gap-5 text-[23px] leading-[1.42] text-muted"
              >
                <Bullet />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card tone="wine" delay={T.content + 0.2} className="flex flex-col bg-wine-soft! p-10">
          <div className="flex items-center gap-4">
            <IconBadge icon="question" size={52} iconSize={24} />
            <Label>Ask the room</Label>
          </div>
          <ol className="mt-4 flex flex-1 flex-col justify-evenly divide-y divide-wine/10">
            {slide.questions.map((q, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: T.content + 0.9 + i * 0.16, ease: EASE }}
                className="flex items-baseline gap-6 py-4"
              >
                <span className="font-display w-12 shrink-0 text-[30px] text-gold-ink italic">Q{i + 1}</span>
                <span className="text-[25px] leading-snug font-medium text-ink">{q}</span>
              </motion.li>
            ))}
          </ol>
        </Card>
      </div>
    </SlideFrame>
  );
}

/* ───────────────────────── Status: first five minutes ───────────────────────── */

function TimerRing({ ring, delay }: { ring: StepsSlide["ring"]; delay: number }) {
  const r = 150;
  const c = 2 * Math.PI * r;
  return (
    <Reveal delay={delay} y={0} className="relative grid place-items-center">
      <svg viewBox="0 0 360 360" className="w-[380px] overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--c-teal)" }} />
            <stop offset="55%" style={{ stopColor: "var(--c-gold)" }} />
            <stop offset="100%" style={{ stopColor: "var(--c-wine)" }} />
          </linearGradient>
        </defs>
        <circle cx={180} cy={180} r={r} fill="none" className="s-hair" strokeWidth={14} />
        <circle cx={180} cy={180} r={r - 26} className="f-surface s-hair" strokeWidth={1} />
        {Array.from({ length: 60 }).map((_, k) => {
          const a = (k / 60) * Math.PI * 2;
          const major = k % 12 === 0;
          const r1 = r - 34;
          const r2 = major ? r - 48 : r - 40;
          return (
            <line
              key={k}
              x1={180 + r1 * Math.sin(a)}
              y1={180 - r1 * Math.cos(a)}
              x2={180 + r2 * Math.sin(a)}
              y2={180 - r2 * Math.cos(a)}
              className={major ? "s-wine" : "s-gold"}
              strokeWidth={major ? 2.4 : 1}
              strokeOpacity={major ? 0.9 : 0.5}
            />
          );
        })}
        <motion.circle
          cx={180}
          cy={180}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 5, delay: delay + 0.3, ease: "linear" }}
          transform="rotate(-90 180 180)"
        />
        {[0, 1, 2, 3, 4].map((m) => {
          const a = (m / 5) * Math.PI * 2;
          return (
            <motion.circle
              key={m}
              cx={180 + r * Math.sin(a)}
              cy={180 - r * Math.cos(a)}
              r={7}
              className="f-surface s-wine"
              strokeWidth={2.4}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3 + m, type: "spring", stiffness: 300, damping: 14 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[14px] tracking-[0.3em] text-subtle uppercase">{ring.label}</span>
        <span className="font-display mt-1 text-[104px] leading-none text-wine">{ring.value}</span>
        <span className="mt-2 text-[20px] text-muted">{ring.caption}</span>
      </div>
    </Reveal>
  );
}

export function StepsLayout({ slide }: { slide: StepsSlide }) {
  return (
    <SlideFrame slide={slide} hideVisual>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_420px] items-center gap-16">
        <ol className="relative flex h-full flex-col justify-between py-1">
          <motion.span
            aria-hidden
            className="absolute top-8 bottom-8 left-[31px] w-[2px] origin-top bg-gradient-to-b from-wine via-gold to-teal"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, delay: T.content, ease: EASE }}
          />
          {slide.steps.map((s, i) => (
            <Reveal key={i} delay={T.content + 0.15 + i * 0.14} x={-22} y={0} className="relative flex items-center gap-7">
              <span className="font-display relative z-10 grid size-16 shrink-0 place-items-center rounded-full border border-line bg-surface-solid text-[28px] text-wine italic shadow-(--shadow-card)">
                {i + 1}
              </span>
              <div className="flex flex-1 items-center gap-6 rounded-[22px] border border-line bg-surface px-7 py-[18px] shadow-(--shadow-card)">
                <Icon name={s.icon} size={28} className="shrink-0 text-gold-ink" />
                <p className="text-[24px] leading-[1.4] text-muted">
                  <Rich text={s.text} strongClassName="font-semibold text-wine" />
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
        <TimerRing ring={slide.ring} delay={T.content + 0.2} />
      </div>
    </SlideFrame>
  );
}

/* ───────────────────────── References ───────────────────────── */

function splitRef(ref: string) {
  const id = ref.match(/\s(doi:\S+|PMID:\S+)$/);
  const body = id ? ref.slice(0, id.index) : ref;
  const cut = body.indexOf(". ");
  return {
    author: cut > 0 ? body.slice(0, cut + 1) : "",
    rest: cut > 0 ? body.slice(cut + 2) : body,
    id: id?.[1],
  };
}

export function ReferencesLayout({ slide }: { slide: ReferencesSlide }) {
  return (
    <SlideFrame slide={slide}>
      <div className="tone-gold flex min-h-0 flex-1 flex-col">
        <Reveal delay={T.content - 0.1} y={10} className="flex items-baseline justify-between border-b border-gold/40 pb-4">
          <Label>{slide.group}</Label>
          <span className="font-display text-[26px] text-subtle italic">{slide.page}</span>
        </Reveal>
        <ol className="flex flex-1 flex-col justify-evenly divide-y divide-hair">
          {slide.refs.map((r, i) => {
            const { author, rest, id } = splitRef(r);
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: T.content + i * 0.09, ease: EASE }}
                className="flex items-baseline gap-8 py-3"
              >
                <span className="font-display w-12 shrink-0 text-[32px] text-gold-ink italic">0{i + 1}</span>
                <p className="text-[23px] leading-[1.45] text-muted">
                  {author && <span className="font-semibold text-ink">{author} </span>}
                  {rest}
                  {id && <span className="ml-3 font-mono text-[16px] whitespace-nowrap text-subtle">{id}</span>}
                </p>
              </motion.li>
            );
          })}
        </ol>
        <Reveal delay={T.content + 0.7} y={6} blur={false} className="pt-3 font-mono text-[14px] tracking-[0.18em] text-subtle uppercase">
          References listed in the user-supplied lecture PDF
        </Reveal>
      </div>
    </SlideFrame>
  );
}

