"use client";

import { animate, motion, useMotionValue, useTransform, type HTMLMotionProps } from "motion/react";
import { Fragment, useEffect } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared timing so every slide builds in the same rhythm. */
export const T = {
  eyebrow: 0.12,
  title: 0.22,
  subtitle: 0.5,
  visual: 0.3,
  content: 0.62,
  step: 0.11,
};

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "animate"> & {
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  duration?: number;
};

export function Reveal({
  delay = 0,
  y = 26,
  x = 0,
  blur = true,
  duration = 0.85,
  transition,
  children,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }}
      animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE, ...transition }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Words rise out of a mask one after another. */
export function SplitWords({
  text,
  delay = 0,
  stagger = 0.045,
  className,
  wordClassName,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              initial={{ y: "115%", rotate: 3 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.95, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Animated number that counts up once on mount. */
export function CountUp({
  to,
  delay = 0,
  duration = 1.6,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  delay?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${v.toFixed(decimals)}${suffix}`);
  useEffect(() => {
    const c = animate(mv, to, { duration, delay, ease: EASE });
    return () => c.stop();
  }, [mv, to, delay, duration]);
  return <motion.span className="tabular">{text}</motion.span>;
}

/** Keeps mixed-case medical abbreviations intact inside uppercase labels. */
export function KeepCase({ text }: { text: string }) {
  const parts = text.split(/\b(aSAH|SeLECT|cEEG|eGFR|ASMs?)\b/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <span key={i} className="normal-case">
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Renders **bold** segments inside data strings. */
export function Rich({ text, strongClassName }: { text: string; strongClassName?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className={strongClassName ?? "font-semibold text-ink"}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
