"use client";

import { motion, type SVGMotionProps } from "motion/react";
import type { ReactNode } from "react";
import type { Visual } from "@/lib/types";
import { EASE, T } from "@/components/ui/motion";

/* Fine-line medical illustrations in the cover image's style:
   burgundy line work, antique-gold accents, thin orbit rings.
   Every stroke draws itself on, then a quiet loop keeps it alive. */

const B = T.visual;

type PathProps = SVGMotionProps<SVGPathElement> & { i?: number; w?: number; dur?: number };

function P({ i = 0, w = 2.2, dur = 1.5, className = "s-wine", ...rest }: PathProps) {
  return (
    <motion.path
      fill="none"
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: dur, delay: B + i * 0.11, ease: EASE },
        opacity: { duration: 0.25, delay: B + i * 0.11 },
      }}
      {...rest}
    />
  );
}

type CircleProps = SVGMotionProps<SVGCircleElement> & { i?: number; w?: number };

function C({ i = 0, w = 2.2, className = "s-wine", fill = "none", ...rest }: CircleProps) {
  return (
    <motion.circle
      fill={fill}
      strokeWidth={w}
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 1.3, delay: B + i * 0.11, ease: EASE },
        opacity: { duration: 0.3, delay: B + i * 0.11 },
      }}
      {...rest}
    />
  );
}

/** Fades/scales a group in after the line work. */
function Pop({ i = 0, children, className }: { i?: number; children: ReactNode; className?: string }) {
  return (
    <motion.g
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: B + i * 0.11, ease: EASE }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {children}
    </motion.g>
  );
}

function Frame({ children, size }: { children: ReactNode; size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 overflow-visible">
        <defs>
          <radialGradient id="illo-halo" cx="50%" cy="45%" r="55%">
            <stop offset="0%" style={{ stopColor: "var(--c-gold)", stopOpacity: 0.22 }} />
            <stop offset="70%" style={{ stopColor: "var(--c-gold)", stopOpacity: 0.06 }} />
            <stop offset="100%" style={{ stopColor: "var(--c-gold)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <motion.circle
          cx={100}
          cy={100}
          r={92}
          fill="url(#illo-halo)"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: B - 0.1, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: B + 0.2 }}
        >
          <g className="animate-spin-slow" style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}>
            <circle cx={100} cy={100} r={97} fill="none" className="s-gold" strokeWidth={0.9} strokeDasharray="1 5" strokeLinecap="round" />
            <circle cx={197} cy={100} r={2.6} className="f-gold" />
          </g>
          <g className="animate-spin-mid" style={{ transformBox: "view-box", transformOrigin: "100px 100px", animationDirection: "reverse" }}>
            <circle cx={100} cy={100} r={86} fill="none" className="s-wine" strokeWidth={0.6} strokeOpacity={0.35} strokeDasharray="40 260" />
          </g>
        </motion.g>
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 overflow-visible animate-float">
        {children}
      </svg>
    </div>
  );
}

/* ───────────────────────── Art ───────────────────────── */

const BRAIN =
  "M58 118 C40 116 32 98 40 86 C32 72 42 54 60 54 C62 40 80 32 94 38 C104 28 126 28 136 40 C152 38 166 50 164 66 C176 74 176 94 164 102 C166 116 152 126 138 122 C130 132 112 134 102 126 C92 132 74 130 70 120 C66 122 61 121 58 118 Z";

function Brain() {
  return (
    <>
      <circle cx={100} cy={80} r={20} className="f-wine-soft animate-pulse-soft" />
      <P d={BRAIN} i={0} dur={2} w={2.4} />
      <P d="M52 88 C62 82 72 86 74 96" i={2} w={1.6} />
      <P d="M64 64 C74 62 80 70 78 80" i={3} w={1.6} />
      <P d="M124 44 C120 56 128 66 140 64" i={4} w={1.6} />
      <P d="M150 74 C140 78 140 90 150 94" i={5} w={1.6} />
      <P d="M88 108 C96 98 110 100 112 112" i={6} w={1.6} />
      <P d="M132 98 C124 106 128 114 136 116" i={7} w={1.6} />
      <P d="M66 104 C84 96 104 90 128 86" i={4} w={1.6} />
      <P d="M114 128 C116 142 118 154 122 166" i={8} w={2.2} />
      <P d="M126 126 C130 136 142 140 150 132" i={8} w={1.8} />
      <P d="M104 58 L90 80 L102 80 L92 102" i={9} w={2.8} className="s-gold" />
      <Pop i={11}>
        <path d="M80 62 l-7 -5 M112 66 l8 -4 M84 104 l-6 6 M110 96 l8 5" className="s-gold" strokeWidth={1.6} strokeLinecap="round" />
      </Pop>
    </>
  );
}

