import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import CapabilityGrid from "@/components/ui/CapabilityGrid";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import { constructionCapabilities } from "@/data/content";
import { getProjectsByCategory } from "@/data/projects";
import { beforeAfter } from "@/data/beforeAfter";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Construction Services",
  description: "General design, construction and renovation in Metro Manila. EN Construction delivers quality workmanship and durable results for residential and commercial projects.",
  alternates: { canonical: "/en-construction/construction" },
};

const scope = ["Architectural and engineering design", "New construction", "Interior and exterior renovation", "Structural improvements", "Supply and installation of materials and equipment", "Maintenance of electro-mechanical equipment"];

export default function ConstructionPage() {
  const projects = getProjectsByCategory("Construction");
  return (
    <>
      <PageHero eyebrow="Construction" title="Construction built on quality workmanship."
        text="From general design to complete renovation, we turn plans into durable, functional spaces."
        image="/images/hero-crew.jpg" imageAlt="EN Construction crew fitting out a coffee shop interior"
        overlay="bg-gradient-to-r from-ink/90 via-ink/65 to-ink/40">
        <ButtonLink href="/en-construction/contact?service=Construction">Request a Quote</ButtonLink>
        <ButtonLink href="#projects" variant="outline-light">See Projects</ButtonLink>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading eyebrow="Overview" title="Practical execution, durable results." />
        <Reveal><p className="text-lg leading-relaxed text-ink/75">We provide reliable construction services focused on quality workmanship, practical execution and durable results. Whether you are building from the ground up or upgrading an existing space, we keep each project organized from design through turnover.</p></Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36" aria-labelledby="cap">
        <h2 id="cap" className="sr-only">Construction capabilities</h2>
        <CapabilityGrid items={constructionCapabilities} />
      </section>

      <section className="bg-concrete/60 py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Scope of work" title="What we can take on" />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {scope.map((s) => <li key={s} className="flex gap-3 border-t border-ink/15 py-4 text-sm font-medium"><span className="mt-1.5 h-2 w-2 shrink-0 bg-brand" aria-hidden />{s}</li>)}
          </ul>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <SectionHeading eyebrow="Projects" title="Construction projects" text="Tap a project to see its photos." />
        <div className="mt-16 sm:mt-20"><ProjectCarousel projects={projects} /></div>
      </section>

      {beforeAfter.length > 0 && (
        <section id="before-after" className="bg-ink py-28 text-white sm:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading tone="dark" eyebrow="Before & after" title="See the difference" text="Drag the handle to compare each space during the works and after turnover." />
            <ul className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
              {beforeAfter.map((item) => (
                <li key={item.slug}>
                  <Reveal className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                    <BeforeAfterSlider before={item.before} after={item.after} beforeLabel={item.beforeLabel} afterLabel={item.afterLabel} />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">{item.sector} · Construction</p>
                      <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{item.title}</h3>
                      <p className="mt-4 max-w-prose leading-relaxed text-white/70">{item.description}</p>
                      {item.video && (
                        <video className="mt-8 aspect-video w-full bg-black" controls playsInline preload="none" poster={item.video.poster}>
                          <source src={item.video.src} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTA title="Planning a build or renovation?" text="Share your scope and we'll get back to you with next steps." href="/en-construction/contact?service=Construction" />
    </>
  );
}
