import type { Metadata } from "next";
import Image from "next/image";
import { Check, Sun } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import CapabilityGrid from "@/components/ui/CapabilityGrid";
import ProjectGallery from "@/components/ui/ProjectGallery";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import { solarBenefits, solarPackages, solarProcess, solarServices } from "@/data/content";
import { getProjectsByCategory } from "@/sanity/projects";

export const metadata: Metadata = {
  title: "Solar Installation",
  description: "Grid-tied solar installation for homes and businesses in Metro Manila. Site assessment, supply and installation, net-metering-ready systems and a 3-year warranty.",
  alternates: { canonical: "/en-construction/solar" },
};

export default async function SolarPage() {
  const projects = await getProjectsByCategory("solar");
  const all = projects.flatMap((p) => p.images);

  return (
    <div className="bg-sky/60">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src="/images/solar-roof.jpg" alt="Solar panels on a tiled roof under a clear sky" fill priority sizes="100vw" className="-z-20 object-cover" />
        <video className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline preload="metadata" aria-hidden>
          <source src="/videos/solarvideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40" aria-hidden />
        <div className="mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 sm:px-8 lg:pb-24">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-brand"><span className="h-0.5 w-8 bg-brand" aria-hidden />Solar</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Solar systems, installed properly.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">We help property owners adopt reliable renewable energy through practical installation and project execution.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/en-construction/contact?service=Solar">Get a Solar Quote</ButtonLink>
            <ButtonLink href="#packages" variant="outline-light">See Packages</ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading eyebrow="Overview" title="Power your property with the sun." />
        <Reveal><p className="text-lg leading-relaxed text-ink/75">Our grid-tied solar systems are designed around your roof and your energy use, then installed and tested by our own team. Every installation comes with a 3-year warranty.</p></Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8" aria-labelledby="svc"><h2 id="svc" className="sr-only">Solar services</h2><CapabilityGrid items={solarServices} /></section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="How it works" title="From first call to turnover" />
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {solarProcess.map((s, i) => (
              <li key={s.title} className="border-t-4 border-brand pt-4">
                <span className="font-mono text-sm text-brand-ink">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Packages" title="Indicative pricing for grid-tied systems" text="Typical installed price ranges in Metro Manila. The final quote depends on your roof, brand selection and a site survey." />
        <ul className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
          {solarPackages.map((p) => (
            <li key={p.name} className={`flex flex-col border bg-white p-7 ${p.featured ? "border-2 border-brand shadow-lg" : "border-ink/15"}`}>
              {p.featured && <p className="mb-3 w-fit bg-brand px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider">Most requested</p>}
              <h3 className="text-xl font-bold">{p.name} <span className="font-mono text-base font-medium text-ink/55">· {p.size}</span></h3>
              <p className="mt-1 text-sm text-ink/60">{p.fit}</p>
              <p className="mt-6 text-2xl font-bold tracking-tight">{p.price}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.points.map((pt) => <li key={pt} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden />{pt}</li>)}
              </ul>
              <ButtonLink href="/en-construction/contact?service=Solar" variant={p.featured ? "primary" : "dark"} className="mt-8">Request this quote</ButtonLink>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink/60">Ranges are estimates for grid-tied systems without batteries. Hybrid or battery-backed systems cost more. Net-metering approval is subject to your utility.</p>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="Practical benefits" title="Why property owners go solar" />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {solarBenefits.map((b) => (
              <li key={b.title} className="flex gap-4"><Sun className="mt-1 h-6 w-6 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                <div><h3 className="text-lg font-semibold">{b.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-ink/65">{b.text}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        {projects.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Solar projects"
              title="Our solar installations"
            />

            <div className="mt-10">
              <ProjectGallery images={all} />
            </div>
          </>
        ) : (
          <SectionHeading
            eyebrow="Solar projects"
            title="Solar project gallery"
            text="Our solar project gallery will be updated as completed installations are added."
          />
        )}
      </section>
      <CTA title="Ready to see what solar looks like for your roof?" text="Send us your details and your average monthly bill and we'll get back to you." label="Get a Solar Quote" href="/en-construction/contact?service=Solar" tone="brand" />
    </div>
  );
}
