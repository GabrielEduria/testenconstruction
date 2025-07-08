import { solarEnergy } from "@/data"
import Motion from "../../animation/Motion";

export default function WhyChooseUs () {
    return (
        <Motion>
          <div id="services" className="relative w-full py-20 mx-auto px-4">
             <div className="container mx-auto px-4">
                <div className="text-center mb-16 px-4 ">
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Why Choose Solar Energy?</h2>
                  <p className="text-lg text-gray-500 max-w-2xl mx-auto">Experience the benefits of clean,
                      renewable energy with our 
                      state-of-the-art solar solutions.
                  </p>
                </div>
              <div className="flex justify-center w-full">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {solarEnergy.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={index}
                          className="rounded-lg border bg-card text-card-foreground 
                            shadow-sm border-gray-100 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col items-center text-center space-y-1.5 p-6">
                            <Icon className="w-10 h-10 text-orange-500 block" />
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 p-6 pt-0 text-center">{item.description}</p>
                        </div>
                      );})}
                </div>
              </div>
            </div>
          </div>
        </Motion>
    )
}