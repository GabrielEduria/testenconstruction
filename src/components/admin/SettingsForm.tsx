"use client";

import { useId } from "react";
import type { Settings } from "@/lib/admin/quote";
import { card, Field, field, labelText } from "./ui";

export default function SettingsForm({ settings, onChange }: { settings: Settings; onChange: (s: Settings) => void }) {
  const set = (key: keyof Settings) => (value: string) => onChange({ ...settings, [key]: value });
  return (
    <>
      <section className={card}>
        <h2 className="text-lg font-bold">Terms on the PDF</h2>
        <p className="text-sm text-ink/60">Saved automatically in this browser. Validity, warranty, payment and installation time are required.</p>
        <div className="mt-3 space-y-4">
          <Field label="Quote validity (days)" value={settings.validDays} onChange={set("validDays")} inputMode="numeric" />
          <Area label="Warranty" value={settings.warranty} onChange={set("warranty")} />
          <Area label="Payment terms" value={settings.paymentTerms} onChange={set("paymentTerms")} />
          <Area label="Installation time" value={settings.installTime} onChange={set("installTime")} />
          <Area label="Other terms (optional)" value={settings.otherTerms} onChange={set("otherTerms")} />
          <Field label="License numbers (optional)" value={settings.license} onChange={set("license")} />
        </div>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Solar estimate settings</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Estimated rate (₱ per kWh)" value={settings.ratePerKwh} onChange={set("ratePerKwh")} inputMode="decimal" />
          <Field label="Estimated sun-hours per day" value={settings.sunHours} onChange={set("sunHours")} inputMode="decimal" />
        </div>
      </section>
    </>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelText}>{label}</label>
      <textarea id={id} rows={2} value={value} onChange={(e) => onChange(e.target.value)} className={`${field} py-3`} />
    </div>
  );
}
