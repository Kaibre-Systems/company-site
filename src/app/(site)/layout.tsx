import type { ReactNode } from "react";
import { SiteChrome } from "@/components/layout/site-chrome";

/**
 * Layout for the company site proper. The Tuntas experience lives outside
 * this group and carries its own, fully localised chrome — a separate product
 * does not open under the parent company's header, and an
 * Indonesian-language page must not open under an English one.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
