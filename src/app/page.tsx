import {
   Hero, 
   About,
   Vision,
   Mission,
   Services,
   Projects,
   Faq,
   Contact, 
   Footer 
} from '@/section';
import Navbar from '@/components/layout/Navbar';

export default function Page() {
  return (
      <main className="relative h-auto w-auto overflow-hidden">
        <Navbar />
        <Hero />
        <About />
        <Vision />
        <Mission />
        <Services />
        <Projects />
        <Faq />
        <Contact />
        <Footer />
      </main>
  );
}
