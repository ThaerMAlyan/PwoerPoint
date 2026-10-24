export type Tone = "wine" | "gold" | "teal";

export type IconName =
  | "activity"
  | "alert"
  | "ban"
  | "bed"
  | "book"
  | "brain"
  | "calculator"
  | "calendar"
  | "car"
  | "check"
  | "clipboard"
  | "clock"
  | "dna"
  | "droplet"
  | "eye"
  | "eyeOff"
  | "flask"
  | "fork"
  | "gauge"
  | "heart"
  | "history"
  | "hospital"
  | "layers"
  | "lightbulb"
  | "list"
  | "microscope"
  | "network"
  | "phone"
  | "pill"
  | "question"
  | "radar"
  | "repeat"
  | "route"
  | "scan"
  | "search"
  | "shield"
  | "shieldAlert"
  | "shower"
  | "siren"
  | "sparkles"
  | "stethoscope"
  | "syringe"
  | "target"
  | "testTube"
  | "timer"
  | "user"
  | "waves"
  | "wind"
  | "zap";

export type Visual =
  | "brain"
  | "neurons"
  | "gauge"
  | "vessel"
  | "scan"
  | "eeg"
  | "flask"
  | "clipboard"
  | "balance"
  | "route"
  | "stopwatch"
  | "syringe"
  | "radar"
  | "shield"
  | "capsule"
  | "calendar"
  | "head"
  | "stethoscope"
  | "books";

export type SectionId =
  | "cover"
  | "roadmap"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "A"
  | "R"
  | "end";

export interface Section {
  num: string;
  name: string;
}

export type CalloutTone = "caution" | "danger" | "info" | "pearl";

export interface Callout {
  tone: CalloutTone;
  text: string;
}

interface Base {
  section: SectionId;
  title: string;
  subtitle?: string;
  source?: string;
  visual?: Visual;
  callout?: Callout;
}

export interface CoverSlide extends Base {
  kind: "cover";
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  tagline: string;
  duration: string;
  presenters: string[];
  footnote: string;
}

export interface RoadmapSlide extends Base {
  kind: "roadmap";
  note: string;
}

export interface IncidenceSlide extends Base {
  kind: "incidence";
  panelTitle: string;
  bullets: { icon: IconName; text: string }[];
  chart: {
    title: string;
    max: number;
    series: { label: string; tone: Tone }[];
    groups: { label: string; values: number[] }[];
  };
}

export interface SevenDaySlide extends Base {
  kind: "sevenDay";
  early: { label: string; sub: string; points: string[] };
  late: { label: string; sub: string; points: string[] };
  caution: { label: string; text: string; sub: string };
  axis: { start: string; marker: string; early: string; late: string };
}

export interface TableSlide extends Base {
  kind: "table";
  columns: string[];
  rows: string[][];
  /** CSS grid-template-columns / colgroup widths, in fr units */
  widths?: number[];
  /** First column holds "X – label" acronyms rendered as badges */
  acronym?: boolean;
  total?: string[];
  emphasizeLast?: boolean;
  risk?: {
    title: string;
    caption: string;
    data: { label: string; value: number }[];
  };
}

export interface CardsSlide extends Base {
  kind: "cards";
  cards: { label: string; text: string; icon: IconName; tone: Tone }[];
}

export interface Column {
  label: string;
  icon: IconName;
  tone: Tone;
  tag?: string;
  items: string[];
}

export interface ColumnsSlide extends Base {
  kind: "columns";
  columns: Column[];
}

export interface FlowStep {
  label: string;
  text: string;
  icon: IconName;
  tone?: Tone;
}

export interface FlowSlide extends Base {
  kind: "flow";
  mode: "sequence" | "parallel" | "branch" | "time" | "row";
  steps: FlowStep[];
}

export interface StepsSlide extends Base {
  kind: "steps";
  steps: { text: string; icon: IconName }[];
  ring: { label: string; value: string; caption: string };
}

export interface ScoreSlide extends Base {
  kind: "score";
  items: { label: string; text: string; points: number; icon: IconName }[];
  breakdown: { key: string; value: number }[];
  total: number;
  max: number;
  verdictLabel: string;
  verdict: string;
}

export interface EegPattern {
  num: string;
  label: string;
  /** Italic qualifier under the label, shown in parentheses */
  aside?: string;
  trace: "background" | "focalSlowing" | "spikeWave" | "evolving" | "gpd" | "lpd";
  tone: Tone;
  /** Bracket label over the highlighted stretch of the tracing */
  marker?: string;
  shows?: string[];
  suggests?: string[];
  /** Short line under the tracing; Arabic text is set right-to-left */
  caption?: string;
}

export interface EegPatternsSlide extends Base {
  kind: "eegPatterns";
  patterns: EegPattern[];
}

export interface DrugsSlide extends Base {
  kind: "drugs";
  drugs: { name: string; plus: string; minus: string }[];
}

export interface CaseSlide extends Base {
  kind: "case";
  facts: { value: string; label: string }[];
  presentation: string[];
  questions: string[];
}

export interface ReferencesSlide extends Base {
  kind: "references";
  group: string;
  page: string;
  refs: string[];
}

export interface ClosingSlide extends Base {
  kind: "closing";
  presenters: string[];
}

export type Slide =
  | CoverSlide
  | RoadmapSlide
  | IncidenceSlide
  | SevenDaySlide
  | TableSlide
  | CardsSlide
  | ColumnsSlide
  | FlowSlide
  | StepsSlide
  | ScoreSlide
  | EegPatternsSlide
  | DrugsSlide
  | CaseSlide
  | ReferencesSlide
  | ClosingSlide;
