import Motion from "../../animation/Motion";
import TiltEffect from "../../animation/TiltEffect";
import Image from "next/image";
import { projects } from "@/data/";

export default function Projects() {

  return (
    <div id="projects" className="relative w-full py-20 bg-[#1e1d20] scroll-mt-10 sm:scroll-mt-20">
          <div  className="max-w-[1200px] mx-auto">
            <Motion>
              <div className="w-full text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-orange-400 p-2 pb-5">Our Projects</h1>
              </div>  
              <hr className="mx-auto border-gray-500 w-1/2"></hr>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xs:gap-20 p-6">
                  {projects.map((project, index) => (
                    <div  
                      key={index}
                      className="rounded-2xl flex flex-col justify-center content-center transform transition duration-300 hover:scale-[1.02]"
                    >
                      <TiltEffect className="w-full max-w-[300] overflow-hidden rounded-t-2xl flex items-center">
                          <Image 
                            src={project.images}
                            alt={`Project Image ${project.title}`}
                            width={300}
                            height={300}
                            className="object-contain w-full h-auto rounded-lg"
                          />
                      </TiltEffect>
                      <div className="flex flex-col pt-2 flex-grow mx-auto">     
                        <h2 className="text-2xl md:text-2xl  text-center md:text-left font-bold text-blue-800 ">
                            {project.title}
                        </h2>
                        <p className="pb-2 text-lg text-center md:text-left font-bold text-orange-400">
                        {project.type}  
                        </p>         
                        <p className="text-base leading-relaxed text-center md:text-left w-full md:w-3/4 text-gray-200">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Motion>
          </div>
      </div>
  );
}
