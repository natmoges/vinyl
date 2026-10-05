"use client";

// Rung 1 — My own play/pause. Before anyone taps, the page shows one button
// in the center that says Play. First tap: "Mars" plays and the button says Pause.
// Next tap: it pauses, and the tap after that resumes from the same point.
// When the track ends on its own, the button goes back to Play.
// If the browser refuses to play, the button shows a caution sign.
// Rung 2 — The disc is the button. Tap the record to play or pause it.
// Rung 3 — The needle drops onto the record while it plays and lifts when it stops.

import { useRef, useState } from "react";
import styles from "./VinylPlayer.module.css";

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

  const spokenLabel =
    status === "playing"
      ? "Pause Mars"
      : status === "blocked"
        ? "Playback blocked. Tap to try again"
        : "Play Mars";

  return (
    <>
      <audio ref={audioRef} src="/track.mp3" onEnded={() => setStatus("paused")} />
      <button
        type="button"
        className={styles.deck}
        onClick={handlePress}
        aria-label={spokenLabel}
      >
        <span
          className={status === "playing" ? `${styles.disc} ${styles.spinning}` : styles.disc}
          style={{ backgroundImage: "url(/art.jpeg)" }}
        />
        {status === "blocked" && <span className={styles.warning}>⚠</span>}
                <span className={status === "playing" ? `${styles.arm} ${styles.armDown}` : styles.arm}>
          <span className={styles.stylus} />
        </span>
        <span className={styles.pivot} />
      </button>
    </>
  );
}