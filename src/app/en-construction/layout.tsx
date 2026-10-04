import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only z-[60] bg-brand px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
