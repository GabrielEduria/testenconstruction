"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Photo } from "@/types/project";
import { cn } from "@/lib/utils";

type Parsed = { src: string; vertical: boolean; provider: string } | null;

export function parseVideo(url: string): Parsed {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "instagram.com") {
      const m = u.pathname.match(/\/(p|reel|reels|tv)\/([\w-]+)/);
      if (!m) return null;
      const kind = m[1] === "p" ? "p" : "reel";
      return { src: `https://www.instagram.com/${kind}/${m[2]}/embed`, vertical: kind === "reel", provider: "Instagram" };
    }
    if (host === "facebook.com" || host === "fb.watch") {
      return {
        src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
        vertical: /\/reel\//.test(u.pathname),
        provider: "Facebook",
      };
    }
    if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") {
      const shorts = u.pathname.match(/^\/shorts\/([\w-]+)/);
      const id = shorts?.[1] ?? (host === "youtu.be" ? u.pathname.slice(1) : u.searchParams.get("v") ?? u.pathname.match(/^\/embed\/([\w-]+)/)?.[1]);
      if (!id) return null;
      return { src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1`, vertical: !!shorts, provider: "YouTube" };
    }
  } catch {}
  return null;
}

/** Lazy video: cover + play button; the iframe only loads after a tap. */
export default function VideoEmbed({ url, cover, aspect, title, className, autoplay }: {
  url: string; cover?: Photo; aspect?: "9:16" | "16:9"; title: string; className?: string;
  /** Load the player immediately instead of waiting for a tap. */
  autoplay?: boolean;
}) {
  const [tapped, setOn] = useState(false);
  const on = tapped || !!autoplay;
  const v = parseVideo(url);
  if (!v) return null;
  const vertical = aspect ? aspect === "9:16" : v.vertical;

  return (
    <div className={cn("relative mx-auto w-full overflow-hidden bg-ink", vertical ? "aspect-[9/16] max-w-[22rem]" : "aspect-video", className)}>
      {on ? (
        <iframe src={v.src} title={`${title} video`} className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading={autoplay ? "lazy" : undefined} />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={`Play ${v.provider} video: ${title}`}
          className="group absolute inset-0 flex items-center justify-center">
          {cover && <Image src={cover.src} alt="" fill sizes="(min-width:768px) 24rem, 90vw" className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />}
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand text-ink shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
          </span>
          <span className="absolute bottom-3 left-3 bg-ink/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white">{v.provider} video</span>
        </button>
      )}
    </div>
  );
}
