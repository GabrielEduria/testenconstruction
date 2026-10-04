import Image from "next/image";
import { cn } from "@/lib/utils";

/** Image hero used by the home and service pages. The page's only h1 lives here. */
export default function PageHero({ eyebrow, title, text, image, imageAlt, overlay = "bg-ink/65", children, className }: {
  eyebrow: string; title: React.ReactNode; text: string; image: string; imageAlt: string;
  overlay?: string; children?: React.ReactNode; className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink text-white", className)}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className={cn("absolute inset-0 -z-10", overlay)} aria-hidden />
      <div className="mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 sm:px-8 lg:pb-24">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
          <span className="h-0.5 w-8 bg-brand" aria-hidden />{eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
