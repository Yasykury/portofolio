import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
  /** Honeypot — real users never fill this. */
  website?: string;
  /** Cloudflare Turnstile token (when configured). */
  "cf-turnstile-response"?: string;
};

// ---------------------------------------------------------------------------
// [SEC-10] Stricter email regex — rejects addresses without a valid TLD.
// Allows all RFC 5321 local-part characters while requiring a proper domain.
// ---------------------------------------------------------------------------
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

// ---------------------------------------------------------------------------
// [SEC-03] Field length limits (server-side).
// ---------------------------------------------------------------------------
const MAX_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321 maximum
  company: 200,
  budget: 50,
  message: 5_000,
} as const;

// ---------------------------------------------------------------------------
// [SEC-01] In-memory rate limiter — 5 submissions per IP per hour.
//
// Note: each serverless function instance has its own memory, so this limit
// applies per-instance rather than globally. For a portfolio contact form
// (low traffic, already protected by Turnstile) this is sufficient.
// For stricter enforcement consider Upstash Redis + @upstash/ratelimit.
// ---------------------------------------------------------------------------
const ipRateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateMap.get(ip);

  if (!record || now > record.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile verification. No-op (returns true) unless
// TURNSTILE_SECRET_KEY is configured, so the form keeps working until the
// key is set in the environment.
// ---------------------------------------------------------------------------
async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → skip
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          ...(ip ? { remoteip: ip } : {}),
        }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Validation — checks honeypot, required fields, formats, and length limits.
// ---------------------------------------------------------------------------
function validate(body: ContactPayload): string | null {
  if (body.website) return "Spam detected.";

  if (!body.name || body.name.trim().length < 2)
    return "Please enter your name.";
  if (body.name.length > MAX_LENGTHS.name)
    return `Name must be at most ${MAX_LENGTHS.name} characters.`;

  if (!body.email || !EMAIL_RE.test(body.email))
    return "Please enter a valid email address.";
  if (body.email.length > MAX_LENGTHS.email)
    return "Email address is too long.";

  if (body.company && body.company.length > MAX_LENGTHS.company)
    return `Company / project name must be at most ${MAX_LENGTHS.company} characters.`;

  if (body.budget && body.budget.length > MAX_LENGTHS.budget)
    return "Invalid budget selection.";

  if (!body.message || body.message.trim().length < 10)
    return "Please add a few more details about your project.";
  if (body.message.length > MAX_LENGTHS.message)
    return `Message must be at most ${MAX_LENGTHS.message.toLocaleString()} characters.`;

  return null;
}

// ---------------------------------------------------------------------------
// HTML escaping — prevents stored XSS in email body.
// ---------------------------------------------------------------------------
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------------------------------------------------------------------------
// Email sender (Resend).
// ---------------------------------------------------------------------------
async function sendEmail(submission: {
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false; // no provider configured

  const to = process.env.CONTACT_TO || "yasykury@outlook.com";
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject: `New inquiry from ${submission.name}`,
      html: `
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
        <p><strong>Company / Project:</strong> ${submission.company ? escapeHtml(submission.company) : "—"}</p>
        <p><strong>Budget:</strong> ${submission.budget ? escapeHtml(submission.budget) : "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(submission.message).replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    throw new Error("Email provider failed");
  }
  return true;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  // [SEC-03] Reject oversized payloads before parsing JSON.
  // 64 KB is far more than any legitimate contact submission needs.
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 65_536) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // [SEC-01] Rate limiting — checked after validation to avoid wasting a
  // slot on obviously invalid payloads.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a while before trying again." },
      { status: 429 },
    );
  }

  // Bot protection (Cloudflare Turnstile). Skipped automatically when no
  // secret is configured.
  const human = await verifyTurnstile(body["cf-turnstile-response"], ip);
  if (!human) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  const submission = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    company: body.company?.trim() || null,
    budget: body.budget?.trim() || null,
    message: body.message!.trim(),
    receivedAt: new Date().toISOString(),
  };

  // Preferred path (production): email via Resend when RESEND_API_KEY is set.
  try {
    const sent = await sendEmail(submission);
    if (sent) {
      return NextResponse.json(
        { ok: true, message: "Thanks — your message has been received." },
        { status: 200 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please email me directly." },
      { status: 502 },
    );
  }

  // Fallback (local dev / no email provider): persist to a JSON file so the
  // form still works out of the box. Note: serverless filesystems are
  // ephemeral, so configure RESEND_API_KEY in production (see DEPLOY.md).
  try {
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "contact-submissions.json");
    await fs.mkdir(dataDir, { recursive: true });

    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      existing = [];
    }
    existing.push(submission);
    await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to persist contact submission:", err);
  }

  return NextResponse.json(
    { ok: true, message: "Thanks — your message has been received." },
    { status: 200 },
  );
}
