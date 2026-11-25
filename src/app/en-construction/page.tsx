import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, ShieldCheck, Handshake, Ruler } from "lucide-react";
import HeroShowreel, { type ShowreelSlide } from "@/components/ui/HeroShowreel";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import CTA from "@/components/ui/CTA";
import Faq from "@/components/sections/Faq";
import { getProjects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "EN Construction | Construction, Electrical Works & Solar in Metro Manila" },
  description: "EN Construction provides construction services, electrical works and solar installation for homes and buildings across Metro Manila, from our base in Valenzuela City.",
  alternates: { canonical: "/en-construction" },
};

const services = [
  { href: "/en-construction/construction", title: "Construction", need: "Building or renovating?", text: "General design, construction and renovation, built around quality workmanship.", image: "/images/hero-crew.jpg", alt: "EN Construction crew fitting out a coffee shop interior" },
  { href: "/en-construction/electrical", title: "Electrical", need: "Power, panels or metering?", text: "Panelboards, meter centers, transformer setups and electro-mechanical works.", image: "/images/projects/hospital-panelboard/3.jpg", alt: "Installed electrical panelboard with organized wiring" },
  { href: "/en-construction/solar", title: "Solar", need: "Going solar?", text: "Grid-tied solar systems, from site assessment to installation and upkeep.", image: "/images/solar-roof.jpg", alt: "Solar panels installed on a roof" },
];

/**
 * Home hero clips, in headline order. Drop MP4s into /public/videos and set `video` on each slide.
 * Clip spec: H.264 MP4, 1920x1080 or 1280x720, 6-8 s, no audio, under ~4 MB.
 */
const showreel: ShowreelSlide[] = [
  { label: "Construction", poster: "/images/hero-crew.jpg", posterAlt: "EN Construction crew fitting out a coffee shop interior" /* , video: "/videos/home-construction.mp4" */ },
  { label: "Electrical", poster: "/images/electric.png", posterAlt: "Neatly wired electrical control panel with breakers and terminal blocks" /* , video: "/videos/home-electrical.mp4" */ },
  { label: "Solar", poster: "/images/solar-roof.jpg", posterAlt: "Solar panels installed on a roof", video: "/videos/solarvideo.mp4" },
];

const strengths = [
  { icon: HardHat, title: "Quality workmanship", text: "Careful execution and clean, organized work, from wire dressing to finishing." },
  { icon: ShieldCheck, title: "Safety first", text: "Safe installations and site practices on every job." },
  { icon: Ruler, title: "Design to turnover", text: "General design, construction and equipment supply under one company." },
  { icon: Handshake, title: "Tailored to you", text: "Services shaped around your property, your scope and your needs." },
];

const jsonLd = {
  "@context": "https://schema.org", "@type": "GeneralContractor", name: site.name, url: `${site.url}${site.base}`,
  telephone: site.phones[0], email: site.emails[0],
  address: { "@type": "PostalAddress", streetAddress: "Gen. T. de Leon", addressLocality: "Valenzuela City", addressRegion: "Metro Manila", addressCountry: "PH" },
  areaServed: "Metro Manila", description: site.description,
};

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroShowreel
        eyebrow="Valenzuela City, Metro Manila"
        text="We build, power and equip homes and buildings across Metro Manila, with dependable workmanship from design to turnover."
        slides={showreel}
      >
        <ButtonLink href="#projects">Explore Our Work</ButtonLink>
        <ButtonLink href="/en-construction/contact" variant="outline-light">Request a Quote</ButtonLink>
      </HeroShowreel>

      {/* Company introduction */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-28 sm:px-8 sm:py-40 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading eyebrow="Who we are" title="General design and construction, with electrical and solar in-house." />
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/75">
            EN Construction provides general design and construction, along with the supply, installation and maintenance of electro-mechanical equipment. We work with homeowners, building owners and institutions to deliver safe, reliable results that are tailored to each project.
          </p>
          <p className="mt-5 leading-relaxed text-ink/70">
            From a townhouse renovation to a hospital panelboard and a three-pole transformer setup, our work is practical, organized and built to last.
          </p>
        </Reveal>
      </section>

      {/* Three services */}
      <section className="bg-concrete/60 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="What we do" title="Three services, one team" text="Pick the service that fits your project to see what we offer and the work we've completed." />
          <ul className="mt-16 sm:mt-20 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 80}>
                  <Link href={s.href} className="group block bg-paper">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                      <Image src={s.image} alt={s.alt} fill sizes="(min-width:768px) 33vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden />
                      <h3 className="absolute bottom-5 left-5 text-3xl font-bold text-white">{s.title}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-ink/70">{s.text}</p>
                      <span className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-ink group-hover:gap-3">View {s.title} <ArrowRight className="h-4 w-4 transition-all" aria-hidden /></span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected projects */}
      <section id="projects" className="bg-ink py-28 text-white sm:py-40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading tone="dark" eyebrow="Selected work" title="Projects we've completed" text="Real jobs, photographed on site." />
          <ul className="mt-16 sm:mt-20 grid gap-x-8 gap-y-14 md:grid-cols-12">
            {projects.map((p, i) => (
              <li key={p.slug} className={i % 4 === 0 || i % 4 === 3 ? "md:col-span-7" : "md:col-span-5"}>
                <Reveal><ProjectCard project={p} tone="dark" sizes="(min-width:768px) 56vw, 92vw" /></Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-20 flex flex-wrap gap-3">
            <ButtonLink href="/en-construction/construction" variant="outline-light">Construction projects</ButtonLink>
            <ButtonLink href="/en-construction/electrical" variant="outline-light">Electrical projects</ButtonLink>
          </div>
        </div>
      </section>

      {/* About + why */}
      <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Why EN Construction" title="Dependable work, done properly" text="Our aim is to be a trusted name in design and construction, delivering solutions that serve businesses and communities with high standards of quality, safety and reliability." />
          <ul className="grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {strengths.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-paper p-6">
                <Icon className="h-7 w-7 text-brand" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq />
      <CTA title="Tell us about your project" text="Construction, electrical or solar, send us the details and we'll get back to you." tone="brand" />
    </>
  );
}
