import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getSubscribers, getNotifiedSlugs, saveNotifiedSlugs } from './newsletter-store.ts';
import { sendNewPostsNotification } from './email-sender.ts';

interface RawPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

// Custom simple frontmatter parser to avoid external dependencies
function parseMarkdownFrontmatter(fileContent: string): RawPost | null {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) return null;
  const yamlBlock = match[1];
  const result: Record<string, any> = {};
  
  const lines = yamlBlock.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();
    
    // Clean quotes or array notation
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => {
        s = s.trim();
        if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
        if (s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1);
        return s;
      });
    }
    result[key] = val;
  }
  return result as RawPost;
}

export async function checkAndSendNewPostNotifications(): Promise<void> {
  const BLOG_DIR = join(process.cwd(), 'src', 'data', 'blog');
  
  // Guard clause if directory does not exist yet
  try {
    readdirSync(BLOG_DIR);
  } catch {
    console.log('[Giralabs Newsletter] Blog directory not found, skipping check.');
    return;
  }

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  const newPosts: RawPost[] = [];
  const notifiedSlugs = await getNotifiedSlugs();

  for (const file of files) {
    const fullPath = join(BLOG_DIR, file);
    try {
      const content = readFileSync(fullPath, 'utf-8');
      const frontmatter = parseMarkdownFrontmatter(content);
      if (frontmatter && frontmatter.slug) {
        if (!notifiedSlugs.includes(frontmatter.slug)) {
          newPosts.push(frontmatter);
        }
      }
    } catch (e) {
      console.error(`[Giralabs Newsletter] Failed to parse file ${file}:`, e);
    }
  }

  if (newPosts.length === 0) {
    console.log('[Giralabs Newsletter] No new posts found to notify.');
    return;
  }

  console.log(`[Giralabs Newsletter] Found ${newPosts.length} new post(s) to notify:`, newPosts.map(p => p.slug));

  const subscribers = await getSubscribers();
  if (subscribers.length === 0) {
    console.log('[Giralabs Newsletter] No newsletter subscribers registered yet. Storing slugs as notified.');
    await saveNotifiedSlugs(newPosts.map(p => p.slug));
    return;
  }

  // Group subscribers by language
  const esSubs = subscribers.filter(s => s.lang === 'es');
  const enSubs = subscribers.filter(s => s.lang === 'en');

  // Trigger delivery
  if (esSubs.length > 0) {
    console.log(`[Giralabs Newsletter] Sending notifications to ${esSubs.length} Spanish subscribers.`);
    await sendNewPostsNotification(esSubs, newPosts);
  }
  
  if (enSubs.length > 0) {
    console.log(`[Giralabs Newsletter] Sending notifications to ${enSubs.length} English subscribers.`);
    await sendNewPostsNotification(enSubs, newPosts);
  }

  // Register notified slugs in store
  const newSlugs = newPosts.map(p => p.slug);
  await saveNotifiedSlugs(newSlugs);
  console.log('[Giralabs Newsletter] Slugs registered as notified successfully.');
}
