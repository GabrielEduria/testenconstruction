'use client'

import React, { 
  ButtonHTMLAttributes,
  ReactNode,
  useEffect
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "orange" | "white";
  href?: string; 
}

export default function Button({
  children,
  variant = "orange",
  href,
  ...props
}: ButtonProps) {
  useEffect(() => {
    const handleScroll = () => {
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const baseClasses = `
    font-bold px-3.5 py-2 
    border-[3px] border-black rounded-md 
    shadow-[0.1em_0.1em_0_0_black] 
    transition-all duration-100 ease-in-out 
    active:translate-x-[0.05em] active:translate-y-[0.05em] 
    active:shadow-[0.05em_0.05em_0_0_black] 
    hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] 
    hover:shadow-[0.15em_0.15em_0_0_black] 
    cursor-pointer inline-block
    text-sm lg:text-xl
    text-nowrap
  `;

  const variants = {
    orange: "bg-[#FF9119] text-black",
    white: "bg-white text-black",
  };

  const className = `${baseClasses} ${variants[variant]}`;

  return (
    <button
      className={className}
      onClick={() => href && handleScrollTo(href)}
      {...props}
    >
      {children}
    </button>
  );
}