const AXON_AB = "M67 72 C90 80 112 56 133 64";
const AXON_AC = "M62 81 C70 110 86 132 100 138";
const AXON_BC = "M138 73 C130 96 124 116 114 132";

function Neurons() {
  return (
    <>
      <P d={AXON_AB} i={3} className="s-gold" w={1.8} />
      <P d={AXON_AC} i={4} className="s-gold" w={1.8} />
      <P d={AXON_BC} i={5} className="s-gold" w={1.8} />
      {[
        { x: 58, y: 72, d: ["M58 63 C56 52 48 46 40 44", "M50 68 C42 64 34 66 28 72", "M52 80 C46 88 38 90 32 96"] },
        { x: 142, y: 64, d: ["M146 55 C150 44 160 40 170 40", "M151 68 C160 70 168 76 172 84", "M136 57 C132 48 132 40 136 32"] },
        { x: 108, y: 140, d: ["M112 149 C114 160 110 168 104 174", "M117 142 C128 146 136 156 140 164", "M99 145 C90 150 84 158 82 166"] },
      ].map((n, k) => (
        <g key={k}>
          <C cx={n.x} cy={n.y} r={9} i={k} className="s-wine f-wine-soft" w={2.2} />
          {n.d.map((d, j) => (
            <P key={j} d={d} i={k + j + 1} w={1.6} />
          ))}
        </g>
      ))}
      {[AXON_AB, AXON_AC, AXON_BC].map((path, k) => (
        <circle key={k} r={3.4} className="f-gold" opacity={0}>
          <animateMotion dur="2.6s" begin={`${1.4 + k * 0.7}s`} repeatCount="indefinite" path={path} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.6s" begin={`${1.4 + k * 0.7}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </>
  );
}

function Gauge() {
  return (
    <>
      <P d="M38 122 A62 62 0 0 1 162 122" i={0} className="s-hair" w={12} />
      <P d="M40 114 A62 62 0 0 1 66 72" i={1} className="s-teal" w={9} />
      <P d="M74 66 A62 62 0 0 1 126 66" i={2} className="s-gold" w={9} />
      <P d="M134 72 A62 62 0 0 1 160 114" i={3} className="s-wine" w={9} />
      {Array.from({ length: 11 }).map((_, k) => {
        const a = Math.PI - (k * Math.PI) / 10;
        const r1 = 44;
        const r2 = k % 5 === 0 ? 36 : 40;
        return (
          <P
            key={k}
            i={4 + k * 0.2}
            w={1.4}
            className="s-ink"
            d={`M${100 + r1 * Math.cos(a)} ${122 - r1 * Math.sin(a)} L${100 + r2 * Math.cos(a)} ${122 - r2 * Math.sin(a)}`}
            strokeOpacity={0.5}
          />
        );
      })}
      <motion.path
        d="M96.5 122 L100 70 L103.5 122 Z"
        className="f-wine"
        initial={{ rotate: -84, opacity: 0 }}
        animate={{ rotate: 58, opacity: 1 }}
        transition={{ rotate: { type: "spring", stiffness: 40, damping: 9, delay: B + 0.7 }, opacity: { delay: B + 0.6 } }}
        style={{ originX: 0.5, originY: 1 }}
      />
      <Pop i={6}>
        <circle cx={100} cy={122} r={9} className="f-surface s-wine" strokeWidth={2.2} />
        <circle cx={100} cy={122} r={3} className="f-gold" />
      </Pop>
      <P d="M70 150 H130" i={8} className="s-gold" w={1.4} />
    </>
  );
}

const DROP = "M150 108 C150 108 143 118 143 122 a7 7 0 0 0 14 0 c0 -4 -7 -14 -7 -14 z";

function Vessel() {
  return (
    <>
      <P d="M100 176 C100 150 96 132 100 112" i={0} w={3.2} />
      <P d="M100 112 C88 96 70 90 56 70" i={1} w={2.6} />
      <P d="M100 112 C112 94 128 86 146 66" i={1} w={2.6} />
      <P d="M100 112 C100 96 102 80 98 58" i={2} w={2.2} />
      <P d="M74 88 C66 80 62 70 64 56" i={3} w={1.6} />
      <P d="M56 70 C50 62 42 58 34 58" i={3} w={1.4} />
      <P d="M98 58 C92 48 86 44 80 38" i={4} w={1.4} />
      <P d="M98 58 C104 48 112 44 120 38" i={4} w={1.4} />
      <P d="M146 66 C150 56 156 50 166 48" i={4} w={1.4} />
      <P d="M126 88 C138 82 148 82 160 86" i={4} w={1.4} />
      <Pop i={7}>
        <path
          d="M128 78 C134 70 146 72 148 80 C152 88 144 96 136 94 C128 94 122 86 128 78 Z"
          className="f-wine-soft s-wine animate-pulse-soft"
          strokeWidth={1.6}
        />
      </Pop>
      <motion.path
        d={DROP}
        className="f-wine"
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: [-6, 30], opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: B + 1.4, ease: "easeIn", repeatDelay: 0.6 }}
      />
      <C cx={100} cy={176} r={3} i={0} className="f-gold" w={0} />
    </>
  );
}

function Scan() {
  return (
    <>
      <defs>
        <clipPath id="scan-bore">
          <circle cx={100} cy={96} r={42} />
        </clipPath>
      </defs>
      <C cx={100} cy={96} r={70} i={0} w={2.6} />
      <C cx={100} cy={96} r={62} i={1} className="s-gold" w={1} />
      <C cx={100} cy={96} r={42} i={2} w={2} />
      <ellipse cx={100} cy={96} rx={26} ry={32} className="f-wine-soft" />
      <P d="M100 64 C126 64 128 90 126 100 C124 116 114 128 100 128 C86 128 76 116 74 100 C72 90 74 64 100 64 Z" i={3} w={1.8} />
      <P d="M100 66 V126" i={4} w={1.2} className="s-gold" />
      <P d="M92 90 C88 96 90 104 95 106" i={5} w={1.4} />
      <P d="M108 90 C112 96 110 104 105 106" i={5} w={1.4} />
      <circle cx={112} cy={84} r={5} className="f-wine animate-pulse-soft" opacity={0.7} />
      <g clipPath="url(#scan-bore)">
        <motion.rect
          x={50}
          width={100}
          height={2.4}
          className="f-gold"
          initial={{ y: 56 }}
          animate={{ y: [56, 136, 56] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: B + 1 }}
        />
      </g>
      <P d="M54 152 L44 176 M146 152 L156 176 M34 178 H166" i={6} w={2} />
    </>
  );
}

function waveSpike(x0: number, x1: number, y: number) {
  let d = `M${x0} ${y}`;
  for (let x = x0; x <= x1; x += 4) {
    const k = (x - x0) / (x1 - x0);
    const spike = Math.abs(k - 0.3) < 0.02 || Math.abs(k - 0.72) < 0.02;
    d += ` L${x} ${(y + (spike ? -14 : Math.sin(x / 4) * 3)).toFixed(1)}`;
  }
  return d;
}
function waveSine(x0: number, x1: number, y: number, amp: number, period: number) {
  let d = `M${x0} ${y}`;
  for (let x = x0; x <= x1; x += 2) d += ` L${x} ${(y + Math.sin(((x - x0) / period) * Math.PI * 2) * amp).toFixed(1)}`;
  return d;
}

function Eeg() {
  const loop = (k: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: [0, 1, 1], opacity: [1, 1, 0] },
    transition: { duration: 3.2, times: [0, 0.8, 1], repeat: Infinity, delay: B + 0.8 + k * 0.25, ease: "linear" as const },
  });
  return (
    <>
      <motion.rect
        x={32}
        y={44}
        width={136}
        height={96}
        rx={14}
        className="s-wine f-surface"
        strokeWidth={2.4}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: B, ease: EASE }}
      />
      <P d="M100 140 V158 M76 162 H124" i={2} w={2.4} />
      {[70, 92, 114].map((y, k) => (
        <path key={k} d={`M44 ${y} H156`} className="s-hair" strokeWidth={1} />
      ))}
      <motion.path d={waveSpike(44, 156, 70)} fill="none" className="s-wine" strokeWidth={1.8} strokeLinejoin="round" {...loop(0)} />
      <motion.path d={waveSine(44, 156, 92, 5, 18)} fill="none" className="s-gold" strokeWidth={1.8} {...loop(1)} />
      <motion.path d={waveSine(44, 156, 114, 7, 56)} fill="none" className="s-teal" strokeWidth={1.8} {...loop(2)} />
      <Pop i={6}>
        <circle cx={152} cy={54} r={3} className="f-wine animate-pulse-soft" />
      </Pop>
    </>
  );
}

