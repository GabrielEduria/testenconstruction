import Image from "next/image";
import { cn } from "@/lib/utils";

/** Masonry-style gallery that keeps each photo's own proportions (no stretching, no awkward crops). */
export default function ProjectGallery({ images, tone = "light" }: { images: { src: string; alt: string }[]; tone?: "light" | "dark" }) {
  return (
    <ul className="columns-2 gap-3 sm:gap-4 lg:columns-4">
      {images.map((img) => (
        <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4">
          <figure className={cn("overflow-hidden", tone === "dark" ? "bg-white/5" : "bg-concrete")}>
            <Image src={img.src} alt={img.alt} width={800} height={600} sizes="(min-width:1024px) 22vw, 46vw"
              className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]" />
          </figure>
        </li>
      ))}
    </ul>
  );
}
