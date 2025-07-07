import {
   Hero, 
   About,
   Vision,
   Mission,
   Services,
   Projects,
   Faq,
   Footer 
} from '@/components/section/homepage';


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