function Flask() {
  return (
    <>
      <motion.path
        d="M66 130 C80 124 92 136 104 130 C116 124 126 134 138 130 L146 148 C150 158 144 166 134 166 L66 166 C56 166 50 158 54 148 Z"
        className="f-wine-soft"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: B + 0.8 }}
      />
      <P d="M86 40 L86 84 L54 148 C50 158 56 166 66 166 L134 166 C144 166 150 158 146 148 L114 84 L114 40" i={0} w={2.4} dur={2} />
      <P d="M78 40 H122" i={1} w={2.4} />
      <P d="M66 130 C80 124 92 136 104 130 C116 124 126 134 138 130" i={3} w={1.6} />
      <P d="M88 60 H98 M88 72 H96" i={4} w={1.4} className="s-gold" />
      {[{ x: 90, d: 0 }, { x: 108, d: 0.9 }, { x: 120, d: 1.7 }].map((b, k) => (
        <motion.circle
          key={k}
          cx={b.x}
          r={k === 1 ? 4 : 3}
          className="s-wine"
          fill="none"
          strokeWidth={1.4}
          initial={{ cy: 156, opacity: 0 }}
          animate={{ cy: [156, 118], opacity: [0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: B + 1.2 + b.d, ease: "easeOut" }}
        />
      ))}
      <P d="M150 46 l10 6 v12 l-10 6 l-10 -6 v-12 z" i={5} w={1.6} className="s-gold" />
      <P d="M160 64 l10 6" i={6} w={1.6} className="s-gold" />
    </>
  );
}

