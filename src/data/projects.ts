import type { Category, Photo, Project, Stage } from "@/types/project";

/** Photos produced by `npm run images` (public/projects/<slug>/<stage>/<n>.webp + -thumb). */
const stage = (slug: string, st: Stage, count: number, alt: string): Photo[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/projects/${slug}/${st}/${i + 1}.webp`,
    thumb: `/projects/${slug}/${st}/${i + 1}-thumb.webp`,
    alt: count > 1 ? `${alt}, photo ${i + 1}` : alt,
  }));

/** Original project photos (public/images/projects/<dir>/1-4.jpg). */
const legacy = (dir: string, alt: string): Photo[] =>
  [1, 2, 3, 4].map((n) => ({ src: `/images/projects/${dir}/${n}.jpg`, alt: `${alt}, photo ${n}` }));

const blank = { title: "", sector: "", location: "", description: "", details: [] as string[] };

export const projects: Project[] = [
  {
    ...blank,
    slug: "clinic",
    title: "Clinic",
    categories: ["Construction"],
    photos: {
      during: stage("clinic", "during", 2, "Clinic project in progress"),
      after: stage("clinic", "after", 2, "Completed clinic project"),
    },
  },
  {
    ...blank,
    slug: "coffee-shop",
    title: "Coffee Shop",
    categories: ["Construction"],
    video: "https://www.instagram.com/p/DZ-Fw44BDGX/",
    videoAspect: "9:16",
    photos: {
      during: stage("coffee-shop", "during", 2, "Coffee shop project in progress"),
      after: stage("coffee-shop", "after", 1, "Completed coffee shop project"),
    },
  },
  {
    ...blank,
    slug: "gym",
    title: "Commercial Gym",
    categories: ["Construction"],
    photos: {
      during: stage("gym", "during", 2, "Commercial gym project in progress"),
      after: stage("gym", "after", 2, "Completed commercial gym project"),
    },
  },
  {
    ...blank,
    slug: "hospital-panelboard",
    title: "Hospital Panelboard Installation",
    categories: ["Electrical"],
    sector: "Institutional",
    description:
      "Delivery, installation and organized wire dressing of a panelboard to ensure safe and efficient power distribution within the hospital.",
    photos: { after: legacy("hospital-panelboard", "Color-coded wiring inside an installed panelboard") },
  },
  {
    ...blank,
    slug: "condominium-meter-center",
    title: "Condominium Meter Center",
    categories: ["Electrical"],
    sector: "Condominium",
    description: "Supply and professional installation of the meter center for reliable and efficient electrical distribution.",
    photos: { after: legacy("condominium-meter-center", "Meter center installation in a condominium electrical room") },
  },
  {
    ...blank,
    slug: "transformer-pole",
    title: "Three-Pole Transformer Setup",
    categories: ["Electrical"],
    sector: "Institutional",
    description:
      "Supply and installation of a first private 3-tandem pole setup with three 333 kVA transformer attachments, including testing and commissioning to ensure full operational reliability.",
    photos: { after: legacy("transformer-pole", "Crew installing pole-mounted transformers on site") },
  },
  {
    ...blank,
    slug: "townhouse-renovation",
    title: "Two-Bedroom Townhouse Renovation",
    categories: ["Construction"],
    sector: "Residential",
    description:
      "Complete interior and exterior renovation of a two-bedroom townhouse, covering structural improvements, aesthetic upgrades and functional enhancements to elevate overall living quality.",
    photos: { after: legacy("townhouse-renovation", "Renovated townhouse interior") },
  },
];

/** Solar first, then the rest in file order. */
const solarFirst = (list: Project[]) => [
  ...list.filter((p) => p.categories.includes("Solar")),
  ...list.filter((p) => !p.categories.includes("Solar")),
];

export const getProjects = () => solarFirst(projects);
export const getProjectsByCategory = (c: Category) => solarFirst(projects.filter((p) => p.categories.includes(c)));

/** Derived view helpers, shared by all project components. */
export const photoList = (p: Project, ...stages: Stage[]) => stages.flatMap((s) => p.photos[s] ?? []);
export const coverOf = (p: Project): Photo | undefined => p.cover ?? p.photos.after?.[0] ?? p.photos.during?.[0] ?? p.photos.before?.[0];
export const compareOf = (p: Project) => {
  const before = p.photos.before?.[0], after = p.photos.after?.[0];
  return before && after ? { before, after } : null;
};
/** Photos for the carousel: everything except the pair used by the before/after slider. */
export const galleryOf = (p: Project): (Photo & { stage: Stage })[] => {
  const cmp = compareOf(p);
  return (["before", "during", "after"] as Stage[]).flatMap((s) =>
    (p.photos[s] ?? []).filter((ph) => ph !== cmp?.before && ph !== cmp?.after).map((ph) => ({ ...ph, stage: s })),
  );
};
export const stageLabel: Record<Stage, string> = { before: "Before", during: "In progress", after: "Completed" };
export const projectLabel = (p: Project) => p.title || `${p.categories.join(" / ")} project`;
