import Motion from "../../animation/Motion"
import { service } from '@/data';

export default function Services () {
    return(
        <Motion>
            <div id="services" className="min-h-[50vh] max-w-[1200px] mx-auto p-5 my-10 scroll-mt-20 mx-auto">
                <div className="w-full text-center p-2   md:pb-5 ">
                    <h1 className="text-3xl md:text-5xl font-bold pb-2 text-orange-400">
                         Our Services
                    </h1>
                    <h2 className="text-2xl lg:text-4xl font-bold text-blue-800 mb-2">
                        Lets Power Your Needs
                    </h2>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-10 ">
                        {service.map((services, index) => {
                            const Icon = services.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-5 max-w-[350px] max-h-[400px] mx-auto flex flex-col text-center justify-start bg-gray-200 shadow-lg rounded-lg"
                                    >                   
                                    <div className="h-[120px] flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Icon className="text-orange-400 text-4xl block" />
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-semibold text-blue-800 mb-2">
                                        {services.title}
                                    </h2>
                                    <p className="text-base text-gray-500">{services.description}</p>
                                </div>
                        );
                        })}
                    </div>
                </div>
            </div>
            </Motion>
    )
}

