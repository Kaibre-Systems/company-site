"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form.
 *
 * No mail provider is configured for this repository, so submission composes a
 * pre-filled message and hands off to the visitor's mail client. The address is
 * also shown in plain text and repeated in the confirmation state, so there is
 * always a working path even if no mail client is registered.
 *
 * To move to server-side delivery later: post these same fields to a route
 * handler and swap `buildMailto` for the fetch. The markup does not need to change.
 */

const TOPICS = [
  { value: "securepulse", label: "SecurePulse" },
  { value: "kai", label: "kAI" },
  { value: "partnership", label: "A partnership" },
  { value: "commissioned", label: "A system you would build for us" },
  { value: "other", label: "Something else" },
] as const;

type Topic = (typeof TOPICS)[number]["value"];
type Errors = Partial<Record<"name" | "email" | "company" | "work", string>>;

const FIELD =
  "w-full rounded-control border border-border bg-surface-raised px-4 py-3 text-body text-fg " +
  "placeholder:text-fg-subtle transition-colors duration-150 focus:border-accent";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function buildMailto(fields: {
  name: string;
  email: string;
  company: string;
  topic: Topic;
  work: string;
}) {
  const topicLabel =
    TOPICS.find((t) => t.value === fields.topic)?.label ?? "Enquiry";
  const subject = `${topicLabel} — ${fields.company}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company}`,
    `About: ${topicLabel}`,
    "",
    fields.work,
  ].join("\n");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = (params.get("topic") ?? "") as Topic;
  const validInitial = TOPICS.some((t) => t.value === initialTopic);

  const [topic, setTopic] = useState<Topic>(validInitial ? initialTopic : "other");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [startedAt] = useState(() => Date.now());

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot + minimum time on form. Bots fill everything instantly. */
    if (String(data.get("website") ?? "") !== "") return;
    if (Date.now() - startedAt < 2500) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const work = String(data.get("work") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (!email) next.email = "Please add an email address.";
    else if (!isEmail(email)) next.email = "That does not look like an email address.";
    if (!company) next.company = "Please add your company.";
    if (work.length < 40)
      next.work = "A sentence or two more, so we can give you a useful reply.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    window.location.href = buildMailto({ name, email, company, topic, work });
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-card border border-border bg-surface-raised p-8">
        <h2 className="text-heading-1 text-fg">Your message is ready to send.</h2>
        <p className="mt-4 text-body text-fg-muted">
          We have handed a pre-filled message to your email app. Press send there and
          it reaches us.
        </p>
        <p className="mt-4 text-body text-fg-muted">
          If nothing opened, your browser may not have an email app registered. Write
          to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline underline-offset-4"
          >
            {SITE.email}
          </a>{" "}
          directly — the same details are all we need.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 min-h-12 rounded-control border border-border-strong px-5 text-body text-fg transition-colors duration-150 hover:border-accent"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <Field id="name" label="Name" error={errors.name}>
        <input id="name" name="name" type="text" autoComplete="name" className={FIELD} />
      </Field>

      <Field id="email" label="Work email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={FIELD}
        />
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
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
          className={cn(FIELD, "appearance-none pr-10")}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
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
          rows={6}
          className={cn(FIELD, "resize-y")}
          placeholder="e.g. Our team runs physical security assessments across a dozen sites. Two senior assessors spend about three weeks per site walking it, writing findings, and producing the report — so we can only cover each site once a year."
        />
      </Field>

      {/* Honeypot — hidden from people and assistive technology alike. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="min-h-12 w-full rounded-control bg-accent-solid px-6 text-body font-medium text-accent-contrast transition-[background-color,transform] duration-150 hover:bg-accent-solid-hover motion-safe:hover:-translate-y-px sm:w-auto"
      >
        Send it
      </button>
    </form>
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
  children: React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-small font-medium text-fg">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-small text-fg-subtle">
          {hint}
        </p>
      ) : null}
      <div
        className="mt-2.5"
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
