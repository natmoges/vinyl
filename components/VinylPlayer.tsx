"use client";

// Rung 1 — My own play/pause. Before anyone taps, the page shows one button
// in the center that says Play. First tap: "Mars" plays and the button says Pause.
// Next tap: it pauses, and the tap after that resumes from the same point.
// When the track ends on its own, the button goes back to Play.
// If the browser refuses to play, the button shows a caution sign.

import { useRef,useState } from "react";

type DeckStatus = "paused" | "playing" | "blocked";

export default function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<DeckStatus>("paused");

  async function handlePress() {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === "playing") {
      audio.pause();
      setStatus("paused");
      return;
    }

    try {
      await audio.play();
      setStatus("playing");
    } catch {
      setStatus("blocked");
    }
  }

  const label =
    status === "playing" ? "Pause" : status === "blocked" ? "⚠" : "Play";

  const spokenLabel =
    status === "playing"
      ? "Pause Mars"
      : status === "blocked"
        ? "Playback blocked. Tap to try again"
        : "Play Mars";

  return (
    <div>
      <audio ref={audioRef} src="/track.mp3" onEnded={() => setStatus("paused")} />
      <button type="button" onClick={handlePress} aria-label={spokenLabel}>
        {label}
      </button>
    </div>
  );
}