import type { Metadata } from "next";

/** Private area: its own layout (no public navbar or footer), hidden from search engines, absent from nav and sitemap. */
export const metadata: Metadata = {
  title: { absolute: "Admin | EN Construction" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-dvh">{children}</main>;
}
