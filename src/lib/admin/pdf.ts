/** Builds the one-page A4 quotation PDF in the browser. jsPDF is loaded only when a PDF is requested. */
import type { jsPDF as JsPDF } from "jspdf";
import { site } from "@/data/site";
import { DAYS_PER_MONTH, FINAL_PRICE_NOTE, formatNumber, longDate, shareLabel, type SavedQuote } from "./quote";

const INK = "#16171a";
const MUTED = "#5c5e63";
const RULE = "#dddbd5";
const BRAND = "#ff9119";
const PAGE_W = 210, PAGE_H = 297, MARGIN = 14, RIGHT = PAGE_W - MARGIN, WIDTH = RIGHT - MARGIN;
const FOOTER_TOP = PAGE_H - 22;
const SCALES = [1, 0.92, 0.84, 0.76, 0.68];

interface Logo { data: string; ratio: number }

async function loadLogo(): Promise<Logo> {
  const img = new Image();
  img.src = "/images/en-construction.png";
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = Math.round((1000 * img.naturalHeight) / img.naturalWidth);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { data: canvas.toDataURL("image/png"), ratio: canvas.height / canvas.width };
}

/** The built-in PDF fonts have no peso sign or emoji, which would otherwise print as garbage. */
const safe = (s: string) =>
  s.replace(/₱\s?/g, "PHP ").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-")
    .replace(/…/g, "...").replace(/•/g, "-").replace(/\t/g, " ").replace(/[^\n\x20-\x7e\xa0-\xff]/g, "?");

const money = (n: number) => formatNumber(n, 2);
const qtyText = (n: number) => n.toLocaleString("en-PH", { maximumFractionDigits: 2 });

