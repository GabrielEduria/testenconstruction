
import Link from "next/link";
import Button from "@/components/ui/Button";
import Motion from "@/components/animation/Motion";

export default function Hero () {
    return (
    <div id="solar" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute block top-0 left-0 h-full w-full object-cover -z-10"
        >
            <source src="/videos/solarvideo.mp4" type="video/mp4" />
             Your browser does not support the video tag.
        </video>
     <div className="absolute inset-0 bg-black/60 -z-5" />
        <Motion>
            <div className="w-full h-full p-5 md:pt-20 lg:px-30 z-10 text-center md:text-left">
                <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-lg max-w-[700] pb-4">
                    Power Your Home with  
                    <span className="text-orange-400"> Solar Energy
                    </span>
                </h1>
                 <p className="text-white text-sm md:text-lg w-full md:w-[650px] pb-3 pl-1 px-4 md:leading-8 ">
                    Join thousands of homeowners who&apos;ve made the switch to clean, renewable solar energy. Save money, reduce your carbon footprint, and gain energy independence.
                </p>
                 <div className="flex flex-wrap justify-center md:flex-row md:items-start justify-center md:justify-start gap-4 pl-1 w-full">
                    <Link href="/solar">
                    <Button variant="orange">Get a Free Quote</Button>
                    </Link>
                    <Button variant="white" href="#about">Learn More</Button>
                </div>
                 <div className="flex flex-wrap justify-center items-center md:justify-start gap-8 pt-4 md:mt-5">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">5+</p>
                        <p className="text-sm text-gray-200">Years Warranty</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">100+</p>
                        <p className="text-sm text-gray-200">Happy Customer</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">40%</p>
                        <p className="text-sm text-gray-200">Average Savings</p>
                    </div>
                 </div>
             
            </div>
        </Motion>
    </div>

    )
}