"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { sections } from "@/lib/deck";
import type { Callout as CalloutData, IconName, Slide, Tone } from "@/lib/types";
import { Illustration } from "@/components/illustrations/Illustration";
import { Icon } from "@/components/ui/Icon";
import { EASE, KeepCase, Reveal, Rich, SplitWords, T } from "@/components/ui/motion";

/** "SeLECT score: original model" → ["SeLECT score:", "original model"] */
function splitTitle(title: string): [string, string | null] {
  for (const sep of [": ", " — ", " · "]) {
    const at = title.indexOf(sep);
    if (at > 0) return [title.slice(0, at) + sep.trimEnd(), title.slice(at + sep.length)];
  }
  return [title, null];
}

export function Eyebrow({ num, name, delay = T.eyebrow }: { num: string; name: string; delay?: number }) {
  return (
    <Reveal delay={delay} y={10} blur={false} className="flex items-center gap-5">
      {num && <span className="font-display text-[30px] leading-none italic text-gold-ink">{num}</span>}
      <motion.span
        className="h-px w-16 origin-left bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: EASE }}
      />
      <span className="font-mono text-[15px] tracking-[0.32em] text-subtle uppercase">
        <KeepCase text={name} />
      </span>
    </Reveal>
  );
}

export function SlideHeader({ slide, hideVisual }: { slide: Slide; hideVisual?: boolean }) {
  const sec = sections[slide.section];
  const [main, accent] = splitTitle(slide.title);
  const mainWords = main.split(" ").length;
  return (
    <header className="flex items-start justify-between gap-14">
      <div className="min-w-0 flex-1">
        <Eyebrow num={sec.num} name={sec.name} />
        <h2
          className="font-display mt-6 max-w-[1400px] text-[66px] leading-[1.06] font-[460] text-ink"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          <SplitWords text={main} delay={T.title} />
          {accent && (
            <>
              {" "}
              <SplitWords text={accent} delay={T.title + mainWords * 0.045} className="text-wine italic" />
            </>
          )}
        </h2>
        {slide.subtitle && (
          <Reveal delay={T.subtitle} className="mt-5 max-w-[1300px] text-[27px] leading-snug text-muted">
            {slide.subtitle}
          </Reveal>
        )}
      </div>
      {!hideVisual && slide.visual && (
        <Reveal delay={T.visual} y={0} blur={false} className="-mt-8 -mr-6 shrink-0">
          <Illustration name={slide.visual} size={212} />
        </Reveal>
      )}
    </header>
  );
}

export function SlideFrame({
  slide,
  children,
  hideVisual,
}: {
  slide: Slide;
  children: ReactNode;
  hideVisual?: boolean;
}) {
  return (
    <div className="absolute inset-0 flex flex-col px-[112px] pt-[72px] pb-[118px]">
      <SlideHeader slide={slide} hideVisual={hideVisual} />
      <div className="relative mt-9 flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

type CardProps = Omit<HTMLMotionProps<"div">, "initial" | "animate"> & {
  tone?: Tone;
  delay?: number;
  hover?: boolean;
  accent?: boolean;
};

export function Card({ tone = "wine", delay = T.content, hover = true, accent = true, className = "", children, ...rest }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={`tone-${tone} relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-(--shadow-card) ${
        hover ? "transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-(--shadow-lift)" : ""
      } ${className}`}
      {...rest}
    >
      {accent && (
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-(--tone) via-(--tone)/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: delay + 0.25, ease: EASE }}
        />
      )}
      {children as ReactNode}
    </motion.div>
  );
}

export function IconBadge({ icon, size = 60, iconSize = 28 }: { icon: IconName; size?: number; iconSize?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[18px] bg-(--tone-soft) text-(--tone-ink) ring-1 ring-(--tone)/20"
      style={{ width: size, height: size }}
    >
      <Icon name={icon} size={iconSize} />
    </span>
  );
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[15px] tracking-[0.24em] text-(--tone-ink) uppercase ${className}`}>
      {typeof children === "string" ? <KeepCase text={children} /> : children}
    </span>
  );
}

export function Bullet() {
  return <span aria-hidden className="mt-[0.62em] size-[9px] shrink-0 rotate-45 rounded-[2px] bg-(--tone)" />;
}

const CALLOUT: Record<CalloutData["tone"], { tone: Tone; icon: IconName; label: string }> = {
  caution: { tone: "gold", icon: "alert", label: "Caution" },
  danger: { tone: "wine", icon: "siren", label: "Safety" },
  info: { tone: "teal", icon: "lightbulb", label: "Key point" },
  pearl: { tone: "gold", icon: "sparkles", label: "Pearl" },
};

export function Callout({ callout, delay, className = "" }: { callout: CalloutData; delay: number; className?: string }) {
  const c = CALLOUT[callout.tone];
  return (
    <Reveal
      delay={delay}
      y={18}
      className={`tone-${c.tone} relative flex shrink-0 items-center gap-6 overflow-hidden rounded-[22px] border border-(--tone)/35 bg-(--tone-soft) px-8 py-[18px] ${className}`}
    >
      <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-(--tone) text-bg">
        <span className="absolute inset-0 rounded-full bg-(--tone) animate-ring-out" />
        <Icon name={c.icon} size={22} strokeWidth={2} className="relative" />
      </span>
      <span className="font-mono text-[14px] tracking-[0.24em] text-(--tone-ink) uppercase">{c.label}</span>
      <span aria-hidden className="h-7 w-px bg-(--tone)/40" />
      <p className="text-[24px] leading-snug text-ink">
        <Rich text={callout.text} strongClassName="font-semibold text-(--tone-ink)" />
      </p>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "420%" }}
        transition={{ duration: 1.8, delay: delay + 0.5, ease: "easeInOut" }}
      />
    </Reveal>
  );
}
