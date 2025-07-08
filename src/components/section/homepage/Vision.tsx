import Motion from "@/components/animation/Motion";
import Image from "next/image";
import { FaEye } from "react-icons/fa"; 

export default function Vision() {
  return (
    <section id="vision" className="w-full py-20 scroll-mt-20">
      <Motion>
        <div className="flex flex-col md:flex-row max-w-[1200px] mx-auto w-full p-4 gap-10">
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/images/background/Construction1.png"
              alt="Mission Image"
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110 rounded-lg"
            />
          </div>
          <div className="w-full text-center md:text-left content-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-orange-400">
              Our Vision
            </h1>
            <h2 className="text-3xl lg:text-5xl font-bold pb-3 text-blue-800">
              To be a trusted leader in the design and construction industry
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-gray-500">
              delivering world-class solutions that empower businesses and communities. 
              We offer tailored services in design, construction, electro-mechanical 
              works (HVAC, elevators, power systems), equipment supply, and expert maintenance.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-2 mt-4">
              <div className="w-10 h-[2px] bg-orange-400"></div>
              <FaEye className="text-orange-400 text-3xl" />
              <div className="w-10 h-[2px] bg-orange-400"></div>
            </div>
          </div>
        </div>
      </Motion>
    </section>
  );
}
