"use client";

import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "./ProjectModal";
import { Dots, arrowBtn, useCarouselNav } from "./ImageCarousel";
import { cn } from "@/lib/utils";

/** Swipeable carousel of project cards (arrows on desktop, dots everywhere). Tapping a card opens its detail view. */
export default function ProjectCarousel({ projects, tone = "light" }: { projects: Project[]; tone?: "light" | "dark" }) {
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", slidesToScroll: 1 });
  const { index, count } = useCarouselNav(api);
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const dark = tone === "dark";
  if (projects.length === 0) return null;

  return (
    <div>
      <div className="relative">
        <div ref={ref} className="-mx-5 overflow-hidden px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <ul className="-ml-4 flex touch-pan-y">
            {projects.map((p, i) => (
              <li key={p.slug} className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3">
                <ProjectCard project={p} tone={tone} priority={i === 0} onOpen={() => setOpen(p)} />
              </li>
            ))}
          </ul>
        </div>
        {count > 1 && (
          <>
            <button type="button" className={cn(arrowBtn, "absolute -left-5 top-[calc(50%-4rem)] hidden lg:flex")} onClick={() => api?.scrollPrev()} aria-label="Previous projects"><ChevronLeft aria-hidden /></button>
            <button type="button" className={cn(arrowBtn, "absolute -right-5 top-[calc(50%-4rem)] hidden lg:flex")} onClick={() => api?.scrollNext()} aria-label="Next projects"><ChevronRight aria-hidden /></button>
          </>
        )}
      </div>
      {count > 1 && <div className="mt-4"><Dots count={count} index={index} onGo={(i) => api?.scrollTo(i)} light={dark} /></div>}
      {open && <ProjectModal project={open} onClose={close} />}
    </div>
  );
}
