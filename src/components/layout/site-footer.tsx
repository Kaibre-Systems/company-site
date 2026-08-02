import Link from "next/link";
import { Linkedin } from "lucide-react";
import { FOOTER_GROUPS, SITE } from "@/content/site";
import { KaibreWordmark } from "@/components/brand/wordmark";
import { SecurePulsName } from "@/components/visuals";

export function SiteFooter() {
  return (
    <footer
      data-surface="ink"
      className="border-t border-border bg-surface text-fg"
    >
      {/* The last row on the site sits against the bottom edge of the screen,
          which on a notched phone is where the home indicator lives. The inset
          resolves to 0 unless the viewport is ever taken edge to edge, so this
          costs nothing today and cannot be forgotten later. */}
      <div className="mx-auto max-w-shell px-5 pt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <KaibreWordmark className="h-9 w-auto text-fg" />
            <p className="mt-5 max-w-[34ch] text-fine text-fg-muted">
              {SITE.positioning}
            </p>
            <address className="mt-6 not-italic text-fine text-fg-subtle">
              {SITE.address.line}
              <br />
              {SITE.address.city}, {SITE.address.country}
            </address>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-small font-medium text-fg-subtle">
                {group.title}
              </h2>
              {/* 44px rows with no gap rather than 24px rows with one: the
                  list occupies about the same height either way, and every
                  link becomes a real touch target instead of a 24px line in a
                  32px pitch. */}
              <ul className="mt-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 min-w-11 items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg"
                    >
                      {link.label === "SecurePuls" ? (
                        <SecurePulsName animate />
                      ) : (
                        link.label
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="mt-12 h-px border-0 bg-border" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-fg-subtle">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>

          <div className="flex items-center gap-5">
            {/* The address is a single 23-character run with no break
                opportunity, and a flex item's automatic minimum size is its
                min-content width — so at a raised default font size this one
                link refused to shrink below ~380px and pushed every page on
                the site sideways. The floor has to be zeroed twice: on the
                link, which is an item of the row, and on the text inside it,
                which is an anonymous item of the link's own flex line. The
                icon beside it keeps its 44px target by not shrinking at all. */}
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 min-w-0 items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg"
            >
              <span className="min-w-0">{SITE.email}</span>
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-control text-fg-muted transition-colors duration-150 hover:text-fg"
            >
              <span className="sr-only">Kaibre on LinkedIn (opens in a new tab)</span>
              <Linkedin aria-hidden className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
