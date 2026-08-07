"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form.
 *
 * Three layers, each catching the one before it:
 *   1. POST to /api/contact — sends via Resend when RESEND_API_KEY is set.
 *   2. If that fails for any reason, hand the message to the visitor's mail app.
 *   3. Show the address in plain text either way, because a mail app that does
 *      not open is silent — the visitor must always be left with something
 *      they can copy.
 */

const TOPICS = [
  {
    value: "securepulse",
    label: "SecurePulse",
    placeholder:
      "e.g. We assess physical security across a dozen sites in Abu Dhabi and Dubai. Two senior assessors spend about three weeks per site walking it, writing findings, and producing the report — so each site gets covered once a year at best.",
  },
  {
    value: "kai",
    label: "kAI",
    placeholder:
      "e.g. We get around 400 inbound enquiries a month and two people to work them. The first forty get called back the same day; the rest go cold before anyone reaches them.",
  },
  {
    value: "partnership",
    label: "A partnership",
    placeholder:
      "e.g. We have deep domain expertise and a route to market in a regulated sector, and a product we think should exist. We are looking for the engineering side of that rather than an agency.",
  },
  {
    value: "commissioned",
    label: "A system you would build for us",
    placeholder:
      "e.g. Our whole operation runs through one workflow that three people hold in their heads and a spreadsheet. It decides what we buy and at what price, and nothing on the market fits how we actually work.",
  },
  {
    value: "other",
    label: "Something else",
    placeholder:
      "e.g. Describe the work — what it does, who does it today, and what it costs when it goes wrong. Whatever detail you have is enough to start.",
  },
] as const;

type Topic = (typeof TOPICS)[number]["value"];
type Errors = Partial<Record<"name" | "email" | "company" | "work", string>>;
type Status = "idle" | "sending" | "sent" | "fallback";

interface Fields {
  name: string;
  email: string;
  company: string;
  topic: Topic;
  work: string;
}

/**
 * Fields carry their own tokens rather than the section's surface ones. On
 * ember that resolves to a white sheet with near-black type: a field is a
 * target rather than scenery, and tinted the same as the ground it sits on its
 * edge went soft and the form read as one block.
 */
