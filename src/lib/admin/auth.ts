/**
 * Server-only. The password lives in the ADMIN_PASSWORD environment variable and is never sent to the browser.
 * A successful login sets a signed, httpOnly cookie: "<expiry>.<hmac>". Changing the password signs everyone out.
 */
import { createHash, createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "en_admin";
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

const password = () => process.env.ADMIN_PASSWORD || "";
export const isConfigured = () => password().length > 0;

const digest = (s: string) => createHash("sha256").update(s).digest();
const same = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));

export const checkPassword = (attempt: string) => isConfigured() && same(attempt, password());

let cachedKey: { password: string; key: Buffer } | undefined;
function signingKey() {
  const p = password();
  if (cachedKey?.password !== p) cachedKey = { password: p, key: scryptSync(p, "en-admin-session", 32) };
  return cachedKey.key;
}
const sign = (expires: string) => createHmac("sha256", signingKey()).update(expires).digest("hex");

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_SECONDS * 1000);
  return `${expires}.${sign(expires)}`;
}

export async function isAuthed() {
  if (!isConfigured()) return false;
  const [expires, signature] = ((await cookies()).get(SESSION_COOKIE)?.value ?? "").split(".");
  if (!expires || !signature || !(Number(expires) > Date.now())) return false;
  return same(signature, sign(expires));
}
