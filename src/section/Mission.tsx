import Motion from "../components/animation/Motion";
import Image from "next/image";
import { FaHardHat } from "react-icons/fa"; 

export default function Mission() {
  return (
     <section id="about" className="w-full min-h-[40vh] max-w-[1200px]  mx-auto py-10 scroll-mt-20 md:scroll-mt-10">
      <Motion>
         <div className="flex flex-col-reverse md:flex-row w-full px-4 gap-10">
          <div className="w-full text-center md:text-left content-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-orange-400">
              Our Mission
            </h1>
            <h2 className="text-3xl lg:text-5xl font-bold pb-3 text-blue-800">
              To deliver superior design, construction
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-gray-500 pb-4">
              To deliver superior design, construction, and electro-mechanical
              solutions, ensuring the highest standards of quality, safety, and
              reliability while fostering sustainable growth and innovation.
            </p>

            <div className="flex justify-center md:justify-start items-center gap-2 mt-4">
              <div className="w-10 h-[2px] bg-orange-400"></div>
              <FaHardHat className="text-orange-400 text-3xl" />
              <div className="w-10 h-[2px] bg-orange-400"></div>
            </div>
          </div>
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/construction/images/Construction1.png"
              alt="Mission Image"
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110 rounded-lg"
            />
          </div>
        </div>
      </Motion>
    </section>
  );
}
