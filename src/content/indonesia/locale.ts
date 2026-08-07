/**
 * The locale pair for the SecurePuls Indonesia experience.
 *
 * English lives at the natural product path; Bahasa Indonesia under the `/id`
 * prefix, so any future translated page maps predictably under it. These two
 * constants are the single source for routes, hreflang alternates, the
 * sitemap, the header toggle and the tests.
 */
export const EN_PATH = "/securepuls/indonesia";
export const ID_PATH = "/id/securepuls/indonesia";

export const PATH_BY_LOCALE = { en: EN_PATH, id: ID_PATH } as const;
