import Link from "next/link";
import { KaibreWordmark } from "@/components/brand/wordmark";
import { withBrand } from "@/components/visuals";
import { SITE } from "@/content/site";
import type { IndoContent } from "@/content/indonesia/types";

/**
 * Compact, fully localised footer for the SecurePulse Indonesia experience.
 * One block rather than the company site's column groups: this is a single
 * page, and the footer's jobs are attribution, a route back to Kaibre, the
 * plain-text address (the contact fallback of last resort), and the
 * counterpart page in its own language.
 */
export function IndoFooter({ content }: { content: IndoContent }) {
  const { footer } = content;

  return (
    <footer
      data-surface="ink"
      className="border-t border-border bg-surface text-fg"
    >
      <div className="mx-auto max-w-shell px-5 pt-12 pb-[calc(3rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <KaibreWordmark className="h-8 w-auto text-fg" />
            <p className="mt-4 max-w-[38ch] text-fine text-fg-muted">
              {withBrand(footer.tagline)}
            </p>
            <address className="mt-5 not-italic text-fine text-fg-subtle">
              {SITE.address.line}
              <br />
              {SITE.address.city}, {SITE.address.country}
            </address>
          </div>

          <div className="flex min-w-0 flex-col md:items-end">
            <ul className="min-w-0">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg"
                  >
                    {/* One span, deliberately: the link is a flex container,
                        and `withBrand` returns several children — as separate
                        flex items the space after the brand name collapses. */}
                    <span>{withBrand(link.label)}</span>
                  </Link>
                </li>
              ))}
              <li>
                {/* The address is one unbreakable 23-character run. At a
                    raised default font size it is wider than a 320px column,
                    and in this list layout there is no flex row to shrink it —
                    `anywhere` lowers its min-content so it reflows instead of
                    scrolling every locale sideways. */}
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 min-w-0 max-w-full items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    {SITE.email}
                  </span>
                </a>
              </li>
            </ul>
            <Link
              href={footer.languageLink.href}
              className="mt-2 inline-flex min-h-11 items-center text-small text-accent underline-offset-4 hover:underline"
            >
              {footer.languageLink.label}
            </Link>
          </div>
        </div>

        <hr className="mt-10 h-px border-0 bg-border" />
        <p className="mt-5 text-small text-fg-subtle">
          © {new Date().getFullYear()} {SITE.legalName}
        </p>
      </div>
    </footer>
  );
}
