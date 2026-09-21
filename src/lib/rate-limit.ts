/**
 * Basit in-memory rate limit.
 * Vercel’de instance başına çalışır (best-effort); Upstash gerekirse burası değişir.
 */

type Bucket = { timestamps: number[] };

const store = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit = 3,
  windowMs = 60_000,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = store.get(key) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSec = Math.ceil((windowMs - (now - oldest)) / 1000);
    store.set(key, bucket);
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  store.set(key, bucket);
  return { ok: true };
}
