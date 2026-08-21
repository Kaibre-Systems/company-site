// Every action on the marketing site lands on /contact, which posts to the
// Resend-backed API route. There is no scheduling link any more: a Calendly
// page handed the visitor to a third party in the middle of a decision, and
// the form reaches the same inbox tagged with the product they came from.

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
