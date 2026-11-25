import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import CapabilityGrid from "@/components/ui/CapabilityGrid";
import ProjectGallery from "@/components/ui/ProjectGallery";
import CTA from "@/components/ui/CTA";
import { electricalCapabilities } from "@/data/content";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import { getProjectsByCategory, photoList } from "@/data/projects";

export const metadata: Metadata = {
  title: "Electrical Works",
  description: "Electrical works in Metro Manila: panelboards, meter centers, transformer and pole-line setups, and electro-mechanical installation and maintenance by EN Construction.",
  alternates: { canonical: "/en-construction/electrical" },
};

export default function ElectricalPage() {
  const projects = getProjectsByCategory("Electrical");
  const all = projects.flatMap((p) => photoList(p, "before", "during", "after"));
  const sheet = projects[0] ? photoList(projects[0], "after") : [];
  return (
    <div className="bg-steel text-white">
      {/* Technical hero */}
      <section className="grid-lines relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ink">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-brand"><span className="h-0.5 w-8 bg-brand" aria-hidden />Electrical Works</p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Safe, reliable electrical installations.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">We provide electrical works designed around safe, reliable and practical installations for construction and building projects.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/en-construction/contact?service=Electrical">Request a Quote</ButtonLink>
              <ButtonLink href="#projects" variant="outline-light">See Projects</ButtonLink>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-2" aria-label="Project photos">
            {sheet.map((img, i) => (
              <li key={img.src} className="relative aspect-[3/4] overflow-hidden border border-white/15">
                <Image src={img.src} alt={img.alt} fill priority={i < 2} sizes="(min-width:1024px) 20vw, 45vw" className="object-cover" />
                <span className="absolute left-0 top-0 bg-ink/85 px-2 py-1 font-mono text-[10px] tracking-widest text-brand">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading tone="dark" eyebrow="Capabilities" title="Structured, organized, tested." text="Clean installations and tidy wire dressing, with testing and commissioning where the job calls for it." />
        <div className="mt-12"><CapabilityGrid items={electricalCapabilities} tone="dark" /></div>
      </section>

      <section id="projects" className="border-t border-white/10 bg-ink py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading tone="dark" eyebrow="Electrical projects" title="Work we've completed" />
          <div className="mt-16 sm:mt-20"><ProjectCarousel projects={projects} tone="dark" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading tone="dark" eyebrow="Gallery" title="On site" />
        <div className="mt-10"><ProjectGallery images={all} tone="dark" /></div>
      </section>

      <CTA title="Need electrical work for your building?" text="Tell us about the scope and we'll get back to you." href="/en-construction/contact?service=Electrical" tone="brand" />
    </div>
  );
}
