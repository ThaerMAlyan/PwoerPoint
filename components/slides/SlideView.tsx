"use client";

import type { Slide } from "@/lib/types";
import { CaseLayout, CardsLayout, ColumnsLayout, DrugsLayout, ReferencesLayout, RoadmapLayout, StepsLayout } from "./ContentLayouts";
import { ClosingLayout, CoverLayout } from "./CoverSlides";
import { EegPatternsLayout, IncidenceLayout, ScoreLayout, SevenDayLayout } from "./DataLayouts";
import { FlowLayout, TableLayout } from "./StructureLayouts";

export function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "cover":
      return <CoverLayout slide={slide} />;
    case "closing":
      return <ClosingLayout slide={slide} />;
    case "roadmap":
      return <RoadmapLayout slide={slide} />;
    case "incidence":
      return <IncidenceLayout slide={slide} />;
    case "sevenDay":
      return <SevenDayLayout slide={slide} />;
    case "table":
      return <TableLayout slide={slide} />;
    case "cards":
      return <CardsLayout slide={slide} />;
    case "columns":
      return <ColumnsLayout slide={slide} />;
    case "flow":
      return <FlowLayout slide={slide} />;
    case "steps":
      return <StepsLayout slide={slide} />;
    case "score":
      return <ScoreLayout slide={slide} />;
    case "eegPatterns":
      return <EegPatternsLayout slide={slide} />;
    case "drugs":
      return <DrugsLayout slide={slide} />;
    case "case":
      return <CaseLayout slide={slide} />;
    case "references":
      return <ReferencesLayout slide={slide} />;
  }
}