function Clipboard() {
  return (
    <>
      <motion.rect
        x={54} y={40} width={92} height={126} rx={12}
        className="s-wine f-surface" strokeWidth={2.4}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: B, ease: EASE }}
      />
      <motion.rect
        x={78} y={30} width={44} height={20} rx={6}
        className="s-gold f-surface" strokeWidth={2}
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: B + 0.4, ease: EASE }}
      />
      {[76, 100, 124].map((y, k) => (
        <g key={k}>
          <P d={`M68 ${y} l5 5 l9 -10`} i={3 + k * 1.2} className="s-gold" w={2.4} />
          <P d={`M92 ${y + 1} H${k === 2 ? 116 : 130}`} i={3.5 + k * 1.2} w={1.6} strokeOpacity={0.55} />
        </g>
      ))}
      <Pop i={8}>
        <circle cx={142} cy={150} r={20} className="f-surface s-gold" strokeWidth={2} />
        <path d="M142 150 V138 M142 150 L151 155" className="s-wine" strokeWidth={2} strokeLinecap="round" />
      </Pop>
    </>
  );
}

function Balance() {
  return (
    <>
      <P d="M100 54 V160" i={0} w={2.4} />
      <P d="M70 164 H130" i={1} w={2.6} />
      <C cx={100} cy={48} r={5} i={1} w={2} className="s-gold" />
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: B + 1.4 }}
        style={{ transformBox: "view-box", transformOrigin: "100px 64px" }}
      >
        <P d="M44 64 H156" i={2} w={2.4} />
        <P d="M52 64 L34 112 M52 64 L70 112" i={3} w={1.3} className="s-gold" />
        <P d="M148 64 L130 112 M148 64 L166 112" i={3} w={1.3} className="s-gold" />
        <P d="M28 112 Q52 134 76 112 Z" i={4} w={2} />
        <P d="M124 112 Q148 134 172 112 Z" i={4} w={2} />
        <Pop i={6}>
          <path d="M56 92 L48 104 L56 104 L50 114" className="s-wine" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Pop>
        <Pop i={7}>
          <circle cx={148} cy={104} r={7} className="f-teal-soft s-teal" strokeWidth={1.8} />
        </Pop>
      </motion.g>
    </>
  );
}

const ROUTE_MAIN = "M40 150 C76 134 76 102 100 96 C124 90 138 66 166 56";

