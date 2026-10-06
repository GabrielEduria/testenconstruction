import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import CapabilityGrid from "@/components/ui/CapabilityGrid";
import ProjectGallery from "@/components/ui/ProjectGallery";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import { electricalCapabilities } from "@/data/content";
import { getProjectsByCategory } from "@/sanity/projects";

export const metadata: Metadata = {
  title: "Electrical Works",
  description: "Electrical works in Metro Manila: panelboards, meter centers, transformer and pole-line setups, and electro-mechanical installation and maintenance by EN Construction.",
  alternates: { canonical: "/en-construction/electrical" },
};

export default async function ElectricalPage() {
  const projects = await getProjectsByCategory("electrical");
  const all = projects.flatMap((p: { images: any; }) => p.images);
  const sheet = projects[0]?.images ?? [];
  return (
    <div className="bg-steel text-white">
      {/* Technical hero */}
      <section className="grid-lines relative overflow-hidden bg-ink">
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pb-24 lg:pt-28">
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

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading tone="dark" eyebrow="Capabilities" title="Structured, organized, tested." text="Clean installations and tidy wire dressing, with testing and commissioning where the job calls for it." />
        <div className="mt-12"><CapabilityGrid items={electricalCapabilities} tone="dark" /></div>
      </section>

      <section id="projects" className="border-t border-white/10 bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading tone="dark" eyebrow="Electrical projects" title="Work we've completed" />
          <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Reveal className="grid gap-6 py-10 lg:grid-cols-[5rem_1fr_1.3fr]">
                  <span className="font-mono text-3xl font-semibold text-brand">0{i + 1}</span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">{p.sector} · {p.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">{p.description}</p>
                  </div>
                  <ul className="grid grid-cols-4 gap-2">
                    {p.images.map((img) => (
                      <li key={img.src} className="relative aspect-square overflow-hidden bg-white/5">
                        <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 12vw, 22vw" className="object-cover" />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading tone="dark" eyebrow="Gallery" title="On site" />
        <div className="mt-10"><ProjectGallery images={all} tone="dark" /></div>
      </section>

      <CTA title="Need electrical work for your building?" text="Tell us about the scope and we'll get back to you." href="/en-construction/contact?service=Electrical" tone="brand" />
    </div>
  );
}
