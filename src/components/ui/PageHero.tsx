import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Image hero used by the home and service pages. The page's only h1 lives here.
 * Pass `video` to play a muted background loop over the image; the image stays as the
 * loading fallback and is what visitors with reduced motion see.
 */
export default function PageHero({ eyebrow, title, text, image, imageAlt, video, overlay = "bg-ink/65", children, className }: {
  eyebrow: string; title: React.ReactNode; text: string; image: string; imageAlt: string; video?: string;
  overlay?: string; children?: React.ReactNode; className?: string;
}) {
  return (
    <section className={cn("relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-ink text-white", className)}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
      {video && (
        <video className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline preload="metadata" aria-hidden>
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className={cn("absolute inset-0 -z-[5]", overlay)} aria-hidden />
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 lg:pb-28">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
          <span className="h-0.5 w-8 bg-brand" aria-hidden />{eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>
        {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
