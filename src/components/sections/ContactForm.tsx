"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Button } from "../ui/Button";

const field = "mt-2 block min-h-12 w-full rounded-sm border border-ink/30 bg-white px-4 text-base focus:border-ink";
const label = "block text-sm font-semibold";
const services = ["Construction", "Electrical", "Solar", "Not sure yet"];

export default function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [service, setService] = useState(defaultService);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const lines = [
      `Name: ${d.name}`, `Phone: ${d.phone}`, `Email: ${d.email}`, `Service: ${d.service}`, `Location: ${d.location || "-"}`,
      ...(d.service === "Solar" ? [`Property type: ${d.property || "-"}`, `Monthly electric bill: ${d.bill || "-"}`] : []),
      "", d.message,
    ];
    const subject = `Quote request: ${d.service} (${d.name})`;
    window.location.href = `mailto:${site.emails[1]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-describedby="form-note">
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

      <Button type="submit" className="w-full sm:w-auto">Send Request</Button>
      <p id="form-note" role="status" className="text-sm text-ink/70">
        {sent ? "Your email app should open with your request ready to send. If it doesn't, email us directly at the address on this page."
              : "This opens your email app with your details filled in."}
      </p>
    </form>
  );
}
