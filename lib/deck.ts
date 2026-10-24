import type { Section, SectionId, Slide } from "./types";

export const PRESENTERS = ["Manar Abo Abdo", "Areej Majed Shaheen", "Fatma Adel Shraim"];

export const sections: Record<SectionId, Section> = {
  cover: { num: "", name: "Post-Stroke Seizure Management" },
  roadmap: { num: "00", name: "Presentation roadmap" },
  "01": { num: "01", name: "Definition & classification" },
  "02": { num: "02", name: "Pathophysiology" },
  "03": { num: "03", name: "Risk factors & SeLECT score" },
  "04": { num: "04", name: "Diagnosis & investigations" },
  "05": { num: "05", name: "Differential diagnosis" },
  "06": { num: "06", name: "Management" },
  "07": { num: "07", name: "Status epilepticus" },
  "08": { num: "08", name: "Nonconvulsive status epilepticus" },
  "09": { num: "09", name: "Prophylaxis & special situations" },
  "10": { num: "10", name: "Long-term ASM" },
  "11": { num: "11", name: "Duration & follow-up" },
  "12": { num: "12", name: "Todd paralysis" },
  A: { num: "A", name: "Clinical cases" },
  R: { num: "R", name: "Selected references" },
  end: { num: "", name: "Discussion" },
};

/** Sections shown in the roadmap and the footer progress rail. */
export const TOPIC_SECTIONS: SectionId[] = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "A",
];

