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
} from '@/section/homepage';


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
        <Contact />
        <Footer />
      </main>
  );
}
