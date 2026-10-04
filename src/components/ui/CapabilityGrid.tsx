import type { Capability } from "@/data/content";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function CapabilityGrid({ items, tone = "light" }: { items: Capability[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-px border sm:grid-cols-2 lg:grid-cols-4", dark ? "border-white/10 bg-white/10" : "border-ink/10 bg-ink/10")}>
      {items.map(({ title, text, icon: Icon }, i) => (
        <li key={title} className={dark ? "bg-steel" : "bg-paper"}>
          <Reveal delay={i * 60} className="h-full p-6 sm:p-7">
            <Icon className="h-7 w-7 text-brand" aria-hidden strokeWidth={1.75} />
            <h3 className={cn("mt-5 text-lg font-semibold", dark ? "text-white" : "text-ink")}>{title}</h3>
            <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/65" : "text-ink/65")}>{text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
