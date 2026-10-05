// Rung 0 - This page simply loads/renders my mp3 into the browser with defualt browser audio controls. 
// Rung 1 - The page now holds my own player instead of the browser's.

import VinylPlayer from "@/components/VinylPlayer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <VinylPlayer />
    </main>
  );
}