function RouteArt() {
  return (
    <>
      <P d="M48 146 C78 132 78 102 100 96" i={0} w={2.4} />
      <P d="M106 92 C126 80 140 64 158 58" i={2} w={2.4} />
      <P d="M106 100 C126 112 140 128 158 132" i={2} w={2.4} className="s-teal" />
      <P d="M30 176 C70 170 130 182 176 160" i={1} w={1} className="s-gold" strokeDasharray="2 6" />
      <C cx={40} cy={150} r={8} i={0} w={2.4} className="s-gold f-surface" />
      <C cx={100} cy={96} r={6} i={1} w={2.4} className="s-wine f-surface" />
      <C cx={166} cy={56} r={9} i={3} w={2.4} className="s-wine f-wine-soft" />
      <C cx={166} cy={134} r={9} i={3} w={2.4} className="s-teal f-teal-soft" />
      <circle r={4} className="f-gold">
        <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path={ROUTE_MAIN} />
      </circle>
    </>
  );
}

function Stopwatch() {
  return (
    <>
      <C cx={100} cy={112} r={58} i={0} w={2.6} className="s-wine f-surface" />
      <C cx={100} cy={112} r={49} i={1} w={1} className="s-gold" />
      <P d="M92 44 H108 M100 44 V54" i={1} w={3} />
      <P d="M144 66 L152 58" i={2} w={3} />
      {Array.from({ length: 12 }).map((_, k) => {
        const a = (k * Math.PI) / 6;
        const r1 = 49;
        const r2 = k % 3 === 0 ? 40 : 44;
        return (
          <P
            key={k}
            i={2 + k * 0.12}
            w={k % 3 === 0 ? 2 : 1.2}
            d={`M${100 + r1 * Math.sin(a)} ${112 - r1 * Math.cos(a)} L${100 + r2 * Math.sin(a)} ${112 - r2 * Math.cos(a)}`}
          />
        );
      })}
      <P d="M100 63 A49 49 0 0 1 124.5 69.6" i={4} w={6} className="s-wine" strokeOpacity={0.35} />
      <g>
        <path d="M100 112 L100 72" className="s-gold" strokeWidth={2.6} strokeLinecap="round" />
        <animateTransform attributeName="transform" type="rotate" from="0 100 112" to="360 100 112" dur="6s" repeatCount="indefinite" />
      </g>
      <circle cx={100} cy={112} r={5} className="f-wine" />
    </>
  );
}

function SyringeArt() {
  return (
    <>
      <g transform="rotate(-35 100 100)">
        <motion.rect
          x={92} y={92} height={16} className="f-wine-soft"
          initial={{ width: 0 }} animate={{ width: [44, 30, 44] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: B + 1.2 }}
        />
        <motion.rect
          x={56} y={88} width={80} height={24} rx={5} fill="none" className="s-wine" strokeWidth={2.4}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: B, ease: EASE }}
        />
        <P d="M70 88 v8 M82 88 v5 M94 88 v8 M106 88 v5 M118 88 v8" i={3} w={1.3} className="s-gold" />
        <P d="M56 80 V120" i={2} w={2.6} />
        <motion.g
          animate={{ x: [0, 14, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: B + 1.2 }}
        >
          <P d="M78 100 H30 M30 86 V114" i={2} w={2.6} />
        </motion.g>
        <P d="M136 94 H146 V106 H136" i={4} w={2.2} />
        <P d="M146 100 H178" i={5} w={1.6} className="s-ink" />
      </g>
      <motion.path
        d="M163 60 C163 60 158 67 158 70 a5 5 0 0 0 10 0 c0 -3 -5 -10 -5 -10 z"
        className="f-wine"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 26] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: B + 1.6, ease: "easeIn", repeatDelay: 1.8 }}
      />
    </>
  );
}

