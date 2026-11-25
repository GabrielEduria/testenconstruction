/**
 * Before & after showcase on the Construction page. Files live in /public/images/projects/<slug>/.
 *
 * - `before` / `after`: two photos of the same spot (same angle works best), shown as a drag slider.
 * - `video` (optional): your own before/after MP4 in /public/videos/projects/, played with controls.
 *   Keep it H.264 MP4, 1080p or 720p, ideally under ~20 MB. `poster` is the still shown before play.
 */
export type BeforeAfterItem = {
  slug: string;
  title: string;
  sector: string;
  description: string;
  beforeLabel?: string;
  afterLabel?: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  video?: { src: string; poster: string };
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    slug: "clinic-fit-out",
    title: "Clinic Fit-out",
    sector: "Healthcare",
    description: "Storefront and interior fit-out of a clinic, from the works in progress to the finished, open-for-business frontage.",
    beforeLabel: "During",
    afterLabel: "After",
    before: { src: "/images/projects/clinic-fit-out/before.jpg", alt: "Clinic storefront during fit-out at night, with tools and materials outside" },
    after: { src: "/images/projects/clinic-fit-out/after.jpg", alt: "Finished clinic storefront with signage and glass doors" },
    // video: { src: "/videos/projects/clinic-fit-out.mp4", poster: "/images/projects/clinic-fit-out/after.jpg" },
  },
];
