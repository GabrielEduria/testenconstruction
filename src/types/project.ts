export type Category = "Construction" | "Electrical" | "Solar";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  sector: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
}