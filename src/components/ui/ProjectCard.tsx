import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Photo-led card: the photograph is the focus, text sits below the image. */
export default function ProjectCard({ project, className, tone = "light", sizes = "(min-width:1024px) 40vw, 90vw" }: {
  project: Project; className?: string; tone?: "light" | "dark"; sizes?: string;
}) {
  const dark = tone === "dark";
  const cover = project.images[0];
  return (
    <article className={cn("group", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-concrete">
        <Image src={cover.src} alt={cover.alt} fill sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span className="absolute left-0 top-0 bg-brand px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
          {project.category}
        </span>
      </div>
      <p className={cn("mt-4 font-mono text-xs uppercase tracking-[0.16em]", dark ? "text-white/55" : "text-ink/55")}>{project.sector}</p>
      <h3 className={cn("mt-1 text-xl font-semibold leading-snug", dark ? "text-white" : "text-ink")}>{project.title}</h3>
      <p className={cn("mt-2 max-w-prose text-sm leading-relaxed", dark ? "text-white/65" : "text-ink/65")}>{project.description}</p>
    </article>
  );
}
