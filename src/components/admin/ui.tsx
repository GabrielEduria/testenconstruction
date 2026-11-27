import { useId } from "react";
import { cn } from "@/lib/utils";

/** Same look as the public contact form. 16px text stops phones zooming in on focus. */
export const field = "mt-1 block min-h-12 w-full min-w-0 rounded-sm border border-ink/30 bg-white px-3 text-base focus:border-ink";
export const labelText = "block text-sm font-semibold";
export const card = "rounded-sm border border-ink/10 bg-white p-4 sm:p-6";
export const textButton = "min-h-11 px-1 text-sm font-semibold text-brand-ink underline disabled:opacity-50";

export function Field({ label, hint, value, onChange, className, ...props }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className">) {
  const id = useId();
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className={labelText}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className={field} {...props} />
      {hint && <p className="mt-1 text-xs text-ink/60">{hint}</p>}
    </div>
  );
}

export function Select({ label, value, onChange, options, className }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className={labelText}>{label}</label>
      <select id={id} value={options.some((o) => o.value === value) ? value : ""} onChange={(e) => onChange(e.target.value)} className={field}>
        <option value="">Choose from price list</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
