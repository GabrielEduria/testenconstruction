export type Category = "Construction" | "Electrical";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  sector: string;
  description: string;
  images: { src: string; alt: string }[];
}

const photos = (dir: string, alt: string) =>
  [1, 2, 3, 4].map((n) => ({ src: `/images/projects/${dir}/${n}.jpg`, alt: `${alt}, photo ${n}` }));

export const projects: Project[] = [
  {
    slug: "hospital-panelboard",
    title: "Hospital Panelboard Installation",
    category: "Electrical",
    sector: "Institutional",
    description:
      "Delivery, installation and organized wire dressing of a panelboard to ensure safe and efficient power distribution within the hospital.",
    images: photos("hospital-panelboard", "Color-coded wiring inside an installed panelboard"),
  },
  {
    slug: "condominium-meter-center",
    title: "Condominium Meter Center",
    category: "Electrical",
    sector: "Condominium",
    description:
      "Supply and professional installation of the meter center for reliable and efficient electrical distribution.",
    images: photos("condominium-meter-center", "Meter center installation in a condominium electrical room"),
  },
  {
    slug: "transformer-pole",
    title: "Three-Pole Transformer Setup",
    category: "Electrical",
    sector: "Institutional",
    description:
      "Supply and installation of a first private 3-tandem pole setup with three 333 kVA transformer attachments, including testing and commissioning to ensure full operational reliability.",
    images: photos("transformer-pole", "Crew installing pole-mounted transformers on site"),
  },
  {
    slug: "townhouse-renovation",
    title: "Two-Bedroom Townhouse Renovation",
    category: "Construction",
    sector: "Residential",
    description:
      "Complete interior and exterior renovation of a two-bedroom townhouse, covering structural improvements, aesthetic upgrades and functional enhancements to elevate overall living quality.",
    images: photos("townhouse-renovation", "Renovated townhouse interior"),
  },
];

export const bySlug = (s: string) => projects.find((p) => p.slug === s)!;
export const byCategory = (c: Category) => projects.filter((p) => p.category === c);
