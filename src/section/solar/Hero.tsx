
import Link from "next/link";
import Button from "@/components/ui/Button";
import Motion from "@/components/animation/Motion";

export default function Hero () {
    return (
    <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover -z-10"
        >
            <source src="/videos/solarvideo.mp4" type="video/mp4" />
             Your browser does not support the video tag.
        </video>
     <div className="absolute inset-0 bg-black/60 -z-5" />
        <Motion>
            <div className="w-full h-full p-10 lg:px-40 z-10 text-center md:text-left">
                <h1 className="text-4xl md:text-8xl font-bold text-white drop-shadow-lg pb-2">
                    SOLAR BY EN
                </h1>
                 <p className="text-white text-sm sm:text-xl w-full md:w-[650px] pb-3 pl-1  md:leading-9">
                    Building spaces with purpose and precision. From design to delivery, we offer
                    complete construction and electro-mechanical solutions tailored to your goals.
                </p>
                 <div className="flex flex-wrap justify-center md:flex-row md:items-start justify-center md:justify-start gap-4 pl-1 w-full">
                    <Link href="/solar">
                    <Button variant="orange">Get a Free Assessment</Button>
                    </Link>
                    <Button variant="white" href="#about">Read More</Button>
                </div>
            </div>
        </Motion>
    </div>

    )
}