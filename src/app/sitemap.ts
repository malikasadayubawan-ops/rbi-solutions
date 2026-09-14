import type { MetadataRoute } from "next";
import { countries } from "@/data/countries";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...countries.map((c) => ({
      url: `${SITE_URL}${c.programPagePath}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: c.featured ? 0.9 : 0.7,
    })),
  ];
}
