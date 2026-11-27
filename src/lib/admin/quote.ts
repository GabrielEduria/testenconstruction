/** Quotation data types and calculations. Every peso amount comes from the price list; nothing here supplies a price. */

export type Kind = "panel" | "inverter" | "battery" | "other";
export const KIND_LABELS: Record<Kind, string> = { panel: "Solar panel", inverter: "Inverter", battery: "Battery", other: "Other item" };

/** Numbers are kept as typed text so inputs behave while editing; parseAmount turns them into numbers. */
export interface PriceItem { id: string; kind: Kind; name: string; unit: string; price: string }

export interface Settings {
  ratePerKwh: string; sunHours: string;
  warranty: string; paymentTerms: string; installTime: string; validDays: string; otherTerms: string;
  license: string;
}

export interface ExtraLine { id: string; itemId: string; qty: string }

export interface Draft {
  clientName: string; location: string; contact: string; monthlyBill: string;
  panelId: string; panelCount: string; panelWatts: string;
  inverterId: string; inverterQty: string;
  batteryId: string; batteryCount: string; batteryKwh: string;
  extras: ExtraLine[];
}

export interface Line { name: string; unit: string; qty: number; unitPrice: number | null; amount: number | null }

export interface Solar {
  kwp: number | null; batteryTotalKwh: number | null; monthlyKwh: number | null; monthlySavings: number | null; billShare: number | null;
  panelCount: number | null; panelWatts: number | null; ratePerKwh: number | null; sunHours: number | null; monthlyBill: number | null;
}

/** A frozen copy of a quote, so later price-list or settings edits never change past quotes. */
export interface SavedQuote {
  number: string; date: string; validUntil: string;
  draft: Draft; lines: Line[]; total: number; solar: Solar; settings: Settings;
}

export const DAYS_PER_MONTH = 30;
export const FINAL_PRICE_NOTE = "Final price follows the free site check.";

/** Item names and units only. Prices start blank on purpose: the owner enters them. */
export const DEFAULT_PRICE_LIST: PriceItem[] = [
  { id: "panel", kind: "panel", name: "Solar panel", unit: "pc", price: "" },
  { id: "inverter", kind: "inverter", name: "Hybrid inverter", unit: "unit", price: "" },
  { id: "battery", kind: "battery", name: "Battery", unit: "unit", price: "" },
  { id: "mounting", kind: "other", name: "Mounting", unit: "lot", price: "" },
  { id: "cables", kind: "other", name: "Cables and protection", unit: "lot", price: "" },
  { id: "labor", kind: "other", name: "Labor", unit: "lot", price: "" },
  { id: "permits", kind: "other", name: "Permits", unit: "lot", price: "" },
];

/** Warranty matches what the public solar page states. Everything else waits for the owner's answer. */
export const DEFAULT_SETTINGS: Settings = {
  ratePerKwh: "", sunHours: "",
  warranty: "3-year warranty on the solar installation.", paymentTerms: "", installTime: "", validDays: "", otherTerms: "",
  license: "",
};

export const newId = () => Math.random().toString(36).slice(2, 10);

export function emptyDraft(items: PriceItem[]): Draft {
  const first = (k: Kind) => items.find((i) => i.kind === k)?.id ?? "";
  return {
    clientName: "", location: "", contact: "", monthlyBill: "",
    panelId: first("panel"), panelCount: "", panelWatts: "",
    inverterId: first("inverter"), inverterQty: "1",
    batteryId: first("battery"), batteryCount: "", batteryKwh: "",
    extras: items.filter((i) => i.kind === "other").map((i) => ({ id: `default-${i.id}`, itemId: i.id, qty: "1" })),
  };
}

/** Accepts "12,500" or "₱12500.50". Blank, negative or non-numeric text gives null (never a silent zero). */
export function parseAmount(text: string): number | null {
  const t = text.replace(/[,\s₱]/g, "");
  if (!/^(\d+(\.\d*)?|\.\d+)$/.test(t)) return null;
  return Number(t);
}
const positive = (text: string) => parseAmount(text) || null;
const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Builds the quote lines and collects the problems that make the total unreliable. */
export function buildLines(draft: Draft, items: PriceItem[]) {
  const lines: Line[] = [];
  const problems: string[] = [];

  const add = (label: string, itemId: string, qtyText: string, detail = "") => {
    const qty = parseAmount(qtyText);
    if (qtyText.trim() === "" || qty === 0) return; // not part of this quote
    if (qty === null) return void problems.push(`${label}: the quantity is not a valid number.`);
    const item = items.find((i) => i.id === itemId);
    if (!item) return void problems.push(`${label}: choose an item from the price list.`);
    const unitPrice = parseAmount(item.price);
    if (unitPrice === null) problems.push(`${item.name || label}: no price in the price list.`);
    if (!item.name.trim()) problems.push(`${label}: the price list item has no name.`);
    lines.push({
      name: detail ? `${item.name} (${detail})` : item.name,
      unit: item.unit, qty, unitPrice,
      amount: unitPrice === null ? null : round2(qty * unitPrice),
    });
  };

  const watts = positive(draft.panelWatts);
  const kwh = positive(draft.batteryKwh);
  add("Panels", draft.panelId, draft.panelCount, watts ? `${watts} W` : "");
  add("Inverter", draft.inverterId, draft.inverterQty);
  add("Battery", draft.batteryId, draft.batteryCount, kwh ? `${kwh} kWh each` : "");
  draft.extras.forEach((e, i) => add(`Extra line ${i + 1}`, e.itemId, e.qty));

  // Summed in centavos to avoid floating-point drift.
  const total = lines.reduce((sum, l) => sum + Math.round((l.amount ?? 0) * 100), 0) / 100;
  return { lines, total, problems };
}

