"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Button from "../components/ui/Button";
import Motion from "../components/animation/Motion";
import Link from "next/link";

const slides = [
  { image: "/construction/images/Construction1.png", title: "Valenzuela City" },
  { image: "/construction/images/Construction2.png", title: "Corps Building" },
  { image: "/construction/images/Construction3.png", title: "Construction 3" },
  { image: "/construction/images/Construction1.png", title: "Construction 4" },
  { image: "/construction/images/Construction1.png", title: "Construction 5" },
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
        <div className="w-full px-10 md:px-20 pb-30 ">
              <h1 className="text-4xl md:text-8xl font-bold text-white drop-shadow-lg pb-2">
                EN Construction
              </h1>
              <p className="text-white text-sm sm:text-xl w-full md:w-[650px] pb-3 leading-relaxed md:leading-9 ">
                Building spaces with purpose and precision. From design to delivery,
                we offer complete construction and electro-mechanical solutions
                tailored to your goals.
              </p>
          
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="/quote">
              <Button variant="orange">Get a free Quote from us</Button>
              </Link>
              <Button variant="white" href="/solar">Check out our Solar</Button>
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
              <div className="text-lg text-center flex-1 truncate">
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
