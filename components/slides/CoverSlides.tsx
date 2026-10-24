"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ClosingSlide, CoverSlide } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { EASE, Reveal, SplitWords } from "@/components/ui/motion";

function CoverBackdrop() {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE }}
      >
        <Image src="/images/cover.png" alt="" fill preload sizes="100vw" className="cover-img object-cover" />
      </motion.div>
      {/* soften the left half so the type sits on calm paper */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/30 to-transparent" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-[28%] bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-overlay"
        initial={{ x: "-40%" }}
        animate={{ x: "420%" }}
        transition={{ duration: 3.2, delay: 1.2, ease: "easeInOut" }}
      />
    </>
  );
}

function Presenters({ names, delay }: { names: string[]; delay: number }) {
  return (
    <div>
      <Reveal delay={delay} y={10} blur={false} className="flex items-center gap-4">
        <span className="font-mono text-[14px] tracking-[0.34em] text-gold-ink uppercase">Presented by</span>
        <motion.span
          className="h-px w-24 origin-left bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: EASE }}
        />
      </Reveal>
      <div className="mt-5 flex items-stretch">
        {names.map((n, i) => (
          <Reveal
            key={n}
            delay={delay + 0.2 + i * 0.14}
            y={16}
            className={`pr-9 ${i > 0 ? "border-l border-wine/20 pl-9" : ""}`}
          >
            <span className="font-display text-[29px] leading-tight text-ink">{n}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function CoverLayout({ slide }: { slide: CoverSlide }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CoverBackdrop />
      <div className="relative z-10 flex h-full max-w-[1120px] flex-col pt-[132px] pl-[132px]">
        <Reveal delay={0.4} y={12} blur={false} className="flex items-center gap-5">
          <span className="grid size-11 place-items-center rounded-full border border-wine/30 text-wine">
            <Icon name="brain" size={22} />
          </span>
          <span className="font-mono text-[16px] tracking-[0.36em] text-wine uppercase">{slide.eyebrow}</span>
        </Reveal>

        <h1
          className="font-display mt-10 text-[118px] leading-[0.98] font-[440] text-wine"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          <SplitWords text={slide.titleTop} delay={0.55} stagger={0.09} />
          <br />
          <SplitWords text={slide.titleBottom} delay={0.85} className="text-gold-ink italic" />
        </h1>

        <Reveal delay={1.15} className="mt-8 text-[29px] leading-snug text-muted">
          {slide.tagline}
        </Reveal>

        <Reveal delay={1.3} y={12} className="mt-7">
          <span className="inline-flex items-center gap-3 rounded-full border border-wine/20 bg-surface px-5 py-2.5 text-[19px] font-medium text-wine">
            <Icon name="timer" size={20} />
            {slide.duration}
          </span>
        </Reveal>

        <div className="mt-12">
          <Presenters names={slide.presenters} delay={1.5} />
        </div>
      </div>

      <Reveal
        delay={2.1}
        y={8}
        blur={false}
        className="absolute bottom-[46px] left-[132px] z-10 font-mono text-[14px] tracking-[0.18em] text-white/75 uppercase"
      >
        {slide.footnote}
      </Reveal>
    </div>
  );
}

export function ClosingLayout({ slide }: { slide: ClosingSlide }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CoverBackdrop />
      <div className="relative z-10 flex h-full max-w-[1100px] flex-col pt-[170px] pl-[132px]">
        <Reveal delay={0.3} y={12} blur={false} className="flex items-center gap-5">
          <motion.span
            className="h-px w-20 origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          />
          <span className="font-mono text-[16px] tracking-[0.36em] text-wine uppercase">Post-Stroke Seizure Management</span>
        </Reveal>
        <h1
          className="font-display mt-10 text-[168px] leading-[0.95] font-[420] text-wine"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          <SplitWords text="Thank" delay={0.5} />{" "}
          <SplitWords text="you" delay={0.62} className="text-gold-ink italic" />
        </h1>
        <Reveal delay={1} className="mt-8 flex items-center gap-4 text-[34px] text-muted">
          <Icon name="question" size={34} className="text-gold-ink" />
          {slide.subtitle}
        </Reveal>
        <div className="mt-16">
          <Presenters names={slide.presenters} delay={1.3} />
        </div>
      </div>
    </div>
  );
}
