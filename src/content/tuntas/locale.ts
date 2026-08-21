/**
 * The locale pair for the Tuntas experience.
 *
 * English lives at the product path; Bahasa Indonesia under the `/id` prefix,
 * so any future translated page maps predictably under it. These two
 * constants are the single source for routes, hreflang alternates, the
 * sitemap, the header toggle and the tests.
 *
 * The pages were served at `/securepulse/indonesia` until Tuntas was split
 * out as its own product; both old paths — and the `/securepuls` spelling
 * before them — redirect here permanently from `next.config.ts`.
 */
export const EN_PATH = "/tuntas";
export const ID_PATH = "/id/tuntas";

export const PATH_BY_LOCALE = { en: EN_PATH, id: ID_PATH } as const;
