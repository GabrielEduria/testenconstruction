import Motion from "../../animation/Motion"
import { service } from '@/data';

export default function Services () {
    return(
        <Motion>
            <div id="services" className="py-20 bg-gray-100 mx-auto p-5 scroll-mt-20 mx-auto">
                <div className=" max-w-[1200px] mx-auto">
                    <div className="w-full text-center p-2   md:pb-5 ">
                        <h1 className="text-3xl md:text-5xl font-bold pb-2 text-orange-400">
                            Our Services
                        </h1>
                        <h2 className="text-2xl lg:text-4xl font-bold text-blue-800 mb-2">
                            Lets Power Your Needs
                        </h2>
                    </div>
                <div className="flex justify-center w-full">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-5 ">
                        {service.map((services, index) => {
                            const Icon = services.icon;
                            return (
                <div
                    key={index}
                    className="flex flex-col justify-between rounded-lg border bg-card text-card-foreground 
                    shadow-sm border-gray-100 hover:shadow-lg transition-all duration-300 p-4"
                    >
                    <div className="flex flex-col text-center content-center pt-5 gap-6 p-4">
                        <Icon className="h-10 w-10 mx-auto text-orange-500 block" />
                        <h2 className="text-lg font-semibold text-blue-800 leading-tight mb-2 min-h-[48px]">
                        {services.title}
                        </h2>
                    </div>
                    
                    <p className="text-sm text-gray-500 text-center mt-auto">
                        {services.description}
                    </p>
                </div>
                        );
                        })}
                    </div>
                </div>
                </div>
            </div>
        </Motion>
    )
}

