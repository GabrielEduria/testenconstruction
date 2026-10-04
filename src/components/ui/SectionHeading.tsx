import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, text, tone = "light", className }: {
  eyebrow?: string; title: string; text?: string; tone?: "light" | "dark"; className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("mb-3 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em]", dark ? "text-brand" : "text-brand-ink")}>
          <span className="h-0.5 w-8 bg-current" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl font-bold leading-tight tracking-tight sm:text-4xl", dark ? "text-white" : "text-ink")}>{title}</h2>
      {text && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-ink/70")}>{text}</p>}
    </div>
  );
}
