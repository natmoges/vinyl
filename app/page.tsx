// Rung 0 - This page simply loads/renders my mp3 into the browser with defualt browser audio controls. 
// Rung 1 - The page now holds my own player instead of the browser's.
// Nov 2026 - A way back: three plain links in the top-left corner, same as the other build pages.

import VinylPlayer from "@/components/VinylPlayer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <VinylPlayer />
      <nav aria-label="Leave this build" className="wayBack">
        <a href="https://record.natmoges.com">The record</a>
        <span aria-hidden="true">·</span>
        <a href="https://github.com/natmoges/vinyl">Code</a>
        <span aria-hidden="true">·</span>
        <a href="https://natmoges.com">natmoges.com</a>
      </nav>
    </main>
  );
}