"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import type { Photo } from "@/types/project";

/** Drag (or use arrow keys on) the handle to reveal the before photo over the after photo. */
export default function BeforeAfterSlider({ before, after }: { before: Photo; after: Photo }) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const move = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div ref={box} className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden bg-ink"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e.clientX); }}>
      <Image src={after.src} alt={after.alt} fill sizes="(min-width:1024px) 48rem, 100vw" className="pointer-events-none object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width:1024px) 48rem, 100vw" className="pointer-events-none object-cover" draggable={false} />
      </div>
      <span className="pointer-events-none absolute left-0 top-0 bg-ink/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white">Before</span>
      <span className="pointer-events-none absolute right-0 top-0 bg-brand px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <button type="button" role="slider" aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-brand text-ink shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
