import Button from "@/components/ui/Button";
import Motion from "@/components/animation/Motion";
import Image from "next/image";

export default function Contact() {
  return (
    <Motion>
      <section id="contact" className="mx-auto max-w-[1200px] px-6 lg:px-12 scroll-mt-10">
        <div className="flex flex-col-reverse lg:flex-row gap-16 py-24 items-center justify-between">
          
          {/* Contact Form — unchanged */}
          <div className="text-left my-auto mx-auto rounded-lg w-full lg:w-[500px] bg-gray-200 p-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-orange-400">Contact us</h2>
            <h3 className="text-lg lg:text-xl font-bold text-blue-800">Lets Turn Your Dreams into Reality</h3>
            <form className="mt-8 space-y-3 block">
              <div>
                <label className='text-sm text-slate-900 font-semibold mb-2 block'>Name</label>
                <input type='text' id="username" placeholder='Enter Name'
                  className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all" />
              </div>
              <div>
                <label className='text-sm text-slate-900 font-semibold mb-2 block'>Email</label>
                <input type='email' id="email" placeholder='Enter Email'
                  className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all" />
              </div>
              <div>
                <label className='text-sm text-slate-900 font-semibold mb-2 block'>Subject</label>
                <input type='text' id="subject" placeholder='Enter Subject'
                  className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all" />
              </div>
              <div>
                <label className='text-sm text-slate-900 font-semibold mb-2 block'>Message</label>
                <textarea id="message" placeholder='Enter Message' rows={6}
                  className="w-full px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm pt-3 outline-0 transition-all"></textarea>
              </div>
              <Button type='button'>Send message</Button>
            </form>
          </div>

          {/* Image */}
          <div className="relative w-full lg:w-[500px] h-[350px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
            <Image 
              src={"/images/Contact.png"}
              alt="Contact"
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110 rounded-lg"
            />
          </div>
        </div>
      </section>
    </Motion>
  );
}
