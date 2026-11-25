"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "../ui/Button";

const field = "mt-2 block min-h-12 w-full rounded-sm border border-ink/30 bg-white px-4 text-base focus:border-ink";
const label = "block text-sm font-semibold";
const services = ["Construction", "Electrical", "Solar", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [service, setService] = useState(defaultService);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      setService("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-l-4 border-brand bg-white p-8">
        <CheckCircle2 className="h-8 w-8 text-brand-ink" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold">Thanks, we got your request.</h2>
        <p className="mt-3 leading-relaxed text-ink/70">Our team will review your project and get back to you by phone or email, usually within one business day.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 min-h-11 text-sm font-semibold text-brand-ink underline">Send another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-describedby="form-note">
      {/* Spam trap: hidden from people, bots tend to fill it in */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="name" className={label}>Full name *</label>
          <input id="name" name="name" required autoComplete="name" className={field} /></div>
        <div><label htmlFor="phone" className={label}>Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+63 9XX XXX XXXX" className={field} /></div>
        <div><label htmlFor="email" className={label}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} /></div>
        <div><label htmlFor="location" className={label}>City / location</label>
          <input id="location" name="location" autoComplete="address-level2" className={field} /></div>
      </div>

      <div><label htmlFor="service" className={label}>What do you need? *</label>
        <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value)} className={field}>
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select></div>

      {service === "Solar" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor="property" className={label}>Property type</label>
            <select id="property" name="property" defaultValue="" className={field}>
              <option value="">Select</option><option>House</option><option>Commercial</option><option>Industrial</option>
            </select></div>
          <div><label htmlFor="bill" className={label}>Average monthly electric bill (₱)</label>
            <input id="bill" name="bill" inputMode="numeric" className={field} /></div>
        </div>
      )}

      <div><label htmlFor="message" className={label}>Project details *</label>
        <textarea id="message" name="message" required rows={5} className={`${field} py-3`} /></div>

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending..." : "Send Request"}
      </Button>
      <p id="form-note" role={status === "error" ? "alert" : "status"} className={status === "error" ? "text-sm font-medium text-red-700" : "text-sm text-ink/70"}>
        {status === "error"
          ? <>{error} You can also email <a href={`mailto:${site.emails[0]}`} className="underline">{site.emails[0]}</a> or call {site.phones[0]}.</>
          : "We reply by phone or email, usually within one business day."}
      </p>
    </form>
  );
}
