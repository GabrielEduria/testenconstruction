import nodemailer from "nodemailer";

/**
 * Quote requests from the contact form.
 * 1. Emails the request to the business through Gmail (GMAIL_USER + GMAIL_APP_PASSWORD).
 * 2. Appends a row to the Google Sheet lead log (SHEETS_WEBHOOK_URL), if configured.
 * Succeeds when at least one of the two delivered the request.
 */
export const runtime = "nodejs";

const SERVICES = ["Construction", "Electrical", "Solar", "Not sure yet"];
const LIMITS: Record<string, number> = { name: 120, phone: 40, email: 160, location: 120, service: 40, property: 40, bill: 40, message: 4000 };

type Quote = Record<keyof typeof LIMITS, string>;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }

  // Spam traps: a hidden field bots fill in, and forms submitted faster than a person could type.
  const startedAt = Number(body.startedAt);
  if (clean(body.company, 200) || (startedAt && Date.now() - startedAt < 3000)) {
    return Response.json({ ok: true }); // pretend success so bots don't retry
  }

  const q = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)])) as Quote;
  if (!q.name || !q.phone || !q.message || !SERVICES.includes(q.service) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email)) {
    return Response.json({ error: "Please fill in your name, phone, a valid email, the service and project details." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", q.name], ["Phone", q.phone], ["Email", q.email], ["Service", q.service], ["Location", q.location || "-"],
    ...(q.service === "Solar" ? [["Property type", q.property || "-"], ["Monthly electric bill (₱)", q.bill || "-"]] as [string, string][] : []),
  ];

  const results = await Promise.allSettled([sendEmail(q, rows), logToSheet(q)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value);
  results.forEach((r) => r.status === "rejected" && console.error("[quote]", r.reason));

  if (!delivered) {
    return Response.json({ error: "We couldn't send your request right now. Please call or email us directly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}

/** Returns false when Gmail isn't configured; throws when sending fails. */
async function sendEmail(q: Quote, rows: [string, string][]) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return false;

  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass: pass.replace(/\s/g, "") } });
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", q.message].join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
    ${rows.map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}
  </table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(q.message)}</p>
  <p style="font-family:sans-serif;font-size:12px;color:#888">Sent from the website quote form. Reply to this email to answer ${esc(q.name)} directly.</p>`;

  await transport.sendMail({
    from: `"EN Construction Website" <${user}>`,
    to: process.env.QUOTE_TO || user,
    replyTo: `"${q.name.replace(/"/g, "")}" <${q.email}>`,
    subject: `Quote request: ${q.service} (${q.name})`,
    text, html,
  });
  return true;
}

/** Returns false when the sheet isn't configured; throws when logging fails. */
async function logToSheet(q: Quote) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...q, secret: process.env.SHEETS_WEBHOOK_SECRET ?? "" }),
    signal: AbortSignal.timeout(8000),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok || !out.ok) throw new Error(`Sheet log failed: ${res.status} ${JSON.stringify(out)}`);
  return true;
}
