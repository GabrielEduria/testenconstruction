"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type ShowreelSlide = {
  /** Word shown in the headline, e.g. "Construction". */
  label: string;
  /** Still image: shown while the clip loads, for slides without a clip, and for reduced-motion visitors. */
  poster: string;
  posterAlt: string;
  /** Optional MP4 in /public/videos. Without it the poster is shown with a slow zoom. */
  video?: string;
};

/** How long a slide without a video stays on screen. Video slides advance when the clip ends. */
const IMAGE_MS = 7000;

/**
 * Full-screen home hero that cycles through one clip per service and highlights
 * the matching word in the headline. Only the clip on screen is loaded.
 */
export default function HeroShowreel({ slides, eyebrow, text, children }: {
  slides: ShowreelSlide[]; eyebrow: string; text: string; children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [videoMs, setVideoMs] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slide = slides[active];
  const playing = !paused && !reduced;
  const next = () => { setVideoMs(null); setActive((i) => (i + 1) % slides.length); };
  const go = (i: number) => { setVideoMs(null); setActive(i); };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, active]);

  const showVideo = Boolean(slide.video) && !reduced;
  // Image slides advance when the progress bar finishes; video slides when the clip ends.
  const barMs = showVideo ? videoMs : IMAGE_MS;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-ink text-white" aria-roledescription="carousel" aria-label="Our services">
      {slides.map((s, i) => (
        <div key={s.label} className={cn("absolute inset-0 -z-20 transition-opacity duration-1000", i === active ? "opacity-100" : "opacity-0")} aria-hidden={i !== active}>
          <Image src={s.poster} alt={s.posterAlt} fill priority={i === 0} sizes="100vw"
            className={cn("object-cover", !s.video && i === active && playing && "animate-[kenburns_9s_ease-out_forwards]")} />
          {i === active && showVideo && (
            <video ref={videoRef} key={s.video} className="absolute inset-0 h-full w-full object-cover" autoPlay={playing} muted playsInline preload="auto" aria-hidden
              poster={s.poster}
              onLoadedMetadata={(e) => setVideoMs(e.currentTarget.duration * 1000)}
              onEnded={next} onError={() => setVideoMs(IMAGE_MS)}>
              <source src={s.video} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/35" aria-hidden />

      <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 lg:pb-16">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
          <span className="h-0.5 w-8 bg-brand" aria-hidden />{eyebrow}
        </p>
        <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
          {slides.map((s, i) => (
            <span key={s.label} className={cn("block transition-colors duration-700", i === active ? "text-brand" : "text-white")}>{s.label}.</span>
          ))}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>
        {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}

        {/* Slide controls: one tab per service with a progress bar, plus pause */}
        <div className="mt-16 flex items-center gap-4 sm:mt-20">
          <ul className="grid min-w-0 flex-1 grid-cols-3 gap-3 sm:max-w-md">
            {slides.map((s, i) => (
              <li key={s.label}>
                <button type="button" onClick={() => go(i)} aria-label={`Show ${s.label}`} aria-current={i === active}
                  className="group block w-full pb-2 pt-3 text-left">
                  <span className={cn("block truncate font-mono text-[10px] uppercase tracking-[0.08em] transition-colors sm:text-[11px] sm:tracking-[0.16em]", i === active ? "text-white" : "text-white/50 group-hover:text-white/80")}>{s.label}</span>
                  <span className="mt-2 block h-0.5 w-full overflow-hidden bg-white/20">
                    {i === active && barMs != null && (
                      <span key={`${active}-${barMs}`} className="block h-full w-full origin-left bg-brand animate-[progress_linear_forwards]"
                        style={{ animationDuration: `${barMs}ms`, animationPlayState: playing ? "running" : "paused" }}
                        onAnimationEnd={() => { if (!showVideo && playing) next(); }} />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {!reduced && (
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play background video" : "Pause background video"}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white">
              {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
