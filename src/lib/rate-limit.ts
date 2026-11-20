/**
 * Fixed-window rate limiting for the waitlist endpoint.
 *
 * Deliberately in-process. The honest trade-off: Vercel can run several
 * instances of a function at once, so each one keeps its own counters and a
 * determined attacker spraying from many IPs can get more through than the
 * numbers below suggest. What this does stop is the cheap case — one script,
 * one address list, one connection — which is the realistic threat to a
 * 3,000/month email quota. A shared store (Upstash/Redis) is the upgrade, and
 * it needs an account and a connection string; this needs neither.
 *
 * The global fuse is the part that actually protects the quota: however many
 * distinct IPs an attacker has, every request they route to a given instance
 * counts against the same ceiling.
 */

type Window = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000;

/** Signups allowed per IP per window. Generous for a human, tight for a loop. */
const PER_IP = 3;
/** Signups allowed per instance per window, regardless of source. */
const GLOBAL = 40;
/** Bounds memory if someone sprays addresses from many IPs. */
const MAX_KEYS = 10_000;

const buckets = new Map<string, Window>();
let globalWindow: Window = { count: 0, resetAt: 0 };

function hit(key: string, limit: number, now: number): boolean {
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      // Drop anything already expired before growing; if nothing has expired,
      // evict the oldest insertion (Map preserves insertion order).
      for (const [k, w] of buckets) {
        if (w.resetAt <= now) buckets.delete(k);
      }
      if (buckets.size >= MAX_KEYS) {
        const oldest = buckets.keys().next();
        if (!oldest.done) buckets.delete(oldest.value);
      }
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

/** `retryAfter` is in seconds and is only meaningful when `ok` is false. */
export type RateLimitResult = { ok: boolean; retryAfter: number };

/**
 * `ip` comes from x-forwarded-for, which only Vercel's proxy sets on the way
 * in — a client-supplied header cannot reach the function untouched. An empty
 * value still gets a bucket ("unknown") rather than a free pass.
 */
export function checkSignupRate(ip: string | null): RateLimitResult {
  const now = Date.now();

  if (globalWindow.resetAt <= now) {
    globalWindow = { count: 0, resetAt: now + WINDOW_MS };
  }
  if (globalWindow.count >= GLOBAL) {
    return { ok: false, retryAfter: Math.ceil((globalWindow.resetAt - now) / 1000) };
  }

  const key = (ip || "unknown").trim().toLowerCase();
  if (!hit(key, PER_IP, now)) {
    const w = buckets.get(key);
    return { ok: false, retryAfter: w ? Math.ceil((w.resetAt - now) / 1000) : WINDOW_MS / 1000 };
  }

  globalWindow.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** The first hop in x-forwarded-for is the real client on Vercel. */
export function clientIp(request: Request): string | null {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip");
}
