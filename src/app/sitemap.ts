import type { MetadataRoute } from "next";
import { nav, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "monthly", priority: l.href === site.base ? 1 : 0.7 }));
}
