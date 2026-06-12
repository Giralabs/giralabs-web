import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

// ----------------------------------------------------------------
// Bookings persistence layer
//
// Strategy:
//   • Production (Vercel) → Upstash Redis (via @upstash/redis)
//   • Local dev            → JSON file at data/bookings.json
//
// Redis key schema:
//   giralabs:booked:{YYYY-MM-DD}            → Set of booked time strings
//   giralabs:booking:{YYYY-MM-DD}:{HH:MM}  → JSON string of BookingInfo
//   giralabs:cancel:{TOKEN}                 → JSON string of {dateISO, time}
// ----------------------------------------------------------------

export interface BookingInfo {
  name: string;
  email: string;
  company?: string;
  guests: string[];
  meetLink: string;
  bookedAt: string;
  cancelToken: string;    // ← unique token for secure cancellation URL
  dateFormatted?: string; // ← stored so cancellation emails can display it
}

// ── UPSTASH REDIS (production) ─────────────────────────────────

function isRedisConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function getRedis() {
  const { Redis } = await import('@upstash/redis');
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// ── LOCAL JSON FILE (dev fallback) ────────────────────────────

const DATA_DIR = join(process.cwd(), 'data');
const BOOKINGS_FILE = join(DATA_DIR, 'bookings.json');

interface BookingsData {
  byDate: Record<string, Record<string, BookingInfo>>;   // [dateISO][time] → info
  byToken: Record<string, { dateISO: string; time: string }>; // [token] → {dateISO, time}
}

function readLocalBookings(): BookingsData {
  try {
    if (!existsSync(BOOKINGS_FILE)) return { byDate: {}, byToken: {} };
    const raw = JSON.parse(readFileSync(BOOKINGS_FILE, 'utf-8'));
    // Migrate old format (flat Record<dateISO, Record<time, info>>) if needed
    if (raw.byDate) return raw as BookingsData;
    return { byDate: raw, byToken: {} };
  } catch {
    return { byDate: {}, byToken: {} };
  }
}

function writeLocalBookings(data: BookingsData): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ── PUBLIC API ─────────────────────────────────────────────────

/** Returns an array of already-booked time strings for a given ISO date */
export async function getBookedSlots(dateISO: string): Promise<string[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis();
    const slots = await redis.smembers<string>(`giralabs:booked:${dateISO}`);
    return slots ?? [];
  }
  const data = readLocalBookings();
  return Object.keys(data.byDate[dateISO] ?? {});
}

/** Returns true if the slot is already taken */
export async function isSlotBooked(dateISO: string, time: string): Promise<boolean> {
  if (isRedisConfigured()) {
    const redis = await getRedis();
    return (await redis.sismember(`giralabs:booked:${dateISO}`, time)) === 1;
  }
  const data = readLocalBookings();
  return !!(data.byDate[dateISO]?.[time]);
}

/** Generates a unique cancel token */
export function generateCancelToken(): string {
  return randomUUID();
}

/** Persists a new booking (blocks the slot) */
export async function saveBooking(dateISO: string, time: string, info: BookingInfo): Promise<void> {
  if (isRedisConfigured()) {
    const redis = await getRedis();
    const ttl = 60 * 60 * 24 * 365; // 1 year
    await redis.sadd(`giralabs:booked:${dateISO}`, time);
    await redis.set(`giralabs:booking:${dateISO}:${time}`, JSON.stringify(info), { ex: ttl });
    await redis.set(`giralabs:cancel:${info.cancelToken}`, JSON.stringify({ dateISO, time }), { ex: ttl });
    return;
  }
  const data = readLocalBookings();
  if (!data.byDate[dateISO]) data.byDate[dateISO] = {};
  data.byDate[dateISO][time] = info;
  data.byToken[info.cancelToken] = { dateISO, time };
  writeLocalBookings(data);
}

/** Looks up a booking by its cancel token */
export async function getBookingByToken(token: string): Promise<{ dateISO: string; time: string; info: BookingInfo } | null> {
  if (isRedisConfigured()) {
    const redis = await getRedis();
    const raw = await redis.get<string>(`giralabs:cancel:${token}`);
    if (!raw) return null;
    const { dateISO, time } = typeof raw === 'string' ? JSON.parse(raw) : raw as { dateISO: string; time: string };
    const infoRaw = await redis.get<string>(`giralabs:booking:${dateISO}:${time}`);
    if (!infoRaw) return null;
    const info: BookingInfo = typeof infoRaw === 'string' ? JSON.parse(infoRaw) : infoRaw as BookingInfo;
    return { dateISO, time, info };
  }
  const data = readLocalBookings();
  const ref = data.byToken[token];
  if (!ref) return null;
  const info = data.byDate[ref.dateISO]?.[ref.time];
  if (!info) return null;
  return { dateISO: ref.dateISO, time: ref.time, info };
}

/** Cancels a booking by token — frees the slot, returns the booking info */
export async function cancelBookingByToken(token: string): Promise<{ dateISO: string; time: string; info: BookingInfo } | null> {
  const found = await getBookingByToken(token);
  if (!found) return null;

  const { dateISO, time, info } = found;

  if (isRedisConfigured()) {
    const redis = await getRedis();
    await redis.srem(`giralabs:booked:${dateISO}`, time);
    await redis.del(`giralabs:booking:${dateISO}:${time}`);
    await redis.del(`giralabs:cancel:${token}`);
    return found;
  }

  // Local fallback
  const data = readLocalBookings();
  delete data.byDate[dateISO]?.[time];
  delete data.byToken[token];
  writeLocalBookings(data);
  return { dateISO, time, info };
}
