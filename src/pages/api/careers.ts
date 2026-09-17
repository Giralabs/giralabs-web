import type { APIRoute } from 'astro';
import {
  applicationOptions,
  getJob,
  CV_EXTENSIONS,
  CV_MAX_BYTES,
  type CareersLang,
} from '../../data/careers';
// nodemailer is imported at its call site: see the note in api/newsletter.ts

export const prerender = false;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// A human needs well over this to fill the form; bots post instantly
const MIN_FILL_MS = 4000;

// First bytes of each accepted format. The extension and the browser-reported
// MIME type are both chosen by the sender, so they are not proof of anything.
function sniffCv(bytes: Uint8Array): 'pdf' | 'doc' | 'docx' | null {
  const starts = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (starts([0x25, 0x50, 0x44, 0x46])) return 'pdf'; // %PDF
  if (starts([0x50, 0x4b, 0x03, 0x04])) return 'docx'; // ZIP container
  if (starts([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return 'doc'; // OLE2
  return null;
}

const CV_CONTENT_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const str = (data: FormData, key: string, max: number) =>
  String(data.get(key) ?? '').trim().slice(0, max);

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------
// POST /api/careers  (multipart/form-data)
// Validates a job application and emails it, CV attached, to Giralabs,
// then sends the candidate a confirmation. Nothing is stored server-side.
// ----------------------------------------------------------------
export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json(400, { error: 'invalid_body' });
  }

  // Spam traps: pretend success so bots do not learn to adapt
  const startedAt = Number(data.get('started_at'));
  if (str(data, 'website', 200) || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return json(200, { ok: true });
  }

  const job = getJob(str(data, 'slug', 100));
  if (!job || !job.open) return json(404, { error: 'job_not_found' });

  const lang: CareersLang = str(data, 'lang', 2) === 'en' ? 'en' : 'es';

  const fields = {
    name: str(data, 'name', 120),
    email: str(data, 'email', 160),
    phone: str(data, 'phone', 30),
    city: str(data, 'city', 120),
    work_permit: str(data, 'work_permit', 10),
    linkedin: str(data, 'linkedin', 300),
    portfolio: str(data, 'portfolio', 300),
    experience: str(data, 'experience', 10),
    availability: str(data, 'availability', 10),
    salary: str(data, 'salary', 60),
    level_flutter: str(data, 'level_flutter', 20),
    level_angular: str(data, 'level_angular', 20),
    level_spring: str(data, 'level_spring', 20),
    cover_letter: str(data, 'cover_letter', 3000),
    source: str(data, 'source', 20),
    utm: str(data, 'utm', 300),
  };

  // Error values are keys of the form's error copy, so the page can show them inline
  const errors: Record<string, string> = {};
  const oneOf = (value: string, allowed: readonly string[]) => allowed.includes(value);

  if (!fields.name) errors.name = 'required';
  if (!fields.email) errors.email = 'required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) errors.email = 'email';
  if (!fields.phone) errors.phone = 'required';
  else if (!/^\+?[\d\s().-]{9,20}$/.test(fields.phone)) errors.phone = 'phone';
  if (!fields.city) errors.city = 'required';
  if (!oneOf(fields.work_permit, applicationOptions.workPermit)) errors.work_permit = 'required';
  if (fields.linkedin && !isHttpUrl(fields.linkedin)) errors.linkedin = 'url';
  if (fields.portfolio && !isHttpUrl(fields.portfolio)) errors.portfolio = 'url';
  if (!oneOf(fields.experience, applicationOptions.experience)) errors.experience = 'required';
  if (!oneOf(fields.availability, applicationOptions.availability)) errors.availability = 'required';
  for (const key of ['level_flutter', 'level_angular', 'level_spring'] as const) {
    if (!oneOf(fields[key], applicationOptions.level)) errors[key] = 'required';
  }
  if (!fields.cover_letter) errors.cover_letter = 'required';
  else if (fields.cover_letter.length < 50) errors.cover_letter = 'minLength';
  if (!oneOf(fields.source, applicationOptions.source)) errors.source = 'required';
  if (data.get('privacy') !== 'accepted') errors.privacy = 'privacy';

  const cv = data.get('cv');
  let cvBuffer: Buffer | null = null;
  let cvExt = '';

  if (!(cv instanceof File) || cv.size === 0) {
    errors.cv = 'required';
  } else if (cv.size > CV_MAX_BYTES) {
    errors.cv = 'cvSize';
  } else {
    const ext = cv.name.split('.').pop()?.toLowerCase() ?? '';
    const bytes = new Uint8Array(await cv.arrayBuffer());
    // Accept the declared extension only when the content really is that format
    const matches = (CV_EXTENSIONS as readonly string[]).includes(ext) && sniffCv(bytes) === ext;
    if (!matches) {
      errors.cv = 'cvType';
    } else {
      cvBuffer = Buffer.from(bytes);
      cvExt = ext;
    }
  }

  if (Object.keys(errors).length > 0) {
    return json(422, { error: 'validation', fields: errors });
  }

  try {
    const { sendJobApplication } = await import('../../lib/email-sender.js');
    await sendJobApplication({
      job,
      lang,
      fields,
      cv: {
        filename: buildCvFilename(fields.name, cvExt),
        content: cvBuffer!,
        contentType: CV_CONTENT_TYPES[cvExt],
      },
    });
    return json(200, { ok: true });
  } catch (err) {
    console.error('[Giralabs Careers] Application delivery failed:', err);
    return json(500, { error: 'delivery_failed' });
  }
};

// "CV - Ana García López.pdf": readable in the inbox, safe in any mail client
function buildCvFilename(name: string, ext: string): string {
  const safe = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9 ._-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
  return `CV - ${safe || 'candidato'}.${ext}`;
}
