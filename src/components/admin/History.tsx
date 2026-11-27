"use client";

import { useState } from "react";
import { buildQuotePdf } from "@/lib/admin/pdf";
import { longDate, peso, type SavedQuote } from "@/lib/admin/quote";
import PdfActions, { type Made } from "./PdfActions";
import { card, textButton } from "./ui";

export default function History({ quotes, onDelete, onReuse }: {
  quotes: SavedQuote[]; onDelete: (number: string) => void; onReuse: (q: SavedQuote) => void;
}) {
  return (
    <section className={card}>
      <h2 className="text-lg font-bold">Quote history</h2>
      <p className="text-sm text-ink/60">Saved only in this browser on this device. Clearing browser data deletes it, so keep the PDFs you send.</p>
      {quotes.length === 0 && <p className="mt-4 text-sm">No quotes yet. A quote is saved here when you make its PDF.</p>}
      <ul className="mt-3 divide-y divide-ink/10">
        {quotes.map((q) => <Row key={q.number} quote={q} onDelete={onDelete} onReuse={onReuse} />)}
      </ul>
    </section>
  );
}

function Row({ quote, onDelete, onReuse }: { quote: SavedQuote; onDelete: (number: string) => void; onReuse: (q: SavedQuote) => void }) {
  const [open, setOpen] = useState(false);
  const [made, setMade] = useState<Made | null>(null);

  return (
    <li className="py-3">
      <div className="flex justify-between gap-3">
        <div className="min-w-0 break-words">
          <p className="font-bold">{quote.draft.clientName}</p>
          <p className="text-sm text-ink/60">{longDate(quote.date)} · {quote.number}</p>
        </div>
        <p className="shrink-0 font-semibold">{peso(quote.total)}</p>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <button type="button" className={textButton} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "PDF and message"}</button>
        <button type="button" className={textButton} onClick={() => onReuse(quote)}>Copy to form</button>
        <button type="button" className={textButton}
          onClick={() => { if (window.confirm(`Delete quote ${quote.number}? This cannot be undone.`)) onDelete(quote.number); }}>
          Delete
        </button>
      </div>
      {/* Rebuilt from the saved copy, so the figures are exactly what was quoted. */}
      {open && <PdfActions made={made} onMade={setMade} build={async () => ({ quote, file: await buildQuotePdf(quote) })} />}
    </li>
  );
}
