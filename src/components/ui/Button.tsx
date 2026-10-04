import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-[#ffa13d]",
  dark: "bg-ink text-white hover:bg-steel",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "border-2 border-white/70 text-white hover:bg-white hover:text-ink",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 text-sm font-semibold tracking-wide transition-colors duration-200";

export function ButtonLink({ href, variant = "primary", className, children }: {
  href: string; variant?: Variant; className?: string; children: React.ReactNode;
}) {
  return <Link href={href} className={cn(base, variants[variant], className)}>{children}</Link>;
}

export function Button({ variant = "primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
