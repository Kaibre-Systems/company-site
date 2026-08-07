import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { EN_PATH, ID_PATH } from "@/content/indonesia/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  /** The bilingual pair cross-references itself so search engines serve the
   *  right language without treating the two as duplicates. */
  const indoLanguages = {
    en: `${SITE.domain}${EN_PATH}`,
    id: `${SITE.domain}${ID_PATH}`,
  };
  const routes: {
    path: string;
    priority: number;
    languages?: Record<string, string>;
  }[] = [
    { path: "", priority: 1 },
    { path: "/securepuls", priority: 0.9 },
    { path: EN_PATH, priority: 0.9, languages: indoLanguages },
    { path: ID_PATH, priority: 0.9, languages: indoLanguages },
    { path: "/work", priority: 0.8 },
    { path: "/kai", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  return routes.map(({ path, priority, languages }) => ({
    url: `${SITE.domain}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
    ...(languages ? { alternates: { languages } } : {}),
  }));
}