export const slides: Slide[] = [
  // ───────────── Cover & roadmap ─────────────
  {
    kind: "cover",
    section: "cover",
    title: "Post-Stroke Seizure Management",
    source: "p. 1",
    eyebrow: "Internal Medicine · Board Teaching",
    titleTop: "Post-Stroke Seizure",
    titleBottom: "Management",
    tagline: "Definition and types · Diagnosis · Management approach",
    duration: "30-minute lecture",
    presenters: PRESENTERS,
    footnote: "Reorganized from the supplied 43-page reference PDF",
  },
  {
    kind: "roadmap",
    section: "roadmap",
    title: "Presentation roadmap",
    subtitle: "Clinical flow of the session",
    visual: "route",
    note: "Clinical cases from the PDF are retained in an appendix after the twelve requested topics.",
  },

  // ───────────── 01 · Definition & classification ─────────────
  {
    kind: "incidence",
    section: "01",
    title: "What are post-stroke seizures?",
    subtitle: "Seizures after acute brain injury from stroke or its structural consequences",
    source: "p. 2",
    visual: "brain",
    panelTitle: "Definition and burden",
    bullets: [
      { icon: "brain", text: "Stroke is the **most common cause** of seizures and epilepsy in adults over 35" },
      { icon: "zap", text: "Most are **focal at onset**; secondary generalization is common, especially in late seizures" },
      { icon: "hospital", text: "Seen after ischemic and hemorrhagic stroke, during admission or months to years later" },
    ],
    chart: {
      title: "Pooled incidence of post-stroke seizures",
      max: 8,
      series: [
        { label: "2020 meta-analysis", tone: "gold" },
        { label: "2023 meta-analysis", tone: "teal" },
      ],
      groups: [
        { label: "Early (≤7 days)", values: [3.2, 5] },
        { label: "Late (>7 days)", values: [6.7, 7] },
      ],
    },
  },
  {
    kind: "sevenDay",
    section: "01",
    title: "Early vs late: the 7-day rule",
    source: "p. 3",
    visual: "calendar",
    early: {
      label: "Early",
      sub: "Acute symptomatic",
      points: ["Provoked; does not by itself establish epilepsy", "Low recurrence risk"],
    },
    late: {
      label: "Late",
      sub: "Remote unprovoked",
      points: [
        "Recurrence risk high, similar to an unprovoked seizure from a focal lesion",
        "A first late seizure generally meets the **ILAE practical definition of epilepsy**",
      ],
    },
    caution: {
      label: "Caution",
      text: "7 days is a classification rule, not a biological switch",
      sub: "Clinical context still matters",
    },
    axis: { start: "Stroke onset", marker: "Day 7", early: "Early (≤7 days)", late: "Late (>7 days)" },
  },

  // ───────────── 02 · Pathophysiology ─────────────
  {
    kind: "table",
    section: "02",
    title: "Definition & pathophysiology · the 7-day boundary",
    source: "p. 4",
    visual: "calendar",
    columns: ["Feature", "Acute symptomatic · ≤7 days", "Remote unprovoked · >7 days"],
    widths: [0.8, 1.2, 1.2],
    rows: [
      ["Classification", "Temporally associated with acute stroke", "May establish post-stroke epilepsy"],
      ["Mechanism", "Excitotoxicity, BBB dysfunction, edema", "Gliosis, network remodeling, neuronal loss"],
      ["Management implication", "Treat event and reversible causes", "Evaluate for maintenance ASM"],
    ],
    callout: { tone: "caution", text: "ILAE/ESO convention: **7 days**; do not use a 2-week threshold." },
  },
  {
    kind: "columns",
    section: "02",
    title: "Pathophysiology",
    subtitle: "Two different mechanisms behind the two clinical entities",
    source: "p. 5",
    visual: "neurons",
    columns: [
      {
        label: "Acute phase",
        tag: "Early seizures",
        icon: "zap",
        tone: "wine",
        items: [
          "Energy failure and membrane depolarization",
          "Excitotoxic glutamate release, raised intracellular calcium",
          "Ionic shifts, electrolyte imbalance, cellular hypoxia",
          "Blood-brain barrier disruption and inflammation, especially after hemorrhage",
          "Hemorrhagic transformation",
        ],
      },
      {
        label: "Chronic phase",
        tag: "Late seizures",
        icon: "network",
        tone: "teal",
        items: [
          "Neuronal loss, cortical scarring, gliosis",
          "Disrupted neuronal networks and synaptic connectivity",
          "Persistent excitatory/inhibitory imbalance",
          "Explains why **chronic epilepsy risk is higher** after late seizures",
        ],
      },
    ],
  },

  // ───────────── 03 · Risk factors & SeLECT ─────────────
  {
    kind: "cards",
    section: "03",
    title: "Risk factors after ischemic stroke",
    source: "p. 6",
    visual: "gauge",
    cards: [
      {
        label: "Robust clinical",
        icon: "activity",
        tone: "wine",
        text: "Severe neurological deficit, cortical involvement, large infarct, MCA territory, and early seizure.",
      },
      {
        label: "Stroke etiology",
        icon: "route",
        tone: "teal",
        text: "Large-artery atherosclerosis appears in SeLECT; hemorrhagic transformation raises concern.",
      },
      {
        label: "Additional associations",
        icon: "layers",
        tone: "gold",
        text: "Age, dementia, infection, reperfusion, and small-vessel MRI markers vary between cohorts.",
      },
      {
        label: "Do not overinterpret",
        icon: "alert",
        tone: "wine",
        text: "Exploratory genetics, cytokines, and biomarkers are **not routine prophylaxis indications**.",
      },
    ],
  },
  {
    kind: "cards",
    section: "03",
    title: "Risk factors after ICH / SAH",
    source: "p. 7",
    visual: "vessel",
    cards: [
      {
        label: "ICH cortex & size",
        icon: "target",
        tone: "wine",
        text: "Cortical or lobar blood and greater hematoma volume are consistent predictors.",
      },
      {
        label: "ICH early events",
        icon: "clock",
        tone: "gold",
        text: "A seizure in the first week predicts later seizure risk; **CAVE** formalizes this relationship.",
      },
      {
        label: "Small-vessel markers",
        icon: "microscope",
        tone: "teal",
        text: "Cortical superficial siderosis and lobar microbleeds may signal future epilepsy vulnerability.",
      },
      {
        label: "aSAH high-risk features",
        icon: "droplet",
        tone: "wine",
        text: "Ruptured MCA aneurysm, high-grade SAH, associated ICH, hydrocephalus, or cortical infarction.",
      },
    ],
  },
  {
    kind: "table",
    section: "03",
    title: "SeLECT score: original ischemic-stroke model",
    source: "p. 8",
    visual: "gauge",
    acronym: true,
    columns: ["Component", "Criteria", "Points"],
    widths: [1.25, 1.1, 0.55],
    rows: [
      ["Se – stroke severity", "NIHSS 0–3 / 4–10 / ≥11", "0 / 1 / 2"],
      ["L – large-artery atherosclerosis", "Absent / present", "0 / 1"],
      ["E – early seizure (≤7 days)", "Absent / present", "0 / 3"],
      ["C – cortical involvement", "Absent / present", "0 / 2"],
      ["T – MCA territory", "Absent / present", "0 / 1"],
    ],
    total: ["Total", "Predicts late unprovoked seizures after ischemic stroke", "0–9"],
  },
  {
    kind: "score",
    section: "03",
    title: "SeLECT calculation: practical example",
    source: "p. 9",
    visual: "gauge",
    items: [
      { label: "Stroke", icon: "activity", text: "NIHSS 13: **2 points**; large-artery atherosclerosis: **1**", points: 3 },
      { label: "Early seizure", icon: "zap", text: "Brief focal event day 2: **3 points**", points: 3 },
      { label: "Imaging", icon: "scan", text: "Cortical: **2**; MCA territory: **1**", points: 3 },
    ],
    breakdown: [
      { key: "Se", value: 2 },
      { key: "L", value: 1 },
      { key: "E", value: 3 },
      { key: "C", value: 2 },
      { key: "T", value: 1 },
    ],
    total: 9,
    max: 9,
    verdictLabel: "Score 9 / 9",
    verdict: "Very high estimated 5-year late-seizure risk in original model",
    callout: {
      tone: "danger",
      text: "**Prediction is not a prescription:** no automatic primary prophylaxis from score alone.",
    },
  },
  {
    kind: "columns",
    section: "03",
    title: "SeLECT vs SeLECT 2.0 (2023)",
    source: "p. 10",
    visual: "gauge",
    columns: [
      {
        label: "Original SeLECT",
        tag: "0–9",
        icon: "calculator",
        tone: "gold",
        items: [
          "Early seizure contributes **3 points**, irrespective of whether brief or status.",
          "Remaining components: admission NIHSS, large-artery etiology, cortical lesion, MCA territory.",
          "Validated for late seizure prediction following ischemic stroke.",
        ],
      },
      {
        label: "SeLECT 2.0",
        tag: "0–13",
        icon: "sparkles",
        tone: "wine",
        items: [
          "Distinguishes short acute symptomatic seizure (**3 points**) from acute symptomatic status epilepticus (**7 points**).",
          "Status adds 4 more than an early short seizure within the model.",
          "2023 derivation had limited external validation; verify population before use.",
        ],
      },
    ],
  },
  {
    kind: "table",
    section: "03",
    title: "CAVE score: ICH-specific late seizure risk",
    source: "p. 11",
    visual: "vessel",
    acronym: true,
    columns: ["CAVE feature", "Criterion", "Points"],
    widths: [1, 1.15, 0.45],
    rows: [
      ["C — cortical", "Hemorrhage involving cortex", "1"],
      ["A — age", "Age <65 years", "1"],
      ["V — volume", "ICH volume >10 mL", "1"],
      ["E — early event", "Early seizure ≤7 days", "1"],
    ],
    risk: {
      title: "Observed late seizure risk",
      caption: "Original cohort · by total CAVE points",
      data: [
        { label: "0", value: 0.6 },
        { label: "1", value: 3.6 },
        { label: "2", value: 9.8 },
        { label: "3", value: 34.8 },
        { label: "4", value: 46.2 },
      ],
    },
  },

  // ───────────── 04 · Diagnosis & investigations ─────────────
  {
    kind: "flow",
    section: "04",
    title: "Diagnostic approach: simultaneous priorities",
    source: "p. 12",
    visual: "stethoscope",
    mode: "parallel",
    steps: [
      { label: "Stabilize", icon: "wind", tone: "wine", text: "Airway, oxygenation, time event, check glucose" },
      {
        label: "Re-image",
        icon: "scan",
        tone: "gold",
        text: "New deficit, fall, worsening level of consciousness → urgent CT ± vascular imaging",
      },
      { label: "Determine", icon: "search", tone: "teal", text: "Focused exam, labs, witnessed semiology, stroke timing" },
      {
        label: "Electrography",
        icon: "waves",
        tone: "wine",
        text: "Routine EEG when useful; cEEG for persistent unexplained encephalopathy",
      },
    ],
    callout: {
      tone: "danger",
      text: "An apparently postictal new deficit **must not close the acute-stroke pathway**.",
    },
  },
  {
    kind: "columns",
    section: "04",
    title: "History: reconstruct the event in three phases",
    source: "p. 13",
    visual: "clipboard",
    columns: [
      {
        label: "Before + during",
        icon: "eye",
        tone: "teal",
        items: [
          "Exact onset relative to index stroke and last known well.",
          "Witness: staring, automatisms, limb clonus, forced gaze or head deviation.",
          "Positive sensory/visual phenomena, aura, duration and chronology.",
          "Responsiveness and consciousness; stereotyped recurrence.",
        ],
      },
      {
        label: "After + background",
        icon: "history",
        tone: "wine",
        items: [
          "Postictal confusion, aphasia, unilateral weakness; time to baseline.",
          "Prior epilepsy, seizures at stroke onset, structural lesion history.",
          "ASM adherence, missed benzodiazepines, alcohol, new antibiotics.",
          "Hypoglycemia, fever, sepsis, infection, electrolyte and renal triggers.",
        ],
      },
    ],
  },
  {
    kind: "table",
    section: "04",
    title: "Immediate investigations: what each test answers",
    source: "p. 14",
    visual: "flask",
    columns: ["Priority", "Test", "Clinical rationale"],
    widths: [0.62, 1.15, 1.23],
    rows: [
      ["At bedside", "Capillary glucose; vital signs; ECG / SpO₂", "Treat hypoglycemia and identify instability immediately"],
      ["Core chemistry", "Na, K, Ca, Mg, urea/creatinine, glucose", "Provocation and renal dosing; avoid missing severe dysnatremia"],
      ["Systemic factors", "CBC, renal/liver tests; infection studies if indicated", "Infection, toxic-metabolic causes, treatment safety"],
      ["Specific indication", "ASM level, toxicology, blood gas, pregnancy test as relevant", "Nonadherence, intoxication, acid-base or reproductive considerations"],
      ["Targeted diagnostic", "Lumbar puncture only when indicated after appropriate assessment", "Consider encephalitis/meningitis, not routine post-stroke workup"],
    ],
  },
  {
    kind: "cards",
    section: "04",
    title: "Neuroimaging: what must be excluded?",
    source: "p. 15",
    visual: "scan",
    cards: [
      {
        label: "Noncontrast CT",
        icon: "scan",
        tone: "wine",
        text: "Prompt if new deficit, unexpected decline, trauma, severe headache, or risk of hemorrhagic transformation/ICH.",
      },
      {
        label: "CTA / vascular imaging",
        icon: "route",
        tone: "teal",
        text: "Consider acute large-vessel occlusion, dissection, or repeat stroke when symptoms justify stroke-pathway evaluation.",
      },
      {
        label: "MRI (DWI/ADC, FLAIR)",
        icon: "layers",
        tone: "gold",
        text: "Clarifies new ischemia, infarct age, cortical lesions; add susceptibility sequence for blood products.",
      },
      {
        label: "Don’t anchor",
        icon: "alert",
        tone: "wine",
        text: "MRI abnormalities can occasionally be peri-ictal; interpret distribution and evolution with EEG and vascular findings.",
      },
    ],
  },
  {
    kind: "columns",
    section: "04",
    title: "EEG: routine versus continuous",
    source: "p. 16",
    visual: "eeg",
    columns: [
      {
        label: "Routine EEG",
        icon: "activity",
        tone: "teal",
        items: [
          "Helpful after uncertain focal events or a first unprovoked seizure.",
          "Look for focal epileptiform discharges, background slowing, and localization.",
          "Normal interictal EEG does **NOT** exclude epilepsy or intermittent seizures.",
          "Timing matters: a short study has limited seizure sampling.",
        ],
      },
      {
        label: "Continuous EEG",
        icon: "waves",
        tone: "wine",
        items: [
          "Persistent altered or fluctuating mental state after convulsion.",
          "Aphasia, gaze deviation, coma, or decline out of proportion to imaging.",
          "ICH/aSAH with high-grade injury and limited examination.",
          "Monitor treatment response in suspected NCSE or refractory status.",
        ],
      },
    ],
  },
  {
    kind: "eeg",
    section: "04",
    title: "EEG language: seizure, IIC, and nonspecific slowing",
    source: "p. 17",
    visual: "eeg",
    traces: [
      { label: "Interictal spike / sharp wave", tag: "Epileptiform", pattern: "spike", tone: "wine" },
      { label: "Periodic epileptiform pattern", tag: "IIC context", pattern: "periodic", tone: "gold" },
      { label: "Focal slowing", tag: "Not a seizure by itself", pattern: "slow", tone: "teal" },
    ],
    note: "Schematic tracings only — not patient EEG or a substitute for ACNS terminology.",
  },

  // ───────────── 05 · Differential diagnosis ─────────────
  {
    kind: "table",
    section: "05",
    title: "Differential I: seizures versus vascular mimics",
    source: "p. 18",
    visual: "balance",
    columns: ["Mimic", "Clinical clues", "Evaluation priority"],
    widths: [0.75, 1.3, 1],
    rows: [
      ["Recurrent AIS / TIA", "New persistent negative deficit; vascular syndrome; seizure can coexist", "Activate stroke pathway; CT/CTA ± MRI DWI"],
      ["Todd paralysis", "Transient postictal focal weakness, aphasia, or visual deficit", "Treat as possible new stroke until excluded"],
      ["Post-stroke recrudescence", "Return of prior deficits with fever, infection, hypotension, drugs", "Seek systemic trigger; image if new stroke plausible"],
      ["Migraine aura", "Gradual spread of positive symptoms, minutes, headache or history", "Clinical sequence; image atypical or sudden events"],
      ["Syncope", "Presyncope, orthostasis, brief LOC, rapid orientation possible", "Orthostatic vitals, ECG, telemetry as needed"],
    ],
  },
  {
    kind: "table",
    section: "05",
    title: "Differential II: nonvascular mimics",
    source: "p. 19",
    visual: "balance",
    columns: ["Mimic", "Bedside clue", "Tests / safeguard"],
    widths: [0.8, 1.25, 1.05],
    rows: [
      ["Hypoglycemia or electrolytes", "Confusion, diaphoresis or provoked convulsions", "Immediate glucose; Na/Ca/Mg"],
      ["Metabolic / septic encephalopathy", "Fluctuating diffuse dysfunction; asterixis, infection signs", "Metabolic/infectious workup; cEEG if disproportionate"],
      ["Functional events (PNES)", "Long events, asynchronous activity or context; features overlap", "Positive semiology + video-EEG when needed; avoid dismissive labels"],
      ["Movement disorder", "Stereotypies, tremor or dystonia without clear ictal sequence", "Phenomenology; video, EEG if uncertainty"],
      ["Delirium / medications", "Inattention, altered sleep-wake cycle, sedative/toxic exposure", "Medication reconciliation; exclude NCSE in unexplained course"],
    ],
  },

  // ───────────── 06 · Management ─────────────
  {
    kind: "flow",
    section: "06",
    title: "First seizure management: clinical branch point",
    source: "p. 20",
    visual: "route",
    mode: "branch",
    steps: [
      { label: "Stabilize", icon: "shield", tone: "teal", text: "Protect airway, address hypoglycemia; stop prolonged seizure" },
      { label: "Identify", icon: "search", tone: "gold", text: "Urgent lesion / metabolic trigger; EEG as indicated" },
      { label: "≤7 days", icon: "clock", tone: "wine", text: "Acute symptomatic: short course only if justified; reassess early" },
      { label: ">7 days", icon: "calendar", tone: "teal", text: "Remote unprovoked: usually long-term ASM after evaluation" },
    ],
    callout: {
      tone: "info",
      text: "Treatment of documented seizures **≠** primary prophylaxis in seizure-free stroke.",
    },
  },
  {
    kind: "columns",
    section: "06",
    title: "First acute symptomatic seizure (≤7 days)",
    source: "p. 21",
    visual: "stopwatch",
    columns: [
      {
        label: "Immediate response",
        icon: "siren",
        tone: "wine",
        items: [
          "Protect patient; ABC; check glucose; time seizure.",
          "Benzodiazepine for ongoing seizure approaching **5 minutes**.",
          "Urgent CT or further vascular imaging if new neurologic signs.",
          "Correct derangements and review drugs/infection.",
        ],
      },
      {
        label: "Ongoing ASM decision",
        icon: "pill",
        tone: "teal",
        items: [
          "Isolated, brief, terminated event: **no automatic lifelong ASM**.",
          "Consider ASM for recurrent seizures, status, or high clinical/EEG concern.",
          "Document rationale and a reassessment or withdrawal plan.",
          "Avoid assuming any given short course prevents late epilepsy.",
        ],
      },
    ],
  },
  {
    kind: "columns",
    section: "06",
    title: "First late unprovoked seizure (>7 days)",
    source: "p. 22",
    visual: "calendar",
    columns: [
      {
        label: "Establish etiology",
        icon: "search",
        tone: "gold",
        items: [
          "Confirm true epilepsy semiology and exclude metabolic provocation or new stroke.",
          "Image the old cortical lesion and look for new pathology.",
          "EEG can support diagnosis but normal EEG is not exclusionary.",
          "Review driving / safety, psychosocial risks, and preferences.",
        ],
      },
      {
        label: "Long-term plan",
        icon: "route",
        tone: "wine",
        items: [
          "Most clearly remote symptomatic cortical seizures meet the ILAE **≥60% recurrence** criterion.",
          "Start an appropriate focal-seizure ASM when risk-benefit supports treatment.",
          "Prefer tolerable monotherapy, tailored to age, comorbidity, and medications.",
          "Schedule specialist follow-up and reassess response and harms.",
        ],
      },
    ],
  },

  // ───────────── 07 · Status epilepticus ─────────────
  {
    kind: "steps",
    section: "07",
    title: "Status epilepticus: first five minutes",
    source: "p. 24",
    visual: "stopwatch",
    steps: [
      { icon: "phone", text: "Call for emergency team; identify time of onset; protect from injury and place patient safely." },
      { icon: "wind", text: "Prioritize airway, ventilation and oxygen when hypoxemic; monitor SpO₂, ECG, blood pressure and consciousness." },
      { icon: "droplet", text: "Obtain IV/IO access; immediate capillary glucose and treat hypoglycemia according to emergency protocol." },
      { icon: "testTube", text: "Draw urgent blood tests and evaluate precipitants, but **do not delay benzodiazepines**." },
      { icon: "scan", text: "Assess for hemorrhage, recurrent infarction, infection or drug withdrawal once resuscitation proceeds." },
    ],
    ring: { label: "Window", value: "0–5", caption: "minutes from onset" },
  },
  {
    kind: "table",
    section: "07",
    title: "First-line benzodiazepines: adult convulsive SE",
    source: "p. 25",
    visual: "syringe",
    columns: ["Agent / route", "Suggested emergency dose", "Key monitoring / cautions"],
    widths: [0.7, 1.3, 1.05],
    rows: [
      ["Lorazepam IV", "0.1 mg/kg IV (max 4 mg per dose); may repeat once in 3–5 min", "Monitor respiration / pressure; full dose required"],
      ["Midazolam IM", "10 mg IM for adults >40 kg when IV access unavailable", "Rapid alternative without IV; watch ventilation"],
      ["Diazepam IV", "0.15–0.2 mg/kg IV (max 10 mg per dose); may repeat once", "Shorter CNS action; sedation / respiratory effects"],
    ],
  },
  {
    kind: "table",
    section: "07",
    title: "Benzodiazepine-resistant SE: IV loading",
    source: "p. 26",
    visual: "syringe",
    columns: ["Agent", "Adult dose (ESETT-style)", "Caution / monitoring"],
    widths: [0.7, 1, 1.4],
    rows: [
      ["Levetiracetam", "60 mg/kg IV; max 4,500 mg", "Behavioral effects; renal adjust maintenance, not simply the emergency load"],
      ["Valproate", "40 mg/kg IV; max 3,000 mg", "Avoid severe hepatic disease; assess platelets, ammonia, reproductive risks"],
      ["Fosphenytoin", "20 mg PE/kg IV; max 1,500 mg PE", "Continuous ECG/BP; hypotension, arrhythmia, drug interactions"],
    ],
  },
  {
    kind: "flow",
    section: "07",
    title: "Time-based status pathway: bedside algorithm",
    source: "p. 27",
    visual: "stopwatch",
    mode: "time",
    steps: [
      { label: "0–5 min", icon: "heart", tone: "teal", text: "ABC, glucose, monitoring, rescue team" },
      { label: "≥5 min", icon: "syringe", tone: "gold", text: "Full-dose IV lorazepam **OR** IM midazolam; repeat once if indicated" },
      { label: "10–30 min", icon: "droplet", tone: "wine", text: "Load levetiracetam **OR** valproate **OR** fosphenytoin" },
      { label: "Refractory", icon: "bed", tone: "wine", text: "ICU + airway support + continuous EEG + anesthetic infusion" },
    ],
    callout: {
      tone: "info",
      text: "ESETT agents have comparable outcomes; choose according to comorbidity and interactions.",
    },
  },

  // ───────────── 08 · NCSE ─────────────
  {
    kind: "cards",
    section: "08",
    title: "NCSE: why stroke units miss it",
    source: "p. 28",
    visual: "radar",
    cards: [
      {
        label: "Clinically silent",
        icon: "eyeOff",
        tone: "teal",
        text: "No dramatic convulsions; patient may seem simply confused or unusually somnolent.",
      },
      {
        label: "Focal phenotypes",
        icon: "target",
        tone: "gold",
        text: "Fluctuating aphasia, gaze deviation, subtle twitching, neglect, or episodic unresponsiveness.",
      },
      {
        label: "Overlapping explanations",
        icon: "layers",
        tone: "teal",
        text: "Stroke evolution, sedatives, metabolic encephalopathy, and delirium obscure recognition.",
      },
      {
        label: "EEG required",
        icon: "waves",
        tone: "wine",
        text: "Prolonged or recurrent electrographic seizures require EEG; **subtle clinical signs alone are unreliable**.",
      },
    ],
  },
  {
    kind: "flow",
    section: "08",
    title: "NCSE pathway after stroke: persistent altered state",
    source: "p. 29",
    visual: "radar",
    mode: "sequence",
    steps: [
      { label: "Red flags", icon: "alert", tone: "wine", text: "Persistent aphasia, confusion, coma or fluctuating attention" },
      { label: "Recheck", icon: "repeat", tone: "gold", text: "Glucose, oxygenation, drugs, infection; urgent repeat imaging if indicated" },
      { label: "EEG → cEEG", icon: "waves", tone: "teal", text: "Assess seizures, evolution, IIC, and total seizure burden" },
      { label: "Treat / follow", icon: "check", tone: "wine", text: "Treat confirmed electroclinical / electrographic seizures; monitor improvement" },
    ],
    callout: {
      tone: "caution",
      text: "A normal 20-minute EEG does **not** reliably exclude intermittent electrographic seizures.",
    },
  },

  // ───────────── 09 · Prophylaxis & special situations ─────────────
  {
    kind: "columns",
    section: "09",
    title: "Ischemic stroke: prophylaxis and therapy",
    source: "p. 33",
    visual: "shield",
    columns: [
      {
        label: "No documented seizure",
        icon: "ban",
        tone: "teal",
        items: [
          "2026 AHA/ASA: prophylactic ASM is **not recommended** to prevent seizures or improve outcomes.",
          "SeLECT or severe cortical stroke alone does not alter that recommendation.",
          "Routine EEG screening of every AIS patient is not evidence-established.",
        ],
      },
      {
        label: "After a seizure",
        icon: "pill",
        tone: "wine",
        items: [
          "Early acute symptomatic: treat event and reversible causes; individualize short treatment.",
          "Remote unprovoked: initiating ASM is reasonable after patient-specific assessment.",
          "Choice and duration: age, comorbidity, seizure severity, adverse effects and interactions.",
        ],
      },
    ],
  },
  {
    kind: "columns",
    section: "09",
    title: "Spontaneous ICH: updated 2025 guidance",
    source: "p. 34",
    visual: "vessel",
    columns: [
      {
        label: "Primary prophylaxis",
        icon: "shield",
        tone: "teal",
        items: [
          "AHA/ASA 2022: no routine prophylactic ASM in ICH without seizure.",
          "NCS guideline (published 2025): suggest avoiding prophylaxis; very-low-certainty evidence.",
          "If nevertheless used: NCS prefers **levetiracetam over phenytoin** and **≤7 days**, conditionally.",
        ],
      },
      {
        label: "After early ICH seizure",
        icon: "zap",
        tone: "wine",
        items: [
          "Treat definite clinical or electrographic seizures; EEG if consciousness unexplained.",
          "ESO/EANS 2025: evidence insufficient for a general immediate ASM recommendation after ASS.",
          "Expert consensus: if started after ≤7-day seizure and seizure-free, consider discontinuation from **4 weeks** onward.",
        ],
      },
    ],
  },
  {
    kind: "columns",
    section: "09",
    title: "Aneurysmal SAH: seizure prevention is selective",
    source: "p. 35",
    visual: "vessel",
    columns: [
      {
        label: "Who is high-risk?",
        icon: "target",
        tone: "gold",
        items: [
          "AHA/ASA 2023: consider prophylaxis only with ruptured MCA aneurysm, intraparenchymal hemorrhage, high-grade aSAH, hydrocephalus or cortical infarction.",
          "A large minority may have electrographic seizures, especially with impaired consciousness.",
          "Avoid routine phenytoin because of associated excess morbidity.",
        ],
      },
      {
        label: "When a seizure occurs",
        icon: "zap",
        tone: "wine",
        items: [
          "Treat new-onset seizure after aSAH with ASM for **7 days** (AHA/ASA 2023).",
          "Evaluate rebleeding and aneurysm securement if deterioration or new seizure.",
          "Longer therapy only if separate compelling indications, such as later epilepsy.",
          "Consider cEEG with fluctuating or depressed consciousness.",
        ],
      },
    ],
  },
  {
    kind: "table",
    section: "09",
    title: "Cross-guideline comparison: three stroke scenarios",
    source: "p. 36",
    visual: "shield",
    columns: ["Scenario", "Routine primary prophylaxis?", "If seizures / high risk", "Duration / evidence"],
    widths: [0.72, 1, 1.1, 1.15],
    rows: [
      ["Acute ischemic stroke", "**No** — AHA/ASA 2026", "Early: treat and review; late: usually sustained ASM", "No fixed early duration established"],
      ["Spontaneous ICH", "**No** — AHA/ASA 2022; ESO/EANS 2025; NCS 2025", "Treat definite events; EEG if altered consciousness", "Prophylaxis if used: NCS ≤7 days; after ASS: ESO/EANS consider stopping from week 4"],
      ["Aneurysmal SAH", "**No universal prophylaxis** — AHA/ASA 2023", "May consider in specified high-risk patients; treat new-onset seizures", "AHA/ASA: 7 days after aSAH new-onset seizure; avoid phenytoin"],
    ],
  },

  // ───────────── 10 · Long-term ASM ─────────────
  {
    kind: "drugs",
    section: "10",
    title: "Long-term ASM · practical comparison",
    source: "p. 30",
    visual: "capsule",
    drugs: [
      { name: "Levetiracetam", plus: "Few drug interactions", minus: "Renal adjustment; mood effects" },
      { name: "Lamotrigine", plus: "Favorable cognitive profile", minus: "Slow titration; serious rash" },
      { name: "Lacosamide", plus: "Useful for focal seizures", minus: "PR prolongation; ECG review" },
      { name: "Valproate", plus: "Broad-spectrum", minus: "Hepatic / platelet / reproductive risks" },
    ],
    callout: { tone: "caution", text: "Avoid automatic **enzyme-inducing ASMs** in complex polypharmacy." },
  },
  {
    kind: "table",
    section: "10",
    title: "Maintenance ASM: practical prescribing grid (I)",
    source: "p. 31",
    visual: "capsule",
    columns: ["Agent", "Typical adult starting dose", "Titration / strengths", "Monitor / avoid"],
    widths: [0.7, 1.15, 1.15, 0.95],
    rows: [
      ["Levetiracetam", "500 mg PO BID; sometimes 250 BID in frailty", "Often +500 mg BID every ~2 weeks; max typical 1,500 BID", "eGFR, mood, somnolence"],
      ["Lamotrigine", "25 mg PO daily for 2 weeks (no interacting ASM)", "50 mg/day weeks 3–4; then gradual increments; target varies", "Rash, SJS; interacts with valproate / inducers"],
      ["Lacosamide", "50 mg PO BID", "Increase ~50 mg BID weekly; usual 100–200 BID", "ECG/PR, dizziness, hepatic and renal function"],
    ],
  },
  {
    kind: "table",
    section: "10",
    title: "Maintenance ASM: practical prescribing grid (II)",
    source: "p. 32",
    visual: "capsule",
    columns: ["Agent", "Typical adult start / range", "Major limitations", "Special consideration"],
    widths: [0.72, 1.2, 1.05, 1.05],
    rows: [
      ["Valproate", "250–500 mg PO BID; individualized often 10–30 mg/kg/day", "Liver, platelets, ammonia, teratogenicity", "Check interaction / bleeding and reproductive risk"],
      ["Carbamazepine", "100–200 mg PO BID; titrate; often 400–1,200 mg/day", "CYP / P-gp induction; hyponatremia, rash", "Problematic with DOACs and polypharmacy"],
      ["Phenytoin", "Maintenance often 3–5 mg/kg/day, individualized levels", "Nonlinear kinetics, interactions, ataxia, gingival/bone effects", "Emergency use differs; avoid routine aSAH prophylaxis"],
    ],
  },

  // ───────────── 11 · Duration & follow-up ─────────────
  {
    kind: "table",
    section: "11",
    title: "Ischemic stroke: when to treat and for how long",
    subtitle: "Not every early seizure needs lifelong therapy; not every late seizure can wait for a second one",
    source: "p. 23",
    visual: "calendar",
    columns: ["Situation", "Approach"],
    widths: [0.8, 1.6],
    rows: [
      ["Single acute symptomatic seizure, no recurrence", "Treat seizure and cause; short-term ASM (often **1–4 weeks**) if used; reassess need before discharge"],
      ["Status epilepticus or recurrent early seizures", "Individualize duration; specialist review"],
      ["First unprovoked late seizure", "**Long-term ASM** in most cases (individualize to lesion, EEG, adverse effects, preference)"],
      ["Seizure-free for years on ASM", "Supervised withdrawal can be considered (**>2 years** seizure-free) after weighing recurrence risk, EEG, lesion, adverse effects"],
    ],
  },
  {
    kind: "columns",
    section: "11",
    title: "Follow-up and safety",
    subtitle: "Epilepsy raises risk of injury, drowning and sudden unexpected death in epilepsy",
    source: "p. 39",
    visual: "shield",
    columns: [
      {
        label: "Every visit",
        icon: "stethoscope",
        tone: "teal",
        items: [
          "Seizure recurrence, adherence, adverse effects",
          "Renal and hepatic function when relevant",
          "Mood and cognition; screen for depression and anxiety",
          "ASMs may increase suicidality: **monitor**",
          "Falls and interactions with secondary stroke prevention",
        ],
      },
      {
        label: "Counseling",
        icon: "user",
        tone: "wine",
        items: [
          "Driving: seizure-free period varies by state; sedation and diplopia matter",
          "Triggers: sleep deprivation, alcohol, some medications, infection",
          "Avoid unsupervised bathing, swimming alone, work at heights; **showers, not baths**",
        ],
      },
    ],
  },

  // ───────────── 12 · Todd paralysis ─────────────
  {
    kind: "flow",
    section: "12",
    title: "Todd’s paralysis: emergency decision pathway",
    source: "p. 37",
    visual: "head",
    mode: "sequence",
    steps: [
      { label: "New deficit", icon: "siren", tone: "wine", text: "Record last known well; activate acute stroke team" },
      { label: "Parallel", icon: "fork", tone: "gold", text: "Stabilize seizures, glucose, CT/CTA and vascular eligibility" },
      { label: "If unclear", icon: "layers", tone: "teal", text: "MRI DWI ± perfusion, EEG / cEEG for aphasic status" },
      { label: "Reassess", icon: "repeat", tone: "wine", text: "Serial exam and repeat imaging/EEG when needed" },
    ],
    callout: {
      tone: "danger",
      text: "Suspected Todd paralysis **NEVER** justifies delaying evaluation for treatable acute stroke.",
    },
  },
  {
    kind: "table",
    section: "12",
    title: "Todd paralysis vs recurrent ischemia vs recrudescence",
    source: "p. 38",
    visual: "balance",
    columns: ["Feature", "Todd paralysis", "New ischemic stroke", "Recrudescence"],
    widths: [0.62, 1.12, 1.05, 1.05],
    emphasizeLast: true,
    rows: [
      ["Context", "Immediately after focal seizure", "Abrupt focal deficit ± coincident seizure", "Prior deficits reappear with systemic trigger"],
      ["Course", "Often minutes–hours; occasionally longer", "May persist, progress or fluctuate", "Improves when trigger resolves"],
      ["MRI / vascular", "No new vascular territory infarct required; transient peri-ictal changes possible", "DWI/vascular findings may support new ischemia", "Typically no new DWI infarct"],
      ["EEG", "Postictal slowing; exclude ongoing ictal state", "May be normal or show slowing", "Usually not diagnostic"],
      ["Safety principle", "Do NOT defer stroke pathway", "Reperfusion decisions time critical", "Exclude new pathology when presentation uncertain"],
    ],
  },

  // ───────────── Appendix · Clinical cases ─────────────
  {
    kind: "case",
    section: "A",
    title: "Case 1 — an acute seizure during ischemic stroke",
    source: "p. 40",
    visual: "clipboard",
    facts: [
      { value: "76", label: "years old" },
      { value: "L MCA", label: "cortical infarct" },
      { value: "12", label: "NIHSS" },
      { value: "14 h", label: "to the event" },
    ],
    presentation: [
      "76-year-old with acute left MCA cortical infarction, NIHSS 12, admitted for stroke-unit care.",
      "At 14 hours: 80-second right-arm clonic movements and rightward gaze deviation.",
      "Subsequent weakness and aphasia appear worse than initial baseline.",
      "Bedside glucose normal; vitals stable; no known epilepsy.",
    ],
    questions: [
      "Is this acute symptomatic or post-stroke epilepsy?",
      "What urgent lesion-related emergency must be ruled out?",
      "Is continuous EEG needed immediately?",
      "Does the patient require lifelong levetiracetam?",
    ],
  },
  {
    kind: "flow",
    section: "A",
    title: "Case 1 — reasoning and defensible management",
    source: "p. 41",
    visual: "clipboard",
    mode: "row",
    steps: [
      { label: "Classification", icon: "list", tone: "gold", text: "Acute symptomatic seizure within first day; not epilepsy automatically" },
      { label: "Safety", icon: "scan", tone: "wine", text: "Urgent repeat CT/vascular evaluation for new or worsened deficit" },
      { label: "Therapy", icon: "pill", tone: "teal", text: "No automatic lifelong ASM; consider if recurrence, SE, or EEG concerns" },
      { label: "Plan", icon: "clipboard", tone: "gold", text: "Correct triggers, document follow-up and reassess any ASM" },
    ],
    callout: {
      tone: "pearl",
      text: "**Consultant pearl:** event timing and acute complications guide duration, not seizure appearance alone.",
    },
  },
  {
    kind: "case",
    section: "A",
    title: "Case 2 — first seizure six months after infarction",
    source: "p. 42",
    visual: "clipboard",
    facts: [
      { value: "64", label: "years old" },
      { value: "R MCA", label: "remote cortical infarct" },
      { value: "6 mo", label: "since stroke" },
      { value: "DOAC", label: "apixaban for AF" },
    ],
    presentation: [
      "64-year-old with remote cortical right MCA infarct 6 months ago.",
      "Witnessed left-hand clonus → unresponsiveness → bilateral tonic–clonic activity for 2 minutes.",
      "He returns to baseline; glucose/electrolytes normal and MRI shows no new infarct.",
      "Taking apixaban for atrial fibrillation; stable renal function.",
    ],
    questions: [
      "Is one event sufficient for epilepsy diagnosis?",
      "Would a normal interictal EEG change that conclusion?",
      "Which ASM choices minimize interaction with a DOAC?",
      "How long should treatment be planned?",
    ],
  },
  {
    kind: "flow",
    section: "A",
    title: "Case 2 — diagnosis and long-term strategy",
    source: "p. 43",
    visual: "clipboard",
    mode: "sequence",
    steps: [
      { label: "Remote event", icon: "calendar", tone: "teal", text: "First unprovoked seizure >7 days after old cortical stroke" },
      { label: "ILAE criteria", icon: "book", tone: "gold", text: "An enduring recurrence probability ≥60% / 10 y can diagnose epilepsy" },
      { label: "Start ASM", icon: "pill", tone: "wine", text: "Prefer patient-aligned focal ASM (LEV/LTG/LCM), not enzyme inducer by default" },
      { label: "Follow-up", icon: "stethoscope", tone: "teal", text: "Counsel driving, mood, cognition, renal safety and seizure diary" },
    ],
    callout: {
      tone: "pearl",
      text: "One remote unprovoked seizure after a cortical stroke **often merits long-term therapy**.",
    },
  },

  // ───────────── References ─────────────
  {
    kind: "references",
    section: "R",
    title: "References",
    visual: "books",
    group: "Definitions, incidence & risk scores",
    page: "1 / 3",
    refs: [
      "Fisher RS, et al. ILAE official report: A practical clinical definition of epilepsy. Epilepsia. 2014.",
      "Ryu HU, et al. Post-stroke epilepsy: risk factors, diagnosis and management. Frontiers in Neurology. 2024. doi:10.3389/fneur.2024.1337960",
      "Galovic M, et al. Prediction of late seizures after ischaemic stroke with a novel prognostic model (SeLECT). Lancet Neurology. 2018;17:143–152.",
      "Galovic M, et al. SeLECT 2.0 risk prediction model. JAMA Neurology. 2023.",
      "Haapaniemi E, et al. The CAVE score for predicting late seizures after intracerebral hemorrhage. Stroke. 2014. doi:10.1161/STROKEAHA.114.004686",
    ],
  },
  {
    kind: "references",
    section: "R",
    title: "References",
    visual: "books",
    group: "Stroke-specific guidelines",
    page: "2 / 3",
    refs: [
      "AHA/ASA. Guideline for the Early Management of Patients With Acute Ischemic Stroke. 2026. doi:10.1161/STR.0000000000000513",
      "AHA/ASA. Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. 2022.",
      "AHA/ASA. Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage. 2023. doi:10.1161/STR.0000000000000436",
      "Holtkamp M, et al. European Stroke Organisation guidelines for the management of post-stroke seizures and epilepsy. European Stroke Journal. 2017. doi:10.1177/2396987317705536",
      "Neurocritical Care Society. Guideline on seizure prophylaxis in adults hospitalized with nontraumatic ICH. 2025. doi:10.1007/s12028-024-02183-z",
      "ESO/EANS. European guideline for spontaneous intracerebral haemorrhage. European Stroke Journal. 2025.",
    ],
  },
  {
    kind: "references",
    section: "R",
    title: "References",
    visual: "books",
    group: "EEG, status epilepticus & acute management",
    page: "3 / 3",
    refs: [
      "American Clinical Neurophysiology Society. Standardized Critical Care EEG Terminology. 2021. PMID:33475321",
      "Beniczky S, et al. ILAE classification of seizures. 2025. doi:10.1111/epi.18338",
      "Leitinger M, et al. Salzburg consensus criteria for nonconvulsive status epilepticus. 2015. PMID:26092326",
      "Glauser T, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus. American Epilepsy Society. 2016.",
      "Kapur J, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). NEJM. 2019. doi:10.1056/NEJMoa1905795",
      "NICE. Epilepsies in children, young people and adults. NG217. 2022; updated January 2025.",
    ],
  },

  // ───────────── Closing ─────────────
  {
    kind: "closing",
    section: "end",
    title: "Thank you",
    subtitle: "Questions & discussion",
    presenters: PRESENTERS,
  },
];

/** Index of the first slide of each section — used by roadmap and rail. */
export const sectionStart: Partial<Record<SectionId, number>> = slides.reduce(
  (acc, s, i) => {
    if (acc[s.section] === undefined) acc[s.section] = i;
    return acc;
  },
  {} as Partial<Record<SectionId, number>>,
);
