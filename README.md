# Post-Stroke Seizure Management — Board Teaching deck

Animated web presentation (Next.js 16 · Motion · Tailwind 4) rebuilt from
`Post_Stroke_Seizure_Board_Ready_Final_With_Title_Image.pptx` — 47 original slides + a closing slide.

## Run

```bash
npm install        # first time only
npm run dev        # http://localhost:3000
# or, for the smoothest playback on the lecture laptop:
npm run build && npm run start
```

## Presenter controls

| Key | Action |
| --- | --- |
| `→` `↓` `Space` `PageDown` `Enter` | Next slide (works with presentation clickers) |
| `←` `↑` `PageUp` `Backspace` | Previous slide |
| `Home` / `End` | First / last slide |
| `G` or `O` | All-slides navigator |
| `F` | Fullscreen |
| `T` | Light (ivory) / dark theme |
| `Esc` | Close navigator |

- Swipe left/right on touch screens.
- The URL keeps the slide number (`/#/24`), so a refresh stays on the same slide.
- Controls and cursor hide after ~3 s without mouse movement.
- Roadmap tiles and the section rail in the footer jump straight to a section.

## Where things live

- `lib/deck.ts` — all slide content (edit text here)
- `components/slides/*` — slide layouts (cards, tables, flows, charts, EEG, cases…)
- `components/illustrations/Illustration.tsx` — animated line-art illustrations
- `app/globals.css` — colour tokens for both themes
