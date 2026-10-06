import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import CapabilityGrid from "@/components/ui/CapabilityGrid";
import ProjectGallery from "@/components/ui/ProjectGallery";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import { constructionCapabilities } from "@/data/content";
import { getProjectsByCategory } from "@/sanity/projects";

export const metadata: Metadata = {
  title: "Construction Services",
  description: "General design, construction and renovation in Metro Manila. EN Construction delivers quality workmanship and durable results for residential and commercial projects.",
  alternates: { canonical: "/en-construction/construction" },
};

const scope = ["Architectural and engineering design", "New construction", "Interior and exterior renovation", "Structural improvements", "Supply and installation of materials and equipment", "Maintenance of electro-mechanical equipment"];

export default async function ConstructionPage() {
  const projects = await getProjectsByCategory("construction");
  const project = projects[0];
  return (
    <>
      <PageHero eyebrow="Construction" title="Construction built on quality workmanship."
        text="From general design to complete renovation, we turn plans into durable, functional spaces."
        image="/images/architecture-bw.jpg" imageAlt="Black and white view of a modern steel-framed building"
        overlay="bg-gradient-to-r from-ink/90 via-ink/65 to-ink/40">
        <ButtonLink href="/en-construction/contact?service=Construction">Request a Quote</ButtonLink>
        <ButtonLink href="#projects" variant="outline-light">See Projects</ButtonLink>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading eyebrow="Overview" title="Practical execution, durable results." />
        <Reveal><p className="text-lg leading-relaxed text-ink/75">We provide reliable construction services focused on quality workmanship, practical execution and durable results. Whether you are building from the ground up or upgrading an existing space, we keep each project organized from design through turnover.</p></Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8" aria-labelledby="cap">
        <h2 id="cap" className="sr-only">Construction capabilities</h2>
        <CapabilityGrid items={constructionCapabilities} />
      </section>

      <section className="bg-concrete/60 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Scope of work" title="What we can take on" />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {scope.map((s) => <li key={s} className="flex gap-3 border-t border-ink/15 py-4 text-sm font-medium"><span className="mt-1.5 h-2 w-2 shrink-0 bg-brand" aria-hidden />{s}</li>)}
          </ul>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {project ? (
          <>
            <SectionHeading
              eyebrow="Project"
              title={project.title}
              text={project.description}
            />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-ink/55">
              {project.sector} · {project.category}
            </p>
            <div className="mt-10">
              <ProjectGallery images={project.images} />
            </div>
          </>
        ) : (
          <SectionHeading
            eyebrow="Projects"
            title="Construction projects"
            text="Our construction project gallery will be updated as projects are added."
          />
        )}
      </section>

      <CTA title="Planning a build or renovation?" text="Share your scope and we'll get back to you with next steps." href="/en-construction/contact?service=Construction" />
    </>
  );
}
