import Image from "next/image";
import { Play } from "lucide-react";
import type { Project } from "@/types/project";
import { coverOf, photoList, projectLabel } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Photo-led card: fixed 4:3 image, text below. Empty fields are hidden. Renders as a button when onOpen is given. */
export default function ProjectCard({ project, className, tone = "light", sizes = "(min-width:1024px) 32vw, (min-width:640px) 46vw, 85vw", onOpen, priority }: {
  project: Project; className?: string; tone?: "light" | "dark"; sizes?: string; onOpen?: () => void; priority?: boolean;
}) {
  const dark = tone === "dark";
  const cover = coverOf(project);
  const meta = [project.sector, project.location].filter(Boolean).join(" · ");
  const count = photoList(project, "before", "during", "after").length;
  const caption = project.title || [project.categories.join(" / "), count ? `${count} photo${count > 1 ? "s" : ""}` : project.video ? "Video" : ""].filter(Boolean).join(" · ");

  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-concrete">
        {cover && (
          <Image src={cover.src} alt={cover.alt} fill sizes={sizes} priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-active:scale-[1.02]" />
        )}
        <span className="absolute left-0 top-0 bg-brand px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
          {project.categories[0]}
        </span>
        {project.video && (
          <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-ink shadow-lg" aria-hidden>
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        )}
      </div>
      {meta && <p className={cn("mt-4 font-mono text-xs uppercase tracking-[0.16em]", dark ? "text-white/55" : "text-ink/55")}>{meta}</p>}
      <h3 className={cn(meta ? "mt-1" : "mt-4", "text-lg font-semibold leading-snug sm:text-xl", dark ? "text-white" : "text-ink")}>{caption}</h3>
      {project.description && (
        <p className={cn("mt-2 line-clamp-3 max-w-prose text-base leading-relaxed sm:text-sm", dark ? "text-white/65" : "text-ink/65")}>{project.description}</p>
      )}
    </>
  );

  if (!onOpen) return <article className={cn("group", className)}>{body}</article>;
  return (
    <button type="button" onClick={onOpen} aria-label={`Open project: ${projectLabel(project)}`} className={cn("group block w-full text-left", className)}>
      {body}
    </button>
  );
}
