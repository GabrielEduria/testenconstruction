import { 
  Hero,
  WhyChooseUs,
  Pricing,
 } from "@/components/section/solar";
import Footer from "@/components/layout/Footer";

export default function SolarPage () {
      return (
      <main className="relative h-auto w-auto overflow-hidden">
        <Hero />
        <WhyChooseUs />
        <Pricing />
        <Footer />
      </main>
      )
}