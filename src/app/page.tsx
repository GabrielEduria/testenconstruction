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
import NavbarHome from '@/components/layout/NavbarHome';

export default function Page() {
  return (
      <main className="relative h-auto w-auto overflow-hidden">
        <NavbarHome />
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