function RadarArt() {
  return (
    <>
      {[0, 1.05, 2.1].map((d, k) => (
        <circle
          key={k}
          cx={100}
          cy={100}
          r={74}
          fill="none"
          className="s-wine animate-ring-out"
          strokeWidth={1.4}
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <C cx={100} cy={100} r={52} i={0} w={1} className="s-gold" strokeDasharray="2 5" />
      <g>
        <path d="M100 100 L100 26" className="s-gold" strokeWidth={1.6} strokeLinecap="round" opacity={0.8} />
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="5s" repeatCount="indefinite" />
      </g>
      <C cx={100} cy={100} r={26} i={1} w={2.4} className="s-wine f-surface" />
      <P d="M82 100 q4.5 -6 9 0 t9 0 t9 0 t9 0" i={3} w={1.8} className="s-gold" />
      {[
        { x: 138, y: 70, d: "0.4s" },
        { x: 62, y: 132, d: "1.6s" },
        { x: 146, y: 126, d: "2.8s" },
      ].map((p, k) => (
        <circle key={k} cx={p.x} cy={p.y} r={3.4} className="f-wine" opacity={0}>
          <animate attributeName="opacity" values="0;1;0" dur="5s" begin={p.d} repeatCount="indefinite" />
        </circle>
      ))}
    </>
  );
}

function Shield() {
  return (
    <>
      <motion.path
        d="M100 36 L150 54 V100 C150 132 128 154 100 166 C72 154 50 132 50 100 V54 Z"
        className="f-wine-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: B + 0.6 }}
      />
      <P d="M100 36 L150 54 V100 C150 132 128 154 100 166 C72 154 50 132 50 100 V54 Z" i={0} w={2.6} dur={2} />
      <P d="M100 50 L138 64 V100 C138 124 122 142 100 152 C78 142 62 124 62 100 V64 Z" i={2} w={1} className="s-gold" />
      <P d="M40 104 H74 L82 88 L92 122 L102 94 L108 104 H160" i={4} w={2.6} className="s-gold" dur={1.8} />
      <Pop i={9}>
        <path d="M150 40 v10 M145 45 h10" className="s-gold" strokeWidth={1.6} strokeLinecap="round" />
      </Pop>
    </>
  );
}

function Capsule() {
  return (
    <>
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: B + 1 }}
      >
        <g transform="rotate(-32 92 92)">
          <motion.path
            d="M92 74 H62 a18 18 0 0 0 0 36 H92 Z"
            className="f-wine-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: B + 0.8 }}
          />
          <P d="M62 74 H122 a18 18 0 0 1 0 36 H62 a18 18 0 0 1 0 -36 Z" i={0} w={2.4} dur={1.8} />
          <P d="M92 74 V110" i={2} w={2} />
          <P d="M58 84 a10 10 0 0 0 -4 8" i={3} w={1.4} className="s-gold" />
        </g>
      </motion.g>
      <motion.g
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: B + 1.4 }}
      >
        <g transform="rotate(28 134 142)">
          <P d="M114 130 H154 a12 12 0 0 1 0 24 H114 a12 12 0 0 1 0 -24 Z" i={3} w={2} className="s-teal" />
          <P d="M134 130 V154" i={4} w={1.6} className="s-teal" />
        </g>
      </motion.g>
      <motion.g
        animate={{ rotate: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: B + 1 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <C cx={60} cy={150} r={17} i={4} w={2.2} className="s-gold f-gold-soft" />
        <P d="M48 150 H72" i={5} w={1.6} className="s-gold" />
      </motion.g>
      <Pop i={8}>
        <path d="M150 52 v12 M144 58 h12" className="s-gold" strokeWidth={1.6} strokeLinecap="round" />
      </Pop>
    </>
  );
}

function Calendar() {
  const cols = Array.from({ length: 7 }, (_, k) => 58 + k * 14);
  return (
    <>
      <motion.rect
        x={42} y={50} width={116} height={108} rx={14} className="s-wine f-surface" strokeWidth={2.4}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: B, ease: EASE }}
      />
      <P d="M42 78 H158" i={2} w={1.6} />
      <P d="M72 40 V60 M128 40 V60" i={2} w={2.8} />
      {[96, 116, 136].map((y, r) =>
        cols.map((x, c) => {
          const first = r === 0;
          return (
            <motion.circle
              key={`${r}-${c}`}
              cx={x}
              cy={y}
              r={first ? 4.6 : 2.6}
              className={first ? (c === 6 ? "f-gold" : "f-wine") : "f-gold"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: first ? 1 : 0.35, scale: 1 }}
              transition={{ duration: 0.4, delay: B + 0.8 + (first ? c * 0.12 : 0.9 + (r * 7 + c) * 0.015) }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          );
        }),
      )}
      <C cx={142} cy={96} r={10} i={10} w={2} className="s-gold" />
      <circle cx={142} cy={96} r={14} fill="none" className="s-gold animate-ring-out" strokeWidth={1.2} />
    </>
  );
}

