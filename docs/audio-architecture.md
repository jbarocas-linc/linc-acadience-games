# Audio Architecture

## Goal

Use one consistent instructional voice for both full-word prompts and phoneme-level prompts.

## Provider Strategy

Primary provider: AWS Polly Neural voice via `/api/audio` route.

- Voice is set once through `AUDIO_VOICE_ID` env var.
- Word prompts are synthesized as SSML.
- Phoneme prompts use `<phoneme alphabet="ipa" ph="...">` so phoneme and full-word audio come from the same voice engine.

## Runtime Flow

1. Game requests speech with `text` and optional `ipa`.
2. Client calls `/api/audio?text=...&ipa=...`.
3. Server route synthesizes MP3 with Polly and returns audio bytes.
4. Browser plays returned MP3.
5. If provider not configured, client falls back to browser speech synthesis (lower quality fallback only).

## Consistency Controls

- Single voice ID across all games.
- Uniform speaking rate and pitch in fallback path.
- IPA path centralized in one endpoint to avoid mixed pronunciation logic.

## Caching

- HTTP cache headers are set (`immutable` long max-age).
- Recommended production extension: pre-generate high-frequency prompt/phoneme assets during build and store in object storage/CDN.

## Environment Variables

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AUDIO_VOICE_ID` (example: `Joanna`)

## QA Notes

- Validate all target phonemes with native speaker review.
- Confirm no cross-provider voice fallback in production.
- Confirm first-play latency is acceptable on mobile networks.
