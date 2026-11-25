"use client";
import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

type Shot = { src: string; alt: string };

/** Drag (or use arrow keys) to compare two photos of the same spot. */
export default function BeforeAfterSlider({ before, after, beforeLabel = "Before", afterLabel = "After", aspect = "aspect-[3/4]", sizes = "(min-width:1024px) 40vw, 92vw" }: {
  before: Shot; after: Shot; beforeLabel?: string; afterLabel?: string; aspect?: string; sizes?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className={`relative ${aspect} select-none overflow-hidden bg-concrete`}>
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" />
      </div>

      <span className="absolute left-3 top-3 bg-ink/85 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white">{beforeLabel}</span>
      <span className="absolute right-3 top-3 bg-brand px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink">{afterLabel}</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>

      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()} photos`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
