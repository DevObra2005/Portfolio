"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

/*
  Pause/play para sa tech stack marquee.
  Hiwalay na client component para manatiling server component ang About.
  Nagse-set ng data-paused at data-onscreen sa track (tingnan ang .stack-track sa globals.css).
*/
export default function MarqueeToggle({ targetId }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = document.getElementById(targetId);
    if (track) track.dataset.paused = String(paused);
  }, [paused, targetId]);

  // Huminto kapag wala sa screen
  useEffect(() => {
    const track = document.getElementById(targetId);
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => {
      track.dataset.onscreen = String(entry.isIntersecting);
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <button
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-controls={targetId}
      aria-label={paused ? "Play tech stack scroll" : "Pause tech stack scroll"}
      className="grid size-7 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-150 hover:border-foreground hover:text-foreground motion-reduce:hidden"
    >
      {paused ? <Play size={12} /> : <Pause size={12} />}
    </button>
  );
}
