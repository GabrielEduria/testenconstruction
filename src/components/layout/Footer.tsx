import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/data/site";

const socials = Object.entries(site.socials).filter(([, url]) => url);

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1.4fr]">
        <div>
          <Image src="/images/en-construction-light.png" alt="EN Construction" width={190} height={38} className="h-auto w-[190px]" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">Construction, electrical works and solar installation, based in Valenzuela City and serving Metro Manila.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Explore</h2>
          <ul className="mt-4 space-y-1">
            {nav.map((l) => (
              <li key={l.href}><Link href={l.href} className="inline-flex min-h-10 items-center text-sm hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>{site.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex min-h-11 items-center hover:text-white">{p}</a>)}</span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>{site.emails.map((e) => <a key={e} href={`mailto:${e}`} className="flex min-h-11 items-center break-all hover:text-white">{e}</a>)}</span></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>{site.address.map((a) => <span key={a} className="block">{a}</span>)}</span></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {socials.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center capitalize hover:text-white">{name}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs sm:px-8">© {site.copyrightYear} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
