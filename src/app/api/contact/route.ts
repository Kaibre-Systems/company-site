import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/content/site";

/**
 * Contact delivery.
 *
 * Returns a machine-readable `reason` on every failure so the client can fall
 * back deliberately rather than guessing. The address is never hidden: whatever
 * happens here, the page still shows it.
 *
 * Env:
 *   RESEND_API_KEY      required to send at all
 *   CONTACT_TO_EMAIL    optional, defaults to the address published on the site
 *   CONTACT_FROM_EMAIL  optional, must be on a domain verified in Resend
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPICS: Record<string, string> = {
  securepulse: "SecurePulse",
  kai: "kAI",
  partnership: "A partnership",
  commissioned: "A commissioned system",
  other: "Something else",
};

/** Small in-memory limiter. Enough for a marketing form; resets on redeploy. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  /* Honeypot — a real person never fills this. Answer 200 so bots learn nothing. */
  if (clean(payload.website, 100) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const company = clean(payload.company, 160);
  const work = clean(payload.work, 5000);
  const topicKey = clean(payload.topic, 40);
  const topic = TOPICS[topicKey] ?? TOPICS.other;

  if (
    !name ||
    !company ||
    work.length < 40 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  ) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not an error condition — the client falls back to the visitor's mail app.
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Kaibre site <onboarding@resend.dev>";

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `${topic} — ${company}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company}`,
        `About:   ${topic}`,
        "",
        work,
        "",
        "— sent from the contact form on kaibresystems.com",
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend rejected:", error);
      return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send threw:", err);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
}
