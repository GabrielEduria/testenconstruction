"use client";

import { Trash2 } from "lucide-react";
import { KIND_LABELS, newId, parseAmount, type Kind, type PriceItem } from "@/lib/admin/quote";
import { Button } from "../ui/Button";
import { card, Field, Select } from "./ui";

const kinds = Object.entries(KIND_LABELS).map(([value, label]) => ({ value, label }));

export default function PriceList({ items, onChange }: { items: PriceItem[]; onChange: (items: PriceItem[]) => void }) {
  const update = (id: string, patch: Partial<PriceItem>) => onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  return (
    <section className={card}>
      <h2 className="text-lg font-bold">Price list</h2>
      <p className="text-sm text-ink/60">
        Changes save automatically in this browser only (this can later move to a database). Quotes use these prices and no others.
        Add a separate row for each panel, inverter or battery model.
      </p>
      <ul className="mt-3 divide-y divide-ink/10">
        {items.map((item) => (
          <li key={item.id} className="grid grid-cols-2 gap-3 py-4 md:grid-cols-[2fr_1.5fr_1fr_1.2fr_2.75rem] md:items-start">
            <Field label="Item" value={item.name} onChange={(name) => update(item.id, { name })} className="col-span-2 md:col-span-1" />
            <Select label="Type" value={item.kind} onChange={(kind) => kind && update(item.id, { kind: kind as Kind })} options={kinds} />
            <Field label="Unit" value={item.unit} onChange={(unit) => update(item.id, { unit })} />
            <Field label="Unit price (₱)" value={item.price} onChange={(price) => update(item.id, { price })} inputMode="decimal"
              hint={item.price.trim() && parseAmount(item.price) === null ? "Numbers only." : undefined} />
            <button type="button" aria-label={`Delete ${item.name || "item"}`}
              className="flex h-12 items-center justify-center self-end justify-self-end px-3 text-ink/60 hover:text-red-700 md:mt-6 md:self-start"
              onClick={() => { if (window.confirm(`Delete "${item.name || "this item"}" from the price list?`)) onChange(items.filter((i) => i.id !== item.id)); }}>
              <Trash2 className="h-5 w-5" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <Button type="button" variant="outline" className="w-full sm:w-auto"
        onClick={() => onChange([...items, { id: newId(), kind: "other", name: "", unit: "", price: "" }])}>
        Add item
      </Button>
    </section>
  );
}
