import Motion from "@/components/animation/Motion";
import Button from "@/components/ui/Button";


export default function About() {
  return (
    <section id="about" className="w-full h-auto py-5  pt-10 scroll-mt-10 lg:scroll-mt-10">
      <Motion>
          <div className="max-w-[1200px] text-center  mx-auto p-5">
              <h1 className="text-3xl lg:text-3xl font-bold pb-5 text-orange-400">
                About us
              </h1>
              <h2 className="text-3xl lg:text-5xl font-bold pb-5 text-blue-800">
                  We specialize in General Design and Construction
              </h2>
              <hr className="pb-3"></hr>
            <p className="text-base lg:text-lg leading-relaxed text-gray-500 md:px-30 pb-5">
              providing solutions for a wide range of projects. Our expertise extends to the
              Supply, Installation, and Maintenance of Electro-Mechanical Equipment,
              ensuring optimal performance and reliability. With a commitment to
              excellence and customer satisfaction, we deliver innovative and high-quality
              services tailored to your needs.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="orange" href="contact">Get Started</Button>
              <Button variant="white" href="vision">Learn More</Button>
            </div>
          </div>
      </Motion>
    </section>
  );
}
