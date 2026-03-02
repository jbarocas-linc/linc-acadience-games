# Acadience Parent Game-First Rebuild (Next.js)

This project rebuilds and completes the LINC Acadience parent tool with a game-first UX, dynamic composite-band routing, and a data pipeline sourced from the provided Excel/PDF assets.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Data generation scripts in Python (`openpyxl`)
- Audio service abstraction with AWS Polly SSML phoneme support

## GitHub Pages Repo Name

Use this repository name:

- `linc-acadience-games`

The current Next.js config is set up to publish under that GitHub Pages path.

## Setup

1. Install Node.js 20+.
2. Install dependencies:
   - `npm install`
3. Regenerate data/assets:
   - `npm run data:sync`
4. Start dev server:
   - `npm run dev`

## Data Regeneration

- `python3 scripts/sync_assets.py`
  - Copies source assets from `Acadience App/` into `public/pdfs`, `public/videos`, and `public/images`.
  - Writes `data/generated/asset-manifest.json`.

- `python3 scripts/generate_data.py`
  - Parses `Mapping for Acadience.xlsx`.
  - Generates `data/generated/recommendations.json`.
  - Validates mapping/resource coverage.
  - Writes missing rows/files to `docs/TODO.md`.

Build uses data generation automatically:
- `npm run build`

## Routing Model

- `/literacy`
- `/:grade/:season/composite/:band`

Examples:
- `/K/MOY/composite/red`
- `/1/BOY/composite/green`

Route params are validated with friendly fallback.

## Audio Configuration

For GitHub Pages, audio uses the browser's built-in speech voice only. GitHub Pages cannot host private server-side TTS routes.

## How To Add Subtests Later

Current measure is `composite`. To add subtests without route rewrites:

1. Add subtest mapping columns/rows to workbook.
2. Extend `scripts/generate_data.py` to emit additional `measure` values.
3. Add a measure selector in `/literacy` UI.
4. Reuse existing route shape (`/:grade/:season/:measure/:band`) with the same page component.

## Commands

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run data:sync`
- `npm run audit:live`

## Deploy To GitHub Pages

1. Create a new GitHub repo named `linc-acadience-games`.
2. Push this project to the `main` branch.
3. In GitHub:
   - Open `Settings` -> `Pages`
   - Under `Build and deployment`, set `Source` to `GitHub Actions`
4. Push to `main` again (or run the workflow manually from the `Actions` tab).
5. GitHub Actions will build and deploy the static site.

The workflow file is:

- `.github/workflows/deploy.yml`

## Documentation

- `docs/live-site-audit.md`
- `docs/audio-architecture.md`
- `docs/ux-notes.md`
- `docs/qa-checklist.md`
- `docs/TODO.md`