export function solarCheck(draft: Draft, settings: Settings): Solar {
  const panelCount = positive(draft.panelCount);
  const panelWatts = positive(draft.panelWatts);
  const batteryCount = positive(draft.batteryCount);
  const batteryKwh = positive(draft.batteryKwh);
  const ratePerKwh = positive(settings.ratePerKwh);
  const sunHours = positive(settings.sunHours);
  const monthlyBill = positive(draft.monthlyBill);

  const kwp = panelCount && panelWatts ? (panelCount * panelWatts) / 1000 : null;
  const monthlyKwh = kwp && sunHours ? kwp * sunHours * DAYS_PER_MONTH : null;
  const monthlySavings = monthlyKwh && ratePerKwh ? monthlyKwh * ratePerKwh : null;
  return {
    kwp,
    batteryTotalKwh: batteryCount && batteryKwh ? batteryCount * batteryKwh : null,
    monthlyKwh, monthlySavings,
    billShare: monthlySavings && monthlyBill ? monthlySavings / monthlyBill : null,
    panelCount, panelWatts, ratePerKwh, sunHours, monthlyBill,
  };
}

/** Everything that must be fixed before a PDF can be made. */
export function blockers(draft: Draft, items: PriceItem[], settings: Settings): string[] {
  const { lines, problems } = buildLines(draft, items);
  const out = [...problems];
  if (!draft.clientName.trim()) out.push("Enter the client name.");
  if (!lines.length) out.push("Add at least one item to the quote.");
  if (parseAmount(draft.panelCount) && !positive(draft.panelWatts)) out.push("Enter the panel watts.");
  const days = parseAmount(settings.validDays);
  if (!days || !Number.isInteger(days) || days > 365) out.push("Settings: enter the quote validity in days (1 to 365).");
  if (!settings.warranty.trim()) out.push("Settings: enter the warranty terms.");
  if (!settings.paymentTerms.trim()) out.push("Settings: enter the payment terms.");
  if (!settings.installTime.trim()) out.push("Settings: enter the installation time.");
  return out;
}

const pad = (n: number, size = 2) => String(n).padStart(size, "0");
/** Local calendar date as YYYY-MM-DD (toISOString would give yesterday during Philippine mornings). */
export const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function makeSavedQuote(draft: Draft, items: PriceItem[], settings: Settings, sequence: number, now: Date): SavedQuote {
  const { lines, total } = buildLines(draft, items);
  const until = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (parseAmount(settings.validDays) ?? 0));
  return {
    number: `ENC-${isoDate(now).replaceAll("-", "")}-${pad(sequence, 3)}`,
    date: isoDate(now), validUntil: isoDate(until),
    draft: structuredClone(draft), lines, total,
    solar: solarCheck(draft, settings), settings: { ...settings },
  };
}

/** True when two quotes would print the same content, so downloading again doesn't create a new quotation number. */
export function sameContent(a: SavedQuote, b: SavedQuote) {
  const key = (q: SavedQuote) => JSON.stringify([q.date, q.validUntil, q.draft, q.lines, q.solar, q.settings]);
  return key(a) === key(b);
}

export const formatNumber = (n: number, digits = 0) => n.toLocaleString("en-PH", { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const peso = (n: number) => `₱${formatNumber(n, 2)}`;
export const longDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
};
/** "Up to 100%": production beyond the bill is not promised as savings. */
export const shareLabel = (share: number) => (share >= 1 ? "up to 100%" : `about ${Math.round(share * 100)}%`);

export function taglishMessage(q: SavedQuote, phone: string) {
  const { kwp, billShare } = q.solar;
  return [
    `Hi ${q.draft.clientName.trim()}! Good day po.`,
    "",
    `Ito na po ang quotation ninyo${kwp ? ` para sa ${formatNumber(kwp, 2)} kWp solar system` : " para sa solar installation"}.`,
    `Quotation No.: ${q.number}`,
    `Total: ${peso(q.total)}`,
    `Valid po hanggang ${longDate(q.validUntil)}.`,
    ...(billShare ? ["", `Base sa estimate, ${shareLabel(billShare)} ng monthly electric bill ninyo ang puwedeng ma-cover. Estimate lang po ito at puwedeng magbago depende sa araw at paggamit ng kuryente.`] : []),
    "",
    "Paki-check po ang attached na PDF para sa details. Ang final price po ay iko-confirm pagkatapos ng free site check.",
    "",
    "May tanong po ba kayo? Kailan po kayo available para sa site check?",
    "",
    `Salamat po!\nEN Construction\n${phone}`,
  ].join("\n");
}