function Head() {
  return (
    <>
      <P
        d="M74 168 V146 C58 136 48 118 48 96 C48 64 72 40 104 40 C134 40 156 62 156 90 C156 98 154 104 158 110 L166 122 C168 126 166 128 162 129 L156 130 V142 C156 150 150 154 142 154 H128 V168"
        i={0}
        w={2.4}
        dur={2.2}
      />
      <P d="M78 86 C72 74 82 62 94 64 C98 54 116 54 120 64 C132 62 140 74 134 84 C138 94 128 104 118 100 C112 108 96 108 92 100 C80 104 72 96 78 86 Z" i={3} w={1.6} className="s-gold" />
      <circle cx={112} cy={78} r={7} className="f-wine animate-pulse-soft" />
      <P d="M104 104 C100 124 96 142 92 166" i={6} w={1.4} strokeDasharray="3 5" />
      <circle r={3.6} className="f-wine" opacity={0}>
        <animateMotion dur="2.8s" begin="1.8s" repeatCount="indefinite" path="M104 104 C100 124 96 142 92 166" />
        <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.3;1" dur="2.8s" begin="1.8s" repeatCount="indefinite" />
      </circle>
    </>
  );
}

function StethoscopeArt() {
  return (
    <>
      <P d="M70 42 C66 60 64 70 64 80 C64 102 80 118 100 118 C120 118 136 102 136 80 C136 70 134 60 130 42" i={0} w={2.6} dur={1.8} />
      <C cx={70} cy={38} r={4.5} i={1} w={2} className="s-gold" />
      <C cx={130} cy={38} r={4.5} i={1} w={2} className="s-gold" />
      <P d="M100 118 C100 142 112 156 128 156 C144 156 154 146 154 134" i={2} w={2.6} />
      <C cx={154} cy={122} r={14} i={3} w={2.4} className="s-wine f-surface" />
      <C cx={154} cy={122} r={6} i={4} w={1.6} className="s-gold f-gold-soft" />
      <P d="M28 176 H64 L72 162 L82 188 L90 170 H104" i={5} w={2} className="s-gold" />
    </>
  );
}

function Books() {
  return (
    <>
      <P d="M52 136 H152 V156 H52 Z" i={0} w={2.2} />
      <P d="M60 116 H148 V136 H60 Z" i={1} w={2.2} className="s-gold" />
      <P d="M48 96 H152 V116 H48 Z" i={2} w={2.2} />
      <P d="M64 102 H72 M64 110 H72 M76 122 H84 M68 142 H76 M68 150 H76" i={3} w={1.4} className="s-gold" />
      <P d="M120 136 V172 L126 166 L132 172 V136" i={4} w={1.8} className="s-wine" />
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: B + 0.6, ease: EASE }}
      >
        <P d="M60 88 C76 78 92 78 100 86 C108 78 124 78 140 88 V58 C124 48 108 48 100 56 C92 48 76 48 60 58 Z" i={5} w={2.2} className="s-wine f-surface" />
        <P d="M100 56 V86" i={6} w={1.4} className="s-gold" />
        <P d="M70 64 C78 60 86 60 92 64 M70 72 C78 68 86 68 92 72 M108 64 C114 60 122 60 130 64" i={7} w={1.2} strokeOpacity={0.5} />
      </motion.g>
      <Pop i={9}>
        <path d="M158 54 v12 M152 60 h12 M40 70 v8 M36 74 h8" className="s-gold" strokeWidth={1.6} strokeLinecap="round" />
      </Pop>
    </>
  );
}

const ART: Record<Visual, () => ReactNode> = {
  brain: Brain,
  neurons: Neurons,
  gauge: Gauge,
  vessel: Vessel,
  scan: Scan,
  eeg: Eeg,
  flask: Flask,
  clipboard: Clipboard,
  balance: Balance,
  route: RouteArt,
  stopwatch: Stopwatch,
  syringe: SyringeArt,
  radar: RadarArt,
  shield: Shield,
  capsule: Capsule,
  calendar: Calendar,
  head: Head,
  stethoscope: StethoscopeArt,
  books: Books,
};

export function Illustration({ name, size = 200 }: { name: Visual; size?: number }) {
  const Art = ART[name];
  return (
    <Frame size={size}>
      <Art />
    </Frame>
  );
}
