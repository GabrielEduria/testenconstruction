import { 
  Hero,
  WhyChooseUs,
  Pricing,
  Footer
 } from "@/components/section/solar";

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