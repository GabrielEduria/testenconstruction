import { Button } from "../ui/Button";
import PdfActions, { type Made } from "./PdfActions";
import { card } from "./ui";

export default function QuoteResult({ missing, made, build, onMade }: {
  missing: string[]; made: Made | null; build: () => Promise<Made>; onMade: (m: Made) => void;
}) {
  return (
    <section className={card}>
      <h2 className="text-lg font-bold">Send to client</h2>
      {missing.length > 0 ? (
        <>
          <p className="mt-2 text-sm font-semibold">Finish these before making the PDF:</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-ink/70">{[...new Set(missing)].map((m) => <li key={m}>{m}</li>)}</ul>
          <Button type="button" disabled className="mt-4 w-full opacity-50 sm:w-auto">Download PDF</Button>
        </>
      ) : (
        <PdfActions made={made} build={build} onMade={onMade} />
      )}
    </section>
  );
}
