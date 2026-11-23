"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Project } from "@/types/project";
import { compareOf, coverOf, galleryOf, projectLabel } from "@/data/projects";
import VideoEmbed from "./VideoEmbed";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ImageCarousel from "./ImageCarousel";

/** Detail view: video, before/after slider, then the remaining photos. Empty parts are not rendered. */
export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const compare = compareOf(project);
  const gallery = galleryOf(project);
  const meta = [project.sector, project.location].filter(Boolean).join(" · ");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/80 sm:items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={projectLabel(project)} onClick={(e) => e.stopPropagation()}
        className="relative max-h-[94svh] w-full max-w-3xl overflow-y-auto overscroll-contain bg-paper text-ink shadow-2xl sm:max-h-[90svh]">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink/10 bg-paper px-4 py-2 sm:px-6">
          <p className="min-w-0 truncate font-mono text-xs uppercase tracking-[0.16em] text-brand-ink">{project.categories.join(" · ")}</p>
          <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close project" className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-ink/10"><X aria-hidden /></button>
        </div>

        <div className="space-y-6 px-4 pb-8 pt-5 sm:px-6">
          {(project.title || meta || project.description || project.details.length > 0) && (
            <header>
              {meta && <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/55">{meta}</p>}
              {project.title && <h3 className="mt-1 text-2xl font-semibold leading-snug">{project.title}</h3>}
              {project.description && <p className="mt-3 max-w-prose text-base leading-relaxed text-ink/70">{project.description}</p>}
              {project.details.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-ink/70">{project.details.map((d) => <li key={d}>{d}</li>)}</ul>
              )}
            </header>
          )}

          {project.video && <VideoEmbed url={project.video} cover={coverOf(project)} aspect={project.videoAspect} title={projectLabel(project)} />}

          {compare && (
            <section aria-label="Before and after">
              <BeforeAfterSlider before={compare.before} after={compare.after} />
              <p className="mt-2 text-sm text-ink/60">Drag the handle to compare.</p>
            </section>
          )}

          {gallery.length > 0 && <ImageCarousel items={gallery} />}
        </div>
      </div>
    </div>
  );
}
