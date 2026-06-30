import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cloudflare Turnstile verification. No-op (returns true) unless
// TURNSTILE_SECRET_KEY is configured, so the form keeps working until the
// key is set in the environment.
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

function validate(body: ContactPayload): string | null {
  if (body.website) return "Spam detected.";
  if (!body.name || body.name.trim().length < 2) {
    return "Please enter your name.";
  }
  if (!body.email || !EMAIL_RE.test(body.email)) {
    return "Please enter a valid email address.";
  }
  if (!body.message || body.message.trim().length < 10) {
    return "Please add a few more details about your project.";
  }
  return null;
}

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
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Company / Project:</strong> ${submission.company ?? "—"}</p>
        <p><strong>Budget:</strong> ${submission.budget ?? "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message.replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    throw new Error("Email provider failed");
  }
  return true;
}

export async function POST(request: Request) {
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

  // Bot protection (Cloudflare Turnstile). Skipped automatically when no
  // secret is configured.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
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
