import {
   Hero, 
   About,
   Vision,
   Mission,
   Services,
   Projects,
   Faq,
} from '@/components/section/homepage';
import Footer from '@/components/layout/Footer';

export default function Page() {
  return (
      <main className="relative h-auto w-auto overflow-hidden">
        <Hero />
        <About />
        <Vision />
        <Mission />
        <Services />
        <Projects />
        <Faq />
        <Footer />
      </main>
  );
}
