"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/content/site";
import type { IndoContent } from "@/content/indonesia/types";
import { cn } from "@/lib/utils";

/**
 * Contact form for the SecurePuls Indonesia experience.
 *
 * Same three-layer delivery as the company-site form — API send, mail-app
 * handoff, plain-text address — with the copy fully driven by the locale
 * dictionary, plus the two fields an enterprise evaluation needs: role and
 * organisation type. Posts the `securepuls-id` topic so the enquiry arrives
 * labelled.
 */

type FormContent = IndoContent["contact"]["form"];
type Errors = Partial<Record<"name" | "email" | "company" | "work", string>>;
type Status = "idle" | "sending" | "sent" | "fallback";

interface Fields {
  name: string;
  email: string;
  company: string;
  role: string;
  orgType: string;
  work: string;
}

const FIELD =
  "w-full rounded-control border border-field-border bg-field px-4 py-3 text-body text-field-fg " +
  "placeholder:text-field-placeholder transition-colors duration-150 focus:border-field-border-focus";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** The handoff message keeps fixed English field labels — it lands in the
 *  Kaibre inbox, not in front of the visitor. */
function buildMailto(f: Fields, orgTypeLabel: string) {
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Company: ${f.company}`,
    f.role ? `Role: ${f.role}` : null,
    `Organisation type: ${orgTypeLabel}`,
    `About: SecurePuls Indonesia`,
    "",
    f.work,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    `SecurePuls Indonesia — ${f.company}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function IndoContactForm({
  form,
  locale,
}: {
  form: FormContent;
  locale: "en" | "id";
}) {
  const [orgType, setOrgType] = useState(form.orgType.options[0].value);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const el = event.currentTarget;
    const data = new FormData(el);

    /* Honeypot + minimum time on form. Bots fill everything instantly. */
    const website = String(data.get("website") ?? "");
    if (website !== "" || Date.now() - startedAt < 2500) return;

    const fields: Fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      role: String(data.get("role") ?? "").trim(),
      orgType,
      work: String(data.get("work") ?? "").trim(),
    };

    const next: Errors = {};
    if (!fields.name) next.name = form.name.error;
    if (!fields.email) next.email = form.email.errorMissing;
    else if (!isEmail(fields.email)) next.email = form.email.errorInvalid;
    if (!fields.company) next.company = form.company.error;
    if (fields.work.length < 40) next.work = form.need.error;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      el.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          topic: "securepuls-id",
          locale,
          website,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
    } catch {
      /* Network failure falls through to the mail-app handoff below. */
    }

    setStatus("fallback");
    const orgTypeLabel =
      form.orgType.options.find((o) => o.value === orgType)?.label ?? orgType;
    window.location.href = buildMailto(fields, orgTypeLabel);
  }

  if (status === "sent") {
    return (
      <Result heading={form.sent.heading}>
        <p className="text-body text-fg-muted">{form.sent.body}</p>
      </Result>
    );
  }

  if (status === "fallback") {
    return (
      <Result heading={form.fallback.heading}>
        <p className="text-body text-fg-muted">{form.fallback.body}</p>
        <p className="text-body text-fg-muted">
          {form.fallback.noMail}{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline underline-offset-4"
          >
            {SITE.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="min-h-12 cursor-pointer self-start rounded-control border border-border-strong px-5 text-body text-fg transition-colors duration-150 hover:border-accent"
        >
          {form.fallback.back}
        </button>
      </Result>
    );
  }

  const sending = status === "sending";

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4">
      <Field id="sp-name" name="name" label={form.name.label} error={errors.name}>
        <input id="sp-name" name="name" type="text" autoComplete="name" className={FIELD} />
      </Field>

      <Field id="sp-email" name="email" label={form.email.label} error={errors.email}>
        <input id="sp-email" name="email" type="email" autoComplete="email" className={FIELD} />
      </Field>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
        <Field id="sp-company" name="company" label={form.company.label} error={errors.company}>
          <input
            id="sp-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={FIELD}
          />
        </Field>

        <Field id="sp-role" name="role" label={form.role.label}>
          <input
            id="sp-role"
            name="role"
            type="text"
            autoComplete="organization-title"
            className={FIELD}
          />
        </Field>
      </div>

      <Field id="sp-orgtype" name="orgType" label={form.orgType.label}>
        <div className="relative">
          <select
            id="sp-orgtype"
            name="orgType"
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
            className={cn(FIELD, "cursor-pointer appearance-none pr-10")}
          >
            {form.orgType.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-field-placeholder"
          />
        </div>
      </Field>

      <Field
        id="sp-work"
        name="work"
        label={form.need.label}
        hint={form.need.hint}
        error={errors.work}
      >
        <textarea
          id="sp-work"
          name="work"
          rows={4}
          className={cn(FIELD, "resize-y")}
          placeholder={form.need.placeholder}
        />
      </Field>

      {/* Honeypot — hidden from people and assistive technology alike. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="sp-website">Website</label>
        <input id="sp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
          {sending ? form.sending : form.submit}
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
      <h3 className="text-heading-1 text-fg">{heading}</h3>
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
  /** Kept for call-site readability; the control inside carries the name. */
  name: string;
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
