import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: "Request a quote for construction, electrical works or solar installation from EN Construction in Valenzuela City, serving Metro Manila.",
  alternates: { canonical: "/en-construction/contact" },
};

const cities = ["Caloocan","Las Piñas","Makati","Malabon","Mandaluyong","Manila","Marikina","Muntinlupa","Navotas","Parañaque","Pasay","Pasig","Pateros","Quezon City","San Juan","Taguig","Valenzuela"];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const preset = ["Construction", "Electrical", "Solar"].find((s) => s.toLowerCase() === service?.toLowerCase()) ?? "";
  return (
    <>
      <section className="bg-ink px-5 pb-16 pt-20 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-brand"><span className="h-0.5 w-8 bg-brand" aria-hidden />Contact</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Request a quote</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">Tell us what you need built, wired or installed. We&apos;ll review your project and get back to you.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm key={preset} defaultService={preset} />
        <aside aria-label="Contact details" className="space-y-8 lg:border-l lg:border-ink/15 lg:pl-10">
          <ul className="space-y-6 text-sm">
            <li className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-brand-ink" aria-hidden /><div><h2 className="font-semibold">Call us</h2>{site.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex min-h-11 items-center text-ink/70 hover:text-ink">{p}</a>)}</div></li>
            <li className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-brand-ink" aria-hidden /><div><h2 className="font-semibold">Email us</h2>{site.emails.map((e) => <a key={e} href={`mailto:${e}`} className="flex min-h-11 items-center break-all text-ink/70 hover:text-ink">{e}</a>)}</div></li>
            <li className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-ink" aria-hidden /><div><h2 className="font-semibold">Visit us</h2>{site.address.map((a) => <p key={a} className="text-ink/70">{a}</p>)}</div></li>
          </ul>
          <div>
            <h2 className="text-xl font-bold">Service area</h2>
            <p className="mt-3 text-sm text-ink/70">We serve all cities and municipalities in Metro Manila, including:</p>
            <ul className="mt-4 flex flex-wrap gap-2">{cities.map((c) => <li key={c} className="border border-ink/15 bg-white px-3 py-1.5 text-xs">{c}</li>)}</ul>
          </div>
        </aside>
      </section>
    </>
  );
}
