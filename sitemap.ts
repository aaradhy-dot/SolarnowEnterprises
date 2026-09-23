import type { MetadataRoute } from "next";
import { allSlugs } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://solarnow-enterprises.openai.site";
  return [{ url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }, ...allSlugs.map(slug => ({ url: `${base}/${slug}`, lastModified: new Date(), changeFrequency: slug === "blog" ? "weekly" as const : "monthly" as const, priority: slug === "get-quote" || slug === "contact" ? .9 : .8 }))];
}
