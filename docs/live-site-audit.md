# Live Site Audit

Audit date: February 27, 2026  
Live URL audited: https://linc-acadience.lovable.app/
Method: Playwright browser crawl + per-band route inspection + game-modal inspection.

## Route Inventory

| Route | Final URL | State |
|---|---|---|
| `/` | `/` | Live landing page with grade/window selects |
| `/literacy` | `/literacy` | Same as `/` |
| `/architecture` | `/architecture` | Internal architecture map |
| `/green-thinkific` | `/green-thinkific` | Legacy green benchmark view + external Thinkific link |
| `/k/boy` | `/k/boy` | Fully interactive benchmark selection + results |
| `/k/moy` | `/k/moy` | Fully interactive benchmark selection + results |
| `/k/eoy` | `/k/eoy` | Coming soon placeholder |
| `/1/boy` | `/1/boy` | Coming soon placeholder |
| `/1/moy` | `/1/moy` | Coming soon placeholder |
| `/1/eoy` | `/1/eoy` | Coming soon placeholder |
| `/2/boy` | `/2/boy` | Coming soon placeholder |
| `/2/moy` | `/2/moy` | Coming soon placeholder |
| `/2/eoy` | `/2/eoy` | Coming soon placeholder |
| `/bad/path` | `/literacy` | Redirect fallback |

## Landing Flow

Observed current flow:
1. Select grade and window from dropdowns.
2. Tap Continue.
3. For K/BOY and K/MOY only: choose benchmark color.
4. View results with resources, games, events.

Observed friction:
- Parent must pick season before seeing any game path.
- Results prioritize explanation/resources over immediate play CTA.
- Only two route combinations are complete.

## Canonical Live Pages

### K → BOY
Selection heading: `Welcome, Families! 👋`  
Selector heading: `Select Your Child's Result:`

Band states:
- `red`: focus on rhyme, games = `Rhyming Match`, `Rhyming Memory`
- `yellow`: focus on syllables, game = `Syllable Match`
- `green`: focus on phoneme isolation, game = `Fly Swat!`
- `blue`: coming soon block, no interactive game

### K → MOY
Selection heading: `Welcome, Families! 👋`

Band states:
- `red`: phoneme-focused explanatory copy, but still shows rhyming game cards in Play section
- `yellow`: blending focus, game = `Sound Blender`
- `green`: phoneme isolation, game = `Fly Swat!`
- `blue`: coming soon block, no interactive game

## Embedded Game Audit

### Rhyming Match
- Prompt: tap first word, then matching rhyme.
- State shown: score counter (`0 / 4`).
- Controls: `New Game`, `Start Over`.
- Strengths: clear two-column structure.
- Gaps: weak visual feedback hierarchy, minimal accessibility cues.

### Rhyming Memory
- Prompt: find rhyming pairs.
- State shown: matches + move counter.
- Controls: `New Game`, `Start Over`.
- Gaps: low distinction between active/inactive cards, limited error feedback.

### Syllable Match
- Prompt: match picture/word to 1-4 syllables.
- Controls: `New Game`, `Start Over`.
- Gaps: little explicit correctness confirmation, no keyboard affordance cues.

### Fly Swat!
- Prompt: find picture beginning with target phoneme.
- State shown: score + target sound.
- Controls: `New Game`, `Start Over`, audio/listen trigger.
- Gaps: feedback can be improved with clearer success/failure state transitions.

### Sound Blender
- Prompt: hear segmented sounds and pick blended word.
- State shown: round progress (`1 / 6`).
- Controls: `Hear it again`, `New Game`, `Start Over`.
- Gaps: answer state clarity and instructional pacing inconsistent.

## External/Resource Links Found

- `/green-thinkific` includes external course link:
  - https://josh-s-site-64b3.thinkific.com/products/courses/phonological-awareness-course
- Live app includes Google Drive preview/view links and local PDF paths for certain MOY resources.

## Broken/Unfinished Areas

- All non-K/BOY and non-K/MOY grade-window routes are placeholders.
- Blue-band paths in canonical routes are partially placeholder content.
- Inconsistency observed between MOY red explanatory copy and displayed game cards.

## Implementation Decisions Taken From Audit

- Kept K/BOY and K/MOY as behavioral models for game embedding and benchmark color model.
- Reworked flow to grade + composite-band-first (3 taps to first game) while preserving season in routing.
- Added data pipeline to complete missing routes from workbook mappings and PDF assets.
