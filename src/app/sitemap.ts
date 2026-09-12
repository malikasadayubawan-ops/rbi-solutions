import type { MetadataRoute } from "next";
import { countries } from "@/data/countries";

const siteUrl = "https://www.rbisolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...countries.map((c) => ({
      url: `${siteUrl}${c.programPagePath}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: c.featured ? 0.9 : 0.7,
    })),
  ];
}
