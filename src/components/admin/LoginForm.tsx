"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { card, field, labelText } from "./ui";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) return window.location.reload();
      const out = await res.json().catch(() => ({}));
      setError(out.error || "Could not sign in.");
    } catch {
      setError("No connection. Check your internet and try again.");
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-sm items-center px-4">
      <form onSubmit={onSubmit} className={`${card} w-full space-y-4`}>
        <h1 className="text-xl font-bold">Sign in</h1>
        <div>
          <label htmlFor="password" className={labelText}>Password</label>
          <input id="password" type="password" required autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} className={field} />
        </div>
        {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
        <Button type="submit" disabled={busy} className="w-full">{busy ? "Checking..." : "Sign in"}</Button>
      </form>
    </div>
  );
}
