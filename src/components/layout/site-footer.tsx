import Link from "next/link";
import { Linkedin } from "lucide-react";
import { FOOTER_GROUPS, SITE } from "@/content/site";
import { KaibreWordmark } from "@/components/brand/wordmark";

export function SiteFooter() {
  return (
    <footer
      data-surface="ink"
      className="border-t border-border bg-surface text-fg"
    >
      <div className="mx-auto max-w-shell px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <KaibreWordmark className="h-9 w-auto text-fg" />
            <p className="mt-5 max-w-[34ch] text-small text-fg-muted">
              {SITE.positioning}
            </p>
            <address className="mt-6 not-italic text-small text-fg-subtle">
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
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-6 min-w-6 items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg"
                    >
                      {link.label}
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
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-6 min-w-6 items-center text-small text-fg-muted transition-colors duration-150 hover:text-fg"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex size-11 items-center justify-center rounded-control text-fg-muted transition-colors duration-150 hover:text-fg"
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
