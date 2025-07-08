import { 
  Hero,
  Contact, 
  AdditionalInfo,
  ServiceCoverage,
} from "@/components/section/quote";
import Footer from '@/components/layout/Footer';

export default function SolarQuotePage() {
    return (
      <div className="relative h-auto w-auto">
        <Hero />
        <Contact />
        <AdditionalInfo />
        <ServiceCoverage />
        <Footer />
      </div>
    )
}