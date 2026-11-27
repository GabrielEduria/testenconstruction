"use client";

import { useState } from "react";
import { buildQuotePdf } from "@/lib/admin/pdf";
import {
  blockers, DEFAULT_PRICE_LIST, DEFAULT_SETTINGS, emptyDraft, makeSavedQuote, sameContent,
  type Draft, type PriceItem, type SavedQuote, type Settings,
} from "@/lib/admin/quote";
import { useStored } from "@/lib/admin/storage";
import { cn } from "@/lib/utils";
import History from "./History";
import type { Made } from "./PdfActions";
import PriceList from "./PriceList";
import QuoteForm from "./QuoteForm";
import QuoteResult from "./QuoteResult";
import SettingsForm from "./SettingsForm";
import { textButton } from "./ui";

const TABS = ["Quote", "Prices", "History", "Settings"] as const;

export default function AdminApp() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Quote");
  const [items, saveItems, itemsFailed] = useStored<PriceItem[]>("en.admin.prices", () => DEFAULT_PRICE_LIST);
  const [settings, saveSettings, settingsFailed] = useStored<Settings>("en.admin.settings", () => DEFAULT_SETTINGS);
  const [storedDraft, saveDraft, draftFailed] = useStored<Draft | null>("en.admin.draft", () => null);
  const [quotes, saveQuotes, quotesFailed] = useStored<SavedQuote[]>("en.admin.quotes", () => []);
  const [sequence, saveSequence] = useStored<number>("en.admin.sequence", () => 0);
  /** The quote whose PDF and message are on screen. */
  const [made, setMade] = useState<Made | null>(null);

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" }).catch(() => {});
    window.location.reload();
  }

  if (!items || !settings || storedDraft === undefined || !quotes || sequence === undefined) {
    return <p className="p-6 text-sm text-ink/60">Loading...</p>;
  }
  // A fresh draft is stored on the first edit.
  const draft = storedDraft ?? emptyDraft(items);

  // Any edit hides the last PDF, so an outdated one can't be sent by mistake.
  const editDraft = (next: Draft) => { setMade(null); saveDraft(next); };
  const editSettings = (next: Settings) => { setMade(null); saveSettings(next); };
  const editItems = (next: PriceItem[]) => { setMade(null); saveItems(next); };

  /** Builds the PDF first and saves afterwards, so a quote that fails to render never reaches history. */
  async function createPdf(): Promise<Made> {
    const now = new Date();
    const match = quotes!.find((q) => sameContent(q, makeSavedQuote(draft, items!, settings!, 0, now)));
    const quote = match ?? makeSavedQuote(draft, items!, settings!, sequence! + 1, now);
    const file = await buildQuotePdf(quote);
    if (!match) {
      saveSequence(sequence! + 1);
      saveQuotes([quote, ...quotes!]);
      saveDraft(draft);
    }
    return { quote, file };
  }

  return (
    <div className="pb-16">
      <header className="sticky top-0 z-10 bg-ink text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
          <p className="py-3 font-bold">EN Quotation Maker</p>
          <button type="button" onClick={signOut} className="min-h-11 text-sm underline">Sign out</button>
        </div>
        <nav className="mx-auto grid max-w-4xl grid-cols-4" aria-label="Admin sections">
          {TABS.map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} aria-current={tab === t ? "page" : undefined}
              className={cn("min-h-12 border-b-4 text-sm font-semibold", tab === t ? "border-brand text-brand" : "border-transparent text-white/70")}>
              {t}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-4xl space-y-4 px-4 pt-4">
        {(itemsFailed || settingsFailed || draftFailed || quotesFailed) && (
          <p role="alert" className="border-l-4 border-red-700 bg-white p-4 text-sm font-medium text-red-700">
            This browser could not read or save your data. Private browsing or full storage can cause this. Do not rely on it being saved.
          </p>
        )}

        {tab === "Quote" && (
          <>
            <QuoteForm items={items} settings={settings} draft={draft} onDraft={editDraft} onSettings={editSettings}
              onClear={() => { if (window.confirm("Clear this form and start a new quote?")) editDraft(emptyDraft(items)); }} />
            <QuoteResult missing={blockers(draft, items, settings)} made={made} build={createPdf} onMade={setMade} />
          </>
        )}
        {tab === "Prices" && <PriceList items={items} onChange={editItems} />}
        {tab === "History" && (
          <History quotes={quotes}
            onDelete={(number) => { setMade(null); saveQuotes(quotes.filter((q) => q.number !== number)); }}
            onReuse={(q) => {
              if (!window.confirm("Copy this quote into the form? It replaces what is in the form now and uses the current price list.")) return;
              editDraft(structuredClone(q.draft));
              setTab("Quote");
            }} />
        )}
        {tab === "Settings" && <SettingsForm settings={settings} onChange={editSettings} />}

        {tab !== "Quote" && <button type="button" onClick={() => setTab("Quote")} className={textButton}>Back to quote</button>}
      </div>
    </div>
  );
}