const FIELD =
  "w-full rounded-control border border-field-border bg-field px-4 py-3 text-body text-field-fg " +
  "placeholder:text-field-placeholder transition-colors duration-150 focus:border-field-border-focus";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function buildMailto(f: Fields) {
  const topic = TOPICS.find((t) => t.value === f.topic)?.label ?? "Enquiry";
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Company: ${f.company}`,
    `About: ${topic}`,
    "",
    f.work,
  ].join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    `${topic} — ${f.company}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const params = useSearchParams();
  const initial = (params.get("topic") ?? "") as Topic;

  const [topic, setTopic] = useState<Topic>(
    TOPICS.some((t) => t.value === initial) ? initial : "other",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot + minimum time on form. Bots fill everything instantly. */
    const website = String(data.get("website") ?? "");
    if (website !== "" || Date.now() - startedAt < 2500) return;

    const fields: Fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      topic,
      work: String(data.get("work") ?? "").trim(),
    };

    const next: Errors = {};
    if (!fields.name) next.name = "Please add your name.";
    if (!fields.email) next.email = "Please add an email address.";
    else if (!isEmail(fields.email))
      next.email = "That does not look like an email address.";
    if (!fields.company) next.company = "Please add your company.";
    if (fields.work.length < 40)
      next.work = "A sentence or two more, so we can give you a useful reply.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
    } catch {
      /* Network failure falls through to the mail-app handoff below. */
    }

    setStatus("fallback");
    window.location.href = buildMailto(fields);
  }

  if (status === "sent") {
    return (
      <Result heading="Thanks — that reached us.">
        <p className="text-body text-fg-muted">
          Your message is in our inbox. You will hear back from the person who
          would be responsible for the work.
        </p>
      </Result>
    );
  }

  if (status === "fallback") {
    return (
      <Result heading="One more step.">
        <p className="text-body text-fg-muted">
          We tried to send that for you and could not, so we have handed a
          pre-filled message to your email app. Press send there and it reaches
          us.
        </p>
        <p className="text-body text-fg-muted">
          If nothing opened, your browser may not have an email app registered.
          Write to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline underline-offset-4"
          >
            {SITE.email}
          </a>{" "}
          — the same details are all we need.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="min-h-12 cursor-pointer self-start rounded-control border border-border-strong px-5 text-body text-fg transition-colors duration-150 hover:border-accent"
        >
          Back to the form
        </button>
      </Result>
    );
  }

  const sending = status === "sending";
  const placeholder =
    TOPICS.find((t) => t.value === topic)?.placeholder ?? TOPICS[4].placeholder;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4">
      <Field id="name" label="Name" error={errors.name}>
        <input id="name" name="name" type="text" autoComplete="name" className={FIELD} />
      </Field>

      <Field id="email" label="Work email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={FIELD} />
      </Field>

      <Field id="company" label="Company" error={errors.company}>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={FIELD}
        />
      </Field>

      <Field id="topic" label="What brings you here?">
        {/* `appearance-none` takes the platform control away, so the affordance
            has to be drawn back: without it the field reads as a text input
            that will not accept typing, which on touch is worse than on a
            desktop — there is no cursor to contradict it. The chevron is
            decorative and lets taps through to the control underneath. */}
        <div className="relative">
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
            className={cn(FIELD, "cursor-pointer appearance-none pr-10")}
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {/* Sits inside the field, so it takes the field's ink, not the
              section's — on ember the surface tone is a near-invisible
              cream-on-white. */}
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-field-placeholder"
          />
        </div>
      </Field>

      <Field
        id="work"
        label="Tell us about the work"
        error={errors.work}
        hint="What does the workflow do, who does it today, and what does it cost when it goes wrong?"
      >
        <textarea
          id="work"
          name="work"
          rows={4}
          className={cn(FIELD, "resize-y")}
          placeholder={placeholder}
        />
      </Field>

      {/* Honeypot — hidden from people and assistive technology alike. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* A slow halo behind the submit — it draws the eye once without
          blinking at the visitor while they are still typing. */}
      <div className="relative inline-flex w-full sm:w-auto">
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-control bg-accent blur-lg motion-safe:animate-[glowButton_4.5s_ease-in-out_infinite]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-control motion-safe:animate-[auraRing_4.5s_cubic-bezier(0.16,1,0.3,1)_infinite]"
        />
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="relative min-h-12 w-full cursor-pointer rounded-control bg-accent-solid px-6 text-body font-medium text-accent-contrast transition-[background-color,transform] duration-150 hover:bg-accent-solid-hover motion-safe:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
        >
          {sending ? "Sending…" : "Send it"}
        </button>
      </div>
    </form>
  );
}

function Result({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div
      role="status"
      className="flex flex-col gap-4 rounded-card border border-border bg-surface-raised p-8"
    >
      <h2 className="text-heading-1 text-fg">{heading}</h2>
      {children}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-small font-medium text-fg">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-fine text-fg-subtle">
          {hint}
        </p>
      ) : null}
      <div
        className="mt-2"
        // Wiring aria on the wrapper keeps the field markup above readable.
        ref={(node) => {
          const control = node?.querySelector("input, select, textarea");
          if (!control) return;
          const describedBy = [hintId, errorId].filter(Boolean).join(" ");
          if (describedBy) control.setAttribute("aria-describedby", describedBy);
          else control.removeAttribute("aria-describedby");
          control.setAttribute("aria-invalid", error ? "true" : "false");
        }}
      >
        {children}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-small text-accent-quiet">
          {error}
        </p>
      ) : null}
    </div>
  );
}
