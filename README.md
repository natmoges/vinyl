# vinyl

A record player for my track **"Mars"**, built in React + TypeScript (Next.js) and deployed on Vercel.
The artwork and the track are both mine. It's my first code project.

**Live:** https://vinyl-swart.vercel.app

## What it does

- **Tap the record to play or pause it.** The disc is the button. It's a real `<button>`, so it works from the keyboard and screen readers announce it.
- **The disc turns at 23 RPM while Mars plays** and freezes exactly where it stopped when you pause.
- **The needle drops onto the record on play and lifts off on pause.** Its easing curve is the same one Ahmad used (credited below).
- **A signal-green bar sits above the record** and stays hidden until the first play. It fills as the song plays, holds on pause, and stays full at the end until the next tap restarts Mars from the top.
- **Tap or drag the bar to seek, and the record turns with it, forward or backward.** The disc's angle is calculated from the song's position, so the record and the audio can't drift apart.
- **Arrow keys scratch.** The bar is a native slider, so the arrow keys step through the track and the record turns with each press. I found this by accident while testing it. It wasn't planned, and it works the way a real deck does.
- **If the browser refuses to play,** the record shows a caution sign instead of failing silently.
- **Reduced motion is respected.** If your system has "reduce motion" turned on, the disc doesn't spin.

## How it was built

I'm not a programmer by trade. I come from music production, motion design (After Effects, Framer) and home automation. So I didn't vibe-code this or have an agent build it all. I built it in rungs, and every rung followed the same method:

1. **I wrote the paragraph first:** what the rung should do in plain words, including what happens at each moment in time: before anyone taps, on the tap, while it plays, at the end, and when the browser says no.
2. **I turned the paragraph into code with Claude** and translated each piece back into my own terms. React became a Soundtoys effect rack: hooks are plugins, state is a knob wired to the meters, a ref is the tape strip, and an effect is an automation lane.
3. **I typed the code myself, broke it, fixed it, and tuned it by eye:** the art crop, the needle length, the spacing, the colors.
4. **The paragraph stays above its code as a comment,** so every file reads as a plain-language explanation first.
5. **One commit per rung,** so the commit history is the learning record.

| Rung | What it added |
|---|---|
| 0 | The browser's own audio player, playing Mars |
| 1 | My own play/pause button, with three states: playing, paused, blocked |
| 2 | The record is the button, and the disc spins |
| 3 | The tonearm drops and lifts |
| 4 | The signal-green seek bar, plus scrubbing that turns the record |
| 5 | This README |

The code lives in [`components/VinylPlayer.tsx`](components/VinylPlayer.tsx), and the styling is in [`components/VinylPlayer.module.css`](components/VinylPlayer.module.css).

## Credits

Reference: **DiscPlayer by Ahmad (@ohitshmad)**, a free code component on the Framer Marketplace. It has been the player on [natmoges.com](https://natmoges.com) since Feb 2026.

I build the way producers sample: take the finished record apart, keep what matters, credit the source, make it mine. I read DiscPlayer to understand how it worked. None of its code is in this repo; this version was written from scratch. What's mine here: the code; the artwork and the track; the seek bar and scrubbing, which the reference doesn't have; and a few changes I made on purpose. The record is a real button. The disc's angle comes from the song's position instead of being tracked separately, which also avoids an angle drift I found in the original when it's paused more than once. Playback refusal is handled, and reduced motion is respected. The needle's easing curve, `cubic-bezier(0.32, 0.72, 0, 1)`, is Ahmad's.

**Co-pilot:** Claude (Anthropic) worked alongside me the whole way: it explained the code, translated it into my own terms, and wrote code from my paragraphs.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.