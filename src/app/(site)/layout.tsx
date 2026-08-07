import type { ReactNode } from "react";
import { SiteChrome } from "@/components/layout/site-chrome";

/**
 * Layout for the company site proper. The SecurePulse Indonesia experience
 * lives outside this group and carries its own, fully localised chrome — an
 * Indonesian-language page must not open under an English header.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
