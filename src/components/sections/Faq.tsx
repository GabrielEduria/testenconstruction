import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/content";
import SectionHeading from "../ui/SectionHeading";

export default function Faq() {
  return (
    <section className="bg-concrete/60 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" text="Straight answers about how we work. Anything else, send us a message." />
        <div className="divide-y divide-ink/15 border-y border-ink/15">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="pb-5 pr-9 text-sm leading-relaxed text-ink/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