/** Draws one page at the given text scale and reports whether everything stayed above the footer. */
function draw(doc: JsPDF, q: SavedQuote, logo: Logo, k: number) {
  const font = (size: number, bold = false, color = INK) => {
    doc.setFont("helvetica", bold ? "bold" : "normal").setFontSize(size * k).setTextColor(color);
  };
  const lh = (size: number) => size * k * 0.44; // line height in mm for a point size
  const wrap = (value: string, width: number): string[] => doc.splitTextToSize(safe(value), width);
  const text = (value: string | string[], x: number, y: number, align: "left" | "right" = "left") =>
    doc.text(typeof value === "string" ? safe(value) : value, x, y, { align, lineHeightFactor: 1.25 });
  const rule = (y: number) => doc.setDrawColor(RULE).setLineWidth(0.2).line(MARGIN, y, RIGHT, y);

  // Header
  const logoW = 92, logoH = logoW * logo.ratio;
  doc.addImage(logo.data, "PNG", MARGIN, MARGIN, logoW, logoH, "logo", "FAST");
  font(17, true);
  text("QUOTATION", RIGHT, MARGIN + 6, "right");
  font(9, false, MUTED);
  [`No. ${q.number}`, `Date: ${longDate(q.date)}`, `Valid until: ${longDate(q.validUntil)}`]
    .forEach((t, i) => text(t, RIGHT, MARGIN + 12 + i * 4.5, "right"));

  let y = MARGIN + logoH + 5;
  font(8.5, false, MUTED);
  const company = [site.address.join(", "), `${site.phones.join(" / ")}  |  ${site.emails[0]}`];
  if (q.settings.license.trim()) company.push(`License: ${q.settings.license.trim()}`);
  company.forEach((c) => { const l = wrap(c, 120); text(l, MARGIN, y); y += l.length * lh(8.5); });
  y = Math.max(y, MARGIN + 26) + 1;
  doc.setDrawColor(BRAND).setLineWidth(1).line(MARGIN, y, RIGHT, y);

  // Client
  y += 7;
  font(8, true, MUTED);
  text("PREPARED FOR", MARGIN, y);
  y += lh(12) + 0.5;
  font(12, true);
  const name = wrap(q.draft.clientName.trim(), WIDTH);
  text(name, MARGIN, y);
  y += name.length * lh(12);
  font(9);
  [q.draft.location.trim(), q.draft.contact.trim()].filter(Boolean).forEach((t) => {
    const l = wrap(t, WIDTH);
    text(l, MARGIN, y);
    y += l.length * lh(9);
  });

  // Line items
  y += 4;
  const col = { item: MARGIN + 2, qty: 119, unit: 123, price: 166, amount: RIGHT - 2 };
  const headH = lh(8) + 3.5;
  doc.setFillColor(INK).rect(MARGIN, y, WIDTH, headH, "F");
  font(8, true, "#ffffff");
  const headY = y + headH / 2 + lh(8) / 3;
  text("ITEM", col.item, headY);
  text("QTY", col.qty, headY, "right");
  text("UNIT", col.unit, headY);
  text("UNIT PRICE (PHP)", col.price, headY, "right");
  text("AMOUNT (PHP)", col.amount, headY, "right");
  y += headH;
  q.lines.forEach((line) => {
    font(9);
    const itemName = wrap(line.name, col.qty - col.item - 12);
    const unit = wrap(line.unit, 18);
    const h = Math.max(itemName.length, unit.length) * lh(9) + 2.6;
    const base = y + lh(9) + 0.8;
    text(itemName, col.item, base);
    text(qtyText(line.qty), col.qty, base, "right");
    text(unit, col.unit, base);
    text(money(line.unitPrice ?? 0), col.price, base, "right");
    text(money(line.amount ?? 0), col.amount, base, "right");
    y += h;
    rule(y);
  });

  y += 2;
  const totalH = lh(13) + 4;
  doc.setFillColor(BRAND).rect(110, y, RIGHT - 110, totalH, "F");
  font(13, true);
  const totalY = y + totalH / 2 + lh(13) / 3;
  text("TOTAL", 113, totalY);
  text(`PHP ${money(q.total)}`, col.amount, totalY, "right");
  y += totalH + 7;

  const heading = (t: string) => { font(10, true); text(t, MARGIN, y); y += lh(10) + 1; };
  const paragraph = (t: string, size = 9, color = INK) => {
    font(size, false, color);
    const l = wrap(t, WIDTH);
    text(l, MARGIN, y);
    y += l.length * lh(size) + 0.6;
  };

  // Solar estimate, with its assumptions
  const s = q.solar;
  if (s.kwp) {
    heading("Solar estimate (estimates only, not a guarantee)");
    paragraph(`System size: ${formatNumber(s.kwp, 2)} kWp (${s.panelCount} panels x ${s.panelWatts} W)` +
      (s.batteryTotalKwh ? `   |   Battery storage: ${formatNumber(s.batteryTotalKwh, 1)} kWh` : ""));
    if (s.monthlyKwh) paragraph(`Estimated monthly generation: about ${formatNumber(s.monthlyKwh)} kWh`);
    if (s.billShare && s.monthlyBill) {
      paragraph(`Estimated share of a PHP ${money(s.monthlyBill)} monthly bill covered: ${shareLabel(s.billShare)}`);
    }
    if (s.monthlyKwh) {
      paragraph(
        `Assumptions: ${s.sunHours} sun-hours per day, ${DAYS_PER_MONTH} days per month` +
        (s.billShare ? `, PHP ${s.ratePerKwh} per kWh, and all generated power offsetting the bill at that rate` : "") +
        ". Actual results vary with weather, shading, roof direction, system losses, power use and utility rules.", 8, MUTED);
    }
    y += 4;
  }

  // Terms
  heading("Terms");
  [
    `Warranty: ${q.settings.warranty.trim()}`,
    `Payment: ${q.settings.paymentTerms.trim()}`,
    `Installation time: ${q.settings.installTime.trim()}`,
    `Validity: This quotation is valid until ${longDate(q.validUntil)}.`,
    ...(q.settings.otherTerms.trim() ? [q.settings.otherTerms.trim()] : []),
  ].forEach((t) => paragraph(t));
  y += 3;
  font(10.5, true);
  const note = wrap(FINAL_PRICE_NOTE, WIDTH);
  text(note, MARGIN, y);
  y += note.length * lh(10.5);

  // Footer
  rule(FOOTER_TOP + 5);
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(MUTED);
  text(`${site.name}  |  ${site.tagline}`, MARGIN, FOOTER_TOP + 10);
  text(q.number, RIGHT, FOOTER_TOP + 10, "right");

  return y <= FOOTER_TOP;
}

export const pdfFileName = (q: SavedQuote) =>
  `${q.number}-${q.draft.clientName.trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "client"}.pdf`;

export async function buildQuotePdf(q: SavedQuote): Promise<File> {
  const [{ jsPDF }, logo] = await Promise.all([import("jspdf"), loadLogo()]);
  // Shrink the text step by step until the quote fits on one page.
  for (const scale of SCALES) {
    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    doc.setProperties({ title: `Quotation ${q.number}`, author: site.name });
    if (draw(doc, q, logo, scale)) return new File([doc.output("blob")], pdfFileName(q), { type: "application/pdf" });
  }
  throw new Error("This quote is too long for one A4 page. Shorten the terms or combine some line items.");
}
