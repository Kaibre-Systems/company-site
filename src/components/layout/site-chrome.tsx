import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * The company-site shell: skip link, fixed header, main landmark, footer.
 *
 * It lives in a component rather than only in the `(site)` route-group layout
 * because the root `not-found` and `error` pages render outside that group —
 * without this, a 404 would be the one page on the site with no navigation.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-accent-solid focus:px-4 focus:py-3 focus:text-body focus:text-accent-contrast"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
