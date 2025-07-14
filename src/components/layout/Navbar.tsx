"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Motion from "../animation/Motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isSolar = pathname.startsWith("/solar");
  const isQuote = pathname.startsWith("/quote");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSheetToggle = (open: boolean) => {
    setIsSheetOpen(open);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = isHome
    ? [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Projects", href: "#projects" },
        { name: "FAQs", href: "#faq" },
        { button: "Go Solar", href: "/solar" },
      ]
    : isSolar
    ? [
        { name: "About", href: "#solar" },
        { name: "Services", href: "#services" },
        { name: "Pricing", href: "#pricing" },
        { button: "Get A Quote From Us", href: "/quote" },
      ]
    : isQuote
    ? [
        { name: "About", href: "#hero" },
        { name: "Quote", href: "#quote" },
        { name: "Contact", href: "#contact"},
        { name: "Services", href: "#services"},
        { button: "Home", href: "/" },
      ]
    : [];

  return (
    <nav
      className={`w-full h-[75px] lg:h-auto fixed top-0 left-0 z-50 transition-colors duration-400  ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Motion className="w-full mx-auto flex items-center justify-between px-2 sm:px-5 lg:px-10 py-2">
        <div
          className={`text-2xl sm:text-4xl cursor-pointer transition-colors duration-300 ${
            scrolled ? "text-black bg-backdrop-blur" : "text-white"
          }`}
          onClick={() => handleScrollTo("home")}
        >
          <div className="relative w-[200px] sm:w-[250px] md:w-[300px] h-[70px] sm:h-[60px] md:h-[70px]">
            <Link href="/">
              <Image
                src="/images/en-construction.png"
                alt="EN Construction Logo"
                fill
                className="object-contain scale-100"
              />
            </Link>
          </div>
        </div>

        <ul
          className={`hidden lg:flex gap-12 items-center transition-colors duration-300 font-semibold ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {links.map((link) => (
            <li key={`${link.name ?? link.button}-${link.href}`}>
              {link.button ? (
                <Link href={link.href}>
                  <Button variant="orange">
                    <span className="font-bold">
                      {link.button}
                    </span>
                  </Button>
                </Link>
              ) : link.href.startsWith("#") ? (
                <span
                  onClick={() => handleScrollTo(link.href.replace("#", ""))}
                  className={`relative text-lg cursor-pointer flex content-center after:absolute after:h-0.5 after:w-0 duration-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 content-center ${
                    scrolled ? "text-black after:bg-black" : "text-white after:bg-white"
                  }`}
                >
                  {link.name}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={`relative content-center text-lg cursor-pointer after:absolute after:h-0.5 after:w-0 duration-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 ${
                    scrolled ? "text-black after:bg-black" : "text-white after:bg-white"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="block lg:hidden z-50">
          <Sheet open={isSheetOpen} onOpenChange={handleSheetToggle}>
            <SheetTrigger asChild>
              <button
                className={`p-2 transition-opacity duration-300 ${
                  isSheetOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <Menu
                  className={`w-8 h-8 transition-colors duration-300 ${
                    scrolled ? "text-black" : "text-white"
                  }`}
                />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="fixed inset-y-0 right-0 h-full w-[80vw] bg-white z-[60] p-5 shadow-lg overflow-y-hidden overscroll-contain"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <ul className="flex flex-col gap-8 mt-10">
                {links.map((link) => (
                  <li key={`${link.name ?? link.button}-${link.href}`}>
                    {link.href.startsWith("#") ? (
                      <span
                        onClick={() => {
                          handleScrollTo(link.href.replace("#", ""));
                          setIsSheetOpen(false);
                        }}
                        className="text-lg text-gray-800 hover:text-black cursor-pointer"
                      >
                        {link.name}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                        className="text-lg text-gray-800 hover:text-black cursor-pointer"
                      >
                        {link.name ?? link.button}
                      </Link>
                    )}
                    <hr className="border border-gray-200 mb-3" />
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </Motion>
    </nav>
  );
}
