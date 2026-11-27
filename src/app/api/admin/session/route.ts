import { cookies } from "next/headers";
import { checkPassword, createSessionToken, isConfigured, SESSION_COOKIE, SESSION_SECONDS } from "@/lib/admin/auth";

/** Admin sign-in (POST) and sign-out (DELETE). Runs only on the server. */
export const runtime = "nodejs";

const MAX_FAILS = 8;
const WINDOW_MS = 15 * 60 * 1000;
// Best-effort brake on guessing: memory is per server instance, so a long random password is still what protects the page.
const fails = new Map<string, { count: number; until: number }>();

export async function POST(req: Request) {
  if (!isConfigured()) {
    return Response.json({ error: "Admin login is not set up yet. Add ADMIN_PASSWORD in the hosting settings, then redeploy." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const entry = fails.get(ip);
  const record = entry && entry.until > now ? entry : { count: 0, until: now + WINDOW_MS };
  if (record.count >= MAX_FAILS) {
    return Response.json({ error: "Too many wrong tries. Wait 15 minutes and try again." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const attempt = typeof body?.password === "string" ? body.password : "";
  if (!checkPassword(attempt)) {
    record.count += 1; // counted before the delay so parallel requests can't slip past the limit
    fails.set(ip, record);
    await new Promise((r) => setTimeout(r, 800));
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  fails.delete(ip);
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  (await cookies()).delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
