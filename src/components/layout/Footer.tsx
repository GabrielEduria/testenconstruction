'use client';

import Motion from "../animation/Motion";
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaFileAlt,
  FaSolarPanel,
  FaBlogger
} from "react-icons/fa";


export default function Footer() {

  const handleScrollTo = (id: string) => {
     const element = document.getElementById(id);
     if (element) {
      element.scrollIntoView({ behavior: "smooth"})
     }
  };

  return (
    <div id="Footer" className="w-fullmin-h-[40vh] p-4 bg-[#1e1d20] ">
      <Motion className="max-w-[1200px]  mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 p-6">
            <div className="flex flex-col gap-2 font-semibold pb-10 text-nowrap text-gray-300">
              <h2 className="text-lg md:text-2xl font-bold text-gray-300 pb-3">SOCIALS</h2>
                <a
                //  href="https://www.facebook.com/en.construction_/"
                //  target="_blank"
                //  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a
                //  href="https://www.instagram.com/en.construction_/"
                //  target="_blank"
                //  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaInstagram className="w-5 h-5" />
                   <span>Instagram</span>
                </a>
          
                <a
                 // href="https://www.tiktok.com/@en.construction_/"
                 // target="_blank"
                 // rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaTiktok className="w-5 h-5" />
                  <span>TikTok</span>
                </a>
            </div>      
            <div className="flex flex-col gap-2  w-full space-y-2 text-lg font-semibold pb-10 text-gray-300">
             <h2 className="text-lg md:text-2xl text-gray-300 font-bold pb-3">PERMIT</h2>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaFileAlt className="w-5 h-5" />
                  <span>Certificate of Registration (COR)</span>
                </a>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaFileAlt className="w-5 h-5" />
                  <span>DTI Permit</span>
                </a>
            </div>
              <div className="flex flex-col gap-2 w-full space-y-2 text-lg font-semibold pb-10 text-gray-300">
             <h2 className="text-lg md:text-2xl text-gray-300 font-bold pb-3">OTHERS</h2>
                <Link
                  href="/solar"
                  className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaSolarPanel className="w-5 h-5" />
                  <span>Check out our Solar Panel</span>
                </Link>
                <Link
                   href="/quote"
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 w-fit hover:scale-105 text-base"
                >
                  <FaBlogger className="w-5 h-5" />
                  <span>Get a free Quote</span>
                  
                </Link>
            </div>
          </div>
       <hr className="mx-auto border-gray-500 w-auto pb-3"></hr>
       <div className="flex flex-col md:flex-row justify-between w-full text-nowrap lg:p-6 pb-10 gap-4">
          <div
            className="cursor-pointer flex justify-center"
            onClick={() => handleScrollTo("home")}
          >
            <Image
              src="/images/en-construction.png"
              alt="EN Construction Logo"
              height={300}
              width={300}
              className="object-contain cursor-pointer content-center"
            />
          </div>
          <div className="content-center text-left md:text-right 
                          text-gray-300 px-4 md:px-6 text-base 
                          font-semibold"
          >
            <p className="block md:inline text-center"> © 2024 EN Construction. </p>
            <p className="block md:inline text-center">All rights reserved.</p>
          </div>
        </div>
      </Motion>
    </div>
  );
}
