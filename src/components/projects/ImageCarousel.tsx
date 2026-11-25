"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Photo, Stage } from "@/types/project";
import { stageLabel } from "@/data/projects";
import { cn } from "@/lib/utils";

type Item = Photo & { stage?: Stage };
type EmblaApi = ReturnType<typeof useEmblaCarousel>[1];

export function useCarouselNav(api: EmblaApi) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => { setIndex(api.selectedScrollSnap()); setCount(api.scrollSnapList().length); };
    update();
    api.on("select", update).on("reInit", update);
    return () => { api.off("select", update).off("reInit", update); };
  }, [api]);
  return { index, count };
}

export const arrowBtn = "flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-white backdrop-blur transition hover:bg-brand hover:text-ink active:scale-95 disabled:opacity-30";

export function Dots({ count, index, onGo, light }: { count: number; index: number; onGo: (i: number) => void; light?: boolean }) {
  return (
    <div className="mt-1 flex flex-wrap justify-center" role="tablist" aria-label="Choose slide">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} type="button" role="tab" aria-selected={i === index} aria-label={`Go to slide ${i + 1}`} onClick={() => onGo(i)} className="flex h-11 w-11 items-center justify-center">
          <span className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-brand" : cn("w-2", light ? "bg-white/40" : "bg-ink/25"))} />
        </button>
      ))}
    </div>
  );
}

/** Swipeable photo carousel with captions, dots and a fullscreen view. */
export default function ImageCarousel({ items }: { items: Item[] }) {
  const [ref, api] = useEmblaCarousel({ loop: false });
  const { index, count } = useCarouselNav(api);
  const [full, setFull] = useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <div>
      <div className="relative">
        <div ref={ref} className="overflow-hidden">
          <ul className="flex touch-pan-y">
            {items.map((img, i) => (
              <li key={img.src} className="min-w-0 shrink-0 grow-0 basis-full pr-2">
                <button type="button" onClick={() => setFull(i)} aria-label={`View photo ${i + 1} fullscreen`} className="group relative block aspect-[4/3] w-full overflow-hidden bg-concrete">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 48rem, 100vw" loading={i === 0 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-white"><Maximize2 className="h-4 w-4" aria-hidden /></span>
                  {img.stage && <span className="absolute bottom-0 left-0 bg-ink/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white">{stageLabel[img.stage]}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {items.length > 1 && (
          <div className="pointer-events-none absolute inset-y-0 left-2 right-4 hidden items-center justify-between md:flex">
            <button type="button" className={cn(arrowBtn, "pointer-events-auto")} onClick={() => api?.scrollPrev()} aria-label="Previous photo"><ChevronLeft aria-hidden /></button>
            <button type="button" className={cn(arrowBtn, "pointer-events-auto")} onClick={() => api?.scrollNext()} aria-label="Next photo"><ChevronRight aria-hidden /></button>
          </div>
        )}
      </div>
      {items.length > 1 && <Dots count={count} index={index} onGo={(i) => api?.scrollTo(i)} />}
      {full !== null && <Lightbox items={items} start={full} onClose={() => setFull(null)} />}
    </div>
  );
}

function Lightbox({ items, start, onClose }: { items: Item[]; start: number; onClose: () => void }) {
  const [ref, api] = useEmblaCarousel({ startIndex: start });
  const { index } = useCarouselNav(api);

  useEffect(() => {
    // Capture phase + stopPropagation so Esc closes only the viewer, not the project modal behind it.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key === "ArrowLeft") api?.scrollPrev();
      if (e.key === "ArrowRight") api?.scrollNext();
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [api, onClose]);

  const cur = items[index];
  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="flex items-center justify-between p-3 text-white">
        <p className="font-mono text-xs">{index + 1} / {items.length}</p>
        <button type="button" onClick={onClose} aria-label="Close photo viewer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-brand hover:text-ink"><X aria-hidden /></button>
      </div>
      <div ref={ref} className="min-h-0 flex-1 overflow-hidden">
        <ul className="flex h-full touch-pan-y">
          {items.map((img, i) => (
            <li key={img.src} className="relative h-full min-w-0 shrink-0 grow-0 basis-full">
              <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" loading={Math.abs(i - start) < 2 ? "eager" : "lazy"} />
            </li>
          ))}
        </ul>
      </div>
      <p className="p-3 text-center text-sm text-white/80">{cur?.stage ? `${stageLabel[cur.stage]} · ` : ""}{cur?.alt}</p>
    </div>
  );
}
