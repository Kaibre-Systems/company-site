import { cn } from "@/lib/utils";
import { PulseDot } from "@/components/visuals";

/* ==========================================================================
   Call artifacts — kAI's work product is a conversation
   --------------------------------------------------------------------------
   SecurePulse ships a document, so its pages carry paper. kAI's output is a
   qualified conversation, so its visual is the call itself: who said what,
   the structured answers pulled out of the speech, and the classification
   that decides whether a person picks it up. No waveforms, no audio bars —
   the transcript and its extraction ARE the product.
   ========================================================================== */

export interface CallPanelContent {
  /** "Outbound call · your number" — where the call runs. */
  context: string;
  /** Live state: "In conversation · 02:41". */
  state: string;
  /** Speaker-tagged transcript rows. `secondary` rows fold away on phones
   *  and in the compact variant. */
  transcript: readonly {
    speaker: string;
    /** kAI's own turns are marked so the agent's voice reads apart. */
    agent?: boolean;
    text: string;
    secondary?: boolean;
  }[];
  /** The structured answers extracted from the speech. */
  answersLabel: string;
  answers: readonly { field: string; value: string }[];
  /** The classification the call ends in — the handover decision. */
  outcome: string;
}

export function CallPanel({
  content,
  compact = false,
}: {
  content: CallPanelContent;
  /** Product-card variant: primary transcript rows only, tighter padding. */
  compact?: boolean;
}) {
  return (
    <div className={cn("p-5", !compact && "sm:p-6")}>
      {/* Call header: where it runs, and that it is running. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border pb-3">
        <p className="text-small text-fg-subtle">{content.context}</p>
        <p className="flex items-center gap-2 font-mono text-label text-fg-muted">
          <PulseDot tone="live" />
          {content.state}
        </p>
      </div>

      {/* The conversation. A mono speaker gutter keeps the two voices
          scannable; kAI's turns carry the accent so the agent reads apart
          from the lead without a cartoon chat-bubble in sight. */}
      <ul className={cn("space-y-2.5 pt-3.5", !compact && "sm:space-y-3")}>
        {content.transcript.map((row) => (
          <li
            key={row.text}
            className={cn(
              "grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3",
              row.secondary && (compact ? "hidden" : "hidden sm:grid"),
            )}
          >
            <span
              className={cn(
                "pt-0.5 font-mono text-label tracking-[0.085em]",
                row.agent ? "text-accent" : "text-fg-subtle",
              )}
            >
              {row.speaker}
            </span>
            <span className={cn("text-small", row.agent ? "text-fg-muted" : "text-fg")}>
              {row.text}
            </span>
          </li>
        ))}
      </ul>

      {/* What the speech became: structured answers, not a recording. */}
      <div className="mt-4 border-t border-border pt-3.5">
        <p className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          {content.answersLabel}
        </p>
        <dl className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1.5">
          {content.answers.map((a) => (
            <div key={a.field} className="flex items-baseline gap-2">
              <dt className="text-fine text-fg-subtle">{a.field}</dt>
              <dd className="text-small text-fg">{a.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The decision the call ends in. */}
      <p className="mt-4 flex items-center gap-2.5 border-t border-border pt-3.5 text-small font-medium text-fg">
        <PulseDot tone="positive" size="md" halo />
        {content.outcome}
      </p>
    </div>
  );
}
