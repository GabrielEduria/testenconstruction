"use client";

import { Trash2 } from "lucide-react";
import {
  buildLines, DAYS_PER_MONTH, formatNumber, newId, parseAmount, peso, shareLabel, solarCheck,
  type Draft, type ExtraLine, type Kind, type PriceItem, type Settings,
} from "@/lib/admin/quote";
import { Button } from "../ui/Button";
import { card, Field, Select, textButton } from "./ui";

const optionLabel = (i: PriceItem) => {
  const price = parseAmount(i.price);
  return `${i.name || "(no name)"}: ${price === null ? "no price yet" : `${peso(price)} / ${i.unit}`}`;
};

export default function QuoteForm({ items, settings, draft, onDraft, onSettings, onClear }: {
  items: PriceItem[]; settings: Settings; draft: Draft;
  onDraft: (d: Draft) => void; onSettings: (s: Settings) => void; onClear: () => void;
}) {
  const set = (key: keyof Draft) => (value: string) => onDraft({ ...draft, [key]: value });
  const setSetting = (key: keyof Settings) => (value: string) => onSettings({ ...settings, [key]: value });
  const setExtra = (id: string, patch: Partial<ExtraLine>) =>
    onDraft({ ...draft, extras: draft.extras.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  const options = (kind?: Kind) => items.filter((i) => !kind || i.kind === kind).map((i) => ({ value: i.id, label: optionLabel(i) }));
  // Shorter labels where the dropdown is narrow; the prices are listed under the total.
  const extraOptions = items.map((i) => ({ value: i.id, label: parseAmount(i.price) === null ? `${i.name || "(no name)"} (no price)` : i.name || "(no name)" }));

  const { lines, total, problems } = buildLines(draft, items);
  const solar = solarCheck(draft, settings);

  return (
    <>
      <section className={card}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Client</h2>
          <button type="button" onClick={onClear} className={textButton}>New quote</button>
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Client name" value={draft.clientName} onChange={set("clientName")} autoComplete="off" />
          <Field label="Location" value={draft.location} onChange={set("location")} autoComplete="off" />
          <Field label="Contact number or email" value={draft.contact} onChange={set("contact")} autoComplete="off" />
          <Field label="Average monthly electric bill (₱)" value={draft.monthlyBill} onChange={set("monthlyBill")} inputMode="decimal" />
        </div>
      </section>

      <section className={card}>
        <h2 className="text-lg font-bold">System</h2>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <Select label="Panel" value={draft.panelId} onChange={set("panelId")} options={options("panel")} className="col-span-2" />
          <Field label="Panel count" value={draft.panelCount} onChange={set("panelCount")} inputMode="numeric" />
          <Field label="Watts per panel" value={draft.panelWatts} onChange={set("panelWatts")} inputMode="numeric" />
          <Select label="Inverter" value={draft.inverterId} onChange={set("inverterId")} options={options("inverter")} className="col-span-2" />
          <Field label="Inverter quantity" value={draft.inverterQty} onChange={set("inverterQty")} inputMode="numeric" />
          <Select label="Battery" value={draft.batteryId} onChange={set("batteryId")} options={options("battery")} className="col-span-2" />
          <Field label="Battery count" value={draft.batteryCount} onChange={set("batteryCount")} inputMode="numeric" hint="Leave blank for no battery." />
          <Field label="kWh per battery" value={draft.batteryKwh} onChange={set("batteryKwh")} inputMode="decimal" />
        </div>

        <h3 className="mt-6 font-bold">Other line items</h3>
        <p className="text-sm text-ink/60">Items and prices come from the price list. To add something new, add it in Prices first.</p>
        <ul className="mt-2 space-y-3">
          {draft.extras.map((e, i) => (
            <li key={e.id} className="grid grid-cols-[1fr_5rem_2.75rem] items-end gap-2">
              <Select label={`Item ${i + 1}`} value={e.itemId} onChange={(itemId) => setExtra(e.id, { itemId })} options={extraOptions} />
              <Field label="Qty" value={e.qty} onChange={(qty) => setExtra(e.id, { qty })} inputMode="decimal" />
              <button type="button" aria-label={`Remove item ${i + 1}`} className="flex h-12 items-center justify-center text-ink/60 hover:text-red-700"
                onClick={() => onDraft({ ...draft, extras: draft.extras.filter((x) => x.id !== e.id) })}>
                <Trash2 className="h-5 w-5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <Button type="button" variant="outline" className="mt-3 w-full sm:w-auto"
          onClick={() => onDraft({ ...draft, extras: [...draft.extras, { id: newId(), itemId: "", qty: "1" }] })}>
          Add line item
        </Button>
      </section>

      <section className={card} aria-live="polite">
        <h2 className="text-lg font-bold">Quote total</h2>
        <ul className="mt-2 divide-y divide-ink/10 text-sm">
          {lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-3 py-2">
              <span className="min-w-0 break-words">{l.name}
                <span className="block text-ink/60">{l.qty} {l.unit} × {l.unitPrice === null ? "no price" : peso(l.unitPrice)}</span>
              </span>
              <span className="shrink-0 font-semibold">{l.amount === null ? "—" : peso(l.amount)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 flex flex-wrap justify-between gap-2 border-t-2 border-ink pt-3 text-xl font-bold">
          <span>{problems.length ? "Incomplete total" : "Total"}</span><span>{peso(total)}</span>
        </p>
        {problems.length > 0 && <ul className="mt-2 list-disc pl-5 text-sm font-medium text-red-700">{problems.map((p) => <li key={p}>{p}</li>)}</ul>}
      </section>

      <section className={card}>
        <h2 className="text-lg font-bold">Solar check <span className="text-sm font-normal text-ink/60">(estimates)</span></h2>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <Field label="Estimated rate (₱ per kWh)" value={settings.ratePerKwh} onChange={setSetting("ratePerKwh")} inputMode="decimal" hint="From the client's bill." />
          <Field label="Estimated sun-hours per day" value={settings.sunHours} onChange={setSetting("sunHours")} inputMode="decimal" hint="Peak sun-hours." />
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["System size", solar.kwp ? `${formatNumber(solar.kwp, 2)} kWp` : "Enter panel count and watts"],
            ["Estimated monthly generation", solar.monthlyKwh ? `${formatNumber(solar.monthlyKwh)} kWh` : "Needs system size and sun-hours"],
            ["Estimated share of bill covered", solar.billShare ? shareLabel(solar.billShare) : "Needs generation, rate and bill"],
          ].map(([term, value]) => (
            <div key={term} className="bg-sky p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/60">{term}</dt>
              <dd className="mt-1 font-bold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-ink/60">
          {solar.batteryTotalKwh ? `Battery storage: ${formatNumber(solar.batteryTotalKwh, 1)} kWh. ` : ""}
          Estimate = kWp × sun-hours × {DAYS_PER_MONTH} days. It assumes all generation offsets the bill at the rate above and does not subtract system losses.
        </p>
      </section>
    </>
  );
}
