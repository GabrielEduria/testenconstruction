import { 
  Hero,
  WhyChooseUs,
  Pricing
 } from "@/components/section/solar";

export default function SolarPage () {
      return (
      <main className="relative h-auto w-auto overflow-hidden">
        <Hero />
        <WhyChooseUs />
        <Pricing />
      </main>
      )
}