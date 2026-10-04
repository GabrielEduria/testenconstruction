import { ButtonLink } from "./Button";
import { cn } from "@/lib/utils";

export default function CTA({ title, text, label = "Request a Quote", href = "/en-construction/contact", tone = "dark", className }: {
  title: string; text: string; label?: string; href?: string; tone?: "dark" | "brand"; className?: string;
}) {
  const brand = tone === "brand";
  return (
    <section className={cn(brand ? "bg-brand text-ink" : "bg-ink text-white", className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
          <p className={cn("mt-3 text-base", brand ? "text-ink/75" : "text-white/70")}>{text}</p>
        </div>
        <ButtonLink href={href} variant={brand ? "dark" : "primary"}>{label}</ButtonLink>
      </div>
    </section>
  );
}
