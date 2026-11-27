"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { taglishMessage, type SavedQuote } from "@/lib/admin/quote";
import { Button } from "../ui/Button";
import { field, labelText } from "./ui";

export interface Made { quote: SavedQuote; file: File }

function download(file: File) {
  const url = URL.createObjectURL(file);
  const a = Object.assign(document.createElement("a"), { href: url, download: file.name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/** Download, share and the Taglish message for one quote. */
export default function PdfActions({ made, build, onMade }: {
  made: Made | null; build: () => Promise<Made>; onMade: (m: Made) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onDownload() {
    setBusy(true);
    setError("");
    try {
      const next = made ?? (await build());
      onMade(next);
      download(next.file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The PDF could not be made. Check your connection and try again.");
    }
    setBusy(false);
  }

  const canShare = made !== null && typeof navigator.canShare === "function" && navigator.canShare({ files: [made.file] });

  return (
    <div className="mt-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="button" onClick={onDownload} disabled={busy}>{busy ? "Making PDF..." : "Download PDF"}</Button>
        {canShare && (
          // Called straight from the tap: phones only open the share sheet that way.
          <Button type="button" variant="outline" onClick={() => navigator.share({ files: [made.file] }).catch(() => {})}>
            Share PDF
          </Button>
        )}
      </div>
      {error && <p role="alert" className="mt-2 text-sm font-medium text-red-700">{error}</p>}
      {made && (
        <>
          <p role="status" className="mt-3 text-sm">Saved in history as <strong>{made.quote.number}</strong>.</p>
          <MessageHelper key={made.quote.number} quote={made.quote} />
        </>
      )}
    </div>
  );
}

function MessageHelper({ quote }: { quote: SavedQuote }) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("Copied. Paste it in your chat with the client.");
    } catch {
      setCopied("Could not copy. Press and hold the text to copy it.");
    }
  }

  return (
    <div className="mt-4">
      <Button type="button" variant="dark" onClick={() => { setMessage(taglishMessage(quote, site.phones[0])); setCopied(""); }}>
        Fill Taglish message
      </Button>
      {message && (
        <>
          <label className={`${labelText} mt-3`}>Message (you can edit it)
            <textarea rows={14} value={message} onChange={(e) => { setMessage(e.target.value); setCopied(""); }}
              className={`${field} py-3 font-normal`} />
          </label>
          <Button type="button" variant="outline" onClick={copy} className="mt-2">Copy message</Button>
          {copied && <p role="status" className="mt-2 text-sm">{copied}</p>}
        </>
      )}
    </div>
  );
}
