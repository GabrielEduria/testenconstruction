"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Button from "../../ui/Button";
import Motion from "../../animation/Motion";
import Link from "next/link";

const slides = [
  { image: "/images/background/Construction1.png", title: "Valenzuela City" },
  { image: "/images/background/Construction2.png", title: "Corps Building" },
  { image: "/images/background/Construction3.png", title: "Construction 3" },
  { image: "/images/background/Construction1.png", title: "Construction 4" },
  { image: "/images/background/Construction1.png", title: "Construction 5" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          loop
          allowTouchMove={false}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          modules={[Autoplay, EffectFade, Navigation]}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Motion className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center md:text-left">
        <div className="w-full h-full p-5 md:pt-20 lg:px-30 z-10">
              <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-lg tracking-tight max-w-[700] pb-4">
                Construction
              </h1>
              <p className="text-white text-sm sm:text-xl w-full md:w-[650px] pb-3 pl-1 leading-relaxed md:leading-9 ">
                
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              </p>
          
            <div className="flex flex-wrap justify-center md:flex-row md:items-start justify-center md:justify-start gap-4 pl-1 w-full">
              <Link href="/solar">
              <Button variant="orange">Go Solar Now</Button>
              </Link>
              <Link href="/quote">
              <Button variant="white" href="/quote">Get a Quote from us</Button>
              </Link>
            </div>

        </div>
     
        <div
          className="absolute bottom-15 sm:bottom-5 left-1/2 
          -translate-x-1/2 sm:left-auto sm:translate-x-0
           sm:right-8 z-20 bg-white rounded"
        >
            <div 
               className="w-[300px] sm:w-[500px] shadow-lg px-5 py-1
               rounded border-t-4 border-[#FF9119]
               flex items-center justify-between gap-4"
            >
              <div className="text-base md:text-lg text-center font-semibold flex-1 truncate">
                {slides[currentIndex]?.title}
              </div>
              <div className="flex items-center gap-5 sm:gap-3 pb-1">
                <button className="custom-prev text-2xl lg:text-4xl font-semibold cursor-pointer">
                  &#8592;
                </button>
                <button className="custom-next text-2xl lg:text-4xl font-semibold cursor-pointer">
                  &#8594;
                </button>
              </div>
            </div>
        </div>
      </Motion>
    </div>
  );
}
