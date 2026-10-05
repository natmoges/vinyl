"use client";

// Rung 1 — My own play/pause. Before anyone taps, the page shows one button
// in the center that says Play. First tap: "Mars" plays and the button says Pause.
// Next tap: it pauses, and the tap after that resumes from the same point.
// When the track ends on its own, the button goes back to Play.
// If the browser refuses to play, the button shows a caution sign.
// Rung 2 — The disc is the button. Tap the record to play or pause it.
// Rung 3 — The needle drops onto the record while it plays and lifts when it stops.
// Rung 4 — A signal-green bar above the record, hidden until Mars first plays.
// It fills as the song plays, holds on pause, and stays full at the end until
// the next tap restarts Mars from the top. Tapping or dragging the bar seeks the
// song (arrow keys scratch), and the record turns back and forth with it, because the disc's angle
// is now worked out from the song's position.

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "./VinylPlayer.module.css";

type DeckStatus = "paused" | "playing" | "blocked";

const RPM = 23;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<DeckStatus>("paused");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // While playing, read the song's position on every screen frame.
  useEffect(() => {
    if (status !== "playing") return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setTime(audio.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

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

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Number(event.target.value);
    audio.currentTime = next;
    setTime(next);
  }

  const spokenLabel =
    status === "playing"
      ? "Pause Mars"
      : status === "blocked"
        ? "Playback blocked. Tap to try again"
        : "Play Mars";

  const discAngle = time * (RPM / 60) * 360;
  const progress = duration > 0 ? (time / duration) * 100 : 0;
  const showBar = status === "playing" || time > 0;

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src="/track.mp3"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={(event) => {
          setTime(event.currentTarget.duration);
          setStatus("paused");
        }}
      />

      {showBar && (
        <div className={status === "playing" ? `${styles.meter} ${styles.live}` : styles.meter}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
            <input
              type="range"
              className={styles.seek}
              min={0}
              max={duration}
              step={0.01}
              value={time}
              onChange={handleSeek}
              aria-label="Seek through Mars"
            />
          </div>
          <span className={styles.time}>
            {formatTime(time)} / {formatTime(duration)}
          </span>
        </div>
      )}

      <button
        type="button"
        className={styles.deck}
        onClick={handlePress}
        aria-label={spokenLabel}
      >
        <span
          className={styles.disc}
          style={{ backgroundImage: "url(/art.jpeg)", transform: `rotate(${discAngle}deg)` }}
        />
        {status === "blocked" && <span className={styles.warning}>⚠</span>}
        <span className={status === "playing" ? `${styles.arm} ${styles.armDown}` : styles.arm}>
          <span className={styles.stylus} />
        </span>
        <span className={styles.pivot} />
      </button>
    </div>
  );
}