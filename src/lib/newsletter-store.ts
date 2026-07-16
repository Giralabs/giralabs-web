import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

export interface Subscriber {
  email: string;
  lang: 'es' | 'en';
  subscribedAt: string;
}

// ── UPSTASH REDIS (production config) ───────────────────────────

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

// ── LOCAL JSON FILE (dev fallback) ─────────────────────────────

const DATA_DIR = join(process.cwd(), 'data');
const NEWSLETTER_FILE = join(DATA_DIR, 'newsletter.json');

interface NewsletterData {
  subscribers: Subscriber[];
  notifiedSlugs: string[];
}

function readLocalNewsletter(): NewsletterData {
  try {
    if (!existsSync(NEWSLETTER_FILE)) {
      return { subscribers: [], notifiedSlugs: [] };
    }
    const raw = readFileSync(NEWSLETTER_FILE, 'utf-8');
    return JSON.parse(raw) as NewsletterData;
  } catch {
    return { subscribers: [], notifiedSlugs: [] };
  }
}

function writeLocalNewsletter(data: NewsletterData): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(NEWSLETTER_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ── PUBLIC API ──────────────────────────────────────────────────

/** Adds a subscriber if not already present. Returns true if newly added, false otherwise. */
export async function addSubscriber(email: string, lang: 'es' | 'en'): Promise<boolean> {
  const cleanEmail = email.trim().toLowerCase();
  
  if (isRedisConfigured()) {
    const redis = await getRedis();
    // Fetch all existing emails to check uniqueness
    const members = await redis.smembers(`giralabs:newsletter:subscribers`);
    const exists = members.some((m: any) => {
      const parsed = typeof m === 'string' ? JSON.parse(m) : m;
      return parsed.email === cleanEmail;
    });

    if (exists) return false;

    const newSub: Subscriber = {
      email: cleanEmail,
      lang,
      subscribedAt: new Date().toISOString(),
    };
    await redis.sadd(`giralabs:newsletter:subscribers`, JSON.stringify(newSub));
    return true;
  }

  // Local JSON fallback
  const data = readLocalNewsletter();
  const exists = data.subscribers.some(s => s.email === cleanEmail);
  if (exists) return false;

  data.subscribers.push({
    email: cleanEmail,
    lang,
    subscribedAt: new Date().toISOString()
  });
  writeLocalNewsletter(data);
  return true;
}

/** Returns all active newsletter subscribers */
export async function getSubscribers(): Promise<Subscriber[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis();
    const members = await redis.smembers(`giralabs:newsletter:subscribers`);
    return (members ?? []).map((m: any) => {
      return typeof m === 'string' ? JSON.parse(m) : m;
    });
  }
  const data = readLocalNewsletter();
  return data.subscribers;
}

/** Returns all slugs that have already been notified via email */
export async function getNotifiedSlugs(): Promise<string[]> {
  if (isRedisConfigured()) {
    const redis = await getRedis();
    const slugs = await redis.smembers(`giralabs:newsletter:notified_slugs`);
    return slugs ?? [];
  }
  const data = readLocalNewsletter();
  return data.notifiedSlugs;
}

/** Marks slugs as notified in the store */
export async function saveNotifiedSlugs(slugs: string[]): Promise<void> {
  if (slugs.length === 0) return;
  
  if (isRedisConfigured()) {
    const redis = await getRedis();
    await redis.sadd(`giralabs:newsletter:notified_slugs`, ...slugs);
    return;
  }
  const data = readLocalNewsletter();
  slugs.forEach(slug => {
    if (!data.notifiedSlugs.includes(slug)) {
      data.notifiedSlugs.push(slug);
    }
  });
  writeLocalNewsletter(data);
}
