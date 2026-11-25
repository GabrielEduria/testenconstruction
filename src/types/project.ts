export type Category = "Construction" | "Electrical" | "Solar";
export type Stage = "before" | "during" | "after";

export interface Photo {
  src: string;
  /** Small version (600px) used for thumbnails. Falls back to src. */
  thumb?: string;
  alt: string;
}

export interface Project {
  slug: string;
  /** Empty strings are hidden in the UI. */
  title: string;
  categories: Category[];
  sector: string;
  location: string;
  description: string;
  details: string[];
  /** Instagram, Facebook or YouTube URL. */
  video?: string;
  /** Override the video frame when the default (9:16 reels, 16:9 otherwise) is wrong. */
  videoAspect?: "9:16" | "16:9";
  /** Cover for video-only projects (or to override the first photo). */
  cover?: Photo;
  photos: Partial<Record<Stage, Photo[]>>;
}
