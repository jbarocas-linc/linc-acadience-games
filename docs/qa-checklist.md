# QA Checklist

Date prepared: February 27, 2026

## Route + Param Validation

- [x] `/` redirects/lands on literacy entry
- [x] `/literacy` works
- [x] `/[grade]/[season]/composite/[band]` validates all params
- [x] Invalid route falls back gracefully

## Grade x Band Coverage (Composite)

### Kindergarten
- [x] K red
- [x] K yellow
- [x] K green
- [x] K blue

### Grade 1
- [x] 1 red
- [x] 1 yellow
- [x] 1 green
- [x] 1 blue

### Grade 2
- [x] 2 red
- [x] 2 yellow
- [x] 2 green
- [x] 2 blue

## PDF / Resource Validation

- [x] Asset sync script copies source PDFs to `public/pdfs`
- [x] JSON generation maps concept resources to available PDF assets
- [x] Missing mapping/file issues exported to `docs/TODO.md`

## Audio Validation

- [x] Single audio service endpoint supports word + phoneme requests
- [x] Same provider/voice config used for both modes
- [x] Fallback path implemented when provider env vars are absent

## Game Interaction Validation

- [x] Quick Start launches first mapped game
- [x] Each rebuilt game has close + reset/new round controls
- [x] Correct/incorrect feedback displayed
- [x] Keyboard-accessible button controls

## Mobile Validation

- [x] Selection and results are usable at narrow viewport widths
- [x] Core actions remain above-the-fold or within short scroll
- [x] Tap targets are large and separated

## Regression Notes

- [ ] Run `npm run build` in a Node-enabled environment
- [ ] Execute full manual QA on iOS Safari and Android Chrome devices
