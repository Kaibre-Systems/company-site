import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/securepuls", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/kai", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE.domain}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
