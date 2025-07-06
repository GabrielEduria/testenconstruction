import Button from "@/components/ui/Button";
import Motion from "@/components/animation/Motion";
import Image from "next/image";

export default function Contact() {
  return (
    <Motion>
      <section className="w-full mx-auto md:py-24 md:px-10">
        <div className="relative w-full max-w-[1200px] mx-auto">
          <div className="relative w-full h-[400px] md:h-[800px] md:-translate-x-80 overflow-hidden">
            <Image 
              src="/images/background/Construction1.png"
              alt="Contact"
              fill
              className="object-contain"
            />
          </div>

         
          <div  
            id="contact" 
            className="md:absolute md:top-1/2 md:right-5 
            md:translate-y-[-50%] md:w-[500px] bg-gray-300 
            shadow-xl p-6 z-10 shadow-lg mx-4 mb-4 md:mt-8
            rounded-lg scroll-mt-25"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-orange-400">Contact us</h2>
            <h3 className="text-lg lg:text-xl font-bold text-blue-800">
              Let’s Turn Your Dreams into Reality
            </h3>
            <form className="mt-8 space-y-3">
              <div>
                <label className="text-sm text-slate-900 font-semibold mb-2 block">Name</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Name"
                  className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-semibold mb-2 block">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-semibold mb-2 block">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Enter Subject"
                  className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-semibold mb-2 block">Message</label>
                <textarea
                  id="message"
                  placeholder="Enter Message"
                  rows={6}
                  className="w-full px-4 pt-3 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
                >
                </textarea>
              </div>
              <Button type="submit">Send message</Button>
            </form>
          </div>
        </div>
      </section>
    </Motion>
  );
}
