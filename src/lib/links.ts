// Single source of truth for outbound CTA destinations on the marketing site.
// Every "Book a kAI demo", "Book a discovery call", and "Talk to engineering"
// CTA reads from this constant — do NOT hardcode Calendly URLs in components.
export const CALENDLY_URL = "https://calendly.com/systemskaibre/30min";

// LinkedIn — already used in nav/footer/legacy CTAs.
export const LINKEDIN_URL =
  "https://www.linkedin.com/company/kaibre-systems-limited/";

type UTM = {
  source?: string;
  medium?: string;
  content?: string;
};

export function withUtm(url: string, utm: UTM): string {
  // Don't append params to placeholder/anchor links.
  if (!url || url.startsWith("#")) return url;
  const u = new URL(url, "https://kaibre.com");
  if (utm.source) u.searchParams.set("utm_source", utm.source);
  if (utm.medium) u.searchParams.set("utm_medium", utm.medium);
  if (utm.content) u.searchParams.set("utm_content", utm.content);
  return u.toString();
}
